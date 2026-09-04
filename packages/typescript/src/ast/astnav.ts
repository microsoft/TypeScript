import { NodeFlags } from "#enums/nodeFlags";
import { SyntaxKind } from "#enums/syntaxKind";
import type { TokenSyntaxKind } from "./ast.generated.ts";
import type {
    Node,
    NodeArray,
    SourceFile,
} from "./ast.ts";
import {
    createSyntaxList,
    createToken,
} from "./factory.generated.ts";
import {
    isJSDocNodeKind,
    isKeywordKind,
    isPrivateIdentifier,
    isPropertyNameLiteral,
    isTokenKind,
} from "./is.ts";
import type { Scanner } from "./scanner.ts";
import {
    createScanner,
    skipTrivia,
} from "./scanner.ts";

export function getTokenAtPosition(sourceFile: SourceFile, position: number): Node {
    return getTokenAtPositionImpl(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includePrecedingTokenAtEndPosition*/ undefined);
}

export function getTouchingPropertyName(sourceFile: SourceFile, position: number): Node {
    return getTokenAtPositionImpl(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, node => isPropertyNameLiteral(node) || isKeywordKind(node.kind) || isPrivateIdentifier(node));
}

export function getTouchingToken(sourceFile: SourceFile, position: number): Node {
    return getTokenAtPositionImpl(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, /*includePrecedingTokenAtEndPosition*/ undefined);
}

/**
 * Finds the token that starts immediately after `previousToken` ends, searching
 * within `parent`.  Returns `undefined` if no such token exists.
 */
export function findNextToken(previousToken: Node, parent: Node, sourceFile: SourceFile): Node | undefined {
    return find(parent);

    function find(n: Node): Node | undefined {
        if (isTokenKind(n.kind) && n.pos === previousToken.end) {
            // This is the token that starts at the end of previousToken – return it.
            return n;
        }

        // Find the child node that contains `previousToken` or starts immediately after it.
        let foundNode: Node | undefined;

        const visitChild = (node: Node) => {
            if (node.flags & NodeFlags.Reparsed) {
                return undefined;
            }
            if (node.pos <= previousToken.end && node.end > previousToken.end) {
                foundNode = node;
            }
            return undefined;
        };

        // Visit JSDoc children first (mirrors Go's VisitEachChildAndJSDoc).
        if (n.jsDoc) {
            for (const jsdoc of n.jsDoc) {
                visitChild(jsdoc);
            }
        }

        n.forEachChild(
            visitChild,
            nodes => {
                if (nodes.length > 0 && foundNode === undefined) {
                    for (const node of nodes) {
                        if (node.flags & NodeFlags.Reparsed) continue;
                        if (node.pos > previousToken.end) break;
                        if (node.end > previousToken.end) {
                            foundNode = node;
                            break;
                        }
                    }
                }
                return undefined;
            },
        );

        // Recurse into the found child.
        if (foundNode !== undefined) {
            return find(foundNode);
        }

        // No AST child covers the position; use the scanner to find the syntactic token.
        // The scanner is initialized at `previousToken.end`, so tokenFullStart === previousToken.end.
        const startPos = previousToken.end;
        if (startPos >= n.pos && startPos < n.end) {
            const scanner = getScannerForSourceFile(sourceFile, startPos);
            const token = scanner.getToken();
            const tokenFullStart = scanner.getTokenFullStart();
            const tokenEnd = scanner.getTokenEnd();
            const flags = scanner.getTokenFlags();
            return getOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags);
        }

        return undefined;
    }
}

/**
 * Finds the leftmost token satisfying `position < token.end`.
 * If the position is in the trivia of that leftmost token, or the token is invalid,
 * returns the rightmost valid token with `token.end <= position`.
 * Excludes `JsxText` tokens containing only whitespace.
 */
export function findPrecedingToken(sourceFile: SourceFile, position: number): Node | undefined {
    return findPrecedingTokenImpl(sourceFile, position, sourceFile);
}

