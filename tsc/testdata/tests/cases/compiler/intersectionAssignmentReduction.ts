// @strict: true
// @noEmit: true

interface ValueNode { kind: "value"; value: number; }
interface TextNode { kind: "text"; text: string; }
interface OmittedNode { kind: "omitted"; }
type AssignmentNode = ValueNode | TextNode | OmittedNode;

declare function updateNode<NodeType extends AssignmentNode>(node: NodeType): AssignmentNode & Pick<NodeType, "kind">;

function updateExcluded(node: AssignmentNode & not OmittedNode) {
    if (node.kind === "value") {
        node = updateNode(node);
        const value: number = node.value;
        const updated: ValueNode = node;
    }
}

function updateUnion(node: AssignmentNode) {
    if (node.kind === "value") {
        node = updateNode(node);
        const value: number = node.value;
        const updated: ValueNode = node;
    }
}