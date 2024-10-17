interface String {
    /**
     * Replaces all instances of a search string in the target string.
     * @param searchValue A string to search for.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    replaceAll<T extends string>(
        searchValue: T,
        replaceValue: string | StringReplaceCallbackSignature<[searchValue: T], undefined>,
    ): string;

    /**
     * Replaces all instances of substrings that match a search string or a regular expression.
     * @param searchValue A string or regular expression to search for.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    replaceAll<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
    >(
        searchValue: string | RegExp<CapturingGroups, NamedCapturingGroups>,
        replacer: string | StringReplaceCallbackSignature<CapturingGroups, NamedCapturingGroups>,
    ): string;

    /**
     * Passes the string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode replacer}.
     * This method is expected to implement its own replacement algorithm.
     * @param replacer An object that supports searching for and replacing matches within a string.
     * @param replaceValue A value to be passed into {@linkcode replacer}.
     */
    replaceAll<This, T, R>(this: This, replacer: { [Symbol.replace](string: This, replaceValue: T): R; }, replaceValue: T): R;
}
