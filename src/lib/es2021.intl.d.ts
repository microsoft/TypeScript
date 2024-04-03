declare namespace Intl {
    interface CollatorOptions {
        collation?: string | undefined;
    }

    interface DateTimeFormatPartTypesRegistry {
        fractionalSecond: never;
    }

    type DateTimeFormatOptionsDateStyle = "full" | "long" | "medium" | "short";
    type DateTimeFormatOptionsTimeStyle = "full" | "long" | "medium" | "short";
    type DateTimeFormatOptionsDayPeriod = "narrow" | "short" | "long";
    type DateTimeFormatOptionsFractionalSecondDigits = 1 | 2 | 3;

    interface DateTimeFormatOptions {
        dateStyle?: DateTimeFormatOptionsDateStyle | undefined;
        timeStyle?: DateTimeFormatOptionsTimeStyle | undefined;
        dayPeriod?: DateTimeFormatOptionsDayPeriod | undefined;
        fractionalSecondDigits?: DateTimeFormatOptionsFractionalSecondDigits | undefined;
    }

    interface ResolvedDateTimeFormatOptions {
        dateStyle?: DateTimeFormatOptionsDateStyle;
        timeStyle?: DateTimeFormatOptionsTimeStyle;
        dayPeriod?: DateTimeFormatOptionsDayPeriod;
        fractionalSecondDigits?: DateTimeFormatOptionsFractionalSecondDigits;
    }

    interface DateTimeRangeFormatPart extends DateTimeFormatPart {
        source: "startRange" | "endRange" | "shared";
    }

    interface DateTimeFormat {
        /**
         * Formats a date range as a string, according to the selected locale and formatting options.
         * @param startDate A `Date` object or timestamp representing the start of the range.
         * @param endDate A `Date` object or timestamp representing the end of the range.
         */
        formatRange(startDate: Date | number, endDate: Date | number): string;

        /**
         * Formats a date range as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param startDate A `Date` object or timestamp representing the start of the range.
         * @param endDate A `Date` object or timestamp representing the end of the range.
         */
        formatRangeToParts(startDate: Date | number, endDate: Date | number): DateTimeRangeFormatPart[];
    }

    type DisplayNamesOptionsStyle = "narrow" | "short" | "long";

    interface DisplayNamesOptionsTypeRegistry {
        language: never;
        region: never;
        script: never;
        currency: never;
    }
    type DisplayNamesOptionsType = keyof DisplayNamesOptionsTypeRegistry;

    type DisplayNamesOptionsFallback = "code" | "none";

    interface DisplayNamesOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        style?: DisplayNamesOptionsStyle | undefined;
        type: DisplayNamesOptionsType;
        fallback?: DisplayNamesOptionsFallback | undefined;
    }

    interface ResolvedDisplayNamesOptions {
        locale: string;
        style: DisplayNamesOptionsStyle;
        type: DisplayNamesOptionsType;
        fallback: DisplayNamesOptionsFallback;
    }

    interface DisplayNames {
        /**
         * Converts a locale data code to a human-readable string, according to the selected locale and formatting options.
         * @param code The code to convert.
         */
        of(code: string): string | undefined;

        /** Returns the locale and options computed during initialization of this `DisplayNames` instance. */
        resolvedOptions(): ResolvedDisplayNamesOptions;
    }

    interface DisplayNamesConstructor {
        new (locales: LocalesArgument, options: DisplayNamesOptions): DisplayNames;
        readonly prototype: DisplayNames;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `DisplayNames`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    var DisplayNames: DisplayNamesConstructor;

    type ListFormatOptionsType = "conjunction" | "disjunction" | "unit";
    type ListFormatOptionsStyle = "long" | "short" | "narrow";

    interface ListFormatOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        type?: ListFormatOptionsType | undefined;
        style?: ListFormatOptionsStyle | undefined;
    }

    interface ResolvedListFormatOptions {
        locale: string;
        style: ListFormatOptionsStyle;
        type: ListFormatOptionsType;
    }

    interface ListFormatPart {
        type: "element" | "literal";
        value: string;
    }

    interface ListFormat {
        /**
         * Converts a list of strings to a single formatted string, according to the selected locale and formatting options.
         * @param list The list of string elements to format.
         */
        format(list: Iterable<string>): string;

        /**
         * Converts a list of strings to a single formatted string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param list The list of string elements to format.
         */
        formatToParts(list: Iterable<string>): ListFormatPart[];

        /** Returns the locale and options computed during initialization of this `ListFormat` instance. */
        resolvedOptions(): ResolvedListFormatOptions;
    }

    interface ListFormatConstructor {
        new (locales?: LocalesArgument, options?: ListFormatOptions): ListFormat;
        readonly prototype: ListFormat;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `ListFormat`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    var ListFormat: ListFormatConstructor;
}
