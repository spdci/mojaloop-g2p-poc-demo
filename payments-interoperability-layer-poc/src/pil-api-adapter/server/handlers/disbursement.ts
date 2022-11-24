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

import { StateResponseToolkit } from '../plugins/state'
import { Request, ResponseObject } from '@hapi/hapi'
import { ValidationError } from '../../validation/validation-error'
import PaymentMultiplexer, { MojaloopSendMoneyRequest } from '../../../pil-payment-multiplexer'
import DirectoryMultiplexer from '../../../pil-directory-multiplexer'
import { ObjectStore } from '../../lib/obj-store'
import { request } from 'http'

interface PayeeItem {
  payeeIdType: string;
  payeeIdValue: string;
  amount: string;
  currency: string;
}
interface DisbursementRequest {
  disbursementId: string;
  note: string;
  payeeList: PayeeItem[];
}

interface PayeeResultItem extends PayeeItem {
  isSuccess: Boolean;
  timestamp: string;
  paymentExecutionSystem?: string | undefined;
  paymentExecutionSystemInfo?: any | undefined;
  result?: any;
  errors?: string[];
}
interface DisbursementResult {
  disbursementId: string;
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
        const mapInfo = await DirectoryMultiplexer.getPayeeAccountInformation({
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
            const mojaloopResponse = await PaymentMultiplexer.sendMoney(sendMoneyRequest)
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
              timestamp: new Date().toISOString(),
              result: disbursementResponseItem
            })
            break;
          }
          default: {
            throw(new Error(`Unsupported payment execution system ${mapInfo.paymentExecutionSystem}`))
          }
        }
      } catch (err: any) {
        console.log(err.message)
        if (err instanceof ValidationError) {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            timestamp: new Date().toISOString(),
            errors: err.validationErrors
          })
        } else {
          payeeResults.push({
            ...payeeItem,
            isSuccess: false,
            timestamp: new Date().toISOString(),
            errors: [ err.message ]
          })
        }
      }
    }
    const obj = ObjectStore.getInstance()
    const resp: DisbursementResult = {
      disbursementId: disbursementRequest.disbursementId,
      payeeResults
    }
    obj.data[disbursementRequest.disbursementId] = resp
    return h.response(resp).code(200)
  } catch (e) {
    h.getLogger().error(e)
    return h.response().code(500)
  }
}

export default {
  postDisbursement
}
