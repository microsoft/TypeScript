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
var utils_1 = require("../language/utils");
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
        ruleName: "binary-expression-operand-order",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            In a binary expression, a literal should always be on the right-hand side if possible.\n            For example, prefer 'x + 1' over '1 + x'."], ["\n            In a binary expression, a literal should always be on the right-hand side if possible.\n            For example, prefer 'x + 1' over '1 + x'."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Expressions like `1 + x` are sometimes referred to as \"Yoda\" expressions because they read\n            opposite to how we would normally speak the expression.\n\n            Sticking to a consistent grammar for conditions helps keep code readable and understandable.\n        "], ["\n            Expressions like \\`1 + x\\` are sometimes referred to as \"Yoda\" expressions because they read\n            opposite to how we would normally speak the expression.\n\n            Sticking to a consistent grammar for conditions helps keep code readable and understandable.\n        "]))),
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Literal expression should be on the right-hand side of a binary expression.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node) && isLiteral(node.left) && !isLiteral(node.right) && !isAllowedOrderedOperator(node)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        ts.forEachChild(node, cb);
    });
}
/** Allows certain inherently ordered operators that can't easily be written with the literal on the right. */
function isAllowedOrderedOperator(node) {
    switch (node.operatorToken.kind) {
        case ts.SyntaxKind.PlusToken:
            // Allow `"foo" + x` but not `1 + x`.
            return node.left.kind === ts.SyntaxKind.StringLiteral;
        case ts.SyntaxKind.MinusToken:
        case ts.SyntaxKind.SlashToken:
        case ts.SyntaxKind.PercentToken:
        case ts.SyntaxKind.LessThanLessThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        case ts.SyntaxKind.AsteriskAsteriskToken:
        case ts.SyntaxKind.InKeyword:
        case ts.SyntaxKind.CommaToken:
            return true;
        default:
            return false;
    }
}
function isLiteral(node) {
    switch (node.kind) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.NullKeyword:
            return true;
        case ts.SyntaxKind.Identifier:
            return node.originalKeywordKind === ts.SyntaxKind.UndefinedKeyword;
        case ts.SyntaxKind.PrefixUnaryExpression:
            return utils_1.isNegativeNumberLiteral(node);
        case ts.SyntaxKind.ParenthesizedExpression:
            return isLiteral(node.expression);
        default:
            return false;
    }
}
var templateObject_1, templateObject_2;
