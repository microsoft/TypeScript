import {
    addToSeen,
    ArrowFunction,
    BindingElement,
    CharacterCodes,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    CommentRange,
    concatenate,
    ConstructorDeclaration,
    contains,
    createMultiMap,
    createNodeFactory,
    createPrinter,
    createRange,
    createSourceFile,
    createTextChange,
    createTextRangeFromSpan,
    createTextSpan,
    createTextSpanFromRange,
    createTextWriter,
    Debug,
    DeclarationStatement,
    EmitHint,
    EmitTextWriter,
    endsWith,
    EnumDeclaration,
    EnumMember,
    Expression,
    factory,
    FileTextChanges,
    filter,
    find,
    findChildOfKind,
    findLastIndex,
    findNextToken,
    findPrecedingToken,
    first,
    firstOrUndefined,
    flatMap,
    flatMapToMutable,
    formatting,
    FunctionDeclaration,
    FunctionExpression,
    getAncestor,
    getFirstNonSpaceCharacterPosition,
    getFormatCodeSettingsForWriting,
    getJSDocCommentRanges,
    getLeadingCommentRanges,
    getLineAndCharacterOfPosition,
    getLineOfLocalPosition,
    getLineStartPositionForPosition,
    getNewLineKind,
    getNewLineOrDefaultFromHost,
    getNodeId,
    getOriginalNode,
    getPrecedingNonSpaceCharacterPosition,
    getScriptKindFromFileName,
    getShebang,
    getSourceFileOfNode,
    getStartPositionOfLine,
    getTokenAtPosition,
    getTouchingToken,
    getTrailingCommentRanges,
    group,
    HasJSDoc,
    hasJSDocNodes,
    ImportClause,
    ImportSpecifier,
    indexOfNode,
    InterfaceDeclaration,
    intersperse,
    isAnyImportSyntax,
    isArray,
    isArrowFunction,
    isCallExpression,
    isClassElement,
    isClassOrTypeElement,
    isExpressionStatement,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLike,
    isIdentifier,
    isImportClause,
    isImportDeclaration,
    isImportSpecifier,
    isInComment,
    isInJSXText,
    isInString,
    isInTemplateString,
    isInterfaceDeclaration,
    isJsonSourceFile,
    isLineBreak,
    isNamedImports,
    isObjectLiteralExpression,
    isParameter,
    isPinnedComment,
    isPrologueDirective,
    isPropertyDeclaration,
    isPropertySignature,
    isRecognizedTripleSlashComment,
    isStatement,
    isStatementButNotDeclaration,
    isString,
    isStringLiteral,
    isSuperCall,
    isVariableDeclaration,
    isWhiteSpaceLike,
    isWhiteSpaceSingleLine,
    JSDoc,
    JSDocComment,
    JSDocParameterTag,
    JSDocParsingMode,
    JSDocReturnTag,
    JSDocTag,
    JSDocTypeTag,
    LanguageServiceHost,
    last,
    lastOrUndefined,
    length,
    mapDefined,
    MethodSignature,
    Modifier,
    MultiMap,
    NamedImportBindings,
    NamedImports,
    NamespaceImport,
    Node,
    NodeArray,
    NodeFactoryFlags,
    nodeIsSynthesized,
    nullTransformationContext,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    ParameterDeclaration,
    positionsAreOnSameLine,
    PrintHandlers,
    PrologueDirective,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    rangeContainsPosition,
    rangeContainsRangeExclusive,
    rangeOfNode,
    rangeOfTypeParameters,
    rangeStartPositionsAreOnSameLine,
    removeSuffix,
    ScriptKind,
    ScriptTarget,
    setTextRangePosEnd,
    SignatureDeclaration,
    singleOrUndefined,
    skipTrivia,
    SourceFile,
    SourceFileLike,
    Statement,
    stringContainsAt,
    Symbol,
    SyntaxKind,
    TextChange,
    TextRange,
    textSpanEnd,
    Token,
    tokenToString,
    toSorted,
    TransformationContext,
    TypeLiteralNode,
    TypeNode,
    TypeParameterDeclaration,
    UserPreferences,
    VariableDeclaration,
    VariableStatement,
    visitEachChild,
    visitNodes,
    Visitor,
} from "./_namespaces/ts.js";

/**
 * Currently for simplicity we store recovered positions on the node itself.
 * It can be changed to side-table later if we decide that current design is too invasive.
 */
function getPos(n: TextRange): number {
    const result = (n as any).__pos;
    Debug.assert(typeof result === "number");
    return result;
}

function setPos(n: TextRange, pos: number): void {
    Debug.assert(typeof pos === "number");
    (n as any).__pos = pos;
}

function getEnd(n: TextRange): number {
    const result = (n as any).__end;
    Debug.assert(typeof result === "number");
    return result;
}

function setEnd(n: TextRange, end: number): void {
    Debug.assert(typeof end === "number");
    (n as any).__end = end;
}

/** @internal */
export interface ConfigurableStart {
    leadingTriviaOption?: LeadingTriviaOption;
}
/** @internal */
export interface ConfigurableEnd {
    trailingTriviaOption?: TrailingTriviaOption;
}

/** @internal */
export enum LeadingTriviaOption {
    /** Exclude all leading trivia (use getStart()) */
    Exclude,
    /** Include leading trivia and,
     * if there are no line breaks between the node and the previous token,
     * include all trivia between the node and the previous token
     */
    IncludeAll,
    /**
     * Include attached JSDoc comments
     */
    JSDoc,
    /**
     * Only delete trivia on the same line as getStart().
     * Used to avoid deleting leading comments
     */
    StartLine,
}

