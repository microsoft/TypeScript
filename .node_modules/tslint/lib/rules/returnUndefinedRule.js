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
        ruleName: "return-undefined",
        description: "Prefer `return;` in void functions and `return undefined;` in value-returning functions.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_VALUE_RETURN = "Value-returning function should use `return undefined;`, not just `return;`.";
    Rule.FAILURE_STRING_VOID_RETURN = "`void` function should use `return;`, not `return undefined;`.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isReturnStatement(node)) {
            check(node);
        }
        return ts.forEachChild(node, cb);
    });
    function check(node) {
        var actualReturnKind = returnKindFromReturn(node);
        if (actualReturnKind === undefined) {
            return;
        }
        var functionReturningFrom = Lint.ancestorWhere(node, isFunctionLike);
        if (functionReturningFrom === undefined) {
            // Return outside of function is invalid
            return;
        }
        var returnKindFromType = getReturnKind(functionReturningFrom, checker);
        if (returnKindFromType !== undefined && returnKindFromType !== actualReturnKind) {
            ctx.addFailureAtNode(node, returnKindFromType === ReturnKind.Void
                ? Rule.FAILURE_STRING_VOID_RETURN
                : Rule.FAILURE_STRING_VALUE_RETURN);
        }
    }
}
function returnKindFromReturn(node) {
    if (node.expression === undefined) {
        return ReturnKind.Void;
    }
    else if (tsutils_1.isIdentifier(node.expression) && node.expression.text === "undefined") {
        return ReturnKind.Value;
    }
    else {
        return undefined;
    }
}
var ReturnKind;
(function (ReturnKind) {
    ReturnKind[ReturnKind["Void"] = 0] = "Void";
    ReturnKind[ReturnKind["Value"] = 1] = "Value";
})(ReturnKind || (ReturnKind = {}));
function getReturnKind(node, checker) {
    switch (node.kind) {
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.SetAccessor:
            return ReturnKind.Void;
        case ts.SyntaxKind.GetAccessor:
            return ReturnKind.Value;
    }
    var contextual = isFunctionExpressionLike(node) && node.type === undefined
        ? tryGetReturnType(checker.getContextualType(node), checker)
        : undefined;
    var returnType = contextual !== undefined ? contextual : tryGetReturnType(checker.getTypeAtLocation(node), checker);
    if (returnType === undefined || tsutils_1.isTypeFlagSet(returnType, ts.TypeFlags.Any)) {
        return undefined;
    }
    if ((tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword) ? isEffectivelyVoidPromise : isEffectivelyVoid)(returnType)) {
        return ReturnKind.Void;
    }
    return ReturnKind.Value;
}
/** True for `void`, `undefined`, Promise<void>, or `void | undefined | Promise<void>`. */
function isEffectivelyVoidPromise(type) {
    // Would need access to `checker.getPromisedTypeOfPromise` to do this properly.
    // Assume that the return type is the global Promise (since this is an async function) and get its type argument.
    // tslint:disable-next-line no-bitwise
    return tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Void | ts.TypeFlags.Undefined) ||
        tsutils_1.isUnionType(type) && type.types.every(isEffectivelyVoidPromise) ||
        tsutils_1.isTypeReference(type) && type.typeArguments !== undefined && type.typeArguments.length === 1 &&
            isEffectivelyVoidPromise(type.typeArguments[0]);
}
/** True for `void`, `undefined`, or `void | undefined`. */
function isEffectivelyVoid(type) {
    // tslint:disable-next-line no-bitwise
    return tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Void | ts.TypeFlags.Undefined) ||
        tsutils_1.isUnionType(type) && type.types.every(isEffectivelyVoid);
}
function tryGetReturnType(fnType, checker) {
    if (fnType === undefined) {
        return undefined;
    }
    var sigs = checker.getSignaturesOfType(fnType, ts.SignatureKind.Call);
    if (sigs.length !== 1) {
        return undefined;
    }
    return checker.getReturnTypeOfSignature(sigs[0]);
}
function isFunctionLike(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return true;
        default:
            return false;
    }
}
function isFunctionExpressionLike(node) {
    return node.kind === ts.SyntaxKind.FunctionExpression || node.kind === ts.SyntaxKind.ArrowFunction;
}
