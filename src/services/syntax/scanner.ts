///<reference path='references.ts' />

module TypeScript.Scanner {
    // Make sure we can encode a token's kind in 7 bits.
    Debug.assert(SyntaxKind.LastToken <= 127);

    // Fixed width tokens (keywords and punctuation) that have no trivia generally make up 30% of
    // all the tokens in a program.  We heavily optimize for that case with a token instance that
    // just needs a parent pointer and a single 30bit int like so:
    //
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0xxx xxxx    <-- kind
    // 0000 0000 0000 0000 0000 0000 0000 0000 00xx xxxx xxxx xxxx xxxx xxxx x000 0000    <-- full start
    // ^                                         ^                                   ^
    // |                                         |                                   |
    // Bit 64                                    Bit 30                              Bit 1
    //
    // This gives us 23 bits for the start of the token.  We don't need to store the width as it
    // can be inferred from the 'kind' for a fixed width token.
    // 
    // For small tokens, we encode the data in one 30bit int like so:
    //
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0xxx xxxx    <-- kind
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 xxxx x000 0000    <-- full width
    // 0000 0000 0000 0000 0000 0000 0000 0000 00xx xxxx xxxx xxxx xxxx 0000 0000 0000    <-- full start
    // ^                                         ^                                   ^
    // |                                         |                                   |
    // Bit 64                                    Bit 30                              Bit 1
    //
    // This allows for 5bits for teh width.  i.e. tokens up to 31 chars in width.  And 18 bits for
    // the full start.  This allows for tokens starting up to and including position 262,143.
    //
    // In practice, for codebases we have measured, these values are sufficient to cover ~85% of 
    // all tokens.  If a token won't fit within those limits, we make a large token for it.
    //
    //
    // For large tokens, we encode data with two 30 bit ints like so:
    //
    //   _packedFullStartAndInfo:
    //
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 000x    <-- has leading trivia
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 00x0    <-- has leading comment (implies has leading trivia)
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0x00    <-- has trailing trivia
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 x000    <-- has trailing comment (implies has trailing trivia)
    // 0000 0000 0000 0000 0000 0000 0000 0000 00xx xxxx xxxx xxxx xxxx xxxx xxxx 0000    <-- full start
    // ^                                         ^                                   ^
    // |                                         |                                   |
    // Bit 64                                    Bit 30                              Bit 1
    //
    // This gives us 26 bits for the start of the token.  At 64MB That's more than enough for
    // any codebase.
    //
    //   _packedFullWidthAndKind:
    //
    // 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0xxx xxxx    <-- kind
    // 0000 0000 0000 0000 0000 0000 0000 0000 00xx xxxx xxxx xxxx xxxx xxxx x000 0000    <-- full width
    // ^                                         ^                                   ^
    // |                                         |                                   |
    // Bit 64                                    Bit 30                              Bit 1
    //
    // This gives us 23bit for width (or 8MB of width which should be enough for any codebase).

    enum ScannerConstants {
        LargeTokenFullStartShift           = 4,
        LargeTokenFullWidthShift           = 7,
        LargeTokenLeadingTriviaBitMask     = 0x01, // 00000001
        LargeTokenLeadingCommentBitMask    = 0x02, // 00000010
        LargeTokenTrailingTriviaBitMask    = 0x04, // 00000100
        LargeTokenTrailingCommentBitMask   = 0x08, // 00001000
        LargeTokenTriviaBitMask            = 0x0F, // 00001111

        FixedWidthTokenFullStartShift      = 7,
        FixedWidthTokenMaxFullStart        = 0x7FFFFF, // 23 ones.

        SmallTokenFullWidthShift           = 7,
        SmallTokenFullStartShift           = 12,
        SmallTokenMaxFullStart             = 0x3FFFF,  // 18 ones.
        SmallTokenMaxFullWidth             = 0x1F,     // 5 ones
        SmallTokenFullWidthMask            = 0x1F, // 00011111

        KindMask                           = 0x7F, // 01111111
        IsVariableWidthMask                = 0x80, // 10000000
    }

    // Make sure our math works for packing/unpacking large fullStarts.
    Debug.assert(largeTokenUnpackFullStart(largeTokenPackFullStartAndInfo(1 << 26, 3)) === (1 << 26));
    Debug.assert(largeTokenUnpackFullStart(largeTokenPackFullStartAndInfo(3 << 25, 1)) === (3 << 25));
    Debug.assert(largeTokenUnpackFullStart(largeTokenPackFullStartAndInfo(10 << 23, 2)) === (10 << 23));

    function fixedWidthTokenPackData(fullStart: number, kind: SyntaxKind) {
        return (fullStart << ScannerConstants.FixedWidthTokenFullStartShift) | kind;
    }

    function fixedWidthTokenUnpackFullStart(packedData: number) {
        return packedData >> ScannerConstants.FixedWidthTokenFullStartShift;
    }

    function smallTokenPackData(fullStart: number, fullWidth: number, kind: SyntaxKind) {
        return (fullStart << ScannerConstants.SmallTokenFullStartShift) |
            (fullWidth << ScannerConstants.SmallTokenFullWidthShift) |
            kind;
    }

    function smallTokenUnpackFullWidth(packedData: number): SyntaxKind {
        return (packedData >> ScannerConstants.SmallTokenFullWidthShift) & ScannerConstants.SmallTokenFullWidthMask;
    }

    function smallTokenUnpackFullStart(packedData: number): number {
        return packedData >> ScannerConstants.SmallTokenFullStartShift;
    }

    function largeTokenPackFullStartAndInfo(fullStart: number, triviaInfo: number): number {
        return (fullStart << ScannerConstants.LargeTokenFullStartShift) | triviaInfo;
    }

    function largeTokenUnpackFullWidth(packedFullWidthAndKind: number) {
        return packedFullWidthAndKind >> ScannerConstants.LargeTokenFullWidthShift;
    }

    function largeTokenUnpackFullStart(packedFullStartAndInfo: number): number {
        return packedFullStartAndInfo >> ScannerConstants.LargeTokenFullStartShift;
    }

    function largeTokenUnpackHasLeadingTrivia(packed: number): boolean {
        return (packed & ScannerConstants.LargeTokenLeadingTriviaBitMask) !== 0;
    }

    function largeTokenUnpackHasTrailingTrivia(packed: number): boolean {
        return (packed & ScannerConstants.LargeTokenTrailingTriviaBitMask) !== 0;
    }

    function largeTokenUnpackHasLeadingComment(packed: number): boolean {
        return (packed & ScannerConstants.LargeTokenLeadingCommentBitMask) !== 0;
    }

    function largeTokenUnpackHasTrailingComment(packed: number): boolean {
        return (packed & ScannerConstants.LargeTokenTrailingCommentBitMask) !== 0;
    }

    function largeTokenUnpackTriviaInfo(packed: number): number {
        return packed & ScannerConstants.LargeTokenTriviaBitMask;
    }

