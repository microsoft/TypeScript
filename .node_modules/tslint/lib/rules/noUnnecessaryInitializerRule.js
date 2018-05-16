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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unnecessary-initializer",
        description: "Forbids a 'var'/'let' statement or destructuring initializer to be initialized to 'undefined'.",
        hasFix: true,
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Values in JavaScript default to `undefined`.\n            There's no need to do so manually.\n        "], ["\n            Values in JavaScript default to \\`undefined\\`.\n            There's no need to do so manually.\n        "]))),
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Unnecessary initialization to 'undefined'.";
    Rule.FAILURE_STRING_PARAMETER = "Use an optional parameter instead of initializing to 'undefined'. " +
        "Also, the type declaration does not need to include '| undefined'.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.BindingElement:
                checkInitializer(node);
                break;
            case ts.SyntaxKind.VariableDeclaration:
                if (!tsutils_1.isBindingPattern(node.name) && !tsutils_1.isNodeFlagSet(node.parent, ts.NodeFlags.Const)) {
                    checkInitializer(node);
                }
                break;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.Constructor: {
                var parameters_1 = node.parameters;
                parameters_1.forEach(function (parameter, i) {
                    if (isUndefined(parameter.initializer)) {
                        if (parametersAllOptionalAfter(parameters_1, i)) {
                            // No fix since they may want to remove '| undefined' from the type.
                            ctx.addFailureAtNode(parameter, Rule.FAILURE_STRING_PARAMETER);
                        }
                        else {
                            failWithFix(parameter);
                        }
                    }
                });
            }
        }
        ts.forEachChild(node, cb);
    });
    function checkInitializer(node) {
        if (isUndefined(node.initializer)) {
            failWithFix(node);
        }
    }
    function failWithFix(node) {
        var fix = Lint.Replacement.deleteFromTo(tsutils_1.getChildOfKind(node, ts.SyntaxKind.EqualsToken).pos, node.end);
        ctx.addFailureAtNode(node, Rule.FAILURE_STRING, fix);
    }
}
function parametersAllOptionalAfter(parameters, idx) {
    for (var i = idx + 1; i < parameters.length; i++) {
        if (parameters[i].questionToken !== undefined) {
            return true;
        }
        if (parameters[i].initializer === undefined) {
            return false;
        }
    }
    return true;
}
function isUndefined(node) {
    return node !== undefined &&
        node.kind === ts.SyntaxKind.Identifier &&
        node.originalKeywordKind === ts.SyntaxKind.UndefinedKeyword;
}
var templateObject_1;
