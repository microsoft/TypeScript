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
        ruleName: "prefer-object-spread",
        description: "Enforces the use of the ES2015 object spread operator over `Object.assign()` where appropriate.",
        rationale: "Object spread allows for better type checking and inference.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        hasFix: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Use the object spread operator instead.";
    Rule.ASSIGNMENT_FAILURE_STRING = "'Object.assign' returns the first argument. Prefer object spread if you want a new object.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node) && node.arguments.length !== 0 &&
            tsutils_1.isPropertyAccessExpression(node.expression) && node.expression.name.text === "assign" &&
            tsutils_1.isIdentifier(node.expression.expression) && node.expression.expression.text === "Object" &&
            !ts.isFunctionLike(node.arguments[0]) &&
            // Object.assign(...someArray) cannot be written as object spread
            !node.arguments.some(tsutils_1.isSpreadElement) &&
            /**
             * @TODO
             * Remove !node.arguments.some(isThisKeyword) when typescript get's
             * support for spread types.
             * PR: https://github.com/Microsoft/TypeScript/issues/10727
             */
            !node.arguments.some(isThisKeyword)) {
            if (node.arguments[0].kind === ts.SyntaxKind.ObjectLiteralExpression) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING, createFix(node, ctx.sourceFile));
            }
            else if (tsutils_1.isExpressionValueUsed(node) && !tsutils_1.hasSideEffects(node.arguments[0], 2 /* Constructor */)) {
                ctx.addFailureAtNode(node, Rule.ASSIGNMENT_FAILURE_STRING, createFix(node, ctx.sourceFile));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function createFix(node, sourceFile) {
    var args = node.arguments;
    var objectNeedsParens = node.parent.kind === ts.SyntaxKind.ArrowFunction;
    var fix = [
        Lint.Replacement.replaceFromTo(node.getStart(sourceFile), args[0].getStart(sourceFile), (objectNeedsParens ? "(" : "") + "{"),
        new Lint.Replacement(node.end - 1, 1, "}" + (objectNeedsParens ? ")" : "")),
    ];
    for (var i = 0; i < args.length; ++i) {
        var arg = args[i];
        if (tsutils_1.isObjectLiteralExpression(arg)) {
            if (arg.properties.length === 0) {
                var end = arg.end;
                if (i !== args.length - 1) {
                    end = args[i + 1].getStart(sourceFile);
                }
                else if (args.hasTrailingComma) {
                    end = args.end;
                }
                // remove empty object iteral and the following comma if exists
                fix.push(Lint.Replacement.deleteFromTo(arg.getStart(sourceFile), end));
            }
            else {
                fix.push(
                // remove open brace
                Lint.Replacement.deleteText(arg.getStart(sourceFile), 1), 
                // remove trailing comma if exists and close brace
                Lint.Replacement.deleteFromTo(arg.properties[arg.properties.length - 1].end, arg.end));
            }
        }
        else {
            var parens = needsParens(arg);
            fix.push(Lint.Replacement.appendText(arg.getStart(sourceFile), parens ? "...(" : "..."));
            if (parens) {
                fix.push(Lint.Replacement.appendText(arg.end, ")"));
            }
        }
    }
    return fix;
}
function isThisKeyword(node) {
    return node.kind === ts.SyntaxKind.ThisKeyword;
}
function needsParens(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.BinaryExpression:
            return true;
        default:
            return false;
    }
}
