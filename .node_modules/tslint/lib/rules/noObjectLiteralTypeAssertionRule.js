"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
        ruleName: "no-object-literal-type-assertion",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Forbids an object literal to appear in a type assertion expression.\n            Casting to `any` is still allowed."], ["\n            Forbids an object literal to appear in a type assertion expression.\n            Casting to \\`any\\` is still allowed."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Always prefer `const x: T = { ... };` to `const x = { ... } as T;`.\n            The type assertion in the latter case is either unnecessary or hides an error.\n            The compiler will warn for excess properties with this syntax, but not missing required fields.\n            For example: `const x: { foo: number } = {}` will fail to compile, but\n            `const x = {} as { foo: number }` will succeed."], ["\n            Always prefer \\`const x: T = { ... };\\` to \\`const x = { ... } as T;\\`.\n            The type assertion in the latter case is either unnecessary or hides an error.\n            The compiler will warn for excess properties with this syntax, but not missing required fields.\n            For example: \\`const x: { foo: number } = {}\\` will fail to compile, but\n            \\`const x = {} as { foo: number }\\` will succeed."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Type assertion on object literals is forbidden, use a type annotation instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isAssertionExpression(node) && node.type.kind !== ts.SyntaxKind.AnyKeyword &&
            tsutils_1.isObjectLiteralExpression(tsutils_1.isParenthesizedExpression(node.expression) ? node.expression.expression : node.expression)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1, templateObject_2;
