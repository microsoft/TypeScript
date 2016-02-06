declare type PropertyKey = string | number | symbol;

interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    readonly [Symbol.toStringTag]: "Symbol";
}

interface SymbolConstructor {
    /** 
      * A reference to the prototype. 
      */
    readonly prototype: Symbol;

    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    (description?: string|number): symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found. 
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found. 
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: symbol): string;

    // Well-known Symbols

    /** 
      * A method that determines if a constructor object recognizes an object as one of the 
      * constructor’s instances. Called by the semantics of the instanceof operator. 
      */
    readonly hasInstance: symbol;

    /** 
      * A Boolean value that if true indicates that an object should flatten to its array elements
      * by Array.prototype.concat.
      */
    readonly isConcatSpreadable: symbol;

    /** 
      * A method that returns the default iterator for an object. Called by the semantics of the 
      * for-of statement.
      */
    readonly iterator: symbol;

    /**
      * A regular expression method that matches the regular expression against a string. Called 
      * by the String.prototype.match method. 
      */
    readonly match: symbol;

    /** 
      * A regular expression method that replaces matched substrings of a string. Called by the 
      * String.prototype.replace method.
      */
    readonly replace: symbol;

    /**
      * A regular expression method that returns the index within a string that matches the 
      * regular expression. Called by the String.prototype.search method.
      */
    readonly search: symbol;

    /** 
      * A function valued property that is the constructor function that is used to create 
      * derived objects.
      */
    readonly species: symbol;

    /**
      * A regular expression method that splits a string at the indices that match the regular 
      * expression. Called by the String.prototype.split method.
      */
    readonly split: symbol;

    /** 
      * A method that converts an object to a corresponding primitive value.
      * Called by the ToPrimitive abstract operation.
      */
    readonly toPrimitive: symbol;

    /** 
      * A String value that is used in the creation of the default string description of an object.
      * Called by the built-in method Object.prototype.toString.
      */
    readonly toStringTag: symbol;

    /**
      * An Object whose own property names are property names that are excluded from the 'with'
      * environment bindings of the associated objects.
      */
    readonly unscopables: symbol;
}
declare var Symbol: SymbolConstructor;

interface Function {
    /**
      * Returns the name of the function. Function names are read-only and can not be changed.
      */
    readonly name: string;

    /**
     * Determines whether the given value inherits from this function if this function was used
     * as a constructor function.
     *
     * A constructor function can control which objects are recognized as its instances by
     * 'instanceof' by overriding this method.
     */
    [Symbol.hasInstance](value: any): boolean;
}

interface IArguments {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<any>;
}

interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface GeneratorFunction extends Function {
    readonly [Symbol.toStringTag]: "GeneratorFunction";
}

interface GeneratorFunctionConstructor {
    /**
      * Creates a new Generator function.
      * @param args A list of arguments the function accepts.
      */
    new (...args: string[]): GeneratorFunction;
    (...args: string[]): GeneratorFunction;
    readonly prototype: GeneratorFunction;
}
declare var GeneratorFunction: GeneratorFunctionConstructor;

interface Date {
    /**
     * Converts a Date object to a string.
     */
    [Symbol.toPrimitive](hint: "default"): string;
    /**
     * Converts a Date object to a string.
     */
    [Symbol.toPrimitive](hint: "string"): string;
    /**
     * Converts a Date object to a number.
     */
    [Symbol.toPrimitive](hint: "number"): number;
    /**
     * Converts a Date object to a string or number.
     *
     * @param hint The strings "number", "string", or "default" to specify what primitive to return.
     *
     * @throws {TypeError} If 'hint' was given something other than "number", "string", or "default".
     * @returns A number if 'hint' was "number", a string if 'hint' was "string" or "default".
     */
    [Symbol.toPrimitive](hint: string): string | number;
}

interface RegExp {
    /**
      * Matches a string with this regular expression, and returns an array containing the results of
      * that search.
      * @param string A string to search within.
      */
    [Symbol.match](string: string): RegExpMatchArray;

