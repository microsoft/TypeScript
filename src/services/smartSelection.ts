import {
    CharacterCodes,
    compact,
    contains,
    createTextSpanFromBounds,
    Debug,
    findIndex,
    first,
    getTokenPosOfNode,
    getTouchingPropertyName,
    getTrailingCommentRanges,
    hasJSDocNodes,
    isBindingElement,
    isBlock,
    isFunctionBody,
    isFunctionLikeDeclaration,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isJSDocSignature,
    isJSDocTypeExpression,
    isJSDocTypeLiteral,
    isMappedTypeNode,
    isParameter,
    isPropertySignature,
    isSourceFile,
    isStringLiteral,
    isSyntaxList,
    isTemplateHead,
    isTemplateLiteral,
    isTemplateMiddleOrTemplateTail,
    isTemplateSpan,
    isTemplateTail,
    isVariableDeclaration,
    isVariableDeclarationList,
    isVariableStatement,
    last,
    Node,
    or,
    parseNodeFactory,
    positionsAreOnSameLine,
    SelectionRange,
    setTextRangePosEnd,
    singleOrUndefined,
    SourceFile,
    SyntaxKind,
    SyntaxList,
    textSpanIntersectsWithPosition,
    textSpansEqual,
} from "./_namespaces/ts.js";

/** @internal */
export function getSmartSelectionRange(pos: number, sourceFile: SourceFile): SelectionRange {
    let selectionRange: SelectionRange = {
        textSpan: createTextSpanFromBounds(sourceFile.getFullStart(), sourceFile.getEnd()),
    };

    let parentNode: Node = sourceFile;
    outer:
    while (true) {
        const children = getSelectionChildren(parentNode);
        if (!children.length) break;
        for (let i = 0; i < children.length; i++) {
            const prevNode: Node | undefined = children[i - 1];
            const node: Node = children[i];
            const nextNode: Node | undefined = children[i + 1];

            if (getTokenPosOfNode(node, sourceFile, /*includeJsDoc*/ true) > pos) {
                break outer;
            }

            const comment = singleOrUndefined(getTrailingCommentRanges(sourceFile.text, node.end));
            if (comment && comment.kind === SyntaxKind.SingleLineCommentTrivia) {
                pushSelectionCommentRange(comment.pos, comment.end);
            }

            if (positionShouldSnapToNode(sourceFile, pos, node)) {
                if (
                    isFunctionBody(node)
                    && isFunctionLikeDeclaration(parentNode) && !positionsAreOnSameLine(node.getStart(sourceFile), node.getEnd(), sourceFile)
                ) {
                    pushSelectionRange(node.getStart(sourceFile), node.getEnd());
                }

                // 1. Blocks are effectively redundant with SyntaxLists.
                // 2. TemplateSpans, along with the SyntaxLists containing them, are a somewhat unintuitive grouping
                //    of things that should be considered independently.
                // 3. A VariableStatement's children are just a VaraiableDeclarationList and a semicolon.
                // 4. A lone VariableDeclaration in a VaraibleDeclaration feels redundant with the VariableStatement.
                // Dive in without pushing a selection range.
                if (
                    isBlock(node)
                    || isTemplateSpan(node) || isTemplateHead(node) || isTemplateTail(node)
                    || prevNode && isTemplateHead(prevNode)
                    || isVariableDeclarationList(node) && isVariableStatement(parentNode)
                    || isSyntaxList(node) && isVariableDeclarationList(parentNode)
                    || isVariableDeclaration(node) && isSyntaxList(parentNode) && children.length === 1
                    || isJSDocTypeExpression(node) || isJSDocSignature(node) || isJSDocTypeLiteral(node)
                ) {
                    parentNode = node;
                    break;
                }

                // Synthesize a stop for '${ ... }' since '${' and '}' actually belong to siblings.
                if (isTemplateSpan(parentNode) && nextNode && isTemplateMiddleOrTemplateTail(nextNode)) {
                    const start = node.getFullStart() - "${".length;
                    const end = nextNode.getStart() + "}".length;
                    pushSelectionRange(start, end);
                }

                // Blocks with braces, brackets, parens, or JSX tags on separate lines should be
                // selected from open to close, including whitespace but not including the braces/etc. themselves.
                const isBetweenMultiLineBookends = isSyntaxList(node) && isListOpener(prevNode) && isListCloser(nextNode)
                    && !positionsAreOnSameLine(prevNode.getStart(), nextNode.getStart(), sourceFile);
                let start = isBetweenMultiLineBookends ? prevNode.getEnd() : node.getStart();
                const end = isBetweenMultiLineBookends ? nextNode.getStart() : getEndPos(sourceFile, node);

                if (hasJSDocNodes(node) && node.jsDoc?.length) {
                    pushSelectionRange(first(node.jsDoc).getStart(), end);
                }

                // (#39618 & #49807)
                // When the node is a SyntaxList and its first child has a JSDoc comment, then the node's
                // `start` (which usually is the result of calling `node.getStart()`) points to the first
                // token after the JSDoc comment. So, we have to make sure we'd pushed the selection
                // covering the JSDoc comment before diving further.
                if (isSyntaxList(node)) {
                    const firstChild = node.getChildren()[0];
                    if (firstChild && hasJSDocNodes(firstChild) && firstChild.jsDoc?.length && firstChild.getStart() !== node.pos) {
                        start = Math.min(start, first(firstChild.jsDoc).getStart());
                    }
                }
                pushSelectionRange(start, end);

                // String literals should have a stop both inside and outside their quotes.
                if (isStringLiteral(node) || isTemplateLiteral(node)) {
                    pushSelectionRange(start + 1, end - 1);
                }

                parentNode = node;
                break;
            }

            // If we made it to the end of the for loop, we're done.
            // In practice, I've only seen this happen at the very end
            // of a SourceFile.
            if (i === children.length - 1) {
                break outer;
            }
        }
    }

    return selectionRange;

    function pushSelectionRange(start: number, end: number): void {
        // Skip empty ranges
        if (start !== end) {
            const textSpan = createTextSpanFromBounds(start, end);
            if (
                !selectionRange || (
                    // Skip ranges that are identical to the parent
                    !textSpansEqual(textSpan, selectionRange.textSpan) &&
                    // Skip ranges that don't contain the original position
                    textSpanIntersectsWithPosition(textSpan, pos)
                )
            ) {
                selectionRange = { textSpan, ...selectionRange && { parent: selectionRange } };
            }
        }
    }

    function pushSelectionCommentRange(start: number, end: number): void {
        pushSelectionRange(start, end);

        let pos = start;
        while (sourceFile.text.charCodeAt(pos) === CharacterCodes.slash) {
            pos++;
        }
        pushSelectionRange(pos, end);
    }
}

