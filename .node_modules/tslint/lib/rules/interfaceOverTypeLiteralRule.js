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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "interface-over-type-literal",
        description: "Prefer an interface declaration over a type literal (`type T = { ... }`)",
        rationale: "Interfaces are generally preferred over type literals because interfaces can be implemented, extended and merged.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use an interface instead of a type literal.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isTypeAliasDeclaration(node) && tsutils_1.isTypeLiteralNode(node.type)) {
            var typeKeyword = tsutils_1.getChildOfKind(node, ts.SyntaxKind.TypeKeyword, ctx.sourceFile);
            var fix = [
                // "type" -> "interface"
                new Lint.Replacement(typeKeyword.end - 4, 4, "interface"),
                // remove "=" and trivia up to the open curly brace of the type literal
                Lint.Replacement.deleteFromTo(node.type.pos - 1, node.type.members.pos - 1),
            ];
            // remove trailing semicolon if exists
            if (ctx.sourceFile.text[node.end - 1] === ";") {
                fix.push(Lint.Replacement.deleteText(node.end - 1, 1));
            }
            ctx.addFailureAtNode(node.name, Rule.FAILURE_STRING, fix);
        }
        return ts.forEachChild(node, cb);
    });
}
