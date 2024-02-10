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
        formatToParts(date?: Date | number): DateTimeFormatPart[];
    }
}
