"use strict";
/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
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
var ALLOW_FAST_NULL_CHECKS = "allow-fast-null-checks";
var ALLOW_NEW = "allow-new";
var ALLOW_TAGGED_TEMPLATE = "allow-tagged-template";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            allowFastNullChecks: this.ruleArguments.indexOf(ALLOW_FAST_NULL_CHECKS) !== -1,
            allowNew: this.ruleArguments.indexOf(ALLOW_NEW) !== -1,
            allowTaggedTemplate: this.ruleArguments.indexOf(ALLOW_TAGGED_TEMPLATE) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unused-expression",
        description: "Disallows unused expression statements.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Unused expressions are expression statements which are not assignments or function calls\n            (and thus usually no-ops)."], ["\n            Unused expressions are expression statements which are not assignments or function calls\n            (and thus usually no-ops)."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Detects potential errors where an assignment or function call was intended."], ["\n            Detects potential errors where an assignment or function call was intended."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            Two arguments may be optionally provided:\n\n            * `", "` allows to use logical operators to perform fast null checks and perform\n            method or function calls for side effects (e.g. `e && e.preventDefault()`).\n            * `", "` allows 'new' expressions for side effects (e.g. `new ModifyGlobalState();`.\n            * `", "` allows tagged templates for side effects (e.g. `this.add\\`foo\\`;`."], ["\n            Two arguments may be optionally provided:\n\n            * \\`", "\\` allows to use logical operators to perform fast null checks and perform\n            method or function calls for side effects (e.g. \\`e && e.preventDefault()\\`).\n            * \\`", "\\` allows 'new' expressions for side effects (e.g. \\`new ModifyGlobalState();\\`.\n            * \\`", "\\` allows tagged templates for side effects (e.g. \\`this.add\\\\\\`foo\\\\\\`;\\`."])), ALLOW_FAST_NULL_CHECKS, ALLOW_NEW, ALLOW_TAGGED_TEMPLATE),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [ALLOW_FAST_NULL_CHECKS, ALLOW_NEW, ALLOW_TAGGED_TEMPLATE],
            },
            minLength: 0,
            maxLength: 3,
        },
        optionExamples: [true, [true, ALLOW_FAST_NULL_CHECKS]],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "unused expression, expected an assignment or function call";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var checking = false;
    var allowFastNullChecks = true;
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (checking) {
            if (tsutils_1.isParenthesizedExpression(node) || tsutils_1.isVoidExpression(node)) {
                return cb(node.expression);
            }
            else if (tsutils_1.isConditionalExpression(node)) {
                noCheck(node.condition, cb);
                return both(node.whenTrue, node.whenFalse);
            }
            else if (tsutils_1.isBinaryExpression(node)) {
                switch (node.operatorToken.kind) {
                    case ts.SyntaxKind.CommaToken:
                        if (isIndirectEval(node)) {
                            return false;
                        }
                        return both(node.left, node.right);
                    case ts.SyntaxKind.AmpersandAmpersandToken:
                    case ts.SyntaxKind.BarBarToken:
                        if (allowFastNullChecks) {
                            noCheck(node.left, cb);
                            return cb(node.right);
                        }
                }
            }
            noCheck(node, forEachChild);
            return isUnusedExpression(node, ctx.options);
        }
        if (tsutils_1.isExpressionStatement(node)) {
            allowFastNullChecks = ctx.options.allowFastNullChecks;
            if (!isDirective(node)) {
                check(node.expression, node);
            }
            allowFastNullChecks = true;
            return false;
        }
        else if (tsutils_1.isVoidExpression(node)) {
            // allow `void 0` and `void(0)`
            if (!isLiteralZero(tsutils_1.isParenthesizedExpression(node.expression) ? node.expression.expression : node.expression)) {
                check(node.expression);
            }
            return false;
        }
        else if (tsutils_1.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken && !isIndirectEval(node)) {
            check(node.left);
            return cb(node.right);
        }
        return ts.forEachChild(node, cb);
    }
    function forEachChild(node) {
        return ts.forEachChild(node, cb);
    }
    function check(node, failNode) {
        checking = true;
        if (cb(node)) {
            ctx.addFailureAtNode(failNode === undefined ? node : failNode, Rule.FAILURE_STRING);
        }
        checking = false;
    }
    function noCheck(node, callback) {
        var old = allowFastNullChecks;
        checking = false;
        allowFastNullChecks = true;
        callback(node);
        allowFastNullChecks = old;
        checking = true;
    }
    function both(one, two) {
        if (cb(one)) {
            if (cb(two)) {
                return true;
            }
            else {
                ctx.addFailureAtNode(one, Rule.FAILURE_STRING);
            }
        }
        else if (cb(two)) {
            ctx.addFailureAtNode(two, Rule.FAILURE_STRING);
        }
        return false;
    }
}
function isUnusedExpression(node, options) {
    switch (node.kind) {
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.YieldExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.PostfixUnaryExpression:
            return false;
        case ts.SyntaxKind.NewExpression:
            return !options.allowNew;
        case ts.SyntaxKind.TaggedTemplateExpression:
            return !options.allowTaggedTemplate;
        case ts.SyntaxKind.BinaryExpression:
            return !tsutils_1.isAssignmentKind(node.operatorToken.kind);
        case ts.SyntaxKind.PrefixUnaryExpression:
            return node.operator !== ts.SyntaxKind.PlusPlusToken &&
                node.operator !== ts.SyntaxKind.MinusMinusToken;
        default:
            return true;
    }
}
function isLiteralZero(node) {
    return tsutils_1.isNumericLiteral(node) && node.text === "0";
}
function isIndirectEval(node) {
    return tsutils_1.isIdentifier(node.right) && node.right.text === "eval" &&
        isLiteralZero(node.left) &&
        node.parent.kind === ts.SyntaxKind.ParenthesizedExpression &&
        node.parent.parent.kind === ts.SyntaxKind.CallExpression;
}
function isDirective(node) {
    if (node.expression.kind !== ts.SyntaxKind.StringLiteral || !canContainDirective(node.parent)) {
        return false;
    }
    var parent = node.parent;
    // check if all previous statements in block are also directives
    for (var i = parent.statements.indexOf(node) - 1; i >= 0; --i) {
        var statement = parent.statements[i];
        if (!tsutils_1.isExpressionStatement(statement) || statement.expression.kind !== ts.SyntaxKind.StringLiteral) {
            return false;
        }
    }
    return true;
}
function canContainDirective(node) {
    switch (node.kind) {
        case ts.SyntaxKind.SourceFile:
        case ts.SyntaxKind.ModuleBlock:
            return true;
        case ts.SyntaxKind.Block:
            switch (node.parent.kind) {
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}
var templateObject_1, templateObject_2, templateObject_3;
