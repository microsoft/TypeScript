interface ReadonlyArray<T> {

    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by flat with depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U> (
        callbackfn: (value: T, index: number, array: readonly T[]) => U,
        thisArg?: any
    ): Flatten<U>[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat(depth: 4): Flatten<Flatten<Flatten<Flatten<T>>>>[];
    flat(depth: 3): Flatten<Flatten<Flatten<T>>>[];
    flat(depth: 2): Flatten<Flatten<T>>[];
    flat(depth?: 1): Flatten<T>[];
    flat(depth: 0): T[];
    flat(depth: number): Flatten<Flatten<Flatten<Flatten<T>>>> extends readonly any[] ? unknown[] : Flatten<Flatten<Flatten<Flatten<T>>>>[] | Flatten<Flatten<Flatten<T>>>[] | Flatten<Flatten<T>>[] | Flatten<T>[] | T[];
}

interface Array<T> {

    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by flat with depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U> (
        callbackfn: (value: T, index: number, array: T[]) => U,
        thisArg?: any
    ): Flatten<U>[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat(depth: 4): Flatten<Flatten<Flatten<Flatten<T>>>>[];
    flat(depth: 3): Flatten<Flatten<Flatten<T>>>[];
    flat(depth: 2): Flatten<Flatten<T>>[];
    flat(depth?: 1): Flatten<T>[];
    flat(depth: 0): T[];
    flat(depth: number): Flatten<Flatten<Flatten<Flatten<T>>>> extends readonly any[] ? unknown[] : Flatten<Flatten<Flatten<Flatten<T>>>>[] | Flatten<Flatten<Flatten<T>>>[] | Flatten<Flatten<T>>[] | Flatten<T>[] | T[];
}
