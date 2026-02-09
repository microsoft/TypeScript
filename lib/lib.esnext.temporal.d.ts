/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2020.intl" />
/// <reference lib="es2025.intl" />

declare namespace Temporal {
    type CalendarLike = PlainDate | PlainDateTime | PlainMonthDay | PlainYearMonth | ZonedDateTime | string;
    type DurationLike = Duration | DurationLikeObject | string;
    type InstantLike = Instant | ZonedDateTime | string;
    type PlainDateLike = PlainDate | ZonedDateTime | PlainDateTime | DateLikeObject | string;
    type PlainDateTimeLike = PlainDateTime | ZonedDateTime | PlainDate | DateTimeLikeObject | string;
    type PlainMonthDayLike = PlainMonthDay | MonthDayLikeObject | string;
    type PlainTimeLike = PlainTime | PlainDateTime | ZonedDateTime | TimeLikeObject | string;
    type PlainYearMonthLike = PlainYearMonth | YearMonthLikeObject | string;
    type TimeZoneLike = ZonedDateTime | string;
    type ZonedDateTimeLike = ZonedDateTime | ZonedDateTimeLikeObject | string;

    type PartialTemporalLike<T extends object> = {
        [P in Exclude<keyof T, "calendar" | "timeZone">]?: T[P] | undefined;
    };

    interface DateLikeObject {
        year?: number | undefined;
        era?: string | undefined;
        eraYear?: number | undefined;
        month?: number | undefined;
        monthCode?: string | undefined;
        day: number;
        calendar?: string | undefined;
    }

    interface DateTimeLikeObject extends DateLikeObject, TimeLikeObject {}

    interface DurationLikeObject {
        years?: number | undefined;
        months?: number | undefined;
        weeks?: number | undefined;
        days?: number | undefined;
        hours?: number | undefined;
        minutes?: number | undefined;
        seconds?: number | undefined;
        milliseconds?: number | undefined;
        microseconds?: number | undefined;
        nanoseconds?: number | undefined;
    }

    interface MonthDayLikeObject extends Omit<DateLikeObject, "era" | "eraYear"> {}

    interface TimeLikeObject {
        hour?: number | undefined;
        minute?: number | undefined;
        second?: number | undefined;
        millisecond?: number | undefined;
        microsecond?: number | undefined;
        nanosecond?: number | undefined;
    }

    interface YearMonthLikeObject extends Omit<DateLikeObject, "day"> {}

    interface ZonedDateTimeLikeObject extends DateTimeLikeObject {
        timeZone: TimeZoneLike;
        offset?: string | undefined;
    }

    type DateUnit = "year" | "month" | "week" | "day" | "years" | "months" | "weeks" | "days";
    type TimeUnit = "hour" | "minute" | "second" | "millisecond" | "microsecond" | "nanosecond" | "hours" | "minutes" | "seconds" | "milliseconds" | "microseconds" | "nanoseconds";

    interface DisambiguationOptions {
        disambiguation?: "compatible" | "earlier" | "later" | "reject" | undefined;
    }

    interface OverflowOptions {
        overflow?: "constrain" | "reject" | undefined;
    }

    interface TransitionOptions {
        direction: "next" | "previous";
    }

    interface RoundingOptions<Units extends DateUnit | TimeUnit> {
        smallestUnit?: Units | undefined;
        roundingIncrement?: number | undefined;
        roundingMode?: "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined;
    }

    interface RoundingOptionsWithLargestUnit<Units extends DateUnit | TimeUnit> extends RoundingOptions<Units> {
        largestUnit?: "auto" | Units | undefined;
    }

    interface ToStringRoundingOptions<Units extends DateUnit | TimeUnit> extends Pick<RoundingOptions<Units>, "smallestUnit" | "roundingMode"> {}

    interface ToStringRoundingOptionsWithFractionalSeconds<Units extends DateUnit | TimeUnit> extends ToStringRoundingOptions<Units> {
        fractionalSecondDigits?: "auto" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
    }

