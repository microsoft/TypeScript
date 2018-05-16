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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var utils_1 = require("../language/utils");
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
        ruleName: "prefer-for-of",
        description: "Recommends a 'for-of' loop over a standard 'for' loop if the index is only used to access the array being iterated.",
        rationale: "A for(... of ...) loop is easier to implement and read when the index is not needed.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Expected a 'for-of' loop instead of a 'for' loop with this simple iteration";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    var variables;
    return ts.forEachChild(sourceFile, function cb(node) {
        if (utils.isForStatement(node)) {
            visitForStatement(node);
        }
        return ts.forEachChild(node, cb);
    });
    function visitForStatement(node) {
        var arrayNodeInfo = getForLoopHeaderInfo(node);
        if (arrayNodeInfo === undefined) {
            return;
        }
        var indexVariable = arrayNodeInfo.indexVariable, arrayExpr = arrayNodeInfo.arrayExpr;
        if (variables === undefined) {
            variables = utils.collectVariableUsage(sourceFile);
        }
        for (var _i = 0, _a = variables.get(indexVariable).uses; _i < _a.length; _i++) {
            var location = _a[_i].location;
            if (location.pos < node.initializer.end || location.pos >= node.end || // bail out on use outside of for loop
                location.pos >= node.statement.pos && // only check uses in loop body
                    isNonSimpleIncrementorUse(location, arrayExpr, sourceFile)) {
                return;
            }
        }
        ctx.addFailure(node.getStart(sourceFile), node.statement.pos, Rule.FAILURE_STRING);
    }
}
function isNonSimpleIncrementorUse(node, arrayExpr, sourceFile) {
    // check if iterator is used for something other than reading data from array
    var parent = node.parent;
    return !utils.isElementAccessExpression(parent)
        // `a[i] = ...` or similar
        || utils.isReassignmentTarget(parent)
        // `b[i]`
        || !nodeEquals(arrayExpr, utils_1.unwrapParentheses(parent.expression), sourceFile);
}
function nodeEquals(a, b, sourceFile) {
    return a.getText(sourceFile) === b.getText(sourceFile);
}
// returns the iterator and array of a `for` loop if the `for` loop is basic.
function getForLoopHeaderInfo(forLoop) {
    var initializer = forLoop.initializer, condition = forLoop.condition, incrementor = forLoop.incrementor;
    if (initializer === undefined || condition === undefined || incrementor === undefined) {
        return undefined;
    }
    // Must start with `var i = 0;` or `let i = 0;`
    if (!utils.isVariableDeclarationList(initializer) || initializer.declarations.length !== 1) {
        return undefined;
    }
    var _a = initializer.declarations[0], indexVariable = _a.name, indexInit = _a.initializer;
    if (indexVariable.kind !== ts.SyntaxKind.Identifier || indexInit === undefined || !isNumber(indexInit, "0")) {
        return undefined;
    }
    // Must end with `i++`
    if (!isIncremented(incrementor, indexVariable.text)) {
        return undefined;
    }
    // Condition must be `i < arr.length;`
    if (!utils.isBinaryExpression(condition)) {
        return undefined;
    }
    var left = condition.left, operatorToken = condition.operatorToken, right = condition.right;
    if (!isIdentifierNamed(left, indexVariable.text) ||
        operatorToken.kind !== ts.SyntaxKind.LessThanToken ||
        !utils.isPropertyAccessExpression(right)) {
        return undefined;
    }
    var arrayExpr = right.expression, name = right.name;
    if (name.text !== "length") {
        return undefined;
    }
    return { indexVariable: indexVariable, arrayExpr: arrayExpr };
}
function isIncremented(node, indexVariableName) {
    switch (node.kind) {
        case ts.SyntaxKind.PrefixUnaryExpression:
        case ts.SyntaxKind.PostfixUnaryExpression: {
            var _a = node, operator = _a.operator, operand = _a.operand;
            // `++x` or `x++`
            return operator === ts.SyntaxKind.PlusPlusToken && isVar(operand);
        }
        case ts.SyntaxKind.BinaryExpression:
            var _b = node, operatorToken = _b.operatorToken, updatedVar = _b.left, rhs = _b.right;
            if (!isVar(updatedVar)) {
                return false;
            }
            switch (operatorToken.kind) {
                case ts.SyntaxKind.PlusEqualsToken:
                    // x += 1
                    return isOne(rhs);
                case ts.SyntaxKind.EqualsToken: {
                    if (!utils.isBinaryExpression(rhs)) {
                        return false;
                    }
                    var rhsOp = rhs.operatorToken, left = rhs.left, right = rhs.right;
                    // `x = 1 + x` or `x = x + 1`
                    return rhsOp.kind === ts.SyntaxKind.PlusToken && (isVar(left) && isOne(right) || isOne(left) && isVar(right));
                }
                default:
                    return false;
            }
        default:
            return false;
    }
    function isVar(id) {
        return isIdentifierNamed(id, indexVariableName);
    }
}
function isIdentifierNamed(node, text) {
    return utils.isIdentifier(node) && node.text === text;
}
function isOne(node) {
    return isNumber(node, "1");
}
function isNumber(node, value) {
    return utils.isNumericLiteral(node) && node.text === value;
}
