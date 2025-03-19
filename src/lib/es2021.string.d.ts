/// <reference lib="es2021.symbol.wellknown" />

interface String {
    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): string;

    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}
