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

/// <reference path="references.ts"/>

module ts.formatting {
    export class FormattingContext {
        public currentTokenSpan: TextRangeWithKind;
        public nextTokenSpan: TextRangeWithKind;
        public contextNode: Node;
        public currentTokenParent: Node;
        public nextTokenParent: Node;

        private contextNodeAllOnSameLine: boolean;
        private nextNodeAllOnSameLine: boolean;
        private tokensAreOnSameLine: boolean;
        private contextNodeBlockIsOnOneLine: boolean;
        private nextNodeBlockIsOnOneLine: boolean;

        constructor(private sourceFile: SourceFile, public formattingRequestKind: FormattingRequestKind) {
        }

        public updateContext(currentRange: TextRangeWithKind, currentTokenParent: Node, nextRange: TextRangeWithKind, nextTokenParent: Node, commonParent: Node) {
            Debug.assert(currentRange !== undefined, "currentTokenSpan is null");
            Debug.assert(currentTokenParent !== undefined, "currentTokenParent is null");
            Debug.assert(nextRange !== undefined, "nextTokenSpan is null");
            Debug.assert(nextTokenParent !== undefined, "nextTokenParent is null");
            Debug.assert(commonParent !== undefined, "commonParent is null");

            this.currentTokenSpan = currentRange;
            this.currentTokenParent = currentTokenParent;
            this.nextTokenSpan = nextRange;
            this.nextTokenParent = nextTokenParent;
            this.contextNode = commonParent;

            // drop cached results
            this.contextNodeAllOnSameLine = undefined;
            this.nextNodeAllOnSameLine = undefined;
            this.tokensAreOnSameLine = undefined;
            this.contextNodeBlockIsOnOneLine = undefined;
            this.nextNodeBlockIsOnOneLine = undefined;
        }

        public ContextNodeAllOnSameLine(): boolean {
            if (this.contextNodeAllOnSameLine === undefined) {
                this.contextNodeAllOnSameLine = this.NodeIsOnOneLine(this.contextNode);
            }

            return this.contextNodeAllOnSameLine;
        }

        public NextNodeAllOnSameLine(): boolean {
            if (this.nextNodeAllOnSameLine === undefined) {
                this.nextNodeAllOnSameLine = this.NodeIsOnOneLine(this.nextTokenParent);
            }

            return this.nextNodeAllOnSameLine;
        }

        public TokensAreOnSameLine(): boolean {
            if (this.tokensAreOnSameLine === undefined) {
                var startLine = this.sourceFile.getLineAndCharacterFromPosition(this.currentTokenSpan.pos).line;
                var endLine = this.sourceFile.getLineAndCharacterFromPosition(this.nextTokenSpan.pos).line;
                this.tokensAreOnSameLine = (startLine == endLine);
            }

            return this.tokensAreOnSameLine;
        }

        public ContextNodeBlockIsOnOneLine() {
            if (this.contextNodeBlockIsOnOneLine === undefined) {
                this.contextNodeBlockIsOnOneLine = this.BlockIsOnOneLine(this.contextNode);
            }

            return this.contextNodeBlockIsOnOneLine;
        }

        public NextNodeBlockIsOnOneLine() {
            if (this.nextNodeBlockIsOnOneLine === undefined) {
                this.nextNodeBlockIsOnOneLine = this.BlockIsOnOneLine(this.nextTokenParent);
            }

            return this.nextNodeBlockIsOnOneLine;
        }

        private NodeIsOnOneLine(node: Node): boolean {
            var startLine = this.sourceFile.getLineAndCharacterFromPosition(node.getStart(this.sourceFile)).line;
            var endLine = this.sourceFile.getLineAndCharacterFromPosition(node.getEnd()).line;
            return startLine == endLine;
        }

        private BlockIsOnOneLine(node: Node): boolean {
            var openBrace = findChildOfKind(node, SyntaxKind.OpenBraceToken, this.sourceFile);
            var closeBrace = findChildOfKind(node, SyntaxKind.CloseBraceToken, this.sourceFile);
            if (openBrace && closeBrace) {
                var startLine = this.sourceFile.getLineAndCharacterFromPosition(openBrace.getEnd()).line;
                var endLine = this.sourceFile.getLineAndCharacterFromPosition(closeBrace.getStart(this.sourceFile)).line;
                return startLine === endLine;
            }
            return false;
        }
    }
}