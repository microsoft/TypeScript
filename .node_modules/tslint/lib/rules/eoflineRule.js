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
    Rule.prototype.apply = function (sourceFile) {
        var length = sourceFile.text.length;
        if (length === 0 || // if the file is empty, it "ends with a newline", so don't return a failure
            sourceFile.text[length - 1] === "\n") {
            return [];
        }
        var fix;
        var lines = sourceFile.getLineStarts();
        if (lines.length > 1) {
            fix = Lint.Replacement.appendText(length, sourceFile.text[lines[1] - 2] === "\r" ? "\r\n" : "\n");
        }
        return [new Lint.RuleFailure(sourceFile, length, length, Rule.FAILURE_STRING, this.ruleName, fix)];
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "eofline",
        description: "Ensures the file ends with a newline.",
        descriptionDetails: "Fix for single-line files is not supported.",
        rationale: "It is a [standard convention](https://stackoverflow.com/q/729692/3124288) to end files with a newline.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        hasFix: true,
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "file should end with a newline";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
