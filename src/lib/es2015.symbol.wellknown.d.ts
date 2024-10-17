/// <reference lib="es2015.symbol" />

interface SymbolConstructor {
    /**
     * A method that determines if a constructor object recognizes an object as one of the
     * constructor’s instances. Called by the semantics of the instanceof operator.
     */
    readonly hasInstance: unique symbol;

    /**
     * A Boolean value that if true indicates that an object should flatten to its array elements
     * by Array.prototype.concat.
     */
    readonly isConcatSpreadable: unique symbol;

    /**
     * A regular expression method that matches the regular expression against a string. Called
     * by the String.prototype.match method.
     */
    readonly match: unique symbol;

    /**
     * A regular expression method that replaces matched substrings of a string. Called by the
     * String.prototype.replace method.
     */
    readonly replace: unique symbol;

    /**
     * A regular expression method that returns the index within a string that matches the
     * regular expression. Called by the String.prototype.search method.
     */
    readonly search: unique symbol;

    /**
     * A function valued property that is the constructor function that is used to create
     * derived objects.
     */
    readonly species: unique symbol;

    /**
     * A regular expression method that splits a string at the indices that match the regular
     * expression. Called by the String.prototype.split method.
     */
    readonly split: unique symbol;

    /**
     * A method that converts an object to a corresponding primitive value.
     * Called by the ToPrimitive abstract operation.
     */
    readonly toPrimitive: unique symbol;

    /**
     * A String value that is used in the creation of the default string description of an object.
     * Called by the built-in method Object.prototype.toString.
     */
    readonly toStringTag: unique symbol;

    /**
     * An Object whose truthy properties are properties that are excluded from the 'with'
     * environment bindings of the associated objects.
     */
    readonly unscopables: unique symbol;
}

interface Symbol {
    /**
     * Converts a Symbol object to a symbol.
     */
    [Symbol.toPrimitive](hint: string): symbol;

    readonly [Symbol.toStringTag]: string;
}

interface Array<T> {
    /**
     * Is an object whose properties have the value 'true'
     * when they will be absent when used in a 'with' statement.
     */
    readonly [Symbol.unscopables]: {
        [K in keyof any[]]?: boolean;
    };
}

interface ReadonlyArray<T> {
    /**
     * Is an object whose properties have the value 'true'
     * when they will be absent when used in a 'with' statement.
     */
    readonly [Symbol.unscopables]: {
        [K in keyof readonly any[]]?: boolean;
    };
}

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

interface Map<K, V> {
    readonly [Symbol.toStringTag]: string;
}

interface WeakMap<K extends WeakKey, V> {
    readonly [Symbol.toStringTag]: string;
}

interface Set<T> {
    readonly [Symbol.toStringTag]: string;
}

interface WeakSet<T extends WeakKey> {
    readonly [Symbol.toStringTag]: string;
}

interface JSON {
    readonly [Symbol.toStringTag]: string;
}

interface Function {
    /**
     * Determines whether the given value inherits from this function if this function was used
     * as a constructor function.
     *
     * A constructor function can control which objects are recognized as its instances by
     * 'instanceof' by overriding this method.
     */
    [Symbol.hasInstance](value: any): boolean;
}

interface GeneratorFunction {
    readonly [Symbol.toStringTag]: string;
}

interface Math {
    readonly [Symbol.toStringTag]: string;
}

interface Promise<T> {
    readonly [Symbol.toStringTag]: string;
}

interface PromiseConstructor {
    readonly [Symbol.species]: PromiseConstructor;
}

