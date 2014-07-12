//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='formatting.ts' />

module TypeScript.Services.Formatting {
    export class IndentationNodeContext {
        private _node: SyntaxNode;
        private _parent: IndentationNodeContext;
        private _fullStart: number;
        private _indentationAmount: number;
        private _childIndentationAmountDelta: number;
        private _depth: number;
        private _hasSkippedOrMissingTokenChild: boolean;

        constructor(parent: IndentationNodeContext, node: SyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number) {
            this.update(parent, node, fullStart, indentationAmount, childIndentationAmountDelta);
        }

        public parent(): IndentationNodeContext {
            return this._parent;
        }

        public node(): SyntaxNode {
            return this._node;
        }

        public fullStart(): number {
            return this._fullStart;
        }

        public fullWidth(): number {
            return this._node.fullWidth();
        }

        public start(): number {
            return this._fullStart + this._node.leadingTriviaWidth();
        }

        public end(): number {
            return this._fullStart + this._node.leadingTriviaWidth() + this._node.width();
        }

        public indentationAmount(): number {
            return this._indentationAmount;
        }

        public childIndentationAmountDelta(): number {
            return this._childIndentationAmountDelta;
        }

        public depth(): number {
            return this._depth;
        }

        public kind(): SyntaxKind {
            return this._node.kind();
        }

        public hasSkippedOrMissingTokenChild(): boolean {
            if (this._hasSkippedOrMissingTokenChild === null) {
                this._hasSkippedOrMissingTokenChild = Syntax.nodeHasSkippedOrMissingTokens(this._node);
            }
            return this._hasSkippedOrMissingTokenChild;
        }

        public clone(pool: IndentationNodeContextPool): IndentationNodeContext {
            var parent: IndentationNodeContext = null;
            if (this._parent) {
                parent = this._parent.clone(pool);
            }
            return pool.getNode(parent, this._node, this._fullStart, this._indentationAmount, this._childIndentationAmountDelta);
        }

        public update(parent: IndentationNodeContext, node: SyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number) {
            this._parent = parent;
            this._node = node;
            this._fullStart = fullStart;
            this._indentationAmount = indentationAmount;
            this._childIndentationAmountDelta = childIndentationAmountDelta;
            this._hasSkippedOrMissingTokenChild = null;

            if (parent) {
                this._depth = parent.depth() + 1;
            }
            else {
                this._depth = 0;
            }
        }
    }
}