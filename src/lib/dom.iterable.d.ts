/// <reference path="lib.dom.d.ts" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface NodeList {

    /** 
      * Returns an list of values in the list
      */
    entries(): IterableIterator<Node>;
    /**
      * Performs the specified action for each node in an list.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
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
    entries(): IterableIterator<TNode>;

    /**
      * Performs the specified action for each node in an list.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;
    /** 
      * Returns an list of keys in the list
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an array of key, value pairs for every entry in the list
      */
    values(): IterableIterator<[number, TNode]>;    
    [Symbol.iterator](): IterableIterator<TNode>
}
