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
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var BAN_SINGLE_ARG_PARENS = "ban-single-arg-parens";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            banSingleArgParens: this.ruleArguments.indexOf(BAN_SINGLE_ARG_PARENS) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "arrow-parens",
        description: "Requires parentheses around the parameters of arrow function definitions.",
        hasFix: true,
        rationale: "Maintains stylistic consistency with other arrow function definitions.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If `", "` is specified, then arrow functions with one parameter\n            must not have parentheses if removing them is allowed by TypeScript."], ["\n            If \\`", "\\` is specified, then arrow functions with one parameter\n            must not have parentheses if removing them is allowed by TypeScript."])), BAN_SINGLE_ARG_PARENS),
        options: {
            type: "string",
            enum: [BAN_SINGLE_ARG_PARENS],
        },
        optionExamples: [true, [true, BAN_SINGLE_ARG_PARENS]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_MISSING = "Parentheses are required around the parameters of an arrow function definition";
    Rule.FAILURE_STRING_EXISTS = "Parentheses are prohibited around the parameter in this single parameter arrow function";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    function cb(node) {
        if (tsutils_1.isArrowFunction(node) && parensAreOptional(node)) {
            var openParen = tsutils_1.getChildOfKind(node, ts.SyntaxKind.OpenParenToken);
            if (openParen === undefined) {
                if (!ctx.options.banSingleArgParens) {
                    var parameter = node.parameters[0];
                    var start = parameter.getStart(ctx.sourceFile);
                    var end = parameter.end;
                    ctx.addFailure(start, end, Rule.FAILURE_STRING_MISSING, [
                        Lint.Replacement.appendText(start, "("),
                        Lint.Replacement.appendText(end, ")"),
                    ]);
                }
            }
            else if (ctx.options.banSingleArgParens) {
                var closeParen = tsutils_1.getChildOfKind(node, ts.SyntaxKind.CloseParenToken);
                var charBeforeOpenParen = ctx.sourceFile.text.substring(openParen.pos - 1, openParen.pos);
                var replaceValue = charBeforeOpenParen.match(/[a-z]/i) !== null ? " " : "";
                ctx.addFailureAtNode(node.parameters[0], Rule.FAILURE_STRING_EXISTS, [
                    Lint.Replacement.replaceFromTo(openParen.pos, node.parameters[0].getStart(ctx.sourceFile), replaceValue),
                    Lint.Replacement.deleteFromTo(node.parameters[0].end, closeParen.end),
                ]);
            }
        }
        return ts.forEachChild(node, cb);
    }
    return ts.forEachChild(ctx.sourceFile, cb);
}
function parensAreOptional(node) {
    return node.parameters.length === 1 &&
        node.typeParameters === undefined &&
        node.type === undefined &&
        isSimpleParameter(node.parameters[0]);
}
function isSimpleParameter(parameter) {
    return parameter.name.kind === ts.SyntaxKind.Identifier
        && parameter.dotDotDotToken === undefined
        && parameter.initializer === undefined
        && parameter.questionToken === undefined
        && parameter.type === undefined;
}
var templateObject_1;
