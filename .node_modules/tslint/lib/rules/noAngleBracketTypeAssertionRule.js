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
        ruleName: "no-angle-bracket-type-assertion",
        description: "Requires the use of `as Type` for type assertions instead of `<Type>`.",
        hasFix: true,
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Both formats of type assertions have the same effect, but only `as` type assertions\n            work in `.tsx` files. This rule ensures that you have a consistent type assertion style\n            across your codebase."], ["\n            Both formats of type assertions have the same effect, but only \\`as\\` type assertions\n            work in \\`.tsx\\` files. This rule ensures that you have a consistent type assertion style\n            across your codebase."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Type assertion using the '<>' syntax is forbidden. Use the 'as' syntax instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isTypeAssertion(node)) {
            var expression = node.expression;
            var start = node.getStart(ctx.sourceFile);
            var addParens = needsParens(node);
            var replaceText = " as " + node.type.getText(ctx.sourceFile) + (addParens ? ")" : "");
            while (tsutils_1.isTypeAssertion(expression)) {
                replaceText = " as " + expression.type.getText(ctx.sourceFile) + replaceText;
                expression = expression.expression;
            }
            ctx.addFailure(start, node.end, Rule.FAILURE_STRING, [
                Lint.Replacement.appendText(node.end, replaceText),
                Lint.Replacement.replaceFromTo(start, expression.getStart(ctx.sourceFile), addParens ? "(" : ""),
            ]);
            return cb(expression);
        }
        return ts.forEachChild(node, cb);
    });
}
function needsParens(node) {
    var parent = node.parent;
    return tsutils_1.isBinaryExpression(parent) &&
        (parent.operatorToken.kind === ts.SyntaxKind.AmpersandToken || parent.operatorToken.kind === ts.SyntaxKind.BarToken);
}
var templateObject_1;
