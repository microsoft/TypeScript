/// <reference lib="dom" />

interface DOMTokenList {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface Headers {
    [Symbol.iterator](): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface NodeList {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): BuiltinIterator<[number, Node], BuiltinIteratorReturn>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;

    /**
     * Returns an list of values in the list
     */
    values(): BuiltinIterator<Node, BuiltinIteratorReturn>;

    [Symbol.iterator](): BuiltinIterator<Node, BuiltinIteratorReturn>;
}

interface NodeListOf<TNode extends Node> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): BuiltinIterator<[number, TNode], BuiltinIteratorReturn>;

    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    /**
     * Returns an list of values in the list
     */
    values(): BuiltinIterator<TNode, BuiltinIteratorReturn>;

    [Symbol.iterator](): BuiltinIterator<TNode, BuiltinIteratorReturn>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): BuiltinIterator<Element, BuiltinIteratorReturn>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface FormData {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): BuiltinIterator<[string, string | File], BuiltinIteratorReturn>;
    /**
     * Returns a list of keys in the list
     */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns a list of values in the list
     */
    values(): BuiltinIterator<string | File, BuiltinIteratorReturn>;

    [Symbol.iterator](): BuiltinIterator<string | File, BuiltinIteratorReturn>;
}

interface URLSearchParams {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns a list of values in the search params
     */
    values(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /**
     * iterate over key/value pairs
     */
    [Symbol.iterator](): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
}
