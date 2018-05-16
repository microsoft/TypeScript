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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, ["Promise"].concat(this.ruleArguments), program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-floating-promises",
        description: "Promises returned by functions must be handled appropriately.",
        descriptionDetails: "Unhandled Promises can cause unexpected behavior, such as resolving at unexpected times.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            A list of 'string' names of any additional classes that should also be handled as Promises.\n        "], ["\n            A list of \\'string\\' names of any additional classes that should also be handled as Promises.\n        "]))),
        options: {
            type: "list",
            listType: {
                type: "array",
                items: { type: "string" },
            },
        },
        optionExamples: [true, [true, "JQueryPromise"]],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Creating a Promise and not storing or returning may lets other code run independent of of its results.\n            This can cause unexpected and/or non-deterministic behavior depending on external timing factors.\n\n            It's typically better to return Promises from functions that start them, then handle them in calling code.\n\n            Use `no-unused-expression` in addition to this rule to reveal even more floating promises.\n        "], ["\n            Creating a Promise and not storing or returning may lets other code run independent of of its results.\n            This can cause unexpected and/or non-deterministic behavior depending on external timing factors.\n\n            It's typically better to return Promises from functions that start them, then handle them in calling code.\n\n            Use \\`no-unused-expression\\` in addition to this rule to reveal even more floating promises.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Promises must be handled appropriately";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, tc) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isExpressionStatement(node)) {
            var expression = node.expression;
            if (tsutils_1.isCallExpression(expression) &&
                !isPromiseCatchCall(expression) &&
                !isPromiseThenCallWithRejectionHandler(expression)) {
                var symbol = tc.getTypeAtLocation(expression).symbol;
                if (symbol !== undefined && ctx.options.indexOf(symbol.name) !== -1) {
                    ctx.addFailureAtNode(expression, Rule.FAILURE_STRING);
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function isPromiseCatchCall(expression) {
    return tsutils_1.isPropertyAccessExpression(expression.expression) && expression.expression.name.text === "catch";
}
function isPromiseThenCallWithRejectionHandler(expression) {
    return tsutils_1.isPropertyAccessExpression(expression.expression) &&
        expression.expression.name.text === "then" &&
        expression.arguments.length >= 2;
}
var templateObject_1, templateObject_2;