/**
 * Like `ts.positionBelongsToNode`, except positions immediately after nodes
 * count too, unless that position belongs to the next node. In effect, makes
 * selections able to snap to preceding tokens when the cursor is on the tail
 * end of them with only whitespace ahead.
 * @param sourceFile The source file containing the nodes.
 * @param pos The position to check.
 * @param node The candidate node to snap to.
 */
function positionShouldSnapToNode(sourceFile: SourceFile, pos: number, node: Node) {
    // Can't use 'ts.positionBelongsToNode()' here because it cleverly accounts
    // for missing nodes, which can't really be considered when deciding what
    // to select.
    Debug.assert(node.pos <= pos);
    if (pos < node.end) {
        return true;
    }
    const nodeEnd = node.getEnd();
    if (nodeEnd === pos) {
        return getTouchingPropertyName(sourceFile, pos).pos < node.end;
    }
    return false;
}

const isImport = or(isImportDeclaration, isImportEqualsDeclaration);

/**
 * Gets the children of a node to be considered for selection ranging,
 * transforming them into an artificial tree according to their intuitive
 * grouping where no grouping actually exists in the parse tree. For example,
 * top-level imports are grouped into their own SyntaxList so they can be
 * selected all together, even though in the AST they're just siblings of each
 * other as well as of other top-level statements and declarations.
 */
function getSelectionChildren(node: Node): readonly Node[] {
    // Group top-level imports
    if (isSourceFile(node)) {
        return groupChildren(node.getChildAt(0).getChildren(), isImport);
    }

    // Mapped types _look_ like ObjectTypes with a single member,
    // but in fact don't contain a SyntaxList or a node containing
    // the "key/value" pair like ObjectTypes do, but it seems intuitive
    // that the selection would snap to those points. The philosophy
    // of choosing a selection range is not so much about what the
    // syntax currently _is_ as what the syntax might easily become
    // if the user is making a selection; e.g., we synthesize a selection
    // around the "key/value" pair not because there's a node there, but
    // because it allows the mapped type to become an object type with a
    // few keystrokes.
    if (isMappedTypeNode(node)) {
        const [openBraceToken, ...children] = node.getChildren();
        const closeBraceToken = Debug.checkDefined(children.pop());
        Debug.assertEqual(openBraceToken.kind, SyntaxKind.OpenBraceToken);
        Debug.assertEqual(closeBraceToken.kind, SyntaxKind.CloseBraceToken);
        // Group `-/+readonly` and `-/+?`
        const groupedWithPlusMinusTokens = groupChildren(children, child =>
            child === node.readonlyToken || child.kind === SyntaxKind.ReadonlyKeyword ||
            child === node.questionToken || child.kind === SyntaxKind.QuestionToken);
        // Group type parameter with surrounding brackets
        const groupedWithBrackets = groupChildren(groupedWithPlusMinusTokens, ({ kind }) =>
            kind === SyntaxKind.OpenBracketToken ||
            kind === SyntaxKind.TypeParameter ||
            kind === SyntaxKind.CloseBracketToken);
        return [
            openBraceToken,
            // Pivot on `:`
            createSyntaxList(splitChildren(groupedWithBrackets, ({ kind }) => kind === SyntaxKind.ColonToken)),
            closeBraceToken,
        ];
    }

    // Group modifiers and property name, then pivot on `:`.
    if (isPropertySignature(node)) {
        const children = groupChildren(node.getChildren(), child => child === node.name || contains(node.modifiers, child));
        const firstJSDocChild = children[0]?.kind === SyntaxKind.JSDoc ? children[0] : undefined;
        const withJSDocSeparated = firstJSDocChild ? children.slice(1) : children;
        const splittedChildren = splitChildren(withJSDocSeparated, ({ kind }) => kind === SyntaxKind.ColonToken);
        return firstJSDocChild ? [firstJSDocChild, createSyntaxList(splittedChildren)] : splittedChildren;
    }

    // Group the parameter name with its `...`, then that group with its `?`, then pivot on `=`.
    if (isParameter(node)) {
        const groupedDotDotDotAndName = groupChildren(node.getChildren(), child => child === node.dotDotDotToken || child === node.name);
        const groupedWithQuestionToken = groupChildren(groupedDotDotDotAndName, child => child === groupedDotDotDotAndName[0] || child === node.questionToken);
        return splitChildren(groupedWithQuestionToken, ({ kind }) => kind === SyntaxKind.EqualsToken);
    }

    // Pivot on '='
    if (isBindingElement(node)) {
        return splitChildren(node.getChildren(), ({ kind }) => kind === SyntaxKind.EqualsToken);
    }

    return node.getChildren();
}

