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
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-empty-interface",
        description: "Forbids empty interfaces.",
        rationale: "An empty interface is equivalent to its supertype (or `{}`).",
        optionsDescription: "Not configurable.",
        options: null,
        type: "typescript",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "An empty interface is equivalent to `{}`.";
    Rule.FAILURE_STRING_FOR_EXTENDS = "An interface declaring no members is equivalent to its supertype.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isInterfaceDeclaration(node) &&
            node.members.length === 0 &&
            (node.heritageClauses === undefined || extendsOneTypeWithoutTypeArguments(node.heritageClauses[0]))) {
            return ctx.addFailureAtNode(node.name, node.heritageClauses !== undefined ? Rule.FAILURE_STRING_FOR_EXTENDS : Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
function extendsOneTypeWithoutTypeArguments(_a) {
    var types = _a.types;
    switch (types.length) {
        case 0:
            return true; // don't crash on empty extends list
        case 1:
            return types[0].typeArguments === undefined; // allow interfaces that provide type arguments for the extended type
        default:
            return false; // allow interfaces extending more than one types
    }
}
