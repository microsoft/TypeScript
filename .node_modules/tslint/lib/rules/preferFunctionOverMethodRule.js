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
var OPTION_ALLOW_PUBLIC = "allow-public";
var OPTION_ALLOW_PROTECTED = "allow-protected";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferFunctionOverMethodWalker(sourceFile, this.ruleName, {
            allowProtected: this.ruleArguments.indexOf(OPTION_ALLOW_PROTECTED) !== -1,
            allowPublic: this.ruleArguments.indexOf(OPTION_ALLOW_PUBLIC) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "prefer-function-over-method",
        description: "Warns for class methods that do not use 'this'.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            \"", "\" excludes checking of public methods.\n            \"", "\" excludes checking of protected methods."], ["\n            \"", "\" excludes checking of public methods.\n            \"", "\" excludes checking of protected methods."])), OPTION_ALLOW_PUBLIC, OPTION_ALLOW_PROTECTED),
        options: {
            type: "string",
            enum: [OPTION_ALLOW_PUBLIC, OPTION_ALLOW_PROTECTED],
        },
        optionExamples: [
            true,
            [true, OPTION_ALLOW_PUBLIC, OPTION_ALLOW_PROTECTED],
        ],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Class method does not use 'this'. Use a function instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var PreferFunctionOverMethodWalker = /** @class */ (function (_super) {
    tslib_1.__extends(PreferFunctionOverMethodWalker, _super);
    function PreferFunctionOverMethodWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferFunctionOverMethodWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isMethodDeclaration(node) && !_this.isExempt(node)) {
                // currentScope is always undefined here, so we don't need to save it and just set it to undefined afterwards
                _this.currentScope = {
                    isThisUsed: false,
                    name: tsutils_1.getPropertyName(node.name),
                };
                ts.forEachChild(node, cb);
                if (!_this.currentScope.isThisUsed) {
                    _this.addFailureAtNode(node.name, Rule.FAILURE_STRING);
                }
                _this.currentScope = undefined;
            }
            else if (tsutils_1.hasOwnThisReference(node)) {
                var scope = _this.currentScope;
                _this.currentScope = undefined;
                ts.forEachChild(node, cb);
                _this.currentScope = scope;
            }
            else if (_this.currentScope !== undefined &&
                (node.kind === ts.SyntaxKind.ThisKeyword && !isRecursiveCall(node, _this.currentScope.name) ||
                    node.kind === ts.SyntaxKind.SuperKeyword)) {
                _this.currentScope.isThisUsed = true;
            }
            else {
                return ts.forEachChild(node, cb);
            }
        };
        return ts.forEachChild(sourceFile, cb);
    };
    PreferFunctionOverMethodWalker.prototype.isExempt = function (node) {
        // TODO: handle the override keyword once it lands in the language
        return node.body === undefined || // exclude abstract methods and overload signatures
            // exclude object methods
            node.parent.kind !== ts.SyntaxKind.ClassDeclaration && node.parent.kind !== ts.SyntaxKind.ClassExpression ||
            tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword) ||
            this.options.allowProtected && tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword) ||
            this.options.allowPublic && (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.PublicKeyword) ||
                !tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PrivateKeyword));
    };
    return PreferFunctionOverMethodWalker;
}(Lint.AbstractWalker));
function isRecursiveCall(node, name) {
    return name !== undefined &&
        node.parent.kind === ts.SyntaxKind.PropertyAccessExpression &&
        node.parent.name.text === name;
}
var templateObject_1;
