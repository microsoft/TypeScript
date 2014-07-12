///<reference path='References.ts' />

interface IParserRewindPoint extends IRewindPoint {
    previousToken: ISyntaxToken;
    currentTokenFullStart: number;
    isInStrictMode: boolean;
    diagnosticsCount: number;
    skippedTokensCount: number;
}

// The precedence of expressions in typescript.  While we're parsing an expression, we will 
// continue to consume and form new trees, if the precedence is greater than our current
// precedence.  For example, if we have: a + b * c, we will first parse 'a' with precedence 0. We
// will then see the + with precedence 13.  13 is greater than 0 so we will decide to create a 
// binary expression with the result of parsing the sub expression "b * c".  We'll then parse the 
// term 'b' (passing in precedence 13).  We will then see the * with precedence 14.  14 is greater
// than 13, so we will create a binary expression from "b" and "c", return that, and join it with 
// "a" producing:
//
//      +
//     / \
//    a   *
//       / \
//      b   c
//
// If we instead had: "a * b + c", we would first parser 'a' with precedence 0.  We would then see 
// the * with precedence 14.  14 is greater than 0 so we will decide to create a binary expression
// with the result of parsing the sub expression "b + c".  We'll then parse the term 'b' (passing in
// precedence 14).  We will then see the + with precedence 13.  13 is less than 14, so we won't 
// continue parsing subexpressions and will just return the expression 'b'.  The caller will join 
// that into "a * b" (and will be back at precedence 0). It will then see the + with precedence 11.
// 11 is greater than 0 so it will parse the sub expression and make a binary expression out of it
// producing:
//
//        +
//       / \
//      *   c
//     / \
//    a   b

enum ParserExpressionPrecedence {
    // Intuitively, commas have the lowest precedence.  "a || b, c" is "(a || b), c", not
    // "a || (b, c)"
    CommaExpressionPrecedence = 1,

    AssignmentExpressionPrecedence = 2,

    ConditionalExpressionPrecedence = 3,

    // REVIEW: Should ArrowFunctions have higher, lower, or the same precedence as ternary?
    ArrowFunctionPrecedence = 4,

    LogicalOrExpressionPrecedence = 5,
    LogicalAndExpressionPrecedence = 6,
    BitwiseOrExpressionPrecedence = 7,
    BitwiseExclusiveOrExpressionPrecedence = 8,
    BitwiseAndExpressionPrecedence = 9,
    EqualityExpressionPrecedence = 10,
    RelationalExpressionPrecedence = 11,
    ShiftExpressionPrecdence = 12,
    AdditiveExpressionPrecedence = 13,
    MultiplicativeExpressionPrecedence = 14,

    // Intuitively, unary expressions have the highest precedence.  After all, if you have:
    //   !foo || bar
    //
    // Then you have "(!foo) || bar", not "!(foo || bar)"
    UnaryExpressionPrecedence= 15,
}

// The current state of the parser wrt to list parsing.  The way to read these is as:
// CurrentProduction_SubList.  i.e. "Block_Statements" means "we're parsing a Block, and we're 
// currently parsing list of statements within it".  This is used by the list parsing mechanism
// to both the elements of the lists, and recover from errors we encounter when we run into 
// unexpected code.
// 
// For example, when we are in ArgumentList_Arguments, we will continue trying to consume code as 
// long as "isArgument" is true.  If we run into a token for which "isArgument" is not true we will
// do the following:
//
// If the token is a StopToken for ArgumentList_Arguments then we will stop parsing the list of 
// arguments with no error.
//
// Otherwise, we *do* report an error for this unexpected token.
//
// We then will attempt error recovery.  Error recovery will walk up the list of states we're in 
// seeing if the token is a stop token for that construct *or* could start another element within
// what construct.  For example, if the unexpected token was '}' then that would be a stop token
// for Block_Statements.  Alternatively, if the unexpected token was 'return', then that would be
// a start token for the next statment in Block_Statements.
// 
// If either of those cases are true, We will then return *without* consuming  that token. 
// (Remember, we've already reported an error).  Now we're just letting the higher up parse 
// constructs eventually try to consume that token.
//
// If none of the higher up states consider this a stop or start token, then we will simply consume
// the token and add it to our list of 'skipped tokens'.  We will then repeat the above algorithm
// until we resynchronize at some point.
enum ParserListParsingState {
    SourceUnit_ModuleElements = 1 << 0,
    ClassDeclaration_ClassElements = 1 << 1,
    ModuleDeclaration_ModuleElements = 1 << 2,
    SwitchStatement_SwitchClauses = 1 << 3,
    SwitchClause_Statements = 1 << 4,
    Block_Statements= 1 << 5,
    EnumDeclaration_VariableDeclarators = 1 << 7,
    ObjectType_TypeMembers = 1 << 8,
    ExtendsOrImplementsClause_TypeNameList = 1 << 9,
    VariableDeclaration_VariableDeclarators_AllowIn = 1 << 10,
    VariableDeclaration_VariableDeclarators_DisallowIn = 1 << 11,
    ArgumentList_AssignmentExpressions = 1 << 12,
    ObjectLiteralExpression_PropertyAssignments = 1 << 13,
    ArrayLiteralExpression_AssignmentExpressions = 1 << 14,
    ParameterList_Parameters = 1 << 15,

    FirstListParsingState = SourceUnit_ModuleElements,
    LastListParsingState = ParameterList_Parameters,
}

// Information we collect in the parser when we skip a token.
interface ParserSkippedToken {
    // The token we skipped.
    skippedToken: ISyntaxToken;

    // The token that we will attach the skipped token to.  Can be null in the case where we 
    // haven't seen a single token yet.  In that case, the skipped token will be added to the
    // first token in the tree.
    owningToken: ISyntaxToken;
}

class ParserSkippedTokensAdder extends SyntaxRewriter {
    private skippedTokens: ParserSkippedToken[];

    constructor(skippedTokens: ParserSkippedToken[]) {
        super();

        this.skippedTokens = skippedTokens;
    }

    private visitNode(node: SyntaxNode): SyntaxNode {
        if (this.skippedTokens.length === 0) {
            return node;
        }

        return super.visitNode(node);
    }

    private visitList(list: ISyntaxList): ISyntaxList {
        if (this.skippedTokens.length === 0) {
            return list;
        }

        return super.visitList(list);
    }

    private visitSeparatedList(list: ISeparatedSyntaxList): ISeparatedSyntaxList {
        if (this.skippedTokens.length === 0) {
            return list;
        }

        return super.visitSeparatedList(list);
    }

    private visitToken(token: ISyntaxToken): ISyntaxToken {
        if (this.skippedTokens.length === 0) {
            return token;
        }

        var currentOwner = null;

        // First check for skipped tokens at the beginning the document.  These will get attached
        // to the first token we run into.
        var leadingTrivia: ISyntaxTrivia[] = null;
        while (this.skippedTokens.length > 0 &&
               this.skippedTokens[0].owningToken === currentOwner) {
            leadingTrivia = leadingTrivia || [];

            var skippedToken = this.skippedTokens.shift().skippedToken;
            this.addSkippedTokenTo(skippedToken, leadingTrivia);

            currentOwner = skippedToken;
        }

        if (leadingTrivia !== null) {
            // Note: add the existing trivia *after* the skipped tokens.
            this.addTriviaTo(token.leadingTrivia(), leadingTrivia);
        }

        // Now find the skipped tokens that were assigned to this token.  Consume skipped tokens
        // as long as they belong to this token (or to a skipped token that follows it).
        currentOwner = token;

        var trailingTrivia: ISyntaxTrivia[] = null;
        while (this.skippedTokens.length > 0 &&
               this.skippedTokens[0].owningToken === currentOwner) {
            // Initialize the list of trailing trivia to the trailing trivia of the token if it
            // has any.  This way any skipped tokens will go after the existing trivia.
            trailingTrivia = trailingTrivia || token.trailingTrivia().toArray();
            
            var skippedToken = this.skippedTokens.shift().skippedToken;
            this.addSkippedTokenTo(skippedToken, trailingTrivia);
            
            // Update currentToken.  That way if the next skipped token has it as the owner,
            // then we'll consume that as well.
            currentOwner = skippedToken;
        }

        var result = token;

        if (leadingTrivia !== null) {
            result = result.withLeadingTrivia(SyntaxTriviaList.create(leadingTrivia));
        }

        if (trailingTrivia !== null) {
            result = result.withTrailingTrivia(SyntaxTriviaList.create(trailingTrivia));
        }

        return result;
    }

    private addTriviaTo(list: ISyntaxTriviaList, array: ISyntaxTrivia[]): void {
        for (var i = 0, n = list.count(); i < n; i++) {
            array.push(list.syntaxTriviaAt(i));
        }
    }

    private addSkippedTokenTo(skippedToken: ISyntaxToken, array: ISyntaxTrivia[]): void {
        Debug.assert(skippedToken.text().length > 0);

        // first, add the leading trivia of the skipped token to the array
        this.addTriviaTo(skippedToken.leadingTrivia(), array);

        // now, add the text of the token as skipped text to the trivia array.
        array.push(SyntaxTrivia.create(SyntaxKind.SkippedTextTrivia, skippedToken.text()));

        // Finally, add the trailing trivia of the skipped token to the trivia array.
        this.addTriviaTo(skippedToken.trailingTrivia(), array);
    }
}

class Parser extends SlidingWindow {
    // The scanner we're pulling tokens from.
    private scanner: Scanner;

    // The previous version of the syntax tree that was parsed.  Used for incremental parsing if it
    // is provided.
    private oldTree: SyntaxTree;

    // Parsing options.
    private options: ParseOptions = null;

    // Current state of the parser.  If we need to rewind we will store and reset these values as
    // appropriate.

    // The current token the parser is examining.  If it is null it needs to be fetched from the 
    // scanner.  Cached because it's accessed so often that even getting it from the sliding window
    // can be expensive.
    private _currentToken: ISyntaxToken = null;

    // The previous token to the current token.  Set when we advance to the next token.
    private previousToken: ISyntaxToken = null;

    // The full start position of the current token the parser is pointing at.
    private currentTokenFullStart: number = 0;

    // The diagnostics we get while scanning.  Note: this never gets rewound when we do a normal
    // rewind.  That's because rewinding doesn't affect the tokens created.  It only affects where
    // in the token stream we're pointing at.  However, it will get modified if we we decide to
    // reparse a / or /= as a regular expression.
    private tokenDiagnostics: SyntaxDiagnostic[] = [];

    // TODO: do we need to store/restore this when speculative parsing?  I don't think so.  The
    // parsing logic already handles storing/restoring this and should work properly even if we're
    // speculative parsing.
    private listParsingState: ParserListParsingState = 0;

    // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
    // that some tokens that would be considered identifiers may be considered keywords.  When 
    // rewinding, we need to store and restore this as the mode may have changed.
    private isInStrictMode: boolean = false;

    // Tokens we've decided to skip because they couldn't fit into the current production.  Any
    // tokens that are skipped when speculative parsing need to removed when rewinding.  To do this
    // we store the count of skipped tokens when we start speculative parsing.  And if we rewind,
    // we restore this to the same count that we started at.
    private skippedTokens: ParserSkippedToken[] = [];

    // Diagnostics created when parsing invalid code.  Any diagnosics created when speculative 
    // parsing need to removed when rewinding.  To do this we store the count of diagnostics when 
    // we start speculative parsing.  And if we rewind, we restore this to the same count that we 
    // started at.
    private diagnostics: SyntaxDiagnostic[] = [];

    constructor(text: IText,
                options: ParseOptions,
                languageVersion: LanguageVersion = LanguageVersion.EcmaScript5,
                stringTable: StringTable = null,
                oldTree?: SyntaxTree = null,
                changes?: TextChangeRange[] = null) {
        super(32, null);

        this.scanner = new Scanner(text, languageVersion, stringTable);

        this.oldTree = oldTree;
        this.options = options;
    }

    private isIncremental(): boolean {
        return this.oldTree !== null;
    }

    public storeAdditionalRewindState(rewindPoint: IParserRewindPoint): void {
        rewindPoint.previousToken = this.previousToken;
        rewindPoint.currentTokenFullStart = this.currentTokenFullStart;
        rewindPoint.isInStrictMode = this.isInStrictMode;
        rewindPoint.diagnosticsCount = this.diagnostics.length;
        rewindPoint.skippedTokensCount = this.skippedTokens.length;
    }

    public restoreStateFromRewindPoint(rewindPoint: IParserRewindPoint): void {
        this._currentToken = null;
        this.previousToken = rewindPoint.previousToken;
        this.currentTokenFullStart = rewindPoint.currentTokenFullStart;
        this.isInStrictMode = rewindPoint.isInStrictMode;
        this.diagnostics.length = rewindPoint.diagnosticsCount;
        this.skippedTokens.length = rewindPoint.skippedTokensCount;
    }

    public fetchMoreItems(argument: any, sourceIndex: number, window: any[], destinationIndex: number, spaceAvailable: number): number {
        // Assert disabled because it is actually expensive enugh to affect perf.
        // Debug.assert(spaceAvailable > 0);
        window[destinationIndex] = this.scanner.scan(this.tokenDiagnostics, argument);
        return 1;
    }

    private currentTokenStart(): number {
        return this.currentTokenFullStart + this.currentToken().leadingTriviaWidth();
    }

    private previousTokenStart(): number {
        if (this.previousToken === null) {
            return 0;
        }

        return this.currentTokenFullStart -
               this.previousToken.fullWidth() +
               this.previousToken.leadingTriviaWidth();
    }

    private previousTokenEnd(): number {
        if (this.previousToken === null) {
            return 0;
        }

        return this.previousTokenStart() + this.previousToken.width();
    }
    
    private currentToken(): ISyntaxToken {
        var result = this._currentToken;

        if (result === null) {
            result = this.currentItem(/*allowRegularExpression:*/ false);
            this._currentToken = result;
        }

        return result;
    }

    private currentTokenAllowingRegularExpression(): ISyntaxToken {
        Debug.assert(this._currentToken === null);

        var result = this.currentItem(/*allowRegularExpression:*/ true);
        this._currentToken = result;
        return result;
    }

    private peekTokenN(n: number): ISyntaxToken {
        return this.peekItemN(n);
    }

    //this method is called very frequently
    //we should keep it simple so that it can be inlined.
    private eatAnyToken(): ISyntaxToken {
        var token = this.currentToken();
        this.moveToNextToken();
        return token;
    }

    private moveToNextToken(): void {
        this.currentTokenFullStart += this._currentToken.fullWidth();
        this.previousToken = this._currentToken;
        this._currentToken = null;

        this.moveToNextItem();
    }

    private canEatAutomaticSemicolon(allowWithoutNewLine: boolean): boolean {
        var token = this.currentToken();

        // An automatic semicolon is always allowed if we're at the end of the file.
        if (token.tokenKind === SyntaxKind.EndOfFileToken) {
            return true;
        }

        // Or if the next token is a close brace (regardless of which line it is on).
        if (token.tokenKind === SyntaxKind.CloseBraceToken) {
            return true;
        }

        if (allowWithoutNewLine) {
            return true;
        }

        // It is also allowed if there is a newline between the last token seen and the next one.
        if (this.previousToken !== null && this.previousToken.hasTrailingNewLineTrivia()) {
            return true;
        }

        return false;
    }

    private canEatExplicitOrAutomaticSemicolon(allowWithoutNewline: boolean): boolean {
        var token = this.currentToken();

        if (token.tokenKind === SyntaxKind.SemicolonToken) {
            return true;
        }

        return this.canEatAutomaticSemicolon(allowWithoutNewline);
    }

    private eatExplicitOrAutomaticSemicolon(allowWithoutNewline: boolean): ISyntaxToken {
        var token = this.currentToken();

        // If we see a semicolon, then we can definitely eat it.
        if (token.tokenKind === SyntaxKind.SemicolonToken) {
            return this.eatToken(SyntaxKind.SemicolonToken);
        }

        // Check if an automatic semicolon could go here.  If so, synthesize one.  However, if the
        // user has the option set to error on automatic semicolons, then add an error to that
        // token as well.
        if (this.canEatAutomaticSemicolon(allowWithoutNewline)) {
            // Note: the missing token needs to go between real tokens.  So we place it at the 
            // fullstart of the current token.
            var semicolonToken = SyntaxToken.createEmpty(SyntaxKind.SemicolonToken, SyntaxKind.None);

            if (!this.options.allowAutomaticSemicolonInsertion()) {
                // Report the missing semicolon at the end of the *previous* token.

                this.addDiagnostic(
                    new SyntaxDiagnostic(this.previousTokenEnd(), 0, DiagnosticCode.Automatic_semicolon_insertion_not_allowed, null)); 
            }

            return semicolonToken;
        }

        // No semicolon could be consumed here at all.  Just call the standard eating function
        // so we get the token and the error for it.
        return this.eatToken(SyntaxKind.SemicolonToken);
    }

