declare namespace Intl {
    interface DateTimeFormatPartTypesRegistry {
        day: never;
        dayPeriod: never;
        era: never;
        hour: never;
        literal: never;
        minute: never;
        month: never;
        second: never;
        timeZoneName: never;
        weekday: never;
        year: never;
    }
    type DateTimeFormatPartTypes = keyof DateTimeFormatPartTypesRegistry;

    interface DateTimeFormatPart {
        type: DateTimeFormatPartTypes;
        value: string;
    }

    interface DateTimeFormat {
        /**
         * Formats a date as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param date A `Date` object or timestamp.
         */
        formatToParts(date?: Date | number): DateTimeFormatPart[];
    }
}
