"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Utils = require("../utils");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var failuresJSON = failures.map(function (failure) { return failure.toJson(); });
        return JSON.stringify(failuresJSON);
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "json",
        description: "Formats errors as simple JSON.",
        sample: Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        [\n            {\n                \"endPosition\": {\n                    \"character\": 13,\n                    \"line\": 0,\n                    \"position\": 13\n                },\n                \"failure\": \"Missing semicolon\",\n                \"fix\": {\n                    \"innerStart\": 13,\n                    \"innerLength\": 0,\n                    \"innerText\": \";\"\n                },\n                \"name\": \"myFile.ts\",\n                \"ruleName\": \"semicolon\",\n                \"startPosition\": {\n                    \"character\": 13,\n                    \"line\": 0,\n                    \"position\": 13\n                }\n            }\n        ]"], ["\n        [\n            {\n                \"endPosition\": {\n                    \"character\": 13,\n                    \"line\": 0,\n                    \"position\": 13\n                },\n                \"failure\": \"Missing semicolon\",\n                \"fix\": {\n                    \"innerStart\": 13,\n                    \"innerLength\": 0,\n                    \"innerText\": \";\"\n                },\n                \"name\": \"myFile.ts\",\n                \"ruleName\": \"semicolon\",\n                \"startPosition\": {\n                    \"character\": 13,\n                    \"line\": 0,\n                    \"position\": 13\n                }\n            }\n        ]"]))),
        consumer: "machine",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1;
