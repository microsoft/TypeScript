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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var utils_1 = require("../utils");
var adjacentOverloadSignaturesRule_1 = require("./adjacentOverloadSignaturesRule");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_OMITTING_SINGLE_PARAMETER = function (otherLine) {
        return this.FAILURE_STRING_START(otherLine) + " with an optional parameter.";
    };
    Rule.FAILURE_STRING_OMITTING_REST_PARAMETER = function (otherLine) {
        return this.FAILURE_STRING_START(otherLine) + " with a rest parameter.";
    };
    Rule.FAILURE_STRING_SINGLE_PARAMETER_DIFFERENCE = function (otherLine, type1, type2) {
        return this.FAILURE_STRING_START(otherLine) + " taking `" + type1 + " | " + type2 + "`.";
    };
    Rule.FAILURE_STRING_START = function (otherLine) {
        // For only 2 overloads we don't need to specify which is the other one.
        var overloads = otherLine === undefined ? "These overloads" : "This overload and the one on line " + otherLine;
        return overloads + " can be combined into one signature";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "unified-signatures",
        description: "Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    checkStatements(sourceFile.statements);
    return ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ModuleBlock:
                checkStatements(node.statements);
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ClassDeclaration: {
                var _a = node, members = _a.members, typeParameters = _a.typeParameters;
                checkMembers(members, typeParameters);
                break;
            }
            case ts.SyntaxKind.TypeLiteral:
                checkMembers(node.members);
        }
        return ts.forEachChild(node, cb);
    });
    function checkStatements(statements) {
        addFailures(checkOverloads(statements, undefined, function (statement) {
            if (utils.isFunctionDeclaration(statement)) {
                var body = statement.body, name = statement.name;
                return body === undefined && name !== undefined ? { signature: statement, key: name.text } : undefined;
            }
            else {
                return undefined;
            }
        }));
    }
    function checkMembers(members, typeParameters) {
        addFailures(checkOverloads(members, typeParameters, function (member) {
            switch (member.kind) {
                case ts.SyntaxKind.CallSignature:
                case ts.SyntaxKind.ConstructSignature:
                case ts.SyntaxKind.MethodSignature:
                    break;
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.Constructor:
                    if (member.body !== undefined) {
                        return undefined;
                    }
                    break;
                default:
                    return undefined;
            }
            var signature = member;
            var key = adjacentOverloadSignaturesRule_1.getOverloadKey(signature);
            return key === undefined ? undefined : { signature: signature, key: key };
        }));
    }
    function addFailures(failures) {
        for (var _i = 0, failures_1 = failures; _i < failures_1.length; _i++) {
            var failure = failures_1[_i];
            var unify = failure.unify, only2 = failure.only2;
            switch (unify.kind) {
                case "single-parameter-difference": {
                    var p0 = unify.p0, p1 = unify.p1;
                    var lineOfOtherOverload = only2 ? undefined : getLine(p0.getStart());
                    ctx.addFailureAtNode(p1, Rule.FAILURE_STRING_SINGLE_PARAMETER_DIFFERENCE(lineOfOtherOverload, typeText(p0), typeText(p1)));
                    break;
                }
                case "extra-parameter": {
                    var extraParameter = unify.extraParameter, otherSignature = unify.otherSignature;
                    var lineOfOtherOverload = only2 ? undefined : getLine(otherSignature.pos);
                    ctx.addFailureAtNode(extraParameter, extraParameter.dotDotDotToken !== undefined
                        ? Rule.FAILURE_STRING_OMITTING_REST_PARAMETER(lineOfOtherOverload)
                        : Rule.FAILURE_STRING_OMITTING_SINGLE_PARAMETER(lineOfOtherOverload));
                }
            }
        }
    }
    function getLine(pos) {
        return ts.getLineAndCharacterOfPosition(sourceFile, pos).line + 1;
    }
}
function checkOverloads(signatures, typeParameters, getOverload) {
    var result = [];
    var isTypeParameter = getIsTypeParameter(typeParameters);
    for (var _i = 0, _a = collectOverloads(signatures, getOverload); _i < _a.length; _i++) {
        var overloads = _a[_i];
        if (overloads.length === 2) {
            var unify = compareSignatures(overloads[0], overloads[1], isTypeParameter);
            if (unify !== undefined) {
                result.push({ unify: unify, only2: true });
            }
        }
        else {
            forEachPair(overloads, function (a, b) {
                var unify = compareSignatures(a, b, isTypeParameter);
                if (unify !== undefined) {
                    result.push({ unify: unify, only2: false });
                }
            });
        }
    }
    return result;
}
function compareSignatures(a, b, isTypeParameter) {
    if (!signaturesCanBeUnified(a, b, isTypeParameter)) {
        return undefined;
    }
    return a.parameters.length === b.parameters.length
        ? signaturesDifferBySingleParameter(a.parameters, b.parameters)
        : signaturesDifferByOptionalOrRestParameter(a.parameters, b.parameters);
}
function signaturesCanBeUnified(a, b, isTypeParameter) {
    // Must return the same type.
    return typesAreEqual(a.type, b.type) &&
        // Must take the same type parameters.
        utils_1.arraysAreEqual(a.typeParameters, b.typeParameters, typeParametersAreEqual) &&
        // If one uses a type parameter (from outside) and the other doesn't, they shouldn't be joined.
        signatureUsesTypeParameter(a, isTypeParameter) === signatureUsesTypeParameter(b, isTypeParameter);
}
/** Detect `a(x: number, y: number, z: number)` and `a(x: number, y: string, z: number)`. */
function signaturesDifferBySingleParameter(types1, types2) {
    var index = getIndexOfFirstDifference(types1, types2, parametersAreEqual);
    if (index === undefined) {
        return undefined;
    }
    // If remaining arrays are equal, the signatures differ by just one parameter type
    if (!utils_1.arraysAreEqual(types1.slice(index + 1), types2.slice(index + 1), parametersAreEqual)) {
        return undefined;
    }
    var a = types1[index];
    var b = types2[index];
    // Can unify `a?: string` and `b?: number`. Can't unify `...args: string[]` and `...args: number[]`.
    // See https://github.com/Microsoft/TypeScript/issues/5077
    return parametersHaveEqualSigils(a, b) && a.dotDotDotToken === undefined
        ? { kind: "single-parameter-difference", p0: a, p1: b }
        : undefined;
}
/**
 * Detect `a(): void` and `a(x: number): void`.
 * Returns the parameter declaration (`x: number` in this example) that should be optional/rest, and overload it's a part of.
 */
