"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
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
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoInternalModuleWalker(sourceFile, this.ruleName, undefined));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-internal-module",
        description: "Disallows internal `module`",
        rationale: "Using `module` leads to a confusion of concepts with external modules. Use the newer `namespace` keyword instead.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: true,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "The internal 'module' syntax is deprecated, use the 'namespace' keyword instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInternalModuleWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoInternalModuleWalker, _super);
    function NoInternalModuleWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInternalModuleWalker.prototype.walk = function (sourceFile) {
        return this.checkStatements(sourceFile.statements);
    };
    NoInternalModuleWalker.prototype.checkStatements = function (statements) {
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            if (statement.kind === ts.SyntaxKind.ModuleDeclaration) {
                this.checkModuleDeclaration(statement);
            }
        }
    };
    NoInternalModuleWalker.prototype.checkModuleDeclaration = function (node, nested) {
        if (!nested &&
            node.name.kind === ts.SyntaxKind.Identifier &&
            !tsutils_1.isNodeFlagSet(node, ts.NodeFlags.Namespace) &&
            // augmenting global uses a special syntax that is allowed
            // see https://github.com/Microsoft/TypeScript/pull/6213
            !tsutils_1.isNodeFlagSet(node, ts.NodeFlags.GlobalAugmentation)) {
            var end = node.name.pos;
            var start = end - "module".length;
            this.addFailure(start, end, Rule.FAILURE_STRING, Lint.Replacement.replaceFromTo(start, end, "namespace"));
        }
        if (node.body !== undefined) {
            switch (node.body.kind) {
                case ts.SyntaxKind.ModuleBlock:
                    return this.checkStatements(node.body.statements);
                case ts.SyntaxKind.ModuleDeclaration:
                    return this.checkModuleDeclaration(node.body, true);
            }
        }
    };
    return NoInternalModuleWalker;
}(Lint.AbstractWalker));
