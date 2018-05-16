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
var OPTION_USE_TABS = "tabs";
var OPTION_USE_SPACES = "spaces";
var OPTION_INDENT_SIZE_2 = 2;
var OPTION_INDENT_SIZE_4 = 4;
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (expected) {
        return expected + " indentation expected";
    };
    Rule.prototype.apply = function (sourceFile) {
        var options = parseOptions(this.ruleArguments);
        return options === undefined ? [] : this.applyWithFunction(sourceFile, walk, options);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "indent",
        description: "Enforces indentation with tabs or spaces.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n            cleaner diffs in version control, and easier programmatic manipulation."], ["\n            Using only one of tabs or spaces for indentation leads to more consistent editor behavior,\n            cleaner diffs in version control, and easier programmatic manipulation."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            One of the following arguments must be provided:\n\n            * `", "` enforces consistent spaces.\n            * `", "` enforces consistent tabs.\n\n            A second optional argument specifies indentation size:\n\n            * `", "` enforces 2 space indentation.\n            * `", "` enforces 4 space indentation.\n\n            Indentation size is **required** for auto-fixing, but not for rule checking.\n\n            **NOTE**: auto-fixing will only convert invalid indent whitespace to the desired type, it will not fix invalid whitespace sizes.\n            "], ["\n            One of the following arguments must be provided:\n\n            * \\`", "\\` enforces consistent spaces.\n            * \\`", "\\` enforces consistent tabs.\n\n            A second optional argument specifies indentation size:\n\n            * \\`", "\\` enforces 2 space indentation.\n            * \\`", "\\` enforces 4 space indentation.\n\n            Indentation size is **required** for auto-fixing, but not for rule checking.\n\n            **NOTE**: auto-fixing will only convert invalid indent whitespace to the desired type, it will not fix invalid whitespace sizes.\n            "])), OPTION_USE_SPACES, OPTION_USE_TABS, OPTION_INDENT_SIZE_2.toString(), OPTION_INDENT_SIZE_4.toString()),
        options: {
            type: "array",
            items: [
                {
                    type: "string",
                    enum: [OPTION_USE_TABS, OPTION_USE_SPACES],
                },
                {
                    type: "number",
                    enum: [OPTION_INDENT_SIZE_2, OPTION_INDENT_SIZE_4],
                },
            ],
            minLength: 0,
            maxLength: 5,
        },
        optionExamples: [
            [true, OPTION_USE_SPACES],
            [true, OPTION_USE_SPACES, OPTION_INDENT_SIZE_4],
            [true, OPTION_USE_TABS, OPTION_INDENT_SIZE_2],
        ],
        hasFix: true,
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    var type = ruleArguments[0];
    if (type !== OPTION_USE_TABS && type !== OPTION_USE_SPACES) {
        return undefined;
    }
    var size = ruleArguments[1];
    return {
        size: size === OPTION_INDENT_SIZE_2 || size === OPTION_INDENT_SIZE_4 ? size : undefined,
        tabs: type === OPTION_USE_TABS,
    };
}
function walk(ctx) {
    var sourceFile = ctx.sourceFile, _a = ctx.options, tabs = _a.tabs, size = _a.size;
    var regExp = tabs ? new RegExp(" ".repeat(size === undefined ? 1 : size)) : /\t/;
    var failure = Rule.FAILURE_STRING(tabs ? "tab" : size === undefined ? "space" : size + " space");
    for (var _i = 0, _b = tsutils_1.getLineRanges(sourceFile); _i < _b.length; _i++) {
        var _c = _b[_i], pos = _c.pos, contentLength = _c.contentLength;
        if (contentLength === 0) {
            continue;
        }
        var line = sourceFile.text.substr(pos, contentLength);
        var indentEnd = line.search(/\S/);
        if (indentEnd === 0) {
            continue;
        }
        if (indentEnd === -1) {
            indentEnd = contentLength;
        }
        var whitespace = line.slice(0, indentEnd);
        if (!regExp.test(whitespace)) {
            continue;
        }
        var token = tsutils_1.getTokenAtPosition(sourceFile, pos);
        if (token.kind !== ts.SyntaxKind.JsxText &&
            (pos >= token.getStart(sourceFile) || tsutils_1.isPositionInComment(sourceFile, pos, token))) {
            continue;
        }
        ctx.addFailureAt(pos, indentEnd, failure, createFix(pos, whitespace, tabs, size));
    }
}
function createFix(lineStart, fullLeadingWhitespace, tabs, size) {
    if (size === undefined) {
        return undefined;
    }
    var replaceRegExp = tabs
        // we want to find every group of `size` spaces, plus up to one 'incomplete' group
        ? new RegExp("^( {" + size + "})+( {1," + (size - 1) + "})?", "g")
        : /\t/g;
    var replacement = fullLeadingWhitespace.replace(replaceRegExp, function (match) {
        return (tabs ? "\t" : " ".repeat(size)).repeat(Math.ceil(match.length / size));
    });
    return new Lint.Replacement(lineStart, fullLeadingWhitespace.length, replacement);
}
var templateObject_1, templateObject_2;
