declare namespace Intl {
    interface DateTimeFormatPartTypesRegistry {
        day: "day";
        dayPeriod: "dayPeriod";
        era: "era";
        hour: "hour";
        literal: "literal";
        minute: "minute";
        month: "month";
        second: "second";
        timeZoneName: "timeZoneName";
        weekday: "weekday";
        year: "year";
    }
    type DateTimeFormatPartTypes = DateTimeFormatPartTypesRegistry[keyof DateTimeFormatPartTypesRegistry];

    interface DateTimeFormatPart {
        type: DateTimeFormatPartTypes;
        value: string;
    }

    interface DateTimeFormat {
        /**
         * Formats a date as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param date A `Date` object or timestamp. If undefined, defaults to the value of `Date.now()`.
         */
        formatToParts(date?: Date | number): DateTimeFormatPart[];
    }
}