    var isKeywordStartCharacter: number[] = ArrayUtilities.createArray<number>(CharacterCodes.maxAsciiCharacter, 0);
    var isIdentifierStartCharacter: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);
    var isIdentifierPartCharacter: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);

    for (var character = 0; character < CharacterCodes.maxAsciiCharacter; character++) {
        if ((character >= CharacterCodes.a && character <= CharacterCodes.z) ||
            (character >= CharacterCodes.A && character <= CharacterCodes.Z) ||
            character === CharacterCodes._ || character === CharacterCodes.$) {

            isIdentifierStartCharacter[character] = true;
            isIdentifierPartCharacter[character] = true;
        }
        else if (character >= CharacterCodes._0 && character <= CharacterCodes._9) {
            isIdentifierPartCharacter[character] = true;
        }
    }

    for (var keywordKind = SyntaxKind.FirstKeyword; keywordKind <= SyntaxKind.LastKeyword; keywordKind++) {
        var keyword = SyntaxFacts.getText(keywordKind);
        isKeywordStartCharacter[keyword.charCodeAt(0)] = 1;
    }

    export function isContextualToken(token: ISyntaxToken): boolean {
        // These tokens are contextually created based on parsing decisions.  We can't reuse 
        // them in incremental scenarios as we may be in a context where the parser would not
        // create them.
        switch (token.kind()) {
            // Created by the parser when it sees / or /= in a location where it needs an expression.
            case SyntaxKind.RegularExpressionLiteral:

            // Created by the parser when it sees > in a binary expression operator context.
            case SyntaxKind.GreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                return true;

            default:
                return token.isKeywordConvertedToIdentifier();
        }
    }

    var lastTokenInfo = { leadingTriviaWidth: -1, width: -1 };
    var lastTokenInfoTokenID: number = -1;

    var triviaScanner = createScannerInternal(ts.ScriptTarget.Latest, SimpleText.fromString(""), () => { });

    interface IScannerToken extends ISyntaxToken {
    }

    function fillSizeInfo(token: IScannerToken, text: ISimpleText): void {
        if (lastTokenInfoTokenID !== syntaxID(token)) {
            triviaScanner.fillTokenInfo(token, text, lastTokenInfo);
            lastTokenInfoTokenID = syntaxID(token);
        }
    }

    function fullText(token: IScannerToken, text: ISimpleText): string {
        return text.substr(token.fullStart(), token.fullWidth());
    }

    function leadingTrivia(token: IScannerToken, text: ISimpleText): ISyntaxTriviaList {
        if (!token.hasLeadingTrivia()) {
            return Syntax.emptyTriviaList;
        }

        return triviaScanner.scanTrivia(token, text, /*isTrailing:*/ false);
    }

    function trailingTrivia(token: IScannerToken, text: ISimpleText): ISyntaxTriviaList {
        if (!token.hasTrailingTrivia()) {
            return Syntax.emptyTriviaList;
        }

        return triviaScanner.scanTrivia(token, text, /*isTrailing:*/ true);
    }

    function leadingTriviaWidth(token: IScannerToken, text: ISimpleText): number {
        if (!token.hasLeadingTrivia()) {
            return 0;
        }

        fillSizeInfo(token, text);
        return lastTokenInfo.leadingTriviaWidth;
    }

    function trailingTriviaWidth(token: IScannerToken, text: ISimpleText): number {
        if (!token.hasTrailingTrivia()) {
            return 0;
        }

        fillSizeInfo(token, text);
        return token.fullWidth() - lastTokenInfo.leadingTriviaWidth - lastTokenInfo.width;
    }

    function tokenIsIncrementallyUnusable(token: IScannerToken): boolean {
        // No scanner tokens make their *containing node* incrementally unusable.  
        // Note: several scanner tokens may themselves be unusable.  i.e. if the parser asks
        // for a full node, then that ndoe can be returned even if it contains parser generated
        // tokens (like regexs and merged operator tokens). However, if the parser asks for a
        // for a token, then those contextual tokens will not be reusable.
        return false;
    }

    class FixedWidthTokenWithNoTrivia implements ISyntaxToken {
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _typeBrand: any;

        constructor(private _packedData: number) {
        }

        public setFullStart(fullStart: number): void {
            this._packedData = fixedWidthTokenPackData(fullStart, this.kind());
        }

        public childCount() { return 0 }
        public childAt(index: number): ISyntaxElement { throw Errors.invalidOperation() }
        public accept(visitor: ISyntaxVisitor): any { return visitor.visitToken(this) }

        public isIncrementallyUnusable(): boolean { return false; }
        public isKeywordConvertedToIdentifier(): boolean { return false; }
        public hasSkippedToken(): boolean { return false; }
        public fullText(): string { return SyntaxFacts.getText(this.kind()); }
        public text(): string { return this.fullText(); }
        public leadingTrivia(): ISyntaxTriviaList { return Syntax.emptyTriviaList; }
        public trailingTrivia(): ISyntaxTriviaList { return Syntax.emptyTriviaList; }
        public leadingTriviaWidth(): number { return 0; }
        public trailingTriviaWidth(): number { return 0; }

        public kind(): SyntaxKind { return this._packedData & ScannerConstants.KindMask; }
        public fullWidth(): number { return this.fullText().length; }
        public fullStart(): number { return fixedWidthTokenUnpackFullStart(this._packedData); }
        public hasLeadingTrivia(): boolean { return false; }
        public hasTrailingTrivia(): boolean { return false; }
        public hasLeadingComment(): boolean { return false; }
        public hasTrailingComment(): boolean { return false; }
        public clone(): ISyntaxToken { return new FixedWidthTokenWithNoTrivia(this._packedData); }
    }

    class LargeScannerToken implements ISyntaxToken {
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _typeBrand: any;

        private cachedText: string;
        constructor(private _packedFullStartAndInfo: number, private _packedFullWidthAndKind: number, cachedText: string) {
            if (cachedText !== undefined) {
                this.cachedText = cachedText;
            }
        }

        public setFullStart(fullStart: number): void {
            this._packedFullStartAndInfo = largeTokenPackFullStartAndInfo(fullStart,
                largeTokenUnpackTriviaInfo(this._packedFullStartAndInfo));
        }

        public childCount() { return 0 }
        public childAt(index: number): ISyntaxElement { throw Errors.invalidOperation() }
        public accept(visitor: ISyntaxVisitor): any { return visitor.visitToken(this) }

        private syntaxTreeText(text: ISimpleText) {
            var result = text || syntaxTree(this).text;
            Debug.assert(result);
            return result;
        }

        public isIncrementallyUnusable(): boolean { return tokenIsIncrementallyUnusable(this); }
        public isKeywordConvertedToIdentifier(): boolean { return false; }
        public hasSkippedToken(): boolean { return false; }

        public fullText(text?: ISimpleText): string {
            return fullText(this, this.syntaxTreeText(text));
        }

        public text(): string {
            var cachedText = this.cachedText;
            return cachedText !== undefined ? cachedText : SyntaxFacts.getText(this.kind());
        }

        public leadingTrivia(text?: ISimpleText): ISyntaxTriviaList { return leadingTrivia(this, this.syntaxTreeText(text)); }
        public trailingTrivia(text?: ISimpleText): ISyntaxTriviaList { return trailingTrivia(this, this.syntaxTreeText(text)); }

        public leadingTriviaWidth(text?: ISimpleText): number {
            return leadingTriviaWidth(this, this.syntaxTreeText(text));
        }

        public trailingTriviaWidth(text?: ISimpleText): number {
            return trailingTriviaWidth(this, this.syntaxTreeText(text));
        }

        public kind(): SyntaxKind { return this._packedFullWidthAndKind & ScannerConstants.KindMask; }
        public fullWidth(): number { return largeTokenUnpackFullWidth(this._packedFullWidthAndKind); }
        public fullStart(): number { return largeTokenUnpackFullStart(this._packedFullStartAndInfo); }
        public hasLeadingTrivia(): boolean { return largeTokenUnpackHasLeadingTrivia(this._packedFullStartAndInfo); }
        public hasTrailingTrivia(): boolean { return largeTokenUnpackHasTrailingTrivia(this._packedFullStartAndInfo); }
        public hasLeadingComment(): boolean { return largeTokenUnpackHasLeadingComment(this._packedFullStartAndInfo); }
        public hasTrailingComment(): boolean { return largeTokenUnpackHasTrailingComment(this._packedFullStartAndInfo); }
        public clone(): ISyntaxToken { return new LargeScannerToken(this._packedFullStartAndInfo, this._packedFullWidthAndKind, this.cachedText); }
    }

    export interface DiagnosticCallback {
        (position: number, width: number, key: string, arguments: any[]): void;
    }

    interface TokenInfo {
        leadingTriviaWidth: number;
        width: number;
    }

    interface IScannerInternal extends IScanner {
        fillTokenInfo(token: IScannerToken, text: ISimpleText, tokenInfo: TokenInfo): void;
        scanTrivia(token: IScannerToken, text: ISimpleText, isTrailing: boolean): ISyntaxTriviaList;
    }

    export interface IScanner {
        setIndex(index: number): void;
        scan(allowContextualToken: boolean): ISyntaxToken;
    }

    export function createScanner(languageVersion: ts.ScriptTarget, text: ISimpleText, reportDiagnostic: DiagnosticCallback): IScanner {
        var scanner = createScannerInternal(languageVersion, text, reportDiagnostic);
        return {
            setIndex: scanner.setIndex,
            scan: scanner.scan,
        };
    }

    function createScannerInternal(languageVersion: ts.ScriptTarget, text: ISimpleText, reportDiagnostic: DiagnosticCallback): IScannerInternal {
        var str: string;
        var index: number;
        var start: number;
        var end: number;

        function setIndex(_index: number) {
            index = _index;
        }

        function reset(_text: ISimpleText, _start: number, _end: number) {
            Debug.assert(_start <= _text.length(), "Token's start was not within the bounds of text: " + _start + " - [0, " + _text.length() + ")");
            Debug.assert(_end <= _text.length(), "Token's end was not within the bounds of text: " + _end + " - [0, " + _text.length() + ")");

            if (!str || text !== _text) {
                text = _text;
                str = _text.substr(0, _text.length());
            }

            start = _start;
            end = _end;
            index = _start;
        }

        function scan(allowContextualToken: boolean): ISyntaxToken {
            var fullStart = index;
            var leadingTriviaInfo = scanTriviaInfo(/*isTrailing: */ false);

            var start = index;
            var kindAndIsVariableWidth = scanSyntaxKind(allowContextualToken);

            var end = index;
            var trailingTriviaInfo = scanTriviaInfo(/*isTrailing: */true);

            var fullWidth = index - fullStart;

            // If we have no trivia, and we are a fixed width token kind, and our size isn't too 
            // large, and we're a real fixed width token (and not something like "\u0076ar").
            var kind = kindAndIsVariableWidth & ScannerConstants.KindMask;
            var isFixedWidth = kind >= SyntaxKind.FirstFixedWidth && kind <= SyntaxKind.LastFixedWidth &&
                ((kindAndIsVariableWidth & ScannerConstants.IsVariableWidthMask) === 0);

            if (isFixedWidth &&
                leadingTriviaInfo === 0 && trailingTriviaInfo === 0 &&
                fullStart <= ScannerConstants.FixedWidthTokenMaxFullStart &&
                (kindAndIsVariableWidth & ScannerConstants.IsVariableWidthMask) === 0) {

                return new FixedWidthTokenWithNoTrivia((fullStart << ScannerConstants.FixedWidthTokenFullStartShift) | kind);
            }
            else {
                // inline the packing logic for perf.  
                var packedFullStartAndTriviaInfo = (fullStart << ScannerConstants.LargeTokenFullStartShift) |
                    leadingTriviaInfo | (trailingTriviaInfo << 2);

                var packedFullWidthAndKind = (fullWidth << ScannerConstants.LargeTokenFullWidthShift) | kind;
                var cachedText = isFixedWidth ? undefined : text.substr(start, end - start);
                return new LargeScannerToken(packedFullStartAndTriviaInfo, packedFullWidthAndKind, cachedText);
            }
        }

        function scanTrivia(parent: IScannerToken, text: ISimpleText, isTrailing: boolean): ISyntaxTriviaList {
            var tokenFullStart = parent.fullStart();
            var tokenStart = tokenFullStart + leadingTriviaWidth(parent, text)

            if (isTrailing) {
                reset(text, tokenStart + parent.text().length, tokenFullStart + parent.fullWidth());
            }
            else {
                reset(text, tokenFullStart, tokenStart);
            }
            // Debug.assert(length > 0);

            // Keep this exactly in sync with scanTriviaInfo
            var trivia: ISyntaxTrivia[] = [];

            while (true) {
                if (index < end) {
                    var ch = str.charCodeAt(index);
                    switch (ch) {
                        // Unicode 3.0 space characters
                        case CharacterCodes.space:
                        case CharacterCodes.nonBreakingSpace:
                        case CharacterCodes.enQuad:
                        case CharacterCodes.emQuad:
                        case CharacterCodes.enSpace:
                        case CharacterCodes.emSpace:
                        case CharacterCodes.threePerEmSpace:
                        case CharacterCodes.fourPerEmSpace:
                        case CharacterCodes.sixPerEmSpace:
                        case CharacterCodes.figureSpace:
                        case CharacterCodes.punctuationSpace:
                        case CharacterCodes.thinSpace:
                        case CharacterCodes.hairSpace:
                        case CharacterCodes.zeroWidthSpace:
                        case CharacterCodes.narrowNoBreakSpace:
                        case CharacterCodes.ideographicSpace:

                        case CharacterCodes.tab:
                        case CharacterCodes.verticalTab:
                        case CharacterCodes.formFeed:
                        case CharacterCodes.byteOrderMark:
                            // Normal whitespace.  Consume and continue.
                            trivia.push(scanWhitespaceTrivia());
                            continue;

                        case CharacterCodes.slash:
                            // Potential comment.  Consume if so.  Otherwise, break out and return.
                            var ch2 = str.charCodeAt(index + 1);
                            if (ch2 === CharacterCodes.slash) {
                                trivia.push(scanSingleLineCommentTrivia());
                                continue;
                            }

                            if (ch2 === CharacterCodes.asterisk) {
                                trivia.push(scanMultiLineCommentTrivia());
                                continue;
                            }

                            // Not a comment.  Don't consume.
                            throw Errors.invalidOperation();

                        case CharacterCodes.carriageReturn:
                        case CharacterCodes.lineFeed:
                        case CharacterCodes.paragraphSeparator:
                        case CharacterCodes.lineSeparator:
                            trivia.push(scanLineTerminatorSequenceTrivia(ch));

                            // If we're consuming leading trivia, then we will continue consuming more 
                            // trivia (including newlines) up to the first token we see.  If we're 
                            // consuming trailing trivia, then we break after the first newline we see.
                            if (!isTrailing) {
                                continue;
                            }

                            break;

                        default:
                            throw Errors.invalidOperation();
                    }
                }

                // Debug.assert(trivia.length > 0);
                var triviaList = Syntax.triviaList(trivia);
                triviaList.parent = parent;

                return triviaList;
            }
        }

        // Returns 0 if there was no trivia, or 1 if there was trivia.  Returned as an int instead 
        // of a boolean because we'll need a numerical value later on to store in our tokens.
        function scanTriviaInfo(isTrailing: boolean): number {
            // Keep this exactly in sync with scanTrivia
            var result = 0;
            var _end = end;

            while (index < _end) {
                var ch = str.charCodeAt(index);

                switch (ch) {
                    case CharacterCodes.tab:
                    case CharacterCodes.space:
                    case CharacterCodes.verticalTab:
                    case CharacterCodes.formFeed:
                        index++;
                        // we have trivia
                        result |= 1;
                        continue;

                    case CharacterCodes.carriageReturn:
                        if ((index + 1) < end && str.charCodeAt(index + 1) === CharacterCodes.lineFeed) {
                            index++;
                        }
                    // fall through.
                    case CharacterCodes.lineFeed:
                        index++;

                        // we have trivia
                        result |= 1;

                        // If we're consuming leading trivia, then we will continue consuming more 
                        // trivia (including newlines) up to the first token we see.  If we're 
                        // consuming trailing trivia, then we break after the first newline we see.
                        if (isTrailing) {
                            return result;
                        }

                        continue;

                    case CharacterCodes.slash:
                        if ((index + 1) < _end) {
                            var ch2 = str.charCodeAt(index + 1);
                            if (ch2 === CharacterCodes.slash) {
                                // we have a comment, and we have trivia
                                result |= 3;
                                skipSingleLineCommentTrivia();
                                continue;
                            }

                            if (ch2 === CharacterCodes.asterisk) {
                                // we have a comment, and we have trivia
                                result |= 3;
                                skipMultiLineCommentTrivia();
                                continue;
                            }
                        }

                        // Not a comment.  Don't consume.
                        return result;

                    default:
                        if (ch > CharacterCodes.maxAsciiCharacter && slowScanTriviaInfo(ch)) {
                            result |= 1;
                            continue;
                        }

                        return result;
                }
            }

            return result;
        }

        function slowScanTriviaInfo(ch: number): boolean {
            switch (ch) {
                case CharacterCodes.nonBreakingSpace:
                case CharacterCodes.enQuad:
                case CharacterCodes.emQuad:
                case CharacterCodes.enSpace:
                case CharacterCodes.emSpace:
                case CharacterCodes.threePerEmSpace:
                case CharacterCodes.fourPerEmSpace:
                case CharacterCodes.sixPerEmSpace:
                case CharacterCodes.figureSpace:
                case CharacterCodes.punctuationSpace:
                case CharacterCodes.thinSpace:
                case CharacterCodes.hairSpace:
                case CharacterCodes.zeroWidthSpace:
                case CharacterCodes.narrowNoBreakSpace:
                case CharacterCodes.ideographicSpace:
                case CharacterCodes.byteOrderMark:
                case CharacterCodes.paragraphSeparator:
                case CharacterCodes.lineSeparator:
                    index++;
                    return true;

                default:
                    return false;
            }
        }

        function isNewLineCharacter(ch: number): boolean {
            switch (ch) {
                case CharacterCodes.carriageReturn:
                case CharacterCodes.lineFeed:
                case CharacterCodes.paragraphSeparator:
                case CharacterCodes.lineSeparator:
                    return true;
                default:
                    return false;
            }
        }

        function scanWhitespaceTrivia(): ISyntaxTrivia {
            // We're going to be extracting text out of sliding window.  Make sure it can't move past
            // this point.
            var absoluteStartIndex = index;

            while (true) {
                var ch = str.charCodeAt(index);

                switch (ch) {
                    // Unicode 3.0 space characters
                    case CharacterCodes.space:
                    case CharacterCodes.nonBreakingSpace:
                    case CharacterCodes.enQuad:
                    case CharacterCodes.emQuad:
                    case CharacterCodes.enSpace:
                    case CharacterCodes.emSpace:
                    case CharacterCodes.threePerEmSpace:
                    case CharacterCodes.fourPerEmSpace:
                    case CharacterCodes.sixPerEmSpace:
                    case CharacterCodes.figureSpace:
                    case CharacterCodes.punctuationSpace:
                    case CharacterCodes.thinSpace:
                    case CharacterCodes.hairSpace:
                    case CharacterCodes.zeroWidthSpace:
                    case CharacterCodes.narrowNoBreakSpace:
                    case CharacterCodes.ideographicSpace:

                    case CharacterCodes.tab:
                    case CharacterCodes.verticalTab:
                    case CharacterCodes.formFeed:
                    case CharacterCodes.byteOrderMark:
                        // Normal whitespace.  Consume and continue.
                        index++;
                        continue;
                }

                break;
            }

            return createTrivia(SyntaxKind.WhitespaceTrivia, absoluteStartIndex);
        }

        function createTrivia(kind: SyntaxKind, absoluteStartIndex: number): ISyntaxTrivia {
            var fullWidth = index - absoluteStartIndex;
            return Syntax.deferredTrivia(kind, text, absoluteStartIndex, fullWidth);
        }

        function scanSingleLineCommentTrivia(): ISyntaxTrivia {
            var absoluteStartIndex = index;
            skipSingleLineCommentTrivia();

            return createTrivia(SyntaxKind.SingleLineCommentTrivia, absoluteStartIndex);
        }

        function skipSingleLineCommentTrivia(): void {
            index += 2;

            // The '2' is for the "//" we consumed.
            while (index < end) {
                if (isNewLineCharacter(str.charCodeAt(index))) {
                    return;
                }

                index++;
            }
        }

        function scanMultiLineCommentTrivia(): ISyntaxTrivia {
            var absoluteStartIndex = index;
            skipMultiLineCommentTrivia();

            return createTrivia(SyntaxKind.MultiLineCommentTrivia, absoluteStartIndex);
        }

        function skipMultiLineCommentTrivia(): number {
            // The '2' is for the "/*" we consumed.
            index += 2;

            while (true) {
                if (index === end) {
                    reportDiagnostic(end, 0, DiagnosticCode.AsteriskSlash_expected, undefined);
                    return;
                }

                if ((index + 1) < end &&
                    str.charCodeAt(index) === CharacterCodes.asterisk &&
                    str.charCodeAt(index + 1) === CharacterCodes.slash) {

                    index += 2;
                    return;
                }

                index++;
            }
        }

        function scanLineTerminatorSequenceTrivia(ch: number): ISyntaxTrivia {
            var absoluteStartIndex = index;
            skipLineTerminatorSequence(ch);

            return createTrivia(SyntaxKind.NewLineTrivia, absoluteStartIndex);
        }

        function skipLineTerminatorSequence(ch: number): void {
            // Consume the first of the line terminator we saw.
            index++;

            // If it happened to be a \r and there's a following \n, then consume both.
            if (ch === CharacterCodes.carriageReturn && str.charCodeAt(index) === CharacterCodes.lineFeed) {
                index++;
            }
        }

        function scanSyntaxKind(allowContextualToken: boolean): SyntaxKind {
            if (index >= end) {
                return SyntaxKind.EndOfFileToken;
            }

            var character = str.charCodeAt(index);
            index++;

            switch (character) {
                case CharacterCodes.exclamation /*33*/: return scanExclamationToken();
                case CharacterCodes.doubleQuote/*34*/: return scanStringLiteral(character);
                case CharacterCodes.percent /*37*/: return scanPercentToken();
                case CharacterCodes.ampersand /*38*/: return scanAmpersandToken();
                case CharacterCodes.singleQuote/*39*/: return scanStringLiteral(character);
                case CharacterCodes.openParen/*40*/: return SyntaxKind.OpenParenToken;
                case CharacterCodes.closeParen/*41*/: return SyntaxKind.CloseParenToken;
                case CharacterCodes.asterisk/*42*/: return scanAsteriskToken();
                case CharacterCodes.plus/*43*/: return scanPlusToken();
                case CharacterCodes.comma/*44*/: return SyntaxKind.CommaToken;
                case CharacterCodes.minus/*45*/: return scanMinusToken();
                case CharacterCodes.dot/*46*/: return scanDotToken();
                case CharacterCodes.slash/*47*/: return scanSlashToken(allowContextualToken);

                case CharacterCodes._0/*48*/: case CharacterCodes._1: case CharacterCodes._2: case CharacterCodes._3:
                case CharacterCodes._4: case CharacterCodes._5: case CharacterCodes._6: case CharacterCodes._7:
                case CharacterCodes._8: case CharacterCodes._9/*57*/:
                    return scanNumericLiteral(character);

                case CharacterCodes.colon/*58*/: return SyntaxKind.ColonToken;
                case CharacterCodes.semicolon/*59*/: return SyntaxKind.SemicolonToken;
                case CharacterCodes.lessThan/*60*/: return scanLessThanToken();
                case CharacterCodes.equals/*61*/: return scanEqualsToken();
                case CharacterCodes.greaterThan/*62*/: return scanGreaterThanToken(allowContextualToken);
                case CharacterCodes.question/*63*/: return SyntaxKind.QuestionToken;

                case CharacterCodes.openBracket/*91*/: return SyntaxKind.OpenBracketToken;
                case CharacterCodes.closeBracket/*93*/: return SyntaxKind.CloseBracketToken;
                case CharacterCodes.caret/*94*/: return scanCaretToken();

                case CharacterCodes.openBrace/*123*/: return SyntaxKind.OpenBraceToken;
                case CharacterCodes.bar/*124*/: return scanBarToken();
                case CharacterCodes.closeBrace/*125*/: return SyntaxKind.CloseBraceToken;
                case CharacterCodes.tilde/*126*/: return SyntaxKind.TildeToken;
            }

            // We run into so many identifiers (and keywords) when scanning, that we want the code to
            // be as fast as possible.  To that end, we have an extremely fast path for scanning that
            // handles the 99.9% case of no-unicode characters and no unicode escapes.
            if (isIdentifierStartCharacter[character]) {
                var result = tryFastScanIdentifierOrKeyword(character);
                if (result !== SyntaxKind.None) {
                    return result;
                }
            }

            // Move the index back one and try the slow path.
            index--;
            if (isIdentifierStart(peekCharOrUnicodeEscape())) {
                return slowScanIdentifierOrKeyword();
            }

            // Was nothing that we could understand.  Report the issue and keep moving on.
            var text = String.fromCharCode(character);
            var messageText = getErrorMessageText(text);
            reportDiagnostic(index, 1, DiagnosticCode.Unexpected_character_0, [messageText]);

            index++;

            return SyntaxKind.ErrorToken;
        }

        function isIdentifierStart(interpretedChar: number): boolean {
            if (isIdentifierStartCharacter[interpretedChar]) {
                return true;
            }

            return interpretedChar > CharacterCodes.maxAsciiCharacter && Unicode.isIdentifierStart(interpretedChar, languageVersion);
        }

        function isIdentifierPart(interpretedChar: number): boolean {
            if (isIdentifierPartCharacter[interpretedChar]) {
                return true;
            }

            return interpretedChar > CharacterCodes.maxAsciiCharacter && Unicode.isIdentifierPart(interpretedChar, languageVersion);
        }

        function tryFastScanIdentifierOrKeyword(firstCharacter: number): SyntaxKind {
            var startIndex = index;
            var character = firstCharacter;

            // Note that we go up to the windowCount-1 so that we can read the character at the end
            // of the window and check if it's *not* an identifier part character.
            while (index < end) {
                character = str.charCodeAt(index);
                if (!isIdentifierPartCharacter[character]) {
                    break;
                }

                index++;
            }

            if (index < end && (character === CharacterCodes.backslash || character > CharacterCodes.maxAsciiCharacter)) {
                // We saw a \ (which could start a unicode escape), or we saw a unicode character.
                // This can't be scanned quickly.  Don't update the window position and just bail out
                // to the slow path.
                index = startIndex;
                return SyntaxKind.None;
            }
            else {
                // Saw an ascii character that wasn't a backslash and wasn't an identifier 
                // character.  Or we hit the end of the file  This identifier is done.

                // Also check if it a keyword if it started with a keyword start char.
                if (isKeywordStartCharacter[firstCharacter]) {
                    return ScannerUtilities.identifierKind(str, startIndex - 1, index - startIndex + 1);
                }
                else {
                    return SyntaxKind.IdentifierName;
                }
            }
        }

        // A slow path for scanning identifiers.  Called when we run into a unicode character or
        // escape sequence while processing the fast path.
        function slowScanIdentifierOrKeyword(): SyntaxKind {
            var startIndex = index;

            do {
                scanCharOrUnicodeEscape();
            }
            while (isIdentifierPart(peekCharOrUnicodeEscape()));

            // From ES6 specification.
            // The ReservedWord definitions are specified as literal sequences of Unicode 
            // characters.However, any Unicode character in a ReservedWord can also be 
            // expressed by a \ UnicodeEscapeSequence that expresses that same Unicode 
            // character's code point.Use of such escape sequences does not change the meaning 
            // of the ReservedWord.
            //
            // i.e. "\u0076ar" is the keyword 'var'.  Check for that here.
            var length = index - startIndex;
            var text = str.substr(startIndex, length);
            var valueText = massageEscapes(text);

            var keywordKind = SyntaxFacts.getTokenKind(valueText);
            if (keywordKind >= SyntaxKind.FirstKeyword && keywordKind <= SyntaxKind.LastKeyword) {
                // We have a keyword, but it is also variable width.  We can't put represent this
                // width a fixed width token.
                return keywordKind | ScannerConstants.IsVariableWidthMask;
            }

            return SyntaxKind.IdentifierName;
        }

        function scanNumericLiteral(ch: number): SyntaxKind {
            if (isHexNumericLiteral(ch)) {
                scanHexNumericLiteral();
            }
            else if (isOctalNumericLiteral(ch)) {
                scanOctalNumericLiteral();
            }
            else {
                scanDecimalNumericLiteral();
            }

            return SyntaxKind.NumericLiteral;
        }

        function isOctalNumericLiteral(ch: number): boolean {
            return ch === CharacterCodes._0 &&
                CharacterInfo.isOctalDigit(str.charCodeAt(index));
        }

        function scanOctalNumericLiteral(): void {
            var start = index - 1;

            while (CharacterInfo.isOctalDigit(str.charCodeAt(index))) {
                index++;
            }

            if (languageVersion >= ts.ScriptTarget.ES5) {
                reportDiagnostic(
                    start, index - start, DiagnosticCode.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher, undefined);
            }
        }

        function scanDecimalDigits(): void {
            while (CharacterInfo.isDecimalDigit(str.charCodeAt(index))) {
                index++;
            }
        }

        function scanDecimalNumericLiteral(): void {
            scanDecimalDigits();

            if (str.charCodeAt(index) === CharacterCodes.dot) {
                index++;
            }

            scanDecimalNumericLiteralAfterDot();
        }

        function scanDecimalNumericLiteralAfterDot() {
            scanDecimalDigits();

            // If we see an 'e' or 'E' we should only consume it if its of the form:
            // e<number> or E<number> 
            // e+<number>   E+<number>
            // e-<number>   E-<number>
            var ch = str.charCodeAt(index);
            if (ch === CharacterCodes.e || ch === CharacterCodes.E) {
                // Ok, we've got 'e' or 'E'.  Make sure it's followed correctly.
                var nextChar1 = str.charCodeAt(index + 1);

                if (CharacterInfo.isDecimalDigit(nextChar1)) {
                    // e<number> or E<number>
                    // Consume 'e' or 'E' and the number portion.
                    index++;
                    scanDecimalDigits();
                }
                else if (nextChar1 === CharacterCodes.minus || nextChar1 === CharacterCodes.plus) {
                    // e+ or E+ or e- or E-
                    var nextChar2 = str.charCodeAt(index + 2);
                    if (CharacterInfo.isDecimalDigit(nextChar2)) {
                        // e+<number> or E+<number> or e-<number> or E-<number>
                        // Consume first two characters and the number portion.
                        index += 2;
                        scanDecimalDigits();
                    }
                }
            }
        }

        function scanHexNumericLiteral(): void {
            // Move past the x.
            index++;

            while (CharacterInfo.isHexDigit(str.charCodeAt(index))) {
                index++;
            }
        }

        function isHexNumericLiteral(ch: number): boolean {
            if (ch === CharacterCodes._0) {
                var ch = str.charCodeAt(index);

                if (ch === CharacterCodes.x || ch === CharacterCodes.X) {
                    return CharacterInfo.isHexDigit(str.charCodeAt(index + 1));
                }
            }

            return false;
        }

        function scanLessThanToken(): SyntaxKind {
            var ch0 = str.charCodeAt(index);
            if (ch0 === CharacterCodes.equals) {
                index++;
                return SyntaxKind.LessThanEqualsToken;
            }
            else if (ch0 === CharacterCodes.lessThan) {
                index++;
                if (str.charCodeAt(index) === CharacterCodes.equals) {
                    index++;
                    return SyntaxKind.LessThanLessThanEqualsToken;
                }
                else {
                    return SyntaxKind.LessThanLessThanToken;
                }
            }
            else {
                return SyntaxKind.LessThanToken;
            }
        }

        function scanGreaterThanToken(allowContextualToken: boolean): SyntaxKind {
            if (allowContextualToken) {
                var ch0 = str.charCodeAt(index);
                if (ch0 === CharacterCodes.greaterThan) {
                    // >>
                    index++;
                    var ch1 = str.charCodeAt(index);
                    if (ch1 === CharacterCodes.greaterThan) {
                        // >>>
                        index++;
                        var ch2 = str.charCodeAt(index);
                        if (ch2 === CharacterCodes.equals) {
                            // >>>=
                            index++;
                            return SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken;
                        }
                        else {
                            return SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
                        }
                    }
                    else if (ch1 === CharacterCodes.equals) {
                        // >>=
                        index++;
                        return SyntaxKind.GreaterThanGreaterThanEqualsToken;
                    }
                    else {
                        return SyntaxKind.GreaterThanGreaterThanToken;
                    }
                }
                else if (ch0 === CharacterCodes.equals) {
                    // >=
                    index++;
                    return SyntaxKind.GreaterThanEqualsToken;
                }
            }

            return SyntaxKind.GreaterThanToken;
        }

        function scanBarToken(): SyntaxKind {
            var ch = str.charCodeAt(index);
            if (ch === CharacterCodes.equals) {
                index++;
                return SyntaxKind.BarEqualsToken;
            }
            else if (ch === CharacterCodes.bar) {
                index++;
                return SyntaxKind.BarBarToken;
            }
            else {
                return SyntaxKind.BarToken;
            }
        }

        function scanCaretToken(): SyntaxKind {
            if (str.charCodeAt(index) === CharacterCodes.equals) {
                index++;
                return SyntaxKind.CaretEqualsToken;
            }
            else {
                return SyntaxKind.CaretToken;
            }
        }

        function scanAmpersandToken(): SyntaxKind {
            var character = str.charCodeAt(index);
            if (character === CharacterCodes.equals) {
                index++;
                return SyntaxKind.AmpersandEqualsToken;
            }
            else if (character === CharacterCodes.ampersand) {
                index++;
                return SyntaxKind.AmpersandAmpersandToken;
            }
            else {
                return SyntaxKind.AmpersandToken;
            }
        }

        function scanPercentToken(): SyntaxKind {
            if (str.charCodeAt(index) === CharacterCodes.equals) {
                index++;
                return SyntaxKind.PercentEqualsToken;
            }
            else {
                return SyntaxKind.PercentToken;
            }
        }

        function scanMinusToken(): SyntaxKind {
            var character = str.charCodeAt(index);

            if (character === CharacterCodes.equals) {
                index++;
                return SyntaxKind.MinusEqualsToken;
            }
            else if (character === CharacterCodes.minus) {
                index++;
                return SyntaxKind.MinusMinusToken;
            }
            else {
                return SyntaxKind.MinusToken;
            }
        }

        function scanPlusToken(): SyntaxKind {
            var character = str.charCodeAt(index);
            if (character === CharacterCodes.equals) {
                index++;
                return SyntaxKind.PlusEqualsToken;
            }
            else if (character === CharacterCodes.plus) {
                index++;
                return SyntaxKind.PlusPlusToken;
            }
            else {
                return SyntaxKind.PlusToken;
            }
        }

        function scanAsteriskToken(): SyntaxKind {
            if (str.charCodeAt(index) === CharacterCodes.equals) {
                index++;
                return SyntaxKind.AsteriskEqualsToken;
            }
            else {
                return SyntaxKind.AsteriskToken;
            }
        }

        function scanEqualsToken(): SyntaxKind {
            var character = str.charCodeAt(index);
            if (character === CharacterCodes.equals) {
                index++;

                if (str.charCodeAt(index) === CharacterCodes.equals) {
                    index++;

                    return SyntaxKind.EqualsEqualsEqualsToken;
                }
                else {
                    return SyntaxKind.EqualsEqualsToken;
                }
            }
            else if (character === CharacterCodes.greaterThan) {
                index++;
                return SyntaxKind.EqualsGreaterThanToken;
            }
            else {
                return SyntaxKind.EqualsToken;
            }
        }

        function scanDotToken(): SyntaxKind {
            var nextChar = str.charCodeAt(index);
            if (CharacterInfo.isDecimalDigit(nextChar)) {
                scanDecimalNumericLiteralAfterDot();
                return SyntaxKind.NumericLiteral;
            }

            if (nextChar === CharacterCodes.dot &&
                str.charCodeAt(index + 1) === CharacterCodes.dot) {

                index += 2;
                return SyntaxKind.DotDotDotToken;
            }
            else {
                return SyntaxKind.DotToken;
            }
        }

        function scanSlashToken(allowContextualToken: boolean): SyntaxKind {
            // NOTE: By default, we do not try scanning a / as a regexp here.  We instead consider it a
            // div or div-assign.  Later on, if the parser runs into a situation where it would like a 
            // term, and it sees one of these then it may restart us asking specifically if we could 
            // scan out a regex.
            if (allowContextualToken) {
                var result = tryScanRegularExpressionToken();
                if (result !== SyntaxKind.None) {
                    return result;
                }
            }

            if (str.charCodeAt(index) === CharacterCodes.equals) {
                index++;
                return SyntaxKind.SlashEqualsToken;
            }
            else {
                return SyntaxKind.SlashToken;
            }
        }

        function tryScanRegularExpressionToken(): SyntaxKind {
            var startIndex = index;

            var inEscape = false;
            var inCharacterClass = false;
            while (true) {
                var ch = str.charCodeAt(index);

                if (isNaN(ch) || isNewLineCharacter(ch)) {
                    index = startIndex;
                    return SyntaxKind.None;
                }

                index++;
                if (inEscape) {
                    inEscape = false;
                    continue;
                }

                switch (ch) {
                    case CharacterCodes.backslash:
                        // We're now in an escape.  Consume the next character we see (unless it's
                        // a newline or undefined.
                        inEscape = true;
                        continue;

                    case CharacterCodes.openBracket:
                        // If we see a [ then we're starting an character class.  Note: it's ok if 
                        // we then hit another [ inside a character class.  We'll just set the value
                        // to true again and that's ok.
                        inCharacterClass = true;
                        continue;

                    case CharacterCodes.closeBracket:
                        // If we ever hit a cloe bracket then we're now no longer in a character 
                        // class.  If we weren't in a character class to begin with, then this has 
                        // no effect.
                        inCharacterClass = false;
                        continue;

                    case CharacterCodes.slash:
                        // If we see a slash, and we're in a character class, then ignore it.
                        if (inCharacterClass) {
                            continue;
                        }

                        // We're done with the regex.  Break out of the switch (which will break 
                        // out of hte loop.
                        break;

                    default:
                        // Just consume any other characters.
                        continue;
                }

                break;
            }

            // TODO: The grammar says any identifier part is allowed here.  Do we need to support
            // \u identifiers here?  The existing typescript parser does not.  
            while (isIdentifierPartCharacter[str.charCodeAt(index)]) {
                index++;
            }

            return SyntaxKind.RegularExpressionLiteral;
        }

        function scanExclamationToken(): SyntaxKind {
            if (str.charCodeAt(index) === CharacterCodes.equals) {
                index++;

                if (str.charCodeAt(index) === CharacterCodes.equals) {
                    index++;

                    return SyntaxKind.ExclamationEqualsEqualsToken;
                }
                else {
                    return SyntaxKind.ExclamationEqualsToken;
                }
            }
            else {
                return SyntaxKind.ExclamationToken;
            }
        }

        // Convert text into a printable form usable for an error message.  This will both quote the 
        // string, and ensure all characters printable (i.e. by using unicode escapes when they're not).
        function getErrorMessageText(text: string): string {
            // For just a simple backslash, we return it as is.  The default behavior of JSON.stringify
            // is not what we want here.
            if (text === "\\") {
                return '"\\"';
            }

            return JSON.stringify(text);
        }

        function skipEscapeSequence(): void {
            var rewindPoint = index;

            // Consume the backslash.
            index++;

            // Get the char after the backslash
            var ch = str.charCodeAt(index);
            if (isNaN(ch)) {
                // if we're at teh end of the file, just return, the string scanning code will 
                // report an appropriate error.
                return;
            }

            index++;
            switch (ch) {
                case CharacterCodes.x:
                case CharacterCodes.u:
                    index = rewindPoint;
                    var value = scanUnicodeOrHexEscape(/*report:*/ true);
                    break;

                case CharacterCodes.carriageReturn:
                    // If it's \r\n then consume both characters.
                    if (str.charCodeAt(index) === CharacterCodes.lineFeed) {
                        index++;
                    }
                    break;

                // We don't have to do anything special about these characters.  I'm including them
                // Just so it's clear that we intentially process them in the exact same way:
                //case CharacterCodes.singleQuote:
                //case CharacterCodes.doubleQuote:
                //case CharacterCodes.backslash:
                //case CharacterCodes._0:
                //case CharacterCodes.b:
                //case CharacterCodes.f:
                //case CharacterCodes.n:
                //case CharacterCodes.r:
                //case CharacterCodes.t:
                //case CharacterCodes.v:
                //case CharacterCodes.lineFeed:
                //case CharacterCodes.paragraphSeparator:
                //case CharacterCodes.lineSeparator:
                default:
                    // Any other character is ok as well.  As per rule:
                    // EscapeSequence :: CharacterEscapeSequence
                    // CharacterEscapeSequence :: NonEscapeCharacter
                    // NonEscapeCharacter :: SourceCharacter but notEscapeCharacter or LineTerminator
                    break;
            }
        }

        function scanStringLiteral(quoteCharacter: number): SyntaxKind {
            // Debug.assert(quoteCharacter === CharacterCodes.singleQuote || quoteCharacter === CharacterCodes.doubleQuote);

            while (true) {
                var ch = str.charCodeAt(index);
                if (ch === CharacterCodes.backslash) {
                    skipEscapeSequence();
                }
                else if (ch === quoteCharacter) {
                    index++;
                    break;
                }
                else if (isNaN(ch) || isNewLineCharacter(ch)) {
                    reportDiagnostic(Math.min(index, end), 1, DiagnosticCode.Missing_close_quote_character, undefined);
                    break;
                }
                else {
                    index++;
                }
            }

            return SyntaxKind.StringLiteral;
        }

        function isUnicodeEscape(character: number): boolean {
            return character === CharacterCodes.backslash &&
                str.charCodeAt(index + 1) === CharacterCodes.u;
        }

        function peekCharOrUnicodeEscape(): number {
            var character = str.charCodeAt(index);
            if (isUnicodeEscape(character)) {
                return peekUnicodeOrHexEscape();
            }
            else {
                return character;
            }
        }

        function peekUnicodeOrHexEscape(): number {
            var startIndex = index;

            // if we're peeking, then we don't want to change the position
            var ch = scanUnicodeOrHexEscape(/*report:*/ false);

            index = startIndex;

            return ch;
        }

        // Returns true if this was a unicode escape.
        function scanCharOrUnicodeEscape(): void {
            if (str.charCodeAt(index) === CharacterCodes.backslash &&
                str.charCodeAt(index + 1) === CharacterCodes.u) {

                scanUnicodeOrHexEscape(/*report:*/ true);
            }
            else {
                index++;
            }
        }

        function scanUnicodeOrHexEscape(report: boolean): number {
            var start = index;
            var character = str.charCodeAt(index);
            // Debug.assert(character === CharacterCodes.backslash);
            index++;

            character = str.charCodeAt(index);
            // Debug.assert(character === CharacterCodes.u || character === CharacterCodes.x);

            var intChar = 0;
            index++;

            var count = character === CharacterCodes.u ? 4 : 2;

            for (var i = 0; i < count; i++) {
                var ch2 = str.charCodeAt(index);
                if (!CharacterInfo.isHexDigit(ch2)) {
                    if (report) {
                        reportDiagnostic(start, index - start, DiagnosticCode.Unrecognized_escape_sequence, undefined)
                    }

                    break;
                }

                intChar = (intChar << 4) + CharacterInfo.hexValue(ch2);
                index++;
            }

            return intChar;
        }

        function fillTokenInfo(token: IScannerToken, text: ISimpleText, tokenInfo: TokenInfo): void {
            var fullStart = token.fullStart();
            var fullEnd = fullStart + token.fullWidth();
            reset(text, fullStart, fullEnd);

            scanTriviaInfo(/*isTrailing: */ false);

            var start = index;
            scanSyntaxKind(isContextualToken(token));
            var end = index;

            tokenInfo.leadingTriviaWidth = start - fullStart;
            tokenInfo.width = end - start;
        }

        reset(text, 0, text.length());

        return {
            setIndex: setIndex,
            scan: scan,
            fillTokenInfo: fillTokenInfo,
            scanTrivia: scanTrivia,
        };
    }

    export function isValidIdentifier(text: ISimpleText, languageVersion: ts.ScriptTarget): boolean {
        var hadError = false;
        var scanner = createScanner(languageVersion, text, () => hadError = true);

        var token = scanner.scan(/*allowContextualToken:*/ false);

        return !hadError && SyntaxFacts.isIdentifierNameOrAnyKeyword(token) && width(token) === text.length();
    }

    // A parser source that gets its data from an underlying scanner.
    export interface IScannerParserSource extends Parser.IParserSource {
        // The position that the scanner is currently at.
        absolutePosition(): number;

        // Resets the source to this position. Any diagnostics produced after this point will be
        // removed.
        resetToPosition(absolutePosition: number): void;
    }

    interface IScannerRewindPoint extends Parser.IRewindPoint {
        // Information used by normal parser source.
        absolutePosition: number;
        slidingWindowIndex: number;
    }

    // Parser source used in batch scenarios.  Directly calls into an underlying text scanner and
    // supports none of the functionality to reuse nodes.  Good for when you just want want to do
    // a single parse of a file.
    export function createParserSource(fileName: string, text: ISimpleText, languageVersion: ts.ScriptTarget): IScannerParserSource {
        // The absolute position we're at in the text we're reading from.
        var _absolutePosition: number = 0;

        // The diagnostics we get while scanning.  Note: this never gets rewound when we do a normal
        // rewind.  That's because rewinding doesn't affect the tokens created.  It only affects where
        // in the token stream we're pointing at.  However, it will get modified if we we decide to
        // reparse a / or /= as a regular expression.
        var _tokenDiagnostics: Diagnostic[] = [];

        // Pool of rewind points we give out if the parser needs one.
        var rewindPointPool: IScannerRewindPoint[] = [];
        var rewindPointPoolCount = 0;

        var lastDiagnostic: Diagnostic = undefined;
        var reportDiagnostic = (position: number, fullWidth: number, diagnosticKey: string, args: any[]) => {
            lastDiagnostic = new Diagnostic(fileName, text.lineMap(), position, fullWidth, diagnosticKey, args);
        };

        // The sliding window that we store tokens in.
        var slidingWindow = new SlidingWindow(fetchNextItem, ArrayUtilities.createArray(/*defaultWindowSize:*/ 1024, undefined), undefined);

        // The scanner we're pulling tokens from.
        var scanner = createScanner(languageVersion, text, reportDiagnostic);

        function release() {
            slidingWindow = undefined;
            scanner = undefined;
            _tokenDiagnostics = [];
            rewindPointPool = [];
            lastDiagnostic = undefined;
            reportDiagnostic = undefined;
        }

        function currentNode(): ISyntaxNode {
            // The normal parser source never returns nodes.  They're only returned by the 
            // incremental parser source.
            return undefined;
        }

        function consumeNode(node: ISyntaxNode): void {
            // Should never get called.
            throw Errors.invalidOperation();
        }

        function absolutePosition() {
            return _absolutePosition;
        }

        function tokenDiagnostics(): Diagnostic[] {
            return _tokenDiagnostics;
        }

        function getOrCreateRewindPoint(): IScannerRewindPoint {
            if (rewindPointPoolCount === 0) {
                return <IScannerRewindPoint>{};
            }

            rewindPointPoolCount--;
            var result = rewindPointPool[rewindPointPoolCount];
            rewindPointPool[rewindPointPoolCount] = undefined;
            return result;
        }

        function getRewindPoint(): IScannerRewindPoint {
            var slidingWindowIndex = slidingWindow.getAndPinAbsoluteIndex();

            var rewindPoint = getOrCreateRewindPoint();

            rewindPoint.slidingWindowIndex = slidingWindowIndex;
            rewindPoint.absolutePosition = _absolutePosition;

            // rewindPoint.pinCount = slidingWindow.pinCount();

            return rewindPoint;
        }

        function rewind(rewindPoint: IScannerRewindPoint): void {
            slidingWindow.rewindToPinnedIndex(rewindPoint.slidingWindowIndex);

            _absolutePosition = rewindPoint.absolutePosition;
        }

        function releaseRewindPoint(rewindPoint: IScannerRewindPoint): void {
            // Debug.assert(slidingWindow.pinCount() === rewindPoint.pinCount);
            slidingWindow.releaseAndUnpinAbsoluteIndex((<any>rewindPoint).absoluteIndex);

            rewindPointPool[rewindPointPoolCount] = rewindPoint;
            rewindPointPoolCount++;
        }

        function fetchNextItem(allowContextualToken: boolean): ISyntaxToken {
            // Assert disabled because it is actually expensive enugh to affect perf.
            // Debug.assert(spaceAvailable > 0);
            var token = scanner.scan(allowContextualToken);

            if (lastDiagnostic === undefined) {
                return token;
            }

            // If we produced any diagnostics while creating this token, then realize the token so 
            // it won't be reused in incremental scenarios.

            _tokenDiagnostics.push(lastDiagnostic);
            lastDiagnostic = undefined;
            return Syntax.realizeToken(token, text);
        }

        function peekToken(n: number): ISyntaxToken {
            return slidingWindow.peekItemN(n);
        }

        function consumeToken(token: ISyntaxToken): void {
            // Debug.assert(currentToken() === token);
            _absolutePosition += token.fullWidth();

            slidingWindow.moveToNextItem();
        }

        function currentToken(): ISyntaxToken {
            return slidingWindow.currentItem(/*allowContextualToken:*/ false);
        }

        function removeDiagnosticsOnOrAfterPosition(position: number): void {
            // walk backwards, removing any diagnostics that came after the the current token's
            // full start position.
            var tokenDiagnosticsLength = _tokenDiagnostics.length;
            while (tokenDiagnosticsLength > 0) {
                var diagnostic = _tokenDiagnostics[tokenDiagnosticsLength - 1];
                if (diagnostic.start() >= position) {
                    tokenDiagnosticsLength--;
                    _tokenDiagnostics.pop();
                }
                else {
                    break;
                }
            }
        }

        function resetToPosition(absolutePosition: number): void {
            Debug.assert(absolutePosition <= text.length(), "Trying to set the position outside the bounds of the text!");

            _absolutePosition = absolutePosition;

            // First, remove any diagnostics that came after this position.
            removeDiagnosticsOnOrAfterPosition(absolutePosition);

            // Now, tell our sliding window to throw away all tokens after this position as well.
            slidingWindow.disgardAllItemsFromCurrentIndexOnwards();

            // Now tell the scanner to reset its position to this position as well.  That way
            // when we try to scan the next item, we'll be at the right location.
            scanner.setIndex(absolutePosition);
        }

        function currentContextualToken(): ISyntaxToken {
            // We better be on a / or > token right now.
            // Debug.assert(SyntaxFacts.isAnyDivideToken(currentToken().kind()));

            // First, we're going to rewind all our data to the point where this / or /= token started.
            // That's because if it does turn out to be a regular expression, then any tokens or token 
            // diagnostics we produced after the original / may no longer be valid.  This would actually
            // be a  fairly expected case.  For example, if you had:  / ... gibberish ... /, we may have 
            // produced several diagnostics in the process of scanning the tokens after the first / as
            // they may not have been legal javascript okens.
            //
            // We also need to remove all the tokens we've gotten from the slash and onwards.  They may
            // not have been what the scanner would have produced if it decides that this is actually
            // a regular expresion.
            resetToPosition(_absolutePosition);

            // Now actually fetch the token again from the scanner. This time let it know that it
            // can scan it as a regex token if it wants to.
            var token = slidingWindow.currentItem(/*allowContextualToken:*/ true);

            // We have better gotten some sort of regex token.  Otherwise, something *very* wrong has
            // occurred.
            // Debug.assert(SyntaxFacts.isAnyDivideOrRegularExpressionToken(token.kind()));

            return token;
        }

        return {
            text: text,
            fileName: fileName,
            languageVersion: languageVersion,
            currentNode: currentNode,
            currentToken: currentToken,
            currentContextualToken: currentContextualToken,
            peekToken: peekToken,
            consumeNode: consumeNode,
            consumeToken: consumeToken,
            getRewindPoint: getRewindPoint,
            rewind: rewind,
            releaseRewindPoint: releaseRewindPoint,
            tokenDiagnostics: tokenDiagnostics,
            release: release,
            absolutePosition: absolutePosition,
            resetToPosition: resetToPosition,
        };
    }
}