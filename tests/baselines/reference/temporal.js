//// [tests/cases/compiler/temporal.ts] ////

//// [temporal.ts]
let timeZoneLike: Temporal.TimeZoneLike;
timeZoneLike = new Temporal.ZonedDateTime(1234567890n, 'UTC');
timeZoneLike = Temporal.Now.timeZoneId();

let instant: Temporal.Instant;
instant = Temporal.Now.instant();

let plainDate: Temporal.PlainDate;
plainDate = Temporal.Now.plainDateISO();
plainDate = Temporal.Now.plainDateISO(timeZoneLike);

let plainDateTime: Temporal.PlainDateTime;
plainDateTime = Temporal.Now.plainDateTimeISO();
plainDateTime = Temporal.Now.plainDateTimeISO(timeZoneLike)

let plainTime: Temporal.PlainTime;
plainTime = Temporal.Now.plainTimeISO();
plainTime = Temporal.Now.plainTimeISO(timeZoneLike);

let zonedDateTime: Temporal.ZonedDateTime;
zonedDateTime = Temporal.Now.zonedDateTimeISO();
zonedDateTime = Temporal.Now.zonedDateTimeISO(timeZoneLike);

let durationLike: Temporal.DurationLike;
durationLike = new Temporal.Duration();
durationLike = {
    years: 1,
    months: 2,
    weeks: 3,
    days: 4,
    hours: 5,
    minutes: 6,
    seconds: 7,
    milliseconds: 8,
    microseconds: 9,
    nanoseconds: 10,
};

let calendarLike!: Temporal.CalendarLike;

declare const anyRoundingUnits: Temporal.DateUnit | Temporal.TimeUnit | undefined;
declare const calendarName: 'auto' | 'always' | 'never' | 'critical' | undefined;
declare const disambiguation: 'compatible' | 'earlier' | 'later' | 'reject' | undefined;
declare const fractionalSecondDigits: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
declare const roundingIncrement: number | undefined;
declare const roundingMode: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven' | undefined;
declare const overflow: 'constrain' | 'reject' | undefined;
declare const locales: Intl.LocalesArgument | undefined;
declare const toLocaleStringOptions: Intl.DateTimeFormatOptions | undefined;

