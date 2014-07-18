///<reference path='references.ts' />

module TypeScript.Parser {
    // The factory used to produce parse tree nodes.  Injected normally by the 
    // TypeScript.Syntax.Abstract or TypeScript.Syntax.Conrete modules.
    export var syntaxFactory: Syntax.ISyntaxFactory;

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

    var arrayPool: any[][] = [];
    var arrayPoolCount: number = 0;

    function getArray(): any[] {
        if (arrayPoolCount === 0) {
            return [];
        }

        arrayPoolCount--;
        var result = arrayPool[arrayPoolCount];
        arrayPool[arrayPoolCount] = null;

        return result;
    }

    function returnZeroLengthArray(array: any[]) {
        if (array.length === 0) {
            returnArray(array);
        }
    }

    function returnArray(array: any[]) {
        array.length = 0;
        arrayPool[arrayPoolCount] = array;
        arrayPoolCount++;
    }

    interface IParserRewindPoint extends IRewindPoint {
        // As we speculatively parse, we may build up diagnostics.  When we rewind we want to 
        // 'forget' that information.In order to do that we store the count of diagnostics and 
        // when we start speculating, and we reset to that count when we're done.  That way the
        // speculative parse does not affect any further results.
        diagnosticsCount: number;

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
            fileName = null;
            source.release();
            source = null; _source = null;

            return result;
        }

        function parseSyntaxTreeWorker(isDeclaration: boolean): SyntaxTree {
            var sourceUnit = parseSourceUnit();

            var allDiagnostics = source.tokenDiagnostics().concat(diagnostics);
            allDiagnostics.sort((a: Diagnostic, b: Diagnostic) => a.start() - b.start());

            return new SyntaxTree(syntaxFactory.isConcrete, sourceUnit, isDeclaration, allDiagnostics, fileName, source.text, languageVersion);
        }

        function getRewindPoint(): IParserRewindPoint {
            var rewindPoint = <IParserRewindPoint>source.getRewindPoint();

            rewindPoint.diagnosticsCount = diagnostics.length;

            // Values we keep around for debug asserting purposes.
            rewindPoint.isInStrictMode = isInStrictMode;
            rewindPoint.listParsingState = listParsingState;

            return rewindPoint;
        }

        function rewind(rewindPoint: IParserRewindPoint): void {
            source.rewind(rewindPoint);

            diagnostics.length = rewindPoint.diagnosticsCount;
        }

        function releaseRewindPoint(rewindPoint: IParserRewindPoint): void {
            // Debug.assert(listParsingState === rewindPoint.listParsingState);
            // Debug.assert(isInStrictMode === rewindPoint.isInStrictMode);

            source.releaseRewindPoint(rewindPoint);
        }

