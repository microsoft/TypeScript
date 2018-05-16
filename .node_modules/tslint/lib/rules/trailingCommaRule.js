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
var defaultOptions = fillOptions("ignore");
function fillOptions(value) {
    return {
        arrays: value,
        exports: value,
        functions: value,
        imports: value,
        objects: value,
        typeLiterals: value,
    };
}
function normalizeOptions(options) {
    return { multiline: normalize(options.multiline), singleline: normalize(options.singleline), specCompliant: !!options.esSpecCompliant };
}
function normalize(value) {
    return typeof value === "string" ? fillOptions(value) : tslib_1.__assign({}, defaultOptions, value);
}
/* tslint:disable:object-literal-sort-keys */
var metadataOptionShape = {
    anyOf: [
        {
            type: "string",
            enum: ["always", "never"],
        },
        {
            type: "object",
            properties: fillOptions({
                type: "string",
                enum: ["always", "never", "ignore"],
            }),
        },
    ],
};
/* tslint:enable:object-literal-sort-keys */
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = normalizeOptions(this.ruleArguments[0]);
        return this.applyWithWalker(new TrailingCommaWalker(sourceFile, this.ruleName, options));
    };
    Rule.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.ruleArguments.length !== 0;
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "trailing-comma",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Requires or disallows trailing commas in array and object literals, destructuring assignments, function typings,\n            named imports and exports and function parameters."], ["\n            Requires or disallows trailing commas in array and object literals, destructuring assignments, function typings,\n            named imports and exports and function parameters."]))),
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            One argument which is an object with the keys `multiline` and `singleline`.\n            Both can be set to a string (`\"always\"` or `\"never\"`) or an object.\n\n            The object can contain any of the following keys: `\"arrays\"`, `\"objects\"`, `\"functions\"`,\n            `\"imports\"`, `\"exports\"`, and `\"typeLiterals\"`; each key can have one of the following\n            values: `\"always\"`, `\"never\"`, and `\"ignore\"`. Any missing keys will default to `\"ignore\"`.\n\n            * `\"multiline\"` checks multi-line object literals.\n            * `\"singleline\"` checks single-line object literals.\n\n            An array is considered \"multiline\" if its closing bracket is on a line\n            after the last array element. The same general logic is followed for\n            object literals, function typings, named import statements\n            and function parameters.\n\n            To align this rule with the ECMAScript specification that is implemented in modern JavaScript VMs,\n            there is a third option `esSpecCompliant`. Set this option to `true` to disallow trailing comma on\n            object and array rest and rest parameters.\n        "], ["\n            One argument which is an object with the keys \\`multiline\\` and \\`singleline\\`.\n            Both can be set to a string (\\`\"always\"\\` or \\`\"never\"\\`) or an object.\n\n            The object can contain any of the following keys: \\`\"arrays\"\\`, \\`\"objects\"\\`, \\`\"functions\"\\`,\n            \\`\"imports\"\\`, \\`\"exports\"\\`, and \\`\"typeLiterals\"\\`; each key can have one of the following\n            values: \\`\"always\"\\`, \\`\"never\"\\`, and \\`\"ignore\"\\`. Any missing keys will default to \\`\"ignore\"\\`.\n\n            * \\`\"multiline\"\\` checks multi-line object literals.\n            * \\`\"singleline\"\\` checks single-line object literals.\n\n            An array is considered \"multiline\" if its closing bracket is on a line\n            after the last array element. The same general logic is followed for\n            object literals, function typings, named import statements\n            and function parameters.\n\n            To align this rule with the ECMAScript specification that is implemented in modern JavaScript VMs,\n            there is a third option \\`esSpecCompliant\\`. Set this option to \\`true\\` to disallow trailing comma on\n            object and array rest and rest parameters.\n        "]))),
        options: {
            type: "object",
            properties: {
                multiline: metadataOptionShape,
                singleline: metadataOptionShape,
                esSpecCompliant: { type: "boolean" },
            },
            additionalProperties: false,
        },
        optionExamples: [
            [true, { multiline: "always", singleline: "never" }],
            [
                true,
                {
                    multiline: {
                        objects: "always",
                        arrays: "always",
                        functions: "never",
                        typeLiterals: "ignore",
                    },
                    esSpecCompliant: true,
                },
            ],
        ],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_NEVER = "Unnecessary trailing comma";
    Rule.FAILURE_STRING_FORBIDDEN = "Forbidden trailing comma";
    Rule.FAILURE_STRING_ALWAYS = "Missing trailing comma";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TrailingCommaWalker = /** @class */ (function (_super) {
    tslib_1.__extends(TrailingCommaWalker, _super);
    function TrailingCommaWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrailingCommaWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.ArrayLiteralExpression:
                    _this.checkList(node.elements, node.end, "arrays", isArrayRest);
                    break;
                case ts.SyntaxKind.ArrayBindingPattern:
                    _this.checkList(node.elements, node.end, "arrays", isDestructuringRest);
                    break;
                case ts.SyntaxKind.ObjectBindingPattern:
                    _this.checkList(node.elements, node.end, "objects", isDestructuringRest);
                    break;
                case ts.SyntaxKind.NamedImports:
                    _this.checkList(node.elements, node.end, "imports", noRest);
                    break;
                case ts.SyntaxKind.NamedExports:
                    _this.checkList(node.elements, node.end, "exports", noRest);
                    break;
                case ts.SyntaxKind.ObjectLiteralExpression:
                    _this.checkList(node.properties, node.end, "objects", isObjectRest);
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    _this.checkList(node.members, node.end, "objects", noRest);
                    break;
                case ts.SyntaxKind.NewExpression:
                    if (node.arguments === undefined) {
                        break;
                    }
                // falls through
                case ts.SyntaxKind.CallExpression:
                    _this.checkList(node.arguments, node.end, "functions", noRest);
                    break;
                case ts.SyntaxKind.ArrowFunction:
                    // don't check arrow functions without parens around the parameter
                    if (tsutils_1.getChildOfKind(node, ts.SyntaxKind.OpenParenToken, _this.sourceFile) === undefined) {
                        break;
                    }
                // falls through
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.ConstructSignature:
                case ts.SyntaxKind.ConstructorType:
                case ts.SyntaxKind.FunctionType:
                case ts.SyntaxKind.CallSignature:
                    _this.checkList(node.parameters, tsutils_1.getChildOfKind(node, ts.SyntaxKind.CloseParenToken, _this.sourceFile).end, "functions", isRestParameter);
                    break;
                case ts.SyntaxKind.TypeLiteral:
                    _this.checkTypeLiteral(node);
                    break;
                default:
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    TrailingCommaWalker.prototype.checkTypeLiteral = function (node) {
        var members = node.members;
        if (members.length === 0) {
            return;
        }
        var sourceText = this.sourceFile.text;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            // PropertySignature in TypeLiteral can end with semicolon or comma. If one ends with a semicolon don't check for trailing comma
            if (sourceText[member.end - 1] === ";") {
                return;
            }
        }
        // The trailing comma is part of the last member and therefore not present as hasTrailingComma on the NodeArray
        var hasTrailingComma = sourceText[members.end - 1] === ",";
        return this.checkComma(hasTrailingComma, members, node.end, "typeLiterals", noRest);
    };
    TrailingCommaWalker.prototype.checkList = function (list, closeElementPos, optionKey, isRest) {
        if (list.length === 0) {
            return;
        }
        return this.checkComma(list.hasTrailingComma, list, closeElementPos, optionKey, isRest);
    };
    /* Expects `list.length !== 0` */
    TrailingCommaWalker.prototype.checkComma = function (hasTrailingComma, list, closeTokenPos, optionKey, isRest) {
        var last = list[list.length - 1];
        if (this.options.specCompliant && isRest(last)) {
            if (hasTrailingComma) {
                this.addFailureAt(list.end - 1, 1, Rule.FAILURE_STRING_FORBIDDEN, Lint.Replacement.deleteText(list.end - 1, 1));
            }
            return;
        }
        var options = tsutils_1.isSameLine(this.sourceFile, last.end, closeTokenPos)
            ? this.options.singleline
            : this.options.multiline;
        var option = options[optionKey];
        if (option === "always" && !hasTrailingComma) {
            this.addFailureAt(list.end, 0, Rule.FAILURE_STRING_ALWAYS, Lint.Replacement.appendText(list.end, ","));
        }
        else if (option === "never" && hasTrailingComma) {
            this.addFailureAt(list.end - 1, 1, Rule.FAILURE_STRING_NEVER, Lint.Replacement.deleteText(list.end - 1, 1));
        }
    };
    return TrailingCommaWalker;
}(Lint.AbstractWalker));
function isRestParameter(node) {
    return node.dotDotDotToken !== undefined;
}
function isDestructuringRest(node) {
    return node.kind === ts.SyntaxKind.BindingElement && node.dotDotDotToken !== undefined;
}
function isObjectRest(node) {
    return node.kind === ts.SyntaxKind.SpreadAssignment && tsutils_1.isReassignmentTarget(node.expression);
}
function isArrayRest(node) {
    return node.kind === ts.SyntaxKind.SpreadElement && tsutils_1.isReassignmentTarget(node);
}
function noRest() {
    return false;
}
var templateObject_1, templateObject_2;
