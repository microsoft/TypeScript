"use strict";
/**
 * @license
 * Copyright 2015 Palantir Technologies, Inc.
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
        ruleName: "no-var-keyword",
        description: "Disallows usage of the `var` keyword.",
        descriptionDetails: "Use `let` or `const` instead.",
        hasFix: true,
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Declaring variables using `var` has several edge case behaviors that make `var` unsuitable for modern code.\n            Variables declared by `var` have their parent function block as their scope, ignoring other control flow statements.\n            `var`s have declaration \"hoisting\" (similar to `function`s) and can appear to be used before declaration.\n\n            Variables declared by `const` and `let` instead have as their scope the block in which they are defined,\n            and are not allowed to used before declaration or be re-declared with another `const` or `let`.\n        "], ["\n            Declaring variables using \\`var\\` has several edge case behaviors that make \\`var\\` unsuitable for modern code.\n            Variables declared by \\`var\\` have their parent function block as their scope, ignoring other control flow statements.\n            \\`var\\`s have declaration \"hoisting\" (similar to \\`function\\`s) and can appear to be used before declaration.\n\n            Variables declared by \\`const\\` and \\`let\\` instead have as their scope the block in which they are defined,\n            and are not allowed to used before declaration or be re-declared with another \\`const\\` or \\`let\\`.\n        "]))),
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Forbidden 'var' keyword, use 'let' or 'const' instead";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    return ts.forEachChild(sourceFile, function cb(node) {
        var parent = node.parent;
        if (tsutils_1.isVariableDeclarationList(node)
            && !tsutils_1.isBlockScopedVariableDeclarationList(node)
            // If !isVariableStatement, this is inside of a for loop.
            && (!tsutils_1.isVariableStatement(parent) || !isGlobalVarDeclaration(parent))) {
            var start = node.getStart(sourceFile);
            var width = "var".length;
            // Don't apply fix in a declaration file, because may have meant 'const'.
            var fix = sourceFile.isDeclarationFile ? undefined : new Lint.Replacement(start, width, "let");
            ctx.addFailureAt(start, width, Rule.FAILURE_STRING, fix);
        }
        return ts.forEachChild(node, cb);
    });
}
// Allow `declare var x: number;` or `declare global { var x: number; }`
function isGlobalVarDeclaration(node) {
    var parent = node.parent;
    return tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)
        || parent.kind === ts.SyntaxKind.ModuleBlock && tsutils_1.isNodeFlagSet(parent.parent, ts.NodeFlags.GlobalAugmentation);
}
var templateObject_1;
