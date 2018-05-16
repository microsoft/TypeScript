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
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys max-line-length */
    Rule.metadata = {
        ruleName: "ban-comma-operator",
        description: "Disallows the comma operator to be used.",
        descriptionDetails: "[Read more about the comma operator here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator).",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Using the comma operator can create a potential for many non-obvious bugs or lead to misunderstanding of code.\n\n            ### Examples\n            ```\n            foo((bar, baz)); // evaluates to 'foo(baz)' because of the extra parens - confusing and not obvious\n            ```\n\n            ```\n            switch (foo) {\n                case 1, 2: // equals 'case 2' - probably intended 'case 1: case2:'\n                    return true;\n                case 3:\n                    return false;\n            }\n            ```\n\n            ```\n            let x = (y = 1, z = 2); // x is equal to 2 - this may not be immediately obvious.\n            ```\n        "], ["\n            Using the comma operator can create a potential for many non-obvious bugs or lead to misunderstanding of code.\n\n            ### Examples\n            \\`\\`\\`\n            foo((bar, baz)); // evaluates to 'foo(baz)' because of the extra parens - confusing and not obvious\n            \\`\\`\\`\n\n            \\`\\`\\`\n            switch (foo) {\n                case 1, 2: // equals 'case 2' - probably intended 'case 1: case2:'\n                    return true;\n                case 3:\n                    return false;\n            }\n            \\`\\`\\`\n\n            \\`\\`\\`\n            let x = (y = 1, z = 2); // x is equal to 2 - this may not be immediately obvious.\n            \\`\\`\\`\n        "]))),
        options: null,
        optionsDescription: "",
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys max-line-length */
    Rule.FAILURE_STRING = "Do not use comma operator here because it can be easily misunderstood or lead to unintended bugs.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken && !isForLoopIncrementor(node)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
function isForLoopIncrementor(node) {
    var parent = node.parent;
    return parent.kind === ts.SyntaxKind.ForStatement && parent.incrementor === node;
}
var templateObject_1;
