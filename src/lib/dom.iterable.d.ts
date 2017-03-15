/// <reference path="lib.dom.d.ts" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface NodeList {
    keys(): IterableIterator<number>;
    values(): IterableIterator<[number, Node]>;
    entries(): IterableIterator<Node>;
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    [Symbol.iterator](): IterableIterator<Node>
}

interface NodeListOf<TNode extends Node> {
    keys(): IterableIterator<number>;
    values(): IterableIterator<[number, TNode]>;
    entries(): IterableIterator<TNode>;
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;    
    [Symbol.iterator](): IterableIterator<TNode>
}
