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
var utils = require("tsutils");
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
        ruleName: "no-sparse-arrays",
        description: "Forbids array literals to contain missing elements.",
        rationale: "Missing elements are probably an accidentally duplicated comma.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Array has a missing element.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (!utils.isArrayLiteralExpression(node)) {
            if (utils.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                // Ignore LHS of assignments.
                traverseExpressionsInLHS(node.left, cb);
                return cb(node.right);
            }
            else {
                return ts.forEachChild(node, cb);
            }
        }
        for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (utils.isOmittedExpression(element)) {
                // Node has an empty range, so just use range starting at `element.pos`.
                ctx.addFailureAt(element.pos, 1, Rule.FAILURE_STRING);
            }
            else {
                ts.forEachChild(element, cb);
            }
        }
    });
}
/** Traverse the LHS of an `=` expression, calling `cb` embedded default value, but ignoring binding patterns. */
function traverseExpressionsInLHS(node, cb) {
    switch (node.kind) {
        case ts.SyntaxKind.ParenthesizedExpression:
            traverseExpressionsInLHS(node.expression, cb);
            break;
        case ts.SyntaxKind.ArrayLiteralExpression:
            for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
                var e = _a[_i];
                traverseExpressionsInLHS(e, cb);
            }
            break;
        case ts.SyntaxKind.ObjectLiteralExpression:
            for (var _b = 0, _c = node.properties; _b < _c.length; _b++) {
                var o = _c[_b];
                traverseExpressionsInLHS(o, cb);
            }
            break;
        case ts.SyntaxKind.BinaryExpression: {
            var _d = node, left = _d.left, operatorToken = _d.operatorToken, right = _d.right;
            if (operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                traverseExpressionsInLHS(left, cb);
                cb(right);
            }
        }
    }
}
