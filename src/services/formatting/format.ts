///<reference path='..\services.ts' />
///<reference path='stringUtilities.ts' />
///<reference path='lineMapUtilities.ts' />
///<reference path='formattingScanner.ts' />
///<reference path='new\rulesProvider.ts' />

module ts.formatting {

    export interface TextRangeWithKind extends TextRange {
        kind: SyntaxKind;
    }

    export interface TokenInfo {
        leadingTrivia: TextRangeWithKind[];
        token: TextRangeWithKind;
        trailingTrivia: TextRangeWithKind[];
    }

    interface DynamicIndentation {
        getIndentation(): number;
        getCommentIndentation(): number;
        increaseCommentIndentation(delta: number): void;
        recomputeIndentation(lineAddedByFormatting: boolean): void;
    }

    export function formatOnEnter(position: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        var line = sourceFile.getLineAndCharacterFromPosition(position).line;
        Debug.assert(line >= 2);
        // get the span for the previous\current line
        var span = {
            // get start position for the previous line
            pos: getStartPositionOfLine(line - 1, sourceFile),
            // get end position for the current line (end value is exclusive so add 1 to the result)
            end: getEndLinePosition(line, sourceFile) + 1
        }        
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnEnter);
    }

    export function formatOnSemicolon(position: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        return formatOutermostParent(position, SyntaxKind.SemicolonToken, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnSemicolon);
    }

    export function formatOnClosingCurly(position: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[] {
        return formatOutermostParent(position, SyntaxKind.CloseBraceToken, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnClosingCurlyBrace);
    }

    export function formatDocument(sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        var span = {
            pos: 0,
            end: sourceFile.text.length
        };
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatDocument);
    }
    
    export function formatSelection(start: number, end: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        // format from the beginning of the line
        var span = {
            pos: getStartLinePositionForPosition(start, sourceFile),
            end: end
        };
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatSelection);
    }

    function formatOutermostParent(position: number, expectedLastToken: SyntaxKind, sourceFile: SourceFile, options: FormatCodeOptions, rulesProvider: RulesProvider, requestKind: FormattingRequestKind): TextChange[]{
        var parent = findOutermostParent(position, expectedLastToken, sourceFile);
        if (!parent) {
            return [];
        }
        var span = {
            pos: getStartLinePositionForPosition(parent.getStart(sourceFile), sourceFile),
            end: parent.end
        };
        return formatSpan(span, sourceFile, options, rulesProvider, requestKind);
    }

    function findOutermostParent(position: number, expectedTokenKind: SyntaxKind, sourceFile: SourceFile): Node {
        var precedingToken = findPrecedingToken(position, sourceFile);
        if (!precedingToken || precedingToken.kind !== expectedTokenKind) {
            return undefined;
        }

        // walk up and search for the parent node that ends at the same position with precedingToken
        var current = precedingToken;
        while (current &&
               current.parent &&
               current.parent.end === precedingToken.end &&
               !isListElement(current.parent, current)  ) {
            current = current.parent;
        }

        return current;
    }

    function isListElement(parent: Node, node: Node): boolean {
        switch (parent.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
                return rangeContainsRange((<InterfaceDeclaration>parent).members, node);
            case SyntaxKind.ModuleDeclaration:
                var body = (<ModuleDeclaration>parent).body;
                return body && body.kind === SyntaxKind.Block && rangeContainsRange((<Block>body).statements, node);
            case SyntaxKind.SourceFile:
            case SyntaxKind.Block:
            case SyntaxKind.TryBlock:
            case SyntaxKind.CatchBlock:
            case SyntaxKind.FinallyBlock:
            case SyntaxKind.ModuleBlock:
                return rangeContainsRange((<Block>parent).statements, node)
        }
    }

    function findEnclosingNode(range: TextRange, sourceFile: SourceFile): Node {
        return find(sourceFile);

        function find(n: Node): Node {
            var candidate = forEachChild(n, c => startEndContainsRange(c.getStart(sourceFile), c.end, range) && c);
            return (candidate && find(candidate)) || n;
        }
    }

    function prepareRangeContainsErrorFunction(errors: Diagnostic[], originalRange: TextRange): (r: TextRange) => boolean {
        if (!errors.length) {
            // no errors - always return false
            return r => false;
        }
        else {
            // pick only errors that fall in range
            var sorted = errors
                .filter(d => d.isParseError && (d.start >= originalRange.pos && d.start + d.length < originalRange.end))
                .sort((e1, e2) => e1.start - e2.start);
            
            if (!sorted.length) {
                // no errors in interesting span - always return false
                return r => false;
            }

            var index = 0;
            return r => {
                while (true) {
                    if (index >= sorted.length) {
                        return false;
                    }
                    else {
                        var curr = sorted[index];
                        if (r.end <= curr.start) {
                            return false;
                        }
                        else {
                            var s = Math.max(r.pos, curr.start);
                            var e = Math.min(r.end, curr.start + curr.length);
                            if (s < e) {
                                return true;
                            }
                            index++;
                        }
                    }
                }
            };
        }
    }

    function formatSpan(originalRange: TextRange,
        sourceFile: SourceFile,
        options: FormatCodeOptions,
        rulesProvider: RulesProvider,
        requestKind: FormattingRequestKind): TextChange[]{

        var rangeContainsError = prepareRangeContainsErrorFunction(sourceFile.syntacticErrors, originalRange);

        // formatting context to be used by rules provider to get rules
        var formattingContext = new FormattingContext(sourceFile, requestKind);

        var enclosingNode = findEnclosingNode(originalRange, sourceFile);
        var initialIndentation = SmartIndenter.getIndentationForNode(enclosingNode, originalRange, sourceFile, options);

        var formattingScanner = getFormattingScanner(sourceFile, enclosingNode, originalRange);        

        var previousRangeHasError: boolean;
        var previousRange: TextRangeWithKind;
        var previousParent: Node;
        var previousRangeStartLine: number;

        var edits: TextChange[] = [];
        var lastTriviaWasNewLine: boolean;

        formattingScanner.advance();

        if (formattingScanner.isOnToken()) {
            var startLine = sourceFile.getLineAndCharacterFromPosition(enclosingNode.getStart(sourceFile)).line;
            processNode(enclosingNode, enclosingNode, startLine, initialIndentation);
        }

        formattingScanner.close();

        return edits;

        function getIndentationDelta(node: Node, lineAdded: boolean): number {
            if (node.parent && SmartIndenter.shouldIndentChildNode(node.parent, node)) {
                return lineAdded ? options.IndentSize : - options.IndentSize;
            }
            return 0;
        }

        function getDynamicIndentation(node: Node, indentation: number, commentIndentation: number, parentIndentation: DynamicIndentation): DynamicIndentation {
            return {
                getCommentIndentation: () => commentIndentation,
                getIndentation: () => indentation,
                recomputeIndentation: (lineAdded) => {
                    if (parentIndentation) {
                        parentIndentation.recomputeIndentation(lineAdded);
                    }
                    var delta = getIndentationDelta(node, lineAdded);
                    if (delta) {
                        indentation += delta;
                        commentIndentation += delta;
                    }
                },
                increaseCommentIndentation: (delta) => {
                    commentIndentation += delta;
                }
            }
        }

        function getListItemIndentation(nodes: Node[], index: number, parentStartLine: number, options: EditorOptions): number {
            Debug.assert(index >= 0 && index < nodes.length);
            var node = nodes[index];
            var start = node.getStart(sourceFile);
            var nodeStartLine = sourceFile.getLineAndCharacterFromPosition(start).line;
            var startLinePosition = getStartPositionOfLine(nodeStartLine, sourceFile);
            var shareLine = nodeStartLine === parentStartLine;
            var column = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, start, sourceFile, options); // ?
            return shareLine && start !== column? -1 : column;
        }

        function processNode(node: Node, contextNode: Node, nodeStartLine: number, indentation: number) {
            if (!rangeOverlapsWithStartEnd(originalRange, node.getStart(sourceFile), node.getEnd())) {
                return;
            }
            var nodeIndentation = getDynamicIndentation(node, indentation, indentation, undefined);

            var childContextNode = contextNode;
            forEachChild(
                node,
                child => { 
                    processChildNode(child, undefined, /*containingList*/ undefined, /*listElementIndex*/ -1)
                },
                nodes => {
                    var listStartToken = SyntaxKind.Unknown;
                    var listEndToken = SyntaxKind.Unknown;
                    switch (node.kind) {
                        case SyntaxKind.Constructor:
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.Method:
                        case SyntaxKind.ArrowFunction:
                            if ((<FunctionDeclaration>node).typeParameters === nodes) {                                
                                listStartToken = SyntaxKind.LessThanToken
                                listEndToken = SyntaxKind.GreaterThanToken;
                            }
                            else if ((<FunctionDeclaration>node).parameters === nodes) {
                                listStartToken = SyntaxKind.OpenParenToken;
                                listEndToken = SyntaxKind.CloseParenToken;
                            }
                            break;
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                            if ((<CallExpression>node).typeArguments === nodes) {
                                listStartToken = SyntaxKind.LessThanToken
                                listEndToken = SyntaxKind.GreaterThanToken;
                            }
                            else if ((<CallExpression>node).arguments === nodes) {
                                listStartToken = SyntaxKind.OpenParenToken;
                                listEndToken = SyntaxKind.CloseParenToken;
                            }
                            break;
                    }

                    if (listStartToken !== SyntaxKind.Unknown) {
                        // try to consume open token
                        if (formattingScanner.isOnToken()) {
                            var tokenInfo = formattingScanner.readTokenInfo(node);
                            if (tokenInfo.token.kind === listStartToken) {
                                // make sure that this token does not belong to the child
                                doConsumeTokenAndAdvanceScanner(tokenInfo, node, nodeIndentation);
                            }
                        }
                    }

                    var inheritedIndentation: number = undefined;
                    for (var i = 0, len = nodes.length; i < len; ++i) {
                        inheritedIndentation = processChildNode(nodes[i], inheritedIndentation, /*containingList*/ nodes, /*listElementIndex*/ i)
                    }

                    if (listEndToken !== SyntaxKind.Unknown) {
                        if (formattingScanner.isOnToken()) {
                            var tokenInfo = formattingScanner.readTokenInfo(node);
                            if (tokenInfo.token.kind === listEndToken && formattingScanner.lastTrailingTriviaWasNewLine()) {
                                
                                var endTokenIndentation = nodeIndentation.getIndentation() + options.IndentSize;
                                doConsumeTokenAndAdvanceScanner(tokenInfo, node, getDynamicIndentation(node, endTokenIndentation, endTokenIndentation, nodeIndentation));
                            }
                        }
                    }
                }
            );

            // this eats up last tokens in the node
            while (formattingScanner.isOnToken()) {
                var tokenInfo = formattingScanner.readTokenInfo(node);
                if (tokenInfo.token.end > node.end) {
                    break;
                }

                if (SmartIndenter.nodeContentIsAlwaysIndented(node) && node.end === tokenInfo.token.end) {
                    nodeIndentation.increaseCommentIndentation(options.IndentSize);
                }
                doConsumeTokenAndAdvanceScanner(tokenInfo, node, nodeIndentation);
            }

            /// Local functions

            function processChildNode(child: Node, inheritedIndentation: number, containingList: Node[], listElementIndex: number): number {
                if (child.kind === SyntaxKind.Missing) {
                    return inheritedIndentation;
                }

                var start = child.getStart(sourceFile);
                while (formattingScanner.isOnToken()) {
                    var tokenInfo = formattingScanner.readTokenInfo(node);
                    if (tokenInfo.token.end > start) {
                        break;
                    }

                    doConsumeTokenAndAdvanceScanner(tokenInfo, node, nodeIndentation);
                }

                if (!formattingScanner.isOnToken()) {
                    return inheritedIndentation;
                }

                var childStart = sourceFile.getLineAndCharacterFromPosition(start);
                var actualIndentation = inheritedIndentation;

                var isChildInRange = rangeOverlapsWithStartEnd(originalRange, start, child.getEnd());

                var childIndentationValue: number;
                if (containingList) {
                    if (isChildInRange) {                        
                        if (inheritedIndentation !== undefined) {
                            // use indentation inherited from preceding list items
                            childIndentationValue = inheritedIndentation;
                        }
                        else {
                            var increaseIndentation =
                                node.kind !== SyntaxKind.SourceFile &&
                                node.pos !== child.pos &&
                                formattingScanner.lastTrailingTriviaWasNewLine();

                            var childIndentationValue =
                                increaseIndentation
                                ? nodeIndentation.getIndentation() + options.IndentSize
                                : nodeIndentation.getIndentation();
                        }
                    }
                    else {
                        // child is a list item that is not in span being formatted
                        // fetch actual indentation for the child item to push it downstream
                        // TODO: ensure that indentation is picked correctly
                        var actualIndentation = getListItemIndentation(containingList, listElementIndex, nodeStartLine, options);
                        if (actualIndentation !== -1) {
                            inheritedIndentation = actualIndentation;
                        }
                        var childIndentationValue = inheritedIndentation || nodeIndentation.getIndentation();
                    }
                }
                else {
                    var shareLine = nodeStartLine === childStart.line;
                    var increaseIndentation =
                        !shareLine &&
                        !SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(node, child, childStart.line, sourceFile) &&
                        SmartIndenter.shouldIndentChildNode(node, child);
                    var childIndentationValue =
                        increaseIndentation
                            ? nodeIndentation.getIndentation() + options.IndentSize
                            : nodeIndentation.getIndentation();
                }


                var childIndentation = getDynamicIndentation(node, childIndentationValue, childIndentationValue, nodeIndentation);

                // ensure that current token is inside child node
                if (isToken(child)) {
                    var tokenInfo = formattingScanner.readTokenInfo(node);
                    Debug.assert(tokenInfo.token.end === child.end);
                    doConsumeTokenAndAdvanceScanner(tokenInfo, node, childIndentation);
                }
                else {
                    processNode(child, childContextNode, childStart.line, childIndentationValue);
                    childContextNode = node;
                }
                return inheritedIndentation;
            }

            function doConsumeTokenAndAdvanceScanner(currentTokenInfo: TokenInfo, parent: Node, indentation: DynamicIndentation): void {
                consumeTokenAndAdvanceScanner(currentTokenInfo, parent, childContextNode, indentation);
                childContextNode = parent;
            }
        }

        function consumeTokenAndAdvanceScanner(currentTokenInfo: TokenInfo, parent: Node, contextNode: Node, indentation: DynamicIndentation): void {
            Debug.assert(rangeContainsRange(parent, currentTokenInfo.token));

            lastTriviaWasNewLine = formattingScanner.lastTrailingTriviaWasNewLine();

            if (currentTokenInfo.leadingTrivia) {
                processTrivia(currentTokenInfo.leadingTrivia, parent, contextNode, indentation);
            }

            var lineAdded: boolean;
            var isTokenInRange = rangeContainsRange(originalRange, currentTokenInfo.token);
            var indentToken: boolean = true;

            if (isTokenInRange) {
                var prevStartLine = previousRangeStartLine;
                var tokenStart = sourceFile.getLineAndCharacterFromPosition(currentTokenInfo.token.pos);
                lineAdded = processRange(currentTokenInfo.token, tokenStart, parent, contextNode, indentation);
                if (lineAdded !== undefined) {
                    indentToken = lineAdded;
                }
                else {
                    indentToken = tokenStart.line !== prevStartLine;
                }
            }

            if (currentTokenInfo.trailingTrivia) {
                processTrivia(currentTokenInfo.trailingTrivia, parent, contextNode, indentation);
            }


            if (lastTriviaWasNewLine && indentToken) {
                var indentNextTokenOrTrivia = true;
                if (currentTokenInfo.leadingTrivia) {
                    for (var i = 0, len = currentTokenInfo.leadingTrivia.length; i < len; ++i) {
                        var triviaItem = currentTokenInfo.leadingTrivia[i];
                        if (rangeContainsRange(originalRange, triviaItem)) {
                            switch (triviaItem.kind) {
                                case SyntaxKind.MultiLineCommentTrivia:
                                    indentMultilineComment(triviaItem, indentation.getCommentIndentation(), /*firstLineIsIndented*/ !indentNextTokenOrTrivia);
                                    indentNextTokenOrTrivia = false;
                                    break;
                                case SyntaxKind.SingleLineCommentTrivia:
                                    if (indentNextTokenOrTrivia) {
                                        insertIndentation(triviaItem.pos, indentation.getCommentIndentation(), /*lineAdded*/ false);
                                        indentNextTokenOrTrivia = false;
                                    }
                                    break;
                                case SyntaxKind.WhitespaceTrivia:
                                    // TODO
                                    break;
                                case SyntaxKind.NewLineTrivia:
                                    indentNextTokenOrTrivia = true;
                                    break;
                            }
                        }
                    }
                }
                if (isTokenInRange) {
                    insertIndentation(currentTokenInfo.token.pos, indentation.getIndentation(), lineAdded);
                }
            }

            formattingScanner.advance();
        }

        function processTrivia(trivia: TextRangeWithKind[], parent: Node, contextNode: Node, indentation: DynamicIndentation): void {
            for (var i = 0, len = trivia.length; i < len; ++i) {
                var triviaItem = trivia[i];
                if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
                    var triviaItemStart = sourceFile.getLineAndCharacterFromPosition(triviaItem.pos);
                    processRange(triviaItem, triviaItemStart, parent, contextNode, indentation);
                }
            }
        }

        function processRange(range: TextRangeWithKind, rangeStart: LineAndCharacter, parent: Node, contextNode: Node, indentation: DynamicIndentation): boolean {
            var rangeHasError = rangeContainsError(range);
            var lineAdded: boolean;
            if (!rangeHasError && !previousRangeHasError) {                
                if (!previousRange) {
                    // trim whitespaces starting from the beginning of the span up to the current line
                    var originalStart = sourceFile.getLineAndCharacterFromPosition(originalRange.pos);
                    trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                }
                else {
                    lineAdded = processPair(range, rangeStart.line, parent, previousRange, previousRangeStartLine, previousParent, contextNode, indentation)
                }
            }

            previousRange = range;
            previousParent = parent;
            previousRangeStartLine = rangeStart.line;
            previousRangeHasError = rangeHasError;

            return lineAdded;
        }

        function processPair(currentItem: TextRangeWithKind,
            currentStartLine: number,
            currentParent: Node,
            previousItem: TextRangeWithKind,
            previousStartLine: number,
            previousParent: Node,
            contextNode: Node,
            indentation: DynamicIndentation): boolean {

            formattingContext.updateContext(previousItem, previousParent, currentItem, currentParent, contextNode);
            var rule = rulesProvider.getRulesMap().GetRule(formattingContext);

            var trimTrailingWhitespaces: boolean;
            var lineAdded: boolean;
            if (rule) {
                applyRuleEdits(rule, previousItem, previousStartLine, currentItem, currentStartLine);

                if (rule.Operation.Action & (RuleAction.Space | RuleAction.Delete) && currentStartLine !== previousStartLine) {
                    // Old code:
                    // Handle the case where the next line is moved to be the end of this line. 
                    // In this case we don't indent the next line in the next pass.                    
                    lastTriviaWasNewLine = false;
                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                        lineAdded = false;
                    }
                }
                else if (rule.Operation.Action & RuleAction.NewLine && currentStartLine === previousStartLine) {
                    // Old code:
                    // Handle the case where token2 is moved to the new line. 
                    // In this case we indent token2 in the next pass but we set
                    // sameLineIndent flag to notify the indenter that the indentation is within the line.
                    lastTriviaWasNewLine = true;
                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                        lineAdded = true;
                    }
                }

                if (lineAdded !== undefined) {
                    indentation.recomputeIndentation(lineAdded);
                }

                // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
                trimTrailingWhitespaces =
                    (rule.Operation.Action & (RuleAction.NewLine | RuleAction.Space)) &&
                    rule.Flag !== RuleFlags.CanDeleteNewLines;
            }
            else {
                trimTrailingWhitespaces = true;
            }

            if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
                // We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
                trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem);
            }

            return lineAdded;
        }

        function insertIndentation(pos: number, indentation: number, lineAdded: boolean): void {
            var indentationString = getIndentationString(indentation, options);
            if (lineAdded) {
                recordReplace(pos, 0, indentationString);
            }
            else {
                var tokenRange = sourceFile.getLineAndCharacterFromPosition(pos);
                if (indentation !== tokenRange.character - 1) {
                    var startLinePosition = getStartPositionOfLine(tokenRange.line, sourceFile);
                    recordReplace(startLinePosition, tokenRange.character - 1, indentationString);
                }
            }
        }

        function indentMultilineComment(commentRange: TextRange, indentation: number, firstLineIsIndented: boolean) {
            // split comment in lines
            var startLine = sourceFile.getLineAndCharacterFromPosition(commentRange.pos).line;
            var endLine = sourceFile.getLineAndCharacterFromPosition(commentRange.end).line;

            if (startLine === endLine) {
                if (!firstLineIsIndented) {
                    // treat as single line comment
                    insertIndentation(commentRange.pos, indentation, /*lineAdded*/ false);
                }
                return;
            }
            else {
                var parts: TextRange[] = [];
                var startPos = commentRange.pos;
                for (var line = startLine; line < endLine; ++line) {
                    var endOfLine = getEndLinePosition(line, sourceFile);
                    parts.push({ pos: startPos, end: endOfLine });
                    startPos = getStartPositionOfLine(line + 1, sourceFile);
                }

                parts.push({ pos: startPos, end: commentRange.end });
            }

            var startLinePos = getStartPositionOfLine(startLine, sourceFile);

            var nonWhitespaceColumnInFirstPart =
                SmartIndenter.findFirstNonWhitespaceColumn(startLinePos, parts[0].pos, sourceFile, options);

            if (indentation === nonWhitespaceColumnInFirstPart) {
                return;
            }

            var startIndex = 0;
            if (firstLineIsIndented) {
                startIndex = 1;
                startLine++;
            }

            // shift all parts on the delta size
            var delta = indentation - nonWhitespaceColumnInFirstPart;
            for (var i = startIndex, len = parts.length; i < len; ++i, ++startLine) {
                var startLinePos = getStartPositionOfLine(startLine, sourceFile);
                var nonWhitespaceColumn =
                    i === 0
                        ? nonWhitespaceColumnInFirstPart
                        : SmartIndenter.findFirstNonWhitespaceColumn(parts[i].pos, parts[i].end, sourceFile, options);

                var newIndentation = nonWhitespaceColumn + delta;
                if (newIndentation > 0) {
                    var indentationString = getIndentationString(newIndentation, options);
                    recordReplace(startLinePos, nonWhitespaceColumn, indentationString);
                }
                else {
                    recordDelete(startLinePos, nonWhitespaceColumn);
                }
            }
        }

        function trimTrailingWhitespacesForLines(line1: number, line2: number, range?: TextRangeWithKind) {
            for (var line = line1; line < line2; ++line) {
                var lineStartPosition = getStartPositionOfLine(line, sourceFile);
                var lineEndPosition = getEndLinePosition(line, sourceFile);

                // do not trim whitespaces in comments
                if (range && isComment(range.kind) && range.pos <= lineEndPosition && range.end > lineEndPosition) {
                    continue;
                }

                var pos = lineEndPosition;
                while (pos >= lineStartPosition && isWhiteSpace(sourceFile.text.charCodeAt(pos))) {
                    pos--;
                }
                if (pos !== lineEndPosition) {
                    Debug.assert(pos === lineStartPosition || !isWhiteSpace(sourceFile.text.charCodeAt(pos)));
                    recordDelete(pos + 1, lineEndPosition - pos);
                }
            }
        }

        function newTextChange(start: number, len: number, newText: string): TextChange {
            return { span: new TypeScript.TextSpan(start, len), newText: newText } 
        }

        function recordDelete(start: number, len: number) {
            if (len) {
                edits.push(newTextChange(start, len, ""));
            }
        }

        function recordReplace(start: number, len: number, newText: string) {
            if (len || newText) {
                edits.push(newTextChange(start, len, newText));
            }
        }

        function applyRuleEdits(rule: Rule, 
            previousRange: TextRangeWithKind, 
            previousStartLine: number, 
            currentRange: TextRangeWithKind, 
            currentStartLine: number): void {

            var between: TextRange;
            switch (rule.Operation.Action) {
                case RuleAction.Ignore:
                    // no action required
                    return;
                case RuleAction.Delete:
                    if (previousRange.end !== currentRange.pos) {
                        // delete characters starting from t1.end up to t2.pos exclusive
                        recordDelete(previousRange.end, currentRange.pos - previousRange.end);
                    }
                    break;
                case RuleAction.NewLine:
                    // exit early if we on different lines and rule cannot change number of newlines
                    // if line1 and line2 are on subsequent lines then no edits are required - ok to exit
                    // if line1 and line2 are separated with more than one newline - ok to exit since we cannot delete extra new lines
                    if (rule.Flag !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
                        return;
                    }

                    // edit should not be applied only if we have one line feed between elements
                    var lineDelta = currentStartLine - previousStartLine;
                    if (lineDelta !== 1) {
                        recordReplace(previousRange.end, currentRange.pos - previousRange.end, options.NewLineCharacter);
                    }
                    break;
                case RuleAction.Space:
                    // exit early if we on different lines and rule cannot change number of newlines
                    if (rule.Flag !== RuleFlags.CanDeleteNewLines && previousStartLine !== currentStartLine) {
                        return;
                    }

                    var posDelta = currentRange.pos - previousRange.end;
                    if (posDelta !== 1 || sourceFile.text.charCodeAt(previousRange.end) !== CharacterCodes.space) {
                        recordReplace(previousRange.end, currentRange.pos - previousRange.end, " ");
                    }
                    break;
            }
        }
    }
}