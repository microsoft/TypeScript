/// <reference lib="es2018.intl" />
declare namespace Intl {
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
        /** Returns a new `Locale` object, adding any missing language, script, and region tags based on their most likely values. */
        maximize(): Locale;
        /** Returns a new `Locale` object, removing any redundant language, script, and region tags. */
        minimize(): Locale;
        /** Returns the locale's full identifier string. */
        toString(): string;

        /** The Unicode Language Identifier associated with the locale. */
        baseName: string;
        /** The calendar system associated with the locale. */
        calendar: string | undefined;
        /** The case sorting rule associated with the locale. */
        caseFirst?: CollatorOptionsCaseFirst | undefined;
        /** The character collation associated with the locale. */
        collation: string | undefined;
        /** The hour cycle type associated with the locale. */
        hourCycle: DateTimeFormatOptionsHourCycle | undefined;
        /** The primary language subtag associated with the locale. */
        language: string;
        /** The number system used by the locale. */
        numberingSystem: string | undefined;
        /** The numeric sorting rule associated with the locale. */
        numeric?: boolean | undefined;
        /** The region code associated with the locale. */
        region: string | undefined;
        /** The language script associated with the locale. */
        script: string | undefined;
    }

    interface LocaleConstructor {
        new (tag: string | Locale, options?: LocaleOptions): Locale;
        readonly prototype: Locale;
    }

    var Locale: LocaleConstructor;

    type LocalesArgument = string | Locale | readonly (string | Locale)[] | undefined;

    type RelativeTimeFormatOptionsStyle = "long" | "short" | "narrow";
    type RelativeTimeFormatOptionsNumeric = "always" | "auto";

    interface RelativeTimeFormatOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        numberingSystem?: string | undefined;
        style?: RelativeTimeFormatOptionsStyle | undefined;
        numeric?: RelativeTimeFormatOptionsNumeric | undefined;
    }

    interface ResolvedRelativeTimeFormatOptions {
        locale: string;
        style: RelativeTimeFormatOptionsStyle;
        numeric: RelativeTimeFormatOptionsNumeric;
        numberingSystem: string;
    }

    type RelativeTimeFormatUnitSingular = "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second";
    type RelativeTimeFormatUnitPlural = "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds";

    type RelativeTimeFormatUnit = RelativeTimeFormatUnitSingular | RelativeTimeFormatUnitPlural;

    interface RelativeTimeFormatPartLiteral {
        type: "literal";
        value: string;
    }

    interface RelativeTimeFormatPartUnit {
        type: Exclude<NumberFormatPartTypes, "literal">;
        value: string;
        unit: RelativeTimeFormatUnitSingular;
    }

    type RelativeTimeFormatPart = RelativeTimeFormatPartLiteral | RelativeTimeFormatPartUnit;

    interface RelativeTimeFormat {
        /**
         * Formats a relative time interval as a string, according to the selected locale and formatting options.
         * @param value The numeric element of the relative time interval.
         * @param unit The unit element of the relative time interval.
         */
        format(value: number, unit: RelativeTimeFormatUnit): string;

        /**
         * Formats a relative time interval as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param value The numeric element of the relative time interval.
         * @param unit The unit element of the relative time interval.
         */
        formatToParts(value: number, unit: RelativeTimeFormatUnit): RelativeTimeFormatPart[];

        /** Returns the locale and options computed during initialization of this `RelativeTimeFormat` instance. */
        resolvedOptions(): ResolvedRelativeTimeFormatOptions;
    }

    interface RelativeTimeFormatConstructor {
        new (locales?: LocalesArgument, options?: RelativeTimeFormatOptions): RelativeTimeFormat;
        readonly prototype: RelativeTimeFormat;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `RelativeTimeFormat`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    var RelativeTimeFormat: RelativeTimeFormatConstructor;

    interface NumberFormatOptionsStyleRegistry {
        unit: never;
    }

    interface NumberFormatOptionsCurrencyDisplayRegistry {
        narrowSymbol: never;
    }

    interface NumberFormatOptionsSignDisplayRegistry {
        auto: never;
        never: never;
        always: never;
        exceptZero: never;
    }
    type NumberFormatOptionsSignDisplay = keyof NumberFormatOptionsSignDisplayRegistry;

    type NumberFormatOptionsCompactDisplay = "short" | "long";
    type NumberFormatOptionsNotation = "standard" | "scientific" | "engineering" | "compact";
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

    interface CollatorConstructor {
        new (locales?: LocalesArgument, options?: CollatorOptions): Collator;
        (locales?: LocalesArgument, options?: CollatorOptions): Collator;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `Collator`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    interface DateTimeFormatConstructor {
        new (locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;
        (locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `DateTimeFormat`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    interface NumberFormatConstructor {
        new (locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;
        (locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `NumberFormat`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    interface PluralRulesConstructor {
        new (locales?: LocalesArgument, options?: PluralRulesOptions): PluralRules;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `PluralRules`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    /**
     * Takes a list of locale identifiers, and returns a deduplicated list of their canonical names.
     * Structurally invalid identifiers will cause an error to be thrown.
     * @param locales A locale, or list of locales.
     */
    function getCanonicalLocales(locales?: LocalesArgument): string[];
}