/** @internal */
export enum TrailingTriviaOption {
    /** Exclude all trailing trivia (use getEnd()) */
    Exclude,
    /** Doesn't include whitespace, but does strip comments */
    ExcludeWhitespace,
    /** Include trailing trivia */
    Include,
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
 * If pos\end should be interpreted literally (that is, withouth including leading and trailing trivia), `leadingTriviaOption` should be set to `LeadingTriviaOption.Exclude`
 * and `trailingTriviaOption` to `TrailingTriviaOption.Exclude`.
 *
 * @internal
 */
export interface ConfigurableStartEnd extends ConfigurableStart, ConfigurableEnd {}

const useNonAdjustedPositions: ConfigurableStartEnd = {
    leadingTriviaOption: LeadingTriviaOption.Exclude,
    trailingTriviaOption: TrailingTriviaOption.Exclude,
};

/** @internal */
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

/** @internal */
export interface ReplaceWithMultipleNodesOptions extends InsertNodeOptions {
    readonly joiner?: string;
}

enum ChangeKind {
    Remove,
    ReplaceWithSingleNode,
    ReplaceWithMultipleNodes,
    Text,
}

type Change = ReplaceWithSingleNode | ReplaceWithMultipleNodes | RemoveNode | ChangeText;

interface BaseChange {
    readonly sourceFile: SourceFile;
    readonly range: TextRange;
}

/** @internal */
export interface ChangeNodeOptions extends ConfigurableStartEnd, InsertNodeOptions {}
interface ReplaceWithSingleNode extends BaseChange {
    readonly kind: ChangeKind.ReplaceWithSingleNode;
    readonly node: Node;
    readonly options?: InsertNodeOptions;
}

interface RemoveNode extends BaseChange {
    readonly kind: ChangeKind.Remove;
    readonly node?: never;
    readonly options?: never;
}

interface ReplaceWithMultipleNodes extends BaseChange {
    readonly kind: ChangeKind.ReplaceWithMultipleNodes;
    readonly nodes: readonly Node[];
    readonly options?: ReplaceWithMultipleNodesOptions;
}

interface ChangeText extends BaseChange {
    readonly kind: ChangeKind.Text;
    readonly text: string;
}

interface NewFileInsertion {
    readonly oldFile?: SourceFile;
    readonly statements: readonly (Statement | SyntaxKind.NewLineTrivia)[];
}

function getAdjustedRange(sourceFile: SourceFile, startNode: Node, endNode: Node, options: ConfigurableStartEnd): TextRange {
    return { pos: getAdjustedStartPosition(sourceFile, startNode, options), end: getAdjustedEndPosition(sourceFile, endNode, options) };
}

function getAdjustedStartPosition(sourceFile: SourceFile, node: Node, options: ConfigurableStartEnd, hasTrailingComment = false) {
    const { leadingTriviaOption } = options;
    if (leadingTriviaOption === LeadingTriviaOption.Exclude) {
        return node.getStart(sourceFile);
    }
    if (leadingTriviaOption === LeadingTriviaOption.StartLine) {
        const startPos = node.getStart(sourceFile);
        const pos = getLineStartPositionForPosition(startPos, sourceFile);
        return rangeContainsPosition(node, pos) ? pos : startPos;
    }
    if (leadingTriviaOption === LeadingTriviaOption.JSDoc) {
        const JSDocComments = getJSDocCommentRanges(node, sourceFile.text);
        if (JSDocComments?.length) {
            return getLineStartPositionForPosition(JSDocComments[0].pos, sourceFile);
        }
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
        return leadingTriviaOption === LeadingTriviaOption.IncludeAll ? fullStart : start;
    }

    // if node has a trailing comments, use comment end position as the text has already been included.
    if (hasTrailingComment) {
        // Check first for leading comments as if the node is the first import, we want to exclude the trivia;
        // otherwise we get the trailing comments.
        const comment = getLeadingCommentRanges(sourceFile.text, fullStart)?.[0] || getTrailingCommentRanges(sourceFile.text, fullStart)?.[0];
        if (comment) {
            return skipTrivia(sourceFile.text, comment.end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
        }
    }

    // get start position of the line following the line that contains fullstart position
    // (but only if the fullstart isn't the very beginning of the file)
    const nextLineStart = fullStart > 0 ? 1 : 0;
    let adjustedStartPosition = getStartPositionOfLine(getLineOfLocalPosition(sourceFile, fullStartLine) + nextLineStart, sourceFile);
    // skip whitespaces/newlines
    adjustedStartPosition = skipWhitespacesAndLineBreaks(sourceFile.text, adjustedStartPosition);
    return getStartPositionOfLine(getLineOfLocalPosition(sourceFile, adjustedStartPosition), sourceFile);
}

/** Return the end position of a multiline comment of it is on another line; otherwise returns `undefined`; */
function getEndPositionOfMultilineTrailingComment(sourceFile: SourceFile, node: Node, options: ConfigurableEnd): number | undefined {
    const { end } = node;
    const { trailingTriviaOption } = options;
    if (trailingTriviaOption === TrailingTriviaOption.Include) {
        // If the trailing comment is a multiline comment that extends to the next lines,
        // return the end of the comment and track it for the next nodes to adjust.
        const comments = getTrailingCommentRanges(sourceFile.text, end);
        if (comments) {
            const nodeEndLine = getLineOfLocalPosition(sourceFile, node.end);
            for (const comment of comments) {
                // Single line can break the loop as trivia will only be this line.
                // Comments on subsequest lines are also ignored.
                if (comment.kind === SyntaxKind.SingleLineCommentTrivia || getLineOfLocalPosition(sourceFile, comment.pos) > nodeEndLine) {
                    break;
                }

                // Get the end line of the comment and compare against the end line of the node.
                // If the comment end line position and the multiline comment extends to multiple lines,
                // then is safe to return the end position.
                const commentEndLine = getLineOfLocalPosition(sourceFile, comment.end);
                if (commentEndLine > nodeEndLine) {
                    return skipTrivia(sourceFile.text, comment.end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
                }
            }
        }
    }

    return undefined;
}

function getAdjustedEndPosition(sourceFile: SourceFile, node: Node, options: ConfigurableEnd): number {
    const { end } = node;
    const { trailingTriviaOption } = options;
    if (trailingTriviaOption === TrailingTriviaOption.Exclude) {
        return end;
    }
    if (trailingTriviaOption === TrailingTriviaOption.ExcludeWhitespace) {
        const comments = concatenate(getTrailingCommentRanges(sourceFile.text, end), getLeadingCommentRanges(sourceFile.text, end));
        const realEnd = comments?.[comments.length - 1]?.end;
        if (realEnd) {
            return realEnd;
        }
        return end;
    }

    const multilineEndPosition = getEndPositionOfMultilineTrailingComment(sourceFile, node, options);
    if (multilineEndPosition) {
        return multilineEndPosition;
    }

    const newEnd = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true);

    return newEnd !== end && (trailingTriviaOption === TrailingTriviaOption.Include || isLineBreak(sourceFile.text.charCodeAt(newEnd - 1)))
        ? newEnd
        : end;
}

/**
 * Checks if 'candidate' argument is a legal separator in the list that contains 'node' as an element
 */
function isSeparator(node: Node, candidate: Node | undefined): candidate is Token<SyntaxKind.CommaToken | SyntaxKind.SemicolonToken> {
    return !!candidate && !!node.parent && (candidate.kind === SyntaxKind.CommaToken || (candidate.kind === SyntaxKind.SemicolonToken && node.parent.kind === SyntaxKind.ObjectLiteralExpression));
}

/** @internal */
export interface TextChangesContext {
    host: LanguageServiceHost;
    formatContext: formatting.FormatContext;
    preferences: UserPreferences;
}

/** @internal */
export type TypeAnnotatable = SignatureDeclaration | VariableDeclaration | ParameterDeclaration | PropertyDeclaration | PropertySignature;

/** @internal */
export type ThisTypeAnnotatable = FunctionDeclaration | FunctionExpression;

/** @internal */
export function isThisTypeAnnotatable(containingFunction: SignatureDeclaration): containingFunction is ThisTypeAnnotatable {
    return isFunctionExpression(containingFunction) || isFunctionDeclaration(containingFunction);
}

/** @internal */
export class ChangeTracker {
    private readonly changes: Change[] = [];
    private newFileChanges?: MultiMap<string, NewFileInsertion>;
    private readonly classesWithNodesInsertedAtStart = new Map<number, { readonly node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression; readonly sourceFile: SourceFile; }>(); // Set<ClassDeclaration> implemented as Map<node id, ClassDeclaration>
    private readonly deletedNodes: { readonly sourceFile: SourceFile; readonly node: Node | NodeArray<TypeParameterDeclaration>; }[] = [];

    public static fromContext(context: TextChangesContext): ChangeTracker {
        return new ChangeTracker(getNewLineOrDefaultFromHost(context.host, context.formatContext.options), context.formatContext);
    }

    public static with(context: TextChangesContext, cb: (tracker: ChangeTracker) => void): FileTextChanges[] {
        const tracker = ChangeTracker.fromContext(context);
        cb(tracker);
        return tracker.getChanges();
    }

    /** Public for tests only. Other callers should use `ChangeTracker.with`. */
    constructor(private readonly newLineCharacter: string, private readonly formatContext: formatting.FormatContext) {}

    public pushRaw(sourceFile: SourceFile, change: FileTextChanges) {
        Debug.assertEqual(sourceFile.fileName, change.fileName);
        for (const c of change.textChanges) {
            this.changes.push({
                kind: ChangeKind.Text,
                sourceFile,
                text: c.newText,
                range: createTextRangeFromSpan(c.span),
            });
        }
    }

    public deleteRange(sourceFile: SourceFile, range: TextRange): void {
        this.changes.push({ kind: ChangeKind.Remove, sourceFile, range });
    }

    delete(sourceFile: SourceFile, node: Node | NodeArray<TypeParameterDeclaration>): void {
        this.deletedNodes.push({ sourceFile, node });
    }

    /** Stop! Consider using `delete` instead, which has logic for deleting nodes from delimited lists. */
    public deleteNode(sourceFile: SourceFile, node: Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        this.deleteRange(sourceFile, getAdjustedRange(sourceFile, node, node, options));
    }

    public deleteNodes(sourceFile: SourceFile, nodes: readonly Node[], options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }, hasTrailingComment: boolean): void {
        // When deleting multiple nodes we need to track if the end position is including multiline trailing comments.
        for (const node of nodes) {
            const pos = getAdjustedStartPosition(sourceFile, node, options, hasTrailingComment);
            const end = getAdjustedEndPosition(sourceFile, node, options);

            this.deleteRange(sourceFile, { pos, end });

            hasTrailingComment = !!getEndPositionOfMultilineTrailingComment(sourceFile, node, options);
        }
    }

    public deleteModifier(sourceFile: SourceFile, modifier: Modifier): void {
        this.deleteRange(sourceFile, { pos: modifier.getStart(sourceFile), end: skipTrivia(sourceFile.text, modifier.end, /*stopAfterLineBreak*/ true) });
    }

    public deleteNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        const startPosition = getAdjustedStartPosition(sourceFile, startNode, options);
        const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
        this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
    }

    public deleteNodeRangeExcludingEnd(sourceFile: SourceFile, startNode: Node, afterEndNode: Node | undefined, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        const startPosition = getAdjustedStartPosition(sourceFile, startNode, options);
        const endPosition = afterEndNode === undefined ? sourceFile.text.length : getAdjustedStartPosition(sourceFile, afterEndNode, options);
        this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
    }

    public replaceRange(sourceFile: SourceFile, range: TextRange, newNode: Node, options: InsertNodeOptions = {}): void {
        this.changes.push({ kind: ChangeKind.ReplaceWithSingleNode, sourceFile, range, options, node: newNode });
    }

