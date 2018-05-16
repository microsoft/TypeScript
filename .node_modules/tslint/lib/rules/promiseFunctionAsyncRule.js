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
var OPTION_FUNCTION_DECLARATION = "check-function-declaration";
var OPTION_FUNCTION_EXPRESSION = "check-function-expression";
var OPTION_ARROW_FUNCTION = "check-arrow-function";
var OPTION_METHOD_DECLARATION = "check-method-declaration";
var KIND_FOR_OPTION = (_a = {},
    _a[OPTION_FUNCTION_DECLARATION] = ts.SyntaxKind.FunctionDeclaration,
    _a[OPTION_FUNCTION_EXPRESSION] = ts.SyntaxKind.FunctionExpression,
    _a[OPTION_ARROW_FUNCTION] = ts.SyntaxKind.ArrowFunction,
    _a[OPTION_METHOD_DECLARATION] = ts.SyntaxKind.MethodDeclaration,
    _a);
function parseOptions(ruleArguments) {
    if (ruleArguments.length === 0) {
        ruleArguments = Object.keys(KIND_FOR_OPTION);
    }
    var enabledKinds = new Set();
    for (var _i = 0, ruleArguments_1 = ruleArguments; _i < ruleArguments_1.length; _i++) {
        var arg = ruleArguments_1[_i];
        enabledKinds.add(KIND_FOR_OPTION[arg]);
    }
    return enabledKinds;
}
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments), program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "promise-function-async",
        description: "Requires any function or method that returns a promise to be marked async.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Ensures that each function is only capable of 1) returning a rejected promise, or 2)\n            throwing an Error object. In contrast, non-`async` `Promise`-returning functions\n            are technically capable of either. This practice removes a requirement for consuming\n            code to handle both cases.\n\n            If no optional arguments are provided then all function types are checked,\n            otherwise the specific function types are checked:\n\n            * `\"", "\"` check function declarations.\n            * `\"", "\"` check function expressions.\n            * `\"", "\"` check arrow functions.\n            * `\"", "\"` check method declarations.\n        "], ["\n            Ensures that each function is only capable of 1) returning a rejected promise, or 2)\n            throwing an Error object. In contrast, non-\\`async\\` \\`Promise\\`-returning functions\n            are technically capable of either. This practice removes a requirement for consuming\n            code to handle both cases.\n\n            If no optional arguments are provided then all function types are checked,\n            otherwise the specific function types are checked:\n\n            * \\`\"", "\"\\` check function declarations.\n            * \\`\"", "\"\\` check function expressions.\n            * \\`\"", "\"\\` check arrow functions.\n            * \\`\"", "\"\\` check method declarations.\n        "])), OPTION_FUNCTION_DECLARATION, OPTION_FUNCTION_EXPRESSION, OPTION_ARROW_FUNCTION, OPTION_METHOD_DECLARATION),
        optionsDescription: "Not configurable.",
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    OPTION_FUNCTION_DECLARATION,
                    OPTION_FUNCTION_EXPRESSION,
                    OPTION_ARROW_FUNCTION,
                    OPTION_METHOD_DECLARATION,
                ],
            },
            minLength: 0,
            maxLength: 4,
        },
        optionExamples: [true,
            [true, OPTION_FUNCTION_DECLARATION, OPTION_METHOD_DECLARATION]],
        type: "typescript",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "functions that return promises must be async";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, tc) {
    var sourceFile = ctx.sourceFile, options = ctx.options;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (options.has(node.kind)) {
            switch (node.kind) {
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.FunctionDeclaration:
                    if (node.body === undefined) {
                        break;
                    }
                // falls through
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    if (!tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword)
                        && returnsPromise(node, tc)) {
                        ctx.addFailure(node.getStart(sourceFile), node.body.pos, Rule.FAILURE_STRING);
                    }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function returnsPromise(node, tc) {
    var type = tc.getReturnTypeOfSignature(tc.getTypeAtLocation(node).getCallSignatures()[0]);
    return type.symbol !== undefined && type.symbol.name === "Promise";
}
var templateObject_1;
var _a;
