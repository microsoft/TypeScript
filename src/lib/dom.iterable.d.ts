/// <reference path="lib.dom.d.ts" />

interface DOMTokenList extends Iterable<string> {
}

interface Headers extends Iterable<[string, string]> {
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): Iterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): Iterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): Iterator<string>;
}

interface NodeList extends Iterable<Node> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): Iterator<[number, Node]>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): Iterator<number>;
    /**
     * Returns an list of values in the list
     */
    values(): Iterator<Node>;
}

interface NodeListOf<TNode extends Node> extends Iterable<TNode> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): Iterator<[number, TNode]>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): Iterator<number>;
    /**
     * Returns an list of values in the list
     */
    values(): Iterator<TNode>;
}

interface HTMLCollectionBase extends Iterable<Element> {
}

interface HTMLCollectionOf<T extends Element> extends Iterable<T> {
}

interface FormData extends Iterable<string | File> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): Iterator<[string, string | File]>;
    /**
     * Returns a list of keys in the list
     */
    keys(): Iterator<string>;
    /**
     * Returns a list of values in the list
     */
    values(): Iterator<string | File>;
}

interface URLSearchParams extends Iterable<[string, string]> {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): Iterator<[string, string]>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): Iterator<string>;
    /**
     * Returns a list of values in the search params
     */
    values(): Iterator<string>;
}
