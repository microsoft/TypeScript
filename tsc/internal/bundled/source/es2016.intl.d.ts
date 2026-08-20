declare namespace Intl {
    /**
     * The `Intl.getCanonicalLocales()` method returns an array containing
     * the canonical locale names. Duplicates will be omitted and elements
     * will be validated as structurally valid language tags.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales)
     *
     * @param locale A list of String values for which to get the canonical locale names
     * @returns An array containing the canonical and validated locale names.
     */
    function getCanonicalLocales(locale?: string | readonly string[]): string[];
}
