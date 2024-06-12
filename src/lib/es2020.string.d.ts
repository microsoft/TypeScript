/// <reference lib="es2015.iterable" />

interface String {
    /**
     * Matches a string with a regular expression, and returns an iterable of matches
     * containing the results of that search.
     * @param regexp A variable name or string literal containing the regular expression pattern and flags.
     */
    matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>;

    /**
     * Converts all alphabetic characters to lowercase, using locale-sensitive case mapping.
     * @param locales The preferred locale, or list of preferred locales, to use for the conversation.
     * This method does not perform locale matching; instead, it always selects the first supported locale.
     * If omitted, the default locale is used.
     */
    toLocaleLowerCase(locales?: Intl.LocalesArgument): string;

    /**
     * Converts all alphabetic characters to uppercase, using locale-sensitive case mapping.
     * @param locales The preferred locale, or list of preferred locales, to use for the conversation.
     * This method does not perform locale matching; instead, it always selects the first supported locale.
     * If omitted, the default locale is used.
     */
    toLocaleUpperCase(locales?: Intl.LocalesArgument): string;

    /**
     * Determines whether two strings are equivalent, according to the specified locale.
     * @param that String to compare to the target string.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.Collator` constructor.
     */
    localeCompare(that: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): number;
}
