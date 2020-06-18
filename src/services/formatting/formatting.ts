/* @internal */
namespace ts.formatting {
    export interface FormatContext {
        readonly options: FormatCodeSettings;
        readonly getRules: RulesMap;
        readonly host: FormattingHost;
    }

    export interface TextRangeWithKind<T extends SyntaxKind = SyntaxKind> extends TextRange {
        kind: T;
    }

    export type TextRangeWithTriviaKind = TextRangeWithKind<TriviaKind>;

    export interface TokenInfo {
        leadingTrivia: TextRangeWithTriviaKind[] | undefined;
        token: TextRangeWithKind;
        trailingTrivia: TextRangeWithTriviaKind[] | undefined;
    }

    export function createTextRangeWithKind<T extends SyntaxKind>(pos: number, end: number, kind: T): TextRangeWithKind<T> {
        const textRangeWithKind: TextRangeWithKind<T> = { pos, end, kind };
        if (Debug.isDebugging) {
            Object.defineProperty(textRangeWithKind, "__debugKind", {
                get: () => Debug.formatSyntaxKind(kind),
            });
        }
        return textRangeWithKind;
    }

    const enum Constants {
        Unknown = -1
    }

    /*
     * Indentation for the scope that can be dynamically recomputed.
     * i.e
     * while(true)
     * { let x;
     * }
     * Normally indentation is applied only to the first token in line so at glance 'let' should not be touched.
     * However if some format rule adds new line between '}' and 'let' 'let' will become
     * the first token in line so it should be indented
     */
    interface DynamicIndentation {
        getIndentationForToken(tokenLine: number, tokenKind: SyntaxKind, container: Node, suppressDelta: boolean): number;
        getIndentationForComment(owningToken: SyntaxKind, tokenIndentation: number, container: Node): number;
        /**
         * Indentation for open and close tokens of the node if it is block or another node that needs special indentation
         * ... {
         * .........<child>
         * ....}
         *  ____ - indentation
         *      ____ - delta
         */
        getIndentation(): number;
        /**
         * Prefered relative indentation for child nodes.
         * Delta is used to carry the indentation info
         * foo(bar({
         *     $
         * }))
         * Both 'foo', 'bar' introduce new indentation with delta = 4, but total indentation in $ is not 8.
         * foo: { indentation: 0, delta: 4 }
         * bar: { indentation: foo.indentation + foo.delta = 4, delta: 4} however 'foo' and 'bar' are on the same line
         * so bar inherits indentation from foo and bar.delta will be 4
         *
         */
        getDelta(child: TextRangeWithKind): number;
        /**
         * Formatter calls this function when rule adds or deletes new lines from the text
         * so indentation scope can adjust values of indentation and delta.
         */
        recomputeIndentation(lineAddedByFormatting: boolean, parent: Node): void;
    }