function getTokenAtPositionImpl(
    sourceFile: SourceFile,
    position: number,
    allowPositionInLeadingTrivia: boolean,
    includePrecedingTokenAtEndPosition: ((node: Node) => boolean) | undefined,
): Node {
    let current: Node = sourceFile;
    let nodeAfterLeft: Node | undefined;
    const state: {
        next: Node | undefined;
        prevSubtree: Node | undefined;
        left: number;
    } = {
        next: undefined,
        prevSubtree: undefined,
        left: 0,
    };

    const getIncludedPrecedingToken = (subtree: Node): Node | undefined => {
        const child = findPrecedingTokenImpl(sourceFile, position, subtree);
        if (child !== undefined && child.end === position && includePrecedingTokenAtEndPosition!(child)) {
            return child;
        }
        return undefined;
    };

    const testNode = (node: Node): number => {
        if (node.kind !== SyntaxKind.EndOfFile && node.end === position && includePrecedingTokenAtEndPosition !== undefined) {
            if (state.prevSubtree !== undefined && getIncludedPrecedingToken(state.prevSubtree) !== undefined) {
                return 0;
            }
            state.prevSubtree = node;
        }
        // A node "contains" the position if position < end, except nodes at the file end
        // treat end as inclusive (there's nowhere else to look). This applies to the EOF
        // token itself, and to JSDoc nodes reaching EOF (e.g. unterminated JSDoc comments).
        if (
            node.end < position || node.end === position &&
                node.kind !== SyntaxKind.EndOfFile &&
                (!isJSDocNodeKind(node.kind) || node.end !== sourceFile.endOfFileToken.end)
        ) {
            return -1;
        }
        const nodePos = getPosition(node, sourceFile, allowPositionInLeadingTrivia);
        if (nodePos > position) {
            return 1;
        }
        return 0;
    };

    while (true) {
        // Visit each child of current to find the one containing the position.
        state.next = undefined;
        nodeAfterLeft = undefined as Node | undefined;

        // In Strada, JSDoc nodes with a single comment represent that comment as a string
        // property (not a child node), so forEachChild does not visit it. We replicate this
        // by detecting single-comment NodeLists in visitList and skipping their elements in visitNode.
        let skipSingleCommentChildren = false;

        const visitNode = (node: Node) => {
            if (node.flags & NodeFlags.Reparsed) {
                return undefined;
            }
            if (skipSingleCommentChildren && isJSDocCommentChildKind(node.kind)) {
                return undefined;
            }
            if (nodeAfterLeft === undefined) {
                nodeAfterLeft = node;
            }
            if (state.next === undefined) {
                const result = testNode(node);
                switch (result) {
                    case -1:
                        if (!isJSDocNodeKind(node.kind)) {
                            state.left = node.end;
                        }
                        nodeAfterLeft = undefined;
                        break;
                    case 0:
                        state.next = node;
                        break;
                }
            }
            return undefined;
        };

        // Visit JSDoc children first, then regular children (mirrors Go's VisitEachChildAndJSDoc).
        if (current.jsDoc) {
            for (const jsdoc of current.jsDoc) {
                visitNode(jsdoc);
            }
        }

        current.forEachChild(
            visitNode,
            nodes => {
                // Track whether this NodeList is a single-comment list that should be skipped.
                // The flag affects the subsequent forEachNode(visitNode) calls for this NodeList.
                skipSingleCommentChildren = isJSDocSingleCommentNodeList(nodes);
                if (nodes.length === 0 || skipSingleCommentChildren) {
                    return undefined;
                }
                if (nodeAfterLeft === undefined) {
                    for (const node of nodes) {
                        if (!(node.flags & NodeFlags.Reparsed)) {
                            nodeAfterLeft = node;
                            break;
                        }
                    }
                }
                if (state.next === undefined) {
                    if (nodes.end === position && includePrecedingTokenAtEndPosition !== undefined) {
                        state.left = nodes.end;
                        nodeAfterLeft = undefined;
                        state.prevSubtree = nodes[nodes.length - 1];
                    }
                    else if (nodes.end <= position) {
                        state.left = nodes.end;
                        nodeAfterLeft = undefined;
                    }
                    else if (nodes.pos <= position) {
                        binarySearchNodeList(nodes, testNode, (node, middle, arr) => {
                            state.left = node.end;
                            nodeAfterLeft = undefined;
                            for (let i = middle + 1; i < arr.length; i++) {
                                if (!(arr[i].flags & NodeFlags.Reparsed)) {
                                    nodeAfterLeft = arr[i];
                                    break;
                                }
                            }
                        }, found => {
                            state.next = found;
                        });
                    }
                }
                return undefined;
            },
        );

        // If prevSubtree was set, check if the rightmost token of prevSubtree should be returned.
        if (state.prevSubtree !== undefined) {
            const child = getIncludedPrecedingToken(state.prevSubtree);
            if (child !== undefined) {
                return child;
            }
            state.prevSubtree = undefined;
        }

        if (state.next === undefined) {
            if (isTokenKind(current.kind) || shouldSkipChild(current)) {
                return current;
            }
            // Use the scanner to find a token not stored in the AST.
            const scanner = getScannerForSourceFile(sourceFile, state.left);
            let end = current.end;
            const afterLeft = nodeAfterLeft;
            if (afterLeft !== undefined) {
                end = afterLeft.pos;
            }
            while (state.left < end) {
                const token = scanner.getToken();
                const tokenFullStart = scanner.getTokenFullStart();
                const tokenStart = allowPositionInLeadingTrivia ? tokenFullStart : scanner.getTokenStart();
                const tokenEnd = scanner.getTokenEnd();
                const flags = scanner.getTokenFlags();
                if (tokenEnd > end) {
                    break;
                }
                if (tokenStart <= position && position < tokenEnd) {
                    if (token === SyntaxKind.Identifier || !isTokenKind(token)) {
                        if (isJSDocNodeKind(current.kind)) {
                            return current;
                        }
                        throw new Error(`did not expect ${SyntaxKind[current.kind]} to have ${SyntaxKind[token]} in its trivia`);
                    }
                    return getOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
                }
                if (includePrecedingTokenAtEndPosition !== undefined && tokenEnd === position) {
                    const prevToken = getOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
                    if (includePrecedingTokenAtEndPosition(prevToken)) {
                        return prevToken;
                    }
                }
                state.left = tokenEnd;
                scanner.scan();
            }
            return current;
        }

        current = state.next;
        state.left = current.pos;
        nodeAfterLeft = undefined;
    }
}

