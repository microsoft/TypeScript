import { Node } from "../_namespaces/ts";

const nodeChildren = new WeakMap<Node, Node[] | undefined>();

/** @internal */
export function getNodeChildren(node: Node): Node[] | undefined {
    return nodeChildren.get(node);
}

/** @internal */
export function setNodeChildren(node: Node, children: Node[]) {
    nodeChildren.set(node, children);
}

/** @internal */
export function unsetNodeChildren(node: Node) {
    nodeChildren.delete(node);
}

/** @internal */
export function getOrSetNodeChildren(node: Node, fn: () => Node[]): Node[] {
    let children = getNodeChildren(node);
    if (children === undefined) {
        setNodeChildren(node, children = fn());
    }
    return children;
}
