/// <reference lib="es2018.intl" />
declare namespace Intl {
    /**
     * Unit to use in the relative time internationalized message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format#Parameters).
     */
    type RelativeTimeFormatUnit =
        | "year"
        | "years"
        | "quarter"
        | "quarters"
        | "month"
        | "months"
        | "week"
        | "weeks"
        | "day"
        | "days"
        | "hour"
        | "hours"
        | "minute"
        | "minutes"
        | "second"
        | "seconds";

    /**
     * Value of the `unit` property in objects returned by
     * `Intl.RelativeTimeFormat.prototype.formatToParts()`. `formatToParts` and
     * `format` methods accept either singular or plural unit names as input,
     * but `formatToParts` only outputs singular (e.g. "day") not plural (e.g.
     * "days").
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts#Using_formatToParts).
     */
    type RelativeTimeFormatUnitSingular =
        | "year"
        | "quarter"
        | "month"
        | "week"
        | "day"
        | "hour"
        | "minute"
        | "second";

    /**
     * The locale matching algorithm to use.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
     */
    type RelativeTimeFormatLocaleMatcher = "lookup" | "best fit";

    /**
     * The format of output message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     */
    type RelativeTimeFormatNumeric = "always" | "auto";

    /**
     * The length of the internationalized message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     */
    type RelativeTimeFormatStyle = "long" | "short" | "narrow";

    /**
     * The locale or locales to use
     *
     * See [MDN - Intl - locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
     */
    type LocalesArgument = string | Locale | readonly (string | Locale)[] | undefined;

    /**
     * An object with some or all of properties of `options` parameter
     * of `Intl.RelativeTimeFormat` constructor.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     */
    interface RelativeTimeFormatOptions {
        /** The locale matching algorithm to use. For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation). */
        localeMatcher?: RelativeTimeFormatLocaleMatcher;
        /** The format of output message. */
        numeric?: RelativeTimeFormatNumeric;
        /** The length of the internationalized message. */
        style?: RelativeTimeFormatStyle;
    }

    /**
     * An object with properties reflecting the locale
     * and formatting options computed during initialization
     * of the `Intl.RelativeTimeFormat` object
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions#Description).
     */
    interface ResolvedRelativeTimeFormatOptions {
        locale: string;
        style: RelativeTimeFormatStyle;
        numeric: RelativeTimeFormatNumeric;
        numberingSystem: string;
    }

    /**
     * An object representing the relative time format in parts
     * that can be used for custom locale-aware formatting.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts#Using_formatToParts).
     */
    type RelativeTimeFormatPart =
        | {
            type: "literal";
            value: string;
        }
        | {
            type: Exclude<NumberFormatPartTypes, "literal">;
            value: string;
            unit: RelativeTimeFormatUnitSingular;
        };

    interface RelativeTimeFormat {
        /**
         * Formats a value and a unit according to the locale
         * and formatting options of the given
         * [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)
         * object.
         *
         * While this method automatically provides the correct plural forms,
         * the grammatical form is otherwise as neutral as possible.
         *
         * It is the caller's responsibility to handle cut-off logic
         * such as deciding between displaying "in 7 days" or "in 1 week".
         * This API does not support relative dates involving compound units.
         * e.g "in 5 days and 4 hours".
         *
         * @param value -  Numeric value to use in the internationalized relative time message
         *
         * @param unit - [Unit](https://tc39.es/ecma402/#sec-singularrelativetimeunit) to use in the relative time internationalized message.
         *
         * @throws `RangeError` if `unit` was given something other than `unit` possible values
         *
         * @returns {string} Internationalized relative time message as string
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format).
         */
        format(value: number, unit: RelativeTimeFormatUnit): string;

        /**
         *  Returns an array of objects representing the relative time format in parts that can be used for custom locale-aware formatting.
         *
         *  @param value - Numeric value to use in the internationalized relative time message
         *
         *  @param unit - [Unit](https://tc39.es/ecma402/#sec-singularrelativetimeunit) to use in the relative time internationalized message.
         *
         *  @throws `RangeError` if `unit` was given something other than `unit` possible values
         *
         *  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts).
         */
        formatToParts(value: number, unit: RelativeTimeFormatUnit): RelativeTimeFormatPart[];

        /**
         * Provides access to the locale and options computed during initialization of this `Intl.RelativeTimeFormat` object.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions).
         */
        resolvedOptions(): ResolvedRelativeTimeFormatOptions;
    }

