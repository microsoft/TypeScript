declare namespace Intl {
    /**
     * Takes a list of locale identifiers, and returns a deduplicated list of their canonical names.
     * Structurally invalid identifiers will cause an error to be thrown.
     * @param locales A BCP 47 language tag, or list of tags.
     */
    function getCanonicalLocales(locales?: string | readonly string[]): string[];
}
