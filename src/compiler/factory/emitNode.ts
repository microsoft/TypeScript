namespace ts {
    /**
     * Associates a node with the current transformation, initializing
     * various transient transformation properties.
     * @internal
     */
    export function getOrCreateEmitNode(node: Node): EmitNode {
        if (!node.emitNode) {
            if (isParseTreeNode(node)) {
                // To avoid holding onto transformation artifacts, we keep track of any
                // parse tree node we are annotating. This allows us to clean them up after
                // all transformations have completed.
                if (node.kind === SyntaxKind.SourceFile) {
                    return node.emitNode = { annotatedNodes: [node] } as EmitNode;
                }

                const sourceFile = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node))) ?? Debug.fail("Could not determine parsed source file.");
                getOrCreateEmitNode(sourceFile).annotatedNodes!.push(node);
            }

            node.emitNode = {} as EmitNode;
        }

        return node.emitNode;
    }

    /**
     * Clears any `EmitNode` entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    export function disposeEmitNodes(sourceFile: SourceFile | undefined) {
        // During transformation we may need to annotate a parse tree node with transient
        // transformation properties. As parse tree nodes live longer than transformation
        // nodes, we need to make sure we reclaim any memory allocated for custom ranges
        // from these nodes to ensure we do not hold onto entire subtrees just for position
        // information. We also need to reset these nodes to a pre-transformation state
        // for incremental parsing scenarios so that we do not impact later emit.
        const annotatedNodes = getSourceFileOfNode(getParseTreeNode(sourceFile))?.emitNode?.annotatedNodes;
        if (annotatedNodes) {
            for (const node of annotatedNodes) {
                node.emitNode = undefined;
            }
        }
    }

    /**
     * Sets `EmitFlags.NoComments` on a node and removes any leading and trailing synthetic comments.
     * @internal
     */
    export function removeAllComments<T extends Node>(node: T): T {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.flags |= EmitFlags.NoComments;
        emitNode.leadingComments = undefined;
        emitNode.trailingComments = undefined;
        return node;
    }

    /**
     * Sets flags that control emit behavior of a node.
     */
    export function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        getOrCreateEmitNode(node).flags = emitFlags;
        return node;
    }

    /**
     * Sets flags that control emit behavior of a node.
     */
    /* @internal */
    export function addEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.flags = emitNode.flags | emitFlags;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting source maps.
     */
    export function getSourceMapRange(node: Node): SourceMapRange {
        return node.emitNode?.sourceMapRange ?? node;
    }

    /**
     * Sets a custom text range to use when emitting source maps.
     */
    export function setSourceMapRange<T extends Node>(node: T, range: SourceMapRange | undefined) {
        getOrCreateEmitNode(node).sourceMapRange = range;
        return node;
    }

    /**
     * Gets the TextRange to use for source maps for a token of a node.
     */
    export function getTokenSourceMapRange(node: Node, token: SyntaxKind): SourceMapRange | undefined {
        return node.emitNode?.tokenSourceMapRanges?.[token];
    }

    /**
     * Sets the TextRange to use for source maps for a token of a node.
     */
    export function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: SourceMapRange | undefined) {
        const emitNode = getOrCreateEmitNode(node);
        const tokenSourceMapRanges = emitNode.tokenSourceMapRanges ?? (emitNode.tokenSourceMapRanges = []);
        tokenSourceMapRanges[token] = range;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     */
    /*@internal*/
    export function getStartsOnNewLine(node: Node) {
        return node.emitNode?.startsOnNewLine;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    /*@internal*/
    export function setStartsOnNewLine<T extends Node>(node: T, newLine: boolean) {
        getOrCreateEmitNode(node).startsOnNewLine = newLine;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     */
    export function getCommentRange(node: Node) {
        return node.emitNode?.commentRange ?? node;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    export function setCommentRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).commentRange = range;
        return node;
    }

    export function getSyntheticLeadingComments(node: Node): SynthesizedComment[] | undefined {
        return node.emitNode?.leadingComments;
    }

    export function setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined) {
        getOrCreateEmitNode(node).leadingComments = comments;
        return node;
    }

    export function addSyntheticLeadingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean) {
        return setSyntheticLeadingComments(node, append<SynthesizedComment>(getSyntheticLeadingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
    }

    export function getSyntheticTrailingComments(node: Node): SynthesizedComment[] | undefined {
        return node.emitNode?.trailingComments;
    }

    export function setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined) {
        getOrCreateEmitNode(node).trailingComments = comments;
        return node;
    }

    export function addSyntheticTrailingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean) {
        return setSyntheticTrailingComments(node, append<SynthesizedComment>(getSyntheticTrailingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
    }

    export function moveSyntheticComments<T extends Node>(node: T, original: Node): T {
        setSyntheticLeadingComments(node, getSyntheticLeadingComments(original));
        setSyntheticTrailingComments(node, getSyntheticTrailingComments(original));
        const emit = getOrCreateEmitNode(original);
        emit.leadingComments = undefined;
        emit.trailingComments = undefined;
        return node;
    }

    /**
     * Gets the constant value to emit for an expression representing an enum.
     */
    export function getConstantValue(node: AccessExpression): string | number | undefined {
        return node.emitNode?.constantValue;
    }

    /**
     * Sets the constant value to emit for an expression.
     */
    export function setConstantValue(node: AccessExpression, value: string | number): AccessExpression {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.constantValue = value;
        return node;
    }

    /**
     * Adds an EmitHelper to a node.
     */
    export function addEmitHelper<T extends Node>(node: T, helper: EmitHelper): T {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.helperRequests = append(emitNode.helperRequests, { helper, directlyUsed: true });
        return node;
    }

    /** @internal */
    export function addEmitHelperRequests<T extends Node>(node: T, requests: EmitHelperRequest[] | undefined): T {
        if (some(requests)) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.helperRequests = emitNode.helperRequests ?? [];
            for (const request of requests) {
                const foundRequestIndex: number = findIndex(emitNode.helperRequests, existingRequest => existingRequest.helper === request.helper);
                if (foundRequestIndex === -1) {
                    emitNode.helperRequests = append(emitNode.helperRequests, request);
                }
                else {
                    emitNode.helperRequests = replaceElement(emitNode.helperRequests, foundRequestIndex, {
                        ...emitNode.helperRequests[foundRequestIndex],
                        directlyUsed: emitNode.helperRequests[foundRequestIndex].directlyUsed || request.directlyUsed
                    });
                }
            }
        }
        return node;
    }

    /**
     * Add EmitHelpers to a node.
     */
    export function addEmitHelpers<T extends Node>(node: T, helpers: EmitHelper[] | undefined): T {
        if (some(helpers)) {
            return addEmitHelperRequests(node, helpers.map(helper => ({ helper, directlyUsed: true })));
        }
        return node;
    }

    /**
     * Removes an EmitHelper from a node.
     */
    export function removeEmitHelper(node: Node, helper: EmitHelper): boolean {
        const helperRequests = node.emitNode?.helperRequests;
        if (helperRequests) {
            const foundRequestIndex = findIndex(helperRequests, request => request.helper === helper);
            if (foundRequestIndex === -1) {
                return false;
            }
            orderedRemoveItemAt(helperRequests, foundRequestIndex);
            return true;
        }
        return false;
    }

    /**
     * Gets the EmitHelpers of a node.
     */
    export function getEmitHelpers(node: Node, directlyUsedOnly = false): EmitHelper[] | undefined {
        return node.emitNode?.helperRequests?.filter(request => !directlyUsedOnly || request.directlyUsed).map(request => request.helper);
    }

    /**
     * Moves matching emit helpers from a source node to a target node.
     */
    export function moveEmitHelpers(source: Node, target: Node, predicate: (helper: EmitHelper) => boolean) {
        const sourceEmitNode = source.emitNode;
        const sourceEmitHelperRequests = sourceEmitNode && sourceEmitNode.helperRequests;
        if (!some(sourceEmitHelperRequests)) return;

        const targetEmitNode = getOrCreateEmitNode(target);
        targetEmitNode.helperRequests = targetEmitNode.helperRequests ?? [];
        let requestsRemoved = 0;
        for (let i = 0; i < sourceEmitHelperRequests.length; i++) {
            const request = sourceEmitHelperRequests[i];
            if (predicate(request.helper)) {
                requestsRemoved++;
                const foundRequestIndex: number = findIndex(targetEmitNode.helperRequests, targetRequest => request.helper === targetRequest.helper);
                if (foundRequestIndex === -1) {
                    targetEmitNode.helperRequests = append(targetEmitNode.helperRequests, request);
                }
                else {
                    targetEmitNode.helperRequests = replaceElement(targetEmitNode.helperRequests, foundRequestIndex, {
                        ...targetEmitNode.helperRequests[foundRequestIndex],
                        directlyUsed: request.directlyUsed || targetEmitNode.helperRequests[foundRequestIndex].directlyUsed
                    });
                }
            }
            else if (requestsRemoved > 0) {
                sourceEmitHelperRequests[i - requestsRemoved] = request;
            }
        }

        if (requestsRemoved > 0) {
            sourceEmitHelperRequests.length -= requestsRemoved;
        }
    }

    /* @internal */
    export function ignoreSourceNewlines<T extends Node>(node: T): T {
        getOrCreateEmitNode(node).flags |= EmitFlags.IgnoreSourceNewlines;
        return node;
    }
}
