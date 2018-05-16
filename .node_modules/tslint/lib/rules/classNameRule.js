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
var utils_1 = require("../utils");
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
        ruleName: "class-name",
        description: "Enforces PascalCased class and interface names.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Makes it easy to differentiate classes from regular variables at a glance.\n\n            JavaScript and general programming convention is to refer to classes in PascalCase.\n            It's confusing to use camelCase or other conventions for class names.\n        "], ["\n            Makes it easy to differentiate classes from regular variables at a glance.\n\n            JavaScript and general programming convention is to refer to classes in PascalCase.\n            It's confusing to use camelCase or other conventions for class names.\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Class name must be in pascal case";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isClassLikeDeclaration(node) && node.name !== undefined ||
            tsutils_1.isInterfaceDeclaration(node)) {
            if (!isPascalCased(node.name.text)) {
                ctx.addFailureAtNode(node.name, Rule.FAILURE_STRING);
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function isPascalCased(name) {
    return utils_1.isUpperCase(name[0]) && !name.includes("_");
}
var templateObject_1;
