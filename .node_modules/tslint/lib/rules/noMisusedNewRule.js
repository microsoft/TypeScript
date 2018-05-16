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
        ruleName: "no-misused-new",
        description: "Warns on apparent attempts to define constructors for interfaces or `new` for classes.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Interfaces in TypeScript aren't meant to describe constructors on their implementations.\n            The `new` descriptor is primarily for describing JavaScript libraries.\n            If you're trying to describe a function known to be a class, it's typically better to `declare class`.\n        "], ["\n            Interfaces in TypeScript aren't meant to describe constructors on their implementations.\n            The \\`new\\` descriptor is primarily for describing JavaScript libraries.\n            If you're trying to describe a function known to be a class, it's typically better to \\`declare class\\`.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_INTERFACE = "Interfaces cannot be constructed, only classes. Did you mean `declare class`?";
    Rule.FAILURE_STRING_CLASS = '`new` in a class is a method named "new". Did you mean `constructor`?';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isMethodSignature(node)) {
            if (tsutils_1.getPropertyName(node.name) === "constructor") {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING_INTERFACE);
            }
        }
        else if (tsutils_1.isMethodDeclaration(node)) {
            if (node.body === undefined &&
                tsutils_1.getPropertyName(node.name) === "new" &&
                returnTypeMatchesParent(node.parent, node)) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING_CLASS);
            }
        }
        else if (tsutils_1.isConstructSignatureDeclaration(node)) {
            if (returnTypeMatchesParent(node.parent, node)) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING_INTERFACE);
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function returnTypeMatchesParent(parent, decl) {
    if (parent.name === undefined || decl.type === undefined || !tsutils_1.isTypeReferenceNode(decl.type)) {
        return false;
    }
    return decl.type.typeName.kind === ts.SyntaxKind.Identifier && decl.type.typeName.text === parent.name.text;
}
var templateObject_1;
