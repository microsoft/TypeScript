interface String {
    /**
     * Converts all alphabetic characters to lowercase, using locale-sensitive case mappings.
     * @param locales A BCP 47 language tag, or list of tags, specifying the preferred locale to use for the conversion.
     * This method does not perform locale matching; instead, it always selects the first requested locale.
     * If omitted, the default locale is used.
     */
    toLocaleLowerCase(locales?: string | string[]): string;

    /**
     * Converts all alphabetic characters to uppercase, using locale-sensitive case mappings.
     * @param locales A BCP 47 language tag, or list of tags, specifying the preferred locale to use for the conversion.
     * This method does not perform locale matching; instead, it always selects the first requested locale.
     * If omitted, the default locale is used.
    */
    toLocaleUpperCase(locales?: string | string[]): string;
}
