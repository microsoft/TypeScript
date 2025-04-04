/// <reference lib="es2015.iterable" />
/// <reference lib="es2015.symbol" />

interface SymbolConstructor {
    /**
     * A regular expression method that matches the regular expression against a string. Called
     * by the String.prototype.matchAll method.
     */
    readonly matchAll: unique symbol;
}

interface RegExpStringIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): RegExpStringIterator<T>;
}

interface RegExp {
    /**
     * Matches a string with this regular expression, and returns an iterable of matches
     * containing the results of that search.
     * @param string A string to search within.
     */
    [Symbol.matchAll](str: string): RegExpStringIterator<RegExpMatchArray>;
}

interface String {
    /**
     * Matches a string or an object that supports being matched against, and
     * returns an iterable of matches containing the results of that search.
     * @param regexp An object that supports being matched against.
     */
    matchAll(matcher: { [Symbol.matchAll](str: string): RegExpStringIterator<RegExpMatchArray>; }): RegExpStringIterator<RegExpExecArray>;
}
