/* @internal */
namespace ts.textChanges {

    /**
     * Currently for simplicity we store recovered positions on the node itself.
     * It can be changed to side-table later if we decide that current design is too invasive.
     */
    function getPos(n: TextRange) {
        return (<any>n)["__pos"];
    }

    function setPos(n: TextRange, pos: number) {
        (<any>n)["__pos"] = pos;
    }

    function getEnd(n: TextRange) {
        return (<any>n)["__end"];
    }

    function setEnd(n: TextRange, end: number) {
        (<any>n)["__end"] = end;
    }

    export interface ConfigurableStart {
        useNonAdjustedStartPosition?: boolean;
    }
    export interface ConfigurableEnd {
        useNonAdjustedEndPosition?: boolean;
    }

    export enum Position {
        FullStart,
        Start
    }

    function skipWhitespacesAndLineBreaks(text: string, start: number) {
        return skipTrivia(text, start, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }

    function hasCommentsBeforeLineBreak(text: string, start: number) {
        let i = start;
        while (i < text.length) {
            const ch = text.charCodeAt(i);
            if (isWhiteSpaceSingleLine(ch)) {
                i++;
                continue;
            }
            return ch === CharacterCodes.slash;
        }
        return false;
    }

    /**
     * Usually node.pos points to a position immediately after the previous token.
     * If this position is used as a beginning of the span to remove - it might lead to removing the trailing trivia of the previous node, i.e:
     * const x; // this is x
     *        ^ - pos for the next variable declaration will point here
     * const y; // this is y
     *        ^ - end for previous variable declaration
     * Usually leading trivia of the variable declaration 'y' should not include trailing trivia (whitespace, comment 'this is x' and newline) from the preceding
     * variable declaration and trailing trivia for 'y' should include (whitespace, comment 'this is y', newline).
     * By default when removing nodes we adjust start and end positions to respect specification of the trivia above.
     * If pos\end should be interpreted literally 'useNonAdjustedStartPosition' or 'useNonAdjustedEndPosition' should be set to true
     */
    export type ConfigurableStartEnd = ConfigurableStart & ConfigurableEnd;

    export interface InsertNodeOptions {
        /**
         * Text to be inserted before the new node
         */
        prefix?: string;
        /**
         * Text to be inserted after the new node
         */
        suffix?: string;
        /**
         * Text of inserted node will be formatted with this indentation, otherwise indentation will be inferred from the old node
         */
        indentation?: number;
        /**
         * Text of inserted node will be formatted with this delta, otherwise delta will be inferred from the new node kind
         */
        delta?: number;
    }

    export type ChangeNodeOptions = ConfigurableStartEnd & InsertNodeOptions;

    interface Change {
        readonly sourceFile: SourceFile;
        readonly range: TextRange;
        readonly useIndentationFromFile?: boolean;
        readonly node?: Node;
        readonly options?: ChangeNodeOptions;
    }

    export function getSeparatorCharacter(separator: Token<SyntaxKind.CommaToken | SyntaxKind.SemicolonToken>) {
        return tokenToString(separator.kind);
    }

    export function getAdjustedStartPosition(sourceFile: SourceFile, node: Node, options: ConfigurableStart, position: Position) {
        if (options.useNonAdjustedStartPosition) {
            return node.getFullStart();
        }
        const fullStart = node.getFullStart();
        const start = node.getStart(sourceFile);
        if (fullStart === start) {
            return start;
        }
        const fullStartLine = getLineStartPositionForPosition(fullStart, sourceFile);
        const startLine = getLineStartPositionForPosition(start, sourceFile);
        if (startLine === fullStartLine) {
            // full start and start of the node are on the same line
            //   a,     b;
            //    ^     ^
            //    |   start
            // fullstart
            // when b is replaced - we usually want to keep the leading trvia
            // when b is deleted - we delete it
            return position === Position.Start ? start : fullStart;
        }
        // get start position of the line following the line that contains fullstart position
        let adjustedStartPosition = getStartPositionOfLine(getLineOfLocalPosition(sourceFile, fullStartLine) + 1, sourceFile);
        // skip whitespaces/newlines
        adjustedStartPosition = skipWhitespacesAndLineBreaks(sourceFile.text, adjustedStartPosition);
        return getStartPositionOfLine(getLineOfLocalPosition(sourceFile, adjustedStartPosition), sourceFile);
    }

    export function getAdjustedEndPosition(sourceFile: SourceFile, node: Node, options: ConfigurableEnd) {
        if (options.useNonAdjustedEndPosition) {
            return node.getEnd();
        }
        const end = node.getEnd();
        const newEnd = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true);
        // check if last character before newPos is linebreak
        // if yes - considered all skipped trivia to be trailing trivia of the node
        return newEnd !== end && isLineBreak(sourceFile.text.charCodeAt(newEnd - 1))
            ? newEnd
            : end;
    }

