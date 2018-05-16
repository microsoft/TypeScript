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
        ruleName: "no-invalid-template-strings",
        description: "Warns on use of `\${` in non-template strings.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: "Interpolation will only work for template strings.",
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Interpolation will only work for template strings.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (utils.isStringLiteral(node)) {
            check(node);
        }
        return ts.forEachChild(node, cb);
    });
    function check(node) {
        var text = node.getText(ctx.sourceFile);
        var findTemplateStrings = /\\*\$\{/g;
        var instance = findTemplateStrings.exec(text);
        while (instance !== null) {
            var matchLength = instance[0].length;
            var backslashCount = matchLength - 2;
            var instanceIsEscaped = backslashCount % 2 === 1;
            if (!instanceIsEscaped) {
                var start = node.getStart() + (instance.index + backslashCount);
                ctx.addFailureAt(start, 2, Rule.FAILURE_STRING);
            }
            instance = findTemplateStrings.exec(text);
        }
    }
}
