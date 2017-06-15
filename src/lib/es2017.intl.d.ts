type DateTimeFormatPartTypes = "day" | "dayPeriod" | "era" | "hour" | "literal" | "minute" | "month" | "second" | "timeZoneName" | "weekday" | "year";

interface DateTimeFormatPart {
    type: DateTimeFormatPartTypes;
    value: string;
}

interface DateTimeFormat {
    formatToParts(date?: Date | number): DateTimeFormatPart[];
}
