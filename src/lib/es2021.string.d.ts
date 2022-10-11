interface String {
    /**
     * Replaces all occurrences of substrings that match a search string or a regular expression.
     * When the {@linkcode searchValue} is a `RegExp`, a `TypeError` will be thrown if the `g` (global) flag is not set
     * (only those matches at the beginning are replaced if the `y` (sticky) flag is also present).
     * @param searchValue A string or RegExp search value.
     * @param replaceValue The replacement text.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): string;

    /**
     * Replaces all occurrences of substrings that match a search string or a regular expression.
     * When the {@linkcode searchValue} is a `RegExp`, a `TypeError` will be thrown if the `g` (global) flag is not set
     * (only those matches at the beginning are replaced if the `y` (sticky) flag is also present).
     * @param searchValue A string or RegExp search value.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

    /**
     * Passes a string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * This object is expected to implement its own replacement algorithm.
     * @param replaceValue The replacement text.
     */
    replaceAll(searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string;

    /**
     * Passes a string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * This object is expected to implement its own replacement algorithm.
     * @param replacer A function that returns the replacement text.
     */
     replaceAll(searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string;
}
