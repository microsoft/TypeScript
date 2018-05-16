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
        ruleName: "number-literal-format",
        description: "Checks that decimal literals should begin with '0.' instead of just '.', and should not end with a trailing '0'.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Helps keep a consistent style with numeric literals.\n            Non-standard literals are more difficult to scan through and can be a symptom of typos.\n        "], ["\n            Helps keep a consistent style with numeric literals.\n            Non-standard literals are more difficult to scan through and can be a symptom of typos.\n        "]))),
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_LEADING_0 = "Number literal should not have a leading '0'.";
    Rule.FAILURE_STRING_TRAILING_0 = "Number literal should not have a trailing '0'.";
    Rule.FAILURE_STRING_TRAILING_DECIMAL = "Number literal should not end in '.'.";
    Rule.FAILURE_STRING_LEADING_DECIMAL = "Number literal should begin with '0.' and not just '.'.";
    Rule.FAILURE_STRING_NOT_UPPERCASE = "Hexadecimal number literal should be uppercase.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (tsutils_1.isNumericLiteral(node)) {
            return check(node);
        }
        return ts.forEachChild(node, cb);
    });
    function check(node) {
        // Apparently the number literal '0.0' has a '.text' of '0', so use '.getText()' instead.
        var text = node.getText(sourceFile);
        if (text.length <= 1) {
            return;
        }
        if (text.startsWith("0")) {
            // Hex/octal/binary number can't have decimal point or exponent, so no other errors possible.
            switch (text[1]) {
                case "x":
                    if (!utils_1.isUpperCase(text.slice(2))) {
                        ctx.addFailureAtNode(node, Rule.FAILURE_STRING_NOT_UPPERCASE);
                    }
                    return;
                case "o":
                case "b":
                    return;
                case ".":
                    break;
                default:
                    ctx.addFailureAtNode(node, Rule.FAILURE_STRING_LEADING_0);
                    return;
            }
        }
        var _a = text.split(/e/i), num = _a[0], exp = _a[1];
        if (exp !== undefined && (exp.startsWith("-0") || exp.startsWith("0"))) {
            ctx.addFailureAt(node.getEnd() - exp.length, exp.length, Rule.FAILURE_STRING_LEADING_0);
        }
        if (!num.includes(".")) {
            return;
        }
        if (num.startsWith(".")) {
            fail(Rule.FAILURE_STRING_LEADING_DECIMAL);
        }
        if (num.endsWith(".")) {
            fail(Rule.FAILURE_STRING_TRAILING_DECIMAL);
        }
        // Allow '10', but not '1.0'
        if (num.endsWith("0")) {
            fail(Rule.FAILURE_STRING_TRAILING_0);
        }
        function fail(message) {
            ctx.addFailureAt(node.getStart(sourceFile), num.length, message);
        }
    }
}
var templateObject_1;
