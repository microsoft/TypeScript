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
var Lint = require("..");
var OPTION_NEVER = "never";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, this.ruleArguments.indexOf(OPTION_NEVER) === -1
            ? enforceShorthandWalker
            : disallowShorthandWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "object-literal-shorthand",
        description: "Enforces/disallows use of ES6 object literal shorthand.",
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        If the 'never' option is provided, any shorthand object literal syntax will cause a failure."], ["\n        If the \\'never\\' option is provided, any shorthand object literal syntax will cause a failure."]))),
        options: {
            type: "string",
            enum: [OPTION_NEVER],
        },
        optionExamples: [true, [true, OPTION_NEVER]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.LONGHAND_PROPERTY = "Expected property shorthand in object literal ";
    Rule.LONGHAND_METHOD = "Expected method shorthand in object literal ";
    Rule.SHORTHAND_ASSIGNMENT = "Shorthand property assignments have been disallowed.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function disallowShorthandWalker(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isShorthandPropertyAssignment(node)) {
            ctx.addFailureAtNode(node.name, Rule.SHORTHAND_ASSIGNMENT, Lint.Replacement.appendText(node.getStart(ctx.sourceFile), node.name.text + ": "));
        }
        else if (tsutils_1.isMethodDeclaration(node) && node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            ctx.addFailureAtNode(node.name, Rule.SHORTHAND_ASSIGNMENT, fixShorthandMethodDeclaration(node, ctx.sourceFile));
        }
        return ts.forEachChild(node, cb);
    });
}
function enforceShorthandWalker(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isPropertyAssignment(node)) {
            if (node.name.kind === ts.SyntaxKind.Identifier &&
                tsutils_1.isIdentifier(node.initializer) &&
                node.name.text === node.initializer.text) {
                ctx.addFailureAtNode(node, Rule.LONGHAND_PROPERTY + "('{" + node.name.text + "}').", Lint.Replacement.deleteFromTo(node.name.end, node.end));
            }
            else if (tsutils_1.isFunctionExpression(node.initializer) &&
                // allow named function expressions
                node.initializer.name === undefined) {
                var _a = handleLonghandMethod(node.name, node.initializer, ctx.sourceFile), name = _a[0], fix = _a[1];
                ctx.addFailure(node.getStart(ctx.sourceFile), tsutils_1.getChildOfKind(node.initializer, ts.SyntaxKind.OpenParenToken, ctx.sourceFile).pos, Rule.LONGHAND_METHOD + "('{" + name + "() {...}}').", fix);
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function fixShorthandMethodDeclaration(node, sourceFile) {
    var isGenerator = node.asteriskToken !== undefined;
    var isAsync = tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.AsyncKeyword);
    return Lint.Replacement.replaceFromTo(node.getStart(sourceFile), node.name.end, node.name.getText(sourceFile) + ":" + (isAsync ? " async" : "") + " function" + (isGenerator ? "*" : ""));
}
function handleLonghandMethod(name, initializer, sourceFile) {
    var nameStart = name.getStart(sourceFile);
    var fix = Lint.Replacement.deleteFromTo(name.end, tsutils_1.getChildOfKind(initializer, ts.SyntaxKind.OpenParenToken).pos);
    var prefix = "";
    if (initializer.asteriskToken !== undefined) {
        prefix = "*";
    }
    if (tsutils_1.hasModifier(initializer.modifiers, ts.SyntaxKind.AsyncKeyword)) {
        prefix = "async " + prefix;
    }
    if (prefix !== "") {
        fix = [fix, Lint.Replacement.appendText(nameStart, prefix)];
    }
    return [prefix + sourceFile.text.substring(nameStart, name.end), fix];
}
var templateObject_1;
