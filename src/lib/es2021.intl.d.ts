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
        formatRange(startDate: Date | number, endDate: Date | number): string;
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

    type DisplayNamesOptionsLanguageDisplay = "dialect" | "standard";

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
        of(code: string): string | undefined;
        resolvedOptions(): ResolvedDisplayNamesOptions;
    }

    interface DisplayNamesConstructor {
        new (locales: LocalesArgument, options: DisplayNamesOptions): DisplayNames;
        supportedLocalesOf(locales?: LocalesArgument, options?: DisplayNamesOptions): string[];
        readonly prototype: DisplayNames;
    }

    const DisplayNames: DisplayNamesConstructor;

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
        format(list: Iterable<string>): string;
        formatToParts(list: Iterable<string>): ListFormatPart[];
        resolvedOptions(): ResolvedListFormatOptions;
    }

    interface ListFormatConstructor {
        new (locales?: LocalesArgument, options?: ListFormatOptions): ListFormat;
        supportedLocalesOf(locales: LocalesArgument, options?: ListFormatOptions): string[];
        readonly prototype: ListFormat;
    }

    const ListFormat: ListFormatConstructor;
}
