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
const central_services_shared_1 = require("@mojaloop/central-services-shared");
const health_1 = tslib_1.__importDefault(require("./health"));
const disbursement_1 = tslib_1.__importDefault(require("./disbursement"));
const OpenapiBackend = central_services_shared_1.Util.OpenapiBackend;
exports.default = {
    HealthGet: health_1.default.get,
    Disbursement: disbursement_1.default.disbursement,
    validationFail: OpenapiBackend.validationFail,
    notFound: OpenapiBackend.notFound,
    methodNotAllowed: OpenapiBackend.methodNotAllowed
};
//# sourceMappingURL=index.js.map