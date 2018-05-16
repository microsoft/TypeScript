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
var Lint = require("../index");
var OPTION_LINEBREAK_STYLE_CRLF = "CRLF";
var OPTION_LINEBREAK_STYLE_LF = "LF";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments.indexOf(OPTION_LINEBREAK_STYLE_CRLF) !== -1);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "linebreak-style",
        description: "Enforces a consistent linebreak style.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One of the following options must be provided:\n\n            * `\"", "\"` requires LF (`\\n`) linebreaks\n            * `\"", "\"` requires CRLF (`\\r\\n`) linebreaks"], ["\n            One of the following options must be provided:\n\n            * \\`\"", "\"\\` requires LF (\\`\\\\n\\`) linebreaks\n            * \\`\"", "\"\\` requires CRLF (\\`\\\\r\\\\n\\`) linebreaks"])), OPTION_LINEBREAK_STYLE_LF, OPTION_LINEBREAK_STYLE_CRLF),
        options: {
            type: "string",
            enum: [OPTION_LINEBREAK_STYLE_LF, OPTION_LINEBREAK_STYLE_CRLF],
        },
        optionExamples: [[true, OPTION_LINEBREAK_STYLE_LF], [true, OPTION_LINEBREAK_STYLE_CRLF]],
        type: "maintainability",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_CRLF = "Expected linebreak to be '" + OPTION_LINEBREAK_STYLE_CRLF + "'";
    Rule.FAILURE_LF = "Expected linebreak to be '" + OPTION_LINEBREAK_STYLE_LF + "'";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var expectedCr = ctx.options;
    var sourceText = ctx.sourceFile.text;
    var lineStarts = ctx.sourceFile.getLineStarts();
    for (var i = 1; i < lineStarts.length; ++i) {
        var lineEnd = lineStarts[i] - 1;
        if (sourceText[lineEnd - 1] === "\r") {
            if (!expectedCr) {
                ctx.addFailure(lineStarts[i - 1], lineEnd - 1, Rule.FAILURE_LF, Lint.Replacement.deleteText(lineEnd - 1, 1));
            }
        }
        else if (expectedCr) {
            ctx.addFailure(lineStarts[i - 1], lineEnd, Rule.FAILURE_CRLF, Lint.Replacement.appendText(lineEnd, "\r"));
        }
    }
}
var templateObject_1;
