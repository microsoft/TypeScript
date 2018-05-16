/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


/// <reference path="lib.dom.d.ts" />

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface Headers {
    [Symbol.iterator](): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): IterableIterator<string>;
}

interface NodeList {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[number, Node]>;
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
     * Returns an list of values in the list
     */
    values(): IterableIterator<Node>;


    [Symbol.iterator](): IterableIterator<Node>;
}

interface NodeListOf<TNode extends Node> {

    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[number, TNode]>;

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
     * Returns an list of values in the list
     */
    values(): IterableIterator<TNode>;

    [Symbol.iterator](): IterableIterator<TNode>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): IterableIterator<Element>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface FormData {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[string, string | File]>;
    /**
     * Returns a list of keys in the list
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a list of values in the list
     */
    values(): IterableIterator<string | File>;

    [Symbol.iterator](): IterableIterator<string | File>;
}

interface URLSearchParams {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a list of values in the search params
     */
    values(): IterableIterator<string>;
    /**
     * iterate over key/value pairs
     */
    [Symbol.iterator](): IterableIterator<[string, string]>;
}
