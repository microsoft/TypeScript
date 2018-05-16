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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (method) {
        return "Calls to 'console." + method + "' are not allowed.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-console",
        description: "Bans the use of specified `console` methods.",
        rationale: "In general, \`console\` methods aren't appropriate for production code.",
        optionsDescription: "A list of method names to ban. If no method names are provided, all console methods are banned.",
        options: {
            type: "array",
            items: { type: "string" },
        },
        optionExamples: [[true, "log", "error"]],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node) &&
            tsutils_1.isPropertyAccessExpression(node.expression) &&
            tsutils_1.isIdentifier(node.expression.expression) &&
            node.expression.expression.text === "console" &&
            (ctx.options.length === 0 || ctx.options.indexOf(node.expression.name.text) !== -1)) {
            ctx.addFailureAtNode(node.expression, Rule.FAILURE_STRING_FACTORY(node.expression.name.text));
        }
        return ts.forEachChild(node, cb);
    });
}