    //this method is called very frequently
    //we should keep it simple so that it can be inlined.
    private eatToken(kind: SyntaxKind): ISyntaxToken {
        // Assert disabled because it is actually expensive enugh to affect perf.
        // Debug.assert(SyntaxFacts.isTokenKind(kind))

        var token = this.currentToken();
        if (token.tokenKind === kind) {
            this.moveToNextToken();
            return token;
        }

        //slow part of EatToken(SyntaxKind kind)
        return this.createMissingToken(kind, SyntaxKind.None, token);
    }

    // Eats the token if it is there.  Otherwise does nothing.  Will not report errors.
    private tryEatToken(kind: SyntaxKind): ISyntaxToken {
         if (this.currentToken().tokenKind === kind) {
            return this.eatToken(kind);
        }

         return null;
    }

    // Eats the keyword if it is there.  Otherwise does nothing.  Will not report errors.
    private tryEatKeyword(kind: SyntaxKind): ISyntaxToken {
         if (this.currentToken().keywordKind() === kind) {
            return this.eatKeyword(kind);
        }

         return null;
    }

    private eatKeyword(kind: SyntaxKind): ISyntaxToken {
        Debug.assert(SyntaxFacts.isTokenKind(kind))

        var token = this.currentToken();
        if (token.keywordKind() === kind) {
            this.moveToNextToken();
            return token;
        }

        //slow part of EatToken(SyntaxKind kind)
        return this.createMissingToken(SyntaxKind.IdentifierNameToken, kind, token);
    }

    // This method should be called when the grammar calls for on *IdentifierName* and not an
    // *Identifier*.
    private eatIdentifierNameToken(): ISyntaxToken {
        var token = this.currentToken();
        if (token.tokenKind === SyntaxKind.IdentifierNameToken) {
            this.moveToNextToken();
            return token;
        }

        return this.createMissingToken(SyntaxKind.IdentifierNameToken, SyntaxKind.None, token);
    }

    // This method should be called when the grammar calls for on *Identifier* and not an
    // *IdentifierName*.
    private eatIdentifierToken(): ISyntaxToken {
        var token = this.currentToken();
        if (token.tokenKind === SyntaxKind.IdentifierNameToken) {
            if (this.isKeyword(token.keywordKind())) {
                return this.createMissingToken(SyntaxKind.IdentifierNameToken, SyntaxKind.None, token);
            }

            this.moveToNextToken();
            return token;
        }

        return this.createMissingToken(SyntaxKind.IdentifierNameToken, SyntaxKind.None, token);
    }

    private isIdentifier(token: ISyntaxToken): boolean {
        return token.tokenKind === SyntaxKind.IdentifierNameToken && !this.isKeyword(token.keywordKind());
    }

    private isKeyword(kind: SyntaxKind): boolean {
        if (SyntaxFacts.isStandardKeyword(kind) ||
            SyntaxFacts.isFutureReservedKeyword(kind)) {
            return true;
        }

        if (this.isInStrictMode && SyntaxFacts.isFutureReservedStrictKeyword(kind)) {
            return true;
        }

        return false;
    }

    private createMissingToken(expectedKind: SyntaxKind, expectedKeywordKind: SyntaxKind, actual: ISyntaxToken): ISyntaxToken {
        var diagnostic = this.getExpectedTokenDiagnostic(expectedKind, expectedKeywordKind, actual);
        this.addDiagnostic(diagnostic);

        // The missing token will be at the full start of the current token.  That way empty tokens
        // will always be between real tokens and not inside an actual token.
        return SyntaxToken.createEmpty(expectedKind, expectedKeywordKind);
    }

    private getExpectedTokenDiagnostic(expectedKind: SyntaxKind, expectedKeywordKind: SyntaxKind, actual: ISyntaxToken): SyntaxDiagnostic {
        var token = this.currentToken();

        if (expectedKind === SyntaxKind.IdentifierNameToken) {
            if (SyntaxFacts.isAnyKeyword(expectedKeywordKind)) {
                // They wanted a keyword, just report that that keyword was missing.
                return new SyntaxDiagnostic(this.currentTokenStart(), token.width(), DiagnosticCode._0_expected, [SyntaxFacts.getText(expectedKeywordKind)]);
            }
            else {
                // They wanted a real identifier.

                // If the user supplied a keyword, give them a specialized message.
                if (actual !== null && SyntaxFacts.isAnyKeyword(actual.keywordKind())) {
                    return new SyntaxDiagnostic(this.currentTokenStart(), token.width(), DiagnosticCode.Identifier_expected__0_is_a_keyword, [SyntaxFacts.getText(actual.keywordKind())]);
                }
                else {
                    // Otherwise just report that an identifier was expected.
                    return new SyntaxDiagnostic(this.currentTokenStart(), token.width(), DiagnosticCode.Identifier_expected, null);
                }
            }
        }

        if (SyntaxFacts.isAnyPunctuation(expectedKind)) {
            return new SyntaxDiagnostic(this.currentTokenStart(), token.width(), DiagnosticCode._0_expected, [SyntaxFacts.getText(expectedKind)]);
        }

        throw Errors.notYetImplemented();
    }

    private static getPrecedence(expressionKind: SyntaxKind): ParserExpressionPrecedence {
        switch (expressionKind) {
            case SyntaxKind.CommaExpression:
                return ParserExpressionPrecedence.CommaExpressionPrecedence;

            case SyntaxKind.AssignmentExpression:
            case SyntaxKind.AddAssignmentExpression:
            case SyntaxKind.SubtractAssignmentExpression:
            case SyntaxKind.MultiplyAssignmentExpression:
            case SyntaxKind.DivideAssignmentExpression:
            case SyntaxKind.ModuloAssignmentExpression:
            case SyntaxKind.AndAssignmentExpression:
            case SyntaxKind.ExclusiveOrAssignmentExpression:
            case SyntaxKind.OrAssignmentExpression:
            case SyntaxKind.LeftShiftAssignmentExpression:
            case SyntaxKind.SignedRightShiftAssignmentExpression:
            case SyntaxKind.UnsignedRightShiftAssignmentExpression:
                return ParserExpressionPrecedence.AssignmentExpressionPrecedence;

            case SyntaxKind.ConditionalExpression:
                return ParserExpressionPrecedence.ConditionalExpressionPrecedence;

            case SyntaxKind.LogicalOrExpression:
                return ParserExpressionPrecedence.LogicalOrExpressionPrecedence;

            case SyntaxKind.LogicalAndExpression:
                return ParserExpressionPrecedence.LogicalAndExpressionPrecedence;

            case SyntaxKind.BitwiseOrExpression:
                return ParserExpressionPrecedence.BitwiseOrExpressionPrecedence;

            case SyntaxKind.BitwiseExclusiveOrExpression:
                return ParserExpressionPrecedence.BitwiseExclusiveOrExpressionPrecedence;

            case SyntaxKind.BitwiseAndExpression:
                return ParserExpressionPrecedence.BitwiseAndExpressionPrecedence;

            case SyntaxKind.EqualsWithTypeConversionExpression:
            case SyntaxKind.NotEqualsWithTypeConversionExpression:
            case SyntaxKind.EqualsExpression:
            case SyntaxKind.NotEqualsExpression:
                return ParserExpressionPrecedence.EqualityExpressionPrecedence;

            case SyntaxKind.LessThanExpression:
            case SyntaxKind.GreaterThanExpression:
            case SyntaxKind.LessThanOrEqualExpression:
            case SyntaxKind.GreaterThanOrEqualExpression:
            case SyntaxKind.InstanceOfExpression:
            case SyntaxKind.InExpression:
                return ParserExpressionPrecedence.RelationalExpressionPrecedence;

            case SyntaxKind.LeftShiftExpression:
            case SyntaxKind.SignedRightShiftExpression:
            case SyntaxKind.UnsignedRightShiftExpression:
                return ParserExpressionPrecedence.ShiftExpressionPrecdence;

            case SyntaxKind.AddExpression:
            case SyntaxKind.SubtractExpression:
                return ParserExpressionPrecedence.AdditiveExpressionPrecedence;

            case SyntaxKind.MultiplyExpression:
            case SyntaxKind.DivideExpression:
            case SyntaxKind.ModuloExpression:
                return ParserExpressionPrecedence.MultiplicativeExpressionPrecedence;

            case SyntaxKind.PlusExpression:
            case SyntaxKind.NegateExpression:
            case SyntaxKind.BitwiseNotExpression:
            case SyntaxKind.LogicalNotExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.PreIncrementExpression:
            case SyntaxKind.PreDecrementExpression:
                return ParserExpressionPrecedence.UnaryExpressionPrecedence;
        }

        throw Errors.invalidOperation();
    }

    private static isDirectivePrologueElement(node: SyntaxNode): boolean {
        if (node.kind() === SyntaxKind.ExpressionStatement) {
            var expressionStatement = <ExpressionStatementSyntax>node;
            var expression = expressionStatement.expression();

            if (expression.kind() === SyntaxKind.StringLiteralExpression) {
                return true;
            }
        }

        return false
    }

    private static isUseStrictDirective(node: SyntaxNode) {
        var expressionStatement = <ExpressionStatementSyntax>node;
        var expression = expressionStatement.expression();

        var stringLiteralExpression = <LiteralExpressionSyntax>expression;
        var stringLiteral = stringLiteralExpression.literalToken();

        var text = stringLiteral.text();
        return text === '"use strict"' || text === "'use strict'";
    }

    public parseSyntaxTree(): SyntaxTree {
        var sourceUnit = this.parseSourceUnit();

        var allDiagnostics = this.tokenDiagnostics.concat(this.diagnostics);
        allDiagnostics.sort((a: SyntaxDiagnostic, b: SyntaxDiagnostic) => a.position() - b.position());

        sourceUnit = this.addSkippedTokensTo(sourceUnit);

        return new SyntaxTree(sourceUnit, allDiagnostics);
    }
    
    private addSkippedTokensTo(sourceUnit: SourceUnitSyntax): SourceUnitSyntax {
        if (this.skippedTokens.length === 0) {
            // No skipped tokens, nothing to do.
            return sourceUnit;
        }

        return sourceUnit.accept1(new ParserSkippedTokensAdder(this.skippedTokens));
    }

    private parseSourceUnit(): SourceUnitSyntax {
        // Note: technically we don't need to save and restore this here.  After all, this the top
        // level parsing entrypoint.  So it will always start as false and be reset to false when the
        // loop ends.  However, for sake of symmetry and consistancy we do this.
        var savedIsInStrictMode = this.isInStrictMode;
        var moduleElements = this.parseSyntaxList(ParserListParsingState.SourceUnit_ModuleElements, Parser.updateStrictModeState);
        this.isInStrictMode = savedIsInStrictMode;

        return new SourceUnitSyntax(moduleElements, this.currentToken());
    }

    private static updateStrictModeState(parser: Parser, items: any[]): void {
        if (!parser.isInStrictMode) {
            // Check if all the items are directive prologue elements.
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!Parser.isDirectivePrologueElement(item)) {
                    return;
                }
            }

