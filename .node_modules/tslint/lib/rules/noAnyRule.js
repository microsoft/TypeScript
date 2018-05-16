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
        ruleName: "no-any",
        description: "Disallows usages of `any` as a type declaration.",
        hasFix: false,
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Using `any` as a type declaration nullifies the compile-time benefits of the type system.\n\n            If you're dealing with data of unknown or \"any\" types, you shouldn't be accessing members of it.\n            Either add type annotations for properties that may exist or change the data type to the empty object type `{}`.\n\n            Alternately, if you're creating storage or handling for consistent but unknown types, such as in data structures\n            or serialization, use `<T>` template types for generic type handling.\n\n            Also see the `no-unsafe-any` rule.\n        "], ["\n            Using \\`any\\` as a type declaration nullifies the compile-time benefits of the type system.\n\n            If you're dealing with data of unknown or \"any\" types, you shouldn't be accessing members of it.\n            Either add type annotations for properties that may exist or change the data type to the empty object type \\`{}\\`.\n\n            Alternately, if you're creating storage or handling for consistent but unknown types, such as in data structures\n            or serialization, use \\`<T>\\` template types for generic type handling.\n\n            Also see the \\`no-unsafe-any\\` rule.\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Type declaration of 'any' loses type-safety. Consider replacing it with a more precise type.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.AnyKeyword) {
            var start = node.end - 3;
            return ctx.addFailure(start, node.end, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1;
