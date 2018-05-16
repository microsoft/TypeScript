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
var OPTION_EXCLUDE_CLASS_EXPRESSIONS = "exclude-class-expressions";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (maxCount) {
        var maxClassWord = maxCount === 1 ? "class per file is" : "classes per file are";
        return "A maximum of " + maxCount + " " + maxClassWord + " allowed.";
    };
    Rule.prototype.apply = function (sourceFile) {
        var argument = this.ruleArguments[0];
        var maxClasses = isNaN(argument) || argument > 0 ? argument : 1;
        return this.applyWithFunction(sourceFile, walk, {
            excludeClassExpressions: this.ruleArguments.indexOf(OPTION_EXCLUDE_CLASS_EXPRESSIONS) !== -1,
            maxClasses: maxClasses,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "max-classes-per-file",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            A file may not contain more than the specified number of classes"], ["\n            A file may not contain more than the specified number of classes"]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Ensures that files have a single responsibility so that that classes each exist in their own files"], ["\n            Ensures that files have a single responsibility so that that classes each exist in their own files"]))),
        optionsDescription: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            The one required argument is an integer indicating the maximum number of classes that can appear in a\n            file. An optional argument `\"exclude-class-expressions\"` can be provided to exclude class expressions\n            from the overall class count."], ["\n            The one required argument is an integer indicating the maximum number of classes that can appear in a\n            file. An optional argument \\`\"exclude-class-expressions\"\\` can be provided to exclude class expressions\n            from the overall class count."]))),
        options: {
            type: "array",
            items: [
                {
                    type: "number",
                    minimum: 1,
                },
                {
                    type: "string",
                    enum: [OPTION_EXCLUDE_CLASS_EXPRESSIONS],
                },
            ],
            additionalItems: false,
            minLength: 1,
            maxLength: 2,
        },
        optionExamples: [[true, 1], [true, 5, OPTION_EXCLUDE_CLASS_EXPRESSIONS]],
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, _a = ctx.options, maxClasses = _a.maxClasses, excludeClassExpressions = _a.excludeClassExpressions;
    var classes = 0;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (tsutils_1.isClassDeclaration(node) || (!excludeClassExpressions && tsutils_1.isClassExpression(node))) {
            classes++;
            if (classes > maxClasses) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING(maxClasses));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1, templateObject_2, templateObject_3;
