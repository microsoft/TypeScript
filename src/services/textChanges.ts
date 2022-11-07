import * as ts from "./_namespaces/ts";

/**
 * Currently for simplicity we store recovered positions on the node itself.
 * It can be changed to side-table later if we decide that current design is too invasive.
 */
function getPos(n: ts.TextRange): number {
    const result = (n as any).__pos;
    ts.Debug.assert(typeof result === "number");
    return result;
}

function setPos(n: ts.TextRange, pos: number): void {
    ts.Debug.assert(typeof pos === "number");
    (n as any).__pos = pos;
}

function getEnd(n: ts.TextRange): number {
    const result = (n as any).__end;
    ts.Debug.assert(typeof result === "number");
    return result;
}

function setEnd(n: ts.TextRange, end: number): void {
    ts.Debug.assert(typeof end === "number");
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
    return ts.skipTrivia(text, start, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
}

function hasCommentsBeforeLineBreak(text: string, start: number) {
    let i = start;
    while (i < text.length) {
        const ch = text.charCodeAt(i);
        if (ts.isWhiteSpaceSingleLine(ch)) {
            i++;
            continue;
        }
        return ch === ts.CharacterCodes.slash;
    }
    return false;
}

/** @internal */
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
    readonly sourceFile: ts.SourceFile;
    readonly range: ts.TextRange;
}

/** @internal */
export interface ChangeNodeOptions extends ConfigurableStartEnd, InsertNodeOptions {}
interface ReplaceWithSingleNode extends BaseChange {
    readonly kind: ChangeKind.ReplaceWithSingleNode;
    readonly node: ts.Node;
    readonly options?: InsertNodeOptions;
}

interface RemoveNode extends BaseChange {
    readonly kind: ChangeKind.Remove;
    readonly node?: never;
    readonly options?: never;
}

interface ReplaceWithMultipleNodes extends BaseChange {
    readonly kind: ChangeKind.ReplaceWithMultipleNodes;
    readonly nodes: readonly ts.Node[];
    readonly options?: ReplaceWithMultipleNodesOptions;
}

interface ChangeText extends BaseChange {
    readonly kind: ChangeKind.Text;
    readonly text: string;
}

function getAdjustedRange(sourceFile: ts.SourceFile, startNode: ts.Node, endNode: ts.Node, options: ConfigurableStartEnd): ts.TextRange {
    return { pos: getAdjustedStartPosition(sourceFile, startNode, options), end: getAdjustedEndPosition(sourceFile, endNode, options) };
}

function getAdjustedStartPosition(sourceFile: ts.SourceFile, node: ts.Node, options: ConfigurableStartEnd, hasTrailingComment = false) {
    const { leadingTriviaOption } = options;
    if (leadingTriviaOption === LeadingTriviaOption.Exclude) {
        return node.getStart(sourceFile);
    }
    if (leadingTriviaOption === LeadingTriviaOption.StartLine) {
        const startPos = node.getStart(sourceFile);
        const pos = ts.getLineStartPositionForPosition(startPos, sourceFile);
        return ts.rangeContainsPosition(node, pos) ? pos : startPos;
    }
    if (leadingTriviaOption === LeadingTriviaOption.JSDoc) {
        const JSDocComments = ts.getJSDocCommentRanges(node, sourceFile.text);
        if (JSDocComments?.length) {
            return ts.getLineStartPositionForPosition(JSDocComments[0].pos, sourceFile);
        }
    }
    const fullStart = node.getFullStart();
    const start = node.getStart(sourceFile);
    if (fullStart === start) {
        return start;
    }
    const fullStartLine = ts.getLineStartPositionForPosition(fullStart, sourceFile);
    const startLine = ts.getLineStartPositionForPosition(start, sourceFile);
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
        const comment = ts.getLeadingCommentRanges(sourceFile.text, fullStart)?.[0] || ts.getTrailingCommentRanges(sourceFile.text, fullStart)?.[0];
        if (comment) {
            return ts.skipTrivia(sourceFile.text, comment.end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
        }
    }

    // get start position of the line following the line that contains fullstart position
    // (but only if the fullstart isn't the very beginning of the file)
    const nextLineStart = fullStart > 0 ? 1 : 0;
    let adjustedStartPosition = ts.getStartPositionOfLine(ts.getLineOfLocalPosition(sourceFile, fullStartLine) + nextLineStart, sourceFile);
    // skip whitespaces/newlines
    adjustedStartPosition = skipWhitespacesAndLineBreaks(sourceFile.text, adjustedStartPosition);
    return ts.getStartPositionOfLine(ts.getLineOfLocalPosition(sourceFile, adjustedStartPosition), sourceFile);
}