interface _RegExp<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    Flags extends Partial<RegExpFlags> = RegExpFlags,
> {
    /**
     * Matches a string with the regular expression on which the global (`g`) flag is set.
     * @param string A string to search within.
     * @returns A {@linkcode RegExpMatchArray} that contains all the matched substrings, or `null` if no matches are present.
     */
    [Symbol.match](this: RegExp<CapturingGroups, NamedCapturingGroups, { readonly global: true; }>, string: string): RegExpMatchArray<CapturingGroups> | null;

    /**
     * Matches a string with the regular expression on which the global (`g`) flag is not set.
     * @param string A string to search within.
     * @returns A {@linkcode RegExpExecArray} which is identical to the return value of `regexp.exec(string)`,
     * or `null` if no matches are present.
     */
    [Symbol.match](this: RegExp<CapturingGroups, NamedCapturingGroups, { readonly global: false; }>, string: string): RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags> | null;

    /**
     * Matches a string with the regular expression.
     * @param string A string to search within.
     * @returns Either a {@linkcode RegExpMatchArray} that contains all the matched substrings when the global (`g`) flag is set on the RegExp,
     * a {@linkcode RegExpExecArray} which is identical to the return value of `regexp.exec(string)`, or `null` if no matches are present.
     */
    [Symbol.match](string: string): RegExpMatchArray<CapturingGroups> | RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags> | null;

    /**
     * Replaces one or more occurrences of substrings that match the regular expression.
     * All matches are replaced if the `g` (global) flag is set
     * (or only those matches at the beginning, if the `y` (sticky) flag is also present).
     * Otherwise, only the first match of {@linkcode searchValue} is replaced.
     * @param string A string to search within.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    [Symbol.replace](string: string, replaceValue: string | StringReplaceCallbackSignature<CapturingGroups, NamedCapturingGroups>): string;

    /**
     * Returns the index of the first occurrence that match the regular expression, or `-1` if no matches are present.
     * @param string A string to search within.
     */
    [Symbol.search](string: string): number;

    /**
     * Returns an array of substrings that were delimited by separators that match against this regular expression in a string.
     *
     * If the regular expression contains capturing parentheses, then each time this
     * regular expression matches, the results (including any undefined results) of the
     * capturing parentheses are spliced.
     *
     * @param string The string value to be split.
     * @param limit if specified, the output array is truncated so that it contains no more than `limit` elements.
     */
    [Symbol.split](string: string, limit?: number): string[];
}

interface RegExpConstructor {
    readonly [Symbol.species]: RegExpConstructor;
}

interface String {
    /**
     * Passes the string to the `[Symbol.match]` method on {@linkcode matcher}.
     * This method is expected to implement its own matching algorithm.
     * @param matcher An object that supports being matched against.
     */
    match<This, R>(this: This, matcher: { [Symbol.match](string: This): R; }): R;

    /**
     * Passes the string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode replacer}.
     * This method is expected to implement its own replacement algorithm.
     * @param replacer An object that supports searching for and replacing matches within a string.
     * @param replaceValue A value to be passed into {@linkcode replacer}.
     */
    replace<This, T, R>(this: This, replacer: { [Symbol.replace](string: This, replaceValue: T): R; }, replaceValue: T): R;

    /**
     * Passes the string to the `[Symbol.search]` method on {@linkcode searcher}.
     * This method is expected to implement its own searching algorithm.
     * @param searcher An object that supports searching within a string.
     */
    search<This, R>(this: This, searcher: { [Symbol.search](string: This): R; }): R;

    /**
     * Passes the string and {@linkcode limit} to the `[Symbol.split]` method on {@linkcode splitter}.
     * This method is expected to implement its own splitting algorithm.
     * @param splitter An object that supports splitting a string.
     * @param limit A value to be passed into {@linkcode splitter}.
     */
    split<This, T, R>(this: This, splitter: { [Symbol.split](string: This, limit?: T): R; }, limit?: T): R;
}

// The order is important - these overloads from `es5.d.ts` must be prioritized for correct type inference, redeclaring them
interface String {
    /**
     * Matches the string with a regular expression.
     * @param regexp The regular expression with the global (`g`) flag set.
     * @returns A {@linkcode RegExpMatchArray} that contains all the matched substrings, or `null` if no matches are present.
     */
    match<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    >(regexp: RegExp<CapturingGroups, NamedCapturingGroupsObject, { readonly global: true; }>): RegExpMatchArray<CapturingGroups> | null;