            parser.isInStrictMode = Parser.isUseStrictDirective(items[items.length - 1]);
        }
    }

    private isModuleElement(): boolean {
        return this.isImportDeclaration() ||
               this.isModuleDeclaration() ||
               this.isInterfaceDeclaration() ||
               this.isClassDeclaration() ||
               this.isEnumDeclaration() ||
               this.isStatement(/*allowFunctionDeclaration:*/ true);
    }

    private parseModuleElement(): ModuleElementSyntax {
        if (this.isImportDeclaration()) {
            return this.parseImportDeclaration();
        }
        else if (this.isModuleDeclaration()) {
            return this.parseModuleDeclaration();
        }
        else if (this.isInterfaceDeclaration()) {
            return this.parseInterfaceDeclaration();
        }
        else if (this.isClassDeclaration()) {
            return this.parseClassDeclaration();
        }
        else if (this.isEnumDeclaration()) {
            return this.parseEnumDeclaration();
        }
        else if (this.isStatement(/*allowFunctionDeclaration:*/ true)) {
            return this.parseStatement(/*allowFunctionDeclaration:*/ true);
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private isImportDeclaration(): boolean {
        // REVIEW: because 'import' is not a javascript keyword, we need to make sure that this is 
        // an actual import declaration.  As such, i check for "import id =" as that shouldn't 
        // match any other legal javascript construct.  However, we need to verify that this is
        // actually the case.
        return this.currentToken().keywordKind() === SyntaxKind.ImportKeyword &&
               this.peekTokenN(1).tokenKind === SyntaxKind.IdentifierNameToken &&
               this.peekTokenN(2).tokenKind === SyntaxKind.EqualsToken;
    }

    private parseImportDeclaration(): ImportDeclarationSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.ImportKeyword);

        var importKeyword = this.eatKeyword(SyntaxKind.ImportKeyword);
        var identifier = this.eatIdentifierToken();
        var equalsToken = this.eatToken(SyntaxKind.EqualsToken);
        var moduleReference = this.parseModuleReference();
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new ImportDeclarationSyntax(importKeyword, identifier, equalsToken, moduleReference, semicolonToken);
    }

    private parseModuleReference(): ModuleReferenceSyntax {
        if (this.isExternalModuleReference()) {
            return this.parseExternalModuleReference();
        }
        else {
            return this.parseModuleNameModuleReference();
        }
    }

    private isExternalModuleReference(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ModuleKeyword &&
               this.peekTokenN(1).tokenKind === SyntaxKind.OpenParenToken;
    }

    private parseExternalModuleReference(): ExternalModuleReferenceSyntax {
        Debug.assert(this.isExternalModuleReference());

        var moduleKeyword = this.eatKeyword(SyntaxKind.ModuleKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var stringLiteral = this.eatToken(SyntaxKind.StringLiteral);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);

        return new ExternalModuleReferenceSyntax(moduleKeyword, openParenToken, stringLiteral, closeParenToken);
    }

    private parseModuleNameModuleReference(): ModuleNameModuleReferenceSyntax {
        var name = this.parseName();
        return new ModuleNameModuleReferenceSyntax(name);
    }

    // NOTE: This will allow all identifier names.  Even the ones that are keywords.
    private parseIdentifierName(): IdentifierNameSyntax {
        var identifierName = this.eatIdentifierNameToken();
        return new IdentifierNameSyntax(identifierName);
    }

    private isName(): boolean {
        return this.isIdentifier(this.currentToken());
    }

    private parseName(): NameSyntax {
        var isIdentifier = this.currentToken().tokenKind === SyntaxKind.IdentifierNameToken;
        var identifier = this.eatIdentifierToken();
        var identifierName = new IdentifierNameSyntax(identifier);

        var current: NameSyntax = identifierName;

        while (isIdentifier && this.currentToken().tokenKind === SyntaxKind.DotToken) {
            var dotToken = this.eatToken(SyntaxKind.DotToken);

            isIdentifier = this.currentToken().tokenKind === SyntaxKind.IdentifierNameToken;
            identifier = this.eatIdentifierToken();
            identifierName = new IdentifierNameSyntax(identifier);

            current = new QualifiedNameSyntax(current, dotToken, identifierName);
        }

        return current;
    }

    private isEnumDeclaration(): boolean {
        if (this.currentToken().keywordKind() === SyntaxKind.ExportKeyword &&
            this.peekTokenN(1).keywordKind() === SyntaxKind.EnumKeyword) {
            return true;
        }

        return this.currentToken().keywordKind() === SyntaxKind.EnumKeyword &&
               this.isIdentifier(this.peekTokenN(1));
    }

    private parseEnumDeclaration(): EnumDeclarationSyntax {
        Debug.assert(this.isEnumDeclaration());

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var enumKeyword = this.eatKeyword(SyntaxKind.EnumKeyword);
        var identifier = this.eatIdentifierToken();

        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);
        var variableDeclarators: ISeparatedSyntaxList = SeparatedSyntaxList.empty;

        if (!openBraceToken.isMissing()) {
            variableDeclarators = this.parseSeparatedSyntaxList(ParserListParsingState.EnumDeclaration_VariableDeclarators);
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);

        return new EnumDeclarationSyntax(exportKeyword, enumKeyword, identifier,
            openBraceToken, variableDeclarators, closeBraceToken);
    }

    private isClassDeclaration(): boolean {
        var token0 = this.currentToken();

        var token1 = this.peekTokenN(1);
        if (token0.keywordKind() === SyntaxKind.ExportKeyword &&
            token1.keywordKind() === SyntaxKind.ClassKeyword) {
            return true;
        }

        if (token0.keywordKind() === SyntaxKind.DeclareKeyword &&
            token1.keywordKind() === SyntaxKind.ClassKeyword) {
            return true;
        }

        return token0.keywordKind() === SyntaxKind.ClassKeyword &&
               this.isIdentifier(token1);
    }

    private parseClassDeclaration(): ClassDeclarationSyntax {
        Debug.assert(this.isClassDeclaration());

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var declareKeyword = this.tryEatKeyword(SyntaxKind.DeclareKeyword);

        var classKeyword = this.eatKeyword(SyntaxKind.ClassKeyword);
        var identifier = this.eatIdentifierToken();

        var extendsClause: ExtendsClauseSyntax = null;
        if (this.isExtendsClause()) {
            extendsClause = this.parseExtendsClause();
        }

        var implementsClause: ImplementsClauseSyntax = null;
        if (this.isImplementsClause()) {
            implementsClause = this.parseImplementsClause();
        }

        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);
        var classElements: ISyntaxList = SyntaxList.empty;

        if (!openBraceToken.isMissing()) {
            classElements = this.parseSyntaxList(ParserListParsingState.ClassDeclaration_ClassElements);
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);
        return new ClassDeclarationSyntax(
            exportKeyword, declareKeyword, classKeyword, identifier, extendsClause,
            implementsClause, openBraceToken, classElements, closeBraceToken);
    }

    private isConstructorDeclaration(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ConstructorKeyword;
    }

    private isMemberAccessorDeclaration(): boolean {
        var rewindPoint = this.getRewindPoint();
        try {
            if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
                this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
                this.eatAnyToken();
            }

            if (this.currentToken().keywordKind() === SyntaxKind.StaticKeyword) {
                this.eatAnyToken();
            }

            if (this.currentToken().keywordKind() !== SyntaxKind.GetKeyword &&
                this.currentToken().keywordKind() !== SyntaxKind.SetKeyword) {
                return false;
            }

            this.eatAnyToken();
            return this.isIdentifier(this.currentToken());
        }
        finally {
            this.rewind(rewindPoint);
            this.releaseRewindPoint(rewindPoint);
        }
    }

    private parseMemberAccessorDeclaration(): MemberAccessorDeclarationSyntax {
        Debug.assert(this.isMemberAccessorDeclaration());

        var publicOrPrivateKeyword: ISyntaxToken = null;
        if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
            this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
            publicOrPrivateKeyword = this.eatAnyToken();
        }

        var staticKeyword = this.tryEatKeyword(SyntaxKind.StaticKeyword);

        if (this.currentToken().keywordKind() === SyntaxKind.GetKeyword) {
            return this.parseGetMemberAccessorDeclaration(publicOrPrivateKeyword, staticKeyword);
        }
        else if (this.currentToken().keywordKind() === SyntaxKind.SetKeyword) {
            return this.parseSetMemberAccessorDeclaration(publicOrPrivateKeyword, staticKeyword);
        }
        else {
            throw Errors.invalidOperation();
        }
    }
    
    private parseGetMemberAccessorDeclaration(publicOrPrivateKeyword: ISyntaxToken, 
                                              staticKeyword: ISyntaxToken): GetMemberAccessorDeclarationSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.GetKeyword);

        var getKeyword = this.eatKeyword(SyntaxKind.GetKeyword);
        var identifier = this.eatIdentifierToken();
        var parameterList = this.parseParameterList();
        var typeAnnotation = this.parseOptionalTypeAnnotation();
        var block = this.parseBlock();

        return new GetMemberAccessorDeclarationSyntax(
            publicOrPrivateKeyword, staticKeyword, getKeyword, identifier, parameterList, typeAnnotation, block);
    }
    
    private parseSetMemberAccessorDeclaration(publicOrPrivateKeyword: ISyntaxToken, 
                                              staticKeyword: ISyntaxToken): SetMemberAccessorDeclarationSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.SetKeyword);

        var setKeyword = this.eatKeyword(SyntaxKind.SetKeyword);
        var identifier = this.eatIdentifierToken();
        var parameterList = this.parseParameterList();
        var block = this.parseBlock();

        return new SetMemberAccessorDeclarationSyntax(
            publicOrPrivateKeyword, staticKeyword, setKeyword, identifier, parameterList, block);
    }

    private isMemberVariableDeclaration(): boolean {
        var rewindPoint = this.getRewindPoint();
        try {
            if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
                this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
                this.eatAnyToken();

                // ERROR RECOVERY: 
                // If we're following by an close curly or EOF, then consider this the start of a
                // variable declaration.
                if (this.currentToken().tokenKind === SyntaxKind.CloseBraceToken ||
                    this.currentToken().tokenKind === SyntaxKind.EndOfFileToken) {
                    return true;
                }
            }

            if (this.currentToken().keywordKind() === SyntaxKind.StaticKeyword) {
                this.eatAnyToken();

                // ERROR RECOVERY: 
                // If we're following by an close curly or EOF, then consider this the start of a
                // variable declaration.
                if (this.currentToken().tokenKind === SyntaxKind.CloseBraceToken ||
                    this.currentToken().tokenKind === SyntaxKind.EndOfFileToken) {
                    return true;
                }
            }

            return this.isVariableDeclarator();
        }
        finally {
            this.rewind(rewindPoint);
            this.releaseRewindPoint(rewindPoint);
        }
    }
    
    private isClassElement(): boolean {
        // Note: the order of these calls is important.  Specifically, isMemberVariableDeclaration
        // checks for a subset of the conditions of the previous two.
        return this.isConstructorDeclaration() ||
               this.isMemberFunctionDeclaration() ||
               this.isMemberAccessorDeclaration() ||
               this.isMemberVariableDeclaration();
    }

    private parseConstructorDeclaration(): ConstructorDeclarationSyntax {
        Debug.assert(this.isConstructorDeclaration());

        var constructorKeyword = this.eatKeyword(SyntaxKind.ConstructorKeyword);
        var parameterList = this.parseParameterList();

        var semicolonToken: ISyntaxToken = null;
        var block: BlockSyntax = null;

        if (this.isBlock()) {
            block = this.parseBlock();
        }
        else {
            semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        return new ConstructorDeclarationSyntax(constructorKeyword, parameterList, block, semicolonToken);
    }

    private isMemberFunctionDeclaration(): boolean {
        var rewindPoint = this.getRewindPoint();
        try {
            if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
                this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
                this.eatAnyToken();
            }

            if (this.currentToken().keywordKind() === SyntaxKind.StaticKeyword) {
                this.eatAnyToken();
            }

            return this.isFunctionSignature();
        }
        finally {
            this.rewind(rewindPoint);
            this.releaseRewindPoint(rewindPoint);
        }
    }

    private parseMemberFunctionDeclaration(): MemberFunctionDeclarationSyntax {
        Debug.assert(this.isMemberFunctionDeclaration());
        var publicOrPrivateKeyword: ISyntaxToken = null;
        if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
            this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
            publicOrPrivateKeyword = this.eatAnyToken();
        }

        var staticKeyword = this.tryEatKeyword(SyntaxKind.StaticKeyword);
        var functionSignature = this.parseFunctionSignature();

        var block: BlockSyntax = null;
        var semicolon: ISyntaxToken = null;

        if (this.isBlock()) {
            block = this.parseBlock();
        }
        else {
            semicolon = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        return new MemberFunctionDeclarationSyntax(publicOrPrivateKeyword, staticKeyword, functionSignature, block, semicolon);
    }

    private parseMemberVariableDeclaration(): MemberVariableDeclarationSyntax {
        Debug.assert(this.isMemberVariableDeclaration());

        var publicOrPrivateKeyword: ISyntaxToken = null;
        if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
            this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
            publicOrPrivateKeyword = this.eatAnyToken();
        }

        var staticKeyword = this.tryEatKeyword(SyntaxKind.StaticKeyword);
        var variableDeclarator = this.parseVariableDeclarator(/*allowIn:*/ true);
        var semicolon = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new MemberVariableDeclarationSyntax(publicOrPrivateKeyword, staticKeyword, variableDeclarator, semicolon);
    }

    private parseClassElement(): ClassElementSyntax {
        Debug.assert(this.isClassElement());
        if (this.isConstructorDeclaration()) {
            return this.parseConstructorDeclaration();
        }
        else if (this.isMemberFunctionDeclaration()) {
            return this.parseMemberFunctionDeclaration();
        }
        else if (this.isMemberAccessorDeclaration()) {
            return this.parseMemberAccessorDeclaration();
        }
        else if (this.isMemberVariableDeclaration()) {
            return this.parseMemberVariableDeclaration();
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private isFunctionDeclaration(): boolean {
        var token0 = this.currentToken();
        if (token0.keywordKind() === SyntaxKind.FunctionKeyword) {
            return true;
        }

        var token1 = this.peekTokenN(1);
        if (token0.keywordKind() === SyntaxKind.ExportKeyword &&
            token1.keywordKind() === SyntaxKind.FunctionKeyword) {
            return true;
        }

        return token0.keywordKind() === SyntaxKind.DeclareKeyword &&
               token1.keywordKind() === SyntaxKind.FunctionKeyword;
    }

    private parseFunctionDeclaration(): FunctionDeclarationSyntax {
        Debug.assert(this.isFunctionDeclaration());

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var declareKeyword = this.tryEatKeyword(SyntaxKind.DeclareKeyword);

        var functionKeyword = this.eatKeyword(SyntaxKind.FunctionKeyword);
        var functionSignature = this.parseFunctionSignature();

        var semicolonToken: ISyntaxToken = null;
        var block: BlockSyntax = null;

        if (this.isBlock()) {
            block = this.parseBlock();
        }
        else {
            semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        }

        return new FunctionDeclarationSyntax(exportKeyword, declareKeyword, functionKeyword, functionSignature, block, semicolonToken);
    }

    private isModuleDeclaration(): boolean {
        var token0 = this.currentToken();
        var token1 = this.peekTokenN(1);

        // export module
        if (token0.keywordKind() === SyntaxKind.ExportKeyword &&
            token1.keywordKind() === SyntaxKind.ModuleKeyword) {
            return true;
        }

        // declare module
        if (token0.keywordKind() === SyntaxKind.DeclareKeyword &&
            token1.keywordKind() === SyntaxKind.ModuleKeyword) {
            return true;
        }

        // Module is not a javascript keyword.  So we need to use a bit of lookahead here to ensure
        // that we're actually looking at a module construct and not some javascript expression.
        if (token0.keywordKind() === SyntaxKind.ModuleKeyword) {
            // module {
            if (token1.tokenKind === SyntaxKind.OpenBraceToken) {
                return true;
            }

            if (token1.tokenKind === SyntaxKind.IdentifierNameToken) {
                var token2 = this.peekTokenN(2);

                // module id {
                if (token2.tokenKind === SyntaxKind.OpenBraceToken) {
                    return true;
                }

                // module id.
                if (token2.tokenKind === SyntaxKind.DotToken) {
                    return true;
                }
            }
        }

        return false;
    }

    private parseModuleDeclaration(): ModuleDeclarationSyntax {
        Debug.assert(this.isModuleDeclaration());

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var declareKeyword = this.tryEatKeyword(SyntaxKind.DeclareKeyword);
        var moduleKeyword = this.eatKeyword(SyntaxKind.ModuleKeyword);

        var moduleName: NameSyntax = null;
        var stringLiteral: ISyntaxToken = null;
        if (this.isName()) {
            moduleName = this.parseName();
        }
        else if (this.currentToken().tokenKind === SyntaxKind.StringLiteral) {
            stringLiteral = this.eatToken(SyntaxKind.StringLiteral);
        }

        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);

        var moduleElements: ISyntaxList = SyntaxList.empty;
        if (!openBraceToken.isMissing()) {
            moduleElements = this.parseSyntaxList(ParserListParsingState.ModuleDeclaration_ModuleElements);
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);

        return new ModuleDeclarationSyntax(
            exportKeyword, declareKeyword, moduleKeyword, moduleName, stringLiteral,
            openBraceToken, moduleElements, closeBraceToken);
    }

    private isInterfaceDeclaration(): boolean {
        // export interface
        if (this.currentToken().keywordKind() === SyntaxKind.ExportKeyword &&
            this.peekTokenN(1).keywordKind() === SyntaxKind.InterfaceKeyword) {
            return true
        }

        // interface foo
        return this.currentToken().keywordKind() === SyntaxKind.InterfaceKeyword &&
               this.isIdentifier(this.peekTokenN(1));
    }

    private parseInterfaceDeclaration(): InterfaceDeclarationSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.ExportKeyword ||
                     this.currentToken().keywordKind() === SyntaxKind.InterfaceKeyword);

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var interfaceKeyword = this.eatKeyword(SyntaxKind.InterfaceKeyword);
        var identifier = this.eatIdentifierToken();

        var extendsClause: ExtendsClauseSyntax = null;
        if (this.isExtendsClause()) {
            extendsClause = this.parseExtendsClause();
        }

        var objectType = this.parseObjectType();
        return new InterfaceDeclarationSyntax(exportKeyword, interfaceKeyword, identifier, extendsClause, objectType);
    }

    private parseObjectType(): ObjectTypeSyntax {
        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);

        var typeMembers: ISeparatedSyntaxList = SeparatedSyntaxList.empty;
        if (!openBraceToken.isMissing()) {
            typeMembers = this.parseSeparatedSyntaxList(ParserListParsingState.ObjectType_TypeMembers);
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);
        return new ObjectTypeSyntax(openBraceToken, typeMembers, closeBraceToken);
    }

    private isTypeMember(): boolean {
        return this.isCallSignature() ||
               this.isConstructSignature() ||
               this.isIndexSignature() ||
               this.isFunctionSignature() ||
               this.isPropertySignature();
    }

    private parseTypeMember(): TypeMemberSyntax {
        if (this.isCallSignature()) {
            return this.parseCallSignature();
        }
        else if (this.isConstructSignature()) {
            return this.parseConstructSignature();
        }
        else if (this.isIndexSignature()) {
            return this.parseIndexSignature();
        }
        else if (this.isFunctionSignature()) {
            // Note: it is important that isFunctionSignature is called before isPropertySignature.
            // isPropertySignature checks for a subset of isFunctionSignature.
            return this.parseFunctionSignature();
        }
        else if (this.isPropertySignature()) {
            return this.parsePropertySignature();
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private parseConstructSignature(): ConstructSignatureSyntax {
        Debug.assert(this.isConstructSignature());

        var newKeyword = this.eatKeyword(SyntaxKind.NewKeyword);
        var parameterList = this.parseParameterList();
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        return new ConstructSignatureSyntax(newKeyword, parameterList, typeAnnotation);
    }

    private parseIndexSignature(): IndexSignatureSyntax {
        Debug.assert(this.isIndexSignature());

        var openBracketToken = this.eatToken(SyntaxKind.OpenBracketToken);
        var parameter = this.parseParameter();
        var closeBracketToken = this.eatToken(SyntaxKind.CloseBracketToken);
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        return new IndexSignatureSyntax(openBracketToken, parameter, closeBracketToken, typeAnnotation);
    }

    private parseFunctionSignature(): FunctionSignatureSyntax {
        var identifier = this.eatIdentifierToken();
        var questionToken = this.tryEatToken(SyntaxKind.QuestionToken);

        var parameterList = this.parseParameterList();
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        return new FunctionSignatureSyntax(identifier, questionToken, parameterList, typeAnnotation);
    }

    private parsePropertySignature(): PropertySignatureSyntax {
        Debug.assert(this.isPropertySignature());

        var identifier = this.eatIdentifierToken();
        var questionToken = this.tryEatToken(SyntaxKind.QuestionToken);
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        return new PropertySignatureSyntax(identifier, questionToken, typeAnnotation);
    }

    private isCallSignature(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenParenToken;
    }

    private isConstructSignature(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.NewKeyword;
    }

    private isIndexSignature(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenBracketToken;
    }

    private isFunctionSignature(): boolean {
        if (this.isIdentifier(this.currentToken())) {
            // id(
            if (this.peekTokenN(1).tokenKind === SyntaxKind.OpenParenToken) {
                return true;
            }

            // id?(
            if (this.peekTokenN(1).tokenKind === SyntaxKind.QuestionToken &&
                this.peekTokenN(2).tokenKind === SyntaxKind.OpenParenToken) {
                return true;
            }
        }

        return false;
    }

    private isPropertySignature(): boolean {
        // Note: identifiers also start function signatures.  So it's important that we call this
        // after we calll isFunctionSignature.
        return this.isIdentifier(this.currentToken());
    }

    private isExtendsClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ExtendsKeyword;
    }

    private parseExtendsClause(): ExtendsClauseSyntax {
        Debug.assert(this.isExtendsClause());

        var extendsKeyword = this.eatKeyword(SyntaxKind.ExtendsKeyword);
        var typeNames = this.parseSeparatedSyntaxList(ParserListParsingState.ExtendsOrImplementsClause_TypeNameList);

        return new ExtendsClauseSyntax(extendsKeyword, typeNames);
    }

    private isImplementsClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ImplementsKeyword;
    }

    private parseImplementsClause(): ImplementsClauseSyntax {
        Debug.assert(this.isImplementsClause());

        var implementsKeyword = this.eatKeyword(SyntaxKind.ImplementsKeyword);
        var typeNames = this.parseSeparatedSyntaxList(ParserListParsingState.ExtendsOrImplementsClause_TypeNameList);

        return new ImplementsClauseSyntax(implementsKeyword, typeNames);
    }

    private isStatement(allowFunctionDeclaration: boolean): boolean {
        // ERROR RECOVERY
        switch (this.currentToken().keywordKind()) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.StaticKeyword:
                // None of hte above are actually keywords.  And they might show up in a real
                // statement (i.e. "public();").  However, if we can determine that they're
                // parsable as a ClassElement then don't consider them a statement.  Note:
                //
                // It should not be possible for any class element that starts with public, private
                // or static to be parsed as a statement.  So this is safe to do.
                if (this.isClassElement()) {
                    return false;
                }
        }

        return this.isVariableStatement() ||
               this.isLabeledStatement() ||
               (allowFunctionDeclaration && this.isFunctionDeclaration()) ||
               this.isIfStatement() ||
               this.isBlock() ||
               this.isExpressionStatement() ||
               this.isReturnStatement() ||
               this.isSwitchStatement() ||
               this.isThrowStatement() ||
               this.isBreakStatement() ||
               this.isContinueStatement() ||
               this.isForOrForInStatement() ||
               this.isEmptyStatement() ||
               this.isWhileStatement() ||
               this.isWithStatement() ||
               this.isDoStatement() ||
               this.isTryStatement() ||
               this.isDebuggerStatement();
    }

    private parseStatement(allowFunctionDeclaration: boolean): StatementSyntax {
        if (this.isVariableStatement()) {
            return this.parseVariableStatement();
        }
        else if (this.isLabeledStatement()) {
            return this.parseLabeledStatement();
        }
        else if (allowFunctionDeclaration && this.isFunctionDeclaration()) {
            return this.parseFunctionDeclaration();
        }
        else if (this.isIfStatement()) {
            return this.parseIfStatement();
        }
        else if (this.isBlock()) {
            return this.parseBlock();
        }
        else if (this.isReturnStatement()) {
            return this.parseReturnStatement();
        }
        else if (this.isSwitchStatement()) {
            return this.parseSwitchStatement();
        }
        else if (this.isThrowStatement()) {
            return this.parseThrowStatement();
        }
        else if (this.isBreakStatement()) {
            return this.parseBreakStatement();
        }
        else if (this.isContinueStatement()) {
            return this.parseContinueStatement();
        }
        else if (this.isForOrForInStatement()) {
            return this.parseForOrForInStatement();
        }
        else if (this.isEmptyStatement()) {
            return this.parseEmptyStatement();
        }
        else if (this.isWhileStatement()) {
            return this.parseWhileStatement();
        }
        else if (this.isWithStatement()) {
            return this.parseWithStatement();
        }
        else if (this.isDoStatement()) {
            return this.parseDoStatement();
        }
        else if (this.isTryStatement()) {
            return this.parseTryStatement();
        }
        else if (this.isDebuggerStatement()) {
            return this.parseDebuggerStatement();
        }
        else {
            // Fall back to parsing this as expression statement.
            return this.parseExpressionStatement();
        }
    }

    private isDebuggerStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.DebuggerKeyword;
    }

    private parseDebuggerStatement(): DebuggerStatementSyntax {
        Debug.assert(this.isDebuggerStatement());

        var debuggerKeyword = this.eatKeyword(SyntaxKind.DebuggerKeyword);
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new DebuggerStatementSyntax(debuggerKeyword, semicolonToken);
    }

    private isDoStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.DoKeyword;
    }

    private parseDoStatement(): DoStatementSyntax {
        Debug.assert(this.isDoStatement());

        var doKeyword = this.eatKeyword(SyntaxKind.DoKeyword);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);
        var whileKeyword = this.eatKeyword(SyntaxKind.WhileKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var condition = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);

        // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
        // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
        // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
        //  do;while(0)x will have a semicolon inserted before x.
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ true);

        return new DoStatementSyntax(doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken);
    }

    private isLabeledStatement(): boolean {
        return this.isIdentifier(this.currentToken()) && this.peekTokenN(1).tokenKind === SyntaxKind.ColonToken;
    }

    private parseLabeledStatement(): LabeledStatement {
        Debug.assert(this.isLabeledStatement());
        
        var identifier = this.eatIdentifierToken();
        var colonToken = this.eatToken(SyntaxKind.ColonToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);
        
        return new LabeledStatement(identifier, colonToken, statement);
    }

    private isTryStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.TryKeyword;
    }

    private parseTryStatement(): TryStatementSyntax {
        Debug.assert(this.isTryStatement());

        var tryKeyword = this.eatKeyword(SyntaxKind.TryKeyword);
        var block = this.parseBlock();

        var catchClause: CatchClauseSyntax = null;
        if (this.isCatchClause()) {
            catchClause = this.parseCatchClause();
        }

        var finallyClause: FinallyClauseSyntax = null;
        if (this.isFinallyClause()) {
            finallyClause = this.parseFinallyClause();
        }

        // TODO: Report error if both catch and finally clauses are missing.
        // (Alternatively, report that at semantic checking time).

        return new TryStatementSyntax(tryKeyword, block, catchClause, finallyClause);
    }

    private isCatchClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.CatchKeyword;
    }

    private parseCatchClause(): CatchClauseSyntax {
        Debug.assert(this.isCatchClause());

        var catchKeyword = this.eatKeyword(SyntaxKind.CatchKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var identifier = this.eatIdentifierToken();
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var block = this.parseBlock();

        return new CatchClauseSyntax(catchKeyword, openParenToken, identifier, closeParenToken, block);
    }

    private isFinallyClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.FinallyKeyword;
    }

    private parseFinallyClause(): FinallyClauseSyntax {
        Debug.assert(this.isFinallyClause());

        var finallyKeyword = this.eatKeyword(SyntaxKind.FinallyKeyword);
        var block = this.parseBlock();

        return new FinallyClauseSyntax(finallyKeyword, block);
    }

    private isWithStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.WithKeyword;
    }

    private parseWithStatement(): WithStatementSyntax {
        Debug.assert(this.isWithStatement());

        var withKeyword = this.eatKeyword(SyntaxKind.WithKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var condition = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        return new WithStatementSyntax(withKeyword, openParenToken, condition, closeParenToken, statement);
    }

    private isWhileStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.WhileKeyword;
    }

    private parseWhileStatement(): WhileStatementSyntax {
        Debug.assert(this.isWhileStatement());

        var whileKeyword = this.eatKeyword(SyntaxKind.WhileKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var condition = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        return new WhileStatementSyntax(whileKeyword, openParenToken, condition, closeParenToken, statement);
    }

    private isEmptyStatement(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.SemicolonToken;
    }

    private parseEmptyStatement(): EmptyStatementSyntax {
        Debug.assert(this.isEmptyStatement());

        var semicolonToken = this.eatToken(SyntaxKind.SemicolonToken);
        return new EmptyStatementSyntax(semicolonToken);
    }

    private isForOrForInStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ForKeyword;
    }

    private parseForOrForInStatement(): BaseForStatementSyntax {
        Debug.assert(this.isForOrForInStatement());

        var forKeyword = this.eatKeyword(SyntaxKind.ForKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        
        var currentToken = this.currentToken();
        if (currentToken.keywordKind() === SyntaxKind.VarKeyword) {
            // for ( var VariableDeclarationListNoIn; Expressionopt ; Expressionopt ) Statement
            // for ( var VariableDeclarationNoIn in Expression ) Statement
            return this.parseForOrForInStatementWithVariableDeclaration(forKeyword, openParenToken);
        }
        else if (currentToken.tokenKind === SyntaxKind.SemicolonToken) {
            // for ( ; Expressionopt ; Expressionopt ) Statement
            return this.parseForStatement(forKeyword, openParenToken);
        }
        else {
            // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
            // for ( LeftHandSideExpression in Expression ) Statement
            return this.parseForOrForInStatementWithInitializer(forKeyword, openParenToken);
        }
    }

    private parseForOrForInStatementWithVariableDeclaration(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): BaseForStatementSyntax {
        Debug.assert(forKeyword.keywordKind() === SyntaxKind.ForKeyword &&
                     openParenToken.tokenKind === SyntaxKind.OpenParenToken);
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.VarKeyword);

        // for ( var VariableDeclarationListNoIn; Expressionopt ; Expressionopt ) Statement
        // for ( var VariableDeclarationNoIn in Expression ) Statement

        var variableDeclaration = this.parseVariableDeclaration(/*allowIn:*/ false);

        if (this.currentToken().keywordKind() === SyntaxKind.InKeyword) {
            return this.parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, null);
        }

        return this.parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, variableDeclaration, null);
    }

    private parseForInStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken,
                                                                    openParenToken: ISyntaxToken,
                                                                    variableDeclaration: VariableDeclarationSyntax,
                                                                    initializer: ExpressionSyntax): ForInStatementSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.InKeyword);

        // for ( var VariableDeclarationNoIn in Expression ) Statement
        var inKeyword = this.eatKeyword(SyntaxKind.InKeyword);
        var expression = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        return new ForInStatementSyntax(forKeyword, openParenToken, variableDeclaration,
            initializer, inKeyword, expression, closeParenToken, statement);
    }

    private parseForOrForInStatementWithInitializer(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): BaseForStatementSyntax {
        Debug.assert(forKeyword.keywordKind() === SyntaxKind.ForKeyword &&
                     openParenToken.tokenKind === SyntaxKind.OpenParenToken);
        
        // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
        // for ( LeftHandSideExpression in Expression ) Statement

        var initializer = this.parseExpression(/*allowIn:*/ false);
        if (this.currentToken().keywordKind() === SyntaxKind.InKeyword) {
            return this.parseForInStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, null, initializer);
        }
        else {
            return this.parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, null, initializer);
        }
    }

    private parseForStatement(forKeyword: ISyntaxToken, openParenToken: ISyntaxToken): ForStatementSyntax {
        Debug.assert(forKeyword.keywordKind() === SyntaxKind.ForKeyword &&
                     openParenToken.tokenKind === SyntaxKind.OpenParenToken);

        // for ( ExpressionNoInopt; Expressionopt ; Expressionopt ) Statement
        var initializer: ExpressionSyntax = null;

        if (this.currentToken().tokenKind !== SyntaxKind.SemicolonToken &&
            this.currentToken().tokenKind !== SyntaxKind.CloseParenToken &&
            this.currentToken().tokenKind !== SyntaxKind.EndOfFileToken) {
            initializer = this.parseExpression(/*allowIn:*/ false);
        }

        return this.parseForStatementWithVariableDeclarationOrInitializer(forKeyword, openParenToken, null, initializer);
    }

    private parseForStatementWithVariableDeclarationOrInitializer(forKeyword: ISyntaxToken,
                                                                  openParenToken: ISyntaxToken,
                                                                  variableDeclaration: VariableDeclarationSyntax,
                                                                  initializer: ExpressionSyntax): ForStatementSyntax {
        
        var firstSemicolonToken = this.eatToken(SyntaxKind.SemicolonToken);

        var condition: ExpressionSyntax = null;
        if (this.currentToken().tokenKind !== SyntaxKind.SemicolonToken &&
            this.currentToken().tokenKind !== SyntaxKind.CloseParenToken &&
            this.currentToken().tokenKind !== SyntaxKind.EndOfFileToken) {
            condition = this.parseExpression(/*allowIn:*/ true);
        }

        var secondSemicolonToken = this.eatToken(SyntaxKind.SemicolonToken);

        var incrementor: ExpressionSyntax = null;
        if (this.currentToken().tokenKind !== SyntaxKind.CloseParenToken &&
            this.currentToken().tokenKind !== SyntaxKind.EndOfFileToken) {
            incrementor = this.parseExpression(/*allowIn:*/ true);
        }

        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        return new ForStatementSyntax(forKeyword, openParenToken, variableDeclaration, initializer, 
            firstSemicolonToken, condition, secondSemicolonToken, incrementor, closeParenToken, statement);
    }

    private isBreakStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.BreakKeyword;
    }

    private parseBreakStatement(): BreakStatementSyntax {
        Debug.assert(this.isBreakStatement());

        var breakKeyword = this.eatKeyword(SyntaxKind.BreakKeyword);

        // If there is no newline after the break keyword, then we can consume an optional 
        // identifier.
        var identifier: ISyntaxToken = null;
        if (!this.canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
            if (this.isIdentifier(this.currentToken())) {
                identifier = this.eatIdentifierToken();
            }
        }

        var semicolon = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        return new BreakStatementSyntax(breakKeyword, identifier, semicolon);
    }

    private isContinueStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ContinueKeyword;
    }

    private parseContinueStatement(): ContinueStatementSyntax {
        Debug.assert(this.isContinueStatement());

        var continueKeyword = this.eatKeyword(SyntaxKind.ContinueKeyword);

        // If there is no newline after the break keyword, then we can consume an optional 
        // identifier.
        var identifier: ISyntaxToken = null;
        if (!this.canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
            if (this.isIdentifier(this.currentToken())) {
                identifier = this.eatIdentifierToken();
            }
        }

        var semicolon = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
        return new ContinueStatementSyntax(continueKeyword, identifier, semicolon);
    }

    private isSwitchStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.SwitchKeyword;
    }

    private parseSwitchStatement() {
        Debug.assert(this.isSwitchStatement());
        
        var switchKeyword = this.eatKeyword(SyntaxKind.SwitchKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var expression = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);

        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);

        var switchClauses: ISyntaxList = SyntaxList.empty;
        if (!openBraceToken.isMissing()) {
            switchClauses = this.parseSyntaxList(ParserListParsingState.SwitchStatement_SwitchClauses);
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);
        return new SwitchStatementSyntax(switchKeyword, openParenToken, expression, 
            closeParenToken, openBraceToken, switchClauses, closeBraceToken);
    }

    private isCaseSwitchClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.CaseKeyword;
    }

    private isDefaultSwitchClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.DefaultKeyword;
    }

    private isSwitchClause(): boolean {
        return this.isCaseSwitchClause() || this.isDefaultSwitchClause();
    }

    private parseSwitchClause(): SwitchClauseSyntax {
        Debug.assert(this.isSwitchClause());
        if (this.isCaseSwitchClause()) {
            return this.parseCaseSwitchClause();
        }
        else if (this.isDefaultSwitchClause()) {
            return this.parseDefaultSwitchClause();
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private parseCaseSwitchClause(): CaseSwitchClauseSyntax {
        Debug.assert(this.isCaseSwitchClause());

        var caseKeyword = this.eatKeyword(SyntaxKind.CaseKeyword);
        var expression = this.parseExpression(/*allowIn:*/ true);
        var colonToken = this.eatToken(SyntaxKind.ColonToken);
        var statements = this.parseSyntaxList(ParserListParsingState.SwitchClause_Statements);

        return new CaseSwitchClauseSyntax(caseKeyword, expression, colonToken, statements);
    }

    private parseDefaultSwitchClause(): DefaultSwitchClauseSyntax {
        Debug.assert(this.isDefaultSwitchClause());

        var defaultKeyword = this.eatKeyword(SyntaxKind.DefaultKeyword);
        var colonToken = this.eatToken(SyntaxKind.ColonToken);
        var statements = this.parseSyntaxList(ParserListParsingState.SwitchClause_Statements);

        return new DefaultSwitchClauseSyntax(defaultKeyword, colonToken, statements);
    }

    private isThrowStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ThrowKeyword;
    }

    private parseThrowStatement(): ThrowStatementSyntax {
        Debug.assert(this.isThrowStatement());

        var throwKeyword = this.eatKeyword(SyntaxKind.ThrowKeyword);

        var expression: ExpressionSyntax = null;
        if (this.canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            var token = this.createMissingToken(SyntaxKind.IdentifierNameToken, SyntaxKind.None, null);
            expression = new IdentifierNameSyntax(token);
        }
        else {
            expression = this.parseExpression(/*allowIn:*/ true);
        }
        
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new ThrowStatementSyntax(throwKeyword, expression, semicolonToken);
    }

    private isReturnStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ReturnKeyword;
    }

    private parseReturnStatement(): ReturnStatementSyntax {
        Debug.assert(this.isReturnStatement());

        var returnKeyword = this.eatKeyword(SyntaxKind.ReturnKeyword);

        var expression: ExpressionSyntax = null;
        if (!this.canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
            expression = this.parseExpression(/*allowIn:*/ true);
        }
        
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new ReturnStatementSyntax(returnKeyword, expression, semicolonToken);
    }

    private isExpressionStatement(): boolean {
        // As per the gramar, neither { nor 'function' can start an expression statement.
        var currentToken = this.currentToken();
        var kind = currentToken.tokenKind;
        if (kind === SyntaxKind.OpenBraceToken) {
            return false;
        }

        var keywordKind = currentToken.keywordKind();
        if (keywordKind === SyntaxKind.FunctionKeyword) {
            return false;
        }

        return this.isExpression();
    }

    private isAssignmentOrOmittedExpression(): boolean {
        if (this.currentToken().tokenKind === SyntaxKind.CommaToken) {
            return true;
        }

        return this.isExpression();
    }
    
    private parseAssignmentOrOmittedExpression(): ExpressionSyntax {
        Debug.assert(this.isAssignmentOrOmittedExpression());
        
        if (this.currentToken().tokenKind === SyntaxKind.CommaToken) {
            return new OmittedExpressionSyntax();
        }

        return this.parseAssignmentExpression(/*allowIn:*/ true);
    }
    
    private isExpression(): boolean {
        var currentToken = this.currentToken();
        var kind = currentToken.tokenKind;

        switch (kind) {
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.RegularExpressionLiteral:
                return true;

            case SyntaxKind.OpenBracketToken: // For array literals.
            case SyntaxKind.OpenParenToken: // For parenthesized expressions
                return true;

            case SyntaxKind.LessThanToken: // For cast expressions.
                return true;

            // Prefix unary expressions.
            case SyntaxKind.PlusPlusToken:
            case SyntaxKind.MinusMinusToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
                return true;

            case SyntaxKind.OpenBraceToken: // For object type literal expressions.
                return true;
            
            // ERROR TOLERANCE:
            // If we see a => then we know the user was probably trying to type in an arrow 
            // function.  So allow this as the start of an expression, knowing that when we 
            // actually try to parse it we'll report the missing identifier.
            case SyntaxKind.EqualsGreaterThanToken:
                return true;

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
                return true;
        }

        var keywordKind = currentToken.keywordKind();
        switch (keywordKind) {
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
                return true;

            case SyntaxKind.NewKeyword: // For object creation expressions.
                return true;

            // Prefix unary expressions
            case SyntaxKind.DeleteKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.TypeOfKeyword:
                return true;

            // For function expressions.
            case SyntaxKind.FunctionKeyword:
                return true;
        }

        if (this.isIdentifier(this.currentToken())) {
            return true;
        }

        return false;
    }

    private parseExpressionStatement(): ExpressionStatementSyntax {
        var expression = this.parseExpression(/*allowIn:*/ true);

        var semicolon = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new ExpressionStatementSyntax(expression, semicolon);
    }

    private isIfStatement(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.IfKeyword;
    }

    private parseIfStatement(): IfStatementSyntax {
        Debug.assert(this.isIfStatement());

        var ifKeyword = this.eatKeyword(SyntaxKind.IfKeyword);
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var condition = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        var elseClause: ElseClauseSyntax = null;
        if (this.isElseClause()) {
            elseClause = this.parseElseClause();
        }

        return new IfStatementSyntax(ifKeyword, openParenToken, condition, closeParenToken, statement, elseClause);
    }

    private isElseClause(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.ElseKeyword;
    }

    private parseElseClause(): ElseClauseSyntax {
        Debug.assert(this.isElseClause());

        var elseKeyword = this.eatKeyword(SyntaxKind.ElseKeyword);
        var statement = this.parseStatement(/*allowFunctionDeclaration:*/ false);

        return new ElseClauseSyntax(elseKeyword, statement);
    }

    private isVariableStatement(): boolean {
        var token0 = this.currentToken();
        if (token0.keywordKind() === SyntaxKind.VarKeyword) {
            return true;
        }

        var token1 = this.peekTokenN(1);
        if (token0.keywordKind() === SyntaxKind.ExportKeyword &&
            token1.keywordKind() === SyntaxKind.VarKeyword) {
            return true;
        }

        return token0.keywordKind() === SyntaxKind.DeclareKeyword &&
               token1.keywordKind() === SyntaxKind.VarKeyword;
    }

    private parseVariableStatement(): VariableStatementSyntax {
        Debug.assert(this.isVariableStatement());

        var exportKeyword = this.tryEatKeyword(SyntaxKind.ExportKeyword);
        var declareKeyword = this.tryEatKeyword(SyntaxKind.DeclareKeyword);

        var variableDeclaration = this.parseVariableDeclaration(/*allowIn:*/ true);
        var semicolonToken = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);

        return new VariableStatementSyntax(exportKeyword, declareKeyword, variableDeclaration, semicolonToken);
    }

    private parseVariableDeclaration(allowIn: boolean): VariableDeclarationSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.VarKeyword);
        var varKeyword = this.eatKeyword(SyntaxKind.VarKeyword);

        var listParsingState = allowIn 
            ? ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn
            : ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn;

        var variableDeclarators = this.parseSeparatedSyntaxList(listParsingState);
        return new VariableDeclarationSyntax(varKeyword, variableDeclarators);
    }

    private isVariableDeclarator(): boolean {
        return this.isIdentifier(this.currentToken());
    }

    private parseVariableDeclarator(allowIn: boolean): VariableDeclaratorSyntax {
        var identifier = this.eatIdentifierToken();
        var equalsValueClause: EqualsValueClauseSyntax = null;
        var typeAnnotation: TypeAnnotationSyntax = null;

        if (!identifier.isMissing()) {
            typeAnnotation = this.parseOptionalTypeAnnotation();

            if (this.isEqualsValueClause()) {
                equalsValueClause = this.parseEqualsValuesClause(allowIn);
            }
        }

        return new VariableDeclaratorSyntax(identifier, typeAnnotation, equalsValueClause);
    }

    private isEqualsValueClause(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.EqualsToken;
    }

    private parseEqualsValuesClause(allowIn: boolean): EqualsValueClauseSyntax {
        Debug.assert(this.isEqualsValueClause());

        var equalsToken = this.eatToken(SyntaxKind.EqualsToken);
        var value = this.parseAssignmentExpression(allowIn);

        return new EqualsValueClauseSyntax(equalsToken, value);
    }

    private parseExpression(allowIn: boolean): ExpressionSyntax {
        return this.parseSubExpression(0, allowIn);
    }

    // Called when you need to parse an expression, but you do not want to allow 'CommaExpressions'.
    // i.e. if you have "var a = 1, b = 2" then when we parse '1' we want to parse with higher 
    // precedence than 'comma'.  Otherwise we'll get: "var a = (1, (b = 2))", instead of
    // "var a = (1), b = (2)");
    private parseAssignmentExpression(allowIn: boolean): ExpressionSyntax {
        return this.parseSubExpression(ParserExpressionPrecedence.AssignmentExpressionPrecedence, allowIn);
    }

    private parseUnaryExpression(): UnaryExpressionSyntax {
        var currentTokenKind = this.currentToken().tokenKind;
        if (SyntaxFacts.isPrefixUnaryExpressionOperatorToken(currentTokenKind)) {
            var operatorKind = SyntaxFacts.getPrefixUnaryExpression(currentTokenKind);

            var operatorToken = this.eatAnyToken();

            var operand = this.parseUnaryExpression(); 
            return new PrefixUnaryExpressionSyntax(operatorKind, operatorToken, operand);
        }
        else {
            return this.parseTerm(/*allowInvocation*/ true, /*insideObjectCreation:*/ false);
        }
    }

    private parseSubExpression(precedence: ParserExpressionPrecedence, allowIn: boolean): ExpressionSyntax {
        // Because unary expression have the highest precedence, we can always parse one, regardless 
        // of what precedence was passed in.
        var leftOperand: ExpressionSyntax = this.parseUnaryExpression();
        leftOperand = this.parseBinaryOrConditionalExpressions(precedence, allowIn, leftOperand);

        return leftOperand;
    }

    private parseBinaryOrConditionalExpressions(precedence: number, allowIn: boolean, leftOperand: ExpressionSyntax): ExpressionSyntax {
        while (true) {
            // We either have a binary operator here, or we're finished.
            var currentTokenKind = this.currentToken().tokenKind;
            var currentTokenKeywordKind = this.currentToken().keywordKind();

            if (currentTokenKeywordKind === SyntaxKind.InstanceOfKeyword || currentTokenKeywordKind === SyntaxKind.InKeyword) {
                currentTokenKind = currentTokenKeywordKind;
            }

            // Check for binary expressions.
            if (SyntaxFacts.isBinaryExpressionOperatorToken(currentTokenKind)) {
                // also, if it's the 'in' operator, only allow if our caller allows it.
                if (currentTokenKind === SyntaxKind.InKeyword && !allowIn) {
                    break;
                }

                var binaryExpressionKind = SyntaxFacts.getBinaryExpressionFromOperatorToken(currentTokenKind);
                var newPrecedence = Parser.getPrecedence(binaryExpressionKind);

                // All binary operators must have precedence > 0!
                Debug.assert(newPrecedence > 0);

                // Check the precedence to see if we should "take" this operator
                if (newPrecedence < precedence) {
                    break;
                }

                // Same precedence, but not right-associative -- deal with this higher up in our stack "later"
                if (newPrecedence === precedence && !this.isRightAssociative(binaryExpressionKind)) {
                    break;
                }

                // Precedence is okay, so we'll "take" this operator.
                var operatorToken = this.eatAnyToken();
                leftOperand = new BinaryExpressionSyntax(binaryExpressionKind, leftOperand, operatorToken, this.parseSubExpression(newPrecedence, allowIn));
                continue;
            }

            // Now check for conditional expression.
            // Only consume this as a ternary expression if our precedence is higher than the ternary 
            // level.  i.e. if we have "!f ? a : b" then we would not want to 
            // consume the "?" as part of "f" because the precedence of "!" is far too high.  However,
            // if we have: "x = f ? a : b", then we would want to consume the "?" as part of "f".
            //
            // Note: if we have "m = f ? x ? y : z : b, then we do want the second "?" to go with 'x'.
            if (currentTokenKind === SyntaxKind.QuestionToken && precedence <= ParserExpressionPrecedence.ConditionalExpressionPrecedence) {
                var questionToken = this.eatToken(SyntaxKind.QuestionToken);

                var whenTrueExpression = this.parseAssignmentExpression(allowIn);
                var colon = this.eatToken(SyntaxKind.ColonToken);

                var whenFalseExpression = this.parseAssignmentExpression(allowIn);
                leftOperand = new ConditionalExpressionSyntax(leftOperand, questionToken, whenTrueExpression, colon, whenFalseExpression);
                continue;
            }

            // Not binary or ternary.  Nothing more to consume here.
            break;
        }

        return leftOperand;
    }

    private isRightAssociative(expressionKind: SyntaxKind): boolean {
        switch (expressionKind) {
            case SyntaxKind.AssignmentExpression:
            case SyntaxKind.AddAssignmentExpression:
            case SyntaxKind.SubtractAssignmentExpression:
            case SyntaxKind.MultiplyAssignmentExpression:
            case SyntaxKind.DivideAssignmentExpression:
            case SyntaxKind.ModuloAssignmentExpression:
            case SyntaxKind.AndAssignmentExpression:
            case SyntaxKind.ExclusiveOrAssignmentExpression:
            case SyntaxKind.OrAssignmentExpression:
            case SyntaxKind.LeftShiftAssignmentExpression:
            case SyntaxKind.SignedRightShiftAssignmentExpression:
            case SyntaxKind.UnsignedRightShiftAssignmentExpression:
                return true;
            default:
                return false;
        }
    }

    private parseTerm(allowInvocation: boolean, insideObjectCreation: boolean): UnaryExpressionSyntax {
        // NOTE: allowInvocation and insideObjectCreation are always the negation of the other.
        // We could remove one of them and just use the other.  However, i think this is much
        // easier to read and understand in this form.

        var term = this.parseTermWorker(insideObjectCreation);
        if (term.isMissing()) {
            return term;
        }

        return this.parsePostFixExpression(term, allowInvocation);
    }

    private parsePostFixExpression(expression: UnaryExpressionSyntax, allowInvocation: boolean): UnaryExpressionSyntax {
        Debug.assert(expression !== null);

        while (true) {
            var currentTokenKind = this.currentToken().tokenKind;
            switch (currentTokenKind) {
                case SyntaxKind.OpenParenToken:
                    if (!allowInvocation) {
                        return expression;
                    }

                    expression = new InvocationExpressionSyntax(expression, this.parseArgumentList());
                    break;

                case SyntaxKind.OpenBracketToken:
                    expression = this.parseElementAccessExpression(expression);
                    break;

                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    // Because of automatic semicolon insertion, we should only consume the ++ or -- 
                    // if it is on the same line as the previous token.
                    if (this.previousToken !== null && this.previousToken.hasTrailingNewLineTrivia()) {
                        return expression;
                    }

                    expression = new PostfixUnaryExpressionSyntax(
                        SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken(currentTokenKind), expression, this.eatAnyToken());
                    break;

                case SyntaxKind.DotToken:
                    expression = new MemberAccessExpressionSyntax(
                        expression, this.eatToken(SyntaxKind.DotToken), this.parseIdentifierName());
                    break;

                default:
                    return expression;
            }
        }
    }

    private isArgumentList(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenParenToken;
    }

    private parseArgumentList(): ArgumentListSyntax { 
        Debug.assert(this.isArgumentList());

        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var arguments = this.parseSeparatedSyntaxList(ParserListParsingState.ArgumentList_AssignmentExpressions);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);

        return new ArgumentListSyntax(openParenToken, arguments, closeParenToken);
    }

    private parseElementAccessExpression(expression: ExpressionSyntax): ElementAccessExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenBracketToken);

        var openBracketToken = this.eatToken(SyntaxKind.OpenBracketToken);
        var argumentExpression = this.parseExpression(/*allowIn:*/ true);
        var closeBracketToken = this.eatToken(SyntaxKind.CloseBracketToken);

        return new ElementAccessExpressionSyntax(expression, openBracketToken, argumentExpression, closeBracketToken);
    }

    private parseTermWorker(insideObjectCreation: boolean): UnaryExpressionSyntax {
        var currentToken = this.currentToken();

        if (insideObjectCreation) {
            // Note: if we have "new (expr..." then we want to parse that as "new (parenthesized expr)"
            // not as "new FunctionType".  This is because "new FunctionType" would look like:
            //
            //      new (Paramters) => type
            //
            // And this is just too confusing.  Plus, it is easy to work around.  They can just type:
            // "new { (Parameters): type }" instead
            //
            // Also, we disallow a ConstructorType inside an object creation expression.  Otherwise
            // we'd end up allowing: 
            //
            //      new new (Parameters) => Type.
            //
            // And this is just too confusing.  Plus, it is easy to work around.  They can just type:
            // "new { new (Parameters): ReturnType }" instead.

            if (this.isType(/*allowFunctionType:*/ false, /*allowConstructorType:*/ false)) {
                // There's a lot of ambiguity in the language between typescript arrays, and javascript
                // indexing.  For example, you can say: "new Foo[]".  In which case that new's up a foo 
                // array.  Or you can say "new Foo[i]".  which accesses the i'th element of Foo and calls
                // the construct operator on it. So, in this case, if we're parsing a 'new', we do allow
                // seeing brackets, but only if they're *complete*.  
                return this.parseType(/*requireCompleteArraySuffix:*/ true);
            }
        }

        // ERROR RECOVERY TWEAK:
        // If we see a standalong => try to parse it as an arrow function as that's likely what
        // the user intended to write.
        if (currentToken.tokenKind === SyntaxKind.EqualsGreaterThanToken) {
            return this.parseSimpleArrowFunctionExpression();
        }

        if (this.isIdentifier(currentToken)) {
            if (this.isSimpleArrowFunctionExpression()) {
                return this.parseSimpleArrowFunctionExpression();
            }
            else {
                var identifier = this.eatIdentifierToken();
                return new IdentifierNameSyntax(identifier);
            }
        }

        var currentTokenKind = currentToken.tokenKind;
        var currentTokenKeywordKind = currentToken.keywordKind();
        switch (currentTokenKeywordKind) {
            case SyntaxKind.ThisKeyword:
                return this.parseThisExpression();

            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return this.parseLiteralExpression(SyntaxKind.BooleanLiteralExpression);

            case SyntaxKind.NullKeyword:
                return this.parseLiteralExpression(SyntaxKind.NullLiteralExpression);

            case SyntaxKind.NewKeyword:
                return this.parseObjectCreationExpression();

            case SyntaxKind.FunctionKeyword:
                return this.parseFunctionExpression();

            case SyntaxKind.SuperKeyword:
                return this.parseSuperExpression();

            case SyntaxKind.TypeOfKeyword:
                return this.parseTypeOfExpression();

            case SyntaxKind.DeleteKeyword:
                return this.parseDeleteExpression();

            case SyntaxKind.VoidKeyword:
                return this.parseVoidExpression();
        }

        switch (currentTokenKind) {
            case SyntaxKind.NumericLiteral:
                return this.parseLiteralExpression(SyntaxKind.NumericLiteralExpression);

            case SyntaxKind.RegularExpressionLiteral:
                return this.parseLiteralExpression(SyntaxKind.RegularExpressionLiteralExpression);

            case SyntaxKind.StringLiteral:
                return this.parseLiteralExpression(SyntaxKind.StringLiteralExpression);

            case SyntaxKind.OpenBracketToken:
                return this.parseArrayLiteralExpression();

            case SyntaxKind.OpenBraceToken:
                return this.parseObjectLiteralExpression();

            case SyntaxKind.OpenParenToken:
                return this.parseParenthesizedOrArrowFunctionExpression();

            case SyntaxKind.LessThanToken:
                return this.parseCastExpression();

            case SyntaxKind.SlashToken:
            case SyntaxKind.SlashEqualsToken:
                // If we see a standalone / or /= and we're expecting a term, then try to reparse
                // it as a regular expression.  If we succeed, then return that.  Otherwise, fall
                // back and just return a missing identifier as usual.  We'll then form a binary
                // expression out of of the / as usual.
                var result = this.tryReparseDivideAsRegularExpression();
                if (result !== null) {
                    return result;
                }
                break;
        }

        // Nothing else worked, just try to consume an identifier so we report an error.
        return new IdentifierNameSyntax(this.eatIdentifierToken());
    }

    private tryReparseDivideAsRegularExpression(): LiteralExpressionSyntax {
        // If we see a / or /= token, then that may actually be the start of a regex in certain 
        // contexts.

        var currentToken = this.currentToken();
        var currentTokenKind = currentToken.tokenKind;
        Debug.assert(currentTokenKind === SyntaxKind.SlashToken || currentTokenKind === SyntaxKind.SlashEqualsToken);

        // There are several contexts where we could never see a regex.  Don't even bother 
        // reinterpretting the / in these contexts.
        if (this.previousToken !== null) {
            var previousTokenKind = this.previousToken.tokenKind;
            switch (previousTokenKind) {
                case SyntaxKind.IdentifierNameToken:
                    // Could be a keyword or identifier.  Regular expressions can't follow identifiers.
                    // And they also can't follow some keywords.

                    var previousTokenKeywordKind = this.previousToken.keywordKind();
                    if (previousTokenKeywordKind === SyntaxKind.None ||
                        previousTokenKeywordKind === SyntaxKind.ThisKeyword ||
                        previousTokenKeywordKind === SyntaxKind.TrueKeyword ||
                        previousTokenKeywordKind === SyntaxKind.FalseKeyword) {
                        // A regular expression can't follow a normal identifier (or this/true/false). 
                        // This must be a divide.
                        return null;
                    }

                    // A regular expression could follow other keywords.  i.e. "return /blah/;"
                    break;

                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.CloseBracketToken:
                case SyntaxKind.CloseBraceToken:
                    // A regular expression can't follow any of these.  It must be a divide. Note: this
                    // list *may* be incorrect (especially in the context of typescript).  We need to
                    // carefully review it.
                    return null;

                // case SyntaxKind.CloseParenToken:
                // It is tempting to say that if we have a slash after a close paren that it can't be 
                // a regular expression.  after all, the normal case where we see that is "(1 + 2) / 3".
                // However, it can appear in legal code.  Specifically:
                //
                //      for (...)
                //          /regex/.Stuff...
                //
                // So we have to see if we can get a regular expression in that case.
            }
        }

        // Ok, from our quick lexical check, this could be a place where a regular expression could
        // go.  Now we have to do a bunch of work.

        // First, we're going to rewind all our data to the point where this / or /= token started.
        // That's because if it does turn out to be a regular expression, then any tokens or token 
        // diagnostics we produced after the original / may no longer be valid.  This would actually
        // be a  fairly expected case.  For example, if you had:  / ... gibberish ... /, we may have 
        // produced several diagnostics in the process of scanning the tokens after the first / as
        // they may not have been legal javascript okens.
        //
        // We also need to remove all the tokesn we've gotten from the slash and onwards.  They may
        // not have been what the scanner would have produced if it decides that this is actually
        // a regular expresion.

        // First, remove any diagnostics that came from the slash or afterwards.
        var slashTokenFullStart = this.currentTokenFullStart;
        var tokenDiagnosticsLength = this.tokenDiagnostics.length;
        while (tokenDiagnosticsLength > 0) {
            var diagnostic = this.tokenDiagnostics[tokenDiagnosticsLength - 1];
            if (diagnostic.position() >= slashTokenFullStart) {
                tokenDiagnosticsLength--;
            }
            else {
                break;
            }
        }

        this.tokenDiagnostics.length = tokenDiagnosticsLength;

        // Now, tell our sliding window to throw away all tokens from the / onwards (including the /).
        this.disgardAllItemsFromCurrentIndexOnwards();

        // Our cached currentToken is no longer value.
        // Note: previousToken is still valid. 
        this._currentToken = null;

        // Now tell the scanner to reset its position to the start of the / token as well.  That way
        // when we try to scan the next item, we'll be at the right location.
        this.scanner.setAbsoluteIndex(slashTokenFullStart);

        // Now try to retrieve the current token again.  This time, allow the scanner to consider it
        // as a regular expression
        currentToken = this.currentTokenAllowingRegularExpression();

        // Note: we *must* have gotten a /, /= or regular expression.  Or else something went *very*
        // wrong with our logic above.
        Debug.assert(currentToken.tokenKind === SyntaxKind.SlashToken ||
                     currentToken.tokenKind === SyntaxKind.SlashEqualsToken ||
                     currentToken.tokenKind === SyntaxKind.RegularExpressionLiteral);
        
        if (currentToken.tokenKind === SyntaxKind.SlashToken || currentToken.tokenKind === SyntaxKind.SlashEqualsToken) {
            // Still came back as a / or /=.   This is not a regular expression literal.
            return null;
        }
        else if (currentToken.tokenKind === SyntaxKind.RegularExpressionLiteral) {
            return this.parseLiteralExpression(SyntaxKind.RegularExpressionLiteralExpression);
        }
        else {
            // Something *very* wrong happened.  This is an internal parser fault that we need 
            // to figure out and fix.
            throw Errors.invalidOperation();
        }
    }

    private parseTypeOfExpression(): TypeOfExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.TypeOfKeyword);

        var typeOfKeyword = this.eatKeyword(SyntaxKind.TypeOfKeyword);
        var expression = this.parseUnaryExpression();

        return new TypeOfExpressionSyntax(typeOfKeyword, expression);
    }

    private parseDeleteExpression(): DeleteExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.DeleteKeyword);

        var deleteKeyword = this.eatKeyword(SyntaxKind.DeleteKeyword);
        var expression = this.parseUnaryExpression();

        return new DeleteExpressionSyntax(deleteKeyword, expression);
    }

    private parseVoidExpression(): VoidExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.VoidKeyword);

        var voidKeyword = this.eatKeyword(SyntaxKind.VoidKeyword);
        var expression = this.parseUnaryExpression();

        return new VoidExpressionSyntax(voidKeyword, expression);
    }

    private parseSuperExpression(): SuperExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.SuperKeyword);
        
        var superKeyword = this.eatKeyword(SyntaxKind.SuperKeyword);
        return new SuperExpressionSyntax(superKeyword);
    }

    private parseFunctionExpression(): FunctionExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.FunctionKeyword);

        var functionKeyword = this.eatKeyword(SyntaxKind.FunctionKeyword);
        var identifier: ISyntaxToken = null;
        
        if (this.isIdentifier(this.currentToken())) {
            identifier = this.eatIdentifierToken();
        }

        var callSignature = this.parseCallSignature();
        var block = this.parseBlock();

        return new FunctionExpressionSyntax(functionKeyword, identifier, callSignature, block);
    }

    private parseCastExpression(): CastExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.LessThanToken);

        var lessThanToken = this.eatToken(SyntaxKind.LessThanToken);
        var type = this.parseType(/*requireCompleteArraySuffix:*/ false);
        var greaterThanToken = this.eatToken(SyntaxKind.GreaterThanToken);
        var expression = this.parseUnaryExpression();

        return new CastExpressionSyntax(lessThanToken, type, greaterThanToken, expression);
    }

    private parseObjectCreationExpression(): ObjectCreationExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.NewKeyword);
        var newKeyword = this.eatKeyword(SyntaxKind.NewKeyword);

        // While parsing the sub term we don't want to allow invocations to be parsed.  that's because
        // we want "new Foo()" to parse as "new Foo()" (one node), not "new (Foo())".
        var expression = this.parseTerm(/*allowInvocation:*/ false, /*insideObjectCreation:*/ true);

        var argumentList: ArgumentListSyntax = null;
        if (this.isArgumentList()) {
            argumentList = this.parseArgumentList();
        }

        return new ObjectCreationExpressionSyntax(newKeyword, expression, argumentList);
    }

    private parseParenthesizedOrArrowFunctionExpression(): UnaryExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenParenToken);

            var result = this.tryParseArrowFunctionExpression();
            if (result !== null) {
                return result;
            }

        // Doesn't look like an arrow function, so parse this as a parenthesized expression.
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var expression = this.parseExpression(/*allowIn:*/ true);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);

        return new ParenthesizedExpressionSyntax(openParenToken, expression, closeParenToken);
    }

    private tryParseArrowFunctionExpression(): ArrowFunctionExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenParenToken);

        // Because arrow functions and parenthesized expressions look similar, we have to check far
        // enough ahead to be sure we've actually got an arrow function.

        // First, check for things that definitely have enough information to let us know it's an
        // arrow function.

        if (this.isDefinitelyArrowFunctionExpression()) {
            return this.parseParenthesizedArrowFunctionExpression(/*requiresArrow:*/ false);
        }

        // Now, look for cases where we're sure it's not an arrow function.  This will help save us
        // a costly parse.
        if (!this.isPossiblyArrowFunctionExpression()) {
            return null;
        }

        // Then, try to actually parse it as a arrow function, and only return if we see an => 
        var rewindPoint = this.getRewindPoint();
        try {
            var arrowFunction = this.parseParenthesizedArrowFunctionExpression(/*requiresArrow:*/ true);
            if (arrowFunction === null) {
                this.rewind(rewindPoint);
            }
            return arrowFunction;
        }
        finally {
            this.releaseRewindPoint(rewindPoint);
        }
    }

    private parseParenthesizedArrowFunctionExpression(requireArrow: boolean): ParenthesizedArrowFunctionExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenParenToken);

        var callSignature = this.parseCallSignature();

        if (requireArrow && this.currentToken().tokenKind !== SyntaxKind.EqualsGreaterThanToken) {
            return null;
        }

        var equalsGreaterThanToken = this.eatToken(SyntaxKind.EqualsGreaterThanToken);
        var body = this.parseArrowFunctionBody();

        return new ParenthesizedArrowFunctionExpressionSyntax(callSignature, equalsGreaterThanToken, body);
    }

    private parseArrowFunctionBody(): SyntaxNode {
        if (this.isBlock()) {
            // TODO: The spec says that function declarations are not allowed.  However, we have some
            // code that uses them.  So we allow them here.
            return this.parseBlock();
        }
        else {
            return this.parseAssignmentExpression(/*allowIn:*/ true); 
        }
    }

    private isSimpleArrowFunctionExpression(): boolean {
        // ERROR RECOVERY TWEAK:
        if (this.currentToken().tokenKind === SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        return this.isIdentifier(this.currentToken()) && 
               this.peekTokenN(1).tokenKind === SyntaxKind.EqualsGreaterThanToken;
    }

    private parseSimpleArrowFunctionExpression(): SimpleArrowFunctionExpressionSyntax {
        Debug.assert(this.isSimpleArrowFunctionExpression());

        var identifier = this.eatIdentifierToken();
        var equalsGreaterThanToken = this.eatToken(SyntaxKind.EqualsGreaterThanToken);
        var body = this.parseArrowFunctionBody();

        return new SimpleArrowFunctionExpressionSyntax(
            identifier, equalsGreaterThanToken, body);
    }

    private isBlock(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenBraceToken;
    }

    private isDefinitelyArrowFunctionExpression(): boolean {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenParenToken);
        
        var token1 = this.peekTokenN(1);
        
        if (token1.tokenKind === SyntaxKind.CloseParenToken) {
            // ()
            // Definitely an arrow function.  Could never be a parenthesized expression.
            return true;
        }

        if (token1.tokenKind === SyntaxKind.DotDotDotToken) {
            // (...
            // Definitely an arrow function.  Could never be a parenthesized expression.
            return true;
        }

        if (!this.isIdentifier(token1)) {
            // All other arrow functions must start with (id
            // so this is definitely not an arrow function.
            return false;
        }

        // (id
        //
        // Lots of options here.  Check for things that make us certain it's an
        // arrow function.
        var token2 = this.peekTokenN(2);
        if (token2.tokenKind === SyntaxKind.ColonToken) {
            // (id:
            // Definitely an arrow function.  Could never be a parenthesized expression.
            return true;
        }

        var token3 = this.peekTokenN(3);
        if (token2.tokenKind === SyntaxKind.QuestionToken) {
            // (id?
            // Could be an arrow function, or a parenthesized conditional expression.

            // Check for the things that could only be arrow functions.
            if (token3.tokenKind === SyntaxKind.ColonToken ||
                token3.tokenKind === SyntaxKind.CloseParenToken ||
                token3.tokenKind === SyntaxKind.CommaToken) {
                // (id?:
                // (id?)
                // (id?,
                // These are the only cases where this could be an arrow function.
                // And none of them can be parenthesized expression.
                return true;
            }
        }

        if (token2.tokenKind === SyntaxKind.CloseParenToken) {
            // (id)
            // Could be an arrow function, or a parenthesized conditional expression.

            if (token3.tokenKind === SyntaxKind.EqualsGreaterThanToken) {
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

    private isPossiblyArrowFunctionExpression(): boolean {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenParenToken);
        
        var token1 = this.peekTokenN(1);

        if (!this.isIdentifier(token1)) {
            // All other arrow functions must start with (id
            // so this is definitely not an arrow function.
            return false;
        }

        var token2 = this.peekTokenN(2);
        if (token2.tokenKind === SyntaxKind.EqualsToken) {
            // (id =
            //
            // This *could* be an arrow function.  i.e. (id = 0) => { }
            // Or it could be a parenthesized expression.  So we'll have to actually
            // try to parse it.
            return true;
        }

        if (token2.tokenKind === SyntaxKind.CommaToken) {
            // (id,

            // This *could* be an arrow function.  i.e. (id, id2) => { }
            // Or it could be a parenthesized expression (as javascript supports
            // the comma operator).  So we'll have to actually try to parse it.
            return true;
        }

        if (token2.tokenKind === SyntaxKind.CloseParenToken) {
            // (id)
            
            var token3 = this.peekTokenN(3);
            if (token3.tokenKind === SyntaxKind.ColonToken) {
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

    private parseObjectLiteralExpression(): ObjectLiteralExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenBraceToken);

        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);
        var propertyAssignments = this.parseSeparatedSyntaxList(ParserListParsingState.ObjectLiteralExpression_PropertyAssignments);
        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);

        return new ObjectLiteralExpressionSyntax(
            openBraceToken, propertyAssignments, closeBraceToken);
    }

    private parsePropertyAssignment(): PropertyAssignmentSyntax {
        Debug.assert(this.isPropertyAssignment(/*inErrorRecovery:*/ false));
        if (this.isGetAccessorPropertyAssignment()) {
            return this.parseGetAccessorPropertyAssignment();
        }
        else if (this.isSetAccessorPropertyAssignment()) {
            return this.parseSetAccessorPropertyAssignment();
        }
        else if (this.isSimplePropertyAssignment(/*inErrorRecovery:*/ false)) {
            return this.parseSimplePropertyAssignment();
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private isPropertyAssignment(inErrorRecovery: boolean): boolean {
        return this.isGetAccessorPropertyAssignment() ||
               this.isSetAccessorPropertyAssignment() ||
               this.isSimplePropertyAssignment(inErrorRecovery);
    }

    private isGetAccessorPropertyAssignment(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.GetKeyword &&
               this.isPropertyName(this.peekTokenN(1), /*inErrorRecovery:*/ false);
    }

    private parseGetAccessorPropertyAssignment(): GetAccessorPropertyAssignmentSyntax {
        Debug.assert(this.isGetAccessorPropertyAssignment());

        var getKeyword = this.eatKeyword(SyntaxKind.GetKeyword);
        var propertyName = this.eatAnyToken();
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var block = this.parseBlock();

        return new GetAccessorPropertyAssignmentSyntax(getKeyword, propertyName, openParenToken, closeParenToken, block);
    }

    private isSetAccessorPropertyAssignment(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.SetKeyword &&
               this.isPropertyName(this.peekTokenN(1), /*inErrorRecovery:*/ false);
    }

    private parseSetAccessorPropertyAssignment(): SetAccessorPropertyAssignmentSyntax {
        Debug.assert(this.isSetAccessorPropertyAssignment());

        var setKeyword = this.eatKeyword(SyntaxKind.SetKeyword);
        var propertyName = this.eatAnyToken();
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var parameterName = this.eatIdentifierToken();
        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        var block = this.parseBlock();

        return new SetAccessorPropertyAssignmentSyntax(setKeyword, propertyName, openParenToken, parameterName, closeParenToken, block);
    }

    private isSimplePropertyAssignment(inErrorRecovery: boolean): boolean {
        return this.isPropertyName(this.currentToken(), inErrorRecovery);
    }

    private parseSimplePropertyAssignment(): SimplePropertyAssignmentSyntax {
        Debug.assert(this.isSimplePropertyAssignment(/*inErrorRecovery:*/ false));

        var propertyName = this.eatAnyToken();
        var colonToken = this.eatToken(SyntaxKind.ColonToken);
        var expression = this.parseAssignmentExpression(/*allowIn:*/ true);

        return new SimplePropertyAssignmentSyntax(propertyName, colonToken, expression);
    }

    private isPropertyName(token: ISyntaxToken, inErrorRecovery: boolean): boolean {
        // NOTE: we do *not* want to check "this.isIdentifier" here.  Any IdentifierNameToken is 
        // allowed here, even reserved words like keywords.
        switch (token.tokenKind) {
            case SyntaxKind.IdentifierNameToken:
                // Except: if we're in error recovery, then we don't want to consider keywords. 
                // After all, if we have:
                //
                //      { a: 1
                //      return
                //
                // we don't want consider 'return' to be the next property in the object literal.
                if (inErrorRecovery) {
                    return !this.isKeyword(token.keywordKind());
                }
                else {
                    return true;
                }

            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                return true;

            default:
                return false;
        }
    }

    private parseArrayLiteralExpression(): ArrayLiteralExpressionSyntax {
        Debug.assert(this.currentToken().tokenKind === SyntaxKind.OpenBracketToken);

        var openBracketToken = this.eatToken(SyntaxKind.OpenBracketToken);
        var expressions = this.parseSeparatedSyntaxList(ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions);
        var closeBracketToken = this.eatToken(SyntaxKind.CloseBracketToken);

        return new ArrayLiteralExpressionSyntax(openBracketToken, expressions, closeBracketToken);
    }

    private parseLiteralExpression(expressionKind: SyntaxKind): LiteralExpressionSyntax {
        // TODO: add appropriate asserts here.
        var literal = this.eatAnyToken();
        return new LiteralExpressionSyntax(expressionKind, literal);
    }

    private parseThisExpression(): ThisExpressionSyntax {
        Debug.assert(this.currentToken().keywordKind() === SyntaxKind.ThisKeyword);
        var thisKeyword = this.eatKeyword(SyntaxKind.ThisKeyword);
        return new ThisExpressionSyntax(thisKeyword);
    }

    private parseBlock(): BlockSyntax {
        var openBraceToken = this.eatToken(SyntaxKind.OpenBraceToken);

        var statements: ISyntaxList = SyntaxList.empty;

        if (!openBraceToken.isMissing()) {
            var savedIsInStrictMode = this.isInStrictMode;
            statements = this.parseSyntaxList(ParserListParsingState.Block_Statements, Parser.updateStrictModeState);
            this.isInStrictMode = savedIsInStrictMode;
        }

        var closeBraceToken = this.eatToken(SyntaxKind.CloseBraceToken);

        return new BlockSyntax(openBraceToken, statements, closeBraceToken);
    }

    private parseCallSignature(): CallSignatureSyntax {
        var parameterList = this.parseParameterList();
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        return new CallSignatureSyntax(parameterList, typeAnnotation);
    }

    private parseParameterList(): ParameterListSyntax {
        var openParenToken = this.eatToken(SyntaxKind.OpenParenToken);
        var parameters: ISeparatedSyntaxList = SeparatedSyntaxList.empty;
        
        if (!openParenToken.isMissing()) {
            parameters = this.parseSeparatedSyntaxList(ParserListParsingState.ParameterList_Parameters);
        }

        var closeParenToken = this.eatToken(SyntaxKind.CloseParenToken);
        return new ParameterListSyntax(openParenToken, parameters, closeParenToken);
    }

    private isTypeAnnotation(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.ColonToken;
    }

    private parseOptionalTypeAnnotation(): TypeAnnotationSyntax {
        return this.isTypeAnnotation()
            ? this.parseTypeAnnotation()
            : null;
    }

    private parseTypeAnnotation(): TypeAnnotationSyntax {
        Debug.assert(this.isTypeAnnotation());

        var colonToken = this.eatToken(SyntaxKind.ColonToken);
        var type = this.parseType(/*requireCompleteArraySuffix:*/ false);

        return new TypeAnnotationSyntax(colonToken, type);
    }

    private isType(allowFunctionType: boolean, allowConstructorType: boolean): boolean {
        return this.isPredefinedType() ||
               this.isTypeLiteral(allowFunctionType, allowConstructorType) ||
               this.isName();
    }

    private parseType(requireCompleteArraySuffix: boolean): TypeSyntax {
        var type = this.parseNonArrayType();

        while (this.currentToken().tokenKind === SyntaxKind.OpenBracketToken) {
            if (requireCompleteArraySuffix && this.peekTokenN(1).tokenKind !== SyntaxKind.CloseBracketToken) {
                break;
            }

            var openBracketToken = this.eatToken(SyntaxKind.OpenBracketToken);
            var closeBracketToken = this.eatToken(SyntaxKind.CloseBracketToken);

            type = new ArrayTypeSyntax(type, openBracketToken, closeBracketToken);
        }

        return type;
    }

    private parseNonArrayType(): TypeSyntax {
        if (this.isPredefinedType()) {
            return this.parsePredefinedType();
        }
        else if (this.isTypeLiteral(/*allowFunctionType:*/ true, /*allowConstructorType:*/ true)) {
            return this.parseTypeLiteral();
        }
        else {
            return this.parseName();
        }
    }

    private parseTypeLiteral(): TypeSyntax {
        Debug.assert(this.isTypeLiteral(/*allowFunctionType:*/ true, /*allowConstructorType:*/ true));
        if (this.isObjectType()) {
            return this.parseObjectType();
        }
        else if (this.isFunctionType()) {
            return this.parseFunctionType();
        }
        else if (this.isConstructorType()) {
            return this.parseConstructorType();
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    private parseFunctionType(): FunctionTypeSyntax {
        Debug.assert(this.isFunctionType());

        var parameterList = this.parseParameterList();
        var equalsGreaterThanToken = this.eatToken(SyntaxKind.EqualsGreaterThanToken);
        var returnType = this.parseType(/*requireCompleteArraySuffix:*/ false);

        return new FunctionTypeSyntax(parameterList, equalsGreaterThanToken, returnType);
    }

    private parseConstructorType(): ConstructorTypeSyntax {
        Debug.assert(this.isConstructorType());

        var newKeyword = this.eatKeyword(SyntaxKind.NewKeyword);
        var parameterList = this.parseParameterList();
        var equalsGreaterThanToken = this.eatToken(SyntaxKind.EqualsGreaterThanToken);
        var type = this.parseType(/*requreCompleteArraySuffix:*/ false);

        return new ConstructorTypeSyntax(newKeyword, parameterList, equalsGreaterThanToken, type);
    }

    private isTypeLiteral(allowFunctionType: boolean, allowConstructorType: boolean): boolean {
        if (this.isObjectType()) {
            return true;
        }

        if (allowFunctionType && this.isFunctionType()) {
            return true;
        }

        if (allowConstructorType && this.isConstructorType()) {
            return true;
        }

        return false;
    }

    private isObjectType(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenBraceToken;
    }

    private isFunctionType(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.OpenParenToken;
    }

    private isConstructorType(): boolean {
        return this.currentToken().keywordKind() === SyntaxKind.NewKeyword;
    }

    private parsePredefinedType(): PredefinedTypeSyntax {
        Debug.assert(this.isPredefinedType());
        var keyword = this.eatAnyToken();
        return new PredefinedTypeSyntax(keyword);
    }

    private isPredefinedType(): boolean {
        switch (this.currentToken().keywordKind()) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BoolKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.VoidKeyword:
                return true;
        }

        return false;
    }

    private isParameter(): boolean {
        var token = this.currentToken();
        if (token.tokenKind === SyntaxKind.DotDotDotToken) {
            return true;
        }

        if (token.keywordKind() === SyntaxKind.PublicKeyword ||
            token.keywordKind() === SyntaxKind.PrivateKeyword) {
            return true;
        }

        return this.isIdentifier(token);
    }

    private parseParameter(): ParameterSyntax {
        var dotDotDotToken = this.tryEatToken(SyntaxKind.DotDotDotToken);

        var publicOrPrivateToken: ISyntaxToken = null;
        if (this.currentToken().keywordKind() === SyntaxKind.PublicKeyword ||
            this.currentToken().keywordKind() === SyntaxKind.PrivateKeyword) {
            publicOrPrivateToken = this.eatAnyToken();
        }

        var identifier = this.eatIdentifierToken();
        var questionToken = this.tryEatToken(SyntaxKind.QuestionToken);        
        var typeAnnotation = this.parseOptionalTypeAnnotation();

        var equalsValueClause: EqualsValueClauseSyntax = null;
        if (this.isEqualsValueClause()) {
            equalsValueClause = this.parseEqualsValuesClause(/*allowIn:*/ true);
        }

        return new ParameterSyntax(dotDotDotToken, publicOrPrivateToken, identifier, questionToken, typeAnnotation, equalsValueClause);
    }

    private parseSyntaxList(currentListType: ParserListParsingState,
                            processItems: (parser: Parser, items: any[]) => void = null): ISyntaxList {
        var savedListParsingState = this.listParsingState;
        this.listParsingState |= currentListType;

        var result = this.parseSyntaxListWorker(currentListType, processItems);

        this.listParsingState = savedListParsingState;

        return result;
    }

    private parseSeparatedSyntaxList(currentListType: ParserListParsingState): ISeparatedSyntaxList {
        var savedListParsingState = this.listParsingState;
        this.listParsingState |= currentListType;

        var result = this.parseSeparatedSyntaxListWorker(currentListType);

        this.listParsingState = savedListParsingState;

        return result;
    }

    // Returns true if we should abort parsing the list.
    private abortParsingListOrMoveToNextToken(currentListType: ParserListParsingState, itemCount: number): boolean {
        // Ok.  It wasn't a terminator and it wasn't the start of an item in the list. 
        // Definitely report an error for this token.
        this.reportUnexpectedTokenDiagnostic(currentListType);

        // Now, check if the token is the end of one our parent lists, or the start of an item 
        // in one of our parent lists.  If so, we won't want to consume the token.  We've 
        // already reported the error, so just return to our caller so that a higher up 
        // production can consume it.
        for (var state = ParserListParsingState.LastListParsingState;
             state >= ParserListParsingState.FirstListParsingState;
             state >>= 1) {

            if ((this.listParsingState & state) !== 0) {
                if (this.isExpectedListTerminator(state, itemCount) || this.isExpectedListItem(state, /*inErrorRecovery:*/ true)) {
                    return true;
                }
            }
        }

        // Otherwise, if none of the lists we're in can capture this token, then we need to 
        // unilaterally skip it.  Note: we've already reported the error.
        var token = this.currentToken();
        this.skippedTokens.push({ skippedToken: token, owningToken: this.previousToken });

        // Consume this token and move onto the next item in the list.
        this.moveToNextToken();
        return false;
    }

    private tryParseExpectedListItem(currentListType: ParserListParsingState,
                                     inErrorRecovery: boolean,
                                     items: any[],
                                     processItems: (parser: Parser, items: any[]) => void): any[] {
        if (this.isExpectedListItem(currentListType, inErrorRecovery)) {
            var item = this.parseExpectedListItem(currentListType);
            Debug.assert(item !== null);

            items = items || [];
            items.push(item);

            if (processItems !== null) {
                processItems(this, items);
            }
        }

        return items;
    }

    private listIsTerminated(currentListType: ParserListParsingState, itemCount: number): boolean {
        return this.isExpectedListTerminator(currentListType, itemCount) ||
               this.currentToken().tokenKind === SyntaxKind.EndOfFileToken;
    }

    private parseSyntaxListWorker(currentListType: ParserListParsingState,
                                  processItems: (parser: Parser, items: any[]) => void): ISyntaxList {
        var items: any[] = null;

        while (true) {
            // First check ifthe list is complete already.  If so, we're done.  Also, if we see an 
            // EOF then definitely stop.  We'll report the error higher when our caller tries to
            // consume the next token.
            var itemsCount = items === null ? 0 : items.length;
            if (this.listIsTerminated(currentListType, itemsCount)) {
                break
            }

            // Try to parse an item of the list.  If we fail then decide if we need to abort or 
            // continue parsing.
            items = this.tryParseExpectedListItem(currentListType, /*inErrorRecovery:*/ false, items, processItems);
            if (items !== null && items.length > itemsCount) {
                continue;
            }

            var abort = this.abortParsingListOrMoveToNextToken(currentListType, itemsCount);
            if (abort) {
                break;
            }

            // Continue parsing the list.
        }

        return SyntaxList.create(items);
    }

    private parseSeparatedSyntaxListWorker(currentListType: ParserListParsingState): ISeparatedSyntaxList {
        var items: any[] = null;

        var allowTrailingSeparator = this.allowsTrailingSeparator(currentListType);
        var allowAutomaticSemicolonInsertion = this.allowsAutomaticSemicolonInsertion(currentListType);
        var requiresAtLeastOneItem = this.requiresAtLeastOneItem(currentListType);
        var separatorKind = this.separatorKind(currentListType);

        var lastSeparator: ISyntaxToken = null;
        var inErrorRecovery = false;
        while (true) {
            var itemsCount = items === null ? 0 : items.length;
            if (this.listIsTerminated(currentListType, itemsCount)) {

                // We've reached the end of the list.  If there was a last separator and we don't 
                // allow trailing separators, then report an error.  But don't report an error if
                // the separator is missing.  We'll have already reported it.
                if (lastSeparator !== null && !allowTrailingSeparator && !lastSeparator.isMissing()) {
                    Debug.assert(this.previousToken === lastSeparator);
                    this.addDiagnostic(new SyntaxDiagnostic(
                        this.previousTokenStart(), lastSeparator.width(), DiagnosticCode.Trailing_separator_not_allowed, null));
                }

                break;
            }

            lastSeparator = null;
            items = this.tryParseExpectedListItem(currentListType, inErrorRecovery, items, null);
            inErrorRecovery = false;
            
            if (items !== null && items.length > itemsCount) {
                // We got an item and added it to our list.  If the next token is an explicit 
                // separator, then add it to the list.

                if (this.currentToken().tokenKind !== separatorKind) {
                    // We didn't see a separator.  There could be a few reasons for this.  First, 
                    // we're at the terminator of the list and we're supposed to stop.  Or, second, 
                    // the list allows for automatic semicolon insertion and we can east one here.

                    // Note: this order is important.  Say we have:
                    //      {
                    //          a       // <-- just finished parsing 'a'
                    //      }
                    //
                    // Automatic semicolon insertion rules state: "When, as the program is parsed from
                    // left to right, a token (called the offending token) is encountered that is not 
                    // allowed by any production of the grammar".  So we should only ever insert a 
                    // semicolon if we couldn't consume something normally.  in the above case, we can
                    // consume the '}' just fine.  So ASI doesn't apply.

                    if (this.listIsTerminated(currentListType, items.length)) {
                        // The list is done.  Return what we've got now.
                        break;
                    }

                    if (allowAutomaticSemicolonInsertion && this.canEatAutomaticSemicolon(/*allowWithoutNewline:*/ false)) {
                        lastSeparator = this.eatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
                        items.push(lastSeparator);
                        continue;
                    }
                }

                // We're either at a real separator already that we should parse out.  Or we weren't
                // at one, but none of our fallback cases worked.  However, the list still requires
                // a separator, so we need to parse it an error version here.

                // Consume the last separator and continue.
                lastSeparator = this.eatToken(separatorKind);
                items.push(lastSeparator);
                
                // Mark if we actually successfully consumed the separator or not.  If not then 
                // we're in 'error recovery' mode and we make tweak some parsing rules as 
                // appropriate.  For example, if we have:
                //
                //      var v = { a
                //      return
                //
                // Then we'll be missing the comma.  As such, we want to parse 'return' in a less
                // tolerant manner.  Normally 'return' could be a property in an object literal.
                // However, in error recovery mode, we do *not* want it to be.
                inErrorRecovery = lastSeparator.isMissing();
                continue;
            }

            // We failed to parse an item.  Decide if we need to abort, or move to the next token.
            var abort = this.abortParsingListOrMoveToNextToken(currentListType, itemsCount);
            if (abort) {
                break;
            }
        }

        // If this list requires at least one argument, then report an error if we haven't gotten
        // any.
        if (requiresAtLeastOneItem && (items === null || items.length === 0)) {
            this.reportUnexpectedTokenDiagnostic(currentListType);
        }

        return SeparatedSyntaxList.create(items);
    }

    private allowsTrailingSeparator(currentListType: ParserListParsingState): boolean {
        switch (currentListType) {
            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
            case ParserListParsingState.ObjectType_TypeMembers:
            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return true;
            
            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
            case ParserListParsingState.ParameterList_Parameters:
                // TODO: It would be great to allow trailing separators for parameters.
                return false;

            case ParserListParsingState.SourceUnit_ModuleElements:
            case ParserListParsingState.ClassDeclaration_ClassElements:
            case ParserListParsingState.ModuleDeclaration_ModuleElements:
            case ParserListParsingState.SwitchStatement_SwitchClauses:
            case ParserListParsingState.SwitchClause_Statements:
            case ParserListParsingState.Block_Statements:
            default:
                throw Errors.notYetImplemented();
        }
    }

    private requiresAtLeastOneItem(currentListType: ParserListParsingState): boolean {
        switch (currentListType) {
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
                return true;
            
            case ParserListParsingState.ObjectType_TypeMembers:
            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
            case ParserListParsingState.ParameterList_Parameters:
            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return false;

            case ParserListParsingState.SourceUnit_ModuleElements:
            case ParserListParsingState.ClassDeclaration_ClassElements:
            case ParserListParsingState.ModuleDeclaration_ModuleElements:
            case ParserListParsingState.SwitchStatement_SwitchClauses:
            case ParserListParsingState.SwitchClause_Statements:
            case ParserListParsingState.Block_Statements:
            default:
                throw Errors.notYetImplemented();
        }
    }

    private allowsAutomaticSemicolonInsertion(currentListType: ParserListParsingState): boolean {
        switch (currentListType) {
            case ParserListParsingState.ObjectType_TypeMembers:
                return true;
            
            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
            case ParserListParsingState.ParameterList_Parameters:
            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return false;

            case ParserListParsingState.SourceUnit_ModuleElements:
            case ParserListParsingState.ClassDeclaration_ClassElements:
            case ParserListParsingState.ModuleDeclaration_ModuleElements:
            case ParserListParsingState.SwitchStatement_SwitchClauses:
            case ParserListParsingState.SwitchClause_Statements:
            case ParserListParsingState.Block_Statements:
            default:
                throw Errors.notYetImplemented();
        }
    }

    private separatorKind(currentListType: ParserListParsingState): SyntaxKind {
        switch (currentListType) {
            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
            case ParserListParsingState.ParameterList_Parameters:
            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return SyntaxKind.CommaToken;

            case ParserListParsingState.ObjectType_TypeMembers:
                return SyntaxKind.SemicolonToken;

            case ParserListParsingState.SourceUnit_ModuleElements:
            case ParserListParsingState.ClassDeclaration_ClassElements:
            case ParserListParsingState.ModuleDeclaration_ModuleElements:
            case ParserListParsingState.SwitchStatement_SwitchClauses:
            case ParserListParsingState.SwitchClause_Statements:
            case ParserListParsingState.Block_Statements:
            default:
                throw Errors.notYetImplemented();
        }
    }

    private existingDiagnosticAtPosition(position: number): boolean {
        return this.diagnostics.length > 0 &&
            this.diagnostics[this.diagnostics.length - 1].position() === position;
    }

    private reportUnexpectedTokenDiagnostic(listType: ParserListParsingState): void {
        var token = this.currentToken();

        var diagnostic = new SyntaxDiagnostic(
            this.currentTokenStart(), token.width(), DiagnosticCode.Unexpected_token__0_expected, [this.getExpectedListElementType(listType)]);
        this.addDiagnostic(diagnostic);
    }

    private addDiagnostic(diagnostic: SyntaxDiagnostic): void {
        // Except: if we already have a diagnostic for this position, don't report another one.
        if (this.diagnostics.length > 0 &&
            this.diagnostics[this.diagnostics.length - 1].position() === diagnostic.position()) {
            return;
        }

        this.diagnostics.push(diagnostic);
    }

    private isExpectedListTerminator(currentListType: ParserListParsingState, itemCount: number): boolean {
        switch (currentListType) {
            case ParserListParsingState.SourceUnit_ModuleElements:
                return this.isExpectedSourceUnit_ModuleElementsTerminator();

            case ParserListParsingState.ClassDeclaration_ClassElements:
                return this.isExpectedClassDeclaration_ClassElementsTerminator();

            case ParserListParsingState.ModuleDeclaration_ModuleElements:
                return this.isExpectedModuleDeclaration_ModuleElementsTerminator();

            case ParserListParsingState.SwitchStatement_SwitchClauses:
                return this.isExpectedSwitchStatement_SwitchClausesTerminator();

            case ParserListParsingState.SwitchClause_Statements:
                return this.isExpectedSwitchClause_StatementsTerminator();

            case ParserListParsingState.Block_Statements:
                return this.isExpectedBlock_StatementsTerminator();

            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
                return this.isExpectedEnumDeclaration_VariableDeclaratorsTerminator();

            case ParserListParsingState.ObjectType_TypeMembers:
                return this.isExpectedObjectType_TypeMembersTerminator();
            
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
                return this.isExpectedArgumentList_AssignmentExpressionsTerminator();

            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
                return this.isExpectedExtendsOrImplementsClause_TypeNameListTerminator();
            
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
                return this.isExpectedVariableDeclaration_VariableDeclarators_AllowInTerminator(itemCount);

            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
                return this.isExpectedVariableDeclaration_VariableDeclarators_DisallowInTerminator();

            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
                return this.isExpectedObjectLiteralExpression_PropertyAssignmentsTerminator();
            
            case ParserListParsingState.ParameterList_Parameters:
                return this.isExpectedParameterList_ParametersTerminator();

            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return this.isExpectedLiteralExpression_AssignmentExpressionsTerminator();
                
            default:
                throw Errors.invalidOperation();
        }
    }

    private isExpectedSourceUnit_ModuleElementsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.EndOfFileToken;
    }

    private isExpectedEnumDeclaration_VariableDeclaratorsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedModuleDeclaration_ModuleElementsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedObjectType_TypeMembersTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedObjectLiteralExpression_PropertyAssignmentsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedLiteralExpression_AssignmentExpressionsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBracketToken;
    }

    private isExpectedParameterList_ParametersTerminator(): boolean {
        var token = this.currentToken();
        if (token.tokenKind === SyntaxKind.CloseParenToken) {
            return true;
        }

        // We may also see a { in an error case.  i.e.:
        // function (a, b, c  {
        if (token.tokenKind === SyntaxKind.OpenBraceToken) {
            return true;
        }

        // We may also see a => in an error case.  i.e.:
        // (f: number => { ... }
        if (token.tokenKind === SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        return false;
    }

    private isExpectedVariableDeclaration_VariableDeclarators_DisallowInTerminator(): boolean {
        // This is the case when we're parsing variable declarations in a for/for-in statement.
        if (this.currentToken().tokenKind === SyntaxKind.SemicolonToken ||
            this.currentToken().tokenKind === SyntaxKind.CloseParenToken) {
            return true;
        }

        if (this.currentToken().keywordKind() === SyntaxKind.InKeyword) {
            return true;
        }

        return false;
    }

    private isExpectedVariableDeclaration_VariableDeclarators_AllowInTerminator(itemCount: number): boolean {
        //// This is the case when we're parsing variable declarations in a variable statement.

        // If we just parsed a comma, then we can't terminate this list.  i.e.:
        //      var a = bar, // <-- just consumed the comma
        //          b = baz;
        if (this.previousToken.tokenKind === SyntaxKind.CommaToken) {
            return false;
        }

        // ERROR RECOVERY TWEAK:
        // For better error recovery, if we see a => then we just stop immediately.  We've got an
        // arrow function here and it's going to be veyr unlikely that we'll resynchronize and get
        // another variable declaration.
        if (this.currentToken().tokenKind === SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        // We're done when we can eat a semicolon and we've parsed at least one item.
        return itemCount > 0 && this.canEatExplicitOrAutomaticSemicolon(/*allowWithoutNewline:*/ false);
    }

    private isExpectedExtendsOrImplementsClause_TypeNameListTerminator(): boolean {
        if (this.currentToken().keywordKind() === SyntaxKind.ExtendsKeyword ||
            this.currentToken().keywordKind() === SyntaxKind.ImplementsKeyword) {
            return true;
        }

        if (this.currentToken().tokenKind === SyntaxKind.OpenBraceToken ||
            this.currentToken().tokenKind === SyntaxKind.CloseBraceToken) {
            return true;
        }

        return false;
    }

    private isExpectedArgumentList_AssignmentExpressionsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseParenToken;
    }

    private isExpectedClassDeclaration_ClassElementsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedSwitchStatement_SwitchClausesTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedSwitchClause_StatementsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken ||
               this.isSwitchClause();
    }

    private isExpectedBlock_StatementsTerminator(): boolean {
        return this.currentToken().tokenKind === SyntaxKind.CloseBraceToken;
    }

    private isExpectedListItem(currentListType: ParserListParsingState, inErrorRecovery: boolean): any {
        switch (currentListType) {
            case ParserListParsingState.SourceUnit_ModuleElements:
                return this.isModuleElement();

            case ParserListParsingState.ClassDeclaration_ClassElements:
                return this.isClassElement();

            case ParserListParsingState.ModuleDeclaration_ModuleElements:
                return this.isModuleElement();

            case ParserListParsingState.SwitchStatement_SwitchClauses:
                return this.isSwitchClause();

            case ParserListParsingState.SwitchClause_Statements:
                return this.isStatement(/*allowFunctionDeclaration:*/ true);
            
            case ParserListParsingState.Block_Statements:
                return this.isStatement(/*allowFunctionDeclaration:*/ true);

            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
                return this.isVariableDeclarator();

            case ParserListParsingState.ObjectType_TypeMembers:
                return this.isTypeMember();

            case ParserListParsingState.ArgumentList_AssignmentExpressions:
                return this.isExpression();

            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
                return this.isName();
            
            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
                return this.isPropertyAssignment(inErrorRecovery);
            
            case ParserListParsingState.ParameterList_Parameters:
                return this.isParameter();

            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return this.isAssignmentOrOmittedExpression();

            default:
                throw Errors.invalidOperation();
        }
    }

    private parseExpectedListItem(currentListType: ParserListParsingState): any {
        switch (currentListType) {
            case ParserListParsingState.SourceUnit_ModuleElements:
                return this.parseModuleElement();

            case ParserListParsingState.ClassDeclaration_ClassElements:
                return this.parseClassElement();

            case ParserListParsingState.ModuleDeclaration_ModuleElements:
                return this.parseModuleElement();

            case ParserListParsingState.SwitchStatement_SwitchClauses:
                return this.parseSwitchClause();

            case ParserListParsingState.SwitchClause_Statements:
                return this.parseStatement(/*allowFunctionDeclaration:*/ false);

            case ParserListParsingState.Block_Statements:
                return this.parseStatement(/*allowFunctionDeclaration:*/ true);

            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
                return this.parseVariableDeclarator(/*allowIn:*/ true);
            
            case ParserListParsingState.ObjectType_TypeMembers:
                return this.parseTypeMember();
            
            case ParserListParsingState.ArgumentList_AssignmentExpressions:
                return this.parseAssignmentExpression(/*allowIn:*/ true);

            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
                return this.parseName();

            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
                return this.parseVariableDeclarator(/*allowIn:*/ true);

            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
                return this.parseVariableDeclarator(/*allowIn:*/ false);

            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
                return this.parsePropertyAssignment();

            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return this.parseAssignmentOrOmittedExpression();

            case ParserListParsingState.ParameterList_Parameters:
                return this.parseParameter();

            default:
                throw Errors.invalidOperation();
        }
    }

    private getExpectedListElementType(currentListType: ParserListParsingState): string {
        switch (currentListType) {
            case ParserListParsingState.SourceUnit_ModuleElements:
                return Strings.module__class__interface__enum__import_or_statement;

            case ParserListParsingState.ClassDeclaration_ClassElements:
                return Strings.constructor__function__accessor_or_variable;

            case ParserListParsingState.ModuleDeclaration_ModuleElements:
                return Strings.module__class__interface__enum__import_or_statement;

            case ParserListParsingState.SwitchStatement_SwitchClauses:
                return Strings.case_or_default_clause;

            case ParserListParsingState.SwitchClause_Statements:
                return Strings.statement;

            case ParserListParsingState.Block_Statements:
                return Strings.statement;
            
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_AllowIn:
            case ParserListParsingState.VariableDeclaration_VariableDeclarators_DisallowIn:
            case ParserListParsingState.EnumDeclaration_VariableDeclarators:
                return Strings.identifier;

            case ParserListParsingState.ObjectType_TypeMembers:
                return Strings.call__construct__index__property_or_function_signature;

            case ParserListParsingState.ArgumentList_AssignmentExpressions:
                return Strings.expression;

            case ParserListParsingState.ExtendsOrImplementsClause_TypeNameList:
                return Strings.type_name;

            case ParserListParsingState.ObjectLiteralExpression_PropertyAssignments:
                return Strings.property_or_accessor;

            case ParserListParsingState.ParameterList_Parameters:
                return Strings.parameter;

            case ParserListParsingState.ArrayLiteralExpression_AssignmentExpressions:
                return Strings.expression;

            default:
                throw Errors.invalidOperation();
        }
    }
}