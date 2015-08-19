interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface NodeList {
    [Symbol.iterator](): IterableIterator<Node>
}

interface NodeListOf<TNode extends Node> {
    [Symbol.iterator](): IterableIterator<TNode>
}