        function currentNode(): ISyntaxNode {
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
            if (node === null || parsedInStrictMode(node) !== isInStrictMode) {
                return null;
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

        function consumeToken(token: ISyntaxToken): ISyntaxToken {
            source.consumeToken(token);
            return token;
        }

        function consumeNode(node: ISyntaxNode): void {
            source.consumeNode(node);
        }

        //this method is called very frequently
        //we should keep it simple so that it can be inlined.
        function eatToken(kind: SyntaxKind): ISyntaxToken {
            var token = currentToken();
            if (token.kind() === kind) {
                return consumeToken(token);
            }

            //slow part of EatToken(SyntaxKind kind)
            return createMissingToken(kind, token);
        }

        // Eats the token if it is there.  Otherwise does nothing.  Will not report errors.
        function tryEatToken(kind: SyntaxKind): ISyntaxToken {
            var _currentToken = currentToken();
            if (_currentToken.kind() === kind) {
                return consumeToken(_currentToken);
            }

            return null;
        }

        // An identifier is basically any word, unless it is a reserved keyword.  so 'foo' is an 
        // identifier and 'return' is not.  Note: a word may or may not be an identifier depending 
        // on the state of the parser.  For example, 'yield' is an identifier *unless* the parser 
        // is in strict mode.
        function isIdentifier(token: ISyntaxToken): boolean {
            var tokenKind = token.kind();

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
            var tokenKind = token.kind();
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
            return isIdentifier(currentToken()) ? eatIdentifierToken() : null;
        }

        // This method should be called when the grammar calls for an *Identifier* and not an
        // *IdentifierName*.
        function eatIdentifierToken(diagnosticCode?: string): ISyntaxToken {
            var token = currentToken();
            if (isIdentifier(token)) {
                consumeToken(token);

                if (token.kind() === SyntaxKind.IdentifierName) {
                    return token;
                }

                return TypeScript.Syntax.convertKeywordToIdentifier(token);
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
            var tokenKind = token.kind();
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

            if (token.kind() === SyntaxKind.SemicolonToken) {
                return true;
            }

            return canEatAutomaticSemicolon(allowWithoutNewline);
        }

        function eatExplicitOrAutomaticSemicolon(allowWithoutNewline: boolean): ISyntaxToken {
            var token = currentToken();

            // If we see a semicolon, then we can definitely eat it.
            if (token.kind() === SyntaxKind.SemicolonToken) {
                return consumeToken(token);
            }

            // Check if an automatic semicolon could go here.  If so, then there's no problem and
            // we can proceed without error.  Return 'null' as there's no actual token for this 
            // position. 
            if (canEatAutomaticSemicolon(allowWithoutNewline)) {
                return null;
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

        function getExpectedTokenDiagnostic(expectedKind: SyntaxKind, actual: ISyntaxToken, diagnosticCode: string): Diagnostic {
            var token = currentToken();

            var args: any[] = null;
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
                    if (actual !== null && SyntaxFacts.isAnyKeyword(actual.kind())) {
                        diagnosticCode = DiagnosticCode.Identifier_expected_0_is_a_keyword;
                        args = [SyntaxFacts.getText(actual.kind())];
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

        function addSkippedTokenAfterNodeOrToken(nodeOrToken: ISyntaxNodeOrToken, skippedToken: ISyntaxToken): ISyntaxNodeOrToken {
            if (isToken(nodeOrToken)) {
                return addSkippedTokenAfterToken(<ISyntaxToken>nodeOrToken, skippedToken);
            }
            else if (isNode(nodeOrToken)) {
                return addSkippedTokenAfterNode(<ISyntaxNode>nodeOrToken, skippedToken);
            }
            else {
                throw Errors.invalidOperation();
            }
        }

        function replaceTokenInParent(oldToken: ISyntaxToken, newToken: ISyntaxToken): void {
            // oldToken may be parented by a node or a list.
            replaceTokenInParentWorker(oldToken, newToken);

            var parent = oldToken.parent;
            newToken.parent = parent;

            // Parent must be a list or a node.  All of those have a 'data' element.
            Debug.assert(isNode(parent) || isList(parent) || isSeparatedList(parent));
            var dataElement = <{ data: number }><any>parent;
            if (dataElement.data) {
                dataElement.data &= SyntaxConstants.NodeParsedInStrictModeMask
            }
        }

        function replaceTokenInParentWorker(oldToken: ISyntaxToken, newToken: ISyntaxToken): void {
            var parent = oldToken.parent;

            if (isNode(parent)) {
                var node = <any>parent;
                for (var key in node) {
                    if (node[key] === oldToken) {
                        node[key] = newToken;
                        return;
                    }
                }
            }
            else if (isList(parent)) {
                var list1 = <ISyntaxNodeOrToken[]>parent;
                for (var i = 0, n = list1.length; i < n; i++) {
                    if (list1[i] === oldToken) {
                        list1[i] = newToken;
                        return;
                    }
                }
            }
            else if (isSeparatedList(parent)) {
                var list2 = <ISyntaxNodeOrToken[]>parent;
                for (var i = 0, n = childCount(list2); i < n; i++) {
                    if (childAt(list2, i) === oldToken) {
                        if (i % 2 === 0) {
                            list2[i / 2] = newToken;
                        }
                        else {
                            list2.separators[(i - 1) / 2] = newToken;
                        }
                        return;
                    }
                }
            }

            throw Errors.invalidOperation();
        }

        function addSkippedTokenAfterNode(node: ISyntaxNode, skippedToken: ISyntaxToken): ISyntaxNode {
            var oldToken = lastToken(node);
            var newToken = addSkippedTokenAfterToken(oldToken, skippedToken);

            replaceTokenInParent(oldToken, newToken);
            return node;
        }

        function addSkippedTokensBeforeNode(node: ISyntaxNode, skippedTokens: ISyntaxToken[]): ISyntaxNode {
            if (skippedTokens.length > 0) {
                var oldToken = firstToken(node);
                var newToken = addSkippedTokensBeforeToken(oldToken, skippedTokens);

                replaceTokenInParent(oldToken, newToken);
            }

            return node;
        }

        function addSkippedTokensBeforeToken(token: ISyntaxToken, skippedTokens: ISyntaxToken[]): ISyntaxToken {
            // Debug.assert(token.fullWidth() > 0 || token.kind() === SyntaxKind.EndOfFileToken);
            // Debug.assert(skippedTokens.length > 0);

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

            // Don't need this array anymore.  Give it back so we can reuse it.
            returnArray(skippedTokens);

            return updatedToken;
        }

        function addSkippedTokensAfterToken(token: ISyntaxToken, skippedTokens: ISyntaxToken[]): ISyntaxToken {
            // Debug.assert(token.fullWidth() > 0);
            if (skippedTokens.length === 0) {
                returnArray(skippedTokens);
                return token;
            }

            var trailingTrivia = token.trailingTrivia(source.text).toArray();

            for (var i = 0, n = skippedTokens.length; i < n; i++) {
                addSkippedTokenToTriviaArray(trailingTrivia, skippedTokens[i]);
            }

            // Don't need this array anymore.  Give it back so we can reuse it.
            returnArray(skippedTokens);
            return Syntax.withTrailingTrivia(token, Syntax.triviaList(trailingTrivia), source.text);
        }

        function addSkippedTokenAfterToken(token: ISyntaxToken, skippedToken: ISyntaxToken): ISyntaxToken {
            // Debug.assert(token.fullWidth() > 0);
            var trailingTrivia = token.trailingTrivia(source.text).toArray();
            addSkippedTokenToTriviaArray(trailingTrivia, skippedToken);

            return Syntax.withTrailingTrivia(token, Syntax.triviaList(trailingTrivia), source.text);
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

        function setStrictMode(_isInStrictMode: boolean) {
            isInStrictMode = _isInStrictMode;
            parseNodeData = _isInStrictMode ? SyntaxConstants.NodeParsedInStrictModeMask : 0;
        }

        function parseSourceUnit(): SourceUnitSyntax {
            var savedIsInStrictMode = isInStrictMode

            var skippedTokens: ISyntaxToken[] = getArray();
            var moduleElements = parseSyntaxList<IModuleElementSyntax>(ListParsingState.SourceUnit_ModuleElements, skippedTokens, updateStrictModeState);

            setStrictMode(savedIsInStrictMode);

            var sourceUnit = new syntaxFactory.SourceUnitSyntax(parseNodeData, moduleElements, currentToken());

            sourceUnit = <SourceUnitSyntax>addSkippedTokensBeforeNode(sourceUnit, skippedTokens);

            if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
                Debug.assert(fullWidth(sourceUnit) === source.text.length());

                if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                    Debug.assert(fullText(sourceUnit) === source.text.substr(0, source.text.length()));
                }
            }

            return sourceUnit;
        }

        function updateStrictModeState(items: any[]): void {
            if (!isInStrictMode) {
                // Check if all the items are directive prologue elements.
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (!SyntaxFacts.isDirectivePrologueElement(item)) {
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
                switch (peekToken(_modifierCount).kind()) {
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
            var currentTokenKind = _currentToken.kind();
            switch (currentTokenKind) {
                case SyntaxKind.ModuleKeyword:
                    if (isIdentifier(nextToken) || nextToken.kind() === SyntaxKind.StringLiteral) {
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
                    if (nextToken.kind() === SyntaxKind.EqualsToken) {
                        return parseExportAssignment();
                    }
                    break;
            }

            return tryParseStatementWorker(_currentToken, currentTokenKind, _modifierCount, inErrorRecovery);
        }

        function parseImportDeclaration(): ImportDeclarationSyntax {
            return new syntaxFactory.ImportDeclarationSyntax(parseNodeData,
                parseModifiers(), eatToken(SyntaxKind.ImportKeyword), eatIdentifierToken(), eatToken(SyntaxKind.EqualsToken), parseModuleReference(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseExportAssignment(): ExportAssignmentSyntax {
            return new syntaxFactory.ExportAssignmentSyntax(parseNodeData,
                eatToken(SyntaxKind.ExportKeyword), eatToken(SyntaxKind.EqualsToken), eatIdentifierToken(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseModuleReference(): IModuleReferenceSyntax {
            return isExternalModuleReference() ? parseExternalModuleReference() : parseModuleNameModuleReference();
        }

        function isExternalModuleReference(): boolean {
            return currentToken().kind() === SyntaxKind.RequireKeyword &&
                   peekToken(1).kind() === SyntaxKind.OpenParenToken;
        }

        function parseExternalModuleReference(): ExternalModuleReferenceSyntax {
            return new syntaxFactory.ExternalModuleReferenceSyntax(parseNodeData,
                eatToken(SyntaxKind.RequireKeyword), eatToken(SyntaxKind.OpenParenToken), eatToken(SyntaxKind.StringLiteral), eatToken(SyntaxKind.CloseParenToken));
        }

        function parseModuleNameModuleReference(): ModuleNameModuleReferenceSyntax {
            return new syntaxFactory.ModuleNameModuleReferenceSyntax(parseNodeData, parseName(/*allowIdentifierNames:*/ false));
        }

        function tryParseTypeArgumentList(inExpression: boolean): TypeArgumentListSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind() !== SyntaxKind.LessThanToken) {
                return null;
            }

            if (!inExpression) {
                // if we're not in an expression, this must be a type argument list.  Just parse
                // it out as such.
                var lessThanToken = consumeToken(_currentToken);

                var skippedTokens: ISyntaxToken[] = getArray();
                var typeArguments = parseSeparatedSyntaxList<ITypeSyntax>(ListParsingState.TypeArgumentList_Types, skippedTokens);
                lessThanToken = addSkippedTokensAfterToken(lessThanToken, skippedTokens);

                return new syntaxFactory.TypeArgumentListSyntax(parseNodeData, lessThanToken, typeArguments, eatToken(SyntaxKind.GreaterThanToken));
            }

            // If we're in an expression, then we only want to consume this as a type argument list
            // if we're sure that it's a type arg list and not an arithmetic expression.

            var rewindPoint = getRewindPoint();

            // We've seen a '<'.  Try to parse it out as a type argument list.
            var lessThanToken = consumeToken(_currentToken);

            var skippedTokens: ISyntaxToken[] = getArray();
            var typeArguments = parseSeparatedSyntaxList<ITypeSyntax>(ListParsingState.TypeArgumentList_Types, skippedTokens);
            var lessThanToken = addSkippedTokensAfterToken(lessThanToken, skippedTokens);

            var greaterThanToken = eatToken(SyntaxKind.GreaterThanToken);

            // We're in a context where '<' could be the start of a type argument list, or part
            // of an arithmetic expression.  We'll presume it's the latter unless we see the '>'
            // and a following token that guarantees that it's supposed to be a type argument list.
            if (greaterThanToken.fullWidth() === 0 || !canFollowTypeArgumentListInExpression(currentToken().kind())) {
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return null;
            }
            else {
                releaseRewindPoint(rewindPoint);
                return new syntaxFactory.TypeArgumentListSyntax(parseNodeData, lessThanToken, typeArguments, greaterThanToken);
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
            if (SyntaxFacts.isAnyKeyword(_currentToken.kind()) &&
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
                return null;
            }

            // Call eatIdentifierName to convert the token to an identifier if it is as keyword.
            var current: INameSyntax = eatIdentifierToken();

            while (shouldContinue && currentToken().kind() === SyntaxKind.DotToken) {
                var dotToken = consumeToken(currentToken());
                var identifierName = eatRightSideOfName(allowIdentifierNames);

                current = new syntaxFactory.QualifiedNameSyntax(parseNodeData, current, dotToken, identifierName);
                shouldContinue = identifierName.fullWidth() > 0;
            }

            return current;
        }

        function parseEnumDeclaration(): EnumDeclarationSyntax {
            var modifiers = parseModifiers();
            var enumKeyword = eatToken(SyntaxKind.EnumKeyword);
            var identifier = eatIdentifierToken();

            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var enumElements = Syntax.emptySeparatedList<EnumElementSyntax>();

            if (openBraceToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                enumElements = parseSeparatedSyntaxList<EnumElementSyntax>(ListParsingState.EnumDeclaration_EnumElements, skippedTokens);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);
            }

            return new syntaxFactory.EnumDeclarationSyntax(parseNodeData, modifiers, enumKeyword, identifier, openBraceToken, enumElements, eatToken(SyntaxKind.CloseBraceToken));
        }

        function isEnumElement(inErrorRecovery: boolean): boolean {
            var node = currentNode();
            if (node !== null && node.kind() === SyntaxKind.EnumElement) {
                return true;
            }

            return isPropertyName(currentToken(), inErrorRecovery);
        }

        function tryParseEnumElementEqualsValueClause(): EqualsValueClauseSyntax {
            return isEqualsValueClause(/*inParameter*/ false) ? parseEqualsValueClause(/*allowIn:*/ true) : null;
        }

        function tryParseEnumElement(inErrorRecovery: boolean): EnumElementSyntax {
            var node = currentNode();
            if (node !== null && node.kind() === SyntaxKind.EnumElement) {
                consumeNode(node);
                return <EnumElementSyntax>node;
            }

            if (!isPropertyName(currentToken(), inErrorRecovery)) {
                return null;
            }

            return new syntaxFactory.EnumElementSyntax(parseNodeData, eatPropertyName(), tryParseEnumElementEqualsValueClause());
        }

        function isModifierKind(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.DeclareKeyword:
                    return true;
            }

            return false;
        }

        function isModifier(token: ISyntaxToken, index: number): boolean {
            if (isModifierKind(token.kind())) {
                // These are modifiers only if we see an actual keyword, identifier, string literal
                // or number following.
                // Note: we also allow [ for error conditions.  
                // [   is for:     static [a: number]
                var nextToken = peekToken(index + 1);
                var nextTokenKind = nextToken.kind();

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
            var tokens: ISyntaxToken[] = getArray();

            while (true) {
                var token = currentToken();
                if (isModifier(token, /*index:*/ 0)) {
                    tokens.push(consumeToken(token));
                    continue;
                }

                break;
            }

            var result = Syntax.list(tokens);

            // If the tokens array is greater than one, then we can't return it.  It will have been 
            // copied directly into the syntax list.
            returnZeroLengthArray(tokens);

            return result;
        }

        function parseHeritageClauses(): HeritageClauseSyntax[] {
            var heritageClauses = Syntax.emptyList<HeritageClauseSyntax>();

            if (isHeritageClause()) {
                // NOTE: we can pass "null" for the skipped tokens here as we know we can't get
                // any leading skipped tokens. We have an 'extends' or 'implements' keyword, so 
                // any skipped tokeds will get attached to that instead.
                heritageClauses= parseSyntaxList<HeritageClauseSyntax>(ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses, null);
            }

            return heritageClauses;
        }

        function tryParseHeritageClauseTypeName(): ITypeSyntax {
            return isHeritageClauseTypeName() ? tryParseNameOrGenericType() : null;
        }

        function parseClassDeclaration(): ClassDeclarationSyntax {
            var modifiers = parseModifiers();
            var classKeyword = eatToken(SyntaxKind.ClassKeyword);
            var identifier = eatIdentifierToken();
            var typeParameterList = tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false);
            var heritageClauses = parseHeritageClauses();
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var classElements = Syntax.emptyList<IClassElementSyntax>();

            if (openBraceToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                classElements = parseSyntaxList<IClassElementSyntax>(ListParsingState.ClassDeclaration_ClassElements, skippedTokens);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);
            };

            return new syntaxFactory.ClassDeclarationSyntax(parseNodeData,
                modifiers, classKeyword, identifier, typeParameterList, heritageClauses, openBraceToken, classElements, eatToken(SyntaxKind.CloseBraceToken));
        }

        function isAccessor(modifierCount: number, inErrorRecovery: boolean): boolean {
            var tokenKind = peekToken(modifierCount).kind();
            if (tokenKind !== SyntaxKind.GetKeyword &&
                tokenKind !== SyntaxKind.SetKeyword) {
                return false;
            }

            return isPropertyName(peekToken(modifierCount + 1), inErrorRecovery);
        }

        function parseAccessor(checkForStrictMode: boolean): ISyntaxNode {
            var modifiers = parseModifiers();
            var _currenToken = currentToken();
            var tokenKind = _currenToken.kind();

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
            return new syntaxFactory.GetAccessorSyntax(parseNodeData,
                modifiers, consumeToken(getKeyword), eatPropertyName(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, checkForStrictMode));
        }

        function parseSetMemberAccessorDeclaration(modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, checkForStrictMode: boolean): SetAccessorSyntax {
            return new syntaxFactory.SetAccessorSyntax(parseNodeData,
                modifiers, consumeToken(setKeyword), eatPropertyName(),
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
                   isMemberFunctionDeclaration(_modifierCount, inErrorRecovery) ||
                   isAccessor(_modifierCount, inErrorRecovery) ||
                   isMemberVariableDeclaration(_modifierCount, inErrorRecovery) ||
                   isIndexMemberDeclaration(_modifierCount);
        }

        function tryParseClassElement(inErrorRecovery: boolean): IClassElementSyntax {
            var node = currentNode();
            if (SyntaxUtilities.isClassElement(node)) {
                consumeNode(node);
                return <IClassElementSyntax>node;
            }

            var _modifierCount = modifierCount();
            if (isConstructorDeclaration(_modifierCount)) {
                return parseConstructorDeclaration();
            }
            else if (isMemberFunctionDeclaration(_modifierCount, inErrorRecovery)) {
                return parseMemberFunctionDeclaration();
            }
            else if (isAccessor(_modifierCount, inErrorRecovery)) {
                return parseAccessor(/*checkForStrictMode:*/ false);
            }
            else if (isMemberVariableDeclaration(_modifierCount, inErrorRecovery)) {
                return parseMemberVariableDeclaration();
            }
            else if (isIndexMemberDeclaration(_modifierCount)) {
                return parseIndexMemberDeclaration();
            }
            else {
                return null;
            }
        }

        function isConstructorDeclaration(modifierCount: number): boolean {
            // Note: we deviate slightly from the spec here.  If we see 'constructor' then we 
            // assume this is a constructor.  That means, if a user writes "public constructor;"
            // it won't be viewed as a member.  As a workaround, they can simply write:
            //      public 'constructor';
            return peekToken(modifierCount).kind() === SyntaxKind.ConstructorKeyword;
        }

        function parseConstructorDeclaration(): ConstructorDeclarationSyntax {
            var modifiers = parseModifiers();
            var constructorKeyword = eatToken(SyntaxKind.ConstructorKeyword);
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            var semicolonToken: ISyntaxToken = null;
            var block: BlockSyntax = null;

            if (isBlock()) {
                block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ true);
            }
            else {
                semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new syntaxFactory.ConstructorDeclarationSyntax(parseNodeData, modifiers, constructorKeyword, callSignature, block, semicolonToken);
        }

        function isMemberFunctionDeclaration(modifierCount: number, inErrorRecovery: boolean): boolean {
            return isPropertyName(peekToken(modifierCount), inErrorRecovery) && isCallSignature(modifierCount + 1);
        }

        function parseMemberFunctionDeclaration(): MemberFunctionDeclarationSyntax {
            var modifiers = parseModifiers();
            var propertyName = eatPropertyName();
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            // If we got an errant => then we want to parse what's coming up without requiring an
            // open brace.
            var parseBlockEvenWithNoOpenBrace = tryAddUnexpectedEqualsGreaterThanToken(callSignature);

            var block: BlockSyntax = null;
            var semicolon: ISyntaxToken = null;

            if (parseBlockEvenWithNoOpenBrace || isBlock()) {
                block = parseBlock(parseBlockEvenWithNoOpenBrace, /*checkForStrictMode:*/ true);
            }
            else {
                semicolon = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new syntaxFactory.MemberFunctionDeclarationSyntax(parseNodeData, modifiers, propertyName, callSignature, block, semicolon);
        }
        
        function isDefinitelyMemberVariablePropertyName(index: number): boolean {
            // keywords are also property names.  Only accept a keyword as a property 
            // name if is of the form:
            //      public;
            //      public=
            //      public:
            //      public }
            //      public <eof>
            //      public <newline>
            if (SyntaxFacts.isAnyKeyword(peekToken(index).kind())) {
                var nextToken = peekToken(index + 1);
                switch (nextToken.kind()) {
                    case SyntaxKind.SemicolonToken:
                    case SyntaxKind.EqualsToken:
                    case SyntaxKind.ColonToken:
                    case SyntaxKind.CloseBraceToken:
                    case SyntaxKind.EndOfFileToken:
                       return true;
                    default:
                        return previousTokenHasTrailingNewLine(nextToken);
                }
            }
            else {
                // If was a property name and not a keyword, then we're good to go.
                return true;
            }
        }

        function isMemberVariableDeclaration(modifierCount: number, inErrorRecover: boolean): boolean {
            return isPropertyName(peekToken(modifierCount), inErrorRecover) && isDefinitelyMemberVariablePropertyName(modifierCount);
        }

        function parseMemberVariableDeclaration(): MemberVariableDeclarationSyntax {
            return new syntaxFactory.MemberVariableDeclarationSyntax(parseNodeData,
                parseModifiers(),
                tryParseVariableDeclarator(/*allowIn:*/ true, /*allowPropertyName:*/ true), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function isIndexMemberDeclaration(modifierCount: number): boolean {
            return isIndexSignature(modifierCount);
        }

        function parseIndexMemberDeclaration(): IndexMemberDeclarationSyntax {
            return new syntaxFactory.IndexMemberDeclarationSyntax(parseNodeData,
                parseModifiers(), parseIndexSignature(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewLine:*/ false));
        }

        function tryAddUnexpectedEqualsGreaterThanToken(callSignature: CallSignatureSyntax): boolean {
            var token0 = currentToken();

            var hasEqualsGreaterThanToken = token0.kind() === SyntaxKind.EqualsGreaterThanToken;
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

                    consumeToken(token0);

                    // Note: we only do this if we're creating a concrete syntax tree (which contains
                    // everything, including skipped tokens, in it).
                    if (syntaxFactory.isConcrete) {
                        addSkippedTokenAfterNode(callSignature, token0);
                    }
                    return true;
                }
            }


            return false;
        }

        function isFunctionDeclaration(modifierCount: number): boolean {
            return peekToken(modifierCount).kind() === SyntaxKind.FunctionKeyword;
        }

        function parseFunctionDeclaration(): FunctionDeclarationSyntax {
            var modifiers = parseModifiers();
            var functionKeyword = eatToken(SyntaxKind.FunctionKeyword);
            var identifier = eatIdentifierToken();
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ false);

            // If we got an errant => then we want to parse what's coming up without requiring an
            // open brace.
            var parseBlockEvenWithNoOpenBrace = tryAddUnexpectedEqualsGreaterThanToken(callSignature);

            var semicolonToken: ISyntaxToken = null;
            var block: BlockSyntax = null;

            // Parse a block if we're on a bock, or if we saw a '=>'
            if (parseBlockEvenWithNoOpenBrace || isBlock()) {
                block = parseBlock(parseBlockEvenWithNoOpenBrace, /*checkForStrictMode:*/ true);
            }
            else {
                semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
            }

            return new syntaxFactory.FunctionDeclarationSyntax(parseNodeData, modifiers, functionKeyword, identifier, callSignature, block, semicolonToken);
        }

        function parseModuleDeclaration(): ModuleDeclarationSyntax {
            var modifiers = parseModifiers();
            var moduleKeyword = eatToken(SyntaxKind.ModuleKeyword);

            var moduleName: INameSyntax = null;
            var stringLiteral: ISyntaxToken = null;

            if (currentToken().kind() === SyntaxKind.StringLiteral) {
                stringLiteral = eatToken(SyntaxKind.StringLiteral);
            }
            else {
                moduleName = parseName(/*allowIdentifierNames*/ false);
            }

            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var moduleElements = Syntax.emptyList<IModuleElementSyntax>();
            if (openBraceToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                moduleElements = parseSyntaxList<IModuleElementSyntax>(ListParsingState.ModuleDeclaration_ModuleElements, skippedTokens);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);
            }

            return new syntaxFactory.ModuleDeclarationSyntax(parseNodeData,
                modifiers, moduleKeyword, moduleName, stringLiteral, openBraceToken, moduleElements, eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseInterfaceDeclaration(): InterfaceDeclarationSyntax {
            return new syntaxFactory.InterfaceDeclarationSyntax(parseNodeData,
                parseModifiers(), eatToken(SyntaxKind.InterfaceKeyword), eatIdentifierToken(),
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false), parseHeritageClauses(), parseObjectType());
        }

        function parseObjectType(): ObjectTypeSyntax {
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var typeMembers = Syntax.emptySeparatedList<ITypeMemberSyntax>();
            if (openBraceToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                typeMembers = parseSeparatedSyntaxList<ITypeMemberSyntax>(ListParsingState.ObjectType_TypeMembers, skippedTokens);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);
            }

            return new syntaxFactory.ObjectTypeSyntax(parseNodeData, openBraceToken, typeMembers, eatToken(SyntaxKind.CloseBraceToken));
        }

        function isTypeMember(inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isTypeMember(currentNode())) {
                return true;
            }

            return isCallSignature(/*tokenIndex:*/ 0) ||
                   isConstructSignature() ||
                   isIndexSignature(/*tokenIndex:*/ 0) ||
                   isMethodSignature(inErrorRecovery) ||
                   isPropertySignature(inErrorRecovery);
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
            else if (isMethodSignature(inErrorRecovery)) {
                // Note: it is important that isFunctionSignature is called before isPropertySignature.
                // isPropertySignature checks for a subset of isFunctionSignature.
                return parseMethodSignature();
            }
            else if (isPropertySignature(inErrorRecovery)) {
                return parsePropertySignature();
            }
            else {
                return null;
            }
        }

        function parseConstructSignature(): ConstructSignatureSyntax {
            return new syntaxFactory.ConstructSignatureSyntax(parseNodeData, eatToken(SyntaxKind.NewKeyword), parseCallSignature(/*requireCompleteTypeParameterList:*/ false));
        }

        function parseIndexSignature(): IndexSignatureSyntax {
            var openBracketToken = eatToken(SyntaxKind.OpenBracketToken);

            var skippedTokens: ISyntaxToken[] = getArray();
            var parameters = parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.IndexSignature_Parameters, skippedTokens);
            openBracketToken = addSkippedTokensAfterToken(openBracketToken, skippedTokens);

            return new syntaxFactory.IndexSignatureSyntax(parseNodeData,
                openBracketToken, parameters, eatToken(SyntaxKind.CloseBracketToken), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function parseMethodSignature(): MethodSignatureSyntax {
            return new syntaxFactory.MethodSignatureSyntax(parseNodeData,
                eatPropertyName(), tryEatToken(SyntaxKind.QuestionToken), parseCallSignature(/*requireCompleteTypeParameterList:*/ false));
        }

        function parsePropertySignature(): PropertySignatureSyntax {
            return new syntaxFactory.PropertySignatureSyntax(parseNodeData,
                eatPropertyName(), tryEatToken(SyntaxKind.QuestionToken), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function isCallSignature(peekIndex: number): boolean {
            var tokenKind = peekToken(peekIndex).kind();
            return tokenKind === SyntaxKind.OpenParenToken || tokenKind === SyntaxKind.LessThanToken;
        }

        function isConstructSignature(): boolean {
            if (currentToken().kind() !== SyntaxKind.NewKeyword) {
                return false;
            }

            return isCallSignature(/*peekIndex:*/1);
        }

        function isIndexSignature(peekIndex: number): boolean {
            return peekToken(peekIndex).kind() === SyntaxKind.OpenBracketToken;
        }

        function isMethodSignature(inErrorRecovery: boolean): boolean {
            if (isPropertyName(currentToken(), inErrorRecovery)) {
                // id(
                if (isCallSignature(1)) {
                    return true;
                }

                // id?(
                if (peekToken(1).kind() === SyntaxKind.QuestionToken &&
                    isCallSignature(2)) {
                    return true;
                }
            }

            return false;
        }

        function isPropertySignature(inErrorRecovery: boolean): boolean {
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
                if (!existsNewLineBetweenTokens(_currentToken, peekToken(1), source.text) &&
                    isPropertyName(peekToken(1), inErrorRecovery)) {

                    return false;
                }
            }

            // Note: property names also start function signatures.  So it's important that we call this
            // after we calll isFunctionSignature.
            return isPropertyName(_currentToken, inErrorRecovery);
        }

        function isHeritageClause(): boolean {
            var tokenKind = currentToken().kind();
            return tokenKind === SyntaxKind.ExtendsKeyword || tokenKind === SyntaxKind.ImplementsKeyword;
        }

        function isNotHeritageClauseTypeName(): boolean {
            var tokenKind = currentToken().kind();
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
            var tokenKind = extendsOrImplementsKeyword.kind();
            if (tokenKind !== SyntaxKind.ExtendsKeyword && tokenKind !== SyntaxKind.ImplementsKeyword) {
                return null;
            }

            consumeToken(extendsOrImplementsKeyword);

            var skippedTokens: ISyntaxToken[] = getArray();
            var typeNames = parseSeparatedSyntaxList<INameSyntax>(ListParsingState.HeritageClause_TypeNameList, skippedTokens);
            extendsOrImplementsKeyword = addSkippedTokensAfterToken(extendsOrImplementsKeyword, skippedTokens);

            return new syntaxFactory.HeritageClauseSyntax(parseNodeData, extendsOrImplementsKeyword, typeNames);
        }

        function isInterfaceEnumClassModuleImportOrExport(modifierCount: number): boolean {
            var _currentToken = currentToken();

            if (modifierCount) {
                // Any of these keywords following a modifier is definitely a TS construct.
                switch (peekToken(modifierCount).kind()) {
                    case SyntaxKind.ImportKeyword: 
                    case SyntaxKind.ModuleKeyword: 
                    case SyntaxKind.InterfaceKeyword: 
                    case SyntaxKind.ClassKeyword: 
                    case SyntaxKind.EnumKeyword: 
                        return true;
                }
            }

            // no modifiers.  While certain of these keywords are javascript keywords as well, it
            // is possible to run into them in some circumstances in error recovery where we don't
            // want to consider them the start of the module element construct.  For example, they
            // might be hte name in an object literal.  Because of that, we check the next token to
            // make sure it really is the start of a module element.
            var nextToken = peekToken(1);

            switch (_currentToken.kind()) {
                case SyntaxKind.ModuleKeyword:
                    if (isIdentifier(nextToken) || nextToken.kind() === SyntaxKind.StringLiteral) {
                        return true;
                    }
                    break;

                case SyntaxKind.ImportKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                    if (isIdentifier(nextToken)) {
                        return true;
                    }
                    break;

                case SyntaxKind.ExportKeyword:
                    if (nextToken.kind() === SyntaxKind.EqualsToken) {
                        return true;
                    }
                    break;
            }

            return false;
        }

        function isStatement(modifierCount: number, inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isStatement(currentNode())) {
                return true;
            }

            var _currentToken = currentToken();
            var currentTokenKind = _currentToken.kind();
            switch (currentTokenKind) {
                // ERROR RECOVERY
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
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
            if (isInterfaceEnumClassModuleImportOrExport(modifierCount)) {
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
            var currentTokenKind = _currentToken.kind();
            return tryParseStatementWorker(_currentToken, currentTokenKind, modifierCount(), inErrorRecovery);
        }

        function tryParseStatementWorker(_currentToken: ISyntaxToken, currentTokenKind: SyntaxKind, modifierCount: number, inErrorRecovery: boolean): IStatementSyntax {
            switch (currentTokenKind) {
                // ERROR RECOVERY
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.StaticKeyword:
                    // None of the above are actually keywords.  And they might show up in a real
                    // statement (i.e. "public();").  However, if we see 'public <identifier>' then 
                    // that can't possibly be a statement (and instead will be a class element), 
                    // and we should not parse it out here.
                    if (SyntaxFacts.isIdentifierNameOrAnyKeyword(peekToken(1))) {
                        // Definitely not a statement.
                        return null;
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
            if (isInterfaceEnumClassModuleImportOrExport(modifierCount)) {
                return null;
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
                return null;
            }
        }

        function parseDebuggerStatement(debuggerKeyword: ISyntaxToken): DebuggerStatementSyntax {
            return new syntaxFactory.DebuggerStatementSyntax(parseNodeData, consumeToken(debuggerKeyword), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseDoStatement(doKeyword: ISyntaxToken): DoStatementSyntax {
            // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
            // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
            // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
            //  do;while(0)x will have a semicolon inserted before x.
            return new syntaxFactory.DoStatementSyntax(parseNodeData,
                consumeToken(doKeyword), parseStatement(/*inErrorRecovery:*/ false), eatToken(SyntaxKind.WhileKeyword), eatToken(SyntaxKind.OpenParenToken),
                parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ true));
        }

        function isLabeledStatement(currentToken: ISyntaxToken): boolean {
            return isIdentifier(currentToken) && peekToken(1).kind() === SyntaxKind.ColonToken;
        }

        function parseLabeledStatement(identifierToken: ISyntaxToken): LabeledStatementSyntax {
            return new syntaxFactory.LabeledStatementSyntax(parseNodeData,
                consumeToken(identifierToken), eatToken(SyntaxKind.ColonToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseTryStatement(tryKeyword: ISyntaxToken): TryStatementSyntax {
            var tryKeyword = consumeToken(tryKeyword);

            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.TryBlock_Statements);
            var block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            listParsingState = savedListParsingState;

            var catchClause: CatchClauseSyntax = null;
            if (currentToken().kind() === SyntaxKind.CatchKeyword) {
                catchClause = parseCatchClause();
            }

            // If we don't have a catch clause, then we must have a finally clause.  Try to parse
            // one out no matter what.
            var finallyClause: FinallyClauseSyntax = null;
            if (catchClause === null || currentToken().kind() === SyntaxKind.FinallyKeyword) {
                finallyClause = parseFinallyClause();
            }

            return new syntaxFactory.TryStatementSyntax(parseNodeData, tryKeyword, block, catchClause, finallyClause);
        }

        function parseCatchClauseBlock(): BlockSyntax {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.CatchBlock_Statements);
            var block = parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            listParsingState = savedListParsingState;

            return block;
        }

        function parseCatchClause(): CatchClauseSyntax {
            return new syntaxFactory.CatchClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.CatchKeyword), eatToken(SyntaxKind.OpenParenToken), eatIdentifierToken(),
                parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false), eatToken(SyntaxKind.CloseParenToken), parseCatchClauseBlock());
        }

        function parseFinallyClause(): FinallyClauseSyntax {
            return new syntaxFactory.FinallyClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.FinallyKeyword), parseBlock(/*parseStatementsEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ false));
        }

        function parseWithStatement(withKeyword: ISyntaxToken): WithStatementSyntax {
            return new syntaxFactory.WithStatementSyntax(parseNodeData,
                consumeToken(withKeyword), eatToken(SyntaxKind.OpenParenToken), parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseWhileStatement(whileKeyword: ISyntaxToken): WhileStatementSyntax {
            return new syntaxFactory.WhileStatementSyntax(parseNodeData,
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

            return currentToken.kind() === SyntaxKind.SemicolonToken;
        }

        function parseEmptyStatement(semicolonToken: ISyntaxToken): EmptyStatementSyntax {
            return new syntaxFactory.EmptyStatementSyntax(parseNodeData, consumeToken(semicolonToken));
        }

        function parseForOrForInStatement(forKeyword: ISyntaxToken): IStatementSyntax {
            // Debug.assert(isForOrForInStatement());

            consumeToken(forKeyword);
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);

            var _currentToken = currentToken();
            var tokenKind = _currentToken.kind();
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
            // Debug.assert(forKeyword.kind === SyntaxKind.ForKeyword && openParenToken.kind() === SyntaxKind.OpenParenToken);
            // Debug.assert(currentToken().kind() === SyntaxKind.VarKeyword);

            // for ( var VariableDeclarationListNoIn; Expressionopt ; Expressionopt ) Statement
            // for ( var VariableDeclarationNoIn in Expression ) Statement

            var variableDeclaration = parseVariableDeclaration(/*allowIn:*/ false);
            return currentToken().kind() === SyntaxKind.InKeyword 
                ? parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, null)
                : parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, null);
        }

        function parseForInStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax): ForInStatementSyntax {
            // for ( var VariableDeclarationNoIn in Expression ) Statement

            return new syntaxFactory.ForInStatementSyntax(parseNodeData,
                forKeyword, openParenToken, variableDeclaration, initializer, eatToken(SyntaxKind.InKeyword),
                parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseForOrForInStatementWithInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): IStatementSyntax {
            // Debug.assert(forKeyword.kind() === SyntaxKind.ForKeyword && openParenToken.kind() === SyntaxKind.OpenParenToken);

            // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
            // for ( LeftHandSideExpression in Expression ) Statement

            var initializer = parseExpression(/*allowIn:*/ false);
            return currentToken().kind() === SyntaxKind.InKeyword
                ? parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, null, initializer)
                : parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, null, initializer);
        }

        function parseForStatementWithNoVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): ForStatementSyntax {
            // Debug.assert(forKeyword.kind() === SyntaxKind.ForKeyword && openParenToken.kind() === SyntaxKind.OpenParenToken);
            // Debug.assert(currentToken().kind() === SyntaxKind.SemicolonToken);
            // for ( ; Expressionopt ; Expressionopt ) Statement

            return parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, /*variableDeclaration:*/ null, /*initializer:*/ null);
        }

        function tryParseForStatementCondition(): IExpressionSyntax {
            var tokenKind = currentToken().kind();
            if (tokenKind !== SyntaxKind.SemicolonToken &&
                tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return parseExpression(/*allowIn:*/ true);
            }

            return null;
        }

        function tryParseForStatementIncrementor(): IExpressionSyntax {
            var tokenKind = currentToken().kind();
            if (tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return parseExpression(/*allowIn:*/ true);
            }

            return null;
        }

        function parseForStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax): ForStatementSyntax {
            // NOTE: From the es5 section on Automatic Semicolon Insertion.
            // a semicolon is never inserted automatically if the semicolon would then ... become 
            // one of the two semicolons in the header of a for statement

            return new syntaxFactory.ForStatementSyntax(parseNodeData,
                forKeyword, openParenToken, variableDeclaration, initializer,
                eatToken(SyntaxKind.SemicolonToken), tryParseForStatementCondition(),
                eatToken(SyntaxKind.SemicolonToken), tryParseForStatementIncrementor(),
                eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function tryEatBreakOrContinueLabel(): ISyntaxToken {
            // If there is no newline after the break keyword, then we can consume an optional 
            // identifier.
            var identifier: ISyntaxToken = null;
            if (!canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
                if (isIdentifier(currentToken())) {
                    return eatIdentifierToken();
                }
            }

            return null;
        }

        function parseBreakStatement(breakKeyword: ISyntaxToken): BreakStatementSyntax {
            return new syntaxFactory.BreakStatementSyntax(parseNodeData,
                consumeToken(breakKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseContinueStatement(continueKeyword: ISyntaxToken): ContinueStatementSyntax {
            return new syntaxFactory.ContinueStatementSyntax(parseNodeData,
                consumeToken(continueKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseSwitchStatement(switchKeyword: ISyntaxToken) {
            // Debug.assert(isSwitchStatement());

            consumeToken(switchKeyword);
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);
            var expression = parseExpression(/*allowIn:*/ true);
            var closeParenToken = eatToken(SyntaxKind.CloseParenToken);
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);

            var switchClauses = Syntax.emptyList<ISwitchClauseSyntax>();
            if (openBraceToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                switchClauses = parseSyntaxList<ISwitchClauseSyntax>(ListParsingState.SwitchStatement_SwitchClauses, skippedTokens);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);
            }

            return new syntaxFactory.SwitchStatementSyntax(parseNodeData, switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, switchClauses, eatToken(SyntaxKind.CloseBraceToken));
        }

        function isSwitchClause(): boolean {
            if (SyntaxUtilities.isSwitchClause(currentNode())) {
                return true;
            }

            var currentTokenKind = currentToken().kind();
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
            var kind = _currentToken.kind();
            if (kind === SyntaxKind.CaseKeyword) {
                return parseCaseSwitchClause(_currentToken);
            }
            else if (kind === SyntaxKind.DefaultKeyword) {
                return parseDefaultSwitchClause(_currentToken);
            }
            else {
                return null;
            }
        }

        function parseCaseSwitchClause(caseKeyword: ISyntaxToken): CaseSwitchClauseSyntax {
            // Debug.assert(isCaseSwitchClause());

            consumeToken(caseKeyword);
            var expression = parseExpression(/*allowIn:*/ true);
            var colonToken = eatToken(SyntaxKind.ColonToken);
            var statements = Syntax.emptyList<IStatementSyntax>();

            // TODO: allow parsing of the list evne if there's no colon.  However, we have to make 
            // sure we add any skipped tokens to the right previous node or token.
            if (colonToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                statements = parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements, skippedTokens);
                colonToken = addSkippedTokensAfterToken(colonToken, skippedTokens);
            }

            return new syntaxFactory.CaseSwitchClauseSyntax(parseNodeData, caseKeyword, expression, colonToken, statements);
        }

        function parseDefaultSwitchClause(defaultKeyword: ISyntaxToken): DefaultSwitchClauseSyntax {
            // Debug.assert(isDefaultSwitchClause());

            consumeToken(defaultKeyword);
            var colonToken = eatToken(SyntaxKind.ColonToken);
            var statements = Syntax.emptyList<IStatementSyntax>();

            // TODO: Allow parsing without a colon here.  However, ensure that we attach any skipped 
            // tokens to the defaultKeyword.
            if (colonToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                statements = parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements, skippedTokens);
                colonToken = addSkippedTokensAfterToken(colonToken, skippedTokens);
            }

            return new syntaxFactory.DefaultSwitchClauseSyntax(parseNodeData, defaultKeyword, colonToken, statements);
        }

        function parseThrowStatementExpression(): IExpressionSyntax {
            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)
                ? createMissingToken(SyntaxKind.IdentifierName, null)
                : parseExpression(/*allowIn:*/ true);
        }

        function parseThrowStatement(throwKeyword: ISyntaxToken): ThrowStatementSyntax {
            return new syntaxFactory.ThrowStatementSyntax(parseNodeData,
                consumeToken(throwKeyword), parseThrowStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function tryParseReturnStatementExpression(): IExpressionSyntax {
            return !canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) ? parseExpression(/*allowIn:*/ true) : null;
        }

        function parseReturnStatement(returnKeyword: ISyntaxToken): ReturnStatementSyntax {
            return new syntaxFactory.ReturnStatementSyntax(parseNodeData,
                consumeToken(returnKeyword), tryParseReturnStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function isExpressionStatement(currentToken: ISyntaxToken): boolean {
            // As per the gramar, neither { nor 'function' can start an expression statement.
            var tokenKind = currentToken.kind();
            return tokenKind !== SyntaxKind.OpenBraceToken && tokenKind !== SyntaxKind.FunctionKeyword && isExpression(currentToken);
        }

        function isAssignmentOrOmittedExpression(): boolean {
            var _currentToken = currentToken();
            return _currentToken.kind() === SyntaxKind.CommaToken || isExpression(_currentToken);
        }

        function tryParseAssignmentOrOmittedExpression(): IExpressionSyntax {
            // Debug.assert(isAssignmentOrOmittedExpression());

            if (currentToken().kind() === SyntaxKind.CommaToken) {
                return new syntaxFactory.OmittedExpressionSyntax(parseNodeData);
            }

            return tryParseAssignmentExpressionOrHigher(/*force:*/ false, /*allowIn:*/ true);
        }

        function isExpression(currentToken: ISyntaxToken): boolean {
            switch (currentToken.kind()) {
                // Literals
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.RegularExpressionLiteral:

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
            return new syntaxFactory.ExpressionStatementSyntax(parseNodeData, parseExpression(/*allowIn:*/ true), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseIfStatement(ifKeyword: ISyntaxToken): IfStatementSyntax {
            return new syntaxFactory.IfStatementSyntax(parseNodeData,
                consumeToken(ifKeyword), eatToken(SyntaxKind.OpenParenToken), parseExpression(/*allowIn:*/ true),
                eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false), parseOptionalElseClause());
        }

        function parseOptionalElseClause(): ElseClauseSyntax {
            return currentToken().kind() === SyntaxKind.ElseKeyword ? parseElseClause() : null;
        }

        function parseElseClause(): ElseClauseSyntax {
            return new syntaxFactory.ElseClauseSyntax(parseNodeData, eatToken(SyntaxKind.ElseKeyword), parseStatement(/*inErrorRecovery:*/ false));
        }

        function isVariableStatement(modifierCount: number): boolean {
            return peekToken(modifierCount).kind() === SyntaxKind.VarKeyword;
        }

        function parseVariableStatement(): VariableStatementSyntax {
            return new syntaxFactory.VariableStatementSyntax(parseNodeData,
                parseModifiers(), parseVariableDeclaration(/*allowIn:*/ true), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseVariableDeclaration(allowIn: boolean): VariableDeclarationSyntax {
            // Debug.assert(currentToken().kind() === SyntaxKind.VarKeyword);

            var varKeyword = eatToken(SyntaxKind.VarKeyword);
            // Debug.assert(varKeyword.fullWidth() > 0);

            var listParsingState = allowIn
                ? ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn
                : ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn;

            var skippedTokens: ISyntaxToken[] = getArray();
            var variableDeclarators = parseSeparatedSyntaxList<VariableDeclaratorSyntax>(listParsingState, skippedTokens);
            varKeyword = addSkippedTokensAfterToken(varKeyword, skippedTokens);

            return new syntaxFactory.VariableDeclarationSyntax(parseNodeData, varKeyword, variableDeclarators);
        }

        function isVariableDeclarator(): boolean {
            var node = currentNode();
            if (node !== null && node.kind() === SyntaxKind.VariableDeclarator) {
                return true;
            }

            return isIdentifier(currentToken());
        }

        function canReuseVariableDeclaratorNode(node: ISyntaxNode) {
            if (node === null || node.kind() !== SyntaxKind.VariableDeclarator) {
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
            return variableDeclarator.equalsValueClause === null;
        }

        function tryParseVariableDeclarator(allowIn: boolean, allowPropertyName: boolean): VariableDeclaratorSyntax {
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

            if (allowPropertyName) {
                // Debug.assert(isPropertyName(currentToken(), /*inErrorRecovery:*/ false));
            }

            if (!allowPropertyName && !isIdentifier(currentToken())) {
                return null;
            }

            var propertyName = allowPropertyName ? eatPropertyName() : eatIdentifierToken();
            var equalsValueClause: EqualsValueClauseSyntax = null;
            var typeAnnotation: TypeAnnotationSyntax = null;

            if (propertyName.fullWidth() > 0) {
                typeAnnotation = parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false);

                if (isEqualsValueClause(/*inParameter*/ false)) {
                    equalsValueClause = parseEqualsValueClause(allowIn);
                }
            }

            return new syntaxFactory.VariableDeclaratorSyntax(parseNodeData, propertyName, typeAnnotation, equalsValueClause);
        }

        function isEqualsValueClause(inParameter: boolean): boolean {
            var token0 = currentToken();
            if (token0.kind() === SyntaxKind.EqualsToken) {
                return true;
            }

            // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
            // there is no newline after the last token and if we're on an expression.  If so, parse
            // this as an equals-value clause with a missing equals.
            if (!previousTokenHasTrailingNewLine(token0)) {
                var tokenKind = token0.kind();

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
            return new syntaxFactory.EqualsValueClauseSyntax(parseNodeData,
                eatToken(SyntaxKind.EqualsToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
        }

        function parseExpression(allowIn: boolean): IExpressionSyntax {
            // Expression[in]:
            //      AssignmentExpression[in] 
            //      Expression[in] , AssignmentExpression[in]

            var leftOperand = tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn);
            while (true) {
                var _currentToken = currentToken();
                if (_currentToken.kind() !== SyntaxKind.CommaToken) {
                    break;
                }

                leftOperand = new syntaxFactory.BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(_currentToken), 
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
            if (arrowFunction !== null) {
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
            if (leftOperand === null) {
                return null;
            }

            if (SyntaxUtilities.isLeftHandSizeExpression(leftOperand)) {
                // Note: we call currentOperatorToken so that we get an appropriately merged token
                // for cases like > > =  becoming >>=
                var operatorToken = currentOperatorToken();

                // Check for recursive assignment expressions.
                if (SyntaxFacts.isAssignmentOperatorToken(operatorToken.kind())) {
                    return new syntaxFactory.BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(operatorToken), 
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
            var currentTokenKind = _currentToken.kind();

            switch (currentTokenKind) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    return new syntaxFactory.PrefixUnaryExpressionSyntax(parseNodeData, consumeToken(_currentToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
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
            if (leftOperand === null) {
                return null;
            }

            // We then pop up the stack consuming the other side of the binary exprssion if it exists.
            return parseBinaryExpressionRest(precedence, allowIn, leftOperand);
        }

        function parseConditionalExpressionRest(allowIn: boolean, leftOperand: IExpressionSyntax): IExpressionSyntax {
            // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.

            var _currentToken = currentToken();

            // Now check for conditional expression.
            if (_currentToken.kind() !== SyntaxKind.QuestionToken) {
                return leftOperand;
            }

            // Note: we explicitly do *not* pass 'allowIn' to the whenTrue part.  An 'in' expression is always
            // allowed in the 'true' part of a conditional expression.

            return new syntaxFactory.ConditionalExpressionSyntax(parseNodeData,
                leftOperand, consumeToken(_currentToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true),
                eatToken(SyntaxKind.ColonToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, allowIn));
        }

        function parseBinaryExpressionRest(precedence: BinaryExpressionPrecedence, allowIn: boolean, leftOperand: IExpressionSyntax): IExpressionSyntax {
            while (true) {
                // We either have a binary operator here, or we're finished.  We call 
                // currentOperatorToken versus currentToken here so that we merge token sequences
                // like > and = into >=
                var operatorToken = currentOperatorToken();
                var tokenKind = operatorToken.kind();

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

                leftOperand = new syntaxFactory.BinaryExpressionSyntax(parseNodeData, leftOperand, consumeToken(operatorToken), 
                    tryParseBinaryExpressionOrHigher(currentToken(), /*force:*/ true, newPrecedence, allowIn));
            }

            return leftOperand;
        }

        function currentOperatorToken(): ISyntaxToken {
            var token0 = currentToken();

            // If we see a > we need to see if we can actually merge this contextually into a 
            // >>  >>>  >=  >>=  >>>=  token.
            if (token0.kind() === SyntaxKind.GreaterThanToken) {
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
            if (expression === null) {
                return null;
            }

            return parseMemberExpressionRest(expression, inObjectCreation); 
        }

        function parseCallExpressionRest(expression: ILeftHandSideExpressionSyntax): ILeftHandSideExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind();

                switch (currentTokenKind) {
                    case SyntaxKind.OpenParenToken:
                        expression = new syntaxFactory.InvocationExpressionSyntax(parseNodeData, expression, parseArgumentList(/*typeArgumentList:*/ null));
                        continue;

                    case SyntaxKind.LessThanToken:
                        // See if this is the start of a generic invocation.  If so, consume it and
                        // keep checking for postfix expressions.  Otherwise, it's just a '<' that's 
                        // part of an arithmetic expression.  Break out so we consume it higher in the
                        // stack.
                        var argumentList = tryParseArgumentList();
                        if (argumentList === null) {
                            break;
                        }

                        expression = new syntaxFactory.InvocationExpressionSyntax(parseNodeData, expression, argumentList);
                        continue;

                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken, /*inObjectCreation:*/ false);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new syntaxFactory.MemberAccessExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken), eatIdentifierNameToken());
                        continue;
                }

                return expression;
            }
        }

        function parseMemberExpressionRest(expression: IMemberExpressionSyntax, inObjectCreation: boolean): IMemberExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind();

                switch (currentTokenKind) {
                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken, inObjectCreation);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new syntaxFactory.MemberAccessExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken), eatIdentifierNameToken());
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

            var expression: ILeftHandSideExpressionSyntax = null;
            if (_currentToken.kind() === SyntaxKind.SuperKeyword) {
                expression = parseSuperExpression(_currentToken);
            }
            else {
                expression = tryParseMemberExpressionOrHigher(_currentToken, force, /*inObjectCreation:*/ false);
                if (expression === null) {
                    return null;
                }
            }

            // Now, we *may* be complete.  However, we might have consumed the start of a 
            // CallExpression.  As such, we need to consume the rest of it here to be complete.
            return parseCallExpressionRest(expression);
        }

        function parseSuperExpression(superToken: ISyntaxToken): ILeftHandSideExpressionSyntax {
            var expression: ILeftHandSideExpressionSyntax = consumeToken(superToken);

            // If we have seen "super" it must be followed by '(' or '.'.
            // If it wasn't then just try to parse out a '.' and report an error.
            var currentTokenKind = currentToken().kind();
            return currentTokenKind === SyntaxKind.OpenParenToken || currentTokenKind === SyntaxKind.DotToken
                ? expression
                : new syntaxFactory.MemberAccessExpressionSyntax(parseNodeData, expression, eatToken(SyntaxKind.DotToken), eatIdentifierNameToken());
        }

        function tryParsePostfixExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean): IPostfixExpressionSyntax {
            var expression = tryParseLeftHandSideExpressionOrHigher(_currentToken, force);
            if (expression === null) {
                return null;
            }

            var _currentToken = currentToken();
            var currentTokenKind = _currentToken.kind();

            switch (currentTokenKind) {
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    // Because of automatic semicolon insertion, we should only consume the ++ or -- 
                    // if it is on the same line as the previous token.
                    if (previousTokenHasTrailingNewLine(_currentToken)) {
                        break;
                    }

                    return new syntaxFactory.PostfixUnaryExpressionSyntax(parseNodeData, expression, consumeToken(_currentToken));
            }

            return expression;
        }

        function tryParseGenericArgumentList(): ArgumentListSyntax {
            // Debug.assert(currentToken().kind() === SyntaxKind.LessThanToken);
            // If we have a '<', then only parse this as a arugment list if the type arguments
            // are complete and we have an open paren.  if we don't, rewind and return nothing.
            var rewindPoint = getRewindPoint();

            var typeArgumentList = tryParseTypeArgumentList(/*inExpression:*/ true);
            var token0 = currentToken();
            var tokenKind = token0.kind();

            var isOpenParen = tokenKind === SyntaxKind.OpenParenToken;
            var isDot = tokenKind === SyntaxKind.DotToken;
            var isOpenParenOrDot = isOpenParen || isDot;

            var argumentList: ArgumentListSyntax = null;
            if (typeArgumentList === null || !isOpenParenOrDot) {
                // Wasn't generic.  Rewind to where we started so this can be parsed as an 
                // arithmetic expression.
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return null;
            }
            else {
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
                        DiagnosticCode.A_parameter_list_must_follow_a_generic_type_argument_list_expected, null);
                    addDiagnostic(diagnostic);

                    return new syntaxFactory.ArgumentListSyntax(parseNodeData, typeArgumentList,
                        Syntax.emptyToken(SyntaxKind.OpenParenToken), Syntax.emptySeparatedList<IExpressionSyntax>(), Syntax.emptyToken(SyntaxKind.CloseParenToken));
                }
                else {
                    return parseArgumentList(typeArgumentList);
                }
            }
        }

        function tryParseArgumentList(): ArgumentListSyntax {
            var tokenKind = currentToken().kind();
            if (tokenKind === SyntaxKind.LessThanToken) {
                return tryParseGenericArgumentList();
            }

            if (tokenKind === SyntaxKind.OpenParenToken) {
                return parseArgumentList(null);
            }

            return null;
        }

        function parseArgumentList(typeArgumentList: TypeArgumentListSyntax): ArgumentListSyntax {
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);

            // Don't use the name 'arguments' it prevents V8 from optimizing this method.
            var _arguments = Syntax.emptySeparatedList<IExpressionSyntax>();

            if (openParenToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                _arguments = parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArgumentList_AssignmentExpressions, skippedTokens);
                openParenToken = addSkippedTokensAfterToken(openParenToken, skippedTokens);
            }

            return new syntaxFactory.ArgumentListSyntax(parseNodeData, typeArgumentList, openParenToken, _arguments, eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseArgumentListExpression(): IExpressionSyntax {
            // Generally while parsing lists, we don't want to 'force' the parser to parse
            // the item.  That way, if the expected item isn't htere, we can bail out and
            // move to a higher stage of list parsing.  However, it's extremely common to 
            // see something like "Foo(, a".  in this case, even though there isn't an expression
            // after the open paren, we still want to force parsing an expression (which will
            // cause a missing identiifer to be created), so that we will then consume the
            // comma and the following list items).
            var force = currentToken().kind() === SyntaxKind.CommaToken;
            return tryParseAssignmentExpressionOrHigher(force, /*allowIn:*/ true);
        }

        function parseElementAccessArgumentExpression(openBracketToken: ISyntaxToken, inObjectCreation: boolean) {
            // It's not uncommon for a user to write: "new Type[]".  Check for that common pattern
            // and report a better error message.
            if (inObjectCreation && currentToken().kind() === SyntaxKind.CloseBracketToken) {
                var errorStart = start(openBracketToken, source.text);
                var errorEnd = end(currentToken(), source.text);
                var diagnostic = new Diagnostic(fileName, source.text.lineMap(), errorStart, errorEnd - errorStart,
                    DiagnosticCode.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead, null);
                addDiagnostic(diagnostic);

                return Syntax.emptyToken(SyntaxKind.IdentifierName);
            }
            else {
                return parseExpression(/*allowIn:*/ true);
            }
        }

        function parseElementAccessExpression(expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, inObjectCreation: boolean): ElementAccessExpressionSyntax {
            // Debug.assert(currentToken().kind() === SyntaxKind.OpenBracketToken);
            return new syntaxFactory.ElementAccessExpressionSyntax(parseNodeData, expression, consumeToken(openBracketToken),
                parseElementAccessArgumentExpression(openBracketToken, inObjectCreation), eatToken(SyntaxKind.CloseBracketToken));
        }

        function tryParsePrimaryExpression(_currentToken: ISyntaxToken, force: boolean): IPrimaryExpressionSyntax {
            if (isIdentifier(_currentToken)) {
                return eatIdentifierToken();
            }

            var currentTokenKind = _currentToken.kind();
            switch (currentTokenKind) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.StringLiteral:
                    return consumeToken(_currentToken);

                case SyntaxKind.FunctionKeyword:  return parseFunctionExpression(_currentToken);
                case SyntaxKind.OpenBracketToken: return parseArrayLiteralExpression(_currentToken);
                case SyntaxKind.OpenBraceToken:   return parseObjectLiteralExpression(_currentToken);
                case SyntaxKind.OpenParenToken:   return parseParenthesizedExpression(_currentToken);
                case SyntaxKind.NewKeyword:       return parseObjectCreationExpression(_currentToken);

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
                return null;
            }

            // Nothing else worked, report an error and produce a missing token.
            return eatIdentifierToken(DiagnosticCode.Expression_expected);
        }

        function tryReparseDivideAsRegularExpression(): IPrimaryExpressionSyntax {
            // If we see a / or /= token, then that may actually be the start of a regex in certain 
            // contexts.

            // var currentToken = this.currentToken();
            // Debug.assert(SyntaxFacts.isAnyDivideToken(currentToken.kind()));

            // Ok, from our quick lexical check, this could be a place where a regular expression could
            // go.  Now we have to do a bunch of work.  Ask the source to retrive the token at the 
            // current position again.  But this time allow it to retrieve it as a regular expression.
            var currentToken = currentContextualToken();

            // Note: we *must* have gotten a /, /= or regular expression.  Or else something went *very*
            // wrong with our logic above.
            // Debug.assert(SyntaxFacts.isAnyDivideOrRegularExpressionToken(currentToken.kind()));

            var tokenKind = currentToken.kind();
            if (tokenKind === SyntaxKind.SlashToken || tokenKind === SyntaxKind.SlashEqualsToken) {
                // Still came back as a / or /=.   This is not a regular expression literal.
                return null;
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
            return new syntaxFactory.TypeOfExpressionSyntax(parseNodeData, consumeToken(typeOfKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseDeleteExpression(deleteKeyword: ISyntaxToken): DeleteExpressionSyntax {
            return new syntaxFactory.DeleteExpressionSyntax(parseNodeData, consumeToken(deleteKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseVoidExpression(voidKeyword: ISyntaxToken): VoidExpressionSyntax {
            return new syntaxFactory.VoidExpressionSyntax(parseNodeData, consumeToken(voidKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseFunctionExpression(functionKeyword: ISyntaxToken): FunctionExpressionSyntax {
            return new syntaxFactory.FunctionExpressionSyntax(parseNodeData,
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

            return new syntaxFactory.ObjectCreationExpressionSyntax(parseNodeData,
                consumeToken(newKeyword), tryParseMemberExpressionOrHigher(currentToken(), /*force:*/ true, /*inObjectCreation:*/ true), tryParseArgumentList());
        }

        function parseCastExpression(lessThanToken: ISyntaxToken): CastExpressionSyntax {
            return new syntaxFactory.CastExpressionSyntax(parseNodeData,
                consumeToken(lessThanToken), parseType(), eatToken(SyntaxKind.GreaterThanToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseParenthesizedExpression(openParenToken: ISyntaxToken): ParenthesizedExpressionSyntax {
            return new syntaxFactory.ParenthesizedExpressionSyntax(parseNodeData,
                consumeToken(openParenToken), parseExpression(/*allowIn:*/ true), eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseParenthesizedArrowFunctionExpression(): ParenthesizedArrowFunctionExpressionSyntax {
            var tokenKind = currentToken().kind();
            if (tokenKind !== SyntaxKind.OpenParenToken && tokenKind !== SyntaxKind.LessThanToken) {
                return null;
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
                return null;
            }

            // Then, try to actually parse it as a arrow function, and only return if we see an => 
            var rewindPoint = getRewindPoint();

            var arrowFunction = tryParseParenthesizedArrowFunctionExpressionWorker(/*requiresArrow:*/ true);
            if (arrowFunction === null) {
                rewind(rewindPoint);
            }

            releaseRewindPoint(rewindPoint);
            return arrowFunction;
        }

        function tryParseParenthesizedArrowFunctionExpressionWorker(requireArrow: boolean): ParenthesizedArrowFunctionExpressionSyntax {
            var _currentToken = currentToken();
            // Debug.assert(currentToken.kind() === SyntaxKind.OpenParenToken || currentToken.kind() === SyntaxKind.LessThanToken);

            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ true);

            if (requireArrow && currentToken().kind() !== SyntaxKind.EqualsGreaterThanToken) {
                return null;
            }

            var equalsGreaterThanToken = eatToken(SyntaxKind.EqualsGreaterThanToken);

            var block = tryParseArrowFunctionBlock();
            var expression: IExpressionSyntax = null;
            if (block === null) {
                expression = tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true);
            }

            return new syntaxFactory.ParenthesizedArrowFunctionExpressionSyntax(parseNodeData, callSignature, equalsGreaterThanToken, block, expression);
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
                    return null;
                }
            }
        }

        function isSimpleArrowFunctionExpression(_currentToken: ISyntaxToken): boolean {
            // ERROR RECOVERY TWEAK:
            // If we see a standalone => try to parse it as an arrow function as that's likely what
            // the user intended to write.
            if (_currentToken.kind() === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            return isIdentifier(_currentToken) &&
                   peekToken(1).kind() === SyntaxKind.EqualsGreaterThanToken;
        }

        function parseSimpleArrowFunctionExpression(): SimpleArrowFunctionExpressionSyntax {
            // Debug.assert(isSimpleArrowFunctionExpression());

            var parameter = eatSimpleParameter();
            var equalsGreaterThanToken = eatToken(SyntaxKind.EqualsGreaterThanToken);

            var block = tryParseArrowFunctionBlock();
            var expression: IExpressionSyntax = null;
            if (block === null) {
                expression = tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true);
            }

            return new syntaxFactory.SimpleArrowFunctionExpressionSyntax(parseNodeData, parameter, equalsGreaterThanToken, block, expression);
        }

        function isBlock(): boolean {
            return currentToken().kind() === SyntaxKind.OpenBraceToken;
        }

        function isDefinitelyArrowFunctionExpression(): boolean {
            var token0 = currentToken();
            if (token0.kind() !== SyntaxKind.OpenParenToken) {
                // If it didn't start with an (, then it could be generic.  That's too complicated 
                // and we can't say it's 'definitely' an arrow function.             
                return false;
            }

            var token1 = peekToken(1);
            var token1Kind = token1.kind();

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
                var token2Kind = token2.kind();
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
            token2Kind = token2.kind();

            if (token1Kind === SyntaxKind.PublicKeyword || token1Kind === SyntaxKind.PrivateKeyword) {
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
            var token3Kind = token3.kind();
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
            if (token0.kind() !== SyntaxKind.OpenParenToken) {
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
            var token2Kind = token2.kind();
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
                if (token3.kind() === SyntaxKind.ColonToken) {
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
            // Debug.assert(currentToken().kind() === SyntaxKind.OpenBraceToken);

            consumeToken(openBraceToken);
            // Debug.assert(openBraceToken.fullWidth() > 0);

            var skippedTokens: ISyntaxToken[] = getArray();
            var propertyAssignments = parseSeparatedSyntaxList<IPropertyAssignmentSyntax>(ListParsingState.ObjectLiteralExpression_PropertyAssignments, skippedTokens);
            openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);

            return new syntaxFactory.ObjectLiteralExpressionSyntax(parseNodeData, openBraceToken, propertyAssignments, eatToken(SyntaxKind.CloseBraceToken));
        }

        function tryParsePropertyAssignment(inErrorRecovery: boolean): IPropertyAssignmentSyntax {
            // Debug.assert(isPropertyAssignment(/*inErrorRecovery:*/ false));

            if (isAccessor(modifierCount(), inErrorRecovery)) {
                return parseAccessor(/*checkForStrictMode:*/ true);
            }
            else if (isFunctionPropertyAssignment(inErrorRecovery)) {
                return parseFunctionPropertyAssignment();
            }
            else if (isSimplePropertyAssignment(inErrorRecovery)) {
                return parseSimplePropertyAssignment();
            }
            else {
                return null;
            }
        }

        function isPropertyAssignment(inErrorRecovery: boolean): boolean {
            return isAccessor(modifierCount(), inErrorRecovery) ||
                   isFunctionPropertyAssignment(inErrorRecovery) ||
                   isSimplePropertyAssignment(inErrorRecovery);
        }

        function eatPropertyName(): ISyntaxToken {
            var _currentToken = currentToken();
            return SyntaxFacts.isIdentifierNameOrAnyKeyword(_currentToken)
                ? eatIdentifierNameToken()
                : consumeToken(_currentToken);
        }

        function isFunctionPropertyAssignment(inErrorRecovery: boolean): boolean {
            return isPropertyName(currentToken(), inErrorRecovery) &&
                   isCallSignature(/*peekIndex:*/ 1);
        }

        function parseFunctionPropertyAssignment(): FunctionPropertyAssignmentSyntax {
            return new syntaxFactory.FunctionPropertyAssignmentSyntax(parseNodeData,
                eatPropertyName(), parseCallSignature(/*requireCompleteTypeParameterList:*/ false),
                parseBlock(/*parseBlockEvenWithNoOpenBrace:*/ false, /*checkForStrictMode:*/ true));
        }

        function isSimplePropertyAssignment(inErrorRecovery: boolean): boolean {
            return isPropertyName(currentToken(), inErrorRecovery);
        }

        function parseSimplePropertyAssignment(): SimplePropertyAssignmentSyntax {
            return new syntaxFactory.SimplePropertyAssignmentSyntax(parseNodeData,
                eatPropertyName(), eatToken(SyntaxKind.ColonToken), tryParseAssignmentExpressionOrHigher(/*force:*/ true, /*allowIn:*/ true));
        }

        function isPropertyName(token: ISyntaxToken, inErrorRecovery: boolean): boolean {
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

            var kind = token.kind();
            return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral;
        }

        function parseArrayLiteralExpression(openBracketToken: ISyntaxToken): ArrayLiteralExpressionSyntax {
            // Debug.assert(currentToken().kind() === SyntaxKind.OpenBracketToken);
            consumeToken(openBracketToken);
            // Debug.assert(openBracketToken.fullWidth() > 0);

            var skippedTokens: ISyntaxToken[] = getArray();
            var expressions = parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArrayLiteralExpression_AssignmentExpressions, skippedTokens);
            openBracketToken = addSkippedTokensAfterToken(openBracketToken, skippedTokens);

            return new syntaxFactory.ArrayLiteralExpressionSyntax(parseNodeData, openBracketToken, expressions, eatToken(SyntaxKind.CloseBracketToken));
        }

        function parseBlock(parseBlockEvenWithNoOpenBrace: boolean, checkForStrictMode: boolean): BlockSyntax {
            var openBraceToken = eatToken(SyntaxKind.OpenBraceToken);
            var statements = Syntax.emptyList<IStatementSyntax>();

            if (parseBlockEvenWithNoOpenBrace || openBraceToken.fullWidth() > 0) {
                var savedIsInStrictMode = isInStrictMode;
                
                var processItems = checkForStrictMode ? updateStrictModeState : null;
                var skippedTokens: ISyntaxToken[] = getArray();
                var statements = parseSyntaxList<IStatementSyntax>(ListParsingState.Block_Statements, skippedTokens, processItems);
                openBraceToken = addSkippedTokensAfterToken(openBraceToken, skippedTokens);

                setStrictMode(savedIsInStrictMode);
            }

            return new syntaxFactory.BlockSyntax(parseNodeData, openBraceToken, statements, eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseCallSignature(requireCompleteTypeParameterList: boolean): CallSignatureSyntax {
            return new syntaxFactory.CallSignatureSyntax(parseNodeData,
                tryParseTypeParameterList(requireCompleteTypeParameterList), parseParameterList(), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function tryParseTypeParameterList(requireCompleteTypeParameterList: boolean): TypeParameterListSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind() !== SyntaxKind.LessThanToken) {
                return null;
            }

            var rewindPoint = getRewindPoint();

            var lessThanToken = consumeToken(_currentToken);

            var skippedTokens: ISyntaxToken[] = getArray();
            var typeParameters = parseSeparatedSyntaxList<TypeParameterSyntax>(ListParsingState.TypeParameterList_TypeParameters, skippedTokens);
            lessThanToken = addSkippedTokensAfterToken(lessThanToken, skippedTokens);

            var greaterThanToken = eatToken(SyntaxKind.GreaterThanToken);

            // return null if we were required to have a '>' token and we did not  have one.
            if (requireCompleteTypeParameterList && greaterThanToken.fullWidth() === 0) {
                rewind(rewindPoint);
                releaseRewindPoint(rewindPoint);
                return null;
            }
            else {
                releaseRewindPoint(rewindPoint);
                return new syntaxFactory.TypeParameterListSyntax(parseNodeData, lessThanToken, typeParameters, greaterThanToken);
            }
        }

        function isTypeParameter(): boolean {
            return isIdentifier(currentToken());
        }

        function tryParseTypeParameter(): TypeParameterSyntax {
            // Debug.assert(isTypeParameter());
            if (!isIdentifier(currentToken())) {
                return null;
            }

            return new syntaxFactory.TypeParameterSyntax(parseNodeData, eatIdentifierToken(), tryParseConstraint());
        }

        function tryParseConstraint(): ConstraintSyntax {
            if (currentToken().kind() !== SyntaxKind.ExtendsKeyword) {
                return null;
            }

            return new syntaxFactory.ConstraintSyntax(parseNodeData, eatToken(SyntaxKind.ExtendsKeyword), parseTypeOrExpression());
        }

        function tryParseParameterList(): ParameterListSyntax {
            if (currentToken().kind() === SyntaxKind.OpenParenToken) {
                var token1 = peekToken(1);

                if (token1.kind() === SyntaxKind.CloseParenToken || isParameterHelper(token1)) {
                    return parseParameterList();
                }
            }

            return null;
        }

        function parseParameterList(): ParameterListSyntax {
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);
            var parameters = Syntax.emptySeparatedList<ParameterSyntax>();

            if (openParenToken.fullWidth() > 0) {
                var skippedTokens: ISyntaxToken[] = getArray();
                parameters = parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.ParameterList_Parameters, skippedTokens);
                openParenToken = addSkippedTokensAfterToken(openParenToken, skippedTokens);
            }

            return new syntaxFactory.ParameterListSyntax(parseNodeData, openParenToken, parameters, eatToken(SyntaxKind.CloseParenToken));
        }

        function parseOptionalTypeAnnotation(allowStringLiteral: boolean): TypeAnnotationSyntax {
            return currentToken().kind() === SyntaxKind.ColonToken ? parseTypeAnnotation(allowStringLiteral) : null;
        }

        function parseTypeAnnotationType(allowStringLiteral: boolean): ITypeSyntax {
            if (allowStringLiteral) {
                var _currentToken = currentToken();
                if (_currentToken.kind() === SyntaxKind.StringLiteral) {
                    return consumeToken(_currentToken);
                }
            }

            return parseType();
        }

        function parseTypeAnnotation(allowStringLiteral: boolean): TypeAnnotationSyntax {
            return new syntaxFactory.TypeAnnotationSyntax(parseNodeData, consumeToken(currentToken()), parseTypeAnnotationType(allowStringLiteral));
        }

        function isType(): boolean {
            var _currentToken = currentToken();

            switch (_currentToken.kind()) {
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
            // First consume any underlying element type.
            var type = tryParseNonArrayType();

            // ArrayType:
            //      ElementType   [no LineTerminator here]   [   ]

            // Now, we want to keep consuming pairs of brackets, as long as the opening bracket
            // is on the same line as the last token.
            while (type) {
                var _currentToken = currentToken();

                if (previousTokenHasTrailingNewLine(_currentToken) ||
                    _currentToken.kind() !== SyntaxKind.OpenBracketToken) {
                    break;
                }

                type = new syntaxFactory.ArrayTypeSyntax(parseNodeData, type, consumeToken(_currentToken), eatToken(SyntaxKind.CloseBracketToken));
            }

            return type;
        }

        function parseTypeQuery(typeOfKeyword: ISyntaxToken): TypeQuerySyntax {
            return new syntaxFactory.TypeQuerySyntax(parseNodeData, consumeToken(typeOfKeyword), parseName(/*allowIdentifierNames:*/ true));
        }

        function tryParseNonArrayType(): ITypeSyntax {
            var _currentToken = currentToken();
            switch (_currentToken.kind()) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.StringKeyword:
                    // if any of these are followed by '.', then this is actually a module name,
                    // and these keywords will be reinterpreted as an identifier.
                    if (peekToken(1).kind() === SyntaxKind.DotToken) {
                        break;
                    }

                    return consumeToken(_currentToken);
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:  return tryParseFunctionType();
                case SyntaxKind.VoidKeyword:    return consumeToken(_currentToken);
                case SyntaxKind.OpenBraceToken: return parseObjectType();
                case SyntaxKind.NewKeyword:     return parseConstructorType();
                case SyntaxKind.TypeOfKeyword:  return parseTypeQuery(_currentToken);
            }

            return tryParseNameOrGenericType();
        }

        function tryParseNameOrGenericType(): ITypeSyntax {
            var name = tryParseName(/*allowIdentifierNames*/ false);
            if (name === null) {
                return null;
            }

            // TypeReference:
            //      TypeName   [no LineTerminator here]   TypeArgumentsopt
            //
            // Only consume type arguments if they appear on the same line.
            if (previousTokenHasTrailingNewLine(currentToken())) {
                return name;
            }

            var typeArgumentList = tryParseTypeArgumentList(/*inExpression:*/ false);
            return typeArgumentList === null
                ? name
                : new syntaxFactory.GenericTypeSyntax(parseNodeData, name, typeArgumentList);
        }

        function tryParseFunctionType(): FunctionTypeSyntax {
            var typeParameterList = tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false);
            var parameterList: ParameterListSyntax = null;
            if (typeParameterList === null) {
                parameterList = tryParseParameterList();
                if (parameterList === null) {
                    return null;
                }
            }
            else {
                parameterList = parseParameterList();
            }

            return new syntaxFactory.FunctionTypeSyntax(parseNodeData,
                typeParameterList, parameterList, eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
        }

        function parseConstructorType(): ConstructorTypeSyntax {
            return new syntaxFactory.ConstructorTypeSyntax(parseNodeData,
                eatToken(SyntaxKind.NewKeyword), tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false),
                parseParameterList(), eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
        }

        function isParameter(): boolean {
            if (currentNode() !== null && currentNode().kind() === SyntaxKind.Parameter) {
                return true;
            }

            return isParameterHelper(currentToken());
        }

        function isParameterHelper(token: ISyntaxToken): boolean {
            var tokenKind = token.kind();
            return tokenKind === SyntaxKind.DotDotDotToken ||
                   isModifierKind(tokenKind) ||
                   isIdentifier(token);
        }

        function eatSimpleParameter() {
            return new syntaxFactory.ParameterSyntax(parseNodeData,
                /*dotDotDotToken:*/ null, /*modifiers:*/ Syntax.emptyList<ISyntaxToken>(), eatIdentifierToken(),
                /*questionToken:*/ null, /*typeAnnotation:*/ null, /*equalsValueClause:*/ null);
        }

        function tryParseParameter(): ParameterSyntax {
            var node = currentNode();
            if (node !== null && node.kind() === SyntaxKind.Parameter) {
                consumeNode(node);
                return <ParameterSyntax>node;
            }

            var dotDotDotToken = tryEatToken(SyntaxKind.DotDotDotToken);
            var modifiers = parseModifiers();

            // If we're not forcing, and we don't see anything to indicate this is a parameter, then 
            // bail out.
            var _currentToken = currentToken();
            if (!isIdentifier(_currentToken) && dotDotDotToken === null && modifiers.length === 0) {
                // ERROR RECOVERY:
                // If we see a modifier alone in a parameter list, like:      foo(static)
                //
                // then treat it like modifier, and continue parsing the parameter.
                if (isModifierKind(_currentToken.kind())) {
                    modifiers = Syntax.list([consumeToken(_currentToken)]);
                }
                else {
                    return null;
                }
            }

            var identifier = eatIdentifierToken();
            var questionToken = tryEatToken(SyntaxKind.QuestionToken);
            var typeAnnotation = parseOptionalTypeAnnotation(/*allowStringLiteral:*/ true);

            var equalsValueClause: EqualsValueClauseSyntax = null;
            if (isEqualsValueClause(/*inParameter*/ true)) {
                equalsValueClause = parseEqualsValueClause(/*allowIn:*/ true);
            }

            return new syntaxFactory.ParameterSyntax(parseNodeData, dotDotDotToken, modifiers, identifier, questionToken, typeAnnotation, equalsValueClause);
        }

        function parseSyntaxList<T extends ISyntaxNodeOrToken>(
                currentListType: ListParsingState, skippedTokens: ISyntaxToken[], processItems: (items: any[]) => void = null): T[] {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << currentListType);

            var result = parseSyntaxListWorker<T>(currentListType, skippedTokens, processItems);

            listParsingState = savedListParsingState;

            return result;
        }

        function parseSeparatedSyntaxList<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState, skippedTokens: ISyntaxToken[]): T[] {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << currentListType);

            var result = parseSeparatedSyntaxListWorker<T>(currentListType, skippedTokens);

            listParsingState = savedListParsingState;

            return result;
        }

        // Returns true if we should abort parsing.
        function abortParsingListOrMoveToNextToken<T extends ISyntaxNodeOrToken>(
                currentListType: ListParsingState, nodes: T[], separators: ISyntaxToken[], skippedTokens: ISyntaxToken[]): boolean {
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
            addSkippedTokenToList(nodes, separators, skippedTokens, consumeToken(currentToken()));

            // Continue parsing this list.  Attach this token to whatever we've seen already.
            return false;
        }
        
        function addSkippedTokenToList<T extends ISyntaxNodeOrToken>(
                nodes: T[], separators: ISyntaxToken[], skippedTokens: ISyntaxToken[], skippedToken: ISyntaxToken): void {
            // Now, add this skipped token to the last item we successfully parsed in the list.  Or
            // add it to the list of skipped tokens if we haven't parsed anything.  Our caller will
            // have to deal with them.
            //
            // Note: we only bother doing this if we're creating a concrete syntax tree.
            if (syntaxFactory.isConcrete) {
                var length = nodes.length + (separators ? separators.length : 0);

                for (var i = length - 1; i >= 0; i--) {
                    var array: ISyntaxNodeOrToken[] = separators && (i % 2 === 1) ? separators : nodes;
                    var arrayIndex = separators ? IntegerUtilities.integerDivide(i, 2) : i;

                    var item = array[arrayIndex];
                    var _lastToken = lastToken(item);
                    if (_lastToken && _lastToken.fullWidth() > 0) {
                        array[arrayIndex] = <T>addSkippedTokenAfterNodeOrToken(item, skippedToken);
                        return;
                    }
                }

                // Didn't have anything in the list we could add to.  Add to the skipped items array
                // for our caller to handle.
                skippedTokens.push(skippedToken);
            }
        }

        function tryParseExpectedListItem(
                currentListType: ListParsingState, inErrorRecovery: boolean, items: ISyntaxElement[], processItems: (items: any[]) => void): boolean {
            var item = tryParseExpectedListItemWorker(currentListType, inErrorRecovery);

            if (item === null) {
                return false;
            }
            // Debug.assert(item !== null);

            items.push(item);

            if (processItems !== null) {
                processItems(items);
            }

            return true;
        }

        function listIsTerminated(currentListType: ListParsingState): boolean {
            return isExpectedListTerminator(currentListType) ||
                   currentToken().kind() === SyntaxKind.EndOfFileToken;
        }

        function parseSyntaxListWorker<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState, skippedTokens: ISyntaxToken[], processItems: (items: any[]) => void ): T[] {
            var items: T[] = getArray();

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
                    var abort = abortParsingListOrMoveToNextToken(currentListType, items, null, skippedTokens);
                    if (abort) {
                        break;
                    }
                }

                // We either parsed an element.  Or we failed to, but weren't at the end of the list
                // and didn't want to abort. Continue parsing elements.
            }

            var result = Syntax.list<T>(items);

            // Can't return if it has more then 1 element.  In that case, the list will have been
            // copied into the SyntaxList.
            returnZeroLengthArray(items);

            return result;
        }

        function parseSeparatedSyntaxListWorker<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState, skippedTokens: ISyntaxToken[]): T[] {
            var nodes: T[] = getArray();
            var separators: ISyntaxToken[] = getArray();

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
                var succeeded = tryParseExpectedListItem(currentListType, inErrorRecovery, nodes, null);

                if (!succeeded) {
                    // We weren't able to parse out a list element.
                    // Debug.assert(items === null || items.length % 2 === 0);
                    
                    // That may have been because the list is complete.  In that case, break out 
                    // and return the items we were able parse.
                    if (listIsTerminated(currentListType)) {
                        break;
                    }

                    // List wasn't complete and we didn't get an item.  Figure out if we should bail out
                    // or skip a token and continue.
                    var abort = abortParsingListOrMoveToNextToken(currentListType, nodes, separators, skippedTokens);
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
                var tokenKind = _currentToken.kind();
                if (tokenKind === _separatorKind || tokenKind === SyntaxKind.CommaToken) {
                    // Consume the last separator and continue parsing list elements.
                    separators.push(consumeToken(_currentToken));
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
                    separators.push(semicolonToken);
                    // Debug.assert(items.length % 2 === 0);
                    continue;
                }

                // We weren't at the end of the list.  And thre was no separator we could parse out.
                // Try parse the separator we expected, and continue parsing more list elements.
                // This time mark that we're in error recovery mode though.
                //
                // Note: trying to eat this token will emit the appropriate diagnostic.
                separators.push(eatToken(_separatorKind));

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

            var result = Syntax.separatedList<T>(nodes, separators);

            // Can't return if it has more then 0 elements.  In that case, the list will have been
            // copied into the SyntaxList.
            returnZeroLengthArray(nodes);
            returnZeroLengthArray(separators);

            return result;
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
                default:
                    throw Errors.invalidOperation();
            }
        }

        function isExpectedSourceUnit_ModuleElementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.EndOfFileToken;
        }

        function isExpectedEnumDeclaration_EnumElementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedModuleDeclaration_ModuleElementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedObjectType_TypeMembersTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedObjectLiteralExpression_PropertyAssignmentsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedLiteralExpression_AssignmentExpressionsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBracketToken;
        }

        function isExpectedTypeArgumentList_TypesTerminator(): boolean {
            var token = currentToken();
            var tokenKind = token.kind();
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

        function isExpectedTypeParameterList_TypeParametersTerminator(): boolean {
            var tokenKind = currentToken().kind();
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
            var tokenKind = currentToken().kind();
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
            var tokenKind = currentToken().kind();
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
            var tokenKind = currentToken().kind();

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
            if (currentToken().kind() === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            // We're done when we can eat a semicolon.
            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        function isExpectedClassOrInterfaceDeclaration_HeritageClausesTerminator(): boolean {
            var tokenKind = currentToken().kind();
            if (tokenKind === SyntaxKind.OpenBraceToken || tokenKind === SyntaxKind.CloseBraceToken) {
                return true;
            }

            return false;
        }

        function isExpectedHeritageClause_TypeNameListTerminator(): boolean {
            var tokenKind = currentToken().kind();
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
            var tokenKind = token0.kind();
            return tokenKind === SyntaxKind.CloseParenToken ||
                   tokenKind === SyntaxKind.SemicolonToken;
        }

        function isExpectedClassDeclaration_ClassElementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedSwitchStatement_SwitchClausesTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedSwitchClause_StatementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken ||
                   isSwitchClause();
        }

        function isExpectedBlock_StatementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.CloseBraceToken;
        }

        function isExpectedTryBlock_StatementsTerminator(): boolean {
            var tokenKind = currentToken().kind();
            return tokenKind === SyntaxKind.CatchKeyword ||
                    tokenKind === SyntaxKind.FinallyKeyword;
        }

        function isExpectedCatchBlock_StatementsTerminator(): boolean {
            return currentToken().kind() === SyntaxKind.FinallyKeyword;
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
            if (_currentToken.kind() === SyntaxKind.CommaToken) {
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
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return tryParseVariableDeclarator(/*allowIn:*/ true, /*allowIdentifierName:*/ false);
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return tryParseVariableDeclarator(/*allowIn:*/ false, /*allowIdentifierName:*/ false);
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return tryParseArgumentListExpression();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return tryParsePropertyAssignment(inErrorRecovery);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return tryParseAssignmentOrOmittedExpression();
                case ListParsingState.ParameterList_Parameters:                             return tryParseParameter();
                case ListParsingState.IndexSignature_Parameters:                            return tryParseParameter();
                case ListParsingState.TypeArgumentList_Types:                               return tryParseType();
                case ListParsingState.TypeParameterList_TypeParameters:                     return tryParseTypeParameter();
                default: throw Errors.invalidOperation();
            }
        }

        function getExpectedListElementType(currentListType: ListParsingState): string {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                            return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, null);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:          return '{';
                case ListParsingState.ClassDeclaration_ClassElements:                       return getLocalizedText(DiagnosticCode.constructor_function_accessor_or_variable, null);
                case ListParsingState.ModuleDeclaration_ModuleElements:                     return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, null);
                case ListParsingState.SwitchStatement_SwitchClauses:                        return getLocalizedText(DiagnosticCode.case_or_default_clause, null);
                case ListParsingState.SwitchClause_Statements:                              return getLocalizedText(DiagnosticCode.statement, null);
                case ListParsingState.Block_Statements:                                     return getLocalizedText(DiagnosticCode.statement, null);
                case ListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:      return getLocalizedText(DiagnosticCode.identifier, null);
                case ListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:   return getLocalizedText(DiagnosticCode.identifier, null);
                case ListParsingState.EnumDeclaration_EnumElements:                         return getLocalizedText(DiagnosticCode.identifier, null);
                case ListParsingState.ObjectType_TypeMembers:                               return getLocalizedText(DiagnosticCode.call_construct_index_property_or_function_signature, null);
                case ListParsingState.ArgumentList_AssignmentExpressions:                   return getLocalizedText(DiagnosticCode.expression, null);
                case ListParsingState.HeritageClause_TypeNameList:                          return getLocalizedText(DiagnosticCode.type_name, null);
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:          return getLocalizedText(DiagnosticCode.property_or_accessor, null);
                case ListParsingState.ParameterList_Parameters:                             return getLocalizedText(DiagnosticCode.parameter, null);
                case ListParsingState.IndexSignature_Parameters:                            return getLocalizedText(DiagnosticCode.parameter, null);
                case ListParsingState.TypeArgumentList_Types:                               return getLocalizedText(DiagnosticCode.type, null);
                case ListParsingState.TypeParameterList_TypeParameters:                     return getLocalizedText(DiagnosticCode.type_parameter, null);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions:         return getLocalizedText(DiagnosticCode.expression, null);
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

        FirstListParsingState = SourceUnit_ModuleElements,
        LastListParsingState = TypeParameterList_TypeParameters,
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