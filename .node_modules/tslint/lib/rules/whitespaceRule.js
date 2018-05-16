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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_BRANCH = "check-branch";
var OPTION_DECL = "check-decl";
var OPTION_OPERATOR = "check-operator";
var OPTION_MODULE = "check-module";
var OPTION_SEPARATOR = "check-separator";
var OPTION_REST_SPREAD = "check-rest-spread";
var OPTION_TYPE = "check-type";
var OPTION_TYPECAST = "check-typecast";
var OPTION_TYPE_OPERATOR = "check-type-operator";
var OPTION_PREBLOCK = "check-preblock";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments));
    };
    Rule.metadata = {
        ruleName: "whitespace",
        description: "Enforces whitespace style conventions.",
        rationale: "Helps maintain a readable, consistent style in your codebase.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Ten arguments may be optionally provided:\n\n            * `\"check-branch\"` checks branching statements (`if`/`else`/`for`/`while`) are followed by whitespace.\n            * `\"check-decl\"`checks that variable declarations have whitespace around the equals token.\n            * `\"check-operator\"` checks for whitespace around operator tokens.\n            * `\"check-module\"` checks for whitespace in import & export statements.\n            * `\"check-separator\"` checks for whitespace after separator tokens (`,`/`;`).\n            * `\"check-rest-spread\"` checks that there is no whitespace after rest/spread operator (`...`).\n            * `\"check-type\"` checks for whitespace before a variable type specification.\n            * `\"check-typecast\"` checks for whitespace between a typecast and its target.\n            * `\"check-type-operator\"` checks for whitespace between type operators `|` and `&`.\n            * `\"check-preblock\"` checks for whitespace before the opening brace of a block"], ["\n            Ten arguments may be optionally provided:\n\n            * \\`\"check-branch\"\\` checks branching statements (\\`if\\`/\\`else\\`/\\`for\\`/\\`while\\`) are followed by whitespace.\n            * \\`\"check-decl\"\\`checks that variable declarations have whitespace around the equals token.\n            * \\`\"check-operator\"\\` checks for whitespace around operator tokens.\n            * \\`\"check-module\"\\` checks for whitespace in import & export statements.\n            * \\`\"check-separator\"\\` checks for whitespace after separator tokens (\\`,\\`/\\`;\\`).\n            * \\`\"check-rest-spread\"\\` checks that there is no whitespace after rest/spread operator (\\`...\\`).\n            * \\`\"check-type\"\\` checks for whitespace before a variable type specification.\n            * \\`\"check-typecast\"\\` checks for whitespace between a typecast and its target.\n            * \\`\"check-type-operator\"\\` checks for whitespace between type operators \\`|\\` and \\`&\\`.\n            * \\`\"check-preblock\"\\` checks for whitespace before the opening brace of a block"]))),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    "check-branch", "check-decl", "check-operator", "check-module", "check-separator",
                    "check-rest-spread", "check-type", "check-typecast", "check-type-operator", "check-preblock",
                ],
            },
            minLength: 0,
            maxLength: 10,
        },
        optionExamples: [[true, "check-branch", "check-operator", "check-typecast"]],
        type: "style",
        typescriptOnly: false,
        hasFix: true,
    };
    Rule.FAILURE_STRING_MISSING = "missing whitespace";
    Rule.FAILURE_STRING_INVALID = "invalid whitespace";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    return {
        branch: has(OPTION_BRANCH),
        decl: has(OPTION_DECL),
        operator: has(OPTION_OPERATOR),
        module: has(OPTION_MODULE),
        separator: has(OPTION_SEPARATOR),
        restSpread: has(OPTION_REST_SPREAD),
        type: has(OPTION_TYPE),
        typecast: has(OPTION_TYPECAST),
        typeOperator: has(OPTION_TYPE_OPERATOR),
        preblock: has(OPTION_PREBLOCK),
    };
    function has(option) {
        return ruleArguments.indexOf(option) !== -1;
    }
}
function walk(ctx) {
    var sourceFile = ctx.sourceFile, options = ctx.options;
    ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ArrowFunction:
                checkEqualsGreaterThanTokenInNode(node);
                break;
            // check for spaces between the operator symbol (except in the case of comma statements)
            case ts.SyntaxKind.BinaryExpression: {
                var _a = node, left = _a.left, operatorToken = _a.operatorToken, right = _a.right;
                if (options.operator && operatorToken.kind !== ts.SyntaxKind.CommaToken) {
                    checkForTrailingWhitespace(left.getEnd());
                    checkForTrailingWhitespace(right.getFullStart());
                }
                break;
            }
            case ts.SyntaxKind.Block:
                if (options.preblock) {
                    checkForTrailingWhitespace(node.getFullStart());
                }
                break;
            // check for spaces between ternary operator symbols
            case ts.SyntaxKind.ConditionalExpression:
                if (options.operator) {
                    var _b = node, condition = _b.condition, whenTrue = _b.whenTrue;
                    checkForTrailingWhitespace(condition.getEnd());
                    checkForTrailingWhitespace(whenTrue.getFullStart());
                    checkForTrailingWhitespace(whenTrue.getEnd());
                }
                break;
            case ts.SyntaxKind.ConstructorType:
                checkEqualsGreaterThanTokenInNode(node);
                break;
            case ts.SyntaxKind.ExportAssignment:
                if (options.module) {
                    var exportKeyword = node.getChildAt(0);
                    var position = exportKeyword.getEnd();
                    checkForTrailingWhitespace(position);
                }
                break;
            case ts.SyntaxKind.FunctionType:
                checkEqualsGreaterThanTokenInNode(node);
                break;
            case ts.SyntaxKind.ImportDeclaration: {
                var importClause = node.importClause;
                if (options.module && importClause !== undefined) {
                    // an import clause can have _both_ named bindings and a name (the latter for the default import)
                    // but the named bindings always come last, so we only need to check that for whitespace
                    var position = void 0;
                    var namedBindings_1 = importClause.namedBindings;
                    if (namedBindings_1 !== undefined) {
                        if (namedBindings_1.kind !== ts.SyntaxKind.NamespaceImport) {
                            namedBindings_1.elements.forEach(function (element, idx, arr) {
                                var internalName = element.name;
                                if (internalName !== undefined) {
                                    if (idx === arr.length - 1) {
                                        var token = namedBindings_1.getLastToken();
                                        checkForTrailingWhitespace(token.getFullStart());
                                    }
                                    if (idx === 0) {
                                        var startPos = internalName.getStart() - 1;
                                        checkForTrailingWhitespace(startPos, startPos + 1);
                                    }
                                }
                            });
                        }
                        position = namedBindings_1.getEnd();
                    }
                    else if (importClause.name !== undefined) {
                        position = importClause.name.getEnd();
                    }
                    if (position !== undefined) {
                        checkForTrailingWhitespace(position);
                    }
                }
                break;
            }
            case ts.SyntaxKind.ImportEqualsDeclaration:
                if (options.module) {
                    var position = node.name.getEnd();
                    checkForTrailingWhitespace(position);
                }
                break;
            case ts.SyntaxKind.TypeAssertionExpression:
                if (options.typecast) {
                    var position = node.expression.getFullStart();
                    checkForTrailingWhitespace(position);
                }
                break;
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
                var _c = node, name = _c.name, type = _c.type, initializer = _c.initializer;
                if (options.decl && initializer !== undefined) {
                    checkForTrailingWhitespace((type !== undefined ? type : name).getEnd());
                }
                break;
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.Parameter:
                var dotDotDotToken = node.dotDotDotToken;
                if (options.restSpread && dotDotDotToken !== undefined) {
                    checkForExcessiveWhitespace(dotDotDotToken.end);
                }
                break;
            case ts.SyntaxKind.SpreadAssignment:
            case ts.SyntaxKind.SpreadElement:
                if (options.restSpread) {
                    var position = node.expression.getFullStart();
                    checkForExcessiveWhitespace(position);
                }
                break;
            case ts.SyntaxKind.UnionType:
            case ts.SyntaxKind.IntersectionType:
                if (options.typeOperator) {
                    var types_1 = node.types;
                    types_1.forEach(function (typeNode, index) {
                        if (index > 0) {
                            checkForTrailingWhitespace(typeNode.getFullStart());
                        }
                        if (index < types_1.length - 1) {
                            checkForTrailingWhitespace(typeNode.getEnd());
                        }
                    });
                }
        }
        ts.forEachChild(node, cb);
    });
    var prevTokenShouldBeFollowedByWhitespace = false;
    utils.forEachTokenWithTrivia(sourceFile, function (_text, tokenKind, range, parent) {
        if (tokenKind === ts.SyntaxKind.WhitespaceTrivia ||
            tokenKind === ts.SyntaxKind.NewLineTrivia ||
            tokenKind === ts.SyntaxKind.EndOfFileToken) {
            prevTokenShouldBeFollowedByWhitespace = false;
            return;
        }
        else if (prevTokenShouldBeFollowedByWhitespace) {
            addMissingWhitespaceErrorAt(range.pos);
            prevTokenShouldBeFollowedByWhitespace = false;
        }
        // check for trailing space after the given tokens
        switch (tokenKind) {
            case ts.SyntaxKind.CatchKeyword:
            case ts.SyntaxKind.ForKeyword:
            case ts.SyntaxKind.IfKeyword:
            case ts.SyntaxKind.SwitchKeyword:
            case ts.SyntaxKind.WhileKeyword:
            case ts.SyntaxKind.WithKeyword:
                if (options.branch) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
                break;
            case ts.SyntaxKind.CommaToken:
                if (options.separator) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
                break;
            case ts.SyntaxKind.SemicolonToken:
                if (!options.separator) {
                    break;
                }
                var nextPosition = range.pos + 1;
                var semicolonInTrivialFor = parent.kind === ts.SyntaxKind.ForStatement &&
                    nextPosition !== sourceFile.end &&
                    (sourceFile.text[nextPosition] === ";" || sourceFile.text[nextPosition] === ")");
                if (!semicolonInTrivialFor) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
                break;
            case ts.SyntaxKind.EqualsToken:
                if (options.decl && parent.kind !== ts.SyntaxKind.JsxAttribute) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
                break;
            case ts.SyntaxKind.ColonToken:
                if (options.type) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
                break;
            case ts.SyntaxKind.ImportKeyword:
                if (parent.kind === ts.SyntaxKind.CallExpression &&
                    parent.expression.kind === ts.SyntaxKind.ImportKeyword) {
                    return; // Don't check ImportCall
                }
            // falls through
            case ts.SyntaxKind.ExportKeyword:
            case ts.SyntaxKind.FromKeyword:
                if (options.typecast) {
                    prevTokenShouldBeFollowedByWhitespace = true;
                }
        }
    });
    function checkEqualsGreaterThanTokenInNode(node) {
        if (!options.operator) {
            return;
        }
        var equalsGreaterThanToken = utils.getChildOfKind(node, ts.SyntaxKind.EqualsGreaterThanToken, sourceFile);
        // condition so we don't crash if the arrow is somehow missing
        if (equalsGreaterThanToken === undefined) {
            return;
        }
        checkForTrailingWhitespace(equalsGreaterThanToken.getFullStart());
        checkForTrailingWhitespace(equalsGreaterThanToken.getEnd());
    }
    function checkForTrailingWhitespace(position, whiteSpacePos) {
        if (whiteSpacePos === void 0) { whiteSpacePos = position; }
        if (position !== sourceFile.end && !Lint.isWhiteSpace(sourceFile.text.charCodeAt(position))) {
            addMissingWhitespaceErrorAt(whiteSpacePos);
        }
    }
    function addMissingWhitespaceErrorAt(position) {
        // TODO: this rule occasionally adds duplicate failures.
        if (ctx.failures.some(function (f) { return f.getStartPosition().getPosition() === position; })) {
            return;
        }
        var fix = Lint.Replacement.appendText(position, " ");
        ctx.addFailureAt(position, 1, Rule.FAILURE_STRING_MISSING, fix);
    }
    function checkForExcessiveWhitespace(position) {
        if (position !== sourceFile.end && Lint.isWhiteSpace(sourceFile.text.charCodeAt(position))) {
            addInvalidWhitespaceErrorAt(position);
        }
    }
    function addInvalidWhitespaceErrorAt(position) {
        var fix = Lint.Replacement.deleteText(position, 1);
        ctx.addFailureAt(position, 1, Rule.FAILURE_STRING_INVALID, fix);
    }
}
var templateObject_1;
