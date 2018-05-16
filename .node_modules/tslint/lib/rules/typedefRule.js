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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_CALL_SIGNATURE = "call-signature";
var OPTION_ARROW_CALL_SIGNATURE = "arrow-call-signature";
var OPTION_PARAMETER = "parameter";
var OPTION_ARROW_PARAMETER = "arrow-parameter";
var OPTION_PROPERTY_DECLARATION = "property-declaration";
var OPTION_VARIABLE_DECLARATION = "variable-declaration";
var OPTION_MEMBER_VARIABLE_DECLARATION = "member-variable-declaration";
var OPTION_OBJECT_DESTRUCTURING = "object-destructuring";
var OPTION_ARRAY_DESTRUCTURING = "array-destructuring";
function parseOptions(ruleArguments) {
    var options = {};
    for (var _i = 0, ruleArguments_1 = ruleArguments; _i < ruleArguments_1.length; _i++) {
        var arg = ruleArguments_1[_i];
        options[arg] = true;
    }
    return options;
}
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new TypedefWalker(sourceFile, this.ruleName, parseOptions(this.ruleArguments)));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "typedef",
        description: "Requires type definitions to exist.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Several arguments may be optionally provided:\n\n            * `\"", "\"` checks return type of functions.\n            * `\"", "\"` checks return type of arrow functions.\n            * `\"", "\"` checks type specifier of function parameters for non-arrow functions.\n            * `\"", "\"` checks type specifier of function parameters for arrow functions.\n            * `\"", "\"` checks return types of interface properties.\n            * `\"", "\"` checks non-binding variable declarations.\n            * `\"", "\"` checks member variable declarations.\n            * `\"", "\"` checks object destructuring declarations.\n            * `\"", "\"` checks array destructuring declarations."], ["\n            Several arguments may be optionally provided:\n\n            * \\`\"", "\"\\` checks return type of functions.\n            * \\`\"", "\"\\` checks return type of arrow functions.\n            * \\`\"", "\"\\` checks type specifier of function parameters for non-arrow functions.\n            * \\`\"", "\"\\` checks type specifier of function parameters for arrow functions.\n            * \\`\"", "\"\\` checks return types of interface properties.\n            * \\`\"", "\"\\` checks non-binding variable declarations.\n            * \\`\"", "\"\\` checks member variable declarations.\n            * \\`\"", "\"\\` checks object destructuring declarations.\n            * \\`\"", "\"\\` checks array destructuring declarations."])), OPTION_CALL_SIGNATURE, OPTION_ARROW_CALL_SIGNATURE, OPTION_PARAMETER, OPTION_ARROW_PARAMETER, OPTION_PROPERTY_DECLARATION, OPTION_VARIABLE_DECLARATION, OPTION_MEMBER_VARIABLE_DECLARATION, OPTION_OBJECT_DESTRUCTURING, OPTION_ARRAY_DESTRUCTURING),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    OPTION_CALL_SIGNATURE,
                    OPTION_ARROW_CALL_SIGNATURE,
                    OPTION_PARAMETER,
                    OPTION_ARROW_PARAMETER,
                    OPTION_PROPERTY_DECLARATION,
                    OPTION_VARIABLE_DECLARATION,
                    OPTION_MEMBER_VARIABLE_DECLARATION,
                    OPTION_OBJECT_DESTRUCTURING,
                    OPTION_ARRAY_DESTRUCTURING,
                ],
            },
            minLength: 0,
            maxLength: 7,
        },
        optionExamples: [[true, OPTION_CALL_SIGNATURE, OPTION_PARAMETER, OPTION_MEMBER_VARIABLE_DECLARATION]],
        type: "typescript",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypedefWalker = /** @class */ (function (_super) {
    tslib_1.__extends(TypedefWalker, _super);
    function TypedefWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedefWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature: {
                    var _a = node, name = _a.name, parameters = _a.parameters, type = _a.type;
                    _this.checkTypeAnnotation("call-signature", name !== undefined ? name : parameters, type, name);
                    break;
                }
                case ts.SyntaxKind.ArrowFunction:
                    _this.checkArrowFunction(node);
                    break;
                case ts.SyntaxKind.Parameter:
                    _this.checkParameter(node);
                    break;
                case ts.SyntaxKind.PropertyDeclaration:
                    _this.checkPropertyDeclaration(node);
                    break;
                case ts.SyntaxKind.PropertySignature: {
                    var _b = node, name = _b.name, type = _b.type;
                    _this.checkTypeAnnotation("property-declaration", name, type, name);
                    break;
                }
                case ts.SyntaxKind.VariableDeclaration:
                    _this.checkVariableDeclaration(node);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    TypedefWalker.prototype.checkArrowFunction = function (_a) {
        var parent = _a.parent, parameters = _a.parameters, type = _a.type;
        if (parent.kind !== ts.SyntaxKind.CallExpression && !isTypedPropertyDeclaration(parent)) {
            this.checkTypeAnnotation("arrow-call-signature", parameters, type);
        }
    };
    TypedefWalker.prototype.checkParameter = function (_a) {
        var parent = _a.parent, name = _a.name, type = _a.type;
        var isArrowFunction = parent.kind === ts.SyntaxKind.ArrowFunction;
        var option = (function () {
            if (!isArrowFunction) {
                return "parameter";
            }
            else if (isTypedPropertyDeclaration(parent.parent)) {
                return undefined;
            }
            else if (utils.isPropertyDeclaration(parent.parent)) {
                return "member-variable-declaration";
            }
            else {
                return "arrow-parameter";
            }
        })();
        if (option !== undefined) {
            this.checkTypeAnnotation(option, name, type, name);
        }
    };
    TypedefWalker.prototype.checkPropertyDeclaration = function (_a) {
        var initializer = _a.initializer, name = _a.name, type = _a.type;
        // If this is an arrow function, it doesn't need to have a typedef on the property declaration
        // as the typedefs can be on the function's parameters instead
        if (initializer === undefined || initializer.kind !== ts.SyntaxKind.ArrowFunction) {
            this.checkTypeAnnotation("member-variable-declaration", name, type, name);
        }
    };
    TypedefWalker.prototype.checkVariableDeclaration = function (_a) {
        var parent = _a.parent, name = _a.name, type = _a.type;
        // variable declarations should always have a grandparent, but check that to be on the safe side.
        // catch statements will be the parent of the variable declaration
        // for-in/for-of loops will be the gradparent of the variable declaration
        if (parent.kind === ts.SyntaxKind.CatchClause
            || parent.parent.kind === ts.SyntaxKind.ForInStatement
            || parent.parent.kind === ts.SyntaxKind.ForOfStatement) {
            return;
        }
        var option = (function () {
            switch (name.kind) {
                case ts.SyntaxKind.ObjectBindingPattern:
                    return "object-destructuring";
                case ts.SyntaxKind.ArrayBindingPattern:
                    return "array-destructuring";
                default:
                    return "variable-declaration";
            }
        })();
        this.checkTypeAnnotation(option, name, type, name);
    };
    TypedefWalker.prototype.checkTypeAnnotation = function (option, location, typeAnnotation, name) {
        if (this.options[option] === true && typeAnnotation === undefined) {
            var failure = "expected " + option + (name === undefined ? "" : ": '" + name.getText() + "'") + " to have a typedef";
            if (isNodeArray(location)) {
                this.addFailure(location.pos - 1, location.end + 1, failure);
            }
            else {
                this.addFailureAtNode(location, failure);
            }
        }
    };
    return TypedefWalker;
}(Lint.AbstractWalker));
function isTypedPropertyDeclaration(node) {
    return utils.isPropertyDeclaration(node) && node.type !== undefined;
}
function isNodeArray(nodeOrArray) {
    return Array.isArray(nodeOrArray);
}
exports.isNodeArray = isNodeArray;
var templateObject_1;
