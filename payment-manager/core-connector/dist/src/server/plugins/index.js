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
const inert_1 = tslib_1.__importDefault(require("@hapi/inert"));
const vision_1 = tslib_1.__importDefault(require("@hapi/vision"));
const central_services_error_handling_1 = tslib_1.__importDefault(require("@mojaloop/central-services-error-handling"));
const central_services_shared_1 = require("@mojaloop/central-services-shared");
const openAPI_1 = tslib_1.__importDefault(require("./openAPI"));
const apiDoc_1 = tslib_1.__importDefault(require("./apiDoc"));
const state_1 = require("./state");
async function register(server) {
    const openapiBackend = await openAPI_1.default.initialize();
    const plugins = [
        state_1.StatePlugin,
        apiDoc_1.default,
        central_services_shared_1.Util.Hapi.OpenapiBackendValidator,
        openapiBackend,
        inert_1.default,
        vision_1.default,
        central_services_error_handling_1.default,
        central_services_shared_1.Util.Hapi.HapiEventPlugin
    ];
    await server.register(plugins);
    // use as a catch-all handler
    server.route({
        method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        path: '/{path*}',
        handler: (req, h) => openapiBackend.options.openapi.handleRequest({
            method: req.method,
            path: req.path,
            body: req.payload,
            query: req.query,
            headers: req.headers
        }, req, h)
    });
    return server;
}
exports.default = {
    register
};
//# sourceMappingURL=index.js.map