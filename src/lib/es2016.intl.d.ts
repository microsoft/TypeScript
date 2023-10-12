declare namespace Intl {
    /**
     * The Intl.getCanonicalLocales() method returns an array containing
     * the canonical locale names. Duplicates will be omitted and elements
     * will be validated as structurally valid language tags.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
     * @param locale A list of string values for which to get the canonical locale names.
     */
    function getCanonicalLocales(locale?: string | string[]): string[];
}