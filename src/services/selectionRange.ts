/* @internal */
namespace ts.SelectionRange {
    const isImport = or(isImportDeclaration, isImportEqualsDeclaration);

    export function getSelectionRange(pos: number, sourceFile: SourceFile): SelectionRange {
        let selectionRange: SelectionRange = {
            textSpan: createTextSpanFromBounds(sourceFile.getFullStart(), sourceFile.getEnd())
        };

        // Skip top-level SyntaxList
        let parentNode = sourceFile.getChildAt(0);
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
                    // Synthesize a stop for group of adjacent imports
                    else if (isImport(node)) {
                        const [firstImportIndex, lastImportIndex] = getGroupBounds(children, i, isImport);
                        pushSelectionRange(
                            children[firstImportIndex].getStart(),
                            children[lastImportIndex].getEnd());
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

    function getSelectionChildren(node: Node): ReadonlyArray<Node> {
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
            const colonTokenIndex = findIndex(children, child => child.kind === SyntaxKind.ColonToken);
            const typeNodeIndex = node.type && children.indexOf(node.type);
            const leftChildren = children.slice(0, colonTokenIndex);
            const colonToken = Debug.assertDefined(children[colonTokenIndex]);
            const rightChildren = children.slice(colonTokenIndex + 1, typeNodeIndex && (typeNodeIndex + 1));
            // Possible semicolon
            const extraChildren = typeNodeIndex && typeNodeIndex > -1 ? children.slice(typeNodeIndex + 1) : [];
            const syntaxList = createSyntaxList([
                createSyntaxList(leftChildren),
                colonToken,
                createSyntaxList(rightChildren),
                createSyntaxList(extraChildren),
            ]);
            return [
                openBraceToken,
                syntaxList,
                closeBraceToken,
            ];
        }
        return node.getChildren();
    }

    function createSyntaxList(children: Node[]): SyntaxList {
        Debug.assertGreaterThanOrEqual(children.length, 1);
        const syntaxList = createNode(SyntaxKind.SyntaxList, children[0].pos, last(children).end) as SyntaxList;
        syntaxList._children = children;
        return syntaxList;
    }

    function getGroupBounds<T>(array: ArrayLike<T>, index: number, predicate: (element: T) => boolean): [number, number] {
        let first = index;
        let last = index;
        let i = index;
        while (i > 0) {
            const element = array[--i];
            if (predicate(element)) {
                first = i;
            }
            else {
                break;
            }
        }
        i = index;
        while (i < array.length - 1) {
            const element = array[++i];
            if (predicate(element)) {
                last = i;
            }
            else {
                break;
            }
        }
        return [first, last];
    }
}