{
    let duration: Temporal.Duration;
    duration = new Temporal.Duration();
    duration = new Temporal.Duration(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

    duration = Temporal.Duration.from(duration);
    duration = Temporal.Duration.from(durationLike);

    Temporal.Duration.compare(duration, durationLike);
    Temporal.Duration.compare(duration, durationLike, { relativeTo: plainDate });

    const {
        blank,
        days,
        hours,
        microseconds,
        milliseconds,
        minutes,
        months,
        nanoseconds,
        seconds,
        sign,
        weeks,
        years,
        [Symbol.toStringTag]: toStringTag,
    } = duration;

    let roundingUnits!: (Temporal.DateUnit & `day${string}`) | Temporal.TimeUnit;
    let toStringUnits!: Exclude<Temporal.TimeUnit, `hour${string}` | `minute${string}`> | undefined;

    duration.abs();
    duration.add(durationLike);
    duration.negated();
    duration.round(roundingUnits);
    duration.round({ smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, relativeTo: plainDateTime, roundingIncrement, roundingMode });
    duration.subtract(durationLike);
    duration.toJSON();
    duration.toLocaleString();
    duration.toLocaleString(locales);
    duration.toLocaleString(locales, toLocaleStringOptions);
    duration.toString();
    duration.toString({});
    duration.toString({ smallestUnit: toStringUnits, fractionalSecondDigits, roundingMode });
    duration.total(roundingUnits!);
    duration.total({ unit: anyRoundingUnits! });
    duration.total({ unit: anyRoundingUnits!, relativeTo: zonedDateTime });
    duration.with({ days, hours, microseconds, milliseconds, minutes, months, nanoseconds, seconds, weeks, years });
}

{
    instant = new Temporal.Instant(1234567890n);

    let instantLike: Temporal.InstantLike;
    instantLike = instant;
    instantLike = '1970-01-01T00:00:00.000Z';

    instant = Temporal.Instant.from(instant);
    instant = Temporal.Instant.from(instantLike);
    instant = Temporal.Instant.fromEpochMilliseconds(1234567890);
    instant = Temporal.Instant.fromEpochNanoseconds(1234567890n);

    Temporal.Instant.compare(instant, instantLike);

    const {
        epochMilliseconds,
        epochNanoseconds,
        [Symbol.toStringTag]: toStringTag,
    } = instant;

    let roundingUnits!: Temporal.TimeUnit | undefined;
    let toStringUnits!: Exclude<Temporal.TimeUnit, `hour${string}`> | undefined;

    instant.add(durationLike);
    instant.equals(instantLike);
    instant.round(roundingUnits!);
    instant.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    instant.since(instantLike);
    instant.since(instantLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    instant.subtract(durationLike);
    instant.toJSON();
    instant.toLocaleString();
    instant.toLocaleString(locales);
    instant.toLocaleString(locales, toLocaleStringOptions);
    instant.toString();
    instant.toString({ smallestUnit: toStringUnits, timeZone: timeZoneLike, fractionalSecondDigits, roundingMode });
    instant.toZonedDateTimeISO(timeZoneLike);
    instant.until(instantLike);
    instant.until(instantLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
}

{
    plainDate = new Temporal.PlainDate(1970, 1, 1);
    plainDate = new Temporal.PlainDate(1970, 1, 1, 'gregorian');

    let plainDateLike: Temporal.PlainDateLike;
    plainDateLike = plainDate;
    plainDateLike = plainDateTime;
    plainDateLike = zonedDateTime;
    plainDateLike = {
        day: 1,
        month: 1,
        year: 1970,
    };

    plainDate = Temporal.PlainDate.from(plainDate);
    plainDate = Temporal.PlainDate.from(plainDateLike);
    plainDate = Temporal.PlainDate.from(plainDateLike, { overflow });

    Temporal.PlainDate.compare(plainDate, plainDateLike);

    const {
        calendarId,
        day,
        dayOfWeek,
        dayOfYear,
        daysInMonth,
        daysInWeek,
        daysInYear,
        era,
        eraYear,
        inLeapYear,
        month,
        monthCode,
        monthsInYear,
        weekOfYear,
        year,
        yearOfWeek,
        [Symbol.toStringTag]: toStringTag,
    } = plainDate;

    let roundingUnits!: Temporal.DateUnit | undefined;

    plainDate.add(durationLike);
    plainDate.add(durationLike, { overflow });
    plainDate.equals(plainDateLike);
    plainDate.since(plainDateLike);
    plainDate.since(plainDateLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDate.subtract(durationLike);
    plainDate.subtract(durationLike, { overflow });
    plainDate.toJSON();
    plainDate.toLocaleString();
    plainDate.toLocaleString(locales);
    plainDate.toLocaleString(locales, toLocaleStringOptions);
    plainDate.toPlainDateTime();
    plainDate.toPlainDateTime(plainTime);
    plainDate.toPlainMonthDay();
    plainDate.toPlainYearMonth();
    plainDate.toString();
    plainDate.toString({ calendarName });
    plainDate.toZonedDateTime(timeZoneLike);
    plainDate.until(plainDateLike);
    plainDate.until(plainDateLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDate.with({ year, era, eraYear, month, monthCode, day });
    plainDate.with({ year, era, eraYear, month, monthCode, day }, { overflow });
    plainDate.withCalendar(calendarLike);
}

{
    plainDateTime = new Temporal.PlainDateTime(1970, 1, 1);
    plainDateTime = new Temporal.PlainDateTime(1970, 1, 1, 0, 0, 0, 0, 0, 0, 'iso8601');

    let plainDateTimeLike: Temporal.PlainDateTimeLike;
    plainDateTimeLike = plainDateTime;
    plainDateTimeLike = plainDate;
    plainDateTimeLike = zonedDateTime;
    plainDateTimeLike = {
        day: 1,
        month: 1,
        year: 1970,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    };

    plainDateTime = Temporal.PlainDateTime.from(plainDateTimeLike);
    plainDateTime = Temporal.PlainDateTime.from(plainDateTimeLike, { overflow });

    Temporal.PlainDateTime.compare(plainDateTime, plainDateTimeLike);

    const {
        calendarId,
        day,
        dayOfWeek,
        dayOfYear,
        daysInMonth,
        daysInWeek,
        daysInYear,
        era,
        eraYear,
        hour,
        inLeapYear,
        microsecond,
        millisecond,
        minute,
        month,
        monthCode,
        monthsInYear,
        nanosecond,
        second,
        weekOfYear,
        year,
        yearOfWeek,
        [Symbol.toStringTag]: toStringTag,
    } = plainDateTime;

    let roundingUnits!: (Temporal.DateUnit & `day${string}`) | Temporal.TimeUnit | undefined;
    let toStringUnits!: Exclude<Temporal.TimeUnit, `hour${string}`> | undefined;

    plainDateTime.add(durationLike);
    plainDateTime.add(durationLike, { overflow });
    plainDateTime.equals(plainDateTimeLike);
    plainDateTime.round(roundingUnits!);
    plainDateTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDateTime.since(plainDateTimeLike);
    plainDateTime.since(plainDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    plainDateTime.subtract(durationLike);
    plainDateTime.subtract(durationLike, { overflow });
    plainDateTime.toJSON();
    plainDateTime.toLocaleString();
    plainDateTime.toLocaleString(locales);
    plainDateTime.toLocaleString(locales, toLocaleStringOptions);
    plainDateTime.toPlainDate();
    plainDateTime.toPlainTime();
    plainDateTime.toString();
    plainDateTime.toString({ smallestUnit: toStringUnits, calendarName, fractionalSecondDigits, roundingMode });
    plainDateTime.toZonedDateTime(timeZoneLike);
    plainDateTime.toZonedDateTime(timeZoneLike, { disambiguation });
    plainDateTime.until(plainDateTimeLike);
    plainDateTime.until(plainDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    plainDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond });
    plainDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond }, { overflow });
    plainDateTime.withCalendar(calendarLike);
    plainDateTime.withPlainTime();
    plainDateTime.withPlainTime(plainTime);
}

{
    let plainMonthDay: Temporal.PlainMonthDay;
    plainMonthDay = new Temporal.PlainMonthDay(1, 1);
    plainMonthDay = new Temporal.PlainMonthDay(1, 1, 'gregorian', 1972);

    let plainMonthDayLike: Temporal.PlainMonthDayLike;
    plainMonthDayLike = plainMonthDay;
    plainMonthDayLike = {
        day: 1,
        month: 1,
        year: 1970,
    };

    plainMonthDay = Temporal.PlainMonthDay.from(plainMonthDayLike);
    plainMonthDay = Temporal.PlainMonthDay.from(plainMonthDayLike, { overflow });

    const {
        calendarId,
        day,
        monthCode,
        [Symbol.toStringTag]: toStringTag,
    } = plainMonthDay;

    plainMonthDay.equals(plainMonthDayLike);
    plainMonthDay.toJSON();
    plainMonthDay.toLocaleString();
    plainMonthDay.toLocaleString(locales);
    plainMonthDay.toLocaleString(locales, toLocaleStringOptions);
    plainMonthDay.toPlainDate({ year: 1970 });
    plainMonthDay.toString();
    plainMonthDay.toString({ calendarName });
    plainMonthDay.with({ monthCode, day });
}

{
    plainTime = new Temporal.PlainTime();
    plainTime = new Temporal.PlainTime(1, 2, 3, 4, 5, 6);

    let plainTimeLike: Temporal.PlainTimeLike;
    plainTimeLike = plainTime;
    plainTimeLike = plainDateTime;
    plainTimeLike = zonedDateTime;
    plainTimeLike = {
        hour: 1,
        minute: 2,
        second: 3,
        millisecond: 4,
        microsecond: 5,
        nanosecond: 6,
    };

    const {
        hour,
        microsecond,
        millisecond,
        minute,
        nanosecond,
        second,
        [Symbol.toStringTag]: toStringTag,
    } = plainTime;

    let roundingUnits!: Temporal.TimeUnit | undefined;
    let toStringUnits!: Exclude<Temporal.TimeUnit, `hour${string}`> | undefined;

    plainTime.add(durationLike);
    plainTime.equals(plainTimeLike);
    plainTime.round(roundingUnits!);
    plainTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.since(plainTimeLike);
    plainTime.since(plainTimeLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.subtract(durationLike);
    plainTime.toJSON();
    plainTime.toLocaleString();
    plainTime.toLocaleString(locales);
    plainTime.toLocaleString(locales, toLocaleStringOptions);
    plainTime.toString();
    plainTime.toString({ smallestUnit: toStringUnits, fractionalSecondDigits, roundingMode });
    plainTime.until(plainTimeLike);
    plainTime.until(plainTimeLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.with({ hour, minute, second, millisecond, microsecond, nanosecond });
}

{
    let plainYearMonth: Temporal.PlainYearMonth;
    plainYearMonth = new Temporal.PlainYearMonth(1970, 1);
    plainYearMonth = new Temporal.PlainYearMonth(1970, 1, 'gregorian', 1);

    let plainYearMonthLike: Temporal.PlainYearMonthLike;
    plainYearMonthLike = plainYearMonth;
    plainYearMonthLike = {
        month: 1,
        year: 1970,
    };

    plainYearMonth = Temporal.PlainYearMonth.from(plainYearMonthLike);
    plainYearMonth = Temporal.PlainYearMonth.from(plainYearMonthLike, { overflow });

    Temporal.PlainYearMonth.compare(plainYearMonth, plainYearMonthLike);

    const {
        calendarId,
        daysInMonth,
        daysInYear,
        era,
        eraYear,
        inLeapYear,
        month,
        monthCode,
        monthsInYear,
        year,
        [Symbol.toStringTag]: toStringTag,
    } = plainYearMonth;

    let roundingUnits!: (Temporal.DateUnit & (`year${string}` | `month${string}`)) | undefined;

    plainYearMonth.add(durationLike);
    plainYearMonth.add(durationLike, { overflow });
    plainYearMonth.equals(plainYearMonthLike);
    plainYearMonth.since(plainYearMonthLike);
    plainYearMonth.since(plainYearMonthLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainYearMonth.subtract(durationLike);
    plainYearMonth.subtract(durationLike, { overflow });
    plainYearMonth.toJSON();
    plainYearMonth.toLocaleString();
    plainYearMonth.toLocaleString(locales);
    plainYearMonth.toLocaleString(locales, toLocaleStringOptions);
    plainYearMonth.toPlainDate({ day: 1 });
    plainYearMonth.toString();
    plainYearMonth.toString({ calendarName });
    plainYearMonth.until(plainYearMonthLike);
    plainYearMonth.until(plainYearMonthLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainYearMonth.with({ year, era, eraYear, month, monthCode });
}

{
    zonedDateTime = new Temporal.ZonedDateTime(1234567890n, 'UTC');
    zonedDateTime = new Temporal.ZonedDateTime(1234567890n, 'UTC', 'iso8601');

    let zonedDateTimeLike: Temporal.ZonedDateTimeLike;
    zonedDateTimeLike = zonedDateTime;
    zonedDateTimeLike = {
        day: 1,
        month: 1,
        year: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        timeZone: 'UTC',
    };

    let toZonedDateTimeOffset!: 'use' | 'ignore' | 'reject' | 'prefer' | undefined;
    zonedDateTime = Temporal.ZonedDateTime.from(zonedDateTimeLike);
    zonedDateTime = Temporal.ZonedDateTime.from(zonedDateTimeLike, { disambiguation, offset: toZonedDateTimeOffset, overflow });

    Temporal.ZonedDateTime.compare(zonedDateTime, zonedDateTimeLike);

    const {
        calendarId,
        day,
        dayOfWeek,
        dayOfYear,
        daysInMonth,
        daysInWeek,
        daysInYear,
        epochMilliseconds,
        epochNanoseconds,
        era,
        eraYear,
        hour,
        hoursInDay,
        inLeapYear,
        microsecond,
        millisecond,
        minute,
        month,
        monthCode,
        monthsInYear,
        nanosecond,
        offset,
        offsetNanoseconds,
        second,
        timeZoneId,
        weekOfYear,
        year,
        yearOfWeek,
        [Symbol.toStringTag]: toStringTag,
    } = zonedDateTime;

    let direction!: 'next' | 'previous';
    let toStringOffset!: 'auto' | 'never' | undefined;
    let timeZoneName!: 'auto' | 'never' | 'critical' | undefined;
    let roundingUnits!: (Temporal.DateUnit & `day${string}`) | Temporal.TimeUnit | undefined;
    let toStringUnits!: Exclude<Temporal.TimeUnit, `hour${string}`> | undefined;

    zonedDateTime.add(durationLike);
    zonedDateTime.add(durationLike, { overflow });
    zonedDateTime.equals(zonedDateTimeLike);
    zonedDateTime.getTimeZoneTransition(direction);
    zonedDateTime.getTimeZoneTransition({ direction });
    zonedDateTime.round(roundingUnits!);
    zonedDateTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.since(zonedDateTimeLike);
    zonedDateTime.since(zonedDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.startOfDay();
    zonedDateTime.subtract(durationLike);
    zonedDateTime.subtract(durationLike, { overflow });
    zonedDateTime.toInstant();
    zonedDateTime.toJSON();
    zonedDateTime.toLocaleString();
    zonedDateTime.toLocaleString(locales);
    zonedDateTime.toLocaleString(locales, toLocaleStringOptions);
    zonedDateTime.toPlainDate();
    zonedDateTime.toPlainDateTime();
    zonedDateTime.toPlainTime();
    zonedDateTime.toString();
    zonedDateTime.toString({ smallestUnit: toStringUnits, calendarName, timeZoneName, fractionalSecondDigits, offset: toStringOffset, roundingMode });
    zonedDateTime.until(zonedDateTimeLike);
    zonedDateTime.until(zonedDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset });
    zonedDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset }, { disambiguation, offset: toZonedDateTimeOffset, overflow });
    zonedDateTime.withCalendar(calendarLike);
    zonedDateTime.withPlainTime();
    zonedDateTime.withPlainTime(plainTime);
    zonedDateTime.withTimeZone(timeZoneLike);
}


//// [temporal.js]
"use strict";
let timeZoneLike;
timeZoneLike = new Temporal.ZonedDateTime(1234567890n, 'UTC');
timeZoneLike = Temporal.Now.timeZoneId();
let instant;
instant = Temporal.Now.instant();
let plainDate;
plainDate = Temporal.Now.plainDateISO();
plainDate = Temporal.Now.plainDateISO(timeZoneLike);
let plainDateTime;
plainDateTime = Temporal.Now.plainDateTimeISO();
plainDateTime = Temporal.Now.plainDateTimeISO(timeZoneLike);
let plainTime;
plainTime = Temporal.Now.plainTimeISO();
plainTime = Temporal.Now.plainTimeISO(timeZoneLike);
let zonedDateTime;
zonedDateTime = Temporal.Now.zonedDateTimeISO();
zonedDateTime = Temporal.Now.zonedDateTimeISO(timeZoneLike);
let durationLike;
durationLike = new Temporal.Duration();
durationLike = {
    years: 1,
    months: 2,
    weeks: 3,
    days: 4,
    hours: 5,
    minutes: 6,
    seconds: 7,
    milliseconds: 8,
    microseconds: 9,
    nanoseconds: 10,
};
let calendarLike;
{
    let duration;
    duration = new Temporal.Duration();
    duration = new Temporal.Duration(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    duration = Temporal.Duration.from(duration);
    duration = Temporal.Duration.from(durationLike);
    Temporal.Duration.compare(duration, durationLike);
    Temporal.Duration.compare(duration, durationLike, { relativeTo: plainDate });
    const { blank, days, hours, microseconds, milliseconds, minutes, months, nanoseconds, seconds, sign, weeks, years, [Symbol.toStringTag]: toStringTag, } = duration;
    let roundingUnits;
    let toStringUnits;
    duration.abs();
    duration.add(durationLike);
    duration.negated();
    duration.round(roundingUnits);
    duration.round({ smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, relativeTo: plainDateTime, roundingIncrement, roundingMode });
    duration.subtract(durationLike);
    duration.toJSON();
    duration.toLocaleString();
    duration.toLocaleString(locales);
    duration.toLocaleString(locales, toLocaleStringOptions);
    duration.toString();
    duration.toString({});
    duration.toString({ smallestUnit: toStringUnits, fractionalSecondDigits, roundingMode });
    duration.total(roundingUnits);
    duration.total({ unit: anyRoundingUnits });
    duration.total({ unit: anyRoundingUnits, relativeTo: zonedDateTime });
    duration.with({ days, hours, microseconds, milliseconds, minutes, months, nanoseconds, seconds, weeks, years });
}
{
    instant = new Temporal.Instant(1234567890n);
    let instantLike;
    instantLike = instant;
    instantLike = '1970-01-01T00:00:00.000Z';
    instant = Temporal.Instant.from(instant);
    instant = Temporal.Instant.from(instantLike);
    instant = Temporal.Instant.fromEpochMilliseconds(1234567890);
    instant = Temporal.Instant.fromEpochNanoseconds(1234567890n);
    Temporal.Instant.compare(instant, instantLike);
    const { epochMilliseconds, epochNanoseconds, [Symbol.toStringTag]: toStringTag, } = instant;
    let roundingUnits;
    let toStringUnits;
    instant.add(durationLike);
    instant.equals(instantLike);
    instant.round(roundingUnits);
    instant.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    instant.since(instantLike);
    instant.since(instantLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    instant.subtract(durationLike);
    instant.toJSON();
    instant.toLocaleString();
    instant.toLocaleString(locales);
    instant.toLocaleString(locales, toLocaleStringOptions);
    instant.toString();
    instant.toString({ smallestUnit: toStringUnits, timeZone: timeZoneLike, fractionalSecondDigits, roundingMode });
    instant.toZonedDateTimeISO(timeZoneLike);
    instant.until(instantLike);
    instant.until(instantLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
}
{
    plainDate = new Temporal.PlainDate(1970, 1, 1);
    plainDate = new Temporal.PlainDate(1970, 1, 1, 'gregorian');
    let plainDateLike;
    plainDateLike = plainDate;
    plainDateLike = plainDateTime;
    plainDateLike = zonedDateTime;
    plainDateLike = {
        day: 1,
        month: 1,
        year: 1970,
    };
    plainDate = Temporal.PlainDate.from(plainDate);
    plainDate = Temporal.PlainDate.from(plainDateLike);
    plainDate = Temporal.PlainDate.from(plainDateLike, { overflow });
    Temporal.PlainDate.compare(plainDate, plainDateLike);
    const { calendarId, day, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, era, eraYear, inLeapYear, month, monthCode, monthsInYear, weekOfYear, year, yearOfWeek, [Symbol.toStringTag]: toStringTag, } = plainDate;
    let roundingUnits;
    plainDate.add(durationLike);
    plainDate.add(durationLike, { overflow });
    plainDate.equals(plainDateLike);
    plainDate.since(plainDateLike);
    plainDate.since(plainDateLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDate.subtract(durationLike);
    plainDate.subtract(durationLike, { overflow });
    plainDate.toJSON();
    plainDate.toLocaleString();
    plainDate.toLocaleString(locales);
    plainDate.toLocaleString(locales, toLocaleStringOptions);
    plainDate.toPlainDateTime();
    plainDate.toPlainDateTime(plainTime);
    plainDate.toPlainMonthDay();
    plainDate.toPlainYearMonth();
    plainDate.toString();
    plainDate.toString({ calendarName });
    plainDate.toZonedDateTime(timeZoneLike);
    plainDate.until(plainDateLike);
    plainDate.until(plainDateLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDate.with({ year, era, eraYear, month, monthCode, day });
    plainDate.with({ year, era, eraYear, month, monthCode, day }, { overflow });
    plainDate.withCalendar(calendarLike);
}
{
    plainDateTime = new Temporal.PlainDateTime(1970, 1, 1);
    plainDateTime = new Temporal.PlainDateTime(1970, 1, 1, 0, 0, 0, 0, 0, 0, 'iso8601');
    let plainDateTimeLike;
    plainDateTimeLike = plainDateTime;
    plainDateTimeLike = plainDate;
    plainDateTimeLike = zonedDateTime;
    plainDateTimeLike = {
        day: 1,
        month: 1,
        year: 1970,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    };
    plainDateTime = Temporal.PlainDateTime.from(plainDateTimeLike);
    plainDateTime = Temporal.PlainDateTime.from(plainDateTimeLike, { overflow });
    Temporal.PlainDateTime.compare(plainDateTime, plainDateTimeLike);
    const { calendarId, day, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, era, eraYear, hour, inLeapYear, microsecond, millisecond, minute, month, monthCode, monthsInYear, nanosecond, second, weekOfYear, year, yearOfWeek, [Symbol.toStringTag]: toStringTag, } = plainDateTime;
    let roundingUnits;
    let toStringUnits;
    plainDateTime.add(durationLike);
    plainDateTime.add(durationLike, { overflow });
    plainDateTime.equals(plainDateTimeLike);
    plainDateTime.round(roundingUnits);
    plainDateTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainDateTime.since(plainDateTimeLike);
    plainDateTime.since(plainDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    plainDateTime.subtract(durationLike);
    plainDateTime.subtract(durationLike, { overflow });
    plainDateTime.toJSON();
    plainDateTime.toLocaleString();
    plainDateTime.toLocaleString(locales);
    plainDateTime.toLocaleString(locales, toLocaleStringOptions);
    plainDateTime.toPlainDate();
    plainDateTime.toPlainTime();
    plainDateTime.toString();
    plainDateTime.toString({ smallestUnit: toStringUnits, calendarName, fractionalSecondDigits, roundingMode });
    plainDateTime.toZonedDateTime(timeZoneLike);
    plainDateTime.toZonedDateTime(timeZoneLike, { disambiguation });
    plainDateTime.until(plainDateTimeLike);
    plainDateTime.until(plainDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    plainDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond });
    plainDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond }, { overflow });
    plainDateTime.withCalendar(calendarLike);
    plainDateTime.withPlainTime();
    plainDateTime.withPlainTime(plainTime);
}
{
    let plainMonthDay;
    plainMonthDay = new Temporal.PlainMonthDay(1, 1);
    plainMonthDay = new Temporal.PlainMonthDay(1, 1, 'gregorian', 1972);
    let plainMonthDayLike;
    plainMonthDayLike = plainMonthDay;
    plainMonthDayLike = {
        day: 1,
        month: 1,
        year: 1970,
    };
    plainMonthDay = Temporal.PlainMonthDay.from(plainMonthDayLike);
    plainMonthDay = Temporal.PlainMonthDay.from(plainMonthDayLike, { overflow });
    const { calendarId, day, monthCode, [Symbol.toStringTag]: toStringTag, } = plainMonthDay;
    plainMonthDay.equals(plainMonthDayLike);
    plainMonthDay.toJSON();
    plainMonthDay.toLocaleString();
    plainMonthDay.toLocaleString(locales);
    plainMonthDay.toLocaleString(locales, toLocaleStringOptions);
    plainMonthDay.toPlainDate({ year: 1970 });
    plainMonthDay.toString();
    plainMonthDay.toString({ calendarName });
    plainMonthDay.with({ monthCode, day });
}
{
    plainTime = new Temporal.PlainTime();
    plainTime = new Temporal.PlainTime(1, 2, 3, 4, 5, 6);
    let plainTimeLike;
    plainTimeLike = plainTime;
    plainTimeLike = plainDateTime;
    plainTimeLike = zonedDateTime;
    plainTimeLike = {
        hour: 1,
        minute: 2,
        second: 3,
        millisecond: 4,
        microsecond: 5,
        nanosecond: 6,
    };
    const { hour, microsecond, millisecond, minute, nanosecond, second, [Symbol.toStringTag]: toStringTag, } = plainTime;
    let roundingUnits;
    let toStringUnits;
    plainTime.add(durationLike);
    plainTime.equals(plainTimeLike);
    plainTime.round(roundingUnits);
    plainTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.since(plainTimeLike);
    plainTime.since(plainTimeLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.subtract(durationLike);
    plainTime.toJSON();
    plainTime.toLocaleString();
    plainTime.toLocaleString(locales);
    plainTime.toLocaleString(locales, toLocaleStringOptions);
    plainTime.toString();
    plainTime.toString({ smallestUnit: toStringUnits, fractionalSecondDigits, roundingMode });
    plainTime.until(plainTimeLike);
    plainTime.until(plainTimeLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainTime.with({ hour, minute, second, millisecond, microsecond, nanosecond });
}
{
    let plainYearMonth;
    plainYearMonth = new Temporal.PlainYearMonth(1970, 1);
    plainYearMonth = new Temporal.PlainYearMonth(1970, 1, 'gregorian', 1);
    let plainYearMonthLike;
    plainYearMonthLike = plainYearMonth;
    plainYearMonthLike = {
        month: 1,
        year: 1970,
    };
    plainYearMonth = Temporal.PlainYearMonth.from(plainYearMonthLike);
    plainYearMonth = Temporal.PlainYearMonth.from(plainYearMonthLike, { overflow });
    Temporal.PlainYearMonth.compare(plainYearMonth, plainYearMonthLike);
    const { calendarId, daysInMonth, daysInYear, era, eraYear, inLeapYear, month, monthCode, monthsInYear, year, [Symbol.toStringTag]: toStringTag, } = plainYearMonth;
    let roundingUnits;
    plainYearMonth.add(durationLike);
    plainYearMonth.add(durationLike, { overflow });
    plainYearMonth.equals(plainYearMonthLike);
    plainYearMonth.since(plainYearMonthLike);
    plainYearMonth.since(plainYearMonthLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainYearMonth.subtract(durationLike);
    plainYearMonth.subtract(durationLike, { overflow });
    plainYearMonth.toJSON();
    plainYearMonth.toLocaleString();
    plainYearMonth.toLocaleString(locales);
    plainYearMonth.toLocaleString(locales, toLocaleStringOptions);
    plainYearMonth.toPlainDate({ day: 1 });
    plainYearMonth.toString();
    plainYearMonth.toString({ calendarName });
    plainYearMonth.until(plainYearMonthLike);
    plainYearMonth.until(plainYearMonthLike, { smallestUnit: roundingUnits, largestUnit: roundingUnits, roundingIncrement, roundingMode });
    plainYearMonth.with({ year, era, eraYear, month, monthCode });
}
{
    zonedDateTime = new Temporal.ZonedDateTime(1234567890n, 'UTC');
    zonedDateTime = new Temporal.ZonedDateTime(1234567890n, 'UTC', 'iso8601');
    let zonedDateTimeLike;
    zonedDateTimeLike = zonedDateTime;
    zonedDateTimeLike = {
        day: 1,
        month: 1,
        year: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        timeZone: 'UTC',
    };
    let toZonedDateTimeOffset;
    zonedDateTime = Temporal.ZonedDateTime.from(zonedDateTimeLike);
    zonedDateTime = Temporal.ZonedDateTime.from(zonedDateTimeLike, { disambiguation, offset: toZonedDateTimeOffset, overflow });
    Temporal.ZonedDateTime.compare(zonedDateTime, zonedDateTimeLike);
    const { calendarId, day, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, epochMilliseconds, epochNanoseconds, era, eraYear, hour, hoursInDay, inLeapYear, microsecond, millisecond, minute, month, monthCode, monthsInYear, nanosecond, offset, offsetNanoseconds, second, timeZoneId, weekOfYear, year, yearOfWeek, [Symbol.toStringTag]: toStringTag, } = zonedDateTime;
    let direction;
    let toStringOffset;
    let timeZoneName;
    let roundingUnits;
    let toStringUnits;
    zonedDateTime.add(durationLike);
    zonedDateTime.add(durationLike, { overflow });
    zonedDateTime.equals(zonedDateTimeLike);
    zonedDateTime.getTimeZoneTransition(direction);
    zonedDateTime.getTimeZoneTransition({ direction });
    zonedDateTime.round(roundingUnits);
    zonedDateTime.round({ smallestUnit: roundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.since(zonedDateTimeLike);
    zonedDateTime.since(zonedDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.startOfDay();
    zonedDateTime.subtract(durationLike);
    zonedDateTime.subtract(durationLike, { overflow });
    zonedDateTime.toInstant();
    zonedDateTime.toJSON();
    zonedDateTime.toLocaleString();
    zonedDateTime.toLocaleString(locales);
    zonedDateTime.toLocaleString(locales, toLocaleStringOptions);
    zonedDateTime.toPlainDate();
    zonedDateTime.toPlainDateTime();
    zonedDateTime.toPlainTime();
    zonedDateTime.toString();
    zonedDateTime.toString({ smallestUnit: toStringUnits, calendarName, timeZoneName, fractionalSecondDigits, offset: toStringOffset, roundingMode });
    zonedDateTime.until(zonedDateTimeLike);
    zonedDateTime.until(zonedDateTimeLike, { smallestUnit: anyRoundingUnits, largestUnit: anyRoundingUnits, roundingIncrement, roundingMode });
    zonedDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset });
    zonedDateTime.with({ year, era, eraYear, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset }, { disambiguation, offset: toZonedDateTimeOffset, overflow });
    zonedDateTime.withCalendar(calendarLike);
    zonedDateTime.withPlainTime();
    zonedDateTime.withPlainTime(plainTime);
    zonedDateTime.withTimeZone(timeZoneLike);
}