/** Return the end position of a multiline comment of it is on another line; otherwise returns `undefined`; */
function getEndPositionOfMultilineTrailingComment(sourceFile: ts.SourceFile, node: ts.Node, options: ConfigurableEnd): number | undefined {
    const { end } = node;
    const { trailingTriviaOption } = options;
    if (trailingTriviaOption === TrailingTriviaOption.Include) {
        // If the trailing comment is a multiline comment that extends to the next lines,
        // return the end of the comment and track it for the next nodes to adjust.
        const comments = ts.getTrailingCommentRanges(sourceFile.text, end);
        if (comments) {
            const nodeEndLine = ts.getLineOfLocalPosition(sourceFile, node.end);
            for (const comment of comments) {
                // Single line can break the loop as trivia will only be this line.
                // Comments on subsequest lines are also ignored.
                if (comment.kind === ts.SyntaxKind.SingleLineCommentTrivia || ts.getLineOfLocalPosition(sourceFile, comment.pos) > nodeEndLine) {
                    break;
                }

                // Get the end line of the comment and compare against the end line of the node.
                // If the comment end line position and the multiline comment extends to multiple lines,
                // then is safe to return the end position.
                const commentEndLine = ts.getLineOfLocalPosition(sourceFile, comment.end);
                if (commentEndLine > nodeEndLine) {
                    return ts.skipTrivia(sourceFile.text, comment.end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
                }
            }
        }
    }

    return undefined;
}

function getAdjustedEndPosition(sourceFile: ts.SourceFile, node: ts.Node, options: ConfigurableEnd): number {
    const { end } = node;
    const { trailingTriviaOption } = options;
    if (trailingTriviaOption === TrailingTriviaOption.Exclude) {
        return end;
    }
    if (trailingTriviaOption === TrailingTriviaOption.ExcludeWhitespace) {
        const comments = ts.concatenate(ts.getTrailingCommentRanges(sourceFile.text, end), ts.getLeadingCommentRanges(sourceFile.text, end));
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

    const newEnd = ts.skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true);

    return newEnd !== end && (trailingTriviaOption === TrailingTriviaOption.Include || ts.isLineBreak(sourceFile.text.charCodeAt(newEnd - 1)))
        ? newEnd
        : end;
}

/**
 * Checks if 'candidate' argument is a legal separator in the list that contains 'node' as an element
 */
function isSeparator(node: ts.Node, candidate: ts.Node | undefined): candidate is ts.Token<ts.SyntaxKind.CommaToken | ts.SyntaxKind.SemicolonToken> {
    return !!candidate && !!node.parent && (candidate.kind === ts.SyntaxKind.CommaToken || (candidate.kind === ts.SyntaxKind.SemicolonToken && node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression));
}

/** @internal */
export interface TextChangesContext {
    host: ts.LanguageServiceHost;
    formatContext: ts.formatting.FormatContext;
    preferences: ts.UserPreferences;
}

/** @internal */
export type TypeAnnotatable = ts.SignatureDeclaration | ts.VariableDeclaration | ts.ParameterDeclaration | ts.PropertyDeclaration | ts.PropertySignature;

/** @internal */
export type ThisTypeAnnotatable = ts.FunctionDeclaration | ts.FunctionExpression;

/** @internal */
export function isThisTypeAnnotatable(containingFunction: ts.SignatureDeclaration): containingFunction is ThisTypeAnnotatable {
    return ts.isFunctionExpression(containingFunction) || ts.isFunctionDeclaration(containingFunction);
}

/** @internal */
export class ChangeTracker {
    private readonly changes: Change[] = [];
    private readonly newFiles: { readonly oldFile: ts.SourceFile | undefined, readonly fileName: string, readonly statements: readonly (ts.Statement | ts.SyntaxKind.NewLineTrivia)[] }[] = [];
    private readonly classesWithNodesInsertedAtStart = new ts.Map<number, { readonly node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression, readonly sourceFile: ts.SourceFile }>(); // Set<ClassDeclaration> implemented as Map<node id, ClassDeclaration>
    private readonly deletedNodes: { readonly sourceFile: ts.SourceFile, readonly node: ts.Node | ts.NodeArray<ts.TypeParameterDeclaration> }[] = [];

    public static fromContext(context: TextChangesContext): ChangeTracker {
        return new ChangeTracker(ts.getNewLineOrDefaultFromHost(context.host, context.formatContext.options), context.formatContext);
    }

    public static with(context: TextChangesContext, cb: (tracker: ChangeTracker) => void): ts.FileTextChanges[] {
        const tracker = ChangeTracker.fromContext(context);
        cb(tracker);
        return tracker.getChanges();
    }

    /** Public for tests only. Other callers should use `ChangeTracker.with`. */
    constructor(private readonly newLineCharacter: string, private readonly formatContext: ts.formatting.FormatContext) {}

    public pushRaw(sourceFile: ts.SourceFile, change: ts.FileTextChanges) {
        ts.Debug.assertEqual(sourceFile.fileName, change.fileName);
        for (const c of change.textChanges) {
            this.changes.push({
                kind: ChangeKind.Text,
                sourceFile,
                text: c.newText,
                range: ts.createTextRangeFromSpan(c.span),
            });
        }
    }

    public deleteRange(sourceFile: ts.SourceFile, range: ts.TextRange): void {
        this.changes.push({ kind: ChangeKind.Remove, sourceFile, range });
    }

    delete(sourceFile: ts.SourceFile, node: ts.Node | ts.NodeArray<ts.TypeParameterDeclaration>): void {
        this.deletedNodes.push({ sourceFile, node });
    }

    /** Stop! Consider using `delete` instead, which has logic for deleting nodes from delimited lists. */
    public deleteNode(sourceFile: ts.SourceFile, node: ts.Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        this.deleteRange(sourceFile, getAdjustedRange(sourceFile, node, node, options));
    }

    public deleteNodes(sourceFile: ts.SourceFile, nodes: readonly ts.Node[], options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }, hasTrailingComment: boolean): void {
        // When deleting multiple nodes we need to track if the end position is including multiline trailing comments.
        for (const node of nodes) {
            const pos = getAdjustedStartPosition(sourceFile, node, options, hasTrailingComment);
            const end = getAdjustedEndPosition(sourceFile, node, options);

            this.deleteRange(sourceFile, { pos, end });

            hasTrailingComment = !!getEndPositionOfMultilineTrailingComment(sourceFile, node, options);
        }
    }

    public deleteModifier(sourceFile: ts.SourceFile, modifier: ts.Modifier): void {
        this.deleteRange(sourceFile, { pos: modifier.getStart(sourceFile), end: ts.skipTrivia(sourceFile.text, modifier.end, /*stopAfterLineBreak*/ true) });
    }

    public deleteNodeRange(sourceFile: ts.SourceFile, startNode: ts.Node, endNode: ts.Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        const startPosition = getAdjustedStartPosition(sourceFile, startNode, options);
        const endPosition = getAdjustedEndPosition(sourceFile, endNode, options);
        this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
    }

    public deleteNodeRangeExcludingEnd(sourceFile: ts.SourceFile, startNode: ts.Node, afterEndNode: ts.Node | undefined, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
        const startPosition = getAdjustedStartPosition(sourceFile, startNode, options);
        const endPosition = afterEndNode === undefined ? sourceFile.text.length : getAdjustedStartPosition(sourceFile, afterEndNode, options);
        this.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
    }

    public replaceRange(sourceFile: ts.SourceFile, range: ts.TextRange, newNode: ts.Node, options: InsertNodeOptions = {}): void {
        this.changes.push({ kind: ChangeKind.ReplaceWithSingleNode, sourceFile, range, options, node: newNode });
    }

    public replaceNode(sourceFile: ts.SourceFile, oldNode: ts.Node, newNode: ts.Node, options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRange(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, options), newNode, options);
    }

    public replaceNodeRange(sourceFile: ts.SourceFile, startNode: ts.Node, endNode: ts.Node, newNode: ts.Node, options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRange(sourceFile, getAdjustedRange(sourceFile, startNode, endNode, options), newNode, options);
    }

    private replaceRangeWithNodes(sourceFile: ts.SourceFile, range: ts.TextRange, newNodes: readonly ts.Node[], options: ReplaceWithMultipleNodesOptions & ConfigurableStartEnd = {}): void {
        this.changes.push({ kind: ChangeKind.ReplaceWithMultipleNodes, sourceFile, range, options, nodes: newNodes });
    }

    public replaceNodeWithNodes(sourceFile: ts.SourceFile, oldNode: ts.Node, newNodes: readonly ts.Node[], options: ChangeNodeOptions = useNonAdjustedPositions): void {
        this.replaceRangeWithNodes(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, options), newNodes, options);
    }

    public replaceNodeWithText(sourceFile: ts.SourceFile, oldNode: ts.Node, text: string): void {
        this.replaceRangeWithText(sourceFile, getAdjustedRange(sourceFile, oldNode, oldNode, useNonAdjustedPositions), text);
    }

    public replaceNodeRangeWithNodes(sourceFile: ts.SourceFile, startNode: ts.Node, endNode: ts.Node, newNodes: readonly ts.Node[], options: ReplaceWithMultipleNodesOptions & ConfigurableStartEnd = useNonAdjustedPositions): void {
        this.replaceRangeWithNodes(sourceFile, getAdjustedRange(sourceFile, startNode, endNode, options), newNodes, options);
    }

    public nodeHasTrailingComment(sourceFile: ts.SourceFile, oldNode: ts.Node, configurableEnd: ConfigurableEnd = useNonAdjustedPositions): boolean {
        return !!getEndPositionOfMultilineTrailingComment(sourceFile, oldNode, configurableEnd);
    }

    private nextCommaToken(sourceFile: ts.SourceFile, node: ts.Node): ts.Node | undefined {
        const next = ts.findNextToken(node, node.parent, sourceFile);
        return next && next.kind === ts.SyntaxKind.CommaToken ? next : undefined;
    }

    public replacePropertyAssignment(sourceFile: ts.SourceFile, oldNode: ts.PropertyAssignment, newNode: ts.PropertyAssignment): void {
        const suffix = this.nextCommaToken(sourceFile, oldNode) ? "" : ("," + this.newLineCharacter);
        this.replaceNode(sourceFile, oldNode, newNode, { suffix });
    }

    public insertNodeAt(sourceFile: ts.SourceFile, pos: number, newNode: ts.Node, options: InsertNodeOptions = {}): void {
        this.replaceRange(sourceFile, ts.createRange(pos), newNode, options);
    }

    private insertNodesAt(sourceFile: ts.SourceFile, pos: number, newNodes: readonly ts.Node[], options: ReplaceWithMultipleNodesOptions = {}): void {
        this.replaceRangeWithNodes(sourceFile, ts.createRange(pos), newNodes, options);
    }

    public insertNodeAtTopOfFile(sourceFile: ts.SourceFile, newNode: ts.Statement, blankLineBetween: boolean): void {
        this.insertAtTopOfFile(sourceFile, newNode, blankLineBetween);
    }

    public insertNodesAtTopOfFile(sourceFile: ts.SourceFile, newNodes: readonly ts.Statement[], blankLineBetween: boolean): void {
        this.insertAtTopOfFile(sourceFile, newNodes, blankLineBetween);
    }

    private insertAtTopOfFile(sourceFile: ts.SourceFile, insert: ts.Statement | readonly ts.Statement[], blankLineBetween: boolean): void {
        const pos = getInsertionPositionAtSourceFileTop(sourceFile);
        const options = {
            prefix: pos === 0 ? undefined : this.newLineCharacter,
            suffix: (ts.isLineBreak(sourceFile.text.charCodeAt(pos)) ? "" : this.newLineCharacter) + (blankLineBetween ? this.newLineCharacter : ""),
        };
        if (ts.isArray(insert)) {
            this.insertNodesAt(sourceFile, pos, insert, options);
        }
        else {
            this.insertNodeAt(sourceFile, pos, insert, options);
        }
    }

    public insertFirstParameter(sourceFile: ts.SourceFile, parameters: ts.NodeArray<ts.ParameterDeclaration>, newParam: ts.ParameterDeclaration): void {
        const p0 = ts.firstOrUndefined(parameters);
        if (p0) {
            this.insertNodeBefore(sourceFile, p0, newParam);
        }
        else {
            this.insertNodeAt(sourceFile, parameters.pos, newParam);
        }
    }

    public insertNodeBefore(sourceFile: ts.SourceFile, before: ts.Node, newNode: ts.Node, blankLineBetween = false, options: ConfigurableStartEnd = {}): void {
        this.insertNodeAt(sourceFile, getAdjustedStartPosition(sourceFile, before, options), newNode, this.getOptionsForInsertNodeBefore(before, newNode, blankLineBetween));
    }

    public insertModifierAt(sourceFile: ts.SourceFile, pos: number, modifier: ts.SyntaxKind, options: InsertNodeOptions = {}): void {
        this.insertNodeAt(sourceFile, pos, ts.factory.createToken(modifier), options);
    }

    public insertModifierBefore(sourceFile: ts.SourceFile, modifier: ts.SyntaxKind, before: ts.Node): void {
        return this.insertModifierAt(sourceFile, before.getStart(sourceFile), modifier, { suffix: " " });
    }

    public insertCommentBeforeLine(sourceFile: ts.SourceFile, lineNumber: number, position: number, commentText: string): void {
        const lineStartPosition = ts.getStartPositionOfLine(lineNumber, sourceFile);
        const startPosition = ts.getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);
        // First try to see if we can put the comment on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // If so, we do not want to separate the node from its comment if we can.
        // Otherwise, add an extra new line immediately before the error span.
        const insertAtLineStart = isValidLocationToAddComment(sourceFile, startPosition);
        const token = ts.getTouchingToken(sourceFile, insertAtLineStart ? startPosition : position);
        const indent = sourceFile.text.slice(lineStartPosition, startPosition);
        const text = `${insertAtLineStart ? "" : this.newLineCharacter}//${commentText}${this.newLineCharacter}${indent}`;
        this.insertText(sourceFile, token.getStart(sourceFile), text);
    }

    public insertJsdocCommentBefore(sourceFile: ts.SourceFile, node: ts.HasJSDoc, tag: ts.JSDoc): void {
        const fnStart = node.getStart(sourceFile);
        if (node.jsDoc) {
            for (const jsdoc of node.jsDoc) {
                this.deleteRange(sourceFile, {
                    pos: ts.getLineStartPositionForPosition(jsdoc.getStart(sourceFile), sourceFile),
                    end: getAdjustedEndPosition(sourceFile, jsdoc, /*options*/ {})
                });
            }
        }
        const startPosition = ts.getPrecedingNonSpaceCharacterPosition(sourceFile.text, fnStart - 1);
        const indent = sourceFile.text.slice(startPosition, fnStart);
        this.insertNodeAt(sourceFile, fnStart, tag, { suffix: this.newLineCharacter + indent });
    }

    private createJSDocText(sourceFile: ts.SourceFile, node: ts.HasJSDoc) {
        const comments = ts.flatMap(node.jsDoc, jsDoc =>
            ts.isString(jsDoc.comment) ? ts.factory.createJSDocText(jsDoc.comment) : jsDoc.comment) as ts.JSDocComment[];
        const jsDoc = ts.singleOrUndefined(node.jsDoc);
        return jsDoc && ts.positionsAreOnSameLine(jsDoc.pos, jsDoc.end, sourceFile) && ts.length(comments) === 0 ? undefined :
            ts.factory.createNodeArray(ts.intersperse(comments, ts.factory.createJSDocText("\n")));
    }

    public replaceJSDocComment(sourceFile: ts.SourceFile, node: ts.HasJSDoc, tags: readonly ts.JSDocTag[]) {
        this.insertJsdocCommentBefore(sourceFile, updateJSDocHost(node), ts.factory.createJSDocComment(this.createJSDocText(sourceFile, node), ts.factory.createNodeArray(tags)));
    }

    public addJSDocTags(sourceFile: ts.SourceFile, parent: ts.HasJSDoc, newTags: readonly ts.JSDocTag[]): void {
        const oldTags = ts.flatMapToMutable(parent.jsDoc, j => j.tags);
        const unmergedNewTags = newTags.filter(newTag => !oldTags.some((tag, i) => {
            const merged = tryMergeJsdocTags(tag, newTag);
            if (merged) oldTags[i] = merged;
            return !!merged;
        }));
        this.replaceJSDocComment(sourceFile, parent, [...oldTags, ...unmergedNewTags]);
    }

    public filterJSDocTags(sourceFile: ts.SourceFile, parent: ts.HasJSDoc, predicate: (tag: ts.JSDocTag) => boolean): void {
        this.replaceJSDocComment(sourceFile, parent, ts.filter(ts.flatMapToMutable(parent.jsDoc, j => j.tags), predicate));
    }

    public replaceRangeWithText(sourceFile: ts.SourceFile, range: ts.TextRange, text: string): void {
        this.changes.push({ kind: ChangeKind.Text, sourceFile, range, text });
    }

    public insertText(sourceFile: ts.SourceFile, pos: number, text: string): void {
        this.replaceRangeWithText(sourceFile, ts.createRange(pos), text);
    }

    /** Prefer this over replacing a node with another that has a type annotation, as it avoids reformatting the other parts of the node. */
    public tryInsertTypeAnnotation(sourceFile: ts.SourceFile, node: TypeAnnotatable, type: ts.TypeNode): boolean {
        let endNode: ts.Node | undefined;
        if (ts.isFunctionLike(node)) {
            endNode = ts.findChildOfKind(node, ts.SyntaxKind.CloseParenToken, sourceFile);
            if (!endNode) {
                if (!ts.isArrowFunction(node)) return false; // Function missing parentheses, give up
                // If no `)`, is an arrow function `x => x`, so use the end of the first parameter
                endNode = ts.first(node.parameters);
            }
        }
        else {
            endNode = (node.kind === ts.SyntaxKind.VariableDeclaration ? node.exclamationToken : node.questionToken) ?? node.name;
        }

        this.insertNodeAt(sourceFile, endNode.end, type, { prefix: ": " });
        return true;
    }

    public tryInsertThisTypeAnnotation(sourceFile: ts.SourceFile, node: ThisTypeAnnotatable, type: ts.TypeNode): void {
        const start = ts.findChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile)!.getStart(sourceFile) + 1;
        const suffix = node.parameters.length ? ", " : "";

        this.insertNodeAt(sourceFile, start, type, { prefix: "this: ", suffix });
    }

    public insertTypeParameters(sourceFile: ts.SourceFile, node: ts.SignatureDeclaration, typeParameters: readonly ts.TypeParameterDeclaration[]): void {
        // If no `(`, is an arrow function `x => x`, so use the pos of the first parameter
        const start = (ts.findChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile) || ts.first(node.parameters)).getStart(sourceFile);
        this.insertNodesAt(sourceFile, start, typeParameters, { prefix: "<", suffix: ">", joiner: ", " });
    }

    private getOptionsForInsertNodeBefore(before: ts.Node, inserted: ts.Node, blankLineBetween: boolean): InsertNodeOptions {
        if (ts.isStatement(before) || ts.isClassElement(before)) {
            return { suffix: blankLineBetween ? this.newLineCharacter + this.newLineCharacter : this.newLineCharacter };
        }
        else if (ts.isVariableDeclaration(before)) { // insert `x = 1, ` into `const x = 1, y = 2;
            return { suffix: ", " };
        }
        else if (ts.isParameter(before)) {
            return ts.isParameter(inserted) ? { suffix: ", " } : {};
        }
        else if (ts.isStringLiteral(before) && ts.isImportDeclaration(before.parent) || ts.isNamedImports(before)) {
            return { suffix: ", " };
        }
        else if (ts.isImportSpecifier(before)) {
            return { suffix: "," + (blankLineBetween ? this.newLineCharacter : " ") };
        }
        return ts.Debug.failBadSyntaxKind(before); // We haven't handled this kind of node yet -- add it
    }

    public insertNodeAtConstructorStart(sourceFile: ts.SourceFile, ctr: ts.ConstructorDeclaration, newStatement: ts.Statement): void {
        const firstStatement = ts.firstOrUndefined(ctr.body!.statements);
        if (!firstStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [newStatement, ...ctr.body!.statements]);
        }
        else {
            this.insertNodeBefore(sourceFile, firstStatement, newStatement);
        }
    }

    public insertNodeAtConstructorStartAfterSuperCall(sourceFile: ts.SourceFile, ctr: ts.ConstructorDeclaration, newStatement: ts.Statement): void {
        const superCallStatement = ts.find(ctr.body!.statements, stmt => ts.isExpressionStatement(stmt) && ts.isSuperCall(stmt.expression));
        if (!superCallStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [...ctr.body!.statements, newStatement]);
        }
        else {
            this.insertNodeAfter(sourceFile, superCallStatement, newStatement);
        }
    }

    public insertNodeAtConstructorEnd(sourceFile: ts.SourceFile, ctr: ts.ConstructorDeclaration, newStatement: ts.Statement): void {
        const lastStatement = ts.lastOrUndefined(ctr.body!.statements);
        if (!lastStatement || !ctr.body!.multiLine) {
            this.replaceConstructorBody(sourceFile, ctr, [...ctr.body!.statements, newStatement]);
        }
        else {
            this.insertNodeAfter(sourceFile, lastStatement, newStatement);
        }
    }

    private replaceConstructorBody(sourceFile: ts.SourceFile, ctr: ts.ConstructorDeclaration, statements: readonly ts.Statement[]): void {
        this.replaceNode(sourceFile, ctr.body!, ts.factory.createBlock(statements, /*multiLine*/ true));
    }

    public insertNodeAtEndOfScope(sourceFile: ts.SourceFile, scope: ts.Node, newNode: ts.Node): void {
        const pos = getAdjustedStartPosition(sourceFile, scope.getLastToken()!, {});
        this.insertNodeAt(sourceFile, pos, newNode, {
            prefix: ts.isLineBreak(sourceFile.text.charCodeAt(scope.getLastToken()!.pos)) ? this.newLineCharacter : this.newLineCharacter + this.newLineCharacter,
            suffix: this.newLineCharacter
        });
    }

    public insertMemberAtStart(sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, newElement: ts.ClassElement | ts.PropertySignature | ts.MethodSignature): void {
        this.insertNodeAtStartWorker(sourceFile, node, newElement);
    }

    public insertNodeAtObjectStart(sourceFile: ts.SourceFile, obj: ts.ObjectLiteralExpression, newElement: ts.ObjectLiteralElementLike): void {
        this.insertNodeAtStartWorker(sourceFile, obj, newElement);
    }

    private insertNodeAtStartWorker(sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression | ts.TypeLiteralNode, newElement: ts.ClassElement | ts.ObjectLiteralElementLike | ts.PropertySignature | ts.MethodSignature): void {
        const indentation = this.guessIndentationFromExistingMembers(sourceFile, node) ?? this.computeIndentationForNewMember(sourceFile, node);
        this.insertNodeAt(sourceFile, getMembersOrProperties(node).pos, newElement, this.getInsertNodeAtStartInsertOptions(sourceFile, node, indentation));
    }

    /**
     * Tries to guess the indentation from the existing members of a class/interface/object. All members must be on
     * new lines and must share the same indentation.
     */
    private guessIndentationFromExistingMembers(sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression | ts.TypeLiteralNode) {
        let indentation: number | undefined;
        let lastRange: ts.TextRange = node;
        for (const member of getMembersOrProperties(node)) {
            if (ts.rangeStartPositionsAreOnSameLine(lastRange, member, sourceFile)) {
                // each indented member must be on a new line
                return undefined;
            }
            const memberStart = member.getStart(sourceFile);
            const memberIndentation = ts.formatting.SmartIndenter.findFirstNonWhitespaceColumn(ts.getLineStartPositionForPosition(memberStart, sourceFile), memberStart, sourceFile, this.formatContext.options);
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

    private computeIndentationForNewMember(sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression | ts.TypeLiteralNode) {
        const nodeStart = node.getStart(sourceFile);
        return ts.formatting.SmartIndenter.findFirstNonWhitespaceColumn(ts.getLineStartPositionForPosition(nodeStart, sourceFile), nodeStart, sourceFile, this.formatContext.options)
            + (this.formatContext.options.indentSize ?? 4);
    }

    private getInsertNodeAtStartInsertOptions(sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression | ts.TypeLiteralNode, indentation: number): InsertNodeOptions {
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
        const isFirstInsertion = ts.addToSeen(this.classesWithNodesInsertedAtStart, ts.getNodeId(node), { node, sourceFile });
        const insertTrailingComma = ts.isObjectLiteralExpression(node) && (!ts.isJsonSourceFile(sourceFile) || !isEmpty);
        const insertLeadingComma = ts.isObjectLiteralExpression(node) && ts.isJsonSourceFile(sourceFile) && isEmpty && !isFirstInsertion;
        return {
            indentation,
            prefix: (insertLeadingComma ? "," : "") + this.newLineCharacter,
            suffix: insertTrailingComma ? "," : ts.isInterfaceDeclaration(node) && isEmpty ? ";" : ""
        };
    }

    public insertNodeAfterComma(sourceFile: ts.SourceFile, after: ts.Node, newNode: ts.Node): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, this.nextCommaToken(sourceFile, after) || after, newNode);
        this.insertNodeAt(sourceFile, endPosition, newNode, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    public insertNodeAfter(sourceFile: ts.SourceFile, after: ts.Node, newNode: ts.Node): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, after, newNode);
        this.insertNodeAt(sourceFile, endPosition, newNode, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    public insertNodeAtEndOfList(sourceFile: ts.SourceFile, list: ts.NodeArray<ts.Node>, newNode: ts.Node): void {
        this.insertNodeAt(sourceFile, list.end, newNode, { prefix: ", " });
    }

    public insertNodesAfter(sourceFile: ts.SourceFile, after: ts.Node, newNodes: readonly ts.Node[]): void {
        const endPosition = this.insertNodeAfterWorker(sourceFile, after, ts.first(newNodes));
        this.insertNodesAt(sourceFile, endPosition, newNodes, this.getInsertNodeAfterOptions(sourceFile, after));
    }

    private insertNodeAfterWorker(sourceFile: ts.SourceFile, after: ts.Node, newNode: ts.Node): number {
        if (needSemicolonBetween(after, newNode)) {
            // check if previous statement ends with semicolon
            // if not - insert semicolon to preserve the code from changing the meaning due to ASI
            if (sourceFile.text.charCodeAt(after.end - 1) !== ts.CharacterCodes.semicolon) {
                this.replaceRange(sourceFile, ts.createRange(after.end), ts.factory.createToken(ts.SyntaxKind.SemicolonToken));
            }
        }
        const endPosition = getAdjustedEndPosition(sourceFile, after, {});
        return endPosition;
    }

    private getInsertNodeAfterOptions(sourceFile: ts.SourceFile, after: ts.Node): InsertNodeOptions {
        const options = this.getInsertNodeAfterOptionsWorker(after);
        return {
            ...options,
            prefix: after.end === sourceFile.end && ts.isStatement(after) ? (options.prefix ? `\n${options.prefix}` : "\n") : options.prefix,
        };
    }

    private getInsertNodeAfterOptionsWorker(node: ts.Node): InsertNodeOptions {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                return { prefix: this.newLineCharacter, suffix: this.newLineCharacter };

            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.Identifier:
                return { prefix: ", " };

            case ts.SyntaxKind.PropertyAssignment:
                return { suffix: "," + this.newLineCharacter };

            case ts.SyntaxKind.ExportKeyword:
                return { prefix: " " };

            case ts.SyntaxKind.Parameter:
                return {};

            default:
                ts.Debug.assert(ts.isStatement(node) || ts.isClassOrTypeElement(node)); // Else we haven't handled this kind of node yet -- add it
                return { suffix: this.newLineCharacter };
        }
    }

    public insertName(sourceFile: ts.SourceFile, node: ts.FunctionExpression | ts.ClassExpression | ts.ArrowFunction, name: string): void {
        ts.Debug.assert(!node.name);
        if (node.kind === ts.SyntaxKind.ArrowFunction) {
            const arrow = ts.findChildOfKind(node, ts.SyntaxKind.EqualsGreaterThanToken, sourceFile)!;
            const lparen = ts.findChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile);
            if (lparen) {
                // `() => {}` --> `function f() {}`
                this.insertNodesAt(sourceFile, lparen.getStart(sourceFile), [ts.factory.createToken(ts.SyntaxKind.FunctionKeyword), ts.factory.createIdentifier(name)], { joiner: " " });
                deleteNode(this, sourceFile, arrow);
            }
            else {
                // `x => {}` -> `function f(x) {}`
                this.insertText(sourceFile, ts.first(node.parameters).getStart(sourceFile), `function ${name}(`);
                // Replacing full range of arrow to get rid of the leading space -- replace ` =>` with `)`
                this.replaceRange(sourceFile, arrow, ts.factory.createToken(ts.SyntaxKind.CloseParenToken));
            }

            if (node.body.kind !== ts.SyntaxKind.Block) {
                // `() => 0` => `function f() { return 0; }`
                this.insertNodesAt(sourceFile, node.body.getStart(sourceFile), [ts.factory.createToken(ts.SyntaxKind.OpenBraceToken), ts.factory.createToken(ts.SyntaxKind.ReturnKeyword)], { joiner: " ", suffix: " " });
                this.insertNodesAt(sourceFile, node.body.end, [ts.factory.createToken(ts.SyntaxKind.SemicolonToken), ts.factory.createToken(ts.SyntaxKind.CloseBraceToken)], { joiner: " " });
            }
        }
        else {
            const pos = ts.findChildOfKind(node, node.kind === ts.SyntaxKind.FunctionExpression ? ts.SyntaxKind.FunctionKeyword : ts.SyntaxKind.ClassKeyword, sourceFile)!.end;
            this.insertNodeAt(sourceFile, pos, ts.factory.createIdentifier(name), { prefix: " " });
        }
    }

    public insertExportModifier(sourceFile: ts.SourceFile, node: ts.DeclarationStatement | ts.VariableStatement): void {
        this.insertText(sourceFile, node.getStart(sourceFile), "export ");
    }

    public insertImportSpecifierAtIndex(sourceFile: ts.SourceFile, importSpecifier: ts.ImportSpecifier, namedImports: ts.NamedImports, index: number) {
        const prevSpecifier = namedImports.elements[index - 1];
        if (prevSpecifier) {
            this.insertNodeInListAfter(sourceFile, prevSpecifier, importSpecifier);
        }
        else {
            this.insertNodeBefore(
                sourceFile,
                namedImports.elements[0],
                importSpecifier,
                !ts.positionsAreOnSameLine(namedImports.elements[0].getStart(), namedImports.parent.parent.getStart(), sourceFile));
        }
    }

    /**
     * This function should be used to insert nodes in lists when nodes don't carry separators as the part of the node range,
     * i.e. arguments in arguments lists, parameters in parameter lists etc.
     * Note that separators are part of the node in statements and class elements.
     */
    public insertNodeInListAfter(sourceFile: ts.SourceFile, after: ts.Node, newNode: ts.Node, containingList = ts.formatting.SmartIndenter.getContainingList(after, sourceFile)): void {
        if (!containingList) {
            ts.Debug.fail("node is not a list element");
            return;
        }
        const index = ts.indexOfNode(containingList, after);
        if (index < 0) {
            return;
        }
        const end = after.getEnd();
        if (index !== containingList.length - 1) {
            // any element except the last one
            // use next sibling as an anchor
            const nextToken = ts.getTokenAtPosition(sourceFile, after.end);
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
                const suffix = `${ts.tokenToString(nextToken.kind)}${sourceFile.text.substring(nextToken.end, startPos)}`;
                this.insertNodesAt(sourceFile, startPos, [newNode], { suffix });
            }
        }
        else {
            const afterStart = after.getStart(sourceFile);
            const afterStartLinePosition = ts.getLineStartPositionForPosition(afterStart, sourceFile);

            let separator: ts.SyntaxKind.CommaToken | ts.SyntaxKind.SemicolonToken | undefined;
            let multilineList = false;

            // insert element after the last element in the list that has more than one item
            // pick the element preceding the after element to:
            // - pick the separator
            // - determine if list is a multiline
            if (containingList.length === 1) {
                // if list has only one element then we'll format is as multiline if node has comment in trailing trivia, or as singleline otherwise
                // i.e. var x = 1 // this is x
                //     | new element will be inserted at this position
                separator = ts.SyntaxKind.CommaToken;
            }
            else {
                // element has more than one element, pick separator from the list
                const tokenBeforeInsertPosition = ts.findPrecedingToken(after.pos, sourceFile);
                separator = isSeparator(after, tokenBeforeInsertPosition) ? tokenBeforeInsertPosition.kind : ts.SyntaxKind.CommaToken;
                // determine if list is multiline by checking lines of after element and element that precedes it.
                const afterMinusOneStartLinePosition = ts.getLineStartPositionForPosition(containingList[index - 1].getStart(sourceFile), sourceFile);
                multilineList = afterMinusOneStartLinePosition !== afterStartLinePosition;
            }
            if (hasCommentsBeforeLineBreak(sourceFile.text, after.end)) {
                // in this case we'll always treat containing list as multiline
                multilineList = true;
            }
            if (multilineList) {
                // insert separator immediately following the 'after' node to preserve comments in trailing trivia
                this.replaceRange(sourceFile, ts.createRange(end), ts.factory.createToken(separator));
                // use the same indentation as 'after' item
                const indentation = ts.formatting.SmartIndenter.findFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, this.formatContext.options);
                // insert element before the line break on the line that contains 'after' element
                let insertPos = ts.skipTrivia(sourceFile.text, end, /*stopAfterLineBreak*/ true, /*stopAtComments*/ false);
                // find position before "\n" or "\r\n"
                while (insertPos !== end && ts.isLineBreak(sourceFile.text.charCodeAt(insertPos - 1))) {
                    insertPos--;
                }
                this.replaceRange(sourceFile, ts.createRange(insertPos), newNode, { indentation, prefix: this.newLineCharacter });
            }
            else {
                this.replaceRange(sourceFile, ts.createRange(end), newNode, { prefix: `${ts.tokenToString(separator)} ` });
            }
        }
    }

    public parenthesizeExpression(sourceFile: ts.SourceFile, expression: ts.Expression) {
        this.replaceRange(sourceFile, ts.rangeOfNode(expression), ts.factory.createParenthesizedExpression(expression));
    }

    private finishClassesWithNodesInsertedAtStart(): void {
        this.classesWithNodesInsertedAtStart.forEach(({ node, sourceFile }) => {
            const [openBraceEnd, closeBraceEnd] = getClassOrObjectBraceEnds(node, sourceFile);
            if (openBraceEnd !== undefined && closeBraceEnd !== undefined) {
                const isEmpty = getMembersOrProperties(node).length === 0;
                const isSingleLine = ts.positionsAreOnSameLine(openBraceEnd, closeBraceEnd, sourceFile);
                if (isEmpty && isSingleLine && openBraceEnd !== closeBraceEnd - 1) {
                    // For `class C { }` remove the whitespace inside the braces.
                    this.deleteRange(sourceFile, ts.createRange(openBraceEnd, closeBraceEnd - 1));
                }
                if (isSingleLine) {
                    this.insertText(sourceFile, closeBraceEnd - 1, this.newLineCharacter);
                }
            }
        });
    }

    private finishDeleteDeclarations(): void {
        const deletedNodesInLists = new ts.Set<ts.Node>(); // Stores nodes in lists that we already deleted. Used to avoid deleting `, ` twice in `a, b`.
        for (const { sourceFile, node } of this.deletedNodes) {
            if (!this.deletedNodes.some(d => d.sourceFile === sourceFile && ts.rangeContainsRangeExclusive(d.node, node))) {
                if (ts.isArray(node)) {
                    this.deleteRange(sourceFile, ts.rangeOfTypeParameters(sourceFile, node));
                }
                else {
                    deleteDeclaration.deleteDeclaration(this, deletedNodesInLists, sourceFile, node);
                }
            }
        }

        deletedNodesInLists.forEach(node => {
            const sourceFile = node.getSourceFile();
            const list = ts.formatting.SmartIndenter.getContainingList(node, sourceFile)!;
            if (node !== ts.last(list)) return;

            const lastNonDeletedIndex = ts.findLastIndex(list, n => !deletedNodesInLists.has(n), list.length - 2);
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
    public getChanges(validate?: ValidateNonFormattedText): ts.FileTextChanges[] {
        this.finishDeleteDeclarations();
        this.finishClassesWithNodesInsertedAtStart();
        const changes = changesToText.getTextChangesFromChanges(this.changes, this.newLineCharacter, this.formatContext, validate);
        for (const { oldFile, fileName, statements } of this.newFiles) {
            changes.push(changesToText.newFileChanges(oldFile, fileName, statements, this.newLineCharacter, this.formatContext));
        }
        return changes;
    }

    public createNewFile(oldFile: ts.SourceFile | undefined, fileName: string, statements: readonly (ts.Statement | ts.SyntaxKind.NewLineTrivia)[]): void {
        this.newFiles.push({ oldFile, fileName, statements });
    }
}

function updateJSDocHost(parent: ts.HasJSDoc): ts.HasJSDoc {
    if (parent.kind !== ts.SyntaxKind.ArrowFunction) {
        return parent;
    }
    const jsDocNode = parent.parent.kind === ts.SyntaxKind.PropertyDeclaration ?
        parent.parent as ts.HasJSDoc :
        parent.parent.parent as ts.HasJSDoc;
    jsDocNode.jsDoc = parent.jsDoc;
    jsDocNode.jsDocCache = parent.jsDocCache;
    return jsDocNode;
}

function tryMergeJsdocTags(oldTag: ts.JSDocTag, newTag: ts.JSDocTag): ts.JSDocTag | undefined {
    if (oldTag.kind !== newTag.kind) {
        return undefined;
    }
    switch (oldTag.kind) {
        case ts.SyntaxKind.JSDocParameterTag: {
            const oldParam = oldTag as ts.JSDocParameterTag;
            const newParam = newTag as ts.JSDocParameterTag;
            return ts.isIdentifier(oldParam.name) && ts.isIdentifier(newParam.name) && oldParam.name.escapedText === newParam.name.escapedText
                ? ts.factory.createJSDocParameterTag(/*tagName*/ undefined, newParam.name, /*isBracketed*/ false, newParam.typeExpression, newParam.isNameFirst, oldParam.comment)
                : undefined;
        }
        case ts.SyntaxKind.JSDocReturnTag:
            return ts.factory.createJSDocReturnTag(/*tagName*/ undefined, (newTag as ts.JSDocReturnTag).typeExpression, oldTag.comment);
        case ts.SyntaxKind.JSDocTypeTag:
            return ts.factory.createJSDocTypeTag(/*tagName*/ undefined, (newTag as ts.JSDocTypeTag).typeExpression, oldTag.comment);
    }
}

// find first non-whitespace position in the leading trivia of the node
function startPositionToDeleteNodeInList(sourceFile: ts.SourceFile, node: ts.Node): number {
    return ts.skipTrivia(sourceFile.text, getAdjustedStartPosition(sourceFile, node, { leadingTriviaOption: LeadingTriviaOption.IncludeAll }), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
}

function endPositionToDeleteNodeInList(sourceFile: ts.SourceFile, node: ts.Node, prevNode: ts.Node | undefined, nextNode: ts.Node): number {
    const end = startPositionToDeleteNodeInList(sourceFile, nextNode);
    if (prevNode === undefined || ts.positionsAreOnSameLine(getAdjustedEndPosition(sourceFile, node, {}), end, sourceFile)) {
        return end;
    }
    const token = ts.findPrecedingToken(nextNode.getStart(sourceFile), sourceFile);
    if (isSeparator(node, token)) {
        const prevToken = ts.findPrecedingToken(node.getStart(sourceFile), sourceFile);
        if (isSeparator(prevNode, prevToken)) {
            const pos = ts.skipTrivia(sourceFile.text, token.getEnd(), /*stopAfterLineBreak*/ true, /*stopAtComments*/ true);
            if (ts.positionsAreOnSameLine(prevToken.getStart(sourceFile), token.getStart(sourceFile), sourceFile)) {
                return ts.isLineBreak(sourceFile.text.charCodeAt(pos - 1)) ? pos - 1 : pos;
            }
            if (ts.isLineBreak(sourceFile.text.charCodeAt(pos))) {
                return pos;
            }
        }
    }
    return end;
}

function getClassOrObjectBraceEnds(cls: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression, sourceFile: ts.SourceFile): [number | undefined, number | undefined] {
    const open = ts.findChildOfKind(cls, ts.SyntaxKind.OpenBraceToken, sourceFile);
    const close = ts.findChildOfKind(cls, ts.SyntaxKind.CloseBraceToken, sourceFile);
    return [open?.end, close?.end];
}
function getMembersOrProperties(node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.ObjectLiteralExpression | ts.TypeLiteralNode): ts.NodeArray<ts.Node> {
    return ts.isObjectLiteralExpression(node) ? node.properties : node.members;
}

/** @internal */
export type ValidateNonFormattedText = (node: ts.Node, text: string) => void;

/** @internal */
export function getNewFileText(statements: readonly ts.Statement[], scriptKind: ts.ScriptKind, newLineCharacter: string, formatContext: ts.formatting.FormatContext): string {
    return changesToText.newFileChangesWorker(/*oldFile*/ undefined, scriptKind, statements, newLineCharacter, formatContext);
}

namespace changesToText {
    export function getTextChangesFromChanges(changes: readonly Change[], newLineCharacter: string, formatContext: ts.formatting.FormatContext, validate: ValidateNonFormattedText | undefined): ts.FileTextChanges[] {
        return ts.mapDefined(ts.group(changes, c => c.sourceFile.path), changesInFile => {
            const sourceFile = changesInFile[0].sourceFile;
            // order changes by start position
            // If the start position is the same, put the shorter range first, since an empty range (x, x) may precede (x, y) but not vice-versa.
            const normalized = ts.stableSort(changesInFile, (a, b) => (a.range.pos - b.range.pos) || (a.range.end - b.range.end));
            // verify that change intervals do not overlap, except possibly at end points.
            for (let i = 0; i < normalized.length - 1; i++) {
                ts.Debug.assert(normalized[i].range.end <= normalized[i + 1].range.pos, "Changes overlap", () =>
                    `${JSON.stringify(normalized[i].range)} and ${JSON.stringify(normalized[i + 1].range)}`);
            }

            const textChanges = ts.mapDefined(normalized, c => {
                const span = ts.createTextSpanFromRange(c.range);
                const newText = computeNewText(c, sourceFile, newLineCharacter, formatContext, validate);

                // Filter out redundant changes.
                if (span.length === newText.length && ts.stringContainsAt(sourceFile.text, newText, span.start)) {
                    return undefined;
                }

                return ts.createTextChange(span, newText);
            });

            return textChanges.length > 0 ? { fileName: sourceFile.fileName, textChanges } : undefined;
        });
    }

    export function newFileChanges(oldFile: ts.SourceFile | undefined, fileName: string, statements: readonly (ts.Statement | ts.SyntaxKind.NewLineTrivia)[], newLineCharacter: string, formatContext: ts.formatting.FormatContext): ts.FileTextChanges {
        const text = newFileChangesWorker(oldFile, ts.getScriptKindFromFileName(fileName), statements, newLineCharacter, formatContext);
        return { fileName, textChanges: [ts.createTextChange(ts.createTextSpan(0, 0), text)], isNewFile: true };
    }

    export function newFileChangesWorker(oldFile: ts.SourceFile | undefined, scriptKind: ts.ScriptKind, statements: readonly (ts.Statement | ts.SyntaxKind.NewLineTrivia)[], newLineCharacter: string, formatContext: ts.formatting.FormatContext): string {
        // TODO: this emits the file, parses it back, then formats it that -- may be a less roundabout way to do this
        const nonFormattedText = statements.map(s => s === ts.SyntaxKind.NewLineTrivia ? "" : getNonformattedText(s, oldFile, newLineCharacter).text).join(newLineCharacter);
        const sourceFile = ts.createSourceFile("any file name", nonFormattedText, ts.ScriptTarget.ESNext, /*setParentNodes*/ true, scriptKind);
        const changes = ts.formatting.formatDocument(sourceFile, formatContext);
        return applyChanges(nonFormattedText, changes) + newLineCharacter;
    }

    function computeNewText(change: Change, sourceFile: ts.SourceFile, newLineCharacter: string, formatContext: ts.formatting.FormatContext, validate: ValidateNonFormattedText | undefined): string {
        if (change.kind === ChangeKind.Remove) {
            return "";
        }
        if (change.kind === ChangeKind.Text) {
            return change.text;
        }

        const { options = {}, range: { pos } } = change;
        const format = (n: ts.Node) => getFormattedTextOfNode(n, sourceFile, pos, options, newLineCharacter, formatContext, validate);
        const text = change.kind === ChangeKind.ReplaceWithMultipleNodes
            ? change.nodes.map(n => ts.removeSuffix(format(n), newLineCharacter)).join(change.options?.joiner || newLineCharacter)
            : format(change.node);
        // strip initial indentation (spaces or tabs) if text will be inserted in the middle of the line
        const noIndent = (options.indentation !== undefined || ts.getLineStartPositionForPosition(pos, sourceFile) === pos) ? text : text.replace(/^\s+/, "");
        return (options.prefix || "") + noIndent
             + ((!options.suffix || ts.endsWith(noIndent, options.suffix))
                ? "" : options.suffix);
    }

    /** Note: this may mutate `nodeIn`. */
    function getFormattedTextOfNode(nodeIn: ts.Node, sourceFile: ts.SourceFile, pos: number, { indentation, prefix, delta }: InsertNodeOptions, newLineCharacter: string, formatContext: ts.formatting.FormatContext, validate: ValidateNonFormattedText | undefined): string {
        const { node, text } = getNonformattedText(nodeIn, sourceFile, newLineCharacter);
        if (validate) validate(node, text);
        const formatOptions = ts.getFormatCodeSettingsForWriting(formatContext, sourceFile);
        const initialIndentation =
            indentation !== undefined
                ? indentation
                : ts.formatting.SmartIndenter.getIndentation(pos, sourceFile, formatOptions, prefix === newLineCharacter || ts.getLineStartPositionForPosition(pos, sourceFile) === pos);
        if (delta === undefined) {
            delta = ts.formatting.SmartIndenter.shouldIndentChildNode(formatOptions, nodeIn) ? (formatOptions.indentSize || 0) : 0;
        }

        const file: ts.SourceFileLike = {
            text,
            getLineAndCharacterOfPosition(pos) {
                return ts.getLineAndCharacterOfPosition(this, pos);
            }
        };
        const changes = ts.formatting.formatNodeGivenIndentation(node, file, sourceFile.languageVariant, initialIndentation, delta, { ...formatContext, options: formatOptions });
        return applyChanges(text, changes);
    }

    /** Note: output node may be mutated input node. */
    export function getNonformattedText(node: ts.Node, sourceFile: ts.SourceFile | undefined, newLineCharacter: string): { text: string, node: ts.Node } {
        const writer = createWriter(newLineCharacter);
        const newLine = ts.getNewLineKind(newLineCharacter);
        ts.createPrinter({
            newLine,
            neverAsciiEscape: true,
            preserveSourceNewlines: true,
            terminateUnterminatedLiterals: true
        }, writer).writeNode(ts.EmitHint.Unspecified, node, sourceFile, writer);
        return { text: writer.getText(), node: assignPositionsToNode(node) };
    }
}

/** @internal */
export function applyChanges(text: string, changes: readonly ts.TextChange[]): string {
    for (let i = changes.length - 1; i >= 0; i--) {
        const { span, newText } = changes[i];
        text = `${text.substring(0, span.start)}${newText}${text.substring(ts.textSpanEnd(span))}`;
    }
    return text;
}

function isTrivia(s: string) {
    return ts.skipTrivia(s, 0) === s.length;
}

// A transformation context that won't perform parenthesization, as some parenthesization rules
// are more aggressive than is strictly necessary.
const textChangesTransformationContext: ts.TransformationContext = {
    ...ts.nullTransformationContext,
    factory: ts.createNodeFactory(
        ts.nullTransformationContext.factory.flags | ts.NodeFactoryFlags.NoParenthesizerRules,
        ts.nullTransformationContext.factory.baseFactory),
};

/** @internal */
export function assignPositionsToNode(node: ts.Node): ts.Node {
    const visited = ts.visitEachChild(node, assignPositionsToNode, textChangesTransformationContext, assignPositionsToNodeArray, assignPositionsToNode);
    // create proxy node for non synthesized nodes
    const newNode = ts.nodeIsSynthesized(visited) ? visited : Object.create(visited) as ts.Node;
    ts.setTextRangePosEnd(newNode, getPos(node), getEnd(node));
    return newNode;
}

function assignPositionsToNodeArray(nodes: ts.NodeArray<any>, visitor: ts.Visitor, test?: (node: ts.Node) => boolean, start?: number, count?: number) {
    const visited = ts.visitNodes(nodes, visitor, test, start, count);
    if (!visited) {
        return visited;
    }
    // clone nodearray if necessary
    const nodeArray = visited === nodes ? ts.factory.createNodeArray(visited.slice(0)) : visited;
    ts.setTextRangePosEnd(nodeArray, getPos(nodes), getEnd(nodes));
    return nodeArray;
}

interface TextChangesWriter extends ts.EmitTextWriter, ts.PrintHandlers {}

/** @internal */
export function createWriter(newLine: string): TextChangesWriter {
    let lastNonTriviaPosition = 0;

    const writer = ts.createTextWriter(newLine);
    const onBeforeEmitNode: ts.PrintHandlers["onBeforeEmitNode"] = node => {
        if (node) {
            setPos(node, lastNonTriviaPosition);
        }
    };
    const onAfterEmitNode: ts.PrintHandlers["onAfterEmitNode"] = node => {
        if (node) {
            setEnd(node, lastNonTriviaPosition);
        }
    };
    const onBeforeEmitNodeArray: ts.PrintHandlers["onBeforeEmitNodeArray"] = nodes => {
        if (nodes) {
            setPos(nodes, lastNonTriviaPosition);
        }
    };
    const onAfterEmitNodeArray: ts.PrintHandlers["onAfterEmitNodeArray"] = nodes => {
        if (nodes) {
            setEnd(nodes, lastNonTriviaPosition);
        }
    };
    const onBeforeEmitToken: ts.PrintHandlers["onBeforeEmitToken"] = node => {
        if (node) {
            setPos(node, lastNonTriviaPosition);
        }
    };
    const onAfterEmitToken: ts.PrintHandlers["onAfterEmitToken"] = node => {
        if (node) {
            setEnd(node, lastNonTriviaPosition);
        }
    };

    function setLastNonTriviaPosition(s: string, force: boolean) {
        if (force || !isTrivia(s)) {
            lastNonTriviaPosition = writer.getTextPos();
            let i = 0;
            while (ts.isWhiteSpaceLike(s.charCodeAt(s.length - i - 1))) {
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
    function writeSymbol(s: string, sym: ts.Symbol): void {
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
        clear
    };
}

function getInsertionPositionAtSourceFileTop(sourceFile: ts.SourceFile): number {
    let lastPrologue: ts.PrologueDirective | undefined;
    for (const node of sourceFile.statements) {
        if (ts.isPrologueDirective(node)) {
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

    const shebang = ts.getShebang(text);
    if (shebang !== undefined) {
        position = shebang.length;
        advancePastLineBreak();
    }

    const ranges = ts.getLeadingCommentRanges(text, position);
    if (!ranges) return position;

    // Find the first attached comment to the first node and add before it
    let lastComment: { range: ts.CommentRange; pinnedOrTripleSlash: boolean; } | undefined;
    let firstNodeLine: number | undefined;
    for (const range of ranges) {
        if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
            if (ts.isPinnedComment(text, range.pos)) {
                lastComment = { range, pinnedOrTripleSlash: true };
                continue;
            }
        }
        else if (ts.isRecognizedTripleSlashComment(text, range.pos, range.end)) {
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
            if (ts.isLineBreak(charCode)) {
                position++;

                if (position < text.length && charCode === ts.CharacterCodes.carriageReturn && text.charCodeAt(position) === ts.CharacterCodes.lineFeed) {
                    position++;
                }
            }
        }
    }
}

/** @internal */
export function isValidLocationToAddComment(sourceFile: ts.SourceFile, position: number) {
    return !ts.isInComment(sourceFile, position) && !ts.isInString(sourceFile, position) && !ts.isInTemplateString(sourceFile, position) && !ts.isInJSXText(sourceFile, position);
}

function needSemicolonBetween(a: ts.Node, b: ts.Node): boolean {
    return (ts.isPropertySignature(a) || ts.isPropertyDeclaration(a)) && ts.isClassOrTypeElement(b) && b.name!.kind === ts.SyntaxKind.ComputedPropertyName
        || ts.isStatementButNotDeclaration(a) && ts.isStatementButNotDeclaration(b); // TODO: only if b would start with a `(` or `[`
}

namespace deleteDeclaration {
    export function deleteDeclaration(changes: ChangeTracker, deletedNodesInLists: ts.Set<ts.Node>, sourceFile: ts.SourceFile, node: ts.Node): void {
        switch (node.kind) {
            case ts.SyntaxKind.Parameter: {
                const oldFunction = node.parent;
                if (ts.isArrowFunction(oldFunction) &&
                    oldFunction.parameters.length === 1 &&
                    !ts.findChildOfKind(oldFunction, ts.SyntaxKind.OpenParenToken, sourceFile)) {
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

            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ImportEqualsDeclaration:
                const isFirstImport = sourceFile.imports.length && node === ts.first(sourceFile.imports).parent || node === ts.find(sourceFile.statements, ts.isAnyImportSyntax);
                // For first import, leave header comment in place, otherwise only delete JSDoc comments
                deleteNode(changes, sourceFile, node, {
                    leadingTriviaOption: isFirstImport ? LeadingTriviaOption.Exclude : ts.hasJSDocNodes(node) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine,
                });
                break;

            case ts.SyntaxKind.BindingElement:
                const pattern = (node as ts.BindingElement).parent;
                const preserveComma = pattern.kind === ts.SyntaxKind.ArrayBindingPattern && node !== ts.last(pattern.elements);
                if (preserveComma) {
                    deleteNode(changes, sourceFile, node);
                }
                else {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                break;

            case ts.SyntaxKind.VariableDeclaration:
                deleteVariableDeclaration(changes, deletedNodesInLists, sourceFile, node as ts.VariableDeclaration);
                break;

            case ts.SyntaxKind.TypeParameter:
                deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                break;

            case ts.SyntaxKind.ImportSpecifier:
                const namedImports = (node as ts.ImportSpecifier).parent;
                if (namedImports.elements.length === 1) {
                    deleteImportBinding(changes, sourceFile, namedImports);
                }
                else {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                break;

            case ts.SyntaxKind.NamespaceImport:
                deleteImportBinding(changes, sourceFile, node as ts.NamespaceImport);
                break;

            case ts.SyntaxKind.SemicolonToken:
                deleteNode(changes, sourceFile, node, { trailingTriviaOption: TrailingTriviaOption.Exclude });
                break;

            case ts.SyntaxKind.FunctionKeyword:
                deleteNode(changes, sourceFile, node, { leadingTriviaOption: LeadingTriviaOption.Exclude });
                break;

            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                deleteNode(changes, sourceFile, node, { leadingTriviaOption: ts.hasJSDocNodes(node) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine });
                break;

            default:
                if (!node.parent) {
                    // a misbehaving client can reach here with the SourceFile node
                    deleteNode(changes, sourceFile, node);
                }
                else if (ts.isImportClause(node.parent) && node.parent.name === node) {
                    deleteDefaultImport(changes, sourceFile, node.parent);
                }
                else if (ts.isCallExpression(node.parent) && ts.contains(node.parent.arguments, node)) {
                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                }
                else {
                    deleteNode(changes, sourceFile, node);
                }
        }
    }

    function deleteDefaultImport(changes: ChangeTracker, sourceFile: ts.SourceFile, importClause: ts.ImportClause): void {
        if (!importClause.namedBindings) {
            // Delete the whole import
            deleteNode(changes, sourceFile, importClause.parent);
        }
        else {
            // import |d,| * as ns from './file'
            const start = importClause.name!.getStart(sourceFile);
            const nextToken = ts.getTokenAtPosition(sourceFile, importClause.name!.end);
            if (nextToken && nextToken.kind === ts.SyntaxKind.CommaToken) {
                // shift first non-whitespace position after comma to the start position of the node
                const end = ts.skipTrivia(sourceFile.text, nextToken.end, /*stopAfterLineBreaks*/ false, /*stopAtComments*/ true);
                changes.deleteRange(sourceFile, { pos: start, end });
            }
            else {
                deleteNode(changes, sourceFile, importClause.name!);
            }
        }
    }

    function deleteImportBinding(changes: ChangeTracker, sourceFile: ts.SourceFile, node: ts.NamedImportBindings): void {
        if (node.parent.name) {
            // Delete named imports while preserving the default import
            // import d|, * as ns| from './file'
            // import d|, { a }| from './file'
            const previousToken = ts.Debug.checkDefined(ts.getTokenAtPosition(sourceFile, node.pos - 1));
            changes.deleteRange(sourceFile, { pos: previousToken.getStart(sourceFile), end: node.end });
        }
        else {
            // Delete the entire import declaration
            // |import * as ns from './file'|
            // |import { a } from './file'|
            const importDecl = ts.getAncestor(node, ts.SyntaxKind.ImportDeclaration)!;
            deleteNode(changes, sourceFile, importDecl);
        }
    }

    function deleteVariableDeclaration(changes: ChangeTracker, deletedNodesInLists: ts.Set<ts.Node>, sourceFile: ts.SourceFile, node: ts.VariableDeclaration): void {
        const { parent } = node;

        if (parent.kind === ts.SyntaxKind.CatchClause) {
            // TODO: There's currently no unused diagnostic for this, could be a suggestion
            changes.deleteNodeRange(sourceFile, ts.findChildOfKind(parent, ts.SyntaxKind.OpenParenToken, sourceFile)!, ts.findChildOfKind(parent, ts.SyntaxKind.CloseParenToken, sourceFile)!);
            return;
        }

        if (parent.declarations.length !== 1) {
            deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
            return;
        }

        const gp = parent.parent;
        switch (gp.kind) {
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForInStatement:
                changes.replaceNode(sourceFile, node, ts.factory.createObjectLiteralExpression());
                break;

            case ts.SyntaxKind.ForStatement:
                deleteNode(changes, sourceFile, parent);
                break;

            case ts.SyntaxKind.VariableStatement:
                deleteNode(changes, sourceFile, gp, { leadingTriviaOption: ts.hasJSDocNodes(gp) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine });
                break;

            default:
                ts.Debug.assertNever(gp);
        }
    }
}

/** @internal */
/** Warning: This deletes comments too. See `copyComments` in `convertFunctionToEs6Class`. */
// Exported for tests only! (TODO: improve tests to not need this)
export function deleteNode(changes: ChangeTracker, sourceFile: ts.SourceFile, node: ts.Node, options: ConfigurableStartEnd = { leadingTriviaOption: LeadingTriviaOption.IncludeAll }): void {
    const startPosition = getAdjustedStartPosition(sourceFile, node, options);
    const endPosition = getAdjustedEndPosition(sourceFile, node, options);
    changes.deleteRange(sourceFile, { pos: startPosition, end: endPosition });
}

function deleteNodeInList(changes: ChangeTracker, deletedNodesInLists: ts.Set<ts.Node>, sourceFile: ts.SourceFile, node: ts.Node): void {
    const containingList = ts.Debug.checkDefined(ts.formatting.SmartIndenter.getContainingList(node, sourceFile));
    const index = ts.indexOfNode(containingList, node);
    ts.Debug.assert(index !== -1);
    if (containingList.length === 1) {
        deleteNode(changes, sourceFile, node);
        return;
    }

    // Note: We will only delete a comma *after* a node. This will leave a trailing comma if we delete the last node.
    // That's handled in the end by `finishTrailingCommaAfterDeletingNodesInList`.
    ts.Debug.assert(!deletedNodesInLists.has(node), "Deleting a node twice");
    deletedNodesInLists.add(node);

    changes.deleteRange(sourceFile, {
        pos: startPositionToDeleteNodeInList(sourceFile, node),
        end: index === containingList.length - 1 ? getAdjustedEndPosition(sourceFile, node, {}) : endPositionToDeleteNodeInList(sourceFile, node, containingList[index - 1], containingList[index + 1]),
    });
}