    /**
     * Checks if 'candidate' argument is a legal separator in the list that contains 'node' as an element
     */
    function isSeparator(node: Node, candidate: Node): candidate is Token<SyntaxKind.CommaToken | SyntaxKind.SemicolonToken> {
        return candidate && node.parent && (candidate.kind === SyntaxKind.CommaToken || (candidate.kind === SyntaxKind.SemicolonToken && node.parent.kind === SyntaxKind.ObjectLiteralExpression));
    }

    function spaces(count: number) {
        let s = "";
        for (let i = 0; i < count; i++) {
            s += " ";
        }
        return s;
    }

    export class ChangeTracker {
        private changes: Change[] = [];
        private readonly newLineCharacter: string;

        public static fromCodeFixContext(context: { newLineCharacter: string, rulesProvider: formatting.RulesProvider }) {
            return new ChangeTracker(context.newLineCharacter === "\n" ? NewLineKind.LineFeed : NewLineKind.CarriageReturnLineFeed, context.rulesProvider);
        }

        constructor(
            private readonly newLine: NewLineKind,
            private readonly rulesProvider: formatting.RulesProvider,
            private readonly validator?: (text: NonFormattedText) => void) {
            this.newLineCharacter = getNewLineCharacter({ newLine });
        }

        public deleteNode(sourceFile: SourceFile, node: Node, options: ConfigurableStartEnd = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, node, options, Position.FullStart);
            const endPosition = getAdjustedEndPosition(sourceFile, node, options);
            this.changes.push({ sourceFile, options, range: { pos: startPosition, end: endPosition } });
            return this;
        }

        public deleteRange(sourceFile: SourceFile, range: TextRange) {
            this.changes.push({ sourceFile, range });
            return this;
        }

