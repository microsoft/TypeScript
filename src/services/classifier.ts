namespace ts {
    /** The classifier is used for syntactic highlighting in editors via the TSServer */
    export function createClassifier(): Classifier {
        const scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false);

        function getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): ClassificationResult {
            return convertClassificationsToResult(getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent), text);
        }

        // If there is a syntactic classifier ('syntacticClassifierAbsent' is false),
        // we will be more conservative in order to avoid conflicting with the syntactic classifier.
        function getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): Classifications {
            let token = SyntaxKind.Unknown;
            let lastNonTriviaToken = SyntaxKind.Unknown;

            // Just a stack of TemplateHeads and OpenCurlyBraces, used to perform rudimentary (inexact)
            // classification on template strings. Because of the context free nature of templates,
            // the only precise way to classify a template portion would be by propagating the stack across
            // lines, just as we do with the end-of-line state. However, this is a burden for implementers,
            // and the behavior is entirely subsumed by the syntactic classifier anyway, so we instead
            // flatten any nesting when the template stack is non-empty and encode it in the end-of-line state.
            // Situations in which this fails are
            //  1) When template strings are nested across different lines:
            //          `hello ${ `world
            //          ` }`
            //
            //     Where on the second line, you will get the closing of a template,
            //     a closing curly, and a new template.
            //
            //  2) When substitution expressions have curly braces and the curly brace falls on the next line:
            //          `hello ${ () => {
            //          return "world" } } `
            //
            //     Where on the second line, you will get the 'return' keyword,
            //     a string literal, and a template end consisting of '} } `'.
            const templateStack: SyntaxKind[] = [];

            const { prefix, pushTemplate } = getPrefixFromLexState(lexState);
            text = prefix + text;
            const offset = prefix.length;
            if (pushTemplate) {
                templateStack.push(SyntaxKind.TemplateHead);
            }

            scanner.setText(text);

            let endOfLineState = EndOfLineState.None;
            const spans: number[] = [];

            // We can run into an unfortunate interaction between the lexical and syntactic classifier
            // when the user is typing something generic.  Consider the case where the user types:
            //
            //      Foo<number
            //
            // From the lexical classifier's perspective, 'number' is a keyword, and so the word will
            // be classified as such.  However, from the syntactic classifier's tree-based perspective
            // this is simply an expression with the identifier 'number' on the RHS of the less than
            // token.  So the classification will go back to being an identifier.  The moment the user
            // types again, number will become a keyword, then an identifier, etc. etc.
            //
            // To try to avoid this problem, we avoid classifying contextual keywords as keywords
            // when the user is potentially typing something generic.  We just can't do a good enough
            // job at the lexical level, and so well leave it up to the syntactic classifier to make
            // the determination.
            //
            // In order to determine if the user is potentially typing something generic, we use a
            // weak heuristic where we track < and > tokens.  It's a weak heuristic, but should
            // work well enough in practice.
            let angleBracketStack = 0;

            do {
                token = scanner.scan();
                if (!isTrivia(token)) {
                    handleToken();
                    lastNonTriviaToken = token;
                }
                const end = scanner.getTextPos();
                pushEncodedClassification(scanner.getTokenPos(), end, offset, classFromKind(token), spans);
                if (end >= text.length) {
                    const end = getNewEndOfLineState(scanner, token, lastOrUndefined(templateStack));
                    if (end !== undefined) {
                        endOfLineState = end;
                    }
                }
            } while (token !== SyntaxKind.EndOfFileToken);

            function handleToken(): void {
                switch (token) {
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.SlashEqualsToken:
                        if (!noRegexTable[lastNonTriviaToken] && scanner.reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                            token = SyntaxKind.RegularExpressionLiteral;
                        }
                        break;
                    case SyntaxKind.LessThanToken:
                        if (lastNonTriviaToken === SyntaxKind.Identifier) {
                            // Could be the start of something generic.  Keep track of that by bumping
                            // up the current count of generic contexts we may be in.
                            angleBracketStack++;
                        }
                        break;
                    case SyntaxKind.GreaterThanToken:
                        if (angleBracketStack > 0) {
                            // If we think we're currently in something generic, then mark that that
                            // generic entity is complete.
                            angleBracketStack--;
                        }
                        break;
                    case SyntaxKind.AnyKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.SymbolKeyword:
                        if (angleBracketStack > 0 && !syntacticClassifierAbsent) {
                            // If it looks like we're could be in something generic, don't classify this
                            // as a keyword.  We may just get overwritten by the syntactic classifier,
                            // causing a noisy experience for the user.
                            token = SyntaxKind.Identifier;
                        }
                        break;
                    case SyntaxKind.TemplateHead:
                        templateStack.push(token);
                        break;
                    case SyntaxKind.OpenBraceToken:
                        // If we don't have anything on the template stack,
                        // then we aren't trying to keep track of a previously scanned template head.
                        if (templateStack.length > 0) {
                            templateStack.push(token);
                        }
                        break;
                    case SyntaxKind.CloseBraceToken:
                        // If we don't have anything on the template stack,
                        // then we aren't trying to keep track of a previously scanned template head.
                        if (templateStack.length > 0) {
                            const lastTemplateStackToken = lastOrUndefined(templateStack);

                            if (lastTemplateStackToken === SyntaxKind.TemplateHead) {
                                token = scanner.reScanTemplateToken(/* isTaggedTemplate */ false);

                                // Only pop on a TemplateTail; a TemplateMiddle indicates there is more for us.
                                if (token === SyntaxKind.TemplateTail) {
                                    templateStack.pop();
                                }
                                else {
                                    Debug.assertEqual(token, SyntaxKind.TemplateMiddle, "Should have been a template middle.");
                                }
                            }
                            else {
                                Debug.assertEqual(lastTemplateStackToken, SyntaxKind.OpenBraceToken, "Should have been an open brace");
                                templateStack.pop();
                            }
                        }
                        break;
                    default:
                        if (!isKeyword(token)) {
                            break;
                        }

                        if (lastNonTriviaToken === SyntaxKind.DotToken) {
                            token = SyntaxKind.Identifier;
                        }
                        else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                            // We have two keywords in a row.  Only treat the second as a keyword if
                            // it's a sequence that could legally occur in the language.  Otherwise
                            // treat it as an identifier.  This way, if someone writes "private var"
                            // we recognize that 'var' is actually an identifier here.
                            token = SyntaxKind.Identifier;
                        }
                }
            }

            return { endOfLineState, spans };
        }

        return { getClassificationsForLine, getEncodedLexicalClassifications };
    }

    /// We do not have a full parser support to know when we should parse a regex or not
    /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
    /// we have a series of divide operator. this list allows us to be more accurate by ruling out
    /// locations where a regexp cannot exist.
    const noRegexTable: true[] = arrayToNumericMap<SyntaxKind, true>([
        SyntaxKind.Identifier,
        SyntaxKind.StringLiteral,
        SyntaxKind.NumericLiteral,
        SyntaxKind.BigIntLiteral,
        SyntaxKind.RegularExpressionLiteral,
        SyntaxKind.ThisKeyword,
        SyntaxKind.PlusPlusToken,
        SyntaxKind.MinusMinusToken,
        SyntaxKind.CloseParenToken,
        SyntaxKind.CloseBracketToken,
        SyntaxKind.CloseBraceToken,
        SyntaxKind.TrueKeyword,
        SyntaxKind.FalseKeyword,
    ], token => token, () => true);

    function getNewEndOfLineState(scanner: Scanner, token: SyntaxKind, lastOnTemplateStack: SyntaxKind | undefined): EndOfLineState | undefined {
        switch (token) {
            case SyntaxKind.StringLiteral: {
                // Check to see if we finished up on a multiline string literal.
                if (!scanner.isUnterminated()) return undefined;

                const tokenText = scanner.getTokenText();
                const lastCharIndex = tokenText.length - 1;
                let numBackslashes = 0;
                while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === CharacterCodes.backslash) {
                    numBackslashes++;
                }

                // If we have an odd number of backslashes, then the multiline string is unclosed
                if ((numBackslashes & 1) === 0) return undefined;
                return tokenText.charCodeAt(0) === CharacterCodes.doubleQuote ? EndOfLineState.InDoubleQuoteStringLiteral : EndOfLineState.InSingleQuoteStringLiteral;
            }
            case SyntaxKind.MultiLineCommentTrivia:
                // Check to see if the multiline comment was unclosed.
                return scanner.isUnterminated() ? EndOfLineState.InMultiLineCommentTrivia : undefined;
            default:
                if (isTemplateLiteralKind(token)) {
                    if (!scanner.isUnterminated()) {
                        return undefined;
                    }
                    switch (token) {
                        case SyntaxKind.TemplateTail:
                            return EndOfLineState.InTemplateMiddleOrTail;
                        case SyntaxKind.NoSubstitutionTemplateLiteral:
                            return EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate;
                        default:
                            return Debug.fail("Only 'NoSubstitutionTemplateLiteral's and 'TemplateTail's can be unterminated; got SyntaxKind #" + token);
                    }
                }
                return lastOnTemplateStack === SyntaxKind.TemplateHead ? EndOfLineState.InTemplateSubstitutionPosition : undefined;
        }
    }

    function pushEncodedClassification(start: number, end: number, offset: number, classification: ClassificationType, result: Push<number>): void {
        if (classification === ClassificationType.whiteSpace) {
            // Don't bother with whitespace classifications.  They're not needed.
            return;
        }

        if (start === 0 && offset > 0) {
            // We're classifying the first token, and this was a case where we prepended text.
            // We should consider the start of this token to be at the start of the original text.
            start += offset;
        }

        const length = end - start;
        if (length > 0) {
            // All our tokens are in relation to the augmented text.  Move them back to be
            // relative to the original text.
            result.push(start - offset, length, classification);
        }
    }

    function convertClassificationsToResult(classifications: Classifications, text: string): ClassificationResult {
        const entries: ClassificationInfo[] = [];
        const dense = classifications.spans;
        let lastEnd = 0;

        for (let i = 0; i < dense.length; i += 3) {
            const start = dense[i];
            const length = dense[i + 1];
            const type = <ClassificationType>dense[i + 2];

            // Make a whitespace entry between the last item and this one.
            if (lastEnd >= 0) {
                const whitespaceLength = start - lastEnd;
                if (whitespaceLength > 0) {
                    entries.push({ length: whitespaceLength, classification: TokenClass.Whitespace });
                }
            }

            entries.push({ length, classification: convertClassification(type) });
            lastEnd = start + length;
        }

        const whitespaceLength = text.length - lastEnd;
        if (whitespaceLength > 0) {
            entries.push({ length: whitespaceLength, classification: TokenClass.Whitespace });
        }

        return { entries, finalLexState: classifications.endOfLineState };
    }

    function convertClassification(type: ClassificationType): TokenClass {
        switch (type) {
            case ClassificationType.comment: return TokenClass.Comment;
            case ClassificationType.keyword: return TokenClass.Keyword;
            case ClassificationType.numericLiteral: return TokenClass.NumberLiteral;
            case ClassificationType.bigintLiteral: return TokenClass.BigIntLiteral;
            case ClassificationType.operator: return TokenClass.Operator;
            case ClassificationType.stringLiteral: return TokenClass.StringLiteral;
            case ClassificationType.whiteSpace: return TokenClass.Whitespace;
            case ClassificationType.punctuation: return TokenClass.Punctuation;
            case ClassificationType.identifier:
            case ClassificationType.className:
            case ClassificationType.enumName:
            case ClassificationType.interfaceName:
            case ClassificationType.moduleName:
            case ClassificationType.typeParameterName:
            case ClassificationType.typeAliasName:
            case ClassificationType.text:
            case ClassificationType.parameterName:
                return TokenClass.Identifier;
            default:
                return undefined!; // TODO: GH#18217 Debug.assertNever(type);
        }
    }

    /** Returns true if 'keyword2' can legally follow 'keyword1' in any language construct. */
    function canFollow(keyword1: SyntaxKind, keyword2: SyntaxKind): boolean {
        if (!isAccessibilityModifier(keyword1)) {
            // Assume any other keyword combination is legal.
            // This can be refined in the future if there are more cases we want the classifier to be better at.
            return true;
        }
        switch (keyword2) {
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
            case SyntaxKind.ConstructorKeyword:
            case SyntaxKind.StaticKeyword:
                return true; // Allow things like "public get", "public constructor" and "public static".
            default:
                return false; // Any other keyword following "public" is actually an identifier, not a real keyword.
        }
    }

    function getPrefixFromLexState(lexState: EndOfLineState): { readonly prefix: string, readonly pushTemplate?: true } {
        // If we're in a string literal, then prepend: "\
        // (and a newline).  That way when we lex we'll think we're still in a string literal.
        //
        // If we're in a multiline comment, then prepend: /*
        // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
        switch (lexState) {
            case EndOfLineState.InDoubleQuoteStringLiteral:
                return { prefix: "\"\\\n" };
            case EndOfLineState.InSingleQuoteStringLiteral:
                return { prefix: "'\\\n" };
            case EndOfLineState.InMultiLineCommentTrivia:
                return { prefix: "/*\n" };
            case EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate:
                return { prefix: "`\n" };
            case EndOfLineState.InTemplateMiddleOrTail:
                return { prefix: "}\n", pushTemplate: true };
            case EndOfLineState.InTemplateSubstitutionPosition:
                return { prefix: "", pushTemplate: true };
            case EndOfLineState.None:
                return { prefix: "" };
            default:
                return Debug.assertNever(lexState);
        }
    }

    function isBinaryExpressionOperatorToken(token: SyntaxKind): boolean {
        switch (token) {
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.SlashToken:
            case SyntaxKind.PercentToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.LessThanLessThanToken:
            case SyntaxKind.GreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.GreaterThanToken:
            case SyntaxKind.LessThanEqualsToken:
            case SyntaxKind.GreaterThanEqualsToken:
            case SyntaxKind.InstanceOfKeyword:
            case SyntaxKind.InKeyword:
            case SyntaxKind.AsKeyword:
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
            case SyntaxKind.AmpersandToken:
            case SyntaxKind.CaretToken:
            case SyntaxKind.BarToken:
            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.BarBarToken:
            case SyntaxKind.BarEqualsToken:
            case SyntaxKind.AmpersandEqualsToken:
            case SyntaxKind.CaretEqualsToken:
            case SyntaxKind.LessThanLessThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case SyntaxKind.PlusEqualsToken:
            case SyntaxKind.MinusEqualsToken:
            case SyntaxKind.AsteriskEqualsToken:
            case SyntaxKind.SlashEqualsToken:
            case SyntaxKind.PercentEqualsToken:
            case SyntaxKind.EqualsToken:
            case SyntaxKind.CommaToken:
            case SyntaxKind.QuestionQuestionToken:
            case SyntaxKind.BarBarEqualsToken:
            case SyntaxKind.AmpersandAmpersandEqualsToken:
            case SyntaxKind.QuestionQuestionEqualsToken:
                return true;
            default:
                return false;
        }
    }

    function isPrefixUnaryExpressionOperatorToken(token: SyntaxKind): boolean {
        switch (token) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
            case SyntaxKind.PlusPlusToken:
            case SyntaxKind.MinusMinusToken:
                return true;
            default:
                return false;
        }
    }

    function classFromKind(token: SyntaxKind): ClassificationType {
        if (isKeyword(token)) {
            return ClassificationType.keyword;
        }
        else if (isBinaryExpressionOperatorToken(token) || isPrefixUnaryExpressionOperatorToken(token)) {
            return ClassificationType.operator;
        }
        else if (token >= SyntaxKind.FirstPunctuation && token <= SyntaxKind.LastPunctuation) {
            return ClassificationType.punctuation;
        }

        switch (token) {
            case SyntaxKind.NumericLiteral:
                return ClassificationType.numericLiteral;
            case SyntaxKind.BigIntLiteral:
                return ClassificationType.bigintLiteral;
            case SyntaxKind.StringLiteral:
                return ClassificationType.stringLiteral;
            case SyntaxKind.RegularExpressionLiteral:
                return ClassificationType.regularExpressionLiteral;
            case SyntaxKind.ConflictMarkerTrivia:
            case SyntaxKind.MultiLineCommentTrivia:
            case SyntaxKind.SingleLineCommentTrivia:
                return ClassificationType.comment;
            case SyntaxKind.WhitespaceTrivia:
            case SyntaxKind.NewLineTrivia:
                return ClassificationType.whiteSpace;
            case SyntaxKind.Identifier:
            default:
                if (isTemplateLiteralKind(token)) {
                    return ClassificationType.stringLiteral;
                }
                return ClassificationType.identifier;
        }
    }

    /* @internal */
    export function getSemanticClassifications(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFile: SourceFile, classifiableNames: ReadonlySet<__String>, span: TextSpan): ClassifiedSpan[] {
        return convertClassificationsToSpans(getEncodedSemanticClassifications(typeChecker, cancellationToken, sourceFile, classifiableNames, span));
    }

    function checkForClassificationCancellation(cancellationToken: CancellationToken, kind: SyntaxKind) {
        // We don't want to actually call back into our host on every node to find out if we've
        // been canceled.  That would be an enormous amount of chattyness, along with the all
        // the overhead of marshalling the data to/from the host.  So instead we pick a few
        // reasonable node kinds to bother checking on.  These node kinds represent high level
        // constructs that we would expect to see commonly, but just at a far less frequent
        // interval.
        //
        // For example, in checker.ts (around 750k) we only have around 600 of these constructs.
        // That means we're calling back into the host around every 1.2k of the file we process.
        // Lib.d.ts has similar numbers.
        switch (kind) {
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.FunctionDeclaration:
                cancellationToken.throwIfCancellationRequested();
        }
    }

    /* @internal */
    export function getEncodedSemanticClassifications(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFile: SourceFile, classifiableNames: ReadonlySet<__String>, span: TextSpan): Classifications {
        const spans: number[] = [];
        sourceFile.forEachChild(function cb(node: Node): void {
            // Only walk into nodes that intersect the requested span.
            if (!node || !textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                return;
            }

            checkForClassificationCancellation(cancellationToken, node.kind);
            // Only bother calling into the typechecker if this is an identifier that
            // could possibly resolve to a type name.  This makes classification run
            // in a third of the time it would normally take.
            if (isIdentifier(node) && !nodeIsMissing(node) && classifiableNames.has(node.escapedText)) {
                const symbol = typeChecker.getSymbolAtLocation(node);
                const type = symbol && classifySymbol(symbol, getMeaningFromLocation(node), typeChecker);
                if (type) {
                    pushClassification(node.getStart(sourceFile), node.getEnd(), type);
                }
            }

            node.forEachChild(cb);
        });
        return { spans, endOfLineState: EndOfLineState.None };

        function pushClassification(start: number, end: number, type: ClassificationType): void {
            const length = end - start;
            Debug.assert(length > 0, `Classification had non-positive length of ${length}`);
            spans.push(start);
            spans.push(length);
            spans.push(type);
        }
    }

    function classifySymbol(symbol: Symbol, meaningAtPosition: SemanticMeaning, checker: TypeChecker): ClassificationType | undefined {
        const flags = symbol.getFlags();
        if ((flags & SymbolFlags.Classifiable) === SymbolFlags.None) {
            return undefined;
        }
        else if (flags & SymbolFlags.Class) {
            return ClassificationType.className;
        }
        else if (flags & SymbolFlags.Enum) {
            return ClassificationType.enumName;
        }
        else if (flags & SymbolFlags.TypeAlias) {
            return ClassificationType.typeAliasName;
        }
        else if (flags & SymbolFlags.Module) {
            // Only classify a module as such if
            //  - It appears in a namespace context.
            //  - There exists a module declaration which actually impacts the value side.
            return meaningAtPosition & SemanticMeaning.Namespace || meaningAtPosition & SemanticMeaning.Value && hasValueSideModule(symbol) ? ClassificationType.moduleName : undefined;
        }
        else if (flags & SymbolFlags.Alias) {
            return classifySymbol(checker.getAliasedSymbol(symbol), meaningAtPosition, checker);
        }
        else if (meaningAtPosition & SemanticMeaning.Type) {
            return flags & SymbolFlags.Interface ? ClassificationType.interfaceName : flags & SymbolFlags.TypeParameter ? ClassificationType.typeParameterName : undefined;
        }
        else {
            return undefined;
        }
    }

    /** Returns true if there exists a module that introduces entities on the value side. */
    function hasValueSideModule(symbol: Symbol): boolean {
        return some(symbol.declarations, declaration =>
            isModuleDeclaration(declaration) && getModuleInstanceState(declaration) === ModuleInstanceState.Instantiated);
    }

    function getClassificationTypeName(type: ClassificationType): ClassificationTypeNames {
        switch (type) {
            case ClassificationType.comment: return ClassificationTypeNames.comment;
            case ClassificationType.identifier: return ClassificationTypeNames.identifier;
            case ClassificationType.keyword: return ClassificationTypeNames.keyword;
            case ClassificationType.numericLiteral: return ClassificationTypeNames.numericLiteral;
            case ClassificationType.bigintLiteral: return ClassificationTypeNames.bigintLiteral;
            case ClassificationType.operator: return ClassificationTypeNames.operator;
            case ClassificationType.stringLiteral: return ClassificationTypeNames.stringLiteral;
            case ClassificationType.whiteSpace: return ClassificationTypeNames.whiteSpace;
            case ClassificationType.text: return ClassificationTypeNames.text;
            case ClassificationType.punctuation: return ClassificationTypeNames.punctuation;
            case ClassificationType.className: return ClassificationTypeNames.className;
            case ClassificationType.enumName: return ClassificationTypeNames.enumName;
            case ClassificationType.interfaceName: return ClassificationTypeNames.interfaceName;
            case ClassificationType.moduleName: return ClassificationTypeNames.moduleName;
            case ClassificationType.typeParameterName: return ClassificationTypeNames.typeParameterName;
            case ClassificationType.typeAliasName: return ClassificationTypeNames.typeAliasName;
            case ClassificationType.parameterName: return ClassificationTypeNames.parameterName;
            case ClassificationType.docCommentTagName: return ClassificationTypeNames.docCommentTagName;
            case ClassificationType.jsxOpenTagName: return ClassificationTypeNames.jsxOpenTagName;
            case ClassificationType.jsxCloseTagName: return ClassificationTypeNames.jsxCloseTagName;
            case ClassificationType.jsxSelfClosingTagName: return ClassificationTypeNames.jsxSelfClosingTagName;
            case ClassificationType.jsxAttribute: return ClassificationTypeNames.jsxAttribute;
            case ClassificationType.jsxText: return ClassificationTypeNames.jsxText;
            case ClassificationType.jsxAttributeStringLiteralValue: return ClassificationTypeNames.jsxAttributeStringLiteralValue;
            default: return undefined!; // TODO: GH#18217 throw Debug.assertNever(type);
        }
    }

    function convertClassificationsToSpans(classifications: Classifications): ClassifiedSpan[] {
        Debug.assert(classifications.spans.length % 3 === 0);
        const dense = classifications.spans;
        const result: ClassifiedSpan[] = [];
        for (let i = 0; i < dense.length; i += 3) {
            result.push({
                textSpan: createTextSpan(dense[i], dense[i + 1]),
                classificationType: getClassificationTypeName(dense[i + 2])
            });
        }

        return result;
    }

    /* @internal */
    export function getSyntacticClassifications(cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): ClassifiedSpan[] {
        return convertClassificationsToSpans(getEncodedSyntacticClassifications(cancellationToken, sourceFile, span));
    }

    /* @internal */
    export function getEncodedSyntacticClassifications(cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): Classifications {
        const spanStart = span.start;
        const spanLength = span.length;

        // Make a scanner we can get trivia from.
        const triviaScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, sourceFile.languageVariant, sourceFile.text);
        const mergeConflictScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, sourceFile.languageVariant, sourceFile.text);

        const result: number[] = [];
        processElement(sourceFile);

        return { spans: result, endOfLineState: EndOfLineState.None };

        function pushClassification(start: number, length: number, type: ClassificationType) {
            result.push(start);
            result.push(length);
            result.push(type);
        }

        function classifyLeadingTriviaAndGetTokenStart(token: Node): number {
            triviaScanner.setTextPos(token.pos);
            while (true) {
                const start = triviaScanner.getTextPos();
                // only bother scanning if we have something that could be trivia.
                if (!couldStartTrivia(sourceFile.text, start)) {
                    return start;
                }

                const kind = triviaScanner.scan();
                const end = triviaScanner.getTextPos();
                const width = end - start;

                // The moment we get something that isn't trivia, then stop processing.
                if (!isTrivia(kind)) {
                    return start;
                }

                switch (kind) {
                    case SyntaxKind.NewLineTrivia:
                    case SyntaxKind.WhitespaceTrivia:
                        // Don't bother with newlines/whitespace.
                        continue;

                    case SyntaxKind.SingleLineCommentTrivia:
                    case SyntaxKind.MultiLineCommentTrivia:
                        // Only bother with the trivia if it at least intersects the span of interest.
                        classifyComment(token, kind, start, width);

                        // Classifying a comment might cause us to reuse the trivia scanner
                        // (because of jsdoc comments).  So after we classify the comment make
                        // sure we set the scanner position back to where it needs to be.
                        triviaScanner.setTextPos(end);
                        continue;

                    case SyntaxKind.ConflictMarkerTrivia:
                        const text = sourceFile.text;
                        const ch = text.charCodeAt(start);

                        // for the <<<<<<< and >>>>>>> markers, we just add them in as comments
                        // in the classification stream.
                        if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
                            pushClassification(start, width, ClassificationType.comment);
                            continue;
                        }

                        // for the ||||||| and ======== markers, add a comment for the first line,
                        // and then lex all subsequent lines up until the end of the conflict marker.
                        Debug.assert(ch === CharacterCodes.bar || ch === CharacterCodes.equals);
                        classifyDisabledMergeCode(text, start, end);
                        break;

                    case SyntaxKind.ShebangTrivia:
                        // TODO: Maybe we should classify these.
                        break;

                    default:
                        Debug.assertNever(kind);
                }
            }
        }

        function classifyComment(token: Node, kind: SyntaxKind, start: number, width: number) {
            if (kind === SyntaxKind.MultiLineCommentTrivia) {
                // See if this is a doc comment.  If so, we'll classify certain portions of it
                // specially.
                const docCommentAndDiagnostics = parseIsolatedJSDocComment(sourceFile.text, start, width);
                if (docCommentAndDiagnostics && docCommentAndDiagnostics.jsDoc) {
                    // TODO: This should be predicated on `token["kind"]` being compatible with `HasJSDoc["kind"]`
                    setParent(docCommentAndDiagnostics.jsDoc, token as HasJSDoc);
                    classifyJSDocComment(docCommentAndDiagnostics.jsDoc);
                    return;
                }
            }
            else if (kind === SyntaxKind.SingleLineCommentTrivia) {
                if (tryClassifyTripleSlashComment(start, width)) {
                    return;
                }
            }

            // Simple comment.  Just add as is.
            pushCommentRange(start, width);
        }

        function pushCommentRange(start: number, width: number) {
            pushClassification(start, width, ClassificationType.comment);
        }

        function classifyJSDocComment(docComment: JSDoc) {
            let pos = docComment.pos;

            if (docComment.tags) {
                for (const tag of docComment.tags) {
                    // As we walk through each tag, classify the portion of text from the end of
                    // the last tag (or the start of the entire doc comment) as 'comment'.
                    if (tag.pos !== pos) {
                        pushCommentRange(pos, tag.pos - pos);
                    }

                    pushClassification(tag.pos, 1, ClassificationType.punctuation); // "@"
                    pushClassification(tag.tagName.pos, tag.tagName.end - tag.tagName.pos, ClassificationType.docCommentTagName); // e.g. "param"

                    pos = tag.tagName.end;

                    switch (tag.kind) {
                        case SyntaxKind.JSDocParameterTag:
                            processJSDocParameterTag(<JSDocParameterTag>tag);
                            break;
                        case SyntaxKind.JSDocTemplateTag:
                            processJSDocTemplateTag(<JSDocTemplateTag>tag);
                            pos = tag.end;
                            break;
                        case SyntaxKind.JSDocTypeTag:
                            processElement((<JSDocTypeTag>tag).typeExpression);
                            pos = tag.end;
                            break;
                        case SyntaxKind.JSDocReturnTag:
                            processElement((<JSDocReturnTag>tag).typeExpression);
                            pos = tag.end;
                            break;
                    }
                }
            }

            if (pos !== docComment.end) {
                pushCommentRange(pos, docComment.end - pos);
            }

            return;

            function processJSDocParameterTag(tag: JSDocParameterTag) {
                if (tag.isNameFirst) {
                    pushCommentRange(pos, tag.name.pos - pos);
                    pushClassification(tag.name.pos, tag.name.end - tag.name.pos, ClassificationType.parameterName);
                    pos = tag.name.end;
                }

                if (tag.typeExpression) {
                    pushCommentRange(pos, tag.typeExpression.pos - pos);
                    processElement(tag.typeExpression);
                    pos = tag.typeExpression.end;
                }

                if (!tag.isNameFirst) {
                    pushCommentRange(pos, tag.name.pos - pos);
                    pushClassification(tag.name.pos, tag.name.end - tag.name.pos, ClassificationType.parameterName);
                    pos = tag.name.end;
                }
            }
        }

        function tryClassifyTripleSlashComment(start: number, width: number): boolean {
            const tripleSlashXMLCommentRegEx = /^(\/\/\/\s*)(<)(?:(\S+)((?:[^/]|\/[^>])*)(\/>)?)?/im;
            const attributeRegex = /(\S+)(\s*)(=)(\s*)('[^']+'|"[^"]+")/img;

            const text = sourceFile.text.substr(start, width);
            const match = tripleSlashXMLCommentRegEx.exec(text);
            if (!match) {
                return false;
            }

            // Limiting classification to exactly the elements and attributes
            // defined in `ts.commentPragmas` would be excessive, but we can avoid
            // some obvious false positives (e.g. in XML-like doc comments) by
            // checking the element name.
            // eslint-disable-next-line no-in-operator
            if (!match[3] || !(match[3] in commentPragmas)) {
                return false;
            }

            let pos = start;

            pushCommentRange(pos, match[1].length); // ///
            pos += match[1].length;

            pushClassification(pos, match[2].length, ClassificationType.punctuation); // <
            pos += match[2].length;

            pushClassification(pos, match[3].length, ClassificationType.jsxSelfClosingTagName); // element name
            pos += match[3].length;

            const attrText = match[4];
            let attrPos = pos;
            while (true) {
                const attrMatch = attributeRegex.exec(attrText);
                if (!attrMatch) {
                    break;
                }

                const newAttrPos = pos + attrMatch.index;
                if (newAttrPos > attrPos) {
                    pushCommentRange(attrPos, newAttrPos - attrPos);
                    attrPos = newAttrPos;
                }

                pushClassification(attrPos, attrMatch[1].length, ClassificationType.jsxAttribute); // attribute name
                attrPos += attrMatch[1].length;

                if (attrMatch[2].length) {
                    pushCommentRange(attrPos, attrMatch[2].length); // whitespace
                    attrPos += attrMatch[2].length;
                }

                pushClassification(attrPos, attrMatch[3].length, ClassificationType.operator); // =
                attrPos += attrMatch[3].length;

                if (attrMatch[4].length) {
                    pushCommentRange(attrPos, attrMatch[4].length); // whitespace
                    attrPos += attrMatch[4].length;
                }

                pushClassification(attrPos, attrMatch[5].length, ClassificationType.jsxAttributeStringLiteralValue); // attribute value
                attrPos += attrMatch[5].length;
            }

            pos += match[4].length;

            if (pos > attrPos) {
                pushCommentRange(attrPos, pos - attrPos);
            }

            if (match[5]) {
                pushClassification(pos, match[5].length, ClassificationType.punctuation); // />
                pos += match[5].length;
            }

            const end = start + width;
            if (pos < end) {
                pushCommentRange(pos, end - pos);
            }

            return true;
        }

        function processJSDocTemplateTag(tag: JSDocTemplateTag) {
            for (const child of tag.getChildren()) {
                processElement(child);
            }
        }

        function classifyDisabledMergeCode(text: string, start: number, end: number) {
            // Classify the line that the ||||||| or ======= marker is on as a comment.
            // Then just lex all further tokens and add them to the result.
            let i: number;
            for (i = start; i < end; i++) {
                if (isLineBreak(text.charCodeAt(i))) {
                    break;
                }
            }
            pushClassification(start, i - start, ClassificationType.comment);
            mergeConflictScanner.setTextPos(i);

            while (mergeConflictScanner.getTextPos() < end) {
                classifyDisabledCodeToken();
            }
        }

        function classifyDisabledCodeToken() {
            const start = mergeConflictScanner.getTextPos();
            const tokenKind = mergeConflictScanner.scan();
            const end = mergeConflictScanner.getTextPos();

            const type = classifyTokenType(tokenKind);
            if (type) {
                pushClassification(start, end - start, type);
            }
        }

        /**
         * Returns true if node should be treated as classified and no further processing is required.
         * False will mean that node is not classified and traverse routine should recurse into node contents.
         */
        function tryClassifyNode(node: Node): boolean {
            if (isJSDoc(node)) {
                return true;
            }

            if (nodeIsMissing(node)) {
                return true;
            }

            const classifiedElementName = tryClassifyJsxElementName(node);
            if (!isToken(node) && node.kind !== SyntaxKind.JsxText && classifiedElementName === undefined) {
                return false;
            }

            const tokenStart = node.kind === SyntaxKind.JsxText ? node.pos : classifyLeadingTriviaAndGetTokenStart(node);

            const tokenWidth = node.end - tokenStart;
            Debug.assert(tokenWidth >= 0);
            if (tokenWidth > 0) {
                const type = classifiedElementName || classifyTokenType(node.kind, node);
                if (type) {
                    pushClassification(tokenStart, tokenWidth, type);
                }
            }

            return true;
        }

        function tryClassifyJsxElementName(token: Node): ClassificationType | undefined {
            switch (token.parent && token.parent.kind) {
                case SyntaxKind.JsxOpeningElement:
                    if ((<JsxOpeningElement>token.parent).tagName === token) {
                        return ClassificationType.jsxOpenTagName;
                    }
                    break;
                case SyntaxKind.JsxClosingElement:
                    if ((<JsxClosingElement>token.parent).tagName === token) {
                        return ClassificationType.jsxCloseTagName;
                    }
                    break;
                case SyntaxKind.JsxSelfClosingElement:
                    if ((<JsxSelfClosingElement>token.parent).tagName === token) {
                        return ClassificationType.jsxSelfClosingTagName;
                    }
                    break;
                case SyntaxKind.JsxAttribute:
                    if ((<JsxAttribute>token.parent).name === token) {
                        return ClassificationType.jsxAttribute;
                    }
                    break;
            }
            return undefined;
        }

        // for accurate classification, the actual token should be passed in.  however, for
        // cases like 'disabled merge code' classification, we just get the token kind and
        // classify based on that instead.
        function classifyTokenType(tokenKind: SyntaxKind, token?: Node): ClassificationType | undefined {
            if (isKeyword(tokenKind)) {
                return ClassificationType.keyword;
            }

            // Special case `<` and `>`: If they appear in a generic context they are punctuation,
            // not operators.
            if (tokenKind === SyntaxKind.LessThanToken || tokenKind === SyntaxKind.GreaterThanToken) {
                // If the node owning the token has a type argument list or type parameter list, then
                // we can effectively assume that a '<' and '>' belong to those lists.
                if (token && getTypeArgumentOrTypeParameterList(token.parent)) {
                    return ClassificationType.punctuation;
                }
            }

            if (isPunctuation(tokenKind)) {
                if (token) {
                    const parent = token.parent;
                    if (tokenKind === SyntaxKind.EqualsToken) {
                        // the '=' in a variable declaration is special cased here.
                        if (parent.kind === SyntaxKind.VariableDeclaration ||
                            parent.kind === SyntaxKind.PropertyDeclaration ||
                            parent.kind === SyntaxKind.Parameter ||
                            parent.kind === SyntaxKind.JsxAttribute) {
                            return ClassificationType.operator;
                        }
                    }

                    if (parent.kind === SyntaxKind.BinaryExpression ||
                        parent.kind === SyntaxKind.PrefixUnaryExpression ||
                        parent.kind === SyntaxKind.PostfixUnaryExpression ||
                        parent.kind === SyntaxKind.ConditionalExpression) {
                        return ClassificationType.operator;
                    }
                }

                return ClassificationType.punctuation;
            }
            else if (tokenKind === SyntaxKind.NumericLiteral) {
                return ClassificationType.numericLiteral;
            }
            else if (tokenKind === SyntaxKind.BigIntLiteral) {
                return ClassificationType.bigintLiteral;
            }
            else if (tokenKind === SyntaxKind.StringLiteral) {
                return token && token.parent.kind === SyntaxKind.JsxAttribute ? ClassificationType.jsxAttributeStringLiteralValue : ClassificationType.stringLiteral;
            }
            else if (tokenKind === SyntaxKind.RegularExpressionLiteral) {
                // TODO: we should get another classification type for these literals.
                return ClassificationType.stringLiteral;
            }
            else if (isTemplateLiteralKind(tokenKind)) {
                // TODO (drosen): we should *also* get another classification type for these literals.
                return ClassificationType.stringLiteral;
            }
            else if (tokenKind === SyntaxKind.JsxText) {
                return ClassificationType.jsxText;
            }
            else if (tokenKind === SyntaxKind.Identifier) {
                if (token) {
                    switch (token.parent.kind) {
                        case SyntaxKind.ClassDeclaration:
                            if ((<ClassDeclaration>token.parent).name === token) {
                                return ClassificationType.className;
                            }
                            return;
                        case SyntaxKind.TypeParameter:
                            if ((<TypeParameterDeclaration>token.parent).name === token) {
                                return ClassificationType.typeParameterName;
                            }
                            return;
                        case SyntaxKind.InterfaceDeclaration:
                            if ((<InterfaceDeclaration>token.parent).name === token) {
                                return ClassificationType.interfaceName;
                            }
                            return;
                        case SyntaxKind.EnumDeclaration:
                            if ((<EnumDeclaration>token.parent).name === token) {
                                return ClassificationType.enumName;
                            }
                            return;
                        case SyntaxKind.ModuleDeclaration:
                            if ((<ModuleDeclaration>token.parent).name === token) {
                                return ClassificationType.moduleName;
                            }
                            return;
                        case SyntaxKind.Parameter:
                            if ((<ParameterDeclaration>token.parent).name === token) {
                                return isThisIdentifier(token) ? ClassificationType.keyword : ClassificationType.parameterName;
                            }
                            return;
                    }
                }
                return ClassificationType.identifier;
            }
        }

        function processElement(element: Node | undefined) {
            if (!element) {
                return;
            }

            // Ignore nodes that don't intersect the original span to classify.
            if (decodedTextSpanIntersectsWith(spanStart, spanLength, element.pos, element.getFullWidth())) {
                checkForClassificationCancellation(cancellationToken, element.kind);

                for (const child of element.getChildren(sourceFile)) {
                    if (!tryClassifyNode(child)) {
                        // Recurse into our child nodes.
                        processElement(child);
                    }
                }
            }
        }
    }
}
