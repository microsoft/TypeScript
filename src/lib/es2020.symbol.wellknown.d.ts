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

interface _RegExp<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    Flags extends Partial<RegExpFlags> = RegExpFlags,
> {
    /**
     * Matches a string with the regular expression.
     * @param string A string to search within.
     * @returns An iterable of {@linkcode RegExpExecArray} that contains all the matched substrings.
     * @throws A {@linkcode TypeError} if the global (`g`) flag is not set on the RegExp.
     */
    [Symbol.matchAll](this: RegExp<CapturingGroups, NamedCapturingGroups, { readonly global: true; }>, string: string): RegExpStringIterator<RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags>>;
}