        public deleteNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, options: ConfigurableStartEnd = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, startNode, options, Position.FullStart);
            const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
            this.changes.push({ sourceFile, options, range: { pos: startPosition, end: endPosition } });
            return this;
        }

        public deleteNodeInList(sourceFile: SourceFile, node: Node) {
            const containingList = formatting.SmartIndenter.getContainingList(node, sourceFile);
            if (!containingList) {
                Debug.fail("node is not a list element");
                return this;
            }
            const index = containingList.indexOf(node);
            if (index < 0) {
                return this;
            }
            if (containingList.length === 1) {
                this.deleteNode(sourceFile, node);
                return this;
            }
            if (index !== containingList.length - 1) {
                const nextToken = getTokenAtPosition(sourceFile, node.end, /*includeJsDocComment*/ false);
                if (nextToken && isSeparator(node, nextToken)) {
                    // find first non-whitespace position in the leading trivia of the node
                    const startPosition = skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, node, {}, Position.FullStart), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
                    const nextElement = containingList[index + 1];
                    /// find first non-whitespace position in the leading trivia of the next node
                    const endPosition = skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, nextElement, {}, Position.FullStart), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
                    // shift next node so its first non-whitespace position will be moved to the first non-whitespace position of the deleted node
                    this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
                }
            }
            else {
                const previousToken = getTokenAtPosition(sourceFile, containingList[index - 1].end, /*includeJsDocComment*/ false);
                if (previousToken && isSeparator(node, previousToken)) {
                    this.deleteNodeRange(sourceFile, previousToken, node);
                }
            }
            return this;
        }

        public replaceRange(sourceFile: SourceFile, range: TextRange, newNode: Node, options: InsertNodeOptions = {}) {
            this.changes.push({ sourceFile, range, options, node: newNode });
            return this;
        }

        public replaceNode(sourceFile: SourceFile, oldNode: Node, newNode: Node, options: ChangeNodeOptions = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, oldNode, options, Position.Start);
            const endPosition = getAdjustedEndPosition(sourceFile, oldNode, options);
            this.changes.push({ sourceFile, options, useIndentationFromFile: true, node: newNode, range: { pos: startPosition, end: endPosition } });
            return this;
        }

        public replaceNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, newNode: Node, options: ChangeNodeOptions = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, startNode, options, Position.Start);
            const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
            this.changes.push({ sourceFile, options, useIndentationFromFile: true, node: newNode, range: { pos: startPosition, end: endPosition } });
            return this;
        }

        public insertNodeAt(sourceFile: SourceFile, pos: number, newNode: Node, options: InsertNodeOptions = {}) {
            this.changes.push({ sourceFile, options, node: newNode, range: { pos: pos, end: pos } });
            return this;
        }

        public insertNodeBefore(sourceFile: SourceFile, before: Node, newNode: Node, options: InsertNodeOptions & ConfigurableStart = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, before, options, Position.Start);
            this.changes.push({ sourceFile, options, useIndentationFromFile: true, node: newNode, range: { pos: startPosition, end: startPosition } });
            return this;
        }

        public insertNodeAfter(sourceFile: SourceFile, after: Node, newNode: Node, options: InsertNodeOptions & ConfigurableEnd = {}) {
            if ((isStatementButNotDeclaration(after)) ||
                after.kind === SyntaxKind.PropertyDeclaration ||
                after.kind === SyntaxKind.PropertySignature ||
                after.kind === SyntaxKind.MethodSignature) {
                // check if previous statement ends with semicolon
                // if not - insert semicolon to preserve the code from changing the meaning due to ASI
                if (sourceFile.text.charCodeAt(after.end - 1) !== CharacterCodes.semicolon) {
                    this.changes.push({
                        sourceFile,
                        options: {},
                        range: { pos: after.end, end: after.end },
                        node: createToken(SyntaxKind.SemicolonToken)
                    });
                }
            }
            const endPosition = getAdjustedEndPosition(sourceFile, after, options);
            this.changes.push({ sourceFile, options, useIndentationFromFile: true, node: newNode, range: { pos: endPosition, end: endPosition } });
            return this;
        }

        /**
         * This function should be used to insert nodes in lists when nodes don't carry separators as the part of the node range,
         * i.e. arguments in arguments lists, parameters in parameter lists etc.
         * Note that separators are part of the node in statements and class elements.
         */
        public insertNodeInListAfter(sourceFile: SourceFile, after: Node, newNode: Node) {
            const containingList = formatting.SmartIndenter.getContainingList(after, sourceFile);
            if (!containingList) {
                Debug.fail("node is not a list element");
                return this;
            }
            const index = containingList.indexOf(after);
            if (index < 0) {
                return this;
            }
            const end = after.getEnd();
            if (index !== containingList.length - 1) {
                // any element except the last one
                // use next sibling as an anchor
                const nextToken = getTokenAtPosition(sourceFile, after.end, /*includeJsDocComment*/ false);
                if (nextToken && isSeparator(after, nextToken)) {
                    // for list
                    // a, b, c
                    // create change for adding 'e' after 'a' as
                    // - find start of next element after a (it is b)
                    // - use this start as start and end position in final change
                    // - build text of change by formatting the text of node + separator + whitespace trivia of b

                    // in multiline case it will work as
                    //   a,
                    //   b,
                    //   c,
                    // result - '*' denotes leading trivia that will be inserted after new text (displayed as '#')
                    //   a,*
                    // ***insertedtext<separator>#
                    // ###b,
                    //   c,
                    // find line and character of the next element
                    const lineAndCharOfNextElement = getLineAndCharacterOfPosition(sourceFile, skipWhitespacesAndLineBreaks(sourceFile.text, containingList[index + 1].getFullStart()));
                    // find line and character of the token that precedes next element (usually it is separator)
                    const lineAndCharOfNextToken = getLineAndCharacterOfPosition(sourceFile, nextToken.end);
                    let prefix: string;
                    let startPos: number;
                    if (lineAndCharOfNextToken.line === lineAndCharOfNextElement.line) {
                        // next element is located on the same line with separator:
                        // a,$$$$b
                        //  ^    ^
                        //  |    |-next element
                        //  |-separator
                        // where $$$ is some leading trivia
                        // for a newly inserted node we'll maintain the same relative position comparing to separator and replace leading trivia with spaces
                        // a,    x,$$$$b
                        //  ^    ^     ^
                        //  |    |     |-next element
                        //  |    |-new inserted node padded with spaces
                        //  |-separator
                        startPos = nextToken.end;
                        prefix = spaces(lineAndCharOfNextElement.character - lineAndCharOfNextToken.character);
                    }
                    else {
                        // next element is located on different line that separator
                        // let insert position be the beginning of the line that contains next element
                        startPos = getStartPositionOfLine(lineAndCharOfNextElement.line, sourceFile);
                    }

                    this.changes.push({
                        sourceFile,
                        range: { pos: startPos, end: containingList[index + 1].getStart(sourceFile) },
                        node: newNode,
                        useIndentationFromFile: true,
                        options: {
                            prefix,
                            // write separator and leading trivia of the next element as suffix
                            suffix: `${tokenToString(nextToken.kind)}${sourceFile.text.substring(nextToken.end, containingList[index + 1].getStart(sourceFile))}`
                        }
                    });
                }
            }
            else {
                const afterStart = after.getStart(sourceFile);
                const afterStartLinePosition = getLineStartPositionForPosition(afterStart, sourceFile);

                let separator: SyntaxKind.CommaToken | SyntaxKind.SemicolonToken;
                let multilineList = false;

                // insert element after the last element in the list that has more than one item
                // pick the element preceding the after element to:
                // - pick the separator
                // - determine if list is a multiline
                if (containingList.length === 1) {
                    // if list has only one element then we'll format is as multiline if node has comment in trailing trivia, or as singleline otherwise
                    // i.e. var x = 1 // this is x
                    //     | new element will be inserted at this position
                    separator = SyntaxKind.CommaToken;
                }
                else {
                    // element has more than one element, pick separator from the list
                    const tokenBeforeInsertPosition = findPrecedingToken(after.pos, sourceFile);
                    separator = isSeparator(after, tokenBeforeInsertPosition) ? tokenBeforeInsertPosition.kind : SyntaxKind.CommaToken;
                    // determine if list is multiline by checking lines of after element and element that precedes it.
                    const afterMinusOneStartLinePosition = getLineStartPositionForPosition(containingList[index - 1].getStart(sourceFile), sourceFile);
                    multilineList = afterMinusOneStartLinePosition !== afterStartLinePosition;
                }
                if (hasCommentsBeforeLineBreak(sourceFile.text, after.end)) {
                    // in this case we'll always treat containing list as multiline
                    multilineList = true;
                }
                if (multilineList) {
                    // insert separator immediately following the 'after' node to preserve comments in trailing trivia
                    this.changes.push({
                        sourceFile,
                        range: { pos: end, end },
                        node: createToken(separator),
                        options: {}
                    });
                    // use the same indentation as 'after' item
                    const indentation = formatting.SmartIndenter.findFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, this.rulesProvider.getFormatOptions());
                    // insert element before the line break on the line that contains 'after' element
                    let insertPos = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ false);
                    if (insertPos !== end && isLineBreak(sourceFile.text.charCodeAt(insertPos - 1))) {
                        insertPos--;
                    }
                    this.changes.push({
                        sourceFile,
                        range: { pos: insertPos, end: insertPos },
                        node: newNode,
                        options: { indentation, prefix: this.newLineCharacter }
                    });
                }
                else {
                    this.changes.push({
                        sourceFile,
                        range: { pos: end, end },
                        node: newNode,
                        options: { prefix: `${tokenToString(separator)} ` }
                    });
                }
            }
            return this;
        }

        public getChanges(): FileTextChanges[] {
            const changesPerFile = createFileMap<Change[]>();
            // group changes per file
            for (const c of this.changes) {
                let changesInFile = changesPerFile.get(c.sourceFile.path);
                if (!changesInFile) {
                    changesPerFile.set(c.sourceFile.path, changesInFile = []);
                }
                changesInFile.push(c);
            }
            // convert changes
            const fileChangesList: FileTextChanges[] = [];
            changesPerFile.forEachValue(path => {
                const changesInFile = changesPerFile.get(path);
                const sourceFile = changesInFile[0].sourceFile;
                const fileTextChanges: FileTextChanges = { fileName: sourceFile.fileName, textChanges: [] };
                for (const c of ChangeTracker.normalize(changesInFile)) {
                    fileTextChanges.textChanges.push({
                        span: this.computeSpan(c, sourceFile),
                        newText: this.computeNewText(c, sourceFile)
                    });
                }
                fileChangesList.push(fileTextChanges);
            });

            return fileChangesList;
        }

        private computeSpan(change: Change, _sourceFile: SourceFile): TextSpan {
            return createTextSpanFromBounds(change.range.pos, change.range.end);
        }

        private computeNewText(change: Change, sourceFile: SourceFile): string {
            if (!change.node) {
                // deletion case
                return "";
            }
            const options = change.options || {};
            const nonFormattedText = getNonformattedText(change.node, sourceFile, this.newLine);
            if (this.validator) {
                this.validator(nonFormattedText);
            }

            const formatOptions = this.rulesProvider.getFormatOptions();
            const pos = change.range.pos;
            const posStartsLine = getLineStartPositionForPosition(pos, sourceFile) === pos;

            const initialIndentation =
                change.options.indentation !== undefined
                    ? change.options.indentation
                    : change.useIndentationFromFile
                        ? formatting.SmartIndenter.getIndentation(change.range.pos, sourceFile, formatOptions, posStartsLine || (change.options.prefix === this.newLineCharacter))
                        : 0;
            const delta =
                change.options.delta !== undefined
                    ? change.options.delta
                    : formatting.SmartIndenter.shouldIndentChildNode(change.node)
                        ? formatOptions.indentSize
                        : 0;

            let text = applyFormatting(nonFormattedText, sourceFile, initialIndentation, delta, this.rulesProvider);
            // strip initial indentation (spaces or tabs) if text will be inserted in the middle of the line
            // however keep indentation if it is was forced
            text = posStartsLine || change.options.indentation !== undefined ? text : text.replace(/^\s+/, "");
            return (options.prefix || "") + text + (options.suffix || "");
        }

        private static normalize(changes: Change[]): Change[] {
            // order changes by start position
            const normalized = stableSort(changes, (a, b) => a.range.pos - b.range.pos);
            // verify that change intervals do not overlap, except possibly at end points.
            for (let i = 0; i < normalized.length - 2; i++) {
                Debug.assert(normalized[i].range.end <= normalized[i + 1].range.pos);
            }
            return normalized;
        }
    }

    export interface NonFormattedText {
        readonly text: string;
        readonly node: Node;
    }

    export function getNonformattedText(node: Node, sourceFile: SourceFile | undefined, newLine: NewLineKind): NonFormattedText {
        const options = { newLine, target: sourceFile && sourceFile.languageVersion };
        const writer = new Writer(getNewLineCharacter(options));
        const printer = createPrinter(options, writer);
        printer.writeNode(EmitHint.Unspecified, node, sourceFile, writer);
        return { text: writer.getText(), node: assignPositionsToNode(node) };
    }

    export function applyFormatting(nonFormattedText: NonFormattedText, sourceFile: SourceFile, initialIndentation: number, delta: number, rulesProvider: formatting.RulesProvider) {
        const lineMap = computeLineStarts(nonFormattedText.text);
        const file: SourceFileLike = {
            text: nonFormattedText.text,
            lineMap,
            getLineAndCharacterOfPosition: pos => computeLineAndCharacterOfPosition(lineMap, pos)
        };
        const changes = formatting.formatNode(nonFormattedText.node, file, sourceFile.languageVariant, initialIndentation, delta, rulesProvider);
        return applyChanges(nonFormattedText.text, changes);
    }

    export function applyChanges(text: string, changes: TextChange[]): string {
        for (let i = changes.length - 1; i >= 0; i--) {
            const change = changes[i];
            text = `${text.substring(0, change.span.start)}${change.newText}${text.substring(textSpanEnd(change.span))}`;
        }
        return text;
    }

    function isTrivia(s: string) {
        return skipTrivia(s, 0) === s.length;
    }

    function assignPositionsToNode(node: Node): Node {
        const visited = visitEachChild(node, assignPositionsToNode, nullTransformationContext, assignPositionsToNodeArray, assignPositionsToNode);
        // create proxy node for non synthesized nodes
        const newNode = nodeIsSynthesized(visited)
            ? visited
            : (Proxy.prototype = visited, new (<any>Proxy)());
        newNode.pos = getPos(node);
        newNode.end = getEnd(node);
        return newNode;

        function Proxy() { }
    }

    function assignPositionsToNodeArray(nodes: NodeArray<any>, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number) {
        const visited = visitNodes(nodes, visitor, test, start, count);
        if (!visited) {
            return visited;
        }
        // clone nodearray if necessary
        const nodeArray = visited === nodes ? createNodeArray(visited.slice(0)) : visited;
        nodeArray.pos = getPos(nodes);
        nodeArray.end = getEnd(nodes);
        return nodeArray;
    }

    class Writer implements EmitTextWriter, PrintHandlers {
        private lastNonTriviaPosition = 0;
        private readonly writer: EmitTextWriter;

        public readonly onEmitNode: PrintHandlers["onEmitNode"];
        public readonly onBeforeEmitNodeArray: PrintHandlers["onBeforeEmitNodeArray"];
        public readonly onAfterEmitNodeArray: PrintHandlers["onAfterEmitNodeArray"];
        public readonly onBeforeEmitToken: PrintHandlers["onBeforeEmitToken"];
        public readonly onAfterEmitToken: PrintHandlers["onAfterEmitToken"];

        constructor(newLine: string) {
            this.writer = createTextWriter(newLine);
            this.onEmitNode = (hint, node, printCallback) => {
                if (node) {
                    setPos(node, this.lastNonTriviaPosition);
                }
                printCallback(hint, node);
                if (node) {
                    setEnd(node, this.lastNonTriviaPosition);
                }
            };
            this.onBeforeEmitNodeArray = nodes => {
                if (nodes) {
                    setPos(nodes, this.lastNonTriviaPosition);
                }
            };
            this.onAfterEmitNodeArray = nodes => {
                if (nodes) {
                    setEnd(nodes, this.lastNonTriviaPosition);
                }
            };
            this.onBeforeEmitToken = node => {
                if (node) {
                    setPos(node, this.lastNonTriviaPosition);
                }
            };
            this.onAfterEmitToken = node => {
                if (node) {
                    setEnd(node, this.lastNonTriviaPosition);
                }
            };
        }

        private setLastNonTriviaPosition(s: string, force: boolean) {
            if (force || !isTrivia(s)) {
                this.lastNonTriviaPosition = this.writer.getTextPos();
                let i = 0;
                while (isWhiteSpaceLike(s.charCodeAt(s.length - i - 1))) {
                    i++;
                }
                // trim trailing whitespaces
                this.lastNonTriviaPosition -= i;
            }
        }

        write(s: string): void {
            this.writer.write(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeTextOfNode(text: string, node: Node): void {
            this.writer.writeTextOfNode(text, node);
        }
        writeLine(): void {
            this.writer.writeLine();
        }
        increaseIndent(): void {
            this.writer.increaseIndent();
        }
        decreaseIndent(): void {
            this.writer.decreaseIndent();
        }
        getText(): string {
            return this.writer.getText();
        }
        rawWrite(s: string): void {
            this.writer.rawWrite(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeLiteral(s: string): void {
            this.writer.writeLiteral(s);
            this.setLastNonTriviaPosition(s, /*force*/ true);
        }
        getTextPos(): number {
            return this.writer.getTextPos();
        }
        getLine(): number {
            return this.writer.getLine();
        }
        getColumn(): number {
            return this.writer.getColumn();
        }
        getIndent(): number {
            return this.writer.getIndent();
        }
        isAtStartOfLine(): boolean {
            return this.writer.isAtStartOfLine();
        }
        reset(): void {
            this.writer.reset();
            this.lastNonTriviaPosition = 0;
        }
    }
}