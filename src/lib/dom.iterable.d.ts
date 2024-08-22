/// <reference lib="dom" />

interface DOMTokenList {
    [Symbol.iterator](): ArrayIterator<string>;
}

interface HeadersIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): HeadersIterator<T>;
}

interface Headers {
    [Symbol.iterator](): HeadersIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): HeadersIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): HeadersIterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): HeadersIterator<string>;
}

interface NodeList {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): ArrayIterator<[number, Node]>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, index: number, listObj: NodeList) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): ArrayIterator<number>;

    /**
     * Returns an list of values in the list
     */
    values(): ArrayIterator<Node>;

    [Symbol.iterator](): ArrayIterator<Node>;
}

interface NodeListOf<TNode extends Node> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): ArrayIterator<[number, TNode]>;

    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): ArrayIterator<number>;
    /**
     * Returns an list of values in the list
     */
    values(): ArrayIterator<TNode>;

    [Symbol.iterator](): ArrayIterator<TNode>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): ArrayIterator<Element>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): ArrayIterator<T>;
}

interface FormDataIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): FormDataIterator<T>;
}

interface FormData {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): FormDataIterator<[string, string | File]>;
    /**
     * Returns a list of keys in the list
     */
    keys(): FormDataIterator<string>;
    /**
     * Returns a list of values in the list
     */
    values(): FormDataIterator<string | File>;

    [Symbol.iterator](): FormDataIterator<string | File>;
}

interface URLSearchParamsIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): URLSearchParamsIterator<T>;
}

interface URLSearchParams {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): URLSearchParamsIterator<[string, string]>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): URLSearchParamsIterator<string>;
    /**
     * Returns a list of values in the search params
     */
    values(): URLSearchParamsIterator<string>;
    /**
     * iterate over key/value pairs
     */
    [Symbol.iterator](): URLSearchParamsIterator<[string, string]>;
}
