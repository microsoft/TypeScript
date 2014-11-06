///<reference path='references.ts' />

module TypeScript.Parser {
    // Interface that represents the source that the parser pulls tokens from.  Essentially, this 
    // is the interface that the parser needs an underlying scanner to provide.  This allows us to
    // separate out "what" the parser does with the tokens it retrieves versus "how" it obtains
    // the tokens.  i.e. all the logic for parsing language constructs sits in ParserImpl, while 
    // all the logic for retrieving tokens sits in individual IParserSources.
    //
    // By separating out this interface, we also make incremental parsing much easier.  Instead of
    // having the parser directly sit on top of the scanner, we sit it on this abstraction.  Then
    // in incremental scenarios, we can use the IncrementalParserSource to pull tokens (or even 
    // full nodes) from the previous tree when possible.  Of course, we'll still end up using a 
    // scanner for new text.  But that can all happen inside the source, with none of the logic in
    // the parser having to be aware of it.
    //
    // In general terms, a parser source represents a position within a text.  At that position, 
    // one can ask for the 'currentToken' that the source is pointing at.  Then, once the parser 
    // consumes that token it can ask the source to 'moveToNextToken'.
    //
    // Additional special abilities include:
    //  1) Being able to peek an arbitrary number of tokens ahead efficiently.
    //  2) Being able to retrieve fully parsed nodes from the source, not just tokens. This happens
    //     in incremental scenarios when the source is certain that the node is completley safe to
    //     reuse.
    //  3) Being able to get a 'rewind point' to the current location.  This allows the parser to
    //     speculatively parse as much as it wants, and then reset itself back to that point, 
    //     ensuring that no state changes that occurred after getting the 'rewing point' are 
    //     observable.
    //  4) Being able to reinterpret the current token being pointed at as a regular expression 
    //     token.  This is necessary as the scanner does not have enough information to correctly
    //     distinguish "/" or "/=" as divide tokens, versus "/..../" as a regex token.  If the 
    //     parser sees a "/" in a place where a divide is not allowed, but a regex would be, then
    //     it can call into the source and ask if a regex token could be returned instead.  The 
    //     sources are smart enough to do that and not be affected by any additional work they may
    //     have done when they originally scanned that token.
    export interface IParserSource {
        // The text we are parsing.
        text: ISimpleText;

        // the name of the file we're parsing.
        fileName: string;

        // The version of the language we're using while parsing.  Does not affect the final tree,
        // but can affect the diagnostics produced while parsing.
        languageVersion: ts.ScriptTarget;

        // The current syntax node the source is pointing at.  Only available in incremental settings.
        // The source can point at a node if that node doesn't intersect any of the text changes in
        // the file, and doesn't contain certain unacceptable constructs.  For example, if the node
        // contains skipped text, then it will not be reused.
        currentNode(): ISyntaxNode;

        // The current token the source is pointing at.
        currentToken(): ISyntaxToken;

        // The current token reinterpretted contextually based on where the parser is.  If the
        // source is on a / or /= token, then it can be reinterpretted as a regex token.  If the
        // source is on a > token, it may be reinterpretted to: >>  >>>  >=  >>=  >>>=
        currentContextualToken(): ISyntaxToken;

        // Peek any number of tokens ahead from the current location in source.  peekToken(0) is
        // equivalent to 'currentToken', peekToken(1) is the next token, peekToken(2) the token
        // after that, etc.  If the caller peeks past the end of the text, then EndOfFile tokens
        // will be returned.
        peekToken(n: number): ISyntaxToken;

        // Called to move the source to the next node or token once the parser has consumed the 
        // current one.
        consumeNode(node: ISyntaxNode): void;
        consumeToken(token: ISyntaxToken): void;

        // Gets a rewind point that the parser can use to move back to after it speculatively 
        // parses something.  The source guarantees that if the parser calls 'rewind' with that 
        // point that it will be mostly in the same state that it was in when 'getRewindPoint'
        // was called.  i.e. calling currentToken, peekToken, tokenDiagnostics, etc. will result
        // in the same values.  One allowed exemption to this is 'currentNode'.  If a rewind point
        // is requested and rewound, then getting the currentNode may not be possible.  However,
        // as this is purely a performance optimization, it will not affect correctness.
        //
        // Note: that rewind points are not free (but they should also not be too expensive).  So
        // they should be used judiciously.  While a rewind point is held by the parser, the source
        // is not free to do things that it would normally do.  For example, it cannot throw away
        // tokens that it has scanned on or after the rewind point as it must keep them alive for
        // the parser to move back to.
        //
        // Rewind points also work in a stack fashion.  The first rewind point given out must be
        // the last rewind point released.  Do not release them out of order, or bad things can 
        // happen.
        //
        // Do *NOT* forget to release a rewind point.  Always put them in a finally block to ensure
        // that they are released.  If they are not released, things will still work, you will just
        // consume far more memory than necessary.
        getRewindPoint(): IRewindPoint;

        // Rewinds the source to the position and state it was at when this rewind point was created.
        // This does not need to be called if the parser decides it does not need to rewind.  For 
        // example, the parser may speculatively parse out a lambda expression when it sees something
        // ambiguous like "(a = b, c = ...".  If it succeeds parsing that as a lambda, then it will
        // just return that result.  However, if it fails *then* it will rewind and try it again as
        // a parenthesized expression.  
        rewind(rewindPoint: IRewindPoint): void;

        // Called when the parser is done speculative parsing and no longer needs the rewind point.
        // Must be called for every rewind point retrived.
        releaseRewindPoint(rewindPoint: IRewindPoint): void;

        // Retrieves the diagnostics generated while the source was producing nodes or tokens. 
        // Should generally only be called after the document has been completely parsed.
        tokenDiagnostics(): Diagnostic[];

        release(): void;
    }

    // Information the parser needs to effectively rewind.
    export interface IRewindPoint {
    }

    interface IParserRewindPoint extends IRewindPoint {
        // As we speculatively parse, we may build up diagnostics.  When we rewind we want to 
        // 'forget' that information.In order to do that we store the count of diagnostics and 
        // when we start speculating, and we reset to that count when we're done.  That way the
        // speculative parse does not affect any further results.
        diagnosticsCount: number;

        // As we speculatively parse we may end up adding additional skipped tokens to the 
        // _skippedTokens array in the parser.  When we rewind we don't want those items in the 
        // array.  We may also, during speculative parsing, attach our skipped tokens to some
        // new token.  When we rewind we need to restore whatever skipped tokens we started with.
        skippedTokens: ISyntaxToken[];

        // isInStrictMode and listParsingState should not have to be tracked by a rewind point.
        // Because they are naturally mutated and restored based on the normal stack movement of 
        // the parser, they should automatically return to whatever value they had to begin with
        // if the parser decides to rewind or not.  However, to ensure that this is true, we track
        // these variables and check if they have the same value when we're rewinding/releasing.
        isInStrictMode: boolean;
        listParsingState: ListParsingState;
    }

    // Contains the actual logic to parse typescript/javascript.  This is the code that generally
    // represents the logic necessary to handle all the language grammar constructs.  When the 
    // language changes, this should generally only be the place necessary to fix up.
    function createParseSyntaxTree(): (source: IParserSource, isDeclaration: boolean) => SyntaxTree {
        // Name of the file we're parsing.
        var fileName: string;

        // Underlying source where we pull nodes and tokens from.
        var source: IParserSource;

        var languageVersion: ts.ScriptTarget;

        // TODO: do we need to store/restore this when speculative parsing?  I don't think so.  The
        // parsing logic already handles storing/restoring this and should work properly even if we're
        // speculative parsing.
        var listParsingState: number = 0;

        // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
        // that some tokens that would be considered identifiers may be considered keywords.  When 
        // rewinding, we need to store and restore this as the mode may have changed.
        //
        // TODO: do we need to store/restore this when speculative parsing?  I don't think so.  The
        // parsing logic already handles storing/restoring this and should work properly even if we're
        // speculative parsing.
        var isInStrictMode: boolean = false;

        // Current state of the parser.  If we need to rewind we will store and reset these values as
        // appropriate.

        // Diagnostics created when parsing invalid code.  Any diagnosics created when speculative 
        // parsing need to removed when rewinding.  To do this we store the count of diagnostics when 
        // we start speculative parsing.  And if we rewind, we restore this to the same count that we 
        // started at.
        var diagnostics: Diagnostic[] = [];

        var parseNodeData: number = 0;

        var _skippedTokens: ISyntaxToken[] = undefined;

        function parseSyntaxTree(_source: IParserSource, isDeclaration: boolean): SyntaxTree {
            // First, set up our state.
            fileName = _source.fileName;
            source = _source;
            languageVersion = source.languageVersion;

            // Now actually parse the tree.
            var result = parseSyntaxTreeWorker(isDeclaration);

            // Now, clear out our state so that our singleton parser doesn't keep things alive.
            diagnostics = [];
            parseNodeData = SyntaxConstants.None;
            fileName = undefined;
            source.release();
            source = undefined;
            _source = undefined;

            return result;
        }

        function parseSyntaxTreeWorker(isDeclaration: boolean): SyntaxTree {
            var sourceUnit = parseSourceUnit();

            var allDiagnostics = source.tokenDiagnostics().concat(diagnostics);
            allDiagnostics.sort((a: Diagnostic, b: Diagnostic) => a.start() - b.start());

            return new SyntaxTree(sourceUnit, isDeclaration, allDiagnostics, fileName, source.text, languageVersion);
        }

        function getRewindPoint(): IParserRewindPoint {
            var rewindPoint = <IParserRewindPoint>source.getRewindPoint();

            // See the comments in IParserRewindPoint for the explanation on why we need to store
            // this data, and what it is used for.
            rewindPoint.diagnosticsCount = diagnostics.length;
            rewindPoint.skippedTokens = _skippedTokens ? _skippedTokens.slice(0) : undefined;

            // Values we keep around for debug asserting purposes.
            rewindPoint.isInStrictMode = isInStrictMode;
            rewindPoint.listParsingState = listParsingState;

            return rewindPoint;
        }

        function rewind(rewindPoint: IParserRewindPoint): void {
            source.rewind(rewindPoint);

            diagnostics.length = rewindPoint.diagnosticsCount;
            _skippedTokens = rewindPoint.skippedTokens;
        }

        function releaseRewindPoint(rewindPoint: IParserRewindPoint): void {
            // Debug.assert(listParsingState === rewindPoint.listParsingState);
            // Debug.assert(isInStrictMode === rewindPoint.isInStrictMode);

            source.releaseRewindPoint(rewindPoint);
        }

        function currentNode(): ISyntaxNode {
            // If we have any outstanding tokens, then don't reuse a node.  
            // TODO(cyrusn): This may be too conservative.  Perhaps we could reuse hte node and
            // attach the skipped tokens in front?  For now though, being conservative is nice and
            // safe, and likely won't ever affect perf.
            if (_skippedTokens) {
                return null;
            }

            var node = source.currentNode();

            // We can only reuse a node if it was parsed under the same strict mode that we're 
            // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
            // the user added 'using strict' at the top of the file, then we can't use that node
            // again as the presense of strict mode may cause us to parse the tokens in the file
            // differetly.
            //
            // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
            // are unaffected by strict mode.  It's just the parser will decide what to do with it
            // differently depending on what mode it is in.
            if (!node || parsedInStrictMode(node) !== isInStrictMode) {
                return undefined;
            }

            return node;
        }

        function currentToken(): ISyntaxToken {
            return source.currentToken();
        }

        function currentContextualToken(): ISyntaxToken {
            // We're mutating the source here.  We are potentially overwriting the original token we
            // scanned with a regex token.  So we have to clear our state.
            return source.currentContextualToken();
        }

        function peekToken(n: number): ISyntaxToken {
            return source.peekToken(n);
        }

        function skipToken(token: ISyntaxToken): void {
            _skippedTokens = _skippedTokens || [];
            _skippedTokens.push(token);

            // directly tell the source to just consume the token we're skipping.  i.e. do not 
            // call 'consumeToken'.  Doing so would attempt to add any previous skipped tokens
            // to this token we're skipping.  We don't want to do that.  Instead, we want to add
            // all the skipped tokens when we finally eat the next good token.
            source.consumeToken(token)
        }

        function consumeToken(token: ISyntaxToken): ISyntaxToken {
            // Debug.assert(token.fullWidth() > 0 || token.kind === SyntaxKind.EndOfFileToken);

            // First, tell our source that the token has been consumed.
            source.consumeToken(token);

            // Now, if we had any skipped tokens, we want to add them to the start of this token
            // we're consuming.
            if (_skippedTokens) {
                token = addSkippedTokensBeforeToken(token, _skippedTokens);
                _skippedTokens = undefined;
            }

            return token;
        }

        function addSkippedTokensBeforeToken(token: ISyntaxToken, skippedTokens: ISyntaxToken[]): ISyntaxToken {
            //Debug.assert(token.fullWidth() > 0 || token.kind === SyntaxKind.EndOfFileToken);
            //Debug.assert(skippedTokens.length > 0);

            var leadingTrivia: ISyntaxTrivia[] = [];
            for (var i = 0, n = skippedTokens.length; i < n; i++) {
                var skippedToken = skippedTokens[i];
                addSkippedTokenToTriviaArray(leadingTrivia, skippedToken);
            }

            addTriviaTo(token.leadingTrivia(source.text), leadingTrivia);

            var updatedToken = Syntax.withLeadingTrivia(token, Syntax.triviaList(leadingTrivia), source.text);

            // We've prepending this token with new leading trivia.  This means the full start of
            // the token is not where the scanner originally thought it was, but is instead at the
            // start of the first skipped token.
            updatedToken.setFullStart(skippedTokens[0].fullStart());

            return updatedToken;
        }

        function addSkippedTokenToTriviaArray(array: ISyntaxTrivia[], skippedToken: ISyntaxToken): void {
            // Debug.assert(skippedToken.text().length > 0);

            // first, add the leading trivia of the skipped token to the array
            addTriviaTo(skippedToken.leadingTrivia(source.text), array);

            // now, add the text of the token as skipped text to the trivia array.
            var trimmedToken = Syntax.withTrailingTrivia(Syntax.withLeadingTrivia(skippedToken, Syntax.emptyTriviaList, source.text), Syntax.emptyTriviaList, source.text);

            // Because we removed the leading trivia from the skipped token, the full start of the
            // trimmed token is the start of the skipped token.
            trimmedToken.setFullStart(start(skippedToken, source.text));

            array.push(Syntax.skippedTokenTrivia(trimmedToken, source.text));

            // Finally, add the trailing trivia of the skipped token to the trivia array.
            addTriviaTo(skippedToken.trailingTrivia(source.text), array);
        }

        function addTriviaTo(list: ISyntaxTriviaList, array: ISyntaxTrivia[]): void {
            for (var i = 0, n = list.count(); i < n; i++) {
                array.push(list.syntaxTriviaAt(i));
            }
        }

        function consumeNode(node: ISyntaxNode): void {
            Debug.assert(_skippedTokens === undefined);
            source.consumeNode(node);
        }

        //this method is called very frequently
        //we should keep it simple so that it can be inlined.
        function eatToken(kind: SyntaxKind): ISyntaxToken {
            var token = currentToken();
            if (token.kind === kind) {
                return consumeToken(token);
            }

            //slow part of EatToken(SyntaxKind kind)
            return createMissingToken(kind, token);
        }

        // Eats the token if it is there.  Otherwise does nothing.  Will not report errors.
        function tryEatToken(kind: SyntaxKind): ISyntaxToken {
            var _currentToken = currentToken();
            if (_currentToken.kind === kind) {
                return consumeToken(_currentToken);
            }

            return undefined;
        }

        // An identifier is basically any word, unless it is a reserved keyword.  so 'foo' is an 
        // identifier and 'return' is not.  Note: a word may or may not be an identifier depending 
        // on the state of the parser.  For example, 'yield' is an identifier *unless* the parser 
        // is in strict mode.
        function isIdentifier(token: ISyntaxToken): boolean {
            var tokenKind = token.kind;

            if (tokenKind === SyntaxKind.IdentifierName) {
                return true;
            }

            // Keywords are only identifiers if they're FutureReservedStrictWords and we're in 
            // strict mode.  *Or* if it's a typescript 'keyword'. 
            if (tokenKind >= SyntaxKind.FirstFutureReservedStrictKeyword) {
                if (tokenKind <= SyntaxKind.LastFutureReservedStrictKeyword) {
                    // Could be a keyword or identifier.  It's an identifier if we're not in strict
                    // mode.
                    return !isInStrictMode;
                }

                // If it's typescript keyword, then it's actually a javascript identifier.
                return tokenKind <= SyntaxKind.LastTypeScriptKeyword;
            }

            // Anything else is not an identifier.
            return false;
        }

        // This method should be called when the grammar calls for an *IdentifierName* and not an
        // *Identifier*.
        function eatIdentifierNameToken(): ISyntaxToken {
            var token = currentToken();

            // If we have an identifier name, then consume and return it.
            var tokenKind = token.kind;
            if (tokenKind === SyntaxKind.IdentifierName) {
                return consumeToken(token);
            }

            // If we have a keyword, then it can be used as an identifier name.  However, we need 
            // to convert it to an identifier so that no later parts of the systems see it as a 
            // keyword.
            if (SyntaxFacts.isAnyKeyword(tokenKind)) {
                return TypeScript.Syntax.convertKeywordToIdentifier(consumeToken(token));
            }

            return createMissingToken(SyntaxKind.IdentifierName, token);
        }

        function eatOptionalIdentifierToken(): ISyntaxToken {
            return isIdentifier(currentToken()) ? eatIdentifierToken() : undefined;
        }

        // This method should be called when the grammar calls for an *Identifier* and not an
        // *IdentifierName*.
        function eatIdentifierToken(diagnosticCode?: string): ISyntaxToken {
            var token = currentToken();
            if (isIdentifier(token)) {
                if (token.kind === SyntaxKind.IdentifierName) {
                    return consumeToken(token);
                }

                return TypeScript.Syntax.convertKeywordToIdentifier(consumeToken(token));
            }

            return createMissingToken(SyntaxKind.IdentifierName, token, diagnosticCode);
        }

        function previousTokenHasTrailingNewLine(token: ISyntaxToken): boolean {
            var tokenFullStart = token.fullStart();
            if (tokenFullStart === 0) {
                // First token in the document.  Thus it has no 'previous' token, and there is 
                // no preceding newline.
                return false;
            }

            // If our previous token ended with a newline, then *by definition* we must have started
            // at the beginning of a line.  
            var lineNumber = source.text.lineMap().getLineNumberFromPosition(tokenFullStart);
            var lineStart = source.text.lineMap().getLineStartPosition(lineNumber);

            return lineStart == tokenFullStart;
        }

        function canEatAutomaticSemicolon(allowWithoutNewLine: boolean): boolean {
            var token = currentToken();

            // An automatic semicolon is always allowed if we're at the end of the file.
            var tokenKind = token.kind;
            if (tokenKind === SyntaxKind.EndOfFileToken) {
                return true;
            }

            // Or if the next token is a close brace (regardless of which line it is on).
            if (tokenKind === SyntaxKind.CloseBraceToken) {
                return true;
            }

            if (allowWithoutNewLine) {
                return true;
            }

            // It is also allowed if there is a newline between the last token seen and the next one.
            if (previousTokenHasTrailingNewLine(token)) {
                return true;
            }

            return false;
        }

        function canEatExplicitOrAutomaticSemicolon(allowWithoutNewline: boolean): boolean {
            var token = currentToken();

            if (token.kind === SyntaxKind.SemicolonToken) {
                return true;
            }

            return canEatAutomaticSemicolon(allowWithoutNewline);
        }

        function eatExplicitOrAutomaticSemicolon(allowWithoutNewline: boolean): ISyntaxToken {
            var token = currentToken();

            // If we see a semicolon, then we can definitely eat it.
            if (token.kind === SyntaxKind.SemicolonToken) {
                return consumeToken(token);
            }

            // Check if an automatic semicolon could go here.  If so, then there's no problem and
            // we can proceed without error.  Return 'undefined' as there's no actual token for this 
            // position. 
            if (canEatAutomaticSemicolon(allowWithoutNewline)) {
                return undefined;
            }

            // No semicolon could be consumed here at all.  Just call the standard eating function
            // so we get the token and the error for it.
            return eatToken(SyntaxKind.SemicolonToken);
        }

        function createMissingToken(expectedKind: SyntaxKind, actual: ISyntaxToken, diagnosticCode?: string): ISyntaxToken {
            var diagnostic = getExpectedTokenDiagnostic(expectedKind, actual, diagnosticCode);
            addDiagnostic(diagnostic);

            // The missing token will be at the full start of the current token.  That way empty tokens
            // will always be between real tokens and not inside an actual token.
            return Syntax.emptyToken(expectedKind);
        }

        function getExpectedTokenDiagnostic(expectedKind: SyntaxKind, actual?: ISyntaxToken, diagnosticCode?: string): Diagnostic {
            var token = currentToken();

            var args: any[] = undefined;
            // If a specialized diagnostic message was provided, just use that.
            if (!diagnosticCode) {
                // They wanted something specific, just report that that token was missing.
                if (SyntaxFacts.isAnyKeyword(expectedKind) || SyntaxFacts.isAnyPunctuation(expectedKind)) {
                    diagnosticCode = DiagnosticCode._0_expected;
                    args = [SyntaxFacts.getText(expectedKind)];
                }
                else {
                    // They wanted an identifier.

                    // If the user supplied a keyword, give them a specialized message.
                    if (actual && SyntaxFacts.isAnyKeyword(actual.kind)) {
                        diagnosticCode = DiagnosticCode.Identifier_expected_0_is_a_keyword;
                        args = [SyntaxFacts.getText(actual.kind)];
                    }
                    else {
                        // Otherwise just report that an identifier was expected.
                        diagnosticCode = DiagnosticCode.Identifier_expected;
                    }
                }
            }

            return new Diagnostic(fileName, source.text.lineMap(), start(token, source.text), width(token), diagnosticCode, args);
        }

        function getBinaryExpressionPrecedence(tokenKind: SyntaxKind): BinaryExpressionPrecedence {
            switch (tokenKind) {
                case SyntaxKind.BarBarToken:                return BinaryExpressionPrecedence.LogicalOrExpressionPrecedence;
                case SyntaxKind.AmpersandAmpersandToken:    return BinaryExpressionPrecedence.LogicalAndExpressionPrecedence;
                case SyntaxKind.BarToken:                   return BinaryExpressionPrecedence.BitwiseOrExpressionPrecedence;
                case SyntaxKind.CaretToken:                 return BinaryExpressionPrecedence.BitwiseExclusiveOrExpressionPrecedence;
                case SyntaxKind.AmpersandToken:             return BinaryExpressionPrecedence.BitwiseAndExpressionPrecedence;
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                    return BinaryExpressionPrecedence.EqualityExpressionPrecedence;
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.InstanceOfKeyword:
                case SyntaxKind.InKeyword:
                    return BinaryExpressionPrecedence.RelationalExpressionPrecedence;
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    return BinaryExpressionPrecedence.ShiftExpressionPrecdence;
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken: 
                    return BinaryExpressionPrecedence.AdditiveExpressionPrecedence;
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                    return BinaryExpressionPrecedence.MultiplicativeExpressionPrecedence;
            }

            throw Errors.invalidOperation();
        }

        function setStrictMode(_isInStrictMode: boolean) {
            isInStrictMode = _isInStrictMode;
            parseNodeData = _isInStrictMode ? SyntaxConstants.NodeParsedInStrictModeMask : 0;
        }

        function parseSourceUnit(): SourceUnitSyntax {
            // Note: saving and restoring the 'isInStrictMode' state is not really necessary here
            // (as it will never be read afterwards).  However, for symmetry with the rest of the
            // parsing code, we do the same here.
            var savedIsInStrictMode = isInStrictMode

            // Note: any skipped tokens produced after the end of all the module elements will be
            // added as skipped trivia to the start of the EOF token.
            var moduleElements = parseSyntaxList<IModuleElementSyntax>(ListParsingState.SourceUnit_ModuleElements, updateStrictModeState);
            
            setStrictMode(savedIsInStrictMode);
            
            var sourceUnit = new SourceUnitSyntax(parseNodeData, moduleElements, consumeToken(currentToken()));

            if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
                Debug.assert(fullWidth(sourceUnit) === source.text.length());

                if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                    Debug.assert(fullText(sourceUnit) === source.text.substr(0, source.text.length()));
                }
            }

