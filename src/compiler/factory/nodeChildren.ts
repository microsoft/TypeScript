import {
    emptyArray,
    isNodeKind,
    Node,
} from "../_namespaces/ts.js";

// Why var? It avoids TDZ checks in the runtime which can be costly.
// See: https://github.com/microsoft/TypeScript/issues/52924
/* eslint-disable no-var */
var nodeChildren = new WeakMap<Node, readonly Node[] | undefined>();
var nodeChildrenGet = nodeChildren.get.bind(nodeChildren);
var nodeChildrenSet = nodeChildren.set.bind(nodeChildren);
/* eslint-enable no-var */


/** @internal */
export function getNodeChildren(node: Node): readonly Node[] | undefined {
    if (!isNodeKind(node.kind)) return emptyArray;

    return nodeChildrenGet(node);
}

/** @internal */
export function setNodeChildren(node: Node, children: readonly Node[]): readonly Node[] {
    nodeChildrenSet(node, children);
    return children;
}

/** @internal */
export function unsetNodeChildren(node: Node) {
    nodeChildren.delete(node);
}
