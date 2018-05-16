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
var utils_1 = require("../utils");
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
        ruleName: "use-default-type-parameter",
        description: "Warns if an explicitly specified type argument is the default for that type parameter.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "This is the default value for this type parameter, so it can be omitted.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        var argsAndParams = getArgsAndParameters(node, checker);
        if (argsAndParams !== undefined) {
            checkArgsAndParameters(argsAndParams);
        }
        return ts.forEachChild(node, cb);
    });
    function checkArgsAndParameters(_a) {
        var typeArguments = _a.typeArguments, typeParameters = _a.typeParameters;
        // Just check the last one. Must specify previous type parameters if the last one is specified.
        var i = typeArguments.length - 1;
        var arg = typeArguments[i];
        var param = typeParameters[i];
        // TODO: would like checker.areTypesEquivalent. https://github.com/Microsoft/TypeScript/issues/13502
        if (param.default !== undefined && param.default.getText() === arg.getText()) {
            ctx.addFailureAtNode(arg, Rule.FAILURE_STRING, createFix());
        }
        function createFix() {
            if (i === 0) {
                return Lint.Replacement.deleteFromTo(typeArguments.pos - 1, typeArguments.end + 1);
            }
            else {
                return Lint.Replacement.deleteFromTo(typeArguments[i - 1].end, arg.end);
            }
        }
    }
}
function getArgsAndParameters(node, checker) {
    switch (node.kind) {
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.TypeReference:
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            var decl = node;
            var typeArguments = decl.typeArguments;
            if (typeArguments === undefined) {
                return undefined;
            }
            var typeParameters = decl.kind === ts.SyntaxKind.TypeReference
                ? typeParamsFromType(decl.typeName, checker)
                : decl.kind === ts.SyntaxKind.ExpressionWithTypeArguments
                    ? typeParamsFromType(decl.expression, checker)
                    : typeParamsFromCall(node, checker);
            return typeParameters === undefined ? undefined : { typeArguments: typeArguments, typeParameters: typeParameters };
        default:
            return undefined;
    }
}
function typeParamsFromCall(node, checker) {
    var sig = checker.getResolvedSignature(node);
    var sigDecl = sig === undefined ? undefined : sig.getDeclaration();
    if (sigDecl === undefined) {
        return node.kind === ts.SyntaxKind.NewExpression ? typeParamsFromType(node.expression, checker) : undefined;
    }
    return sigDecl.typeParameters === undefined ? undefined : sigDecl.typeParameters;
}
function typeParamsFromType(type, checker) {
    var sym = getAliasedSymbol(checker.getSymbolAtLocation(type), checker);
    if (sym === undefined || sym.declarations === undefined) {
        return undefined;
    }
    return utils_1.find(sym.declarations, function (decl) {
        return tsutils_1.isClassLikeDeclaration(decl) || tsutils_1.isTypeAliasDeclaration(decl) || tsutils_1.isInterfaceDeclaration(decl) ? decl.typeParameters : undefined;
    });
}
function getAliasedSymbol(symbol, checker) {
    if (symbol === undefined) {
        return undefined;
    }
    return tsutils_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(symbol) : symbol;
}
