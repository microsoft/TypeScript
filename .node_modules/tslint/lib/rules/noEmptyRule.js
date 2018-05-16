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
var ALLOW_EMPTY_CATCH = "allow-empty-catch";
var ALLOW_EMPTY_FUNCTIONS = "allow-empty-functions";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            allowEmptyCatch: this.ruleArguments.indexOf(ALLOW_EMPTY_CATCH) !== -1,
            allowEmptyFunctions: this.ruleArguments.indexOf(ALLOW_EMPTY_FUNCTIONS) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-empty",
        description: "Disallows empty blocks.",
        descriptionDetails: "Blocks with a comment inside are not considered empty.",
        rationale: "Empty blocks are often indicators of missing code.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If `", "` is specified, then catch blocks are allowed to be empty.\n            If `", "` is specified, then function definitions are allowed to be empty."], ["\n            If \\`", "\\` is specified, then catch blocks are allowed to be empty.\n            If \\`", "\\` is specified, then function definitions are allowed to be empty."])), ALLOW_EMPTY_CATCH, ALLOW_EMPTY_FUNCTIONS),
        options: {
            type: "array",
            items: {
                anyOf: [
                    {
                        type: "string",
                        enum: [ALLOW_EMPTY_CATCH],
                    },
                    {
                        type: "string",
                        enum: [ALLOW_EMPTY_FUNCTIONS],
                    },
                ],
            },
        },
        optionExamples: [
            true,
            [true, ALLOW_EMPTY_CATCH],
            [true, ALLOW_EMPTY_FUNCTIONS],
            [true, ALLOW_EMPTY_CATCH, ALLOW_EMPTY_FUNCTIONS],
        ],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "block is empty";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.Block &&
            node.statements.length === 0 &&
            !isExcluded(node.parent, ctx.options)) {
            var start = node.getStart(ctx.sourceFile);
            // Block always starts with open brace. Adding 1 to its start gives us the end of the brace,
            // which can be used to conveniently check for comments between braces
            if (Lint.hasCommentAfterPosition(ctx.sourceFile.text, start + 1)) {
                return;
            }
            return ctx.addFailure(start, node.end, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
function isExcluded(node, options) {
    if (options.allowEmptyCatch && node.kind === ts.SyntaxKind.CatchClause) {
        return true;
    }
    if (options.allowEmptyFunctions &&
        (node.kind === ts.SyntaxKind.FunctionDeclaration ||
            node.kind === ts.SyntaxKind.FunctionExpression ||
            node.kind === ts.SyntaxKind.ArrowFunction)) {
        return true;
    }
    return tsutils_1.isConstructorDeclaration(node) &&
        (
        /* If constructor is private or protected, the block is allowed to be empty.
           The constructor is there on purpose to disallow instantiation from outside the class */
        /* The public modifier does not serve a purpose here. It can only be used to allow instantiation of a base class where
           the super constructor is protected. But then the block would not be empty, because of the call to super() */
        tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword) ||
            node.parameters.some(tsutils_1.isParameterProperty));
}
var templateObject_1;
