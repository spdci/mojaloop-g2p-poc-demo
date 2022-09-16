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
import SDKUtils from '../../lib/sdk-utils'
import { DiscoveryRequest } from '../../lib/sdk-utils'


const payabilityCheck = async (
  _context: unknown,
  _request: Request,
  h: StateResponseToolkit
): Promise<ResponseObject> => {
  try {
    const discoveryRequest : DiscoveryRequest = {
      payeeIdType: (<any>_request.payload).payeeIdType,
      payeeIdValue: (<any>_request.payload).payeeIdValue
    }
    const discoveryResponse = await SDKUtils.discovery(discoveryRequest)
    if (discoveryResponse.party?.body?.partyIdInfo?.fspId) {
      return h.response({
        isPayable: true,
        partyResponse: discoveryResponse.party.body
      }).code(200)      
    } else {
      return h.response().code(404)
    }
    
  } catch (e) {
    h.getLogger().error(e)
    return h.response().code(500)
  }
}

export default {
  payabilityCheck
}
