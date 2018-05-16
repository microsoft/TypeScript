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
        ruleName: "no-bitwise",
        description: "Disallows bitwise operators.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Specifically, the following bitwise operators are banned:\n            `&`, `&=`, `|`, `|=`,\n            `^`, `^=`, `<<`, `<<=`,\n            `>>`, `>>=`, `>>>`, `>>>=`, and `~`.\n            This rule does not ban the use of `&` and `|` for intersection and union types."], ["\n            Specifically, the following bitwise operators are banned:\n            \\`&\\`, \\`&=\\`, \\`|\\`, \\`|=\\`,\n            \\`^\\`, \\`^=\\`, \\`<<\\`, \\`<<=\\`,\n            \\`>>\\`, \\`>>=\\`, \\`>>>\\`, \\`>>>=\\`, and \\`~\\`.\n            This rule does not ban the use of \\`&\\` and \\`|\\` for intersection and union types."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Bitwise operators are often typos - for example `bool1 & bool2` instead of `bool1 && bool2`.\n            They also can be an indicator of overly clever code which decreases maintainability."], ["\n            Bitwise operators are often typos - for example \\`bool1 & bool2\\` instead of \\`bool1 && bool2\\`.\n            They also can be an indicator of overly clever code which decreases maintainability."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Forbidden bitwise operation";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.BinaryExpression) {
            switch (node.operatorToken.kind) {
                case ts.SyntaxKind.AmpersandToken:
                case ts.SyntaxKind.AmpersandEqualsToken:
                case ts.SyntaxKind.BarToken:
                case ts.SyntaxKind.BarEqualsToken:
                case ts.SyntaxKind.CaretToken:
                case ts.SyntaxKind.CaretEqualsToken:
                case ts.SyntaxKind.LessThanLessThanToken:
                case ts.SyntaxKind.LessThanLessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                    ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }
        else if (node.kind === ts.SyntaxKind.PrefixUnaryExpression &&
            node.operator === ts.SyntaxKind.TildeToken) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1, templateObject_2;
