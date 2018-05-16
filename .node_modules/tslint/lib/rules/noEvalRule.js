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
        ruleName: "no-eval",
        description: "Disallows `eval` function invocations.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            `eval()` is dangerous as it allows arbitrary code execution with full privileges. There are\n            [alternatives](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)\n            for most of the use cases for `eval()`."], ["\n            \\`eval()\\` is dangerous as it allows arbitrary code execution with full privileges. There are\n            [alternatives](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)\n            for most of the use cases for \\`eval()\\`."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "forbidden eval";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.Identifier && node.expression.text === "eval") {
            ctx.addFailureAtNode(node.expression, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1;
