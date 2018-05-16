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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (expected, actual, name) {
        return "The function" + (name === undefined ? "" : " " + name) + " has a cyclomatic complexity of " +
            (actual + " which is higher than the threshold of " + expected);
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, { threshold: this.threshold });
    };
    Rule.prototype.isEnabled = function () {
        // Disable the rule if the option is provided but non-numeric or less than the minimum.
        var isThresholdValid = typeof this.threshold === "number" && this.threshold >= Rule.MINIMUM_THRESHOLD;
        return _super.prototype.isEnabled.call(this) && isThresholdValid;
    };
    Object.defineProperty(Rule.prototype, "threshold", {
        get: function () {
            if (this.ruleArguments[0] !== undefined) {
                return this.ruleArguments[0];
            }
            return Rule.DEFAULT_THRESHOLD;
        },
        enumerable: true,
        configurable: true
    });
    Rule.DEFAULT_THRESHOLD = 20;
    Rule.MINIMUM_THRESHOLD = 2;
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "cyclomatic-complexity",
        description: "Enforces a threshold of cyclomatic complexity.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Cyclomatic complexity is assessed for each function of any type. A starting value of 0\n            is assigned and this value is then incremented for every statement which can branch the\n            control flow within the function. The following statements and expressions contribute\n            to cyclomatic complexity:\n            * `catch`\n            * `if` and `? :`\n            * `||` and `&&` due to short-circuit evaluation\n            * `for`, `for in` and `for of` loops\n            * `while` and `do while` loops\n            * `case` clauses that contain statements"], ["\n            Cyclomatic complexity is assessed for each function of any type. A starting value of 0\n            is assigned and this value is then incremented for every statement which can branch the\n            control flow within the function. The following statements and expressions contribute\n            to cyclomatic complexity:\n            * \\`catch\\`\n            * \\`if\\` and \\`? :\\`\n            * \\`||\\` and \\`&&\\` due to short-circuit evaluation\n            * \\`for\\`, \\`for in\\` and \\`for of\\` loops\n            * \\`while\\` and \\`do while\\` loops\n            * \\`case\\` clauses that contain statements"]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Cyclomatic complexity is a code metric which indicates the level of complexity in a\n            function. High cyclomatic complexity indicates confusing code which may be prone to\n            errors or difficult to modify.\n\n            It's better to have smaller, single-purpose functions with self-documenting names."], ["\n            Cyclomatic complexity is a code metric which indicates the level of complexity in a\n            function. High cyclomatic complexity indicates confusing code which may be prone to\n            errors or difficult to modify.\n\n            It's better to have smaller, single-purpose functions with self-documenting names."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            An optional upper limit for cyclomatic complexity can be specified. If no limit option\n            is provided a default value of ", " will be used."], ["\n            An optional upper limit for cyclomatic complexity can be specified. If no limit option\n            is provided a default value of ", " will be used."])), Rule.DEFAULT_THRESHOLD),
        options: {
            type: "number",
            minimum: Rule.MINIMUM_THRESHOLD,
        },
        optionExamples: [true, [true, 20]],
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var threshold = ctx.options.threshold;
    var complexity = 0;
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isFunctionScopeBoundary(node)) {
            var old = complexity;
            complexity = 1;
            ts.forEachChild(node, cb);
            if (complexity > threshold) {
                var name = node.name;
                var nameStr = name !== undefined && tsutils_1.isIdentifier(name) ? name.text : undefined;
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING(threshold, complexity, nameStr));
            }
            complexity = old;
        }
        else {
            if (increasesComplexity(node)) {
                complexity++;
            }
            return ts.forEachChild(node, cb);
        }
    });
}
function increasesComplexity(node) {
    switch (node.kind) {
        case ts.SyntaxKind.CaseClause:
            return node.statements.length > 0;
        case ts.SyntaxKind.CatchClause:
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.IfStatement:
        case ts.SyntaxKind.WhileStatement:
            return true;
        case ts.SyntaxKind.BinaryExpression:
            switch (node.operatorToken.kind) {
                case ts.SyntaxKind.BarBarToken:
                case ts.SyntaxKind.AmpersandAmpersandToken:
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}
var templateObject_1, templateObject_2, templateObject_3;
