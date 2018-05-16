"use strict";
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
// tslint:disable object-literal-sort-keys
// tslint:disable:object-literal-key-quotes
exports.rules = {
    // added in v5.1
    "align": {
        options: [
            "parameters",
            "statements",
            "members",
        ],
    },
    "no-invalid-template-strings": true,
    "no-sparse-arrays": true,
    // added in v5.2
    "no-object-literal-type-assertion": true,
    // added in v5.3
    "prefer-conditional-expression": true,
    "prefer-object-spread": true,
    // added in v5.4
    "no-duplicate-variable": [
        true,
        "check-parameters",
    ],
    // added in v5.5
    "no-this-assignment": true,
    // added in v5.6
    "no-duplicate-imports": true,
    "space-within-parens": [true, 0],
    "no-submodule-imports": true,
    // added in v5.7
    "whitespace": {
        options: [
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast",
            "check-type-operator",
            "check-rest-spread",
        ],
    },
    // added in v5.8
    "ban-comma-operator": true,
    "jsdoc-format": {
        options: "check-multiline-start",
    },
    "no-duplicate-switch-case": true,
    "no-implicit-dependencies": true,
    "no-return-await": true,
};
// tslint:enable object-literal-sort-keys
// work around "extends" being a keyword
var xtends = "tslint:recommended";
exports.extends = xtends;
