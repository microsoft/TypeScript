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
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (allowed) {
        return allowed === 1
            ? "Consecutive blank lines are forbidden"
            : "Exceeds the " + allowed + " allowed consecutive blank lines";
    };
    /**
     * Disable the rule if the option is provided but non-numeric or less than the minimum.
     */
    Rule.prototype.isEnabled = function () {
        var option = this.ruleArguments[0];
        return _super.prototype.isEnabled.call(this) && (option === undefined || option > 0);
    };
    Rule.prototype.apply = function (sourceFile) {
        var limit = this.ruleArguments[0];
        return this.applyWithFunction(sourceFile, walk, limit !== undefined ? limit : Rule.DEFAULT_ALLOWED_BLANKS);
    };
    Rule.DEFAULT_ALLOWED_BLANKS = 1;
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-consecutive-blank-lines",
        description: "Disallows one or more blank lines in a row.",
        hasFix: true,
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Helps maintain a readable style in your codebase.\n\n            Extra blank lines take up extra space and add little to a semantic understanding of the code.\n            It can be harder to read through files when fewer components can fit into the screen.\n            If you find a file is so large you feel a need to split them up with extra blank lines or comments,\n            consider splitting your file into smaller files.\n        "], ["\n            Helps maintain a readable style in your codebase.\n\n            Extra blank lines take up extra space and add little to a semantic understanding of the code.\n            It can be harder to read through files when fewer components can fit into the screen.\n            If you find a file is so large you feel a need to split them up with extra blank lines or comments,\n            consider splitting your file into smaller files.\n        "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            An optional number of maximum allowed sequential blanks can be specified. If no value\n            is provided, a default of ", " will be used."], ["\n            An optional number of maximum allowed sequential blanks can be specified. If no value\n            is provided, a default of ", " will be used."])), Rule.DEFAULT_ALLOWED_BLANKS),
        options: {
            type: "number",
            minimum: "1",
        },
        optionExamples: [true, [true, 2]],
        type: "style",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceText = ctx.sourceFile.text;
    var threshold = ctx.options + 1;
    var possibleFailures = [];
    var consecutiveBlankLines = 0;
    for (var _i = 0, _a = utils.getLineRanges(ctx.sourceFile); _i < _a.length; _i++) {
        var line = _a[_i];
        if (line.contentLength === 0 || sourceText.substr(line.pos, line.contentLength).search(/\S/) === -1) {
            ++consecutiveBlankLines;
            if (consecutiveBlankLines === threshold) {
                possibleFailures.push({
                    end: line.end,
                    pos: line.pos,
                });
            }
            else if (consecutiveBlankLines > threshold) {
                possibleFailures[possibleFailures.length - 1].end = line.end;
            }
        }
        else {
            consecutiveBlankLines = 0;
        }
    }
    if (possibleFailures.length === 0) {
        return;
    }
    var failureString = Rule.FAILURE_STRING_FACTORY(ctx.options);
    var templateRanges = getTemplateRanges(ctx.sourceFile);
    var _loop_1 = function (possibleFailure) {
        if (!templateRanges.some(function (template) { return template.pos < possibleFailure.pos && possibleFailure.pos < template.end; })) {
            ctx.addFailureAt(possibleFailure.pos, 1, failureString, [
                Lint.Replacement.deleteFromTo(
                // special handling for fixing blank lines at the end of the file
                // to fix this we need to cut off the line break of the last allowed blank line, too
                possibleFailure.end === sourceText.length ? getStartOfLineBreak(sourceText, possibleFailure.pos) : possibleFailure.pos, possibleFailure.end),
            ]);
        }
    };
    for (var _b = 0, possibleFailures_1 = possibleFailures; _b < possibleFailures_1.length; _b++) {
        var possibleFailure = possibleFailures_1[_b];
        _loop_1(possibleFailure);
    }
}
function getStartOfLineBreak(sourceText, pos) {
    return sourceText[pos - 2] === "\r" ? pos - 1 : pos - 1;
}
function getTemplateRanges(sourceFile) {
    var intervals = [];
    var cb = function (node) {
        if (node.kind >= ts.SyntaxKind.FirstTemplateToken &&
            node.kind <= ts.SyntaxKind.LastTemplateToken) {
            intervals.push({
                end: node.end,
                pos: node.getStart(sourceFile),
            });
        }
        else {
            return ts.forEachChild(node, cb);
        }
    };
    ts.forEachChild(sourceFile, cb);
    return intervals;
}
exports.getTemplateRanges = getTemplateRanges;
var templateObject_1, templateObject_2;
