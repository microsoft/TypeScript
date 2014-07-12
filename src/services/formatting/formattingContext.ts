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

/// <reference path="formatting.ts"/>

module TypeScript.Services.Formatting {
    export class FormattingContext {
        public currentTokenSpan: TokenSpan = null;
        public nextTokenSpan: TokenSpan = null;
        public contextNode: IndentationNodeContext = null;
        public currentTokenParent: IndentationNodeContext = null;
        public nextTokenParent: IndentationNodeContext = null;

        private contextNodeAllOnSameLine: boolean = null;
        private nextNodeAllOnSameLine: boolean = null;
        private tokensAreOnSameLine: boolean = null;
        private contextNodeBlockIsOnOneLine: boolean = null;
        private nextNodeBlockIsOnOneLine: boolean = null;

        constructor(private snapshot: ITextSnapshot, public formattingRequestKind: FormattingRequestKind) {
            Debug.assert(this.snapshot != null, "snapshot is null");
        }

        public updateContext(currentTokenSpan: TokenSpan, currentTokenParent: IndentationNodeContext, nextTokenSpan: TokenSpan, nextTokenParent: IndentationNodeContext, commonParent: IndentationNodeContext) {
            Debug.assert(currentTokenSpan != null, "currentTokenSpan is null");
            Debug.assert(currentTokenParent != null, "currentTokenParent is null");
            Debug.assert(nextTokenSpan != null, "nextTokenSpan is null");
            Debug.assert(nextTokenParent != null, "nextTokenParent is null");
            Debug.assert(commonParent != null, "commonParent is null");

            this.currentTokenSpan = currentTokenSpan;
            this.currentTokenParent = currentTokenParent;
            this.nextTokenSpan = nextTokenSpan;
            this.nextTokenParent = nextTokenParent;
            this.contextNode = commonParent;

            this.contextNodeAllOnSameLine = null;
            this.nextNodeAllOnSameLine = null;
            this.tokensAreOnSameLine = null;
            this.contextNodeBlockIsOnOneLine = null;
            this.nextNodeBlockIsOnOneLine = null;
        }

        public ContextNodeAllOnSameLine(): boolean {
            if (this.contextNodeAllOnSameLine === null) {
                this.contextNodeAllOnSameLine = this.NodeIsOnOneLine(this.contextNode);
            }

            return this.contextNodeAllOnSameLine;
        }

        public NextNodeAllOnSameLine(): boolean {
            if (this.nextNodeAllOnSameLine === null) {
                this.nextNodeAllOnSameLine = this.NodeIsOnOneLine(this.nextTokenParent);
            }

            return this.nextNodeAllOnSameLine;
        }

        public TokensAreOnSameLine(): boolean {
            if (this.tokensAreOnSameLine === null) {
                var startLine = this.snapshot.getLineNumberFromPosition(this.currentTokenSpan.start());
                var endLine = this.snapshot.getLineNumberFromPosition(this.nextTokenSpan.start());

                this.tokensAreOnSameLine = (startLine == endLine);
            }

            return this.tokensAreOnSameLine;
        }

        public ContextNodeBlockIsOnOneLine() {
            if (this.contextNodeBlockIsOnOneLine === null) {
                this.contextNodeBlockIsOnOneLine = this.BlockIsOnOneLine(this.contextNode);
            }

            return this.contextNodeBlockIsOnOneLine;
        }

        public NextNodeBlockIsOnOneLine() {
            if (this.nextNodeBlockIsOnOneLine === null) {
                this.nextNodeBlockIsOnOneLine = this.BlockIsOnOneLine(this.nextTokenParent);
            }

            return this.nextNodeBlockIsOnOneLine;
        }

        public NodeIsOnOneLine(node: IndentationNodeContext): boolean {
            var startLine = this.snapshot.getLineNumberFromPosition(node.start());
            var endLine = this.snapshot.getLineNumberFromPosition(node.end());

            return startLine == endLine;
        }

        // Now we know we have a block (or a fake block represented by some other kind of node with an open and close brace as children).
        // IMPORTANT!!! This relies on the invariant that IsBlockContext must return true ONLY for nodes with open and close braces as immediate children
        public BlockIsOnOneLine(node: IndentationNodeContext): boolean {
            var start = node.fullStart();
            var block = <BlockSyntax> node.node();
            var openBracePosition = start + Syntax.childOffset(block, block.openBraceToken);
            var closeBracePosition = start + Syntax.childOffset(block, block.closeBraceToken);

            // Now check if they are on the same line
            var startLine = this.snapshot.getLineNumberFromPosition(openBracePosition);
            var endLine = this.snapshot.getLineNumberFromPosition(closeBracePosition);

            return startLine == endLine;
        }
    }
}