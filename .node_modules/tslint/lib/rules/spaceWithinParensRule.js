"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
    Rule.FAILURE_NEEDS_SPACE = function (count) {
        return "Needs " + count + " whitespace" + (count > 1 ? "s" : "") + " within parentheses";
    };
    Rule.FAILURE_NO_EXTRA_SPACE = function (count) {
        return "No more than " + count + " whitespace" + (count > 1 ? "s" : "") + " within parentheses allowed";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new SpaceWithinParensWalker(sourceFile, this.ruleName, parseOptions(this.ruleArguments[0])));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "space-within-parens",
        description: "Enforces spaces within parentheses or disallow them.  Empty parentheses () are always allowed.",
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            You may enforce the amount of whitespace within parentheses.\n        "], ["\n            You may enforce the amount of whitespace within parentheses.\n        "]))),
        options: { type: "number", min: 0 },
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_NO_SPACE = "Whitespace within parentheses is not allowed";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(whitespaceSize) {
    var size = 0;
    if (typeof whitespaceSize === "number") {
        if (whitespaceSize >= 0) {
            size = whitespaceSize;
        }
    }
    else if (typeof whitespaceSize === "string") {
        var parsedSize = parseInt(whitespaceSize, 10);
        if (!Number.isNaN(parsedSize) && parsedSize >= 0) {
            size = parsedSize;
        }
    }
    return {
        size: size,
    };
}
var SpaceWithinParensWalker = /** @class */ (function (_super) {
    tslib_1.__extends(SpaceWithinParensWalker, _super);
    function SpaceWithinParensWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpaceWithinParensWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        tsutils_1.forEachToken(sourceFile, function (token) {
            if (token.kind === ts.SyntaxKind.OpenParenToken) {
                if (sourceFile.text.charAt(token.end) !== ")") {
                    _this.checkOpenParenToken(token);
                }
            }
            else if (token.kind === ts.SyntaxKind.CloseParenToken) {
                if (sourceFile.text.charAt(token.end - 2) !== "(") {
                    _this.checkCloseParenToken(token);
                }
            }
        });
    };
    SpaceWithinParensWalker.prototype.checkOpenParenToken = function (tokenNode) {
        var currentPos = tokenNode.end;
        var currentChar = this.sourceFile.text.charCodeAt(currentPos);
        var allowedSpaceCount = this.options.size;
        while (ts.isWhiteSpaceSingleLine(currentChar)) {
            ++currentPos;
            currentChar = this.sourceFile.text.charCodeAt(currentPos);
        }
        if (!ts.isLineBreak(currentChar)) {
            var whitespaceCount = currentPos - tokenNode.end;
            if (whitespaceCount !== allowedSpaceCount) {
                var length = 0;
                var pos = tokenNode.end;
                if (whitespaceCount > allowedSpaceCount) {
                    pos += allowedSpaceCount;
                    length = whitespaceCount - allowedSpaceCount;
                }
                else if (whitespaceCount > 0 && whitespaceCount < allowedSpaceCount) {
                    pos += allowedSpaceCount - whitespaceCount;
                }
                this.addFailureAtWithFix(pos, length, whitespaceCount);
            }
        }
    };
    SpaceWithinParensWalker.prototype.checkCloseParenToken = function (tokenNode) {
        var currentPos = tokenNode.end - 2;
        var currentChar = this.sourceFile.text.charCodeAt(currentPos);
        var allowedSpaceCount = this.options.size;
        while (ts.isWhiteSpaceSingleLine(currentChar)) {
            --currentPos;
            currentChar = this.sourceFile.text.charCodeAt(currentPos);
        }
        /**
         * Number 40 is open parenthese char code, we skip this cause
         * it's already been caught by `checkOpenParenToken`
         */
        if (!ts.isLineBreak(currentChar) && currentChar !== 40) {
            var whitespaceCount = tokenNode.end - currentPos - 2;
            if (whitespaceCount !== allowedSpaceCount) {
                var length = 0;
                var pos = currentPos + 1;
                if (whitespaceCount > allowedSpaceCount) {
                    length = whitespaceCount - allowedSpaceCount;
                }
                this.addFailureAtWithFix(pos, length, whitespaceCount);
            }
        }
    };
    SpaceWithinParensWalker.prototype.addFailureAtWithFix = function (position, length, whitespaceCount) {
        var lintMsg;
        var lintFix;
        var allowedSpaceCount = this.options.size;
        if (allowedSpaceCount === 0) {
            lintMsg = Rule.FAILURE_NO_SPACE;
            lintFix = Lint.Replacement.deleteText(position, length);
        }
        else if (allowedSpaceCount > whitespaceCount) {
            lintMsg = Rule.FAILURE_NEEDS_SPACE(allowedSpaceCount - whitespaceCount);
            var whitespace = " ".repeat(allowedSpaceCount - whitespaceCount);
            lintFix = Lint.Replacement.appendText(position, whitespace);
        }
        else {
            lintMsg = Rule.FAILURE_NO_EXTRA_SPACE(allowedSpaceCount);
            lintFix = Lint.Replacement.deleteText(position, whitespaceCount - allowedSpaceCount);
        }
        this.addFailureAt(position, length, lintMsg, lintFix);
    };
    return SpaceWithinParensWalker;
}(Lint.AbstractWalker));
var templateObject_1;