    namespace Now {
        function timeZoneId(): string;
        function instant(): Instant;
        function plainDateTimeISO(timeZone?: TimeZoneLike): PlainDateTime;
        function zonedDateTimeISO(timeZone?: TimeZoneLike): ZonedDateTime;
        function plainDateISO(timeZone?: TimeZoneLike): PlainDate;
        function plainTimeISO(timeZone?: TimeZoneLike): PlainTime;
    }

    interface PlainDateToStringOptions {
        calendarName?: "auto" | "always" | "never" | "critical" | undefined;
    }

    interface PlainDateToZonedDateTimeOptions {
        plainTime?: PlainTimeLike | undefined;
        timeZone: TimeZoneLike;
    }

    interface PlainDate {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        toPlainYearMonth(): PlainYearMonth;
        toPlainMonthDay(): PlainMonthDay;
        add(duration: DurationLike, options?: OverflowOptions): PlainDate;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainDate;
        with(dateLike: PartialTemporalLike<DateLikeObject>, options?: OverflowOptions): PlainDate;
        withCalendar(calendarLike: CalendarLike): PlainDate;
        until(other: PlainDateLike, options?: RoundingOptionsWithLargestUnit<DateUnit>): Duration;
        since(other: PlainDateLike, options?: RoundingOptionsWithLargestUnit<DateUnit>): Duration;
        equals(other: PlainDateLike): boolean;
        toPlainDateTime(time?: PlainTimeLike): PlainDateTime;
        toZonedDateTime(timeZone: TimeZoneLike): ZonedDateTime;
        toZonedDateTime(item: PlainDateToZonedDateTimeOptions): ZonedDateTime;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.PlainDate";
    }

    interface PlainDateConstructor {
        new (isoYear: number, isoMonth: number, isoDay: number, calendar?: string): PlainDate;
        readonly prototype: PlainDate;
        from(item: PlainDateLike, options?: OverflowOptions): PlainDate;
        compare(one: PlainDateLike, two: PlainDateLike): number;
    }
    var PlainDate: PlainDateConstructor;

    interface PlainTimeToStringOptions extends ToStringRoundingOptionsWithFractionalSeconds<Exclude<TimeUnit, "hour" | "hours">> {}

