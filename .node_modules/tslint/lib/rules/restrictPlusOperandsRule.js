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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "restrict-plus-operands",
        description: "When adding two variables, operands must both be of type number or of type string.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.INVALID_TYPES_ERROR = "Operands of '+' operation must either be both strings or both numbers";
    Rule.SUGGEST_TEMPLATE_LITERALS = ", consider using template literals";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, tc) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
            var leftType = getBaseTypeOfLiteralType(tc.getTypeAtLocation(node.left));
            var rightType = getBaseTypeOfLiteralType(tc.getTypeAtLocation(node.right));
            if (leftType === "invalid" || rightType === "invalid" || leftType !== rightType) {
                if (leftType === "string" || rightType === "string") {
                    return ctx.addFailureAtNode(node, Rule.INVALID_TYPES_ERROR + Rule.SUGGEST_TEMPLATE_LITERALS);
                }
                else {
                    return ctx.addFailureAtNode(node, Rule.INVALID_TYPES_ERROR);
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function getBaseTypeOfLiteralType(type) {
    if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.StringLiteral) || tsutils_1.isTypeFlagSet(type, ts.TypeFlags.String)) {
        return "string";
    }
    else if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.NumberLiteral) || tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Number)) {
        return "number";
    }
    else if (tsutils_1.isUnionType(type) && !tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Enum)) {
        var types = type.types.map(getBaseTypeOfLiteralType);
        return allSame(types) ? types[0] : "invalid";
    }
    else if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.EnumLiteral)) {
        // Compatibility for TypeScript pre-2.4, which used EnumLiteralType instead of LiteralType
        getBaseTypeOfLiteralType(type.baseType);
    }
    return "invalid";
}
function allSame(array) {
    return array.every(function (value) { return value === array[0]; });
}
