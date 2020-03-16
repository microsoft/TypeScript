interface BigInt {
    /**
     * Returns a string representation of an object.
     * @param radix Specifies a radix for converting numeric values to strings.
     */
    toString(radix?: number): string;

    /** Returns a string representation appropriate to the host environment's current locale. */
    toLocaleString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): bigint;

    readonly [Symbol.toStringTag]: "BigInt";
}

interface BigIntConstructor {
    (value?: any): bigint;
    readonly prototype: BigInt;

    /**
     * Interprets the low bits of a BigInt as a 2's-complement signed integer.
     * All higher bits are discarded.
     * @param bits The number of low bits to use
     * @param int The BigInt whose bits to extract
     */
    asIntN(bits: number, int: bigint): bigint;
    /**
     * Interprets the low bits of a BigInt as an unsigned integer.
     * All higher bits are discarded.
     * @param bits The number of low bits to use
     * @param int The BigInt whose bits to extract
     */
    asUintN(bits: number, int: bigint): bigint;
}

declare var BigInt: BigIntConstructor;

/**
 * A typed array of 64-bit signed integer values. The contents are initialized to 0. If the
 * requested number of bytes could not be allocated, an exception is raised.
 */
interface BigInt64Array {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /** The ArrayBuffer instance referenced by the array. */
    readonly buffer: ArrayBufferLike;

    /** The length in bytes of the array. */
    readonly byteLength: number;

    /** The offset in bytes of the array. */
    readonly byteOffset: number;

    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target
     * @param target If target is negative, it is treated as length+target where length is the
     * length of the array.
     * @param start If start is negative, it is treated as length+start. If end is negative, it
     * is treated as length+end.
     * @param end If not specified, length of the this object is used as its default value.
     */
    copyWithin(target: number, start: number, end?: number): this;

    /** Yields index, value pairs for every entry in the array. */
    entries(): IterableIterator<[number, bigint]>;

    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls
     * the callbackfn function for each element in the array until the callbackfn returns false,
     * or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(callbackfn: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): boolean;

    /**
     * Returns the this object after filling the section identified by start and end with value
     * @param value value to fill array section with
     * @param start index to start filling the array at. If start is negative, it is treated as
     * length+start where length is the length of the array.
     * @param end index to stop filling the array at. If end is negative, it is treated as
     * length+end.
     */
    fill(value: bigint, start?: number, end?: number): this;

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls
     * the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: bigint, index: number, array: BigInt64Array) => any, thisArg?: any): BigInt64Array;

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): bigint | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): number;

    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: bigint, index: number, array: BigInt64Array) => void, thisArg?: any): void;

    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: bigint, fromIndex?: number): boolean;

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    indexOf(searchElement: bigint, fromIndex?: number): number;

    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the
     * resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string;

    /** Yields each index in the array. */
    keys(): IterableIterator<number>;

    /**
     * Returns the index of the last occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    lastIndexOf(searchElement: bigint, fromIndex?: number): number;

    /** The length of the array. */
    readonly length: number;

    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    map(callbackfn: (value: bigint, index: number, array: BigInt64Array) => bigint, thisArg?: any): BigInt64Array;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce(callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigInt64Array) => bigint): bigint;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce<U>(callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigInt64Array) => U, initialValue: U): U;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an
     * argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigInt64Array) => bigint): bigint;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigInt64Array) => U, initialValue: U): U;

    /** Reverses the elements in the array. */
    reverse(): this;

    /**
     * Sets a value or an array of values.
     * @param array A typed or untyped array of values to set.
     * @param offset The index in the current array at which the values are to be written.
     */
    set(array: ArrayLike<bigint>, offset?: number): void;

    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice(start?: number, end?: number): BigInt64Array;

    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the
     * callbackfn function for each element in the array until the callbackfn returns true, or until
     * the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(callbackfn: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): boolean;

    /**
     * Sorts the array.
     * @param compareFn The function used to determine the order of the elements. If omitted, the elements are sorted in ascending order.
     */
    sort(compareFn?: (a: bigint, b: bigint) => number | bigint): this;

    /**
     * Gets a new BigInt64Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     * @param begin The index of the beginning of the array.
     * @param end The index of the end of the array.
     */
    subarray(begin?: number, end?: number): BigInt64Array;

    /** Converts the array to a string by using the current locale. */
    toLocaleString(): string;

    /** Returns a string representation of the array. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): BigInt64Array;

    /** Yields each value in the array. */
    values(): IterableIterator<bigint>;

    [Symbol.iterator](): IterableIterator<bigint>;

    readonly [Symbol.toStringTag]: "BigInt64Array";

    [index: number]: bigint;
}

