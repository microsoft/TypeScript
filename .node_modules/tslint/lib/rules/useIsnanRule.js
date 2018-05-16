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
        ruleName: "use-isnan",
        description: "Enforces use of the `isNaN()` function to check for NaN references instead of a comparison to the `NaN` constant.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Since `NaN !== NaN`, comparisons with regular operators will produce unexpected results.\n            So, instead of `if (myVar === NaN)`, do `if (isNaN(myVar))`."], ["\n            Since \\`NaN !== NaN\\`, comparisons with regular operators will produce unexpected results.\n            So, instead of \\`if (myVar === NaN)\\`, do \\`if (isNaN(myVar))\\`."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Found an invalid comparison for NaN: ";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node)) {
            switch (node.operatorToken.kind) {
                case ts.SyntaxKind.LessThanToken:
                case ts.SyntaxKind.GreaterThanToken:
                case ts.SyntaxKind.LessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanEqualsToken:
                case ts.SyntaxKind.EqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsToken:
                case ts.SyntaxKind.EqualsEqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                    if (isExpressionNaN(node.right) || isExpressionNaN(node.left)) {
                        ctx.addFailureAtNode(node, Rule.FAILURE_STRING + node.getText(ctx.sourceFile));
                    }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function isExpressionNaN(node) {
    return node.kind === ts.SyntaxKind.Identifier && node.text === "NaN";
}
var templateObject_1;
