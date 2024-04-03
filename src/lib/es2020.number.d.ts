/// <reference lib="es2020.intl" />

interface Number {
    /**
     * Converts a number to a string, using the specified locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}
