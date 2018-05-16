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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_ALLOW_DECLARATIONS = "allow-declarations";
var OPTION_ALLOW_NAMED_FUNCTIONS = "allow-named-functions";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "only-arrow-functions",
        description: "Disallows traditional (non-arrow) function expressions.",
        rationale: "Traditional functions don't bind lexical scope, which can lead to unexpected behavior when accessing 'this'.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Two arguments may be optionally provided:\n\n            * `\"", "\"` allows standalone function declarations.\n            * `\"", "\"` allows the expression `function foo() {}` but not `function() {}`.\n        "], ["\n            Two arguments may be optionally provided:\n\n            * \\`\"", "\"\\` allows standalone function declarations.\n            * \\`\"", "\"\\` allows the expression \\`function foo() {}\\` but not \\`function() {}\\`.\n        "])), OPTION_ALLOW_DECLARATIONS, OPTION_ALLOW_NAMED_FUNCTIONS),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_ALLOW_DECLARATIONS, OPTION_ALLOW_NAMED_FUNCTIONS],
            },
            minLength: 0,
            maxLength: 1,
        },
        optionExamples: [true, [true, OPTION_ALLOW_DECLARATIONS, OPTION_ALLOW_NAMED_FUNCTIONS]],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "non-arrow functions are forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    return {
        allowDeclarations: hasOption(OPTION_ALLOW_DECLARATIONS),
        allowNamedFunctions: hasOption(OPTION_ALLOW_NAMED_FUNCTIONS),
    };
    function hasOption(name) {
        return ruleArguments.indexOf(name) !== -1;
    }
}
function walk(ctx) {
    var sourceFile = ctx.sourceFile, _a = ctx.options, allowDeclarations = _a.allowDeclarations, allowNamedFunctions = _a.allowNamedFunctions;
    return ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
                if (allowDeclarations) {
                    break;
                }
            // falls through
            case ts.SyntaxKind.FunctionExpression: {
                var f = node;
                if (!(allowNamedFunctions && f.name !== undefined) && !functionIsExempt(f)) {
                    ctx.addFailureAtNode(utils.getChildOfKind(node, ts.SyntaxKind.FunctionKeyword, ctx.sourceFile), Rule.FAILURE_STRING);
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
/** Generator functions and functions using `this` are allowed. */
function functionIsExempt(node) {
    return node.asteriskToken !== undefined ||
        node.parameters.length !== 0 && utils.isThisParameter(node.parameters[0]) ||
        node.body !== undefined && ts.forEachChild(node, usesThis) === true;
}
function usesThis(node) {
    return node.kind === ts.SyntaxKind.ThisKeyword || !utils.hasOwnThisReference(node) && ts.forEachChild(node, usesThis);
}
var templateObject_1;
