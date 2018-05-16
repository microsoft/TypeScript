"use strict";
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
var ALWAYS_OR_NEVER = {
    enum: ["always", "never"],
    type: "string",
};
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments[0]));
    };
    Rule.metadata = {
        description: "Require or disallow a space before function parenthesis",
        hasFix: true,
        optionExamples: [
            true,
            [true, "always"],
            [true, "never"],
            [true, { anonymous: "always", named: "never", asyncArrow: "always" }],
        ],
        options: {
            properties: {
                anonymous: ALWAYS_OR_NEVER,
                asyncArrow: ALWAYS_OR_NEVER,
                constructor: ALWAYS_OR_NEVER,
                method: ALWAYS_OR_NEVER,
                named: ALWAYS_OR_NEVER,
            },
            type: "object",
        },
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One argument which is an object which may contain the keys `anonymous`, `named`, and `asyncArrow`\n            These should be set to either `\"always\"` or `\"never\"`.\n\n            * `\"anonymous\"` checks before the opening paren in anonymous functions\n            * `\"named\"` checks before the opening paren in named functions\n            * `\"asyncArrow\"` checks before the opening paren in async arrow functions\n            * `\"method\"` checks before the opening paren in class methods\n            * `\"constructor\"` checks before the opening paren in class constructors\n        "], ["\n            One argument which is an object which may contain the keys \\`anonymous\\`, \\`named\\`, and \\`asyncArrow\\`\n            These should be set to either \\`\"always\"\\` or \\`\"never\"\\`.\n\n            * \\`\"anonymous\"\\` checks before the opening paren in anonymous functions\n            * \\`\"named\"\\` checks before the opening paren in named functions\n            * \\`\"asyncArrow\"\\` checks before the opening paren in async arrow functions\n            * \\`\"method\"\\` checks before the opening paren in class methods\n            * \\`\"constructor\"\\` checks before the opening paren in class constructors\n        "]))),
        ruleName: "space-before-function-paren",
        type: "style",
        typescriptOnly: false,
    };
    Rule.INVALID_WHITESPACE_ERROR = "Spaces before function parens are disallowed";
    Rule.MISSING_WHITESPACE_ERROR = "Missing whitespace before function parens";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var optionNames = ["anonymous", "asyncArrow", "constructor", "method", "named"];
function parseOptions(json) {
    // Need to specify constructor or it will be Object
    var options = { constructor: undefined };
    for (var _i = 0, optionNames_1 = optionNames; _i < optionNames_1.length; _i++) {
        var optionName = optionNames_1[_i];
        options[optionName] = typeof json === "object" ? json[optionName] : json === undefined ? "always" : json;
    }
    return options;
}
function walk(ctx) {
    var options = ctx.options, sourceFile = ctx.sourceFile;
    ts.forEachChild(sourceFile, function cb(node) {
        var option = getOption(node, options);
        if (option !== undefined) {
            check(node, option);
        }
        ts.forEachChild(node, cb);
    });
    function check(node, option) {
        var openParen = tsutils_1.getChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile);
        // openParen may be missing for an async arrow function `async x => ...`.
        if (openParen === undefined) {
            return;
        }
        var hasSpace = Lint.isWhiteSpace(sourceFile.text.charCodeAt(openParen.end - 2));
        if (hasSpace && option === "never") {
            var pos = openParen.getStart() - 1;
            ctx.addFailureAt(pos, 1, Rule.INVALID_WHITESPACE_ERROR, Lint.Replacement.deleteText(pos, 1));
        }
        else if (!hasSpace && option === "always") {
            var pos = openParen.getStart();
            ctx.addFailureAt(pos, 1, Rule.MISSING_WHITESPACE_ERROR, Lint.Replacement.appendText(pos, " "));
        }
    }
}
function getOption(node, options) {
    switch (node.kind) {
        case ts.SyntaxKind.ArrowFunction:
            return !hasTypeParameters(node) && tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword)
                ? options.asyncArrow : undefined;
        case ts.SyntaxKind.Constructor:
            return options.constructor;
        case ts.SyntaxKind.FunctionDeclaration:
        // name is optional for function declaration which is default export (TS will emit error in other cases).
        // Can be handled in the same way as function expression.
        case ts.SyntaxKind.FunctionExpression: {
            var functionName = node.name;
            var hasName = functionName !== undefined && functionName.text !== "";
            return hasName ? options.named : !hasTypeParameters(node) ? options.anonymous : undefined;
        }
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return options.method;
        default:
            return undefined;
    }
}
function hasTypeParameters(node) {
    return node.typeParameters !== undefined;
}
var templateObject_1;
