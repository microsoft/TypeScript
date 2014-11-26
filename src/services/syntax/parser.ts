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

        // The place in the source text that we're currently pointing at.
        absolutePosition(): number;

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
        consumeNodeOrToken(node: ISyntaxNodeOrToken): void;

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
        //
        // When adding more parser context flags, consider which is the more common case that the 
        // flag will be in.  This should be hte 'false' state for that flag.  The reason for this is
        // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
        // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for 
        // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
        // all nodes would need extra state on them to store this info.
        //
        // Note:  'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
        // grammar specification.
        //
        // An important thing about these context concepts.  By default they are effectively inherited
        // while parsing through every grammar production.  i.e. if you don't change them, then when
        // you parse a sub-production, it will have the same context values as hte parent production.
        // This is great most of the time.  After all, consider all the 'expression' grammar productions
        // and how nearly all of them pass along the 'in' and 'yield' context values:
        //
        // EqualityExpression[In, Yield] :
        //      RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
        //
        // Where you have to be careful is then understanding what the points are in the grammar 
        // where the values are *not* passed along.  For example:
        //
        // SingleNameBinding[Yield,GeneratorParameter]
        //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
        //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
        //
        // Here this is saying that if the GeneratorParameter context flag is set, that we should 
        // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
        // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
        // production.  Conversely, if the GeneratorParameter context flag is not set, then we 
        // should leave the 'yield' context flag alone.
        //
        // Getting this all correct is tricky and requires careful reading of the grammar to 
        // understand when these values should be changed versus when they should be inherited.
        var contextFlags: ParserContextFlags = 0;

        // Current state of the parser.  If we need to rewind we will store and reset these values as
        // appropriate.

        // Diagnostics created when parsing invalid code.  Any diagnosics created when speculative 
        // parsing need to removed when rewinding.  To do this we store the count of diagnostics when 
        // we start speculative parsing.  And if we rewind, we restore this to the same count that we 
        // started at.
        var diagnostics: Diagnostic[] = [];

        var _skippedTokens: ISyntaxToken[] = undefined;

        function setContextFlag(val: boolean, flag: ParserContextFlags) {
            if (val) {
                contextFlags |= flag;
            }
            else {
                contextFlags &= ~flag;
            }
        }

        function setStrictModeContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.StrictMode);
        }

        function setDisallowInContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.DisallowIn);
        }

        function setYieldContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.Yield);
        }

        function setGeneratorParameterContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.GeneratorParameter);
        }

        function setAsyncContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.Async);
        }

        function inStrictModeContext() {
            return (contextFlags & ParserContextFlags.StrictMode) !== 0;
        }

        function inDisallowInContext() {
            return (contextFlags & ParserContextFlags.DisallowIn) !== 0;
        }

        function inYieldContext() {
            return (contextFlags & ParserContextFlags.Yield) !== 0;
        }

        function inGeneratorParameterContext() {
            return (contextFlags & ParserContextFlags.GeneratorParameter) !== 0;
        }

        function inAsyncContext() {
            return (contextFlags & ParserContextFlags.Async) !== 0;
        }
        
        function allowInAnd<T>(func: () => T): T {
            if (inDisallowInContext()) {
                setDisallowInContext(false);
                var result = func();
                setDisallowInContext(true);
                return result;
            }
            
            // no need to do anything special if 'in' is already allowed.
            return func();
        }

        function disallowInAnd<T>(func: () => T): T {
            if (inDisallowInContext()) {
                // no need to do anything special if 'in' is already disallowed.
                return func();
            }

            setDisallowInContext(true);
            var result = func();
            setDisallowInContext(false);
            return result;
        }

        function doInsideYieldContext<T>(func: () => T): T {
            if (inYieldContext()) {
                // no need to do anything special if we're already in the [Yield] context.
                return func();
            }

            setYieldContext(true);
            var result = func();
            setYieldContext(false);
            return result;
        }

        function doOutsideYieldContext<T>(func: () => T): T {
            if (inYieldContext()) {
                setYieldContext(false);
                var result = func();
                setYieldContext(true);
                return result;
            }

            // no need to do anything special if we're not in the [Yield] context.
            return func();
        }

        function doInsideAsyncContext<T>(func: () => T): T {
            if (inAsyncContext()) {
                // no need to do anything special if we're already in the [Async] context.
                return func();
            }

            setAsyncContext(true);
            var result = func();
            setAsyncContext(false);
            return result;
        }

        function doOutsideAsyncContext<T>(func: () => T): T {
            if (inAsyncContext()) {
                setAsyncContext(false);
                var result = func();
                setAsyncContext(true);
                return result;
            }

            // no need to do anything special if we're not in the [Async] context.
            return func();
        }

        function parseSyntaxTree(_source: IParserSource, isDeclaration: boolean): SyntaxTree {
            // First, set up our state.
            fileName = _source.fileName;
            source = _source;
            languageVersion = source.languageVersion;

            // Now actually parse the tree.
            var result = parseSyntaxTreeWorker(isDeclaration);

            // Now, clear out our state so that our singleton parser doesn't keep things alive.
            diagnostics = [];
            contextFlags = 0;
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
            if (!_skippedTokens) {
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
                if (node &&
                    parserContextFlags(node) === contextFlags) {

                    return node;
                }
            }

            return undefined;
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
            source.consumeNodeOrToken(token)
        }

        function consumeToken(token: ISyntaxToken): ISyntaxToken {
            // Debug.assert(token.fullWidth() > 0 || token.kind === SyntaxKind.EndOfFileToken);

            // First, tell our source that the token has been consumed.
            source.consumeNodeOrToken(token);

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
            var trimmedToken = Syntax.withLeadingTrivia(skippedToken, Syntax.emptyTriviaList, source.text);

            // Because we removed the leading trivia from the skipped token, the full start of the
            // trimmed token is the start of the skipped token.
            trimmedToken.setFullStart(start(skippedToken, source.text));

            array.push(Syntax.skippedTokenTrivia(trimmedToken, source.text));
        }

        function addTriviaTo(list: ISyntaxTriviaList, array: ISyntaxTrivia[]): void {
            for (var i = 0, n = list.count(); i < n; i++) {
                array.push(list.syntaxTriviaAt(i));
            }
        }

        function consumeNode(node: ISyntaxNode): void {
            Debug.assert(_skippedTokens === undefined);
            source.consumeNodeOrToken(node);
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

            // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is 
            // considered a keyword and is not an identifier.
            if (tokenKind === SyntaxKind.YieldKeyword && inYieldContext()) {
                return false;
            }

            // If we have an 'await' keyword, and we're in the [async] context, then 'await' is
            // considered a keyword and is not an identifier.
            if (tokenKind === SyntaxKind.AwaitKeyword && inAsyncContext()) {
                return false;
            }

            // Keywords are only identifiers if they're FutureReservedStrictWords and we're in 
            // strict mode.  *Or* if it's a typescript 'keyword'. 
            if (tokenKind >= SyntaxKind.FirstFutureReservedStrictKeyword) {
                if (tokenKind <= SyntaxKind.LastFutureReservedStrictKeyword) {
                    // Could be a keyword or identifier.  It's an identifier if we're not in strict
                    // mode.
                    return !inStrictModeContext();
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
            if (token.hasLeadingNewLine()) {
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

        function createEmptyToken(kind: SyntaxKind): ISyntaxToken {
            // The position of the empty token we're creating is not necessarily the position that 
            // the parser is at now.  This is because we may have seen some existing missing tokens
            // before finally deciding we needed a missing token.  For example, if you have:
            //
            //      Foo(a, #    <eof>
            //
            // We will need to create a empty token for the missing ")".  However, we will have
            // skipped the "#" token, and thus will be right after the "#".  Because the "#" token
            // will actually become *skipped* trivia on the *next* token we see, the close paren
            // should not be considered to be after #, and should instead be after the ",".
            //
            // So, if we have any skipped tokens, then the position of the empty token should be
            // the position of the first skipped token we have.  Otherwise it's just at the position
            // of the parser.
            var fullStart = _skippedTokens ? _skippedTokens[0].fullStart() : source.absolutePosition();
            return Syntax.emptyToken(kind, fullStart);
        }

        function createMissingToken(expectedKind: SyntaxKind, actual: ISyntaxToken, diagnosticCode?: string, args?: any[]): ISyntaxToken {
            var diagnostic = getExpectedTokenDiagnostic(expectedKind, actual, diagnosticCode, args);
            addDiagnostic(diagnostic);

            // The missing token will be at the full start of the current token.  That way empty tokens
            // will always be between real tokens and not inside an actual token.
            return createEmptyToken(expectedKind);
        }

        function getExpectedTokenDiagnostic(expectedKind: SyntaxKind, actual?: ISyntaxToken, diagnosticCode?: string, args?: any[]): Diagnostic {
            var token = currentToken();

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

        function parseSourceUnit(): SourceUnitSyntax {
            // Note: saving and restoring the 'isInStrictMode' state is not really necessary here
            // (as it will never be read afterwards).  However, for symmetry with the rest of the
            // parsing code, we do the same here.
            var savedIsInStrictMode = inStrictModeContext()

            // Note: any skipped tokens produced after the end of all the module elements will be
            // added as skipped trivia to the start of the EOF token.
            var moduleElements = parseSyntaxList<IModuleElementSyntax>(ListParsingState.SourceUnit_ModuleElements, updateStrictModeState);
            
            setStrictModeContext(savedIsInStrictMode);
            
            var sourceUnit = new SourceUnitSyntax(contextFlags, moduleElements, consumeToken(currentToken()));

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
            if (!inStrictModeContext()) {
                // Check if all the items are directive prologue elements.
                for (var i = 0, n = items.length; i < n; i++) {
                    if (!isDirectivePrologueElement(items[i])) {
                        return;
                    }
                }

                setStrictModeContext(SyntaxFacts.isUseStrictDirective(items[items.length - 1]));
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
            return new ImportDeclarationSyntax(contextFlags,
                parseModifiers(), eatToken(SyntaxKind.ImportKeyword), eatIdentifierToken(), eatToken(SyntaxKind.EqualsToken), parseModuleReference(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseExportAssignment(): ExportAssignmentSyntax {
            return new ExportAssignmentSyntax(contextFlags,
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
            return new ExternalModuleReferenceSyntax(contextFlags,
                eatToken(SyntaxKind.RequireKeyword), eatToken(SyntaxKind.OpenParenToken), eatToken(SyntaxKind.StringLiteral), eatToken(SyntaxKind.CloseParenToken));
        }

        function parseModuleNameModuleReference(): ModuleNameModuleReferenceSyntax {
            return new ModuleNameModuleReferenceSyntax(contextFlags, parseName(/*allowIdentifierNames:*/ false));
        }

        function tryParseTypeArgumentList(inExpression: boolean): TypeArgumentListSyntax {
            var _currentToken = currentToken();
            if (_currentToken.kind !== SyntaxKind.LessThanToken) {
                return undefined;
            }

            if (!inExpression) {
                // if we're not in an expression, this must be a type argument list.  Just parse
                // it out as such.
                return new TypeArgumentListSyntax(contextFlags, 
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
                return new TypeArgumentListSyntax(contextFlags, lessThanToken, typeArguments, greaterThanToken);
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
                _currentToken.hasLeadingNewLine()) {

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

                current = new QualifiedNameSyntax(contextFlags, current, dotToken, identifierName);
                shouldContinue = identifierName.fullWidth() > 0;
            }

            return current;
        }

        function parseEnumDeclaration(): EnumDeclarationSyntax {
            var openBraceToken: ISyntaxToken;

            return new EnumDeclarationSyntax(contextFlags, 
                parseModifiers(), 
                eatToken(SyntaxKind.EnumKeyword), 
                eatIdentifierToken(), 
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken),
                openBraceToken.fullWidth() > 0 ? parseSeparatedSyntaxList<EnumElementSyntax>(ListParsingState.EnumDeclaration_EnumElements) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function isEnumElement(inErrorRecovery: boolean): boolean {
            var node = currentNode();
            if (node && node.kind === SyntaxKind.EnumElement) {
                return true;
            }

            return isPropertyName(/*peekToken:*/ 0, inErrorRecovery);
        }
        
        function tryParseEnumElementEqualsValueClause(): EqualsValueClauseSyntax {
            return isEqualsValueClause(/*inParameter*/ false) ? allowInAnd(parseEqualsValueClause) : undefined;
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

            return new EnumElementSyntax(contextFlags, parsePropertyName(), tryParseEnumElementEqualsValueClause());
        }

        function isModifierKind(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.AsyncKeyword:
                    return true;
            }

            return false;
        }

        function isModifier(token: ISyntaxToken, index: number): boolean {
            if (isModifierKind(token.kind)) {
                // Because modifiers are also identifiers, we only want to consider something to
                // be truly a modifier if the thing following it is something that can be modified.
                var nextToken = peekToken(index + 1);

                if (token.kind === SyntaxKind.AsyncKeyword) {
                    // In order for async to be modifier, the next token must be on the same line.
                    if (nextToken.hasLeadingNewLine()) {
                        return false;
                    }
                }

                var nextTokenKind = nextToken.kind;
                switch (nextTokenKind) {
                    // public foo'
                    // 'public' is a modifier.
                    case SyntaxKind.IdentifierName:

                    // public [a: number]: string
                    // 'public' is a modifier here.
                    case SyntaxKind.OpenBracketToken:

                    // public 0
                    // 'public' is def a modifier here.
                    case SyntaxKind.NumericLiteral:

                    // public "0"
                    // 'public' is def a modifier here.
                    case SyntaxKind.StringLiteral:

                    // public `0`
                    // 'public' is def a modifier here.
                    case SyntaxKind.NoSubstitutionTemplateToken:
                    
                    // public * foo
                    // 'public' is def a modifier here.
                    case SyntaxKind.AsteriskToken:
                        return true;
                    default:
                        // public static   or   public class
                        // 'public' is def a modifier here.
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

        function parseHeritageClauses(isClassHeritageClause: boolean): HeritageClauseSyntax[] {
            // ClassTail[Yield,GeneratorParameter] : See 14.5
            //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
            //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

            if (isHeritageClause()) {
                return isClassHeritageClause && inGeneratorParameterContext()
                    ? doOutsideYieldContext(parseHeritageClausesWorker)
                    : parseHeritageClausesWorker();
            }

            return [];
        }

        function parseHeritageClausesWorker() {
            return parseSyntaxList<HeritageClauseSyntax>(ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses)
        }

        function tryParseHeritageClauseTypeName(): ITypeSyntax {
            return isHeritageClauseTypeName() ? tryParseNameOrGenericType() : undefined;
        }

        function parseClassDeclaration(): ClassDeclarationSyntax {
            var openBraceToken: ISyntaxToken;
            return new ClassDeclarationSyntax(contextFlags,
                parseModifiers(), 
                eatToken(SyntaxKind.ClassKeyword), 
                eatIdentifierToken(), 
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false), 
                parseHeritageClauses(/*isClassHeritageClauses:*/ true), 
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken), 
                openBraceToken.fullWidth() > 0 ? parseSyntaxList<IClassElementSyntax>(ListParsingState.ClassDeclaration_ClassElements) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseClassElement(openBraceToken: ISyntaxToken): IClassElementSyntax[] {
            // ClassTail[Yield,GeneratorParameter] : See 14.5
            //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
            //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

            if (openBraceToken.fullWidth() > 0) {
                return inGeneratorParameterContext()
                    ? doOutsideYieldContext(parseClassElements)
                    : parseClassElements();
            }

            return [];
        }

        function parseClassElements() {
            return parseSyntaxList<IClassElementSyntax>(ListParsingState.ClassDeclaration_ClassElements)
        }

        function isAccessor(inErrorRecovery: boolean): boolean {
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.GetKeyword &&
                tokenKind !== SyntaxKind.SetKeyword) {
                return false;
            }

            return isPropertyName(/*peekIndex:*/ 1, inErrorRecovery);
        }

        function parseAccessor(modifiers: ISyntaxToken[]): IAccessorSyntax {
            var _currentToken = currentToken();
            var tokenKind = _currentToken.kind;

            if (tokenKind === SyntaxKind.GetKeyword) {
                return parseGetAccessor(modifiers, _currentToken);
            }
            else if (tokenKind === SyntaxKind.SetKeyword) {
                return parseSetAccessor(modifiers, _currentToken);
            }
            else {
                throw Errors.invalidOperation();
            }
        }

        function parseGetAccessor(modifiers: ISyntaxToken[], getKeyword: ISyntaxToken): GetAccessorSyntax {
            return new GetAccessorSyntax(contextFlags,
                modifiers, consumeToken(getKeyword), parsePropertyName(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false),
                parseFunctionBody(/*isGenerator:*/ false, /*asyncContext:*/ false));
        }

        function parseSetAccessor(modifiers: ISyntaxToken[], setKeyword: ISyntaxToken): SetAccessorSyntax {
            return new SetAccessorSyntax(contextFlags,
                modifiers, consumeToken(setKeyword), parsePropertyName(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false),
                parseFunctionBody(/*isGenerator:*/ false, /*asyncContext:*/ false));
        }

        function isClassElement(inErrorRecovery: boolean): boolean {
            if (SyntaxUtilities.isClassElement(currentNode())) {
                return true;
            }

            // Note: the order of these calls is important.  Specifically, isMemberVariableDeclaration
            // checks for a subset of the conditions of the previous two calls.
            var _modifierCount = modifierCount();
            return _modifierCount > 0 ||
                   isConstructorDeclaration() ||
                   isAccessor(inErrorRecovery) ||
                   isIndexMemberDeclaration() ||
                   isMemberVariableOrFunctionDeclaration(inErrorRecovery);
        }

        function isMemberVariableOrFunctionDeclaration(inErrorRecovery: boolean) {
            var token0 = currentToken();
            var token0Kind = token0.kind;

            // If we have a '*', then this is a generator function.
            if (token0Kind === SyntaxKind.AsteriskToken) {
                if (inErrorRecovery) {
                    // If we're in error recovery, we might see a random * that is part of some
                    // expression.  Really, in order to view this as a generator function, we want
                    // to see at least '*id<' or '*id('.  Otherwise, we won't think of this as the
                    // start of a member variable/function.
                    return peekToken(1).kind === SyntaxKind.IdentifierName && isCallSignature(/*peekIndex:*/ 2);
                }

                return true;
            }

            // Check if its the start of a property or method.  Both must start with a property name.
            if (!isPropertyName(0, inErrorRecovery)) {
                return false;
            }

            if (!SyntaxFacts.isAnyKeyword(token0Kind)) {
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
            var nextToken = peekToken(1);
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
                    return nextToken.hasLeadingNewLine();
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
            var modifiers = parseModifiers();
            if (isConstructorDeclaration()) {
                return parseConstructorDeclaration(modifiers);
            }
            else if (isIndexMemberDeclaration()) {
                return parseIndexMemberDeclaration(modifiers);
            }
            else if (isAccessor(inErrorRecovery)) {
                return parseAccessor(modifiers);
            }
            else if (modifiers.length > 0 || isMemberVariableOrFunctionDeclaration(inErrorRecovery)) {
                var asterixToken = tryEatToken(SyntaxKind.AsteriskToken);
                var propertyName = parsePropertyName();

                // If we got a '*', then this is definitely a method.  If we didn't get a '*', then
                // we must have gotten a property name.  And if that's all we have, we have to check
                // if we have a call signature.  If so, then this is a member function, otherwise
                // it's a member variable.
                if (asterixToken || isCallSignature(/*peekIndex:*/ 0)) {
                    return parseMemberFunctionDeclaration(modifiers, asterixToken, propertyName);
                }
                else {
                    return parseMemberVariableDeclaration(modifiers, propertyName);
                }
            }
            else {
                return undefined;
            }
        }

        function isConstructorDeclaration(): boolean {
            // Note: we deviate slightly from the spec here.  If we see 'constructor' then we 
            // assume this is a constructor.  That means, if a user writes "public constructor;"
            // it won't be viewed as a member.  As a workaround, they can simply write:
            //      public 'constructor';
            return currentToken().kind === SyntaxKind.ConstructorKeyword;
        }

        function parseConstructorDeclaration(modifiers: ISyntaxToken[]): ConstructorDeclarationSyntax {
            // Note: if we see an arrow after the close paren, then try to parse out a function 
            // block anyways.  It's likely the user just though '=> expr' was legal anywhere a 
            // block was legal.
            return new ConstructorDeclarationSyntax(contextFlags, 
                modifiers, 
                eatToken(SyntaxKind.ConstructorKeyword), 
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false),
                parseFunctionBody(/*isGenerator:*/ false, /*asyncContext:*/ false));
        }

        function parseMemberFunctionDeclaration(modifiers: ISyntaxToken[], asteriskToken: ISyntaxToken, propertyName: IPropertyNameSyntax): MemberFunctionDeclarationSyntax {
            // Note: if we see an arrow after the close paren, then try to parse out a function 
            // block anyways.  It's likely the user just though '=> expr' was legal anywhere a 
            // block was legal.
            var asyncContext = containsAsync(modifiers);
            var isGenerator = asteriskToken !== undefined;
            return new MemberFunctionDeclarationSyntax(contextFlags,
                modifiers,
                asteriskToken,
                propertyName,
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ isGenerator, /*asyncContext:*/ asyncContext),
                parseFunctionBody(isGenerator, asyncContext));
        }

        function containsAsync(modifiers: ISyntaxToken[]): boolean {
            for (var i = 0, n = modifiers.length; i < n; i++) {
                if (modifiers[i].kind === SyntaxKind.AsyncKeyword) {
                    return true;
                }
            }

            return false;
        }
        
        function parseMemberVariableDeclaration(modifiers: ISyntaxToken[], propertyName: IPropertyNameSyntax): MemberVariableDeclarationSyntax {
            return new MemberVariableDeclarationSyntax(contextFlags,
                modifiers,
                new VariableDeclaratorSyntax(contextFlags, propertyName,
                    parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false), 
                    isEqualsValueClause(/*inParameter*/ false) ? allowInAnd(parseEqualsValueClause) : undefined),
                eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function isIndexMemberDeclaration(): boolean {
            return isIndexSignature(/*peekIndex:*/ 0);
        }

        function parseIndexMemberDeclaration(modifiers: ISyntaxToken[]): IndexMemberDeclarationSyntax {
            return new IndexMemberDeclarationSyntax(contextFlags,
                modifiers,
                parseIndexSignature(),
                eatExplicitOrAutomaticSemicolon(/*allowWithoutNewLine:*/ false));
        }

        function isFunctionDeclaration(modifierCount: number): boolean {
            return peekToken(modifierCount).kind === SyntaxKind.FunctionKeyword;
        }

        function parseFunctionDeclaration(): FunctionDeclarationSyntax {
            return parseFunctionDeclarationWorker(
                parseModifiers(), eatToken(SyntaxKind.FunctionKeyword), tryEatToken(SyntaxKind.AsteriskToken));
        }

        function parseFunctionDeclarationWorker(modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, asteriskToken: ISyntaxToken): FunctionDeclarationSyntax {
            // FunctionDeclaration[Yield, Default] :
            //      function BindingIdentifier[?Yield] ( FormalParameters ) { FunctionBody }

            // GeneratorDeclaration[Yield, Default] :
            //      function * BindingIdentifier[?Yield](FormalParameters[Yield, GeneratorParameter]) { GeneratorBody[Yield] }
            var asyncContext = containsAsync(modifiers);
            var isGenerator = asteriskToken !== undefined;
            return new FunctionDeclarationSyntax(contextFlags,
                modifiers,
                functionKeyword,
                asteriskToken,
                eatIdentifierToken(),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ isGenerator, /*asyncContext:*/ asyncContext),
                parseFunctionBody(isGenerator, asyncContext));
        }

        function parseFunctionBody(isGenerator: boolean, asyncContext: boolean): BlockSyntax | ExpressionBody | ISyntaxToken {
            return isBlockOrArrow()
                ? parseFunctionBlockOrExpressionBody(/*yieldContext:*/ isGenerator, /*asyncContext:*/ asyncContext)
                : eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        function parseModuleName(): INameSyntax {
            return currentToken().kind === SyntaxKind.StringLiteral
                ? eatToken(SyntaxKind.StringLiteral)
                : parseName(/*allowIdentifierNames*/ false);
        }

        function parseModuleDeclaration(): ModuleDeclarationSyntax {
            var openBraceToken: ISyntaxToken;
            return new ModuleDeclarationSyntax(contextFlags,
                parseModifiers(),
                eatToken(SyntaxKind.ModuleKeyword),
                parseModuleName(), 
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken), 
                openBraceToken.fullWidth() > 0 ? parseSyntaxList<IModuleElementSyntax>(ListParsingState.ModuleDeclaration_ModuleElements) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseInterfaceDeclaration(): InterfaceDeclarationSyntax {
            return new InterfaceDeclarationSyntax(contextFlags,
                parseModifiers(),
                eatToken(SyntaxKind.InterfaceKeyword),
                eatIdentifierToken(),
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false),
                parseHeritageClauses(/*isClassHeritageClauses:*/ false),
                parseObjectType());
        }

        function parseObjectType(): ObjectTypeSyntax {
            var openBraceToken: ISyntaxToken;
            
            return new ObjectTypeSyntax(contextFlags,
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken),
                openBraceToken.fullWidth() > 0 ? parseSeparatedSyntaxList<ITypeMemberSyntax>(ListParsingState.ObjectType_TypeMembers) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseTupleType(currentToken: ISyntaxToken): TupleTypeSyntax {
            return new TupleTypeSyntax(contextFlags,
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
                // A call signature for a type member can both use 'yield' as a parameter name, and 
                // does not have parameter initializers.  So we can pass 'false' for both [Yield]
                // and [GeneratorParameter].
                return parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false);
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
            // Construct signatures have no [Yield] or [GeneratorParameter] restrictions.
            return new ConstructSignatureSyntax(contextFlags,
                eatToken(SyntaxKind.NewKeyword),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false));
        }

        function parseIndexSignature(): IndexSignatureSyntax {
            return new IndexSignatureSyntax(contextFlags,
                eatToken(SyntaxKind.OpenBracketToken),
                parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.IndexSignature_Parameters),
                eatToken(SyntaxKind.CloseBracketToken), parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
        }

        function parseMethodSignature(propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken): MethodSignatureSyntax {
            // Method signatues don't exist in expression contexts.  So they have neither
            // [Yield] nor [GeneratorParameter]
            return new MethodSignatureSyntax(contextFlags,
                propertyName,
                questionToken,
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false));
        }

        function parsePropertySignature(propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken): PropertySignatureSyntax {
            return new PropertySignatureSyntax(contextFlags,
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

            return new HeritageClauseSyntax(contextFlags,
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
                case SyntaxKind.OpenBraceToken: return parseStatementBlock();
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
            return new DebuggerStatementSyntax(contextFlags, consumeToken(debuggerKeyword), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseDoStatement(doKeyword: ISyntaxToken): DoStatementSyntax {
            // IterationStatement[Yield, Return] :
            //      do Statement[?Yield, ?Return]while (Expression[In, ?Yield]); opt

            // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
            // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
            // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
            //  do;while(0)x will have a semicolon inserted before x.
            return new DoStatementSyntax(contextFlags,
                consumeToken(doKeyword), parseStatement(/*inErrorRecovery:*/ false), eatToken(SyntaxKind.WhileKeyword), eatToken(SyntaxKind.OpenParenToken),
                allowInAnd(parseExpression), eatToken(SyntaxKind.CloseParenToken), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ true));
        }

        function isLabeledStatement(currentToken: ISyntaxToken): boolean {
            return isIdentifier(currentToken) && peekToken(1).kind === SyntaxKind.ColonToken;
        }

        function parseLabeledStatement(identifierToken: ISyntaxToken): LabeledStatementSyntax {
            return new LabeledStatementSyntax(contextFlags,
                consumeToken(identifierToken), eatToken(SyntaxKind.ColonToken), parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseTryStatement(tryKeyword: ISyntaxToken): TryStatementSyntax {
            var tryKeyword = consumeToken(tryKeyword);

            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.TryBlock_Statements);
            var block = parseStatementBlock();
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

            return new TryStatementSyntax(contextFlags, tryKeyword, block, catchClause, finallyClause);
        }

        function parseCatchClauseBlock(): BlockSyntax {
            var savedListParsingState = listParsingState;
            listParsingState |= (1 << ListParsingState.CatchBlock_Statements);
            var block = parseStatementBlock();
            listParsingState = savedListParsingState;

            return block;
        }

        function parseCatchClause(): CatchClauseSyntax {
            return new CatchClauseSyntax(contextFlags,
                eatToken(SyntaxKind.CatchKeyword), eatToken(SyntaxKind.OpenParenToken), eatIdentifierToken(),
                parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false), eatToken(SyntaxKind.CloseParenToken), parseCatchClauseBlock());
        }

        function parseFinallyClause(): FinallyClauseSyntax {
            return new FinallyClauseSyntax(contextFlags,
                eatToken(SyntaxKind.FinallyKeyword),
                parseStatementBlock());
        }

        function parseWithStatement(withKeyword: ISyntaxToken): WithStatementSyntax {
            // WithStatement[Yield, Return] :
            //      with (Expression[In, ?Yield]) Statement[?Yield, ?Return]

            return new WithStatementSyntax(contextFlags,
                consumeToken(withKeyword),
                eatToken(SyntaxKind.OpenParenToken),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.CloseParenToken),
                parseStatement(/*inErrorRecovery:*/ false));
        }

        function parseWhileStatement(whileKeyword: ISyntaxToken): WhileStatementSyntax {
            // IterationStatement[Yield, Return] :
            //      while (Expression[In, ?Yield]) Statement[?Yield, ?Return]

            return new WhileStatementSyntax(contextFlags,
                consumeToken(whileKeyword),
                eatToken(SyntaxKind.OpenParenToken),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.CloseParenToken),
                parseStatement(/*inErrorRecovery:*/ false));
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
            return new EmptyStatementSyntax(contextFlags, consumeToken(semicolonToken));
        }

        function parseForOrForInStatement(forKeyword: ISyntaxToken): IStatementSyntax {
            // Debug.assert(isForOrForInStatement());

            forKeyword = consumeToken(forKeyword);
            var openParenToken = eatToken(SyntaxKind.OpenParenToken);

            var _currentToken = currentToken();
            var tokenKind = _currentToken.kind;

            // If we see 'for ( ;' then there is no initializer, and this must be a 'for' statement.
            // If we don't see a semicolon, then parse our a variable declaration or an initializer
            // expression.  Both could be hte start of a 'for' or 'for-in' statement. So, after that
            // check to see if we have an 'in' keyword to make the final determination as to what we
            // have.

            // When trying to parse either a variable declaration or an expression do not allow 'in'
            // to be parsed, as that will actually be consumed by the 'for in' statement production
            // instead.  Also, we allow any expression here (even though the grammar only allows for
            // LeftHandSideExpression).  We will make sure we actually have a LHS expression in the 
            // grammar walker.
            var initializer = tokenKind === SyntaxKind.SemicolonToken
                ? undefined
                : tokenKind === SyntaxKind.VarKeyword
                    ? disallowInAnd(parseVariableDeclaration)
                    : disallowInAnd(parseExpression)

            // In order to be a 'for-in' statement, we had to have an initializer of some sort, and
            // we had to actually get an 'in' keyword.
            if (initializer !== undefined && currentToken().kind === SyntaxKind.InKeyword) {
                // for ([lookahead not-in {let [ }] LeftHandSideExpression[?Yield] in Expression[In, ?Yield] ) Statement[?Yield, ?Return]
                // for ( var ForBinding[?Yield] in Expression[In, ?Yield] ) Statement[?Yield, ?Return]
                // for ( ForDeclaration[?Yield] in Expression[In, ?Yield] ) Statement[?Yield, ?Return]

                return new ForInStatementSyntax(contextFlags,
                    forKeyword, openParenToken, initializer, eatToken(SyntaxKind.InKeyword),
                    allowInAnd(parseExpression), eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
            }
            else {
                // NOTE: From the es5 section on Automatic Semicolon Insertion.
                // a semicolon is never inserted automatically if the semicolon would then ... become 
                // one of the two semicolons in the header of a for statement

                // for (ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
                // for (var VariableDeclarationListNoIn; Expressionopt; Expressionopt) Statement
                return new ForStatementSyntax(contextFlags,
                    forKeyword, openParenToken, initializer,
                    eatToken(SyntaxKind.SemicolonToken), tryParseForStatementCondition(),
                    eatToken(SyntaxKind.SemicolonToken), tryParseForStatementIncrementor(),
                    eatToken(SyntaxKind.CloseParenToken), parseStatement(/*inErrorRecovery:*/ false));
            }
        }

        function tryParseForStatementCondition(): IExpressionSyntax {
            // for ( Expression[?Yield]opt ; Expression[In, ?Yield]opt ; Expression[In, ?Yield]opt )

            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.SemicolonToken &&
                tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return allowInAnd(parseExpression);
            }

            return undefined;
        }

        function tryParseForStatementIncrementor(): IExpressionSyntax {
            // for ( Expression[?Yield]opt ; Expression[In, ?Yield]opt ; Expression[In, ?Yield]opt )
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.CloseParenToken &&
                tokenKind !== SyntaxKind.EndOfFileToken) {
                return allowInAnd(parseExpression);
            }

            return undefined;
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
            return new BreakStatementSyntax(contextFlags,
                consumeToken(breakKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseContinueStatement(continueKeyword: ISyntaxToken): ContinueStatementSyntax {
            return new ContinueStatementSyntax(contextFlags,
                consumeToken(continueKeyword), tryEatBreakOrContinueLabel(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseSwitchExpression(openParenToken: ISyntaxToken) {
            // SwitchStatement[Yield, Return] :
            //      switch (Expression[In, ?Yield] ) CaseBlock[?Yield, ?Return]

            return openParenToken.fullWidth() === 0 && currentToken().kind === SyntaxKind.OpenBraceToken
                ? eatIdentifierToken()
                : allowInAnd(parseExpression);
        }

        function parseSwitchStatement(switchKeyword: ISyntaxToken) {
            // Debug.assert(isSwitchStatement());
            var openParenToken: ISyntaxToken;
            var openBraceToken: ISyntaxToken;

            return new SwitchStatementSyntax(contextFlags,
                consumeToken(switchKeyword), 
                openParenToken = eatToken(SyntaxKind.OpenParenToken),
                parseSwitchExpression(openParenToken),
                eatToken(SyntaxKind.CloseParenToken), 
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken),
                openBraceToken.fullWidth() > 0 ? parseSyntaxList<ISwitchClauseSyntax>(ListParsingState.SwitchStatement_SwitchClauses) : [],
                eatToken(SyntaxKind.CloseBraceToken));
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
            // CaseClause[Yield, Return] :
            //      case Expression[In, ?Yield] : StatementList[?Yield, ?Return]opt

            return new CaseSwitchClauseSyntax(contextFlags,
                consumeToken(caseKeyword),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.ColonToken), 
                parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements));
        }

        function parseDefaultSwitchClause(defaultKeyword: ISyntaxToken): DefaultSwitchClauseSyntax {
            // Debug.assert(isDefaultSwitchClause());

            return new DefaultSwitchClauseSyntax(contextFlags, 
                consumeToken(defaultKeyword), 
                eatToken(SyntaxKind.ColonToken),
                parseSyntaxList<IStatementSyntax>(ListParsingState.SwitchClause_Statements));
        }

        function parseThrowStatement(throwKeyword: ISyntaxToken): ThrowStatementSyntax {
            return new ThrowStatementSyntax(contextFlags,
                consumeToken(throwKeyword), tryParseThrowStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function tryParseThrowStatementExpression(): IExpressionSyntax {
            // ThrowStatement[Yield] :
            //      throw [no LineTerminator here]Expression[In, ?Yield];

            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            // We just return 'undefined' in that case.  The actual error will be reported in the
            // grammar walker.
            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) ? undefined : allowInAnd(parseExpression);
        }

        function parseReturnStatement(returnKeyword: ISyntaxToken): ReturnStatementSyntax {
            return new ReturnStatementSyntax(contextFlags,
                consumeToken(returnKeyword), tryParseReturnStatementExpression(), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function tryParseReturnStatementExpression(): IExpressionSyntax {
            // ReturnStatement[Yield] :
            //      return [no LineTerminator here]Expression[In, ?Yield];

            return canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) ? undefined : allowInAnd(parseExpression);
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

            // ElementList[Yield] :
            //      Elisionopt AssignmentExpression[In, ?Yield]

            if (currentToken().kind === SyntaxKind.CommaToken) {
                return new OmittedExpressionSyntax(contextFlags);
            }

            return allowInAnd(tryParseAssignmentExpressionOrHigher);
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
                    // Note: if we see a / or /= token then we always consider this an expression. 
                    // The / or /= will actually be the start of a regex that we will contextually
                    // rescan.

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

                case SyntaxKind.YieldKeyword:
                    // 'yield' always starts an expression.  Either it is an identifier (in which case
                    // it is definitely an expression).  Or it's a keyword (either because we're in
                    // a generator, or in strict mode (or both)) and it started a yield expression.
                    return true;

                case SyntaxKind.AwaitKeyword:
                    // 'await' always starts an expression.  Either it is an identifier (in which case
                    // it is definitely an expression).  Or it's a keyword and it started an await 
                    // expression.
                    return true;

                case SyntaxKind.AsyncKeyword:
                    // 'async' always starts an expression.  Either it is an identifier (in which case
                    // it is definitely an expression).  Or it's a keyword and it started an async
                    // function/arrow expression.
                    return true;
            }

            return isIdentifier(currentToken);
        }

        function parseExpressionStatement(): ExpressionStatementSyntax {
            // ExpressionStatement[Yield] :
            //      [lookahead not-in {{, function, class, let [ }] Expression[In, ?Yield];

            return new ExpressionStatementSyntax(contextFlags,
                allowInAnd(parseExpression),
                eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseIfStatement(ifKeyword: ISyntaxToken): IfStatementSyntax {
            // IfStatement[Yield, Return] :
            //   if (Expression[In, ?Yield]) Statement[?Yield, ?Return] else Statement[?Yield, ?Return]
            //   if (Expression[In, ?Yield]) Statement[?Yield, ?Return]

            return new IfStatementSyntax(contextFlags,
                consumeToken(ifKeyword),
                eatToken(SyntaxKind.OpenParenToken),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.CloseParenToken),
                parseStatement(/*inErrorRecovery:*/ false), parseOptionalElseClause());
        }

        function parseOptionalElseClause(): ElseClauseSyntax {
            return currentToken().kind === SyntaxKind.ElseKeyword ? parseElseClause() : undefined;
        }

        function parseElseClause(): ElseClauseSyntax {
            return new ElseClauseSyntax(contextFlags, eatToken(SyntaxKind.ElseKeyword), parseStatement(/*inErrorRecovery:*/ false));
        }

        function isVariableStatement(modifierCount: number): boolean {
            return peekToken(modifierCount).kind === SyntaxKind.VarKeyword;
        }

        function parseVariableStatement(): VariableStatementSyntax {
            // VariableStatement[Yield] :
            //      var VariableDeclarationList[In, ?Yield];

            return new VariableStatementSyntax(contextFlags,
                parseModifiers(), allowInAnd(parseVariableDeclaration), eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false));
        }

        function parseVariableDeclaration(): VariableDeclarationSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.VarKeyword);

            return new VariableDeclarationSyntax(contextFlags,
                eatToken(SyntaxKind.VarKeyword),
                parseSeparatedSyntaxList<VariableDeclaratorSyntax>(ListParsingState.VariableDeclaration_VariableDeclarators));
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

        function tryParseVariableDeclarator(): VariableDeclaratorSyntax {
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
                    equalsValueClause = parseEqualsValueClause();
                }
            }

            return new VariableDeclaratorSyntax(contextFlags, propertyName, typeAnnotation, equalsValueClause);
        }

        function isEqualsValueClause(inParameter: boolean): boolean {
            var token0 = currentToken();
            if (token0.kind === SyntaxKind.EqualsToken) {
                return true;
            }

            // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
            // there is no newline after the last token and if we're on an expression.  If so, parse
            // this as an equals-value clause with a missing equals.
            if (!token0.hasLeadingNewLine()) {
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

        function parseEqualsValueClause(): EqualsValueClauseSyntax {
            // Initializer[In, Yield] :
            //     = AssignmentExpression[?In, ?Yield]

            return new EqualsValueClauseSyntax(contextFlags,
                eatToken(SyntaxKind.EqualsToken),
                parseAssignmentExpressionOrHigher());
        }

        function parseExpression(): IExpressionSyntax {
            // Expression[in]:
            //      AssignmentExpression[in] 
            //      Expression[in] , AssignmentExpression[in]

            var leftOperand = parseAssignmentExpressionOrHigher();
            while (true) {
                var _currentToken = currentToken();
                if (_currentToken.kind !== SyntaxKind.CommaToken) {
                    break;
                }

                leftOperand = new BinaryExpressionSyntax(contextFlags,
                    leftOperand,
                    consumeToken(_currentToken), 
                    parseAssignmentExpressionOrHigher());
            }

            return leftOperand;
        }

        function tryParseAssignmentExpressionOrHigher(): IExpressionSyntax {
            return tryParseAssignmentExpressionOrHigherWorker(/*force:*/ false);
        }

        function parseAssignmentExpressionOrHigher(): IExpressionSyntax {
            return tryParseAssignmentExpressionOrHigherWorker(/*force:*/ true);
        }

        // Called when you need to parse an expression, but you do not want to allow 'CommaExpressions'.
        // i.e. if you have "var a = 1, b = 2" then when we parse '1' we want to parse with higher 
        // precedence than 'comma'.  Otherwise we'll get: "var a = (1, (b = 2))", instead of
        // "var a = (1), b = (2)");
        function tryParseAssignmentExpressionOrHigherWorker(force: boolean): IExpressionSyntax {
            //  AssignmentExpression[in,yield]:
            //      1) ConditionalExpression[?in,?yield]
            //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
            //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
            //      4) ArrowFunctionExpression[?in,?yield]
            //      5) [+Yield] YieldExpression[?In]
            //
            // Note: for ease of implementation we treat productions '2' and '3' as the same thing. 
            // (i.e. they're both BinaryExpressions with an assignment operator in it).

            // First, check if we have production '4' (an arrow function).  Note that if we do, we
            // must *not* recurse for productsion 1, 2 or 3. An ArrowFunction is not a 
            // LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done 
            // with AssignmentExpression if we see one.
            var _currentToken = currentToken();
            if (isYieldExpression(_currentToken)) {
                return parseYieldExpression(_currentToken);
            }

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
            var leftOperand = tryParseBinaryExpressionOrHigher(_currentToken, force, BinaryExpressionPrecedence.Lowest);
            if (leftOperand === undefined) {
                return undefined;
            }

            if (SyntaxUtilities.isLeftHandSizeExpression(leftOperand)) {
                // Note: we call currentOperatorToken so that we get an appropriately merged token
                // for cases like > > =  becoming >>=
                var operatorToken = currentOperatorToken();

                // Check for recursive assignment expressions.
                if (SyntaxFacts.isAssignmentOperatorToken(operatorToken.kind)) {
                    return new BinaryExpressionSyntax(contextFlags,
                        leftOperand,
                        consumeToken(operatorToken), 
                        parseAssignmentExpressionOrHigher());
                }
            }

            // It wasn't an assignment or a lambda.  This is a conditional expression:
            return parseConditionalExpressionRest(leftOperand);
        }

        function parsePossibleAwaitExpression(awaitKeyword: ISyntaxToken): IUnaryExpressionSyntax {
            if (inAsyncContext()) {
                // If we're in an async context, then 'await' definitely starts an await expression.
                return parseAwaitExpression(awaitKeyword);
            }

            // We're in a context where 'await expr' is not allowed.  However, if we can
            // definitely tell that the user was trying to parse a 'await expr' and not
            // just a normal expr that start with a 'await' identifier, then parse out
            // an 'await expr'.  We can then report an error later that they are only 
            // allowed in async contexts.
            // 
            // for example, if we see 'await(foo)', then we'll have to treat that as an
            // invocation expression of something called 'await'.  However, if we have
            // 'await foo' then that is not legal as a normal expression, so we can 
            // definitely recognize this as a await expression.
            //
            // for now we just check if the next token is an identifier.  More heuristics
            // can be added here later as necessary.  We just need to make sure that we
            // don't accidently consume something legal.
            if (isUnambiguouslyYieldOrAwaitExpression()) {
                return parseAwaitExpression(awaitKeyword);
            }

            // Not an 'await' expression.  Parse this with our normal postfix parsing rules.
            return tryParsePostfixExpressionOrHigher(awaitKeyword, /*force:*/ true);
        }

        function parseAwaitExpression(awaitKeyword: ISyntaxToken): AwaitExpressionSyntax {
            return new AwaitExpressionSyntax(contextFlags,
                consumeToken(awaitKeyword),
                parseAssignmentExpressionOrHigher());
        }

        function isYieldExpression(_currentToken: ISyntaxToken): boolean {
            if (_currentToken.kind === SyntaxKind.YieldKeyword) {
                // If we have a 'yield' keyword, and htis is a context where yield expressions are 
                // allowed, then definitely parse out a yield expression.
                if (inYieldContext()) {
                    return true;
                }

                if (inStrictModeContext()) {
                    // If we're in strict mode, then 'yield' is a keyword, could only ever start
                    // a yield expression.
                    return true;
                }

                return isUnambiguouslyYieldOrAwaitExpression();
            }

            return false;
        }

        function isUnambiguouslyYieldOrAwaitExpression() {
            // We're in a context where 'yield expr' or 'await expr' is not allowed.  However, if 
            // we can definitely tell that the user was trying to parse one of these then parse it
            // out and report an error later in the grammar checker.
            // 
            // for example, if we see 'yield(foo)', then we'll have to treat that as an
            // invocation expression of something called 'yield'.  However, if we have
            // 'yield foo' then that is not legal as a normal expression, so we can 
            // definitely recognize this as a yield expression.
            var token1 = peekToken(1);

            if (token1.hasLeadingNewLine()) {
                // Next token is on the next line.  Thanks to ASI, this might start some other 
                // construct.  Can't assume this is a yield or await expr.
                return false;
            }

            // 'await a' or 'yield a'.  Definitely a yield/await expression.  C
            if (isIdentifier(token1)) {
                return true;
            }

            var currentTokenKind = token1.kind;
            switch (currentTokenKind) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.NewKeyword:
                    return true
                case SyntaxKind.NoSubstitutionTemplateToken:
                case SyntaxKind.TemplateStartToken:
                    // yield `foo`
                    // This is a tagged template expressoin.
                    return false;
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    // yield / foo
                    // This is a divide expression.
                    return false;
                case SyntaxKind.OpenBracketToken:
                    // yield[foo]
                    // This is a indexed access expression.
                    return false;
                case SyntaxKind.OpenParenToken:
                    // yield(foo)
                    // This is an invocation expression.
                    return false;
                default:
                    return false;
            }
        }

        function parseYieldExpression(yieldKeyword: ISyntaxToken): YieldExpressionSyntax {
            // YieldExpression[In] :
            //      yield
            //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
            //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]

            yieldKeyword = consumeToken(yieldKeyword);
            var _currentToken = currentToken();

            if (!_currentToken.hasLeadingNewLine() &&
                (_currentToken.kind === SyntaxKind.AsteriskToken || isExpression(_currentToken))) {

                return new YieldExpressionSyntax(contextFlags, yieldKeyword, tryEatToken(SyntaxKind.AsteriskToken), parseAssignmentExpressionOrHigher());
            }
            else {
                // if the next token is not on the same line as yield.  or we don't have an '*' or 
                // the start of an expressin, then this is just a simple "yield" expression.
                return new YieldExpressionSyntax(contextFlags, yieldKeyword, /*asterixToken:*/ undefined, /*expression;*/ undefined);
            }
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
                    return new PrefixUnaryExpressionSyntax(contextFlags, consumeToken(_currentToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeOfExpression(_currentToken);
                case SyntaxKind.VoidKeyword:
                    return parseVoidExpression(_currentToken);
                case SyntaxKind.DeleteKeyword:
                    return parseDeleteExpression(_currentToken);
                case SyntaxKind.LessThanToken:
                    return parseCastExpression(_currentToken);
                case SyntaxKind.AwaitKeyword:
                    return parsePossibleAwaitExpression(_currentToken);
                default:
                    return tryParsePostfixExpressionOrHigher(_currentToken, force);
            }
        }

        function tryParseBinaryExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean, precedence: BinaryExpressionPrecedence): IExpressionSyntax {
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
            return parseBinaryExpressionRest(precedence, leftOperand);
        }

        function parseConditionalExpressionRest(leftOperand: IExpressionSyntax): IExpressionSyntax {
            // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.

            var _currentToken = currentToken();

            // Now check for conditional expression.
            if (_currentToken.kind !== SyntaxKind.QuestionToken) {
                return leftOperand;
            }

            // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and 
            // we do not that for the 'whenFalse' part.  

            return new ConditionalExpressionSyntax(contextFlags,
                leftOperand,
                consumeToken(_currentToken),
                allowInAnd(parseAssignmentExpressionOrHigher),
                eatToken(SyntaxKind.ColonToken),
                parseAssignmentExpressionOrHigher());
        }

        function parseBinaryExpressionRest(precedence: BinaryExpressionPrecedence, leftOperand: IExpressionSyntax): IExpressionSyntax {
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
                if (tokenKind === SyntaxKind.InKeyword && inDisallowInContext()) {
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

                leftOperand = new BinaryExpressionSyntax(contextFlags, leftOperand, consumeToken(operatorToken), 
                    tryParseBinaryExpressionOrHigher(currentToken(), /*force:*/ true, newPrecedence));
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

        function tryParseMemberExpressionOrHigher(_currentToken: ISyntaxToken, force: boolean): IMemberExpressionSyntax {
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

            return parseMemberExpressionRest(expression); 
        }

        function parseCallExpressionRest(expression: ILeftHandSideExpressionSyntax): ILeftHandSideExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind;

                switch (currentTokenKind) {
                    case SyntaxKind.OpenParenToken:
                        expression = new InvocationExpressionSyntax(contextFlags, expression, parseArgumentList(/*typeArgumentList:*/ undefined, _currentToken));
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

                        expression = new InvocationExpressionSyntax(contextFlags, expression, argumentList);
                        continue;

                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new MemberAccessExpressionSyntax(contextFlags, expression, consumeToken(_currentToken), eatIdentifierNameToken());
                        continue;

                    case SyntaxKind.NoSubstitutionTemplateToken:
                    case SyntaxKind.TemplateStartToken:
                        expression = new TemplateAccessExpressionSyntax(contextFlags, expression, parseTemplateExpression(_currentToken));
                        continue;
                }

                return expression;
            }
        }

        function parseMemberExpressionRest(expression: IMemberExpressionSyntax): IMemberExpressionSyntax {
            while (true) {
                var _currentToken = currentToken();
                var currentTokenKind = _currentToken.kind;

                switch (currentTokenKind) {
                    case SyntaxKind.OpenBracketToken:
                        expression = parseElementAccessExpression(expression, _currentToken);
                        continue;

                    case SyntaxKind.DotToken:
                        expression = new MemberAccessExpressionSyntax(contextFlags, expression, consumeToken(_currentToken), eatIdentifierNameToken());
                        continue;

                    case SyntaxKind.NoSubstitutionTemplateToken:
                    case SyntaxKind.TemplateStartToken:
                        expression = new TemplateAccessExpressionSyntax(contextFlags, expression, parseTemplateExpression(_currentToken));
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
                expression = tryParseMemberExpressionOrHigher(_currentToken, force);
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
                : new MemberAccessExpressionSyntax(contextFlags, expression, eatToken(SyntaxKind.DotToken), eatIdentifierNameToken());
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
                    if (_currentToken.hasLeadingNewLine()) {
                        break;
                    }

                    return new PostfixUnaryExpressionSyntax(contextFlags, expression, consumeToken(_currentToken));
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
                    return new ArgumentListSyntax(contextFlags, typeArgumentList,
                        createMissingToken(SyntaxKind.OpenParenToken, undefined, DiagnosticCode.A_parameter_list_must_follow_a_generic_type_argument_list_expected), 
                        <any>[],
                        eatToken(SyntaxKind.CloseParenToken));
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

            return new ArgumentListSyntax(contextFlags,
                typeArgumentList, 
                consumeToken(openParenToken),
                parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArgumentList_AssignmentExpressions),
                eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseArgumentListExpression(): IExpressionSyntax {
            // ArgumentList[Yield] :
            //      AssignmentExpression[In, ?Yield]

            // Generally while parsing lists, we don't want to 'force' the parser to parse
            // the item.  That way, if the expected item isn't there, we can bail out and
            // move to a higher stage of list parsing.  However, it's extremely common to 
            // see something like "Foo(, a".  in this case, even though there isn't an expression
            // after the open paren, we still want to force parsing an expression (which will
            // cause a missing identiifer to be created), so that we will then consume the
            // comma and the following list items).
            var force = currentToken().kind === SyntaxKind.CommaToken;
            return allowInAnd(force ? parseAssignmentExpressionOrHigher : tryParseAssignmentExpressionOrHigher);
        }

        function parseElementAccessArgumentExpression(openBracketToken: ISyntaxToken) {
            // MemberExpression[?Yield] [ Expression[In, ?Yield] ]

            // For error recovery purposes.  Allow a missing expression here.  We'll report the
            // appropriate message in the grammar checker.
            return currentToken().kind === SyntaxKind.CloseBracketToken ? undefined : allowInAnd(parseExpression);
        }

        function parseElementAccessExpression(expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken): ElementAccessExpressionSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.OpenBracketToken);
            return new ElementAccessExpressionSyntax(contextFlags, expression, consumeToken(openBracketToken),
                parseElementAccessArgumentExpression(openBracketToken), eatToken(SyntaxKind.CloseBracketToken));
        }

        function tryParsePrimaryExpression(_currentToken: ISyntaxToken, force: boolean): IPrimaryExpressionSyntax {
            // Have to check for 'async function' first as 'async' is an identifier and will be 
            // consumed immediately below this.
            if (_currentToken.kind === SyntaxKind.AsyncKeyword) {
                var token1 = peekToken(1);
                if (!token1.hasLeadingNewLine() && token1.kind === SyntaxKind.FunctionKeyword) {
                    return parseFunctionExpression();
                }
            }

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
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionExpression();
                case SyntaxKind.OpenBracketToken:
                    return parseArrayLiteralExpression(_currentToken);
                case SyntaxKind.OpenBraceToken:
                    return parseObjectLiteralExpression(_currentToken);
                case SyntaxKind.OpenParenToken:
                    return parseParenthesizedExpression(_currentToken);
                case SyntaxKind.NewKeyword:
                    return parseObjectCreationExpression(_currentToken);
                case SyntaxKind.NoSubstitutionTemplateToken:
                case SyntaxKind.TemplateStartToken:
                    return parseTemplateExpression(_currentToken);
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    // If we see a standalone / or /= and we're expecting an expression, then reparse
                    // it as a regular expression.
                    return reparseDivideAsRegularExpression();
            }

            if (!force) {
                return undefined;
            }

            // Nothing else worked, report an error and produce a missing token.
            return eatIdentifierToken(DiagnosticCode.Expression_expected);
        }

        function reparseDivideAsRegularExpression(): IPrimaryExpressionSyntax {
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
            Debug.assert(tokenKind === SyntaxKind.RegularExpressionLiteral);

            return consumeToken(currentToken);
        }

        function parseTypeOfExpression(typeOfKeyword: ISyntaxToken): TypeOfExpressionSyntax {
            return new TypeOfExpressionSyntax(contextFlags, consumeToken(typeOfKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseDeleteExpression(deleteKeyword: ISyntaxToken): DeleteExpressionSyntax {
            return new DeleteExpressionSyntax(contextFlags, consumeToken(deleteKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseVoidExpression(voidKeyword: ISyntaxToken): VoidExpressionSyntax {
            return new VoidExpressionSyntax(contextFlags, consumeToken(voidKeyword), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseFunctionExpression(): FunctionExpressionSyntax {
            // GeneratorExpression :
            //      function * BindingIdentifier[Yield]opt (FormalParameters[Yield, GeneratorParameter]) { GeneratorBody[Yield] }
            // FunctionExpression:
            //      function BindingIdentifieropt(FormalParameters) { FunctionBody }

            var asyncKeyword: ISyntaxToken;
            var asteriskToken: ISyntaxToken;
            return new FunctionExpressionSyntax(contextFlags,
                asyncKeyword = tryEatToken(SyntaxKind.AsyncKeyword),
                eatToken(SyntaxKind.FunctionKeyword),
                asteriskToken = tryEatToken(SyntaxKind.AsteriskToken),
                tryEatFunctionExpressionIdentifier(!!asteriskToken, !!asyncKeyword),
                parseCallSignature(/*requireCompleteTypeParameterList:*/ false, /*yieldAndGeneratorParameterContext:*/ !!asteriskToken, /*asyncContext:*/ !!asyncKeyword),
                parseFunctionBody(!!asteriskToken, !!asyncKeyword));
        }

        function tryEatFunctionExpressionIdentifier(yieldContext: boolean, asyncContext: boolean) {
            var savedYieldContext = inYieldContext();
            var savedAsyncContext = inAsyncContext();

            setYieldContext(yieldContext);
            setAsyncContext(asyncContext);

            var result = eatOptionalIdentifierToken();

            setYieldContext(savedYieldContext);
            setAsyncContext(savedAsyncContext);

            return result;
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

            return new ObjectCreationExpressionSyntax(contextFlags,
                consumeToken(newKeyword), tryParseMemberExpressionOrHigher(currentToken(), /*force:*/ true), tryParseArgumentList());
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
            
            return new TemplateExpressionSyntax(contextFlags, startToken, Syntax.list(templateClauses));
        }

        function parseTemplateClause(): TemplateClauseSyntax {
            // TemplateLiteral[Yield] : See 12.2.8
            // NoSubstitutionTemplate
            // TemplateHead Expression[In, ?Yield]
            // [Lexical goal InputElementTemplateTail] TemplateSpans[?Yield]

            var expression = allowInAnd(parseExpression);
            var token = currentToken();

            if (token.kind === SyntaxKind.CloseBraceToken) {
                token = currentContextualToken();
                Debug.assert(token.kind === SyntaxKind.TemplateMiddleToken || token.kind === SyntaxKind.TemplateEndToken);
                token = consumeToken(token);
            }
            else {
                token = createMissingToken(SyntaxKind.TemplateEndToken, undefined, DiagnosticCode._0_expected, ["{"]);
            }

            return new TemplateClauseSyntax(contextFlags, expression, token);
        }

        function parseCastExpression(lessThanToken: ISyntaxToken): CastExpressionSyntax {
            return new CastExpressionSyntax(contextFlags,
                consumeToken(lessThanToken), parseType(), eatToken(SyntaxKind.GreaterThanToken), tryParseUnaryExpressionOrHigher(currentToken(), /*force:*/ true));
        }

        function parseParenthesizedExpression(openParenToken: ISyntaxToken): ParenthesizedExpressionSyntax {
            // ( Expression[In, ?Yield] )

            return new ParenthesizedExpressionSyntax(contextFlags,
                consumeToken(openParenToken),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.CloseParenToken));
        }

        function tryParseParenthesizedArrowFunctionExpression(): ParenthesizedArrowFunctionExpressionSyntax {
            var tokenKind = currentToken().kind;
            if (tokenKind !== SyntaxKind.AsyncKeyword && tokenKind !== SyntaxKind.OpenParenToken && tokenKind !== SyntaxKind.LessThanToken) {
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
            var asyncKeyword = tryEatToken(SyntaxKind.AsyncKeyword);

            // From the static semantic section:
            // 1.If the [Yield] grammar parameter is present for CoverParenthesizedExpressionAndArrowParameterList[Yield]
            //  return the result of parsing the lexical token stream matched by CoverParenthesizedExpressionAndArrowParameterList[Yield] 
            //  using ArrowFormalParameters[Yield, GeneratorParameter] as the goal symbol.
            // 2.If the [Yield] grammar parameter is not present for CoverParenthesizedExpressionAndArrowParameterList[Yield]
            //  return the result of parsing the lexical token stream matched by CoverParenthesizedExpressionAndArrowParameterList
            //  using ArrowFormalParameters as the goal symbol.
            var callSignature = parseCallSignature(/*requireCompleteTypeParameterList:*/ true, /*yieldAndGeneratorParameterContext:*/ inYieldContext(), /*asyncContext:*/ !!asyncKeyword);

            if (requireArrow && currentToken().kind !== SyntaxKind.EqualsGreaterThanToken) {
                return undefined;
            }

            return new ParenthesizedArrowFunctionExpressionSyntax(contextFlags,
                asyncKeyword,
                callSignature,
                eatToken(SyntaxKind.EqualsGreaterThanToken),
                parseArrowFunctionBody(!!asyncKeyword));
        }

        function parseArrowFunctionBody(asyncContext: boolean): BlockSyntax | IExpressionSyntax {
            // ConciseBody[In] :
            //      [lookahead not in {] AssignmentExpression[?In]
            //      { FunctionBody }

            if (currentToken().kind === SyntaxKind.OpenBraceToken) {
                // arrow functions are never generators, so their bodies are never in the yield context.
                return parseFunctionBlock(/*yieldContext:*/ false, /*asyncContext:*/ asyncContext, /*equalsGreaterThanToken:*/ undefined);
            }

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
                !isExpression(currentToken())) {
                // We've seen a statement (and it isn't an expressionStatement like 'foo()'), so 
                // treat this like a block with a missing open brace.

                return new BlockSyntax(contextFlags, 
                    /*equalsGreaterThanToken*/ undefined,
                    eatToken(SyntaxKind.OpenBraceToken),
                    parseFunctionBlockStatements(/*yieldContext:*/ false, asyncContext),
                    eatToken(SyntaxKind.CloseBraceToken));
            }

            return asyncContext ? doInsideAsyncContext(parseAssignmentExpressionOrHigher) : doOutsideAsyncContext(parseAssignmentExpressionOrHigher);
        }

        function isSimpleArrowFunctionExpression(_currentToken: ISyntaxToken): boolean {
            // ERROR RECOVERY TWEAK:
            // If we see a standalone => try to parse it as an arrow function as that's likely what
            // the user intended to write.
            if (_currentToken.kind === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            // 'async a' is always the start of an async arrow function.   
            if (_currentToken.kind === SyntaxKind.AsyncKeyword) {
                var token1 = peekToken(1);
                if (!token1.hasLeadingNewLine() && isIdentifier(peekToken(1))) {
                    return true;
                }
            }

            return isIdentifier(_currentToken) &&
                   peekToken(1).kind === SyntaxKind.EqualsGreaterThanToken;
        }

        function parseSimpleArrowFunctionExpression(): SimpleArrowFunctionExpressionSyntax {
            var asyncKeyword: ISyntaxToken;
            return new SimpleArrowFunctionExpressionSyntax(contextFlags,
                asyncKeyword = tryEatToken(SyntaxKind.AsyncKeyword),
                asyncKeyword ? doInsideAsyncContext(eatSimpleParameter) : doOutsideAsyncContext(eatSimpleParameter), 
                eatToken(SyntaxKind.EqualsGreaterThanToken),
                parseArrowFunctionBody(/*asyncContext:*/ !!asyncKeyword));
        }

        function isFunctionBlock(): boolean {
            var currentTokenKind = currentToken().kind;
            return currentTokenKind === SyntaxKind.OpenBraceToken || currentTokenKind === SyntaxKind.EqualsGreaterThanToken;
        }

        function isBlockOrArrow(): boolean {
            var _currentToken = currentToken();
            return _currentToken.kind === SyntaxKind.OpenBraceToken || _currentToken.kind === SyntaxKind.EqualsGreaterThanToken;
        }

        function isDefinitelyArrowFunctionExpression(): boolean {
            var peekIndex = 0;
            if (currentToken().kind === SyntaxKind.AsyncKeyword) {
                if (peekToken(1).hasLeadingNewLine()) {
                    return false;
                }

                // skip past any 'async' keyword we see.
                peekIndex++;
            }

            var token0 = peekToken(peekIndex);
            if (token0.kind !== SyntaxKind.OpenParenToken) {
                // If it didn't start with an (, then it could be generic.  That's too complicated 
                // and we can't say it's 'definitely' an arrow function.             
                return false;
            }

            var token1 = peekToken(peekIndex + 1);
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
                token2 = peekToken(peekIndex + 2);
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

            token2 = peekToken(peekIndex + 2); 
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

            var token3 = peekToken(peekIndex + 3);
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
            var peekIndex = 0;
            if (currentToken().kind === SyntaxKind.AsyncKeyword) {
                if (peekToken(1).hasLeadingNewLine()) {
                    return false;
                }

                peekIndex++;
            }

            var token0 = peekToken(peekIndex);
            if (token0.kind !== SyntaxKind.OpenParenToken) {
                // If it didn't start with an (, then it could be generic.  That's too complicated 
                // and we have to say it's possibly an arrow function.
                return true;
            }

            var token1 = peekToken(peekIndex + 1);

            if (!isIdentifier(token1)) {
                // All other arrow functions must start with (id
                // so this is definitely not an arrow function.
                return false;
            }

            var token2 = peekToken(peekIndex + 2);
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

                var token3 = peekToken(peekIndex + 3);
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
            return new ObjectLiteralExpressionSyntax(contextFlags,
                consumeToken(openBraceToken), 
                parseSeparatedSyntaxList<IPropertyAssignmentSyntax>(ListParsingState.ObjectLiteralExpression_PropertyAssignments),
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function tryParsePropertyAssignment(inErrorRecovery: boolean): IPropertyAssignmentSyntax {
            // Debug.assert(isPropertyAssignment(/*inErrorRecovery:*/ false));

            var modifiers = parseModifiers();
            if (isAccessor(inErrorRecovery)) {
                return parseAccessor(modifiers);
            }

            // Note: we don't want to call parsePropertyName here yet as it will convert a keyword
            // to an identifier name.  We don't want to do that yet as a keyword is not legal as a
            // shorthand property assignment.

            var _currentToken = currentToken();
            if (modifiers.length === 0) {
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
                        return eatIdentifierToken();
                    }
                }
            }

            // All the rest of the property assignments start with property names, an asterix.  
            // They are:
            //      id: e
            //      [e1]: e2
            //      id() { }
            //      [e]() { } 
            //      *id() { }
            //      *[e]() { } 
            //      async id() { }
            //      async [e]() { } 
            if (modifiers.length > 0 || _currentToken.kind === SyntaxKind.AsteriskToken || isPropertyName(/*peekIndex:*/ 0, inErrorRecovery)) {
                var asterixToken = tryEatToken(SyntaxKind.AsteriskToken);
                var propertyName = parsePropertyName();

                if (modifiers.length > 0 || asterixToken !== undefined || isCallSignature(/*peekIndex:*/ 0)) {
                    return parseMemberFunctionDeclaration(modifiers, asterixToken, propertyName);
                }
                else {
                    // PropertyName[?Yield] : AssignmentExpression[In, ?Yield]

                    // If we didn't have an identifier, then we must have gotten a keyword or a
                    // literal.  Neither of these are allowed in a shorthand property, so this must
                    // be a simple property assignment.
                    //
                    // Also, if we have an identifier and it is followed by a colon then this is 
                    // definitely a simple property assignment.
                    return new PropertyAssignmentSyntax(contextFlags,
                        propertyName,
                        eatToken(SyntaxKind.ColonToken),
                        allowInAnd(parseAssignmentExpressionOrHigher));
                }
            }

            return undefined;
        }

        function isPropertyAssignment(inErrorRecovery: boolean): boolean {
            var _modifierCount = modifierCount();
            return _modifierCount > 0 ||
                   isAccessor(inErrorRecovery) ||
                   currentToken().kind === SyntaxKind.AsteriskToken ||
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
            // PropertyName[Yield,GeneratorParameter] : See 12.2.5
            //      LiteralPropertyName
            //      [+GeneratorParameter]ComputedPropertyName
            //      [~GeneratorParameter]ComputedPropertyName[?Yield]

            var _currentToken = currentToken();
            if (_currentToken.kind === SyntaxKind.OpenBracketToken) {
                return inGeneratorParameterContext()
                    ? doOutsideYieldContext(parseComputedPropertyName)
                    : parseComputedPropertyName();
            }
            else if (SyntaxFacts.isIdentifierNameOrAnyKeyword(_currentToken)) {
                // If it was a keyword, convert it to an identifier name.
                return eatIdentifierNameToken();
            }
            else if (isLiteralPropertyName(_currentToken)) {
                // Must have been a literal.
                return consumeToken(_currentToken);
            }
            else {
                return eatIdentifierToken();
            }
        }

        function parseComputedPropertyName(): ComputedPropertyNameSyntax {
            // ComputedPropertyName[Yield] :
            //      [AssignmentExpression[In, ?Yield]]

            // Note: we allow any expression inside the computed property name.  We'll report any 
            // issues later in the grammar checker if an invalid expression is provided.
            return new ComputedPropertyNameSyntax(contextFlags,
                eatToken(SyntaxKind.OpenBracketToken),
                allowInAnd(parseExpression),
                eatToken(SyntaxKind.CloseBracketToken));
        }

        function parseArrayLiteralExpression(openBracketToken: ISyntaxToken): ArrayLiteralExpressionSyntax {
            // Debug.assert(currentToken().kind === SyntaxKind.OpenBracketToken);
            return new ArrayLiteralExpressionSyntax(contextFlags,
                consumeToken(openBracketToken), 
                parseSeparatedSyntaxList<IExpressionSyntax>(ListParsingState.ArrayLiteralExpression_AssignmentExpressions),
                eatToken(SyntaxKind.CloseBracketToken));
        }

        function parseStatementBlock(): BlockSyntax {
            // Different from function blocks in that we don't check for strict mode, nor do accept
            // a block without an open curly.
            var openBraceToken: ISyntaxToken;
            return new BlockSyntax(contextFlags,
                tryEatToken(SyntaxKind.EqualsGreaterThanToken),
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken),
                openBraceToken.fullWidth() > 0 ? parseSyntaxList<IStatementSyntax>(ListParsingState.Block_Statements) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseFunctionBlockOrExpressionBody(yieldContext: boolean, asyncContext: boolean): BlockSyntax | ExpressionBody {
            // If we got an errant => then we want to parse what's coming up without requiring an
            // open brace.  We do this because it's not uncommon for people to get confused as to
            // where/when they can use an => and we want to have good error recovery here.
            var equalsGreaterThanToken = tryEatToken(SyntaxKind.EqualsGreaterThanToken);
            if (equalsGreaterThanToken) {
                // check if they wrote something like:  => expr
                // or if it was more like            :  => statement
                if (isExpression(currentToken())) {
                    return new ExpressionBody(contextFlags, equalsGreaterThanToken, parseExpression());
                }
            }

            return parseFunctionBlock(yieldContext, asyncContext, equalsGreaterThanToken);
        }

        function parseFunctionBlock(yieldContext: boolean, asyncContext: boolean, equalsGreaterThanToken: ISyntaxToken): BlockSyntax {
            var openBraceToken: ISyntaxToken;
            return new BlockSyntax(contextFlags,
                equalsGreaterThanToken,
                openBraceToken = eatToken(SyntaxKind.OpenBraceToken),
                equalsGreaterThanToken || openBraceToken.fullWidth() > 0 ? parseFunctionBlockStatements(yieldContext, asyncContext) : [],
                eatToken(SyntaxKind.CloseBraceToken));
        }

        function parseFunctionBlockStatements(yieldContext: boolean, asyncContext: boolean) {
            var savedStrictModeContext = inStrictModeContext();
            var savedYieldContext = inYieldContext();
            var savedAsyncContext = inAsyncContext();

            setYieldContext(yieldContext);
            setAsyncContext(asyncContext);

            var statements = parseSyntaxList<IStatementSyntax>(ListParsingState.Block_Statements, updateStrictModeState);

            setStrictModeContext(savedStrictModeContext);
            setYieldContext(savedYieldContext);
            setAsyncContext(savedAsyncContext);

            return statements;
        }

        function parseCallSignature(requireCompleteTypeParameterList: boolean, yieldAndGeneratorParameterContext: boolean, asyncContext: boolean): CallSignatureSyntax {
            return new CallSignatureSyntax(contextFlags,
                tryParseTypeParameterList(requireCompleteTypeParameterList),
                parseParameterList(yieldAndGeneratorParameterContext, asyncContext),
                parseOptionalTypeAnnotation(/*allowStringLiteral:*/ false));
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
                return new TypeParameterListSyntax(contextFlags, lessThanToken, typeParameters, greaterThanToken);
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

            return new TypeParameterSyntax(contextFlags, eatIdentifierToken(), tryParseConstraint());
        }

        function tryParseConstraint(): ConstraintSyntax {
            if (currentToken().kind !== SyntaxKind.ExtendsKeyword) {
                return undefined;
            }

            return new ConstraintSyntax(contextFlags, eatToken(SyntaxKind.ExtendsKeyword), parseTypeOrExpression());
        }

        // Note: after careful analysis of the grammar, it does not appear to be possible to 
        // have 'Yield' And 'GeneratorParameter' not in sync.  i.e. any production calling
        // this FormalParameters production either always sets both to true, or always sets
        // both to false.  As such we only have a single parameter to represent both.
        function parseParameterList(yieldAndGeneratorParameterContext: boolean, asyncContext: boolean): ParameterListSyntax {
            // FormalParameters[Yield,GeneratorParameter] :
            //      ...
            //
            // FormalParameter[Yield,GeneratorParameter] :
            //      BindingElement[?Yield, ?GeneratorParameter]
            //
            // BindingElement[Yield, GeneratorParameter ] : See 13.2.3
            //      SingleNameBinding[?Yield, ?GeneratorParameter]
            //      [+GeneratorParameter]BindingPattern[?Yield, GeneratorParameter]Initializer[In]opt
            //      [~GeneratorParameter]BindingPattern[?Yield]Initializer[In, ?Yield]opt
            //
            // SingleNameBinding[Yield, GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt


            var savedYieldContext = inYieldContext();
            var savedGeneratorParameterContext = inGeneratorParameterContext();
            var savedAsyncContext = inAsyncContext();

            setYieldContext(yieldAndGeneratorParameterContext);
            setGeneratorParameterContext(yieldAndGeneratorParameterContext);
            setAsyncContext(asyncContext);

            var openParenToken: ISyntaxToken;
            var result = new ParameterListSyntax(contextFlags,
                openParenToken = eatToken(SyntaxKind.OpenParenToken),
                openParenToken.fullWidth() > 0 ? parseSeparatedSyntaxList<ParameterSyntax>(ListParsingState.ParameterList_Parameters) : [],
                eatToken(SyntaxKind.CloseParenToken));

            setYieldContext(savedYieldContext);
            setGeneratorParameterContext(savedGeneratorParameterContext);
            setAsyncContext(savedAsyncContext);

            return result;
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
            return new TypeAnnotationSyntax(contextFlags, consumeToken(currentToken()), parseTypeAnnotationType(allowStringLiteral));
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
            // The rules about 'yield' only apply to actual code/expression contexts.  They don't
            // apply to 'type' contexts.  So we disable these parameters here before moving on.
            var savedYieldContext = inYieldContext();
            var savedGeneratorParameterContext = inGeneratorParameterContext();

            setYieldContext(false);
            setGeneratorParameterContext(false);

            var result = tryParseTypeWorker();

            setYieldContext(savedYieldContext);
            setGeneratorParameterContext(savedGeneratorParameterContext);

            return result;
        }

        function tryParseTypeWorker(): ITypeSyntax {
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
                    type = new UnionTypeSyntax(contextFlags, type, consumeToken(barToken), parsePrimaryType());
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

                if (_currentToken.hasLeadingNewLine() ||
                    _currentToken.kind !== SyntaxKind.OpenBracketToken) {
                    break;
                }

                type = new ArrayTypeSyntax(contextFlags, type, consumeToken(_currentToken), eatToken(SyntaxKind.CloseBracketToken));
            }

            return type;
        }

        function parseTypeQuery(typeOfKeyword: ISyntaxToken): TypeQuerySyntax {
            return new TypeQuerySyntax(contextFlags, consumeToken(typeOfKeyword), parseName(/*allowIdentifierNames:*/ true));
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
            return new ParenthesizedTypeSyntax(contextFlags, consumeToken(openParenToken), parseType(), eatToken(SyntaxKind.CloseParenToken));
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
            if (currentToken().hasLeadingNewLine()) {
                return name;
            }

            var typeArgumentList = tryParseTypeArgumentList(/*inExpression:*/ false);
            return !typeArgumentList
                ? name
                : new GenericTypeSyntax(contextFlags, name, typeArgumentList);
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
            // Function types only exist in the type space and not the expression space.  So they
            // aren't in the [Yield] or [GeneratorParameter] context.
            return new FunctionTypeSyntax(contextFlags,
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false), 
                parseParameterList(/*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false),
                eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
        }

        function parseConstructorType(): ConstructorTypeSyntax {
            // Constructor types only exist in the type space and not the expression space.  So they
            // aren't in the [Yield] or [GeneratorParameter] context.
            return new ConstructorTypeSyntax(contextFlags,
                eatToken(SyntaxKind.NewKeyword),
                tryParseTypeParameterList(/*requireCompleteTypeParameterList:*/ false),
                parseParameterList(/*yieldAndGeneratorParameterContext:*/ false, /*asyncContext:*/ false),
                eatToken(SyntaxKind.EqualsGreaterThanToken), parseType());
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
            return new ParameterSyntax(contextFlags,
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

            // SingleNameBinding[Yield,GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt

            var identifier = inGeneratorParameterContext()
                ? doInsideYieldContext(eatIdentifierToken)
                : eatIdentifierToken();

            var questionToken = tryEatToken(SyntaxKind.QuestionToken);
            var typeAnnotation = parseOptionalTypeAnnotation(/*allowStringLiteral:*/ true);

            var equalsValueClause: EqualsValueClauseSyntax = undefined;
            if (isEqualsValueClause(/*inParameter*/ true)) {
                equalsValueClause = inGeneratorParameterContext()
                    ? doOutsideYieldContext(parseEqualsValueClause)
                    : parseEqualsValueClause();
            }

            return new ParameterSyntax(contextFlags, dotDotDotToken, modifiers, identifier, questionToken, typeAnnotation, equalsValueClause);
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
        function abortParsingListOrMoveToNextToken<T extends ISyntaxNodeOrToken>(currentListType: ListParsingState): boolean {
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

        function tryParseExpectedListItem<T extends ISyntaxNodeOrToken>(
                currentListType: ListParsingState,
                inErrorRecovery: boolean,
                items: T[],
                processItems: (items: ISyntaxNodeOrToken[]) => void): void {
            var item = <T>tryParseExpectedListItemWorker(currentListType, inErrorRecovery);

            if (item !== undefined) {
                // Debug.assert(item !== undefined);

                items.push(item);

                if (processItems) {
                    processItems(items);
                }
            }
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
                var oldItemsLength = items.length;
                tryParseExpectedListItem(currentListType, /*inErrorRecovery:*/ false, items, processItems);

                if (items.length === oldItemsLength) {
                    // We weren't able to parse out a list element.

                    // That may have been because the list is complete.  In that case, break out 
                    // and return the items we were able parse.
                    if (listIsTerminated(currentListType)) {
                        break;
                    }

                    // List wasn't complete and we didn't get an item.  Figure out if we should bail out
                    // or skip a token and continue.
                    var abort = abortParsingListOrMoveToNextToken(currentListType);
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
                var oldArrayLength = nodesAndSeparators.length;
                tryParseExpectedListItem(currentListType, inErrorRecovery, nodesAndSeparators, /*processItems:*/ undefined);

                if (nodesAndSeparators.length === oldArrayLength) {
                    // We weren't able to parse out a list element.
                    // Debug.assert(items === undefined || items.length % 2 === 0);
                    
                    // That may have been because the list is complete.  In that case, break out 
                    // and return the items we were able parse.
                    if (listIsTerminated(currentListType)) {
                        break;
                    }

                    // List wasn't complete and we didn't get an item.  Figure out if we should bail out
                    // or skip a token and continue.
                    var abort = abortParsingListOrMoveToNextToken(currentListType);
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
                    var semicolonToken = eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false) || createEmptyToken(SyntaxKind.SemicolonToken);
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
                case ListParsingState.VariableDeclaration_VariableDeclarators:              return isExpectedVariableDeclaration_VariableDeclaratorsTerminator();
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

        function isExpectedVariableDeclaration_VariableDeclaratorsTerminator(): boolean {
            if (inDisallowInContext()) {
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
            else {
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
                case ListParsingState.TryBlock_Statements:                          return false;
                case ListParsingState.CatchBlock_Statements:                        return false;
                case ListParsingState.EnumDeclaration_EnumElements:                 return isEnumElement(inErrorRecovery);
                case ListParsingState.ObjectType_TypeMembers:                       return isTypeMember(inErrorRecovery);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:  return isHeritageClause();
                case ListParsingState.HeritageClause_TypeNameList:                  return isHeritageClauseTypeName();
                case ListParsingState.VariableDeclaration_VariableDeclarators:      return isVariableDeclarator();
                case ListParsingState.ArgumentList_AssignmentExpressions:           return isExpectedArgumentList_AssignmentExpression();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:  return isPropertyAssignment(inErrorRecovery);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions: return isAssignmentOrOmittedExpression();
                case ListParsingState.ParameterList_Parameters:                     return isParameter();
                case ListParsingState.IndexSignature_Parameters:                    return isParameter();
                case ListParsingState.TypeArgumentList_Types:                       return isType();
                case ListParsingState.TypeParameterList_TypeParameters:             return isTypeParameter();
                case ListParsingState.TupleType_Types:                              return isType();
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
                case ListParsingState.SourceUnit_ModuleElements:                    return tryParseModuleElement(inErrorRecovery);
                case ListParsingState.ClassDeclaration_ClassElements:               return tryParseClassElement(inErrorRecovery);
                case ListParsingState.ModuleDeclaration_ModuleElements:             return tryParseModuleElement(inErrorRecovery);
                case ListParsingState.SwitchStatement_SwitchClauses:                return tryParseSwitchClause();
                case ListParsingState.SwitchClause_Statements:                      return tryParseStatement(inErrorRecovery);
                case ListParsingState.Block_Statements:                             return tryParseStatement(inErrorRecovery);
                case ListParsingState.TryBlock_Statements:                          return tryParseStatement(inErrorRecovery);
                case ListParsingState.CatchBlock_Statements:                        return tryParseStatement(inErrorRecovery);
                case ListParsingState.EnumDeclaration_EnumElements:                 return tryParseEnumElement(inErrorRecovery);
                case ListParsingState.ObjectType_TypeMembers:                       return tryParseTypeMember(inErrorRecovery);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:  return tryParseHeritageClause();
                case ListParsingState.HeritageClause_TypeNameList:                  return tryParseHeritageClauseTypeName();
                case ListParsingState.VariableDeclaration_VariableDeclarators:      return tryParseVariableDeclarator();
                case ListParsingState.ArgumentList_AssignmentExpressions:           return tryParseArgumentListExpression();
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:  return tryParsePropertyAssignment(inErrorRecovery);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions: return tryParseAssignmentOrOmittedExpression();
                case ListParsingState.ParameterList_Parameters:                     return tryParseParameter();
                case ListParsingState.IndexSignature_Parameters:                    return tryParseParameter();
                case ListParsingState.TypeArgumentList_Types:                       return tryParseType();
                case ListParsingState.TypeParameterList_TypeParameters:             return tryParseTypeParameter();
                case ListParsingState.TupleType_Types:                              return tryParseType();
                default: throw Errors.invalidOperation();
            }
        }

        function getExpectedListElementType(currentListType: ListParsingState): string {
            switch (currentListType) {
                case ListParsingState.SourceUnit_ModuleElements:                    return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, undefined);
                case ListParsingState.ClassOrInterfaceDeclaration_HeritageClauses:  return '{';
                case ListParsingState.ClassDeclaration_ClassElements:               return getLocalizedText(DiagnosticCode.constructor_function_accessor_or_variable, undefined);
                case ListParsingState.ModuleDeclaration_ModuleElements:             return getLocalizedText(DiagnosticCode.module_class_interface_enum_import_or_statement, undefined);
                case ListParsingState.SwitchStatement_SwitchClauses:                return getLocalizedText(DiagnosticCode.case_or_default_clause, undefined);
                case ListParsingState.SwitchClause_Statements:                      return getLocalizedText(DiagnosticCode.statement, undefined);
                case ListParsingState.Block_Statements:                             return getLocalizedText(DiagnosticCode.statement, undefined);
                case ListParsingState.VariableDeclaration_VariableDeclarators:      return getLocalizedText(DiagnosticCode.identifier, undefined);
                case ListParsingState.EnumDeclaration_EnumElements:                 return getLocalizedText(DiagnosticCode.identifier, undefined);
                case ListParsingState.ObjectType_TypeMembers:                       return getLocalizedText(DiagnosticCode.call_construct_index_property_or_function_signature, undefined);
                case ListParsingState.ArgumentList_AssignmentExpressions:           return getLocalizedText(DiagnosticCode.expression, undefined);
                case ListParsingState.HeritageClause_TypeNameList:                  return getLocalizedText(DiagnosticCode.type_name, undefined);
                case ListParsingState.ObjectLiteralExpression_PropertyAssignments:  return getLocalizedText(DiagnosticCode.property_or_accessor, undefined);
                case ListParsingState.ParameterList_Parameters:                     return getLocalizedText(DiagnosticCode.parameter, undefined);
                case ListParsingState.IndexSignature_Parameters:                    return getLocalizedText(DiagnosticCode.parameter, undefined);
                case ListParsingState.TypeArgumentList_Types:                       return getLocalizedText(DiagnosticCode.type, undefined);
                case ListParsingState.TypeParameterList_TypeParameters:             return getLocalizedText(DiagnosticCode.type_parameter, undefined);
                case ListParsingState.TupleType_Types:                              return getLocalizedText(DiagnosticCode.type, undefined);
                case ListParsingState.ArrayLiteralExpression_AssignmentExpressions: return getLocalizedText(DiagnosticCode.expression, undefined);
                default:                                                            throw Errors.invalidOperation();
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
        SourceUnit_ModuleElements,
        ClassDeclaration_ClassElements,
        ModuleDeclaration_ModuleElements,
        SwitchStatement_SwitchClauses,
        SwitchClause_Statements,
        Block_Statements,
        TryBlock_Statements,
        CatchBlock_Statements,
        EnumDeclaration_EnumElements,
        ObjectType_TypeMembers,
        ClassOrInterfaceDeclaration_HeritageClauses,
        HeritageClause_TypeNameList,
        VariableDeclaration_VariableDeclarators,
        ArgumentList_AssignmentExpressions,
        ObjectLiteralExpression_PropertyAssignments,
        ArrayLiteralExpression_AssignmentExpressions,
        ParameterList_Parameters,
        IndexSignature_Parameters,
        TypeArgumentList_Types,
        TypeParameterList_TypeParameters,
        TupleType_Types,

        FirstListParsingState = SourceUnit_ModuleElements,
        LastListParsingState = TupleType_Types,
    }

    // We use this enum to set bits.  So make sure we have enough bits available.
    Debug.assert(ListParsingState.LastListParsingState <= 30);

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