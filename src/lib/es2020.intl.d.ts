/// <reference lib="es2018.intl" />
declare namespace Intl {
    /**
     * The locale or locales to use
     *
     * See [MDN - Intl - locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
     */
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
        format(value: number, unit: RelativeTimeFormatUnit): string;
        formatToParts(value: number, unit: RelativeTimeFormatUnit): RelativeTimeFormatPart[];
        resolvedOptions(): ResolvedRelativeTimeFormatOptions;
    }

    interface RelativeTimeFormatConstructor {
        new (locales?: LocalesArgument, options?: RelativeTimeFormatOptions): RelativeTimeFormat;
        supportedLocalesOf(locales?: LocalesArgument, options?: RelativeTimeFormatOptions): string[];
        readonly prototype: RelativeTimeFormat;
    }

    const RelativeTimeFormat: RelativeTimeFormatConstructor;

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
        readonly prototype: Locale;
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