/**
 * Groups sibling nodes together into their own SyntaxList if they
 * a) are adjacent, AND b) match a predicate function.
 */
function groupChildren(children: readonly Node[], groupOn: (child: Node) => boolean): Node[] {
    const result: Node[] = [];
    let group: Node[] | undefined;
    for (const child of children) {
        if (groupOn(child)) {
            group = group || [];
            group.push(child);
        }
        else {
            if (group) {
                result.push(createSyntaxList(group));
                group = undefined;
            }
            result.push(child);
        }
    }
    if (group) {
        result.push(createSyntaxList(group));
    }

    return result;
}

/**
 * Splits sibling nodes into up to four partitions:
 * 1) everything left of the first node matched by `pivotOn`,
 * 2) the first node matched by `pivotOn`,
 * 3) everything right of the first node matched by `pivotOn`,
 * 4) a trailing semicolon, if `separateTrailingSemicolon` is enabled.
 * The left and right groups, if not empty, will each be grouped into their own containing SyntaxList.
 * @param children The sibling nodes to split.
 * @param pivotOn The predicate function to match the node to be the pivot. The first node that matches
 * the predicate will be used; any others that may match will be included into the right-hand group.
 * @param separateTrailingSemicolon If the last token is a semicolon, it will be returned as a separate
 * child rather than be included in the right-hand group.
 */
function splitChildren(children: readonly Node[], pivotOn: (child: Node) => boolean, separateTrailingSemicolon = true): readonly Node[] {
    if (children.length < 2) {
        return children;
    }
    const splitTokenIndex = findIndex(children, pivotOn);
    if (splitTokenIndex === -1) {
        return children;
    }
    const leftChildren = children.slice(0, splitTokenIndex);
    const splitToken = children[splitTokenIndex];
    const lastToken = last(children);
    const separateLastToken = separateTrailingSemicolon && lastToken.kind === SyntaxKind.SemicolonToken;
    const rightChildren = children.slice(splitTokenIndex + 1, separateLastToken ? children.length - 1 : undefined);
    const result = compact([
        leftChildren.length ? createSyntaxList(leftChildren) : undefined,
        splitToken,
        rightChildren.length ? createSyntaxList(rightChildren) : undefined,
    ]);
    return separateLastToken ? result.concat(lastToken) : result;
}

function createSyntaxList(children: readonly Node[]): SyntaxList {
    Debug.assertGreaterThanOrEqual(children.length, 1);
    return setTextRangePosEnd(parseNodeFactory.createSyntaxList(children), children[0].pos, last(children).end);
}

function isListOpener(token: Node | undefined): token is Node {
    const kind = token && token.kind;
    return kind === SyntaxKind.OpenBraceToken
        || kind === SyntaxKind.OpenBracketToken
        || kind === SyntaxKind.OpenParenToken
        || kind === SyntaxKind.JsxOpeningElement;
}

function isListCloser(token: Node | undefined): token is Node {
    const kind = token && token.kind;
    return kind === SyntaxKind.CloseBraceToken
        || kind === SyntaxKind.CloseBracketToken
        || kind === SyntaxKind.CloseParenToken
        || kind === SyntaxKind.JsxClosingElement;
}

function getEndPos(sourceFile: SourceFile, node: Node): number {
    switch (node.kind) {
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocThisTag:
            return sourceFile.getLineEndOfPosition(node.getStart());
        default:
            return node.getEnd();
    }
}
