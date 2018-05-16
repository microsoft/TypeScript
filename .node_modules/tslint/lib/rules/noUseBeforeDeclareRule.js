"use strict";
/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (name) {
        return "variable '" + name + "' used before declaration";
    };
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-use-before-declare",
        description: "Disallows usage of variables before their declaration.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            This rule is primarily useful when using the `var` keyword since the compiler will\n            automatically detect if a block-scoped `let` and `const` variable is used before\n            declaration. Since most modern TypeScript doesn't use `var`, this rule is generally\n            discouraged and is kept around for legacy purposes. It is slow to compute, is not\n            enabled in the built-in configuration presets, and should not be used to inform TSLint\n            design decisions.\n        "], ["\n            This rule is primarily useful when using the \\`var\\` keyword since the compiler will\n            automatically detect if a block-scoped \\`let\\` and \\`const\\` variable is used before\n            declaration. Since most modern TypeScript doesn't use \\`var\\`, this rule is generally\n            discouraged and is kept around for legacy purposes. It is slow to compute, is not\n            enabled in the built-in configuration presets, and should not be used to inform TSLint\n            design decisions.\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function recur(node) {
        switch (node.kind) {
            case ts.SyntaxKind.TypeReference:
                // Ignore types.
                return;
            case ts.SyntaxKind.PropertyAccessExpression:
                // Ignore `y` in `x.y`, but recurse to `x`.
                return recur(node.expression);
            case ts.SyntaxKind.Identifier:
                return checkIdentifier(node, checker.getSymbolAtLocation(node));
            case ts.SyntaxKind.ExportSpecifier:
                return checkIdentifier(node.name, checker.getExportSpecifierLocalTargetSymbol(node));
            default:
                return ts.forEachChild(node, recur);
        }
    });
    function checkIdentifier(node, symbol) {
        var declarations = symbol === undefined ? undefined : symbol.declarations;
        if (declarations === undefined || declarations.length === 0) {
            return;
        }
        var declaredBefore = declarations.some(function (decl) {
            switch (decl.kind) {
                case ts.SyntaxKind.FunctionDeclaration:
                    // Functions may be declared later.
                    return true;
                default:
                    // Use `<=` in case this *is* the declaration.
                    // If it's a global declared in a different file, OK.
                    return decl.pos <= node.pos || decl.getSourceFile() !== ctx.sourceFile;
            }
        });
        if (!declaredBefore) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING(node.text));
        }
    }
}
var templateObject_1;
