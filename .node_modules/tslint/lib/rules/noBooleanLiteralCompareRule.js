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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (negate) {
        return "This expression is unnecessarily compared to a boolean. Just " + (negate ? "negate it" : "use it directly") + ".";
    };
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-boolean-literal-compare",
        description: "Warns on comparison to a boolean literal, as in `x === true`.",
        hasFix: true,
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Comparing boolean values to boolean literals is unnecessary, as those expressions will result in booleans too.\n            Just use the boolean values directly or negate them.\n        "], ["\n            Comparing boolean values to boolean literals is unnecessary, as those expressions will result in booleans too.\n            Just use the boolean values directly or negate them.\n        "]))),
        type: "style",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (utils.isBinaryExpression(node)) {
            var cmp = getBooleanComparison(node, checker);
            if (cmp !== undefined) {
                ctx.addFailureAtNode(cmp.expression, Rule.FAILURE_STRING(cmp.negate), fix(node, cmp));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function getBooleanComparison(node, checker) {
    var cmp = deconstructComparison(node);
    return cmp === undefined || !utils.isTypeFlagSet(checker.getTypeAtLocation(cmp.expression), ts.TypeFlags.Boolean) ? undefined : cmp;
}
function fix(node, _a) {
    var negate = _a.negate, expression = _a.expression;
    var deleted = node.left === expression
        ? Lint.Replacement.deleteFromTo(node.left.end, node.end)
        : Lint.Replacement.deleteFromTo(node.getStart(), node.right.getStart());
    if (!negate) {
        return deleted;
    }
    else if (needsParenthesesForNegate(expression)) {
        return [
            deleted,
            Lint.Replacement.appendText(node.getStart(), "!("),
            Lint.Replacement.appendText(node.getEnd(), ")"),
        ];
    }
    else {
        return [
            deleted,
            Lint.Replacement.appendText(node.getStart(), "!"),
        ];
    }
}
function needsParenthesesForNegate(node) {
    switch (node.kind) {
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.BinaryExpression:
            return true;
        default:
            return false;
    }
}
function deconstructComparison(node) {
    var left = node.left, operatorToken = node.operatorToken, right = node.right;
    var eq = Lint.getEqualsKind(operatorToken);
    if (eq === undefined) {
        return undefined;
    }
    var leftValue = booleanFromExpression(left);
    if (leftValue !== undefined) {
        return { negate: leftValue !== eq.isPositive, expression: right };
    }
    var rightValue = booleanFromExpression(right);
    if (rightValue !== undefined) {
        return { negate: rightValue !== eq.isPositive, expression: left };
    }
    return undefined;
}
function booleanFromExpression(node) {
    switch (node.kind) {
        case ts.SyntaxKind.TrueKeyword:
            return true;
        case ts.SyntaxKind.FalseKeyword:
            return false;
        default:
            return undefined;
    }
}
var templateObject_1;
