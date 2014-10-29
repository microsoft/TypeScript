
interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    // [Symbol.toStringTag]: string;
}

interface SymbolConstructor {
    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    new (description?: string): Symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found. 
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): Symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found. 
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: Symbol): string;

    // Well-known Symbols

    /** 
      * A method that determines if a constructor object recognizes an object as one of the constructor’s 
      * instances.Called by the semantics of the instanceof operator. 
      */
    hasInstance: Symbol;

    /** 
      * A Boolean value that if true indicates that an object should be flatten to its array elements 
      * by Array.prototype.concat.
      */
    isConcatSpreadable: Symbol;

    /** 
      * A Boolean value that if true indicates that an object may be used as a regular expression. 
      */
    isRegExp: Symbol;

    /** 
      * A method that returns the default iterator for an object.Called by the semantics of the for-of 
      * statement. 
      */
    iterator: Symbol;

    /** 
      * A method that converts an object to a corresponding primitive value.Called by the ToPrimitive
      * abstract operation. 
      */
    toPrimitive: Symbol;

    /** 
      * A String value that is used in the creation of the default string description of an object. 
      * Called by the built- in method Object.prototype.toString. 
      */
    toStringTag: Symbol;

    /** 
      * An Object whose own property names are property names that are excluded from the with environment 
      * bindings of the associated objects.
      */
    unscopables: Symbol;
}

declare var Symbol: SymbolConstructor;

interface ObjectConstructor {
    /**
      * Copy the values of all of the enumerable own properties from one or more source objects to a 
      * target object. Returns the target object.
      * @param target The target object to copy to.
      * @param sources One or more source objects to copy properties from.
      */
    assign(target: any, ...sources: any[]): any;

    /**
      * Returns an array of all symbol properties found directly on object o.
      * @param o Object to retrive the symbols from.
      */
    getOwnPropertySymbols(o: any): Symbol[];

    /**
      *  Returns true if the values are the same value, false otherwise.
      * @param value1 The first value.
      * @param value2 The second value.
      */
    is(value1: any, value2: any): boolean;

    /**
      * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
      * @param o The object to change its prototype.
      * @param proto The value of the new prototype or null.
      */
    setPrototypeOf(o: any, proto: any): any;
}

interface Function {
    /** 
      * Returns a new function object that is identical to the argument object in all ways except for 
      * its identity and the value of its HomeObject internal slot. 
      */
    toMethod(newHome: Object): Function;

    /**
      * Teturns the name of the function. Function names are read-only and can not be changed.
      */
    name: string;
}

interface NumberConstructor {
    /**
      * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that 
      * is representable as a Number value, which is approximately 2.2204460492503130808472633361816 x 10‍−‍16.
      */
    EPSILON: number;

    /**
      * Returns true if passed value is finite.
      * Unlike the global isFininte, Number.isFinite doesn't forcibly convert the parameter to a number. 
      * Only finite values of the type number, result in true.
      * @param number A numeric value.
      */
    isFinite(number: number): boolean;

    /**
      * Returns true if the value passed is an integer, false otherwise.
      * @param number A numeric value.
      */
    isInteger(number: number): boolean;

    /**
      * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number). 
      * Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter to a number. 
      * Only values of the type number, that are also NaN, result in true.
      * @param number A numeric value.
      */
    isNaN(number: number): boolean;

    /**
      * Returns true if the value passed is a safe integer.
      * @param number A numeric value.
      */
    isSafeInteger(number: number): boolean;

    /** 
      * The value of the largest integer n such that n and n + 1 are both exactly representable as a Number value. 
      * The value of Number.MIN_SAFE_INTEGER is 9007199254740991 2^53 − 1.
      */
    MAX_SAFE_INTEGER: number;

    /** 
      * The value of the smallest integer n such that n and n − 1 are both exactly representable as a Number value. 
      * The value of Number.MIN_SAFE_INTEGER is −9007199254740991 (−(2^53 − 1)).
      */
    MIN_SAFE_INTEGER: number;

