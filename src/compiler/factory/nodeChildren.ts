import {
    AstNode,
    createScanner,
    Debug,
    emptyArray,
    forEach,
    forEachChild,
    getSourceFileOfNode,
    hasTabstop,
    isJSDocCommentContainingNode,
    isNodeKind,
    isTokenKind,
    JSDocContainer,
    Node,
    NodeArray,
    NodeFlags,
    Scanner,
    ScriptTarget,
    SourceFileLike,
    SyntaxKind,
    SyntaxList,
    TokenSyntaxKind,
} from "../_namespaces/ts.js";

const sourceFileToNodeChildren = new WeakMap<SourceFileLike, WeakMap<Node, readonly Node[] | undefined>>();

/** @internal */
export function getNodeChildren(node: Node, sourceFile: SourceFileLike): readonly Node[] | undefined {
    const kind = node.kind;
    if (!isNodeKind(kind)) {
        return emptyArray;
    }
    if (kind === SyntaxKind.SyntaxList) {
        return (node as SyntaxList)._children;
    }

    return sourceFileToNodeChildren.get(sourceFile)?.get(node);
}

/** @internal */
export function setNodeChildren(node: Node, sourceFile: SourceFileLike, children: readonly Node[]): readonly Node[] {
    if (node.kind === SyntaxKind.SyntaxList) {
        // SyntaxList children are always eagerly created in the process of
        // creating their parent's `children` list. We shouldn't need to set them here.
        Debug.fail("Should not need to re-set the children of a SyntaxList.");
    }

    let map = sourceFileToNodeChildren.get(sourceFile);
    if (map === undefined) {
        map = new WeakMap();
        sourceFileToNodeChildren.set(sourceFile, map);
    }
    map.set(node, children);
    return children;
}

/** @internal */
export function unsetNodeChildren(node: Node, origSourceFile: SourceFileLike): void {
    if (node.kind === SyntaxKind.SyntaxList) {
        // Syntax lists are synthesized and we store their children directly on them.
        // They are a special case where we expect incremental parsing to toss them away entirely
        // if a change intersects with their containing parents.
        Debug.fail("Did not expect to unset the children of a SyntaxList.");
    }
    sourceFileToNodeChildren.get(origSourceFile)?.delete(node);
}

/** @internal */
export function transferSourceFileChildren(sourceFile: SourceFileLike, targetSourceFile: SourceFileLike): void {
    const map = sourceFileToNodeChildren.get(sourceFile);
    if (map !== undefined) {
        sourceFileToNodeChildren.delete(sourceFile);
        sourceFileToNodeChildren.set(targetSourceFile, map);
    }
}


// copied form services/services.ts
let _scanner: Scanner | undefined;

function scanner() {
    _scanner ??= createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);
    return _scanner;
}

/** @internal */
export function createChildren(node: Node, sourceFile: SourceFileLike | undefined): readonly Node[] {
    const children: Node[] = [];

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        forEachChild(node, child => {
            children.push(child);
        });
        return children;
    }

    scanner().setText((sourceFile || getSourceFileOfNode(node)).text);
    let pos = node.pos;
    const processNode = (child: Node) => {
        addSyntheticNodes(children, pos, child.pos, node);
        children.push(child);
        pos = child.end;
    };
    const processNodes = (nodes: NodeArray<Node>) => {
        addSyntheticNodes(children, pos, nodes.pos, node);
        children.push(createSyntaxList(nodes, node));
        pos = nodes.end;
    };
    // jsDocComments need to be the first children
    forEach((node as JSDocContainer).jsDoc, processNode);
    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    forEachChild(node, processNode, processNodes);
    addSyntheticNodes(children, pos, node.end, node);
    scanner().setText(undefined);
    return children;
}

function createNode<TKind extends TokenSyntaxKind>(kind: TKind, pos: number, end: number, parent: Node): Node {
    const astNode = kind === SyntaxKind.StringLiteral ? AstNode.StringLiteral() : AstNode.Token(kind);
    astNode.pos = pos;
    astNode.end = end;
    astNode.parent = parent.ast;
    astNode.flags = parent.flags & NodeFlags.ContextFlags;
    return astNode.node;
}

function addSyntheticNodes(nodes: Node[], pos: number, end: number, parent: Node): void {
    scanner().resetTokenState(pos);
    while (pos < end) {
        const token = scanner().scan();
        const textPos = scanner().getTokenEnd();
        if (textPos <= end) {
            Debug.assert(isTokenKind(token));
            if (token === SyntaxKind.Identifier) {
                if (hasTabstop(parent)) {
                    continue;
                }
                Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an ${Debug.formatSyntaxKind(token)} in its trivia`);
            }
            nodes.push(createNode(token as TokenSyntaxKind, pos, textPos, parent));
        }
        pos = textPos;
        if (token === SyntaxKind.EndOfFileToken) {
            break;
        }
    }
}

function createSyntaxList(nodes: NodeArray<Node>, parent: Node): Node {
    const list = AstNode.SyntaxList();
    list.pos = nodes.pos;
    list.end = nodes.end;
    list.parent = parent.ast;
    const children: Node[] = [];
    let pos = nodes.pos;
    for (const node of nodes) {
        addSyntheticNodes(children, pos, node.pos, parent);
        children.push(node);
        pos = node.end;
    }
    addSyntheticNodes(children, pos, nodes.end, parent);
    list.data._children = children;
    return list.node;
}
