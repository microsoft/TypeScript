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
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (name) {
        return "Reassigning parameter '" + name + "' is forbidden.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-parameter-reassignment",
        description: "Disallows reassigning parameters.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    tsutils_1.collectVariableUsage(ctx.sourceFile).forEach(function (variable, identifier) {
        if (!isParameter(identifier.parent)) {
            return;
        }
        for (var _i = 0, _a = variable.uses; _i < _a.length; _i++) {
            var use = _a[_i];
            if (tsutils_1.isReassignmentTarget(use.location)) {
                ctx.addFailureAtNode(use.location, Rule.FAILURE_STRING(identifier.text));
            }
        }
    });
}
function isParameter(node) {
    switch (node.kind) {
        case ts.SyntaxKind.Parameter:
            return true;
        case ts.SyntaxKind.BindingElement:
            return tsutils_1.getDeclarationOfBindingElement(node).kind === ts.SyntaxKind.Parameter;
        default:
            return false;
    }
}
