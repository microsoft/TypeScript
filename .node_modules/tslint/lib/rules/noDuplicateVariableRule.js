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
var OPTION_CHECK_PARAMETERS = "check-parameters";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (name) {
        return "Duplicate variable: '" + name + "'";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDuplicateVariableWalker(sourceFile, this.ruleName, {
            parameters: this.ruleArguments.indexOf(OPTION_CHECK_PARAMETERS) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-duplicate-variable",
        description: "Disallows duplicate variable declarations in the same block scope.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            This rule is only useful when using the `var` keyword -\n            the compiler will detect redeclarations of `let` and `const` variables."], ["\n            This rule is only useful when using the \\`var\\` keyword -\n            the compiler will detect redeclarations of \\`let\\` and \\`const\\` variables."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            A variable can be reassigned if necessary -\n            there's no good reason to have a duplicate variable declaration."], ["\n            A variable can be reassigned if necessary -\n            there's no good reason to have a duplicate variable declaration."]))),
        optionsDescription: "You can specify `\"" + OPTION_CHECK_PARAMETERS + "\"` to check for variables with the same name as a parameter.",
        options: {
            type: "string",
            enum: [OPTION_CHECK_PARAMETERS],
        },
        optionExamples: [
            true,
            [true, OPTION_CHECK_PARAMETERS],
        ],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateVariableWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoDuplicateVariableWalker, _super);
    function NoDuplicateVariableWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoDuplicateVariableWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        this.scope = new Set();
        var cb = function (node) {
            if (utils.isFunctionScopeBoundary(node)) {
                var oldScope = _this.scope;
                _this.scope = new Set();
                ts.forEachChild(node, cb);
                _this.scope = oldScope;
                return;
            }
            if (_this.options.parameters && utils.isParameterDeclaration(node)) {
                _this.handleBindingName(node.name, false);
            }
            else if (utils.isVariableDeclarationList(node) && !utils.isBlockScopedVariableDeclarationList(node)) {
                for (var _i = 0, _a = node.declarations; _i < _a.length; _i++) {
                    var variable = _a[_i];
                    _this.handleBindingName(variable.name, true);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    NoDuplicateVariableWalker.prototype.handleBindingName = function (name, check) {
        if (name.kind === ts.SyntaxKind.Identifier) {
            if (check && this.scope.has(name.text)) {
                this.addFailureAtNode(name, Rule.FAILURE_STRING(name.text));
            }
            else {
                this.scope.add(name.text);
            }
        }
        else {
            for (var _i = 0, _a = name.elements; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.kind !== ts.SyntaxKind.OmittedExpression) {
                    this.handleBindingName(e.name, check);
                }
            }
        }
    };
    return NoDuplicateVariableWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2;
