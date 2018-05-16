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
var OPTION_STATEMENTS = "statements";
var OPTION_MEMBERS = "members";
var OPTION_ELEMENTS = "elements";
var OPTION_PARAMETERS = "parameters";
var OPTION_ARGUMENTS = "arguments";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new AlignWalker(sourceFile, this.ruleName, {
            arguments: this.ruleArguments.indexOf(OPTION_ARGUMENTS) !== -1,
            elements: this.ruleArguments.indexOf(OPTION_ELEMENTS) !== -1,
            members: this.ruleArguments.indexOf(OPTION_MEMBERS) !== -1,
            parameters: this.ruleArguments.indexOf(OPTION_PARAMETERS) !== -1,
            statements: this.ruleArguments.indexOf(OPTION_STATEMENTS) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "align",
        description: "Enforces vertical alignment.",
        hasFix: true,
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Helps maintain a readable, consistent style in your codebase.\n\n            Consistent alignment for code statements helps keep code readable and clear.\n            Statements misaligned from the standard can be harder to read and understand."], ["\n            Helps maintain a readable, consistent style in your codebase.\n\n            Consistent alignment for code statements helps keep code readable and clear.\n            Statements misaligned from the standard can be harder to read and understand."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Five arguments may be optionally provided:\n\n            * `\"", "\"` checks alignment of function parameters.\n            * `\"", "\"` checks alignment of function call arguments.\n            * `\"", "\"` checks alignment of statements.\n            * `\"", "\"` checks alignment of members of classes, interfaces, type literal, object literals and\n            object destructuring.\n            * `\"", "\"` checks alignment of elements of array iterals, array destructuring and tuple types."], ["\n            Five arguments may be optionally provided:\n\n            * \\`\"", "\"\\` checks alignment of function parameters.\n            * \\`\"", "\"\\` checks alignment of function call arguments.\n            * \\`\"", "\"\\` checks alignment of statements.\n            * \\`\"", "\"\\` checks alignment of members of classes, interfaces, type literal, object literals and\n            object destructuring.\n            * \\`\"", "\"\\` checks alignment of elements of array iterals, array destructuring and tuple types."])), OPTION_PARAMETERS, OPTION_ARGUMENTS, OPTION_STATEMENTS, OPTION_MEMBERS, OPTION_ELEMENTS),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_ARGUMENTS, OPTION_ELEMENTS, OPTION_MEMBERS, OPTION_PARAMETERS, OPTION_STATEMENTS],
            },
            minLength: 1,
            maxLength: 5,
        },
        optionExamples: [[true, "parameters", "statements"]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_SUFFIX = " are not aligned";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var AlignWalker = /** @class */ (function (_super) {
    tslib_1.__extends(AlignWalker, _super);
    function AlignWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlignWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (_this.options.statements && tsutils_1.isBlockLike(node)) {
                _this.checkAlignment(node.statements.filter(function (s) { return s.kind !== ts.SyntaxKind.EmptyStatement; }), OPTION_STATEMENTS);
            }
            else {
                switch (node.kind) {
                    case ts.SyntaxKind.NewExpression:
                        if (node.arguments === undefined) {
                            break;
                        }
                    // falls through
                    case ts.SyntaxKind.CallExpression:
                        if (_this.options.arguments) {
                            _this.checkAlignment(node.arguments, OPTION_ARGUMENTS);
                        }
                        break;
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.ArrowFunction:
                    case ts.SyntaxKind.CallSignature:
                    case ts.SyntaxKind.ConstructSignature:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.FunctionType:
                    case ts.SyntaxKind.ConstructorType:
                        if (_this.options.parameters) {
                            _this.checkAlignment(node.parameters, OPTION_PARAMETERS);
                        }
                        break;
                    case ts.SyntaxKind.ArrayLiteralExpression:
                    case ts.SyntaxKind.ArrayBindingPattern:
                        if (_this.options.elements) {
                            _this.checkAlignment(node.elements, OPTION_ELEMENTS);
                        }
                        break;
                    case ts.SyntaxKind.TupleType:
                        if (_this.options.elements) {
                            _this.checkAlignment(node.elementTypes, OPTION_ELEMENTS);
                        }
                        break;
                    case ts.SyntaxKind.ObjectLiteralExpression:
                        if (_this.options.members) {
                            _this.checkAlignment(node.properties, OPTION_MEMBERS);
                        }
                        break;
                    case ts.SyntaxKind.ObjectBindingPattern:
                        if (_this.options.members) {
                            _this.checkAlignment(node.elements, OPTION_MEMBERS);
                        }
                        break;
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.ClassExpression:
                        if (_this.options.members) {
                            _this.checkAlignment(node.members.filter(function (m) { return m.kind !== ts.SyntaxKind.SemicolonClassElement; }), OPTION_MEMBERS);
                        }
                        break;
                    case ts.SyntaxKind.InterfaceDeclaration:
                    case ts.SyntaxKind.TypeLiteral:
                        if (_this.options.members) {
                            _this.checkAlignment(node.members, OPTION_MEMBERS);
                        }
                }
            }
            return ts.forEachChild(node, cb);
        };
        return cb(sourceFile);
    };
    AlignWalker.prototype.checkAlignment = function (nodes, kind) {
        if (nodes.length <= 1) {
            return;
        }
        var sourceFile = this.sourceFile;
        var pos = getLineAndCharacterWithoutBom(sourceFile, this.getStart(nodes[0]));
        var alignToColumn = pos.character;
        var line = pos.line;
        // skip first node in list
        for (var i = 1; i < nodes.length; ++i) {
            var node = nodes[i];
            var start = this.getStart(node);
            pos = ts.getLineAndCharacterOfPosition(sourceFile, start);
            if (line !== pos.line && pos.character !== alignToColumn) {
                var diff = alignToColumn - pos.character;
                var fix = void 0;
                if (diff >= 0) {
                    fix = Lint.Replacement.appendText(start, " ".repeat(diff));
                }
                else if (node.pos <= start + diff && /^\s+$/.test(sourceFile.text.substring(start + diff, start))) {
                    // only delete text if there is only whitespace
                    fix = Lint.Replacement.deleteText(start + diff, -diff);
                }
                this.addFailure(start, Math.max(node.end, start), kind + Rule.FAILURE_STRING_SUFFIX, fix);
            }
            line = pos.line;
        }
    };
    AlignWalker.prototype.getStart = function (node) {
        return node.kind !== ts.SyntaxKind.OmittedExpression
            ? node.getStart(this.sourceFile)
            // find the comma token following the OmmitedExpression
            : tsutils_1.getNextToken(node, this.sourceFile).getStart(this.sourceFile);
    };
    return AlignWalker;
}(Lint.AbstractWalker));
function getLineAndCharacterWithoutBom(sourceFile, pos) {
    var result = ts.getLineAndCharacterOfPosition(sourceFile, pos);
    if (result.line === 0 && sourceFile.text[0] === "\uFEFF") {
        result.character -= 1;
    }
    return result;
}
var templateObject_1, templateObject_2;
