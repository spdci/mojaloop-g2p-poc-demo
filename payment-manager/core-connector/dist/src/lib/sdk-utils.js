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
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = tslib_1.__importDefault(require("../shared/config"));
const assert_1 = tslib_1.__importDefault(require("assert"));
const transactionRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069';
const sendMoney = async (sendMoneyRequest) => {
    var _a;
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
            };
            const transferURI = `${config_1.default.OUTBOUND_ENDPOINT}/transfers`;
            const resp = await axios_1.default.post(transferURI, transferRequest);
            assert_1.default.equal(resp.status, 200);
            transferResponse.push(resp.data);
        }
        catch (err) {
            transferResponse.push({
                error: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message
            });
        }
    }
    return transferResponse;
};
exports.default = {
    sendMoney
};
//# sourceMappingURL=sdk-utils.js.map