declare namespace Intl {
    interface DateTimeFormatPartTypesRegistry {
        day: any;
        dayPeriod: any;
        era: any;
        hour: any;
        literal: any;
        minute: any;
        month: any;
        second: any;
        timeZoneName: any;
        weekday: any;
        year: any;
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
