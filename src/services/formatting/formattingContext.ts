/* @internal */
namespace ts.formatting {
export const enum FormattingRequestKind {
    FormatDocument,
    FormatSelection,
    FormatOnEnter,
    FormatOnSemicolon,
    FormatOnOpeningCurlyBrace,
    FormatOnClosingCurlyBrace
}

export class FormattingContext {
    public currentTokenSpan!: ts.formatting.TextRangeWithKind;
    public nextTokenSpan!: ts.formatting.TextRangeWithKind;
    public contextNode!: ts.Node;
    public currentTokenParent!: ts.Node;
    public nextTokenParent!: ts.Node;

    private contextNodeAllOnSameLine: boolean | undefined;
    private nextNodeAllOnSameLine: boolean | undefined;
    private tokensAreOnSameLine: boolean | undefined;
    private contextNodeBlockIsOnOneLine: boolean | undefined;
    private nextNodeBlockIsOnOneLine: boolean | undefined;

    constructor(public readonly sourceFile: ts.SourceFileLike, public formattingRequestKind: FormattingRequestKind, public options: ts.FormatCodeSettings) {
    }

    public updateContext(currentRange: ts.formatting.TextRangeWithKind, currentTokenParent: ts.Node, nextRange: ts.formatting.TextRangeWithKind, nextTokenParent: ts.Node, commonParent: ts.Node) {
        this.currentTokenSpan = ts.Debug.checkDefined(currentRange);
        this.currentTokenParent = ts.Debug.checkDefined(currentTokenParent);
        this.nextTokenSpan = ts.Debug.checkDefined(nextRange);
        this.nextTokenParent = ts.Debug.checkDefined(nextTokenParent);
        this.contextNode = ts.Debug.checkDefined(commonParent);

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

    private NodeIsOnOneLine(node: ts.Node): boolean {
        const startLine = this.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.sourceFile)).line;
        const endLine = this.sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
        return startLine === endLine;
    }

    private BlockIsOnOneLine(node: ts.Node): boolean {
        const openBrace = ts.findChildOfKind(node, ts.SyntaxKind.OpenBraceToken, this.sourceFile);
        const closeBrace = ts.findChildOfKind(node, ts.SyntaxKind.CloseBraceToken, this.sourceFile);
        if (openBrace && closeBrace) {
            const startLine = this.sourceFile.getLineAndCharacterOfPosition(openBrace.getEnd()).line;
            const endLine = this.sourceFile.getLineAndCharacterOfPosition(closeBrace.getStart(this.sourceFile)).line;
            return startLine === endLine;
        }
        return false;
    }
}
}
