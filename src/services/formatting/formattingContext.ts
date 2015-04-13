/// <reference path="references.ts"/>

/* @internal */
module ts.formatting {
    export class FormattingContext {
        public currentTokenSpan: SpanWithKind;
        public nextTokenSpan: SpanWithKind;
        public contextNode: Node;
        public currentTokenParent: Node;
        public nextTokenParent: Node;

        private contextNodeAllOnSameLine: boolean;
        private nextNodeAllOnSameLine: boolean;
        private tokensAreOnSameLine: boolean;
        private contextNodeBlockIsOnOneLine: boolean;
        private nextNodeBlockIsOnOneLine: boolean;

        constructor(public sourceFile: SourceFile, public formattingRequestKind: FormattingRequestKind) {
        }

        public updateContext(currentSpan: SpanWithKind, currentTokenParent: Node, nextSpan: SpanWithKind, nextTokenParent: Node, commonParent: Node) {
            Debug.assert(currentSpan !== undefined, "currentTokenSpan is null");
            Debug.assert(currentTokenParent !== undefined, "currentTokenParent is null");
            Debug.assert(nextSpan !== undefined, "nextTokenSpan is null");
            Debug.assert(nextTokenParent !== undefined, "nextTokenParent is null");
            Debug.assert(commonParent !== undefined, "commonParent is null");

            this.currentTokenSpan = currentSpan;
            this.currentTokenParent = currentTokenParent;
            this.nextTokenSpan = nextSpan;
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
                let startLine = this.sourceFile.getLineAndCharacterOfPosition(this.currentTokenSpan.start).line;
                let endLine = this.sourceFile.getLineAndCharacterOfPosition(this.nextTokenSpan.start).line;
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
            let startLine = this.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.sourceFile)).line;
            let endLine = this.sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
            return startLine == endLine;
        }

        private BlockIsOnOneLine(node: Node): boolean {
            let openBrace = findChildOfKind(node, SyntaxKind.OpenBraceToken, this.sourceFile);
            let closeBrace = findChildOfKind(node, SyntaxKind.CloseBraceToken, this.sourceFile);
            if (openBrace && closeBrace) {
                let startLine = this.sourceFile.getLineAndCharacterOfPosition(openBrace.getEnd()).line;
                let endLine = this.sourceFile.getLineAndCharacterOfPosition(closeBrace.getStart(this.sourceFile)).line;
                return startLine === endLine;
            }
            return false;
        }
    }
}