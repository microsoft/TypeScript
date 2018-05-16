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
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NewlineBeforeReturnWalker(sourceFile, this.ruleName, undefined));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "newline-before-return",
        description: "Enforces blank line before return when not the only line in the block.",
        rationale: "Helps maintain a readable style in your codebase.",
        optionsDescription: "Not configurable.",
        options: {},
        optionExamples: [true],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Missing blank line before return";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NewlineBeforeReturnWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NewlineBeforeReturnWalker, _super);
    function NewlineBeforeReturnWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewlineBeforeReturnWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (node.kind === ts.SyntaxKind.ReturnStatement) {
                _this.visitReturnStatement(node);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    NewlineBeforeReturnWalker.prototype.visitReturnStatement = function (node) {
        var prev = tsutils_1.getPreviousStatement(node);
        if (prev === undefined) {
            // return is not within a block (e.g. the only child of an IfStatement) or the first statement of the block
            // no need to check for preceding newline
            return;
        }
        var start = node.getStart(this.sourceFile);
        var line = ts.getLineAndCharacterOfPosition(this.sourceFile, start).line;
        var comments = ts.getLeadingCommentRanges(this.sourceFile.text, node.pos);
        if (comments !== undefined) {
            // check for blank lines between comments
            for (var i = comments.length - 1; i >= 0; --i) {
                var endLine = ts.getLineAndCharacterOfPosition(this.sourceFile, comments[i].end).line;
                if (endLine < line - 1) {
                    return;
                }
                start = comments[i].pos;
                line = ts.getLineAndCharacterOfPosition(this.sourceFile, start).line;
            }
        }
        var prevLine = ts.getLineAndCharacterOfPosition(this.sourceFile, prev.end).line;
        if (prevLine >= line - 1) {
            // Previous statement is on the same or previous line
            this.addFailure(start, start, Rule.FAILURE_STRING);
        }
    };
    return NewlineBeforeReturnWalker;
}(Lint.AbstractWalker));
