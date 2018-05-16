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
    "adjacent-overload-signatures": boolean;
    "align": {
        options: string[];
    };
    "array-type": {
        options: string[];
    };
    "arrow-parens": boolean;
    "arrow-return-shorthand": boolean;
    "ban-types": {
        options: string[][];
    };
    "callable-types": boolean;
    "class-name": boolean;
    "comment-format": {
        options: string[];
    };
    "curly": boolean;
    "cyclomatic-complexity": boolean;
    "eofline": boolean;
    "forin": boolean;
    "import-spacing": boolean;
    "indent": {
        options: string[];
    };
    "interface-name": {
        options: string[];
    };
    "interface-over-type-literal": boolean;
    "jsdoc-format": boolean;
    "label-position": boolean;
    "max-classes-per-file": {
        options: number[];
    };
    "max-line-length": {
        options: number[];
    };
    "member-access": boolean;
    "member-ordering": {
        options: {
            order: string;
        };
    };
    "new-parens": boolean;
    "no-angle-bracket-type-assertion": boolean;
    "no-any": boolean;
    "no-arg": boolean;
    "no-bitwise": boolean;
    "no-conditional-assignment": boolean;
    "no-consecutive-blank-lines": boolean;
    "no-console": boolean;
    "no-construct": boolean;
    "no-debugger": boolean;
    "no-duplicate-super": boolean;
    "no-empty": boolean;
    "no-empty-interface": boolean;
    "no-eval": boolean;
    "no-internal-module": boolean;
    "no-invalid-this": boolean;
    "no-misused-new": boolean;
    "no-namespace": boolean;
    "no-parameter-properties": boolean;
    "no-reference": boolean;
    "no-reference-import": boolean;
    "no-shadowed-variable": boolean;
    "no-string-literal": boolean;
    "no-string-throw": boolean;
    "no-switch-case-fall-through": boolean;
    "no-trailing-whitespace": boolean;
    "no-unnecessary-initializer": boolean;
    "no-unsafe-finally": boolean;
    "no-unused-expression": boolean;
    "no-use-before-declare": boolean;
    "no-var-keyword": boolean;
    "no-var-requires": boolean;
    "object-literal-key-quotes": {
        options: string[];
    };
    "object-literal-shorthand": boolean;
    "object-literal-sort-keys": boolean;
    "one-line": {
        options: string[];
    };
    "one-variable-per-declaration": {
        options: string[];
    };
    "only-arrow-functions": {
        options: string[];
    };
    "ordered-imports": {
        options: {
            "import-sources-order": string;
            "module-source-path": string;
            "named-imports-order": string;
        };
    };
    "prefer-const": boolean;
    "prefer-for-of": boolean;
    "quotemark": {
        options: string[];
    };
    "radix": boolean;
    "semicolon": {
        options: string[];
    };
    "space-before-function-paren": {
        options: {
            anonymous: string;
            asyncArrow: string;
            constructor: string;
            method: string;
            named: string;
        };
    };
    "trailing-comma": {
        options: {
            multiline: string;
            singleline: string;
        };
    };
    "triple-equals": {
        options: string[];
    };
    "typedef": boolean;
    "typedef-whitespace": {
        options: {
            "call-signature": string;
            "index-signature": string;
            "parameter": string;
            "property-declaration": string;
            "variable-declaration": string;
        }[];
    };
    "typeof-compare": boolean;
    "unified-signatures": boolean;
    "use-isnan": boolean;
    "variable-name": {
        options: string[];
    };
    "whitespace": {
        options: string[];
    };
};
export declare const jsRules: {
    "align": {
        options: string[];
    };
    "class-name": boolean;
    "curly": boolean;
    "eofline": boolean;
    "forin": boolean;
    "import-spacing": boolean;
    "indent": {
        options: string[];
    };
    "jsdoc-format": boolean;
    "label-position": boolean;
    "max-line-length": {
        options: number[];
    };
    "new-parens": boolean;
    "no-arg": boolean;
    "no-bitwise": boolean;
    "no-conditional-assignment": boolean;
    "no-consecutive-blank-lines": boolean;
    "no-console": boolean;
    "no-construct": boolean;
    "no-debugger": boolean;
    "no-duplicate-super": boolean;
    "no-duplicate-variable": boolean;
    "no-empty": boolean;
    "no-eval": boolean;
    "no-reference": boolean;
    "no-shadowed-variable": boolean;
    "no-string-literal": boolean;
    "no-string-throw": boolean;
    "no-switch-case-fall-through": boolean;
    "no-trailing-whitespace": boolean;
    "no-unused-expression": boolean;
    "no-use-before-declare": boolean;
    "object-literal-sort-keys": boolean;
    "one-line": {
        options: string[];
    };
    "one-variable-per-declaration": {
        options: string[];
    };
    "quotemark": {
        options: string[];
    };
    "radix": boolean;
    "semicolon": {
        options: string[];
    };
    "space-before-function-paren": {
        options: {
            anonymous: string;
            asyncArrow: string;
            constructor: string;
            method: string;
            named: string;
        };
    };
    "trailing-comma": {
        options: {
            multiline: string;
            singleline: string;
        };
    };
    "triple-equals": {
        options: string[];
    };
    "use-isnan": boolean;
    "variable-name": {
        options: string[];
    };
    "whitespace": {
        options: string[];
    };
};