    interface PlainTime {
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        add(duration: DurationLike): PlainTime;
        subtract(duration: DurationLike): PlainTime;
        with(timeLike: PartialTemporalLike<TimeLikeObject>, options?: OverflowOptions): PlainTime;
        until(other: PlainTimeLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        since(other: PlainTimeLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        equals(other: PlainTimeLike): boolean;
        round(roundTo: TimeUnit): PlainTime;
        round(roundTo: RoundingOptions<TimeUnit>): PlainTime;
        toString(options?: PlainTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.PlainTime";
    }

    interface PlainTimeConstructor {
        new (hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number): PlainTime;
        readonly prototype: PlainTime;
        from(item: PlainTimeLike, options?: OverflowOptions): PlainTime;
        compare(one: PlainTimeLike, two: PlainTimeLike): number;
    }
    var PlainTime: PlainTimeConstructor;

    interface PlainDateTimeToStringOptions extends PlainDateToStringOptions, PlainTimeToStringOptions {}

    interface PlainDateTime {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        with(dateTimeLike: PartialTemporalLike<DateTimeLikeObject>, options?: OverflowOptions): PlainDateTime;
        withPlainTime(plainTime?: PlainTimeLike): PlainDateTime;
        withCalendar(calendar: CalendarLike): PlainDateTime;
        add(duration: DurationLike, options?: OverflowOptions): PlainDateTime;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainDateTime;
        until(other: PlainDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        since(other: PlainDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        round(roundTo: "day" | "days" | TimeUnit): PlainDateTime;
        round(roundTo: RoundingOptions<"day" | "days" | TimeUnit>): PlainDateTime;
        equals(other: PlainDateTimeLike): boolean;
        toString(options?: PlainDateTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toZonedDateTime(timeZone: TimeZoneLike, options?: DisambiguationOptions): ZonedDateTime;
        toPlainDate(): PlainDate;
        toPlainTime(): PlainTime;
        readonly [Symbol.toStringTag]: "Temporal.PlainDateTime";
    }

    interface PlainDateTimeConstructor {
        new (isoYear: number, isoMonth: number, isoDay: number, hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number, calendar?: string): PlainDateTime;
        readonly prototype: PlainDateTime;
        from(item: PlainDateTimeLike, options?: OverflowOptions): PlainDateTime;
        compare(one: PlainDateTimeLike, two: PlainDateTimeLike): number;
    }
    var PlainDateTime: PlainDateTimeConstructor;

    interface ZonedDateTimeToStringOptions extends PlainDateTimeToStringOptions {
        offset?: "auto" | "never" | undefined;
        timeZoneName?: "auto" | "never" | "critical" | undefined;
    }

    interface ZonedDateTimeFromOptions extends OverflowOptions, DisambiguationOptions {
        offset?: "use" | "ignore" | "prefer" | "reject" | undefined;
    }

    interface ZonedDateTime {
        readonly calendarId: string;
        readonly timeZoneId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly hoursInDay: number;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        readonly offsetNanoseconds: number;
        readonly offset: string;
        with(zonedDateTimeLike: PartialTemporalLike<ZonedDateTimeLikeObject>, options?: ZonedDateTimeFromOptions): ZonedDateTime;
        withPlainTime(plainTime?: PlainTimeLike): ZonedDateTime;
        withTimeZone(timeZone: TimeZoneLike): ZonedDateTime;
        withCalendar(calendar: CalendarLike): ZonedDateTime;
        add(duration: DurationLike, options?: OverflowOptions): ZonedDateTime;
        subtract(duration: DurationLike, options?: OverflowOptions): ZonedDateTime;
        until(other: ZonedDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        since(other: ZonedDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        round(roundTo: "day" | "days" | TimeUnit): ZonedDateTime;
        round(roundTo: RoundingOptions<"day" | "days" | TimeUnit>): ZonedDateTime;
        equals(other: ZonedDateTimeLike): boolean;
        toString(options?: ZonedDateTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        startOfDay(): ZonedDateTime;
        getTimeZoneTransition(direction: "next" | "previous"): ZonedDateTime | null;
        getTimeZoneTransition(direction: TransitionOptions): ZonedDateTime | null;
        toInstant(): Instant;
        toPlainDate(): PlainDate;
        toPlainTime(): PlainTime;
        toPlainDateTime(): PlainDateTime;
        readonly [Symbol.toStringTag]: "Temporal.ZonedDateTime";
    }

    interface ZonedDateTimeConstructor {
        new (epochNanoseconds: bigint, timeZone: string, calendar?: string): ZonedDateTime;
        readonly prototype: ZonedDateTime;
        from(item: ZonedDateTimeLike, options?: ZonedDateTimeFromOptions): ZonedDateTime;
        compare(one: ZonedDateTimeLike, two: ZonedDateTimeLike): number;
    }
    var ZonedDateTime: ZonedDateTimeConstructor;

    interface DurationRelativeToOptions {
        relativeTo?: ZonedDateTimeLike | PlainDateLike | undefined;
    }

    interface DurationRoundingOptions extends DurationRelativeToOptions, RoundingOptionsWithLargestUnit<DateUnit | TimeUnit> {}

    interface DurationToStringOptions extends ToStringRoundingOptionsWithFractionalSeconds<Exclude<TimeUnit, "hour" | "minute" | "hours" | "minutes">> {}

    interface DurationTotalOptions extends DurationRelativeToOptions {
        unit: DateUnit | TimeUnit;
    }

    interface Duration {
        readonly years: number;
        readonly months: number;
        readonly weeks: number;
        readonly days: number;
        readonly hours: number;
        readonly minutes: number;
        readonly seconds: number;
        readonly milliseconds: number;
        readonly microseconds: number;
        readonly nanoseconds: number;
        readonly sign: number;
        readonly blank: boolean;
        with(durationLike: PartialTemporalLike<DurationLikeObject>): Duration;
        negated(): Duration;
        abs(): Duration;
        add(other: DurationLike): Duration;
        subtract(other: DurationLike): Duration;
        round(roundTo: "day" | "days" | TimeUnit): Duration;
        round(roundTo: DurationRoundingOptions): Duration;
        total(totalOf: "day" | "days" | TimeUnit): number;
        total(totalOf: DurationTotalOptions): number;
        toString(options?: DurationToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DurationFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.Duration";
    }

    interface DurationConstructor {
        new (years?: number, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number, microseconds?: number, nanoseconds?: number): Duration;
        readonly prototype: Duration;
        from(item: DurationLike): Duration;
        compare(one: DurationLike, two: DurationLike, options?: DurationRelativeToOptions): number;
    }
    var Duration: DurationConstructor;

    interface InstantToStringOptions extends PlainTimeToStringOptions {
        timeZone?: TimeZoneLike | undefined;
    }

    interface Instant {
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        add(duration: DurationLike): Instant;
        subtract(duration: DurationLike): Instant;
        until(other: InstantLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        since(other: InstantLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        round(roundTo: TimeUnit): Instant;
        round(roundTo: RoundingOptions<TimeUnit>): Instant;
        equals(other: InstantLike): boolean;
        toString(options?: InstantToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toZonedDateTimeISO(timeZone: TimeZoneLike): ZonedDateTime;
        readonly [Symbol.toStringTag]: "Temporal.Instant";
    }

    interface InstantConstructor {
        new (epochNanoseconds: bigint): Instant;
        readonly prototype: Instant;
        from(item: InstantLike): Instant;
        fromEpochMilliseconds(epochMilliseconds: number): Instant;
        fromEpochNanoseconds(epochNanoseconds: bigint): Instant;
        compare(one: InstantLike, two: InstantLike): number;
    }
    var Instant: InstantConstructor;

    interface PlainYearMonthToPlainDateOptions {
        day: number;
    }

    interface PlainYearMonth {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly daysInYear: number;
        readonly daysInMonth: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        with(yearMonthLike: PartialTemporalLike<YearMonthLikeObject>, options?: OverflowOptions): PlainYearMonth;
        add(duration: DurationLike, options?: OverflowOptions): PlainYearMonth;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainYearMonth;
        until(other: PlainYearMonthLike, options?: RoundingOptionsWithLargestUnit<"year" | "month" | "years" | "months">): Duration;
        since(other: PlainYearMonthLike, options?: RoundingOptionsWithLargestUnit<"year" | "month" | "years" | "months">): Duration;
        equals(other: PlainYearMonthLike): boolean;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toPlainDate(item: PlainYearMonthToPlainDateOptions): PlainDate;
        readonly [Symbol.toStringTag]: "Temporal.PlainYearMonth";
    }

    interface PlainYearMonthConstructor {
        new (isoYear: number, isoMonth: number, calendar?: string, referenceISODay?: number): PlainYearMonth;
        readonly prototype: PlainYearMonth;
        from(item: PlainYearMonthLike, options?: OverflowOptions): PlainYearMonth;
        compare(one: PlainYearMonthLike, two: PlainYearMonthLike): number;
    }
    var PlainYearMonth: PlainYearMonthConstructor;

    interface PlainMonthDayToPlainDateOptions {
        era?: string | undefined;
        eraYear?: number | undefined;
        year?: number | undefined;
    }

    interface PlainMonthDay {
        readonly calendarId: string;
        readonly monthCode: string;
        readonly day: number;
        with(monthDayLike: PartialTemporalLike<MonthDayLikeObject>, options?: OverflowOptions): PlainMonthDay;
        equals(other: PlainMonthDayLike): boolean;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toPlainDate(item: PlainMonthDayToPlainDateOptions): PlainDate;
        readonly [Symbol.toStringTag]: "Temporal.PlainMonthDay";
    }

    interface PlainMonthDayConstructor {
        new (isoMonth: number, isoDay: number, calendar?: string, referenceISOYear?: number): PlainMonthDay;
        readonly prototype: PlainMonthDay;
        from(item: PlainMonthDayLike, options?: OverflowOptions): PlainMonthDay;
    }
    var PlainMonthDay: PlainMonthDayConstructor;
}