    public replaceNode(sourceFile: SourceFile, oldNode: Node, newNode: Node, options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRange(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, options), newNode, options);
    }

    public replaceNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, newNode: Node, options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRange(sourceFile, getAdjustedRange(sourceFile, startNode, endNode, options), newNode, options);
    }

    private replaceRangeWithNodes(sourceFile: SourceFile, range: TextRange, newNodes: readonly Node[], options: ReplaceWithMultipleNodesOptions & ConfigurableStartEnd = {}): void {
        this.changes.push({ kind: ChangeKind.ReplaceWithMultipleNodes, sourceFile, range, options, nodes: newNodes });
    }

    public replaceNodeWithNodes(sourceFile: SourceFile, oldNode: Node, newNodes: readonly Node[], options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRangeWithNodes(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, options), newNodes, options);
    }

    public replaceNodeWithText(sourceFile: SourceFile, oldNode: Node, text: string): void {
        this.replaceRangeWithText(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, useNonAdjustedPositions), text);
    }

    public replaceNodeRangeWithNodes(sourceFile: SourceFile, startNode: Node, endNode: Node, newNodes: readonly Node[], options: ReplaceWithMultipleNodesOptions & ConfigurableStartEnd = useNonAdjustedPositions): void {
        this.replaceRangeWithNodes(sourceFile, getAdjustedRange(sourceFile, startNode, endNode, options), newNodes, options);
    }

    public nodeHasTrailingComment(sourceFile: SourceFile, oldNode: Node, configurableEnd: ConfigurableEnd = useNonAdjustedPositions): boolean {
        return !!getEndPositionOfMultilineTrailingComment(sourceFile, oldNode, configurableEnd);
    }

    private nextCommaToken(sourceFile: SourceFile, node: Node): Node | undefined {
        const next = findNextToken(node, node.parent, sourceFile);
        return next && next.kind === SyntaxKind.CommaToken ? next : undefined;
    }

    public replacePropertyAssignment(sourceFile: SourceFile, oldNode: PropertyAssignment, newNode: PropertyAssignment): void {
        const suffix = this.nextCommaToken(sourceFile, oldNode) ? "" : ("," + this.newLineCharacter);
        this.replaceNode(sourceFile, oldNode, newNode, { suffix });
    }

    public insertNodeAt(sourceFile: SourceFile, pos: number, newNode: Node, options: InsertNodeOptions = {}): void {
        this.replaceRange(sourceFile, createRange(pos), newNode, options);
    }

    private insertNodesAt(sourceFile: SourceFile, pos: number, newNodes: readonly Node[], options: ReplaceWithMultipleNodesOptions = {}): void {
        this.replaceRangeWithNodes(sourceFile, createRange(pos), newNodes, options);
    }

    public insertNodeAtTopOfFile(sourceFile: SourceFile, newNode: Statement, blankLineBetween: boolean): void {
        this.insertAtTopOfFile(sourceFile, newNode, blankLineBetween);
    }

    public insertNodesAtTopOfFile(sourceFile: SourceFile, newNodes: readonly Statement[], blankLineBetween: boolean): void {
        this.insertAtTopOfFile(sourceFile, newNodes, blankLineBetween);
    }

    private insertAtTopOfFile(sourceFile: SourceFile, insert: Statement | readonly Statement[], blankLineBetween: boolean): void {
        const pos = getInsertionPositionAtSourceFileTop(sourceFile);
        const options = {
            prefix: pos === 0 ? undefined : this.newLineCharacter,
            suffix: (isLineBreak(sourceFile.text.charCodeAt(pos)) ? "" : this.newLineCharacter) + (blankLineBetween ? this.newLineCharacter : ""),
        };
        if (isArray(insert)) {
            this.insertNodesAt(sourceFile, pos, insert, options);
        }
        else {
            this.insertNodeAt(sourceFile, pos, insert, options);
        }
    }

    public insertNodesAtEndOfFile(
        sourceFile: SourceFile,
        newNodes: readonly Statement[],
        blankLineBetween: boolean,
    ): void {
        this.insertAtEndOfFile(sourceFile, newNodes, blankLineBetween);
    }

    private insertAtEndOfFile(
        sourceFile: SourceFile,
        insert: readonly Statement[],
        blankLineBetween: boolean,
    ): void {
        const pos = sourceFile.end + 1;
        const options = {
            prefix: this.newLineCharacter,
            suffix: this.newLineCharacter + (blankLineBetween ? this.newLineCharacter : ""),
        };
        this.insertNodesAt(sourceFile, pos, insert, options);
    }

    public insertStatementsInNewFile(fileName: string, statements: readonly (Statement | SyntaxKind.NewLineTrivia)[], oldFile?: SourceFile): void {
        if (!this.newFileChanges) {
            this.newFileChanges = createMultiMap<string, NewFileInsertion>();
        }
        this.newFileChanges.add(fileName, { oldFile, statements });
    }

    public insertFirstParameter(sourceFile: SourceFile, parameters: NodeArray<ParameterDeclaration>, newParam: ParameterDeclaration): void {
        const p0 = firstOrUndefined(parameters);
        if (p0) {
            this.insertNodeBefore(sourceFile, p0, newParam);
        }
        else {
            this.insertNodeAt(sourceFile, parameters.pos, newParam);
        }
    }

    public insertNodeBefore(sourceFile: SourceFile, before: Node, newNode: Node, blankLineBetween = false, options: ConfigurableStartEnd = {}): void {
        this.insertNodeAt(sourceFile, getAdjustedStartPosition(sourceFile, before, options), newNode, this.getOptionsForInsertNodeBefore(before, newNode, blankLineBetween));
    }

    public insertNodesBefore(sourceFile: SourceFile, before: Node, newNodes: readonly Node[], blankLineBetween = false, options: ConfigurableStartEnd = {}): void {
        this.insertNodesAt(sourceFile, getAdjustedStartPosition(sourceFile, before, options), newNodes, this.getOptionsForInsertNodeBefore(before, first(newNodes), blankLineBetween));
    }

    public insertModifierAt(sourceFile: SourceFile, pos: number, modifier: SyntaxKind, options: InsertNodeOptions = {}): void {
        this.insertNodeAt(sourceFile, pos, factory.createToken(modifier), options);
    }

    public insertModifierBefore(sourceFile: SourceFile, modifier: SyntaxKind, before: Node): void {
        return this.insertModifierAt(sourceFile, before.getStart(sourceFile), modifier, { suffix: " " });
    }

    public insertCommentBeforeLine(sourceFile: SourceFile, lineNumber: number, position: number, commentText: string): void {
        const lineStartPosition = getStartPositionOfLine(lineNumber, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);
        // First try to see if we can put the comment on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // If so, we do not want to separate the node from its comment if we can.
        // Otherwise, add an extra new line immediately before the error span.
        const insertAtLineStart = isValidLocationToAddComment(sourceFile, startPosition);
        const token = getTouchingToken(sourceFile, insertAtLineStart ? startPosition : position);
        const indent = sourceFile.text.slice(lineStartPosition, startPosition);
        const text = `${insertAtLineStart ? "" : this.newLineCharacter}//${commentText}${this.newLineCharacter}${indent}`;
        this.insertText(sourceFile, token.getStart(sourceFile), text);
    }

    public insertJsdocCommentBefore(sourceFile: SourceFile, node: HasJSDoc, tag: JSDoc): void {
        const fnStart = node.getStart(sourceFile);
        if (node.jsDoc) {
            for (const jsdoc of node.jsDoc) {
                this.deleteRange(sourceFile, {
                    pos: getLineStartPositionForPosition(jsdoc.getStart(sourceFile), sourceFile),
                    end: getAdjustedEndPosition(sourceFile, jsdoc, /*options*/ {}),
                });
            }
        }
        const startPosition = getPrecedingNonSpaceCharacterPosition(sourceFile.text, fnStart - 1);
        const indent = sourceFile.text.slice(startPosition, fnStart);
        this.insertNodeAt(sourceFile, fnStart, tag, { suffix: this.newLineCharacter + indent });
    }

    private createJSDocText(sourceFile: SourceFile, node: HasJSDoc) {
        const comments = flatMap(node.jsDoc, jsDoc => isString(jsDoc.comment) ? factory.createJSDocText(jsDoc.comment) : jsDoc.comment) as JSDocComment[];
        const jsDoc = singleOrUndefined(node.jsDoc);
        return jsDoc && positionsAreOnSameLine(jsDoc.pos, jsDoc.end, sourceFile) && length(comments) === 0 ? undefined :
            factory.createNodeArray(intersperse(comments, factory.createJSDocText("\n")));
    }

    public replaceJSDocComment(sourceFile: SourceFile, node: HasJSDoc, tags: readonly JSDocTag[]) {
        this.insertJsdocCommentBefore(sourceFile, updateJSDocHost(node), factory.createJSDocComment(this.createJSDocText(sourceFile, node), factory.createNodeArray(tags)));
    }

    public addJSDocTags(sourceFile: SourceFile, parent: HasJSDoc, newTags: readonly JSDocTag[]): void {
        const oldTags = flatMapToMutable(parent.jsDoc, j => j.tags);
        const unmergedNewTags = newTags.filter(newTag =>
            !oldTags.some((tag, i) => {
                const merged = tryMergeJsdocTags(tag, newTag);
                if (merged) oldTags[i] = merged;
                return !!merged;
            })
        );
        this.replaceJSDocComment(sourceFile, parent, [...oldTags, ...unmergedNewTags]);
    }

    public filterJSDocTags(sourceFile: SourceFile, parent: HasJSDoc, predicate: (tag: JSDocTag) => boolean): void {
        this.replaceJSDocComment(sourceFile, parent, filter(flatMapToMutable(parent.jsDoc, j => j.tags), predicate));
    }

    public replaceRangeWithText(sourceFile: SourceFile, range: TextRange, text: string): void {
        this.changes.push({ kind: ChangeKind.Text, sourceFile, range, text });
    }

    public insertText(sourceFile: SourceFile, pos: number, text: string): void {
        this.replaceRangeWithText(sourceFile, createRange(pos), text);
    }

    /** Prefer this over replacing a node with another that has a type annotation, as it avoids reformatting the other parts of the node. */
    public tryInsertTypeAnnotation(sourceFile: SourceFile, node: TypeAnnotatable, type: TypeNode): boolean {
        let endNode: Node | undefined;
        if (isFunctionLike(node)) {
            endNode = findChildOfKind(node, SyntaxKind.CloseParenToken, sourceFile);
            if (!endNode) {
                if (!isArrowFunction(node)) return false; // Function missing parentheses, give up
                // If no `)`, is an arrow function `x => x`, so use the end of the first parameter
                endNode = first(node.parameters);
            }
        }
        else {
            endNode = (node.kind === SyntaxKind.VariableDeclaration ? node.exclamationToken : node.questionToken) ?? node.name;
        }

        this.insertNodeAt(sourceFile, endNode.end, type, { prefix: ": " });
        return true;
    }

    public tryInsertThisTypeAnnotation(sourceFile: SourceFile, node: ThisTypeAnnotatable, type: TypeNode): void {
        const start = findChildOfKind(node, SyntaxKind.OpenParenToken, sourceFile)!.getStart(sourceFile) + 1;
        const suffix = node.parameters.length ? ", " : "";

        this.insertNodeAt(sourceFile, start, type, { prefix: "this: ", suffix });
    }

    public insertTypeParameters(sourceFile: SourceFile, node: SignatureDeclaration, typeParameters: readonly TypeParameterDeclaration[]): void {
        // If no `(`, is an arrow function `x => x`, so use the pos of the first parameter
        const start = (findChildOfKind(node, SyntaxKind.OpenParenToken, sourceFile) || first(node.parameters)).getStart(sourceFile);
        this.insertNodesAt(sourceFile, start, typeParameters, { prefix: "<", suffix: ">", joiner: ", " });
    }

    private getOptionsForInsertNodeBefore(before: Node, inserted: Node, blankLineBetween: boolean): InsertNodeOptions {
        if (isStatement(before) || isClassElement(before)) {
            return { suffix: blankLineBetween ? this.newLineCharacter + this.newLineCharacter : this.newLineCharacter };
        }
        else if (isVariableDeclaration(before)) { // insert `x = 1, ` into `const x = 1, y = 2;
            return { suffix: ", " };
        }
        else if (isParameter(before)) {
            return isParameter(inserted) ? { suffix: ", " } : {};
        }
        else if (isStringLiteral(before) && isImportDeclaration(before.parent) || isNamedImports(before)) {
            return { suffix: ", " };
        }
        else if (isImportSpecifier(before)) {
            return { suffix: "," + (blankLineBetween ? this.newLineCharacter : " ") };
        }
        return Debug.failBadSyntaxKind(before); // We haven't handled this kind of node yet -- add it
    }

    public insertNodeAtConstructorStart(sourceFile: SourceFile, ctr: ConstructorDeclaration, newStatement: Statement): void {
        const firstStatement = firstOrUndefined(ctr.body!.statements);
        if (!firstStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [newStatement, ...ctr.body!.statements]);
        }
        else {
            this.insertNodeBefore(sourceFile, firstStatement, newStatement);
        }
    }

    public insertNodeAtConstructorStartAfterSuperCall(sourceFile: SourceFile, ctr: ConstructorDeclaration, newStatement: Statement): void {
        const superCallStatement = find(ctr.body!.statements, stmt => isExpressionStatement(stmt) && isSuperCall(stmt.expression));
        if (!superCallStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [...ctr.body!.statements, newStatement]);
        }
        else {
            this.insertNodeAfter(sourceFile, superCallStatement, newStatement);
        }
    }

    public insertNodeAtConstructorEnd(sourceFile: SourceFile, ctr: ConstructorDeclaration, newStatement: Statement): void {
        const lastStatement = lastOrUndefined(ctr.body!.statements);
        if (!lastStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [...ctr.body!.statements, newStatement]);
        }
        else {
            this.insertNodeAfter(sourceFile, lastStatement, newStatement);
        }
    }

    private replaceConstructorBody(sourceFile: SourceFile, ctr: ConstructorDeclaration, statements: readonly Statement[]): void {
        this.replaceNode(sourceFile, ctr.body!, factory.createBlock(statements, /*multiLine*/ true));
    }

    public insertNodeAtEndOfScope(sourceFile: SourceFile, scope: Node, newNode: Node): void {
        const pos = getAdjustedStartPosition(sourceFile, scope.getLastToken()!, {});
        this.insertNodeAt(sourceFile, pos, newNode, {
            prefix: isLineBreak(sourceFile.text.charCodeAt(scope.getLastToken()!.pos)) ? this.newLineCharacter : this.newLineCharacter + this.newLineCharacter,
            suffix: this.newLineCharacter,
        });
    }

    public insertMemberAtStart(sourceFile: SourceFile, node: ClassLikeDeclaration | InterfaceDeclaration | TypeLiteralNode | EnumDeclaration, newElement: ClassElement | PropertySignature | MethodSignature | EnumMember): void {
        this.insertNodeAtStartWorker(sourceFile, node, newElement);
    }

    public insertNodeAtObjectStart(sourceFile: SourceFile, obj: ObjectLiteralExpression, newElement: ObjectLiteralElementLike): void {
        this.insertNodeAtStartWorker(sourceFile, obj, newElement);
    }

    private insertNodeAtStartWorker(sourceFile: SourceFile, node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression | TypeLiteralNode | EnumDeclaration, newElement: ClassElement | ObjectLiteralElementLike | PropertySignature | MethodSignature | EnumMember): void {
        const indentation = this.guessIndentationFromExistingMembers(sourceFile, node) ?? this.computeIndentationForNewMember(sourceFile, node);
        this.insertNodeAt(sourceFile, getMembersOrProperties(node).pos, newElement, this.getInsertNodeAtStartInsertOptions(sourceFile, node, indentation));
    }

    /**
     * Tries to guess the indentation from the existing members of a class/interface/object. All members must be on
     * new lines and must share the same indentation.
     */
    private guessIndentationFromExistingMembers(sourceFile: SourceFile, node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression | TypeLiteralNode | EnumDeclaration) {
        let indentation: number | undefined;
        let lastRange: TextRange = node;
        for (const member of getMembersOrProperties(node)) {
            if (rangeStartPositionsAreOnSameLine(lastRange, member, sourceFile)) {
                // each indented member must be on a new line
                return undefined;
            }
            const memberStart = member.getStart(sourceFile);
            const memberIndentation = formatting.SmartIndenter.findFirstNonWhitespaceColumn(getLineStartPositionForPosition(memberStart, sourceFile), memberStart, sourceFile, this.formatContext.options);
            if (indentation === undefined) {
                indentation = memberIndentation;
            }
            else if (memberIndentation !== indentation) {
                // indentation of multiple members is not consistent
                return undefined;
            }
            lastRange = member;
        }
        return indentation;
    }

    private computeIndentationForNewMember(sourceFile: SourceFile, node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression | TypeLiteralNode | EnumDeclaration) {
        const nodeStart = node.getStart(sourceFile);
        return formatting.SmartIndenter.findFirstNonWhitespaceColumn(getLineStartPositionForPosition(nodeStart, sourceFile), nodeStart, sourceFile, this.formatContext.options)
            + (this.formatContext.options.indentSize ?? 4);
    }

    private getInsertNodeAtStartInsertOptions(sourceFile: SourceFile, node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression | TypeLiteralNode | EnumDeclaration, indentation: number): InsertNodeOptions {
        // Rules:
        // - Always insert leading newline.
        // - For object literals:
        //   - Add a trailing comma if there are existing members in the node, or the source file is not a JSON file
        //     (because trailing commas are generally illegal in a JSON file).
        //   - Add a leading comma if the source file is not a JSON file, there are existing insertions,
        //     and the node is empty (because we didn't add a trailing comma per the previous rule).
        // - Only insert a trailing newline if body is single-line and there are no other insertions for the node.
        //   NOTE: This is handled in `finishClassesWithNodesInsertedAtStart`.

        const members = getMembersOrProperties(node);
        const isEmpty = members.length === 0;
        const isFirstInsertion = addToSeen(this.classesWithNodesInsertedAtStart, getNodeId(node), { node, sourceFile });
        const insertTrailingComma = isObjectLiteralExpression(node) && (!isJsonSourceFile(sourceFile) || !isEmpty);
        const insertLeadingComma = isObjectLiteralExpression(node) && isJsonSourceFile(sourceFile) && isEmpty && !isFirstInsertion;
        return {
            indentation,
            prefix: (insertLeadingComma ? "," : "") + this.newLineCharacter,
            suffix: insertTrailingComma ? "," : isInterfaceDeclaration(node) && isEmpty ? ";" : "",
        };
    }

    public insertNodeAfterComma(sourceFile: SourceFile, after: Node, newNode: Node): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, this.nextCommaToken(sourceFile, after) || after, newNode);
        this.insertNodeAt(sourceFile, endPosition, newNode, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    public insertNodeAfter(sourceFile: SourceFile, after: Node, newNode: Node): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, after, newNode);
        this.insertNodeAt(sourceFile, endPosition, newNode, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    public insertNodeAtEndOfList(sourceFile: SourceFile, list: NodeArray<Node>, newNode: Node): void {
        this.insertNodeAt(sourceFile, list.end, newNode, { prefix: ", " });
    }

    public insertNodesAfter(sourceFile: SourceFile, after: Node, newNodes: readonly Node[]): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, after, first(newNodes));
        this.insertNodesAt(sourceFile, endPosition, newNodes, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    private insertNodeAfterWorker(sourceFile: SourceFile, after: Node, newNode: Node): number {
        if (needSemicolonBetween(after, newNode)) {
            // check if previous statement ends with semicolon
            // if not - insert semicolon to preserve the code from changing the meaning due to ASI
            if (sourceFile.text.charCodeAt(after.end - 1) !== CharacterCodes.semicolon) {
                this.replaceRange(sourceFile, createRange(after.end), factory.createToken(SyntaxKind.SemicolonToken));
            }
        }
        const endPosition = getAdjustedEndPosition(sourceFile, after, {});
        return endPosition;
    }

    private getInsertNodeAfterOptions(sourceFile: SourceFile, after: Node): InsertNodeOptions {
        const options = this.getInsertNodeAfterOptionsWorker(after);
        return {
            ...options,
            prefix: after.end === sourceFile.end && isStatement(after) ? (options.prefix ? `\n${options.prefix}` : "\n") : options.prefix,
        };
    }

    private getInsertNodeAfterOptionsWorker(node: Node): InsertNodeOptions {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
                return { prefix: this.newLineCharacter, suffix: this.newLineCharacter };

            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.Identifier:
                return { prefix: ", " };

            case SyntaxKind.PropertyAssignment:
                return { suffix: "," + this.newLineCharacter };

            case SyntaxKind.ExportKeyword:
                return { prefix: " " };

            case SyntaxKind.Parameter:
                return {};

            default:
                Debug.assert(isStatement(node) || isClassOrTypeElement(node)); // Else we haven't handled this kind of node yet -- add it
                return { suffix: this.newLineCharacter };
        }
    }

    public insertName(sourceFile: SourceFile, node: FunctionExpression | ClassExpression | ArrowFunction, name: string): void {
        Debug.assert(!node.name);
        if (node.kind === SyntaxKind.ArrowFunction) {
            const arrow = findChildOfKind(node, SyntaxKind.EqualsGreaterThanToken, sourceFile)!;
            const lparen = findChildOfKind(node, SyntaxKind.OpenParenToken, sourceFile);
            if (lparen) {
                // `() => {}` --> `function f() {}`
                this.insertNodesAt(sourceFile, lparen.getStart(sourceFile), [factory.createToken(SyntaxKind.FunctionKeyword), factory.createIdentifier(name)], { joiner: " " });
                deleteNode(this, sourceFile, arrow);
            }
            else {
                // `x => {}` -> `function f(x) {}`
                this.insertText(sourceFile, first(node.parameters).getStart(sourceFile), `function ${name}(`);
                // Replacing full range of arrow to get rid of the leading space -- replace ` =>` with `)`
                this.replaceRange(sourceFile, arrow, factory.createToken(SyntaxKind.CloseParenToken));
            }

            if (node.body.kind !== SyntaxKind.Block) {
                // `() => 0` => `function f() { return 0; }`
                this.insertNodesAt(sourceFile, node.body.getStart(sourceFile), [factory.createToken(SyntaxKind.OpenBraceToken), factory.createToken(SyntaxKind.ReturnKeyword)], { joiner: " ", suffix: " " });
                this.insertNodesAt(sourceFile, node.body.end, [factory.createToken(SyntaxKind.SemicolonToken), factory.createToken(SyntaxKind.CloseBraceToken)], { joiner: " " });
            }
        }
        else {
            const pos = findChildOfKind(node, node.kind === SyntaxKind.FunctionExpression ? SyntaxKind.FunctionKeyword : SyntaxKind.ClassKeyword, sourceFile)!.end;
            this.insertNodeAt(sourceFile, pos, factory.createIdentifier(name), { prefix: " " });
        }
    }

    public insertExportModifier(sourceFile: SourceFile, node: DeclarationStatement | VariableStatement): void {
        this.insertText(sourceFile, node.getStart(sourceFile), "export ");
    }

    public insertImportSpecifierAtIndex(sourceFile: SourceFile, importSpecifier: ImportSpecifier, namedImports: NamedImports, index: number) {
        const prevSpecifier = namedImports.elements[index - 1];
        if (prevSpecifier) {
            this.insertNodeInListAfter(sourceFile, prevSpecifier, importSpecifier);
        }
        else {
            this.insertNodeBefore(
                sourceFile,
                namedImports.elements[0],
                importSpecifier,
                !positionsAreOnSameLine(namedImports.elements[0].getStart(), namedImports.parent.parent.getStart(), sourceFile),
            );
        }
    }

    /**
     * This function should be used to insert nodes in lists when nodes don't carry separators as the part of the node range,
     * i.e. arguments in arguments lists, parameters in parameter lists etc.
     * Note that separators are part of the node in statements and class elements.
     */
    public insertNodeInListAfter(sourceFile: SourceFile, after: Node, newNode: Node, containingList = formatting.SmartIndenter.getContainingList(after, sourceFile)): void {
        if (!containingList) {
            Debug.fail("node is not a list element");
            return;
        }
        const index = indexOfNode(containingList, after);
        if (index < 0) {
            return;
        }
        const end = after.getEnd();
        if (index !== containingList.length - 1) {
            // any element except the last one
            // use next sibling as an anchor
            const nextToken = getTokenAtPosition(sourceFile, after.end);
            if (nextToken && isSeparator(after, nextToken)) {
                // for list
                // a, b, c
                // create change for adding 'e' after 'a' as
                // - find start of next element after a (it is b)
                // - use next element start as start and end position in final change
                // - build text of change by formatting the text of node + whitespace trivia of b

                // in multiline case it will work as
                //   a,
                //   b,
                //   c,
                // result - '*' denotes leading trivia that will be inserted after new text (displayed as '#')
                //   a,
                //   insertedtext<separator>#
                // ###b,
                //   c,
                const nextNode = containingList[index + 1];
                const startPos = skipWhitespacesAndLineBreaks(sourceFile.text, nextNode.getFullStart());

                // write separator and leading trivia of the next element as suffix
                const suffix = `${tokenToString(nextToken.kind)}${sourceFile.text.substring(nextToken.end, startPos)}`;
                this.insertNodesAt(sourceFile, startPos, [newNode], { suffix });
            }
        }
        else {
            const afterStart = after.getStart(sourceFile);
            const afterStartLinePosition = getLineStartPositionForPosition(afterStart, sourceFile);

            let separator: SyntaxKind.CommaToken | SyntaxKind.SemicolonToken | undefined;
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
            if (
                hasCommentsBeforeLineBreak(sourceFile.text, after.end)
                || !positionsAreOnSameLine(containingList.pos, containingList.end, sourceFile)
            ) {
                // in this case we'll always treat containing list as multiline
                multilineList = true;
            }
            if (multilineList) {
                // insert separator immediately following the 'after' node to preserve comments in trailing trivia
                this.replaceRange(sourceFile, createRange(end), factory.createToken(separator));
                // use the same indentation as 'after' item
                const indentation = formatting.SmartIndenter.findFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, this.formatContext.options);
                // insert element before the line break on the line that contains 'after' element
                let insertPos = skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ false);
                // find position before "\n" or "\r\n"
                while (insertPos !== end && isLineBreak(sourceFile.text.charCodeAt(insertPos - 1))) {
                    insertPos--;
                }
                this.replaceRange(sourceFile, createRange(insertPos), newNode, { indentation, prefix: this.newLineCharacter });
            }
            else {
                this.replaceRange(sourceFile, createRange(end), newNode, { prefix: `${tokenToString(separator)} ` });
            }
        }
    }

    public parenthesizeExpression(sourceFile: SourceFile, expression: Expression) {
        this.replaceRange(sourceFile, rangeOfNode(expression), factory.createParenthesizedExpression(expression));
    }

    private finishClassesWithNodesInsertedAtStart(): void {
        this.classesWithNodesInsertedAtStart.forEach(({ node, sourceFile }) => {
            const [openBraceEnd, closeBraceEnd] = getClassOrObjectBraceEnds(node, sourceFile);
            if (openBraceEnd !== undefined && closeBraceEnd !== undefined) {
                const isEmpty = getMembersOrProperties(node).length === 0;
                const isSingleLine = positionsAreOnSameLine(openBraceEnd, closeBraceEnd, sourceFile);
                if (isEmpty && isSingleLine && openBraceEnd !== closeBraceEnd - 1) {
                    // For `class C { }` remove the whitespace inside the braces.
                    this.deleteRange(sourceFile, createRange(openBraceEnd, closeBraceEnd - 1));
                }
                if (isSingleLine) {
                    this.insertText(sourceFile, closeBraceEnd - 1, this.newLineCharacter);
                }
            }
        });
    }

    private finishDeleteDeclarations(): void {
        const deletedNodesInLists = new Set<Node>(); // Stores nodes in lists that we already deleted. Used to avoid deleting `, ` twice in `a, b`.
        for (const { sourceFile, node } of this.deletedNodes) {
            if (!this.deletedNodes.some(d => d.sourceFile === sourceFile && rangeContainsRangeExclusive(d.node, node))) {
                if (isArray(node)) {
                    this.deleteRange(sourceFile, rangeOfTypeParameters(sourceFile, node));
                }
                else {
                    deleteDeclaration.deleteDeclaration(this, deletedNodesInLists, sourceFile, node);
                }
            }
        }

        deletedNodesInLists.forEach(node => {
            const sourceFile = node.getSourceFile();
            const list = formatting.SmartIndenter.getContainingList(node, sourceFile)!;
            if (node !== last(list)) return;

            const lastNonDeletedIndex = findLastIndex(list, n => !deletedNodesInLists.has(n), list.length - 2);
            if (lastNonDeletedIndex !== -1) {
                this.deleteRange(sourceFile, { pos: list[lastNonDeletedIndex].end, end: startPositionToDeleteNodeInList(sourceFile, list[lastNonDeletedIndex + 1]) });
            }
        });
    }

    /**
     * Note: after calling this, the TextChanges object must be discarded!
     * @param validate only for tests
     *    The reason we must validate as part of this method is that `getNonFormattedText` changes the node's positions,
     *    so we can only call this once and can't get the non-formatted text separately.
     */
    public getChanges(validate?: ValidateNonFormattedText): FileTextChanges[] {
        this.finishDeleteDeclarations();
        this.finishClassesWithNodesInsertedAtStart();
        const changes = changesToText.getTextChangesFromChanges(this.changes, this.newLineCharacter, this.formatContext, validate);
        if (this.newFileChanges) {
            this.newFileChanges.forEach((insertions, fileName) => {
                changes.push(changesToText.newFileChanges(fileName, insertions, this.newLineCharacter, this.formatContext));
            });
        }
        return changes;
    }

    public createNewFile(oldFile: SourceFile | undefined, fileName: string, statements: readonly (Statement | SyntaxKind.NewLineTrivia)[]): void {
        this.insertStatementsInNewFile(fileName, statements, oldFile);
    }
}