    /**
      * Replaces text in a string, using this regular expression.
      * @param string A String object or string literal whose contents matching against
      *               this regular expression will be replaced
      * @param replaceValue A String object or string literal containing the text to replace for every 
      *                     successful match of this regular expression.
      */
    [Symbol.replace](string: string, replaceValue: string): string;

    /**
      * Replaces text in a string, using this regular expression.
      * @param string A String object or string literal whose contents matching against
      *               this regular expression will be replaced
      * @param replacer A function that returns the replacement text.
      */
    [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;

    /**
      * Finds the position beginning first substring match in a regular expression search
      * using this regular expression.
      *
      * @param string The string to search within.
      */
    [Symbol.search](string: string): number;

    /**
      * Returns an array of substrings that were delimited by strings in the original input that
      * match against this regular expression.
      *
      * If the regular expression contains capturing parentheses, then each time this
      * regular expression matches, the results (including any undefined results) of the
      * capturing parentheses are spliced.
      *
      * @param string string value to split
      * @param limit if not undefined, the output array is truncated so that it contains no more
      * than 'limit' elements.
      */
    [Symbol.split](string: string, limit?: number): string[];

    /**
      * Returns a string indicating the flags of the regular expression in question. This field is read-only.
      * The characters in this string are sequenced and concatenated in the following order:
      *
      *    - "g" for global
      *    - "i" for ignoreCase
      *    - "m" for multiline
      *    - "u" for unicode
      *    - "y" for sticky
      *
      * If no flags are set, the value is the empty string.
      */
    readonly flags: string;

    /** 
      * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly sticky: boolean;

    /** 
      * Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly unicode: boolean;
}

interface RegExpConstructor {
    [Symbol.species](): RegExpConstructor;
}

interface JSON {
    readonly [Symbol.toStringTag]: "JSON";
}

/**
  * Represents a raw buffer of binary data, which is used to store data for the 
  * different typed arrays. ArrayBuffers cannot be read from or written to directly, 
  * but can be passed to a typed array or DataView Object to interpret the raw 
  * buffer as needed. 
  */
interface ArrayBuffer {
    readonly [Symbol.toStringTag]: "ArrayBuffer";
}

interface DataView {
    readonly [Symbol.toStringTag]: "DataView";
}

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested 
  * number of bytes could not be allocated an exception is raised.
  */
interface Int8Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Int8Array";
}

interface Int8ArrayConstructor {
    new (elements: Iterable<number>): Int8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;
}

/**
  * A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "UInt8Array";
}

interface Uint8ArrayConstructor {
    new (elements: Iterable<number>): Uint8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
}

/**
  * A typed array of 8-bit unsigned integer (clamped) values. The contents are initialized to 0. 
  * If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8ClampedArray {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;

    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;

    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;

    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Uint8ClampedArray";
}

interface Uint8ClampedArrayConstructor {
    new (elements: Iterable<number>): Uint8ClampedArray;


    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}

/**
  * A typed array of 16-bit signed integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int16Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;

    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;

    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;


    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Int16Array";
}

interface Int16ArrayConstructor {
    new (elements: Iterable<number>): Int16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;
}

/**
  * A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint16Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Uint16Array";
}

interface Uint16ArrayConstructor {
    new (elements: Iterable<number>): Uint16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;
}

/**
  * A typed array of 32-bit signed integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int32Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Int32Array";
}

interface Int32ArrayConstructor {
    new (elements: Iterable<number>): Int32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}

/**
  * A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint32Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Uint32Array";
}

interface Uint32ArrayConstructor {
    new (elements: Iterable<number>): Uint32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}

/**
  * A typed array of 32-bit float values. The contents are initialized to 0. If the requested number
  * of bytes could not be allocated an exception is raised.
  */
interface Float32Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Float32Array";
}

interface Float32ArrayConstructor {
    new (elements: Iterable<number>): Float32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;
}

/**
  * A typed array of 64-bit float values. The contents are initialized to 0. If the requested 
  * number of bytes could not be allocated an exception is raised.
  */
interface Float64Array {
    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, number]>;
    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;
    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<number>;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Float64Array";
}

interface Float64ArrayConstructor {
    new (elements: Iterable<number>): Float64Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;
}