function getPosition(node: Node, sourceFile: SourceFile, allowPositionInLeadingTrivia: boolean): number {
    if (allowPositionInLeadingTrivia) {
        return node.pos;
    }
    return getTokenPosOfNode(node, sourceFile, /*includeJSDoc*/ true);
}

/** @internal */
export function getTokenPosOfNode(node: Node, sourceFile: SourceFile, includeJSDoc?: boolean): number {
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    }
    if (isJSDocNodeKind(node.kind) || node.kind === SyntaxKind.JsxText) {
        return skipTrivia(sourceFile.text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }
    if (includeJSDoc && node.jsDoc && node.jsDoc.length > 0) {
        return getTokenPosOfNode(node.jsDoc[0], sourceFile, /*includeJSDoc*/ false);
    }
    return skipTrivia(sourceFile.text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ false, /*inJSDoc*/ !!(node.flags & NodeFlags.JSDoc));
}

function nodeIsMissing(node: Node): boolean {
    return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFile;
}

function findPrecedingTokenImpl(sourceFile: SourceFile, position: number, startNode: Node): Node | undefined {
    const find = (n: Node): Node | undefined => {
        if (isTokenKind(n.kind) && n.kind !== SyntaxKind.EndOfFile) {
            return n;
        }

        let foundChild: Node | undefined;
        let prevChild: Node | undefined;

        // Visit JSDoc nodes first (mirrors Go's VisitEachChildAndJSDoc).
        if (n.jsDoc) {
            for (const jsdoc of n.jsDoc) {
                if (jsdoc.flags & NodeFlags.Reparsed) continue;
                if (foundChild !== undefined) break;
                if (position < jsdoc.end && (prevChild === undefined || prevChild.end <= position)) {
                    foundChild = jsdoc;
                }
                else {
                    prevChild = jsdoc;
                }
            }
        }

        let skipSingleCommentChildrenImpl = false;
        n.forEachChild(
            node => {
                if (node.flags & NodeFlags.Reparsed) {
                    return undefined;
                }
                if (skipSingleCommentChildrenImpl && isJSDocCommentChildKind(node.kind)) {
                    return undefined;
                }
                if (foundChild !== undefined) {
                    return undefined;
                }
                if (position < node.end && (prevChild === undefined || prevChild.end <= position)) {
                    foundChild = node;
                }
                else {
                    prevChild = node;
                }
                return undefined;
            },
            nodes => {
                skipSingleCommentChildrenImpl = isJSDocSingleCommentNodeList(nodes);
                if (foundChild !== undefined) {
                    return undefined;
                }
                if (nodes.length > 0 && !skipSingleCommentChildrenImpl) {
                    const index = binarySearchForPrecedingToken(nodes, position);
                    if (index >= 0 && !(nodes[index].flags & NodeFlags.Reparsed)) {
                        foundChild = nodes[index];
                    }
                    const lookupIndex = index >= 0 ? index - 1 : nodes.length - 1;
                    for (let i = lookupIndex; i >= 0; i--) {
                        if (!(nodes[i].flags & NodeFlags.Reparsed)) {
                            if (prevChild === undefined) {
                                prevChild = nodes[i];
                            }
                            break;
                        }
                    }
                }
                return undefined;
            },
        );

        if (foundChild !== undefined) {
            const start = getTokenPosOfNode(foundChild, sourceFile, /*includeJSDoc*/ true);
            if (start >= position) {
                if (position >= foundChild.pos) {
                    // We are in the leading trivia of foundChild. Check for JSDoc nodes of n
                    // preceding foundChild, mirroring Go's findPrecedingToken logic.
                    let jsDoc: Node | undefined;
                    if (n.jsDoc) {
                        for (let i = n.jsDoc.length - 1; i >= 0; i--) {
                            if (n.jsDoc[i].pos >= foundChild.pos) {
                                jsDoc = n.jsDoc[i];
                                break;
                            }
                        }
                    }
                    if (jsDoc !== undefined) {
                        if (position < jsDoc.end) {
                            return find(jsDoc);
                        }
                        return findRightmostValidToken(sourceFile, jsDoc.end, n, position);
                    }
                    return findRightmostValidToken(sourceFile, foundChild.pos, n, -1);
                }
                // Answer is in tokens between two visited children.
                return findRightmostValidToken(sourceFile, foundChild.pos, n, position);
            }
            return find(foundChild);
        }

        if (position >= n.end) {
            return findRightmostValidToken(sourceFile, n.end, n, -1);
        }
        return findRightmostValidToken(sourceFile, n.end, n, position);
    };

    return find(startNode);
}