function updateJSDocHost(parent: HasJSDoc): HasJSDoc {
    if (parent.kind !== SyntaxKind.ArrowFunction) {
        return parent;
    }
    const jsDocNode = parent.parent.kind === SyntaxKind.PropertyDeclaration ?
        parent.parent as HasJSDoc :
        parent.parent.parent as HasJSDoc;
    jsDocNode.jsDoc = parent.jsDoc;
    return jsDocNode;
}

function tryMergeJsdocTags(oldTag: JSDocTag, newTag: JSDocTag): JSDocTag | undefined {
    if (oldTag.kind !== newTag.kind) {
        return undefined;
    }
    switch (oldTag.kind) {
        case SyntaxKind.JSDocParameterTag: {
            const oldParam = oldTag as JSDocParameterTag;
            const newParam = newTag as JSDocParameterTag;
            return isIdentifier(oldParam.name) && isIdentifier(newParam.name) && oldParam.name.escapedText === newParam.name.escapedText
                ? factory.createJSDocParameterTag(/*tagName*/ undefined, newParam.name, /*isBracketed*/ false, newParam.typeExpression, newParam.isNameFirst, oldParam.comment)
                : undefined;
        }
        case SyntaxKind.JSDocReturnTag:
            return factory.createJSDocReturnTag(/*tagName*/ undefined, (newTag as JSDocReturnTag).typeExpression, oldTag.comment);
        case SyntaxKind.JSDocTypeTag:
            return factory.createJSDocTypeTag(/*tagName*/ undefined, (newTag as JSDocTypeTag).typeExpression, oldTag.comment);
    }
}

