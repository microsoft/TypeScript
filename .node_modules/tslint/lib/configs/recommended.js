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
exports.rules = {
    "adjacent-overload-signatures": true,
    "align": {
        options: [
            "parameters",
            "statements",
        ],
    },
    "array-type": {
        options: ["array-simple"],
    },
    "arrow-parens": true,
    "arrow-return-shorthand": true,
    "ban-types": {
        options: [
            ["Object", "Avoid using the `Object` type. Did you mean `object`?"],
            ["Function", "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."],
            ["Boolean", "Avoid using the `Boolean` type. Did you mean `boolean`?"],
            ["Number", "Avoid using the `Number` type. Did you mean `number`?"],
            ["String", "Avoid using the `String` type. Did you mean `string`?"],
            ["Symbol", "Avoid using the `Symbol` type. Did you mean `symbol`?"],
        ],
    },
    "callable-types": true,
    "class-name": true,
    "comment-format": {
        options: ["check-space"],
    },
    "curly": true,
    "cyclomatic-complexity": false,
    "eofline": true,
    "forin": true,
    "import-spacing": true,
    "indent": {
        options: ["spaces"],
    },
    "interface-name": {
        options: ["always-prefix"],
    },
    "interface-over-type-literal": true,
    "jsdoc-format": true,
    "label-position": true,
    "max-classes-per-file": {
        options: [1],
    },
    "max-line-length": {
        options: [120],
    },
    "member-access": true,
    "member-ordering": {
        options: {
            order: "statics-first",
        },
    },
    "new-parens": true,
    "no-angle-bracket-type-assertion": true,
    "no-any": false,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-consecutive-blank-lines": true,
    "no-console": true,
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-empty": true,
    "no-empty-interface": true,
    "no-eval": true,
    "no-internal-module": true,
    "no-invalid-this": false,
    "no-misused-new": true,
    "no-namespace": true,
    "no-parameter-properties": false,
    "no-reference": true,
    "no-reference-import": true,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-string-throw": true,
    "no-switch-case-fall-through": false,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unsafe-finally": true,
    "no-unused-expression": true,
    // disable this rule as it is very heavy performance-wise and not that useful
    "no-use-before-declare": false,
    "no-var-keyword": true,
    "no-var-requires": true,
    "object-literal-key-quotes": {
        options: ["consistent-as-needed"],
    },
    "object-literal-shorthand": true,
    "object-literal-sort-keys": true,
    "one-line": {
        options: [
            "check-catch",
            "check-else",
            "check-finally",
            "check-open-brace",
            "check-whitespace",
        ],
    },
    "one-variable-per-declaration": {
        options: ["ignore-for-loop"],
    },
    "only-arrow-functions": {
        options: [
            "allow-declarations",
            "allow-named-functions",
        ],
    },
    "ordered-imports": {
        options: {
            "import-sources-order": "case-insensitive",
            "module-source-path": "full",
            "named-imports-order": "case-insensitive",
        },
    },
    "prefer-const": true,
    "prefer-for-of": true,
    "quotemark": {
        options: [
            "double",
            "avoid-escape",
        ],
    },
    "radix": true,
    "semicolon": {
        options: ["always"],
    },
    "space-before-function-paren": {
        options: {
            anonymous: "never",
            asyncArrow: "always",
            constructor: "never",
            method: "never",
            named: "never",
        },
    },
    "trailing-comma": {
        options: {
            multiline: "always",
            singleline: "never",
        },
    },
    "triple-equals": {
        options: ["allow-null-check"],
    },
    "typedef": false,
    "typedef-whitespace": {
        options: [
            {
                "call-signature": "nospace",
                "index-signature": "nospace",
                "parameter": "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace",
            },
            {
                "call-signature": "onespace",
                "index-signature": "onespace",
                "parameter": "onespace",
                "property-declaration": "onespace",
                "variable-declaration": "onespace",
            },
        ],
    },
    "typeof-compare": false,
    "unified-signatures": true,
    "use-isnan": true,
    "variable-name": {
        options: [
            "ban-keywords",
            "check-format",
            "allow-pascal-case",
        ],
    },
    "whitespace": {
        options: [
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast",
        ],
    },
};
exports.jsRules = {
    "align": {
        options: [
            "parameters",
            "statements",
        ],
    },
    "class-name": true,
    "curly": true,
    "eofline": true,
    "forin": true,
    "import-spacing": true,
    "indent": {
        options: ["spaces"],
    },
    "jsdoc-format": true,
    "label-position": true,
    "max-line-length": {
        options: [120],
    },
    "new-parens": true,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-consecutive-blank-lines": true,
    "no-console": true,
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-duplicate-variable": true,
    "no-empty": true,
    "no-eval": true,
    "no-reference": true,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-string-throw": true,
    "no-switch-case-fall-through": false,
    "no-trailing-whitespace": true,
    "no-unused-expression": true,
    // disable this rule as it is very heavy performance-wise and not that useful
    "no-use-before-declare": false,
    "object-literal-sort-keys": true,
    "one-line": {
        options: [
            "check-catch",
            "check-else",
            "check-finally",
            "check-open-brace",
            "check-whitespace",
        ],
    },
    "one-variable-per-declaration": {
        options: ["ignore-for-loop"],
    },
    "quotemark": {
        options: [
            "double",
            "avoid-escape",
        ],
    },
    "radix": true,
    "semicolon": {
        options: ["always"],
    },
    "space-before-function-paren": {
        options: {
            anonymous: "never",
            asyncArrow: "always",
            constructor: "never",
            method: "never",
            named: "never",
        },
    },
    "trailing-comma": {
        options: {
            multiline: "always",
            singleline: "never",
        },
    },
    "triple-equals": {
        options: ["allow-null-check"],
    },
    "use-isnan": true,
    "variable-name": {
        options: [
            "ban-keywords",
            "check-format",
            "allow-pascal-case",
        ],
    },
    "whitespace": {
        options: [
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast",
        ],
    },
};
