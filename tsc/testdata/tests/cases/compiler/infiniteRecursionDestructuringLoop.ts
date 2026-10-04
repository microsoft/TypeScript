// @noEmit: true

// Repro from https://github.com/microsoft/TypeScript/issues/63192

interface Node {
    children?: readonly Node[];
    index?: number;
}

function IterateNodes(data: { node: Node }) {
    let node: Node | undefined = data.node;
    while (node) {
        const { children, index = -1 } = node;
        const activeNode: Node | undefined = index != -1 && children ? children[index] : undefined;

        node = activeNode;
    }
}

// Simplified repro
interface MyNode {
    children: MyNode[];
    index?: number;
}

function f(init: MyNode) {
    let node: MyNode | undefined = init;
    while (node) {
        const { children, index = 0 } = node;
        node = children[index];
    }
}
