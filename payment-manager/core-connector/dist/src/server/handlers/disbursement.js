"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validation_error_1 = require("../../validation/validation-error");
const sdk_utils_1 = tslib_1.__importDefault(require("../../lib/sdk-utils"));
const disbursement = async (_context, _request, h) => {
    try {
        const response = {};
        const sendMoneyRequest = _request.payload;
        try {
            // Some aync communication here
            const mojaloopResponse = await sdk_utils_1.default.sendMoney(sendMoneyRequest);
            const disbursementResponse = mojaloopResponse.map(resp => ({
                payeeInformation: resp.to,
                transferId: resp.transferId,
                currentState: resp.currentState,
                initiatedTimestamp: resp.initiatedTimestamp,
                completedTimestamp: resp.fulfil.body.completedTimestamp,
                payeeFspCommission: resp.quoteResponse.body.payeeFspCommission,
                payeeFspFee: resp.quoteResponse.body.payeeFspFee,
                payeeReceiveAmount: resp.quoteResponse.body.payeeReceiveAmount
            }));
            return h.response(disbursementResponse).code(200);
        }
        catch (err) {
            if (err instanceof validation_error_1.ValidationError) {
                const errorResponse = {
                    isProcessed: false,
                    errors: err.validationErrors
                };
                return h.response(errorResponse).code(406);
            }
            else {
                throw err;
            }
        }
        return h.response(response).code(200);
    }
    catch (e) {
        h.getLogger().error(e);
        return h.response().code(500);
    }
};
exports.default = {
    disbursement
};
//# sourceMappingURL=disbursement.js.map