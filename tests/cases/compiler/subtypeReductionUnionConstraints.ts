// @strict: true
// @noEmit: true

// Repro from #53311

type FooNode = {
    kind: 'foo';
    children: Node[];
};

type BarNode = {
    kind: 'bar';
}

type Node = FooNode | BarNode;

type Document = {
    kind: 'document';
    children: Node[];
};

declare function isNode(node: unknown): node is Node;
declare function isBar(node: Node): node is BarNode;

export function visitNodes<T extends Node>(node: Document | Node, predicate: (testNode: Node) => testNode is T): void {
    isNode(node) && predicate(node);
    if (!isNode(node) || !isBar(node)) {
        const nodes: Node[] = node.children;
    }
}

// Repro from #53311

type A = { a: string };
type B = { b: string };

function f1<T extends A | B>(t: T, x: A | B) {
    const a = [t, x];  // (A | B)[] by subtype reduction
}
