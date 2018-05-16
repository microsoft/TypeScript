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
var typeUtils_1 = require("../language/typeUtils");
var OPTION_ONLY_INLINE_LAMBDAS = "only-inline-lambdas";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var options = {
            onlyInlineLambdas: this.ruleArguments.indexOf(OPTION_ONLY_INLINE_LAMBDAS) !== -1,
        };
        return this.applyWithFunction(sourceFile, walk, options, program.getTypeChecker());
    };
    Rule.metadata = {
        description: "Requires that private variables are marked as `readonly` if they're never modified outside of the constructor.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If a private variable is only assigned to in the constructor, it should be declared as `readonly`.\n        "], ["\n            If a private variable is only assigned to in the constructor, it should be declared as \\`readonly\\`.\n        "]))),
        optionExamples: [
            true,
            [true, OPTION_ONLY_INLINE_LAMBDAS],
        ],
        options: {
            enum: [OPTION_ONLY_INLINE_LAMBDAS],
            type: "string",
        },
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            If `", "` is specified, only immediately-declared arrow functions are checked."], ["\n            If \\`", "\\` is specified, only immediately-declared arrow functions are checked."])), OPTION_ONLY_INLINE_LAMBDAS),
        rationale: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            Marking never-modified variables as readonly helps enforce the code's intent of keeping them as never-modified.\n            It can also help prevent accidental changes of members not meant to be changed."], ["\n            Marking never-modified variables as readonly helps enforce the code's intent of keeping them as never-modified.\n            It can also help prevent accidental changes of members not meant to be changed."]))),
        requiresTypeInfo: true,
        ruleName: "prefer-readonly",
        type: "maintainability",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(context, typeChecker) {
    if (context.sourceFile.isDeclarationFile) {
        return;
    }
    var scope;
    ts.forEachChild(context.sourceFile, visitNode);
    function visitNode(node) {
        if (utils.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
            return;
        }
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                handleClassDeclarationOrExpression(node);
                break;
            case ts.SyntaxKind.Constructor:
                handleConstructor(node);
                break;
            case ts.SyntaxKind.PropertyDeclaration:
                handlePropertyDeclaration(node);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (scope !== undefined) {
                    handlePropertyAccessExpression(node, node.parent);
                }
                break;
            default:
                if (utils.isFunctionScopeBoundary(node)) {
                    handleFunctionScopeBoundary(node);
                }
                else {
                    ts.forEachChild(node, visitNode);
                }
        }
    }
    function handleFunctionScopeBoundary(node) {
        if (scope === undefined) {
            ts.forEachChild(node, visitNode);
            return;
        }
        scope.enterNonConstructorScope();
        ts.forEachChild(node, visitNode);
        scope.exitNonConstructorScope();
    }
    function handleClassDeclarationOrExpression(node) {
        var parentScope = scope;
        var childScope = scope = new ClassScope(node, typeChecker);
        ts.forEachChild(node, visitNode);
        finalizeScope(childScope);
        scope = parentScope;
    }
    function handleConstructor(node) {
        scope.enterConstructor();
        for (var _i = 0, _a = node.parameters; _i < _a.length; _i++) {
            var parameter = _a[_i];
            if (utils.isModifierFlagSet(parameter, ts.ModifierFlags.Private)) {
                scope.addDeclaredVariable(parameter);
            }
        }
        ts.forEachChild(node, visitNode);
        scope.exitConstructor();
    }
    function handlePropertyDeclaration(node) {
        if (!shouldPropertyDeclarationBeIgnored(node)) {
            scope.addDeclaredVariable(node);
        }
        ts.forEachChild(node, visitNode);
    }
    function handlePropertyAccessExpression(node, parent) {
        switch (parent.kind) {
            case ts.SyntaxKind.BinaryExpression:
                handleParentBinaryExpression(node, parent);
                break;
            case ts.SyntaxKind.DeleteExpression:
                handleDeleteExpression(node);
                break;
            case ts.SyntaxKind.PostfixUnaryExpression:
            case ts.SyntaxKind.PrefixUnaryExpression:
                handleParentPostfixOrPrefixUnaryExpression(parent);
        }
        ts.forEachChild(node, visitNode);
    }
    function handleParentBinaryExpression(node, parent) {
        if (parent.left === node && utils.isAssignmentKind(parent.operatorToken.kind)) {
            scope.addVariableModification(node);
        }
    }
    function handleParentPostfixOrPrefixUnaryExpression(node) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            scope.addVariableModification(node.operand);
        }
    }
    function handleDeleteExpression(node) {
        scope.addVariableModification(node);
    }
    function shouldPropertyDeclarationBeIgnored(node) {
        if (!context.options.onlyInlineLambdas) {
            return false;
        }
        return node.initializer === undefined || node.initializer.kind !== ts.SyntaxKind.ArrowFunction;
    }
    function finalizeScope(childScope) {
        for (var _i = 0, _a = childScope.finalizeUnmodifiedPrivateNonReadonlys(); _i < _a.length; _i++) {
            var violatingNode = _a[_i];
            complainOnNode(violatingNode);
        }
    }
    function complainOnNode(node) {
        var fix = Lint.Replacement.appendText(node.modifiers.end, " readonly");
        context.addFailureAtNode(node.name, createFailureString(node), fix);
    }
}
function createFailureString(node) {
    var accessibility = utils.isModifierFlagSet(node, ts.ModifierFlags.Static)
        ? "static"
        : "member";
    var text = node.name.getText();
    return "Private " + accessibility + " variable '" + text + "' is never reassigned; mark it as 'readonly'.";
}
var OUTSIDE_CONSTRUCTOR = -1;
var DIRECTLY_INSIDE_CONSTRUCTOR = 0;
var ClassScope = /** @class */ (function () {
    function ClassScope(classNode, typeChecker) {
        this.privateModifiableMembers = new Map();
        this.privateModifiableStatics = new Map();
        this.memberVariableModifications = new Set();
        this.staticVariableModifications = new Set();
        this.constructorScopeDepth = OUTSIDE_CONSTRUCTOR;
        this.classType = typeChecker.getTypeAtLocation(classNode);
        this.typeChecker = typeChecker;
    }
    ClassScope.prototype.addDeclaredVariable = function (node) {
        if (!utils.isModifierFlagSet(node, ts.ModifierFlags.Private)
            || utils.isModifierFlagSet(node, ts.ModifierFlags.Readonly)
            || node.name.kind === ts.SyntaxKind.ComputedPropertyName) {
            return;
        }
        if (utils.isModifierFlagSet(node, ts.ModifierFlags.Static)) {
            this.privateModifiableStatics.set(node.name.getText(), node);
        }
        else {
            this.privateModifiableMembers.set(node.name.getText(), node);
        }
    };
    ClassScope.prototype.addVariableModification = function (node) {
        var modifierType = this.typeChecker.getTypeAtLocation(node.expression);
        if (modifierType.symbol === undefined || !typeUtils_1.typeIsOrHasBaseType(modifierType, this.classType)) {
            return;
        }
        var toStatic = utils.isObjectType(modifierType) && utils.isObjectFlagSet(modifierType, ts.ObjectFlags.Anonymous);
        if (!toStatic && this.constructorScopeDepth === DIRECTLY_INSIDE_CONSTRUCTOR) {
            return;
        }
        var variable = node.name.text;
        (toStatic ? this.staticVariableModifications : this.memberVariableModifications).add(variable);
    };
    ClassScope.prototype.enterConstructor = function () {
        this.constructorScopeDepth = DIRECTLY_INSIDE_CONSTRUCTOR;
    };
    ClassScope.prototype.exitConstructor = function () {
        this.constructorScopeDepth = OUTSIDE_CONSTRUCTOR;
    };
    ClassScope.prototype.enterNonConstructorScope = function () {
        if (this.constructorScopeDepth !== OUTSIDE_CONSTRUCTOR) {
            this.constructorScopeDepth += 1;
        }
    };
    ClassScope.prototype.exitNonConstructorScope = function () {
        if (this.constructorScopeDepth !== OUTSIDE_CONSTRUCTOR) {
            this.constructorScopeDepth -= 1;
        }
    };
    ClassScope.prototype.finalizeUnmodifiedPrivateNonReadonlys = function () {
        var _this = this;
        this.memberVariableModifications.forEach(function (variableName) {
            _this.privateModifiableMembers.delete(variableName);
        });
        this.staticVariableModifications.forEach(function (variableName) {
            _this.privateModifiableStatics.delete(variableName);
        });
        return Array.from(this.privateModifiableMembers.values()).concat(Array.from(this.privateModifiableStatics.values()));
    };
    return ClassScope;
}());
var templateObject_1, templateObject_2, templateObject_3;