interface BigInt64ArrayConstructor {
    readonly prototype: BigInt64Array;
    new(length?: number): BigInt64Array;
    new(array: Iterable<bigint>): BigInt64Array;
    new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): BigInt64Array;

    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    of(...items: bigint[]): BigInt64Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: ArrayLike<bigint>): BigInt64Array;
    from<U>(arrayLike: ArrayLike<U>, mapfn: (v: U, k: number) => bigint, thisArg?: any): BigInt64Array;
}

declare var BigInt64Array: BigInt64ArrayConstructor;

/**
 * A typed array of 64-bit unsigned integer values. The contents are initialized to 0. If the
 * requested number of bytes could not be allocated, an exception is raised.
 */
interface BigUint64Array {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /** The ArrayBuffer instance referenced by the array. */
    readonly buffer: ArrayBufferLike;

    /** The length in bytes of the array. */
    readonly byteLength: number;

    /** The offset in bytes of the array. */
    readonly byteOffset: number;

    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target
     * @param target If target is negative, it is treated as length+target where length is the
     * length of the array.
     * @param start If start is negative, it is treated as length+start. If end is negative, it
     * is treated as length+end.
     * @param end If not specified, length of the this object is used as its default value.
     */
    copyWithin(target: number, start: number, end?: number): this;

    /** Yields index, value pairs for every entry in the array. */
    entries(): IterableIterator<[number, bigint]>;

    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls
     * the callbackfn function for each element in the array until the callbackfn returns false,
     * or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(callbackfn: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): boolean;

    /**
     * Returns the this object after filling the section identified by start and end with value
     * @param value value to fill array section with
     * @param start index to start filling the array at. If start is negative, it is treated as
     * length+start where length is the length of the array.
     * @param end index to stop filling the array at. If end is negative, it is treated as
     * length+end.
     */
    fill(value: bigint, start?: number, end?: number): this;

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls
     * the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: bigint, index: number, array: BigUint64Array) => any, thisArg?: any): BigUint64Array;

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find(predicate: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): bigint | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): number;

    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: bigint, index: number, array: BigUint64Array) => void, thisArg?: any): void;

    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: bigint, fromIndex?: number): boolean;

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    indexOf(searchElement: bigint, fromIndex?: number): number;

    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the
     * resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string;

    /** Yields each index in the array. */
    keys(): IterableIterator<number>;

    /**
     * Returns the index of the last occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    lastIndexOf(searchElement: bigint, fromIndex?: number): number;

    /** The length of the array. */
    readonly length: number;

    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    map(callbackfn: (value: bigint, index: number, array: BigUint64Array) => bigint, thisArg?: any): BigUint64Array;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce(callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigUint64Array) => bigint): bigint;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce<U>(callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigUint64Array) => U, initialValue: U): U;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an
     * argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigUint64Array) => bigint): bigint;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigUint64Array) => U, initialValue: U): U;

    /** Reverses the elements in the array. */
    reverse(): this;

    /**
     * Sets a value or an array of values.
     * @param array A typed or untyped array of values to set.
     * @param offset The index in the current array at which the values are to be written.
     */
    set(array: ArrayLike<bigint>, offset?: number): void;

    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice(start?: number, end?: number): BigUint64Array;

    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the
     * callbackfn function for each element in the array until the callbackfn returns true, or until
     * the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(callbackfn: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): boolean;

    /**
     * Sorts the array.
     * @param compareFn The function used to determine the order of the elements. If omitted, the elements are sorted in ascending order.
     */
    sort(compareFn?: (a: bigint, b: bigint) => number | bigint): this;

    /**
     * Gets a new BigUint64Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     * @param begin The index of the beginning of the array.
     * @param end The index of the end of the array.
     */
    subarray(begin?: number, end?: number): BigUint64Array;

    /** Converts the array to a string by using the current locale. */
    toLocaleString(): string;

    /** Returns a string representation of the array. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): BigUint64Array;

    /** Yields each value in the array. */
    values(): IterableIterator<bigint>;

    [Symbol.iterator](): IterableIterator<bigint>;

    readonly [Symbol.toStringTag]: "BigUint64Array";

    [index: number]: bigint;
}

interface BigUint64ArrayConstructor {
    readonly prototype: BigUint64Array;
    new(length?: number): BigUint64Array;
    new(array: Iterable<bigint>): BigUint64Array;
    new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): BigUint64Array;

    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    of(...items: bigint[]): BigUint64Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: ArrayLike<bigint>): BigUint64Array;
    from<U>(arrayLike: ArrayLike<U>, mapfn: (v: U, k: number) => bigint, thisArg?: any): BigUint64Array;
}

declare var BigUint64Array: BigUint64ArrayConstructor;

interface DataView {
    /**
     * Gets the BigInt64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;

    /**
     * Gets the BigUint64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;

    /**
     * Stores a BigInt64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     */
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;

    /**
     * Stores a BigUint64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     */
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
}
