declare namespace Intl {
    /**
     * Takes a list of locale identifiers, and returns a deduplicated list of their canonical names.
     * Structurally invalid identifiers will cause an error to be thrown.
     * @param locales A Unicode BCP 47 locale identifier, or list of identifiers.
     */
    function getCanonicalLocales(locales?: string | readonly string[]): string[];
}
