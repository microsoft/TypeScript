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
var Lint = require("..");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NewlinePerChainedCallWalker(sourceFile, this.ruleName, undefined));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "newline-per-chained-call",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Requires that chained method calls be broken apart onto separate lines."], ["\n            Requires that chained method calls be broken apart onto separate lines."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            This style helps to keep code 'vertical', avoiding the need for side-scrolling in IDEs or text editors."], ["\n            This style helps to keep code 'vertical', avoiding the need for side-scrolling in IDEs or text editors."]))),
        optionsDescription: "Not configurable",
        options: null,
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "When chaining calls, put method calls on new lines.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NewlinePerChainedCallWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NewlinePerChainedCallWalker, _super);
    function NewlinePerChainedCallWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewlinePerChainedCallWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var checkForSameLine = function (node) {
            if (tsutils_1.isCallExpression(node) &&
                tsutils_1.isPropertyAccessExpression(node.expression) &&
                tsutils_1.isSameLine(sourceFile, node.expression.expression.end, node.expression.name.pos) &&
                hasChildCall(node.expression)) {
                _this.addFailure(node.expression.name.pos - 1, node.expression.name.end, Rule.FAILURE_STRING);
            }
            return ts.forEachChild(node, checkForSameLine);
        };
        return ts.forEachChild(sourceFile, checkForSameLine);
    };
    return NewlinePerChainedCallWalker;
}(Lint.AbstractWalker));
function hasChildCall(node) {
    var expression = node.expression;
    while (tsutils_1.isPropertyAccessExpression(expression) ||
        tsutils_1.isElementAccessExpression(expression)) {
        (_a = expression, expression = _a.expression);
    }
    return expression.kind === ts.SyntaxKind.CallExpression;
    var _a;
}
var templateObject_1, templateObject_2;
