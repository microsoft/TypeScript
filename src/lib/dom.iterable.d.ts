/// <reference lib="dom" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string, BuiltinIteratorReturn>;
}

interface Headers {
    [Symbol.iterator](): IterableIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): IterableIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): IterableIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): IterableIterator<string, BuiltinIteratorReturn>;
}

interface NodeList {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[number, Node], BuiltinIteratorReturn>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): IterableIterator<number, BuiltinIteratorReturn>;

    /**
     * Returns an list of values in the list
     */
    values(): IterableIterator<Node, BuiltinIteratorReturn>;

    [Symbol.iterator](): IterableIterator<Node, BuiltinIteratorReturn>;
}

interface NodeListOf<TNode extends Node> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[number, TNode], BuiltinIteratorReturn>;

    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): IterableIterator<number, BuiltinIteratorReturn>;
    /**
     * Returns an list of values in the list
     */
    values(): IterableIterator<TNode, BuiltinIteratorReturn>;

    [Symbol.iterator](): IterableIterator<TNode, BuiltinIteratorReturn>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): IterableIterator<Element, BuiltinIteratorReturn>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): IterableIterator<T, BuiltinIteratorReturn>;
}

interface FormData {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[string, string | File], BuiltinIteratorReturn>;
    /**
     * Returns a list of keys in the list
     */
    keys(): IterableIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns a list of values in the list
     */
    values(): IterableIterator<string | File, BuiltinIteratorReturn>;

    [Symbol.iterator](): IterableIterator<string | File, BuiltinIteratorReturn>;
}

interface URLSearchParams {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): IterableIterator<[string, string], BuiltinIteratorReturn>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): IterableIterator<string, BuiltinIteratorReturn>;
    /**
     * Returns a list of values in the search params
     */
    values(): IterableIterator<string, BuiltinIteratorReturn>;
    /**
     * iterate over key/value pairs
     */
    [Symbol.iterator](): IterableIterator<[string, string], BuiltinIteratorReturn>;
}
