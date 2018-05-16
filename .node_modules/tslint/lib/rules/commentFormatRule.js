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
var utils = require("tsutils");
var ts = require("typescript");
var enableDisableRules_1 = require("../enableDisableRules");
var Lint = require("../index");
var utils_1 = require("../utils");
var OPTION_SPACE = "check-space";
var OPTION_LOWERCASE = "check-lowercase";
var OPTION_UPPERCASE = "check-uppercase";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "comment-format",
        description: "Enforces formatting rules for single-line comments.",
        rationale: "Helps maintain a consistent, readable style in your codebase.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Three arguments may be optionally provided:\n\n            * `\"check-space\"` requires that all single-line comments must begin with a space, as in `// comment`\n                * note that for comments starting with multiple slashes, e.g. `///`, leading slashes are ignored\n                * TypeScript reference comments are ignored completely\n            * `\"check-lowercase\"` requires that the first non-whitespace character of a comment must be lowercase, if applicable.\n            * `\"check-uppercase\"` requires that the first non-whitespace character of a comment must be uppercase, if applicable.\n\n            Exceptions to `\"check-lowercase\"` or `\"check-uppercase\"` can be managed with object that may be passed as last argument.\n\n            One of two options can be provided in this object:\n\n                * `\"ignore-words\"`  - array of strings - words that will be ignored at the beginning of the comment.\n                * `\"ignore-pattern\"` - string - RegExp pattern that will be ignored at the beginning of the comment.\n            "], ["\n            Three arguments may be optionally provided:\n\n            * \\`\"check-space\"\\` requires that all single-line comments must begin with a space, as in \\`// comment\\`\n                * note that for comments starting with multiple slashes, e.g. \\`///\\`, leading slashes are ignored\n                * TypeScript reference comments are ignored completely\n            * \\`\"check-lowercase\"\\` requires that the first non-whitespace character of a comment must be lowercase, if applicable.\n            * \\`\"check-uppercase\"\\` requires that the first non-whitespace character of a comment must be uppercase, if applicable.\n\n            Exceptions to \\`\"check-lowercase\"\\` or \\`\"check-uppercase\"\\` can be managed with object that may be passed as last argument.\n\n            One of two options can be provided in this object:\n\n                * \\`\"ignore-words\"\\`  - array of strings - words that will be ignored at the beginning of the comment.\n                * \\`\"ignore-pattern\"\\` - string - RegExp pattern that will be ignored at the beginning of the comment.\n            "]))),
        options: {
            type: "array",
            items: {
                anyOf: [
                    {
                        type: "string",
                        enum: [
                            "check-space",
                            "check-lowercase",
                            "check-uppercase",
                        ],
                    },
                    {
                        type: "object",
                        properties: {
                            "ignore-words": {
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            "ignore-pattern": {
                                type: "string",
                            },
                        },
                        minProperties: 1,
                        maxProperties: 1,
                    },
                ],
            },
            minLength: 1,
            maxLength: 4,
        },
        optionExamples: [
            [true, "check-space", "check-uppercase"],
            [true, "check-lowercase", { "ignore-words": ["TODO", "HACK"] }],
            [true, "check-lowercase", { "ignore-pattern": "STD\\w{2,3}\\b" }],
        ],
        type: "style",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.LOWERCASE_FAILURE = "comment must start with lowercase letter";
    Rule.UPPERCASE_FAILURE = "comment must start with uppercase letter";
    Rule.LEADING_SPACE_FAILURE = "comment must start with a space";
    Rule.IGNORE_WORDS_FAILURE_FACTORY = function (words) { return " or the word(s): " + words.join(", "); };
    Rule.IGNORE_PATTERN_FAILURE_FACTORY = function (pattern) { return " or its start must match the regex pattern \"" + pattern + "\""; };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(options) {
    return tslib_1.__assign({ case: options.indexOf(OPTION_LOWERCASE) !== -1
            ? 1 /* Lower */
            : options.indexOf(OPTION_UPPERCASE) !== -1
                ? 2 /* Upper */
                : 0 /* None */, failureSuffix: "", space: options.indexOf(OPTION_SPACE) !== -1 }, composeExceptions(options[options.length - 1]));
}
function composeExceptions(option) {
    if (typeof option !== "object") {
        return undefined;
    }
    var ignorePattern = option["ignore-pattern"];
    if (ignorePattern !== undefined) {
        return {
            exceptions: new RegExp("^\\s*(" + ignorePattern + ")"),
            failureSuffix: Rule.IGNORE_PATTERN_FAILURE_FACTORY(ignorePattern),
        };
    }
    var ignoreWords = option["ignore-words"];
    if (ignoreWords !== undefined && ignoreWords.length !== 0) {
        return {
            exceptions: new RegExp("^\\s*(?:" + ignoreWords.map(function (word) { return utils_1.escapeRegExp(word.trim()); }).join("|") + ")\\b"),
            failureSuffix: Rule.IGNORE_WORDS_FAILURE_FACTORY(ignoreWords),
        };
    }
    return undefined;
}
function walk(ctx) {
    utils.forEachComment(ctx.sourceFile, function (fullText, _a) {
        var kind = _a.kind, pos = _a.pos, end = _a.end;
        var start = pos + 2;
        if (kind !== ts.SyntaxKind.SingleLineCommentTrivia ||
            // exclude empty comments
            start === end ||
            // exclude /// <reference path="...">
            fullText[start] === "/" && ctx.sourceFile.referencedFiles.some(function (ref) { return ref.pos >= pos && ref.end <= end; })) {
            return;
        }
        // skip all leading slashes
        while (fullText[start] === "/") {
            ++start;
        }
        if (start === end) {
            return;
        }
        var commentText = fullText.slice(start, end);
        // whitelist //#region and //#endregion and JetBrains IDEs' "//noinspection ..."
        if (/^(?:#(?:end)?region|noinspection\s)/.test(commentText)) {
            return;
        }
        if (ctx.options.space && commentText[0] !== " ") {
            ctx.addFailure(start, end, Rule.LEADING_SPACE_FAILURE, [Lint.Replacement.appendText(start, " ")]);
        }
        if (ctx.options.case === 0 /* None */ ||
            ctx.options.exceptions !== undefined && ctx.options.exceptions.test(commentText) ||
            enableDisableRules_1.ENABLE_DISABLE_REGEX.test(commentText)) {
            return;
        }
        // search for first non-space character to check if lower or upper
        var charPos = commentText.search(/\S/);
        if (charPos === -1) {
            return;
        }
        if (ctx.options.case === 1 /* Lower */) {
            if (!utils_1.isLowerCase(commentText[charPos])) {
                ctx.addFailure(start, end, Rule.LOWERCASE_FAILURE + ctx.options.failureSuffix);
            }
        }
        else if (!utils_1.isUpperCase(commentText[charPos])) {
            ctx.addFailure(start, end, Rule.UPPERCASE_FAILURE + ctx.options.failureSuffix);
        }
    });
}
var templateObject_1;
