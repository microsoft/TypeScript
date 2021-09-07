declare namespace Intl {

    interface DateTimeFormatOptions {
        formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
        dateStyle?: "full" | "long" | "medium" | "short" | undefined;
        timeStyle?: "full" | "long" | "medium" | "short" | undefined;
        dayPeriod?: "narrow" | "short" | "long" | undefined;
        fractionalSecondDigits?: 0 | 1 | 2 | 3 | undefined;
    }

    interface NumberFormat {
        formatRange(startDate: number | bigint, endDate: number | bigint): string;
        formatRangeToParts(startDate: number | bigint, endDate: number | bigint): NumberFormatPart[];
    }
}