    /**
     * Matches the string with a regular expression.
     * @param regexp The regular expression with the global (`g`) flag unset.
     * @returns A {@linkcode RegExpExecArray} which is identical to the return value of `regexp.exec(string)`,
     * or `null` if no matches are present.
     */
    match<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
        Flags extends Partial<RegExpFlags> & { readonly global: false; } = RegExpFlags & { readonly global: false; },
    >(regexp: RegExp<CapturingGroups, NamedCapturingGroups, Flags>): RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags> | null;

    /**
     * Matches the string with a regular expression.
     * @param regexp The regular expression for searching. If the provided value is not a RegExp,
     * it is implicitly converted to a RegExp without flags by `new RegExp(regexp)`.
     * @returns Either a {@linkcode RegExpMatchArray} that contains all the matched substrings when the global (`g`) flag is set on the specified RegExp,
     * a {@linkcode RegExpExecArray} which is identical to the return value of `regexp.exec(string)`, or `null` if no matches are present.
     */
    match<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
        Flags extends Partial<RegExpFlags> = RegExpFlags,
    >(regexp: RegExp<CapturingGroups, NamedCapturingGroups, Flags> | string): RegExpMatchArray<CapturingGroups> | RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags> | null;

    /**
     * Replaces the first occurrence of a search string in the target string.
     * @param searchValue A string to search for.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    replace<T extends string>(
        searchValue: T,
        replaceValue: string | StringReplaceCallbackSignature<[searchValue: T], undefined>,
    ): string;

    /**
     * Replaces one or more occurrences of substrings that match a search string or a regular expression.
     * When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` (global) flag is set
     * (or only those matches at the beginning, if the `y` (sticky) flag is also present).
     * Otherwise, only the first match of {@linkcode searchValue} is replaced.
     * @param searchValue A string or regular expression to search for.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    replace<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(
        searchValue: string | RegExp<CapturingGroups, NamedCapturingGroups>,
        replaceValue: string | StringReplaceCallbackSignature<CapturingGroups, NamedCapturingGroups>,
    ): string;

    /**
     * Returns the index of the first occurrence that match a regular expression, or `-1` if no matches are present.
     * @param regexp The regular expression for searching. If the provided value is not a RegExp,
     * it is implicitly converted to a RegExp without flags by `new RegExp(regexp)`.
     */
    search(regexp: string | RegExp): number;

    /**
     * Returns an array of substrings that were delimited by separators in the string.
     * @param separator A string or a regular expression that identifies character(s) to use in separating the string.
     * If omitted, a single-element array containing the entire string is returned.
     *
     * If the regular expression contains capturing parentheses, then each time this
     * regular expression matches, the results (including any undefined results) of the
     * capturing parentheses are spliced.
     *
     * @param limit If specified, the output array is truncated so that it contains no more than `limit` elements.
     */
    split(separator: string | RegExp, limit?: number): string[];
}

interface ArrayBuffer {
    readonly [Symbol.toStringTag]: string;
}

interface DataView<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: string;
}

interface Int8Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Int8Array";
}

interface Uint8Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Uint8Array";
}

interface Uint8ClampedArray<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Uint8ClampedArray";
}

interface Int16Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Int16Array";
}

interface Uint16Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Uint16Array";
}

interface Int32Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Int32Array";
}

interface Uint32Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Uint32Array";
}

interface Float32Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Float32Array";
}

interface Float64Array<TArrayBuffer extends ArrayBufferLike> {
    readonly [Symbol.toStringTag]: "Float64Array";
}

interface ArrayConstructor {
    readonly [Symbol.species]: ArrayConstructor;
}
interface MapConstructor {
    readonly [Symbol.species]: MapConstructor;
}
interface SetConstructor {
    readonly [Symbol.species]: SetConstructor;
}
interface ArrayBufferConstructor {
    readonly [Symbol.species]: ArrayBufferConstructor;
}
