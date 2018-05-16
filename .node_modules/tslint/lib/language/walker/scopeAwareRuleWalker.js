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
var ts = require("typescript");
var utils_1 = require("../utils");
var ruleWalker_1 = require("./ruleWalker");
/**
 * @deprecated Prefer to manually maintain any contextual information.
 *
 * For example, imagine a `no-break` rule that warns on `break` in `for` but not in `switch`:
 *
 * function walk(ctx: Lint.WalkContext<void>): void {
 *     let isInFor = false;
 *     ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
 *         switch (node.kind) {
 *             case ts.SyntaxKind.Break:
 *                 if (isInFor) {
 *                     ctx.addFailureAtNode(node, "!");
 *                 }
 *                 break;
 *             case ts.SyntaxKind.ForStatement: {
 *                 const old = isInFor;
 *                 isInFor = true;
 *                 ts.forEachChild(node, cb);
 *                 isInFor = old;
 *                 break;
 *             }
 *             case ts.SyntaxKind.SwitchStatement: {
 *                 const old = isInFor;
 *                 isInFor = false;
 *                 ts.forEachChild(node, cb);
 *                 isInFor = old;
 *                 break;
 *             }
 *             default:
 *                 ts.forEachChild(node, cb);
 *         }
 *     });
 * }
 */
var ScopeAwareRuleWalker = /** @class */ (function (_super) {
    tslib_1.__extends(ScopeAwareRuleWalker, _super);
    function ScopeAwareRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        // initialize with global scope if file is not a module
        _this.scopeStack = ts.isExternalModule(sourceFile) ? [] : [_this.createScope(sourceFile)];
        return _this;
    }
    ScopeAwareRuleWalker.prototype.getCurrentScope = function () {
        return this.scopeStack[this.scopeStack.length - 1];
    };
    // get all scopes available at this depth
    ScopeAwareRuleWalker.prototype.getAllScopes = function () {
        return this.scopeStack;
    };
    ScopeAwareRuleWalker.prototype.getCurrentDepth = function () {
        return this.scopeStack.length;
    };
    // callback notifier when a scope begins
    ScopeAwareRuleWalker.prototype.onScopeStart = function () {
        return;
    };
    // callback notifier when a scope ends
    ScopeAwareRuleWalker.prototype.onScopeEnd = function () {
        return;
    };
    ScopeAwareRuleWalker.prototype.visitNode = function (node) {
        var isNewScope = this.isScopeBoundary(node);
        if (isNewScope) {
            this.scopeStack.push(this.createScope(node));
            this.onScopeStart();
        }
        _super.prototype.visitNode.call(this, node);
        if (isNewScope) {
            this.onScopeEnd();
            this.scopeStack.pop();
        }
    };
    ScopeAwareRuleWalker.prototype.isScopeBoundary = function (node) {
        return utils_1.isScopeBoundary(node); // tslint:disable-line:deprecation
    };
    return ScopeAwareRuleWalker;
}(ruleWalker_1.RuleWalker));
exports.ScopeAwareRuleWalker = ScopeAwareRuleWalker;
