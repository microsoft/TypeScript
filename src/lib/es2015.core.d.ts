interface Array<T> {
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<S extends T>(predicate: (value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;

    /**
     * Changes all array elements from `start` to `end` index to a static `value` and returns the modified array
     * @param value value to fill array section with
     * @param start index to start filling the array at. If start is negative, it is treated as
     * length+start where length is the length of the array.
     * @param end index to stop filling the array at. If end is negative, it is treated as
     * length+end.
     */
    fill(value: T, start?: number, end?: number): this;

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

    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
}

interface ArrayConstructor {
    /**
     * Creates an array from an array-like object.
     * @param arrayLike An array-like object to convert to an array.
     */
    from<T>(arrayLike: ArrayLike<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param arrayLike An array-like object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    of<T>(...items: T[]): T[];
}

interface DateConstructor {
    new (value: number | string | Date): Date;
}

interface Function {
    /**
     * Returns the name of the function. Function names are read-only and can not be changed.
     */
    readonly name: string;
}

interface Math {
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
     * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
     * subtracting 1 from the exponential function of x (e raised to the power of x, where e
     * is the base of the natural logarithms).
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
     * @param values Values to compute the square root for.
     *     If no arguments are passed, the result is +0.
     *     If there is only one argument, the result is the absolute value.
     *     If any argument is +Infinity or -Infinity, the result is +Infinity.
     *     If any argument is NaN, the result is NaN.
     *     If all arguments are either +0 or −0, the result is +0.
     */
    hypot(...values: number[]): number;

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
}

interface NumberConstructor {
    /**
     * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1
     * that is representable as a Number value, which is approximately:
     * 2.2204460492503130808472633361816 x 10‍−‍16.
     */
    readonly EPSILON: number;

    /**
     * Returns true if passed value is finite.
     * Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a
     * number. Only finite values of the type number, result in true.
     * @param number A numeric value.
     */
    isFinite(number: unknown): boolean;

    /**
     * Returns true if the value passed is an integer, false otherwise.
     * @param number A numeric value.
     */
    isInteger(number: unknown): boolean;

    /**
     * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a
     * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
     * to a number. Only values of the type number, that are also NaN, result in true.
     * @param number A numeric value.
     */
    isNaN(number: unknown): boolean;

    /**
     * Returns true if the value passed is a safe integer.
     * @param number A numeric value.
     */
    isSafeInteger(number: unknown): boolean;

    /**
     * The value of the largest integer n such that n and n + 1 are both exactly representable as
     * a Number value.
     * The value of Number.MAX_SAFE_INTEGER is 9007199254740991 2^53 − 1.
     */
    readonly MAX_SAFE_INTEGER: number;

    /**
     * The value of the smallest integer n such that n and n − 1 are both exactly representable as
     * a Number value.
     * The value of Number.MIN_SAFE_INTEGER is −9007199254740991 (−(2^53 − 1)).
     */
    readonly MIN_SAFE_INTEGER: number;

    /**
     * Converts a string to a floating-point number.
     * @param string A string that contains a floating-point number.
     */
    parseFloat(string: string): number;

    /**
     * Converts A string to an integer.
     * @param string A string to convert into a number.
     * @param radix A value between 2 and 36 that specifies the base of the number in `string`.
     * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
     * All other strings are considered decimal.
     */
    parseInt(string: string, radix?: number): number;
}

interface ObjectConstructor {
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source The source object from which to copy properties.
     */
    assign<T extends {}, U>(target: T, source: U): T & U;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     */
    assign<T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     * @param source3 The third source object from which to copy properties.
     */
    assign<T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param sources One or more source objects from which to copy properties
     */
    assign(target: object, ...sources: any[]): any;

    /**
     * Returns an array of all symbol properties found directly on object o.
     * @param o Object to retrieve the symbols from.
     */
    getOwnPropertySymbols(o: any): symbol[];

    /**
     * Returns the names of the enumerable string properties and methods of an object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    keys(o: {}): string[];

    /**
     * Returns true if the values are the same value, false otherwise.
     * @param value1 The first value.
     * @param value2 The second value.
     */
    is(value1: any, value2: any): boolean;

    /**
     * Sets the prototype of a specified object o to object proto or null. Returns the object o.
     * @param o The object to change its prototype.
     * @param proto The value of the new prototype or null.
     */
    setPrototypeOf(o: any, proto: object | null): any;
}

interface ReadonlyArray<T> {
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<S extends T>(predicate: (value: T, index: number, obj: readonly T[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): T | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): number;

    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
}

interface _RegExp<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    Flags extends Partial<RegExpFlags> = RegExpFlags,
> {
    /**
     * A string indicating the flags of the regular expression in alphabetical order. Read-only.
     * If no flags are set, the value is the empty string.
     */
    readonly flags: string;
}

interface RegExpFlags {
    /** A Boolean value indicating the state of the sticky flag (y) on the regular expression. Read-only. */
    readonly sticky: boolean;

    /** A Boolean value indicating the state of the Unicode flag (u) on the regular expression. Read-only. */
    readonly unicode: boolean;
}

interface RegExpConstructor {
    new <
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(pattern: RegExp<CapturingGroups, NamedCapturingGroups> | string, flags: string): RegExp<CapturingGroups, NamedCapturingGroups>;

    // The order is important - redeclaring this overload from `es5.d.ts` such that `Flags` are copied
    new <T extends RegExp>(pattern: T | string): T;

    new <
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(pattern: RegExp<CapturingGroups, NamedCapturingGroups> | string, flags?: string): RegExp<CapturingGroups, NamedCapturingGroups>;

    <
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(pattern: RegExp<CapturingGroups, NamedCapturingGroups> | string, flags: string): RegExp<CapturingGroups, NamedCapturingGroups>;

    // The order is important - redeclaring this overload from `es5.d.ts` such that `Flags` are copied
    <T extends RegExp>(pattern: T | string): T;

    <
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(pattern: RegExp<CapturingGroups, NamedCapturingGroups> | string, flags?: string): RegExp<CapturingGroups, NamedCapturingGroups>;
}

interface String {
    /**
     * Returns a non-negative integer less than 1114112 (0x110000) that is the code point value starting at the string at the specified index,
     * or `undefined` if there is no character at the specified index.
     * If a UTF-16 surrogate pair does not begin at `pos`, the result is the code unit at `pos`.
     * @param pos The zero-based index of the desired code point.
     */
    codePointAt(pos: number): number | undefined;

    /**
     * Returns true if searchString appears as a substring of the result of converting this
     * object to a String, at one or more positions that are
     * greater than or equal to position; otherwise, returns false.
     * @param searchString search string
     * @param position If position is undefined, 0 is assumed, so as to search all of the String.
     */
    includes(searchString: string, position?: number): boolean;

    /**
     * Determines whether the string ends with a substring, ending at the specified index.
     * @param searchString The string to search for.
     * @param endPosition The index at which to begin searching for. The default value is the length of `searchString`.
     */
    endsWith(searchString: string, endPosition?: number): boolean;

    /**
     * Returns the String value result of normalizing the string into the normalization form
     * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
     * @param form The normalization form to be used. The default value is "NFC".
     */
    normalize(form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;

    /**
     * Returns the String value result of normalizing the string into the normalization form
     * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
     * @param form The normalization form to be used. The default value is "NFC".
     */
    normalize(form?: string): string;

    /**
     * Returns a String value that is made from count copies appended together. If count is 0,
     * the empty string is returned.
     * @param count The number of copies to append.
     */
    repeat(count: number): string;

    /**
     * Determines whether the string starts with a substring, beginning at the specified index.
     * @param searchString The string to search for.
     * @param position The index at which to begin searching for. The default value is 0.
     */
    startsWith(searchString: string, position?: number): boolean;

    /**
     * Returns an `<a>` HTML element with a `name` attribute as a literal string.
     * @deprecated A legacy feature for browser compatibility
     * @param name The value of the `name` attribute.
     */
    anchor(name: string): string;

    /**
     * Returns a `<big>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    big(): string;

    /**
     * Returns a `<blink>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    blink(): string;

    /**
     * Returns a `<b>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    bold(): string;

    /**
     * Returns a `<tt>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    fixed(): string;

    /**
     * Returns a `<font>` HTML element with a `color` attribute as a literal string.
     * @deprecated A legacy feature for browser compatibility
     * @param color The value of the `color` attribute.
     */
    fontcolor(color: string): string;

    /**
     * Returns a `<font>` HTML element with a `size` attribute as a literal string.
     * @deprecated A legacy feature for browser compatibility
     * @param size The value of the `size` attribute.
     */
    fontsize(size: number | string): string;

    /**
     * Returns an `<i>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    italics(): string;

    /**
     * Returns an `<a>` HTML element with a `href` attribute as a literal string.
     * @deprecated A legacy feature for browser compatibility
     * @param href The value of the `href` attribute.
     */
    link(href: string): string;

    /**
     * Returns a `<small>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    small(): string;

    /**
     * Returns a `<strike>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    strike(): string;

    /**
     * Returns a `<sub>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    sub(): string;

    /**
     * Returns a `<sup>` HTML element as a literal string.
     * @deprecated A legacy feature for browser compatibility
     */
    sup(): string;
}

interface StringConstructor {
    /**
     * Returns a string created by a sequence of code points, or the empty string if no arguments are given.
     * @param codePoints A sequence of code points.
     */
    fromCodePoint(...codePoints: number[]): string;

    /**
     * String.raw is usually used as a tag function of a Tagged Template String. When called as
     * such, the first argument will be a well formed template call site object and the rest
     * parameter will contain the substitution values. It can also be called directly, for example,
     * to interleave strings and values from your own tag function, and in this case the only thing
     * it needs from the first argument is the raw property.
     * @param template A well-formed template string call site representation.
     * @param substitutions A set of substitution values.
     */
    raw(template: { raw: readonly string[] | ArrayLike<string>; }, ...substitutions: any[]): string;
}

interface Int8Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Uint8Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Uint8ClampedArray<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Int16Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Uint16Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Int32Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Uint32Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Float32Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Float64Array<TArrayBuffer extends ArrayBufferLike> {
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
