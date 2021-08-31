declare namespace Intl {

    interface DateTimeFormatOptions {
        dateStyle?: "full" | "long" | "medium" | "short" | undefined;
        timeStyle?: "full" | "long" | "medium" | "short" | undefined;
        dayPeriod?: "narrow" | "short" | "long" | undefined;
        fractionalSecondDigits?: 0 | 1 | 2 | 3 | undefined;
    }
}