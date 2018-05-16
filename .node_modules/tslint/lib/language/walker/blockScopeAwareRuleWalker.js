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
var scopeAwareRuleWalker_1 = require("./scopeAwareRuleWalker");
// tslint:disable:deprecation (extends deprecated class and uses deprecated utils - doesn't matter because it's deprecated, too)
/**
 * @deprecated See comment on ScopeAwareRuleWalker.
 *
 * An AST walker that is aware of block scopes in addition to regular scopes. Block scopes
 * are a superset of regular scopes (new block scopes are created more frequently in a program).
 */
var BlockScopeAwareRuleWalker = /** @class */ (function (_super) {
    tslib_1.__extends(BlockScopeAwareRuleWalker, _super);
    function BlockScopeAwareRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        // initialize with global scope if file is not a module
        _this.blockScopeStack = ts.isExternalModule(sourceFile) ? [] : [_this.createBlockScope(sourceFile)];
        return _this;
    }
    // get all block scopes available at this depth
    BlockScopeAwareRuleWalker.prototype.getAllBlockScopes = function () {
        return this.blockScopeStack;
    };
    BlockScopeAwareRuleWalker.prototype.getCurrentBlockScope = function () {
        return this.blockScopeStack[this.blockScopeStack.length - 1];
    };
    BlockScopeAwareRuleWalker.prototype.getCurrentBlockDepth = function () {
        return this.blockScopeStack.length;
    };
    // callback notifier when a block scope begins
    BlockScopeAwareRuleWalker.prototype.onBlockScopeStart = function () {
        return;
    };
    // callback notifier when a block scope ends
    BlockScopeAwareRuleWalker.prototype.onBlockScopeEnd = function () {
        return;
    };
    BlockScopeAwareRuleWalker.prototype.findBlockScope = function (predicate) {
        // look through block scopes from local -> global
        for (var i = this.blockScopeStack.length - 1; i >= 0; i--) {
            if (predicate(this.blockScopeStack[i])) {
                return this.blockScopeStack[i];
            }
        }
        return undefined;
    };
    BlockScopeAwareRuleWalker.prototype.visitNode = function (node) {
        var isNewBlockScope = this.isBlockScopeBoundary(node);
        if (isNewBlockScope) {
            this.blockScopeStack.push(this.createBlockScope(node));
            this.onBlockScopeStart();
        }
        _super.prototype.visitNode.call(this, node);
        if (isNewBlockScope) {
            this.onBlockScopeEnd();
            this.blockScopeStack.pop();
        }
    };
    BlockScopeAwareRuleWalker.prototype.isBlockScopeBoundary = function (node) {
        return utils_1.isBlockScopeBoundary(node);
    };
    return BlockScopeAwareRuleWalker;
}(scopeAwareRuleWalker_1.ScopeAwareRuleWalker));
exports.BlockScopeAwareRuleWalker = BlockScopeAwareRuleWalker;
