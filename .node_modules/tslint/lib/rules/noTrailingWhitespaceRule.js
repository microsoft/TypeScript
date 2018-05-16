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
var ts = require("typescript");
var Lint = require("../index");
var noConsecutiveBlankLinesRule_1 = require("./noConsecutiveBlankLinesRule");
var OPTION_IGNORE_COMMENTS = "ignore-comments";
var OPTION_IGNORE_JSDOC = "ignore-jsdoc";
var OPTION_IGNORE_TEMPLATE_STRINGS = "ignore-template-strings";
var OPTION_IGNORE_BLANK_LINES = "ignore-blank-lines";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var ignoreComments = this.ruleArguments.indexOf(OPTION_IGNORE_COMMENTS) !== -1;
        return this.applyWithFunction(sourceFile, walk, {
            ignoreBlankLines: this.ruleArguments.indexOf(OPTION_IGNORE_BLANK_LINES) !== -1,
            ignoreComments: ignoreComments,
            ignoreJsDoc: ignoreComments || this.ruleArguments.indexOf(OPTION_IGNORE_JSDOC) !== -1,
            ignoreTemplates: this.ruleArguments.indexOf(OPTION_IGNORE_TEMPLATE_STRINGS) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-trailing-whitespace",
        description: "Disallows trailing whitespace at the end of a line.",
        rationale: "Keeps version control diffs clean as it prevents accidental whitespace from being committed.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Possible settings are:\n\n            * `\"", "\"`: Allows trailing whitespace in template strings.\n            * `\"", "\"`: Allows trailing whitespace in comments.\n            * `\"", "\"`: Allows trailing whitespace only in JSDoc comments.\n            * `\"", "\"`: Allows trailing whitespace on empty lines."], ["\n            Possible settings are:\n\n            * \\`\"", "\"\\`: Allows trailing whitespace in template strings.\n            * \\`\"", "\"\\`: Allows trailing whitespace in comments.\n            * \\`\"", "\"\\`: Allows trailing whitespace only in JSDoc comments.\n            * \\`\"", "\"\\`: Allows trailing whitespace on empty lines."])), OPTION_IGNORE_TEMPLATE_STRINGS, OPTION_IGNORE_COMMENTS, OPTION_IGNORE_JSDOC, OPTION_IGNORE_BLANK_LINES),
        hasFix: true,
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_IGNORE_COMMENTS, OPTION_IGNORE_JSDOC, OPTION_IGNORE_TEMPLATE_STRINGS, OPTION_IGNORE_BLANK_LINES],
            },
        },
        optionExamples: [
            true,
            [true, OPTION_IGNORE_COMMENTS],
            [true, OPTION_IGNORE_JSDOC],
        ],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "trailing whitespace";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var possibleFailures = [];
    var sourceFile = ctx.sourceFile;
    var text = sourceFile.text;
    for (var _i = 0, _a = tsutils_1.getLineRanges(sourceFile); _i < _a.length; _i++) {
        var line = _a[_i];
        // \s matches any whitespace character (equal to [\r\n\t\f\v ])
        var match = text.substr(line.pos, line.contentLength).match(/\s+$/);
        if (match !== null && !(ctx.options.ignoreBlankLines && match.index === 0)) {
            possibleFailures.push({
                end: line.pos + line.contentLength,
                pos: line.pos + match.index,
            });
        }
    }
    if (possibleFailures.length === 0) {
        return;
    }
    var excludedRanges = ctx.options.ignoreTemplates
        ? ctx.options.ignoreJsDoc ? getExcludedRanges(sourceFile, ctx.options) : noConsecutiveBlankLinesRule_1.getTemplateRanges(sourceFile)
        : ctx.options.ignoreJsDoc ? getExcludedComments(sourceFile, ctx.options) : [];
    var _loop_1 = function (possibleFailure) {
        if (!excludedRanges.some(function (range) { return range.pos < possibleFailure.pos && possibleFailure.pos < range.end; })) {
            ctx.addFailure(possibleFailure.pos, possibleFailure.end, Rule.FAILURE_STRING, Lint.Replacement.deleteFromTo(possibleFailure.pos, possibleFailure.end));
        }
    };
    for (var _b = 0, possibleFailures_1 = possibleFailures; _b < possibleFailures_1.length; _b++) {
        var possibleFailure = possibleFailures_1[_b];
        _loop_1(possibleFailure);
    }
}
function getExcludedRanges(sourceFile, options) {
    var intervals = [];
    tsutils_1.forEachTokenWithTrivia(sourceFile, function (text, kind, range) {
        if (kind >= ts.SyntaxKind.FirstTemplateToken && kind <= ts.SyntaxKind.LastTemplateToken) {
            intervals.push(range);
        }
        else if (options.ignoreComments) {
            if (kind === ts.SyntaxKind.SingleLineCommentTrivia || kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                intervals.push(range);
            }
        }
        else if (options.ignoreJsDoc) {
            if (isJsDoc(text, kind, range)) {
                intervals.push(range);
            }
        }
    });
    return intervals;
}
function getExcludedComments(sourceFile, options) {
    var intervals = [];
    tsutils_1.forEachComment(sourceFile, function (text, comment) {
        if (options.ignoreComments ||
            options.ignoreJsDoc && isJsDoc(text, comment.kind, comment)) {
            intervals.push(comment);
        }
    });
    return intervals;
}
function isJsDoc(sourceText, kind, range) {
    return kind === ts.SyntaxKind.MultiLineCommentTrivia && sourceText[range.pos + 2] === "*" && sourceText[range.pos + 3] !== "*";
}
var templateObject_1;
