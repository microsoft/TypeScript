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
var LINE_BREAK_REGEX = /\r?\n/;
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, undefined));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "import-spacing",
        description: "Ensures proper spacing between import statement keywords",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: false,
    };
    Rule.ADD_SPACE_AFTER_IMPORT = "Add space after 'import'";
    Rule.TOO_MANY_SPACES_AFTER_IMPORT = "Too many spaces after 'import'";
    Rule.ADD_SPACE_AFTER_STAR = "Add space after '*'";
    Rule.TOO_MANY_SPACES_AFTER_STAR = "Too many spaces after '*'";
    Rule.ADD_SPACE_AFTER_FROM = "Add space after 'from'";
    Rule.TOO_MANY_SPACES_AFTER_FROM = "Too many spaces after 'from'";
    Rule.ADD_SPACE_BEFORE_FROM = "Add space before 'from'";
    Rule.TOO_MANY_SPACES_BEFORE_FROM = "Too many spaces before 'from'";
    Rule.NO_LINE_BREAKS = "Line breaks are not allowed in import declaration";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    tslib_1.__extends(Walker, _super);
    function Walker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walker.prototype.walk = function (_a) {
        var statements = _a.statements;
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            if (!tsutils_1.isImportDeclaration(statement)) {
                continue;
            }
            var importClause = statement.importClause;
            if (importClause === undefined) {
                this.checkModuleWithSideEffect(statement);
            }
            else {
                this.checkImportClause(statement, importClause);
                var namedBindings = importClause.namedBindings;
                if (namedBindings !== undefined && tsutils_1.isNamespaceImport(namedBindings)) {
                    this.checkNamespaceImport(namedBindings);
                }
            }
        }
    };
    Walker.prototype.checkImportClause = function (node, importClause) {
        var text = node.getText(this.sourceFile);
        var nodeStart = node.getStart(this.sourceFile);
        var importKeywordEnd = nodeStart + "import".length;
        var moduleSpecifierStart = node.moduleSpecifier.getStart(this.sourceFile);
        var importClauseEnd = importClause.getEnd();
        var importClauseStart = importClause.getStart(this.sourceFile);
        if (importKeywordEnd === importClauseStart) {
            this.addFailureAt(nodeStart, "import".length, Rule.ADD_SPACE_AFTER_IMPORT);
        }
        else if (importClauseStart > importKeywordEnd + 1) {
            this.addFailure(nodeStart, importClauseStart, Rule.TOO_MANY_SPACES_AFTER_IMPORT);
        }
        var fromString = text.substring(importClauseEnd - nodeStart, moduleSpecifierStart - nodeStart);
        if (/from$/.test(fromString)) {
            this.addFailureAt(importClauseEnd, fromString.length, Rule.ADD_SPACE_AFTER_FROM);
        }
        else if (/from\s{2,}$/.test(fromString)) {
            this.addFailureAt(importClauseEnd, fromString.length, Rule.TOO_MANY_SPACES_AFTER_FROM);
        }
        if (/^\s{2,}from/.test(fromString)) {
            this.addFailureAt(importClauseEnd, fromString.length, Rule.TOO_MANY_SPACES_BEFORE_FROM);
        }
        else if (/^from/.test(fromString)) {
            this.addFailureAt(importClauseEnd, fromString.length, Rule.ADD_SPACE_BEFORE_FROM);
        }
        var beforeImportClauseText = text.substring(0, importClauseStart - nodeStart);
        var afterImportClauseText = text.substring(importClauseEnd - nodeStart);
        if (LINE_BREAK_REGEX.test(beforeImportClauseText)) {
            this.addFailure(nodeStart, importClauseStart - 1, Rule.NO_LINE_BREAKS);
        }
        if (LINE_BREAK_REGEX.test(afterImportClauseText)) {
            this.addFailure(importClauseEnd, node.getEnd(), Rule.NO_LINE_BREAKS);
        }
    };
    Walker.prototype.checkNamespaceImport = function (node) {
        var text = node.getText(this.sourceFile);
        if (text.indexOf("*as") > -1) {
            this.addFailureAtNode(node, Rule.ADD_SPACE_AFTER_STAR);
        }
        else if (/\*\s{2,}as/.test(text)) {
            this.addFailureAtNode(node, Rule.TOO_MANY_SPACES_AFTER_STAR);
        }
        else if (LINE_BREAK_REGEX.test(text)) {
            this.addFailureAtNode(node, Rule.NO_LINE_BREAKS);
        }
    };
    Walker.prototype.checkModuleWithSideEffect = function (node) {
        var nodeStart = node.getStart(this.sourceFile);
        var moduleSpecifierStart = node.moduleSpecifier.getStart(this.sourceFile);
        if (nodeStart + "import".length + 1 < moduleSpecifierStart) {
            this.addFailure(nodeStart, moduleSpecifierStart, Rule.TOO_MANY_SPACES_AFTER_IMPORT);
        }
        else if (nodeStart + "import".length === moduleSpecifierStart) {
            this.addFailureAtNode(tsutils_1.getChildOfKind(node, ts.SyntaxKind.ImportKeyword, this.sourceFile), Rule.ADD_SPACE_AFTER_IMPORT);
        }
        if (LINE_BREAK_REGEX.test(node.getText())) {
            this.addFailureAtNode(node, Rule.NO_LINE_BREAKS);
        }
    };
    return Walker;
}(Lint.AbstractWalker));
