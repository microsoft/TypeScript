interface String {
    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): string;

    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}
