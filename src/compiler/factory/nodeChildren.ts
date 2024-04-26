import {
    emptyArray,
    isNodeKind,
    Node,
} from "../_namespaces/ts";

const nodeChildren = new WeakMap<Node, readonly Node[] | undefined>();

/** @internal */
export function getNodeChildren(node: Node): readonly Node[] | undefined {
    if (!isNodeKind(node.kind)) return emptyArray;

    return nodeChildren.get(node);
}

/** @internal */
export function setNodeChildren(node: Node, children: readonly Node[]): readonly Node[] {
    nodeChildren.set(node, children);
    return children;
}

/** @internal */
export function unsetNodeChildren(node: Node) {
    nodeChildren.delete(node);
}
