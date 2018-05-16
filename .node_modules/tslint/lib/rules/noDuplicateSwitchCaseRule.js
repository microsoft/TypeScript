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
var ts = require("typescript");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        description: "Prevents duplicate cases in switch statements.",
        optionExamples: [true],
        options: null,
        optionsDescription: "",
        ruleName: "no-duplicate-switch-case",
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING_FACTORY = function (text) { return "Duplicate switch case: '" + text + "'."; };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.CaseBlock) {
            visitCaseBlock(node);
        }
        ts.forEachChild(node, cb);
    });
    function visitCaseBlock(node) {
        var previousCases = new Set();
        for (var _i = 0, _a = node.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            if (clause.kind === ts.SyntaxKind.DefaultClause) {
                continue;
            }
            var text = clause.expression.getText(ctx.sourceFile);
            if (!previousCases.has(text)) {
                previousCases.add(text);
                continue;
            }
            ctx.addFailureAtNode(clause.expression, Rule.FAILURE_STRING_FACTORY(text));
        }
    }
}
