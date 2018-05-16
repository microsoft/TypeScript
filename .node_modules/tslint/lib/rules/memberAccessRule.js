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
var error_1 = require("../error");
var Lint = require("../index");
var OPTION_NO_PUBLIC = "no-public";
var OPTION_CHECK_ACCESSOR = "check-accessor";
var OPTION_CHECK_CONSTRUCTOR = "check-constructor";
var OPTION_CHECK_PARAMETER_PROPERTY = "check-parameter-property";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING_FACTORY = function (memberType, memberName) {
        memberName = memberName === undefined ? "" : " '" + memberName + "'";
        return "The " + memberType + memberName + " must be marked either 'private', 'public', or 'protected'";
    };
    Rule.prototype.apply = function (sourceFile) {
        var options = this.ruleArguments;
        var noPublic = options.indexOf(OPTION_NO_PUBLIC) !== -1;
        var checkAccessor = options.indexOf(OPTION_CHECK_ACCESSOR) !== -1;
        var checkConstructor = options.indexOf(OPTION_CHECK_CONSTRUCTOR) !== -1;
        var checkParameterProperty = options.indexOf(OPTION_CHECK_PARAMETER_PROPERTY) !== -1;
        if (noPublic) {
            if (checkAccessor || checkConstructor || checkParameterProperty) {
                error_1.showWarningOnce("Warning: " + this.ruleName + " - If 'no-public' is present, it should be the only option.");
                return [];
            }
            checkAccessor = checkConstructor = checkParameterProperty = true;
        }
        return this.applyWithFunction(sourceFile, walk, {
            checkAccessor: checkAccessor,
            checkConstructor: checkConstructor,
            checkParameterProperty: checkParameterProperty,
            noPublic: noPublic,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "member-access",
        description: "Requires explicit visibility declarations for class members.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Explicit visibility declarations can make code more readable and accessible for those new to TS.\n\n            Other languages such as C# default to `private`, unlike TypeScript's default of `public`.\n            Members lacking a visibility declaration may be an indication of an accidental leak of class internals.\n        "], ["\n            Explicit visibility declarations can make code more readable and accessible for those new to TS.\n\n            Other languages such as C# default to \\`private\\`, unlike TypeScript's default of \\`public\\`.\n            Members lacking a visibility declaration may be an indication of an accidental leak of class internals.\n        "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            These arguments may be optionally provided:\n\n            * `\"no-public\"` forbids public accessibility to be specified, because this is the default.\n            * `\"check-accessor\"` enforces explicit visibility on get/set accessors\n            * `\"check-constructor\"`  enforces explicit visibility on constructors\n            * `\"check-parameter-property\"`  enforces explicit visibility on parameter properties"], ["\n            These arguments may be optionally provided:\n\n            * \\`\"no-public\"\\` forbids public accessibility to be specified, because this is the default.\n            * \\`\"check-accessor\"\\` enforces explicit visibility on get/set accessors\n            * \\`\"check-constructor\"\\`  enforces explicit visibility on constructors\n            * \\`\"check-parameter-property\"\\`  enforces explicit visibility on parameter properties"]))),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_NO_PUBLIC, OPTION_CHECK_ACCESSOR, OPTION_CHECK_CONSTRUCTOR, OPTION_CHECK_PARAMETER_PROPERTY],
            },
            minLength: 0,
            maxLength: 4,
        },
        optionExamples: [true, [true, OPTION_NO_PUBLIC], [true, OPTION_CHECK_ACCESSOR]],
        type: "typescript",
        typescriptOnly: true,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_NO_PUBLIC = "'public' is implicit.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var _a = ctx.options, noPublic = _a.noPublic, checkAccessor = _a.checkAccessor, checkConstructor = _a.checkConstructor, checkParameterProperty = _a.checkParameterProperty;
    return ts.forEachChild(ctx.sourceFile, function recur(node) {
        if (tsutils_1.isClassLikeDeclaration(node)) {
            for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                var child = _a[_i];
                if (shouldCheck(child)) {
                    check(child);
                }
                if (checkParameterProperty && tsutils_1.isConstructorDeclaration(child) && child.body !== undefined) {
                    for (var _b = 0, _c = child.parameters; _b < _c.length; _b++) {
                        var param = _c[_b];
                        if (tsutils_1.isParameterProperty(param)) {
                            check(param);
                        }
                    }
                }
            }
        }
        return ts.forEachChild(node, recur);
    });
    function shouldCheck(node) {
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
                return checkConstructor;
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return checkAccessor;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
                return true;
            default:
                return false;
        }
    }
    function check(node) {
        if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PrivateKeyword)) {
            return;
        }
        var publicKeyword = tsutils_1.getModifier(node, ts.SyntaxKind.PublicKeyword);
        if (noPublic && publicKeyword !== undefined) {
            // public is not optional for parameter property without the readonly modifier
            if (node.kind !== ts.SyntaxKind.Parameter || tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword)) {
                var start = publicKeyword.end - "public".length;
                ctx.addFailure(start, publicKeyword.end, Rule.FAILURE_STRING_NO_PUBLIC, Lint.Replacement.deleteFromTo(start, tsutils_1.getNextToken(publicKeyword, ctx.sourceFile).getStart(ctx.sourceFile)));
            }
        }
        if (!noPublic && publicKeyword === undefined) {
            var nameNode = node.kind === ts.SyntaxKind.Constructor
                ? tsutils_1.getChildOfKind(node, ts.SyntaxKind.ConstructorKeyword, ctx.sourceFile)
                : node.name !== undefined ? node.name : node;
            var memberName = node.name !== undefined && node.name.kind === ts.SyntaxKind.Identifier ? node.name.text : undefined;
            ctx.addFailureAtNode(nameNode, Rule.FAILURE_STRING_FACTORY(typeToString(node), memberName), Lint.Replacement.appendText(getInsertionPosition(node, ctx.sourceFile), "public "));
        }
    }
}
function getInsertionPosition(member, sourceFile) {
    var node = member.decorators === undefined ? member : tsutils_1.getTokenAtPosition(member, member.decorators.end, sourceFile);
    return node.getStart(sourceFile);
}
function typeToString(node) {
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
            return "class method";
        case ts.SyntaxKind.PropertyDeclaration:
            return "class property";
        case ts.SyntaxKind.Constructor:
            return "class constructor";
        case ts.SyntaxKind.GetAccessor:
            return "get property accessor";
        case ts.SyntaxKind.SetAccessor:
            return "set property accessor";
        case ts.SyntaxKind.Parameter:
            return "parameter property";
        default:
            throw new Error("unhandled node type " + ts.SyntaxKind[node.kind]);
    }
}
var templateObject_1, templateObject_2;
