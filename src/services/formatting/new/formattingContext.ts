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

module ts.formatting {
    export class FormattingContext {
        public currentTokenSpan: TextRangeWithKind = null;
        public nextTokenSpan: TextRangeWithKind = null;
        public contextNode: Node = null;
        public currentTokenParent: Node = null;
        public nextTokenParent: Node = null;

        private contextNodeAllOnSameLine: boolean = null;
        private nextNodeAllOnSameLine: boolean = null;
        private tokensAreOnSameLine: boolean = null;
        private contextNodeBlockIsOnOneLine: boolean = null;
        private nextNodeBlockIsOnOneLine: boolean = null;

        constructor(private sourceFile: SourceFile, public formattingRequestKind: FormattingRequestKind) {
        }

        public updateContext(currentRange: TextRangeWithKind, currentTokenParent: Node, nextRange: TextRangeWithKind, nextTokenParent: Node, commonParent: Node) {
            Debug.assert(currentRange != null, "currentTokenSpan is null");
            Debug.assert(currentTokenParent != null, "currentTokenParent is null");
            Debug.assert(nextRange != null, "nextTokenSpan is null");
            Debug.assert(nextTokenParent != null, "nextTokenParent is null");
            Debug.assert(commonParent != null, "commonParent is null");

            this.currentTokenSpan = currentRange;
            this.currentTokenParent = currentTokenParent;
            this.nextTokenSpan = nextRange;
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

                //var startLine = this.snapshot.getLineNumberFromPosition(this.currentTokenSpan.token.pos);
                //var endLine = this.snapshot.getLineNumberFromPosition(this.nextTokenSpan.token.pos);

                var startLine = this.sourceFile.getLineAndCharacterFromPosition(this.currentTokenSpan.pos).line;
                var endLine = this.sourceFile.getLineAndCharacterFromPosition(this.nextTokenSpan.pos).line;
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

        public NodeIsOnOneLine(node: Node): boolean {
            return;

            var startLine = this.sourceFile.getLineAndCharacterFromPosition(node.getStart(this.sourceFile)).line;
            var endLine = this.sourceFile.getLineAndCharacterFromPosition(node.getEnd()).line;
            //var startLine = this.snapshot.getLineNumberFromPosition(node.start());
            //var endLine = this.snapshot.getLineNumberFromPosition(node.end());

            return startLine == endLine;
        }

        // Now we know we have a block (or a fake block represented by some other kind of node with an open and close brace as children).
        // IMPORTANT!!! This relies on the invariant that IsBlockContext must return true ONLY for nodes with open and close braces as immediate children
        public BlockIsOnOneLine(node: Node): boolean {
            var openBrace = findChildOfKind(node, SyntaxKind.OpenBraceToken, this.sourceFile);
            var closeBrace = findChildOfKind(node, SyntaxKind.CloseBraceToken, this.sourceFile);
            if (openBrace && closeBrace) {
                var startLine = this.sourceFile.getLineAndCharacterFromPosition(openBrace.getEnd()).line;
                var endLine = this.sourceFile.getLineAndCharacterFromPosition(closeBrace.getStart(this.sourceFile)).line;
                return startLine === endLine;
            }

            //var block = <BlockSyntax>node.node();

            //// Now check if they are on the same line
            //return this.snapshot.getLineNumberFromPosition(end(block.openBraceToken)) === 
            //       this.snapshot.getLineNumberFromPosition(start(block.closeBraceToken));
        }
    }
}