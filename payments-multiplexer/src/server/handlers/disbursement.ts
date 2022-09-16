// Copyright 2022 Digital Convergence Initiative
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { StateResponseToolkit } from '~/server/plugins/state'
import { Request, ResponseObject } from '@hapi/hapi'
import { ValidationError } from '../../validation/validation-error'
import MojaloopUtils from '../../lib/mojaloop-utils'
import { MojaloopSendMoneyRequest, MojaloopPayabilityCheckRequest } from '../../lib/mojaloop-utils'
import MapUtils from '../../lib/map-utils'

interface PayeeItem {
  payeeIdType: string;
  payeeIdValue: string;
  amount: string;
  currency: string;
}
interface DisbursementRequest {
  note: string;
  payeeList: PayeeItem[];
}

interface PayeeResultItem extends PayeeItem {
  isSuccess: Boolean;
  paymentExecutionSystem?: string | undefined;
  paymentExecutionSystemInfo?: any | undefined;
  result: any;
}
interface DisbursementResult {
  payeeResults: PayeeResultItem[];
}

const postDisbursement = async (
  _context: unknown,
  _request: Request,
  h: StateResponseToolkit
): Promise<ResponseObject> => {
  try {
    const payeeResults: PayeeResultItem[] = []
    const disbursementRequest = _request.payload as DisbursementRequest
    for await (const payeeItem of disbursementRequest.payeeList) {
      try {
        const mapInfo = await MapUtils.getPayeeAccountInformation({
          payeeIdType: payeeItem.payeeIdType,
          payeeIdValue: payeeItem.payeeIdValue
        })
        const paymentExecutionSystemInfo = mapInfo.paymentExecutionSystemInfo
        switch(mapInfo.paymentExecutionSystem) {
          case 'MOJALOOP': {
            const sendMoneyRequest : MojaloopSendMoneyRequest = {
              payerDfspId: paymentExecutionSystemInfo.payerDfspId,
              payerIdType: paymentExecutionSystemInfo.payerIdType,
              payerIdValue: paymentExecutionSystemInfo.payerIdValue,
              payeeIdType: paymentExecutionSystemInfo.payeeIdType,
              payeeIdValue: paymentExecutionSystemInfo.payeeIdValue,
              amount: payeeItem.amount,
              currency: payeeItem.currency
            }
            const mojaloopResponse = await MojaloopUtils.sendMoney(sendMoneyRequest)
            const disbursementResponseItem = {
              payeeInformation: mojaloopResponse.payeeInformation,
              transferId: mojaloopResponse.transferId,
              currentState: mojaloopResponse.currentState,
              initiatedTimestamp: mojaloopResponse.initiatedTimestamp,
              completedTimestamp: mojaloopResponse.completedTimestamp,
              payeeFspCommission: mojaloopResponse.payeeFspCommission,
              payeeFspFee: mojaloopResponse.payeeFspFee,
              payeeReceiveAmount: mojaloopResponse.payeeReceiveAmount
            }
            payeeResults.push({
              ...payeeItem,
              paymentExecutionSystem: mapInfo.paymentExecutionSystem,
              paymentExecutionSystemInfo,
              isSuccess: true,
              result: disbursementResponseItem
            })
            break;
          }
          default: {
            throw(new Error(`Unsupported payment execution system ${mapInfo.paymentExecutionSystem}`))
          }
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            result: {
              errors: err.validationErrors
            }
          })
        } else {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            result: {
              errors: [ err ]
            }
          })
        }
      }
    }
    return h.response({ payeeResults }).code(200)
  } catch (e) {
    h.getLogger().error(e)
    return h.response().code(500)
  }
}

const disbursementCheck = async (
  _context: unknown,
  _request: Request,
  h: StateResponseToolkit
): Promise<ResponseObject> => {
  try {
    const payeeResults: PayeeResultItem[] = []
    const disbursementRequest = _request.payload as DisbursementRequest
    for await (const payeeItem of disbursementRequest.payeeList) {
      try {
        const mapInfo = await MapUtils.getPayeeAccountInformation({
          payeeIdType: payeeItem.payeeIdType,
          payeeIdValue: payeeItem.payeeIdValue
        })
        const paymentExecutionSystemInfo = mapInfo.paymentExecutionSystemInfo
        switch(mapInfo.paymentExecutionSystem) {
          case 'MOJALOOP': {
            const payabilityCheckRequest : MojaloopPayabilityCheckRequest = {
              payerDfspId: paymentExecutionSystemInfo.payerDfspId,
              payerIdType: paymentExecutionSystemInfo.payerIdType,
              payerIdValue: paymentExecutionSystemInfo.payerIdValue,
              payeeIdType: paymentExecutionSystemInfo.payeeIdType,
              payeeIdValue: paymentExecutionSystemInfo.payeeIdValue,
              amount: payeeItem.amount,
              currency: payeeItem.currency
            }
            const mojaloopResponse = await MojaloopUtils.checkPayability(payabilityCheckRequest)
            const disbursementResponseItem = {
              payeeInformation: mojaloopResponse.payeeInformation,
              transferId: mojaloopResponse.transferId,
              currentState: mojaloopResponse.currentState,
              initiatedTimestamp: mojaloopResponse.initiatedTimestamp,
              completedTimestamp: mojaloopResponse.completedTimestamp,
              payeeFspCommission: mojaloopResponse.payeeFspCommission,
              payeeFspFee: mojaloopResponse.payeeFspFee,
              payeeReceiveAmount: mojaloopResponse.payeeReceiveAmount
            }
            payeeResults.push({
              ...payeeItem,
              paymentExecutionSystem: mapInfo.paymentExecutionSystem,
              paymentExecutionSystemInfo,
              isSuccess: true,
              result: disbursementResponseItem
            })
            break;
          }
          default: {
            throw(new Error(`Unsupported payment execution system ${mapInfo.paymentExecutionSystem}`))
          }
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            result: {
              errors: err.validationErrors
            }
          })
        } else {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            result: {
              errors: [ err ]
            }
          })
        }
      }
    }
    return h.response({ payeeResults }).code(200)
  } catch (e) {
    h.getLogger().error(e)
    return h.response().code(500)
  }
}

export default {
  disbursementCheck,
  postDisbursement
}
