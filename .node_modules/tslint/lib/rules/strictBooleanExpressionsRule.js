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
var OPTION_ALLOW_NULL_UNION = "allow-null-union";
var OPTION_ALLOW_UNDEFINED_UNION = "allow-undefined-union";
var OPTION_ALLOW_STRING = "allow-string";
var OPTION_ALLOW_NUMBER = "allow-number";
var OPTION_ALLOW_MIX = "allow-mix";
var OPTION_ALLOW_BOOLEAN_OR_UNDEFINED = "allow-boolean-or-undefined";
// tslint:disable object-literal-sort-keys
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var options = parseOptions(this.ruleArguments, Lint.isStrictNullChecksEnabled(program.getCompilerOptions()));
        return this.applyWithFunction(sourceFile, walk, options, program.getTypeChecker());
    };
    Rule.metadata = {
        ruleName: "strict-boolean-expressions",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Restricts the types allowed in boolean expressions. By default only booleans are allowed.\n\n            The following nodes are checked:\n\n            * Arguments to the `!`, `&&`, and `||` operators\n            * The condition in a conditional expression (`cond ? x : y`)\n            * Conditions for `if`, `for`, `while`, and `do-while` statements."], ["\n            Restricts the types allowed in boolean expressions. By default only booleans are allowed.\n\n            The following nodes are checked:\n\n            * Arguments to the \\`!\\`, \\`&&\\`, and \\`||\\` operators\n            * The condition in a conditional expression (\\`cond ? x : y\\`)\n            * Conditions for \\`if\\`, \\`for\\`, \\`while\\`, and \\`do-while\\` statements."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            These options may be provided:\n\n            * `", "` allows union types containing `null`.\n              - It does *not* allow `null` itself.\n              - Without the '--strictNullChecks' compiler option, this will allow anything other than a string, number, or enum.\n            * `", "` allows union types containing `undefined`.\n              - It does *not* allow `undefined` itself.\n              - Without the '--strictNullChecks' compiler option, this will allow anything other than a string, number, or enum.\n            * `", "` allows strings.\n              - It does *not* allow unions containing `string`.\n              - It does *not* allow string literal types.\n            * `", "` allows numbers.\n              - It does *not* allow unions containing `number`.\n              - It does *not* allow enums or number literal types.\n            * `", "` allows multiple of the above to appear together.\n              - For example, `string | number` or `RegExp | null | undefined` would normally not be allowed.\n              - A type like `\"foo\" | \"bar\" | undefined` is always allowed, because it has only one way to be false.\n            * `", "` allows `boolean | undefined`.\n              - Also allows `true | false | undefined`.\n              - Does not allow `false | undefined`.\n              - This option is a subset of `", "`, so you don't need to enable both options at the same time.\n        "], ["\n            These options may be provided:\n\n            * \\`", "\\` allows union types containing \\`null\\`.\n              - It does *not* allow \\`null\\` itself.\n              - Without the '--strictNullChecks' compiler option, this will allow anything other than a string, number, or enum.\n            * \\`", "\\` allows union types containing \\`undefined\\`.\n              - It does *not* allow \\`undefined\\` itself.\n              - Without the '--strictNullChecks' compiler option, this will allow anything other than a string, number, or enum.\n            * \\`", "\\` allows strings.\n              - It does *not* allow unions containing \\`string\\`.\n              - It does *not* allow string literal types.\n            * \\`", "\\` allows numbers.\n              - It does *not* allow unions containing \\`number\\`.\n              - It does *not* allow enums or number literal types.\n            * \\`", "\\` allows multiple of the above to appear together.\n              - For example, \\`string | number\\` or \\`RegExp | null | undefined\\` would normally not be allowed.\n              - A type like \\`\"foo\" | \"bar\" | undefined\\` is always allowed, because it has only one way to be false.\n            * \\`", "\\` allows \\`boolean | undefined\\`.\n              - Also allows \\`true | false | undefined\\`.\n              - Does not allow \\`false | undefined\\`.\n              - This option is a subset of \\`", "\\`, so you don't need to enable both options at the same time.\n        "])), OPTION_ALLOW_NULL_UNION, OPTION_ALLOW_UNDEFINED_UNION, OPTION_ALLOW_STRING, OPTION_ALLOW_NUMBER, OPTION_ALLOW_MIX, OPTION_ALLOW_BOOLEAN_OR_UNDEFINED, OPTION_ALLOW_UNDEFINED_UNION),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    OPTION_ALLOW_NULL_UNION,
                    OPTION_ALLOW_UNDEFINED_UNION,
                    OPTION_ALLOW_STRING,
                    OPTION_ALLOW_NUMBER,
                    OPTION_ALLOW_BOOLEAN_OR_UNDEFINED,
                ],
            },
            minLength: 0,
            maxLength: 5,
        },
        optionExamples: [
            true,
            [true, OPTION_ALLOW_NULL_UNION, OPTION_ALLOW_UNDEFINED_UNION, OPTION_ALLOW_STRING, OPTION_ALLOW_NUMBER],
            [true, OPTION_ALLOW_BOOLEAN_OR_UNDEFINED],
        ],
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function parseOptions(ruleArguments, strictNullChecks) {
    return {
        strictNullChecks: strictNullChecks,
        allowNullUnion: has(OPTION_ALLOW_NULL_UNION),
        allowUndefinedUnion: has(OPTION_ALLOW_UNDEFINED_UNION),
        allowString: has(OPTION_ALLOW_STRING),
        allowNumber: has(OPTION_ALLOW_NUMBER),
        allowMix: has(OPTION_ALLOW_MIX),
        allowBooleanOrUndefined: has(OPTION_ALLOW_BOOLEAN_OR_UNDEFINED),
    };
    function has(name) {
        return ruleArguments.indexOf(name) !== -1;
    }
}
function walk(ctx, checker) {
    var sourceFile = ctx.sourceFile, options = ctx.options;
    ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.BinaryExpression: {
                var b_1 = node;
                if (binaryBooleanExpressionKind(b_1) !== undefined) {
                    var left = b_1.left, right = b_1.right;
                    var checkHalf = function (expr) {
                        // If it's another boolean binary expression, we'll check it when recursing.
                        if (!isBooleanBinaryExpression(expr)) {
                            checkExpression(expr, b_1);
                        }
                    };
                    checkHalf(left);
                    checkHalf(right);
                }
                break;
            }
            case ts.SyntaxKind.PrefixUnaryExpression: {
                var _a = node, operator = _a.operator, operand = _a.operand;
                if (operator === ts.SyntaxKind.ExclamationToken) {
                    checkExpression(operand, node);
                }
                break;
            }
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.DoStatement: {
                var c = node;
                // If it's a boolean binary expression, we'll check it when recursing.
                if (!isBooleanBinaryExpression(c.expression)) {
                    checkExpression(c.expression, c);
                }
                break;
            }
            case ts.SyntaxKind.ConditionalExpression:
                checkExpression(node.condition, node);
                break;
            case ts.SyntaxKind.ForStatement: {
                var condition = node.condition;
                if (condition !== undefined) {
                    checkExpression(condition, node);
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
    function checkExpression(node, location) {
        var type = checker.getTypeAtLocation(node);
        var failure = getTypeFailure(type, options);
        if (failure !== undefined) {
            if (failure === 0 /* AlwaysTruthy */ &&
                !options.strictNullChecks &&
                (options.allowNullUnion || options.allowUndefinedUnion)) {
                // OK; It might be null/undefined.
                return;
            }
            ctx.addFailureAtNode(node, showFailure(location, failure, isUnionType(type), options));
        }
    }
}
function getTypeFailure(type, options) {
    if (isUnionType(type)) {
        return handleUnion(type, options);
    }
    var kind = getKind(type);
    var failure = failureForKind(kind, /*isInUnion*/ false, options);
    if (failure !== undefined) {
        return failure;
    }
    switch (triState(kind)) {
        case true:
            // Allow 'any'. Allow 'true' itself, but not any other always-truthy type.
            // tslint:disable-next-line no-bitwise
            return tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Any | ts.TypeFlags.BooleanLiteral) ? undefined : 0 /* AlwaysTruthy */;
        case false:
            // Allow 'false' itself, but not any other always-falsy type
            return tsutils_1.isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral) ? undefined : 1 /* AlwaysFalsy */;
        case undefined:
            return undefined;
    }
}
function isBooleanUndefined(type) {
    var isTruthy = false;
    for (var _i = 0, _a = type.types; _i < _a.length; _i++) {
        var ty = _a[_i];
        if (tsutils_1.isTypeFlagSet(ty, ts.TypeFlags.Boolean)) {
            isTruthy = true;
        }
        else if (tsutils_1.isTypeFlagSet(ty, ts.TypeFlags.BooleanLiteral)) {
            isTruthy = isTruthy || ty.intrinsicName === "true";
        }
        else if (!tsutils_1.isTypeFlagSet(ty, ts.TypeFlags.Void | ts.TypeFlags.Undefined)) { // tslint:disable-line:no-bitwise
            return undefined;
        }
    }
    return isTruthy;
}
function handleUnion(type, options) {
    if (options.allowBooleanOrUndefined) {
        switch (isBooleanUndefined(type)) {
            case true:
                return undefined;
            case false:
                return 1 /* AlwaysFalsy */;
        }
    }
    // Tracks whether it's possibly truthy.
    var anyTruthy = false;
    // Counts falsy kinds to see if there's a mix. Also tracks whether it's possibly falsy.
    var seenFalsy = 0;
    for (var _i = 0, _a = type.types; _i < _a.length; _i++) {
        var ty = _a[_i];
        var kind = getKind(ty);
        var failure = failureForKind(kind, /*isInUnion*/ true, options);
        if (failure !== undefined) {
            return failure;
        }
        switch (triState(kind)) {
            case true:
                anyTruthy = true;
                break;
            case false:
                seenFalsy++;
                break;
            default:
                anyTruthy = true;
                seenFalsy++;
        }
    }
    return seenFalsy === 0 ? 0 /* AlwaysTruthy */
        : !anyTruthy ? 1 /* AlwaysFalsy */
            : !options.allowMix && seenFalsy > 1 ? 7 /* Mixes */ : undefined;
}
/** Fails if a kind of falsiness is not allowed. */
function failureForKind(kind, isInUnion, options) {
    switch (kind) {
        case 0 /* String */:
        case 1 /* FalseStringLiteral */:
            return options.allowString ? undefined : 2 /* String */;
        case 2 /* Number */:
        case 3 /* FalseNumberLiteral */:
            return options.allowNumber ? undefined : 3 /* Number */;
        case 8 /* Enum */:
            return 6 /* Enum */;
        case 6 /* Null */:
            return isInUnion && !options.allowNullUnion ? 4 /* Null */ : undefined;
        case 7 /* Undefined */:
            return isInUnion && !options.allowUndefinedUnion ? 5 /* Undefined */ : undefined;
        default:
            return undefined;
    }
}
/** Divides a type into always true, always false, or unknown. */
function triState(kind) {
    switch (kind) {
        case 0 /* String */:
        case 2 /* Number */:
        case 4 /* Boolean */:
        case 8 /* Enum */:
            return undefined;
        case 6 /* Null */:
        case 7 /* Undefined */:
        case 3 /* FalseNumberLiteral */:
        case 1 /* FalseStringLiteral */:
        case 5 /* FalseBooleanLiteral */:
            return false;
        case 9 /* AlwaysTruthy */:
            return true;
    }
}
function getKind(type) {
    return is(ts.TypeFlags.String) ? 0 /* String */
        : is(ts.TypeFlags.Number) ? 2 /* Number */
            : is(ts.TypeFlags.Boolean) ? 4 /* Boolean */
                : is(ts.TypeFlags.Null) ? 6 /* Null */
                    : is(ts.TypeFlags.Undefined | ts.TypeFlags.Void) ? 7 /* Undefined */
                        : is(ts.TypeFlags.EnumLike) ? 8 /* Enum */
                            : is(ts.TypeFlags.NumberLiteral) ?
                                (numberLiteralIsZero(type) ? 3 /* FalseNumberLiteral */ : 9 /* AlwaysTruthy */)
                                : is(ts.TypeFlags.StringLiteral) ?
                                    (stringLiteralIsEmpty(type) ? 1 /* FalseStringLiteral */ : 9 /* AlwaysTruthy */)
                                    : is(ts.TypeFlags.BooleanLiteral) ?
                                        (type.intrinsicName === "true" ? 9 /* AlwaysTruthy */ : 5 /* FalseBooleanLiteral */)
                                        : 9 /* AlwaysTruthy */;
    function is(flags) {
        return tsutils_1.isTypeFlagSet(type, flags);
    }
}
function numberLiteralIsZero(type) {
    // for compatibility with typescript@<2.4.0
    return type.value !== undefined ? type.value === 0 : type.text === "0";
}
function stringLiteralIsEmpty(type) {
    // for compatibility with typescript@<2.4.0
    return (type.value !== undefined ? type.value : type.text) === "";
}
/** Matches `&&` and `||` operators. */
function isBooleanBinaryExpression(node) {
    return node.kind === ts.SyntaxKind.BinaryExpression && binaryBooleanExpressionKind(node) !== undefined;
}
function binaryBooleanExpressionKind(node) {
    switch (node.operatorToken.kind) {
        case ts.SyntaxKind.AmpersandAmpersandToken:
            return "&&";
        case ts.SyntaxKind.BarBarToken:
            return "||";
        default:
            return undefined;
    }
}
function stringOr(parts) {
    switch (parts.length) {
        case 1:
            return parts[0];
        case 2:
            return parts[0] + " or " + parts[1];
        default:
            var res = "";
            for (var i = 0; i < parts.length - 1; i++) {
                res += parts[i] + ", ";
            }
            return res + "or " + parts[parts.length - 1];
    }
}
function isUnionType(type) {
    return tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Union) && !tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Enum);
}
function showLocation(n) {
    switch (n.kind) {
        case ts.SyntaxKind.PrefixUnaryExpression:
            return "operand for the '!' operator";
        case ts.SyntaxKind.ConditionalExpression:
            return "condition";
        case ts.SyntaxKind.ForStatement:
            return "'for' condition";
        case ts.SyntaxKind.IfStatement:
            return "'if' condition";
        case ts.SyntaxKind.WhileStatement:
            return "'while' condition";
        case ts.SyntaxKind.DoStatement:
            return "'do-while' condition";
        case ts.SyntaxKind.BinaryExpression:
            return "operand for the '" + binaryBooleanExpressionKind(n) + "' operator";
    }
}
function showFailure(location, ty, unionType, options) {
    var expectedTypes = showExpectedTypes(options);
    var expected = expectedTypes.length === 1
        ? "Only " + expectedTypes[0] + "s are allowed"
        : "Allowed types are " + stringOr(expectedTypes);
    var tyFail = showTypeFailure(ty, unionType, options.strictNullChecks);
    return "This type is not allowed in the " + showLocation(location) + " because it " + tyFail + ". " + expected + ".";
}
function showExpectedTypes(options) {
    var parts = ["boolean"];
    if (options.allowNullUnion) {
        parts.push("null-union");
    }
    if (options.allowUndefinedUnion) {
        parts.push("undefined-union");
    }
    if (options.allowString) {
        parts.push("string");
    }
    if (options.allowNumber) {
        parts.push("number");
    }
    if (options.allowBooleanOrUndefined) {
        parts.push("boolean-or-undefined");
    }
    return parts;
}
function showTypeFailure(ty, unionType, strictNullChecks) {
    var is = unionType ? "could be" : "is";
    switch (ty) {
        case 0 /* AlwaysTruthy */:
            return strictNullChecks
                ? "is always truthy"
                : "is always truthy. It may be null/undefined, but neither " +
                    ("'" + OPTION_ALLOW_NULL_UNION + "' nor '" + OPTION_ALLOW_UNDEFINED_UNION + "' is set");
        case 1 /* AlwaysFalsy */: return "is always falsy";
        case 2 /* String */: return is + " a string";
        case 3 /* Number */: return is + " a number";
        case 4 /* Null */: return is + " null";
        case 5 /* Undefined */: return is + " undefined";
        case 6 /* Enum */: return is + " an enum";
        case 7 /* Mixes */: return "unions more than one truthy/falsy type";
    }
}
var templateObject_1, templateObject_2;
