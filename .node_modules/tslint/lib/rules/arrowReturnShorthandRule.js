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
var utils_1 = require("../language/utils");
var OPTION_MULTILINE = "multiline";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (isObjectLiteral) {
        var start = "This arrow function body can be simplified by omitting the curly braces and the keyword 'return'";
        return start + (isObjectLiteral ? ", and wrapping the object literal in parentheses." : ".");
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, { multiline: this.ruleArguments.indexOf(OPTION_MULTILINE) !== -1 });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "arrow-return-shorthand",
        description: "Suggests to convert `() => { return x; }` to `() => x`.",
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If `", "` is specified, then this will warn even if the function spans multiple lines."], ["\n            If \\`", "\\` is specified, then this will warn even if the function spans multiple lines."])), OPTION_MULTILINE),
        options: {
            type: "string",
            enum: [OPTION_MULTILINE],
        },
        optionExamples: [
            true,
            [true, OPTION_MULTILINE],
        ],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            It's unnecessary to include `return` and `{}` brackets in arrow lambdas.\n            Leaving them out results in simpler and easier to read code.\n        "], ["\n            It's unnecessary to include \\`return\\` and \\`{}\\` brackets in arrow lambdas.\n            Leaving them out results in simpler and easier to read code.\n        "]))),
        type: "style",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, multiline = ctx.options.multiline;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (utils.isArrowFunction(node) && utils.isBlock(node.body)) {
            var expr = getSimpleReturnExpression(node.body);
            if (expr !== undefined && (multiline || utils.isSameLine(sourceFile, node.body.getStart(sourceFile), node.body.end))) {
                var isObjectLiteral = expr.kind === ts.SyntaxKind.ObjectLiteralExpression;
                ctx.addFailureAtNode(node.body, Rule.FAILURE_STRING(isObjectLiteral), createFix(node, node.body, expr, sourceFile.text));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function createFix(arrowFunction, body, expr, text) {
    var statement = expr.parent;
    var returnKeyword = utils.getChildOfKind(statement, ts.SyntaxKind.ReturnKeyword);
    var arrow = utils.getChildOfKind(arrowFunction, ts.SyntaxKind.EqualsGreaterThanToken);
    var openBrace = utils.getChildOfKind(body, ts.SyntaxKind.OpenBraceToken);
    var closeBrace = utils.getChildOfKind(body, ts.SyntaxKind.CloseBraceToken);
    var semicolon = utils.getChildOfKind(statement, ts.SyntaxKind.SemicolonToken);
    var anyComments = hasComments(arrow) || hasComments(openBrace) || hasComments(statement) || hasComments(returnKeyword) ||
        hasComments(expr) || (semicolon !== undefined && hasComments(semicolon)) || hasComments(closeBrace);
    return anyComments ? undefined : (expr.kind === ts.SyntaxKind.ObjectLiteralExpression ? [
        Lint.Replacement.appendText(expr.getStart(), "("),
        Lint.Replacement.appendText(expr.getEnd(), ")"),
    ] : []).concat([
        // " {"
        Lint.Replacement.deleteFromTo(arrow.end, openBrace.end),
        // "return "
        Lint.Replacement.deleteFromTo(statement.getStart(), expr.getStart()),
        // " }" (may include semicolon)
        Lint.Replacement.deleteFromTo(expr.end, closeBrace.end),
    ]);
    function hasComments(node) {
        return utils_1.hasCommentAfterPosition(text, node.getEnd());
    }
}
/** Given `{ return x; }`, return `x`. */
function getSimpleReturnExpression(block) {
    return block.statements.length === 1 && block.statements[0].kind === ts.SyntaxKind.ReturnStatement
        ? block.statements[0].expression
        : undefined;
}
var templateObject_1, templateObject_2;
