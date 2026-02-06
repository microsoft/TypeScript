/// <reference lib="es2018.intl" />

declare namespace Intl {
    /**
     * An object representing the relative time format in parts
     * that can be used for custom locale-aware formatting.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts).
     */
    type DurationFormatPart =
        | {
            type: "literal";
            value: string;
            unit?: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "milliseconds" | "microseconds" | "nanoseconds";
        }
        | {
            type: Exclude<NumberFormatPartTypes, "literal">;
            value: string;
            unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "milliseconds" | "microseconds" | "nanoseconds";
        };

    /**
     * An object with some or all properties of the `Intl.DurationFormat` constructor `options` parameter.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat#parameters)
     */
    interface DurationFormatOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        numberingSystem?: string | undefined;
        style?: "long" | "short" | "narrow" | "digital" | undefined;
        years?: "long" | "short" | "narrow" | undefined;
        yearsDisplay?: "always" | "auto" | undefined;
        months?: "long" | "short" | "narrow" | undefined;
        monthsDisplay?: "always" | "auto" | undefined;
        weeks?: "long" | "short" | "narrow" | undefined;
        weeksDisplay?: "always" | "auto" | undefined;
        days?: "long" | "short" | "narrow" | undefined;
        daysDisplay?: "always" | "auto" | undefined;
        hours?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
        hoursDisplay?: "always" | "auto" | undefined;
        minutes?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
        minutesDisplay?: "always" | "auto" | undefined;
        seconds?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
        secondsDisplay?: "always" | "auto" | undefined;
        milliseconds?: "long" | "short" | "narrow" | "numeric" | undefined;
        millisecondsDisplay?: "always" | "auto" | undefined;
        microseconds?: "long" | "short" | "narrow" | "numeric" | undefined;
        microsecondsDisplay?: "always" | "auto" | undefined;
        nanoseconds?: "long" | "short" | "narrow" | "numeric" | undefined;
        nanosecondsDisplay?: "always" | "auto" | undefined;
        fractionalDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
    }

    /**
     * The Intl.DurationFormat object enables language-sensitive duration formatting.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat)
     */
    interface DurationFormat {
        /**
         * @param duration The duration object to be formatted. It should include some or all of the following properties: months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/format).
         */
        format(duration: Partial<Record<"years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds" | "microseconds" | "nanoseconds", number>>): string;
        /**
         * @param duration The duration object to be formatted. It should include some or all of the following properties: months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts).
         */
        formatToParts(duration: Partial<Record<"years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds" | "microseconds" | "nanoseconds", number>>): DurationFormatPart[];
        /**
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/resolvedOptions).
         */
        resolvedOptions(): ResolvedDurationFormatOptions;
    }

    interface ResolvedDurationFormatOptions {
        locale: string;
        numberingSystem: string;
        style: "long" | "short" | "narrow" | "digital";
        years: "long" | "short" | "narrow";
        yearsDisplay: "always" | "auto";
        months: "long" | "short" | "narrow";
        monthsDisplay: "always" | "auto";
        weeks: "long" | "short" | "narrow";
        weeksDisplay: "always" | "auto";
        days: "long" | "short" | "narrow";
        daysDisplay: "always" | "auto";
        hours: "long" | "short" | "narrow" | "numeric" | "2-digit";
        hoursDisplay: "always" | "auto";
        minutes: "long" | "short" | "narrow" | "numeric" | "2-digit";
        minutesDisplay: "always" | "auto";
        seconds: "long" | "short" | "narrow" | "numeric" | "2-digit";
        secondsDisplay: "always" | "auto";
        milliseconds: "long" | "short" | "narrow" | "numeric";
        millisecondsDisplay: "always" | "auto";
        microseconds: "long" | "short" | "narrow" | "numeric";
        microsecondsDisplay: "always" | "auto";
        nanoseconds: "long" | "short" | "narrow" | "numeric";
        nanosecondsDisplay: "always" | "auto";
        fractionalDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    }

    const DurationFormat: {
        prototype: DurationFormat;

        /**
         * @param locales A string with a BCP 47 language tag, or an array of such strings.
         *   For the general form and interpretation of the `locales` argument, see the [Intl](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
         *   page.
         *
         * @param options An object for setting up a duration format.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat).
         */
        new (locales?: LocalesArgument, options?: DurationFormatOptions): DurationFormat;

        /**
         * Returns an array containing those of the provided locales that are supported in display names without having to fall back to the runtime's default locale.
         *
         * @param locales A string with a BCP 47 language tag, or an array of such strings.
         *   For the general form and interpretation of the `locales` argument, see the [Intl](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
         *   page.
         *
         * @param options An object with a locale matcher.
         *
         * @returns An array of strings representing a subset of the given locale tags that are supported in display names without having to fall back to the runtime's default locale.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/supportedLocalesOf).
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: Pick<DurationFormatOptions, "localeMatcher">): UnicodeBCP47LocaleIdentifier[];
    };
}
