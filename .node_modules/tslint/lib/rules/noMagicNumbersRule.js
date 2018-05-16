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
var tsutils_1 = require("tsutils");
var Lint = require("../index");
var utils_1 = require("../language/utils");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var allowedNumbers = this.ruleArguments.length > 0 ? this.ruleArguments : Rule.DEFAULT_ALLOWED;
        return this.applyWithWalker(new NoMagicNumbersWalker(sourceFile, this.ruleName, new Set(allowedNumbers.map(String))));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-magic-numbers",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows the use constant number values outside of variable assignments.\n            When no list of allowed values is specified, -1, 0 and 1 are allowed by default."], ["\n            Disallows the use constant number values outside of variable assignments.\n            When no list of allowed values is specified, -1, 0 and 1 are allowed by default."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Magic numbers should be avoided as they often lack documentation.\n            Forcing them to be stored in variables gives them implicit documentation.\n        "], ["\n            Magic numbers should be avoided as they often lack documentation.\n            Forcing them to be stored in variables gives them implicit documentation.\n        "]))),
        optionsDescription: "A list of allowed numbers.",
        options: {
            type: "array",
            items: {
                type: "number",
            },
            minLength: 1,
        },
        optionExamples: [true, [true, 1, 2, 3]],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "'magic numbers' are not allowed";
    Rule.ALLOWED_NODES = new Set([
        ts.SyntaxKind.ExportAssignment,
        ts.SyntaxKind.FirstAssignment,
        ts.SyntaxKind.LastAssignment,
        ts.SyntaxKind.PropertyAssignment,
        ts.SyntaxKind.ShorthandPropertyAssignment,
        ts.SyntaxKind.VariableDeclaration,
        ts.SyntaxKind.VariableDeclarationList,
        ts.SyntaxKind.EnumMember,
        ts.SyntaxKind.PropertyDeclaration,
        ts.SyntaxKind.Parameter,
    ]);
    Rule.DEFAULT_ALLOWED = [-1, 0, 1];
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMagicNumbersWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoMagicNumbersWalker, _super);
    function NoMagicNumbersWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoMagicNumbersWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isCallExpression(node) && tsutils_1.isIdentifier(node.expression) && node.expression.text === "parseInt") {
                return node.arguments.length === 0 ? undefined : cb(node.arguments[0]);
            }
            if (node.kind === ts.SyntaxKind.NumericLiteral) {
                return _this.checkNumericLiteral(node, node.text);
            }
            if (utils_1.isNegativeNumberLiteral(node)) {
                return _this.checkNumericLiteral(node, "-" + node.operand.text);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    NoMagicNumbersWalker.prototype.checkNumericLiteral = function (node, num) {
        if (!Rule.ALLOWED_NODES.has(node.parent.kind) && !this.options.has(num)) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    };
    return NoMagicNumbersWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2;
