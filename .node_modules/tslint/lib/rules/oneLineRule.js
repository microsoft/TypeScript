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
var OPTION_BRACE = "check-open-brace";
var OPTION_CATCH = "check-catch";
var OPTION_ELSE = "check-else";
var OPTION_FINALLY = "check-finally";
var OPTION_WHITESPACE = "check-whitespace";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new OneLineWalker(sourceFile, this.ruleName, {
            brace: this.ruleArguments.indexOf(OPTION_BRACE) !== -1,
            catch: this.ruleArguments.indexOf(OPTION_CATCH) !== -1,
            else: this.ruleArguments.indexOf(OPTION_ELSE) !== -1,
            finally: this.ruleArguments.indexOf(OPTION_FINALLY) !== -1,
            whitespace: this.ruleArguments.indexOf(OPTION_WHITESPACE) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "one-line",
        description: "Requires the specified tokens to be on the same line as the expression preceding them.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Five arguments may be optionally provided:\n\n            * `\"", "\"` checks that `catch` is on the same line as the closing brace for `try`.\n            * `\"", "\"` checks that `finally` is on the same line as the closing brace for `catch`.\n            * `\"", "\"` checks that `else` is on the same line as the closing brace for `if`.\n            * `\"", "\"` checks that an open brace falls on the same line as its preceding expression.\n            * `\"", "\"` checks preceding whitespace for the specified tokens."], ["\n            Five arguments may be optionally provided:\n\n            * \\`\"", "\"\\` checks that \\`catch\\` is on the same line as the closing brace for \\`try\\`.\n            * \\`\"", "\"\\` checks that \\`finally\\` is on the same line as the closing brace for \\`catch\\`.\n            * \\`\"", "\"\\` checks that \\`else\\` is on the same line as the closing brace for \\`if\\`.\n            * \\`\"", "\"\\` checks that an open brace falls on the same line as its preceding expression.\n            * \\`\"", "\"\\` checks preceding whitespace for the specified tokens."])), OPTION_CATCH, OPTION_FINALLY, OPTION_ELSE, OPTION_BRACE, OPTION_WHITESPACE),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_CATCH, OPTION_FINALLY, OPTION_ELSE, OPTION_BRACE, OPTION_WHITESPACE],
            },
            minLength: 0,
            maxLength: 5,
        },
        optionExamples: [[true, OPTION_CATCH, OPTION_FINALLY, OPTION_ELSE]],
        type: "style",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.WHITESPACE_FAILURE_STRING = "missing whitespace";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var OneLineWalker = /** @class */ (function (_super) {
    tslib_1.__extends(OneLineWalker, _super);
    function OneLineWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OneLineWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.Block:
                    if (!tsutils_1.isBlockLike(node.parent)) {
                        _this.check({ pos: node.pos, end: node.statements.pos });
                    }
                    break;
                case ts.SyntaxKind.CaseBlock:
                    _this.check({ pos: node.pos, end: node.clauses.pos });
                    break;
                case ts.SyntaxKind.ModuleBlock:
                    _this.check({ pos: node.pos, end: node.statements.pos });
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    _this.check({ pos: node.name.end, end: node.members.pos });
                    break;
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.ClassExpression: {
                    var openBrace = tsutils_1.getChildOfKind(node, ts.SyntaxKind.OpenBraceToken, sourceFile);
                    if (openBrace !== undefined) {
                        _this.check(openBrace);
                    }
                    break;
                }
                case ts.SyntaxKind.IfStatement: {
                    var _a = node, thenStatement = _a.thenStatement, elseStatement = _a.elseStatement;
                    if (elseStatement !== undefined && thenStatement.kind === ts.SyntaxKind.Block) {
                        _this.check({ pos: thenStatement.end, end: elseStatement.pos }, "else");
                    }
                    break;
                }
                case ts.SyntaxKind.TryStatement: {
                    var _b = node, finallyBlock = _b.finallyBlock, catchClause = _b.catchClause, tryBlock = _b.tryBlock;
                    if (catchClause !== undefined) {
                        _this.check(catchClause.getChildAt(0, sourceFile), "catch");
                        if (finallyBlock !== undefined) {
                            _this.check({ pos: catchClause.end, end: finallyBlock.pos }, "finally");
                        }
                    }
                    else if (finallyBlock !== undefined) {
                        _this.check({ pos: tryBlock.end, end: finallyBlock.pos }, "finally");
                    }
                    break;
                }
                case ts.SyntaxKind.BinaryExpression: {
                    var _c = node, operatorToken = _c.operatorToken, right = _c.right;
                    if (operatorToken.kind === ts.SyntaxKind.EqualsToken && tsutils_1.isObjectLiteralExpression(right)) {
                        _this.check({ pos: right.pos, end: right.properties.pos });
                    }
                    break;
                }
                case ts.SyntaxKind.VariableDeclaration: {
                    var initializer = node.initializer;
                    if (initializer !== undefined && tsutils_1.isObjectLiteralExpression(initializer)) {
                        _this.check({ pos: initializer.pos, end: initializer.properties.pos });
                    }
                    break;
                }
                case ts.SyntaxKind.TypeAliasDeclaration: {
                    var type = node.type;
                    if (type.kind === ts.SyntaxKind.MappedType || type.kind === ts.SyntaxKind.TypeLiteral) {
                        _this.check(type.getChildAt(0, sourceFile));
                    }
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    OneLineWalker.prototype.check = function (range, kind) {
        var tokenStart = range.end - (kind === undefined ? 1 : kind.length);
        if (this.options[kind === undefined ? "brace" : kind] && !tsutils_1.isSameLine(this.sourceFile, range.pos, tokenStart)) {
            this.addFailure(tokenStart, range.end, "misplaced " + (kind === undefined ? "opening brace" : "'" + kind + "'"), Lint.Replacement.replaceFromTo(range.pos, tokenStart, this.options.whitespace ? " " : ""));
        }
        else if (this.options.whitespace && range.pos === tokenStart) {
            this.addFailure(tokenStart, range.end, Rule.WHITESPACE_FAILURE_STRING, Lint.Replacement.appendText(range.pos, " "));
        }
    };
    return OneLineWalker;
}(Lint.AbstractWalker));
var templateObject_1;
