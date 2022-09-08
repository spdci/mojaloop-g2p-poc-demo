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
const rc_1 = tslib_1.__importDefault(require("rc"));
const parse_strings_in_object_1 = tslib_1.__importDefault(require("parse-strings-in-object"));
const default_json_1 = tslib_1.__importDefault(require("../../config/default.json"));
const package_json_1 = tslib_1.__importDefault(require("../../package.json"));
const RC = (0, parse_strings_in_object_1.default)((0, rc_1.default)('GOV_CORE_CONNECTOR', default_json_1.default));
exports.default = {
    ...RC,
    PACKAGE: package_json_1.default
};
//# sourceMappingURL=config.js.map