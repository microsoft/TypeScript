"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
var error_1 = require("../error");
var Lint = require("../index");
// tslint:disable:no-bitwise
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING = function (value) {
        return "Expression is always " + value + ".";
    };
    Rule.FAILURE_STRICT_PREFER_STRICT_EQUALS = function (value, isPositive) {
        return "Use '" + (isPositive ? "===" : "!==") + " " + value + "' instead.";
    };
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        if (!Lint.isStrictNullChecksEnabled(program.getCompilerOptions())) {
            error_1.showWarningOnce("strict-type-predicates does not work without --strictNullChecks");
            return [];
        }
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "strict-type-predicates",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Warns for type predicates that are always true or always false.\n            Works for 'typeof' comparisons to constants (e.g. 'typeof foo === \"string\"'), and equality comparison to 'null'/'undefined'.\n            (TypeScript won't let you compare '1 === 2', but it has an exception for '1 === undefined'.)\n            Does not yet work for 'instanceof'.\n            Does *not* warn for 'if (x.y)' where 'x.y' is always truthy. For that, see strict-boolean-expressions.\n\n            This rule requires `strictNullChecks` to work properly."], ["\n            Warns for type predicates that are always true or always false.\n            Works for 'typeof' comparisons to constants (e.g. 'typeof foo === \"string\"'), and equality comparison to 'null'/'undefined'.\n            (TypeScript won't let you compare '1 === 2', but it has an exception for '1 === undefined'.)\n            Does not yet work for 'instanceof'.\n            Does *not* warn for 'if (x.y)' where 'x.y' is always truthy. For that, see strict-boolean-expressions.\n\n            This rule requires \\`strictNullChecks\\` to work properly."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_BAD_TYPEOF = "Bad comparison for 'typeof'.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBinaryExpression(node)) {
            var equals = Lint.getEqualsKind(node.operatorToken);
            if (equals !== undefined) {
                checkEquals(node, equals);
            }
        }
        return ts.forEachChild(node, cb);
    });
    function checkEquals(node, _a) {
        var isStrict = _a.isStrict, isPositive = _a.isPositive;
        var exprPred = getTypePredicate(node, isStrict);
        if (exprPred === undefined) {
            return;
        }
        if (exprPred.kind === 2 /* TypeofTypo */) {
            fail(Rule.FAILURE_STRING_BAD_TYPEOF);
            return;
        }
        var exprType = checker.getTypeAtLocation(exprPred.expression);
        // TODO: could use checker.getBaseConstraintOfType to help with type parameters, but it's not publicly exposed.
        if (tsutils_1.isTypeFlagSet(exprType, ts.TypeFlags.Any | ts.TypeFlags.TypeParameter)) {
            return;
        }
        switch (exprPred.kind) {
            case 0 /* Plain */: {
                var predicate = exprPred.predicate, isNullOrUndefined = exprPred.isNullOrUndefined;
                var value = getConstantBoolean(exprType, predicate);
                // 'null'/'undefined' are the only two values *not* assignable to '{}'.
                if (value !== undefined && (isNullOrUndefined || !isEmptyType(checker, exprType))) {
                    fail(Rule.FAILURE_STRING(value === isPositive));
                }
                break;
            }
            case 1 /* NonStructNullUndefined */: {
                var result = testNonStrictNullUndefined(exprType);
                if (result !== undefined) {
                    fail(typeof result === "boolean"
                        ? Rule.FAILURE_STRING(result === isPositive)
                        : Rule.FAILURE_STRICT_PREFER_STRICT_EQUALS(result, isPositive));
                }
            }
        }
        function fail(failure) {
            ctx.addFailureAtNode(node, failure);
        }
    }
}
/** Detects a type predicate given `left === right`. */
function getTypePredicate(node, isStrictEquals) {
    var left = node.left, right = node.right;
    var lr = getTypePredicateOneWay(left, right, isStrictEquals);
    return lr !== undefined ? lr : getTypePredicateOneWay(right, left, isStrictEquals);
}
/** Only gets the type predicate if the expression is on the left. */
function getTypePredicateOneWay(left, right, isStrictEquals) {
    switch (right.kind) {
        case ts.SyntaxKind.TypeOfExpression:
            var expression = right.expression;
            if (!tsutils_1.isLiteralExpression(left)) {
                if (tsutils_1.isIdentifier(left) && left.text === "undefined" ||
                    left.kind === ts.SyntaxKind.NullKeyword ||
                    left.kind === ts.SyntaxKind.TrueKeyword ||
                    left.kind === ts.SyntaxKind.FalseKeyword) {
                    return { kind: 2 /* TypeofTypo */ };
                }
                return undefined;
            }
            var predicate = getTypePredicateForKind(left.text);
            return predicate === undefined
                ? { kind: 2 /* TypeofTypo */ }
                : { kind: 0 /* Plain */, expression: expression, predicate: predicate, isNullOrUndefined: left.text === "undefined" };
        case ts.SyntaxKind.NullKeyword:
            return nullOrUndefined(ts.TypeFlags.Null);
        case ts.SyntaxKind.Identifier:
            if (right.originalKeywordKind === ts.SyntaxKind.UndefinedKeyword) {
                return nullOrUndefined(undefinedFlags);
            }
            return undefined;
        default:
            return undefined;
    }
    function nullOrUndefined(flags) {
        return isStrictEquals
            ? { kind: 0 /* Plain */, expression: left, predicate: flagPredicate(flags), isNullOrUndefined: true }
            : { kind: 1 /* NonStructNullUndefined */, expression: left };
    }
}
function isEmptyType(checker, type) {
    return checker.typeToString(type) === "{}";
}
var undefinedFlags = ts.TypeFlags.Undefined | ts.TypeFlags.Void;
function getTypePredicateForKind(kind) {
    switch (kind) {
        case "undefined":
            return flagPredicate(undefinedFlags);
        case "boolean":
            return flagPredicate(ts.TypeFlags.BooleanLike);
        case "number":
            return flagPredicate(ts.TypeFlags.NumberLike);
        case "string":
            return flagPredicate(ts.TypeFlags.StringLike);
        case "symbol":
            return flagPredicate(ts.TypeFlags.ESSymbol);
        case "function":
            return isFunction;
        case "object":
            // It's an object if it's not any of the above.
            var allFlags_1 = ts.TypeFlags.Undefined | ts.TypeFlags.Void | ts.TypeFlags.BooleanLike |
                ts.TypeFlags.NumberLike | ts.TypeFlags.StringLike | ts.TypeFlags.ESSymbol;
            return function (type) { return !tsutils_1.isTypeFlagSet(type, allFlags_1) && !isFunction(type); };
        default:
            return undefined;
    }
}
function flagPredicate(testedFlag) {
    return function (type) { return tsutils_1.isTypeFlagSet(type, testedFlag); };
}
function isFunction(t) {
    if (t.getConstructSignatures().length !== 0 || t.getCallSignatures().length !== 0) {
        return true;
    }
    var symbol = t.getSymbol();
    return symbol !== undefined && symbol.getName() === "Function";
}
/** Returns a boolean value if that should always be the result of a type predicate. */
function getConstantBoolean(type, predicate) {
    var anyTrue = false;
    var anyFalse = false;
    for (var _i = 0, _a = unionParts(type); _i < _a.length; _i++) {
        var ty = _a[_i];
        if (predicate(ty)) {
            anyTrue = true;
        }
        else {
            anyFalse = true;
        }
        if (anyTrue && anyFalse) {
            return undefined;
        }
    }
    return anyTrue;
}
/** Returns bool for always/never true, or a string to recommend strict equality. */
function testNonStrictNullUndefined(type) {
    var anyNull = false;
    var anyUndefined = false;
    var anyOther = false;
    for (var _i = 0, _a = unionParts(type); _i < _a.length; _i++) {
        var ty = _a[_i];
        if (tsutils_1.isTypeFlagSet(ty, ts.TypeFlags.Null)) {
            anyNull = true;
        }
        else if (tsutils_1.isTypeFlagSet(ty, undefinedFlags)) {
            anyUndefined = true;
        }
        else {
            anyOther = true;
        }
    }
    return !anyOther ? true
        : anyNull && anyUndefined ? undefined
            : anyNull ? "null"
                : anyUndefined ? "undefined"
                    : false;
}
function unionParts(type) {
    return tsutils_1.isUnionType(type) ? type.types : [type];
}
var templateObject_1;
