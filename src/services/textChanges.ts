/* @internal */
namespace ts.textChanges {

    /**
     * Currently for simplicity we store recovered positions on the node itself.
     * It can be changed to side-table later if we decide that current design is too invasive.
     */
    function getPos(n: TextRange): number {
        const result = (<any>n).__pos;
        Debug.assert(typeof result === "number");
        return result;
    }

    function setPos(n: TextRange, pos: number): void {
        Debug.assert(typeof pos === "number");
        (<any>n).__pos = pos;
    }

    function getEnd(n: TextRange): number {
        const result = (<any>n).__end;
        Debug.assert(typeof result === "number");
        return result;
    }

    function setEnd(n: TextRange, end: number): void {
        Debug.assert(typeof end === "number");
        (<any>n).__end = end;
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

    enum ChangeKind {
        Remove,
        ReplaceWithSingleNode,
        ReplaceWithMultipleNodes
    }

    type Change = ReplaceWithSingleNode | ReplaceWithMultipleNodes | RemoveNode;

    interface BaseChange {
        readonly sourceFile: SourceFile;
        readonly range: TextRange;
    }

    export interface ChangeNodeOptions extends ConfigurableStartEnd, InsertNodeOptions {
        readonly useIndentationFromFile?: boolean;
    }
    interface ReplaceWithSingleNode extends BaseChange {
        readonly kind: ChangeKind.ReplaceWithSingleNode;
        readonly node: Node;
        readonly options?: ChangeNodeOptions;
    }

    interface RemoveNode extends BaseChange {
        readonly kind: ChangeKind.Remove;
        readonly node?: never;
        readonly options?: never;
    }

    interface ChangeMultipleNodesOptions extends ChangeNodeOptions {
        nodeSeparator: string;
    }
    interface ReplaceWithMultipleNodes extends BaseChange {
        readonly kind: ChangeKind.ReplaceWithMultipleNodes;
        readonly nodes: ReadonlyArray<Node>;
        readonly options?: ChangeMultipleNodesOptions;
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
        // (but only if the fullstart isn't the very beginning of the file)
        const nextLineStart = fullStart > 0 ? 1 : 0;
        let adjustedStartPosition = getStartPositionOfLine(getLineOfLocalPosition(sourceFile, fullStartLine) + nextLineStart, sourceFile);
        // skip whitespaces/newlines
        adjustedStartPosition = skipWhitespacesAndLineBreaks(sourceFile.text, adjustedStartPosition);
        return getStartPositionOfLine(getLineOfLocalPosition(sourceFile, adjustedStartPosition), sourceFile);
    }

    export function getAdjustedEndPosition(sourceFile: SourceFile, node: Node, options: ConfigurableEnd) {
        if (options.useNonAdjustedEndPosition || isExpression(node)) {
            return node.getEnd();
        }
        const end = node.getEnd();
        const newEnd = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true);
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

    export interface TextChangesContext {
        host: LanguageServiceHost;
        formatContext: ts.formatting.FormatContext;
    }

    export class ChangeTracker {
        private readonly changes: Change[] = [];
        private readonly newLineCharacter: string;
        private readonly deletedNodesInLists: true[] = []; // Stores ids of nodes in lists that we already deleted. Used to avoid deleting `, ` twice in `a, b`.
        // Map from class id to nodes to insert at the start
        private readonly nodesInsertedAtClassStarts = createMap<{ sourceFile: SourceFile, cls: ClassLikeDeclaration, members: ClassElement[] }>();

        public static fromContext(context: TextChangesContext): ChangeTracker {
            return new ChangeTracker(getNewLineOrDefaultFromHost(context.host, context.formatContext.options) === "\n" ? NewLineKind.LineFeed : NewLineKind.CarriageReturnLineFeed, context.formatContext);
        }

        public static with(context: TextChangesContext, cb: (tracker: ChangeTracker) => void): FileTextChanges[] {
            const tracker = ChangeTracker.fromContext(context);
            cb(tracker);
            return tracker.getChanges();
        }

        constructor(
            private readonly newLine: NewLineKind,
            private readonly formatContext: ts.formatting.FormatContext,
            private readonly validator?: (text: NonFormattedText) => void) {
            this.newLineCharacter = getNewLineCharacter({ newLine });
        }

        public deleteRange(sourceFile: SourceFile, range: TextRange) {
            this.changes.push({ kind: ChangeKind.Remove, sourceFile, range });
            return this;
        }

        public deleteNode(sourceFile: SourceFile, node: Node, options: ConfigurableStartEnd = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, node, options, Position.FullStart);
            const endPosition = getAdjustedEndPosition(sourceFile, node, options);
            this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
            return this;
        }

        public deleteNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, options: ConfigurableStartEnd = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, startNode, options, Position.FullStart);
            const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
            this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
            return this;
        }

        public deleteNodeInList(sourceFile: SourceFile, node: Node) {
            const containingList = formatting.SmartIndenter.getContainingList(node, sourceFile);
            if (!containingList) {
                Debug.fail("node is not a list element");
                return this;
            }
            const index = indexOfNode(containingList, node);
            if (index < 0) {
                return this;
            }
            if (containingList.length === 1) {
                this.deleteNode(sourceFile, node);
                return this;
            }
            const id = getNodeId(node);
            Debug.assert(!this.deletedNodesInLists[id], "Deleting a node twice");
            this.deletedNodesInLists[id] = true;
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
                const prev = containingList[index - 1];
                if (this.deletedNodesInLists[getNodeId(prev)]) {
                    const pos = skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, node, {}, Position.FullStart), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
                    const end = getAdjustedEndPosition(sourceFile, node, {});
                    this.deleteRange(sourceFile, { pos, end });
                }
                else {
                    const previousToken = getTokenAtPosition(sourceFile, containingList[index - 1].end, /*includeJsDocComment*/ false);
                    if (previousToken && isSeparator(node, previousToken)) {
                        this.deleteNodeRange(sourceFile, previousToken, node);
                    }
                }
            }
            return this;
        }

        public replaceRange(sourceFile: SourceFile, range: TextRange, newNode: Node, options: InsertNodeOptions = {}) {
            this.changes.push({ kind: ChangeKind.ReplaceWithSingleNode, sourceFile, range, options, node: newNode });
            return this;
        }

        public replaceNode(sourceFile: SourceFile, oldNode: Node, newNode: Node, options: ChangeNodeOptions = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, oldNode, options, Position.Start);
            const endPosition = getAdjustedEndPosition(sourceFile, oldNode, options);
            return this.replaceWithSingle(sourceFile, startPosition, endPosition, newNode, options);
        }

        public replaceNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, newNode: Node, options: ChangeNodeOptions = {}) {
            const startPosition = getAdjustedStartPosition(sourceFile, startNode, options, Position.Start);
            const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
            return this.replaceWithSingle(sourceFile, startPosition, endPosition, newNode, options);
        }

        private replaceWithSingle(sourceFile: SourceFile, startPosition: number, endPosition: number, newNode: Node, options: ChangeNodeOptions): this {
            this.changes.push({
                kind: ChangeKind.ReplaceWithSingleNode,
                sourceFile,
                options,
                node: newNode,
                range: { pos: startPosition, end: endPosition }
            });
            return this;
        }

        private replaceWithMultiple(sourceFile: SourceFile, startPosition: number, endPosition: number, newNodes: ReadonlyArray<Node>, options: ChangeMultipleNodesOptions): this {
            this.changes.push({
                kind: ChangeKind.ReplaceWithMultipleNodes,
                sourceFile,
                options,
                nodes: newNodes,
                range: { pos: startPosition, end: endPosition }
            });
            return this;
        }

        public replaceNodeWithNodes(sourceFile: SourceFile, oldNode: Node, newNodes: ReadonlyArray<Node>): void {
            this.replaceWithMultiple(sourceFile, oldNode.getStart(sourceFile), oldNode.getEnd(), newNodes, { nodeSeparator: this.newLineCharacter });
        }

        public replaceNodesWithNodes(sourceFile: SourceFile, oldNodes: ReadonlyArray<Node>, newNodes: ReadonlyArray<Node>): void {
            this.replaceWithMultiple(sourceFile, first(oldNodes).getStart(sourceFile), last(oldNodes).getEnd(), newNodes, { nodeSeparator: this.newLineCharacter });
        }

        private insertNodeAt(sourceFile: SourceFile, pos: number, newNode: Node, options: InsertNodeOptions = {}) {
            this.changes.push({ kind: ChangeKind.ReplaceWithSingleNode, sourceFile, options, node: newNode, range: { pos, end: pos } });
            return this;
        }

        public insertNodeAtTopOfFile(sourceFile: SourceFile, newNode: Statement, blankLineBetween: boolean): void {
            const pos = getInsertionPositionAtSourceFileTop(sourceFile);
            this.insertNodeAt(sourceFile, pos, newNode, {
                prefix: pos === 0 ? undefined : this.newLineCharacter,
                suffix: (isLineBreak(sourceFile.text.charCodeAt(pos)) ? "" : this.newLineCharacter) + (blankLineBetween ? this.newLineCharacter : ""),
            });
        }

        public insertNodeBefore(sourceFile: SourceFile, before: Node, newNode: Node, blankLineBetween = false) {
            const startPosition = getAdjustedStartPosition(sourceFile, before, {}, Position.Start);
            return this.replaceWithSingle(sourceFile, startPosition, startPosition, newNode, this.getOptionsForInsertNodeBefore(before, blankLineBetween));
        }

        public insertModifierBefore(sourceFile: SourceFile, modifier: SyntaxKind, before: Node): void {
            const pos = before.getStart(sourceFile);
            this.replaceWithSingle(sourceFile, pos, pos, createToken(modifier), { suffix: " " });
        }

        public changeIdentifierToPropertyAccess(sourceFile: SourceFile, prefix: string, node: Identifier): void {
            const startPosition = getAdjustedStartPosition(sourceFile, node, {}, Position.Start);
            this.replaceWithSingle(sourceFile, startPosition, startPosition, createPropertyAccess(createIdentifier(prefix), ""), {});
        }

        private getOptionsForInsertNodeBefore(before: Node, doubleNewlines: boolean): ChangeNodeOptions {
            if (isStatement(before) || isClassElement(before)) {
                return { suffix: doubleNewlines ? this.newLineCharacter + this.newLineCharacter : this.newLineCharacter };
            }
            else if (isVariableDeclaration(before)) { // insert `x = 1, ` into `const x = 1, y = 2;
                return { suffix: ", " };
            }
            throw Debug.failBadSyntaxKind(before); // We haven't handled this kind of node yet -- add it
        }

        public insertNodeAtConstructorStart(sourceFile: SourceFile, ctr: ConstructorDeclaration, newStatement: Statement): void {
            const firstStatement = firstOrUndefined(ctr.body.statements);
            if (!firstStatement || !ctr.body.multiLine) {
                this.replaceConstructorBody(sourceFile, ctr, [newStatement, ...ctr.body.statements]);
            }
            else {
                this.insertNodeBefore(sourceFile, firstStatement, newStatement);
            }
        }

        public insertNodeAtConstructorEnd(sourceFile: SourceFile, ctr: ConstructorDeclaration, newStatement: Statement): void {
            const lastStatement = lastOrUndefined(ctr.body.statements);
            if (!lastStatement || !ctr.body.multiLine) {
                this.replaceConstructorBody(sourceFile, ctr, [...ctr.body.statements, newStatement]);
            }
            else {
                this.insertNodeAfter(sourceFile, lastStatement, newStatement);
            }
        }

        private replaceConstructorBody(sourceFile: SourceFile, ctr: ConstructorDeclaration, statements: ReadonlyArray<Statement>): void {
            this.replaceNode(sourceFile, ctr.body, createBlock(statements, /*multiLine*/ true), { useNonAdjustedEndPosition: true });
        }

        public insertNodeAtEndOfScope(sourceFile: SourceFile, scope: Node, newNode: Node): void {
            const startPosition = getAdjustedStartPosition(sourceFile, scope.getLastToken(), {}, Position.Start);
            this.replaceWithSingle(sourceFile, startPosition, startPosition, newNode, {
                prefix: isLineBreak(sourceFile.text.charCodeAt(scope.getLastToken().pos)) ? this.newLineCharacter : this.newLineCharacter + this.newLineCharacter,
                suffix: this.newLineCharacter
            });
        }

        public insertNodeAtClassStart(sourceFile: SourceFile, cls: ClassLikeDeclaration, newElement: ClassElement): void {
            const firstMember = firstOrUndefined(cls.members);
            if (!firstMember) {
                const id = getNodeId(cls).toString();
                const newMembers = this.nodesInsertedAtClassStarts.get(id);
                if (newMembers) {
                    Debug.assert(newMembers.sourceFile === sourceFile && newMembers.cls === cls);
                    newMembers.members.push(newElement);
                }
                else {
                    this.nodesInsertedAtClassStarts.set(id, { sourceFile, cls, members: [newElement] });
                }
            }
            else {
                this.insertNodeBefore(sourceFile, firstMember, newElement);
            }
        }

        public insertNodeAfter(sourceFile: SourceFile, after: Node, newNode: Node): this {
            if (isStatementButNotDeclaration(after) ||
                after.kind === SyntaxKind.PropertyDeclaration ||
                after.kind === SyntaxKind.PropertySignature ||
                after.kind === SyntaxKind.MethodSignature) {
                // check if previous statement ends with semicolon
                // if not - insert semicolon to preserve the code from changing the meaning due to ASI
                if (sourceFile.text.charCodeAt(after.end - 1) !== CharacterCodes.semicolon) {
                    this.changes.push({
                        kind: ChangeKind.ReplaceWithSingleNode,
                        sourceFile,
                        options: {},
                        range: { pos: after.end, end: after.end },
                        node: createToken(SyntaxKind.SemicolonToken)
                    });
                }
            }
            const endPosition = getAdjustedEndPosition(sourceFile, after, {});
            return this.replaceWithSingle(sourceFile, endPosition, endPosition, newNode, this.getInsertNodeAfterOptions(after));
        }

        private getInsertNodeAfterOptions(node: Node): InsertNodeOptions {
            if (isClassDeclaration(node) || isModuleDeclaration(node)) {
                return { prefix: this.newLineCharacter, suffix: this.newLineCharacter };
            }
            else if (isStatement(node) || isClassElement(node) || isTypeElement(node)) {
                return { suffix: this.newLineCharacter };
            }
            else if (isVariableDeclaration(node)) {
                return { prefix: ", " };
            }
            throw Debug.failBadSyntaxKind(node); // We haven't handled this kind of node yet -- add it
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
            const index = indexOfNode(containingList, after);
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
                        kind: ChangeKind.ReplaceWithSingleNode,
                        sourceFile,
                        range: { pos: startPos, end: containingList[index + 1].getStart(sourceFile) },
                        node: newNode,
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
                        kind: ChangeKind.ReplaceWithSingleNode,
                        sourceFile,
                        range: { pos: end, end },
                        node: createToken(separator),
                        options: {}
                    });
                    // use the same indentation as 'after' item
                    const indentation = formatting.SmartIndenter.findFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, this.formatContext.options);
                    // insert element before the line break on the line that contains 'after' element
                    let insertPos = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ false);
                    if (insertPos !== end && isLineBreak(sourceFile.text.charCodeAt(insertPos - 1))) {
                        insertPos--;
                    }
                    this.changes.push({
                        kind: ChangeKind.ReplaceWithSingleNode,
                        sourceFile,
                        range: { pos: insertPos, end: insertPos },
                        node: newNode,
                        options: { indentation, prefix: this.newLineCharacter }
                    });
                }
                else {
                    this.changes.push({
                        kind: ChangeKind.ReplaceWithSingleNode,
                        sourceFile,
                        range: { pos: end, end },
                        node: newNode,
                        options: { prefix: `${tokenToString(separator)} ` }
                    });
                }
            }
            return this;
        }

        private finishInsertNodeAtClassStart(): void {
            this.nodesInsertedAtClassStarts.forEach(({ sourceFile, cls, members }) => {
                const newCls = cls.kind === SyntaxKind.ClassDeclaration
                    ? updateClassDeclaration(cls, cls.decorators, cls.modifiers, cls.name, cls.typeParameters, cls.heritageClauses, members)
                    : updateClassExpression(cls, cls.modifiers, cls.name, cls.typeParameters, cls.heritageClauses, members);
                this.replaceNode(sourceFile, cls, newCls, { useNonAdjustedEndPosition: true });
            });
        }

        public getChanges(): FileTextChanges[] {
            this.finishInsertNodeAtClassStart();

            const changesPerFile = createMap<Change[]>();
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
            changesPerFile.forEach(changesInFile => {
                const sourceFile = changesInFile[0].sourceFile;
                const fileTextChanges: FileTextChanges = { fileName: sourceFile.fileName, textChanges: [] };
                for (const c of ChangeTracker.normalize(changesInFile)) {
                    fileTextChanges.textChanges.push(createTextChange(this.computeSpan(c, sourceFile), this.computeNewText(c, sourceFile)));
                }
                fileChangesList.push(fileTextChanges);
            });

            return fileChangesList;
        }

        private computeSpan(change: Change, _sourceFile: SourceFile): TextSpan {
            return createTextSpanFromBounds(change.range.pos, change.range.end);
        }

        private computeNewText(change: Change, sourceFile: SourceFile): string {
            if (change.kind === ChangeKind.Remove) {
                // deletion case
                return "";
            }

            const options = change.options || {};
            let text: string;
            const pos = change.range.pos;
            const posStartsLine = getLineStartPositionForPosition(pos, sourceFile) === pos;
            if (change.kind === ChangeKind.ReplaceWithMultipleNodes) {
                const parts = change.nodes.map(n => this.getFormattedTextOfNode(n, sourceFile, pos, options));
                text = parts.join(change.options.nodeSeparator);
            }
            else {
                Debug.assert(change.kind === ChangeKind.ReplaceWithSingleNode, "change.kind === ReplaceWithSingleNode");
                text = this.getFormattedTextOfNode(change.node, sourceFile, pos, options);
            }
            // strip initial indentation (spaces or tabs) if text will be inserted in the middle of the line
            text = (posStartsLine || options.indentation !== undefined) ? text : text.replace(/^\s+/, "");
            return (options.prefix || "") + text + (options.suffix || "");
        }

        private getFormattedTextOfNode(node: Node, sourceFile: SourceFile, pos: number, options: ChangeNodeOptions): string {
            const nonformattedText = getNonformattedText(node, sourceFile, this.newLine);
            if (this.validator) {
                this.validator(nonformattedText);
            }

            const { options: formatOptions } = this.formatContext;
            const posStartsLine = getLineStartPositionForPosition(pos, sourceFile) === pos;

            const initialIndentation =
                options.indentation !== undefined
                    ? options.indentation
                    : (options.useIndentationFromFile !== false)
                        ? formatting.SmartIndenter.getIndentation(pos, sourceFile, formatOptions, posStartsLine || (options.prefix === this.newLineCharacter))
                        : 0;
            const delta =
                options.delta !== undefined
                    ? options.delta
                    : formatting.SmartIndenter.shouldIndentChildNode(node)
                        ? (formatOptions.indentSize || 0)
                        : 0;

            return applyFormatting(nonformattedText, sourceFile, initialIndentation, delta, this.formatContext);
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

    function getNonformattedText(node: Node, sourceFile: SourceFile | undefined, newLine: NewLineKind): NonFormattedText {
        const options = { newLine, target: sourceFile && sourceFile.languageVersion };
        const writer = new Writer(getNewLineCharacter(options));
        const printer = createPrinter(options, writer);
        printer.writeNode(EmitHint.Unspecified, node, sourceFile, writer);
        return { text: writer.getText(), node: assignPositionsToNode(node) };
    }

    function applyFormatting(nonFormattedText: NonFormattedText, sourceFile: SourceFile, initialIndentation: number, delta: number, formatContext: ts.formatting.FormatContext) {
        const lineMap = computeLineStarts(nonFormattedText.text);
        const file: SourceFileLike = {
            text: nonFormattedText.text,
            lineMap,
            getLineAndCharacterOfPosition: pos => computeLineAndCharacterOfPosition(lineMap, pos)
        };
        const changes = formatting.formatNodeGivenIndentation(nonFormattedText.node, file, sourceFile.languageVariant, initialIndentation, delta, formatContext);
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
        const newNode = nodeIsSynthesized(visited) ? visited : Object.create(visited) as Node;
        newNode.pos = getPos(node);
        newNode.end = getEnd(node);
        return newNode;
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
        writeKeyword(s: string): void {
            this.writer.writeKeyword(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeOperator(s: string): void {
            this.writer.writeOperator(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writePunctuation(s: string): void {
            this.writer.writePunctuation(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeParameter(s: string): void {
            this.writer.writeParameter(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeProperty(s: string): void {
            this.writer.writeProperty(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeSpace(s: string): void {
            this.writer.writeSpace(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeStringLiteral(s: string): void {
            this.writer.writeStringLiteral(s);
            this.setLastNonTriviaPosition(s, /*force*/ false);
        }
        writeSymbol(s: string, sym: Symbol): void {
            this.writer.writeSymbol(s, sym);
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
        clear(): void {
            this.writer.clear();
            this.lastNonTriviaPosition = 0;
        }
    }

    function getInsertionPositionAtSourceFileTop({ text }: SourceFile): number {
        const shebang = getShebang(text);
        let position = 0;
        if (shebang !== undefined) {
            position = shebang.length;
            advancePastLineBreak();
        }

        // For a source file, it is possible there are detached comments we should not skip
        let ranges = getLeadingCommentRanges(text, position);
        if (!ranges) return position;
        // However we should still skip a pinned comment at the top
        if (ranges.length && ranges[0].kind === SyntaxKind.MultiLineCommentTrivia && isPinnedComment(text, ranges[0])) {
            position = ranges[0].end;
            advancePastLineBreak();
            ranges = ranges.slice(1);
        }
        // As well as any triple slash references
        for (const range of ranges) {
            if (range.kind === SyntaxKind.SingleLineCommentTrivia && isRecognizedTripleSlashComment(text, range.pos, range.end)) {
                position = range.end;
                advancePastLineBreak();
                continue;
            }
            break;
        }
        return position;

        function advancePastLineBreak() {
            if (position < text.length) {
                const charCode = text.charCodeAt(position);
                if (isLineBreak(charCode)) {
                    position++;

                    if (position < text.length && charCode === CharacterCodes.carriageReturn && text.charCodeAt(position) === CharacterCodes.lineFeed) {
                        position++;
                    }
                }
            }
        }
    }
}
