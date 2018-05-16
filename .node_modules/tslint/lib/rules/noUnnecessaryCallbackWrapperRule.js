"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (cbText) {
        return "No need to wrap '" + cbText + "' in another function. Just use it directly.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unnecessary-callback-wrapper",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Replaces `x => f(x)` with just `f`.\n            To catch more cases, enable `only-arrow-functions` and `arrow-return-shorthand` too."], ["\n            Replaces \\`x => f(x)\\` with just \\`f\\`.\n            To catch more cases, enable \\`only-arrow-functions\\` and \\`arrow-return-shorthand\\` too."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            There's generally no reason to wrap a function with a callback wrapper if it's directly called anyway.\n            Doing so creates extra inline lambdas that slow the runtime down.\n        "], ["\n            There's generally no reason to wrap a function with a callback wrapper if it's directly called anyway.\n            Doing so creates extra inline lambdas that slow the runtime down.\n        "]))),
        type: "style",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (tsutils_1.isArrowFunction(node) && !tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword) &&
            tsutils_1.isCallExpression(node.body) && tsutils_1.isIdentifier(node.body.expression) &&
            isRedundantCallback(node.parameters, node.body.arguments, node.body.expression)) {
            var start = node.getStart(ctx.sourceFile);
            ctx.addFailure(start, node.end, Rule.FAILURE_STRING(node.body.expression.text), [
                Lint.Replacement.deleteFromTo(start, node.body.getStart(ctx.sourceFile)),
                Lint.Replacement.deleteFromTo(node.body.expression.end, node.end),
            ]);
        }
        else {
            return ts.forEachChild(node, cb);
        }
    }
}
function isRedundantCallback(parameters, args, expression) {
    if (parameters.length !== args.length) {
        return false;
    }
    for (var i = 0; i < parameters.length; ++i) {
        var _a = parameters[i], dotDotDotToken = _a.dotDotDotToken, name = _a.name;
        var arg = args[i];
        if (dotDotDotToken !== undefined) {
            if (!tsutils_1.isSpreadElement(arg)) {
                return false;
            }
            arg = arg.expression;
        }
        if (!tsutils_1.isIdentifier(name) || !tsutils_1.isIdentifier(arg) || name.text !== arg.text
            // If the invoked expression is one of the parameters, bail.
            || expression.text === name.text) {
            return false;
        }
    }
    return true;
}
var templateObject_1, templateObject_2;
