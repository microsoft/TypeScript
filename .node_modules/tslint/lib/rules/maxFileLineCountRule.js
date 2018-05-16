"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
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
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (lineCount, lineLimit) {
        return "This file has " + lineCount + " lines, which exceeds the maximum of " + lineLimit + " lines allowed. " +
            "Consider breaking this file up into smaller parts";
    };
    Rule.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.ruleArguments[0] > 0;
    };
    Rule.prototype.apply = function (sourceFile) {
        var lineLimit = this.ruleArguments[0];
        var lineCount = sourceFile.getLineStarts().length;
        if (lineCount <= lineLimit) {
            return [];
        }
        var len = sourceFile.text.length;
        return [new Lint.RuleFailure(sourceFile, len - 1, len, Rule.FAILURE_STRING(lineCount, lineLimit), this.ruleName)];
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "max-file-line-count",
        description: "Requires files to remain under a certain number of lines",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Limiting the number of lines allowed in a file allows files to remain small,\n            single purpose, and maintainable."], ["\n            Limiting the number of lines allowed in a file allows files to remain small,\n            single purpose, and maintainable."]))),
        optionsDescription: "An integer indicating the maximum number of lines.",
        options: {
            type: "number",
            minimum: "1",
        },
        optionExamples: [[true, 300]],
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var templateObject_1;
