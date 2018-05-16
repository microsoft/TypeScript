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
    Rule.FAILURE_STRING = function (name) {
        return "'" + name + "' statements in finally blocks are forbidden.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unsafe-finally",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows control flow statements, such as `return`, `continue`,\n            `break` and `throws` in finally blocks."], ["\n            Disallows control flow statements, such as \\`return\\`, \\`continue\\`,\n            \\`break\\` and \\`throws\\` in finally blocks."]))),
        descriptionDetails: "",
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            When used inside `finally` blocks, control flow statements,\n            such as `return`, `continue`, `break` and `throws`\n            override any other control flow statements in the same try/catch scope.\n            This is confusing and unexpected behavior."], ["\n            When used inside \\`finally\\` blocks, control flow statements,\n            such as \\`return\\`, \\`continue\\`, \\`break\\` and \\`throws\\`\n            override any other control flow statements in the same try/catch scope.\n            This is confusing and unexpected behavior."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var inFinally = false;
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.TryStatement:
                var _a = node, tryBlock = _a.tryBlock, catchClause = _a.catchClause, finallyBlock = _a.finallyBlock;
                ts.forEachChild(tryBlock, cb);
                if (catchClause !== undefined) {
                    ts.forEachChild(catchClause, cb);
                }
                if (finallyBlock !== undefined) {
                    var old = inFinally;
                    inFinally = true;
                    cb(finallyBlock);
                    inFinally = old;
                }
                break;
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ReturnStatement:
                if (inFinally && !jumpIsLocalToFinallyBlock(node)) {
                    ctx.addFailureAtNode(node, Rule.FAILURE_STRING(printJumpKind(node)));
                }
            // falls through
            default:
                return ts.forEachChild(node, cb);
        }
    });
}
function jumpIsLocalToFinallyBlock(jump) {
    var isBreakOrContinue = utils.isBreakOrContinueStatement(jump);
    var label = isBreakOrContinue ? jump.label : undefined;
    var node = jump;
    // This should only be called inside a finally block, so we'll eventually reach the TryStatement case and return.
    while (true) {
        var parent = node.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.TryStatement:
                if (parent.finallyBlock === node) {
                    return false;
                }
                break;
            case ts.SyntaxKind.SwitchStatement:
                if (jump.kind === ts.SyntaxKind.BreakStatement && label === undefined) {
                    return true;
                }
                break;
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.DoStatement:
                if (isBreakOrContinue && label === undefined) {
                    return true;
                }
                break;
            case ts.SyntaxKind.LabeledStatement: {
                var text = parent.label.text;
                if (label !== undefined && label.text === text) {
                    return true;
                }
                break;
            }
            default:
                if (utils.isFunctionScopeBoundary(parent)) {
                    // Haven't seen TryStatement yet, so the function is inside it.
                    // No jump statement can escape a function, so the jump is local.
                    return true;
                }
        }
        node = parent;
    }
}
function printJumpKind(node) {
    switch (node.kind) {
        case ts.SyntaxKind.BreakStatement:
            return "break";
        case ts.SyntaxKind.ContinueStatement:
            return "continue";
        case ts.SyntaxKind.ThrowStatement:
            return "throw";
        case ts.SyntaxKind.ReturnStatement:
            return "return";
    }
}
var templateObject_1, templateObject_2;