function findRightmostValidToken(sourceFile: SourceFile, endPos: number, containingNode: Node, position: number): Node | undefined {
    if (position === -1) {
        position = containingNode.end;
    }

    const find = (n: Node, endPos: number): Node | undefined => {
        if (isTokenKind(n.kind) && n.kind !== SyntaxKind.EndOfFile) {
            return n;
        }

        let rightmostValidNode: Node | undefined;
        let hasChildren = false;

        // Visit JSDoc nodes first (mirrors Go's VisitEachChildAndJSDoc).
        if (n.jsDoc) {
            hasChildren = true;
            for (const jsdoc of n.jsDoc) {
                if (jsdoc.flags & NodeFlags.Reparsed) continue;
                if (jsdoc.end > endPos || getTokenPosOfNode(jsdoc, sourceFile) >= position) continue;
                if (isValidPrecedingNode(jsdoc, sourceFile)) {
                    rightmostValidNode = jsdoc;
                }
            }
        }

        let skipSingleCommentChildren = false;
        n.forEachChild(
            node => {
                if (node.flags & NodeFlags.Reparsed) {
                    return undefined;
                }
                if (skipSingleCommentChildren && isJSDocCommentChildKind(node.kind)) {
                    return undefined;
                }
                hasChildren = true;
                if (node.end > endPos || getTokenPosOfNode(node, sourceFile) >= position) {
                    return undefined;
                }
                if (isValidPrecedingNode(node, sourceFile)) {
                    rightmostValidNode = node;
                }
                return undefined;
            },
            nodes => {
                // Skip single-comment JSDoc NodeLists (e.g. JSDocText children of a JSDoc node):
                // In Go, these are stored as string properties and are never visited as children.
                skipSingleCommentChildren = isJSDocSingleCommentNodeList(nodes);
                if (nodes.length > 0 && !skipSingleCommentChildren) {
                    hasChildren = true;
                    for (let i = nodes.length - 1; i >= 0; i--) {
                        const node = nodes[i];
                        if (node.flags & NodeFlags.Reparsed) continue;
                        if (node.end > endPos || getTokenPosOfNode(node, sourceFile) >= position) continue;
                        if (isValidPrecedingNode(node, sourceFile)) {
                            rightmostValidNode = node;
                            break;
                        }
                    }
                }
                return undefined;
            },
        );

        // Scan for syntactic tokens (e.g. `{`, `,`) between AST nodes, matching Go's
        // findRightmostValidToken scanner step.
        if (!shouldSkipChild(n)) {
            const startPos = rightmostValidNode !== undefined ? rightmostValidNode.end : n.pos;
            const targetEnd = Math.min(endPos, position);
            if (startPos < targetEnd) {
                const scanner = getScannerForSourceFile(sourceFile, startPos);
                let pos = startPos;
                let lastScannedToken: Node | undefined;
                while (pos < targetEnd) {
                    const tokenStart = scanner.getTokenStart();
                    if (tokenStart >= position) break;
                    const tokenFullStart = scanner.getTokenFullStart();
                    const tokenEnd = scanner.getTokenEnd();
                    const token = scanner.getToken();
                    const flags = scanner.getTokenFlags();
                    lastScannedToken = getOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags);
                    pos = tokenEnd;
                    scanner.scan();
                }
                if (lastScannedToken !== undefined) {
                    return lastScannedToken;
                }
            }
        }

        if (!hasChildren) {
            if (n !== containingNode) {
                return n;
            }
            return undefined;
        }

        if (rightmostValidNode !== undefined) {
            return find(rightmostValidNode, rightmostValidNode.end);
        }
        return undefined;
    };

    return find(containingNode, endPos);
}

