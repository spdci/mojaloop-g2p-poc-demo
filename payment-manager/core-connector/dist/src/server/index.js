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
// workaround for lack of typescript types for mojaloop dependencies
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../ambient.d.ts"/>
const hapi_1 = require("@hapi/hapi");
const extensions_1 = tslib_1.__importDefault(require("./extensions"));
const plugins_1 = tslib_1.__importDefault(require("./plugins"));
const onValidateFail_1 = tslib_1.__importDefault(require("./handlers/onValidateFail"));
const central_services_logger_1 = tslib_1.__importDefault(require("@mojaloop/central-services-logger"));
const central_services_error_handling_1 = require("@mojaloop/central-services-error-handling");
async function _create(config) {
    const server = await new hapi_1.Server({
        host: config.HOST,
        port: config.LISTEN_PORT,
        routes: {
            validate: {
                options: (0, central_services_error_handling_1.validateRoutes)(),
                failAction: onValidateFail_1.default
            },
            cors: {
                origin: config.CORS_WHITELIST,
                credentials: config.ALLOW_CREDENTIALS
            }
        }
    });
    return server;
}
async function _start(server) {
    central_services_logger_1.default.info(`thirdparty-core-connector is running @ ${server.info.uri}`);
    await server.start();
    return server;
}
async function run(config) {
    const server = await _create(config);
    await plugins_1.default.register(server);
    await extensions_1.default.register(server);
    return _start(server);
}
exports.default = {
    run
};
//# sourceMappingURL=index.js.map