/// <reference path="lib.dom.d.ts" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface NodeList {
    [Symbol.iterator](): IterableIterator<Node>
}

interface NodeListOf<TNode extends Node> {
    keys(): IterableIterator<number>;
    values(): IterableIterator<[number, TNode]>;
    entries(): IterableIterator<TNode>;
    forEach(): void;
    [Symbol.iterator](): IterableIterator<TNode>
}
