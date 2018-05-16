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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_ALWAYS = "always";
var OPTION_NEVER = "never";
var OPTION_IGNORE_BOUND_CLASS_METHODS = "ignore-bound-class-methods";
var OPTION_STRICT_BOUND_CLASS_METHODS = "strict-bound-class-methods";
var OPTION_IGNORE_INTERFACES = "ignore-interfaces";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = {
            boundClassMethods: this.ruleArguments.indexOf(OPTION_STRICT_BOUND_CLASS_METHODS) !== -1
                ? 2 /* Strict */
                : this.ruleArguments.indexOf(OPTION_IGNORE_BOUND_CLASS_METHODS) !== -1
                    ? 1 /* Ignore */
                    : 0 /* Default */,
            interfaces: this.ruleArguments.indexOf(OPTION_IGNORE_INTERFACES) === -1,
        };
        var Walker = this.ruleArguments.indexOf(OPTION_NEVER) === -1 ? SemicolonAlwaysWalker : SemicolonNeverWalker;
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, options));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "semicolon",
        description: "Enforces consistent semicolon usage at the end of every statement.",
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One of the following arguments must be provided:\n\n            * `\"", "\"` enforces semicolons at the end of every statement.\n            * `\"", "\"` disallows semicolons at the end of every statement except for when they are necessary.\n\n            The following arguments may be optionally provided:\n\n            * `\"", "\"` skips checking semicolons at the end of interface members.\n            * `\"", "\"` skips checking semicolons at the end of bound class methods.\n            * `\"", "\"` disables any special handling of bound class methods and treats them as any\n            other assignment. This option overrides `\"", "\"`.\n        "], ["\n            One of the following arguments must be provided:\n\n            * \\`\"", "\"\\` enforces semicolons at the end of every statement.\n            * \\`\"", "\"\\` disallows semicolons at the end of every statement except for when they are necessary.\n\n            The following arguments may be optionally provided:\n\n            * \\`\"", "\"\\` skips checking semicolons at the end of interface members.\n            * \\`\"", "\"\\` skips checking semicolons at the end of bound class methods.\n            * \\`\"", "\"\\` disables any special handling of bound class methods and treats them as any\n            other assignment. This option overrides \\`\"", "\"\\`.\n        "])), OPTION_ALWAYS, OPTION_NEVER, OPTION_IGNORE_INTERFACES, OPTION_IGNORE_BOUND_CLASS_METHODS, OPTION_STRICT_BOUND_CLASS_METHODS, OPTION_IGNORE_BOUND_CLASS_METHODS),
        options: {
            type: "array",
            items: [
                {
                    type: "string",
                    enum: [OPTION_ALWAYS, OPTION_NEVER],
                },
                {
                    type: "string",
                    enum: [OPTION_IGNORE_INTERFACES],
                },
            ],
            additionalItems: false,
        },
        optionExamples: [
            [true, OPTION_ALWAYS],
            [true, OPTION_NEVER],
            [true, OPTION_ALWAYS, OPTION_IGNORE_INTERFACES],
            [true, OPTION_ALWAYS, OPTION_IGNORE_BOUND_CLASS_METHODS],
        ],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_MISSING = "Missing semicolon";
    Rule.FAILURE_STRING_COMMA = "Properties should be separated by semicolons";
    Rule.FAILURE_STRING_UNNECESSARY = "Unnecessary semicolon";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var SemicolonWalker = /** @class */ (function (_super) {
    tslib_1.__extends(SemicolonWalker, _super);
    function SemicolonWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemicolonWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            _this.visitNode(node);
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    SemicolonWalker.prototype.visitNode = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.SemicolonClassElement:
                return this.reportUnnecessary(node.end);
            case ts.SyntaxKind.EmptyStatement:
                return this.checkEmptyStatement(node);
            case ts.SyntaxKind.PropertyDeclaration:
                return this.visitPropertyDeclaration(node);
        }
    };
    SemicolonWalker.prototype.reportUnnecessary = function (pos, noFix) {
        this.addFailure(pos - 1, pos, Rule.FAILURE_STRING_UNNECESSARY, noFix ? undefined : Lint.Replacement.deleteText(pos - 1, 1));
    };
    SemicolonWalker.prototype.checkSemicolonOrLineBreak = function (node) {
        if (this.sourceFile.text[node.end - 1] !== ";") {
            return;
        }
        var nextToken = utils.getNextToken(node, this.sourceFile);
        switch (nextToken.kind) {
            case ts.SyntaxKind.EndOfFileToken:
            case ts.SyntaxKind.CloseBraceToken:
                return this.reportUnnecessary(node.end);
            default:
                if (!utils.isSameLine(this.sourceFile, node.end, nextToken.end)) {
                    this.reportUnnecessary(node.end);
                }
        }
    };
    SemicolonWalker.prototype.checkUnnecessary = function (node) {
        if (this.sourceFile.text[node.end - 1] !== ";") {
            return;
        }
        var lastToken = utils.getPreviousToken(node.getLastToken(this.sourceFile), this.sourceFile);
        // yield does not continue on the next line if there is no yielded expression
        if (lastToken.kind === ts.SyntaxKind.YieldKeyword && lastToken.parent.kind === ts.SyntaxKind.YieldExpression ||
            // arrow functions with block as body don't continue on the next line
            lastToken.kind === ts.SyntaxKind.CloseBraceToken && lastToken.parent.kind === ts.SyntaxKind.Block &&
                lastToken.parent.parent.kind === ts.SyntaxKind.ArrowFunction) {
            return this.checkSemicolonOrLineBreak(node);
        }
        var nextToken = utils.getNextToken(node, this.sourceFile);
        switch (nextToken.kind) {
            case ts.SyntaxKind.OpenParenToken:
            case ts.SyntaxKind.OpenBracketToken:
            case ts.SyntaxKind.PlusToken:
            case ts.SyntaxKind.MinusToken:
            case ts.SyntaxKind.RegularExpressionLiteral:
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.TemplateHead:
                break;
            case ts.SyntaxKind.CloseBraceToken:
            case ts.SyntaxKind.EndOfFileToken:
                return this.reportUnnecessary(node.end);
            default:
                if (!utils.isSameLine(this.sourceFile, node.end, nextToken.end)) {
                    this.reportUnnecessary(node.end);
                }
        }
    };
    SemicolonWalker.prototype.checkEmptyStatement = function (node) {
        // An empty statement is only ever useful when it is the only statement inside a loop
        if (!utils.isIterationStatement(node.parent)) {
            var parentKind = node.parent.kind;
            // don't remove empty statement if it is a direct child of if, with or a LabeledStatement
            // otherwise this would unintentionally change control flow
            var noFix = parentKind === ts.SyntaxKind.IfStatement ||
                parentKind === ts.SyntaxKind.LabeledStatement ||
                parentKind === ts.SyntaxKind.WithStatement;
            this.reportUnnecessary(node.end, noFix);
        }
    };
    SemicolonWalker.prototype.visitPropertyDeclaration = function (node) {
        // check if this is a multi-line arrow function
        if (this.options.boundClassMethods !== 2 /* Strict */ &&
            node.initializer !== undefined &&
            node.initializer.kind === ts.SyntaxKind.ArrowFunction &&
            !utils.isSameLine(this.sourceFile, node.getStart(this.sourceFile), node.end)) {
            if (this.options.boundClassMethods === 0 /* Default */) {
                this.checkUnnecessary(node);
            }
        }
        else {
            this.checkPropertyDeclaration(node);
        }
    };
    return SemicolonWalker;
}(Lint.AbstractWalker));
var SemicolonAlwaysWalker = /** @class */ (function (_super) {
    tslib_1.__extends(SemicolonAlwaysWalker, _super);
    function SemicolonAlwaysWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemicolonAlwaysWalker.prototype.visitNode = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.VariableStatement:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ExportAssignment:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.DebuggerStatement:
                return this.checkMissing(node);
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                // check shorthand module declarations and method / function signatures
                if (node.body === undefined) {
                    this.checkMissing(node);
                }
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
                if (this.options.interfaces) {
                    this.checkInterface(node);
                }
                break;
            default:
                return _super.prototype.visitNode.call(this, node);
        }
    };
    SemicolonAlwaysWalker.prototype.checkPropertyDeclaration = function (node) {
        return this.checkMissing(node);
    };
    SemicolonAlwaysWalker.prototype.checkMissing = function (node) {
        if (this.sourceFile.text[node.end - 1] !== ";") {
            this.reportMissing(node.end);
        }
    };
    SemicolonAlwaysWalker.prototype.reportMissing = function (pos) {
        this.addFailureAt(pos, 0, Rule.FAILURE_STRING_MISSING, Lint.Replacement.appendText(pos, ";"));
    };
    SemicolonAlwaysWalker.prototype.checkInterface = function (node) {
        for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
            var member = _a[_i];
            switch (this.sourceFile.text[member.end - 1]) {
                case ";": break;
                case ",":
                    this.addFailureAt(member.end - 1, 1, Rule.FAILURE_STRING_COMMA, new Lint.Replacement(member.end - 1, 1, ";"));
                    break;
                default:
                    this.reportMissing(member.end);
            }
        }
    };
    return SemicolonAlwaysWalker;
}(SemicolonWalker));
var SemicolonNeverWalker = /** @class */ (function (_super) {
    tslib_1.__extends(SemicolonNeverWalker, _super);
    function SemicolonNeverWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemicolonNeverWalker.prototype.visitNode = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ExportAssignment:
                return this.checkUnnecessary(node);
            case ts.SyntaxKind.VariableStatement:
                return this.checkVariableStatement(node);
            case ts.SyntaxKind.ReturnStatement:
                if (node.expression === undefined) {
                    // return does not continue on the next line if the is no returned expression
                    return this.checkSemicolonOrLineBreak(node);
                }
                return this.checkUnnecessary(node);
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.DebuggerStatement:
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.DoStatement:
                return this.checkSemicolonOrLineBreak(node);
            case ts.SyntaxKind.ModuleDeclaration:
                // shorthand module declaration
                if (node.body === undefined) {
                    this.checkShorthandModuleDeclaration(node);
                }
                break;
            case ts.SyntaxKind.MethodDeclaration:
                // check method signature
                if (node.body === undefined) {
                    this.checkSemicolonOrLineBreak(node);
                }
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                // check function signature
                if (node.body === undefined) {
                    this.checkSemicolonOrLineBreak(node);
                }
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
                if (this.options.interfaces) {
                    this.checkInterface(node);
                }
                break;
            default:
                return _super.prototype.visitNode.call(this, node);
        }
    };
    SemicolonNeverWalker.prototype.checkPropertyDeclaration = function (node) {
        if (node.initializer === undefined) {
            return this.checkSemicolonOrLineBreak(node);
        }
        return this.checkUnnecessary(node);
    };
    SemicolonNeverWalker.prototype.checkVariableStatement = function (node) {
        var declarations = node.declarationList.declarations;
        if (declarations[declarations.length - 1].initializer === undefined) {
            // variable declaration does not continue on the next line if it has no initializer
            return this.checkSemicolonOrLineBreak(node);
        }
        return this.checkUnnecessary(node);
    };
    SemicolonNeverWalker.prototype.checkShorthandModuleDeclaration = function (node) {
        var nextStatement = utils.getNextStatement(node);
        if (nextStatement === undefined || nextStatement.kind !== ts.SyntaxKind.Block) {
            this.checkSemicolonOrLineBreak(node);
        }
    };
    SemicolonNeverWalker.prototype.checkInterface = function (node) {
        for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
            var member = _a[_i];
            this.checkSemicolonOrLineBreak(member);
        }
    };
    return SemicolonNeverWalker;
}(SemicolonWalker));
var templateObject_1;
