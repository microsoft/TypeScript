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
var OPTION_ARRAY = "array";
var OPTION_GENERIC = "generic";
var OPTION_ARRAY_SIMPLE = "array-simple";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments[0]);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "array-type",
        description: "Requires using either 'T[]' or 'Array<T>' for arrays.",
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One of the following arguments must be provided:\n\n            * `\"", "\"` enforces use of `T[]` for all types T.\n            * `\"", "\"` enforces use of `Array<T>` for all types T.\n            * `\"", "\"` enforces use of `T[]` if `T` is a simple type (primitive or type reference)."], ["\n            One of the following arguments must be provided:\n\n            * \\`\"", "\"\\` enforces use of \\`T[]\\` for all types T.\n            * \\`\"", "\"\\` enforces use of \\`Array<T>\\` for all types T.\n            * \\`\"", "\"\\` enforces use of \\`T[]\\` if \\`T\\` is a simple type (primitive or type reference)."])), OPTION_ARRAY, OPTION_GENERIC, OPTION_ARRAY_SIMPLE),
        options: {
            type: "string",
            enum: [OPTION_ARRAY, OPTION_GENERIC, OPTION_ARRAY_SIMPLE],
        },
        optionExamples: [[true, OPTION_ARRAY], [true, OPTION_GENERIC], [true, OPTION_ARRAY_SIMPLE]],
        type: "style",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_ARRAY = "Array type using 'Array<T>' is forbidden. Use 'T[]' instead.";
    Rule.FAILURE_STRING_GENERIC = "Array type using 'T[]' is forbidden. Use 'Array<T>' instead.";
    Rule.FAILURE_STRING_ARRAY_SIMPLE = "Array type using 'Array<T>' is forbidden for simple types. Use 'T[]' instead.";
    Rule.FAILURE_STRING_GENERIC_SIMPLE = "Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, option = ctx.options;
    return ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ArrayType:
                checkArrayType(node);
                break;
            case ts.SyntaxKind.TypeReference:
                checkTypeReference(node);
        }
        return ts.forEachChild(node, cb);
    });
    function checkArrayType(node) {
        var elementType = node.elementType, parent = node.parent;
        if (option === "array" || option === "array-simple" && isSimpleType(elementType)) {
            return;
        }
        var failureString = option === "generic" ? Rule.FAILURE_STRING_GENERIC : Rule.FAILURE_STRING_GENERIC_SIMPLE;
        var parens = elementType.kind === ts.SyntaxKind.ParenthesizedType ? 1 : 0;
        // Add a space if the type is preceded by 'as' and the node has no leading whitespace
        var space = parens === 0 && parent.kind === ts.SyntaxKind.AsExpression && node.getStart() === node.getFullStart();
        var fix = [
            new Lint.Replacement(elementType.getStart(), parens, (space ? " " : "") + "Array<"),
            // Delete the square brackets and replace with an angle bracket
            Lint.Replacement.replaceFromTo(elementType.getEnd() - parens, node.getEnd(), ">"),
        ];
        ctx.addFailureAtNode(node, failureString, fix);
    }
    function checkTypeReference(node) {
        var typeName = node.typeName, typeArguments = node.typeArguments;
        if (option === "generic" || !isArrayIdentifier(typeName)) {
            return;
        }
        var failureString = option === "array" ? Rule.FAILURE_STRING_ARRAY : Rule.FAILURE_STRING_ARRAY_SIMPLE;
        if (typeArguments === undefined || typeArguments.length === 0) {
            // Create an 'any' array
            ctx.addFailureAtNode(node, failureString, Lint.Replacement.replaceFromTo(node.getStart(), node.getEnd(), "any[]"));
            return;
        }
        if (typeArguments.length !== 1 || (option === "array-simple" && !isSimpleType(typeArguments[0]))) {
            return;
        }
        var type = typeArguments[0];
        var parens = typeNeedsParentheses(type);
        ctx.addFailureAtNode(node, failureString, [
            // Delete 'Array<'
            Lint.Replacement.replaceFromTo(node.getStart(), type.getStart(), parens ? "(" : ""),
            // Delete '>' and replace with '[]
            Lint.Replacement.replaceFromTo(type.getEnd(), node.getEnd(), parens ? ")[]" : "[]"),
        ]);
    }
}
function typeNeedsParentheses(type) {
    switch (type.kind) {
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.IntersectionType:
        case ts.SyntaxKind.TypeOperator:
            return true;
        default:
            return false;
    }
}
function isArrayIdentifier(name) {
    return name.kind === ts.SyntaxKind.Identifier && name.text === "Array";
}
function isSimpleType(nodeType) {
    switch (nodeType.kind) {
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.ArrayType:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.ThisType:
            return true;
        case ts.SyntaxKind.TypeReference:
            // TypeReferences must be non-generic or be another Array with a simple type
            var _a = nodeType, typeName = _a.typeName, typeArguments = _a.typeArguments;
            if (typeArguments === undefined) {
                return true;
            }
            switch (typeArguments.length) {
                case 0:
                    return true;
                case 1:
                    return typeName.kind === ts.SyntaxKind.Identifier && typeName.text === "Array" && isSimpleType(typeArguments[0]);
                default:
                    return false;
            }
        default:
            return false;
    }
}
var templateObject_1;
