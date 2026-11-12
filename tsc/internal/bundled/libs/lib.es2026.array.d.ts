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

interface ArrayConstructor {
    /**
     * Creates an array from an async iterator or iterable object.
     * @param iterableOrArrayLike An async iterator or array-like object to convert to an array.
     */
    fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;

    /**
     * Creates an array from an async iterator or iterable object.
     *
     * @param iterableOrArrayLike An async iterator or array-like object to convert to an array.
     * @param mapFn A mapping function to call on every element of iterableOrArrayLike.
     *      Each return value is awaited before being added to result array.
     * @param thisArg Value of 'this' used when executing mapFn.
     */
    fromAsync<T, U>(iterableOrArrayLike: (Iterable<T> | ArrayLike<T>) & { [Symbol.asyncIterator]?: null | undefined; }, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
    fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T>, mapFn: (value: T, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
    fromAsync<TAsync, U, TSync = TAsync>(
        iterableOrArrayLike: AsyncIterable<TAsync> | ((Iterable<TSync> | ArrayLike<TSync>) & { [Symbol.asyncIterator]?: AsyncIterable<TAsync>[typeof Symbol.asyncIterator] | null | undefined; }),
        mapFn: (value: TAsync | Awaited<TSync>, index: number) => U,
        thisArg?: any,
    ): Promise<Awaited<U>[]>;
}
