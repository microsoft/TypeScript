/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/// <reference lib="es2025.iterator" />

export {};

interface IteratorZipShortestOptions {
    /**
     * Stops when any input is exhausted.
     */
    mode?: "shortest";
}

interface IteratorZipLongestOptions<T> {
    /**
     * Continues until every input is exhausted.
     */
    mode: "longest";

    /**
     * Values used when an input is exhausted before the others.
     */
    padding?: T;
}

interface IteratorZipStrictOptions {
    /**
     * Requires every input to yield the same number of values.
     */
    mode: "strict";
}

type IteratorZipOptions<T> = IteratorZipShortestOptions | IteratorZipLongestOptions<T> | IteratorZipStrictOptions;

type IteratorInput<T> = Iterable<T> | Iterator<T>;

type IteratorYield<T extends IteratorInput<unknown>> =
    T extends Iterable<infer U, any, any> ? U :
    T extends Iterator<infer U, any, any> ? U :
    never;

type IteratorZipResult<T extends readonly IteratorInput<unknown>[]> = {
    -readonly [K in keyof T]: IteratorYield<T[K]>;
};

type IteratorZipKeyedResult<T extends { readonly [K in keyof T]: IteratorInput<unknown> }> = {
    -readonly [K in keyof T]: IteratorYield<T[K]>;
};

declare global {
    interface IteratorObject<T, TReturn, TNext> {
        /**
         * Creates an iterator whose values are arrays containing successive values from this iterator.
         * @param chunkSize The maximum number of values in each array.
         */
        chunks(chunkSize: number): IteratorObject<T[], undefined, unknown>;

        /**
         * Creates a string by concatenating the values of this iterator, separated by the specified separator.
         * `null` and `undefined` values contribute an empty string.
         * @param separator A string used to separate values. If omitted, a comma is used.
         */
        join(separator?: string): string;

        /**
         * Determines whether this iterator yields the specified value using SameValueZero comparison.
         * @param searchElement The value to locate.
         * @param skippedElements The number of values to skip before searching.
         */
        includes(searchElement: T, skippedElements?: number): boolean;
    }

    interface IteratorConstructor {
        /**
         * Creates an iterator whose values are arrays containing values yielded at the same position by each input iterator or iterable.
         * @param iterables An iterable of iterators or iterables to zip.
         * @param options Controls how differing input lengths are handled.
         */
        zip(iterables: readonly [], options?: IteratorZipOptions<Iterable<unknown>>): IteratorObject<never, undefined, unknown>;

        /**
         * Creates an iterator whose values are arrays containing values yielded at the same position by each input iterator or iterable.
         * @param iterables An iterable of iterators or iterables to zip.
         * @param options Controls how differing input lengths are handled.
         */
        zip<T extends readonly IteratorInput<unknown>[] | []>(iterables: T, options?: IteratorZipOptions<NoInfer<Partial<IteratorZipResult<T>>>>): IteratorObject<IteratorZipResult<T>, undefined, unknown>;

        /**
         * Creates an iterator whose values are arrays containing values yielded at the same position by each input iterator or iterable.
         * @param iterables An iterable of iterators or iterables to zip.
         * @param options Controls how differing input lengths are handled.
         */
        zip<T extends IteratorInput<unknown>>(iterables: Iterable<T>, options?: IteratorZipOptions<NoInfer<Iterable<IteratorYield<T>>>>): IteratorObject<IteratorYield<T>[], undefined, unknown>;

        /**
         * Creates an iterator whose values are objects containing values yielded at the same position by each iterator or iterable in the input object.
         * @param iterables An object whose enumerable own properties contain iterators or iterables to zip.
         * @param options Controls how differing input lengths are handled.
         */
        zipKeyed<T extends { readonly [K in keyof T]: IteratorInput<unknown> }>(iterables: T, options?: IteratorZipOptions<NoInfer<Partial<IteratorZipKeyedResult<T>>>>): IteratorObject<IteratorZipKeyedResult<T>, undefined, unknown>;
    }
}
