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
    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U|ReadonlyArray<U>,
        thisArg?: This
    ): U[]


    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this:
        ReadonlyArray<U[][][][]> |

        ReadonlyArray<ReadonlyArray<U[][][]>> |
        ReadonlyArray<ReadonlyArray<U[][]>[]> |
        ReadonlyArray<ReadonlyArray<U[]>[][]> |
        ReadonlyArray<ReadonlyArray<U>[][][]> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[][]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[][]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[][]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>[]>> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>[]> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>>>,
        depth: 4): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this:
        ReadonlyArray<U[][][]> |

        ReadonlyArray<ReadonlyArray<U>[][]> |
        ReadonlyArray<ReadonlyArray<U[]>[]> |
        ReadonlyArray<ReadonlyArray<U[][]>> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[]> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>>,
        depth: 3): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this:
        ReadonlyArray<U[][]> |

        ReadonlyArray<ReadonlyArray<U[]>> |
        ReadonlyArray<ReadonlyArray<U>[]> |

        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>,
        depth: 2): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this:
        ReadonlyArray<U[]> |
        ReadonlyArray<ReadonlyArray<U>>,
        depth?: 1
    ): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this:
        ReadonlyArray<U>,
        depth: 0
    ): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flat method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(depth?: number): any[];
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
    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U|ReadonlyArray<U>,
        thisArg?: This
    ): U[]

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][][], depth: 7): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][], depth: 6): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][], depth: 5): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][], depth: 4): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][], depth: 3): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][], depth: 2): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][], depth?: 1): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[], depth: 0): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flat method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(depth?: number): any[];
}