    /**
     * The [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)
     * object is a constructor for objects that enable language-sensitive relative time formatting.
     *
     * [Compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat#Browser_compatibility).
     */
    const RelativeTimeFormat: {
        /**
         * Creates [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) objects
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the locales argument,
         *  see the [`Intl` page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters)
         *  with some or all of options of `RelativeTimeFormatOptions`.
         *
         * @returns [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) object.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat).
         */
        new (
            locales?: LocalesArgument,
            options?: RelativeTimeFormatOptions,
        ): RelativeTimeFormat;

        /**
         * Returns an array containing those of the provided locales
         * that are supported in date and time formatting
         * without having to fall back to the runtime's default locale.
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the locales argument,
         *  see the [`Intl` page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters)
         *  with some or all of options of the formatting.
         *
         * @returns An array containing those of the provided locales
         *  that are supported in date and time formatting
         *  without having to fall back to the runtime's default locale.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/supportedLocalesOf).
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: RelativeTimeFormatOptions): string[];
    };

    interface NumberFormatOptionsStyleRegistry {
        unit: never;
    }

    interface NumberFormatOptionsCurrencyDisplayRegistry {
        narrowSymbol: never;
    }

    type NumberFormatOptionsCompactDisplay = "short" | "long";

    type NumberFormatOptionsNotation = "standard" | "scientific" | "engineering" | "compact";

    interface NumberFormatOptionsSignDisplayRegistry {
        auto: never;
        never: never;
        always: never;
        exceptZero: never;
    }

    type NumberFormatOptionsSignDisplay = keyof NumberFormatOptionsSignDisplayRegistry;

    type NumberFormatOptionsUnitDisplay = "short" | "long" | "narrow";

    type NumberFormatOptionsCurrencySign = "standard" | "accounting";

    interface NumberFormatOptions {
        numberingSystem?: string | undefined;
        compactDisplay?: NumberFormatOptionsCompactDisplay | undefined;
        notation?: NumberFormatOptionsNotation | undefined;
        signDisplay?: NumberFormatOptionsSignDisplay | undefined;
        unit?: string | undefined;
        unitDisplay?: NumberFormatOptionsUnitDisplay | undefined;
        currencySign?: NumberFormatOptionsCurrencySign | undefined;
    }

    interface ResolvedNumberFormatOptions {
        compactDisplay?: NumberFormatOptionsCompactDisplay;
        notation: NumberFormatOptionsNotation;
        signDisplay: NumberFormatOptionsSignDisplay;
        unit?: string;
        unitDisplay?: NumberFormatOptionsUnitDisplay;
        currencySign?: NumberFormatOptionsCurrencySign;
    }

    interface NumberFormatPartTypeRegistry {
        compact: never;
        exponentInteger: never;
        exponentMinusSign: never;
        exponentSeparator: never;
        unit: never;
        unknown: never;
    }

    interface DateTimeFormatPartTypesRegistry {
        relatedYear: never;
        yearName: never;
    }

    interface DateTimeFormatOptions {
        calendar?: string | undefined;
        numberingSystem?: string | undefined;
    }

    interface LocaleOptions {
        calendar?: string | undefined;
        caseFirst?: CollatorOptionsCaseFirst | undefined;
        collation?: string | undefined;
        hourCycle?: DateTimeFormatOptionsHourCycle | undefined;
        language?: string | undefined;
        numberingSystem?: string | undefined;
        numeric?: boolean | undefined;
        region?: string | undefined;
        script?: string | undefined;
    }

    interface Locale {
        /** Gets the most likely values for the language, script, and region of the locale based on existing values. */
        maximize(): Locale;
        /** Attempts to remove information about the locale that would be added by calling `Locale.maximize()`. */
        minimize(): Locale;
        /** Returns the locale's full locale identifier string. */
        toString(): string;

        /** The Unicode Language Identifier associated with the locale. */
        baseName: string;
        /** The calendar system associated with the locale. */
        calendar: string | undefined;
        /** The case sorting rule associated with the locale. */
        caseFirst: CollatorOptionsCaseFirst | undefined;
        /** The character collation associated with the locale. */
        collation: string | undefined;
        /** The hour cycle type associated with the locale. */
        hourCycle: DateTimeFormatOptionsHourCycle | undefined;
        /** The primary language subtag associated with the locale. */
        language: string | undefined;
        /** The number system used by the locale. */
        numberingSystem: string | undefined;
        /** The numeric sorting rule associated with the locale. */
        numeric: boolean | undefined;
        /** The region code associated with the locale. */
        region: string | undefined;
        /** The language script associated with the locale. */
        script: string | undefined;
    }

