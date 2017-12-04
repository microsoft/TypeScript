interface ReadonlyArray<T> {

    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by a flatten of depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U|U[],
        thisArg?: This
    ): U[]

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flatten method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flatten<U>(this: ReadonlyArray<U>, depth?: number): U[];
  }

interface Array<T> {

    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by a flatten of depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U|U[],
        thisArg?: This
    ): U[]

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flatten method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flatten<U>(this: U[], depth?: number): U[];
}
