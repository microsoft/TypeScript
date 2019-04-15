/* @internal */
namespace ts.SelectionRange {
    export function getSelectionRange(pos: number, sourceFile: SourceFile): SelectionRange {
        let selectionRange: SelectionRange = {
            textSpan: createTextSpanFromBounds(sourceFile.getFullStart(), sourceFile.getEnd())
        };

        let parentNode: Node = sourceFile;
        outer: while (true) {
            const children = getSelectionChildren(parentNode);
            if (!children.length) break;
            for (let i = 0; i < children.length; i++) {
                const prevNode: Node | undefined = children[i - 1];
                const node: Node = children[i];
                const nextNode: Node | undefined = children[i + 1];
                if (node.getStart(sourceFile) > pos) {
                    break outer;
                }

                if (positionBelongsToNode(node, pos, sourceFile)) {
                    // Blocks are effectively redundant with SyntaxLists.
                    // TemplateSpans, along with the SyntaxLists containing them,
                    // are a somewhat unintuitive grouping of things that should be
                    // considered independently. Dive in without pushing a selection range.
                    if (isBlock(node) || isTemplateSpan(node) || isTemplateHead(node) || prevNode && isTemplateHead(prevNode)) {
                        parentNode = node;
                        break;
                    }

                    // Synthesize a stop for '${ ... }' since '${' and '}' actually belong to siblings.
                    if (isTemplateSpan(parentNode) && nextNode && isTemplateMiddleOrTemplateTail(nextNode)) {
                        const start = node.getFullStart() - "${".length;
                        const end = nextNode.getStart() + "}".length;
                        pushSelectionRange(start, end, node.kind);
                    }

                    // Blocks with braces on separate lines should be selected from brace to brace,
                    // including whitespace but not including the braces themselves.
                    const isBetweenMultiLineBraces = isSyntaxList(node)
                        && prevNode && prevNode.kind === SyntaxKind.OpenBraceToken
                        && nextNode && nextNode.kind === SyntaxKind.CloseBraceToken
                        && !positionsAreOnSameLine(prevNode.getStart(), nextNode.getStart(), sourceFile);
                    const start = isBetweenMultiLineBraces ? prevNode.getEnd() : node.getStart();
                    const end = isBetweenMultiLineBraces ? nextNode.getStart() : node.getEnd();
                    pushSelectionRange(start, end, node.kind);

                    // String literals should have a stop both inside and outside their quotes.
                    if (isStringLiteral(node) || isTemplateLiteral(node)) {
                        pushSelectionRange(start + 1, end - 1);
                    }

                    parentNode = node;
                    break;
                }
            }
        }

        return selectionRange;

        function pushSelectionRange(start: number, end: number, syntaxKind?: SyntaxKind): void {
            // Skip ranges that are identical to the parent
            const textSpan = createTextSpanFromBounds(start, end);
            if (!selectionRange || !textSpansEqual(textSpan, selectionRange.textSpan)) {
                selectionRange = { textSpan, ...selectionRange && { parent: selectionRange } };
                if (syntaxKind) {
                    Object.defineProperty(selectionRange, "__debugKind", { value: formatSyntaxKind(syntaxKind) });
                }
            }
        }
    }

    const isImport = or(isImportDeclaration, isImportEqualsDeclaration);

    /**
     * Gets the children of a node to be considered for selection ranging,
     * transforming them into an artificial tree according to their intuitive
     * grouping where no grouping actually exists in the parse tree. For example,
     * top-level imports are grouped into their own SyntaxList so they can be
     * selected all together, even though in the AST they’re just siblings of each
     * other as well as of other top-level statements and declarations.
     */
    function getSelectionChildren(node: Node): ReadonlyArray<Node> {
        // Group top-level imports
        if (isSourceFile(node)) {
            return groupChildren(node.getChildAt(0).getChildren(), isImport);
        }

        // Mapped types _look_ like ObjectTypes with a single member,
        // but in fact don’t contain a SyntaxList or a node containing
        // the “key/value” pair like ObjectTypes do, but it seems intuitive
        // that the selection would snap to those points. The philosophy
        // of choosing a selection range is not so much about what the
        // syntax currently _is_ as what the syntax might easily become
        // if the user is making a selection; e.g., we synthesize a selection
        // around the “key/value” pair not because there’s a node there, but
        // because it allows the mapped type to become an object type with a
        // few keystrokes.
        if (isMappedTypeNode(node)) {
            const [openBraceToken, ...children] = node.getChildren();
            const closeBraceToken = Debug.assertDefined(children.pop());
            Debug.assertEqual(openBraceToken.kind, SyntaxKind.OpenBraceToken);
            Debug.assertEqual(closeBraceToken.kind, SyntaxKind.CloseBraceToken);
            const [leftOfColon, ...rest] = splitChildren(children, child => child.kind === SyntaxKind.ColonToken);
            // Group `-/+readonly` and `-/+?`
            const leftChildren = groupChildren(getChildrenOrSingleNode(leftOfColon), child =>
                child === node.readonlyToken || child.kind === SyntaxKind.ReadonlyKeyword ||
                child === node.questionToken || child.kind === SyntaxKind.QuestionToken);
            return [
                openBraceToken,
                createSyntaxList([
                    // Group type parameter with surrounding brackets
                    createSyntaxList(groupChildren(leftChildren, ({ kind }) =>
                        kind === SyntaxKind.OpenBracketToken ||
                        kind === SyntaxKind.TypeParameter ||
                        kind === SyntaxKind.CloseBracketToken
                    )),
                    ...rest,
                ]),
                closeBraceToken,
            ];
        }

        // Split e.g. `readonly foo?: string` into left and right sides of the colon,
        // the group `readonly foo` without the QuestionToken.
        if (isPropertySignature(node)) {
            const [leftOfColon, ...rest] = splitChildren(node.getChildren(), child => child.kind === SyntaxKind.ColonToken);
            return [
                createSyntaxList(groupChildren(getChildrenOrSingleNode(leftOfColon), child => child !== node.questionToken)),
                ...rest,
            ];
        }

        return node.getChildren();
    }

    /**
     * Groups sibling nodes together into their own SyntaxList if they
     * a) are adjacent, AND b) match a predicate function.
     */
    function groupChildren(children: Node[], groupOn: (child: Node) => boolean): Node[] {
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
    function splitChildren(children: Node[], pivotOn: (child: Node) => boolean, separateTrailingSemicolon = true): Node[] {
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

    function getChildrenOrSingleNode(node: Node): Node[] {
        return isSyntaxList(node) ? node.getChildren() : [node];
    }

    function createSyntaxList(children: Node[]): SyntaxList {
        Debug.assertGreaterThanOrEqual(children.length, 1);
        const syntaxList = createNode(SyntaxKind.SyntaxList, children[0].pos, last(children).end) as SyntaxList;
        syntaxList._children = children;
        return syntaxList;
    }
}