function signaturesDifferByOptionalOrRestParameter(sig1, sig2) {
    var minLength = Math.min(sig1.length, sig2.length);
    var longer = sig1.length < sig2.length ? sig2 : sig1;
    var shorter = sig1.length < sig2.length ? sig1 : sig2;
    // If one is has 2+ parameters more than the other, they must all be optional/rest.
    // Differ by optional parameters: f() and f(x), f() and f(x, ?y, ...z)
    // Not allowed: f() and f(x, y)
    for (var i = minLength + 1; i < longer.length; i++) {
        if (!parameterMayBeMissing(longer[i])) {
            return undefined;
        }
    }
    for (var i = 0; i < minLength; i++) {
        if (!typesAreEqual(sig1[i].type, sig2[i].type)) {
            return undefined;
        }
    }
    if (minLength > 0 && shorter[minLength - 1].dotDotDotToken !== undefined) {
        return undefined;
    }
    return { kind: "extra-parameter", extraParameter: longer[longer.length - 1], otherSignature: shorter };
}
/** Given type parameters, returns a function to test whether a type is one of those parameters. */
function getIsTypeParameter(typeParameters) {
    if (typeParameters === undefined) {
        return function () { return false; };
    }
    var set = new Set();
    for (var _i = 0, typeParameters_1 = typeParameters; _i < typeParameters_1.length; _i++) {
        var t = typeParameters_1[_i];
        set.add(t.getText());
    }
    return function (typeName) { return set.has(typeName); };
}
/** True if any of the outer type parameters are used in a signature. */
function signatureUsesTypeParameter(sig, isTypeParameter) {
    return sig.parameters.some(function (p) { return p.type !== undefined && typeContainsTypeParameter(p.type) === true; });
    function typeContainsTypeParameter(type) {
        if (utils.isTypeReferenceNode(type)) {
            var typeName = type.typeName;
            if (typeName.kind === ts.SyntaxKind.Identifier && isTypeParameter(typeName.text)) {
                return true;
            }
        }
        return ts.forEachChild(type, typeContainsTypeParameter);
    }
}
/**
 * Given all signatures, collects an array of arrays of signatures which are all overloads.
 * Does not rely on overloads being adjacent. This is similar to code in adjacentOverloadSignaturesRule.ts, but not the same.
 */
function collectOverloads(nodes, getOverload) {
    var map = new Map();
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var sig = nodes_1[_i];
        var overload = getOverload(sig);
        if (overload === undefined) {
            continue;
        }
        var signature = overload.signature, key = overload.key;
        var overloads = map.get(key);
        if (overloads !== undefined) {
            overloads.push(signature);
        }
        else {
            map.set(key, [signature]);
        }
    }
    return Array.from(map.values());
}
function parametersAreEqual(a, b) {
    return parametersHaveEqualSigils(a, b) && typesAreEqual(a.type, b.type);
}
/** True for optional/rest parameters. */
function parameterMayBeMissing(p) {
    return p.dotDotDotToken !== undefined || p.questionToken !== undefined;
}
/** False if one is optional and the other isn't, or one is a rest parameter and the other isn't. */
function parametersHaveEqualSigils(a, b) {
    return (a.dotDotDotToken !== undefined) === (b.dotDotDotToken !== undefined) &&
        (a.questionToken !== undefined) === (b.questionToken !== undefined);
}
function typeParametersAreEqual(a, b) {
    return a.name.text === b.name.text && typesAreEqual(a.constraint, b.constraint);
}
function typesAreEqual(a, b) {
    // TODO: Could traverse AST so that formatting differences don't affect this.
    return a === b || a !== undefined && b !== undefined && a.getText() === b.getText();
}
/** Returns the first index where `a` and `b` differ. */
function getIndexOfFirstDifference(a, b, equal) {
    for (var i = 0; i < a.length && i < b.length; i++) {
        if (!equal(a[i], b[i])) {
            return i;
        }
    }
    return undefined;
}
/** Calls `action` for every pair of values in `values`. */
function forEachPair(values, action) {
    for (var i = 0; i < values.length; i++) {
        for (var j = i + 1; j < values.length; j++) {
            var result = action(values[i], values[j]);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return undefined;
}
function typeText(_a) {
    var type = _a.type;
    return type === undefined ? "any" : type.getText();
}
