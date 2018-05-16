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
var ts = require("typescript");
var Lint = require("../index");
var tsutils_1 = require("tsutils");
var OPTION__ALLOW_CONSTRUCTOR_ONLY = "allow-constructor-only";
var OPTION__ALLOW_EMPTY_CLASS = "allow-empty-class";
var OPTION__ALLOW_STATIC_ONLY = "allow-static-only";
function parseOptions(options) {
    return {
        allowConstructorOnly: options.indexOf(OPTION__ALLOW_CONSTRUCTOR_ONLY) !== -1,
        allowEmptyClass: options.indexOf(OPTION__ALLOW_EMPTY_CLASS) !== -1,
        allowStaticOnly: options.indexOf(OPTION__ALLOW_STATIC_ONLY) !== -1,
    };
}
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoUnnecessaryClassWalker(sourceFile, this.ruleName, parseOptions(this.ruleArguments)));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unnecessary-class",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows classes that are not strictly necessary."], ["\n            Disallows classes that are not strictly necessary."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Users who come from a Java-style OO language may wrap\n            their utility functions in an extra class, instead of\n            putting them at the top level."], ["\n            Users who come from a Java-style OO language may wrap\n            their utility functions in an extra class, instead of\n            putting them at the top level."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            Three arguments may be optionally provided:\n\n            * `\"allow-constructor-only\"` ignores classes whose members are constructors.\n            * `\"allow-empty-class\"` ignores `class DemoClass {}`.\n            * `\"allow-static-only\"` ignores classes whose members are static."], ["\n            Three arguments may be optionally provided:\n\n            * \\`\"allow-constructor-only\"\\` ignores classes whose members are constructors.\n            * \\`\"allow-empty-class\"\\` ignores \\`class DemoClass {}\\`.\n            * \\`\"allow-static-only\"\\` ignores classes whose members are static."]))),
        options: {
            type: "array",
            items: {
                type: "string",
            },
            minLength: 0,
            maxLength: 3,
        },
        optionExamples: [true, ["allow-empty-class", "allow-constructor-only"]],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_CONSTRUCTOR_ONLY = "Every member of this class is a constructor. Use functions instead.";
    Rule.FAILURE_STATIC_ONLY = "Every member of this class is static. Use namespaces or plain objects instead.";
    Rule.FAILURE_EMPTY_CLASS = "This class has no members.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoUnnecessaryClassWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoUnnecessaryClassWalker, _super);
    function NoUnnecessaryClassWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoUnnecessaryClassWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var checkIfUnnecessaryClass = function (node) {
            if (tsutils_1.isClassDeclaration(node) && !hasExtendsClause(node)) {
                _this.checkMembers(node);
            }
            return ts.forEachChild(node, checkIfUnnecessaryClass);
        };
        ts.forEachChild(sourceFile, checkIfUnnecessaryClass);
    };
    NoUnnecessaryClassWalker.prototype.checkMembers = function (node) {
        if (node.members.length === 0) {
            if (!this.options.allowEmptyClass) {
                this.addFailureAtNode(tsutils_1.getChildOfKind(node, ts.SyntaxKind.ClassKeyword), Rule.FAILURE_EMPTY_CLASS);
            }
            return;
        }
        var allMembersAreConstructors = node.members.every(tsutils_1.isConstructorDeclaration);
        if (allMembersAreConstructors &&
            !this.options.allowConstructorOnly &&
            !node.members.some(isConstructorWithShorthandProps)) {
            this.addFailureAtNode(tsutils_1.getChildOfKind(node, ts.SyntaxKind.ClassKeyword, this.sourceFile), Rule.FAILURE_CONSTRUCTOR_ONLY);
        }
        if (!allMembersAreConstructors &&
            !this.options.allowStaticOnly &&
            !node.members.some(isNonStaticMember)) {
            this.addFailureAtNode(tsutils_1.getChildOfKind(node, ts.SyntaxKind.ClassKeyword, this.sourceFile), Rule.FAILURE_STATIC_ONLY);
        }
    };
    return NoUnnecessaryClassWalker;
}(Lint.AbstractWalker));
function isNonStaticMember(member) {
    return (isConstructorWithShorthandProps(member) ||
        (!tsutils_1.isConstructorDeclaration(member) && !tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.StaticKeyword)));
}
function hasExtendsClause(declaration) {
    return (declaration.heritageClauses !== undefined &&
        declaration.heritageClauses[0].token === ts.SyntaxKind.ExtendsKeyword);
}
function isConstructorWithShorthandProps(member) {
    return tsutils_1.isConstructorDeclaration(member) && member.parameters.some(tsutils_1.isParameterProperty);
}
var templateObject_1, templateObject_2, templateObject_3;
