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
var OPTION_ALLOW_NULL_CHECK = "allow-null-check";
var OPTION_ALLOW_UNDEFINED_CHECK = "allow-undefined-check";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            allowNull: this.ruleArguments.indexOf(OPTION_ALLOW_NULL_CHECK) !== -1,
            allowUndefined: this.ruleArguments.indexOf(OPTION_ALLOW_UNDEFINED_CHECK) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "triple-equals",
        description: "Requires `===` and `!==` in place of `==` and `!=`.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Two arguments may be optionally provided:\n\n            * `\"allow-null-check\"` allows `==` and `!=` when comparing to `null`.\n            * `\"allow-undefined-check\"` allows `==` and `!=` when comparing to `undefined`."], ["\n            Two arguments may be optionally provided:\n\n            * \\`\"allow-null-check\"\\` allows \\`==\\` and \\`!=\\` when comparing to \\`null\\`.\n            * \\`\"allow-undefined-check\"\\` allows \\`==\\` and \\`!=\\` when comparing to \\`undefined\\`."]))),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_ALLOW_NULL_CHECK, OPTION_ALLOW_UNDEFINED_CHECK],
            },
            minLength: 0,
            maxLength: 2,
        },
        optionExamples: [
            true,
            [true, "allow-null-check"],
            [true, "allow-undefined-check"],
        ],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.EQ_FAILURE_STRING = "== should be ===";
    Rule.NEQ_FAILURE_STRING = "!= should be !==";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node)) {
            if ((node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken ||
                node.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsToken) &&
                !(isExpressionAllowed(node.right, ctx.options) || isExpressionAllowed(node.left, ctx.options))) {
                ctx.addFailureAtNode(node.operatorToken, node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken
                    ? Rule.EQ_FAILURE_STRING
                    : Rule.NEQ_FAILURE_STRING);
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function isExpressionAllowed(node, options) {
    if (node.kind === ts.SyntaxKind.NullKeyword) {
        return options.allowNull;
    }
    return options.allowUndefined &&
        node.kind === ts.SyntaxKind.Identifier &&
        node.originalKeywordKind === ts.SyntaxKind.UndefinedKeyword;
}
var templateObject_1;
