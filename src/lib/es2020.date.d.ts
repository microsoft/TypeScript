/// <reference lib="es2020.intl" />

interface Date {
    /**
     * Converts a date and time to a string, using the specified locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the conversion; see `Intl.LocalesArgument`. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.DateTimeFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;

    /**
     * Converts a date to a string, using the specified locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the conversion; see `Intl.LocalesArgument`. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.DateTimeFormat` constructor.
     */
    toLocaleDateString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;

    /**
     * Converts a time to a string, using the specified locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the conversion; see `Intl.LocalesArgument`. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.DateTimeFormat` constructor.
     */
    toLocaleTimeString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
}
