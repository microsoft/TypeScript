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
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_ALLOW_DECLARATIONS = "allow-declarations";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            allowDeclarations: this.ruleArguments.indexOf(OPTION_ALLOW_DECLARATIONS) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-namespace",
        description: "Disallows use of internal \`module\`s and \`namespace\`s.",
        descriptionDetails: "This rule still allows the use of `declare module ... {}`",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            ES6-style external modules are the standard way to modularize code.\n            Using `module {}` and `namespace {}` are outdated ways to organize TypeScript code."], ["\n            ES6-style external modules are the standard way to modularize code.\n            Using \\`module {}\\` and \\`namespace {}\\` are outdated ways to organize TypeScript code."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            One argument may be optionally provided:\n\n            * `", "` allows `declare namespace ... {}` to describe external APIs."], ["\n            One argument may be optionally provided:\n\n            * \\`", "\\` allows \\`declare namespace ... {}\\` to describe external APIs."])), OPTION_ALLOW_DECLARATIONS),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_ALLOW_DECLARATIONS],
            },
            minLength: 0,
            maxLength: 1,
        },
        optionExamples: [true, [true, OPTION_ALLOW_DECLARATIONS]],
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "'namespace' and 'module' are disallowed";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    // Ignore all .d.ts files by returning and not walking their ASTs.
    // .d.ts declarations do not have the Ambient flag set, but are still declarations.
    if (ctx.sourceFile.isDeclarationFile && ctx.options.allowDeclarations) {
        return;
    }
    for (var _i = 0, _a = ctx.sourceFile.statements; _i < _a.length; _i++) {
        var node = _a[_i];
        if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            if (node.name.kind !== ts.SyntaxKind.StringLiteral &&
                !tsutils_1.isNodeFlagSet(node, ts.NodeFlags.GlobalAugmentation) &&
                (!ctx.options.allowDeclarations || !tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword))) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }
    }
}
var templateObject_1, templateObject_2;
