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
        ruleName: "no-return-await",
        description: "Disallows unnecessary `return await`.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            An async function always wraps the return value in a Promise.\n            Using `return await` just adds extra time before the overreaching promise is resolved without changing the semantics.\n        "], ["\n            An async function always wraps the return value in a Promise.\n            Using \\`return await\\` just adds extra time before the overreaching promise is resolved without changing the semantics.\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Unnecessary 'await'.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.AwaitExpression && isUnnecessaryAwait(node)) {
            var expression = node.expression;
            var keywordStart = expression.pos - "await".length;
            ctx.addFailure(keywordStart, expression.pos, Rule.FAILURE_STRING, Lint.Replacement.deleteFromTo(keywordStart, expression.getStart(ctx.sourceFile)));
        }
        return ts.forEachChild(node, cb);
    });
}
function isUnnecessaryAwait(node) {
    while (true) {
        var parent = node.parent;
        outer: switch (parent.kind) {
            case ts.SyntaxKind.ArrowFunction:
                return true;
            case ts.SyntaxKind.ReturnStatement:
                return !isInsideTryBlock(parent.parent);
            case ts.SyntaxKind.ParenthesizedExpression:
                break;
            case ts.SyntaxKind.ConditionalExpression:
                if (parent.condition === node) {
                    return false;
                }
                break;
            case ts.SyntaxKind.BinaryExpression:
                if (parent.right === node) {
                    switch (parent.operatorToken.kind) {
                        case ts.SyntaxKind.AmpersandAmpersandToken:
                        case ts.SyntaxKind.BarBarToken:
                        case ts.SyntaxKind.CommaToken:
                            break outer;
                    }
                }
                return false;
            default:
                return false;
        }
        node = parent;
    }
}
function isInsideTryBlock(node) {
    while (node.parent !== undefined) {
        if (tsutils_1.isFunctionScopeBoundary(node)) {
            return false;
        }
        if (tsutils_1.isTryStatement(node.parent)) {
            if (
            // statements inside the try block always have an error handler, either catch or finally
            node.parent.tryBlock === node ||
                // statement inside the catch block only have an error handler if there is a finally block
                node.parent.finallyBlock !== undefined && node.parent.catchClause === node) {
                return true;
            }
            node = node.parent.parent;
        }
        else {
            node = node.parent;
        }
    }
    return false;
}
var templateObject_1;
