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
export declare const rules: {
    "align": {
        options: string[];
    };
    "no-invalid-template-strings": boolean;
    "no-sparse-arrays": boolean;
    "no-object-literal-type-assertion": boolean;
    "prefer-conditional-expression": boolean;
    "prefer-object-spread": boolean;
    "no-duplicate-variable": (string | boolean)[];
    "no-this-assignment": boolean;
    "no-duplicate-imports": boolean;
    "space-within-parens": (number | boolean)[];
    "no-submodule-imports": boolean;
    "whitespace": {
        options: string[];
    };
    "ban-comma-operator": boolean;
    "jsdoc-format": {
        options: string;
    };
    "no-duplicate-switch-case": boolean;
    "no-implicit-dependencies": boolean;
    "no-return-await": boolean;
};
declare const xtends = "tslint:recommended";
export { xtends as extends };
