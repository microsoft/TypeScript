interface String {
    /**
     * Replaces all occurrences of substrings that match a search string or a regular expression.
     * A `TypeError` will be thrown if a RegExp without a `g` (global) flag is used.
     * @param searchValue A string or RegExp search value.
     * @param replaceValue The replacement text.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): string;

    /**
     * Replaces all occurrences of substrings that match a search string or a regular expression.
     * A `TypeError` will be thrown if a RegExp without a `g` (global) flag is used.
     * @param searchValue A string or RegExp search value.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

    /**
     * Replaces all occurrences of substrings that match the method provided by `searchValue`.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * @param replaceValue The replacement text.
     */
    replaceAll(searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string;

    /**
     * Replaces all occurrences of substrings that match the method provided by `searchValue`.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * @param replacer A function that returns the replacement text.
     */
     replaceAll(searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string;
}
