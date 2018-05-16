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
        ruleName: "no-non-null-assertion",
        description: "Disallows non-null assertions using the `!` postfix operator.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Using non-null assertion cancels the benefits of the strict null checking mode.\n\n            Instead of assuming objects exist:\n\n            ```\n            function foo(instance: MyClass | undefined) {\n                instance!.doWork();\n            }\n            ```\n\n            Either inform the strict type system that the object must exist:\n\n            ```\n            function foo(instance: MyClass) {\n                instance.doWork();\n            }\n            ```\n\n            Or verify that the instance exists, which will inform the type checker:\n\n            ```\n            function foo(instance: MyClass | undefined) {\n                if (instance !== undefined) {\n                    instance.doWork();\n                }\n            }\n            ```\n        "], ["\n            Using non-null assertion cancels the benefits of the strict null checking mode.\n\n            Instead of assuming objects exist:\n\n            \\`\\`\\`\n            function foo(instance: MyClass | undefined) {\n                instance!.doWork();\n            }\n            \\`\\`\\`\n\n            Either inform the strict type system that the object must exist:\n\n            \\`\\`\\`\n            function foo(instance: MyClass) {\n                instance.doWork();\n            }\n            \\`\\`\\`\n\n            Or verify that the instance exists, which will inform the type checker:\n\n            \\`\\`\\`\n            function foo(instance: MyClass | undefined) {\n                if (instance !== undefined) {\n                    instance.doWork();\n                }\n            }\n            \\`\\`\\`\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Forbidden non null assertion";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.NonNullExpression) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1;
