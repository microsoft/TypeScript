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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (type, sigSuggestion) {
        return type + " has only a call signature \u2014 use `" + sigSuggestion + "` instead.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "callable-types",
        description: "An interface or literal type with just a call signature can be written as a function type.",
        rationale: "style",
        optionsDescription: "Not configurable.",
        options: null,
        type: "style",
        typescriptOnly: true,
        hasFix: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if ((tsutils_1.isInterfaceDeclaration(node) && noSupertype(node) || tsutils_1.isTypeLiteralNode(node))
            && node.members.length === 1) {
            var member = node.members[0];
            if (tsutils_1.isCallSignatureDeclaration(member) &&
                // avoid bad parse
                member.type !== undefined) {
                var suggestion = renderSuggestion(member, node, ctx.sourceFile);
                var fixStart = node.kind === ts.SyntaxKind.TypeLiteral
                    ? node.getStart(ctx.sourceFile)
                    : tsutils_1.getChildOfKind(node, ts.SyntaxKind.InterfaceKeyword).getStart(ctx.sourceFile);
                ctx.addFailureAtNode(member, Rule.FAILURE_STRING_FACTORY(node.kind === ts.SyntaxKind.TypeLiteral ? "Type literal" : "Interface", suggestion), Lint.Replacement.replaceFromTo(fixStart, node.end, suggestion));
            }
        }
        return ts.forEachChild(node, cb);
    });
}
/** True if there is no supertype or if the supertype is `Function`. */
function noSupertype(node) {
    if (node.heritageClauses === undefined) {
        return true;
    }
    if (node.heritageClauses.length !== 1) {
        return false;
    }
    var expr = node.heritageClauses[0].types[0].expression;
    return tsutils_1.isIdentifier(expr) && expr.text === "Function";
}
function renderSuggestion(call, parent, sourceFile) {
    var start = call.getStart(sourceFile);
    var colonPos = call.type.pos - 1 - start;
    var text = sourceFile.text.substring(start, call.end);
    var suggestion = text.substr(0, colonPos) + " =>" + text.substr(colonPos + 1);
    if (shouldWrapSuggestion(parent.parent)) {
        suggestion = "(" + suggestion + ")";
    }
    if (parent.kind === ts.SyntaxKind.InterfaceDeclaration) {
        if (parent.typeParameters !== undefined) {
            return "type" + sourceFile.text.substring(parent.name.pos, parent.typeParameters.end + 1) + " = " + suggestion;
        }
        else {
            return "type " + parent.name.text + " = " + suggestion;
        }
    }
    return suggestion.endsWith(";") ? suggestion.slice(0, -1) : suggestion;
}
function shouldWrapSuggestion(parent) {
    switch (parent.kind) {
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.IntersectionType:
        case ts.SyntaxKind.ArrayType:
            return true;
        default:
            return false;
    }
}
