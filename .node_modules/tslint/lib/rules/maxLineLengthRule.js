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
var tsutils_1 = require("tsutils");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (lineLimit) {
        return "Exceeds maximum line length of " + lineLimit;
    };
    Rule.prototype.isEnabled = function () {
        var limit = this.getRuleOptions().limit;
        return _super.prototype.isEnabled.call(this) && (limit > 0);
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.getRuleOptions());
    };
    Rule.prototype.getRuleOptions = function () {
        var argument = this.ruleArguments[0];
        var options = { limit: 0 };
        if (typeof argument === "number") {
            options.limit = argument;
        }
        else {
            options = argument;
            var ignorePattern = argument["ignore-pattern"];
            options.ignorePattern = (typeof ignorePattern === "string") ?
                new RegExp((ignorePattern)) : undefined;
        }
        options.limit = Number(options.limit); // user can pass a string instead of number
        return options;
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "max-line-length",
        description: "Requires lines to be under a certain max length.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Limiting the length of a line of code improves code readability.\n            It also makes comparing code side-by-side easier and improves compatibility with\n            various editors, IDEs, and diff viewers."], ["\n            Limiting the length of a line of code improves code readability.\n            It also makes comparing code side-by-side easier and improves compatibility with\n            various editors, IDEs, and diff viewers."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        It can take one argument, which can be any of the following:\n        * integer indicating maximum length of lines.\n        * object with keys:\n          * `limit` - number < 0 defining max line length\n          * `ignore-pattern` - string defining ignore pattern for this rule, being parsed by `new RegExp()`.\n            For example:\n             * `// ` pattern will ignore all in-line comments.\n             * `^import ` pattern will ignore all import statements.\n             * `^export {(.*?)}` pattern will ignore all multiple export statements.\n             * `class [a-zA-Z]+ implements ` pattern will ignore all class declarations implementing interfaces.\n             * `^import |^export {(.*?)}|class [a-zA-Z]+ implements |// ` pattern will ignore all the cases listed above.\n         "], ["\n        It can take one argument, which can be any of the following:\n        * integer indicating maximum length of lines.\n        * object with keys:\n          * \\`limit\\` - number < 0 defining max line length\n          * \\`ignore-pattern\\` - string defining ignore pattern for this rule, being parsed by \\`new RegExp()\\`.\n            For example:\n             * \\`\\/\\/ \\` pattern will ignore all in-line comments.\n             * \\`^import \\` pattern will ignore all import statements.\n             * \\`^export \\{(.*?)\\}\\` pattern will ignore all multiple export statements.\n             * \\`class [a-zA-Z]+ implements \\` pattern will ignore all class declarations implementing interfaces.\n             * \\`^import |^export \\{(.*?)\\}|class [a-zA-Z]+ implements |// \\` pattern will ignore all the cases listed above.\n         "]))),
        options: {
            type: "array",
            items: {
                oneOf: [
                    {
                        type: "number",
                    },
                    {
                        type: "object",
                        properties: {
                            "limit": { type: "number" },
                            "ignore-pattern": { type: "string" },
                        },
                        additionalProperties: false,
                    },
                ],
            },
            minLength: 1,
            maxLength: 2,
        },
        optionExamples: [[true, 120], [true, {
                    "limit": 120,
                    "ignore-pattern": "^import |^export \{(.*?)\}"
                }]],
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var limit = ctx.options.limit;
    var ignorePattern = ctx.options.ignorePattern;
    for (var _i = 0, _a = tsutils_1.getLineRanges(ctx.sourceFile); _i < _a.length; _i++) {
        var line = _a[_i];
        if (line.contentLength <= limit) {
            continue;
        }
        var lineContent = ctx.sourceFile.text.substr(line.pos, line.contentLength);
        if (ignorePattern !== undefined && ignorePattern.test(lineContent)) {
            continue;
        }
        ctx.addFailureAt(line.pos, line.contentLength, Rule.FAILURE_STRING_FACTORY(limit));
    }
}
var templateObject_1, templateObject_2;
