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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (name) {
        return "Qualifier is unnecessary since '" + name + "' is in scope.";
    };
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unnecessary-qualifier",
        description: "Warns when a namespace qualifier (`A.x`) is unnecessary.",
        hasFix: true,
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    var namespacesInScope = [];
    ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
                namespacesInScope.push(node);
                ts.forEachChild(node, cb);
                namespacesInScope.pop();
                break;
            case ts.SyntaxKind.QualifiedName:
                var _a = node, left = _a.left, right = _a.right;
                visitNamespaceAccess(node, left, right);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                var _b = node, expression = _b.expression, name = _b.name;
                if (utils.isEntityNameExpression(expression)) {
                    visitNamespaceAccess(node, expression, name);
                    break;
                }
            // falls through
            default:
                ts.forEachChild(node, cb);
        }
    }
    function visitNamespaceAccess(node, qualifier, name) {
        if (qualifierIsUnnecessary(qualifier, name)) {
            var fix = Lint.Replacement.deleteFromTo(qualifier.getStart(), name.getStart());
            ctx.addFailureAtNode(qualifier, Rule.FAILURE_STRING(qualifier.getText()), fix);
        }
        else {
            // Only look for nested qualifier errors if we didn't already fail on the outer qualifier.
            ts.forEachChild(node, cb);
        }
    }
    function qualifierIsUnnecessary(qualifier, name) {
        var namespaceSymbol = checker.getSymbolAtLocation(qualifier);
        if (namespaceSymbol === undefined || !symbolIsNamespaceInScope(namespaceSymbol)) {
            return false;
        }
        var accessedSymbol = checker.getSymbolAtLocation(name);
        if (accessedSymbol === undefined) {
            return false;
        }
        // If the symbol in scope is different, the qualifier is necessary.
        var fromScope = getSymbolInScope(qualifier, accessedSymbol.flags, name.text);
        return fromScope === undefined || symbolsAreEqual(accessedSymbol, fromScope);
    }
    function getSymbolInScope(node, flags, name) {
        // TODO:PERF `getSymbolsInScope` gets a long list. Is there a better way?
        var scope = checker.getSymbolsInScope(node, flags);
        return scope.find(function (scopeSymbol) { return scopeSymbol.name === name; });
    }
    function symbolIsNamespaceInScope(symbol) {
        var symbolDeclarations = symbol.getDeclarations();
        if (symbolDeclarations === undefined) {
            return false;
        }
        else if (symbolDeclarations.some(function (decl) { return namespacesInScope.some(function (ns) { return ns === decl; }); })) {
            return true;
        }
        var alias = tryGetAliasedSymbol(symbol, checker);
        return alias !== undefined && symbolIsNamespaceInScope(alias);
    }
    function symbolsAreEqual(accessed, inScope) {
        if (checker.getExportSymbolOfSymbol !== undefined) {
            inScope = checker.getExportSymbolOfSymbol(inScope);
            return accessed === inScope;
        }
        return accessed === inScope ||
            // For compatibility with typescript@2.5: compare declarations because the symbols don't have the same reference
            Lint.Utils.arraysAreEqual(accessed.declarations, inScope.declarations, function (a, b) { return a === b; });
    }
}
function tryGetAliasedSymbol(symbol, checker) {
    return utils.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(symbol) : undefined;
}
