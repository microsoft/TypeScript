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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (importName, exportName) {
        return "Expected import '" + importName + "' to match the default export '" + exportName + "'.";
    };
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "match-default-export-name",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Requires that a default import have the same name as the declaration it imports.\n            Does nothing for anonymous default exports."], ["\n            Requires that a default import have the same name as the declaration it imports.\n            Does nothing for anonymous default exports."]))),
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
function walk(ctx, tc) {
    for (var _i = 0, _a = ctx.sourceFile.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        if (!tsutils_1.isImportDeclaration(statement) ||
            statement.importClause === undefined || statement.importClause.name === undefined) {
            continue;
        }
        var defaultImport = statement.importClause.name;
        var symbol = tc.getSymbolAtLocation(defaultImport);
        if (symbol === undefined || !tsutils_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias)) {
            continue;
        }
        var declarations = tc.getAliasedSymbol(symbol).declarations;
        if (declarations !== undefined && declarations.length !== 0) {
            var name = declarations[0].name;
            if (name !== undefined && name.kind === ts.SyntaxKind.Identifier && name.text !== defaultImport.text) {
                ctx.addFailureAtNode(defaultImport, Rule.FAILURE_STRING(defaultImport.text, name.text));
            }
        }
    }
}
var templateObject_1;
