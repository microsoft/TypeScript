/// <reference path="lib.dom.d.ts" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface NodeList {

    /** 
      * Returns an list of values in the list
      */
    entries(): IterableIterator<Node>;
        
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /** 
      * Returns an list of keys in the list
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an array of key, value pairs for every entry in the list
      */
    values(): IterableIterator<[number, Node]>;
   

    [Symbol.iterator](): IterableIterator<Node>
}

interface NodeListOf<TNode extends Node> {
    /** 
      * Returns an list of values in the list
      */
    entries(): IterableIterator<Node>;
        
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /** 
      * Returns an list of keys in the list
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an array of key, value pairs for every entry in the list
      */
    values(): IterableIterator<[number, Node]>;    
    [Symbol.iterator](): IterableIterator<TNode>
}