            return sourceUnit;
        }

        function isDirectivePrologueElement(node: ISyntaxNodeOrToken): boolean {
            return node.kind === SyntaxKind.ExpressionStatement &&
                (<ExpressionStatementSyntax>node).expression.kind === SyntaxKind.StringLiteral;
        }

        function updateStrictModeState(items: any[]): void {
            if (!isInStrictMode) {
                // Check if all the items are directive prologue elements.
                for (var i = 0, n = items.length; i < n; i++) {
                    if (!isDirectivePrologueElement(items[i])) {
                        return;
                    }
                }

                setStrictMode(SyntaxFacts.isUseStrictDirective(items[items.length - 1]));
            }
        }

        function isModuleElement(inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isModuleElement(currentNode())) {
                return true;
            }

            var _modifierCount = modifierCount();
            return isInterfaceEnumClassModuleImportOrExport(_modifierCount) ||
                   isStatement(_modifierCount, inErrorRecovery);
        }

        function tryParseModuleElement(inErrorRecovery: boolean): IModuleElementSyntax {
            var node = currentNode();
            if (SyntaxUtilities.isModuleElement(node)) {
                consumeNode(node);
                return <IModuleElementSyntax>node;
            }

            var _currentToken = currentToken();
            var _modifierCount = modifierCount();

            if (_modifierCount) {
                // if we have modifiers, then these are definitely TS constructs and we can 
                // immediately start parsing them.
                switch (peekToken(_modifierCount).kind) {
                    case SyntaxKind.ImportKeyword: return parseImportDeclaration();
                    case SyntaxKind.ModuleKeyword: return parseModuleDeclaration();
                    case SyntaxKind.InterfaceKeyword: return parseInterfaceDeclaration();
                    case SyntaxKind.ClassKeyword: return parseClassDeclaration();
                    case SyntaxKind.EnumKeyword: return parseEnumDeclaration();
                }
            }

            // No modifiers.  If we see 'class, enum, import and export' we could technically 
            // aggressively consume them as they can't start another construct.  However, it's 
            // not uncommon in error recovery to run into a situation where we see those keywords,
            // but the code was using it as the name of an object property.  To avoid overzealously
            // consuming these, we only parse them out if we can see enough context to 'prove' that
            // they really do start the module element
            var nextToken = peekToken(1);
            var currentTokenKind = _currentToken.kind;
            switch (currentTokenKind) {
                case SyntaxKind.ModuleKeyword:
                    if (isIdentifier(nextToken) || nextToken.kind === SyntaxKind.StringLiteral) {
                        return parseModuleDeclaration();
                    }
                    break;

                case SyntaxKind.ImportKeyword:
                    if (isIdentifier(nextToken)) {
                        return parseImportDeclaration();
                    }
                    break;

                case SyntaxKind.ClassKeyword:
                    if (isIdentifier(nextToken)) {
                        return parseClassDeclaration();
                    }
                    break;

                case SyntaxKind.EnumKeyword:
                    if (isIdentifier(nextToken)) {
                        return parseEnumDeclaration();
                    }
                    break;

                case SyntaxKind.InterfaceKeyword:
                    if (isIdentifier(nextToken)) {
                        return parseInterfaceDeclaration();
                    }
                    break;

                case SyntaxKind.ExportKeyword:
                    // 'export' could be a modifier on a statement (like export var ...).  So we 
                    // only want to parse out an export assignment here if we actually see the equals.
                    if (nextToken.kind === SyntaxKind.EqualsToken) {
                        return parseExportAssignment();
                    }
                    break;
            }

            return tryParseStatementWorker(_currentToken, currentTokenKind, _modifierCount, inErrorRecovery);
        }

        function parseImportDeclaration(): ImportDeclarationSyntax {
            return new ImportDeclarationSyntax(parseNodeData,
                parseModifiers(), eatToken(SyntaxKind.ImportKeyword), eatIdentifierToken(), eatToken(SyntaxKind.EqualsToken), parseModuleReference(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseExportAssignment(): ExportAssignmentSyntax {
            return new ExportAssignmentSyntax(parseNodeData,
                eatToken(SyntaxKind.ExportKeyword), eatToken(SyntaxKind.EqualsToken), eatIdentifierToken(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseModuleReference(): IModuleReferenceSyntax {
            return isExternalModuleReference() ? parseExternalModuleReference() : parseModuleNameModuleReference();
        }

        function isExternalModuleReference(): boolean {
            return currentToken().kind === SyntaxKind.RequireKeyword &&
                   peekToken(1).kind === SyntaxKind.OpenParenToken;
        }

        function parseExternalModuleReference(): ExternalModuleReferenceSyntax {
            return new ExternalModuleReferenceSyntax(parseNodeData,
                eatToken(SyntaxKind.RequireKeyword), eatToken(SyntaxKind.OpenParenToken), eatToken(SyntaxKind.StringLiteral), eatToken(SyntaxKind.CloseParenToken));
        }

        function parseModuleNameModuleReference(): ModuleNameModuleReferenceSyntax {
            return new ModuleNameModuleReferenceSyntax(parseNodeData, parseName(/*allowIdentifierNames:*/ false));
        }

        function tryParseTypeArgumentList(inExpression: boolean): TypeArgumentListSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind !== SyntaxKind.LessThanToken) {
                return undefined;
            }

            if (!inExpression) {
                // if we're not in an expression, this must be a type argument list.  Just parse
                // it out as such.
                return new TypeArgumentListSyntax(parseNodeData, 
                    consumeToken(_currentToken), 
                    parseSeparatedSyntaxList<ITypeSyntax>(ListParsingState.TypeArgumentList_Types),
                    eatToken(SyntaxKind.GreaterThanToken));
            }

            // If we're in an expression, then we only want to consume this as a type argument list
            // if we're sure that it's a type arg list and not an arithmetic expression.

            var rewindPoint = getRewindPoint();

            // We've seen a '<'.  Try to parse it out as a type argument list.
            var lessThanToken = consumeToken(_currentToken);
            var typeArguments = parseSeparatedSyntaxList<ITypeSyntax>(ListParsingState.TypeArgumentList_Types);
            var greaterThanToken = eatToken(SyntaxKind.GreaterThanToken);

            // We're in a context where '<' could be the start of a type argument list, or part
            // of an arithmetic expression.  We'll presume it's the latter unless we see the '>'
            // and a following token that guarantees that it's supposed to be a type argument list.
            if (greaterThanToken.fullWidth() === 0 || !canFollowTypeArgumentListInExpression(currentToken().kind)) {
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return undefined;
            }
            else {
                releaseRewindPoint(rewindPoint);
                return new TypeArgumentListSyntax(parseNodeData, lessThanToken, typeArguments, greaterThanToken);
            }
        }

        function canFollowTypeArgumentListInExpression(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.OpenParenToken:                 // foo<x>(   
                case SyntaxKind.DotToken:                       // foo<x>.
                    // These two cases are the only cases where this token can legally follow a
                    // type argument list.  So we definitely want to treat this as a type arg list.

                case SyntaxKind.CloseParenToken:                // foo<x>)
                case SyntaxKind.CloseBracketToken:              // foo<x>]
                case SyntaxKind.ColonToken:                     // foo<x>:
                case SyntaxKind.SemicolonToken:                 // foo<x>;
                case SyntaxKind.CommaToken:                     // foo<x>,
                case SyntaxKind.QuestionToken:                  // foo<x>?
                case SyntaxKind.EqualsEqualsToken:              // foo<x> ==
                case SyntaxKind.EqualsEqualsEqualsToken:        // foo<x> ===
                case SyntaxKind.ExclamationEqualsToken:         // foo<x> !=
                case SyntaxKind.ExclamationEqualsEqualsToken:   // foo<x> !==
                case SyntaxKind.AmpersandAmpersandToken:        // foo<x> &&
                case SyntaxKind.BarBarToken:                    // foo<x> ||
                case SyntaxKind.CaretToken:                     // foo<x> ^
                case SyntaxKind.AmpersandToken:                 // foo<x> &
                case SyntaxKind.BarToken:                       // foo<x> |
                case SyntaxKind.CloseBraceToken:                // foo<x> }
                case SyntaxKind.EndOfFileToken:                 // foo<x>
                    // these cases can't legally follow a type arg list.  However, they're not legal 
                    // expressions either.  The user is probably in the middle of a generic type. So
                    // treat it as such.
                    return true;

                default:
                    // Anything else treat as an expression.
                    return false;
            }
        }

        function parseName(allowIdentifierName: boolean): INameSyntax {
            return tryParseName(allowIdentifierName) || eatIdentifierToken();
        }

        function eatRightSideOfName(allowIdentifierNames: boolean): ISyntaxToken {
            var _currentToken = currentToken();

            // Technically a keyword is valid here as all keywords are identifier names.
            // However, often we'll encounter this in error situations when the keyword
            // is actually starting another valid construct.

            // So, we check for the following specific case:

            //      name.
            //      keyword identifierNameOrKeyword

            // Note: the newlines are important here.  For example, if that above code 
            // were rewritten into:

            //      name.keyword
            //      identifierNameOrKeyword

            // Then we would consider it valid.  That's because ASI would take effect and
            // the code would be implicitly: "name.keyword; identifierNameOrKeyword".  
            // In the first case though, ASI will not take effect because there is not a
            // line terminator after the keyword.
            if (SyntaxFacts.isAnyKeyword(_currentToken.kind) &&
                previousTokenHasTrailingNewLine(_currentToken)) {

                var token1 = peekToken(1);
                if (!existsNewLineBetweenTokens(_currentToken, token1, source.text) &&
                    SyntaxFacts.isIdentifierNameOrAnyKeyword(token1)) {

                    return createMissingToken(SyntaxKind.IdentifierName, _currentToken);
                }
            }

            return allowIdentifierNames ? eatIdentifierNameToken() : eatIdentifierToken();
        }

        function tryParseName(allowIdentifierNames: boolean): INameSyntax {
            var token0 = currentToken();
            var shouldContinue = isIdentifier(token0);
            if (!shouldContinue) {
                return undefined;
            }

            // Call eatIdentifierName to convert the token to an identifier if it is as keyword.
            var current: INameSyntax = eatIdentifierToken();

            while (shouldContinue && currentToken().kind === SyntaxKind.DotToken) {
                var dotToken = consumeToken(currentToken());
                var identifierName = eatRightSideOfName(allowIdentifierNames);

                current = new QualifiedNameSyntax(parseNodeData, current, dotToken, identifierName);
                shouldContinue = identifierName.fullWidth() > 0;
            }

            return current;
        }

        function parseEnumDeclaration(): EnumDeclarationSyntax {
            var modifiers = parseModifiers();
            var enumKeyword = eatToken(SyntaxKind.EnumKeyword);
            var identifier = eatIdentifierToken();

            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var enumElements: ISeparatedSyntaxList<EnumElementSyntax>;

            if (openBraceToken.fullWidth() > 0) {
                enumElements = parseSeparatedSyntaxList<EnumElementSyntax>(ListParsingState.EnumDeclaration_EnumElements);
            }

            return new EnumDeclarationSyntax(parseNodeData, modifiers, enumKeyword, identifier, openBraceToken, enumElements || <any>[], eatToken(SyntaxKind.CloseBraceToken));
        }

        function isEnumElement(inErrorRecovery: boolean): boolean {
            var node = currentNode();
            if (node && node.kind === SyntaxKind.EnumElement) {
                return true;
            }

            return isPropertyName(/*peekToken:*/ 0, inErrorRecovery);
        }

        function tryParseEnumElementEqualsValueClause(): EqualsValueClauseSyntax {
            return isEqualsValueClause(/*inParameter*/ false) ? parseEqualsValueClause(/*allowIn:*/ true) : undefined;
        }

        function tryParseEnumElement(inErrorRecovery: boolean): EnumElementSyntax {
            var node = currentNode();
            if (node && node.kind === SyntaxKind.EnumElement) {
                consumeNode(node);
                return <EnumElementSyntax>node;
            }

            if (!isPropertyName(/*peekToken:*/ 0, inErrorRecovery)) {
                return undefined;
            }

            return new EnumElementSyntax(parseNodeData, parsePropertyName(), tryParseEnumElementEqualsValueClause());
        }

        function isModifierKind(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.DeclareKeyword:
                    return true;
            }

            return false;
        }

        function isModifier(token: ISyntaxToken, index: number): boolean {
            if (isModifierKind(token.kind)) {
                // These are modifiers only if we see an actual keyword, identifier, string literal
                // or number following.
                // Note: we also allow [ for error conditions.  
                // [   is for:     static [a: number]
                var nextToken = peekToken(index + 1);
                var nextTokenKind = nextToken.kind;

                switch (nextTokenKind) {
                    case SyntaxKind.IdentifierName:
                    case SyntaxKind.OpenBracketToken:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                        return true;
                    default:
                        return SyntaxFacts.isAnyKeyword(nextTokenKind);
                }
            }

            return false;
        }

        function modifierCount(): number {
            var modifierCount = 0;
            while (isModifier(peekToken(modifierCount), modifierCount)) {
                modifierCount++;
            }

            return modifierCount;
        }

        function parseModifiers(): ISyntaxToken[] {
            var tokens: ISyntaxToken[] = [];

            while (true) {
                var token = currentToken();
                if (isModifier(token, /*index:*/ 0)) {
                    tokens.push(consumeToken(token));
                    continue;
                }

                break;
            }

            return Syntax.list(tokens);
        }

        function parseHeritageClauses(): HeritageClauseSyntax[] {
            var heritageClauses: HeritageClauseSyntax[];

            if (isHeritageClause()) {
                // NOTE: we can pass "undefined" for the skipped tokens here as we know we can't get
                // any leading skipped tokens. We have an 'extends' or 'implements' keyword, so 
                // any skipped tokeds will get attached to that instead.
                heritageClauses = parseSyntaxList<HeritageClauseSyntax>(ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses, undefined);
            }

            return heritageClauses || [];
        }

        function tryParseHeritageClauseTypeName(): ITypeSyntax {
            return isHeritageClauseTypeName() ? tryParseNameOrGenericType() : undefined;
        }

        function parseClassDeclaration(): ClassDeclarationSyntax {
            var modifiers = parseModifiers();
            var classKeyword = eatToken(SyntaxKind.ClassKeyword);
            var identifier = eatIdentifierToken();
            var typeParameterList = tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false);
            var heritageClauses = parseHeritageClauses();
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var classElements: IClassElementSyntax[];

            if (openBraceToken.fullWidth() > 0) {
                classElements = parseSyntaxList<IClassElementSyntax>(ListParsingState.ClassDeclaration_ClassElements);
            };

            return new ClassDeclarationSyntax(parseNodeData,
                modifiers, classKeyword, identifier, typeParameterList, heritageClauses, openBraceToken, classElements || [], eatToken(SyntaxKind.CloseBraceToken));
        }

        function isAccessor(modifierCount: number, inErrorRecovery: boolean): boolean {
            var tokenKind = peekToken(modifierCount).kind;
            if (tokenKind !== SyntaxKind.GetKeyword &&
                tokenKind !== SyntaxKind.SetKeyword) {
                return false;
            }

            return isPropertyName(/*peekIndex:*/ modifierCount + 1, inErrorRecovery);
        }

        function parseAccessor(checkForStrictMode: boolean): IAccessorSyntax {
            var modifiers = parseModifiers();
            var _currenToken = currentToken();
            var tokenKind = _currenToken.kind;

            if (tokenKind === SyntaxKind.GetKeyword) {
                return parseGetMemberAccessorDeclaration(modifiers, _currenToken, checkForStrictMode);
            }
            else if (tokenKind === SyntaxKind.SetKeyword) {
                return parseSetMemberAccessorDeclaration(modifiers, _currenToken, checkForStrictMode);
            }
            else {
                throw Errors.invalidOperation();
            }
        }

        function parseGetMemberAccessorDeclaration(modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, checkForStrictMode: boolean): GetAccessorSyntax {
            return new GetAccessorSyntax(parseNodeData,
                modifiers, consumeToken(getKeyword), parsePropertyName(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, checkForStrictMode));
        }

        function parseSetMemberAccessorDeclaration(modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, checkForStrictMode: boolean): SetAccessorSyntax {
            return new SetAccessorSyntax(parseNodeData,
                modifiers, consumeToken(setKeyword), parsePropertyName(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, checkForStrictMode));
        }

        function isClassElement(inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isClassElement(currentNode())) {
                return true;
            }

            // Note: the order of these calls is important.  Specifically, isMemberVariableDeclaration
            // checks for a subset of the conditions of the previous two calls.
            var _modifierCount = modifierCount();
            return isConstructorDeclaration(_modifierCount) ||
                   isAccessor(_modifierCount, inErrorRecovery) ||
                   isIndexMemberDeclaration(_modifierCount) ||
                   isMemberVariableOrFunctionDeclaration(_modifierCount, inErrorRecovery);
        }

        function isMemberVariableOrFunctionDeclaration(peekIndex: number, inErrorRecovery: boolean) {
            // Check if its the start of a property or method.  Both must start with a property name.
            if (!isPropertyName(peekIndex, inErrorRecovery)) {
                return false;
            }

            if (!SyntaxFacts.isAnyKeyword(peekToken(peekIndex).kind)) {
                // It wasn't a keyword.  So this is definitely a member variable or function.
                return true;
            }

            // Keywords *can* technically start properties and methods.  However, they often
            // are actually intended to start a real ts/js construct.  Only accept a keyword
            // if it is definitely a property or method.
            // keywords are also property names.  Only accept a keyword as a property 
            // name if is of the form:
            //      public;
            //      public=
            //      public:
            //      public }
            //      public(
            //      public<
            //      public <eof>
            //      public <newline>
            var nextToken = peekToken(peekIndex + 1);
            switch (nextToken.kind) {
                case SyntaxKind.SemicolonToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.ColonToken:
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.EndOfFileToken:
                    return true;
                default:
                    return previousTokenHasTrailingNewLine(nextToken);
            }
        }

        function tryParseClassElement(inErrorRecovery: boolean): IClassElementSyntax {
            var node = currentNode();
            if (SyntaxUtilities.isClassElement(node)) {
                consumeNode(node);
                return <IClassElementSyntax>node;
            }

            // Have to check for indexers before anything else.  That way if we see "[foo:" we 
            // parse it out as an indexer and not a member function or variable.
            var _modifierCount = modifierCount();
            if (isConstructorDeclaration(_modifierCount)) {
                return parseConstructorDeclaration();
            }
            else if (isIndexMemberDeclaration(_modifierCount)) {
                return parseIndexMemberDeclaration();
            }
            else if (isAccessor(_modifierCount, inErrorRecovery)) {
                return parseAccessor(/*checkForStrictMode:*/ false);
            }
            else if (isMemberVariableOrFunctionDeclaration(/*peekIndex:*/ _modifierCount, inErrorRecovery)) {
                var modifiers = parseModifiers();
                var propertyName = parsePropertyName();

                if (isCallSignature(/*peekIndex:*/ 0)) {
                    return parseMemberFunctionDeclaration(modifiers, propertyName);
                }
                else {
                    return parseMemberVariableDeclaration(modifiers, propertyName);
                }
            }
            else {
                return undefined;
            }
        }

        function isConstructorDeclaration(modifierCount: number): boolean {
            // Note: we deviate slightly from the spec here.  If we see 'constructor' then we 
            // assume this is a constructor.  That means, if a user writes "public constructor;"
            // it won't be viewed as a member.  As a workaround, they can simply write:
            //      public 'constructor';
            return peekToken(modifierCount).kind === SyntaxKind.ConstructorKeyword;
        }

        function parseConstructorDeclaration(): ConstructorDeclarationSyntax {
            var modifiers = parseModifiers();
            var constructorKeyword = eatToken(SyntaxKind.ConstructorKeyword);
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            var semicolonToken: ISyntaxToken = undefined;
            var block: BlockSyntax = undefined;

            if (isBlock()) {
                block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ true);
            }
            else {
                semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new ConstructorDeclarationSyntax(parseNodeData, modifiers, constructorKeyword, callSignature, block, semicolonToken);
        }

        function parseMemberFunctionDeclaration(modifiers: ISyntaxToken[], propertyName: IPropertyNameSyntax): MemberFunctionDeclarationSyntax {
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            // If we got an errant => then we want to parse what's coming up without requiring an
            // open brace.
            var parseBlockEvenWithNoOpenBrace = tryAddUnexpectedEqualsGreaterThanToken(callSignature);

            var block: BlockSyntax = undefined;
            var semicolon: ISyntaxToken = undefined;

            if (parseBlockEvenWithNoOpenBrace || isBlock()) {
                block = parseBlock(parseBlockEvenWithNoOpenBrace, /*checkForStrictMode:*/ true);
            }
            else {
                semicolon = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new MemberFunctionDeclarationSyntax(parseNodeData, modifiers, propertyName, callSignature, block, semicolon);
        }
        
        function parseMemberVariableDeclaration(modifiers: ISyntaxToken[], propertyName: IPropertyNameSyntax): MemberVariableDeclarationSyntax {
            return new MemberVariableDeclarationSyntax(parseNodeData,
                modifiers,
                new VariableDeclaratorSyntax(parseNodeData, propertyName,
                    parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false), 
                    isEqualsValueClause(/*inParameter*/ false) ? parseEqualsValueClause(/*allowIn:*/ true) : undefined),
                eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function isIndexMemberDeclaration(modifierCount: number): boolean {
            return isIndexSignature(modifierCount);
        }

        function parseIndexMemberDeclaration(): IndexMemberDeclarationSyntax {
            return new IndexMemberDeclarationSyntax(parseNodeData,
                parseModifiers(), parseIndexSignature(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewLine:*/ false));
        }

        function tryAddUnexpectedEqualsGreaterThanToken(callSignature: CallSignatureSyntax): boolean {
            var token0 = currentToken();

            var hasEqualsGreaterThanToken = token0.kind === SyntaxKind.EqualsGreaterThanToken;
            if (hasEqualsGreaterThanToken) {
                // We can only do this if the call signature actually contains a final token that we 
                // could add the => to.
                var _lastToken = lastToken(callSignature);
                if (_lastToken && _lastToken.fullWidth() > 0) {
                    // Previously the language allowed "function f() => expr;" as a shorthand for 
                    // "function f() { return expr; }.
                    // 
                    // Detect if the user is typing this and attempt recovery.
                    var diagnostic = new Diagnostic(fileName, source.text.lineMap(),
                        start(token0, source.text), width(token0), DiagnosticCode.Unexpected_token_0_expected, [SyntaxFacts.getText(SyntaxKind.OpenBraceToken)]);
                    addDiagnostic(diagnostic);

                    // Skip over the =>   It will get attached to whatever comes next.
                    skipToken(token0);
                    return true;
                }
            }


            return false;
        }

        function isFunctionDeclaration(modifierCount: number): boolean {
            return peekToken(modifierCount).kind === SyntaxKind.FunctionKeyword;
        }

        function parseFunctionDeclaration(): FunctionDeclarationSyntax {
            var modifiers = parseModifiers();
            var functionKeyword = eatToken(SyntaxKind.FunctionKeyword);
            var identifier = eatIdentifierToken();
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            // If we got an errant => then we want to parse what's coming up without requiring an
            // open brace.
            var parseBlockEvenWithNoOpenBrace = tryAddUnexpectedEqualsGreaterThanToken(callSignature);

            var semicolonToken: ISyntaxToken = undefined;
            var block: BlockSyntax = undefined;

            // Parse a block if we're on a bock, or if we saw a '=>'
            if (parseBlockEvenWithNoOpenBrace || isBlock()) {
                block = parseBlock(parseBlockEvenWithNoOpenBrace, /*checkForStrictMode:*/ true);
            }
            else {
                semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new FunctionDeclarationSyntax(parseNodeData, modifiers, functionKeyword, identifier, callSignature, block, semicolonToken);
        }

        function parseModuleDeclaration(): ModuleDeclarationSyntax {
            var modifiers = parseModifiers();
            var moduleKeyword = eatToken(SyntaxKind.ModuleKeyword);

            var moduleName: INameSyntax = undefined;
            var stringLiteral: ISyntaxToken = undefined;

            if (currentToken().kind === SyntaxKind.StringLiteral) {
                stringLiteral = eatToken(SyntaxKind.StringLiteral);
            }
            else {
                moduleName = parseName(/*allowIdentifierNames*/ false);
            }

            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var moduleElements: IModuleElementSyntax[];
            if (openBraceToken.fullWidth() > 0) {
                moduleElements = parseSyntaxList<IModuleElementSyntax>(ListParsingState.ModuleDeclaration_ModuleElements);
            }

            return new ModuleDeclarationSyntax(parseNodeData,
                modifiers, moduleKeyword, moduleName, stringLiteral, openBraceToken, moduleElements || [], eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseInterfaceDeclaration(): InterfaceDeclarationSyntax {
            return new InterfaceDeclarationSyntax(parseNodeData,
                parseModifiers(), eatToken(SyntaxKind.InterfaceKeyword), eatIdentifierToken(),
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false), parseHeritageClauses(), parseObjectType());
        }

        function parseObjectType(): ObjectTypeSyntax {
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>;
            if (openBraceToken.fullWidth() > 0) {
                typeMembers = parseSeparatedSyntaxList<ITypeMemberSyntax>(ListParsingState.ObjectType_TypeMembers);
            }

            return new ObjectTypeSyntax(parseNodeData, openBraceToken, typeMembers || <any>[], eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseTupleType(currentToken: ISyntaxToken): TupleTypeSyntax {
            return new TupleTypeSyntax(parseNodeData,
                consumeToken(currentToken),
                parseSeparatedSyntaxList<ITypeSyntax>(ListParsingState.TupleType_Types),
                eatToken(SyntaxKind.CloseBracketToken));
        }

        function isTypeMember(inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isTypeMember(currentNode())) {
                return true;
            }

            return isCallSignature(/*tokenIndex:*/ 0) ||
                   isConstructSignature() ||
                   isIndexSignature(/*tokenIndex:*/ 0) ||
                   isMethodOrPropertySignature(inErrorRecovery);
        }

        function isMethodOrPropertySignature(inErrorRecovery: boolean): boolean {
            var _currentToken = currentToken();

            // Keywords can start properties.  However, they're often intended to start something
            // else.  If we see a modifier before something that can be a property, then don't
            // try parse it out as a property.  For example, if we have:
            //
            //      public foo
            //
            // Then don't parse 'public' as a property name.  Note: if you have:
            //
            //      public
            //      foo
            //
            // Then we *should* parse it as a property name, as ASI takes effect here.
            if (isModifier(_currentToken, /*index:*/ 0)) {
                var token1 = peekToken(1);
                if (!existsNewLineBetweenTokens(_currentToken, token1, source.text) &&
                    isPropertyNameToken(token1, inErrorRecovery)) {

                    return false;
                }
            }

            // Note: property names also start function signatures.  So it's important that we call this
            // after we calll isFunctionSignature.
            return isPropertyName(/*peekIndex:*/ 0, inErrorRecovery);
        }

        function tryParseTypeMember(inErrorRecovery: boolean): ITypeMemberSyntax {
            var node = currentNode();
            if (SyntaxUtilities.isTypeMember(node)) {
                consumeNode(node);
                return <ITypeMemberSyntax>node;
            }

            if (isCallSignature(/*tokenIndex:*/ 0)) {
                return parseCallSignature(/*requireCompleteTypeParameterList:*/ false);
            }
            else if (isConstructSignature()) {
                return parseConstructSignature();
            }
            else if (isIndexSignature(/*tokenIndex:*/ 0)) {
                return parseIndexSignature();
            }
            else if (isMethodOrPropertySignature(inErrorRecovery)) {
                var propertyName = parsePropertyName();
                var questionToken = tryEatToken(SyntaxKind.QuestionToken);

                if (isCallSignature(/*peekIndex:*/ 0)) {
                    return parseMethodSignature(propertyName, questionToken);
                }
                else {
                    return parsePropertySignature(propertyName, questionToken);
                }
            }
            else {
                return undefined;
            }
        }

        function parseConstructSignature(): ConstructSignatureSyntax {
            return new ConstructSignatureSyntax(parseNodeData, eatToken(SyntaxKind.NewKeyword), parseCallSignature(/*requireCompleteTypeParameterList:*/ false));
        }

        function parseIndexSignature(): IndexSignatureSyntax {
            return new IndexSignatureSyntax(parseNodeData,
                eatToken(SyntaxKind.OpenBracketToken),
                parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.IndexSignature_Parameters),
                eatToken(SyntaxKind.CloseBracketToken), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function parseMethodSignature(propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken): MethodSignatureSyntax {
            return new MethodSignatureSyntax(parseNodeData,
                propertyName, questionToken, parseCallSignature(/*requireCompleteTypeParameterList:*/ false));
        }

        function parsePropertySignature(propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken): PropertySignatureSyntax {
            return new PropertySignatureSyntax(parseNodeData,
                propertyName, questionToken, parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function isCallSignature(peekIndex: number): boolean {
            var tokenKind = peekToken(peekIndex).kind;
            return tokenKind === SyntaxKind.OpenParenToken || tokenKind === SyntaxKind.LessThanToken;
        }

        function isConstructSignature(): boolean {
            if (currentToken().kind !== SyntaxKind.NewKeyword) {
                return false;
            }

            return isCallSignature(/*peekIndex:*/1);
        }

        function isIndexSignature(peekIndex: number): boolean {
            // In order to be considered an index signature, we need to see at least:
            //
            //      [a:
            //      [...
            //      [a,
            //      [public a
            //      []
            //
            // Otherwise, we will think that this is the start of a computed property name
            // for a function or variable.
            if (peekToken(peekIndex).kind === SyntaxKind.OpenBracketToken) {
                var token1 = peekToken(peekIndex + 1);
                if (token1.kind === SyntaxKind.DotDotDotToken || token1.kind === SyntaxKind.CloseBracketToken) {
                    return true;
                }
                if (isIdentifier(token1)) {
                    var token2 = peekToken(peekIndex + 2);
                    if (token2.kind === SyntaxKind.ColonToken || token2.kind === SyntaxKind.CommaToken) {
                        return true;
                    }
                }
                if (token1.kind === SyntaxKind.PublicKeyword || token1.kind === SyntaxKind.PrivateKeyword) {
                    var token2 = peekToken(peekIndex + 2);
                    return isIdentifier(token2);
                }
            }

            return false;
        }

        function isHeritageClause(): boolean {
            var tokenKind = currentToken().kind;
            return tokenKind === SyntaxKind.ExtendsKeyword || tokenKind === SyntaxKind.ImplementsKeyword;
        }

        function isNotHeritageClauseTypeName(): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.ImplementsKeyword ||
                tokenKind === SyntaxKind.ExtendsKeyword) {

                return isIdentifier(peekToken(1));
            }

            return false;
        }

        function isHeritageClauseTypeName(): boolean {
            if (isIdentifier(currentToken())) {
                // We want to make sure that the "extends" in "extends foo" or the "implements" in
                // "implements foo" is not considered a type name.
                return !isNotHeritageClauseTypeName();
            }
            
            return false;
        }

        function tryParseHeritageClause(): HeritageClauseSyntax {
            var extendsOrImplementsKeyword = currentToken();
            var tokenKind = extendsOrImplementsKeyword.kind;
            if (tokenKind !== SyntaxKind.ExtendsKeyword && tokenKind !== SyntaxKind.ImplementsKeyword) {
                return undefined;
            }

            return new HeritageClauseSyntax(parseNodeData,
                consumeToken(extendsOrImplementsKeyword),
                parseSeparatedSyntaxList<INameSyntax>(ListParsingState.HeritageClause_TypeNameList));
        }

        function isInterfaceEnumClassModuleImportOrExport(modifierCount: number, _currentToken?: ISyntaxToken): boolean {
            if (modifierCount) {
                // Any of these keywords following a modifier is definitely a TS construct.
                switch (peekToken(modifierCount).kind) {
                    case SyntaxKind.ImportKeyword: 
                    case SyntaxKind.ModuleKeyword: 
                    case SyntaxKind.InterfaceKeyword: 
                    case SyntaxKind.ClassKeyword: 
                    case SyntaxKind.EnumKeyword: 
                        return true;
                }
            }

            _currentToken = _currentToken || currentToken();

            // no modifiers.  While certain of these keywords are javascript keywords as well, it
            // is possible to run into them in some circumstances in error recovery where we don't
            // want to consider them the start of the module element construct.  For example, they
            // might be hte name in an object literal.  Because of that, we check the next token to
            // make sure it really is the start of a module element.
            var nextToken = peekToken(1);

            switch (_currentToken.kind) {
                case SyntaxKind.ModuleKeyword:
                    return isIdentifier(nextToken) || nextToken.kind === SyntaxKind.StringLiteral;

                case SyntaxKind.ImportKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                    return isIdentifier(nextToken);

                case SyntaxKind.ExportKeyword:
                    return nextToken.kind === SyntaxKind.EqualsToken;
            }

            return false;
        }

        function isStatement(modifierCount: number, inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isStatement(currentNode())) {
                return true;
            }

            var _currentToken = currentToken();
            var currentTokenKind = _currentToken.kind;
            switch (currentTokenKind) {
                // ERROR RECOVERY
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // None of the above are actually keywords.  And they might show up in a real
                    // statement (i.e. "public();").  However, if we see 'public <identifier>' then 
                    // that can't possibly be a statement (and instead will be a class element), 
                    // and we should not parse it out here.
                    var token1 = peekToken(1);
                    if (SyntaxFacts.isIdentifierNameOrAnyKeyword(token1)) {
                        // Definitely not a statement.
                        return false;
                    }

                    // Handle this below in 'isExpressionStatement()'
                    break;

                // Common cases that we can immediately assume are statements.
                case SyntaxKind.IfKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.ReturnKeyword:
                case SyntaxKind.SwitchKeyword:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ContinueKeyword:
                case SyntaxKind.ForKeyword:
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.WithKeyword:
                case SyntaxKind.DoKeyword:
                case SyntaxKind.TryKeyword:
                case SyntaxKind.DebuggerKeyword:
                    return true;
            }

            // Check for common things that might appear where we expect a statement, but which we 
            // do not want to consume.  This can happen when the user does not terminate their 
            // existing block properly.  We don't want to accidently consume these as expression 
            // below.
            if (isInterfaceEnumClassModuleImportOrExport(modifierCount, _currentToken)) {
                return false;
            }

            // More complicated cases.
            return isLabeledStatement(_currentToken) ||
                isVariableStatement(modifierCount) ||
                isFunctionDeclaration(modifierCount) ||
                isEmptyStatement(_currentToken, inErrorRecovery) ||
                isExpressionStatement(_currentToken);
        }

        function parseStatement(inErrorRecovery: boolean): IStatementSyntax {
            return tryParseStatement(inErrorRecovery) || parseExpressionStatement();
        }

        function tryParseStatement(inErrorRecovery: boolean): IStatementSyntax {
            var node = currentNode();
            if (SyntaxUtilities.isStatement(node)) {
                consumeNode(node);
                return <IStatementSyntax><ISyntaxNode>node;
            }

            var _currentToken = currentToken();
            var currentTokenKind = _currentToken.kind;
            return tryParseStatementWorker(_currentToken, currentTokenKind, modifierCount(), inErrorRecovery);
        }

        function tryParseStatementWorker(_currentToken: ISyntaxToken, currentTokenKind: SyntaxKind, modifierCount: number, inErrorRecovery: boolean): IStatementSyntax {
            switch (currentTokenKind) {
                // ERROR RECOVERY
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // None of the above are actually keywords.  And they might show up in a real
                    // statement (i.e. "public();").  However, if we see 'public <identifier>' then 
                    // that can't possibly be a statement (and instead will be a class element), 
                    // and we should not parse it out here.
                    if (SyntaxFacts.isIdentifierNameOrAnyKeyword(peekToken(1))) {
                        // Definitely not a statement.
                        return undefined;
                    }
                    else {
                        break;
                    }

                case SyntaxKind.IfKeyword: return parseIfStatement(_currentToken);
                case SyntaxKind.OpenBraceToken: return parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
                case SyntaxKind.ReturnKeyword: return parseReturnStatement(_currentToken);
                case SyntaxKind.SwitchKeyword: return parseSwitchStatement(_currentToken);
                case SyntaxKind.ThrowKeyword: return parseThrowStatement(_currentToken);
                case SyntaxKind.BreakKeyword: return parseBreakStatement(_currentToken);
                case SyntaxKind.ContinueKeyword: return parseContinueStatement(_currentToken);
                case SyntaxKind.ForKeyword: return parseForOrForInStatement(_currentToken);
                case SyntaxKind.WhileKeyword: return parseWhileStatement(_currentToken);
                case SyntaxKind.WithKeyword: return parseWithStatement(_currentToken);
                case SyntaxKind.DoKeyword: return parseDoStatement(_currentToken);
                case SyntaxKind.TryKeyword: return parseTryStatement(_currentToken);
                case SyntaxKind.DebuggerKeyword: return parseDebuggerStatement(_currentToken);
            }
            
            // Check for common things that might appear where we expect a statement, but which we 
            // do not want to consume.  This can happen when the user does not terminate their 
            // existing block properly.  We don't want to accidently consume these as expression 
            // below.
            if (isInterfaceEnumClassModuleImportOrExport(modifierCount, _currentToken)) {
                return undefined;
            }
            else if (isVariableStatement(modifierCount)) {
                return parseVariableStatement();
            }
            else if (isLabeledStatement(_currentToken)) {
                return parseLabeledStatement(_currentToken);
            }
            else if (isFunctionDeclaration(modifierCount)) {
                return parseFunctionDeclaration();
            }
            else if (isEmptyStatement(_currentToken, inErrorRecovery)) {
                return parseEmptyStatement(_currentToken);
            }
            else if (isExpressionStatement(_currentToken)) {
                return parseExpressionStatement();
            }
            else {
                return undefined;
            }
        }

        function parseDebuggerStatement(debuggerKeyword: ISyntaxToken): DebuggerStatementSyntax {
            return new DebuggerStatementSyntax(parseNodeData, consumeToken(debuggerKeyword), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseDoStatement(doKeyword: ISyntaxToken): DoStatementSyntax {
            // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
            // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
            // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
            //  do;while(0)x will have a semicolon inserted before x.
            return new DoStatementSyntax(parseNodeData,
                consumeToken(doKeyword), parseStatement(/*inErrorRecovery:*/ false), eatToken(SyntaxKind.WhileKeyword), eatToken(SyntaxKind.OpenParenToken),
                parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ true));
        }

        function isLabeledStatement(currentToken: ISyntaxToken): boolean {
            return isIdentifier(currentToken) && peekToken(1).kind === SyntaxKind.ColonToken;
        }

        function parseLabeledStatement(identifierToken: ISyntaxToken): LabeledStatementSyntax {
            return new LabeledStatementSyntax(parseNodeData,
                consumeToken(identifierToken), eatToken(SyntaxKind.ColonToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseTryStatement(tryKeyword: ISyntaxToken): TryStatementSyntax {
            var tryKeyword = consumeToken(tryKeyword);

            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.TryBlock_Statements);
            var block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            listParsingState = savedListParsingState;

            var catchClause: CatchClauseSyntax = undefined;
            if (currentToken().kind === SyntaxKind.CatchKeyword) {
                catchClause = parseCatchClause();
            }

            // If we don't have a catch clause, then we must have a finally clause.  Try to parse
            // one out no matter what.
            var finallyClause: FinallyClauseSyntax = undefined;
            if (!catchClause || currentToken().kind === SyntaxKind.FinallyKeyword) {
                finallyClause = parseFinallyClause();
            }

            return new TryStatementSyntax(parseNodeData, tryKeyword, block, catchClause, finallyClause);
        }

        function parseCatchClauseBlock(): BlockSyntax {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.CatchBlock_Statements);
            var block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            listParsingState = savedListParsingState;

            return block;
        }

        function parseCatchClause(): CatchClauseSyntax {
            return new CatchClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.CatchKeyword), eatToken(SyntaxKind.OpenParenToken), eatIdentifierToken(),
                parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false), eatToken(SyntaxKind.CloseParenToken), parseCatchClauseBlock());
        }

        function parseFinallyClause(): FinallyClauseSyntax {
            return new FinallyClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.FinallyKeyword), parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false));
        }

        function parseWithStatement(withKeyword: ISyntaxToken): WithStatementSyntax {
            return new WithStatementSyntax(parseNodeData,
                consumeToken(withKeyword), eatToken(SyntaxKind.OpenParenToken), parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseWhileStatement(whileKeyword: ISyntaxToken): WhileStatementSyntax {
            return new WhileStatementSyntax(parseNodeData,
                consumeToken(whileKeyword), eatToken(SyntaxKind.OpenParenToken), parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function isEmptyStatement(currentToken: ISyntaxToken, inErrorRecovery: boolean): boolean {
            // If we're in error recovery, then we don't want to treat ';' as an empty statement.
            // The problem is that ';' can show up in far too many contexts, and if we see one 
            // and assume it's a statement, then we may bail out innapropriately from whatever 
            // we're parsing.  For example, if we have a semicolon in the middle of a class, then
            // we really don't want to assume the class is over and we're on a statement in the
            // outer module.  We just want to consume and move on.
            if (inErrorRecovery) {
                return false;
            }

            return currentToken.kind === SyntaxKind.SemicolonToken;
        }

        function parseEmptyStatement(semicolonToken: ISyntaxToken): EmptyStatementSyntax {
            return new EmptyStatementSyntax(parseNodeData, consumeToken(semicolonToken));
        }

        function parseForOrForInStatement(forKeyword: ISyntaxToken): IStatementSyntax {
            // Debug.assert(isForOrForInStatement());

            forKeyword = consumeToken(forKeyword);
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);

            var _currentToken = currentToken();
            var tokenKind = _currentToken.kind;
            if (tokenKind === SyntaxKind.VarKeyword) {
                // for ( var VariableDeclarationListNoIn; Expressionopt ; Expressionopt ) Statement
                // for ( var VariableDeclarationNoIn in Expression ) Statement
                return parseForOrForInStatementWithVariableDeclaration(forKeyword, openParenToken);
            }
            else if (tokenKind === SyntaxKind.SemicolonToken) {
                // for ( ; Expressionopt ; Expressionopt ) Statement
                return parseForStatementWithNoVariableDeclarationOrInitializer(forKeyword, openParenToken);
            }
            else {
                // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
                // for ( LeftHandSideExpression in Expression ) Statement
                return parseForOrForInStatementWithInitializer(forKeyword, openParenToken);
            }
        }

        function parseForOrForInStatementWithVariableDeclaration(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): IStatementSyntax {
            // Debug.assert(forKeyword.kind === SyntaxKind.ForKeyword && openParenToken.kind === SyntaxKind.OpenParenToken);
            // Debug.assert(currentToken().kind === SyntaxKind.VarKeyword);

            // for ( var VariableDeclarationListNoIn; Expressionopt ; Expressionopt ) Statement
            // for ( var VariableDeclarationNoIn in Expression ) Statement

            var variableDeclaration = parseVariableDeclaration(/*allowIn:*/ false);
            return currentToken().kind === SyntaxKind.InKeyword 
                ? parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, undefined)
                : parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, undefined);
        }

        function parseForInStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax): ForInStatementSyntax {
            // for ( var VariableDeclarationNoIn in Expression ) Statement

            return new ForInStatementSyntax(parseNodeData,
                forKeyword, openParenToken, variableDeclaration, initializer, eatToken(SyntaxKind.InKeyword),
                parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseForOrForInStatementWithInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): IStatementSyntax {
            // Debug.assert(forKeyword.kind === SyntaxKind.ForKeyword && openParenToken.kind === SyntaxKind.OpenParenToken);

            // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
            // for ( LeftHandSideExpression in Expression ) Statement

            var initializer = parseExpression(/*allowIn:*/ false);
            return currentToken().kind === SyntaxKind.InKeyword
                ? parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, undefined, initializer)
                : parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, undefined, initializer);
        }

        function parseForStatementWithNoVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): ForStatementSyntax {
            // Debug.assert(forKeyword.kind === SyntaxKind.ForKeyword && openParenToken.kind === SyntaxKind.OpenParenToken);
            // Debug.assert(currentToken().kind === SyntaxKind.SemicolonToken);
            // for ( ; Expressionopt ; Expressionopt ) Statement

            return parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, /*variableDeclaration:*/ undefined, /*initializer:*/ undefined);
        }

        function tryParseForStatementCondition(): IExpressionSyntax {
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.SemicolonToken &&
                tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return parseExpression(/*allowIn:*/ true);
            }

            return undefined;
        }

        function tryParseForStatementIncrementor(): IExpressionSyntax {
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return parseExpression(/*allowIn:*/ true);
            }

            return undefined;
        }

        function parseForStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax): ForStatementSyntax {
            // NOTE: From the es5 section on Automatic Semicolon Insertion.
            // a semicolon is never inserted automatically if the semicolon would then ... become 
            // one of the two semicolons in the header of a for statement

            return new ForStatementSyntax(parseNodeData,
                forKeyword, openParenToken, variableDeclaration, initializer,
                eatToken(SyntaxKind.SemicolonToken), tryParseForStatementCondition(),
                eatToken(SyntaxKind.SemicolonToken), tryParseForStatementIncrementor(),
                eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function tryEatBreakOrContinueLabel(): ISyntaxToken {
            // If there is no newline after the break keyword, then we can consume an optional 
            // identifier.
            var identifier: ISyntaxToken = undefined;
            if (!canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
                if (isIdentifier(currentToken())) {
                    return eatIdentifierToken();
                }
            }

            return undefined;
        }

        function parseBreakStatement(breakKeyword: ISyntaxToken): BreakStatementSyntax {
            return new BreakStatementSyntax(parseNodeData,
                consumeToken(breakKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseContinueStatement(continueKeyword: ISyntaxToken): ContinueStatementSyntax {
            return new ContinueStatementSyntax(parseNodeData,
                consumeToken(continueKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseSwitchStatement(switchKeyword: ISyntaxToken) {
            // Debug.assert(isSwitchStatement());

            switchKeyword = consumeToken(switchKeyword);
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);
            var expression: IExpressionSyntax;

            // if we have  "switch {"
            // then don't try to consume the { as the start of an expression.
            if (openParenToken.fullWidth() === 0 && currentToken().kind === SyntaxKind.OpenBraceToken) {
                expression = eatIdentifierToken();
            }
            else {
                expression = parseExpression(/*allowIn:*/ true);
            }

            var closeParenToken = eatToken(SyntaxKind.CloseParenToken);
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var switchClauses: ISwitchClauseSyntax[];
            if (openBraceToken.fullWidth() > 0) {
                switchClauses = parseSyntaxList<ISwitchClauseSyntax>(ListParsingState.SwitchStatement_SwitchClauses);
            }

            return new SwitchStatementSyntax(parseNodeData, switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, switchClauses || [], eatToken(SyntaxKind.CloseBraceToken));
        }

        function isSwitchClause(): boolean {
            if (SyntaxUtilities.isSwitchClause(currentNode())) {
                return true;
            }

            var currentTokenKind = currentToken().kind;
            return currentTokenKind === SyntaxKind.CaseKeyword || currentTokenKind === SyntaxKind.DefaultKeyword;
        }

        function tryParseSwitchClause(): ISwitchClauseSyntax {
            // Debug.assert(isSwitchClause());
            var node = currentNode();
            if (SyntaxUtilities.isSwitchClause(node)) {
                consumeNode(node);
                return <ISwitchClauseSyntax><ISyntaxNode>node;
            }

            var _currentToken = currentToken();
            var kind = _currentToken.kind;
            if (kind === SyntaxKind.CaseKeyword) {
                return parseCaseSwitchClause(_currentToken);
            }
            else if (kind === SyntaxKind.DefaultKeyword) {
                return parseDefaultSwitchClause(_currentToken);
            }
            else {
                return undefined;
            }
        }

        function parseCaseSwitchClause(caseKeyword: ISyntaxToken): CaseSwitchClauseSyntax {
            // Debug.assert(isCaseSwitchClause());

            return new CaseSwitchClauseSyntax(parseNodeData, 
                consumeToken(caseKeyword),
                parseExpression(/*allowIn:*/ true), 
                eatToken(SyntaxKind.ColonToken), 
                parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements));
        }

        function parseDefaultSwitchClause(defaultKeyword: ISyntaxToken): DefaultSwitchClauseSyntax {
            // Debug.assert(isDefaultSwitchClause());

            return new DefaultSwitchClauseSyntax(parseNodeData, 
                consumeToken(defaultKeyword), 
                eatToken(SyntaxKind.ColonToken),
                parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements));
        }

        function parseThrowStatementExpression(): IExpressionSyntax {
            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)
                ? createMissingToken(SyntaxKind.IdentifierName, undefined)
                : parseExpression(/*allowIn:*/ true);
        }

        function parseThrowStatement(throwKeyword: ISyntaxToken): ThrowStatementSyntax {
            return new ThrowStatementSyntax(parseNodeData,
                consumeToken(throwKeyword), parseThrowStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function tryParseReturnStatementExpression(): IExpressionSyntax {
            return !canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) ? parseExpression(/*allowIn:*/ true) : undefined;
        }

        function parseReturnStatement(returnKeyword: ISyntaxToken): ReturnStatementSyntax {
            return new ReturnStatementSyntax(parseNodeData,
                consumeToken(returnKeyword), tryParseReturnStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function isExpressionStatement(currentToken: ISyntaxToken): boolean {
            // As per the gramar, neither { nor 'function' can start an expression statement.
            var tokenKind = currentToken.kind;
            return tokenKind !== SyntaxKind.OpenBraceToken && tokenKind !== SyntaxKind.FunctionKeyword && isExpression(currentToken);
        }

        function isAssignmentOrOmittedExpression(): boolean {
            var _currentToken = currentToken();
            return _currentToken.kind === SyntaxKind.CommaToken || isExpression(_currentToken);
        }

        function tryParseAssignmentOrOmittedExpression(): IExpressionSyntax {
            // Debug.assert(isAssignmentOrOmittedExpression());

            if (currentToken().kind === SyntaxKind.CommaToken) {
                return new OmittedExpressionSyntax(parseNodeData);
            }

            return tryParseAssignmentExpressionOrHigher(/*force:*/ false, /*allowIn:*/ true);
        }

        function isExpression(currentToken: ISyntaxToken): boolean {
            switch (currentToken.kind) {
                // Literals
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.RegularExpressionLiteral:

                // Templates
                case SyntaxKind.NoSubstitutionTemplateToken:
                case SyntaxKind.TemplateStartToken:

                 // For array literals.
                case SyntaxKind.OpenBracketToken:

                // For parenthesized expressions
                case SyntaxKind.OpenParenToken: 

                // For cast expressions.
                case SyntaxKind.LessThanToken:

                // Prefix unary expressions.
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:

                // For object type literal expressions.
                case SyntaxKind.OpenBraceToken: 

                // ERROR TOLERANCE:
                // If we see a => then we know the user was probably trying to type in an arrow 
                // function.  So allow this as the start of an expression, knowing that when we 
                // actually try to parse it we'll report the missing identifier.
                case SyntaxKind.EqualsGreaterThanToken:

                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    // Note: if we see a / or /= token then we always consider this an expression.  Why?
                    // Well, either that / or /= is actually a regular expression, in which case we're 
                    // definitely an expression.  Or, it's actually a divide.  In which case, we *still*
                    // want to think of ourself as an expression.  "But wait", you say.  '/' doesn't
                    // start an expression.  That's true.  BUt like the above check for =>, for error
                    // tolerance, we will consider ourselves in an expression.  We'll then parse out an
                    // missing identifier and then will consume the / token naturally as a binary 
                    // expression.

                // Simple epxressions.
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:

                // For object creation expressions.
                case SyntaxKind.NewKeyword: 

                // Prefix unary expressions
                case SyntaxKind.DeleteKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.TypeOfKeyword:

                // For function expressions.
                case SyntaxKind.FunctionKeyword:
                    return true;
            }

            return isIdentifier(currentToken);
        }

        function parseExpressionStatement(): ExpressionStatementSyntax {
            return new ExpressionStatementSyntax(parseNodeData, parseExpression(/*allowIn:*/ true), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseIfStatement(ifKeyword: ISyntaxToken): IfStatementSyntax {
            return new IfStatementSyntax(parseNodeData,
                consumeToken(ifKeyword), eatToken(SyntaxKind.OpenParenToken), parseExpression(/*allowIn:*/ true),
                eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false), parseOptionalElseClause());
        }

        function parseOptionalElseClause(): ElseClauseSyntax {
            return currentToken().kind === SyntaxKind.ElseKeyword ? parseElseClause() : undefined;
        }

        function parseElseClause(): ElseClauseSyntax {
            return new ElseClauseSyntax(parseNodeData, eatToken(SyntaxKind.ElseKeyword), parseStatement(/*inErrorRecovery:*/ false));
        }

        function isVariableStatement(modifierCount: number): boolean {
            return peekToken(modifierCount).kind === SyntaxKind.VarKeyword;
        }

        function parseVariableStatement(): VariableStatementSyntax {
            return new VariableStatementSyntax(parseNodeData,
                parseModifiers(), parseVariableDeclaration(/*allowIn:*/ true), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseVariableDeclaration(allowIn: boolean): VariableDeclarationSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.VarKeyword);

            var listParsingState = allowIn
                ? ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn
                : ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn;

            return new VariableDeclarationSyntax(parseNodeData,
                eatToken(SyntaxKind.VarKeyword),
                parseSeparatedSyntaxList<VariableDeclaratorSyntax>(listParsingState));
        }

        function isVariableDeclarator(): boolean {
            var node = currentNode();
            if (node && node.kind === SyntaxKind.VariableDeclarator) {
                return true;
            }

            return isIdentifier(currentToken());
        }

        function canReuseVariableDeclaratorNode(node: ISyntaxNode) {
            if (!node || node.kind !== SyntaxKind.VariableDeclarator) {
                return false;
            }

            // Very subtle incremental parsing bug.  Consider the following code:
            //
            //      var v = new List < A, B
            //
            // This is actually legal code.  It's a list of variable declarators "v = new List<A" 
            // on one side and "B" on the other. If you then change that to:
            //
            //      var v = new List < A, B >()
            // 
            // then we have a problem.  "v = new List<A" doesn't intersect the change range, so we
            // start reparsing at "B" and we completely fail to handle this properly.
            //
            // In order to prevent this, we do not allow a variable declarator to be reused if it
            // has an initializer.
            var variableDeclarator = <VariableDeclaratorSyntax>node;
            return variableDeclarator.equalsValueClause === undefined;
        }

        function tryParseVariableDeclarator(allowIn: boolean): VariableDeclaratorSyntax {
            // TODO(cyrusn): What if the 'allowIn' context has changed between when we last parsed 
            // and now?  We could end up with an incorrect tree.  For example, say we had in the old 
            // tree "var i = a in b".  Then, in the new tree the declarator portion moved into:
            // "for (var i = a in b".  We would not want to reuse the declarator as the "in b" portion 
            // would need to be consumed by the for declaration instead.  Need to see if it is possible
            // to hit this case.
            var node = currentNode();
            if (canReuseVariableDeclaratorNode(node)) {
                consumeNode(node);
                return <VariableDeclaratorSyntax>node;
            }

            if (!isIdentifier(currentToken())) {
                return undefined;
            }

            var propertyName = eatIdentifierToken();
            var equalsValueClause: EqualsValueClauseSyntax = undefined;
            var typeAnnotation: TypeAnnotationSyntax = undefined;

            if (fullWidth(propertyName) > 0) {
                typeAnnotation = parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false);

                if (isEqualsValueClause(/*inParameter*/ false)) {
                    equalsValueClause = parseEqualsValueClause(allowIn);
                }
            }

            return new VariableDeclaratorSyntax(parseNodeData, propertyName, typeAnnotation, equalsValueClause);
        }

        function isEqualsValueClause(inParameter: boolean): boolean {
            var token0 = currentToken();
            if (token0.kind === SyntaxKind.EqualsToken) {
                return true;
            }

            // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
            // there is no newline after the last token and if we're on an expression.  If so, parse
            // this as an equals-value clause with a missing equals.
            if (!previousTokenHasTrailingNewLine(token0)) {
                var tokenKind = token0.kind;

                // The 'isExpression' call below returns true for "=>".  That's because it smartly
                // assumes that there is just a missing identifier and the user wanted a lambda.  
                // While this is sensible, we don't want to allow that here as that would mean we're
                // glossing over multiple erorrs and we're probably making things worse.  So don't
                // treat this as an equals value clause and let higher up code handle things.
                if (tokenKind === SyntaxKind.EqualsGreaterThanToken) {
                    return false;
                }

                // There are two places where we allow equals-value clauses.  The first is in a 
                // variable declarator.  The second is with a parameter.  For variable declarators
                // it's more likely that a { would be a allowed (as an object literal).  While this
                // is also allowed for parameters, the risk is that we consume the { as an object
                // literal when it really will be for the block following the parameter.
                if (tokenKind === SyntaxKind.OpenBraceToken &&
                    inParameter) {
                    return false;
                }

                return isExpression(token0);
            }

            return false;
        }

        function parseEqualsValueClause(allowIn: boolean): EqualsValueClauseSyntax {
            return new EqualsValueClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.EqualsToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
        }

        function parseExpression(allowIn: boolean): IExpressionSyntax {
            // Expression[in]:
            //      AssignmentExpression[in] 
            //      Expression[in] , AssignmentExpression[in]

            var leftOperand = tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn);
            while (true) {
                var _currentToken = currentToken();
                if (_currentToken.kind !== SyntaxKind.CommaToken) {
                    break;
                }

                leftOperand = new BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(_currentToken), 
                    tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
            }

            return leftOperand;
        }

        // Called when you need to parse an expression, but you do not want to allow 'CommaExpressions'.
        // i.e. if you have "var a = 1, b = 2" then when we parse '1' we want to parse with higher 
        // precedence than 'comma'.  Otherwise we'll get: "var a = (1, (b = 2))", instead of
        // "var a = (1), b = (2)");
        function tryParseAssignmentExpressionOrHigher(force: boolean, allowIn: boolean): IExpressionSyntax {
            // Augmented by TypeScript:
            //
            //  AssignmentExpression[in]:
            //      1) ConditionalExpression[in]
            //      2) LeftHandSideExpression = AssignmentExpression[in]
            //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[in]
            //      4) ArrowFunctionExpression <-- added by TypeScript
            //
            // Open spec question.  Right now, there is no 'ArrowFunctionExpression[in]' variant.
            // Thus, if the user has:
            //
            //      for (var a = () => b in c) {}
            //
            // Then we will fail to parse (because the 'in' will be consumed as part of the body of
            // the lambda, and not as part of the 'for' statement).  This is likely not an issue
            // whatsoever as there seems to be no good reason why anyone would ever write code like
            // the above.
            //
            // Note: for ease of implementation we treat productions '2' and '3' as the same thing. 
            // (i.e. they're both BinaryExpressions with an assignment operator in it).

            // First, check if we have production '4' (an arrow function).  Note that if we do, we
            // must *not* recurse for productsion 1, 2 or 3. An ArrowFunction is not a 
            // LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done 
            // with AssignmentExpression if we see one.
            var _currentToken = currentToken();
            var arrowFunction = tryParseAnyArrowFunctionExpression(_currentToken);
            if (arrowFunction) {
                return arrowFunction;
            }

            // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
            // start with a LogicalOrExpression, while the assignment productions can only start with
            // LeftHandSideExpressions.
            //
            // So, first, we try to just parse out a BinaryExpression.  If we get something that is a 
            // LeftHandSide or higher, then we can try to parse out the assignment expression part.  
            // Otherwise, we try to parse out the conditional expression bit.  We want to allow any 
            // binary expression here, so we pass in the 'lowest' precedence here so that it matches
            // and consumes anything.
            var leftOperand = tryParseBinaryExpressionOrHigher(_currentToken, force, BinaryExpressionPrecedence.Lowest, allowIn);
            if (leftOperand === undefined) {
                return undefined;
            }

            if (SyntaxUtilities.isLeftHandSizeExpression(leftOperand)) {
                // Note: we call currentOperatorToken so that we get an appropriately merged token
                // for cases like > > =  becoming >>=
                var operatorToken = currentOperatorToken();

                // Check for recursive assignment expressions.
                if (SyntaxFacts.isAssignmentOperatorToken(operatorToken.kind)) {
                    return new BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(operatorToken), 
                        tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
                }
            }

            // It wasn't an assignment or a lambda.  This is a conditional expression:
            return parseConditionalExpressionRest(allowIn, leftOperand);
        }

        function tryParseAnyArrowFunctionExpression(_currentToken: ISyntaxToken): IExpressionSyntax {
            return isSimpleArrowFunctionExpression(_currentToken)
                ? parseSimpleArrowFunctionExpression()
                : tryParseParenthesizedArrowFunctionExpression();
        }

        function tryParseUnaryExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean): IUnaryExpressionSyntax {
            var currentTokenKind = _currentToken.kind;

            switch (currentTokenKind) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    return new PrefixUnaryExpressionSyntax(parseNodeData, consumeToken(_currentToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
                case SyntaxKind.TypeOfKeyword: return parseTypeOfExpression(_currentToken);
                case SyntaxKind.VoidKeyword:   return parseVoidExpression(_currentToken);
                case SyntaxKind.DeleteKeyword: return parseDeleteExpression(_currentToken);
                case SyntaxKind.LessThanToken: return parseCastExpression(_currentToken);
                default:
                    return tryParsePostfixExpressionOrHigher(_currentToken, force);
            }
        }

        function tryParseBinaryExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean, precedence: BinaryExpressionPrecedence, allowIn: boolean): IExpressionSyntax {
            // The binary expressions are incredibly left recursive in their definitions. We 
            // clearly can't implement that through recursion.  So, instead, we first bottom out 
            // of all the recursion by jumping to this production and consuming a UnaryExpression 
            // first.
            //
            // MultiplicativeExpression: See 11.5 
            //      UnaryExpression 
            var leftOperand = tryParseUnaryExpressionOrHigher(_currentToken, force);
            if (leftOperand === undefined) {
                return undefined;
            }

            // We then pop up the stack consuming the other side of the binary exprssion if it exists.
            return parseBinaryExpressionRest(precedence, allowIn, leftOperand);
        }

        function parseConditionalExpressionRest(allowIn: boolean, leftOperand: IExpressionSyntax): IExpressionSyntax {
            // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.

            var _currentToken = currentToken();

            // Now check for conditional expression.
            if (_currentToken.kind !== SyntaxKind.QuestionToken) {
                return leftOperand;
            }

            // Note: we explicitly do *not* pass 'allowIn' to the whenTrue part.  An 'in' expression is always
            // allowed in the 'true' part of a conditional expression.

            return new ConditionalExpressionSyntax(parseNodeData,
                leftOperand, consumeToken(_currentToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true),
                eatToken(SyntaxKind.ColonToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
        }

        function parseBinaryExpressionRest(precedence: BinaryExpressionPrecedence, allowIn: boolean, leftOperand: IExpressionSyntax): IExpressionSyntax {
            while (true) {
                // We either have a binary operator here, or we're finished.  We call 
                // currentOperatorToken versus currentToken here so that we merge token sequences
                // like > and = into >=
                var operatorToken = currentOperatorToken();
                var tokenKind = operatorToken.kind;

                // Only proceed if we see binary expression token.  However we don't parse 
                // assignment expressions or comma expressions here.  Those are taken care of 
                // respectively in parseAssignmentExpression and parseExpression.
                if (!SyntaxFacts.isBinaryExpressionOperatorToken(tokenKind) ||
                    tokenKind === SyntaxKind.CommaToken ||
                    SyntaxFacts.isAssignmentOperatorToken(tokenKind)) {

                    break;
                }

                // also, if it's the 'in' operator, only allow if our caller allows it.
                if (tokenKind === SyntaxKind.InKeyword && !allowIn) {
                    break;
                }

                var newPrecedence = getBinaryExpressionPrecedence(tokenKind);

                // All binary operators must have precedence > 0
                // Debug.assert(newPrecedence > 0);

                // Check the precedence to see if we should "take" this operator
                if (newPrecedence <= precedence) {
                    break;
                }

                // Precedence is okay, so we'll "take" this operator.
                // Now skip the operator token we're on.

                leftOperand = new BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(operatorToken), 
                    tryParseBinaryExpressionOrHigher(currentToken(), /*force:*/ true, newPrecedence, allowIn));
            }

            return leftOperand;
        }

        function currentOperatorToken(): ISyntaxToken {
            var token0 = currentToken();

            // If we see a > we need to see if we can actually merge this contextually into a 
            // >>  >>>  >=  >>=  >>>=  token.
            if (token0.kind === SyntaxKind.GreaterThanToken) {
                return currentContextualToken();
                // var kind = token0.kind;
                //Debug.assert(kind() === SyntaxKind.GreaterThanToken || kind() === SyntaxKind.GreaterThanGreaterThanToken ||
                //             kind() === SyntaxKind.GreaterThanGreaterThanGreaterThanToken || kind() === SyntaxKind.GreaterThanEqualsToken ||
                //             kind() === SyntaxKind.GreaterThanGreaterThanEqualsToken || kind() === SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken);
            }

            return token0;
        }

        function tryParseMemberExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean, inObjectCreation: boolean): IMemberExpressionSyntax {
            // Note: to make our lives simpler, we decompose the the NewExpression productions and
            // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
            // like so:
            //
            //   PrimaryExpression : See 11.1 
            //      this
            //      Identifier
            //      Literal
            //      ArrayLiteral
            //      ObjectLiteral
            //      (Expression) 
            //      FunctionExpression
            //      new MemberExpression Arguments?
            //
            //   MemberExpression : See 11.2 
            //      PrimaryExpression 
            //      MemberExpression[Expression]
            //      MemberExpression.IdentifierName
            //
            //   CallExpression : See 11.2 
            //      MemberExpression 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName 
            //
            // Technically this is ambiguous.  i.e. CallExpression defines:
            //
            //   CallExpression:
            //      CallExpression Arguments
            // 
            // If you see: "new Foo()"
            //
            // Then that could be treated as a single ObjectCreationExpression, or it could be 
            // treated as the invocation of "new Foo".  We disambiguate that in code (to match
            // the original grammar) by making sure that if we see an ObjectCreationExpression
            // we always consume arguments if they are there. So we treat "new Foo()" as an
            // object creation only, and not at all as an invocation)  Another way to think 
            // about this is that for every "new" that we see, we will consume an argument list if
            // it is there as part of the *associated* object creation node.  Any additional
            // argument lists we see, will become invocation expressions.
            //
            // Because there are no other places in the grammar now that refer to FunctionExpression
            // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
            // production.
            //
            // Because CallExpression and MemberExpression are left recursive, we need to bottom out
            // of the recursion immediately.  So we parse out a primary expression to start with.
            var expression: IMemberExpressionSyntax = tryParsePrimaryExpression(_currentToken, force);
            if (expression === undefined) {
                return undefined;
            }

            return parseMemberExpressionRest(expression, inObjectCreation); 
        }

        function parseCallExpressionRest(expression: ILeftHandSideExpressionSyntax): ILeftHandSideExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind;

                switch (currentTokenKind) {
                    case SyntaxKind.OpenParenToken:
                        expression = new InvocationExpressionSyntax(parseNodeData, expression, parseArgumentList(/*typeArgumentList:*/ undefined, _currentToken));
                        continue;

                    case SyntaxKind.LessThanToken:
                        // See if this is the start of a generic invocation.  If so, consume it and
                        // keep checking for postfix expressions.  Otherwise, it's just a '<' that's 
                        // part of an arithmetic expression.  Break out so we consume it higher in the
                        // stack.
                        var argumentList = tryParseArgumentList();
                        if (argumentList === undefined) {
                            break;
                        }

                        expression = new InvocationExpressionSyntax(parseNodeData, expression, argumentList);
                        continue;

                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken, /*inObjectCreation:*/ false);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new MemberAccessExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken), eatIdentifierNameToken());
                        continue;

                    case SyntaxKind.NoSubstitutionTemplateToken:
                    case SyntaxKind.TemplateStartToken:
                        expression = new TemplateAccessExpressionSyntax(parseNodeData, expression, parseTemplateExpression(_currentToken));
                        continue;
                }

                return expression;
            }
        }

        function parseMemberExpressionRest(expression: IMemberExpressionSyntax, inObjectCreation: boolean): IMemberExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind;

                switch (currentTokenKind) {
                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken, inObjectCreation);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new MemberAccessExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken), eatIdentifierNameToken());
                        continue;

                    case SyntaxKind.NoSubstitutionTemplateToken:
                    case SyntaxKind.TemplateStartToken:
                        expression = new TemplateAccessExpressionSyntax(parseNodeData, expression, parseTemplateExpression(_currentToken));
                        continue;
                }

                return expression;
            }
        }

        function tryParseLeftHandSideExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean): ILeftHandSideExpressionSyntax {
            // Original Ecma:
            // LeftHandSideExpression: See 11.2 
            //      NewExpression
            //      CallExpression 
            //
            // Our simplification:
            //
            // LeftHandSideExpression: See 11.2 
            //      MemberExpression  
            //      CallExpression 
            //
            // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
            // MemberExpression to make our lives easier.
            //
            // to best understand the below code, it's important to see how CallExpression expands
            // out into its own productions:
            //
            // CallExpression:
            //      MemberExpression Arguments 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName
            //      super   (   ArgumentListopt   )
            //      super.IdentifierName
            //
            // Because of the recursion in these calls, we need to bottom out first.  There are two 
            // bottom out states we can run into.  Either we see 'super' which must start either of
            // the last two CallExpression productions.  Or we have a MemberExpression which either
            // completes the LeftHandSideExpression, or starts the beginning of the first four
            // CallExpression productions.

            var expression: ILeftHandSideExpressionSyntax = undefined;
            if (_currentToken.kind === SyntaxKind.SuperKeyword) {
                expression = parseSuperExpression(_currentToken);
            }
            else {
                expression = tryParseMemberExpressionOrHigher(_currentToken, force, /*inObjectCreation:*/ false);
                if (expression === undefined) {
                    return undefined;
                }
            }

            // Now, we *may* be complete.  However, we might have consumed the start of a 
            // CallExpression.  As such, we need to consume the rest of it here to be complete.
            return parseCallExpressionRest(expression);
        }

        function parseSuperExpression(superToken: ISyntaxToken): ILeftHandSideExpressionSyntax {
            var expression = consumeToken(superToken);

            // If we have seen "super" it must be followed by '(' or '.'.
            // If it wasn't then just try to parse out a '.' and report an error.
            var currentTokenKind = currentToken().kind;
            return currentTokenKind === SyntaxKind.OpenParenToken || currentTokenKind === SyntaxKind.DotToken
                ? expression
                : new MemberAccessExpressionSyntax(parseNodeData, expression, eatToken(SyntaxKind.DotToken), eatIdentifierNameToken());
        }

        function tryParsePostfixExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean): IPostfixExpressionSyntax {
            var expression = tryParseLeftHandSideExpressionOrHigher(_currentToken, force);
            if (expression === undefined) {
                return undefined;
            }

            var _currentToken = currentToken();
            var currentTokenKind = _currentToken.kind;

            switch (currentTokenKind) {
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    // Because of automatic semicolon insertion, we should only consume the ++ or -- 
                    // if it is on the same line as the previous token.
                    if (previousTokenHasTrailingNewLine(_currentToken)) {
                        break;
                    }

                    return new PostfixUnaryExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken));
            }

            return expression;
        }

        function tryParseGenericArgumentList(): ArgumentListSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.LessThanToken);
            // If we have a '<', then only parse this as a arugment list if the type arguments
            // are complete and we have an open paren.  if we don't, rewind and return nothing.
            var rewindPoint = getRewindPoint();

            var typeArgumentList = tryParseTypeArgumentList(/*inExpression:*/ true);
            var token0 = currentToken();
            var tokenKind = token0.kind;

            var isOpenParen = tokenKind === SyntaxKind.OpenParenToken;
            var isDot = tokenKind === SyntaxKind.DotToken;
            var isOpenParenOrDot = isOpenParen || isDot;

            var argumentList: ArgumentListSyntax = undefined;
            if (!typeArgumentList || !isOpenParenOrDot) {
                // Wasn't generic.  Rewind to where we started so this can be parsed as an 
                // arithmetic expression.
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return undefined;
            }
            else {
                Debug.assert(typeArgumentList && isOpenParenOrDot);

                releaseRewindPoint(rewindPoint);
                // It's not uncommon for a user to type: "Foo<T>."
                //
                // This is not legal in typescript (as an parameter list must follow the type
                // arguments).  We want to give a good error message for this as otherwise
                // we'll bail out here and give a poor error message when we try to parse this
                // as an arithmetic expression.
                if (isDot) {
                    // A parameter list must follow a generic type argument list.
                    var diagnostic = new Diagnostic(fileName, source.text.lineMap(), start(token0, source.text), width(token0),
                        DiagnosticCode.A_parameter_list_must_follow_a_generic_type_argument_list_expected, undefined);
                    addDiagnostic(diagnostic);

                    return new ArgumentListSyntax(parseNodeData, typeArgumentList,
                        Syntax.emptyToken(SyntaxKind.OpenParenToken), <any>[], Syntax.emptyToken(SyntaxKind.CloseParenToken));
                }
                else {
                    Debug.assert(token0.kind === SyntaxKind.OpenParenToken);
                    return parseArgumentList(typeArgumentList, token0);
                }
            }
        }

        function tryParseArgumentList(): ArgumentListSyntax {
            var _currentToken = currentToken();
            var tokenKind = _currentToken.kind;
            if (tokenKind === SyntaxKind.LessThanToken) {
                return tryParseGenericArgumentList();
            }

            if (tokenKind === SyntaxKind.OpenParenToken) {
                return parseArgumentList(/*typeArgumentList:*/ undefined, /*openParenToken:*/ _currentToken);
            }

            return undefined;
        }

        function parseArgumentList(typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken): ArgumentListSyntax {
            Debug.assert(openParenToken.kind === SyntaxKind.OpenParenToken && openParenToken.fullWidth() > 0);

            return new ArgumentListSyntax(parseNodeData,
                typeArgumentList, 
                consumeToken(openParenToken),
                parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArgumentList_AssignmentExpressions),
                eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseArgumentListExpression(): IExpressionSyntax {
            // Generally while parsing lists, we don't want to 'force' the parser to parse
            // the item.  That way, if the expected item isn't htere, we can bail out and
            // move to a higher stage of list parsing.  However, it's extremely common to 
            // see something like "Foo(, a".  in this case, even though there isn't an expression
            // after the open paren, we still want to force parsing an expression (which will
            // cause a missing identiifer to be created), so that we will then consume the
            // comma and the following list items).
            var force = currentToken().kind === SyntaxKind.CommaToken;
            return tryParseAssignmentExpressionOrHigher(force, /*allowIn:*/ true);
        }

        function parseElementAccessArgumentExpression(openBracketToken: ISyntaxToken, inObjectCreation: boolean) {
            // It's not uncommon for a user to write: "new Type[]".  Check for that common pattern
            // and report a better error message.
            if (inObjectCreation && currentToken().kind === SyntaxKind.CloseBracketToken) {
                var errorStart = start(openBracketToken, source.text);
                var errorEnd = end(currentToken(), source.text);
                var diagnostic = new Diagnostic(fileName, source.text.lineMap(), errorStart, errorEnd - errorStart,
                    DiagnosticCode.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead, undefined);
                addDiagnostic(diagnostic);

                return Syntax.emptyToken(SyntaxKind.IdentifierName);
            }
            else {
                return parseExpression(/*allowIn:*/ true);
            }
        }

        function parseElementAccessExpression(expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, inObjectCreation: boolean): ElementAccessExpressionSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.OpenBracketToken);
            return new ElementAccessExpressionSyntax(parseNodeData, expression, consumeToken(openBracketToken),
                parseElementAccessArgumentExpression(openBracketToken, inObjectCreation), eatToken(SyntaxKind.CloseBracketToken));
        }

        function tryParsePrimaryExpression(_currentToken: ISyntaxToken, force: boolean): IPrimaryExpressionSyntax {
            if (isIdentifier(_currentToken)) {
                return eatIdentifierToken();
            }

            var currentTokenKind = _currentToken.kind;
            switch (currentTokenKind) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.StringLiteral:
                    return consumeToken(_currentToken);

                case SyntaxKind.FunctionKeyword:    return parseFunctionExpression(_currentToken);
                case SyntaxKind.OpenBracketToken:   return parseArrayLiteralExpression(_currentToken);
                case SyntaxKind.OpenBraceToken:     return parseObjectLiteralExpression(_currentToken);
                case SyntaxKind.OpenParenToken:     return parseParenthesizedExpression(_currentToken);
                case SyntaxKind.NewKeyword:         return parseObjectCreationExpression(_currentToken);

                case SyntaxKind.NoSubstitutionTemplateToken:
                case SyntaxKind.TemplateStartToken:
                    return parseTemplateExpression(_currentToken);

                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    // If we see a standalone / or /= and we're expecting a term, then try to reparse
                    // it as a regular expression.
                    var result = tryReparseDivideAsRegularExpression();

                    // If we get a result, then use it. Otherwise, create a missing identifier so
                    // that parsing can continue.  Note: we do this even if 'force' is false.  That's
                    // because we *do* want to consider a standalone / as an expression that should be
                    // returned from tryParseExpression even when 'force' is set to false.
                    return result || eatIdentifierToken(DiagnosticCode.Expression_expected);
            }

            if (!force) {
                return undefined;
            }

            // Nothing else worked, report an error and produce a missing token.
            return eatIdentifierToken(DiagnosticCode.Expression_expected);
        }

        function tryReparseDivideAsRegularExpression(): IPrimaryExpressionSyntax {
            // If we see a / or /= token, then that may actually be the start of a regex in certain 
            // contexts.

            // var currentToken = this.currentToken();
            // Debug.assert(SyntaxFacts.isAnyDivideToken(currentToken.kind));

            // Ok, from our quick lexical check, this could be a place where a regular expression could
            // go.  Now we have to do a bunch of work.  Ask the source to retrive the token at the 
            // current position again.  But this time allow it to retrieve it as a regular expression.
            var currentToken = currentContextualToken();

            // Note: we *must* have gotten a /, /= or regular expression.  Or else something went *very*
            // wrong with our logic above.
            // Debug.assert(SyntaxFacts.isAnyDivideOrRegularExpressionToken(currentToken.kind));

            var tokenKind = currentToken.kind;
            if (tokenKind === SyntaxKind.SlashToken || tokenKind === SyntaxKind.SlashEqualsToken) {
                // Still came back as a / or /=.   This is not a regular expression literal.
                return undefined;
            }
            else if (tokenKind === SyntaxKind.RegularExpressionLiteral) {
                return consumeToken(currentToken);
            }
            else {
                // Something *very* wrong happened.  This is an internal parser fault that we need 
                // to figure out and fix.
                throw Errors.invalidOperation();
            }
        }

        function parseTypeOfExpression(typeOfKeyword: ISyntaxToken): TypeOfExpressionSyntax {
            return new TypeOfExpressionSyntax(parseNodeData, consumeToken(typeOfKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseDeleteExpression(deleteKeyword: ISyntaxToken): DeleteExpressionSyntax {
            return new DeleteExpressionSyntax(parseNodeData, consumeToken(deleteKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseVoidExpression(voidKeyword: ISyntaxToken): VoidExpressionSyntax {
            return new VoidExpressionSyntax(parseNodeData, consumeToken(voidKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseFunctionExpression(functionKeyword: ISyntaxToken): FunctionExpressionSyntax {
            return new FunctionExpressionSyntax(parseNodeData,
                consumeToken(functionKeyword), eatOptionalIdentifierToken(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ true));
        }

        function parseObjectCreationExpression(newKeyword: ISyntaxToken): ObjectCreationExpressionSyntax {
            // ObjectCreationExpression
            //      new MemberExpression Arguments?
            //
            // Note: if we see arguments we absolutely take them and attach them tightly to this
            // object creation expression.
            //
            // See comment in tryParseMemberExpressionOrHigher for a more complete explanation of
            // this decision.

            return new ObjectCreationExpressionSyntax(parseNodeData,
                consumeToken(newKeyword), tryParseMemberExpressionOrHigher(currentToken(), /*force:*/ true, /*inObjectCreation:*/ true), tryParseArgumentList());
        }

        function parseTemplateExpression(startToken: ISyntaxToken): IPrimaryExpressionSyntax {
            startToken = consumeToken(startToken);

            if (startToken.kind === SyntaxKind.NoSubstitutionTemplateToken) {
                return startToken;
            }
            
            var templateClauses: TemplateClauseSyntax[] = [];

            do {
                // Keep consuming template spans as long as the last one we keep getting template
                // middle pieces.
                templateClauses.push(parseTemplateClause());
            }
            while (templateClauses[templateClauses.length - 1].templateMiddleOrEndToken.kind === SyntaxKind.TemplateMiddleToken);
            
            return new TemplateExpressionSyntax(parseNodeData, startToken, Syntax.list(templateClauses));
        }

        function parseTemplateClause(): TemplateClauseSyntax {
            var expression = parseExpression(/*allowIn:*/ true);
            var token = currentToken();

            if (token.kind === SyntaxKind.CloseBraceToken) {
                token = currentContextualToken();
                Debug.assert(token.kind === SyntaxKind.TemplateMiddleToken || token.kind === SyntaxKind.TemplateEndToken);
                token = consumeToken(token);
            }
            else {
                var diagnostic = getExpectedTokenDiagnostic(SyntaxKind.CloseBraceToken);
                addDiagnostic(diagnostic);
                token = Syntax.emptyToken(SyntaxKind.TemplateEndToken);
            }

            return new TemplateClauseSyntax(parseNodeData, expression, token);
        }

        function parseCastExpression(lessThanToken: ISyntaxToken): CastExpressionSyntax {
            return new CastExpressionSyntax(parseNodeData,
                consumeToken(lessThanToken), parseType(), eatToken(SyntaxKind.GreaterThanToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseParenthesizedExpression(openParenToken: ISyntaxToken): ParenthesizedExpressionSyntax {
            return new ParenthesizedExpressionSyntax(parseNodeData,
                consumeToken(openParenToken), parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseParenthesizedArrowFunctionExpression(): ParenthesizedArrowFunctionExpressionSyntax {
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.OpenParenToken && tokenKind !== SyntaxKind.LessThanToken) {
                return undefined;
            }

            // Because arrow functions and parenthesized expressions look similar, we have to check far
            // enough ahead to be sure we've actually got an arrow function. For example, both nodes can
            // start with:
            //    (a = b, c = d, ..., e = f).
            //So we effectively need infinite lookahead to decide which node we're in.
            //
            // First, check for things that definitely have enough information to let us know it's an
            // arrow function.

            if (isDefinitelyArrowFunctionExpression()) {
                // We have something like "() =>" or "(a) =>".  Definitely a lambda, so parse it
                // unilaterally as such.
                return tryParseParenthesizedArrowFunctionExpressionWorker(/*requiresArrow:*/ false);
            }

            // Now, look for cases where we're sure it's not an arrow function.  This will help save us
            // a costly parse.
            if (!isPossiblyArrowFunctionExpression()) {
                return undefined;
            }

            // Then, try to actually parse it as a arrow function, and only return if we see an => 
            var rewindPoint = getRewindPoint();

            var arrowFunction = tryParseParenthesizedArrowFunctionExpressionWorker(/*requiresArrow:*/ true);
            if (arrowFunction === undefined) {
                rewind(rewindPoint);
            }

            releaseRewindPoint(rewindPoint);
            return arrowFunction;
        }

        function tryParseParenthesizedArrowFunctionExpressionWorker(requireArrow: boolean): ParenthesizedArrowFunctionExpressionSyntax {
            var _currentToken = currentToken();
            // Debug.assert(currentToken.kind === SyntaxKind.OpenParenToken || currentToken.kind === SyntaxKind.LessThanToken);

            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ true);

            if (requireArrow && currentToken().kind !== SyntaxKind.EqualsGreaterThanToken) {
                return undefined;
            }

            var equalsGreaterThanToken = eatToken(SyntaxKind.EqualsGreaterThanToken);

            var block = tryParseArrowFunctionBlock();
            var expression: IExpressionSyntax = undefined;
            if (block === undefined) {
                expression = tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true);
            }

            return new ParenthesizedArrowFunctionExpressionSyntax(parseNodeData, callSignature, equalsGreaterThanToken, block, expression);
        }

        function tryParseArrowFunctionBlock(): BlockSyntax {
            if (isBlock()) {
                return parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            }
            else {
                // We didn't have a block.  However, we may be in an error situation.  For example,
                // if the user wrote:
                //
                //  a => 
                //      var v = 0;
                //  }
                //
                // (i.e. they're missing the open brace).  See if that's the case so we can try to 
                // recover better.  If we don't do this, then the next close curly we see may end
                // up preemptively closing the containing construct.
                var _modifierCount = modifierCount();
                if (isStatement(_modifierCount, /*inErrorRecovery:*/ false) &&
                    !isExpressionStatement(currentToken()) &&
                    !isFunctionDeclaration(_modifierCount)) {
                    // We've seen a statement (and it isn't an expressionStatement like 'foo()'), 
                    // so treat this like a block with a missing open brace.
                    return parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ true, /*checkForStrictMode:*/ false);
                }
                else {
                    return undefined;
                }
            }
        }

        function isSimpleArrowFunctionExpression(_currentToken: ISyntaxToken): boolean {
            // ERROR RECOVERY TWEAK:
            // If we see a standalone => try to parse it as an arrow function as that's likely what
            // the user intended to write.
            if (_currentToken.kind === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            return isIdentifier(_currentToken) &&
                   peekToken(1).kind === SyntaxKind.EqualsGreaterThanToken;
        }

        function parseSimpleArrowFunctionExpression(): SimpleArrowFunctionExpressionSyntax {
            // Debug.assert(isSimpleArrowFunctionExpression());

            var parameter = eatSimpleParameter();
            var equalsGreaterThanToken = eatToken(SyntaxKind.EqualsGreaterThanToken);

            var block = tryParseArrowFunctionBlock();
            var expression: IExpressionSyntax = undefined;
            if (block === undefined) {
                expression = tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true);
            }

            return new SimpleArrowFunctionExpressionSyntax(parseNodeData, parameter, equalsGreaterThanToken, block, expression);
        }

        function isBlock(): boolean {
            return currentToken().kind === SyntaxKind.OpenBraceToken;
        }

        function isDefinitelyArrowFunctionExpression(): boolean {
            var token0 = currentToken();
            if (token0.kind !== SyntaxKind.OpenParenToken) {
                // If it didn't start with an (, then it could be generic.  That's too complicated 
                // and we can't say it's 'definitely' an arrow function.             
                return false;
            }

            var token1 = peekToken(1);
            var token1Kind = token1.kind;

            var token2: ISyntaxToken;

            if (token1Kind === SyntaxKind.CloseParenToken) {
                // ()
                // Definitely an arrow function.  Could never be a parenthesized expression.  
                // *However*, because of error situations, we could end up with things like "().foo".
                // In this case, we don't want to think of this as the start of an arrow function.
                // To prevent this, we are a little stricter, and we require that we at least see:
                //      "():"  or  "() =>"  or "() {}".  Note: the last one is illegal.  However it
                // most likely is a missing => and not a parenthesized expression.
                token2 = peekToken(2);
                var token2Kind = token2.kind;
                return token2Kind === SyntaxKind.ColonToken ||
                       token2Kind === SyntaxKind.EqualsGreaterThanToken ||
                       token2Kind === SyntaxKind.OpenBraceToken;
            }

            if (token1Kind === SyntaxKind.DotDotDotToken) {
                // (...
                // Definitely an arrow function.  Could never be a parenthesized expression.
                return true;
            }

            token2 = peekToken(2); 
            token2Kind = token2.kind;

            if (SyntaxFacts.isAccessibilityModifier(token1Kind)) {
                if (isIdentifier(token2)) {
                    // "(public id" or "(function id".  Definitely an arrow function.  Could never 
                    // be a parenthesized expression.  Note: this will be an *illegal* arrow 
                    // function (as accessibility modifiers are not allowed in it).  However, that
                    // will be reported by the grammar checker walker.
                    return true;
                }
            }

            if (!isIdentifier(token1)) {
                // All other arrow functions must start with (id
                // so this is definitely not an arrow function.
                return false;
            }

            // (id
            //
            // Lots of options here.  Check for things that make us certain it's an
            // arrow function.
            if (token2Kind === SyntaxKind.ColonToken) {
                // (id:
                // Definitely an arrow function.  Could never be a parenthesized expression.
                return true;
            }

            var token3 = peekToken(3);
            var token3Kind = token3.kind;
            if (token2Kind === SyntaxKind.QuestionToken) {
                // (id?
                // Could be an arrow function, or a parenthesized conditional expression.

                // Check for the things that could only be arrow functions.
                if (token3Kind === SyntaxKind.ColonToken ||
                    token3Kind === SyntaxKind.CloseParenToken ||
                    token3Kind === SyntaxKind.CommaToken) {
                    // (id?:
                    // (id?)
                    // (id?,
                    // These are the only cases where this could be an arrow function.
                    // And none of them can be parenthesized expression.
                    return true;
                }
            }

            if (token2Kind === SyntaxKind.CloseParenToken) {
                // (id)
                // Could be an arrow function, or a parenthesized conditional expression.

                if (token3Kind === SyntaxKind.EqualsGreaterThanToken) {
                    // (id) =>
                    // Definitely an arrow function.  Could not be a parenthesized expression.
                    return true;
                }

                // Note: "(id):" *looks* like it could be an arrow function.  However, it could
                // show up in:  "foo ? (id): 
                // So we can't return true here for that case.
            }

            // TODO: Add more cases if you're sure that there is enough information to know to 
            // parse this as an arrow function.  Note: be very careful here.

            // Anything else wasn't clear enough.  Try to parse the expression as an arrow function and bail out
            // if we fail.
            return false;
        }

        function isPossiblyArrowFunctionExpression(): boolean {
            var token0 = currentToken();
            if (token0.kind !== SyntaxKind.OpenParenToken) {
                // If it didn't start with an (, then it could be generic.  That's too complicated 
                // and we have to say it's possibly an arrow function.
                return true;
            }

            var token1 = peekToken(1);

            if (!isIdentifier(token1)) {
                // All other arrow functions must start with (id
                // so this is definitely not an arrow function.
                return false;
            }

            var token2 = peekToken(2);
            var token2Kind = token2.kind;
            if (token2Kind === SyntaxKind.EqualsToken) {
                // (id =
                //
                // This *could* be an arrow function.  i.e. (id = 0) => { }
                // Or it could be a parenthesized expression.  So we'll have to actually
                // try to parse it.
                return true;
            }

            if (token2Kind === SyntaxKind.CommaToken) {
                // (id,

                // This *could* be an arrow function.  i.e. (id, id2) => { }
                // Or it could be a parenthesized expression (as javascript supports
                // the comma operator).  So we'll have to actually try to parse it.
                return true;
            }

            if (token2Kind === SyntaxKind.CloseParenToken) {
                // (id)

                var token3 = peekToken(3);
                if (token3.kind === SyntaxKind.ColonToken) {
                    // (id):
                    //
                    // This could be an arrow function. i.e. (id): number => { }
                    // Or it could be parenthesized exprssion: foo ? (id) :
                    // So we'll have to actually try to parse it.
                    return true;
                }
            }

            // Nothing else could be an arrow function.
            return false;
        }

        function parseObjectLiteralExpression(openBraceToken: ISyntaxToken): ObjectLiteralExpressionSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.OpenBraceToken);
            return new ObjectLiteralExpressionSyntax(parseNodeData,
                consumeToken(openBraceToken), 
                parseSeparatedSyntaxList<IPropertyAssignmentSyntax>(ListParsingState.ObjectLiteralExpression_PropertyAssignments),
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function tryParsePropertyAssignment(inErrorRecovery: boolean): IPropertyAssignmentSyntax {
            // Debug.assert(isPropertyAssignment(/*inErrorRecovery:*/ false));

            if (isAccessor(modifierCount(), inErrorRecovery)) {
                return parseAccessor(/*checkForStrictMode:*/ true);
            }

            // Note: we don't want to call parsePropertyName here yet as it will convert a keyword
            // to an identifier name.  We don't want to do that yet as a keyword is not legal as a
            // shorthand property assignment.

            var _currentToken = currentToken();
            if (isIdentifier(_currentToken)) {
                var token1 = peekToken(1);
                if (token1.kind !== SyntaxKind.ColonToken &&
                    token1.kind !== SyntaxKind.OpenParenToken &&
                    token1.kind !== SyntaxKind.LessThanToken) {

                    // If we don't have one of:
                    //
                    // id:
                    // id(
                    // id<
                    //
                    // then this is a shorthand property assignment.  Just return the identifier 
                    // token as is.
                    return consumeToken(_currentToken);
                }
            }

            // All the rest of the property assignments start with property names.  They are:
            //      id: e
            //      [e1]: e2
            //      id() { }
            //      [e]() { } 
            if (isPropertyName(/*peekIndex:*/ 0, inErrorRecovery)) {
                var propertyName = parsePropertyName();

                if (isCallSignature(/*peekIndex:*/ 0)) {
                    return parseFunctionPropertyAssignment(propertyName);
                }
                else {
                    // If we didn't have an identifier, then we must have gotten a keyword or a
                    // literal.  Neither of these are allowed in a shorthand property, so this must
                    // be a simple property assignment.
                    //
                    // Also, if we have an identifier and it is followed by a colon then this is 
                    // definitely a simple property assignment.
                    return new SimplePropertyAssignmentSyntax(parseNodeData,
                        propertyName, eatToken(SyntaxKind.ColonToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true));
                }
            }

            return undefined;
        }

        function isPropertyAssignment(inErrorRecovery: boolean): boolean {
            return isAccessor(modifierCount(), inErrorRecovery) ||
                   isPropertyName(/*peekIndex:*/ 0, inErrorRecovery);
        }

        function isPropertyName(peekIndex: number, inErrorRecovery: boolean): boolean {
            var token = peekToken(peekIndex);
            if (token.kind === SyntaxKind.OpenBracketToken) {
                // A '[' only starts a property name as long as we're sure it doesn't start an
                // index signature.
                return !isIndexSignature(peekIndex);
            }

            return isPropertyNameToken(token, inErrorRecovery);
        }

        function isPropertyNameToken(token: ISyntaxToken, inErrorRecovery: boolean): boolean {
            // NOTE: we do *not* want to check "isIdentifier" here.  Any IdentifierName is 
            // allowed here, even reserved words like keywords.
            if (SyntaxFacts.isIdentifierNameOrAnyKeyword(token)) {
                // Except: if we're in error recovery, then we don't want to consider keywords. 
                // After all, if we have:
                //
                //      { a: 1
                //      return
                //
                // we don't want consider 'return' to be the next property in the object literal.
                if (inErrorRecovery) {
                    return isIdentifier(token);
                }
                else {
                    return true;
                }
            }

            return isLiteralPropertyName(token);
        }

        function isLiteralPropertyName(token: ISyntaxToken): boolean {
            // We allow a template literal while parser for error tolerance.  We'll report errors
            // on this later in the grammar checker walker.
            var kind = token.kind;
            return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral || kind === SyntaxKind.NoSubstitutionTemplateToken;
        }

        function parsePropertyName(): IPropertyNameSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind === SyntaxKind.OpenBracketToken) {
                return parseComputedPropertyName(_currentToken);
            }
            else if (SyntaxFacts.isIdentifierNameOrAnyKeyword(_currentToken)) {
                // If it was a keyword, convert it to an identifier name.
                return eatIdentifierNameToken();
            }
            else {
                // Must have been a literal.
                return consumeToken(_currentToken);
            }
        }

        function parseComputedPropertyName(openBracketToken: ISyntaxToken): ComputedPropertyNameSyntax {
            return new ComputedPropertyNameSyntax(parseNodeData,
                consumeToken(openBracketToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true), eatToken(SyntaxKind.CloseBracketToken));
        }

        function parseFunctionPropertyAssignment(propertyName: IPropertyNameSyntax): FunctionPropertyAssignmentSyntax {
            return new FunctionPropertyAssignmentSyntax(parseNodeData,
                propertyName, parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseBlockEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ true));
        }

        function parseArrayLiteralExpression(openBracketToken: ISyntaxToken): ArrayLiteralExpressionSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.OpenBracketToken);
            return new ArrayLiteralExpressionSyntax(parseNodeData,
                consumeToken(openBracketToken), 
                parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArrayLiteralExpression_AssignmentExpressions),
                eatToken(SyntaxKind.CloseBracketToken));
        }

        function parseBlock(parseBlockEvenWithNoOpenBrace: boolean, checkForStrictMode: boolean): BlockSyntax {
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var statements: IStatementSyntax[];

            if (parseBlockEvenWithNoOpenBrace || openBraceToken.fullWidth() > 0) {
                var savedIsInStrictMode = isInStrictMode;
                
                var processItems = checkForStrictMode ? updateStrictModeState : undefined;
                var statements = parseSyntaxList<IStatementSyntax>(ListParsingState.Block_Statements, processItems);

                setStrictMode(savedIsInStrictMode);
            }

            return new BlockSyntax(parseNodeData, openBraceToken, statements || [], eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseCallSignature(requireCompleteTypeParameterList: boolean): CallSignatureSyntax {
            return new CallSignatureSyntax(parseNodeData,
                tryParseTypeParameterList(requireCompleteTypeParameterList), parseParameterList(), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function tryParseTypeParameterList(requireCompleteTypeParameterList: boolean): TypeParameterListSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind !== SyntaxKind.LessThanToken) {
                return undefined;
            }

            var rewindPoint = getRewindPoint();

            var lessThanToken = consumeToken(_currentToken);
            var typeParameters = parseSeparatedSyntaxList<TypeParameterSyntax>(ListParsingState.TypeParameterList_TypeParameters);

            var greaterThanToken = eatToken(SyntaxKind.GreaterThanToken);

            // return undefined if we were required to have a '>' token and we did not  have one.
            if (requireCompleteTypeParameterList && greaterThanToken.fullWidth() === 0) {
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return undefined;
            }
            else {
                releaseRewindPoint(rewindPoint);
                return new TypeParameterListSyntax(parseNodeData, lessThanToken, typeParameters, greaterThanToken);
            }
        }

        function isTypeParameter(): boolean {
            return isIdentifier(currentToken());
        }

        function tryParseTypeParameter(): TypeParameterSyntax {
            // Debug.assert(isTypeParameter());
            if (!isIdentifier(currentToken())) {
                return undefined;
            }

            return new TypeParameterSyntax(parseNodeData, eatIdentifierToken(), tryParseConstraint());
        }

        function tryParseConstraint(): ConstraintSyntax {
            if (currentToken().kind !== SyntaxKind.ExtendsKeyword) {
                return undefined;
            }

            return new ConstraintSyntax(parseNodeData, eatToken(SyntaxKind.ExtendsKeyword), parseTypeOrExpression());
        }

        function tryParseParameterList(): ParameterListSyntax {
            if (currentToken().kind === SyntaxKind.OpenParenToken) {
                var token1 = peekToken(1);

                if (token1.kind === SyntaxKind.CloseParenToken || isParameterHelper(token1)) {
                    return parseParameterList();
                }
            }

            return undefined;
        }

        function parseParameterList(): ParameterListSyntax {
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);
            var parameters: ISeparatedSyntaxList<ParameterSyntax>;

            if (openParenToken.fullWidth() > 0) {
                parameters = parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.ParameterList_Parameters);
            }

            return new ParameterListSyntax(parseNodeData, openParenToken, parameters || <any>[], eatToken(SyntaxKind.CloseParenToken));
        }

        function parseOptionalTypeAnnotation(allowStringLiteral: boolean): TypeAnnotationSyntax {
            return currentToken().kind === SyntaxKind.ColonToken ? parseTypeAnnotation(allowStringLiteral) : undefined;
        }

        function parseTypeAnnotationType(allowStringLiteral: boolean): ITypeSyntax {
            if (allowStringLiteral) {
                var _currentToken = currentToken();
                if (_currentToken.kind === SyntaxKind.StringLiteral) {
                    return consumeToken(_currentToken);
                }
            }

            return parseType();
        }

        function parseTypeAnnotation(allowStringLiteral: boolean): TypeAnnotationSyntax {
            return new TypeAnnotationSyntax(parseNodeData, consumeToken(currentToken()), parseTypeAnnotationType(allowStringLiteral));
        }

        function isType(): boolean {
            var _currentToken = currentToken();

            switch (_currentToken.kind) {
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.NewKeyword:
                    return true;
                default:
                    return isIdentifier(_currentToken);
            }
        }

        function parseTypeOrExpression(): ISyntaxNodeOrToken {
            var result: ISyntaxNodeOrToken = tryParseType();
            if (result) {
                return result;
            }

            var _currentToken = currentToken();
            if (isExpression(_currentToken)) {
                // We parse out an expression here, but we very specifically ask for a unary 
                // expression, and not just any expression.  That's because if we have:
                //
                //      <X extends "">
                //
                // We do not want the  >  to be consumed as part of the "" expression.  By starting
                // at 'unary' expression and not 'binary' expression, we ensure that we don't accidently
                // consume the >.
                return tryParseUnaryExpressionOrHigher(_currentToken, /*force:*/ true);
            }

            return eatIdentifierToken(DiagnosticCode.Type_expected);
        }

        function parseType(): ITypeSyntax {
            return tryParseType() || eatIdentifierToken(DiagnosticCode.Type_expected);
        }

        function tryParseType(): ITypeSyntax {
            if (isFunctionType()) {
                return parseFunctionType();
            }

            if (currentToken().kind === SyntaxKind.NewKeyword) {
                return parseConstructorType();
            }

            return tryParseUnionTypeOrHigher();
        }

        function tryParseUnionTypeOrHigher(): ITypeSyntax {
            var type = tryParsePrimaryType();

            if (type) {
                var barToken: ISyntaxToken;
                while ((barToken = currentToken()).kind === SyntaxKind.BarToken) {
                    type = new UnionTypeSyntax(parseNodeData, type, consumeToken(barToken), parsePrimaryType());
                } 
            }

            return type;
        }

        function parsePrimaryType(): ITypeSyntax {
            return tryParsePrimaryType() || eatIdentifierToken(DiagnosticCode.Type_expected);
        }
        
        function tryParsePrimaryType(): ITypeSyntax {
            // First consume any underlying element type.
            var type = tryParseNonArrayType();

            // ArrayType:
            //      ElementType   [no LineTerminator here]   [   ]

            // Now, we want to keep consuming pairs of brackets, as long as the opening bracket
            // is on the same line as the last token.
            while (type) {
                var _currentToken = currentToken();

                if (previousTokenHasTrailingNewLine(_currentToken) ||
                    _currentToken.kind !== SyntaxKind.OpenBracketToken) {
                    break;
                }

                type = new ArrayTypeSyntax(parseNodeData, type, consumeToken(_currentToken), eatToken(SyntaxKind.CloseBracketToken));
            }

            return type;
        }

        function parseTypeQuery(typeOfKeyword: ISyntaxToken): TypeQuerySyntax {
            return new TypeQuerySyntax(parseNodeData, consumeToken(typeOfKeyword), parseName(/*allowIdentifierNames:*/ true));
        }

        function tryParseNonArrayType(): ITypeSyntax {
            var _currentToken = currentToken();
            switch (_currentToken.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.StringKeyword:
                    // if any of these are followed by '.', then this is actually a module name,
                    // and these keywords will be reinterpreted as an identifier.
                    if (peekToken(1).kind === SyntaxKind.DotToken) {
                        break;
                    }

                    return consumeToken(_currentToken);
                case SyntaxKind.VoidKeyword:      return consumeToken(_currentToken);
                case SyntaxKind.OpenParenToken:   return parseParenthesizedType(_currentToken);
                case SyntaxKind.OpenBraceToken:   return parseObjectType();
                case SyntaxKind.TypeOfKeyword:    return parseTypeQuery(_currentToken);
                case SyntaxKind.OpenBracketToken: return parseTupleType(_currentToken);
            }

            return tryParseNameOrGenericType();
        }

        function parseParenthesizedType(openParenToken: ISyntaxToken): ParenthesizedTypeSyntax {
            return new ParenthesizedTypeSyntax(parseNodeData, consumeToken(openParenToken), parseType(), eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseNameOrGenericType(): ITypeSyntax {
            var name = tryParseName(/*allowIdentifierNames*/ false);
            if (name === undefined) {
                return undefined;
            }

            // TypeReference:
            //      TypeName   [no LineTerminator here]   TypeArgumentsopt
            //
            // Only consume type arguments if they appear on the same line.
            if (previousTokenHasTrailingNewLine(currentToken())) {
                return name;
            }

            var typeArgumentList = tryParseTypeArgumentList(/*inExpression:*/ false);
            return !typeArgumentList
                ? name
                : new GenericTypeSyntax(parseNodeData, name, typeArgumentList);
        }

        function isFunctionType(): boolean {
            var token0 = currentToken();
            var token0Kind = token0.kind;

            // If we see a  <  then we consider ourselves to be definitely in a (generic) function type.
            if (token0Kind === SyntaxKind.LessThanToken) {
                return true;
            }

            // If we don't see a  <  then we have to see an open paren for this to be a function 
            // type.  However, an open paren may also start a parenthesized type.  So we need to
            // do some lookahead to see what we've actually got.  If we don't see enough to be
            // sure that it's a function type, then we go ahead with the assumption that it's a 
            // parenthesized type.
            if (token0Kind === SyntaxKind.OpenParenToken) {
                var token1 = peekToken(1);
                var token1Kind = token1.kind;

                if (token1Kind === SyntaxKind.CloseParenToken || token1Kind === SyntaxKind.DotDotDotToken) {
                    // () 
                    // (...
                    //
                    // Both are definitely function types, and could not be paren types.
                    return true;
                }

                if (isModifierKind(token1Kind) || isIdentifier(token1)) {
                    // (id
                    // could be a function type or a parenthesized type.

                    var token2 = peekToken(2);
                    var token2Kind = token2.kind;

                    if (token2Kind === SyntaxKind.ColonToken ||
                        token2Kind === SyntaxKind.CommaToken ||
                        token2Kind === SyntaxKind.QuestionToken ||
                        token2Kind === SyntaxKind.EqualsToken ||
                        isIdentifier(token2) ||
                        isModifierKind(token2Kind)) {
                        // ( id :
                        // ( id ,
                        // ( id ?
                        // ( id =
                        // ( modifier id
                        //
                        // All of these are definitely a function type and not a parenthesized type.
                        return true;
                    }

                    if (token2Kind === SyntaxKind.CloseParenToken) {
                        // ( id )
                        //
                        // Only a function type if we see an arrow following it.
                        return peekToken(3).kind === SyntaxKind.EqualsGreaterThanToken;
                    }
                }
            }

            // Anything else is a parenthesized type.
            return false;
        }

        function parseFunctionType(): FunctionTypeSyntax {
            var typeParameterList = tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false);
            var parameterList = parseParameterList();

            return new FunctionTypeSyntax(parseNodeData,
                typeParameterList, parameterList, eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
        }

        function parseConstructorType(): ConstructorTypeSyntax {
            return new ConstructorTypeSyntax(parseNodeData,
                eatToken(SyntaxKind.NewKeyword), tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false),
                parseParameterList(), eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
        }

        function isParameter(): boolean {
            if (currentNode() && currentNode().kind === SyntaxKind.Parameter) {
                return true;
            }

            return isParameterHelper(currentToken());
        }

        function isParameterHelper(token: ISyntaxToken): boolean {
            var tokenKind = token.kind;
            return tokenKind === SyntaxKind.DotDotDotToken ||
                   isModifierKind(tokenKind) ||
                   isIdentifier(token);
        }

        function eatSimpleParameter() {
            return new ParameterSyntax(parseNodeData,
                /*dotDotDotToken:*/ undefined, /*modifiers:*/ [], eatIdentifierToken(),
                /*questionToken:*/ undefined, /*typeAnnotation:*/ undefined, /*equalsValueClause:*/ undefined);
        }

        function tryParseParameter(): ParameterSyntax {
            var node = currentNode();
            if (node && node.kind === SyntaxKind.Parameter) {
                consumeNode(node);
                return <ParameterSyntax>node;
            }

            var dotDotDotToken = tryEatToken(SyntaxKind.DotDotDotToken);
            var modifiers = parseModifiers();

            // If we're not forcing, and we don't see anything to indicate this is a parameter, then 
            // bail out.
            var _currentToken = currentToken();
            if (!isIdentifier(_currentToken) && !dotDotDotToken && modifiers.length === 0) {
                // ERROR RECOVERY:
                // If we see a modifier alone in a parameter list, like:      foo(static)
                //
                // then treat it like modifier, and continue parsing the parameter.
                if (isModifierKind(_currentToken.kind)) {
                    modifiers = Syntax.list([consumeToken(_currentToken)]);
                }
                else {
                    return undefined;
                }
            }

            var identifier = eatIdentifierToken();
            var questionToken = tryEatToken(SyntaxKind.QuestionToken);
            var typeAnnotation = parseOptionalTypeAnnotation(/*allowStringLiteral:*/ true);

            var equalsValueClause: EqualsValueClauseSyntax = undefined;
            if (isEqualsValueClause(/*inParameter*/ true)) {
                equalsValueClause = parseEqualsValueClause(/*allowIn:*/ true);
            }

            return new ParameterSyntax(parseNodeData, dotDotDotToken, modifiers, identifier, questionToken, typeAnnotation, equalsValueClause);
        }

        function parseSyntaxList<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState, processItems?: (items: any[]) => void): T[] {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << currentListType);

            var result = parseSyntaxListWorker<T>(currentListType, processItems);

            listParsingState = savedListParsingState;

            return result;
        }

        function parseSeparatedSyntaxList<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState): ISeparatedSyntaxList<T> {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << currentListType);

            var result = parseSeparatedSyntaxListWorker<T>(currentListType);

            listParsingState = savedListParsingState;

            return result;
        }

        // Returns true if we should abort parsing.
        function abortParsingListOrMoveToNextToken<T extends ISyntaxNodeOrToken>(
                currentListType: ListParsingState,
                nodeAndSeparators: ISyntaxNodeOrToken[]): boolean {

            // Ok.  We're at a token that is not a terminator for the list and wasn't the start of 
            // an item in the list. Definitely report an error for this token.
            reportUnexpectedTokenDiagnostic(currentListType);

            // Now, check if the token is a terminator for one our parent lists, or the start of an
            // item in one of our parent lists.  If so, we won't want to consume the token.  We've 
            // already reported the error, so just return to our caller so that a higher up 
            // production can consume it.
            for (var state = ListParsingState.LastListParsingState; state >= ListParsingState.FirstListParsingState; state--) {
                if ((listParsingState & (1 << state)) !== 0) {
                    if (isExpectedListTerminator(state) || isExpectedListItem(state, /*inErrorRecovery:*/ true)) {
                        // Abort parsing this list.
                        return true;
                    }
                }
            }

            // Otherwise, if none of the lists we're in can capture this token, then we need to 
            // unilaterally skip it.  Note: we've already reported an error above.
            skipToken(currentToken());
 
            // Continue parsing this list.  Attach this token to whatever we've seen already.
            return false;
        }

        function tryParseExpectedListItem(
                currentListType: ListParsingState, inErrorRecovery: boolean, items: ISyntaxNodeOrToken[], processItems: (items: ISyntaxNodeOrToken[]) => void): boolean {
            var item = tryParseExpectedListItemWorker(currentListType, inErrorRecovery);

            if (item === undefined) {
                return false;
            }
            // Debug.assert(item !== undefined);

            items.push(item);

            if (processItems) {
                processItems(items);
            }

            return true;
        }

        function listIsTerminated(currentListType: ListParsingState): boolean {
            return isExpectedListTerminator(currentListType) ||
                   currentToken().kind === SyntaxKind.EndOfFileToken;
        }

        function parseSyntaxListWorker<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState, processItems: (items: ISyntaxNodeOrToken[]) => void ): T[] {
            var items: T[] = [];

            while (true) {
                // Try to parse an item of the list.  If we fail then decide if we need to abort or 
                // continue parsing.
                var succeeded = tryParseExpectedListItem(currentListType, /*inErrorRecovery:*/ false, items, processItems);

                if (!succeeded) {
                    // We weren't able to parse out a list element.

                    // That may have been because the list is complete.  In that case, break out 
                    // and return the items we were able parse.
                    if (listIsTerminated(currentListType)) {
                        break;
                    }

                    // List wasn't complete and we didn't get an item.  Figure out if we should bail out
                    // or skip a token and continue.
                    var abort = abortParsingListOrMoveToNextToken(currentListType, items);
                    if (abort) {
                        break;
                    }
                }

                // We either parsed an element.  Or we failed to, but weren't at the end of the list
                // and didn't want to abort. Continue parsing elements.
            }

            return Syntax.list<T>(items);
        }

        function parseSeparatedSyntaxListWorker<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState): ISeparatedSyntaxList<T> {
            var nodesAndSeparators: ISyntaxNodeOrToken[] = [];

            // Debug.assert(nodes.length === 0);
            // Debug.assert(separators.length === 0);
            // Debug.assert(skippedTokens.length === 0);
            // Debug.assert(<any>skippedTokens !== nodes);
            // Debug.assert(skippedTokens !== separators);
            // Debug.assert(<any>nodes !== separators);

            var _separatorKind = currentListType === ListParsingState.ObjectType_TypeMembers ? SyntaxKind.SemicolonToken : SyntaxKind.CommaToken;
            var allowAutomaticSemicolonInsertion = _separatorKind === SyntaxKind.SemicolonToken;

            var inErrorRecovery = false;
            while (true) {
                // Try to parse an item of the list.  If we fail then decide if we need to abort or 
                // continue parsing.

                // Debug.assert(oldItemsCount % 2 === 0);
                var succeeded = tryParseExpectedListItem(currentListType, inErrorRecovery, nodesAndSeparators, /*processItems:*/ undefined);

                if (!succeeded) {
                    // We weren't able to parse out a list element.
                    // Debug.assert(items === undefined || items.length % 2 === 0);
                    
                    // That may have been because the list is complete.  In that case, break out 
                    // and return the items we were able parse.
                    if (listIsTerminated(currentListType)) {
                        break;
                    }

                    // List wasn't complete and we didn't get an item.  Figure out if we should bail out
                    // or skip a token and continue.
                    var abort = abortParsingListOrMoveToNextToken(currentListType, nodesAndSeparators);
                    if (abort) {
                        break;
                    }
                    else {
                        // We just skipped a token.  We're now in error recovery mode.
                        inErrorRecovery = true;
                        continue;
                    }
                }

                // Debug.assert(newItemsCount % 2 === 1);

                // We were able to successfully parse out a list item.  So we're no longer in error
                // recovery.
                inErrorRecovery = false;

                // Now, we have to see if we have a separator or not.  If we do have a separator
                // we've got to consume it and continue trying to parse list items.  Note: we always
                // allow 'comma' as a separator (for error tolerance).  We will later do a post pass
                // to report when a comma was used improperly in a list that needed semicolons.
                var _currentToken = currentToken();
                var tokenKind = _currentToken.kind;
                if (tokenKind === _separatorKind || tokenKind === SyntaxKind.CommaToken) {
                    // Consume the last separator and continue parsing list elements.
                    nodesAndSeparators.push(consumeToken(_currentToken));
                    continue;
                }

                // We didn't see the expected separator.  There are two reasons this might happen.
                // First, we may actually be at the end of the list.  If we are, then we're done
                // parsing list elements.  
                if (listIsTerminated(currentListType)) {
                    break;
                }

                // Otherwise, it might be a case where we can parse out an implicit semicolon.

                // Note: it's important that we check this *after* the check above for
                // 'listIsTerminated'.  Consider the following case:
                //
                //      {
                //          a       // <-- just finished parsing 'a'
                //      }
                //
                // Automatic semicolon insertion rules state: "When, as the program is parsed from
                // left to right, a token (called the offending token) is encountered that is not 
                // allowed by any production of the grammar".  So we should only ever insert a 
                // semicolon if we couldn't consume something normally.  in the above case, we can
                // consume the '}' just fine.  So ASI doesn't apply.

                if (allowAutomaticSemicolonInsertion && canEatAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
                    var semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) || Syntax.emptyToken(SyntaxKind.SemicolonToken);
                    nodesAndSeparators.push(semicolonToken);
                    // Debug.assert(items.length % 2 === 0);
                    continue;
                }

                // We weren't at the end of the list.  And thre was no separator we could parse out.
                // Try parse the separator we expected, and continue parsing more list elements.
                // This time mark that we're in error recovery mode though.
                //
                // Note: trying to eat this token will emit the appropriate diagnostic.
                nodesAndSeparators.push(eatToken(_separatorKind));

                // Now that we're in 'error recovery' mode we cantweak some parsing rules as 
                // appropriate.  For example, if we have:
                //
                //      var v = { a
                //      return
                //
                // Then we'll be missing the comma.  As such, we want to parse 'return' in a less
                // tolerant manner.  Normally 'return' could be a property in an object literal.
                // However, in error recovery mode, we do *not* want it to be.
                //
                // Continue trying to parse out list elements.
                inErrorRecovery = true;
            }

            return Syntax.separatedList<T>(nodesAndSeparators);
        }

        function reportUnexpectedTokenDiagnostic(listType: ListParsingState): void {
            var token = currentToken();

            var diagnostic = new Diagnostic(fileName, source.text.lineMap(),
                start(token, source.text), width(token), DiagnosticCode.Unexpected_token_0_expected, [getExpectedListElementType(listType)]);
            addDiagnostic(diagnostic);
        }

        function addDiagnostic(diagnostic: Diagnostic): void {
            // Except: if we already have a diagnostic for this position, don't report another one.
            if (diagnostics.length > 0 &&
                diagnostics[diagnostics.length - 1].start() === diagnostic.start()) {
                return;
            }

            diagnostics.push(diagnostic);
        }

        function isExpectedListTerminator(currentListType: ListParsingState): boolean {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                            return isExpectedSourceUnit_ModuleElementsTerminator();
                case ListParsingState.ClassDeclaration_ClassElements:                       return isExpectedClassDeclaration_ClassElementsTerminator();
                case ListParsingState.ModuleDeclaration_ModuleElements:                     return isExpectedModuleDeclaration_ModuleElementsTerminator();
                case ListParsingState.SwitchStatement_SwitchClauses:                        return isExpectedSwitchStatement_SwitchClausesTerminator();
                case ListParsingState.SwitchClause_Statements:                              return isExpectedSwitchClause_StatementsTerminator();
                case ListParsingState.Block_Statements:                                     return isExpectedBlock_StatementsTerminator();
                case ListParsingState.TryBlock_Statements:                                  return isExpectedTryBlock_StatementsTerminator();
                case ListParsingState.CatchBlock_Statements:                                return isExpectedCatchBlock_StatementsTerminator();
                case ListParsingState.EnumDeclaration_EnumElements:                         return isExpectedEnumDeclaration_EnumElementsTerminator();
                case ListParsingState.ObjectType_TypeMembers:                               return isExpectedObjectType_TypeMembersTerminator();
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:          return isExpectedClassOrInterfaceDeclaration_HeritageClausesTerminator();
                case ListParsingState.HeritageClause_TypeNameList:                          return isExpectedHeritageClause_TypeNameListTerminator();
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return isExpectedVariableDeclaration_VariableDeclarators_AllowInTerminator();
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return isExpectedVariableDeclaration_VariableDeclarators_DisallowInTerminator();
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return isExpectedArgumentList_AssignmentExpressionsTerminator();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return isExpectedObjectLiteralExpression_PropertyAssignmentsTerminator();
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return isExpectedLiteralExpression_AssignmentExpressionsTerminator();
                case ListParsingState.ParameterList_Parameters:                             return isExpectedParameterList_ParametersTerminator();
                case ListParsingState.IndexSignature_Parameters:                            return isExpectedIndexSignature_ParametersTerminator();
                case ListParsingState.TypeArgumentList_Types:                               return isExpectedTypeArgumentList_TypesTerminator();
                case ListParsingState.TypeParameterList_TypeParameters:                     return isExpectedTypeParameterList_TypeParametersTerminator();
                case ListParsingState.TupleType_Types:                                      return isExpectedTupleType_TypesTerminator();
                default:
                    throw Errors.invalidOperation();
            }
        }

        function isExpectedSourceUnit_ModuleElementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.EndOfFileToken;
        }

        function isExpectedEnumDeclaration_EnumElementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedModuleDeclaration_ModuleElementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedObjectType_TypeMembersTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedObjectLiteralExpression_PropertyAssignmentsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedLiteralExpression_AssignmentExpressionsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBracketToken;
        }

        function isExpectedTypeArgumentList_TypesTerminator(): boolean {
            var token = currentToken();
            var tokenKind = token.kind;
            if (tokenKind === SyntaxKind.GreaterThanToken) {
                return true;
            }

            // If we're at a token that can follow the type argument list, then we'll also consider
            // the list terminated.
            if (canFollowTypeArgumentListInExpression(tokenKind)) {
                return true;
            }

            // TODO: add more cases as necessary for error tolerance.
            return false;
        }

        function isExpectedTupleType_TypesTerminator(): boolean {
            var token = currentToken();
            var tokenKind = token.kind;
            if (tokenKind === SyntaxKind.CloseBracketToken) {
                return true;
            }

            // TODO: add more cases as necessary for error tolerance.
            return false;
        }

        function isExpectedTypeParameterList_TypeParametersTerminator(): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.GreaterThanToken) {
                return true;
            }

            // These commonly follow type parameter lists.
            if (tokenKind === SyntaxKind.OpenParenToken ||
                tokenKind === SyntaxKind.OpenBraceToken ||
                tokenKind === SyntaxKind.ExtendsKeyword ||
                tokenKind === SyntaxKind.ImplementsKeyword) {
                return true;
            }

            // TODO: add more cases as necessary for error tolerance.
            return false;
        }

        function isExpectedParameterList_ParametersTerminator(): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.CloseParenToken) {
                return true;
            }

            // We may also see a { in an error case.  i.e.:
            // function (a, b, c  {
            if (tokenKind === SyntaxKind.OpenBraceToken) {
                return true;
            }

            // We may also see a => in an error case.  i.e.:
            // (f: number => { ... }
            if (tokenKind === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            return false;
        }

        function isExpectedIndexSignature_ParametersTerminator() {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.CloseBracketToken) {
                return true;
            }

            // We may also see a { in an error case.  i.e.:
            // function (a, b, c  {
            if (tokenKind === SyntaxKind.OpenBraceToken) {
                return true;
            }

            return false;
        }

        function isExpectedVariableDeclaration_VariableDeclarators_DisallowInTerminator(): boolean {
            // This is the case when we're parsing variable declarations in a for/for-in statement.
            var tokenKind = currentToken().kind;

            if (tokenKind === SyntaxKind.SemicolonToken ||
                tokenKind === SyntaxKind.CloseParenToken) {
                return true;
            }

            if (tokenKind === SyntaxKind.InKeyword) {
                return true;
            }

            return false;
        }

        function isExpectedVariableDeclaration_VariableDeclarators_AllowInTerminator(): boolean {
            //// This is the case when we're parsing variable declarations in a variable statement.

            // ERROR RECOVERY TWEAK:
            // For better error recovery, if we see a => then we just stop immediately.  We've got an
            // arrow function here and it's going to be very unlikely that we'll resynchronize and get
            // another variable declaration.
            if (currentToken().kind === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            // We're done when we can eat a semicolon.
            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        function isExpectedClassOrInterfaceDeclaration_HeritageClausesTerminator(): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.OpenBraceToken || tokenKind === SyntaxKind.CloseBraceToken) {
                return true;
            }

            return false;
        }

        function isExpectedHeritageClause_TypeNameListTerminator(): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind === SyntaxKind.ExtendsKeyword || tokenKind === SyntaxKind.ImplementsKeyword) {
                return true;
            }

            if (isExpectedClassOrInterfaceDeclaration_HeritageClausesTerminator()) {
                return true;
            }

            return false;
        }

        function isExpectedArgumentList_AssignmentExpressionsTerminator(): boolean {
            var token0 = currentToken();
            var tokenKind = token0.kind;
            return tokenKind === SyntaxKind.CloseParenToken ||
                   tokenKind === SyntaxKind.SemicolonToken;
        }

        function isExpectedClassDeclaration_ClassElementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedSwitchStatement_SwitchClausesTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedSwitchClause_StatementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken ||
                   isSwitchClause();
        }

        function isExpectedBlock_StatementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.CloseBraceToken;
        }

        function isExpectedTryBlock_StatementsTerminator(): boolean {
            var tokenKind = currentToken().kind;
            return tokenKind === SyntaxKind.CatchKeyword ||
                    tokenKind === SyntaxKind.FinallyKeyword;
        }

        function isExpectedCatchBlock_StatementsTerminator(): boolean {
            return currentToken().kind === SyntaxKind.FinallyKeyword;
        }

        function isExpectedListItem(currentListType: ListParsingState, inErrorRecovery: boolean): any {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                            return isModuleElement(inErrorRecovery);
                case ListParsingState.ClassDeclaration_ClassElements:                       return isClassElement(inErrorRecovery);
                case ListParsingState.ModuleDeclaration_ModuleElements:                     return isModuleElement(inErrorRecovery);
                case ListParsingState.SwitchStatement_SwitchClauses:                        return isSwitchClause();
                case ListParsingState.SwitchClause_Statements:                              return isStatement(modifierCount(), inErrorRecovery);
                case ListParsingState.Block_Statements:                                     return isStatement(modifierCount(), inErrorRecovery);
                // These two are special.  They're just augmentations of "Block_Statements" 
                // used so we can abort out of the try block if we see a 'catch' or 'finally'
                // keyword.  There are no additional list items that they add, so we just
                // return 'false' here.
                case ListParsingState.TryBlock_Statements:                                  return false;
                case ListParsingState.CatchBlock_Statements:                                return false;
                case ListParsingState.EnumDeclaration_EnumElements:                         return isEnumElement(inErrorRecovery);
                case ListParsingState.ObjectType_TypeMembers:                               return isTypeMember(inErrorRecovery);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:          return isHeritageClause();
                case ListParsingState.HeritageClause_TypeNameList:                          return isHeritageClauseTypeName();
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return isVariableDeclarator();
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return isVariableDeclarator();
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return isExpectedArgumentList_AssignmentExpression();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return isPropertyAssignment(inErrorRecovery);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return isAssignmentOrOmittedExpression();
                case ListParsingState.ParameterList_Parameters:                             return isParameter();
                case ListParsingState.IndexSignature_Parameters:                            return isParameter();
                case ListParsingState.TypeArgumentList_Types:                               return isType();
                case ListParsingState.TypeParameterList_TypeParameters:                     return isTypeParameter();
                case ListParsingState.TupleType_Types:                                      return isType();
                default: throw Errors.invalidOperation();
            }
        }

        function isExpectedArgumentList_AssignmentExpression(): boolean {
            var _currentToken = currentToken();
            if (isExpression(_currentToken)) {
                return true;
            }

            // If we're on a comma then the user has written something like "Foo(a,," or "Foo(,".
            // Instead of skipping the comma, create an empty expression to go before the comma 
            // so that the tree is more well formed and doesn't have skipped tokens.
            if (_currentToken.kind === SyntaxKind.CommaToken) {
                return true;
            }

            return false;
        }

        function tryParseExpectedListItemWorker(currentListType: ListParsingState, inErrorRecovery: boolean): ISyntaxNodeOrToken {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                            return tryParseModuleElement(inErrorRecovery);
                case ListParsingState.ClassDeclaration_ClassElements:                       return tryParseClassElement(inErrorRecovery);
                case ListParsingState.ModuleDeclaration_ModuleElements:                     return tryParseModuleElement(inErrorRecovery);
                case ListParsingState.SwitchStatement_SwitchClauses:                        return tryParseSwitchClause();
                case ListParsingState.SwitchClause_Statements:                              return tryParseStatement(inErrorRecovery);
                case ListParsingState.Block_Statements:                                     return tryParseStatement(inErrorRecovery);
                case ListParsingState.TryBlock_Statements:                                  return tryParseStatement(inErrorRecovery);
                case ListParsingState.CatchBlock_Statements:                                return tryParseStatement(inErrorRecovery);
                case ListParsingState.EnumDeclaration_EnumElements:                         return tryParseEnumElement(inErrorRecovery);
                case ListParsingState.ObjectType_TypeMembers:                               return tryParseTypeMember(inErrorRecovery);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:          return tryParseHeritageClause();
                case ListParsingState.HeritageClause_TypeNameList:                          return tryParseHeritageClauseTypeName();
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return tryParseVariableDeclarator(/*allowIn:*/ true);
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return tryParseVariableDeclarator(/*allowIn:*/ false);
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return tryParseArgumentListExpression();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return tryParsePropertyAssignment(inErrorRecovery);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return tryParseAssignmentOrOmittedExpression();
                case ListParsingState.ParameterList_Parameters:                             return tryParseParameter();
                case ListParsingState.IndexSignature_Parameters:                            return tryParseParameter();
                case ListParsingState.TypeArgumentList_Types:                               return tryParseType();
                case ListParsingState.TypeParameterList_TypeParameters:                     return tryParseTypeParameter();
                case ListParsingState.TupleType_Types:                                      return tryParseType();
                default: throw Errors.invalidOperation();
            }
        }

        function getExpectedListElementType(currentListType: ListParsingState): string {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                            return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, undefined);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:          return '{';
                case ListParsingState.ClassDeclaration_ClassElements:                       return getLocalizedText(DiagnosticCode.constructor_function_accessor_or_variable, undefined);
                case ListParsingState.ModuleDeclaration_ModuleElements:                     return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, undefined);
                case ListParsingState.SwitchStatement_SwitchClauses:                        return getLocalizedText(DiagnosticCode.case_or_default_clause, undefined);
                case ListParsingState.SwitchClause_Statements:                              return getLocalizedText(DiagnosticCode.statement, undefined);
                case ListParsingState.Block_Statements:                                     return getLocalizedText(DiagnosticCode.statement, undefined);
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return getLocalizedText(DiagnosticCode.identifier, undefined);
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return getLocalizedText(DiagnosticCode.identifier, undefined);
                case ListParsingState.EnumDeclaration_EnumElements:                         return getLocalizedText(DiagnosticCode.identifier, undefined);
                case ListParsingState.ObjectType_TypeMembers:                               return getLocalizedText(DiagnosticCode.call_construct_index_property_or_function_signature, undefined);
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return getLocalizedText(DiagnosticCode.expression, undefined);
                case ListParsingState.HeritageClause_TypeNameList:                          return getLocalizedText(DiagnosticCode.type_name, undefined);
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return getLocalizedText(DiagnosticCode.property_or_accessor, undefined);
                case ListParsingState.ParameterList_Parameters:                             return getLocalizedText(DiagnosticCode.parameter, undefined);
                case ListParsingState.IndexSignature_Parameters:                            return getLocalizedText(DiagnosticCode.parameter, undefined);
                case ListParsingState.TypeArgumentList_Types:                               return getLocalizedText(DiagnosticCode.type, undefined);
                case ListParsingState.TypeParameterList_TypeParameters:                     return getLocalizedText(DiagnosticCode.type_parameter, undefined);
                case ListParsingState.TupleType_Types:                                      return getLocalizedText(DiagnosticCode.type, undefined);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return getLocalizedText(DiagnosticCode.expression, undefined);
                default:                                                                    throw Errors.invalidOperation();
            }
        }

        return parseSyntaxTree;
    }

    // The precedence of expressions in typescript.  While we're parsing an expression, we will 
    // continue to consume and form new trees if the precedence is *strictly* greater than our current
    // precedence.  For example, if we have: a + b * c, we will first parse 'a' with precedence 1 (Lowest). 
    // We will then see the + with precedence 10.  10 is greater than 1 so we will decide to create
    // a binary expression with the result of parsing the sub expression "b * c".  We'll then parse
    // the term 'b' (passing in precedence 10).  We will then see the * with precedence 11.  11 is
    // greater than 10, so we will create a binary expression from "b" and "c", return that, and 
    // join it with "a" producing:
    //
    //      +
    //     / \
    //    a   *
    //       / \
    //      b   c
    //
    // If we instead had: "a * b + c", we would first parser 'a' with precedence 1 (lowest).  We would then see 
    // the * with precedence 11.  11 is greater than 1 so we will decide to create a binary expression
    // with the result of parsing the sub expression "b + c".  We'll then parse the term 'b' (passing in
    // precedence 11).  We will then see the + with precedence 10.  10 is less than 11, so we won't 
    // continue parsing subexpressions and will just return the expression 'b'.  The caller will join 
    // that into "a * b" (and will be back at precedence 1). It will then see the + with precedence 10.
    // 10 is greater than 1 so it will parse the sub expression and make a binary expression out of it
    // producing:
    //
    //        +
    //       / \
    //      *   c
    //     / \
    //    a   b
    //
    // Note: because all these binary expressions have left-to-right precedence, if we see a * b * c 
    // then we parse it as:
    //
    //        *
    //       / \
    //      *   c
    //     / \
    //    a   b
    //
    // The code to do this uses the above logic.  It will see an operator with the same precedence,
    // and so it won't consume it.
    enum BinaryExpressionPrecedence {
        Lowest = 1,

        // Intuitively, logical || have the lowest precedence.  "a || b && c" is "a || (b && c)", not
        // "(a || b) && c"
        LogicalOrExpressionPrecedence = 2,
        LogicalAndExpressionPrecedence = 3,
        BitwiseOrExpressionPrecedence = 4,
        BitwiseExclusiveOrExpressionPrecedence = 5,
        BitwiseAndExpressionPrecedence = 6,
        EqualityExpressionPrecedence = 7,
        RelationalExpressionPrecedence = 8,
        ShiftExpressionPrecdence = 9,
        AdditiveExpressionPrecedence = 10,

        // Intuitively, multiplicative expressions have the highest precedence.  After all, if you have:
        //   a + b * c
        //
        // Then you have "a + (b * c)" not "(a + b) * c"
        MultiplicativeExpressionPrecedence = 11,
    }

    // The current state of the parser wrt to list parsing.  The way to read these is as:
    // CurrentProduction_SubList.  i.e. "Block_Statements" means "we're parsing a Block, and we're 
    // currently parsing list of statements within it".  This is used by the list parsing mechanism
    // to parse the elements of the lists, and recover from errors we encounter when we run into 
    // unexpected code.
    // 
    // For example, when we are in ArgumentList_Arguments, we will continue trying to consume code 
    // as long as "isArgument" is true.  If we run into a token for which "isArgument" is not true 
    // we will do the following:
    //
    // If the token is a StopToken for ArgumentList_Arguments (like ")" ) then we will stop parsing
    // the list of arguments with no error.
    //
    // Otherwise, we *do* report an error for this unexpected token, and then enter error recovery 
    // mode to decide how to try to recover from this unexpected token.
    //
    // Error recovery will walk up the list of states we're in seeing if the token is a stop token
    // for that construct *or* could start another element within what construct.  For example, if
    // the unexpected token was '}' then that would be a stop token for Block_Statements. 
    // Alternatively, if the unexpected token was 'return', then that would be a start token for 
    // the next statment in Block_Statements.
    // 
    // If either of those cases are true, We will then return *without* consuming  that token. 
    // (Remember, we've already reported an error).  Now we're just letting the higher up parse 
    // constructs eventually try to consume that token.
    //
    // If none of the higher up states consider this a stop or start token, then we will simply 
    // consume the token and add it to our list of 'skipped tokens'.  We will then repeat the 
    // above algorithm until we resynchronize at some point.
    enum ListParsingState {
        SourceUnit_ModuleElements = 0,
        ClassDeclaration_ClassElements = 1,
        ModuleDeclaration_ModuleElements = 2,
        SwitchStatement_SwitchClauses = 3,
        SwitchClause_Statements = 4,
        Block_Statements = 5,
        TryBlock_Statements = 6,
        CatchBlock_Statements = 7,
        EnumDeclaration_EnumElements = 8,
        ObjectType_TypeMembers = 9,
        ClassOrInterfaceDeclaration_HeritageClauses = 10,
        HeritageClause_TypeNameList = 11,
        VariableDeclaration_VariableDeclarators_AllowIn = 12,
        VariableDeclaration_VariableDeclarators_DisallowIn = 13,
        ArgumentList_AssignmentExpressions = 14,
        ObjectLiteralExpression_PropertyAssignments = 15,
        ArrayLiteralExpression_AssignmentExpressions = 16,
        ParameterList_Parameters = 17,
        IndexSignature_Parameters = 18,
        TypeArgumentList_Types = 19,
        TypeParameterList_TypeParameters = 20,
        TupleType_Types = 21,

        FirstListParsingState = SourceUnit_ModuleElements,
        LastListParsingState = TupleType_Types,
    }

    // We keep the parser around as a singleton.  This is because calling createParser is actually
    // expensive in V8 currently.  We then clear it after a parse so that it doesn't  keep state 
    // alive unintentionally.
    var parseSyntaxTree = createParseSyntaxTree();

    export function parse(fileName: string, text: ISimpleText, languageVersion: ts.ScriptTarget, isDeclaration: boolean): SyntaxTree {
        return parseSource(Scanner.createParserSource(fileName, text, languageVersion), isDeclaration);
    }

    export function parseSource(source: IParserSource, isDeclaration: boolean): SyntaxTree {
        return parseSyntaxTree(source, isDeclaration);
    }
}