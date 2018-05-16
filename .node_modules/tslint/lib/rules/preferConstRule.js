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
var ts = require("typescript");
var Lint = require("../index");
var utils = require("tsutils");
var OPTION_DESTRUCTURING_ALL = "all";
var OPTION_DESTRUCTURING_ANY = "any";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (identifier, blockScoped) {
        return "Identifier '" + identifier + "' is never reassigned; use 'const' instead of '" + (blockScoped ? "let" : "var") + "'.";
    };
    Rule.prototype.apply = function (sourceFile) {
        var options = {
            destructuringAll: this.ruleArguments.length !== 0 &&
                this.ruleArguments[0].destructuring === OPTION_DESTRUCTURING_ALL,
        };
        var preferConstWalker = new PreferConstWalker(sourceFile, this.ruleName, options);
        return this.applyWithWalker(preferConstWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "prefer-const",
        description: "Requires that variable declarations use `const` instead of `let` and `var` if possible.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If a variable is only assigned to once when it is declared, it should be declared using 'const'"], ["\n            If a variable is only assigned to once when it is declared, it should be declared using 'const'"]))),
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            An optional object containing the property \"destructuring\" with two possible values:\n\n            * \"", "\" (default) - If any variable in destructuring can be const, this rule warns for those variables.\n            * \"", "\" - Only warns if all variables in destructuring can be const."], ["\n            An optional object containing the property \"destructuring\" with two possible values:\n\n            * \"", "\" (default) - If any variable in destructuring can be const, this rule warns for those variables.\n            * \"", "\" - Only warns if all variables in destructuring can be const."])), OPTION_DESTRUCTURING_ANY, OPTION_DESTRUCTURING_ALL),
        options: {
            type: "object",
            properties: {
                destructuring: {
                    type: "string",
                    enum: [OPTION_DESTRUCTURING_ALL, OPTION_DESTRUCTURING_ANY],
                },
            },
        },
        optionExamples: [
            true,
            [true, { destructuring: OPTION_DESTRUCTURING_ALL }],
        ],
        type: "maintainability",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var Scope = /** @class */ (function () {
    function Scope(functionScope) {
        this.variables = new Map();
        this.reassigned = new Set();
        // if no functionScope is provided we are in the process of creating a new function scope, which for consistency links to itself
        this.functionScope = functionScope === undefined ? this : functionScope;
    }
    Scope.prototype.addVariable = function (identifier, declarationInfo, destructuringInfo) {
        // block scoped variables go to the block scope, function scoped variables to the containing function scope
        var scope = declarationInfo.isBlockScoped ? this : this.functionScope;
        scope.variables.set(identifier.text, {
            declarationInfo: declarationInfo,
            destructuringInfo: destructuringInfo,
            identifier: identifier,
            reassigned: false,
        });
    };
    return Scope;
}());
var PreferConstWalker = /** @class */ (function (_super) {
    tslib_1.__extends(PreferConstWalker, _super);
    function PreferConstWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferConstWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        // don't check anything on declaration files
        if (sourceFile.isDeclarationFile) {
            return;
        }
        this.scope = new Scope();
        var cb = function (node) {
            var savedScope = _this.scope;
            var boundary = utils.isScopeBoundary(node);
            if (boundary !== 0 /* None */) {
                if (boundary === 1 /* Function */) {
                    if (node.kind === ts.SyntaxKind.ModuleDeclaration && utils.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
                        // don't check ambient namespaces
                        return;
                    }
                    _this.scope = new Scope();
                    if (utils.isFunctionDeclaration(node) ||
                        utils.isMethodDeclaration(node) ||
                        utils.isFunctionExpression(node) ||
                        utils.isArrowFunction(node) ||
                        utils.isConstructorDeclaration(node)) {
                        // special handling for function parameters
                        // each parameter initializer can only reassign preceding parameters of variables of the containing scope
                        if (node.body !== undefined) {
                            for (var _i = 0, _a = node.parameters; _i < _a.length; _i++) {
                                var param = _a[_i];
                                cb(param);
                                _this.settle(savedScope);
                            }
                            cb(node.body);
                            _this.onScopeEnd(savedScope);
                        }
                        _this.scope = savedScope;
                        return;
                    }
                }
                else {
                    _this.scope = new Scope(_this.scope.functionScope);
                    if ((utils.isForInStatement(node) || utils.isForOfStatement(node)) &&
                        node.initializer.kind !== ts.SyntaxKind.VariableDeclarationList) {
                        _this.handleExpression(node.initializer);
                    }
                }
            }
            if (node.kind === ts.SyntaxKind.VariableDeclarationList) {
                _this.handleVariableDeclaration(node);
            }
            else if (node.kind === ts.SyntaxKind.CatchClause) {
                if (node.variableDeclaration !== undefined) {
                    _this.handleBindingName(node.variableDeclaration.name, {
                        canBeConst: false,
                        isBlockScoped: true,
                    });
                }
            }
            else if (node.kind === ts.SyntaxKind.Parameter) {
                if (node.parent.kind !== ts.SyntaxKind.IndexSignature) {
                    _this.handleBindingName(node.name, {
                        canBeConst: false,
                        isBlockScoped: true,
                    });
                }
            }
            else if (utils.isPostfixUnaryExpression(node) ||
                utils.isPrefixUnaryExpression(node) &&
                    (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
                if (utils.isIdentifier(node.operand)) {
                    _this.scope.reassigned.add(node.operand.text);
                }
            }
            else if (utils.isBinaryExpression(node) && utils.isAssignmentKind(node.operatorToken.kind)) {
                _this.handleExpression(node.left);
            }
            if (boundary !== 0 /* None */) {
                ts.forEachChild(node, cb);
                _this.onScopeEnd(savedScope);
                _this.scope = savedScope;
            }
            else {
                return ts.forEachChild(node, cb);
            }
        };
        if (ts.isExternalModule(sourceFile)) {
            ts.forEachChild(sourceFile, cb);
            this.onScopeEnd();
        }
        else {
            return ts.forEachChild(sourceFile, cb);
        }
    };
    PreferConstWalker.prototype.handleExpression = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                this.scope.reassigned.add(node.text);
                break;
            case ts.SyntaxKind.ParenthesizedExpression:
                this.handleExpression(node.expression);
                break;
            case ts.SyntaxKind.ArrayLiteralExpression:
                for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (element.kind === ts.SyntaxKind.SpreadElement) {
                        this.handleExpression(element.expression);
                    }
                    else {
                        this.handleExpression(element);
                    }
                }
                break;
            case ts.SyntaxKind.ObjectLiteralExpression:
                for (var _b = 0, _c = node.properties; _b < _c.length; _b++) {
                    var property = _c[_b];
                    switch (property.kind) {
                        case ts.SyntaxKind.ShorthandPropertyAssignment:
                            this.scope.reassigned.add(property.name.text);
                            break;
                        case ts.SyntaxKind.SpreadAssignment:
                            if (property.name !== undefined) {
                                this.scope.reassigned.add(property.name.text);
                            }
                            else {
                                // handle `...(variable)`
                                this.handleExpression(property.expression);
                            }
                            break;
                        default:
                            this.handleExpression(property.initializer);
                    }
                }
        }
    };
    PreferConstWalker.prototype.handleBindingName = function (name, declarationInfo) {
        var _this = this;
        if (name.kind === ts.SyntaxKind.Identifier) {
            this.scope.addVariable(name, declarationInfo);
        }
        else {
            var destructuringInfo_1 = {
                reassignedSiblings: false,
            };
            utils.forEachDestructuringIdentifier(name, function (declaration) { return _this.scope.addVariable(declaration.name, declarationInfo, destructuringInfo_1); });
        }
    };
    PreferConstWalker.prototype.handleVariableDeclaration = function (declarationList) {
        var declarationInfo;
        var kind = utils.getVariableDeclarationKind(declarationList);
        if (kind === 2 /* Const */ ||
            utils.hasModifier(declarationList.parent.modifiers, ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.DeclareKeyword)) {
            declarationInfo = {
                canBeConst: false,
                isBlockScoped: kind !== 0 /* Var */,
            };
        }
        else {
            declarationInfo = {
                allInitialized: declarationList.parent.kind === ts.SyntaxKind.ForOfStatement ||
                    declarationList.parent.kind === ts.SyntaxKind.ForInStatement ||
                    declarationList.declarations.every(function (declaration) { return declaration.initializer !== undefined; }),
                canBeConst: true,
                declarationList: declarationList,
                isBlockScoped: kind === 1 /* Let */,
                isForLoop: declarationList.parent.kind === ts.SyntaxKind.ForStatement ||
                    declarationList.parent.kind === ts.SyntaxKind.ForOfStatement,
                reassignedSiblings: false,
            };
        }
        for (var _i = 0, _a = declarationList.declarations; _i < _a.length; _i++) {
            var declaration = _a[_i];
            this.handleBindingName(declaration.name, declarationInfo);
        }
    };
    PreferConstWalker.prototype.settle = function (parent) {
        var _a = this.scope, variables = _a.variables, reassigned = _a.reassigned;
        reassigned.forEach(function (name) {
            var variableInfo = variables.get(name);
            if (variableInfo !== undefined) {
                if (variableInfo.declarationInfo.canBeConst) {
                    variableInfo.reassigned = true;
                    variableInfo.declarationInfo.reassignedSiblings = true;
                    if (variableInfo.destructuringInfo !== undefined) {
                        variableInfo.destructuringInfo.reassignedSiblings = true;
                    }
                }
            }
            else if (parent !== undefined) {
                // if the reassigned variable was not declared in this scope we defer to the parent scope
                parent.reassigned.add(name);
            }
        });
        reassigned.clear();
    };
    PreferConstWalker.prototype.onScopeEnd = function (parent) {
        var _this = this;
        this.settle(parent);
        var appliedFixes = new Set();
        this.scope.variables.forEach(function (info, name) {
            if (info.declarationInfo.canBeConst &&
                !info.reassigned &&
                // don't add failures for reassigned variables in for loop initializer
                !(info.declarationInfo.reassignedSiblings && info.declarationInfo.isForLoop) &&
                // if {destructuring: "all"} is set, only add a failure if all variables in a destructuring assignment can be const
                (!_this.options.destructuringAll ||
                    info.destructuringInfo === undefined ||
                    !info.destructuringInfo.reassignedSiblings)) {
                var fix = void 0;
                // only apply fixes if the VariableDeclarationList has no reassigned variables
                // and the variable is block scoped aka `let` and initialized
                if (info.declarationInfo.allInitialized &&
                    !info.declarationInfo.reassignedSiblings &&
                    info.declarationInfo.isBlockScoped &&
                    !appliedFixes.has(info.declarationInfo.declarationList)) {
                    fix = new Lint.Replacement(info.declarationInfo.declarationList.getStart(_this.sourceFile), 3, "const");
                    // add only one fixer per VariableDeclarationList
                    appliedFixes.add(info.declarationInfo.declarationList);
                }
                _this.addFailureAtNode(info.identifier, Rule.FAILURE_STRING_FACTORY(name, info.declarationInfo.isBlockScoped), fix);
            }
        });
    };
    return PreferConstWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2;
