import {
    Debug,
    emptyArray,
    isNodeKind,
    Node,
    SourceFileLike,
    SyntaxKind,
    SyntaxList,
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
        // Store the children directly on the syntax list node.
        // This makes orphaned syntax lists easier to clean up,
        // and avoids the need to track all of them in a WeakMap.
        (node as SyntaxList)._children = children;
    }
    else {
        let map = sourceFileToNodeChildren.get(sourceFile);
        if (map === undefined) {
            map = new WeakMap();
            sourceFileToNodeChildren.set(sourceFile, map);
        }
        map.set(node, children);
    }
    return children;
}

/** @internal */
export function unsetNodeChildren(node: Node, origSourceFile: SourceFileLike) {
    if (node.kind === SyntaxKind.SyntaxList) {
        // Syntax lists are synthesized and we store their children directly on them.
        // They are a special case where we expect incremental parsing to toss them away entirely
        // if a change intersects with their containing parents.
        Debug.fail("Did not expect to unset the children of a SyntaxList.");
    }
    sourceFileToNodeChildren.get(origSourceFile)?.delete(node);
}