    /**
      * Converts a string to a floating-point number. 
      * @param string A string that contains a floating-point number. 
      */
    parseFloat(string: string);

    /**
      * Converts A string to an integer.
      * @param s A string to convert into a number.
      * @param radix A value between 2 and 36 that specifies the base of the number in numString. 
      * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
      * All other strings are considered decimal.
      */
    parseInt(string: string, radix?: number): number;
}

interface ArrayLike<T> {
    length: number;
    [n: number]: T;
}

interface Array<T> {
    /** Iterator */
    // [Symbol.iterator] (): T;

    /** 
        Returns an array of key, value pairs for every entry in the arrray
    */
    entries(): Array<[number, T]>;

    /** 
        Returns an list of keys in the arrray
    */
    keys(): number[];

    /** 
        Returns an list of values in the arrray
    */
    values(): T[];

    /** 
        Returns the value of the first element in the array where predicate is true, and undefined otherwise
        @parm predicate find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
        @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
    */
    find(predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;

    /** 
        Returns the index of the first element in the array where predicate is true, and undefined otherwise
        @parm predicate find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
        @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
    */
    findIndex(predicate: (value: T) => boolean, thisArg?: any): number;

    /**
        Returns the this object after filling the section identified by start and end with value
        @param value value to fill array section with
        @param start index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. 
        @param end index to stop filling the array at. If end is negative, it is treated as length+end.
    */
    fill(value: T, start?: number, end?: number): T[];

    /** 
        Returns the this object after copying a section of the array identified by start and end to the same array starting at position target
        @param target If target is negative, it is treated as length+target where length is the length of the array. 
        @param start If start is negative, it is treated as length+start. If end is negative, it is treated as length+end.
        @param end If not specified, length of the this object is used as its default value. 
     */
    copyWithin(target: number, start: number, end?: number): T[];
}

interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (s: T) => U, thisArg?: any): Array<U>;
    from<T, U>(iterable: Iterable<T>, mapfn: (s: T) => U, thisArg?: any): Array<U>;
    from<T>(arrayLike: ArrayLike<T>): Array<T>;
    from<T>(iterable: Iterable<T>): Array<T>;
    of<T>(...items: T[]): Array<T>;
}

interface String {
    /** Iterator */
    // [Symbol.iterator] (): string;

    /**
      *  Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point value of the UTF-16 encoded code point starting 
      *  at the string element at position pos in the String resulting from converting this object to a String. 
      *  If there is no element at that position, the result is undefined. 
      *  If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
      */
    codePointAt(pos: number): number;

    /**
      * Returns true if searchString appears as a substring of the result of converting this object to a String, at one or more positions that are 
      * greater than or equal to position; otherwise, returns false.
      * @param searchString search string 
      * @param position If position is undefined, 0 is assumed, so as to search all of the String.
      */
    contains(searchString: string, position?: number): boolean;

    /**
      * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object 
      * (converted to a String) starting at endPosition – length(this). Otherwise returns false.
      */
    endsWith(searchString: string, endPosition?: number): boolean;

    /**
      * Returns the String value result of normalizing the string into the normalization form named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
      * @param form Applicaple values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default is "NFC"
      */
    normalize(form?: string): string;

    /**
      * Returns a String value that is made from count copies appended together. If count is 0, T is the empty String is returned.
      * @param count number of copies to append
      */
    repeat(count: number): string;

    /**
      * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object 
      * (converted to a String) starting at position. Otherwise returns false.
      */
    startsWith(searchString: string, position?: number): boolean;

    /**
      * Returns an <a> HTML anchor element and sets the name attribute to the text value
      * @param name
      */
    anchor(name: string): string;

    /** Returns a <big> HTML element */
    big(): string;

    /** Returns a <blink> HTML element */
    blink(): string;

    /** Returns a <b> HTML element */
    bold(): string;