function isValidPrecedingNode(node: Node, sourceFile: SourceFile): boolean {
    if (node.kind === SyntaxKind.EndOfFile) {
        return false;
    }
    const start = getTokenPosOfNode(node, sourceFile);
    const width = node.end - start;
    return width > 0;
}

function shouldSkipChild(node: Node): boolean {
    return node.kind === SyntaxKind.JSDoc ||
        node.kind === SyntaxKind.JSDocText ||
        node.kind === SyntaxKind.JSDocTypeLiteral ||
        node.kind === SyntaxKind.JSDocSignature ||
        node.kind === SyntaxKind.JSDocLink ||
        node.kind === SyntaxKind.JSDocLinkCode ||
        node.kind === SyntaxKind.JSDocLinkPlain ||
        isJSDocTag(node);
}

function isJSDocTag(node: Node): boolean {
    return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
}

// In Strada, if a JSDoc node has a single comment, that comment is represented as a string
// property as a simplification, and therefore that comment is not visited by forEachChild.
// To match, we skip single-element comment NodeLists within JSDoc/JSDocTag nodes.
function isJSDocCommentChildKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.JSDocText:
        case SyntaxKind.JSDocLink:
        case SyntaxKind.JSDocLinkCode:
        case SyntaxKind.JSDocLinkPlain:
            return true;
        default:
            return false;
    }
}

function isJSDocSingleCommentNodeList(nodes: NodeArray<Node>): boolean {
    return nodes.length === 1 && isJSDocCommentChildKind(nodes[0].kind);
}

