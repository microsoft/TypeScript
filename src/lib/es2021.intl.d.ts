declare namespace Intl {

    interface DateTimeFormatOptions {
        dateStyle?: "full" | "long" | "medium" | "short";
        timeStyle?: "full" | "long" | "medium" | "short";
        dayPeriod?: "narrow" | "short" | "long";
        fractionalSecondDigits?: 0 | 1 | 2 | 3;
    }
}