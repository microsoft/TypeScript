declare namespace Intl {
    /**
     * [Unicode BCP 47 Locale Identifiers](https://unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers) definition.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
     *
     * [Wikipedia](https://en.wikipedia.org/wiki/IETF_language_tag).
     */
    type UnicodeBCP47LocaleIdentifier = string;

    /**
     * The Intl.getCanonicalLocales() method returns an array containing
     * the canonical locale names. Duplicates will be omitted and elements
     * will be validated as structurally valid language tags.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
     * @param locale A list of string values for which to get the canonical locale names.
     */
    function getCanonicalLocales(locale?: UnicodeBCP47LocaleIdentifier | UnicodeBCP47LocaleIdentifier[]): UnicodeBCP47LocaleIdentifier[];
}
