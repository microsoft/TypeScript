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
        ruleName: "type-literal-delimiter",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Checks that type literal members are separated by semicolons.\n            Enforces a trailing semicolon for multiline type literals."], ["\n            Checks that type literal members are separated by semicolons.\n            Enforces a trailing semicolon for multiline type literals."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_MISSING = "Expected type literal to use ';' to separate members.";
    Rule.FAILURE_STRING_COMMA = "Expected type literal to use ';' instead of ','.";
    Rule.FAILURE_STRING_TRAILING = "Did not expect single-line type literal to have a trailing ';'.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    ts.forEachChild(sourceFile, function cb(node) {
        if (tsutils_1.isTypeLiteralNode(node)) {
            check(node);
        }
        ts.forEachChild(node, cb);
    });
    function check(node) {
        node.members.forEach(function (member, idx) {
            var end = member.end - 1;
            // Trailing delimiter should be ommitted for a single-line type literal.
            var shouldOmit = idx === node.members.length - 1 && tsutils_1.isSameLine(sourceFile, node.getStart(sourceFile), node.getEnd());
            var delimiter = sourceFile.text[end];
            switch (delimiter) {
                case ";":
                    if (shouldOmit) {
                        fail(Rule.FAILURE_STRING_TRAILING);
                    }
                    break;
                case ",":
                    fail(Rule.FAILURE_STRING_COMMA);
                    break;
                default:
                    if (!shouldOmit) {
                        fail(Rule.FAILURE_STRING_MISSING);
                    }
            }
            function fail(failure) {
                ctx.addFailureAt(end, 1, failure);
            }
        });
    }
}
var templateObject_1;