    export function formatOnEnter(position: number, sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        const line = sourceFile.getLineAndCharacterOfPosition(position).line;
        if (line === 0) {
            return [];
        }
        // After the enter key, the cursor is now at a new line. The new line may or may not contain non-whitespace characters.
        // If the new line has only whitespaces, we won't want to format this line, because that would remove the indentation as
        // trailing whitespaces. So the end of the formatting span should be the later one between:
        //  1. the end of the previous line
        //  2. the last non-whitespace character in the current line
        let endOfFormatSpan = getEndLinePosition(line, sourceFile);
        while (isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(endOfFormatSpan))) {
            endOfFormatSpan--;
        }
        // if the character at the end of the span is a line break, we shouldn't include it, because it indicates we don't want to
        // touch the current line at all. Also, on some OSes the line break consists of two characters (\r\n), we should test if the
        // previous character before the end of format span is line break character as well.
        if (isLineBreak(sourceFile.text.charCodeAt(endOfFormatSpan))) {
            endOfFormatSpan--;
        }
        const span = {
            // get start position for the previous line
            pos: getStartPositionOfLine(line - 1, sourceFile),
            // end value is exclusive so add 1 to the result
            end: endOfFormatSpan + 1
        };
        return formatSpan(span, sourceFile, formatContext, FormattingRequestKind.FormatOnEnter);
    }

    export function formatOnSemicolon(position: number, sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        const semicolon = findImmediatelyPrecedingTokenOfKind(position, SyntaxKind.SemicolonToken, sourceFile);
        return formatNodeLines(findOutermostNodeWithinListLevel(semicolon), sourceFile, formatContext, FormattingRequestKind.FormatOnSemicolon);
    }

    export function formatOnOpeningCurly(position: number, sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        const openingCurly = findImmediatelyPrecedingTokenOfKind(position, SyntaxKind.OpenBraceToken, sourceFile);
        if (!openingCurly) {
            return [];
        }
        const curlyBraceRange = openingCurly.parent;
        const outermostNode = findOutermostNodeWithinListLevel(curlyBraceRange);

        /**
         * We limit the span to end at the opening curly to handle the case where
         * the brace matched to that just typed will be incorrect after further edits.
         * For example, we could type the opening curly for the following method
         * body without brace-matching activated:
         * ```
         * class C {
         *     foo()
         * }
         * ```
         * and we wouldn't want to move the closing brace.
         */
        const textRange: TextRange = {
            pos: getLineStartPositionForPosition(outermostNode!.getStart(sourceFile), sourceFile), // TODO: GH#18217
            end: position
        };

        return formatSpan(textRange, sourceFile, formatContext, FormattingRequestKind.FormatOnOpeningCurlyBrace);
    }

    export function formatOnClosingCurly(position: number, sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        const precedingToken = findImmediatelyPrecedingTokenOfKind(position, SyntaxKind.CloseBraceToken, sourceFile);
        return formatNodeLines(findOutermostNodeWithinListLevel(precedingToken), sourceFile, formatContext, FormattingRequestKind.FormatOnClosingCurlyBrace);
    }

    export function formatDocument(sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        const span = {
            pos: 0,
            end: sourceFile.text.length
        };
        return formatSpan(span, sourceFile, formatContext, FormattingRequestKind.FormatDocument);
    }

    export function formatSelection(start: number, end: number, sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
        // format from the beginning of the line
        const span = {
            pos: getLineStartPositionForPosition(start, sourceFile),
            end,
        };
        return formatSpan(span, sourceFile, formatContext, FormattingRequestKind.FormatSelection);
    }

    /**
     * Validating `expectedTokenKind` ensures the token was typed in the context we expect (eg: not a comment).
     * @param expectedTokenKind The kind of the last token constituting the desired parent node.
     */
    function findImmediatelyPrecedingTokenOfKind(end: number, expectedTokenKind: SyntaxKind, sourceFile: SourceFile): Node | undefined {
        const precedingToken = findPrecedingToken(end, sourceFile);

        return precedingToken && precedingToken.kind === expectedTokenKind && end === precedingToken.getEnd() ?
            precedingToken :
            undefined;
    }

    /**
     * Finds the highest node enclosing `node` at the same list level as `node`
     * and whose end does not exceed `node.end`.
     *
     * Consider typing the following
     * ```
     * let x = 1;
     * while (true) {
     * }
     * ```
     * Upon typing the closing curly, we want to format the entire `while`-statement, but not the preceding
     * variable declaration.
     */
    function findOutermostNodeWithinListLevel(node: Node | undefined) {
        let current = node;
        while (current &&
            current.parent &&
            current.parent.end === node!.end &&
            !isListElement(current.parent, current)) {
            current = current.parent;
        }

        return current;
    }

    // Returns true if node is a element in some list in parent
    // i.e. parent is class declaration with the list of members and node is one of members.
    function isListElement(parent: Node, node: Node): boolean {
        switch (parent.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
                return rangeContainsRange((<InterfaceDeclaration>parent).members, node);
            case SyntaxKind.ModuleDeclaration:
                const body = (<ModuleDeclaration>parent).body;
                return !!body && body.kind === SyntaxKind.ModuleBlock && rangeContainsRange(body.statements, node);
            case SyntaxKind.SourceFile:
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
                return rangeContainsRange((<Block>parent).statements, node);
            case SyntaxKind.CatchClause:
                return rangeContainsRange((<CatchClause>parent).block.statements, node);
        }

        return false;
    }

    /** find node that fully contains given text range */
    function findEnclosingNode(range: TextRange, sourceFile: SourceFile): Node {
        return find(sourceFile);

        function find(n: Node): Node {
            const candidate = forEachChild(n, c => startEndContainsRange(c.getStart(sourceFile), c.end, range) && c);
            if (candidate) {
                const result = find(candidate);
                if (result) {
                    return result;
                }
            }

            return n;
        }
    }

    /** formatting is not applied to ranges that contain parse errors.
     * This function will return a predicate that for a given text range will tell
     * if there are any parse errors that overlap with the range.
     */
    function prepareRangeContainsErrorFunction(errors: readonly Diagnostic[], originalRange: TextRange): (r: TextRange) => boolean {
        if (!errors.length) {
            return rangeHasNoErrors;
        }

        // pick only errors that fall in range
        const sorted = errors
            .filter(d => rangeOverlapsWithStartEnd(originalRange, d.start!, d.start! + d.length!)) // TODO: GH#18217
            .sort((e1, e2) => e1.start! - e2.start!);

        if (!sorted.length) {
            return rangeHasNoErrors;
        }

        let index = 0;

        return r => {
            // in current implementation sequence of arguments [r1, r2...] is monotonically increasing.
            // 'index' tracks the index of the most recent error that was checked.
            while (true) {
                if (index >= sorted.length) {
                    // all errors in the range were already checked -> no error in specified range
                    return false;
                }

                const error = sorted[index];
                if (r.end <= error.start!) {
                    // specified range ends before the error referred by 'index' - no error in range
                    return false;
                }

                if (startEndOverlapsWithStartEnd(r.pos, r.end, error.start!, error.start! + error.length!)) {
                    // specified range overlaps with error range
                    return true;
                }

                index++;
            }
        };

        function rangeHasNoErrors(): boolean {
            return false;
        }
    }

    /**
     * Start of the original range might fall inside the comment - scanner will not yield appropriate results
     * This function will look for token that is located before the start of target range
     * and return its end as start position for the scanner.
     */
    function getScanStartPosition(enclosingNode: Node, originalRange: TextRange, sourceFile: SourceFile): number {
        const start = enclosingNode.getStart(sourceFile);
        if (start === originalRange.pos && enclosingNode.end === originalRange.end) {
            return start;
        }

        const precedingToken = findPrecedingToken(originalRange.pos, sourceFile);
        if (!precedingToken) {
            // no preceding token found - start from the beginning of enclosing node
            return enclosingNode.pos;
        }

        // preceding token ends after the start of original range (i.e when originalRange.pos falls in the middle of literal)
        // start from the beginning of enclosingNode to handle the entire 'originalRange'
        if (precedingToken.end >= originalRange.pos) {
            return enclosingNode.pos;
        }

        return precedingToken.end;
    }

    /*
     * For cases like
     * if (a ||
     *     b ||$
     *     c) {...}
     * If we hit Enter at $ we want line '    b ||' to be indented.
     * Formatting will be applied to the last two lines.
     * Node that fully encloses these lines is binary expression 'a ||...'.
     * Initial indentation for this node will be 0.
     * Binary expressions don't introduce new indentation scopes, however it is possible
     * that some parent node on the same line does - like if statement in this case.
     * Note that we are considering parents only from the same line with initial node -
     * if parent is on the different line - its delta was already contributed
     * to the initial indentation.
     */
    function getOwnOrInheritedDelta(n: Node, options: FormatCodeSettings, sourceFile: SourceFile): number {
        let previousLine = Constants.Unknown;
        let child: Node | undefined;
        while (n) {
            const line = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile)).line;
            if (previousLine !== Constants.Unknown && line !== previousLine) {
                break;
            }

            if (SmartIndenter.shouldIndentChildNode(options, n, child, sourceFile)) {
                return options.indentSize!;
            }

            previousLine = line;
            child = n;
            n = n.parent;
        }
        return 0;
    }

    export function formatNodeGivenIndentation(node: Node, sourceFileLike: SourceFileLike, languageVariant: LanguageVariant, initialIndentation: number, delta: number, formatContext: FormatContext): TextChange[] {
        const range = { pos: 0, end: sourceFileLike.text.length };
        return getFormattingScanner(sourceFileLike.text, languageVariant, range.pos, range.end, scanner => formatSpanWorker(
            range,
            node,
            initialIndentation,
            delta,
            scanner,
            formatContext,
            FormattingRequestKind.FormatSelection,
            _ => false, // assume that node does not have any errors
            sourceFileLike));
    }

    function formatNodeLines(node: Node | undefined, sourceFile: SourceFile, formatContext: FormatContext, requestKind: FormattingRequestKind): TextChange[] {
        if (!node) {
            return [];
        }

        const span = {
            pos: getLineStartPositionForPosition(node.getStart(sourceFile), sourceFile),
            end: node.end
        };

        return formatSpan(span, sourceFile, formatContext, requestKind);
    }

    function formatSpan(originalRange: TextRange, sourceFile: SourceFile, formatContext: FormatContext, requestKind: FormattingRequestKind): TextChange[] {
        // find the smallest node that fully wraps the range and compute the initial indentation for the node
        const enclosingNode = findEnclosingNode(originalRange, sourceFile);
        return getFormattingScanner(
            sourceFile.text,
            sourceFile.languageVariant,
            getScanStartPosition(enclosingNode, originalRange, sourceFile),
            originalRange.end,
            scanner => formatSpanWorker(
                originalRange,
                enclosingNode,
                SmartIndenter.getIndentationForNode(enclosingNode, originalRange, sourceFile, formatContext.options),
                getOwnOrInheritedDelta(enclosingNode, formatContext.options, sourceFile),
                scanner,
                formatContext,
                requestKind,
                prepareRangeContainsErrorFunction(sourceFile.parseDiagnostics, originalRange),
                sourceFile));
    }

    function formatSpanWorker(originalRange: TextRange,
        enclosingNode: Node,
        initialIndentation: number,
        delta: number,
        formattingScanner: FormattingScanner,
        { options, getRules, host }: FormatContext,
        requestKind: FormattingRequestKind,
        rangeContainsError: (r: TextRange) => boolean,
        sourceFile: SourceFileLike): TextChange[] {

        // formatting context is used by rules provider
        const formattingContext = new FormattingContext(sourceFile, requestKind, options);
        let previousRange: TextRangeWithKind;
        let previousParent: Node;
        let previousRangeStartLine: number;

        let lastIndentedLine: number;
        let indentationOnLastIndentedLine = Constants.Unknown;

        const edits: TextChange[] = [];

        formattingScanner.advance();

        if (formattingScanner.isOnToken()) {
            const startLine = sourceFile.getLineAndCharacterOfPosition(enclosingNode.getStart(sourceFile)).line;
            let undecoratedStartLine = startLine;
            if (enclosingNode.decorators) {
                undecoratedStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(enclosingNode, sourceFile)).line;
            }

            processNode(enclosingNode, enclosingNode, startLine, undecoratedStartLine, initialIndentation, delta);
        }

        if (!formattingScanner.isOnToken()) {
            const leadingTrivia = formattingScanner.getCurrentLeadingTrivia();
            if (leadingTrivia) {
                indentTriviaItems(leadingTrivia, initialIndentation, /*indentNextTokenOrTrivia*/ false,
                    item => processRange(item, sourceFile.getLineAndCharacterOfPosition(item.pos), enclosingNode, enclosingNode, /*dynamicIndentation*/ undefined!));
                if (options.trimTrailingWhitespace !== false) {
                    trimTrailingWhitespacesForRemainingRange();
                }
            }
        }

        return edits;

        // local functions

        /** Tries to compute the indentation for a list element.
         * If list element is not in range then
         * function will pick its actual indentation
         * so it can be pushed downstream as inherited indentation.
         * If list element is in the range - its indentation will be equal
         * to inherited indentation from its predecessors.
         */
        function tryComputeIndentationForListItem(startPos: number,
            endPos: number,
            parentStartLine: number,
            range: TextRange,
            inheritedIndentation: number): number {

            if (rangeOverlapsWithStartEnd(range, startPos, endPos) ||
                rangeContainsStartEnd(range, startPos, endPos) /* Not to miss zero-range nodes e.g. JsxText */) {

                if (inheritedIndentation !== Constants.Unknown) {
                    return inheritedIndentation;
                }
            }
            else {
                const startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
                const startLinePosition = getLineStartPositionForPosition(startPos, sourceFile);
                const column = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, startPos, sourceFile, options);
                if (startLine !== parentStartLine || startPos === column) {
                    // Use the base indent size if it is greater than
                    // the indentation of the inherited predecessor.
                    const baseIndentSize = SmartIndenter.getBaseIndentation(options);
                    return baseIndentSize > column ? baseIndentSize : column;
                }
            }

            return Constants.Unknown;
        }

        function computeIndentation(
            node: TextRangeWithKind,
            startLine: number,
            inheritedIndentation: number,
            parent: Node,
            parentDynamicIndentation: DynamicIndentation,
            effectiveParentStartLine: number
        ): { indentation: number, delta: number; } {
            const delta = SmartIndenter.shouldIndentChildNode(options, node) ? options.indentSize! : 0;

            if (effectiveParentStartLine === startLine) {
                // if node is located on the same line with the parent
                // - inherit indentation from the parent
                // - push children if either parent of node itself has non-zero delta
                return {
                    indentation: startLine === lastIndentedLine ? indentationOnLastIndentedLine : parentDynamicIndentation.getIndentation(),
                    delta: Math.min(options.indentSize!, parentDynamicIndentation.getDelta(node) + delta)
                };
            }
            else if (inheritedIndentation === Constants.Unknown) {
                if (node.kind === SyntaxKind.OpenParenToken && startLine === lastIndentedLine) {
                    // the is used for chaining methods formatting
                    // - we need to get the indentation on last line and the delta of parent
                    return { indentation: indentationOnLastIndentedLine, delta: parentDynamicIndentation.getDelta(node) };
                }
                else if (SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(parent, node, startLine, sourceFile)) {
                    return { indentation: parentDynamicIndentation.getIndentation(), delta };
                }
                else if (SmartIndenter.argumentStartsOnSameLineAsPreviousArgument(parent, node, startLine, sourceFile)) {
                    return { indentation: parentDynamicIndentation.getIndentation(), delta };
                }
                else {
                    return { indentation: parentDynamicIndentation.getIndentation() + parentDynamicIndentation.getDelta(node), delta };
                }
            }
            else {
                return { indentation: inheritedIndentation, delta };
            }
        }

        function getFirstNonDecoratorTokenOfNode(node: Node) {
            if (node.modifiers && node.modifiers.length) {
                return node.modifiers[0].kind;
            }
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration: return SyntaxKind.ClassKeyword;
                case SyntaxKind.InterfaceDeclaration: return SyntaxKind.InterfaceKeyword;
                case SyntaxKind.FunctionDeclaration: return SyntaxKind.FunctionKeyword;
                case SyntaxKind.EnumDeclaration: return SyntaxKind.EnumDeclaration;
                case SyntaxKind.GetAccessor: return SyntaxKind.GetKeyword;
                case SyntaxKind.SetAccessor: return SyntaxKind.SetKeyword;
                case SyntaxKind.MethodDeclaration:
                    if ((<MethodDeclaration>node).asteriskToken) {
                        return SyntaxKind.AsteriskToken;
                    }
                    // falls through

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.Parameter:
                    const name = getNameOfDeclaration(<Declaration>node);
                    if (name) {
                        return name.kind;
                    }
            }
        }

        function getDynamicIndentation(node: Node, nodeStartLine: number, indentation: number, delta: number): DynamicIndentation {
            return {
                getIndentationForComment: (kind, tokenIndentation, container) => {
                    switch (kind) {
                        // preceding comment to the token that closes the indentation scope inherits the indentation from the scope
                        // ..  {
                        //     // comment
                        // }
                        case SyntaxKind.CloseBraceToken:
                        case SyntaxKind.CloseBracketToken:
                        case SyntaxKind.CloseParenToken:
                            return indentation + getDelta(container);
                    }
                    return tokenIndentation !== Constants.Unknown ? tokenIndentation : indentation;
                },
                // if list end token is LessThanToken '>' then its delta should be explicitly suppressed
                // so that LessThanToken as a binary operator can still be indented.
                // foo.then
                //     <
                //         number,
                //         string,
                //     >();
                // vs
                // var a = xValue
                //     > yValue;
                getIndentationForToken: (line, kind, container, suppressDelta) =>
                    !suppressDelta && shouldAddDelta(line, kind, container) ? indentation + getDelta(container) : indentation,
                getIndentation: () => indentation,
                getDelta,
                recomputeIndentation: (lineAdded, parent) => {
                    if (SmartIndenter.shouldIndentChildNode(options, parent, node, sourceFile)) {
                        indentation += lineAdded ? options.indentSize! : -options.indentSize!;
                        delta = SmartIndenter.shouldIndentChildNode(options, node) ? options.indentSize! : 0;
                    }
                }
            };

            function shouldAddDelta(line: number, kind: SyntaxKind, container: Node): boolean {
                switch (kind) {
                    // open and close brace, 'else' and 'while' (in do statement) tokens has indentation of the parent
                    case SyntaxKind.OpenBraceToken:
                    case SyntaxKind.CloseBraceToken:
                    case SyntaxKind.CloseParenToken:
                    case SyntaxKind.ElseKeyword:
                    case SyntaxKind.WhileKeyword:
                    case SyntaxKind.AtToken:
                        return false;
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.GreaterThanToken:
                        switch (container.kind) {
                            case SyntaxKind.JsxOpeningElement:
                            case SyntaxKind.JsxClosingElement:
                            case SyntaxKind.JsxSelfClosingElement:
                                return false;
                        }
                        break;
                    case SyntaxKind.OpenBracketToken:
                    case SyntaxKind.CloseBracketToken:
                        if (container.kind !== SyntaxKind.MappedType) {
                            return false;
                        }
                        break;
                }
                // if token line equals to the line of containing node (this is a first token in the node) - use node indentation
                return nodeStartLine !== line
                    // if this token is the first token following the list of decorators, we do not need to indent
                    && !(node.decorators && kind === getFirstNonDecoratorTokenOfNode(node));
            }

            function getDelta(child: TextRangeWithKind) {
                // Delta value should be zero when the node explicitly prevents indentation of the child node
                return SmartIndenter.nodeWillIndentChild(options, node, child, sourceFile, /*indentByDefault*/ true) ? delta : 0;
            }
        }

        function processNode(node: Node, contextNode: Node, nodeStartLine: number, undecoratedNodeStartLine: number, indentation: number, delta: number) {
            if (!rangeOverlapsWithStartEnd(originalRange, node.getStart(sourceFile), node.getEnd())) {
                return;
            }

            const nodeDynamicIndentation = getDynamicIndentation(node, nodeStartLine, indentation, delta);

            // a useful observations when tracking context node
            //        /
            //      [a]
            //   /   |   \
            //  [b] [c] [d]
            // node 'a' is a context node for nodes 'b', 'c', 'd'
            // except for the leftmost leaf token in [b] - in this case context node ('e') is located somewhere above 'a'
            // this rule can be applied recursively to child nodes of 'a'.
            //
            // context node is set to parent node value after processing every child node
            // context node is set to parent of the token after processing every token

            let childContextNode = contextNode;

            // if there are any tokens that logically belong to node and interleave child nodes
            // such tokens will be consumed in processChildNode for the child that follows them
            forEachChild(
                node,
                child => {
                    processChildNode(child, /*inheritedIndentation*/ Constants.Unknown, node, nodeDynamicIndentation, nodeStartLine, undecoratedNodeStartLine, /*isListItem*/ false);
                },
                nodes => {
                    processChildNodes(nodes, node, nodeStartLine, nodeDynamicIndentation);
                });

            // proceed any tokens in the node that are located after child nodes
            while (formattingScanner.isOnToken()) {
                const tokenInfo = formattingScanner.readTokenInfo(node);
                if (tokenInfo.token.end > node.end) {
                    break;
                }
                if (node.kind === SyntaxKind.JsxText) {
                    // Intentation rules for jsx text are handled by `indentMultilineCommentOrJsxText` inside `processChildNode`; just fastforward past it here
                    formattingScanner.advance();
                    continue;
                }
                consumeTokenAndAdvanceScanner(tokenInfo, node, nodeDynamicIndentation, node);
            }

            if (!node.parent && formattingScanner.isOnEOF()) {
                const token = formattingScanner.readEOFTokenRange();
                if (token.end <= node.end && previousRange) {
                    processPair(
                        token,
                        sourceFile.getLineAndCharacterOfPosition(token.pos).line,
                        node,
                        previousRange,
                        previousRangeStartLine,
                        previousParent,
                        contextNode,
                        nodeDynamicIndentation);
                }
            }

            function processChildNode(
                child: Node,
                inheritedIndentation: number,
                parent: Node,
                parentDynamicIndentation: DynamicIndentation,
                parentStartLine: number,
                undecoratedParentStartLine: number,
                isListItem: boolean,
                isFirstListItem?: boolean): number {

                const childStartPos = child.getStart(sourceFile);

                const childStartLine = sourceFile.getLineAndCharacterOfPosition(childStartPos).line;

                let undecoratedChildStartLine = childStartLine;
                if (child.decorators) {
                    undecoratedChildStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(child, sourceFile)).line;
                }

                // if child is a list item - try to get its indentation, only if parent is within the original range.
                let childIndentationAmount = Constants.Unknown;

                if (isListItem && rangeContainsRange(originalRange, parent)) {
                    childIndentationAmount = tryComputeIndentationForListItem(childStartPos, child.end, parentStartLine, originalRange, inheritedIndentation);
                    if (childIndentationAmount !== Constants.Unknown) {
                        inheritedIndentation = childIndentationAmount;
                    }
                }

                // child node is outside the target range - do not dive inside
                if (!rangeOverlapsWithStartEnd(originalRange, child.pos, child.end)) {
                    if (child.end < originalRange.pos) {
                        formattingScanner.skipToEndOf(child);
                    }
                    return inheritedIndentation;
                }

                if (child.getFullWidth() === 0) {
                    return inheritedIndentation;
                }

                while (formattingScanner.isOnToken()) {
                    // proceed any parent tokens that are located prior to child.getStart()
                    const tokenInfo = formattingScanner.readTokenInfo(node);
                    if (tokenInfo.token.end > childStartPos) {
                        // stop when formatting scanner advances past the beginning of the child
                        break;
                    }

                    consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, node);
                }

                if (!formattingScanner.isOnToken()) {
                    return inheritedIndentation;
                }

                // JSX text shouldn't affect indenting
                if (isToken(child) && child.kind !== SyntaxKind.JsxText) {
                    // if child node is a token, it does not impact indentation, proceed it using parent indentation scope rules
                    const tokenInfo = formattingScanner.readTokenInfo(child);
                    Debug.assert(tokenInfo.token.end === child.end, "Token end is child end");
                    consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, child);
                    return inheritedIndentation;
                }

                const effectiveParentStartLine = child.kind === SyntaxKind.Decorator ? childStartLine : undecoratedParentStartLine;
                const childIndentation = computeIndentation(child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine);

                processNode(child, childContextNode, childStartLine, undecoratedChildStartLine, childIndentation.indentation, childIndentation.delta);
                if (child.kind === SyntaxKind.JsxText) {
                    const range: TextRange = { pos: child.getStart(), end: child.getEnd() };
                    if (range.pos !== range.end) { // don't indent zero-width jsx text
                        const siblings = parent.getChildren(sourceFile);
                        const currentIndex = findIndex(siblings, arg => arg.pos === child.pos);
                        const previousNode = siblings[currentIndex - 1];
                        if (previousNode) {
                            // The jsx text needs no indentation whatsoever if it ends on the same line the previous sibling ends on
                            if (sourceFile.getLineAndCharacterOfPosition(range.end).line !== sourceFile.getLineAndCharacterOfPosition(previousNode.end).line) {
                                // The first line is (already) "indented" if the text starts on the same line as the previous sibling element ends on
                                const firstLineIsIndented = sourceFile.getLineAndCharacterOfPosition(range.pos).line === sourceFile.getLineAndCharacterOfPosition(previousNode.end).line;
                                indentMultilineCommentOrJsxText(range, childIndentation.indentation, firstLineIsIndented, /*indentFinalLine*/ false, /*jsxStyle*/ true);
                            }
                        }
                    }
                }

                childContextNode = node;

                if (isFirstListItem && parent.kind === SyntaxKind.ArrayLiteralExpression && inheritedIndentation === Constants.Unknown) {
                    inheritedIndentation = childIndentation.indentation;
                }

                return inheritedIndentation;
            }

            function processChildNodes(nodes: NodeArray<Node>,
                parent: Node,
                parentStartLine: number,
                parentDynamicIndentation: DynamicIndentation): void {
                Debug.assert(isNodeArray(nodes));

                const listStartToken = getOpenTokenForList(parent, nodes);

                let listDynamicIndentation = parentDynamicIndentation;
                let startLine = parentStartLine;

                if (listStartToken !== SyntaxKind.Unknown) {
                    // introduce a new indentation scope for lists (including list start and end tokens)
                    while (formattingScanner.isOnToken()) {
                        const tokenInfo = formattingScanner.readTokenInfo(parent);
                        if (tokenInfo.token.end > nodes.pos) {
                            // stop when formatting scanner moves past the beginning of node list
                            break;
                        }
                        else if (tokenInfo.token.kind === listStartToken) {
                            // consume list start token
                            startLine = sourceFile.getLineAndCharacterOfPosition(tokenInfo.token.pos).line;

                            consumeTokenAndAdvanceScanner(tokenInfo, parent, parentDynamicIndentation, parent);

                            let indentationOnListStartToken: number;
                            if (indentationOnLastIndentedLine !== Constants.Unknown) {
                                // scanner just processed list start token so consider last indentation as list indentation
                                // function foo(): { // last indentation was 0, list item will be indented based on this value
                                //   foo: number;
                                // }: {};
                                indentationOnListStartToken = indentationOnLastIndentedLine;
                            }
                            else {
                                const startLinePosition = getLineStartPositionForPosition(tokenInfo.token.pos, sourceFile);
                                indentationOnListStartToken = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, tokenInfo.token.pos, sourceFile, options);
                            }

                            listDynamicIndentation = getDynamicIndentation(parent, parentStartLine, indentationOnListStartToken, options.indentSize!); // TODO: GH#18217
                        }
                        else {
                            // consume any tokens that precede the list as child elements of 'node' using its indentation scope
                            consumeTokenAndAdvanceScanner(tokenInfo, parent, parentDynamicIndentation, parent);
                        }
                    }
                }

                let inheritedIndentation = Constants.Unknown;
                for (let i = 0; i < nodes.length; i++) {
                    const child = nodes[i];
                    inheritedIndentation = processChildNode(child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, /*isListItem*/ true, /*isFirstListItem*/ i === 0);
                }

                const listEndToken = getCloseTokenForOpenToken(listStartToken);
                if (listEndToken !== SyntaxKind.Unknown && formattingScanner.isOnToken()) {
                    let tokenInfo: TokenInfo | undefined = formattingScanner.readTokenInfo(parent);
                    if (tokenInfo.token.kind === SyntaxKind.CommaToken && isCallLikeExpression(parent)) {
                        const commaTokenLine = sourceFile.getLineAndCharacterOfPosition(tokenInfo.token.pos).line;
                        if (startLine !== commaTokenLine) {
                            formattingScanner.advance();
                            tokenInfo = formattingScanner.isOnToken() ? formattingScanner.readTokenInfo(parent) : undefined;
                        }
                    }

                    // consume the list end token only if it is still belong to the parent
                    // there might be the case when current token matches end token but does not considered as one
                    // function (x: function) <--
                    // without this check close paren will be interpreted as list end token for function expression which is wrong
                    if (tokenInfo && tokenInfo.token.kind === listEndToken && rangeContainsRange(parent, tokenInfo.token)) {
                        // consume list end token
                        consumeTokenAndAdvanceScanner(tokenInfo, parent, listDynamicIndentation, parent, /*isListEndToken*/ true);
                    }
                }
            }

            function consumeTokenAndAdvanceScanner(currentTokenInfo: TokenInfo, parent: Node, dynamicIndentation: DynamicIndentation, container: Node, isListEndToken?: boolean): void {
                Debug.assert(rangeContainsRange(parent, currentTokenInfo.token));

                const lastTriviaWasNewLine = formattingScanner.lastTrailingTriviaWasNewLine();
                let indentToken = false;

                if (currentTokenInfo.leadingTrivia) {
                    processTrivia(currentTokenInfo.leadingTrivia, parent, childContextNode, dynamicIndentation);
                }

                let lineAction = LineAction.None;
                const isTokenInRange = rangeContainsRange(originalRange, currentTokenInfo.token);

                const tokenStart = sourceFile.getLineAndCharacterOfPosition(currentTokenInfo.token.pos);
                if (isTokenInRange) {
                    const rangeHasError = rangeContainsError(currentTokenInfo.token);
                    // save previousRange since processRange will overwrite this value with current one
                    const savePreviousRange = previousRange;
                    lineAction = processRange(currentTokenInfo.token, tokenStart, parent, childContextNode, dynamicIndentation);
                    // do not indent comments\token if token range overlaps with some error
                    if (!rangeHasError) {
                        if (lineAction === LineAction.None) {
                            // indent token only if end line of previous range does not match start line of the token
                            const prevEndLine = savePreviousRange && sourceFile.getLineAndCharacterOfPosition(savePreviousRange.end).line;
                            indentToken = lastTriviaWasNewLine && tokenStart.line !== prevEndLine;
                        }
                        else {
                            indentToken = lineAction === LineAction.LineAdded;
                        }
                    }
                }

                if (currentTokenInfo.trailingTrivia) {
                    processTrivia(currentTokenInfo.trailingTrivia, parent, childContextNode, dynamicIndentation);
                }

                if (indentToken) {
                    const tokenIndentation = (isTokenInRange && !rangeContainsError(currentTokenInfo.token)) ?
                        dynamicIndentation.getIndentationForToken(tokenStart.line, currentTokenInfo.token.kind, container, !!isListEndToken) :
                        Constants.Unknown;

                    let indentNextTokenOrTrivia = true;
                    if (currentTokenInfo.leadingTrivia) {
                        const commentIndentation = dynamicIndentation.getIndentationForComment(currentTokenInfo.token.kind, tokenIndentation, container);
                        indentNextTokenOrTrivia = indentTriviaItems(currentTokenInfo.leadingTrivia, commentIndentation, indentNextTokenOrTrivia,
                            item => insertIndentation(item.pos, commentIndentation, /*lineAdded*/ false));
                    }

                    // indent token only if is it is in target range and does not overlap with any error ranges
                    if (tokenIndentation !== Constants.Unknown && indentNextTokenOrTrivia) {
                        insertIndentation(currentTokenInfo.token.pos, tokenIndentation, lineAction === LineAction.LineAdded);

                        lastIndentedLine = tokenStart.line;
                        indentationOnLastIndentedLine = tokenIndentation;
                    }
                }

                formattingScanner.advance();

                childContextNode = parent;
            }
        }

        function indentTriviaItems(
            trivia: TextRangeWithKind[],
            commentIndentation: number,
            indentNextTokenOrTrivia: boolean,
            indentSingleLine: (item: TextRangeWithKind) => void) {
            for (const triviaItem of trivia) {
                const triviaInRange = rangeContainsRange(originalRange, triviaItem);
                switch (triviaItem.kind) {
                    case SyntaxKind.MultiLineCommentTrivia:
                        if (triviaInRange) {
                            indentMultilineCommentOrJsxText(triviaItem, commentIndentation, /*firstLineIsIndented*/ !indentNextTokenOrTrivia);
                        }
                        indentNextTokenOrTrivia = false;
                        break;
                    case SyntaxKind.SingleLineCommentTrivia:
                        if (indentNextTokenOrTrivia && triviaInRange) {
                            indentSingleLine(triviaItem);
                        }
                        indentNextTokenOrTrivia = false;
                        break;
                    case SyntaxKind.NewLineTrivia:
                        indentNextTokenOrTrivia = true;
                        break;
                }
            }
            return indentNextTokenOrTrivia;
        }

        function processTrivia(trivia: TextRangeWithKind[], parent: Node, contextNode: Node, dynamicIndentation: DynamicIndentation): void {
            for (const triviaItem of trivia) {
                if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
                    const triviaItemStart = sourceFile.getLineAndCharacterOfPosition(triviaItem.pos);
                    processRange(triviaItem, triviaItemStart, parent, contextNode, dynamicIndentation);
                }
            }
        }

        function processRange(range: TextRangeWithKind,
            rangeStart: LineAndCharacter,
            parent: Node,
            contextNode: Node,
            dynamicIndentation: DynamicIndentation): LineAction {

            const rangeHasError = rangeContainsError(range);
            let lineAction = LineAction.None;
            if (!rangeHasError) {
                if (!previousRange) {
                    // trim whitespaces starting from the beginning of the span up to the current line
                    const originalStart = sourceFile.getLineAndCharacterOfPosition(originalRange.pos);
                    trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                }
                else {
                    lineAction =
                        processPair(range, rangeStart.line, parent, previousRange, previousRangeStartLine, previousParent, contextNode, dynamicIndentation);
                }
            }

            previousRange = range;
            previousParent = parent;
            previousRangeStartLine = rangeStart.line;

            return lineAction;
        }

        function processPair(currentItem: TextRangeWithKind,
            currentStartLine: number,
            currentParent: Node,
            previousItem: TextRangeWithKind,
            previousStartLine: number,
            previousParent: Node,
            contextNode: Node,
            dynamicIndentation: DynamicIndentation): LineAction {

            formattingContext.updateContext(previousItem, previousParent, currentItem, currentParent, contextNode);

            const rules = getRules(formattingContext);

            let trimTrailingWhitespaces = formattingContext.options.trimTrailingWhitespace !== false;
            let lineAction = LineAction.None;
            if (rules) {
                // Apply rules in reverse order so that higher priority rules (which are first in the array)
                // win in a conflict with lower priority rules.
                forEachRight(rules, rule => {
                    lineAction = applyRuleEdits(rule, previousItem, previousStartLine, currentItem, currentStartLine);
                    switch (lineAction) {
                        case LineAction.LineRemoved:
                            // Handle the case where the next line is moved to be the end of this line.
                            // In this case we don't indent the next line in the next pass.
                            if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                dynamicIndentation.recomputeIndentation(/*lineAddedByFormatting*/ false, contextNode);
                            }
                            break;
                        case LineAction.LineAdded:
                            // Handle the case where token2 is moved to the new line.
                            // In this case we indent token2 in the next pass but we set
                            // sameLineIndent flag to notify the indenter that the indentation is within the line.
                            if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                dynamicIndentation.recomputeIndentation(/*lineAddedByFormatting*/ true, contextNode);
                            }
                            break;
                        default:
                            Debug.assert(lineAction === LineAction.None);
                    }

                    // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
                    trimTrailingWhitespaces = trimTrailingWhitespaces && !(rule.action & RuleAction.DeleteSpace) && rule.flags !== RuleFlags.CanDeleteNewLines;
                });
            }
            else {
                trimTrailingWhitespaces = trimTrailingWhitespaces && currentItem.kind !== SyntaxKind.EndOfFileToken;
            }

            if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
                // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
                trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem);
            }

            return lineAction;
        }

        function insertIndentation(pos: number, indentation: number, lineAdded: boolean | undefined): void {
            const indentationString = getIndentationString(indentation, options);
            if (lineAdded) {
                // new line is added before the token by the formatting rules
                // insert indentation string at the very beginning of the token
                recordReplace(pos, 0, indentationString);
            }
            else {
                const tokenStart = sourceFile.getLineAndCharacterOfPosition(pos);
                const startLinePosition = getStartPositionOfLine(tokenStart.line, sourceFile);
                if (indentation !== characterToColumn(startLinePosition, tokenStart.character) || indentationIsDifferent(indentationString, startLinePosition)) {
                    recordReplace(startLinePosition, tokenStart.character, indentationString);
                }
            }
        }

        function characterToColumn(startLinePosition: number, characterInLine: number): number {
            let column = 0;
            for (let i = 0; i < characterInLine; i++) {
                if (sourceFile.text.charCodeAt(startLinePosition + i) === CharacterCodes.tab) {
                    column += options.tabSize! - column % options.tabSize!;
                }
                else {
                    column++;
                }
            }
            return column;
        }

        function indentationIsDifferent(indentationString: string, startLinePosition: number): boolean {
            return indentationString !== sourceFile.text.substr(startLinePosition, indentationString.length);
        }

        function indentMultilineCommentOrJsxText(commentRange: TextRange, indentation: number, firstLineIsIndented: boolean, indentFinalLine = true, jsxTextStyleIndent?: boolean) {
            // split comment in lines
            let startLine = sourceFile.getLineAndCharacterOfPosition(commentRange.pos).line;
            const endLine = sourceFile.getLineAndCharacterOfPosition(commentRange.end).line;
            if (startLine === endLine) {
                if (!firstLineIsIndented) {
                    // treat as single line comment
                    insertIndentation(commentRange.pos, indentation, /*lineAdded*/ false);
                }
                return;
            }

            const parts: TextRange[] = [];
            let startPos = commentRange.pos;
            for (let line = startLine; line < endLine; line++) {
                const endOfLine = getEndLinePosition(line, sourceFile);
                parts.push({ pos: startPos, end: endOfLine });
                startPos = getStartPositionOfLine(line + 1, sourceFile);
            }

            if (indentFinalLine) {
                parts.push({ pos: startPos, end: commentRange.end });
            }

            if (parts.length === 0) return;

            const startLinePos = getStartPositionOfLine(startLine, sourceFile);

            const nonWhitespaceColumnInFirstPart =
                SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(startLinePos, parts[0].pos, sourceFile, options);

            if (indentation === nonWhitespaceColumnInFirstPart.column && !jsxTextStyleIndent) {
                return;
            }

            let startIndex = 0;
            if (firstLineIsIndented) {
                startIndex = 1;
                startLine++;
            }

            // shift all parts on the delta size
            let delta = indentation - nonWhitespaceColumnInFirstPart.column;
            for (let i = startIndex; i < parts.length; i++ , startLine++) {
                const startLinePos = getStartPositionOfLine(startLine, sourceFile);
                const nonWhitespaceCharacterAndColumn =
                    i === 0
                        ? nonWhitespaceColumnInFirstPart
                        : SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(parts[i].pos, parts[i].end, sourceFile, options);
                if (jsxTextStyleIndent) {
                    // skip adding indentation to blank lines
                    if (isLineBreak(sourceFile.text.charCodeAt(getStartPositionOfLine(startLine, sourceFile)))) continue;
                    // reset delta on every line
                    delta = indentation - nonWhitespaceCharacterAndColumn.column;
                }
                const newIndentation = nonWhitespaceCharacterAndColumn.column + delta;
                if (newIndentation > 0) {
                    const indentationString = getIndentationString(newIndentation, options);
                    recordReplace(startLinePos, nonWhitespaceCharacterAndColumn.character, indentationString);
                }
                else {
                    recordDelete(startLinePos, nonWhitespaceCharacterAndColumn.character);
                }
            }
        }

        function trimTrailingWhitespacesForLines(line1: number, line2: number, range?: TextRangeWithKind) {
            for (let line = line1; line < line2; line++) {
                const lineStartPosition = getStartPositionOfLine(line, sourceFile);
                const lineEndPosition = getEndLinePosition(line, sourceFile);

                // do not trim whitespaces in comments or template expression
                if (range && (isComment(range.kind) || isStringOrRegularExpressionOrTemplateLiteral(range.kind)) && range.pos <= lineEndPosition && range.end > lineEndPosition) {
                    continue;
                }

                const whitespaceStart = getTrailingWhitespaceStartPosition(lineStartPosition, lineEndPosition);
                if (whitespaceStart !== -1) {
                    Debug.assert(whitespaceStart === lineStartPosition || !isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(whitespaceStart - 1)));
                    recordDelete(whitespaceStart, lineEndPosition + 1 - whitespaceStart);
                }
            }
        }

        /**
         * @param start The position of the first character in range
         * @param end The position of the last character in range
         */
        function getTrailingWhitespaceStartPosition(start: number, end: number) {
            let pos = end;
            while (pos >= start && isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(pos))) {
                pos--;
            }
            if (pos !== end) {
                return pos + 1;
            }
            return -1;
        }

        /**
         * Trimming will be done for lines after the previous range
         */
        function trimTrailingWhitespacesForRemainingRange() {
            const startPosition = previousRange ? previousRange.end : originalRange.pos;

            const startLine = sourceFile.getLineAndCharacterOfPosition(startPosition).line;
            const endLine = sourceFile.getLineAndCharacterOfPosition(originalRange.end).line;

            trimTrailingWhitespacesForLines(startLine, endLine + 1, previousRange);
        }

        function recordDelete(start: number, len: number) {
            if (len) {
                edits.push(createTextChangeFromStartLength(start, len, ""));
            }
        }

        function recordReplace(start: number, len: number, newText: string) {
            if (len || newText) {
                edits.push(createTextChangeFromStartLength(start, len, newText));
            }
        }

        function recordInsert(start: number, text: string) {
            if (text) {
                edits.push(createTextChangeFromStartLength(start, 0, text));
            }
        }

        function applyRuleEdits(rule: Rule,
            previousRange: TextRangeWithKind,
            previousStartLine: number,
            currentRange: TextRangeWithKind,
            currentStartLine: number
        ): LineAction {
            const onLaterLine = currentStartLine !== previousStartLine;
            switch (rule.action) {
                case RuleAction.StopProcessingSpaceActions:
                    // no action required
                    return LineAction.None;
                case RuleAction.DeleteSpace:
                    if (previousRange.end !== currentRange.pos) {
                        // delete characters starting from t1.end up to t2.pos exclusive
                        recordDelete(previousRange.end, currentRange.pos - previousRange.end);
                        return onLaterLine ? LineAction.LineRemoved : LineAction.None;
                    }
                    break;
                case RuleAction.DeleteToken:
                    recordDelete(previousRange.pos, previousRange.end - previousRange.pos);
                    break;
                case RuleAction.InsertNewLine:
                    // exit early if we on different lines and rule cannot change number of newlines
                    // if line1 and line2 are on subsequent lines then no edits are required - ok to exit
                    // if line1 and line2 are separated with more than one newline - ok to exit since we cannot delete extra new lines
                    if (rule.flags !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
                        return LineAction.None;
                    }

                    // edit should not be applied if we have one line feed between elements
                    const lineDelta = currentStartLine - previousStartLine;
                    if (lineDelta !== 1) {
                        recordReplace(previousRange.end, currentRange.pos - previousRange.end, getNewLineOrDefaultFromHost(host, options));
                        return onLaterLine ? LineAction.None : LineAction.LineAdded;
                    }
                    break;
                case RuleAction.InsertSpace:
                    // exit early if we on different lines and rule cannot change number of newlines
                    if (rule.flags !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
                        return LineAction.None;
                    }

                    const posDelta = currentRange.pos - previousRange.end;
                    if (posDelta !== 1 || sourceFile.text.charCodeAt(previousRange.end) !== CharacterCodes.space) {
                        recordReplace(previousRange.end, currentRange.pos - previousRange.end, " ");
                        return onLaterLine ? LineAction.LineRemoved : LineAction.None;
                    }
                    break;
                case RuleAction.InsertTrailingSemicolon:
                    recordInsert(previousRange.end, ";");
            }
            return LineAction.None;
        }
    }

    const enum LineAction { None, LineAdded, LineRemoved }

    /**
     * @param precedingToken pass `null` if preceding token was already computed and result was `undefined`.
     */
    export function getRangeOfEnclosingComment(
        sourceFile: SourceFile,
        position: number,
        precedingToken?: Node | null,
        tokenAtPosition = getTokenAtPosition(sourceFile, position),
    ): CommentRange | undefined {
        const jsdoc = findAncestor(tokenAtPosition, isJSDoc);
        if (jsdoc) tokenAtPosition = jsdoc.parent;
        const tokenStart = tokenAtPosition.getStart(sourceFile);
        if (tokenStart <= position && position < tokenAtPosition.getEnd()) {
            return undefined;
        }

        // eslint-disable-next-line no-null/no-null
        precedingToken = precedingToken === null ? undefined : precedingToken === undefined ? findPrecedingToken(position, sourceFile) : precedingToken;

        // Between two consecutive tokens, all comments are either trailing on the former
        // or leading on the latter (and none are in both lists).
        const trailingRangesOfPreviousToken = precedingToken && getTrailingCommentRanges(sourceFile.text, precedingToken.end);
        const leadingCommentRangesOfNextToken = getLeadingCommentRangesOfNode(tokenAtPosition, sourceFile);
        const commentRanges = concatenate(trailingRangesOfPreviousToken, leadingCommentRangesOfNextToken);
        return commentRanges && find(commentRanges, range => rangeContainsPositionExclusive(range, position) ||
            // The end marker of a single-line comment does not include the newline character.
            // With caret at `^`, in the following case, we are inside a comment (^ denotes the cursor position):
            //
            //    // asdf   ^\n
            //
            // But for closed multi-line comments, we don't want to be inside the comment in the following case:
            //
            //    /* asdf */^
            //
            // However, unterminated multi-line comments *do* contain their end.
            //
            // Internally, we represent the end of the comment at the newline and closing '/', respectively.
            //
            position === range.end && (range.kind === SyntaxKind.SingleLineCommentTrivia || position === sourceFile.getFullWidth()));
    }

    function getOpenTokenForList(node: Node, list: readonly Node[]) {
        switch (node.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.ArrowFunction:
                if ((<FunctionDeclaration>node).typeParameters === list) {
                    return SyntaxKind.LessThanToken;
                }
                else if ((<FunctionDeclaration>node).parameters === list) {
                    return SyntaxKind.OpenParenToken;
                }
                break;
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                if ((<CallExpression>node).typeArguments === list) {
                    return SyntaxKind.LessThanToken;
                }
                else if ((<CallExpression>node).arguments === list) {
                    return SyntaxKind.OpenParenToken;
                }
                break;
            case SyntaxKind.TypeReference:
                if ((<TypeReferenceNode>node).typeArguments === list) {
                    return SyntaxKind.LessThanToken;
                }
                break;
            case SyntaxKind.TypeLiteral:
                return SyntaxKind.OpenBraceToken;
        }

        return SyntaxKind.Unknown;
    }

    function getCloseTokenForOpenToken(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.OpenParenToken:
                return SyntaxKind.CloseParenToken;
            case SyntaxKind.LessThanToken:
                return SyntaxKind.GreaterThanToken;
            case SyntaxKind.OpenBraceToken:
                return SyntaxKind.CloseBraceToken;
        }

        return SyntaxKind.Unknown;
    }

    let internedSizes: { tabSize: number; indentSize: number; };
    let internedTabsIndentation: string[] | undefined;
    let internedSpacesIndentation: string[] | undefined;

    export function getIndentationString(indentation: number, options: EditorSettings): string {
        // reset interned strings if FormatCodeOptions were changed
        const resetInternedStrings =
            !internedSizes || (internedSizes.tabSize !== options.tabSize || internedSizes.indentSize !== options.indentSize);

        if (resetInternedStrings) {
            internedSizes = { tabSize: options.tabSize!, indentSize: options.indentSize! };
            internedTabsIndentation = internedSpacesIndentation = undefined;
        }

        if (!options.convertTabsToSpaces) {
            const tabs = Math.floor(indentation / options.tabSize!);
            const spaces = indentation - tabs * options.tabSize!;

            let tabString: string;
            if (!internedTabsIndentation) {
                internedTabsIndentation = [];
            }

            if (internedTabsIndentation[tabs] === undefined) {
                internedTabsIndentation[tabs] = tabString = repeatString("\t", tabs);
            }
            else {
                tabString = internedTabsIndentation[tabs];
            }

            return spaces ? tabString + repeatString(" ", spaces) : tabString;
        }
        else {
            let spacesString: string;
            const quotient = Math.floor(indentation / options.indentSize!);
            const remainder = indentation % options.indentSize!;
            if (!internedSpacesIndentation) {
                internedSpacesIndentation = [];
            }

            if (internedSpacesIndentation[quotient] === undefined) {
                spacesString = repeatString(" ", options.indentSize! * quotient);
                internedSpacesIndentation[quotient] = spacesString;
            }
            else {
                spacesString = internedSpacesIndentation[quotient];
            }

            return remainder ? spacesString + repeatString(" ", remainder) : spacesString;
        }
    }
}
