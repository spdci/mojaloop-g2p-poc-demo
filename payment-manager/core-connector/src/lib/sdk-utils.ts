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

import axios from 'axios'
import Config from '../shared/config'
import assert from 'assert'

const transactionRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'

const sendMoney = async (sendMoneyRequest: SendMoneyRequest) => {

    let transferResponse = [];
    for await (const payeeItem of sendMoneyRequest.payeeList) {
      try {
        const transferRequest = {
          homeTransactionId: 'abc123',
          from: {
            idType: 'ACCOUNT_ID',
            idValue: sendMoneyRequest.payerName,
            displayName: 'Government'
          },
          to: {
            idType: payeeItem.payeeIdType,
            idValue: payeeItem.payeeIdValue
          },
          amountType: 'SEND',
          currency: payeeItem.currency,
          amount: payeeItem.amount,
          transactionType: 'TRANSFER',
          note: 'string'
        }
        const transferURI = `${Config.OUTBOUND_ENDPOINT}/transfers`
        const resp = await axios.post<any>(transferURI, transferRequest)
        assert.equal(resp.status, 200)
        transferResponse.push(resp.data)
      } catch(err: any) {
        transferResponse.push({
          error: err.response?.data || err.message          
        })
      }
    }
    return transferResponse
}

interface PayeeItem {
  payeeIdType: string;
  payeeIdValue: string;
  amount: string;
  currency: string;
}
export interface SendMoneyRequest {
  payerName: string;
  payeeList: PayeeItem[];

}

export default {
  sendMoney
}
