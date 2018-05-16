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
var OPTION_IGNORE_FOR_LOOP = "ignore-for-loop";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, { ignoreForLoop: this.ruleArguments.indexOf(OPTION_IGNORE_FOR_LOOP) !== -1 });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "one-variable-per-declaration",
        description: "Disallows multiple variable definitions in the same declaration statement.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One argument may be optionally provided:\n\n            * `", "` allows multiple variable definitions in a for loop declaration."], ["\n            One argument may be optionally provided:\n\n            * \\`", "\\` allows multiple variable definitions in a for loop declaration."])), OPTION_IGNORE_FOR_LOOP),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_IGNORE_FOR_LOOP],
            },
            minLength: 0,
            maxLength: 1,
        },
        optionExamples: [true, [true, OPTION_IGNORE_FOR_LOOP]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Multiple variable declarations in the same statement are forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isVariableStatement(node) && node.declarationList.declarations.length > 1) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        else if (tsutils_1.isForStatement(node) && !ctx.options.ignoreForLoop) {
            var initializer = node.initializer;
            if (initializer !== undefined
                && initializer.kind === ts.SyntaxKind.VariableDeclarationList
                && initializer.declarations.length > 1) {
                ctx.addFailureAtNode(initializer, Rule.FAILURE_STRING);
            }
        }
        ts.forEachChild(node, cb);
    });
}
var templateObject_1;
