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
var Lint = require("../../index");
// tslint:disable: object-literal-sort-keys
exports.codeExamples = [
    {
        description: "Require curly braces whenever possible (default)",
        config: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"curly\": true }\n        "], ["\n            \"rules\": { \"curly\": true }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            if (x > 0) {\n                doStuff();\n            }\n        "], ["\n            if (x > 0) {\n                doStuff();\n            }\n        "]))),
        fail: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            if (x > 0)\n                doStuff();\n\n            if (x > 0) doStuff();\n        "], ["\n            if (x > 0)\n                doStuff();\n\n            if (x > 0) doStuff();\n        "]))),
    },
    {
        description: "Make an exception for single-line instances",
        config: Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"curly\": [true, \"ignore-same-line\"] }\n        "], ["\n            \"rules\": { \"curly\": [true, \"ignore-same-line\"] }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n            if (x > 0) doStuff();\n        "], ["\n            if (x > 0) doStuff();\n        "]))),
        fail: Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n            if (x > 0)\n                doStuff()\n        "], ["\n            if (x > 0)\n                doStuff()\n        "]))),
    },
    {
        description: "Error on unnecessary curly braces",
        config: Lint.Utils.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"curly\": [true, \"as-needed\"] }\n        "], ["\n            \"rules\": { \"curly\": [true, \"as-needed\"] }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n            if (x > 0)\n                doStuff();\n\n            if (x > 0) {\n                customerUpdates.push(getInfo(customerId));\n                return customerUpdates;\n            }\n        "], ["\n            if (x > 0)\n                doStuff();\n\n            if (x > 0) {\n                customerUpdates.push(getInfo(customerId));\n                return customerUpdates;\n            }\n        "]))),
        fail: Lint.Utils.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n            if (x > 0) {\n                doStuff();\n            }\n        "], ["\n            if (x > 0) {\n                doStuff();\n            }\n        "]))),
    },
];
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
