"use strict";
/**
 * @license
 * Copyright 2018 Palantir Technologies, Inc.
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
        description: "Prefer `while` loops instead of `for` loops without an initializer and incrementor.",
        config: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"prefer-while\": true }\n        "], ["\n            \"rules\": { \"prefer-while\": true }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            for(let x = 1; x < 10; x++) {\n                console.log(x);\n            }\n\n            for (let i = 0; i < 10; x+=1) {\n                console.log(x);\n            }\n\n            for (let i = 0; i < 10;) {\n                i += 1;\n            }\n        "], ["\n            for(let x = 1; x < 10; x++) {\n                console.log(x);\n            }\n\n            for (let i = 0; i < 10; x+=1) {\n                console.log(x);\n            }\n\n            for (let i = 0; i < 10;) {\n                i += 1;\n            }\n        "]))),
        fail: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            for(;;) {\n                console.log(x);\n            }\n\n            for(;true===true;) {\n                console.log(x);\n            }\n        "], ["\n            for(;;) {\n                console.log(x);\n            }\n\n            for(;true===true;) {\n                console.log(x);\n            }\n        "]))),
    },
];
var templateObject_1, templateObject_2, templateObject_3;