    /** Returns a <tt> HTML element */
    fixed(): string

    /** Returns a <font> HTML element and sets the color attribure value */
    fontcolor(color: string): string

    /** Returns a <font> HTML element and sets the size attribure value */
    fontsize(size: number): string;

    /** Returns a <font> HTML element and sets the size attribure value */
    fontsize(size: string): string;

    /** Returns an <i> HTML element */
    italics(): string;

    /** Returns an <a> HTML element and sets the href attribure value */
    link(url: string): string;

    /** Returns a <small> HTML element */
    small(): string;

    /** Returns a <strike> HTML element */
    strike(): string;

    /** Returns a <sub> HTML element */
    sub(): string;

    /** Returns a <sup> HTML element */
    sup(): string;
}

interface StringConstructor {
    /**
      * Return the String value whose elements are, in order, the elements in the List elements. If length is 0, the empty string is returned.
      */
    fromCodePoint(...codePoints: number[]): string;

    /**
      * String.raw is intended for use as a tag function of a Tagged Template String. When called as such the first argument will be a well formed 
      * template call site object and the rest parameter will contain the substitution values
      */
    raw(callSite: { raw: string; }, ...substitutions: any[]);
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(): IteratorResult<T>;
}

interface Iterable<T> {
  //[Symbol.iterator](): Iterator<T>;
}

// Generators
interface Generator<T> extends Iterator<T> {
    next(value?: any): IteratorResult<T>;
    throw(exception: any);
    // [Symbol.toStringTag]: string;
}

interface MATH {
    /**
      * Returns the number of leading zero bits in the 32-bit binary representation of a number.
      * @param x A numeric expression.
      */
    clz32(x: number): number;

    /**
      * Returns the result of 32-bit multiplication of two numbers.
      * @param x First number
      * @param y Second number
      */
    imul(x: number, y: number): number;

    /**
      * Returns the sign of the x, indicating whether x is positive, negative or zero.
      * @param x The numeric expression to test
      */
    sign(x: number): number;

    /**
      * Returns the base 10 logarithm of a number.
      * @param x A numeric expression.
      */
    log10(x: number): number;

    /**
      * Returns the base 2 logarithm of a number.
      * @param x A numeric expression.
      */
    log2(x: number): number;

    /**
      * Returns the natural logarithm of 1 + x.
      * @param x A numeric expression.
      */
    log1p(x: number): number;

    /**
      * Returns the result of (e^x - 1) of x (e raised to the power of x, where e is the base of the natural logarithms).
      * @param x A numeric expression.
      */
    expm1(x: number): number;

    /**
      * Returns the hyperbolic cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    cosh(x: number): number;

    /**
      * Returns the hyperbolic sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    sinh(x: number): number;

    /**
      * Returns the hyperbolic tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    tanh(x: number): number;

    /**
      * Returns the inverse hyperbolic cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    acosh(x: number): number;

    /**
      * Returns the inverse hyperbolic sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    asinh(x: number): number;

    /**
      * Returns the inverse hyperbolic tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    atanh(x: number): number;

    /**
      * Returns the square root of the sum of squares of its arguments.
      */
    hypot(value1: number, value2: number, ...values: number[] ): number;

    /**
      * Returns the integral part of the a numeric expression, x, removing any fractional digits.
      * If x is already an integer, the result is x.
      * @param x A numeric expression.
      */
    trunc(x: number): number;

    /**
      * Returns the nearest single precision float representation of a number.
      * @param x A numeric expression.
      */
    fround(x: number): number;

    /**
      * Returns an implementation-dependent approximation to the cube root of number.
      * @param x A numeric expression.
      */
    cbrt(x: number): number;

    // [Symbol.toStringTag]: string;
}

interface RegExp {
    // [Symbol.isRegExp]: Boolean;

    /** 
      * Matches a string with a regular expression, and returns an array containing the results of 
      * that search.
      * @param string A string to search within.
      */
    match(string: string): string[];