function getScannerForSourceFile(sourceFile: SourceFile, pos: number) {
    const scanner = createScanner(/*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text);
    scanner.resetTokenState(pos);
    scanner.scan();
    return scanner;
}

type Mutable<T> = { -readonly [K in keyof T]: T[K]; };

function getOrCreateToken(sourceFile: SourceFile, kind: SyntaxKind, pos: number, end: number, parent: Node, _flags: number): Node {
    const key = `${pos}_${end}`;
    if (!sourceFile.tokenCache) {
        sourceFile.tokenCache = new Map<string, Node>();
    }

    const existing = sourceFile.tokenCache.get(key);
    if (existing !== undefined) {
        return existing;
    }

    const token: Mutable<Node> = createToken(kind as TokenSyntaxKind);
    token.pos = pos;
    token.end = end;
    token.parent = parent;
    sourceFile.tokenCache.set(key, token);
    return token;
}

const emptyArray: readonly Node[] = [];

function assertHasRealPosition(node: Node): void {
    if (node.pos < 0 || node.end < 0) {
        throw new Error("Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine");
    }
}

export function getChildren(node: Node, sourceFile: SourceFile = node.getSourceFile()): readonly Node[] {
    // A SyntaxList already holds its (pre-materialized) children.
    if (node.kind === SyntaxKind.SyntaxList) {
        return (node as unknown as { children: readonly Node[]; }).children;
    }

    if (isTokenKind(node.kind)) {
        // EndOfFile may carry leading JSDoc; every other token has no children. The EndOfFile
        // result must go through the cache: remote nodes rebuild .jsDoc on every access.
        if (node.kind !== SyntaxKind.EndOfFile) {
            return emptyArray;
        }
    }
    else {
        assertHasRealPosition(node);
    }

    const cache = (sourceFile.childrenCache ??= new Map<Node, readonly Node[]>());
    const cached = cache.get(node);

    if (cached !== undefined) {
        return cached;
    }

    const children = node.kind === SyntaxKind.EndOfFile
        ? node.jsDoc ?? emptyArray
        : createChildren(node, sourceFile);
    cache.set(node, children);
    return children;
}

function createChildren(node: Node, sourceFile: SourceFile): readonly Node[] {
    const children: Node[] = [];

    // Inside a JSDoc comment there are no real tokens to synthesize.
    if (shouldSkipChild(node)) {
        node.forEachChild(child => void children.push(child));
        return children;
    }

    // One scanner serves every run of synthetic tokens materialized for this node.
    const scanner = createScanner(/*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text);
    let pos = node.pos;
    const processNode = (child: Node): undefined => {
        // Reparsed subtrees (JSDoc types materialized into the AST) have positions inside
        // the comment, not in this node's token range.
        if (child.flags & NodeFlags.Reparsed) {
            return;
        }
        addSyntheticNodes(children, pos, child.pos, node, sourceFile, scanner);
        children.push(child);
        pos = child.end;
    };
    const processNodes = (nodes: NodeArray<Node>): undefined => {
        if (nodes.length > 0 && !nodes.some(child => !(child.flags & NodeFlags.Reparsed))) {
            return;
        }
        addSyntheticNodes(children, pos, nodes.pos, node, sourceFile, scanner);
        children.push(createSyntaxListNode(nodes, node, sourceFile, scanner));
        pos = nodes.end;
    };

    // JSDoc attached to the node is leading content, processed first.
    if (node.jsDoc) {
        for (const jsDoc of node.jsDoc) {
            processNode(jsDoc);
        }
    }
    pos = node.pos;
    node.forEachChild(processNode, processNodes);
    addSyntheticNodes(children, pos, node.end, node, sourceFile, scanner);
    return children;
}

function addSyntheticNodes(children: Node[], pos: number, end: number, parent: Node, sourceFile: SourceFile, scanner: Scanner): void {
    if (pos >= end) {
        return;
    }
    scanner.resetTokenState(pos);
    scanner.scan();
    while (pos < end) {
        let token = scanner.getToken();
        let tokenEnd = scanner.getTokenEnd();
        if (token === SyntaxKind.LessThanLessThanToken && scanner.getTokenStart() < end && tokenEnd > end) {
            // The parser rescans `<<` as `<` when opening type arguments; mirror that split
            // when the combined token crosses the next AST child's boundary.
            token = scanner.reScanLessThanToken();
            tokenEnd = scanner.getTokenEnd();
        }
        if (tokenEnd <= end) {
            // An identifier should never appear as trivia between AST children; skip defensively.
            if (token !== SyntaxKind.Identifier) {
                children.push(getOrCreateToken(sourceFile, token, pos, tokenEnd, parent, scanner.getTokenFlags()));
            }
        }
        pos = tokenEnd;
        if (token === SyntaxKind.EndOfFile) {
            break;
        }
        scanner.scan();
    }
}

function createSyntaxListNode(nodes: NodeArray<Node>, parent: Node, sourceFile: SourceFile, scanner: Scanner): Node {
    const listChildren: Node[] = [];
    let pos = nodes.pos;
    for (const child of nodes) {
        if (child.flags & NodeFlags.Reparsed) {
            continue;
        }
        addSyntheticNodes(listChildren, pos, child.pos, parent, sourceFile, scanner);
        listChildren.push(child);
        pos = child.end;
    }
    addSyntheticNodes(listChildren, pos, nodes.end, parent, sourceFile, scanner);
    const list = createSyntaxList(listChildren) as Mutable<Node>;
    list.pos = nodes.pos;
    list.end = nodes.end;
    list.parent = parent;
    return list as Node;
}

export function getFirstToken(node: Node, sourceFile: SourceFile = node.getSourceFile()): Node | undefined {
    if (isTokenKind(node.kind)) {
        return undefined;
    }
    assertHasRealPosition(node);
    const children = getChildren(node, sourceFile);
    const child = children.find(kid => kid.kind < SyntaxKind.FirstJSDocNode || kid.kind > SyntaxKind.LastJSDocNode);
    if (child === undefined) {
        return undefined;
    }
    return child.kind < SyntaxKind.FirstNode ? child : getFirstToken(child, sourceFile);
}

export function getLastToken(node: Node, sourceFile: SourceFile = node.getSourceFile()): Node | undefined {
    if (isTokenKind(node.kind)) {
        return undefined;
    }
    assertHasRealPosition(node);
    const children = getChildren(node, sourceFile);
    const child = children.length ? children[children.length - 1] : undefined;
    if (child === undefined) {
        return undefined;
    }
    return child.kind < SyntaxKind.FirstNode ? child : getLastToken(child, sourceFile);
}

/** Binary search a node list for the node containing position. */
function binarySearchNodeList(
    nodes: NodeArray<Node>,
    testNode: (node: Node) => number,
    onLeft: (node: Node, index: number, arr: NodeArray<Node>) => void,
    onMatch: (node: Node) => void,
): void {
    let lo = 0;
    let hi = nodes.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const node = nodes[mid];
        if (node.flags & NodeFlags.Reparsed) {
            // Skip reparsed nodes: try to find a non-reparsed node nearby
            let found = false;
            for (let i = mid + 1; i <= hi; i++) {
                if (!(nodes[i].flags & NodeFlags.Reparsed)) {
                    const cmp = testNode(nodes[i]);
                    if (cmp < 0) {
                        onLeft(nodes[i], i, nodes);
                        lo = i + 1;
                    }
                    else if (cmp > 0) {
                        hi = i - 1;
                    }
                    else {
                        onMatch(nodes[i]);
                        return;
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                hi = mid - 1;
            }
            continue;
        }
        const cmp = testNode(node);
        if (cmp < 0) {
            onLeft(node, mid, nodes);
            lo = mid + 1;
        }
        else if (cmp > 0) {
            hi = mid - 1;
        }
        else {
            onMatch(node);
            return;
        }
    }
}

function binarySearchForPrecedingToken(nodes: NodeArray<Node>, position: number): number {
    let lo = 0;
    let hi = nodes.length - 1;
    let result = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const node = nodes[mid];
        if (node.flags & NodeFlags.Reparsed) {
            lo = mid + 1;
            continue;
        }
        if (position < node.end) {
            if (mid === 0 || position >= nodes[mid - 1].end) {
                result = mid;
                break;
            }
            hi = mid - 1;
        }
        else {
            lo = mid + 1;
        }
    }
    return result;
}
