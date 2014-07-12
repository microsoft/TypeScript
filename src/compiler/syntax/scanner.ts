///<reference path='references.ts' />

module TypeScript {
    var isKeywordStartCharacter: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);
    var isIdentifierStartCharacter: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);
    var isIdentifierPartCharacter: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);
    var isNumericLiteralStart: boolean[] = ArrayUtilities.createArray<boolean>(CharacterCodes.maxAsciiCharacter, false);

    for (var character = 0; character < CharacterCodes.maxAsciiCharacter; character++) {
        if (character >= CharacterCodes.a && character <= CharacterCodes.z) {
            isIdentifierStartCharacter[character] = true;
            isIdentifierPartCharacter[character] = true;
        }
        else if ((character >= CharacterCodes.A && character <= CharacterCodes.Z) ||
            character === CharacterCodes._ ||
            character === CharacterCodes.$) {
            isIdentifierStartCharacter[character] = true;
            isIdentifierPartCharacter[character] = true;
        }
        else if (character >= CharacterCodes._0 && character <= CharacterCodes._9) {
            isIdentifierPartCharacter[character] = true;
            isNumericLiteralStart[character] = true;
        }
    }

    isNumericLiteralStart[CharacterCodes.dot] = true;

    for (var keywordKind = SyntaxKind.FirstKeyword; keywordKind <= SyntaxKind.LastKeyword; keywordKind++) {
        var keyword = SyntaxFacts.getText(keywordKind);
        isKeywordStartCharacter[keyword.charCodeAt(0)] = true;
    }

    export class Scanner implements ISlidingWindowSource {
        private slidingWindow: SlidingWindow;

        private fileName: string;
        private text: ISimpleText;
        private _languageVersion: LanguageVersion;

        constructor(fileName: string,
                    text: ISimpleText,
                    languageVersion: LanguageVersion,
                    window: number[] = ArrayUtilities.createArray<number>(2048, 0)) {
            this.slidingWindow = new SlidingWindow(this, window, 0, text.length());
            this.fileName = fileName;
            this.text = text;
            this._languageVersion = languageVersion;
        }

        public languageVersion(): LanguageVersion {
            return this._languageVersion;
        }

        public fetchMoreItems(argument: any, sourceIndex: number, window: number[], destinationIndex: number, spaceAvailable: number): number {
            var charactersRemaining = this.text.length() - sourceIndex;
            var amountToRead = MathPrototype.min(charactersRemaining, spaceAvailable);
            this.text.copyTo(sourceIndex, window, destinationIndex, amountToRead);
            return amountToRead;
        }

        private currentCharCode(): number {
            return this.slidingWindow.currentItem(/*argument:*/ null);
        }

        public absoluteIndex(): number {
            return this.slidingWindow.absoluteIndex();
        }

        // Set's the scanner to a specific position in the text.
        public setAbsoluteIndex(index: number): void {
            this.slidingWindow.setAbsoluteIndex(index);
        }

        // Scans a token starting at the current position.  Any errors encountered will be added to 
        // 'diagnostics'.
        public scan(diagnostics: Diagnostic[], allowRegularExpression: boolean): ISyntaxToken {
            var diagnosticsLength = diagnostics.length;
            var fullStart = this.slidingWindow.absoluteIndex();
            var leadingTriviaInfo = this.scanTriviaInfo(diagnostics, /*isTrailing: */ false);

            var start = this.slidingWindow.absoluteIndex();
            var kindAndFlags = this.scanSyntaxToken(diagnostics, allowRegularExpression);
            var end = this.slidingWindow.absoluteIndex();

            var trailingTriviaInfo = this.scanTriviaInfo(diagnostics,/*isTrailing: */true);
            var fullEnd = this.slidingWindow.absoluteIndex();

            var isVariableWidthKeyword = (kindAndFlags & SyntaxConstants.IsVariableWidthKeyword) !== 0;
            var kind = kindAndFlags & ~SyntaxConstants.IsVariableWidthKeyword;

            var token = this.createToken(fullStart, leadingTriviaInfo, start, kind, end, fullEnd, trailingTriviaInfo, isVariableWidthKeyword);

            // If we produced any diagnostics while creating this token, then realize the token so 
            // it won't be reused in incremental scenarios.
            return diagnosticsLength !== diagnostics.length
                ? Syntax.realizeToken(token)
                : token;
        }

        private createToken(
            fullStart: number,
            leadingTriviaInfo: number,
            start: number,
            kind: SyntaxKind,
            end: number,
            fullEnd: number,
            trailingTriviaInfo: number,
            isVariableWidthKeyword: boolean): ISyntaxToken {

            if (!isVariableWidthKeyword && kind >= SyntaxKind.FirstFixedWidth) {
                if (leadingTriviaInfo === 0) {
                    if (trailingTriviaInfo === 0) {
                        return new Syntax.FixedWidthTokenWithNoTrivia(kind);
                    }
                    else {
                        var fullText = this.text.substr(fullStart, fullEnd - fullStart, false);
                        return new Syntax.FixedWidthTokenWithTrailingTrivia(fullText, kind, trailingTriviaInfo);
                    }
                }
                else if (trailingTriviaInfo === 0) {
                    var fullText = this.text.substr(fullStart, fullEnd - fullStart, false);
                    return new Syntax.FixedWidthTokenWithLeadingTrivia(fullText, kind, leadingTriviaInfo);
                }
                else {
                    var fullText = this.text.substr(fullStart, fullEnd - fullStart, false);
                    return new Syntax.FixedWidthTokenWithLeadingAndTrailingTrivia(fullText, kind, leadingTriviaInfo, trailingTriviaInfo);
                }
            }
            else {
                var width = end - start;

                var fullText = this.text.substr(fullStart, fullEnd - fullStart, false);

                if (leadingTriviaInfo === 0) {
                    if (trailingTriviaInfo === 0) {
                        return new Syntax.VariableWidthTokenWithNoTrivia(fullText, kind);
                    }
                    else {
                        return new Syntax.VariableWidthTokenWithTrailingTrivia(fullText, kind, trailingTriviaInfo);
                    }
                }
                else if (trailingTriviaInfo === 0) {
                    return new Syntax.VariableWidthTokenWithLeadingTrivia(fullText, kind, leadingTriviaInfo);
                }
                else {
                    return new Syntax.VariableWidthTokenWithLeadingAndTrailingTrivia(fullText, kind, leadingTriviaInfo, trailingTriviaInfo);
                }
            }
        }

        private static triviaWindow: number[] = ArrayUtilities.createArray<number>(2048, 0);

        // Scans a subsection of 'text' as trivia.
        public static scanTrivia(text: ISimpleText, start: number, length: number, isTrailing: boolean): ISyntaxTriviaList {
            // Debug.assert(length > 0);

            // Note: the scanner operates upon a subrange of the text passed in. However, we also
            // pass hte originl text along to 'scanTrivia' so the trivia can point back at it
            // directly (and not at the subtext wrapper).  This allows the subtext to get GC'ed
            // and means trivia can be represented with only a single allocation.
            var scanner = new Scanner(/*fileName:*/ null, text.subText(new TextSpan(start, length)), LanguageVersion.EcmaScript5, Scanner.triviaWindow);
            return scanner.scanTrivia(text, start, isTrailing);
        }

        private scanTrivia(underlyingText: ISimpleText, underlyingTextStart: number, isTrailing: boolean): ISyntaxTriviaList {
            // Keep this exactly in sync with scanTriviaInfo
            var trivia = new Array<ISyntaxTrivia>();

            while (true) {
                if (!this.slidingWindow.isAtEndOfSource()) {
                    var ch = this.currentCharCode();

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
                            trivia.push(this.scanWhitespaceTrivia(underlyingText, underlyingTextStart));
                            continue;

                        case CharacterCodes.slash:
                            // Potential comment.  Consume if so.  Otherwise, break out and return.
                            var ch2 = this.slidingWindow.peekItemN(1);
                            if (ch2 === CharacterCodes.slash) {
                                trivia.push(this.scanSingleLineCommentTrivia(underlyingText, underlyingTextStart));
                                continue;
                            }

                            if (ch2 === CharacterCodes.asterisk) {
                                trivia.push(this.scanMultiLineCommentTrivia(underlyingText, underlyingTextStart));
                                continue;
                            }

                            // Not a comment.  Don't consume.
                            throw Errors.invalidOperation();

                        case CharacterCodes.carriageReturn:
                        case CharacterCodes.lineFeed:
                        case CharacterCodes.paragraphSeparator:
                        case CharacterCodes.lineSeparator:
                            trivia.push(this.scanLineTerminatorSequenceTrivia(ch));

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
                return Syntax.triviaList(trivia);
            }
        }

        private scanTriviaInfo(diagnostics: Diagnostic[], isTrailing: boolean): number {
            // Keep this exactly in sync with scanTrivia
            var width = 0;
            var hasCommentOrNewLine = 0;

            while (true) {
                var ch = this.currentCharCode();

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
                        this.slidingWindow.moveToNextItem();
                        width++;
                        continue;

                    case CharacterCodes.slash:
                        // Potential comment.  Consume if so.  Otherwise, break out and return.
                        var ch2 = this.slidingWindow.peekItemN(1);
                        if (ch2 === CharacterCodes.slash) {
                            hasCommentOrNewLine |= SyntaxConstants.TriviaCommentMask;
                            width += this.scanSingleLineCommentTriviaLength();
                            continue;
                        }

                        if (ch2 === CharacterCodes.asterisk) {
                            hasCommentOrNewLine |= SyntaxConstants.TriviaCommentMask;
                            width += this.scanMultiLineCommentTriviaLength(diagnostics);
                            continue;
                        }

                        // Not a comment.  Don't consume.
                        break;

                    case CharacterCodes.carriageReturn:
                    case CharacterCodes.lineFeed:
                    case CharacterCodes.paragraphSeparator:
                    case CharacterCodes.lineSeparator:
                        hasCommentOrNewLine |= SyntaxConstants.TriviaNewLineMask;
                        width += this.scanLineTerminatorSequenceLength(ch);

                        // If we're consuming leading trivia, then we will continue consuming more 
                        // trivia (including newlines) up to the first token we see.  If we're 
                        // consuming trailing trivia, then we break after the first newline we see.
                        if (!isTrailing) {
                            continue;
                        }

                        break;
                }

                return (width << SyntaxConstants.TriviaFullWidthShift) | hasCommentOrNewLine;
            }
        }

        private isNewLineCharacter(ch: number): boolean {
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

        private scanWhitespaceTrivia(underlyingText: ISimpleText, underlyingTextStart: number): ISyntaxTrivia {
            // We're going to be extracting text out of sliding window.  Make sure it can't move past
            // this point.
            var absoluteStartIndex = this.absoluteIndex();

            var width = 0;
            while (true) {
                var ch = this.currentCharCode();

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
                        this.slidingWindow.moveToNextItem();
                        width++;
                        continue;
                }

                break;
            }

            return Syntax.deferredTrivia(SyntaxKind.WhitespaceTrivia,
                underlyingText, underlyingTextStart + absoluteStartIndex, width);
        }

        private scanSingleLineCommentTrivia(underlyingText: ISimpleText, underlyingTextStart: number): ISyntaxTrivia {
            var absoluteStartIndex = this.slidingWindow.absoluteIndex();
            var width = this.scanSingleLineCommentTriviaLength();

            return Syntax.deferredTrivia(SyntaxKind.SingleLineCommentTrivia,
                underlyingText, underlyingTextStart + absoluteStartIndex, width);
        }

        private scanSingleLineCommentTriviaLength(): number {
            this.slidingWindow.moveToNextItem();
            this.slidingWindow.moveToNextItem();

            // The '2' is for the "//" we consumed.
            var width = 2;
            while (true) {
                if (this.slidingWindow.isAtEndOfSource() || this.isNewLineCharacter(this.currentCharCode())) {
                    return width;
                }

                this.slidingWindow.moveToNextItem();
                width++;
            }
        }

        private scanMultiLineCommentTrivia(underlyingText: ISimpleText, underlyingTextStart: number): ISyntaxTrivia {
            var absoluteStartIndex = this.absoluteIndex();
            var width = this.scanMultiLineCommentTriviaLength(null);

            return Syntax.deferredTrivia(SyntaxKind.MultiLineCommentTrivia,
                underlyingText, underlyingTextStart + absoluteStartIndex, width);
        }

        private scanMultiLineCommentTriviaLength(diagnostics: Diagnostic[]): number {
            this.slidingWindow.moveToNextItem();
            this.slidingWindow.moveToNextItem();

            // The '2' is for the "/*" we consumed.
            var width = 2;
            while (true) {
                if (this.slidingWindow.isAtEndOfSource()) {
                    if (diagnostics !== null) {
                        diagnostics.push(new Diagnostic(
                            this.fileName,
                            this.text.lineMap(),
                            this.slidingWindow.absoluteIndex(), 0, DiagnosticCode.AsteriskSlash_expected, null));
                    }

                    return width;
                }

                var ch = this.currentCharCode();
                if (ch === CharacterCodes.asterisk && this.slidingWindow.peekItemN(1) === CharacterCodes.slash) {
                    this.slidingWindow.moveToNextItem();
                    this.slidingWindow.moveToNextItem();
                    width += 2;
                    return width;
                }

                this.slidingWindow.moveToNextItem();
                width++;
            }
        }

        private scanLineTerminatorSequenceTrivia(ch: number): ISyntaxTrivia {
            var absoluteStartIndex = this.slidingWindow.getAndPinAbsoluteIndex();
            var width = this.scanLineTerminatorSequenceLength(ch);

            var text = this.substring(absoluteStartIndex, absoluteStartIndex + width, /*intern:*/ false);
            this.slidingWindow.releaseAndUnpinAbsoluteIndex(absoluteStartIndex);

            return Syntax.trivia(SyntaxKind.NewLineTrivia, text);
        }

        private scanLineTerminatorSequenceLength(ch: number): number {
            // Consume the first of the line terminator we saw.
            this.slidingWindow.moveToNextItem();

            // If it happened to be a \r and there's a following \n, then consume both.
            if (ch === CharacterCodes.carriageReturn && this.currentCharCode() === CharacterCodes.lineFeed) {
                this.slidingWindow.moveToNextItem();
                return 2;
            }
            else {
                return 1;
            }
        }

        private scanSyntaxToken(diagnostics: Diagnostic[], allowRegularExpression: boolean): SyntaxKind {
            if (this.slidingWindow.isAtEndOfSource()) {
                return SyntaxKind.EndOfFileToken;
            }

            var character = this.currentCharCode();

            switch (character) {
                case CharacterCodes.doubleQuote:
                case CharacterCodes.singleQuote:
                    return this.scanStringLiteral(diagnostics);

                // These are the set of variable width punctuation tokens.
                case CharacterCodes.slash:
                    return this.scanSlashToken(allowRegularExpression);

                case CharacterCodes.dot:
                    return this.scanDotToken(diagnostics);

                case CharacterCodes.minus:
                    return this.scanMinusToken();

                case CharacterCodes.exclamation:
                    return this.scanExclamationToken();

                case CharacterCodes.equals:
                    return this.scanEqualsToken();

                case CharacterCodes.bar:
                    return this.scanBarToken();

                case CharacterCodes.asterisk:
                    return this.scanAsteriskToken();

                case CharacterCodes.plus:
                    return this.scanPlusToken();

                case CharacterCodes.percent:
                    return this.scanPercentToken();

                case CharacterCodes.ampersand:
                    return this.scanAmpersandToken();

                case CharacterCodes.caret:
                    return this.scanCaretToken();

                case CharacterCodes.lessThan:
                    return this.scanLessThanToken();

                // These are the set of fixed, single character length punctuation tokens.
                // The token kind does not depend on what follows.
                case CharacterCodes.greaterThan:
                    return this.advanceAndSetTokenKind(SyntaxKind.GreaterThanToken);

                case CharacterCodes.comma:
                    return this.advanceAndSetTokenKind(SyntaxKind.CommaToken);

                case CharacterCodes.colon:
                    return this.advanceAndSetTokenKind(SyntaxKind.ColonToken);

                case CharacterCodes.semicolon:
                    return this.advanceAndSetTokenKind(SyntaxKind.SemicolonToken);

                case CharacterCodes.tilde:
                    return this.advanceAndSetTokenKind(SyntaxKind.TildeToken);

                case CharacterCodes.openParen:
                    return this.advanceAndSetTokenKind(SyntaxKind.OpenParenToken);

                case CharacterCodes.closeParen:
                    return this.advanceAndSetTokenKind(SyntaxKind.CloseParenToken);

                case CharacterCodes.openBrace:
                    return this.advanceAndSetTokenKind(SyntaxKind.OpenBraceToken);

                case CharacterCodes.closeBrace:
                    return this.advanceAndSetTokenKind(SyntaxKind.CloseBraceToken);

                case CharacterCodes.openBracket:
                    return this.advanceAndSetTokenKind(SyntaxKind.OpenBracketToken);

                case CharacterCodes.closeBracket:
                    return this.advanceAndSetTokenKind(SyntaxKind.CloseBracketToken);

                case CharacterCodes.question:
                    return this.advanceAndSetTokenKind(SyntaxKind.QuestionToken);
            }

            if (isNumericLiteralStart[character]) {
                return this.scanNumericLiteral(diagnostics);
            }

            // We run into so many identifiers (and keywords) when scanning, that we want the code to
            // be as fast as possible.  To that end, we have an extremely fast path for scanning that
            // handles the 99.9% case of no-unicode characters and no unicode escapes.
            if (isIdentifierStartCharacter[character]) {
                var result = this.tryFastScanIdentifierOrKeyword(character);
                if (result !== SyntaxKind.None) {
                    return result;
                }
            }

            if (this.isIdentifierStart(this.peekCharOrUnicodeEscape())) {
                return this.slowScanIdentifierOrKeyword(diagnostics);
            }

            return this.scanDefaultCharacter(character, diagnostics);
        }

        private isIdentifierStart(interpretedChar: number): boolean {
            if (isIdentifierStartCharacter[interpretedChar]) {
                return true;
            }

            return interpretedChar > CharacterCodes.maxAsciiCharacter && Unicode.isIdentifierStart(interpretedChar, this._languageVersion);
        }

        private isIdentifierPart(interpretedChar: number): boolean {
            if (isIdentifierPartCharacter[interpretedChar]) {
                return true;
            }

            return interpretedChar > CharacterCodes.maxAsciiCharacter && Unicode.isIdentifierPart(interpretedChar, this._languageVersion);
        }

        private tryFastScanIdentifierOrKeyword(firstCharacter: number): SyntaxKind {
            var slidingWindow = this.slidingWindow;
            var window: number[] = slidingWindow.window;

            var startIndex = slidingWindow.currentRelativeItemIndex;
            var endIndex = slidingWindow.windowCount;
            var currentIndex = startIndex;
            var character: number = 0;

            // Note that we go up to the windowCount-1 so that we can read the character at the end
            // of the window and check if it's *not* an identifier part character.
            while (currentIndex < endIndex) {
                character = window[currentIndex];
                if (!isIdentifierPartCharacter[character]) {
                    break;
                }

                currentIndex++;
            }

            if (currentIndex === endIndex) {
                // We reached the end of the characters in the sliding window.  They were all 
                // identifier characters.  Since we don't know what the next character is, we can't
                // tell what we've got here.  So just bail out to the slow path.
                return SyntaxKind.None;
            }
            else if (character === CharacterCodes.backslash || character > CharacterCodes.maxAsciiCharacter) {
                // We saw a \ (which could start a unicode escape), or we saw a unicode character.
                // This can't be scanned quickly.  Don't update the window position and just bail out
                // to the slow path.
                return SyntaxKind.None;
            }
            else {
                // Saw an ascii character that wasn't a backslash and wasn't an identifier 
                // character.  This identifier is done.

                // Also check if it a keyword if it started with a lowercase letter.
                var kind: SyntaxKind;
                var identifierLength = currentIndex - startIndex;
                if (isKeywordStartCharacter[firstCharacter]) {
                    kind = ScannerUtilities.identifierKind(window, startIndex, identifierLength);
                }
                else {
                    kind = SyntaxKind.IdentifierName;
                }

                // Now, update the position of the sliding window so it's pointing at the right place.
                slidingWindow.setAbsoluteIndex(slidingWindow.absoluteIndex() + identifierLength);

                return kind;
            }
        }

        // A slow path for scanning identifiers.  Called when we run into a unicode character or 
        // escape sequence while processing the fast path.
        private slowScanIdentifierOrKeyword(diagnostics: Diagnostic[]): SyntaxKind {
            var startIndex = this.slidingWindow.absoluteIndex();
            var sawUnicodeEscape = false;

            do {
                var unicodeEscape = this.scanCharOrUnicodeEscape(diagnostics);
                sawUnicodeEscape = sawUnicodeEscape || unicodeEscape;
            }
            while (this.isIdentifierPart(this.peekCharOrUnicodeEscape()));

            // From ES6 specification.
            // The ReservedWord definitions are specified as literal sequences of Unicode 
            // characters.However, any Unicode character in a ReservedWord can also be 
            // expressed by a \ UnicodeEscapeSequence that expresses that same Unicode 
            // character's code point.Use of such escape sequences does not change the meaning 
            // of the ReservedWord.
            //
            // i.e. "\u0076ar" is the keyword 'var'.  Check for that here.
            var length = this.slidingWindow.absoluteIndex() - startIndex;
            var text = this.text.substr(startIndex, length, /*intern:*/ false);
            var valueText = Syntax.massageEscapes(text);

            var keywordKind = SyntaxFacts.getTokenKind(valueText);
            if (keywordKind >= SyntaxKind.FirstKeyword && keywordKind <= SyntaxKind.LastKeyword) {
                if (sawUnicodeEscape) {
                    return keywordKind | SyntaxConstants.IsVariableWidthKeyword;
                }
                else {
                    return keywordKind;
                }
            }

            return SyntaxKind.IdentifierName;
        }

        private scanNumericLiteral(diagnostics: Diagnostic[]): SyntaxKind {
            if (this.isHexNumericLiteral()) {
                this.scanHexNumericLiteral();
            }
            else if (this.isOctalNumericLiteral()) {
                this.scanOctalNumericLiteral(diagnostics);
            }
            else {
                this.scanDecimalNumericLiteral();
            }

            return SyntaxKind.NumericLiteral;
        }

        private isOctalNumericLiteral(): boolean {
            return this.currentCharCode() === CharacterCodes._0 && CharacterInfo.isOctalDigit(this.slidingWindow.peekItemN(1));
        }

        private scanOctalNumericLiteral(diagnostics: Diagnostic[]): void {
            var position = this.absoluteIndex();

            while (CharacterInfo.isOctalDigit(this.currentCharCode())) {
                this.slidingWindow.moveToNextItem();
            }

            if (this.languageVersion() >= LanguageVersion.EcmaScript5) {
                diagnostics.push(new Diagnostic(this.fileName, this.text.lineMap(),
                    position, this.absoluteIndex() - position, DiagnosticCode.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher, null));
            }
        }

        private scanDecimalDigits(): void {
            while (CharacterInfo.isDecimalDigit(this.currentCharCode())) {
                this.slidingWindow.moveToNextItem();
            }
        }

        private scanDecimalNumericLiteral(): void {
            this.scanDecimalDigits();

            if (this.currentCharCode() === CharacterCodes.dot) {
                this.slidingWindow.moveToNextItem();
            }

            this.scanDecimalDigits();

            // If we see an 'e' or 'E' we should only consume it if its of the form:
            // e<number> or E<number> 
            // e+<number>   E+<number>
            // e-<number>   E-<number>
            var ch = this.currentCharCode();
            if (ch === CharacterCodes.e || ch === CharacterCodes.E) {
                // Ok, we've got 'e' or 'E'.  Make sure it's followed correctly.
                var nextChar1 = this.slidingWindow.peekItemN(1);

                if (CharacterInfo.isDecimalDigit(nextChar1)) {
                    // e<number> or E<number>
                    // Consume 'e' or 'E' and the number portion.
                    this.slidingWindow.moveToNextItem();
                    this.scanDecimalDigits();
                }
                else if (nextChar1 === CharacterCodes.minus || nextChar1 === CharacterCodes.plus) {
                    // e+ or E+ or e- or E-
                    var nextChar2 = this.slidingWindow.peekItemN(2);
                    if (CharacterInfo.isDecimalDigit(nextChar2)) {
                        // e+<number> or E+<number> or e-<number> or E-<number>
                        // Consume first two characters and the number portion.
                        this.slidingWindow.moveToNextItem();
                        this.slidingWindow.moveToNextItem();
                        this.scanDecimalDigits();
                    }
                }
            }
        }

        private scanHexNumericLiteral(): void {
            // Debug.assert(this.isHexNumericLiteral());

            // Move past the 0x.
            this.slidingWindow.moveToNextItem();
            this.slidingWindow.moveToNextItem();

            while (CharacterInfo.isHexDigit(this.currentCharCode())) {
                this.slidingWindow.moveToNextItem();
            }
        }

        private isHexNumericLiteral(): boolean {
            if (this.currentCharCode() === CharacterCodes._0) {
                var ch = this.slidingWindow.peekItemN(1);

                if (ch === CharacterCodes.x || ch === CharacterCodes.X) {
                    ch = this.slidingWindow.peekItemN(2);

                    return CharacterInfo.isHexDigit(ch);
                }
            }

            return false;
        }

        private advanceAndSetTokenKind(kind: SyntaxKind): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            return kind;
        }

        private scanLessThanToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.LessThanEqualsToken;
            }
            else if (this.currentCharCode() === CharacterCodes.lessThan) {
                this.slidingWindow.moveToNextItem();
                if (this.currentCharCode() === CharacterCodes.equals) {
                    this.slidingWindow.moveToNextItem();
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

        private scanBarToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.BarEqualsToken;
            }
            else if (this.currentCharCode() === CharacterCodes.bar) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.BarBarToken;
            }
            else {
                return SyntaxKind.BarToken;
            }
        }

        private scanCaretToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.CaretEqualsToken;
            }
            else {
                return SyntaxKind.CaretToken;
            }
        }

        private scanAmpersandToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            var character = this.currentCharCode();
            if (character === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.AmpersandEqualsToken;
            }
            else if (this.currentCharCode() === CharacterCodes.ampersand) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.AmpersandAmpersandToken;
            }
            else {
                return SyntaxKind.AmpersandToken;
            }
        }

        private scanPercentToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.PercentEqualsToken;
            }
            else {
                return SyntaxKind.PercentToken;
            }
        }

        private scanMinusToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            var character = this.currentCharCode();

            if (character === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.MinusEqualsToken;
            }
            else if (character === CharacterCodes.minus) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.MinusMinusToken;
            }
            else {
                return SyntaxKind.MinusToken;
            }
        }

        private scanPlusToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            var character = this.currentCharCode();
            if (character === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.PlusEqualsToken;
            }
            else if (character === CharacterCodes.plus) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.PlusPlusToken;
            }
            else {
                return SyntaxKind.PlusToken;
            }
        }

        private scanAsteriskToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.AsteriskEqualsToken;
            }
            else {
                return SyntaxKind.AsteriskToken;
            }
        }

        private scanEqualsToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            var character = this.currentCharCode();
            if (character === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();

                if (this.currentCharCode() === CharacterCodes.equals) {
                    this.slidingWindow.moveToNextItem();

                    return SyntaxKind.EqualsEqualsEqualsToken;
                }
                else {
                    return SyntaxKind.EqualsEqualsToken;
                }
            }
            else if (character === CharacterCodes.greaterThan) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.EqualsGreaterThanToken;
            }
            else {
                return SyntaxKind.EqualsToken;
            }
        }

        private isDotPrefixedNumericLiteral(): boolean {
            if (this.currentCharCode() === CharacterCodes.dot) {
                var ch = this.slidingWindow.peekItemN(1);
                return CharacterInfo.isDecimalDigit(ch);
            }

            return false;
        }

        private scanDotToken(diagnostics: Diagnostic[]): SyntaxKind {
            if (this.isDotPrefixedNumericLiteral()) {
                return this.scanNumericLiteral(diagnostics);
            }

            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.dot &&
                this.slidingWindow.peekItemN(1) === CharacterCodes.dot) {

                this.slidingWindow.moveToNextItem();
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.DotDotDotToken;
            }
            else {
                return SyntaxKind.DotToken;
            }
        }

        private scanSlashToken(allowRegularExpression: boolean): SyntaxKind {
            // NOTE: By default, we do not try scanning a / as a regexp here.  We instead consider it a
            // div or div-assign.  Later on, if the parser runs into a situation where it would like a 
            // term, and it sees one of these then it may restart us asking specifically if we could 
            // scan out a regex.
            if (allowRegularExpression) {
                var result = this.tryScanRegularExpressionToken();
                if (result !== SyntaxKind.None) {
                    return result;
                }
            }

            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();
                return SyntaxKind.SlashEqualsToken;
            }
            else {
                return SyntaxKind.SlashToken;
            }
        }

        private tryScanRegularExpressionToken(): SyntaxKind {
            // Debug.assert(this.currentCharCode() === CharacterCodes.slash);

            var startIndex = this.slidingWindow.getAndPinAbsoluteIndex();

            this.slidingWindow.moveToNextItem();

            var inEscape = false;
            var inCharacterClass = false;
            while (true) {
                var ch = this.currentCharCode();

                if (this.isNewLineCharacter(ch) || this.slidingWindow.isAtEndOfSource()) {
                    this.slidingWindow.rewindToPinnedIndex(startIndex);
                    this.slidingWindow.releaseAndUnpinAbsoluteIndex(startIndex);
                    return SyntaxKind.None;
                }

                this.slidingWindow.moveToNextItem();
                if (inEscape) {
                    inEscape = false;
                    continue;
                }

                switch (ch) {
                    case CharacterCodes.backslash:
                        // We're now in an escape.  Consume the next character we see (unless it's
                        // a newline or null.
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
            while (isIdentifierPartCharacter[this.currentCharCode()]) {
                this.slidingWindow.moveToNextItem();
            }

            this.slidingWindow.releaseAndUnpinAbsoluteIndex(startIndex);
            return SyntaxKind.RegularExpressionLiteral;
        }

        private scanExclamationToken(): SyntaxKind {
            this.slidingWindow.moveToNextItem();
            if (this.currentCharCode() === CharacterCodes.equals) {
                this.slidingWindow.moveToNextItem();

                if (this.currentCharCode() === CharacterCodes.equals) {
                    this.slidingWindow.moveToNextItem();

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

        private scanDefaultCharacter(character: number, diagnostics: Diagnostic[]): SyntaxKind {
            var position = this.slidingWindow.absoluteIndex();
            this.slidingWindow.moveToNextItem();

            var text = String.fromCharCode(character);
            var messageText = this.getErrorMessageText(text);
            diagnostics.push(new Diagnostic(this.fileName, this.text.lineMap(),
                position, 1, DiagnosticCode.Unexpected_character_0, [messageText]));

            return SyntaxKind.ErrorToken;
        }

        // Convert text into a printable form usable for an error message.  This will both quote the 
        // string, and ensure all characters printable (i.e. by using unicode escapes when they're not).
        private getErrorMessageText(text: string): string {
            // For just a simple backslash, we return it as is.  The default behavior of JSON.stringify
            // is not what we want here.
            if (text === "\\") {
                return '"\\"';
            }

            return JSON.stringify(text);
        }

        private skipEscapeSequence(diagnostics: Diagnostic[]): void {
            // Debug.assert(this.currentCharCode() === CharacterCodes.backslash);

            var rewindPoint = this.slidingWindow.getAndPinAbsoluteIndex();

            // Consume the backslash.
            this.slidingWindow.moveToNextItem();

            // Get the char after the backslash
            var ch = this.currentCharCode();
            this.slidingWindow.moveToNextItem();
            switch (ch) {
                case CharacterCodes.x:
                case CharacterCodes.u:
                    this.slidingWindow.rewindToPinnedIndex(rewindPoint);
                    var value = this.scanUnicodeOrHexEscape(diagnostics);
                    break;

                case CharacterCodes.carriageReturn:
                    // If it's \r\n then consume both characters.
                    if (this.currentCharCode() === CharacterCodes.lineFeed) {
                        this.slidingWindow.moveToNextItem();
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

            this.slidingWindow.releaseAndUnpinAbsoluteIndex(rewindPoint);
        }

        private scanStringLiteral(diagnostics: Diagnostic[]): SyntaxKind {
            var quoteCharacter = this.currentCharCode();

            // Debug.assert(quoteCharacter === CharacterCodes.singleQuote || quoteCharacter === CharacterCodes.doubleQuote);

            this.slidingWindow.moveToNextItem();

            while (true) {
                var ch = this.currentCharCode();
                if (ch === CharacterCodes.backslash) {
                    this.skipEscapeSequence(diagnostics);
                }
                else if (ch === quoteCharacter) {
                    this.slidingWindow.moveToNextItem();
                    break;
                }
                else if (this.isNewLineCharacter(ch) || this.slidingWindow.isAtEndOfSource()) {
                    diagnostics.push(new Diagnostic(this.fileName, this.text.lineMap(),
                        MathPrototype.min(this.slidingWindow.absoluteIndex(), this.text.length()), 1, DiagnosticCode.Missing_close_quote_character, null));
                    break;
                }
                else {
                    this.slidingWindow.moveToNextItem();
                }
            }

            return SyntaxKind.StringLiteral;
        }

        private isUnicodeEscape(character: number): boolean {
            if (character === CharacterCodes.backslash) {
                var ch2 = this.slidingWindow.peekItemN(1);
                if (ch2 === CharacterCodes.u) {
                    return true;
                }
            }

            return false;
        }

        private peekCharOrUnicodeEscape(): number {
            var character = this.currentCharCode();
            if (this.isUnicodeEscape(character)) {
                return this.peekUnicodeOrHexEscape();
            }
            else {
                return character;
            }
        }

        private peekUnicodeOrHexEscape(): number {
            var startIndex = this.slidingWindow.getAndPinAbsoluteIndex();

            // if we're peeking, then we don't want to change the position
            var ch = this.scanUnicodeOrHexEscape(/*errors:*/ null);

            this.slidingWindow.rewindToPinnedIndex(startIndex);
            this.slidingWindow.releaseAndUnpinAbsoluteIndex(startIndex);

            return ch;
        }

        // Returns true if this was a unicode escape.
        private scanCharOrUnicodeEscape(errors: Diagnostic[]): boolean {
            var ch = this.currentCharCode();
            if (ch === CharacterCodes.backslash) {
                var ch2 = this.slidingWindow.peekItemN(1);
                if (ch2 === CharacterCodes.u) {
                    this.scanUnicodeOrHexEscape(errors);
                    return true;
                }
            }

            this.slidingWindow.moveToNextItem();
            return false;
        }

        private scanUnicodeOrHexEscape(errors: Diagnostic[]): number {
            var start = this.slidingWindow.absoluteIndex();
            var character = this.currentCharCode();
            // Debug.assert(character === CharacterCodes.backslash);
            this.slidingWindow.moveToNextItem();

            character = this.currentCharCode();
            // Debug.assert(character === CharacterCodes.u || character === CharacterCodes.x);

            var intChar = 0;
            this.slidingWindow.moveToNextItem();

            var count = character === CharacterCodes.u ? 4 : 2;

            for (var i = 0; i < count; i++) {
                var ch2 = this.currentCharCode();
                if (!CharacterInfo.isHexDigit(ch2)) {
                    if (errors !== null) {
                        var end = this.slidingWindow.absoluteIndex();
                        var info = this.createIllegalEscapeDiagnostic(start, end);
                        errors.push(info);
                    }

                    break;
                }

                intChar = (intChar << 4) + CharacterInfo.hexValue(ch2);
                this.slidingWindow.moveToNextItem();
            }

            return intChar;
        }

        public substring(start: number, end: number, intern: boolean): string {
            var length = end - start;
            var offset = start - this.slidingWindow.windowAbsoluteStartIndex;

            // Debug.assert(offset >= 0);
            if (intern) {
                return Collections.DefaultStringTable.addCharArray(this.slidingWindow.window, offset, length);
            }
            else {
                return StringUtilities.fromCharCodeArray(<number[]>this.slidingWindow.window.slice(offset, offset + length));
            }
        }

        private createIllegalEscapeDiagnostic(start: number, end: number): Diagnostic {
            return new Diagnostic(this.fileName, this.text.lineMap(),start, end - start,
                DiagnosticCode.Unrecognized_escape_sequence, null);
        }

        public static isValidIdentifier(text: ISimpleText, languageVersion: LanguageVersion): boolean {
            var scanner = new Scanner(/*fileName:*/ null, text, languageVersion, Scanner.triviaWindow);
            var errors = new Array<Diagnostic>();
            var token = scanner.scan(errors, false);

            return errors.length === 0 && SyntaxFacts.isIdentifierNameOrAnyKeyword(token) && token.width() === text.length();
        }
    }
}