    interface LocaleConstructor {
        new (tag: string | Locale, options?: LocaleOptions): Locale;
    }

    const Locale: LocaleConstructor;

    type DisplayNamesFallback =
        | "code"
        | "none";

    type DisplayNamesType =
        | "language"
        | "region"
        | "script"
        | "calendar"
        | "dateTimeField"
        | "currency";

    type DisplayNamesLanguageDisplay =
        | "dialect"
        | "standard";

    interface DisplayNamesOptions {
        localeMatcher?: RelativeTimeFormatLocaleMatcher;
        style?: RelativeTimeFormatStyle;
        type: DisplayNamesType;
        languageDisplay?: DisplayNamesLanguageDisplay;
        fallback?: DisplayNamesFallback;
    }

    interface ResolvedDisplayNamesOptions {
        locale: string;
        style: RelativeTimeFormatStyle;
        type: DisplayNamesType;
        fallback: DisplayNamesFallback;
        languageDisplay?: DisplayNamesLanguageDisplay;
    }

    interface DisplayNames {
        /**
         * Receives a code and returns a string based on the locale and options provided when instantiating
         * [`Intl.DisplayNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
         *
         * @param code The `code` to provide depends on the `type` passed to display name during creation:
         *  - If the type is `"region"`, code should be either an [ISO-3166 two letters region code](https://www.iso.org/iso-3166-country-codes.html),
         *    or a [three digits UN M49 Geographic Regions](https://unstats.un.org/unsd/methodology/m49/).
         *  - If the type is `"script"`, code should be an [ISO-15924 four letters script code](https://unicode.org/iso15924/iso15924-codes.html).
         *  - If the type is `"language"`, code should be a `languageCode` ["-" `scriptCode`] ["-" `regionCode` ] *("-" `variant` )
         *    subsequence of the unicode_language_id grammar in [UTS 35's Unicode Language and Locale Identifiers grammar](https://unicode.org/reports/tr35/#Unicode_language_identifier).
         *    `languageCode` is either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code.
         *  - If the type is `"currency"`, code should be a [3-letter ISO 4217 currency code](https://www.iso.org/iso-4217-currency-codes.html).
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of).
         */
        of(code: string): string | undefined;
        /**
         * Returns a new object with properties reflecting the locale and style formatting options computed during the construction of the current
         * [`Intl/DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) object.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions).
         */
        resolvedOptions(): ResolvedDisplayNamesOptions;
    }

    /**
     * The [`Intl.DisplayNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
     * object enables the consistent translation of language, region and script display names.
     *
     * [Compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames#browser_compatibility).
     */
    const DisplayNames: {
        prototype: DisplayNames;

        /**
         * @param locales A string with a BCP 47 language tag, or an array of such strings.
         *   For the general form and interpretation of the `locales` argument, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
         *   page.
         *
         * @param options An object for setting up a display name.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames).
         */
        new (locales: LocalesArgument, options: DisplayNamesOptions): DisplayNames;

        /**
         * Returns an array containing those of the provided locales that are supported in display names without having to fall back to the runtime's default locale.
         *
         * @param locales A string with a BCP 47 language tag, or an array of such strings.
         *   For the general form and interpretation of the `locales` argument, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
         *   page.
         *
         * @param options An object with a locale matcher.
         *
         * @returns An array of strings representing a subset of the given locale tags that are supported in display names without having to fall back to the runtime's default locale.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/supportedLocalesOf).
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: { localeMatcher?: RelativeTimeFormatLocaleMatcher; }): string[];
    };

    interface CollatorConstructor {
        new (locales?: LocalesArgument, options?: CollatorOptions): Collator;
        (locales?: LocalesArgument, options?: CollatorOptions): Collator;
        supportedLocalesOf(locales: LocalesArgument, options?: CollatorOptions): string[];
    }

    interface DateTimeFormatConstructor {
        new (locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;
        (locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;
        supportedLocalesOf(locales: LocalesArgument, options?: DateTimeFormatOptions): string[];
    }

    interface NumberFormatConstructor {
        new (locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;
        (locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;
        supportedLocalesOf(locales: LocalesArgument, options?: NumberFormatOptions): string[];
    }

    interface PluralRulesConstructor {
        new (locales?: LocalesArgument, options?: PluralRulesOptions): PluralRules;
        (locales?: LocalesArgument, options?: PluralRulesOptions): PluralRules;
        supportedLocalesOf(locales: LocalesArgument, options?: PluralRulesOptions): string[];
    }
}
