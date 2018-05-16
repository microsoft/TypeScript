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
/* tslint:disable:object-literal-sort-keys */
var SPACE_OPTIONS = {
    type: "string",
    enum: ["nospace", "onespace", "space"],
};
var SPACE_OBJECT = {
    type: "object",
    properties: {
        "call-signature": SPACE_OPTIONS,
        "index-signature": SPACE_OPTIONS,
        "parameter": SPACE_OPTIONS,
        "property-declaration": SPACE_OPTIONS,
        "variable-declaration": SPACE_OPTIONS,
    },
    additionalProperties: false,
};
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (option, location, type) {
        return "expected " + option + " " + location + " colon in " + type;
    };
    Rule.prototype.apply = function (sourceFile) {
        var args = this.ruleArguments;
        var options = {
            left: args[0],
            right: args[1],
        };
        return this.applyWithWalker(new TypedefWhitespaceWalker(sourceFile, this.ruleName, options));
    };
    Rule.metadata = {
        ruleName: "typedef-whitespace",
        description: "Requires or disallows whitespace for type definitions.",
        descriptionDetails: "Determines if a space is required or not before the colon in a type specifier.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Two arguments which are both objects.\n            The first argument specifies how much space should be to the _left_ of a typedef colon.\n            The second argument specifies how much space should be to the _right_ of a typedef colon.\n            Each key should have a value of `\"onespace\"`, `\"space\"` or `\"nospace\"`.\n            Possible keys are:\n\n            * `\"call-signature\"` checks return type of functions.\n            * `\"index-signature\"` checks index type specifier of indexers.\n            * `\"parameter\"` checks function parameters.\n            * `\"property-declaration\"` checks object property declarations.\n            * `\"variable-declaration\"` checks variable declaration."], ["\n            Two arguments which are both objects.\n            The first argument specifies how much space should be to the _left_ of a typedef colon.\n            The second argument specifies how much space should be to the _right_ of a typedef colon.\n            Each key should have a value of \\`\"onespace\"\\`, \\`\"space\"\\` or \\`\"nospace\"\\`.\n            Possible keys are:\n\n            * \\`\"call-signature\"\\` checks return type of functions.\n            * \\`\"index-signature\"\\` checks index type specifier of indexers.\n            * \\`\"parameter\"\\` checks function parameters.\n            * \\`\"property-declaration\"\\` checks object property declarations.\n            * \\`\"variable-declaration\"\\` checks variable declaration."]))),
        options: {
            type: "array",
            items: [SPACE_OBJECT, SPACE_OBJECT],
            additionalItems: false,
        },
        optionExamples: [
            [
                true,
                {
                    "call-signature": "nospace",
                    "index-signature": "nospace",
                    "parameter": "nospace",
                    "property-declaration": "nospace",
                    "variable-declaration": "nospace",
                },
                {
                    "call-signature": "onespace",
                    "index-signature": "onespace",
                    "parameter": "onespace",
                    "property-declaration": "onespace",
                    "variable-declaration": "onespace",
                },
            ],
        ],
        type: "typescript",
        typescriptOnly: true,
        hasFix: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypedefWhitespaceWalker = /** @class */ (function (_super) {
    tslib_1.__extends(TypedefWhitespaceWalker, _super);
    function TypedefWhitespaceWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedefWhitespaceWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            var optionType = getOptionType(node);
            if (optionType !== undefined) {
                _this.checkSpace(node, optionType);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    TypedefWhitespaceWalker.prototype.checkSpace = function (node, key) {
        if (!("type" in node) || node.type === undefined) {
            return;
        }
        var _a = this.options, left = _a.left, right = _a.right;
        var colon = tsutils_1.getChildOfKind(node, ts.SyntaxKind.ColonToken, this.sourceFile);
        if (right !== undefined && right[key] !== undefined) {
            this.checkRight(colon.end, right[key], key);
        }
        if (left !== undefined && left[key] !== undefined) {
            this.checkLeft(colon.end - 1, left[key], key);
        }
    };
    TypedefWhitespaceWalker.prototype.checkRight = function (colonEnd, option, key) {
        var pos = colonEnd;
        var text = this.sourceFile.text;
        var current = text.charCodeAt(pos);
        if (ts.isLineBreak(current)) {
            return;
        }
        while (ts.isWhiteSpaceSingleLine(current)) {
            ++pos;
            current = text.charCodeAt(pos);
        }
        return this.validateWhitespace(colonEnd, pos, option, "after", key);
    };
    TypedefWhitespaceWalker.prototype.checkLeft = function (colonStart, option, key) {
        var pos = colonStart;
        var text = this.sourceFile.text;
        var current = text.charCodeAt(pos - 1);
        while (ts.isWhiteSpaceSingleLine(current)) {
            --pos;
            current = text.charCodeAt(pos - 1);
        }
        if (ts.isLineBreak(current)) {
            return;
        }
        return this.validateWhitespace(pos, colonStart, option, "before", key);
    };
    TypedefWhitespaceWalker.prototype.validateWhitespace = function (start, end, option, location, key) {
        switch (option) {
            case "nospace":
                if (start !== end) {
                    this.addFailure(start, end, Rule.FAILURE_STRING(option, location, key), Lint.Replacement.deleteFromTo(start, end));
                }
                break;
            case "space":
                if (start === end) {
                    this.addFailure(end, end, Rule.FAILURE_STRING(option, location, key), Lint.Replacement.appendText(end, " "));
                }
                break;
            case "onespace":
                switch (end - start) {
                    case 0:
                        this.addFailure(end, end, Rule.FAILURE_STRING(option, location, key), Lint.Replacement.appendText(end, " "));
                        break;
                    case 1:
                        break;
                    default:
                        this.addFailure(start + 1, end, Rule.FAILURE_STRING(option, location, key), Lint.Replacement.deleteFromTo(start + 1, end));
                }
        }
    };
    return TypedefWhitespaceWalker;
}(Lint.AbstractWalker));
function getOptionType(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.CallSignature:
            return "call-signature";
        case ts.SyntaxKind.IndexSignature:
            return "index-signature";
        case ts.SyntaxKind.VariableDeclaration:
            return "variable-declaration";
        case ts.SyntaxKind.Parameter:
            return "parameter";
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyDeclaration:
            return "property-declaration";
        default:
            return undefined;
    }
}
var templateObject_1;
