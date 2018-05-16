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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.failureStringFactory = function (name, seenBeforeLine) {
        return "Mergeable namespace '" + name + "' found. Merge its contents with the namespace on line " + seenBeforeLine + ".";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, undefined));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-mergeable-namespace",
        description: "Disallows mergeable namespaces in the same file.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "maintainability",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    tslib_1.__extends(Walker, _super);
    function Walker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walker.prototype.walk = function (node) {
        return this.checkStatements(node.statements);
    };
    Walker.prototype.checkStatements = function (statements) {
        var seen = new Map();
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            if (statement.kind !== ts.SyntaxKind.ModuleDeclaration) {
                continue;
            }
            var name = statement.name;
            if (name.kind === ts.SyntaxKind.Identifier) {
                var text = name.text;
                var prev = seen.get(text);
                if (prev !== undefined) {
                    this.addFailureAtNode(name, Rule.failureStringFactory(text, this.getLineOfNode(prev.name)));
                }
                seen.set(text, statement);
            }
            // Recursively check in all module declarations
            this.checkModuleDeclaration(statement);
        }
    };
    Walker.prototype.checkModuleDeclaration = function (decl) {
        var body = decl.body;
        if (body === undefined) {
            return;
        }
        switch (body.kind) {
            case ts.SyntaxKind.ModuleBlock:
                this.checkStatements(body.statements);
                break;
            case ts.SyntaxKind.ModuleDeclaration:
                this.checkModuleDeclaration(body);
        }
    };
    Walker.prototype.getLineOfNode = function (node) {
        return ts.getLineAndCharacterOfPosition(this.sourceFile, node.pos).line + 1;
    };
    return Walker;
}(Lint.AbstractWalker));
