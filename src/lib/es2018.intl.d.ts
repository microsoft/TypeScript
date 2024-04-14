declare namespace Intl {
    type LDMLPluralRule = "zero" | "one" | "two" | "few" | "many" | "other";
    type PluralRuleType = "cardinal" | "ordinal";

    interface PluralRulesOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        type?: PluralRuleType | undefined;
        minimumIntegerDigits?: number | undefined;
        minimumFractionDigits?: number | undefined;
        maximumFractionDigits?: number | undefined;
        minimumSignificantDigits?: number | undefined;
        maximumSignificantDigits?: number | undefined;
    }

    interface ResolvedPluralRulesOptions {
        locale: string;
        pluralCategories: LDMLPluralRule[];
        type: PluralRuleType;
        minimumIntegerDigits: number;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
    }

    interface PluralRules {
        /**
         * Returns the plural rule identifier for the given number, according to the selected locale and parsing options.
         * @param n The number to parse.
         */
        select(n: number): LDMLPluralRule;

        /** Returns the locale and options computed during initialization of this `PluralRules` instance. */
        resolvedOptions(): ResolvedPluralRulesOptions;
    }

    interface PluralRulesConstructor {
        new (locales?: string | readonly string[], options?: PluralRulesOptions): PluralRules;
        readonly prototype: PluralRules;

        /**
         * Takes a list of locale identifiers, and returns the subset of identifiers that are supported by the current implementation of `PluralRules`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A Unicode BCP 47 locale identifier, or list of identifiers.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: string | readonly string[], options?: SupportedLocalesOptions): string[];
    }

    var PluralRules: PluralRulesConstructor;

    interface NumberFormatPartTypeRegistry {
        literal: never;
        nan: never;
        infinity: never;
        percent: never;
        integer: never;
        group: never;
        decimal: never;
        fraction: never;
        plusSign: never;
        minusSign: never;
        percentSign: never;
        currency: never;
    }
    type NumberFormatPartTypes = keyof NumberFormatPartTypeRegistry;

    interface NumberFormatPart {
        type: NumberFormatPartTypes;
        value: string;
    }

    interface NumberFormat {
        /**
         * Formats a number as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param value The value to be formatted.
         */
        formatToParts(value?: number): NumberFormatPart[];
    }

    type DateTimeFormatOptionsHourCycle = "h11" | "h12" | "h23" | "h24";

    interface DateTimeFormatOptions {
        hourCycle?: DateTimeFormatOptionsHourCycle | undefined;
    }

    interface ResolvedDateTimeFormatOptions {
        hourCycle?: DateTimeFormatOptionsHourCycle;
    }
}
