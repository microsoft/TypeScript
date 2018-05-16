"use strict";
/**
 * @license
 * Copyright 2015 Palantir Technologies, Inc.
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
var OPTION_IGNORE_PARMS = "ignore-params";
var OPTION_IGNORE_PROPERTIES = "ignore-properties";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (type) {
        return "Type " + type + " trivially inferred from a " + type + " literal, remove type annotation";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoInferrableTypesWalker(sourceFile, this.ruleName, {
            ignoreParameters: this.ruleArguments.indexOf(OPTION_IGNORE_PARMS) !== -1,
            ignoreProperties: this.ruleArguments.indexOf(OPTION_IGNORE_PROPERTIES) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-inferrable-types",
        description: "Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean.",
        rationale: "Explicit types where they can be easily inferred by the compiler make code more verbose.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Two arguments may be optionally provided:\n\n            * `", "` allows specifying an inferrable type annotation for function params.\n            This can be useful when combining with the `typedef` rule.\n            * `", "` allows specifying an inferrable type annotation for class properties."], ["\n            Two arguments may be optionally provided:\n\n            * \\`", "\\` allows specifying an inferrable type annotation for function params.\n            This can be useful when combining with the \\`typedef\\` rule.\n            * \\`", "\\` allows specifying an inferrable type annotation for class properties."])), OPTION_IGNORE_PARMS, OPTION_IGNORE_PROPERTIES),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_IGNORE_PARMS, OPTION_IGNORE_PROPERTIES],
            },
            minLength: 0,
            maxLength: 2,
        },
        hasFix: true,
        optionExamples: [
            true,
            [true, OPTION_IGNORE_PARMS],
            [true, OPTION_IGNORE_PARMS, OPTION_IGNORE_PROPERTIES],
        ],
        type: "typescript",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInferrableTypesWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoInferrableTypesWalker, _super);
    function NoInferrableTypesWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInferrableTypesWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (shouldCheck(node, _this.options)) {
                var name = node.name, type = node.type, initializer = node.initializer;
                if (type !== undefined && initializer !== undefined
                    && typeIsInferrable(type.kind, initializer)) {
                    var fix = Lint.Replacement.deleteFromTo(name.end, type.end);
                    _this.addFailureAtNode(type, Rule.FAILURE_STRING_FACTORY(ts.tokenToString(type.kind)), fix);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return NoInferrableTypesWalker;
}(Lint.AbstractWalker));
function shouldCheck(node, _a) {
    var ignoreParameters = _a.ignoreParameters, ignoreProperties = _a.ignoreProperties;
    switch (node.kind) {
        case ts.SyntaxKind.Parameter:
            return !ignoreParameters &&
                !tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword) &&
                // "ignore-properties" also works for parameter properties
                !(ignoreProperties && node.modifiers !== undefined);
        case ts.SyntaxKind.PropertyDeclaration:
            return !ignoreProperties && !tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword);
        case ts.SyntaxKind.VariableDeclaration:
            return true;
        default:
            return false;
    }
}
function typeIsInferrable(type, initializer) {
    switch (type) {
        case ts.SyntaxKind.BooleanKeyword:
            return initializer.kind === ts.SyntaxKind.TrueKeyword || initializer.kind === ts.SyntaxKind.FalseKeyword;
        case ts.SyntaxKind.NumberKeyword:
            return Lint.isNumeric(initializer);
        case ts.SyntaxKind.StringKeyword:
            switch (initializer.kind) {
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                case ts.SyntaxKind.TemplateExpression:
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}
var templateObject_1;
