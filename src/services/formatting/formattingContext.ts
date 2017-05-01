/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
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

        constructor(public readonly sourceFile: SourceFileLike, public formattingRequestKind: FormattingRequestKind, public options: ts.FormatCodeSettings) {
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
                const startLine = this.sourceFile.getLineAndCharacterOfPosition(this.currentTokenSpan.pos).line;
                const endLine = this.sourceFile.getLineAndCharacterOfPosition(this.nextTokenSpan.pos).line;
                this.tokensAreOnSameLine = (startLine === endLine);
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
            const startLine = this.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.sourceFile)).line;
            const endLine = this.sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
            return startLine === endLine;
        }

        private BlockIsOnOneLine(node: Node): boolean {
            const openBrace = findChildOfKind(node, SyntaxKind.OpenBraceToken, this.sourceFile);
            const closeBrace = findChildOfKind(node, SyntaxKind.CloseBraceToken, this.sourceFile);
            if (openBrace && closeBrace) {
                const startLine = this.sourceFile.getLineAndCharacterOfPosition(openBrace.getEnd()).line;
                const endLine = this.sourceFile.getLineAndCharacterOfPosition(closeBrace.getStart(this.sourceFile)).line;
                return startLine === endLine;
            }
            return false;
        }
    }
}