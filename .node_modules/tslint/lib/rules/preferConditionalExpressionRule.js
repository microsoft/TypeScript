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
var OPTION_CHECK_ELSE_IF = "check-else-if";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (assigned) {
        return "Use a conditional expression instead of assigning to '" + assigned + "' in multiple places.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            checkElseIf: this.ruleArguments.indexOf(OPTION_CHECK_ELSE_IF) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "prefer-conditional-expression",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Recommends to use a conditional expression instead of assigning to the same thing in each branch of an if statement."], ["\n            Recommends to use a conditional expression instead of assigning to the same thing in each branch of an if statement."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            This reduces duplication and can eliminate an unnecessary variable declaration."], ["\n            This reduces duplication and can eliminate an unnecessary variable declaration."]))),
        optionsDescription: "If `" + OPTION_CHECK_ELSE_IF + "` is specified, the rule also checks nested if-else-if statements.",
        options: {
            type: "string",
            enum: [OPTION_CHECK_ELSE_IF],
        },
        optionExamples: [true, [true, OPTION_CHECK_ELSE_IF]],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, checkElseIf = ctx.options.checkElseIf;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (tsutils_1.isIfStatement(node)) {
            var assigned = detectAssignment(node, sourceFile, checkElseIf);
            if (assigned !== undefined) {
                ctx.addFailureAtNode(node.getChildAt(0, sourceFile), Rule.FAILURE_STRING(assigned.getText(sourceFile)));
            }
            if (assigned !== undefined || !checkElseIf) {
                // Be careful not to fail again for the "else if"
                do {
                    ts.forEachChild(node.expression, cb);
                    ts.forEachChild(node.thenStatement, cb);
                    if (node.elseStatement === undefined) {
                        return;
                    }
                    node = node.elseStatement;
                    while (tsutils_1.isBlock(node) && node.statements.length === 1) {
                        node = node.statements[0];
                    }
                } while (tsutils_1.isIfStatement(node));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
/**
 * @param inElse `undefined` when this is the top level if statement, `false` when inside the then branch, `true` when inside else
 */
function detectAssignment(statement, sourceFile, checkElseIf, inElse) {
    if (tsutils_1.isIfStatement(statement)) {
        if (inElse === false || !checkElseIf && inElse || statement.elseStatement === undefined) {
            return undefined;
        }
        var then = detectAssignment(statement.thenStatement, sourceFile, checkElseIf, false);
        if (then === undefined) {
            return undefined;
        }
        var elze = detectAssignment(statement.elseStatement, sourceFile, checkElseIf, true);
        return elze !== undefined && nodeEquals(then, elze, sourceFile) ? then : undefined;
    }
    else if (tsutils_1.isBlock(statement)) {
        return statement.statements.length === 1
            ? detectAssignment(statement.statements[0], sourceFile, checkElseIf, inElse)
            : undefined;
    }
    else if (tsutils_1.isExpressionStatement(statement) && tsutils_1.isBinaryExpression(statement.expression)) {
        var _a = statement.expression, kind = _a.operatorToken.kind, left = _a.left, right = _a.right;
        return kind === ts.SyntaxKind.EqualsToken && tsutils_1.isSameLine(sourceFile, right.getStart(sourceFile), right.end) ? left : undefined;
    }
    else {
        return undefined;
    }
}
function nodeEquals(a, b, sourceFile) {
    return a.getText(sourceFile) === b.getText(sourceFile);
}
var templateObject_1, templateObject_2;
