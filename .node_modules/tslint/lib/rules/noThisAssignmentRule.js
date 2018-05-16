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
var ALLOW_THIS_DESTRUCTURING = "allow-destructuring";
var ALLOWED_THIS_NAMES = "allowed-names";
var parseConfigOptions = function (configOptions) {
    var allowedNames = [];
    var allowDestructuring = false;
    if (configOptions !== undefined) {
        allowDestructuring = !!configOptions[ALLOW_THIS_DESTRUCTURING];
        if (configOptions[ALLOWED_THIS_NAMES] !== undefined) {
            allowedNames.push.apply(allowedNames, configOptions[ALLOWED_THIS_NAMES]);
        }
    }
    return { allowedNames: allowedNames, allowDestructuring: allowDestructuring };
};
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING_FACTORY_IDENTIFIERS = function (name) {
        return "Assigning `this` reference to local variable not allowed: " + name + ".";
    };
    Rule.prototype.apply = function (sourceFile) {
        var options = parseConfigOptions(this.ruleArguments[0]);
        var noThisAssignmentWalker = new NoThisAssignmentWalker(sourceFile, this.ruleName, options);
        return this.applyWithWalker(noThisAssignmentWalker);
    };
    Rule.metadata = {
        description: "Disallows unnecessary references to `this`.",
        optionExamples: [
            true,
            [
                true,
                (_a = {},
                    _a[ALLOWED_THIS_NAMES] = ["^self$"],
                    _a[ALLOW_THIS_DESTRUCTURING] = true,
                    _a),
            ],
        ],
        options: {
            additionalProperties: false,
            properties: (_b = {},
                _b[ALLOW_THIS_DESTRUCTURING] = {
                    type: "boolean",
                },
                _b[ALLOWED_THIS_NAMES] = {
                    listType: "string",
                    type: "list",
                },
                _b),
            type: "object",
        },
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Two options may be provided on an object:\n\n            * `", "` allows using destructuring to access members of `this` (e.g. `{ foo, bar } = this;`).\n            * `", "` may be specified as a list of regular expressions to match allowed variable names."], ["\n            Two options may be provided on an object:\n\n            * \\`", "\\` allows using destructuring to access members of \\`this\\` (e.g. \\`{ foo, bar } = this;\\`).\n            * \\`", "\\` may be specified as a list of regular expressions to match allowed variable names."])), ALLOW_THIS_DESTRUCTURING, ALLOWED_THIS_NAMES),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Assigning a variable to `this` instead of properly using arrow lambdas may be a symptom of pre-ES6 practices\n            or not managing scope well.\n\n            Instead of storing a reference to `this` and using it inside a `function () {`:\n\n            ```\n            const self = this;\n\n            setTimeout(function () {\n                self.doWork();\n            });\n            ```\n\n            Use `() =>` arrow lambdas, as they preserve `this` scope for you:\n\n            ```\n            setTimeout(() => {\n                this.doWork();\n            });\n            ```\n        "], ["\n            Assigning a variable to \\`this\\` instead of properly using arrow lambdas may be a symptom of pre-ES6 practices\n            or not managing scope well.\n\n            Instead of storing a reference to \\`this\\` and using it inside a \\`function () {\\`:\n\n            \\`\\`\\`\n            const self = this;\n\n            setTimeout(function () {\n                self.doWork();\n            });\n            \\`\\`\\`\n\n            Use \\`() =>\\` arrow lambdas, as they preserve \\`this\\` scope for you:\n\n            \\`\\`\\`\n            setTimeout(() => {\n                this.doWork();\n            });\n            \\`\\`\\`\n        "]))),
        ruleName: "no-this-assignment",
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING_BINDINGS = "Don't assign members of `this` to local variables.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoThisAssignmentWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoThisAssignmentWalker, _super);
    function NoThisAssignmentWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allowedThisNameTesters = _this.options.allowedNames.map(function (allowedThisName) { return new RegExp(allowedThisName); });
        _this.visitNode = function (node) {
            if (utils.isVariableDeclaration(node)) {
                _this.visitVariableDeclaration(node);
            }
            ts.forEachChild(node, _this.visitNode);
        };
        return _this;
    }
    NoThisAssignmentWalker.prototype.walk = function (sourceFile) {
        ts.forEachChild(sourceFile, this.visitNode);
    };
    NoThisAssignmentWalker.prototype.visitVariableDeclaration = function (node) {
        if (node.initializer === undefined || node.initializer.kind !== ts.SyntaxKind.ThisKeyword) {
            return;
        }
        switch (node.name.kind) {
            case ts.SyntaxKind.Identifier:
                if (this.variableNameIsBanned(node.name.text)) {
                    this.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY_IDENTIFIERS(node.name.text));
                }
                break;
            default:
                if (!this.options.allowDestructuring) {
                    this.addFailureAtNode(node, Rule.FAILURE_STRING_BINDINGS);
                }
        }
    };
    NoThisAssignmentWalker.prototype.variableNameIsBanned = function (name) {
        for (var _i = 0, _a = this.allowedThisNameTesters; _i < _a.length; _i++) {
            var tester = _a[_i];
            if (tester.test(name)) {
                return false;
            }
        }
        return true;
    };
    return NoThisAssignmentWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2;
var _a, _b;