// find first non-whitespace position in the leading trivia of the node
function startPositionToDeleteNodeInList(sourceFile: SourceFile, node: Node): number {
    return skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, node, { leadingTriviaOption: LeadingTriviaOption.IncludeAll }), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
}

function endPositionToDeleteNodeInList(sourceFile: SourceFile, node: Node, prevNode: Node | undefined, nextNode: Node): number {
    const end = startPositionToDeleteNodeInList(sourceFile, nextNode);
    if (prevNode === undefined || positionsAreOnSameLine(getAdjustedEndPosition(sourceFile, node, {}), end, sourceFile)) {
        return end;
    }
    const token = findPrecedingToken(nextNode.getStart(sourceFile), sourceFile);
    if (isSeparator(node, token)) {
        const prevToken = findPrecedingToken(node.getStart(sourceFile), sourceFile);
        if (isSeparator(prevNode, prevToken)) {
            const pos = skipTrivia(sourceFile.text, token.getEnd(), /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
            if (positionsAreOnSameLine(prevToken.getStart(sourceFile), token.getStart(sourceFile), sourceFile)) {
                return isLineBreak(sourceFile.text.charCodeAt(pos - 1)) ? pos - 1 : pos;
            }
            if (isLineBreak(sourceFile.text.charCodeAt(pos))) {
                return pos;
            }
        }
    }
    return end;
}

function getClassOrObjectBraceEnds(cls: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression, sourceFile: SourceFile): [number | undefined, number | undefined] {
    const open = findChildOfKind(cls, SyntaxKind.OpenBraceToken, sourceFile);
    const close = findChildOfKind(cls, SyntaxKind.CloseBraceToken, sourceFile);
    return [open?.end, close?.end];
}
function getMembersOrProperties(node: ClassLikeDeclaration | InterfaceDeclaration | ObjectLiteralExpression | TypeLiteralNode | EnumDeclaration): NodeArray<Node> {
    return isObjectLiteralExpression(node) ? node.properties : node.members;
}

/** @internal */
export type ValidateNonFormattedText = (node: Node, text: string) => void;

namespace changesToText {
    export function getTextChangesFromChanges(changes: readonly Change[], newLineCharacter: string, formatContext: formatting.FormatContext, validate: ValidateNonFormattedText | undefined): FileTextChanges[] {
        return mapDefined(group(changes, c => c.sourceFile.path), changesInFile => {
            const sourceFile = changesInFile[0].sourceFile;
            // order changes by start position
            // If the start position is the same, put the shorter range first, since an empty range (x, x) may precede (x, y) but not vice-versa.
            const normalized = toSorted(changesInFile, (a, b) => (a.range.pos - b.range.pos) || (a.range.end - b.range.end));
            // verify that change intervals do not overlap, except possibly at end points.
            for (let i = 0; i < normalized.length - 1; i++) {
                Debug.assert(normalized[i].range.end <= normalized[i + 1].range.pos, "Changes overlap", () => `${JSON.stringify(normalized[i].range)} and ${JSON.stringify(normalized[i + 1].range)}`);
            }

            const textChanges = mapDefined(normalized, c => {
                const span = createTextSpanFromRange(c.range);
                const targetSourceFile = c.kind === ChangeKind.ReplaceWithSingleNode ? getSourceFileOfNode(getOriginalNode(c.node)) ?? c.sourceFile :
                    c.kind === ChangeKind.ReplaceWithMultipleNodes ? getSourceFileOfNode(getOriginalNode(c.nodes[0])) ?? c.sourceFile :
                    c.sourceFile;
                const newText = computeNewText(c, targetSourceFile, sourceFile, newLineCharacter, formatContext, validate);
                // Filter out redundant changes.
                if (span.length === newText.length && stringContainsAt(targetSourceFile.text, newText, span.start)) {
                    return undefined;
                }

                return createTextChange(span, newText);
            });

            return textChanges.length > 0 ? { fileName: sourceFile.fileName, textChanges } : undefined;
        });
    }

    export function newFileChanges(fileName: string, insertions: readonly NewFileInsertion[], newLineCharacter: string, formatContext: formatting.FormatContext): FileTextChanges {
        const text = newFileChangesWorker(getScriptKindFromFileName(fileName), insertions, newLineCharacter, formatContext);
        return { fileName, textChanges: [createTextChange(createTextSpan(0, 0), text)], isNewFile: true };
    }

    export function newFileChangesWorker(scriptKind: ScriptKind, insertions: readonly NewFileInsertion[], newLineCharacter: string, formatContext: formatting.FormatContext): string {
        // TODO: this emits the file, parses it back, then formats it that -- may be a less roundabout way to do this
        const nonFormattedText = flatMap(insertions, insertion => insertion.statements.map(s => s === SyntaxKind.NewLineTrivia ? "" : getNonformattedText(s, insertion.oldFile, newLineCharacter).text)).join(newLineCharacter);
        const sourceFile = createSourceFile("any file name", nonFormattedText, { languageVersion: ScriptTarget.ESNext, jsDocParsingMode: JSDocParsingMode.ParseNone }, /*setParentNodes*/ true, scriptKind);
        const changes = formatting.formatDocument(sourceFile, formatContext);
        return applyChanges(nonFormattedText, changes) + newLineCharacter;
    }

    function computeNewText(change: Change, targetSourceFile: SourceFile, sourceFile: SourceFile, newLineCharacter: string, formatContext: formatting.FormatContext, validate: ValidateNonFormattedText | undefined): string {
        if (change.kind === ChangeKind.Remove) {
            return "";
        }
        if (change.kind === ChangeKind.Text) {
            return change.text;
        }

        const { options = {}, range: { pos } } = change;
        const format = (n: Node) => getFormattedTextOfNode(n, targetSourceFile, sourceFile, pos, options, newLineCharacter, formatContext, validate);
        const text = change.kind === ChangeKind.ReplaceWithMultipleNodes
            ? change.nodes.map(n => removeSuffix(format(n), newLineCharacter)).join(change.options?.joiner || newLineCharacter)
            : format(change.node);
        // strip initial indentation (spaces or tabs) if text will be inserted in the middle of the line
        const noIndent = (options.indentation !== undefined || getLineStartPositionForPosition(pos, targetSourceFile) === pos) ? text : text.replace(/^\s+/, "");
        return (options.prefix || "") + noIndent
            + ((!options.suffix || endsWith(noIndent, options.suffix))
                ? "" : options.suffix);
    }

    /** Note: this may mutate `nodeIn`. */
    function getFormattedTextOfNode(nodeIn: Node, targetSourceFile: SourceFile, sourceFile: SourceFile, pos: number, { indentation, prefix, delta }: InsertNodeOptions, newLineCharacter: string, formatContext: formatting.FormatContext, validate: ValidateNonFormattedText | undefined): string {
        const { node, text } = getNonformattedText(nodeIn, targetSourceFile, newLineCharacter);
        if (validate) validate(node, text);
        const formatOptions = getFormatCodeSettingsForWriting(formatContext, targetSourceFile);
        const initialIndentation = indentation !== undefined
            ? indentation
            : formatting.SmartIndenter.getIndentation(pos, sourceFile, formatOptions, prefix === newLineCharacter || getLineStartPositionForPosition(pos, targetSourceFile) === pos);
        if (delta === undefined) {
            delta = formatting.SmartIndenter.shouldIndentChildNode(formatOptions, nodeIn) ? (formatOptions.indentSize || 0) : 0;
        }

        const file: SourceFileLike = {
            text,
            getLineAndCharacterOfPosition(pos) {
                return getLineAndCharacterOfPosition(this, pos);
            },
        };
        const changes = formatting.formatNodeGivenIndentation(node, file, targetSourceFile.languageVariant, initialIndentation, delta, { ...formatContext, options: formatOptions });
        return applyChanges(text, changes);
    }

    /** Note: output node may be mutated input node. */
    export function getNonformattedText(node: Node, sourceFile: SourceFile | undefined, newLineCharacter: string): { text: string; node: Node; } {
        const writer = createWriter(newLineCharacter);
        const newLine = getNewLineKind(newLineCharacter);
        createPrinter({
            newLine,
            neverAsciiEscape: true,
            preserveSourceNewlines: true,
            terminateUnterminatedLiterals: true,
        }, writer).writeNode(EmitHint.Unspecified, node, sourceFile, writer);
        return { text: writer.getText(), node: assignPositionsToNode(node) };
    }
}

/** @internal */
export function applyChanges(text: string, changes: readonly TextChange[]): string {
    for (let i = changes.length - 1; i >= 0; i--) {
        const { span, newText } = changes[i];
        text = `${text.substring(0, span.start)}${newText}${text.substring(textSpanEnd(span))}`;
    }
    return text;
}

function isTrivia(s: string) {
    return skipTrivia(s, 0) === s.length;
}

// A transformation context that won't perform parenthesization, as some parenthesization rules
// are more aggressive than is strictly necessary.
const textChangesTransformationContext: TransformationContext = {
    ...nullTransformationContext,
    factory: createNodeFactory(
        nullTransformationContext.factory.flags | NodeFactoryFlags.NoParenthesizerRules,
        nullTransformationContext.factory.baseFactory,
    ),
};

/** @internal */
export function assignPositionsToNode(node: Node): Node {
    const visited = visitEachChild(node, assignPositionsToNode, textChangesTransformationContext, assignPositionsToNodeArray, assignPositionsToNode);
    // create proxy node for non synthesized nodes
    const newNode = nodeIsSynthesized(visited) ? visited : Object.create(visited) as Node;
    setTextRangePosEnd(newNode, getPos(node), getEnd(node));
    return newNode;
}

function assignPositionsToNodeArray(
    nodes: NodeArray<Node> | undefined,
    visitor: Visitor,
    test?: (node: Node) => boolean,
    start?: number,
    count?: number,
): NodeArray<Node> | undefined {
    const visited = visitNodes(nodes, visitor, test, start, count);
    if (!visited) {
        return visited;
    }
    Debug.assert(nodes);
    // clone nodearray if necessary
    const nodeArray = visited === nodes ? factory.createNodeArray(visited.slice(0)) : visited;
    setTextRangePosEnd(nodeArray, getPos(nodes), getEnd(nodes));
    return nodeArray;
}

/** @internal */
export interface TextChangesWriter extends EmitTextWriter, PrintHandlers {}

/** @internal */
export function createWriter(newLine: string): TextChangesWriter {
    let lastNonTriviaPosition = 0;

    const writer = createTextWriter(newLine);
    const onBeforeEmitNode: PrintHandlers["onBeforeEmitNode"] = node => {
        if (node) {
            setPos(node, lastNonTriviaPosition);
        }
    };
    const onAfterEmitNode: PrintHandlers["onAfterEmitNode"] = node => {
        if (node) {
            setEnd(node, lastNonTriviaPosition);
        }
    };
    const onBeforeEmitNodeArray: PrintHandlers["onBeforeEmitNodeArray"] = nodes => {
        if (nodes) {
            setPos(nodes, lastNonTriviaPosition);
        }
    };
    const onAfterEmitNodeArray: PrintHandlers["onAfterEmitNodeArray"] = nodes => {
        if (nodes) {
            setEnd(nodes, lastNonTriviaPosition);
        }
    };
    const onBeforeEmitToken: PrintHandlers["onBeforeEmitToken"] = node => {
        if (node) {
            setPos(node, lastNonTriviaPosition);
        }
    };
    const onAfterEmitToken: PrintHandlers["onAfterEmitToken"] = node => {
        if (node) {
            setEnd(node, lastNonTriviaPosition);
        }
    };

    function setLastNonTriviaPosition(s: string, force: boolean) {
        if (force || !isTrivia(s)) {
            lastNonTriviaPosition = writer.getTextPos();
            let i = 0;
            while (isWhiteSpaceLike(s.charCodeAt(s.length - i - 1))) {
                i++;
            }
            // trim trailing whitespaces
            lastNonTriviaPosition -= i;
        }
    }

    function write(s: string): void {
        writer.write(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeComment(s: string): void {
        writer.writeComment(s);
    }
    function writeKeyword(s: string): void {
        writer.writeKeyword(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeOperator(s: string): void {
        writer.writeOperator(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writePunctuation(s: string): void {
        writer.writePunctuation(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeTrailingSemicolon(s: string): void {
        writer.writeTrailingSemicolon(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeParameter(s: string): void {
        writer.writeParameter(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeProperty(s: string): void {
        writer.writeProperty(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeSpace(s: string): void {
        writer.writeSpace(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeStringLiteral(s: string): void {
        writer.writeStringLiteral(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeSymbol(s: string, sym: Symbol): void {
        writer.writeSymbol(s, sym);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeLine(force?: boolean): void {
        writer.writeLine(force);
    }
    function increaseIndent(): void {
        writer.increaseIndent();
    }
    function decreaseIndent(): void {
        writer.decreaseIndent();
    }
    function getText(): string {
        return writer.getText();
    }
    function rawWrite(s: string): void {
        writer.rawWrite(s);
        setLastNonTriviaPosition(s, /*force*/ false);
    }
    function writeLiteral(s: string): void {
        writer.writeLiteral(s);
        setLastNonTriviaPosition(s, /*force*/ true);
    }
    function getTextPos(): number {
        return writer.getTextPos();
    }
    function getLine(): number {
        return writer.getLine();
    }
    function getColumn(): number {
        return writer.getColumn();
    }
    function getIndent(): number {
        return writer.getIndent();
    }
    function isAtStartOfLine(): boolean {
        return writer.isAtStartOfLine();
    }
    function clear(): void {
        writer.clear();
        lastNonTriviaPosition = 0;
    }

    return {
        onBeforeEmitNode,
        onAfterEmitNode,
        onBeforeEmitNodeArray,
        onAfterEmitNodeArray,
        onBeforeEmitToken,
        onAfterEmitToken,
        write,
        writeComment,
        writeKeyword,
        writeOperator,
        writePunctuation,
        writeTrailingSemicolon,
        writeParameter,
        writeProperty,
        writeSpace,
        writeStringLiteral,
        writeSymbol,
        writeLine,
        increaseIndent,
        decreaseIndent,
        getText,
        rawWrite,
        writeLiteral,
        getTextPos,
        getLine,
        getColumn,
        getIndent,
        isAtStartOfLine,
        hasTrailingComment: () => writer.hasTrailingComment(),
        hasTrailingWhitespace: () => writer.hasTrailingWhitespace(),
        clear,
    };
}

function getInsertionPositionAtSourceFileTop(sourceFile: SourceFile): number {
    let lastPrologue: PrologueDirective | undefined;
    for (const node of sourceFile.statements) {
        if (isPrologueDirective(node)) {
            lastPrologue = node;
        }
        else {
            break;
        }
    }

    let position = 0;
    const text = sourceFile.text;
    if (lastPrologue) {
        position = lastPrologue.end;
        advancePastLineBreak();
        return position;
    }

    const shebang = getShebang(text);
    if (shebang !== undefined) {
        position = shebang.length;
        advancePastLineBreak();
    }

    const ranges = getLeadingCommentRanges(text, position);
    if (!ranges) return position;

    // Find the first attached comment to the first node and add before it
    let lastComment: { range: CommentRange; pinnedOrTripleSlash: boolean; } | undefined;
    let firstNodeLine: number | undefined;
    for (const range of ranges) {
        if (range.kind === SyntaxKind.MultiLineCommentTrivia) {
            if (isPinnedComment(text, range.pos)) {
                lastComment = { range, pinnedOrTripleSlash: true };
                continue;
            }
        }
        else if (isRecognizedTripleSlashComment(text, range.pos, range.end)) {
            lastComment = { range, pinnedOrTripleSlash: true };
            continue;
        }

        if (lastComment) {
            // Always insert after pinned or triple slash comments
            if (lastComment.pinnedOrTripleSlash) break;

            // There was a blank line between the last comment and this comment.
            // This comment is not part of the copyright comments
            const commentLine = sourceFile.getLineAndCharacterOfPosition(range.pos).line;
            const lastCommentEndLine = sourceFile.getLineAndCharacterOfPosition(lastComment.range.end).line;
            if (commentLine >= lastCommentEndLine + 2) break;
        }

        if (sourceFile.statements.length) {
            if (firstNodeLine === undefined) firstNodeLine = sourceFile.getLineAndCharacterOfPosition(sourceFile.statements[0].getStart()).line;
            const commentEndLine = sourceFile.getLineAndCharacterOfPosition(range.end).line;
            if (firstNodeLine < commentEndLine + 2) break;
        }
        lastComment = { range, pinnedOrTripleSlash: false };
    }

    if (lastComment) {
        position = lastComment.range.end;
        advancePastLineBreak();
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

/** @internal */
export function isValidLocationToAddComment(sourceFile: SourceFile, position: number) {
    return !isInComment(sourceFile, position) && !isInString(sourceFile, position) && !isInTemplateString(sourceFile, position) && !isInJSXText(sourceFile, position);
}

function needSemicolonBetween(a: Node, b: Node): boolean {
    return (isPropertySignature(a) || isPropertyDeclaration(a)) && isClassOrTypeElement(b) && b.name!.kind === SyntaxKind.ComputedPropertyName
        || isStatementButNotDeclaration(a) && isStatementButNotDeclaration(b); // TODO: only if b would start with a `(` or `[`
}

namespace deleteDeclaration {
    export function deleteDeclaration(changes: ChangeTracker, deletedNodesInLists: Set<Node>, sourceFile: SourceFile, node: Node): void {
        switch (node.kind) {
            case SyntaxKind.Parameter: {
                const oldFunction = node.parent;
                if (
                    isArrowFunction(oldFunction) &&
                    oldFunction.parameters.length === 1 &&
                    !findChildOfKind(oldFunction, SyntaxKind.OpenParenToken, sourceFile)
                ) {
                    // Lambdas with exactly one parameter are special because, after removal, there
                    // must be an empty parameter list (i.e. `()`) and this won't necessarily be the
                    // case if the parameter is simply removed (e.g. in `x => 1`).
                    changes.replaceNodeWithText(sourceFile, node, "()");
                }
                else {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                break;
            }

            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                const isFirstImport = sourceFile.imports.length && node === first(sourceFile.imports).parent || node === find(sourceFile.statements, isAnyImportSyntax);
                // For first import, leave header comment in place, otherwise only delete JSDoc comments
                deleteNode(changes, sourceFile, node, {
                    leadingTriviaOption: isFirstImport ? LeadingTriviaOption.Exclude : hasJSDocNodes(node) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine,
                });
                break;

            case SyntaxKind.BindingElement:
                const pattern = (node as BindingElement).parent;
                const preserveComma = pattern.kind === SyntaxKind.ArrayBindingPattern && node !== last(pattern.elements);
                if (preserveComma) {
                    deleteNode(changes, sourceFile, node);
                }
                else {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                break;

            case SyntaxKind.VariableDeclaration:
                deleteVariableDeclaration(changes, deletedNodesInLists, sourceFile, node as VariableDeclaration);
                break;

            case SyntaxKind.TypeParameter:
                deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                break;

            case SyntaxKind.ImportSpecifier:
                const namedImports = (node as ImportSpecifier).parent;
                if (namedImports.elements.length === 1) {
                    deleteImportBinding(changes, sourceFile, namedImports);
                }
                else {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                break;

            case SyntaxKind.NamespaceImport:
                deleteImportBinding(changes, sourceFile, node as NamespaceImport);
                break;

            case SyntaxKind.SemicolonToken:
                deleteNode(changes, sourceFile, node, { trailingTriviaOption: TrailingTriviaOption.Exclude });
                break;

            case SyntaxKind.FunctionKeyword:
                deleteNode(changes, sourceFile, node, { leadingTriviaOption: LeadingTriviaOption.Exclude });
                break;

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
                deleteNode(changes, sourceFile, node, { leadingTriviaOption: hasJSDocNodes(node) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine });
                break;

            default:
                if (!node.parent) {
                    // a misbehaving client can reach here with the SourceFile node
                    deleteNode(changes, sourceFile, node);
                }
                else if (isImportClause(node.parent) && node.parent.name === node) {
                    deleteDefaultImport(changes, sourceFile, node.parent);
                }
                else if (isCallExpression(node.parent) && contains(node.parent.arguments, node)) {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                else {
                    deleteNode(changes, sourceFile, node);
                }
        }
    }

    function deleteDefaultImport(changes: ChangeTracker, sourceFile: SourceFile, importClause: ImportClause): void {
        if (!importClause.namedBindings) {
            // Delete the whole import
            deleteNode(changes, sourceFile, importClause.parent);
        }
        else {
            // import |d,| * as ns from './file'
            const start = importClause.name!.getStart(sourceFile);
            const nextToken = getTokenAtPosition(sourceFile, importClause.name!.end);
            if (nextToken && nextToken.kind === SyntaxKind.CommaToken) {
                // shift first non-whitespace position after comma to the start position of the node
                const end = skipTrivia(sourceFile.text, nextToken.end, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
                changes.deleteRange(sourceFile, { pos: start, end });
            }
            else {
                deleteNode(changes, sourceFile, importClause.name!);
            }
        }
    }

    function deleteImportBinding(changes: ChangeTracker, sourceFile: SourceFile, node: NamedImportBindings): void {
        if (node.parent.name) {
            // Delete named imports while preserving the default import
            // import d|, * as ns| from './file'
            // import d|, { a }| from './file'
            const previousToken = Debug.checkDefined(getTokenAtPosition(sourceFile, node.pos - 1));
            changes.deleteRange(sourceFile, { pos: previousToken.getStart(sourceFile), end: node.end });
        }
        else {
            // Delete the entire import declaration
            // |import * as ns from './file'|
            // |import { a } from './file'|
            const importDecl = getAncestor(node, SyntaxKind.ImportDeclaration)!;
            deleteNode(changes, sourceFile, importDecl);
        }
    }

    function deleteVariableDeclaration(changes: ChangeTracker, deletedNodesInLists: Set<Node>, sourceFile: SourceFile, node: VariableDeclaration): void {
        const { parent } = node;

        if (parent.kind === SyntaxKind.CatchClause) {
            // TODO: There's currently no unused diagnostic for this, could be a suggestion
            changes.deleteNodeRange(sourceFile, findChildOfKind(parent, SyntaxKind.OpenParenToken, sourceFile)!, findChildOfKind(parent, SyntaxKind.CloseParenToken, sourceFile)!);
            return;
        }

        if (parent.declarations.length !== 1) {
            deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
            return;
        }

        const gp = parent.parent;
        switch (gp.kind) {
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.ForInStatement:
                changes.replaceNode(sourceFile, node, factory.createObjectLiteralExpression());
                break;

            case SyntaxKind.ForStatement:
                deleteNode(changes, sourceFile, parent);
                break;

            case SyntaxKind.VariableStatement:
                deleteNode(changes, sourceFile, gp, { leadingTriviaOption: hasJSDocNodes(gp) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine });
                break;

            default:
                Debug.assertNever(gp);
        }
    }
}

// Exported for tests only! (TODO: improve tests to not need this)
/**
 * Warning: This deletes comments too. See `copyComments` in `convertFunctionToEs6Class`.
 *
 * @internal
 */
export function deleteNode(changes: ChangeTracker, sourceFile: SourceFile, node: Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
    const startPosition = getAdjustedStartPosition(sourceFile, node, options);
    const endPosition = getAdjustedEndPosition(sourceFile, node, options);
    changes.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
}

function deleteNodeInList(changes: ChangeTracker, deletedNodesInLists: Set<Node>, sourceFile: SourceFile, node: Node): void {
    const containingList = Debug.checkDefined(formatting.SmartIndenter.getContainingList(node, sourceFile));
    const index = indexOfNode(containingList, node);
    Debug.assert(index !== -1);
    if (containingList.length === 1) {
        deleteNode(changes, sourceFile, node);
        return;
    }

    // Note: We will only delete a comma *after* a node. This will leave a trailing comma if we delete the last node.
    // That's handled in the end by `finishTrailingCommaAfterDeletingNodesInList`.
    Debug.assert(!deletedNodesInLists.has(node), "Deleting a node twice");
    deletedNodesInLists.add(node);

    changes.deleteRange(sourceFile, {
        pos: startPositionToDeleteNodeInList(sourceFile, node),
        end: index === containingList.length - 1 ? getAdjustedEndPosition(sourceFile, node, {}) : endPositionToDeleteNodeInList(sourceFile, node, containingList[index - 1], containingList[index + 1]),
    });
}
