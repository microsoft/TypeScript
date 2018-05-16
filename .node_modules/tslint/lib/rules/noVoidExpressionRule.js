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
var OPTION_IGNORE_ARROW_FUNCTION_SHORTHAND = "ignore-arrow-function-shorthand";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var ignoreArrowFunctionShorthand = this.ruleArguments.indexOf(OPTION_IGNORE_ARROW_FUNCTION_SHORTHAND) !== -1;
        return this.applyWithFunction(sourceFile, walk, { ignoreArrowFunctionShorthand: ignoreArrowFunctionShorthand }, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-void-expression",
        description: "Requires expressions of type `void` to appear in statement position.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If `", "` is provided, `() => returnsVoid()` will be allowed.\n            Otherwise, it must be written as `() => { returnsVoid(); }`."], ["\n            If \\`", "\\` is provided, \\`() => returnsVoid()\\` will be allowed.\n            Otherwise, it must be written as \\`() => { returnsVoid(); }\\`."])), OPTION_IGNORE_ARROW_FUNCTION_SHORTHAND),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_IGNORE_ARROW_FUNCTION_SHORTHAND],
            },
            minLength: 0,
            maxLength: 1,
        },
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            It's misleading returning the results of an expression whose type is `void`.\n            Attempting to do so is likely a symptom of expecting a different return type from a function.\n            For example, the following code will log `undefined` but looks like it logs a value:\n\n            ```\n            const performWork = (): void => {\n                workFirst();\n                workSecond();\n            };\n\n            console.log(performWork());\n            ```\n        "], ["\n            It's misleading returning the results of an expression whose type is \\`void\\`.\n            Attempting to do so is likely a symptom of expecting a different return type from a function.\n            For example, the following code will log \\`undefined\\` but looks like it logs a value:\n\n            \\`\\`\\`\n            const performWork = (): void => {\n                workFirst();\n                workSecond();\n            };\n\n            console.log(performWork());\n            \\`\\`\\`\n        "]))),
        requiresTypeInfo: true,
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Expression has type `void`. Put it on its own line as a statement.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    var sourceFile = ctx.sourceFile, ignoreArrowFunctionShorthand = ctx.options.ignoreArrowFunctionShorthand;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (isPossiblyVoidExpression(node)
            && !isParentAllowedVoid(node)
            && tsutils_1.isTypeFlagSet(checker.getTypeAtLocation(node), ts.TypeFlags.Void)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
    function isParentAllowedVoid(node) {
        switch (node.parent.kind) {
            case ts.SyntaxKind.ExpressionStatement:
                return true;
            case ts.SyntaxKind.ArrowFunction:
                return ignoreArrowFunctionShorthand;
            default:
                return false;
        }
    }
}
function isPossiblyVoidExpression(node) {
    switch (node.kind) {
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.TaggedTemplateExpression:
            return true;
        default:
            return false;
    }
}
var templateObject_1, templateObject_2;