    /**
      * Replaces text in a string, using a regular expression.
      * @param searchValue A String object or string literal that represents the regular expression
      * @param replaceValue A String object or string literal containing the text to replace for every 
      * successful match of rgExp in stringObj.
      */
    replace(string: string, replaceValue: string): string;

    search(string: string): number;

    /**
      * Returns an Array object into which substrings of the result of converting string to a String 
      * have been stored. The substrings are determined by searching from left to right for matches 
      * of the this value regular expression; these occurrences are not part of any substring in the 
      * returned array, but serve to divide up the String value.
      *
      * If the regular expression that contains capturing parentheses, then each time separator is 
      * matched the results (including any undefined results) of the capturing parentheses are spliced.
      * @param string string value to slpit
      * @param limit if not undefined, the output array is truncated so that it contains no more than 
      * limit elements.
      */
    split(string: string, limit?: number): string[];

    /** 
      * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular expression. 
      * Default is false. Read-only. 
      */
    sticky: boolean;

    /** 
      * Returns a Boolean value indicating the state of the unicode flag (u) used with a regular expression. 
      * Default is false. Read-only. 
      */
    unicode: boolean;
}

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    entries(): [K, V][];
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    keys(): K[];
    set(key: K, value: V): Map<K, V>;
    size: number;
    values(): V[];
    // [Symbol.Iterator]():Iterator<[K,V]>;
    // [Symbol.toStringTag]: string;
}

declare var Map: {
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
};

interface WeakMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): WeakMap<K, V>;
    // [Symbol.toStringTag]: string;
}

declare var WeakMap: {
    new <K, V>(): WeakMap<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
}

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): [T, T][];
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): T[];
    size: number;
    values(): T[];
    // [Symbol.Iterator]():Iterator<T>;
    // [Symbol.toStringTag]: string;
}

declare var Set: {
    new <T>(): Set<T>;
    new <T>(iterable: Iterable<T>): Set<T>;
};

interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    clear(): void;
    delete(value: T): boolean;
    has(value: T): boolean;
    // [Symbol.toStringTag]: string;
}

declare var WeakSet: {
    new <T>(): WeakSet<T>;
    new <T>(iterable: Iterable<T>): WeakSet<T>;
};

interface JSON {
    // [Symbol.toStringTag]: string;
}

/**
  * Represents a raw buffer of binary data, which is used to store data for the 
  * different typed arrays. ArrayBuffers cannot be read from or written to directly, 
  * but can be passed to a typed array or DataView Object to interpret the raw 
  * buffer as needed. 
  */
interface ArrayBuffer {
    /**
      * Read-only. The length of the ArrayBuffer (in bytes).
      */
    byteLength: number;

    /**
      * Returns a section of an ArrayBuffer.
      */
    slice(begin: number, end?: number): ArrayBuffer;

    // [Symbol.toStringTag]: string;
}

declare var ArrayBuffer: {
    prototype: ArrayBuffer;
    new (byteLength: number): ArrayBuffer;
    isView(arg: any): boolean;
}

interface DataView {
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset: number;
    getFloat32(byteOffset: number, littleEndian: boolean): number;
    getFloat64(byteOffset: number, littleEndian: boolean): number;
    getInt8(byteOffset: number): number;
    getInt16(byteOffset: number, littleEndian: boolean): number;
    getInt32(byteOffset: number, littleEndian: boolean): number;
    getUint8(byteOffset: number): number;
    getUint16(byteOffset: number, littleEndian: boolean): number;
    getUint32(byteOffset: number, littleEndian: boolean): number;
    setFloat32(byteOffset: number, value: number, littleEndian: boolean): void;
    setFloat64(byteOffset: number, value: number, littleEndian: boolean): void;
    setInt8(byteOffset: number, value: number): void;
    setInt16(byteOffset: number, value: number, littleEndian: boolean): void;
    setInt32(byteOffset: number, value: number, littleEndian: boolean): void;
    setUint8(byteOffset: number, value: number): void;
    setUint16(byteOffset: number, value: number, littleEndian: boolean): void;
    setUint32(byteOffset: number, value: number, littleEndian: boolean): void;
    // [Symbol.toStringTag]: string;
}

