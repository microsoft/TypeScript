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
// tslint:disable object-literal-sort-keys
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var utils_1 = require("../utils");
var BANNED_KEYWORDS = ["any", "Number", "number", "String", "string", "Boolean", "boolean", "Undefined", "undefined"];
var bannedKeywordsSet = new Set(BANNED_KEYWORDS);
var bannedKeywordsStr = BANNED_KEYWORDS.map(function (kw) { return "`" + kw + "`"; }).join(", ");
var OPTION_LEADING_UNDERSCORE = "allow-leading-underscore";
var OPTION_TRAILING_UNDERSCORE = "allow-trailing-underscore";
var OPTION_BAN_KEYWORDS = "ban-keywords";
var OPTION_CHECK_FORMAT = "check-format";
var OPTION_ALLOW_PASCAL_CASE = "allow-pascal-case";
var OPTION_ALLOW_SNAKE_CASE = "allow-snake-case";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments));
    };
    Rule.metadata = {
        ruleName: "variable-name",
        description: "Checks variable names for various errors.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Five arguments may be optionally provided:\n\n            * `\"", "\"`: allows only lowerCamelCased or UPPER_CASED variable names\n              * `\"", "\"` allows underscores at the beginning (only has an effect if \"check-format\" specified)\n              * `\"", "\"` allows underscores at the end. (only has an effect if \"check-format\" specified)\n              * `\"", "\"` allows PascalCase in addition to lowerCamelCase.\n              * `\"", "\"` allows snake_case in addition to lowerCamelCase.\n            * `\"", "\"`: disallows the use of certain TypeScript keywords as variable or parameter names.\n              * These are: ", ""], ["\n            Five arguments may be optionally provided:\n\n            * \\`\"", "\"\\`: allows only lowerCamelCased or UPPER_CASED variable names\n              * \\`\"", "\"\\` allows underscores at the beginning (only has an effect if \"check-format\" specified)\n              * \\`\"", "\"\\` allows underscores at the end. (only has an effect if \"check-format\" specified)\n              * \\`\"", "\"\\` allows PascalCase in addition to lowerCamelCase.\n              * \\`\"", "\"\\` allows snake_case in addition to lowerCamelCase.\n            * \\`\"", "\"\\`: disallows the use of certain TypeScript keywords as variable or parameter names.\n              * These are: ", ""])), OPTION_CHECK_FORMAT, OPTION_LEADING_UNDERSCORE, OPTION_TRAILING_UNDERSCORE, OPTION_ALLOW_PASCAL_CASE, OPTION_ALLOW_SNAKE_CASE, OPTION_BAN_KEYWORDS, bannedKeywordsStr),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    OPTION_CHECK_FORMAT,
                    OPTION_LEADING_UNDERSCORE,
                    OPTION_TRAILING_UNDERSCORE,
                    OPTION_ALLOW_PASCAL_CASE,
                    OPTION_ALLOW_SNAKE_CASE,
                    OPTION_BAN_KEYWORDS,
                ],
            },
            minLength: 0,
            maxLength: 5,
        },
        optionExamples: [[true, "ban-keywords", "check-format", "allow-leading-underscore"]],
        type: "style",
        typescriptOnly: false,
    };
    Rule.KEYWORD_FAILURE = "variable name clashes with keyword/type";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    var banKeywords = hasOption(OPTION_BAN_KEYWORDS);
    return {
        banKeywords: banKeywords,
        // check variable name formatting by default if no options are specified
        checkFormat: !banKeywords || hasOption(OPTION_CHECK_FORMAT),
        leadingUnderscore: hasOption(OPTION_LEADING_UNDERSCORE),
        trailingUnderscore: hasOption(OPTION_TRAILING_UNDERSCORE),
        allowPascalCase: hasOption(OPTION_ALLOW_PASCAL_CASE),
        allowSnakeCase: hasOption(OPTION_ALLOW_SNAKE_CASE),
    };
    function hasOption(name) {
        return ruleArguments.indexOf(name) !== -1;
    }
}
function walk(ctx) {
    var options = ctx.options, sourceFile = ctx.sourceFile;
    return ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.BindingElement: {
                var _a = node, initializer = _a.initializer, name = _a.name, propertyName = _a.propertyName;
                if (name.kind === ts.SyntaxKind.Identifier) {
                    handleVariableNameKeyword(name);
                    // A destructuring pattern that does not rebind an expression is always an alias, e.g. `var {Foo} = ...;`.
                    // Only check if the name is rebound (`var {Foo: bar} = ...;`).
                    if (node.parent.kind !== ts.SyntaxKind.ObjectBindingPattern || propertyName !== undefined) {
                        handleVariableNameFormat(name, initializer);
                    }
                }
                break;
            }
            case ts.SyntaxKind.VariableStatement:
                // skip 'declare' keywords
                if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
                    return;
                }
                break;
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.VariableDeclaration: {
                var _b = node, name = _b.name, initializer = _b.initializer;
                if (name.kind === ts.SyntaxKind.Identifier) {
                    handleVariableNameFormat(name, initializer);
                    // do not check property declarations for keywords, they are allowed to be keywords
                    if (node.kind !== ts.SyntaxKind.PropertyDeclaration) {
                        handleVariableNameKeyword(name);
                    }
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
    function handleVariableNameFormat(name, initializer) {
        if (!options.checkFormat) {
            return;
        }
        var text = name.text;
        if (initializer !== undefined && isAlias(text, initializer)) {
            return;
        }
        if (text.length !== 0 && !isCamelCase(text, options) && !utils_1.isUpperCase(text)) {
            ctx.addFailureAtNode(name, formatFailure());
        }
    }
    function handleVariableNameKeyword(name) {
        if (options.banKeywords && bannedKeywordsSet.has(name.text)) {
            ctx.addFailureAtNode(name, Rule.KEYWORD_FAILURE);
        }
    }
    function formatFailure() {
        var failureMessage = "variable name must be in lowerCamelCase";
        if (options.allowPascalCase) {
            failureMessage += ", PascalCase";
        }
        if (options.allowSnakeCase) {
            failureMessage += ", snake_case";
        }
        return failureMessage + " or UPPER_CASE";
    }
}
function isAlias(name, initializer) {
    switch (initializer.kind) {
        case ts.SyntaxKind.PropertyAccessExpression:
            return initializer.name.text === name;
        case ts.SyntaxKind.Identifier:
            return initializer.text === name;
        default:
            return false;
    }
}
function isCamelCase(name, options) {
    var firstCharacter = name[0];
    var lastCharacter = name[name.length - 1];
    var middle = name.slice(1, -1);
    if (!options.leadingUnderscore && firstCharacter === "_") {
        return false;
    }
    if (!options.trailingUnderscore && lastCharacter === "_") {
        return false;
    }
    if (!options.allowPascalCase && !utils_1.isLowerCase(firstCharacter)) {
        return false;
    }
    if (!options.allowSnakeCase && middle.indexOf("_") !== -1) {
        return false;
    }
    return true;
}
var templateObject_1;
