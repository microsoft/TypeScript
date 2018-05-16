"use strict";
/**
 * @license
 * Copyright 2015 Palantir Technologies, Inc.
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
        ruleName: "no-conditional-assignment",
        description: "Disallows any type of assignment in conditionals.",
        descriptionDetails: "This applies to `do-while`, `for`, `if`, and `while` statements and conditional (ternary) expressions.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Assignments in conditionals are often typos:\n            for example `if (var1 = var2)` instead of `if (var1 == var2)`.\n            They also can be an indicator of overly clever code which decreases maintainability."], ["\n            Assignments in conditionals are often typos:\n            for example \\`if (var1 = var2)\\` instead of \\`if (var1 == var2)\\`.\n            They also can be an indicator of overly clever code which decreases maintainability."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Assignments in conditional expressions are forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var checking = 0;
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        var kind = node.kind;
        if (!tsutils_1.isNodeKind(kind)) {
            return; // return early for tokens
        }
        switch (kind) {
            case ts.SyntaxKind.ConditionalExpression:
                check(node.condition);
                cb(node.whenTrue);
                cb(node.whenFalse);
                return;
            case ts.SyntaxKind.IfStatement:
                check(node.expression);
                cb(node.thenStatement);
                maybeCallback(cb, node.elseStatement);
                return;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
                check(node.expression);
                cb(node.statement);
                return;
            case ts.SyntaxKind.ForStatement:
                maybeCallback(cb, node.initializer);
                maybeCallback(check, node.condition);
                maybeCallback(cb, node.incrementor);
                cb(node.statement);
                return;
        }
        if (checking !== 0) {
            switch (kind) {
                case ts.SyntaxKind.BinaryExpression:
                    if (tsutils_1.isAssignmentKind(node.operatorToken.kind)) {
                        ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
                    }
                    cb(node.left);
                    cb(node.right);
                    return;
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.NonNullExpression:
                case ts.SyntaxKind.AsExpression:
                case ts.SyntaxKind.TypeAssertionExpression:
                    return cb(node.expression);
                case ts.SyntaxKind.PrefixUnaryExpression:
                    return cb(node.operand);
                default:
                    return noCheck(node);
            }
        }
        return ts.forEachChild(node, cb);
    }
    function check(node) {
        ++checking;
        cb(node);
        --checking;
    }
    function noCheck(node) {
        var old = checking;
        checking = 0;
        ts.forEachChild(node, cb);
        checking = old;
    }
}
function maybeCallback(cb, node) {
    if (node !== undefined) {
        cb(node);
    }
}
var templateObject_1;
