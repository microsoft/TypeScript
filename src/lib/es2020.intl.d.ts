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
