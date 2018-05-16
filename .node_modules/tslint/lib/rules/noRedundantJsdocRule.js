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
    Rule.FAILURE_STRING_REDUNDANT_TAG = function (tagName) {
        return "JSDoc tag '@" + tagName + "' is redundant in TypeScript code.";
    };
    Rule.FAILURE_STRING_NO_COMMENT = function (tagName) {
        return "'@" + tagName + "' is redundant in TypeScript code if it has no description.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-redundant-jsdoc",
        description: "Forbids JSDoc which duplicates TypeScript functionality.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "style",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_REDUNDANT_TYPE = "Type annotation in JSDoc is redundant in TypeScript code.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    // Intentionally exclude EndOfFileToken: it can have JSDoc, but it is only relevant in JavaScript files
    return sourceFile.statements.forEach(function cb(node) {
        if (tsutils_1.canHaveJsDoc(node)) {
            for (var _i = 0, _a = tsutils_1.getJsDoc(node, sourceFile); _i < _a.length; _i++) {
                var tags = _a[_i].tags;
                if (tags !== undefined) {
                    for (var _b = 0, tags_1 = tags; _b < tags_1.length; _b++) {
                        var tag = tags_1[_b];
                        checkTag(tag);
                    }
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
    function checkTag(tag) {
        switch (tag.kind) {
            case ts.SyntaxKind.JSDocTag:
                if (redundantTags.has(tag.tagName.text)) {
                    ctx.addFailureAtNode(tag.tagName, Rule.FAILURE_STRING_REDUNDANT_TAG(tag.tagName.text));
                }
                break;
            case ts.SyntaxKind.JSDocAugmentsTag:
                // OK
                break;
            case ts.SyntaxKind.JSDocClassTag:
            case ts.SyntaxKind.JSDocTypeTag:
            case ts.SyntaxKind.JSDocTypedefTag:
            case ts.SyntaxKind.JSDocPropertyTag:
                // Always redundant
                ctx.addFailureAtNode(tag.tagName, Rule.FAILURE_STRING_REDUNDANT_TAG(tag.tagName.text));
                break;
            case ts.SyntaxKind.JSDocTemplateTag:
                if (tag.comment === undefined || tag.comment === "") {
                    ctx.addFailureAtNode(tag.tagName, Rule.FAILURE_STRING_NO_COMMENT(tag.tagName.text));
                }
                break;
            case ts.SyntaxKind.JSDocReturnTag:
            case ts.SyntaxKind.JSDocParameterTag: {
                var _a = tag, typeExpression = _a.typeExpression, comment = _a.comment;
                if (typeExpression !== undefined) {
                    ctx.addFailureAtNode(typeExpression, Rule.FAILURE_STRING_REDUNDANT_TYPE);
                }
                if (comment === undefined || comment === "") {
                    // Redundant if no documentation
                    ctx.addFailureAtNode(tag.tagName, Rule.FAILURE_STRING_NO_COMMENT(tag.tagName.text));
                }
                break;
            }
            default:
                throw new Error("Unexpected tag kind: " + ts.SyntaxKind[tag.kind]);
        }
    }
}
var redundantTags = new Set([
    "abstract",
    "access",
    "class",
    "constant",
    "constructs",
    "default",
    "enum",
    "exports",
    "function",
    "global",
    "implements",
    "interface",
    "instance",
    "member",
    "memberof",
    "mixes",
    "mixin",
    "module",
    "name",
    "namespace",
    "override",
    "private",
    "property",
    "protected",
    "public",
    "readonly",
    "requires",
    "static",
    "this",
]);
