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
var Lint = require("..");
var OPTION_FUNCTION_IN_METHOD = "check-function-in-method";
var DEPRECATED_OPTION_FUNCTION_IN_METHOD = "no-this-in-function-in-method";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var _this = this;
        var hasOption = function (name) { return _this.ruleArguments.indexOf(name) !== -1; };
        var checkFuncInMethod = hasOption(DEPRECATED_OPTION_FUNCTION_IN_METHOD) || hasOption(OPTION_FUNCTION_IN_METHOD);
        return this.applyWithFunction(sourceFile, walk, checkFuncInMethod);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-invalid-this",
        description: "Disallows using the `this` keyword outside of classes.",
        rationale: "See [the rule's author's rationale here.](https://github.com/palantir/tslint/pull/1105#issue-147549402)",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One argument may be optionally provided:\n\n            * `", "` disallows using the `this` keyword in functions within class methods."], ["\n            One argument may be optionally provided:\n\n            * \\`", "\\` disallows using the \\`this\\` keyword in functions within class methods."])), OPTION_FUNCTION_IN_METHOD),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_FUNCTION_IN_METHOD],
            },
            minLength: 0,
            maxLength: 1,
        },
        optionExamples: [true, [true, OPTION_FUNCTION_IN_METHOD]],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_OUTSIDE = "the \"this\" keyword is disallowed outside of a class body";
    Rule.FAILURE_STRING_INSIDE = "the \"this\" keyword is disallowed in function bodies inside class methods, " +
        "use arrow functions instead";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, checkFuncInMethod = ctx.options;
    var inClass = false;
    var inFunctionInClass = false;
    ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                if (!inClass) {
                    inClass = true;
                    ts.forEachChild(node, cb);
                    inClass = false;
                    return;
                }
                break;
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                if (node.parameters.some(tsutils_1.isThisParameter)) {
                    return;
                }
                if (inClass) {
                    inFunctionInClass = true;
                    ts.forEachChild(node, cb);
                    inFunctionInClass = false;
                    return;
                }
                break;
            case ts.SyntaxKind.ThisKeyword:
                if (!inClass) {
                    ctx.addFailureAtNode(node, Rule.FAILURE_STRING_OUTSIDE);
                }
                else if (checkFuncInMethod && inFunctionInClass) {
                    ctx.addFailureAtNode(node, Rule.FAILURE_STRING_INSIDE);
                }
                return;
        }
        ts.forEachChild(node, cb);
    });
}
var templateObject_1;