declare var DataView: {
    new (buffer: ArrayBuffer, byteOffset?: number, byteLength?: number);
};

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Int8Array {
    BYTES_PER_ELEMENT: number;
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset: number;
    copyWithin(target: number, start: number, end?: number): Int8Array;
    entries(): Array<[number, number]>;
    every(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;
    fill(value: number, start?: number, end?: number): Int8Array;
    filter(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): Int8Array;
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;
    forEach(callbackfn: (value: number, index: number, array: Int8Array) => void, thisArg?: any): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    keys(): number[];
    lastIndexOf(searchElement: number, fromIndex?: number): number;
    length: number;
    map<U>(callbackfn: (value: number, index: number, array: Int8Array) => U, thisArg?: any): U[];
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;
    reverse(): Int8Array;
    set(index: number, value: number): void;
    set(array: Int8Array, offset?: number): void;
    slice(start?: number, end?: number): Int8Array;
    some(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;
    sort(compareFn?: (a: number, b: number) => number): Int8Array;
    subarray(begin: number, end?: number): Int8Array;
    toLocaleString(): string;
    toString(): string;
    values(): Int8Array;
    [index: number]: number;
    // [Symbol.iterator] (): number;
}

declare var Int8Array: {
    prototype: Int8Array;
    new (length: number): Int8Array;
    new (array: Int8Array): Int8Array;
    new (array: number[]): Int8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array;
    BYTES_PER_ELEMENT: number;
    of(...items: number[]): Int8Array;
};

interface Uint8Array { }
declare var Uint8Array;

interface Uint8ClampedArray { }
declare var Uint8ClampedArray;

interface Int16Array { }
declare var Int16Array;

interface Uint16Array { }
declare var Uint16Array;

interface Int32Array { }
declare var Int32Array;

interface Uint32Array { }
declare var Uint32Array;

interface Float32Array { }
declare var Float32Array;

interface Float64Array { }
declare var Float64Array;

interface Handler<T> {
    getOwnPropertyDescriptor? (target: T, name: string): string;
    getOwnPropertyNames? (target: T): string[]; // Object.getOwnPropertyNames(proxy) 
    getPrototypeOf? (target: T): any; // Object.getPrototypeOf(proxy)
    defineProperty? (target: T, name: string, desc: string): boolean; // Object.defineProperty(proxy,name,desc)
    deleteProperty? (target: T, name: string): boolean; // delete proxy[name]
    freeze? (target: T): boolean; // Object.freeze(proxy)
    seal? (target: T): boolean; // Object.seal(proxy)
    preventExtensions? (target: T): boolean; // Object.preventExtensions(proxy)
    isFrozen? (target: T): boolean; // Object.isFrozen(proxy)
    isSealed? (target: T): boolean; // Object.isSealed(proxy)
    isExtensible? (target: T): boolean; // Object.isExtensible(proxy)
    has? (target: T, name: string): boolean; // name in proxy
    hasOwn? (target: T, name: string): boolean; // ({}).hasOwnProperty.call(proxy,name)
    get? (target: T, name: string, receiver: any): any; // receiver[name]
    set? (target: T, name: string, val: any, receiver: any): boolean; // receiver[name] = val
    enumerate? (target: T): Iterator<T>; // for (name in proxy) (iterator should yield all enumerable own and inherited properties)
    keys? (target: T): string[]; // Object.keys(proxy) (return array of enumerable own properties only)
    apply? (target: T, thisArg, args): any; // proxy(...args)
    construct? (target: T, args): any;// new proxy(...args)
}

declare var Proxy: {
    <T>(target: T, handeler: Handler<T>): T;
    new <T>(target: T, handeler: Handler<T>): T
};