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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (ident) {
        return "Property '" + ident + "' cannot be declared in the constructor";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-parameter-properties",
        description: "Disallows parameter properties in class constructors.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Parameter properties can be confusing to those new to TS as they are less explicit\n            than other ways of declaring and initializing class members.\n\n            It can be cleaner to keep member variable declarations in one list directly only the class\n            (instead of mixed between direct class members and constructor parameter properties).\n        "], ["\n            Parameter properties can be confusing to those new to TS as they are less explicit\n            than other ways of declaring and initializing class members.\n\n            It can be cleaner to keep member variable declarations in one list directly only the class\n            (instead of mixed between direct class members and constructor parameter properties).\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (node.kind === ts.SyntaxKind.Constructor) {
            for (var _i = 0, _a = node.parameters; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (tsutils_1.isParameterProperty(parameter)) {
                    ctx.addFailure(parameter.getStart(ctx.sourceFile), parameter.name.pos, Rule.FAILURE_STRING_FACTORY(parameter.name.getText(ctx.sourceFile)));
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
var templateObject_1;
