"use strict";
/**
 * @license
 * Copyright 2018 Palantir Technologies, Inc.
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
var preferWhile_examples_1 = require("./code-examples/preferWhile.examples");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var _this = this;
        var failures = [];
        var cb = function (node) {
            if (tsutils_1.isForStatement(node) && _this.doesNodeViolateRule(node)) {
                failures.push(_this.createFailure(sourceFile, node));
            }
            return ts.forEachChild(node, cb);
        };
        ts.forEachChild(sourceFile, cb);
        return failures;
    };
    Rule.prototype.doesNodeViolateRule = function (node) {
        return (node.initializer === undefined && node.incrementor === undefined);
    };
    Rule.prototype.createFailure = function (sourceFile, node) {
        var start = node.getStart(sourceFile);
        var end = node.statement.pos;
        var fix;
        if (node.condition === undefined) {
            fix = Lint.Replacement.replaceFromTo(start, end, "while (true)");
        }
        else {
            fix = [
                Lint.Replacement.replaceFromTo(start, node.condition.getStart(sourceFile), "while ("),
                Lint.Replacement.deleteFromTo(node.condition.end, end - 1),
            ];
        }
        return new Lint.RuleFailure(sourceFile, start, end, Rule.FAILURE_STRING, this.ruleName, fix);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "prefer-while",
        description: "Prefer `while` loops instead of `for` loops without an initializer and incrementor.",
        rationale: "Simplifies the readability of the loop statement, while maintaining the same functionality.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        hasFix: true,
        type: "style",
        typescriptOnly: false,
        codeExamples: preferWhile_examples_1.codeExamples,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Prefer `while` loops instead of `for` loops without an initializer and incrementor.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
