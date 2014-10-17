///<reference path='..\services.ts' />
///<reference path='stringUtilities.ts' />
///<reference path='new\rulesProvider.ts' />

module ts.formatting {

    export interface TextRangeWithKind extends TextRange {
        kind: SyntaxKind;
    }

    export interface TokenInfo extends TextRange {
        leadingTrivia: TextRangeWithKind[];
        token: TextRangeWithKind;
        trailingTrivia: TextRangeWithKind[];
        pos: number;
        end: number;
    }

    var formattingScanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ false);

    export function formatOnEnter(position: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        var line = getNonAdjustedLineAndCharacterFromPosition(position, sourceFile).line;
        // get the span for the previous\current line
        var span = {
            // get start position for the previous line
            pos: getStartPositionOfLine(line - 1, sourceFile),
            // get end position for the current line (end value is exclusive so add 1 to the result)
            end: getEndLinePosition(line, sourceFile) + 1
        }        
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatOnEnter, formattingScanner);
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
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatDocument, formattingScanner);
    }
    
    export function formatSelection(start: number, end: number, sourceFile: SourceFile, rulesProvider: RulesProvider, options: FormatCodeOptions): TextChange[]{
        // format from the beginning of the line
        var span = {
            pos: getStartLinePositionForPosition(start, sourceFile),
            end: end
        };
        return formatSpan(span, sourceFile, options, rulesProvider, FormattingRequestKind.FormatSelection, formattingScanner);
    }

    function getEndLinePosition(line: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
        if (line === lineStarts.length - 1) {
            // last line - return EOF
            return sourceFile.text.length - 1;
        }
        else {
            // current line start
            var start = lineStarts[line];
            // take the start position of the next line -1 = it should be some line break
            var pos = lineStarts[line + 1] - 1;
            Debug.assert(isLineBreak(sourceFile.text.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceFile.text.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }

    function getStartPositionOfLine(line: number, sourceFile: SourceFile): number {
        return sourceFile.getLineStarts()[line];
    }

    function getStartLinePositionForPosition(position: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
        var line = getNonAdjustedLineAndCharacterFromPosition(position, sourceFile).line;
        return lineStarts[line];
    }

    function formatOutermostParent(position: number, expectedLastToken: SyntaxKind, sourceFile: SourceFile, options: FormatCodeOptions, rulesProvider: RulesProvider, requestKind: FormattingRequestKind): TextChange[]{
        var parent = findOutermostParent(position, expectedLastToken, sourceFile);
        if (!parent) {
            return [];
        }
        var span = {
            pos: getStartLinePositionForPosition(parent.pos, sourceFile),
            end: parent.end
        };
        return formatSpan(span, sourceFile, options, rulesProvider, requestKind, formattingScanner);
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

    function rangeContainsRange(initial: TextRange, candidate: TextRange): boolean {
        return startEndContainsRange(initial.pos, initial.end, candidate);
    }

    function startEndContainsRange(start: number, end: number, candidate: TextRange): boolean {
        return start <= candidate.pos && end >= candidate.end;
    }

    function rangeOverlapsWithRange(r1: TextRange, r2: TextRange): boolean {
        var start = Math.max(r1.pos, r2.pos);
        var end = Math.min(r1.end, r2.end);
        return start < end;
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

    function getIndentationForNode(n: Node, sourceFile: SourceFile, options: FormatCodeOptions): number {
        var start = sourceFile.getLineAndCharacterFromPosition(n.getStart(sourceFile));
        return SmartIndenter.getIndentationForNode(n, start, /*indentationDelta*/ 0, sourceFile, options);
    }

    function getNonAdjustedLineAndCharacterFromPosition(position: number, sourceFile: SourceFile): LineAndCharacter {
        var lineAndChar = sourceFile.getLineAndCharacterFromPosition(position);
        return { line: lineAndChar.line - 1, character: lineAndChar.character - 1 };
    }

    function formatSpan(originalRange: TextRange,
        sourceFile: SourceFile,
        options: FormatCodeOptions,
        rulesProvider: RulesProvider,
        requestKind: FormattingRequestKind,
        scanner: Scanner): TextChange[] {

        // formatting context to be used by rules provider to get rules
        var formattingContext = new FormattingContext(sourceFile, requestKind);

        var enclosingNode = findEnclosingNode(originalRange, sourceFile);
        var initialIndentation = getIndentationForNode(enclosingNode, sourceFile, options);

        scanner.setText(sourceFile.text);
        scanner.setTextPos(enclosingNode.pos);

        var previousRange: TextRangeWithKind;
        var previousParent: Node;
        var previousRangeStartLine: number;

        var lastTriviaWasNewLine = true;
        var edits: TextChange[] = [];

        // advance the scaner
        scanner.scan();
        var currentTokenInfo = fetchNextTokenInfo();

        if (currentTokenInfo.token) {
            var startLine =  getNonAdjustedLineAndCharacterFromPosition(enclosingNode.getStart(sourceFile), sourceFile).line;
            processNode(enclosingNode, enclosingNode, startLine, initialIndentation);
        }
        return edits;

        function processNode(node: Node, contextNode: Node, nodeStartLine: number, indentation: number) {
            // TODO: skip nodes that has skipped or missing tokens
            if (!rangeOverlapsWithRange(originalRange, node)) {
                return;
            }

            if (!rangeContainsRange(node, currentTokenInfo.token)) {
                // node and its descendents don't contain current token from the scanner - skip it
                return;
            }

            var childContextNode = contextNode;
            forEachChild(
                node,
                child => processChildNode(child, /*containingList*/ undefined, /*listElementIndex*/ -1),
                nodes => {
                    for (var i = 0, len = nodes.length; i < len; ++i) {
                        processChildNode(nodes[i], /*containingList*/ nodes, /*listElementIndex*/ i)
                    }
                }
            );

            while (currentTokenInfo.token && node.end >= currentTokenInfo.token.end) {
                currentTokenInfo = consumeCurrentToken(node, childContextNode, indentation);
                childContextNode = node;
            }

            /// Local functions

            function processChildNode(child: Node, containingList: Node[], listElementIndex: number): void {
                if (child.kind === SyntaxKind.Missing) {
                    return;
                }

                var start = child.getStart(sourceFile);
                
                while (currentTokenInfo.token && start >= currentTokenInfo.token.end) {
                    // we've walked past the current token
                    // ask parent to handle it
                    currentTokenInfo = consumeCurrentToken(node, childContextNode, indentation);
                    childContextNode = node;
                }

                if (!currentTokenInfo.token) {
                    return;
                }

                // ensure that current token is inside child node
                Debug.assert(currentTokenInfo.token.end <= child.end);
                if (isToken(child) && currentTokenInfo.token.end === child.end) {
                    // tokens belong to parent nodes                    
                    currentTokenInfo = consumeCurrentToken(node, childContextNode, indentation);
                    childContextNode = node;
                }
                else {
                    var childStartLine = getNonAdjustedLineAndCharacterFromPosition(start, sourceFile).line;

                    var childIndentation = indentation;
                    if (listElementIndex === -1) {
                        // child is not list element

                    }
                    else {
                        // child is a list element
                    }
                    // determine child indentation
                    // if child
                    // TODO: share this code with SmartIndenter
                    var increaseIndentation =
                        childStartLine !== nodeStartLine &&
                        !SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(node, child, childStartLine, sourceFile) &&
                        SmartIndenter.nodeContentIsIndented(node, child);                    

                    processNode(child, childContextNode, childStartLine, increaseIndentation ? indentation + options.IndentSize : indentation);
                    childContextNode = node;
                }
            }
        }

        function fetchNextTokenInfo(): TokenInfo {
            if (currentTokenInfo) {
                lastTriviaWasNewLine =
                    currentTokenInfo.trailingTrivia &&
                    currentTokenInfo.trailingTrivia[currentTokenInfo.trailingTrivia.length - 1].kind === SyntaxKind.NewLineTrivia;
            }

            var leadingTrivia: TextRangeWithKind[];
            var trailingTrivia: TextRangeWithKind[];
            var tokenRange: TextRangeWithKind;

            var startPos = scanner.getStartPos();
            var initialStartPos = startPos;

            while (startPos < originalRange.end) {
                var t = scanner.getToken();

                if (tokenRange && !isTrivia(t)) {
                    // have already seen the token and item under cursor is not a trivia
                    break;
                }

                // advance the cursor
                scanner.scan();

                var item = { pos: startPos, end: scanner.getStartPos(), kind: t };
                startPos = item.end;

                if (isTrivia(t)) {
                    if (tokenRange) {

                        if (!trailingTrivia) {
                            trailingTrivia = [];
                        }

                        trailingTrivia.push(item);

                        if (t === SyntaxKind.NewLineTrivia) {
                            // trailing trivia is cut at the new line
                            break;
                        }
                    }
                    else {
                        if (!leadingTrivia) {
                            leadingTrivia = [];
                        }

                        leadingTrivia.push(item);
                    }
                }
                else {
                    tokenRange = item;
                }
            }

            return {
                leadingTrivia: leadingTrivia,
                token: tokenRange,
                trailingTrivia: trailingTrivia,
                pos: initialStartPos,
                end: scanner.getStartPos()
            };
        }

        function consumeCurrentToken(parent: Node, contextNode: Node, indentation: number): TokenInfo {
            Debug.assert(rangeContainsRange(parent, currentTokenInfo.token));
            if (currentTokenInfo.leadingTrivia) {
                processTrivia(currentTokenInfo.leadingTrivia, parent, contextNode, indentation);
            }


            var indentToken: boolean;
            if (rangeContainsRange(originalRange, currentTokenInfo.token)) {
                indentToken = processRange(currentTokenInfo.token, parent, contextNode, indentation);
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
                                    indentMultilineComment(triviaItem, indentation, /*firstLineIsIndented*/ !indentNextTokenOrTrivia);
                                    indentNextTokenOrTrivia = false;
                                    break;
                                case SyntaxKind.SingleLineCommentTrivia:
                                    if (indentNextTokenOrTrivia) {
                                        insertIndentation(triviaItem.pos, indentation);
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

                insertIndentation(currentTokenInfo.token.pos, indentation);
                //// TODO: remove
                //var tokenRange = getNonAdjustedLineAndCharacterFromPosition(currentTokenInfo.token.pos, sourceFile);

                //// TODO: handle indentation in multiline comments
                //var currentIndentation = tokenRange.character;
                //if (indentation !== currentIndentation) {
                //    var indentationString = getIndentationString(indentation, options);
                //    var startLinePosition = getStartPositionOfLine(tokenRange.line, sourceFile);
                //    recordReplace(startLinePosition, currentIndentation, indentationString);
                //}
            }


            return fetchNextTokenInfo();
        }

        function insertIndentation(pos: number, indentation: number): void {
            var tokenRange = getNonAdjustedLineAndCharacterFromPosition(pos, sourceFile);
            if (indentation !== tokenRange.character) {
                var indentationString = getIndentationString(indentation, options);
                var startLinePosition = getStartPositionOfLine(tokenRange.line, sourceFile);
                recordReplace(startLinePosition, tokenRange.character, indentationString);
            }
        }

        function indentMultilineComment(commentRange: TextRange, indentation: number, firstLineIsIndented: boolean) {
            // split comment in lines
            var startLine = getNonAdjustedLineAndCharacterFromPosition(commentRange.pos, sourceFile).line;
            var endLine = getNonAdjustedLineAndCharacterFromPosition(commentRange.end, sourceFile).line;

            if (startLine === endLine) {
                if (!firstLineIsIndented) {
                    // treat as single line comment
                    insertIndentation(commentRange.pos, indentation);
                }
                return;
            }
            else {
                var parts: TextRange[] = [];
                var startPos = commentRange.pos;
                for (var line = startLine; line < endLine; ++line) {
                    var endOfLine = getEndLinePosition(line, sourceFile);
                    parts.push( {pos: startPos, end: endOfLine} );
                    startPos = getStartPositionOfLine(line + 1, sourceFile);
                }

                parts.push( {pos: startPos, end: commentRange.end} );
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

        function processTrivia(trivia: TextRangeWithKind[], parent: Node, contextNode: Node, currentIndentation: number): void {
            for (var i = 0, len = trivia.length; i < len; ++i) {
                var triviaItem = trivia[i];
                if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
                    processRange(triviaItem, parent, contextNode, currentIndentation);
                }
            }
        }

        function processRange(range: TextRangeWithKind, parent: Node, contextNode: Node, indentation: number): boolean {
            var rangeStart = getNonAdjustedLineAndCharacterFromPosition(range.pos, sourceFile);
            var indentToken = true;

            if (rangeContainsRange(originalRange, range)) {                
                if (!previousRange) {
                    var originalStart = getNonAdjustedLineAndCharacterFromPosition(originalRange.pos, sourceFile);
                    // TODO: implement
                    if (isTrivia(range.kind)) {
                        trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                    }
                    else {
                        trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                    }
                }
                else {
                    processPair(range, rangeStart.line, parent, previousRange, previousRangeStartLine, previousParent, contextNode)
                    indentToken = rangeStart.line !== previousRangeStartLine;
                }
            }
            previousRange = range;
            previousParent = parent;
            previousRangeStartLine = rangeStart.line;

            return indentToken;
        }

        function processPair(currentItem: TextRangeWithKind,
            currentStartLine: number,
            currentParent: Node,
            previousItem: TextRangeWithKind,
            previousStartLine: number,
            previousParent: Node,
            contextNode: Node): void {

            // TODO: compute common parent
            formattingContext.updateContext(previousItem, previousParent, currentItem, currentParent, contextNode);
            var rule = rulesProvider.getRulesMap().GetRule(formattingContext);

            var trimTrailingWhitespaces: boolean;
            if (rule) {
                applyRuleEdits(rule, previousItem, previousStartLine, currentItem, currentStartLine);

                if (rule.Operation.Action & (RuleAction.Space | RuleAction.Delete) && currentStartLine !== previousStartLine) {
                    // Old code:
                    // Handle the case where the next line is moved to be the end of this line. 
                    // In this case we don't indent the next line in the next pass.                    
                    // this.forceSkipIndentingNextToken(t2.start());
                    lastTriviaWasNewLine = false;
                }
                else if (rule.Operation.Action & RuleAction.NewLine && currentStartLine === previousStartLine) {
                    // Old code:
                    // Handle the case where token2 is moved to the new line. 
                    // In this case we indent token2 in the next pass but we set
                    // sameLineIndent flag to notify the indenter that the indentation is within the line.
                    // this.forceIndentNextToken(t2.start());
                    lastTriviaWasNewLine = true;
                }

                // TODO: check if this is still needed
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
        }

        function trimTrailingWhitespacesForLines(line1: number, line2: number, range?: TextRangeWithKind) {
            for (var line = line1; line < line2; ++line) {
                var lineStartPosition = getStartPositionOfLine(line, sourceFile);
                var lineEndPosition = getEndLinePosition(line, sourceFile);

                // if (token && (token.kind == SyntaxKind.MultiLineCommentTrivia || token.kind == SyntaxKind.SingleLineCommentTrivia) && token.start() <= line.endPosition() && token.end() >= line.endPosition())

                if (range && isComment(range.kind)&& false) {
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