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
import Config from './lib/config'
import assert from 'assert'

const sendMoney = async (sendMoneyRequest: MojaloopSendMoneyRequest) => {
  const endpoint = Config.MOJALOOP_CONNECTION_INFO.find(item => item.dfspId === sendMoneyRequest.payerDfspId)?.endpoint
  if (endpoint) {
    const sendMoneyURI = `${endpoint}/sendmoney`
    console.log(`Sending http request POST ${sendMoneyURI}`)
    const resp = await axios.post<any>(sendMoneyURI, sendMoneyRequest)
    assert.equal(resp.status, 200)
    return resp.data
  } else {
    throw(new Error(`Can't find mojaloop connection information for dfspId ${sendMoneyRequest.payerDfspId}`))
  }
}

const checkPayability = async (payabilityCheckRequest: MojaloopPayabilityCheckRequest) => {
  const endpoint = Config.MOJALOOP_CONNECTION_INFO.find(item => item.dfspId === payabilityCheckRequest.payerDfspId)?.endpoint
  if (endpoint) {
    const payabilityCheckURI = `${endpoint}/payabilityCheck`
    console.log(`Sending http request POST ${payabilityCheckURI}`)
    const resp = await axios.post<any>(payabilityCheckURI, payabilityCheckRequest)
    assert.equal(resp.status, 200)
    return resp.data
  } else {
    throw(new Error(`Can't find mojaloop connection information for dfspId ${payabilityCheckRequest.payerDfspId}`))
  }
}


export interface MojaloopSendMoneyRequest {
  payerDfspId: string;
  payerIdType: string;
  payerIdValue: string;
  payeeIdType: string;
  payeeIdValue: string;
  amount: string;
  currency: string;
}

export interface MojaloopPayabilityCheckRequest {
  payerDfspId: string;
  payerIdType: string;
  payerIdValue: string;
  payeeIdType: string;
  payeeIdValue: string;
}

export default {
  sendMoney,
  checkPayability
}
