import { Node } from "../_namespaces/ts";

const nodeChildren = new WeakMap<Node, Node[] | undefined>();

/** @internal */
export function getNodeChildren(node: Node): Node[] | undefined {
    return nodeChildren.get(node);
}

/** @internal */
export function setNodeChildren(node: Node, children: Node[]): Node[] {
    nodeChildren.set(node, children);
    return children;
}

/** @internal */
export function unsetNodeChildren(node: Node) {
    nodeChildren.delete(node);
}
