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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (name) {
        return "All '" + name + "' signatures should be adjacent";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "adjacent-overload-signatures",
        description: "Enforces function overloads to be consecutive.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: "Improves readability and organization by grouping naturally related items together.",
        type: "typescript",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    visitStatements(sourceFile.statements);
    return ts.forEachChild(sourceFile, function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ModuleBlock:
                visitStatements(node.statements);
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.TypeLiteral: {
                var members = node.members;
                addFailures(getMisplacedOverloads(members, function (member) {
                    return utils.isSignatureDeclaration(member) ? getOverloadKey(member) : undefined;
                }));
            }
        }
        return ts.forEachChild(node, cb);
    });
    function visitStatements(statements) {
        addFailures(getMisplacedOverloads(statements, function (statement) {
            return utils.isFunctionDeclaration(statement) && statement.name !== undefined ? statement.name.text : undefined;
        }));
    }
    function addFailures(misplacedOverloads) {
        for (var _i = 0, misplacedOverloads_1 = misplacedOverloads; _i < misplacedOverloads_1.length; _i++) {
            var node = misplacedOverloads_1[_i];
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING(printOverload(node)));
        }
    }
}
/** 'getOverloadName' may return undefined for nodes that cannot be overloads, e.g. a `const` declaration. */
function getMisplacedOverloads(overloads, getKey) {
    var result = [];
    var lastKey;
    var seen = new Set();
    for (var _i = 0, overloads_1 = overloads; _i < overloads_1.length; _i++) {
        var node = overloads_1[_i];
        if (node.kind === ts.SyntaxKind.SemicolonClassElement) {
            continue;
        }
        var key = getKey(node);
        if (key !== undefined) {
            if (seen.has(key) && lastKey !== key) {
                result.push(node);
            }
            seen.add(key);
            lastKey = key;
        }
        else {
            lastKey = undefined;
        }
    }
    return result;
}
function printOverload(node) {
    var info = getOverloadInfo(node);
    return typeof info === "string" ? info : info === undefined ? "<unknown>" : info.name;
}
function getOverloadKey(node) {
    var info = getOverloadInfo(node);
    if (info === undefined) {
        return undefined;
    }
    var _a = typeof info === "string" ? [false, info] : [info.computed, info.name], computed = _a[0], name = _a[1];
    var isStatic = utils.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword);
    return (computed ? "0" : "1") + (isStatic ? "0" : "1") + name;
}
exports.getOverloadKey = getOverloadKey;
function getOverloadInfo(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.Constructor:
            return "constructor";
        case ts.SyntaxKind.CallSignature:
            return "()";
        default: {
            var name = node.name;
            if (name === undefined) {
                return undefined;
            }
            switch (name.kind) {
                case ts.SyntaxKind.Identifier:
                    return name.text;
                case ts.SyntaxKind.ComputedPropertyName:
                    var expression = name.expression;
                    return utils.isLiteralExpression(expression) ? expression.text : { name: expression.getText(), computed: true };
                default:
                    return utils.isLiteralExpression(name) ? name.text : undefined;
            }
        }
    }
}
