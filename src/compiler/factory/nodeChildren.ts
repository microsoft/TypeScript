import { Node, isToken } from "../_namespaces/ts";

const nodeChildren = new WeakMap<Node, readonly Node[] | undefined>();

const emptyChildren: readonly Node[] = Object.freeze([]);

/** @internal */
export function getNodeChildren(node: Node): readonly Node[] | undefined {
    if (isToken(node)) return emptyChildren;
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
