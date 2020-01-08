declare namespace Intl {
    type RelativeTimeFormatUnit = "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second";
    type RelativeTimeFormatLocaleMatcher = "lookup" | "best fit";
    type RelativeTimeFormatNumeric = "always" | "auto";
    type RelativeTimeFormatStyle = "long" | "short" | "narrow";

    interface RelativeTimeFormatOptions {
        localeMatcher?: RelativeTimeFormatLocaleMatcher;
        numeric?: RelativeTimeFormatNumeric;
        style?: RelativeTimeFormatStyle;
    }

    interface ResolvedRelativeTimeFormatOptions {
        locale: string;
        style: RelativeTimeFormatStyle;
        numeric: RelativeTimeFormatNumeric;
        numberingSystem: string;
    }

    interface RelativeTimeFormatPart {
        type: string;
        value: string;
        unit?: RelativeTimeFormatUnit;
    }

    interface RelativeTimeFormat {
        format(
            value: number,
            unit: RelativeTimeFormatUnit,
        ): string;
        formatToParts(
            value: number,
            unit: RelativeTimeFormatUnit,
        ): RelativeTimeFormatPart[];
        resolvedOptions(): ResolvedRelativeTimeFormatOptions;
    }

    const RelativeTimeFormat: {
        new(
            locales?: string | string[],
            options?: RelativeTimeFormatOptions,
        ): RelativeTimeFormat;
        supportedLocalesOf(
            locales: string | string[],
            options?: RelativeTimeFormatOptions,
        ): string[];
    };
}
