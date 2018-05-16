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
        ruleName: "no-duplicate-super",
        description: "Warns if 'super()' appears twice in a constructor.",
        rationale: "The second call to 'super()' will fail at runtime.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_DUPLICATE = "Multiple calls to 'super()' found. It must be called only once.";
    Rule.FAILURE_STRING_LOOP = "'super()' called in a loop. It must be called only once.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isConstructorDeclaration(node) && node.body !== undefined) {
            getSuperForNode(node.body);
        }
        return ts.forEachChild(node, cb);
    });
    function getSuperForNode(node) {
        if (tsutils_1.isIterationStatement(node)) {
            var bodySuper = combineSequentialChildren(node);
            if (typeof bodySuper === "number") {
                return 0 /* NoSuper */;
            }
            if (!bodySuper.break) {
                ctx.addFailureAtNode(bodySuper.node, Rule.FAILURE_STRING_LOOP);
            }
            return tslib_1.__assign({}, bodySuper, { break: false });
        }
        switch (node.kind) {
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.ThrowStatement:
                return 1 /* Return */;
            case ts.SyntaxKind.BreakStatement:
                return 2 /* Break */;
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                // 'super()' is bound differently inside, so ignore.
                return 0 /* NoSuper */;
            case ts.SyntaxKind.SuperKeyword:
                return node.parent.kind === ts.SyntaxKind.CallExpression && node.parent.expression === node
                    ? { node: node.parent, break: false }
                    : 0 /* NoSuper */;
            case ts.SyntaxKind.ConditionalExpression: {
                var _a = node, condition = _a.condition, whenTrue = _a.whenTrue, whenFalse = _a.whenFalse;
                var inCondition = getSuperForNode(condition);
                var inBranches = worse(getSuperForNode(whenTrue), getSuperForNode(whenFalse));
                if (typeof inCondition !== "number" && typeof inBranches !== "number") {
                    addDuplicateFailure(inCondition.node, inBranches.node);
                }
                return worse(inCondition, inBranches);
            }
            case ts.SyntaxKind.IfStatement: {
                var _b = node, thenStatement = _b.thenStatement, elseStatement = _b.elseStatement;
                return worse(getSuperForNode(thenStatement), elseStatement !== undefined ? getSuperForNode(elseStatement) : 0 /* NoSuper */);
            }
            case ts.SyntaxKind.SwitchStatement:
                return getSuperForSwitch(node);
            default:
                return combineSequentialChildren(node);
        }
    }
    function getSuperForSwitch(node) {
        // 'super()' from any clause. Used to track whether 'super()' happens in the switch at all.
        var foundSingle;
        // 'super()' from the previous clause if it did not 'break;'.
        var fallthroughSingle;
        for (var _i = 0, _a = node.caseBlock.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            var clauseSuper = combineSequentialChildren(clause);
            switch (clauseSuper) {
                case 0 /* NoSuper */:
                    break;
                case 2 /* Break */:
                    fallthroughSingle = undefined;
                    break;
                case 1 /* Return */:
                    return 0 /* NoSuper */;
                default:
                    if (fallthroughSingle !== undefined) {
                        addDuplicateFailure(fallthroughSingle, clauseSuper.node);
                    }
                    if (!clauseSuper.break) {
                        fallthroughSingle = clauseSuper.node;
                    }
                    foundSingle = clauseSuper.node;
            }
        }
        return foundSingle !== undefined ? { node: foundSingle, break: false } : 0 /* NoSuper */;
    }
    /**
     * Combines children that come one after another.
     * (As opposed to if/else, switch, or loops, which need their own handling.)
     */
    function combineSequentialChildren(node) {
        var seenSingle;
        var res = ts.forEachChild(node, function (child) {
            var childSuper = getSuperForNode(child);
            switch (childSuper) {
                case 0 /* NoSuper */:
                    return undefined;
                case 2 /* Break */:
                    if (seenSingle !== undefined) {
                        return tslib_1.__assign({}, seenSingle, { break: true });
                    }
                    return childSuper;
                case 1 /* Return */:
                    return childSuper;
                default:
                    if (seenSingle !== undefined && !seenSingle.break) {
                        addDuplicateFailure(seenSingle.node, childSuper.node);
                    }
                    seenSingle = childSuper;
                    return undefined;
            }
        });
        return res !== undefined ? res : seenSingle !== undefined ? seenSingle : 0 /* NoSuper */;
    }
    function addDuplicateFailure(a, b) {
        ctx.addFailure(a.getStart(), b.end, Rule.FAILURE_STRING_DUPLICATE);
    }
}
// If/else run separately, so return the branch more likely to result in eventual errors.
function worse(a, b) {
    return typeof a === "number"
        ? typeof b === "number" ? (a < b ? b : a) : b
        : typeof b === "number" ? a : a.break ? b : a;
}
