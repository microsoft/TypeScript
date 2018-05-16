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
        ruleName: "no-default-export",
        description: "Disallows default exports in ES6-style modules.",
        descriptionDetails: "Use named exports instead.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Named imports/exports [promote clarity](https://github.com/palantir/tslint/issues/1182#issue-151780453).\n            In addition, current tooling differs on the correct way to handle default imports/exports.\n            Avoiding them all together can help avoid tooling bugs and conflicts."], ["\n            Named imports/exports [promote clarity](https://github.com/palantir/tslint/issues/1182#issue-151780453).\n            In addition, current tooling differs on the correct way to handle default imports/exports.\n            Avoiding them all together can help avoid tooling bugs and conflicts."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use of default exports is forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    if (ctx.sourceFile.isDeclarationFile || !ts.isExternalModule(ctx.sourceFile)) {
        return;
    }
    for (var _i = 0, _a = ctx.sourceFile.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        if (statement.kind === ts.SyntaxKind.ExportAssignment) {
            if (!statement.isExportEquals) {
                ctx.addFailureAtNode(statement.getChildAt(1, ctx.sourceFile), Rule.FAILURE_STRING);
            }
        }
        else if (statement.modifiers !== undefined && statement.modifiers.length >= 2 &&
            statement.modifiers[0].kind === ts.SyntaxKind.ExportKeyword &&
            statement.modifiers[1].kind === ts.SyntaxKind.DefaultKeyword) {
            ctx.addFailureAtNode(statement.modifiers[1], Rule.FAILURE_STRING);
        }
    }
}
var templateObject_1;
