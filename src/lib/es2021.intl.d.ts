declare namespace Intl {

    interface DateTimeFormatOptions {
        formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
        dateStyle?: "full" | "long" | "medium" | "short" | undefined;
        timeStyle?: "full" | "long" | "medium" | "short" | undefined;
        dayPeriod?: "narrow" | "short" | "long" | undefined;
        fractionalSecondDigits?: 0 | 1 | 2 | 3 | undefined;
    }

    interface DateTimeFormat {
        formatRange(startDate: Date | number | bigint, endDate: Date | number | bigint): string;
        formatRangeToParts(startDate: Date | number | bigint, endDate: Date | number | bigint): DateTimeFormatPart[];
    }

    interface ResolvedDateTimeFormatOptions {
        formatMatcher?: "basic" | "best fit" | "best fit";
        dateStyle?: "full" | "long" | "medium" | "short";
        timeStyle?: "full" | "long" | "medium" | "short";
        hourCycle?: "h11" | "h12" | "h23" | "h24";
        dayPeriod?: "narrow" | "short" | "long";
        fractionalSecondDigits?: 0 | 1 | 2 | 3;
    }
}
