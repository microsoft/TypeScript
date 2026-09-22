// @strict: true
// @noEmit: true

interface NodeBase {
    kind: number;
}

interface NamedNode extends NodeBase {
    name: string;
}

declare function isNamedNode(node: NodeBase): node is NamedNode;

function copyNodeProperties<NodeType extends NodeBase>(node: NodeType, clone: NodeType) {
    if (isNamedNode(node)) {
        return;
    }
    for (const key in node) {
        clone[key] = node[key];
    }
}

function copyNonCallableProperties<NodeType extends NodeBase>(node: NodeType, clone: NodeType) {
    if (typeof node === "function") {
        return;
    }
    for (const key in node) {
        clone[key] = node[key];
    }
}