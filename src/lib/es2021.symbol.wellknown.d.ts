/// <reference lib="es2015.symbol.wellknown" />

interface String {
    /**
     * Replace all instances of a substring in a string, using an object that supports replacement within a string.
     * @param searchValue A string to search for.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replaceAll(searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string;

    /**
     * Replace all instances of a substring in a string, using an object that supports replacement within a string.
     * @param searchValue A string to search for.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string;
}
