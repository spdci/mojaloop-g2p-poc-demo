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
const central_services_shared_1 = tslib_1.__importDefault(require("@mojaloop/central-services-shared"));
const config_1 = tslib_1.__importDefault(require("../../shared/config"));
const healthCheck = new central_services_shared_1.default.HealthCheck.HealthCheck(config_1.default.PACKAGE, []);
/**
 * Operations on /health
 */
/**
 * summary: Get Server
 * description: The HTTP request GET /health is used to return the current status of the API.
 * parameters:
 * produces: application/json
 * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
 */
const get = async (_context, _request, h) => {
    const response = await healthCheck.getHealth();
    response.LoggerPresent = typeof h.getLogger() !== 'undefined';
    return h.response(response).code(200);
};
exports.default = {
    get
};
//# sourceMappingURL=health.js.map