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
// with due reference to https://github.com/Microsoft/TypeScript/blob/7813121c4d77e50aad0eed3152ef1f1156c7b574/scripts/tslint/noNullRule.ts
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-null-keyword",
        description: "Disallows use of the `null` keyword literal.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Instead of having the dual concepts of `null` and`undefined` in a codebase,\n            this rule ensures that only `undefined` is used.\n\n            JavaScript originally intended `undefined` to refer to a value that doesn't yet exist,\n            while `null` was meant to refer to a value that does exist but points to nothing.\n            That's confusing.\n            `undefined` is the default value when object members don't exist, and is the return value\n            for newer native collection APIs such as `Map.get` when collection values don't exist.\n\n            ```\n            const myObject = {};\n            myObject.doesNotExist; // undefined\n            ```\n\n            ```\n            const myMap = new Map<string, number>();\n            myMap.get(\"doesNotExist\"); // undefined\n            ```\n\n            To remove confusion over the two similar values, it's better to stick with just `undefined`.\n        "], ["\n            Instead of having the dual concepts of \\`null\\` and\\`undefined\\` in a codebase,\n            this rule ensures that only \\`undefined\\` is used.\n\n            JavaScript originally intended \\`undefined\\` to refer to a value that doesn't yet exist,\n            while \\`null\\` was meant to refer to a value that does exist but points to nothing.\n            That's confusing.\n            \\`undefined\\` is the default value when object members don't exist, and is the return value\n            for newer native collection APIs such as \\`Map.get\\` when collection values don't exist.\n\n            \\`\\`\\`\n            const myObject = {};\n            myObject.doesNotExist; // undefined\n            \\`\\`\\`\n\n            \\`\\`\\`\n            const myMap = new Map<string, number>();\n            myMap.get(\"doesNotExist\"); // undefined\n            \\`\\`\\`\n\n            To remove confusion over the two similar values, it's better to stick with just \\`undefined\\`.\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use 'undefined' instead of 'null'";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (tsutils_1.isTypeNodeKind(node.kind)) {
            return; // skip type nodes
        }
        if (node.kind !== ts.SyntaxKind.NullKeyword) {
            return ts.forEachChild(node, cb);
        }
        var parent = node.parent;
        var eq;
        if (tsutils_1.isBinaryExpression(parent)) {
            eq = Lint.getEqualsKind(parent.operatorToken);
        }
        if (eq === undefined) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        else if (!eq.isStrict) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING, Lint.Replacement.replaceNode(node, "undefined", ctx.sourceFile));
        }
    }
}
var templateObject_1;
