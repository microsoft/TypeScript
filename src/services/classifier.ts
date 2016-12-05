namespace ts {
    /// Classifier
    export function createClassifier(): Classifier {
        const scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false);

        /// We do not have a full parser support to know when we should parse a regex or not
        /// If we consider every slash token to be a regex, we could be missing cases like "1/2/3", where
        /// we have a series of divide operator. this list allows us to be more accurate by ruling out
        /// locations where a regexp cannot exist.
        const noRegexTable: boolean[] = [];
        noRegexTable[SyntaxKind.Identifier] = true;
        noRegexTable[SyntaxKind.StringLiteral] = true;
        noRegexTable[SyntaxKind.NumericLiteral] = true;
        noRegexTable[SyntaxKind.RegularExpressionLiteral] = true;
        noRegexTable[SyntaxKind.ThisKeyword] = true;
        noRegexTable[SyntaxKind.PlusPlusToken] = true;
        noRegexTable[SyntaxKind.MinusMinusToken] = true;
        noRegexTable[SyntaxKind.CloseParenToken] = true;
        noRegexTable[SyntaxKind.CloseBracketToken] = true;
        noRegexTable[SyntaxKind.CloseBraceToken] = true;
        noRegexTable[SyntaxKind.TrueKeyword] = true;
        noRegexTable[SyntaxKind.FalseKeyword] = true;

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

        /** Returns true if 'keyword2' can legally follow 'keyword1' in any language construct. */
        function canFollow(keyword1: SyntaxKind, keyword2: SyntaxKind) {
            if (isAccessibilityModifier(keyword1)) {
                if (keyword2 === SyntaxKind.GetKeyword ||
                    keyword2 === SyntaxKind.SetKeyword ||
                    keyword2 === SyntaxKind.ConstructorKeyword ||
                    keyword2 === SyntaxKind.StaticKeyword) {

                    // Allow things like "public get", "public constructor" and "public static".
                    // These are all legal.
                    return true;
                }

                // Any other keyword following "public" is actually an identifier an not a real
                // keyword.
                return false;
            }

            // Assume any other keyword combination is legal.  This can be refined in the future
            // if there are more cases we want the classifier to be better at.
            return true;
        }

        function convertClassifications(classifications: Classifications, text: string): ClassificationResult {
            const entries: ClassificationInfo[] = [];
            const dense = classifications.spans;
            let lastEnd = 0;

            for (let i = 0, n = dense.length; i < n; i += 3) {
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
                default:
                    return TokenClass.Identifier;
            }
        }

        function getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): ClassificationResult {
            return convertClassifications(getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent), text);
        }

        // If there is a syntactic classifier ('syntacticClassifierAbsent' is false),
        // we will be more conservative in order to avoid conflicting with the syntactic classifier.
        function getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): Classifications {
            let offset = 0;
            let token = SyntaxKind.Unknown;
            let lastNonTriviaToken = SyntaxKind.Unknown;

            // Empty out the template stack for reuse.
            while (templateStack.length > 0) {
                templateStack.pop();
            }

            // If we're in a string literal, then prepend: "\
            // (and a newline).  That way when we lex we'll think we're still in a string literal.
            //
            // If we're in a multiline comment, then prepend: /*
            // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
            switch (lexState) {
                case EndOfLineState.InDoubleQuoteStringLiteral:
                    text = "\"\\\n" + text;
                    offset = 3;
                    break;
                case EndOfLineState.InSingleQuoteStringLiteral:
                    text = "'\\\n" + text;
                    offset = 3;
                    break;
                case EndOfLineState.InMultiLineCommentTrivia:
                    text = "/*\n" + text;
                    offset = 3;
                    break;
                case EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate:
                    text = "`\n" + text;
                    offset = 2;
                    break;
                case EndOfLineState.InTemplateMiddleOrTail:
                    text = "}\n" + text;
                    offset = 2;
                // fallthrough
                case EndOfLineState.InTemplateSubstitutionPosition:
                    templateStack.push(SyntaxKind.TemplateHead);
                    break;
            }

            scanner.setText(text);

            const result: Classifications = {
                endOfLineState: EndOfLineState.None,
                spans: []
            };

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
                    if ((token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) && !noRegexTable[lastNonTriviaToken]) {
                        if (scanner.reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                            token = SyntaxKind.RegularExpressionLiteral;
                        }
                    }
                    else if (lastNonTriviaToken === SyntaxKind.DotToken && isKeyword(token)) {
                        token = SyntaxKind.Identifier;
                    }
                    else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                        // We have two keywords in a row.  Only treat the second as a keyword if
                        // it's a sequence that could legally occur in the language.  Otherwise
                        // treat it as an identifier.  This way, if someone writes "private var"
                        // we recognize that 'var' is actually an identifier here.
                        token = SyntaxKind.Identifier;
                    }
                    else if (lastNonTriviaToken === SyntaxKind.Identifier &&
                        token === SyntaxKind.LessThanToken) {
                        // Could be the start of something generic.  Keep track of that by bumping
                        // up the current count of generic contexts we may be in.
                        angleBracketStack++;
                    }
                    else if (token === SyntaxKind.GreaterThanToken && angleBracketStack > 0) {
                        // If we think we're currently in something generic, then mark that that
                        // generic entity is complete.
                        angleBracketStack--;
                    }
                    else if (token === SyntaxKind.AnyKeyword ||
                        token === SyntaxKind.StringKeyword ||
                        token === SyntaxKind.NumberKeyword ||
                        token === SyntaxKind.BooleanKeyword ||
                        token === SyntaxKind.SymbolKeyword) {
                        if (angleBracketStack > 0 && !syntacticClassifierAbsent) {
                            // If it looks like we're could be in something generic, don't classify this
                            // as a keyword.  We may just get overwritten by the syntactic classifier,
                            // causing a noisy experience for the user.
                            token = SyntaxKind.Identifier;
                        }
                    }
                    else if (token === SyntaxKind.TemplateHead) {
                        templateStack.push(token);
                    }
                    else if (token === SyntaxKind.OpenBraceToken) {
                        // If we don't have anything on the template stack,
                        // then we aren't trying to keep track of a previously scanned template head.
                        if (templateStack.length > 0) {
                            templateStack.push(token);
                        }
                    }
                    else if (token === SyntaxKind.CloseBraceToken) {
                        // If we don't have anything on the template stack,
                        // then we aren't trying to keep track of a previously scanned template head.
                        if (templateStack.length > 0) {
                            const lastTemplateStackToken = lastOrUndefined(templateStack);

                            if (lastTemplateStackToken === SyntaxKind.TemplateHead) {
                                token = scanner.reScanTemplateToken();

                                // Only pop on a TemplateTail; a TemplateMiddle indicates there is more for us.
                                if (token === SyntaxKind.TemplateTail) {
                                    templateStack.pop();
                                }
                                else {
                                    Debug.assert(token === SyntaxKind.TemplateMiddle, "Should have been a template middle. Was " + token);
                                }
                            }
                            else {
                                Debug.assert(lastTemplateStackToken === SyntaxKind.OpenBraceToken, "Should have been an open brace. Was: " + token);
                                templateStack.pop();
                            }
                        }
                    }

                    lastNonTriviaToken = token;
                }

                processToken();
            }
            while (token !== SyntaxKind.EndOfFileToken);

            return result;

            function processToken(): void {
                const start = scanner.getTokenPos();
                const end = scanner.getTextPos();

                addResult(start, end, classFromKind(token));

                if (end >= text.length) {
                    if (token === SyntaxKind.StringLiteral) {
                        // Check to see if we finished up on a multiline string literal.
                        const tokenText = scanner.getTokenText();
                        if (scanner.isUnterminated()) {
                            const lastCharIndex = tokenText.length - 1;

                            let numBackslashes = 0;
                            while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === CharacterCodes.backslash) {
                                numBackslashes++;
                            }

                            // If we have an odd number of backslashes, then the multiline string is unclosed
                            if (numBackslashes & 1) {
                                const quoteChar = tokenText.charCodeAt(0);
                                result.endOfLineState = quoteChar === CharacterCodes.doubleQuote
                                    ? EndOfLineState.InDoubleQuoteStringLiteral
                                    : EndOfLineState.InSingleQuoteStringLiteral;
                            }
                        }
                    }
                    else if (token === SyntaxKind.MultiLineCommentTrivia) {
                        // Check to see if the multiline comment was unclosed.
                        if (scanner.isUnterminated()) {
                            result.endOfLineState = EndOfLineState.InMultiLineCommentTrivia;
                        }
                    }
                    else if (isTemplateLiteralKind(token)) {
                        if (scanner.isUnterminated()) {
                            if (token === SyntaxKind.TemplateTail) {
                                result.endOfLineState = EndOfLineState.InTemplateMiddleOrTail;
                            }
                            else if (token === SyntaxKind.NoSubstitutionTemplateLiteral) {
                                result.endOfLineState = EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate;
                            }
                            else {
                                Debug.fail("Only 'NoSubstitutionTemplateLiteral's and 'TemplateTail's can be unterminated; got SyntaxKind #" + token);
                            }
                        }
                    }
                    else if (templateStack.length > 0 && lastOrUndefined(templateStack) === SyntaxKind.TemplateHead) {
                        result.endOfLineState = EndOfLineState.InTemplateSubstitutionPosition;
                    }
                }
            }

            function addResult(start: number, end: number, classification: ClassificationType): void {
                if (classification === ClassificationType.whiteSpace) {
                    // Don't bother with whitespace classifications.  They're not needed.
                    return;
                }

                if (start === 0 && offset > 0) {
                    // We're classifying the first token, and this was a case where we prepended
                    // text.  We should consider the start of this token to be at the start of
                    // the original text.
                    start += offset;
                }

                // All our tokens are in relation to the augmented text.  Move them back to be
                // relative to the original text.
                start -= offset;
                end -= offset;
                const length = end - start;

                if (length > 0) {
                    result.spans.push(start);
                    result.spans.push(length);
                    result.spans.push(classification);
                }
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

        function isKeyword(token: SyntaxKind): boolean {
            return token >= SyntaxKind.FirstKeyword && token <= SyntaxKind.LastKeyword;
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

        return {
            getClassificationsForLine,
            getEncodedLexicalClassifications
        };
    }

    /* @internal */
    export function getSemanticClassifications(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFile: SourceFile, classifiableNames: Map<string>, span: TextSpan): ClassifiedSpan[] {
        return convertClassifications(getEncodedSemanticClassifications(typeChecker, cancellationToken, sourceFile, classifiableNames, span));
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
    export function getEncodedSemanticClassifications(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFile: SourceFile, classifiableNames: Map<string>, span: TextSpan): Classifications {
        const result: number[] = [];
        processNode(sourceFile);

        return { spans: result, endOfLineState: EndOfLineState.None };

        function pushClassification(start: number, length: number, type: ClassificationType) {
            result.push(start);
            result.push(length);
            result.push(type);
        }

        function classifySymbol(symbol: Symbol, meaningAtPosition: SemanticMeaning): ClassificationType {
            const flags = symbol.getFlags();
            if ((flags & SymbolFlags.Classifiable) === SymbolFlags.None) {
                return;
            }

            if (flags & SymbolFlags.Class) {
                return ClassificationType.className;
            }
            else if (flags & SymbolFlags.Enum) {
                return ClassificationType.enumName;
            }
            else if (flags & SymbolFlags.TypeAlias) {
                return ClassificationType.typeAliasName;
            }
            else if (meaningAtPosition & SemanticMeaning.Type) {
                if (flags & SymbolFlags.Interface) {
                    return ClassificationType.interfaceName;
                }
                else if (flags & SymbolFlags.TypeParameter) {
                    return ClassificationType.typeParameterName;
                }
            }
            else if (flags & SymbolFlags.Module) {
                // Only classify a module as such if
                //  - It appears in a namespace context.
                //  - There exists a module declaration which actually impacts the value side.
                if (meaningAtPosition & SemanticMeaning.Namespace ||
                    (meaningAtPosition & SemanticMeaning.Value && hasValueSideModule(symbol))) {
                    return ClassificationType.moduleName;
                }
            }

            return undefined;

            /**
             * Returns true if there exists a module that introduces entities on the value side.
             */
            function hasValueSideModule(symbol: Symbol): boolean {
                return forEach(symbol.declarations, declaration => {
                    return declaration.kind === SyntaxKind.ModuleDeclaration &&
                        getModuleInstanceState(declaration) === ModuleInstanceState.Instantiated;
                });
            }
        }

        function processNode(node: Node) {
            // Only walk into nodes that intersect the requested span.
            if (node && textSpanIntersectsWith(span, node.getFullStart(), node.getFullWidth())) {
                const kind = node.kind;
                checkForClassificationCancellation(cancellationToken, kind);

                if (kind === SyntaxKind.Identifier && !nodeIsMissing(node)) {
                    const identifier = <Identifier>node;

                    // Only bother calling into the typechecker if this is an identifier that
                    // could possibly resolve to a type name.  This makes classification run
                    // in a third of the time it would normally take.
                    if (classifiableNames.get(identifier.text)) {
                        const symbol = typeChecker.getSymbolAtLocation(node);
                        if (symbol) {
                            const type = classifySymbol(symbol, getMeaningFromLocation(node));
                            if (type) {
                                pushClassification(node.getStart(), node.getWidth(), type);
                            }
                        }
                    }
                }

                forEachChild(node, processNode);
            }
        }
    }

    function getClassificationTypeName(type: ClassificationType) {
        switch (type) {
            case ClassificationType.comment: return ClassificationTypeNames.comment;
            case ClassificationType.identifier: return ClassificationTypeNames.identifier;
            case ClassificationType.keyword: return ClassificationTypeNames.keyword;
            case ClassificationType.numericLiteral: return ClassificationTypeNames.numericLiteral;
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
        }
    }

    function convertClassifications(classifications: Classifications): ClassifiedSpan[] {
        Debug.assert(classifications.spans.length % 3 === 0);
        const dense = classifications.spans;
        const result: ClassifiedSpan[] = [];
        for (let i = 0, n = dense.length; i < n; i += 3) {
            result.push({
                textSpan: createTextSpan(dense[i], dense[i + 1]),
                classificationType: getClassificationTypeName(dense[i + 2])
            });
        }

        return result;
    }

    /* @internal */
    export function getSyntacticClassifications(cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): ClassifiedSpan[] {
        return convertClassifications(getEncodedSyntacticClassifications(cancellationToken, sourceFile, span));
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

                // Don't bother with newlines/whitespace.
                if (kind === SyntaxKind.NewLineTrivia || kind === SyntaxKind.WhitespaceTrivia) {
                    continue;
                }

                // Only bother with the trivia if it at least intersects the span of interest.
                if (isComment(kind)) {
                    classifyComment(token, kind, start, width);

                    // Classifying a comment might cause us to reuse the trivia scanner
                    // (because of jsdoc comments).  So after we classify the comment make
                    // sure we set the scanner position back to where it needs to be.
                    triviaScanner.setTextPos(end);
                    continue;
                }

                if (kind === SyntaxKind.ConflictMarkerTrivia) {
                    const text = sourceFile.text;
                    const ch = text.charCodeAt(start);

                    // for the <<<<<<< and >>>>>>> markers, we just add them in as comments
                    // in the classification stream.
                    if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
                        pushClassification(start, width, ClassificationType.comment);
                        continue;
                    }

                    // for the ======== add a comment for the first line, and then lex all
                    // subsequent lines up until the end of the conflict marker.
                    Debug.assert(ch === CharacterCodes.equals);
                    classifyDisabledMergeCode(text, start, end);
                }
            }
        }

        function classifyComment(token: Node, kind: SyntaxKind, start: number, width: number) {
            if (kind === SyntaxKind.MultiLineCommentTrivia) {
                // See if this is a doc comment.  If so, we'll classify certain portions of it
                // specially.
                const docCommentAndDiagnostics = parseIsolatedJSDocComment(sourceFile.text, start, width);
                if (docCommentAndDiagnostics && docCommentAndDiagnostics.jsDoc) {
                    docCommentAndDiagnostics.jsDoc.parent = token;
                    classifyJSDocComment(docCommentAndDiagnostics.jsDoc);
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

                    pushClassification(tag.atToken.pos, tag.atToken.end - tag.atToken.pos, ClassificationType.punctuation);
                    pushClassification(tag.tagName.pos, tag.tagName.end - tag.tagName.pos, ClassificationType.docCommentTagName);

                    pos = tag.tagName.end;

                    switch (tag.kind) {
                        case SyntaxKind.JSDocParameterTag:
                            processJSDocParameterTag(<JSDocParameterTag>tag);
                            break;
                        case SyntaxKind.JSDocTemplateTag:
                            processJSDocTemplateTag(<JSDocTemplateTag>tag);
                            break;
                        case SyntaxKind.JSDocTypeTag:
                            processElement((<JSDocTypeTag>tag).typeExpression);
                            break;
                        case SyntaxKind.JSDocReturnTag:
                            processElement((<JSDocReturnTag>tag).typeExpression);
                            break;
                    }

                    pos = tag.end;
                }
            }

            if (pos !== docComment.end) {
                pushCommentRange(pos, docComment.end - pos);
            }

            return;

            function processJSDocParameterTag(tag: JSDocParameterTag) {
                if (tag.preParameterName) {
                    pushCommentRange(pos, tag.preParameterName.pos - pos);
                    pushClassification(tag.preParameterName.pos, tag.preParameterName.end - tag.preParameterName.pos, ClassificationType.parameterName);
                    pos = tag.preParameterName.end;
                }

                if (tag.typeExpression) {
                    pushCommentRange(pos, tag.typeExpression.pos - pos);
                    processElement(tag.typeExpression);
                    pos = tag.typeExpression.end;
                }

                if (tag.postParameterName) {
                    pushCommentRange(pos, tag.postParameterName.pos - pos);
                    pushClassification(tag.postParameterName.pos, tag.postParameterName.end - tag.postParameterName.pos, ClassificationType.parameterName);
                    pos = tag.postParameterName.end;
                }
            }
        }

        function processJSDocTemplateTag(tag: JSDocTemplateTag) {
            for (const child of tag.getChildren()) {
                processElement(child);
            }
        }

        function classifyDisabledMergeCode(text: string, start: number, end: number) {
            // Classify the line that the ======= marker is on as a comment.  Then just lex
            // all further tokens and add them to the result.
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
            if (isJSDocTag(node)) {
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

        function tryClassifyJsxElementName(token: Node): ClassificationType {
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
        function classifyTokenType(tokenKind: SyntaxKind, token?: Node): ClassificationType {
            if (isKeyword(tokenKind)) {
                return ClassificationType.keyword;
            }

            // Special case < and >  If they appear in a generic context they are punctuation,
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
                    if (tokenKind === SyntaxKind.EqualsToken) {
                        // the '=' in a variable declaration is special cased here.
                        if (token.parent.kind === SyntaxKind.VariableDeclaration ||
                            token.parent.kind === SyntaxKind.PropertyDeclaration ||
                            token.parent.kind === SyntaxKind.Parameter ||
                            token.parent.kind === SyntaxKind.JsxAttribute) {
                            return ClassificationType.operator;
                        }
                    }

                    if (token.parent.kind === SyntaxKind.BinaryExpression ||
                        token.parent.kind === SyntaxKind.PrefixUnaryExpression ||
                        token.parent.kind === SyntaxKind.PostfixUnaryExpression ||
                        token.parent.kind === SyntaxKind.ConditionalExpression) {
                        return ClassificationType.operator;
                    }
                }

                return ClassificationType.punctuation;
            }
            else if (tokenKind === SyntaxKind.NumericLiteral) {
                return ClassificationType.numericLiteral;
            }
            else if (tokenKind === SyntaxKind.StringLiteral) {
                return token.parent.kind === SyntaxKind.JsxAttribute ? ClassificationType.jsxAttributeStringLiteralValue : ClassificationType.stringLiteral;
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

        function processElement(element: Node) {
            if (!element) {
                return;
            }

            // Ignore nodes that don't intersect the original span to classify.
            if (decodedTextSpanIntersectsWith(spanStart, spanLength, element.pos, element.getFullWidth())) {
                checkForClassificationCancellation(cancellationToken, element.kind);

                const children = element.getChildren(sourceFile);
                for (let i = 0, n = children.length; i < n; i++) {
                    const child = children[i];
                    if (!tryClassifyNode(child)) {
                        // Recurse into our child nodes.
                        processElement(child);
                    }
                }
            }
        }
    }
}
