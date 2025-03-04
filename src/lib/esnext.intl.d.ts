declare namespace Intl {
    type DurationTimeFormatLocaleMatcher = "lookup" | "best fit";
    /**
     * Value of the `unit` property in duration objects
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/format#duration).
     */
    type DurationTimeFormatUnit = "years"|"months"|"weeks"|"days"|"hours"|"minutes"|"seconds"|"milliseconds"|"microseconds"|"nanoseconds"
    
    /**
     * The style of the formatted duration.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat#style).
     */
    type DurationFormatStyle = "long" | "short" | "narrow" | "digital"

    
    type DurationFormatUnitSingular =
    | "year"
    | "quarter"
    | "month"
    | "week"
    | "day"
    | "hour"
    | "minute"
    | "second";

    /**
     * An object representing the relative time format in parts
     * that can be used for custom locale-aware formatting.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts#examples).
     */
        type DurationFormatPart =
        | {
            type: "literal";
            value: string;
        }
        | {
            type: Exclude<NumberFormatPartTypes, "literal">;
            value: string;
            unit: DurationFormatUnitSingular;
        };



    type DurationFormatOption = "long"|"short"|"narrow"|"numeric"|"2-digit"


    type DurationFormatDisplayOption = "always"|"auto";    

    /**
     * Number of how many fractional second digits to display in the output.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat#fractionaldigits).
     */
    type fractionalDigitsOption = 0|1|2|3|4|5|6|7|8|9

    interface ResolvedDurationFormatOptions {
        locale?: UnicodeBCP47LocaleIdentifier
        numberingSystem?: DateTimeFormatOptions["numberingSystem"]
        style?: DurationFormatStyle
        years?: Omit<DurationFormatOptions,"numeric"|"2-digit">
        yearsDisplay?:DurationFormatDisplayOption
        months?: Omit<DurationFormatOptions,"numeric"|"2-digit">
        monthsDisplay?: DurationFormatDisplayOption
        weeks?: Omit<DurationFormatOptions,"numeric"|"2-digit">
        weeksDisplay?: DurationFormatDisplayOption
        days?: Omit<DurationFormatOptions,"numeric"|"2-digit">
        daysDisplay?: DurationFormatDisplayOption
        hours?: DurationFormatOptions
        hoursDisplay?: DurationFormatDisplayOption
        minutes?: DurationFormatOptions
        minutesDisplay?: DurationFormatDisplayOption
        seconds?: DurationFormatOptions
        secondsDisplay?: DurationFormatDisplayOption
        milliseconds?: DurationFormatOptions
        millisecondsDisplay?: DurationFormatDisplayOption
        microseconds?: DurationFormatOptions
        microsecondsDisplay?: DurationFormatDisplayOption
        nanosecond?: DurationFormatOptions
        nanosecondDisplay?: DurationFormatDisplayOption
        fractionalDigits?: fractionalDigitsOption
    }

    interface DurationFormatOptions {
        localeMatcher?: DurationTimeFormatLocaleMatcher
        numberingSystem?: DateTimeFormatOptions["numberingSystem"]
        style?: DurationFormatStyle
        years?: Omit<DurationFormatOption,"numeric"|"2-digit">
        yearsDisplay?:DurationFormatDisplayOption
        months?: Omit<DurationFormatOption,"numeric"|"2-digit">
        monthsDisplay?: DurationFormatDisplayOption
        weeks?: Omit<DurationFormatOption,"numeric"|"2-digit">
        weeksDisplay?: DurationFormatDisplayOption
        days?: Omit<DurationFormatOption,"numeric"|"2-digit">
        daysDisplay?: DurationFormatDisplayOption
        hours?: DurationFormatOption
        hoursDisplay?: DurationFormatDisplayOption
        minutes?: DurationFormatOption
        minutesDisplay?: DurationFormatDisplayOption
        seconds?: DurationFormatOption
        secondsDisplay?: DurationFormatDisplayOption
        milliseconds?: DurationFormatOption
        millisecondsDisplay?: DurationFormatDisplayOption
        microseconds?: DurationFormatOption
        microsecondsDisplay?: DurationFormatDisplayOption
        nanosecond?: DurationFormatOption
        nanosecondDisplay?: DurationFormatDisplayOption
        fractionalDigits?: fractionalDigitsOption
    }

    /**
     * The duration object to be formatted
     * 
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/format#duration).
     */
    type DurationType = Record<DurationTimeFormatUnit,number>

    interface DurationFormat {
        /**
         * @param duration The duration object to be formatted. It should include some or all of the following properties: months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds.
         * 
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/format).
         */
        format(duration: DurationType): string;
        /**
         * @param duration The duration object to be formatted. It should include some or all of the following properties: months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts).
         */
        formatToParts(duration: DurationType): DurationFormatPart[];
        /**
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/resolvedOptions).
         */
        resolvedOptions(): ResolvedDurationFormatOptions;
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
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat).
         */
        new (locales: LocalesArgument, options: DurationFormatOptions): DurationFormat;

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
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/supportedLocalesOf).
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: { localeMatcher?: DurationTimeFormatLocaleMatcher; }): UnicodeBCP47LocaleIdentifier[];
    };
}
