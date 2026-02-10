//// [tests/cases/compiler/temporal.ts] ////

//// [temporal.ts]
/**
 * Test cases derived from documentation at tc39/proposal-temporal,
 * under the following license:
 *
 * Copyright 2017, 2018, 2019, 2020 ECMA International
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

{
    const instant = Temporal.Instant.from("2020-01-01T00:00+05:30"); // => 2019-12-31T18:30:00Z
    instant.epochNanoseconds; // => 1577817000000000000n

    // `Temporal.Instant` lacks properties that depend on time zone or calendar
    instant.year; // => undefined

    const zdtTokyo = instant.toZonedDateTimeISO("Asia/Tokyo"); // => 2020-01-01T03:30:00+09:00[Asia/Tokyo]
    zdtTokyo.year; // => 2020
    zdtTokyo.toPlainDate(); // => 2020-01-01
}

{
    // Convert from `Temporal.Instant` to `Date` (which uses millisecond precision)
    const instant = Temporal.Instant.from("2020-01-01T00:00:00.123456789+05:30");
    // => 2019-12-31T18:30:00.123456789Z
    const date = new Date(instant.epochMilliseconds);
    date.toISOString(); // => 2019-12-31T18:30:00.123Z

    // Convert from `Date` to `Temporal.Instant`
    const sameInstant = date.toTemporalInstant(); // => 2019-12-31T18:30:00.123Z
}

{
    const date = new Date(2019, 11, 31, 18, 30); // => Tue Dec 31 2019 18:30:00 GMT-0800 (Pacific Standard Time)
    const instant = date.toTemporalInstant(); // => 2020-01-01T02:30:00Z
    const zonedDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    // => 2019-12-31T18:30:00-08:00[America/Los_Angeles]
    zonedDateTime.day; // => 31
    const dateOnly = zonedDateTime.toPlainDate(); // => 2019-12-31
}

{
    const instant = new Temporal.Instant(1553906700000000000n);
    // When was the Unix epoch?
    const epoch = new Temporal.Instant(0n); // => 1970-01-01T00:00:00Z
    // Dates before the Unix epoch are negative
    const turnOfTheCentury = new Temporal.Instant(-2208988800000000000n); // => 1900-01-01T00:00:00Z
}

{
    let instant: Temporal.Instant;
    instant = Temporal.Instant.from("2019-03-30T01:45:00+01:00[Europe/Berlin]");
    instant = Temporal.Instant.from("2019-03-30T01:45+01:00");
    instant = Temporal.Instant.from("2019-03-30T00:45Z");
    instant === Temporal.Instant.from(instant); // => false
}

{
    const legacyDate = new Date("1995-12-17T03:24Z");
    let instant: Temporal.Instant;
    instant = Temporal.Instant.fromEpochMilliseconds(legacyDate.getTime()); // => 1995-12-17T03:24:00Z
    instant = legacyDate.toTemporalInstant(); // recommended
}

{
    const one = Temporal.Instant.fromEpochMilliseconds(1.0e12);
    const two = Temporal.Instant.fromEpochMilliseconds(1.1e12);
    const three = Temporal.Instant.fromEpochMilliseconds(1.2e12);
    const sorted = [three, one, two].sort(Temporal.Instant.compare);
    sorted.join(" ");
    // => '2001-09-09T01:46:40Z 2004-11-09T11:33:20Z 2008-01-10T21:20:00Z'
}

{
    const instant = Temporal.Instant.from("2019-03-30T00:45Z");
    new Date(instant.epochMilliseconds); // => 2019-03-30T00:45:00.000Z

    // If you need epoch seconds data:
    const epochSecs = Math.floor(instant.epochMilliseconds / 1000); // => 1553906700

    const ns = instant.epochNanoseconds;
    const epochMicros = ns / 1000n + ((ns % 1000n) < 0n ? -1n : 0n);
}

{
    // Converting a specific exact time to a calendar date / wall-clock time
    let timestamp: Temporal.Instant;
    timestamp = Temporal.Instant.fromEpochMilliseconds(1553993100_000);
    timestamp.toZonedDateTimeISO("Europe/Berlin"); // => 2019-03-31T01:45:00+01:00[Europe/Berlin]
    timestamp.toZonedDateTimeISO("UTC"); // => 2019-03-31T00:45:00+00:00[UTC]
    timestamp.toZonedDateTimeISO("-08:00"); // => 2019-03-30T16:45:00-08:00[-08:00]

    // What time was the Unix epoch (timestamp 0) in Bell Labs (Murray Hill, New Jersey, USA) in the Gregorian calendar?
    const epoch = Temporal.Instant.fromEpochMilliseconds(0);
    epoch.toZonedDateTimeISO("America/New_York").withCalendar("gregory");
    // => 1969-12-31T19:00:00-05:00[America/New_York][u-ca=gregory]

    // What time was the Unix epoch in Tokyo in the Japanese calendar?
    const zdt = epoch.toZonedDateTimeISO("Asia/Tokyo").withCalendar("japanese");
    // => 1970-01-01T09:00:00+09:00[Asia/Tokyo][u-ca=japanese]
    console.log(zdt.eraYear, zdt.era);
    // => '45 showa'
}

{
    // Temporal.Instant representing five hours from now
    Temporal.Now.instant().add({ hours: 5 });
    const fiveHours = Temporal.Duration.from({ hours: 5 });
    Temporal.Now.instant().add(fiveHours);
}

{
    // Temporal.Instant representing this time an hour ago
    Temporal.Now.instant().subtract({ hours: 1 });
    const oneHour = Temporal.Duration.from({ hours: 1 });
    Temporal.Now.instant().subtract(oneHour);
}

{
    const startOfMoonMission = Temporal.Instant.from("1969-07-16T13:32:00Z");
    const endOfMoonMission = Temporal.Instant.from("1969-07-24T16:50:35Z");
    const missionLength = startOfMoonMission.until(endOfMoonMission, { largestUnit: "hour" });
    // => PT195H18M35S
    missionLength.toLocaleString();
    // example output: '195 hours 18 minutes 35 seconds'

    // Rounding, for example if you don't care about the minutes and seconds
    const approxMissionLength = startOfMoonMission.until(endOfMoonMission, {
        largestUnit: "hour",
        smallestUnit: "hour",
    });
    // => PT195H

    // A billion (10^9) seconds since the epoch in different units
    const epoch = Temporal.Instant.fromEpochMilliseconds(0);
    const billion = Temporal.Instant.fromEpochMilliseconds(1e9);
    epoch.until(billion);
    // => PT1000000000S
    epoch.until(billion, { largestUnit: "hour" });
    // => PT277777H46M40S
    const ns = epoch.until(billion, { largestUnit: "nanosecond" });
    // => PT1000000000S
    ns.add({ nanoseconds: 1 });
    // => PT1000000000S
    // (lost precision)

    // Calculate the difference in years, eliminating the ambiguity by
    // explicitly using the corresponding calendar date in UTC:
    epoch.toZonedDateTimeISO("UTC").until(
        billion.toZonedDateTimeISO("UTC"),
        { largestUnit: "year" },
    );
    // => P31Y8M8DT1H46M40S
}

{
    const instant = Temporal.Instant.from("2019-03-30T02:45:59.999999999Z");

    // Round to a particular unit
    instant.round({ smallestUnit: "second" }); // => 2019-03-30T02:46:00Z
    // Round to an increment of a unit, e.g. an hour:
    instant.round({ roundingIncrement: 60, smallestUnit: "minute" });
    // => 2019-03-30T03:00:00Z
    // Round to the same increment but round down instead:
    instant.round({ roundingIncrement: 60, smallestUnit: "minute", roundingMode: "floor" });
    // => 2019-03-30T02:00:00Z
}

{
    const one = Temporal.Instant.fromEpochMilliseconds(1.0e12);
    const two = Temporal.Instant.fromEpochMilliseconds(1.1e12);
    one.equals(two); // => false
    one.equals(one); // => true
}

{
    const instant = Temporal.Instant.fromEpochMilliseconds(1574074321816);
    instant.toString(); // => '2019-11-18T10:52:01.816Z'
    instant.toString({ timeZone: "UTC" });
    // => '2019-11-18T10:52:01.816+00:00'
    instant.toString({ timeZone: "Asia/Seoul" });
    // => '2019-11-18T19:52:01.816+09:00'

    instant.toString({ smallestUnit: "minute" });
    // => '2019-11-18T10:52Z'
    instant.toString({ fractionalSecondDigits: 0 });
    // => '2019-11-18T10:52:01Z'
    instant.toString({ fractionalSecondDigits: 4 });
    // => '2019-11-18T10:52:01.8160Z'
    instant.toString({ smallestUnit: "second", roundingMode: "halfExpand" });
    // => '2019-11-18T10:52:02Z'
}

{
    const instant = Temporal.Instant.from("2019-11-18T11:00:00.000Z");
    instant.toLocaleString(); // example output: '2019-11-18, 3:00:00 a.m.'
    instant.toLocaleString("de-DE"); // example output: '18.11.2019, 03:00:00'
    instant.toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "long",
    }); // => '18.11.2019, 12:00 Mitteleuropäische Normalzeit'
    instant.toLocaleString("en-US-u-nu-fullwide-hc-h12", {
        timeZone: "Asia/Kolkata",
    }); // => '１１/１８/２０１９, ４:３０:００ PM'
}

{
    // UNIX epoch in California
    new Temporal.ZonedDateTime(0n, "America/Los_Angeles", "iso8601");
    // => 1969-12-31T16:00:00-08:00[America/Los_Angeles]
    new Temporal.ZonedDateTime(0n, "America/Los_Angeles");
    // => 1969-12-31T16:00:00-08:00[America/Los_Angeles]
    // same, but shorter
}

{
    let zdt: Temporal.ZonedDateTime;

    zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Cairo]");
    zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Cairo][u-ca=islamic]");
    zdt = Temporal.ZonedDateTime.from("19951207T032430+0200[Africa/Cairo]");

    zdt = Temporal.ZonedDateTime.from({
        timeZone: "America/Los_Angeles",
        year: 1995,
        month: 12,
        day: 7,
        hour: 3,
        minute: 24,
        second: 30,
        millisecond: 0,
        microsecond: 3,
        nanosecond: 500,
    }); // => 1995-12-07T03:24:30.0000035-08:00[America/Los_Angeles]

    // Different overflow modes
    zdt = Temporal.ZonedDateTime.from({ timeZone: "Europe/Paris", year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01T00:00:00+01:00[Europe/Paris]
    zdt = Temporal.ZonedDateTime.from({ timeZone: "Europe/Paris", year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws RangeError
}

{
    const arr = [
        Temporal.ZonedDateTime.from("2020-02-01T12:30-05:00[America/Toronto]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30-05:00[America/New_York]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30+01:00[Europe/Brussels]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30+00:00[Europe/London]"),
    ];
    const sorted = arr.sort(Temporal.ZonedDateTime.compare);
    JSON.stringify(sorted, undefined, 2);
    // =>
    // '[
    //   "2020-02-01T12:30+01:00[Europe/Brussels]",
    //   "2020-02-01T12:30+00:00[Europe/London]",
    //   "2020-02-01T12:30-05:00[America/Toronto]",
    //   "2020-02-01T12:30-05:00[America/New_York]"
    // ]'
}

{
    const dt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500[Europe/Rome]");
    dt.year; // => 1995
    dt.month; // => 12
    dt.monthCode; // => 'M12'
    dt.day; // => 7
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500
}

{
    const zdt = Temporal.ZonedDateTime.from("2020-02-01T12:30+09:00[Asia/Tokyo]");
    const epochMs = zdt.epochMilliseconds;
    // => 1580527800000
    zdt.toInstant().epochMilliseconds;
    // => 1580527800000
    const legacyDate = new Date(epochMs);
    // => 2020-02-01T03:30:00.000Z
    // (if the system time zone is America/Los_Angeles)
    const epochNanos = zdt.epochNanoseconds;
    // => 1580527800000000000n

    // If you need epoch seconds data:
    const epochSecs = Math.floor(zdt.epochMilliseconds / 1000); // => 1553906700
    // => 1580527800

    // If you need epoch microseconds data:
    // (Note the extra check for correct floor rounding with bigints)
    const ns = zdt.epochNanoseconds;
    const epochMicros = ns / 1000n + ((ns % 1000n) < 0n ? -1n : 0n);
    // => 1580527800000000n
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    `Time zone is: ${zdt.timeZoneId}`;
    // => 'Time zone is: America/Los_Angeles'
    zdt.withTimeZone("Asia/Kolkata").timeZoneId;
    // => Asia/Kolkata
    zdt.withTimeZone("Asia/Calcutta").timeZoneId;
    // => Asia/Calcutta (does not follow links in the IANA Time Zone Database)

    zdt.withTimeZone("europe/paris").timeZoneId;
    // => Europe/Paris (normalized to match IANA Time Zone Database capitalization)

    zdt.withTimeZone("+05:00").timeZoneId;
    // => +05:00
    zdt.withTimeZone("+05").timeZoneId;
    // => +05:00  (normalized to ±HH:MM)
    zdt.withTimeZone("+0500").timeZoneId;
    // => +05:00  (normalized to ±HH:MM)
}

{
    const date = Temporal.ZonedDateTime.from("-000015-01-01T12:30[Europe/Rome][u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][zdt.dayOfWeek - 1]; // => 'THU'
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    // ISO ordinal date
    console.log(zdt.year, zdt.dayOfYear); // => '1995 341'
}

{
    const zdt = Temporal.ZonedDateTime.from("2022-01-01T03:24-08:00[America/Los_Angeles]");
    // ISO week date
    console.log(zdt.yearOfWeek, zdt.weekOfYear, zdt.dayOfWeek); // => '2021 52 6'
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    zdt.daysInWeek; // => 7
}

{
    // Attempt to write some mnemonic poetry
    const monthsByDays: Record<number, Temporal.ZonedDateTime[]> = {};
    for (let month = 1; month <= 12; month++) {
        const zdt = Temporal.Now.zonedDateTimeISO().with({ month });
        monthsByDays[zdt.daysInMonth] = (monthsByDays[zdt.daysInMonth] || []).concat(zdt);
    }

    const strings = monthsByDays[30].map(zdt => zdt.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop()!);
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;

    console.log(poem);
}

{
    const zdt = Temporal.Now.zonedDateTimeISO();
    const percent = zdt.dayOfYear / zdt.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}

{
    const zdt = Temporal.ZonedDateTime.from("1900-01-01T12:00+09:00[Asia/Tokyo]");
    zdt.monthsInYear; // => 12
}

{
    // Is this year a leap year?
    const zdt = Temporal.Now.zonedDateTimeISO();
    zdt.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    zdt.with({ year: 2100 }).inLeapYear; // => false
}

{
    const zdt = Temporal.ZonedDateTime.from("2010-11-07T23:00:00-03:30[America/St_Johns]");
    zdt.hoursInDay; // 25
}

{
    const zdt = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    zdt.offsetNanoseconds;
    // => -25200000000000
    // (-7 * 3600 * 1e9)
}

{
    const zdt = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    zdt.offset;
    // => '-07:00'
    zdt.withTimeZone("Asia/Kolkata").offset;
    // => '+05:30'

    const minus8Hours = "-08:00";
    const daylightTime0130 = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    // => 2020-11-01T01:30:00-07:00[America/Los_Angeles]
    // This is Pacific Daylight Time 1:30AM
    const repeated0130 = daylightTime0130.with({ offset: minus8Hours });
    // => 2020-11-01T01:30:00-08:00[America/Los_Angeles]
    // This is Pacific Standard Time 1:30AM
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:00-06:00[America/Chicago]");
    zdt.with({ year: 2015, minute: 31 }); // => 2015-12-07T03:31:00-06:00[America/Chicago]
}

{
    const zdt = Temporal.ZonedDateTime.from("2015-12-07T03:24:30.000003500-08:00[America/Los_Angeles]");
    zdt.withPlainTime({ hour: 10 }); // => 2015-12-07T10:00:00-08:00[America/Los_Angeles]
    const time = Temporal.PlainTime.from("11:22");
    zdt.withPlainTime(time); // => 2015-12-07T11:22:00-08:00[America/Los_Angeles]
    zdt.withPlainTime("12:34"); // => 2015-12-07T12:34:00-08:00[America/Los_Angeles]

    // easier for chaining
    zdt.add({ days: 2, hours: 22 }).withPlainTime("00:00"); // => 2015-12-10T00:00:00-08:00[America/Los_Angeles]
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+09:00[Asia/Tokyo]");
    zdt.toString(); // => '1995-12-07T03:24:30+09:00[Asia/Tokyo]'
    zdt.withTimeZone("Africa/Accra").toString(); // => '1995-12-06T18:24:30+00:00[Africa/Accra]'
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+09:00[Asia/Tokyo][u-ca=japanese]");
    `${zdt.era} ${zdt.eraYear}`; // => 'heisei 7'
    zdt.withCalendar("gregory").eraYear; // => 1995
}

{
    const zdt = Temporal.ZonedDateTime.from("2020-03-08T00:00-08:00[America/Los_Angeles]");
    // Add a day to get midnight on the day after DST starts
    const laterDay = zdt.add({ days: 1 });
    // => 2020-03-09T00:00:00-07:00[America/Los_Angeles]
    // Note that the new offset is different, indicating the result is adjusted for DST.
    laterDay.since(zdt, { largestUnit: "hour" }).hours;
    // => 23
    // because one clock hour lost to DST

    const laterHours = zdt.add({ hours: 24 });
    // => 2020-03-09T01:00:00-07:00[America/Los_Angeles]
    // Adding time units doesn't adjust for DST. Result is 1:00AM: 24 real-world
    // hours later because a clock hour was skipped by DST.
    laterHours.since(zdt, { largestUnit: "hour" }).hours; // => 24
}

{
    const zdt = Temporal.ZonedDateTime.from("2020-03-09T00:00-07:00[America/Los_Angeles]");
    // Add a day to get midnight on the day after DST starts
    const earlierDay = zdt.subtract({ days: 1 });
    // => 2020-03-08T00:00:00-08:00[America/Los_Angeles]
    // Note that the new offset is different, indicating the result is adjusted for DST.
    earlierDay.since(zdt, { largestUnit: "hour" }).hours;
    // => -23
    // because one clock hour lost to DST

    const earlierHours = zdt.subtract({ hours: 24 });
    // => 2020-03-07T23:00:00-08:00[America/Los_Angeles]
    // Subtracting time units doesn't adjust for DST. Result is 11:00PM: 24 real-world
    // hours earlier because a clock hour was skipped by DST.
    earlierHours.since(zdt, { largestUnit: "hour" }).hours; // => -24
}

{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+05:30[Asia/Kolkata]");
    const zdt2 = Temporal.ZonedDateTime.from("2019-01-31T15:30+05:30[Asia/Kolkata]");
    zdt1.until(zdt2);
    // => PT202956H5M29.9999965S
    zdt1.until(zdt2, { largestUnit: "year" });
    // => P23Y1M24DT12H5M29.9999965S
    zdt2.until(zdt1, { largestUnit: "year" });
    // => -P23Y1M24DT12H5M29.9999965S
    zdt1.until(zdt2, { largestUnit: "nanosecond" });
    // => PT730641929.999996544S
    // (precision lost)

    // Rounding, for example if you don't care about sub-seconds
    zdt1.until(zdt2, { smallestUnit: "second" });
    // => PT202956H5M29S

    // Months and years can be different lengths
    const [jan1, feb1, mar1] = [1, 2, 3].map(month => Temporal.ZonedDateTime.from({ year: 2020, month, day: 1, timeZone: "Asia/Seoul" }));
    jan1.until(feb1, { largestUnit: "day" }); // => P31D
    jan1.until(feb1, { largestUnit: "month" }); // => P1M
    feb1.until(mar1, { largestUnit: "day" }); // => P29D
    feb1.until(mar1, { largestUnit: "month" }); // => P1M
    jan1.until(mar1, { largestUnit: "day" }); // => P60D
}

{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+05:30[Asia/Kolkata]");
    const zdt2 = Temporal.ZonedDateTime.from("2019-01-31T15:30+05:30[Asia/Kolkata]");
    zdt2.since(zdt1); // => PT202956H5M29.9999965S
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500-08:00[America/Los_Angeles]");

    // Round to a particular unit
    zdt.round({ smallestUnit: "hour" });
    // => 1995-12-07T03:00:00-08:00[America/Los_Angeles]
    // Round to an increment of a unit, e.g. half an hour:
    zdt.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 1995-12-07T03:30:00-08:00[America/Los_Angeles]
    // Round to the same increment but round down instead:
    zdt.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "floor" });
    // => 1995-12-07T03:00:00-08:00[America/Los_Angeles]
}

{
    const zdt = Temporal.ZonedDateTime.from("2015-10-18T12:00-02:00[America/Sao_Paulo]");
    zdt.startOfDay(); // => 2015-10-18T01:00:00-02:00[America/Sao_Paulo]
}

{
    let duration: Temporal.Duration;
    // How long until the next offset change from now, in the current location?
    const tz = Temporal.Now.timeZoneId();
    const now = Temporal.Now.zonedDateTimeISO(tz);
    const nextTransition = now.getTimeZoneTransition("next");
    duration = nextTransition!.since(now);
    duration.toLocaleString(); // output will vary

    // How long until the previous offset change from now, in the current location?
    const previousTransition = now.getTimeZoneTransition("previous");
    duration = now.since(previousTransition!);
    duration.toLocaleString(); // output will vary
}

{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+01:00[Europe/Paris]");
    const zdt2 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+01:00[Europe/Brussels]");
    zdt1.equals(zdt2); // => false (same offset but different time zones)
    zdt1.equals(zdt1); // => true

    // To compare time zone IDs, use withTimeZone() with each ID on the same
    // ZonedDateTime instance, and use equals() to compare
    const kolkata = zdt1.withTimeZone("Asia/Kolkata");
    kolkata.equals(zdt1.withTimeZone("Asia/Calcutta")); // => true

    // Offset time zones are never equivalent to named time zones
    kolkata.equals(zdt1.withTimeZone("+05:30")); // => false
    const zeroOffset = zdt1.withTimeZone("+00:00");
    zeroOffset.equals(zdt1.withTimeZone("UTC")); // => false

    // For offset time zones, any valid format is accepted
    zeroOffset.equals(zdt1.withTimeZone("+00:00")); // => true
    zeroOffset.equals(zdt1.withTimeZone("+0000")); // => true
    zeroOffset.equals(zdt1.withTimeZone("+00")); // => true
}

{
    let zdt: Temporal.ZonedDateTime;
    zdt = Temporal.ZonedDateTime.from({ year: 2019, month: 12, day: 1, hour: 12, timeZone: "Africa/Lagos" });
    zdt.toString(); // => '2019-12-01T12:00:00+01:00[Africa/Lagos]'
    zdt = zdt.withCalendar("japanese");
    zdt.toString(); // => '2019-12-01T12:00:00+01:00[Africa/Lagos][u-ca=japanese]'
}

{
    const zdt = Temporal.ZonedDateTime.from("2019-12-01T12:00+01:00[Europe/Berlin]");
    zdt.toLocaleString(); // example output: 12/1/2019, 12:00:00 PM
    zdt.toLocaleString("de-DE"); // => '1.12.2019, 12:00:00 MEZ'
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as const;
    zdt.toLocaleString("de-DE", options); // => 'Sonntag, 1. Dezember 2019'
    /* WRONG */ zdt.toLocaleString("de-DE", { timeZone: "Pacific/Auckland" });
    // => RangeError: Time zone option Pacific/Auckland does not match actual time zone Europe/Berlin
    zdt.withTimeZone("Pacific/Auckland").toLocaleString("de-DE"); // => '2.12.2019, 0:00:00 GMT+13'
    zdt.toLocaleString("en-US-u-nu-fullwide-hc-h12"); // => '１２/１/２０１９, １２:００:００ PM GMT+１'
}

{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Johannesburg]");
    zdt.toInstant(); // => 1995-12-07T01:24:30Z
    zdt.toPlainDateTime(); // => 1995-12-07T03:24:30
    zdt.toPlainDate(); // => 1995-12-07
    zdt.toPlainTime(); // => 03:24:30
    zdt.toPlainDate().toPlainYearMonth(); // => 1995-12
    zdt.toPlainDate().toPlainMonthDay(); // => 12-07
}

{
    // Pi day in 2020
    const date = new Temporal.PlainDate(2020, 3, 14); // => 2020-03-14
}

{
    let date: Temporal.PlainDate;

    date = Temporal.PlainDate.from("2006-08-24"); // => 2006-08-24
    date = Temporal.PlainDate.from("20060824"); // => 2006-08-24
    date = Temporal.PlainDate.from("2006-08-24T15:43:27"); // => 2006-08-24
    date = Temporal.PlainDate.from("2006-08-24T15:43:27+01:00[Europe/Brussels]");
    // => 2006-08-24
    date === Temporal.PlainDate.from(date); // => false

    date = Temporal.PlainDate.from({ year: 2006, month: 8, day: 24 }); // => 2006-08-24
    date = Temporal.PlainDate.from(Temporal.PlainDateTime.from("2006-08-24T15:43:27"));
    // => 2006-08-24
    // same as above; Temporal.PlainDateTime has year, month, and day properties

    date = Temporal.PlainDate.from({ year: 1427, month: 8, day: 1, calendar: "islamic" });
    // => 2006-08-24[u-ca=islamic]

    // Different overflow modes
    date = Temporal.PlainDate.from({ year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01
    date = Temporal.PlainDate.from({ year: 2001, month: 1, day: 32 }, { overflow: "constrain" });
    // => 2001-01-31
    date = Temporal.PlainDate.from({ year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws
    date = Temporal.PlainDate.from({ year: 2001, month: 1, day: 32 }, { overflow: "reject" });
    // => throws
}

{
    const one = Temporal.PlainDate.from("2006-08-24");
    const two = Temporal.PlainDate.from("2015-07-14");
    const three = Temporal.PlainDate.from("1930-02-18");
    const sorted = [one, two, three].sort(Temporal.PlainDate.compare);
    sorted.join(" "); // => '1930-02-18 2006-08-24 2015-07-14'
}

{
    let date: Temporal.PlainDate;

    date = Temporal.PlainDate.from("2006-08-24");
    date.year; // => 2006
    date.month; // => 8
    date.monthCode; // => 'M08'
    date.day; // => 24

    date = Temporal.PlainDate.from("2019-02-23[u-ca=hebrew]");
    date.year; // => 5779
    date.month; // => 6
    date.monthCode; // => 'M05L'
    date.day; // => 18
}

{
    const date = Temporal.PlainDate.from("-000015-01-01[u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][date.dayOfWeek - 1]; // => 'THU'
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    // ISO ordinal date
    console.log(date.year, date.dayOfYear); // => '2006 236'
}

{
    const date = Temporal.PlainDate.from("2022-01-01");
    // ISO week date
    console.log(date.yearOfWeek, date.weekOfYear, date.dayOfWeek); // => '2021 52 6'
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.daysInWeek; // => 7
}

{
    // Attempt to write some mnemonic poetry
    const monthsByDays: Record<number, Temporal.PlainDate[]> = {};
    for (let month = 1; month <= 12; month++) {
        const date = Temporal.Now.plainDateISO().with({ month });
        monthsByDays[date.daysInMonth] = (monthsByDays[date.daysInMonth] || []).concat(date);
    }

    const strings = monthsByDays[30].map(date => date.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop()!);
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;

    console.log(poem);
}

{
    const date = Temporal.Now.plainDateISO();
    const percent = date.dayOfYear / date.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}

{
    const date = Temporal.PlainDate.from("1900-01-01");
    date.monthsInYear; // => 12
}

{
    // Is this year a leap year?
    const date = Temporal.Now.plainDateISO();
    date.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    date.with({ year: 2100 }).inLeapYear; // => false
}

{
    const date = Temporal.PlainDate.from("2006-01-24");
    // What's the first day of this month?
    date.with({ day: 1 }); // => 2006-01-01
    // What's the last day of the next month?
    const nextMonthDate = date.add({ months: 1 });
    nextMonthDate.with({ day: nextMonthDate.daysInMonth }); // => 2006-02-28
}

{
    const date = Temporal.PlainDate.from("2006-08-24[u-ca=japanese]");
    date.withCalendar("iso8601"); // => 2006-08-24
}

{
    let date: Temporal.PlainDate;

    date = Temporal.PlainDate.from("2006-08-24");
    date.add({ years: 20, months: 4 }); // => 2026-12-24

    date = Temporal.PlainDate.from("2019-01-31");
    date.add({ months: 1 }); // => 2019-02-28
    date.add({ months: 1 }, { overflow: "reject" }); // => throws
}

{
    let date: Temporal.PlainDate;

    date = Temporal.PlainDate.from("2006-08-24");
    date.subtract({ years: 20, months: 4 }); // => 1986-04-24

    date = Temporal.PlainDate.from("2019-03-31");
    date.subtract({ months: 1 }); // => 2019-02-28
    date.subtract({ months: 1 }, { overflow: "reject" }); // => throws
}

{
    const earlier = Temporal.PlainDate.from("2006-08-24");
    const later = Temporal.PlainDate.from("2019-01-31");
    earlier.until(later); // => P4543D
    earlier.until(later, { largestUnit: "year" }); // => P12Y5M7D
    later.until(earlier, { largestUnit: "year" }); // => -P12Y5M7D

    // If you really need to calculate the difference between two Dates in
    // hours, you can eliminate the ambiguity by explicitly choosing the
    // point in time from which you want to reckon the difference. For
    // example, using noon:
    const noon = Temporal.PlainTime.from("12:00");
    earlier.toPlainDateTime(noon).until(later.toPlainDateTime(noon), { largestUnit: "hour" });
    // => PT109032H

    const newyear = Temporal.PlainDate.from("2020-01-01");
    newyear.until("2020-01-15", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT0S
    newyear.until("2020-01-16", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT0S (mid-month dates rounded down to match `Temporal.PlainDateTime` behavior)
    newyear.until("2020-01-17", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT1M
}

{
    const earlier = Temporal.PlainDate.from("2006-08-24");
    const later = Temporal.PlainDate.from("2019-01-31");
    later.since(earlier); // => P4543D
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    const other = Temporal.PlainDate.from("2019-01-31");
    date.equals(other); // => false
    date.equals(date); // => true
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toString(); // => '2006-08-24'
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toLocaleString(); // example output: 8/24/2006
    date.toLocaleString("de-DE"); // example output: '24.8.2006'
    date.toLocaleString("de-DE", { weekday: "long" }); // => 'Donnerstag'
    date.toLocaleString("en-US-u-nu-fullwide"); // => '８/２４/２００６'
}

{
    const plainDate = Temporal.PlainDate.from("2006-08-24");
    const plainTime = Temporal.PlainTime.from("15:23:30.003");
    plainDate.toZonedDateTime({ timeZone: "America/Los_Angeles", plainTime });
    // => 2006-08-24T15:23:30.003-07:00[America/Los_Angeles]
    plainDate.toZonedDateTime({ timeZone: "America/Los_Angeles" });
    // => 2006-08-24T00:00:00-07:00[America/Los_Angeles]
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    const time = Temporal.PlainTime.from("15:23:30.003");
    date.toPlainDateTime(time); // => 2006-08-24T15:23:30.003
    date.toPlainDateTime(); // => 2006-08-24T00:00:00
}

{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toPlainYearMonth(); // => 2006-08
    date.toPlainMonthDay(); // => 08-24
}

{
    // Leet hour
    const time = new Temporal.PlainTime(13, 37); // => 13:37:00
}

{
    let time: Temporal.PlainTime;

    time = Temporal.PlainTime.from("03:24:30"); // => 03:24:30
    time = Temporal.PlainTime.from("032430"); // => 03:24:30
    time = Temporal.PlainTime.from("1995-12-07T03:24:30"); // => 03:24:30
    time = Temporal.PlainTime.from("1995-12-07T03:24:30+01:00[Europe/Brussels]");
    // => 03:24:30
    // (same as above; time zone is ignored)
    time === Temporal.PlainTime.from(time); // => false

    time = Temporal.PlainTime.from({
        hour: 19,
        minute: 39,
        second: 9,
        millisecond: 68,
        microsecond: 346,
        nanosecond: 205,
    }); // => 19:39:09.068346205
    time = Temporal.PlainTime.from({ hour: 19, minute: 39, second: 9 }); // => 19:39:09
    time = Temporal.PlainTime.from(Temporal.PlainDateTime.from("2020-02-15T19:39:09"));
    // => 19:39:09
    // (same as above; Temporal.PlainDateTime has hour, minute, etc. properties)

    // Different overflow modes
    time = Temporal.PlainTime.from({ hour: 15, minute: 60 }, { overflow: "constrain" });
    // => 15:59:00
    time = Temporal.PlainTime.from({ hour: 15, minute: -1 }, { overflow: "constrain" });
    // => 15:00:00
    time = Temporal.PlainTime.from({ hour: 15, minute: 60 }, { overflow: "reject" });
    // => throws
    time = Temporal.PlainTime.from({ hour: 15, minute: -1 }, { overflow: "reject" });
    // => throws
}

{
    const one = Temporal.PlainTime.from("03:24");
    const two = Temporal.PlainTime.from("01:24");
    const three = Temporal.PlainTime.from("01:24:05");
    const sorted = [one, two, three].sort(Temporal.PlainTime.compare);
    sorted.join(" "); // => '01:24:00 01:24:05 03:24:00'
}

{
    // Backward transitions will repeat clock times
    const zdtDst = Temporal.ZonedDateTime.from("2020-11-01T01:45-07:00[America/Los_Angeles]");
    const zdtStandard = Temporal.ZonedDateTime.from("2020-11-01T01:30-08:00[America/Los_Angeles]");
    // The "first" 1:45 (in Daylight Time) is earlier than the "second" 1:30 (in Standard Time)
    Temporal.ZonedDateTime.compare(zdtDst, zdtStandard); // => -1
    // 1:45 is later than 1:30 when looking at a wall clock
    Temporal.PlainTime.compare(zdtDst, zdtStandard); // => 1

    // Forward transitions will skip clock times. Skipped times will be disambiguated.
    const zdtBase = Temporal.ZonedDateTime.from("2020-03-08[America/Los_Angeles]");
    const timeSkipped = Temporal.PlainTime.from("02:30");
    const timeValid = Temporal.PlainTime.from("03:30");
    const zdtSkipped = zdtBase.withPlainTime(timeSkipped);
    const zdtValid = zdtBase.withPlainTime(timeValid);
    // The skipped time 2:30AM is disambiguated to 3:30AM, so the instants are equal
    Temporal.ZonedDateTime.compare(zdtSkipped, zdtValid); // => 0
    // 2:30 is earlier than 3:30 on a wall clock
    Temporal.PlainTime.compare(timeSkipped, timeValid); // => -1
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.hour; // => 19
    time.minute; // => 39
    time.second; // => 9
    time.millisecond; // => 68
    time.microsecond; // => 346
    time.nanosecond; // => 205
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    // What's the top of the next hour?
    time.add({ hours: 1 }).with({
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    }); // => 20:00:00
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.add({ minutes: 5, nanoseconds: 800 }); // => 19:44:09.068347005
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.subtract({ minutes: 5, nanoseconds: 800 }); // => 19:34:09.068345405
}

{
    const time = Temporal.PlainTime.from("20:13:20.971398099");
    time.until(Temporal.PlainTime.from("22:39:09.068346205")); // => PT2H25M48.096948106S
    time.until(Temporal.PlainTime.from("19:39:09.068346205")); // => -PT34M11.903051894S

    // Rounding, for example if you don't care about sub-seconds
    time.until(Temporal.PlainTime.from("22:39:09.068346205"), { smallestUnit: "second" });
    // => PT2H25M48S
}

{
    const time = Temporal.PlainTime.from("20:13:20.971398099");
    time.since(Temporal.PlainTime.from("19:39:09.068346205")); // => PT34M11.903051894S
    time.since(Temporal.PlainTime.from("22:39:09.068346205")); // => -PT2H25M48.096948106S
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");

    // Round to a particular unit
    time.round({ smallestUnit: "hour" }); // => 20:00:00
    // Round to an increment of a unit, e.g. half an hour:
    time.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 19:30:00
    // Round to the same increment but round up instead:
    time.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "ceil" });
    // => 20:00:00
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    const other = Temporal.PlainTime.from("20:13:20.971398099");
    time.equals(other); // => false
    time.equals(time); // => true
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.toString(); // => '19:39:09.068346205'

    time.toString({ smallestUnit: "minute" }); // => '19:39'
    time.toString({ fractionalSecondDigits: 0 }); // => '19:39:09'
    time.toString({ fractionalSecondDigits: 4 }); // => '19:39:09.0683'
    time.toString({ fractionalSecondDigits: 5, roundingMode: "halfExpand" });
    // => '19:39:09.06835'
}

{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.toLocaleString(); // example output: '7:39:09 PM'
    time.toLocaleString("de-DE"); // example output: '19:39:09'
    time.toLocaleString("de-DE", { timeZone: "Europe/Berlin" }); // => '19:39:09'
    time.toLocaleString("en-US-u-nu-fullwide-hc-h24"); // => '１９:３９:０９'
}

{
    // Leet hour on pi day in 2020
    const datetime = new Temporal.PlainDateTime(2020, 3, 14, 13, 37); // => 2020-03-14T13:37:00
}

{
    let dt: Temporal.PlainDateTime;

    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30");
    dt = Temporal.PlainDateTime.from("19951207T032430");
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30+01:00[Europe/Brussels]");
    // => 1995-12-07T03:24:30
    // same as above; time zone is ignored
    dt === Temporal.PlainDateTime.from(dt); // => false

    dt = Temporal.PlainDateTime.from({
        year: 1995,
        month: 12,
        day: 7,
        hour: 3,
        minute: 24,
        second: 30,
        millisecond: 0,
        microsecond: 3,
        nanosecond: 500,
    }); // => 1995-12-07T03:24:30.0000035
    dt = Temporal.PlainDateTime.from({ year: 1995, month: 12, day: 7 }); // => 1995-12-07T00:00:00
    dt = Temporal.PlainDateTime.from(Temporal.PlainDate.from("1995-12-07T03:24:30"));
    // => 1995-12-07T00:00:00
    // same as above; Temporal.PlainDate has year, month, and day properties

    dt = Temporal.PlainDateTime.from({ year: 5756, month: 3, day: 14, hour: 3, minute: 24, second: 30, calendar: "hebrew" });
    // => 1995-12-07T03:24:30[u-ca=hebrew]

    // Different overflow modes
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01T00:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 32 }, { overflow: "constrain" });
    // => 2001-01-31T00:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, hour: 25 }, { overflow: "constrain" });
    // => 2001-01-01T23:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, minute: 60 }, { overflow: "constrain" });
    // => 2001-01-01T00:59:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 32 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, hour: 25 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, minute: 60 }, { overflow: "reject" });
    // => throws
}

{
    const one = Temporal.PlainDateTime.from("1995-12-07T03:24");
    const two = Temporal.PlainDateTime.from("1995-12-07T01:24");
    const three = Temporal.PlainDateTime.from("2015-12-07T01:24");
    const sorted = [one, two, three].sort(Temporal.PlainDateTime.compare);
    sorted.join(" ");
    // => '1995-12-07T01:24:00 1995-12-07T03:24:00 2015-12-07T01:24:00'
}

{
    let dt: Temporal.PlainDateTime;

    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.year; // => 1995
    dt.month; // => 12
    dt.monthCode; // => 'M12'
    dt.day; // => 7
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500

    dt = Temporal.PlainDateTime.from("2019-02-23T03:24:30.000003500[u-ca=hebrew]");
    dt.year; // => 5779
    dt.month; // => 6
    dt.monthCode; // => 'M05L'
    dt.day; // => 18
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500
}

{
    const date = Temporal.PlainDateTime.from("-000015-01-01T12:30[u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][dt.dayOfWeek - 1]; // => 'THU'
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    // ISO ordinal date
    console.log(dt.year, dt.dayOfYear); // => '1995 341'
}

{
    const dt = Temporal.PlainDateTime.from("2022-01-01T03:24:30.000003500");
    // ISO week date
    console.log(dt.yearOfWeek, dt.weekOfYear, dt.dayOfWeek); // => '2021 52 6'
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.daysInWeek; // => 7
}

{
    // Attempt to write some mnemonic poetry
    const monthsByDays: Record<number, Temporal.PlainDateTime[]> = {};
    for (let month = 1; month <= 12; month++) {
        const dt = Temporal.Now.plainDateTimeISO().with({ month });
        monthsByDays[dt.daysInMonth] = (monthsByDays[dt.daysInMonth] || []).concat(dt);
    }

    const strings = monthsByDays[30].map(dt => dt.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop()!);
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;

    console.log(poem);
}

{
    const dt = Temporal.Now.plainDateTimeISO();
    const percent = dt.dayOfYear / dt.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}

{
    const dt = Temporal.PlainDate.from("1900-01-01T12:00");
    dt.monthsInYear; // => 12
}

{
    // Is this year a leap year?
    const dt = Temporal.Now.plainDateTimeISO();
    dt.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    dt.with({ year: 2100 }).inLeapYear; // => false
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.with({ year: 2015, second: 31 }); // => 2015-12-07T03:24:31.0000035
}

{
    const dt = Temporal.PlainDateTime.from("2015-12-07T03:24:30.000003500");
    dt.withPlainTime({ hour: 10 }); // => 2015-12-07T10:00:00
    const time = Temporal.PlainTime.from("11:22");
    dt.withPlainTime(time); // => 2015-12-07T11:22:00
    dt.withPlainTime("12:34"); // => 2015-12-07T12:34:00

    // easier for chaining
    dt.add({ days: 2, hours: 22 }).withPlainTime("00:00"); // => 2015-12-10T00:00:00
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500[u-ca=japanese]");
    dt.withCalendar("iso8601"); // => 1995-12-07T03:24:30.0000035
}

{
    let dt: Temporal.PlainDateTime;

    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.add({ years: 20, months: 4, nanoseconds: 500 }); // => 2016-04-07T03:24:30.000004

    dt = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt.add({ months: 1 }); // => 2019-02-28T15:30:00
    dt.add({ months: 1 }, { overflow: "reject" }); // => throws
}

{
    let dt: Temporal.PlainDateTime;

    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.subtract({ years: 20, months: 4, nanoseconds: 500 }); // => 1975-08-07T03:24:30.000003

    dt = Temporal.PlainDateTime.from("2019-03-31T15:30");
    dt.subtract({ months: 1 }); // => 2019-02-28T15:30:00
    dt.subtract({ months: 1 }, { overflow: "reject" }); // => throws
}

{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt1.until(dt2);
    // => P8456DT12H5M29.9999965S
    dt1.until(dt2, { largestUnit: "year" });
    // => P23Y1M24DT12H5M29.9999965S
    dt2.until(dt1, { largestUnit: "year" });
    // => -P23Y1M24DT12H5M29.9999965S
    dt1.until(dt2, { largestUnit: "nanosecond" });
    // => PT730641929.999996544S
    // (precision lost)

    // Rounding, for example if you don't care about sub-seconds
    dt1.until(dt2, { smallestUnit: "second" });
    // => P8456DT12H5M29S

    // Months and years can be different lengths
    const [jan1, feb1, mar1] = [1, 2, 3].map(month => Temporal.PlainDateTime.from({ year: 2020, month, day: 1 }));
    jan1.until(feb1); // => P31D
    jan1.until(feb1, { largestUnit: "month" }); // => P1M
    feb1.until(mar1); // => P29D
    feb1.until(mar1, { largestUnit: "month" }); // => P1M
    jan1.until(mar1); // => P60D
}

{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt2.since(dt1); // => P8456DT12H5M29.9999965S
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");

    // Round to a particular unit
    dt.round({ smallestUnit: "hour" }); // => 1995-12-07T03:00:00
    // Round to an increment of a unit, e.g. half an hour:
    dt.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 1995-12-07T03:30:00
    // Round to the same increment but round down instead:
    dt.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "floor" });
    // => 1995-12-07T03:00:00
}

{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt1.equals(dt2); // => false
    dt1.equals(dt1); // => true
}

{
    const dt = Temporal.PlainDateTime.from({
        year: 1999,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999,
        microsecond: 999,
        nanosecond: 999,
    });
    dt.toString(); // => '1999-12-31T23:59:59.999999999'

    dt.toString({ smallestUnit: "minute" }); // => '1999-12-31T23:59'
    dt.toString({ fractionalSecondDigits: 0 }); // => '1999-12-31T23:59:59'
    dt.toString({ fractionalSecondDigits: 4 }); // => '1999-12-31T23:59:59.9999'
    dt.toString({ fractionalSecondDigits: 8, roundingMode: "halfExpand" });
    // => '2000-01-01T00:00:00.00000000'
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.toLocaleString(); // example output: 1995-12-07, 3:24:30 a.m.
    dt.toLocaleString("de-DE"); // example output: 7.12.1995, 03:24:30
    dt.toLocaleString("de-DE", { timeZone: "Europe/Berlin", weekday: "long" }); // => 'Donnerstag'
    dt.toLocaleString("en-US-u-nu-fullwide-hc-h12"); // => '１２/７/１９９５, ３:２４:３０ AM'
}

{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.toPlainDate(); // => 1995-12-07
    dt.toPlainTime(); // => 03:24:30.0000035
    dt.toPlainDate().toPlainYearMonth(); // => 1995-12
    dt.toPlainDate().toPlainMonthDay(); // => 12-07
}

{
    // The June 2019 meeting
    const ym = new Temporal.PlainYearMonth(2019, 6);
    // => 2019-06
}

{
    let ym: Temporal.PlainYearMonth;

    ym = Temporal.PlainYearMonth.from("2019-06"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24T15:43:27"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24T15:43:27+01:00[Europe/Brussels]");
    // => 2019-06
    ym === Temporal.PlainYearMonth.from(ym); // => false

    ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6 }); // => 2019-06
    ym = Temporal.PlainYearMonth.from(Temporal.PlainDate.from("2019-06-24"));
    // => 2019-06
    // (same as above; Temporal.PlainDate has year and month properties)

    // Different overflow modes
    ym = Temporal.PlainYearMonth.from({ year: 2001, month: 13 }, { overflow: "constrain" });
    // => 2001-12
    ym = Temporal.PlainYearMonth.from({ year: 2001, month: 13 }, { overflow: "reject" });
    // => throws
}

{
    const one = Temporal.PlainYearMonth.from("2006-08");
    const two = Temporal.PlainYearMonth.from("2015-07");
    const three = Temporal.PlainYearMonth.from("1930-02");
    const sorted = [one, two, three].sort(Temporal.PlainYearMonth.compare);
    sorted.join(" "); // => '1930-02 2006-08 2015-07'
}

{
    let ym: Temporal.PlainYearMonth;

    ym = Temporal.PlainYearMonth.from("2019-06");
    ym.year; // => 2019
    ym.month; // => 6
    ym.monthCode; // => 'M06'

    ym = Temporal.PlainYearMonth.from("2019-02-23[u-ca=hebrew]");
    ym.year; // => 5779
    ym.month; // => 6
    ym.monthCode; // => 'M05L'
}

{
    const ym = Temporal.PlainYearMonth.from("-000015-01-01[u-ca=gregory]");
    ym.era;
    // => 'bce'
    ym.eraYear;
    // => 16
    ym.year;
    // => -15
}

{
    // Attempt to write some mnemonic poetry
    const monthsByDays: Record<number, Temporal.PlainYearMonth[]> = {};
    for (let month = 1; month <= 12; month++) {
        const ym = Temporal.PlainYearMonth.from({ year: 2020, calendar: "iso8601", month });
        monthsByDays[ym.daysInMonth] = (monthsByDays[ym.daysInMonth] || []).concat(ym);
    }

    const strings = monthsByDays[30].map(ym => ym.toLocaleString("en", { month: "long", calendar: "iso8601" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop()!);
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;

    console.log(poem);
}

{
    const ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6, calendar: "iso8601" });
    const percent = ym.daysInMonth / ym.daysInYear;
    `${ym.toLocaleString("en", { month: "long", year: "numeric", calendar: "iso8601" })} was ${percent.toLocaleString("en", { style: "percent" })} of the year!`;
    // => 'June 2019 was 8% of the year!'
}

{
    const ym = Temporal.PlainYearMonth.from("1900-01");
    ym.monthsInYear; // => 12
}

{
    // Was June 2019 in a leap year?
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.inLeapYear; // => false
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    ym.with({ year: 2100 }).inLeapYear; // => false
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    // Get December of that year
    ym.with({ month: 12 }); // => 2019-12
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.add({ years: 20, months: 4 }); // => 2039-10
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.subtract({ years: 20, months: 4 }); // => 1999-02
}

{
    const ym = Temporal.PlainYearMonth.from("2006-08");
    const other = Temporal.PlainYearMonth.from("2019-06");
    ym.until(other); // => P12Y10M
    ym.until(other, { largestUnit: "month" }); // => P154M
    other.until(ym, { largestUnit: "month" }); // => -P154M

    // If you really need to calculate the difference between two YearMonths
    // in days, you can eliminate the ambiguity by explicitly choosing the
    // day of the month (and if applicable, the time of that day) from which
    // you want to reckon the difference. For example, using the first of
    // the month to calculate a number of days:
    ym.toPlainDate({ day: 1 }).until(other.toPlainDate({ day: 1 }), { largestUnit: "day" }); // => P4687D
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    const other = Temporal.PlainYearMonth.from("2006-08");
    ym.since(other); // => P12Y10M
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    const other = Temporal.PlainYearMonth.from("2006-08");
    ym.equals(other); // => false
    ym.equals(ym); // => true
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.toString(); // => '2019-06'
}

{
    const { calendar } = new Intl.DateTimeFormat().resolvedOptions();
    const ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6, calendar });
    ym.toLocaleString(); // example output: '6/2019'
    // Same as above, but explicitly specifying the calendar:
    ym.toLocaleString(undefined, { calendar });

    ym.toLocaleString("de-DE", { calendar }); // example output: '6.2019'
    ym.toLocaleString("de-DE", { month: "long", year: "numeric", calendar }); // => 'Juni 2019'
    ym.toLocaleString(`en-US-u-nu-fullwide-ca-${calendar}`); // => '６/２０１９'
}

{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.toPlainDate({ day: 24 }); // => 2019-06-24
}

{
    let md: Temporal.PlainMonthDay;

    // Pi day
    md = new Temporal.PlainMonthDay(3, 14); // => 03-14
    // Leap day
    md = new Temporal.PlainMonthDay(2, 29); // => 02-29
}

{
    let md: Temporal.PlainMonthDay;

    md = Temporal.PlainMonthDay.from("08-24"); // => 08-24
    md = Temporal.PlainMonthDay.from("0824"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24T15:43:27"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24T15:43:27+01:00[Europe/Brussels]");
    // => 08-24
    md === Temporal.PlainMonthDay.from(md); // => false

    md = Temporal.PlainMonthDay.from({ monthCode: "M08", day: 24 }); // => 08-24
    md = Temporal.PlainMonthDay.from(Temporal.PlainDate.from("2006-08-24"));
    // => 08-24
    // (same as above; Temporal.PlainDate has month and day properties)

    // Different overflow modes
    md = Temporal.PlainMonthDay.from({ month: 13, day: 1, year: 2000 }, { overflow: "constrain" });
    // => 12-01
    md = Temporal.PlainMonthDay.from({ month: 1, day: 32, year: 2000 }, { overflow: "constrain" });
    // => 01-31
    md = Temporal.PlainMonthDay.from({ month: 13, day: 1, year: 2000 }, { overflow: "reject" });
    // => throws
    md = Temporal.PlainMonthDay.from({ month: 1, day: 32, year: 2000 }, { overflow: "reject" });
    // => throws
    md = Temporal.PlainMonthDay.from({ month: 2, day: 29, year: 2001 }, { overflow: "reject" });
    // => throws (this year is not a leap year in the ISO 8601 calendar)

    // non-ISO calendars
    md = Temporal.PlainMonthDay.from({ monthCode: "M05L", day: 15, calendar: "hebrew" });
    // => 1970-02-21[u-ca=hebrew]
    md = Temporal.PlainMonthDay.from({ month: 6, day: 15, year: 5779, calendar: "hebrew" });
    // => 1970-02-21[u-ca=hebrew]
    /* WRONG */ md = Temporal.PlainMonthDay.from({ month: 6, day: 15, calendar: "hebrew" });
    // => throws (either year or monthCode is required)
    md = Temporal.PlainMonthDay.from("2019-02-20[u-ca=hebrew]");
    md.monthCode; // => 'M05L'
    md.day; // => 15
    md.month; // undefined
    // (month property is not present in this type; use monthCode instead)
}

{
    let md: Temporal.PlainMonthDay;

    md = Temporal.PlainMonthDay.from("08-24");
    md.monthCode; // => 'M08'
    md.day; // => 24
    md.month; // => undefined
    // (no `month` property; use `monthCode` instead)

    md = Temporal.PlainMonthDay.from("2019-02-20[u-ca=hebrew]");
    md.monthCode; // => 'M05L'
    md.day; // => 15
    md.month; // => undefined
    // (no `month` property; use `monthCode` instead)
}

{
    const md = Temporal.PlainMonthDay.from("11-15");
    // What's the last day of that month?
    md.with({ day: 31 }); // => 11-30
    Temporal.PlainMonthDay.from("02-01").with({ day: 31 }); // => 02-29
}

{
    const md1 = Temporal.PlainMonthDay.from("02-28");
    const md2 = Temporal.PlainMonthDay.from("02-29");
    md1.equals(md2); // => false
    md1.equals("02-29"); // => false
    md1.equals({ monthCode: "M02", day: 29 }); // => false
    md2.equals(md2); // => true
    md2.equals("02-29"); // => true
    md2.equals({ monthCode: "M02", day: 29 }); // => true
}

{
    const md = Temporal.PlainMonthDay.from("08-24");
    md.toString(); // => '08-24'
}

{
    const { calendar } = new Intl.DateTimeFormat().resolvedOptions();
    const md = Temporal.PlainMonthDay.from({ monthCode: "M08", day: 24, calendar });
    md.toLocaleString(); // example output: '8/24'
    // Same as above, but explicitly specifying the calendar:
    md.toLocaleString(undefined, { calendar }); // example output: '8/24'

    md.toLocaleString("de-DE", { calendar }); // => '24.8.'
    md.toLocaleString("de-DE", { month: "long", day: "numeric", calendar }); // => '24. August'
    md.toLocaleString(`en-US-u-nu-fullwide-ca-${calendar}`); // => '８/２４'
}

{
    const md = Temporal.PlainMonthDay.from({
        calendar: "japanese",
        monthCode: "M01",
        day: 1,
    });

    const date = md.toPlainDate({ era: "reiwa", eraYear: 2 }); // => 2020-01-01[u-ca=japanese]
}

{
    new Temporal.Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321); // => P1Y2M3W4DT5H6M7.987654321S
    new Temporal.Duration(0, 0, 0, 40); // => P40D
    new Temporal.Duration(undefined, undefined, undefined, 40); // => P40D
    new Temporal.Duration(); // => PT0S
}

{
    let d: Temporal.Duration;

    d = Temporal.Duration.from({ years: 1, days: 1 }); // => P1Y1D
    d = Temporal.Duration.from({ days: -2, hours: -12 }); // => -P2DT12H

    Temporal.Duration.from(d) === d; // => false

    d = Temporal.Duration.from("P1Y1D"); // => P1Y1D
    d = Temporal.Duration.from("-P2DT12H"); // => -P2DT12H
    d = Temporal.Duration.from("P0D"); // => PT0S
}

{
    const one = Temporal.Duration.from({ hours: 79, minutes: 10 });
    const two = Temporal.Duration.from({ days: 3, hours: 7, seconds: 630 });
    const three = Temporal.Duration.from({ days: 3, hours: 6, minutes: 50 });
    const sorted1 = [one, two, three].sort(Temporal.Duration.compare);
    sorted1.join(" ");
    // => 'P3DT6H50M PT79H10M P3DT7H630S'

    // Sorting relative to a date, taking DST changes into account:
    const relativeTo = Temporal.ZonedDateTime.from("2020-11-01T00:00-07:00[America/Los_Angeles]");
    const sorted2 = [one, two, three].sort((one, two) => Temporal.Duration.compare(one, two, { relativeTo }));
    sorted2.join(" ");
    // => 'PT79H10M P3DT6H50M P3DT7H630S'
}

{
    const d = Temporal.Duration.from("P1Y2M3W4DT5H6M7.987654321S");
    d.years; // => 1
    d.months; // => 2
    d.weeks; // => 3
    d.days; // => 4
    d.hours; // => 5
    d.minutes; // => 6
    d.seconds; // => 7
    d.milliseconds; // => 987
    d.microseconds; // => 654
    d.nanoseconds; // => 321
}

{
    let d: Temporal.Duration;

    d = Temporal.Duration.from("PT0S");
    d.blank; // => true

    d = Temporal.Duration.from({ days: 0, hours: 0, minutes: 0 });
    d.blank; // => true
}

{
    let duration: Temporal.Duration;

    duration = Temporal.Duration.from({ months: 50, days: 50, hours: 50, minutes: 100 });
    // Perform a balance operation using additional ISO 8601 calendar rules:
    let { years, months } = duration;
    years += Math.floor(months / 12);
    months %= 12;
    duration = duration.with({ years, months });
    // => P4Y2M50DT50H100M
}

{
    const hour = Temporal.Duration.from("PT1H");
    hour.add({ minutes: 30 }); // => PT1H30M

    // Examples of balancing:
    const one = Temporal.Duration.from({ hours: 1, minutes: 30 });
    const two = Temporal.Duration.from({ hours: 2, minutes: 45 });
    const result = one.add(two); // => PT4H15M

    // Example of adding calendar units
    const oneAndAHalfMonth = Temporal.Duration.from({ months: 1, days: 16 });

    // To convert units, use arithmetic relative to a start date:
    const startDate1 = Temporal.PlainDate.from("2000-12-01");
    startDate1.add(oneAndAHalfMonth).add(oneAndAHalfMonth)
        .since(startDate1, { largestUnit: "months" }); // => P3M4D

    const startDate2 = Temporal.PlainDate.from("2001-01-01");
    startDate2.add(oneAndAHalfMonth).add(oneAndAHalfMonth)
        .since(startDate2, { largestUnit: "months" }); // => P3M1D
}

{
    const hourAndAHalf = Temporal.Duration.from("PT1H30M");
    hourAndAHalf.subtract({ hours: 1 }); // => PT30M

    const one = Temporal.Duration.from({ minutes: 180 });
    const two = Temporal.Duration.from({ seconds: 30 });
    one.subtract(two); // => PT179M30S
    one.subtract(two).round({ largestUnit: "hour" }); // => PT2H59M30S

    // Example of subtracting calendar units; cannot be subtracted using
    // subtract() because units need to be converted
    const threeMonths = Temporal.Duration.from({ months: 3 });
    const oneAndAHalfMonth = Temporal.Duration.from({ months: 1, days: 15 });

    // To convert units, use arithmetic relative to a start date:
    const startDate1 = Temporal.PlainDate.from("2001-01-01");
    startDate1.add(threeMonths).subtract(oneAndAHalfMonth)
        .since(startDate1, { largestUnit: "months" }); // => P1M13D

    const startDate2 = Temporal.PlainDate.from("2001-02-01");
    startDate2.add(threeMonths).subtract(oneAndAHalfMonth)
        .since(startDate2, { largestUnit: "months" }); // => P1M16D
}

{
    const d = Temporal.Duration.from("P1Y2M3DT4H5M6.987654321S");
    d.sign; // 1
    d.negated(); // -P1Y2M3DT4H5M6.987654321S
    d.negated().sign; // -1
}

{
    const d = Temporal.Duration.from("-PT8H30M");
    d.abs(); // PT8H30M
}

{
    let d: Temporal.Duration;

    // Balance a duration as far as possible without knowing a starting point
    d = Temporal.Duration.from({ minutes: 130 });
    d.round({ largestUnit: "day" }); // => PT2H10M

    // Round to the nearest unit
    d = Temporal.Duration.from({ minutes: 10, seconds: 52 });
    d.round({ smallestUnit: "minute" }); // => PT11M
    d.round({ smallestUnit: "minute", roundingMode: "trunc" }); // => PT10M

    // How many seconds in a multi-unit duration?
    d = Temporal.Duration.from("PT2H34M18S");
    d.round({ largestUnit: "second" }).seconds; // => 9258

    // Normalize, with and without taking DST into account
    d = Temporal.Duration.from({ hours: 2756 });
    d.round({
        relativeTo: "2020-01-01T00:00+01:00[Europe/Rome]",
        largestUnit: "year",
    }); // => P114DT21H
    // (one hour longer because DST skipped an hour)
    d.round({
        relativeTo: "2020-01-01",
        largestUnit: "year",
    }); // => P114DT20H
    // (one hour shorter if ignoring DST)

    // Normalize days into months or years
    d = Temporal.Duration.from({ days: 190 });
    const refDate = Temporal.PlainDate.from("2020-01-01");
    d.round({ relativeTo: refDate, largestUnit: "year" }); // => P6M8D

    // Same, but in a different calendar system
    d.round({
        relativeTo: refDate.withCalendar("hebrew"),
        largestUnit: "year",
    }); // => P6M13D

    // Round a duration up to the next 5-minute billing period
    d = Temporal.Duration.from({ minutes: 6 });
    d.round({
        smallestUnit: "minute",
        roundingIncrement: 5,
        roundingMode: "ceil",
    }); // => PT10M

    // How many full 3-month quarters of this year, are in this duration?
    d = Temporal.Duration.from({ months: 10, days: 15 });
    d = d.round({
        smallestUnit: "month",
        roundingIncrement: 3,
        roundingMode: "trunc",
        relativeTo: Temporal.Now.plainDateISO(),
    });
    const quarters = d.months / 3;
    quarters; // => 3
}

{
    let d: Temporal.Duration;

    // How many seconds in 130 hours and 20 minutes?
    d = Temporal.Duration.from({ hours: 130, minutes: 20 });
    d.total({ unit: "second" }); // => 469200

    // How many 24-hour days is 123456789 seconds?
    d = Temporal.Duration.from("PT123456789S");
    d.total({ unit: "day" }); // 1428.8980208333332

    // Find totals in months, with and without taking DST into account
    d = Temporal.Duration.from({ hours: 2756 });
    d.total({
        relativeTo: "2020-01-01T00:00+01:00[Europe/Rome]",
        unit: "month",
    }); // => 3.7958333333333334
    d.total({
        unit: "month",
        relativeTo: "2020-01-01",
    }); // => 3.7944444444444443
}

{
    let d: Temporal.Duration;

    d = Temporal.Duration.from({ years: 1, days: 1 });
    d.toString(); // => P1Y1D
    d = Temporal.Duration.from({ years: -1, days: -1 });
    d.toString(); // => -P1Y1D
    d = Temporal.Duration.from({ milliseconds: 1000 });
    d.toString(); // => PT1S

    // The output format always balances units under 1 s, even if the
    // underlying Temporal.Duration object doesn't.
    const nobal = Temporal.Duration.from({ milliseconds: 3500 });
    console.log(`${nobal}`, nobal.seconds, nobal.milliseconds); // => 'PT3.5S 0 3500'
    const bal = nobal.round({ largestUnit: "year" }); // balance through round
    console.log(`${bal}`, bal.seconds, bal.milliseconds); // => 'PT3.5S 3 500'

    d = Temporal.Duration.from("PT59.999999999S");
    d.toString({ smallestUnit: "second" }); // => PT59S
    d.toString({ fractionalSecondDigits: 0 }); // => PT59S
    d.toString({ fractionalSecondDigits: 4 }); // => PT59.9999S
    d.toString({ fractionalSecondDigits: 8, roundingMode: "halfExpand" });
    // => PT60.00000000S
}

{
    const d = Temporal.Duration.from("P1DT6H30M");
    d.toLocaleString(); // example output: '1 day 6 hours 30 minutes'
    d.toLocaleString("de-DE"); // example output: '1 Tag 6 Stunden 30 Minuten'
    d.toLocaleString("en-US", { days: "short", hours: "numeric" }); // example output: '1 day 6 hours'
}

{
    Temporal.Now.instant(); // get the current system exact time
    Temporal.Now.timeZoneId(); // get the current system time zone
    Temporal.Now.zonedDateTimeISO(); // get the current date and wall-clock time in the system time zone and ISO-8601 calendar
    Temporal.Now.plainDateISO(); // get the current date in the system time zone and ISO-8601 calendar
    Temporal.Now.plainTimeISO(); // get the current wall-clock time in the system time zone and ISO-8601 calendar
    Temporal.Now.plainDateTimeISO(); // same as above, but return the DateTime in the ISO-8601 calendar
}


//// [temporal.js]
"use strict";
/**
 * Test cases derived from documentation at tc39/proposal-temporal,
 * under the following license:
 *
 * Copyright 2017, 2018, 2019, 2020 ECMA International
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
{
    const instant = Temporal.Instant.from("2020-01-01T00:00+05:30"); // => 2019-12-31T18:30:00Z
    instant.epochNanoseconds; // => 1577817000000000000n
    // `Temporal.Instant` lacks properties that depend on time zone or calendar
    instant.year; // => undefined
    const zdtTokyo = instant.toZonedDateTimeISO("Asia/Tokyo"); // => 2020-01-01T03:30:00+09:00[Asia/Tokyo]
    zdtTokyo.year; // => 2020
    zdtTokyo.toPlainDate(); // => 2020-01-01
}
{
    // Convert from `Temporal.Instant` to `Date` (which uses millisecond precision)
    const instant = Temporal.Instant.from("2020-01-01T00:00:00.123456789+05:30");
    // => 2019-12-31T18:30:00.123456789Z
    const date = new Date(instant.epochMilliseconds);
    date.toISOString(); // => 2019-12-31T18:30:00.123Z
    // Convert from `Date` to `Temporal.Instant`
    const sameInstant = date.toTemporalInstant(); // => 2019-12-31T18:30:00.123Z
}
{
    const date = new Date(2019, 11, 31, 18, 30); // => Tue Dec 31 2019 18:30:00 GMT-0800 (Pacific Standard Time)
    const instant = date.toTemporalInstant(); // => 2020-01-01T02:30:00Z
    const zonedDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    // => 2019-12-31T18:30:00-08:00[America/Los_Angeles]
    zonedDateTime.day; // => 31
    const dateOnly = zonedDateTime.toPlainDate(); // => 2019-12-31
}
{
    const instant = new Temporal.Instant(1553906700000000000n);
    // When was the Unix epoch?
    const epoch = new Temporal.Instant(0n); // => 1970-01-01T00:00:00Z
    // Dates before the Unix epoch are negative
    const turnOfTheCentury = new Temporal.Instant(-2208988800000000000n); // => 1900-01-01T00:00:00Z
}
{
    let instant;
    instant = Temporal.Instant.from("2019-03-30T01:45:00+01:00[Europe/Berlin]");
    instant = Temporal.Instant.from("2019-03-30T01:45+01:00");
    instant = Temporal.Instant.from("2019-03-30T00:45Z");
    instant === Temporal.Instant.from(instant); // => false
}
{
    const legacyDate = new Date("1995-12-17T03:24Z");
    let instant;
    instant = Temporal.Instant.fromEpochMilliseconds(legacyDate.getTime()); // => 1995-12-17T03:24:00Z
    instant = legacyDate.toTemporalInstant(); // recommended
}
{
    const one = Temporal.Instant.fromEpochMilliseconds(1.0e12);
    const two = Temporal.Instant.fromEpochMilliseconds(1.1e12);
    const three = Temporal.Instant.fromEpochMilliseconds(1.2e12);
    const sorted = [three, one, two].sort(Temporal.Instant.compare);
    sorted.join(" ");
    // => '2001-09-09T01:46:40Z 2004-11-09T11:33:20Z 2008-01-10T21:20:00Z'
}
{
    const instant = Temporal.Instant.from("2019-03-30T00:45Z");
    new Date(instant.epochMilliseconds); // => 2019-03-30T00:45:00.000Z
    // If you need epoch seconds data:
    const epochSecs = Math.floor(instant.epochMilliseconds / 1000); // => 1553906700
    const ns = instant.epochNanoseconds;
    const epochMicros = ns / 1000n + ((ns % 1000n) < 0n ? -1n : 0n);
}
{
    // Converting a specific exact time to a calendar date / wall-clock time
    let timestamp;
    timestamp = Temporal.Instant.fromEpochMilliseconds(1553993100000);
    timestamp.toZonedDateTimeISO("Europe/Berlin"); // => 2019-03-31T01:45:00+01:00[Europe/Berlin]
    timestamp.toZonedDateTimeISO("UTC"); // => 2019-03-31T00:45:00+00:00[UTC]
    timestamp.toZonedDateTimeISO("-08:00"); // => 2019-03-30T16:45:00-08:00[-08:00]
    // What time was the Unix epoch (timestamp 0) in Bell Labs (Murray Hill, New Jersey, USA) in the Gregorian calendar?
    const epoch = Temporal.Instant.fromEpochMilliseconds(0);
    epoch.toZonedDateTimeISO("America/New_York").withCalendar("gregory");
    // => 1969-12-31T19:00:00-05:00[America/New_York][u-ca=gregory]
    // What time was the Unix epoch in Tokyo in the Japanese calendar?
    const zdt = epoch.toZonedDateTimeISO("Asia/Tokyo").withCalendar("japanese");
    // => 1970-01-01T09:00:00+09:00[Asia/Tokyo][u-ca=japanese]
    console.log(zdt.eraYear, zdt.era);
    // => '45 showa'
}
{
    // Temporal.Instant representing five hours from now
    Temporal.Now.instant().add({ hours: 5 });
    const fiveHours = Temporal.Duration.from({ hours: 5 });
    Temporal.Now.instant().add(fiveHours);
}
{
    // Temporal.Instant representing this time an hour ago
    Temporal.Now.instant().subtract({ hours: 1 });
    const oneHour = Temporal.Duration.from({ hours: 1 });
    Temporal.Now.instant().subtract(oneHour);
}
{
    const startOfMoonMission = Temporal.Instant.from("1969-07-16T13:32:00Z");
    const endOfMoonMission = Temporal.Instant.from("1969-07-24T16:50:35Z");
    const missionLength = startOfMoonMission.until(endOfMoonMission, { largestUnit: "hour" });
    // => PT195H18M35S
    missionLength.toLocaleString();
    // example output: '195 hours 18 minutes 35 seconds'
    // Rounding, for example if you don't care about the minutes and seconds
    const approxMissionLength = startOfMoonMission.until(endOfMoonMission, {
        largestUnit: "hour",
        smallestUnit: "hour",
    });
    // => PT195H
    // A billion (10^9) seconds since the epoch in different units
    const epoch = Temporal.Instant.fromEpochMilliseconds(0);
    const billion = Temporal.Instant.fromEpochMilliseconds(1e9);
    epoch.until(billion);
    // => PT1000000000S
    epoch.until(billion, { largestUnit: "hour" });
    // => PT277777H46M40S
    const ns = epoch.until(billion, { largestUnit: "nanosecond" });
    // => PT1000000000S
    ns.add({ nanoseconds: 1 });
    // => PT1000000000S
    // (lost precision)
    // Calculate the difference in years, eliminating the ambiguity by
    // explicitly using the corresponding calendar date in UTC:
    epoch.toZonedDateTimeISO("UTC").until(billion.toZonedDateTimeISO("UTC"), { largestUnit: "year" });
    // => P31Y8M8DT1H46M40S
}
{
    const instant = Temporal.Instant.from("2019-03-30T02:45:59.999999999Z");
    // Round to a particular unit
    instant.round({ smallestUnit: "second" }); // => 2019-03-30T02:46:00Z
    // Round to an increment of a unit, e.g. an hour:
    instant.round({ roundingIncrement: 60, smallestUnit: "minute" });
    // => 2019-03-30T03:00:00Z
    // Round to the same increment but round down instead:
    instant.round({ roundingIncrement: 60, smallestUnit: "minute", roundingMode: "floor" });
    // => 2019-03-30T02:00:00Z
}
{
    const one = Temporal.Instant.fromEpochMilliseconds(1.0e12);
    const two = Temporal.Instant.fromEpochMilliseconds(1.1e12);
    one.equals(two); // => false
    one.equals(one); // => true
}
{
    const instant = Temporal.Instant.fromEpochMilliseconds(1574074321816);
    instant.toString(); // => '2019-11-18T10:52:01.816Z'
    instant.toString({ timeZone: "UTC" });
    // => '2019-11-18T10:52:01.816+00:00'
    instant.toString({ timeZone: "Asia/Seoul" });
    // => '2019-11-18T19:52:01.816+09:00'
    instant.toString({ smallestUnit: "minute" });
    // => '2019-11-18T10:52Z'
    instant.toString({ fractionalSecondDigits: 0 });
    // => '2019-11-18T10:52:01Z'
    instant.toString({ fractionalSecondDigits: 4 });
    // => '2019-11-18T10:52:01.8160Z'
    instant.toString({ smallestUnit: "second", roundingMode: "halfExpand" });
    // => '2019-11-18T10:52:02Z'
}
{
    const instant = Temporal.Instant.from("2019-11-18T11:00:00.000Z");
    instant.toLocaleString(); // example output: '2019-11-18, 3:00:00 a.m.'
    instant.toLocaleString("de-DE"); // example output: '18.11.2019, 03:00:00'
    instant.toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "long",
    }); // => '18.11.2019, 12:00 Mitteleuropäische Normalzeit'
    instant.toLocaleString("en-US-u-nu-fullwide-hc-h12", {
        timeZone: "Asia/Kolkata",
    }); // => '１１/１８/２０１９, ４:３０:００ PM'
}
{
    // UNIX epoch in California
    new Temporal.ZonedDateTime(0n, "America/Los_Angeles", "iso8601");
    // => 1969-12-31T16:00:00-08:00[America/Los_Angeles]
    new Temporal.ZonedDateTime(0n, "America/Los_Angeles");
    // => 1969-12-31T16:00:00-08:00[America/Los_Angeles]
    // same, but shorter
}
{
    let zdt;
    zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Cairo]");
    zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Cairo][u-ca=islamic]");
    zdt = Temporal.ZonedDateTime.from("19951207T032430+0200[Africa/Cairo]");
    zdt = Temporal.ZonedDateTime.from({
        timeZone: "America/Los_Angeles",
        year: 1995,
        month: 12,
        day: 7,
        hour: 3,
        minute: 24,
        second: 30,
        millisecond: 0,
        microsecond: 3,
        nanosecond: 500,
    }); // => 1995-12-07T03:24:30.0000035-08:00[America/Los_Angeles]
    // Different overflow modes
    zdt = Temporal.ZonedDateTime.from({ timeZone: "Europe/Paris", year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01T00:00:00+01:00[Europe/Paris]
    zdt = Temporal.ZonedDateTime.from({ timeZone: "Europe/Paris", year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws RangeError
}
{
    const arr = [
        Temporal.ZonedDateTime.from("2020-02-01T12:30-05:00[America/Toronto]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30-05:00[America/New_York]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30+01:00[Europe/Brussels]"),
        Temporal.ZonedDateTime.from("2020-02-01T12:30+00:00[Europe/London]"),
    ];
    const sorted = arr.sort(Temporal.ZonedDateTime.compare);
    JSON.stringify(sorted, undefined, 2);
    // =>
    // '[
    //   "2020-02-01T12:30+01:00[Europe/Brussels]",
    //   "2020-02-01T12:30+00:00[Europe/London]",
    //   "2020-02-01T12:30-05:00[America/Toronto]",
    //   "2020-02-01T12:30-05:00[America/New_York]"
    // ]'
}
{
    const dt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500[Europe/Rome]");
    dt.year; // => 1995
    dt.month; // => 12
    dt.monthCode; // => 'M12'
    dt.day; // => 7
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500
}
{
    const zdt = Temporal.ZonedDateTime.from("2020-02-01T12:30+09:00[Asia/Tokyo]");
    const epochMs = zdt.epochMilliseconds;
    // => 1580527800000
    zdt.toInstant().epochMilliseconds;
    // => 1580527800000
    const legacyDate = new Date(epochMs);
    // => 2020-02-01T03:30:00.000Z
    // (if the system time zone is America/Los_Angeles)
    const epochNanos = zdt.epochNanoseconds;
    // => 1580527800000000000n
    // If you need epoch seconds data:
    const epochSecs = Math.floor(zdt.epochMilliseconds / 1000); // => 1553906700
    // => 1580527800
    // If you need epoch microseconds data:
    // (Note the extra check for correct floor rounding with bigints)
    const ns = zdt.epochNanoseconds;
    const epochMicros = ns / 1000n + ((ns % 1000n) < 0n ? -1n : 0n);
    // => 1580527800000000n
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    `Time zone is: ${zdt.timeZoneId}`;
    // => 'Time zone is: America/Los_Angeles'
    zdt.withTimeZone("Asia/Kolkata").timeZoneId;
    // => Asia/Kolkata
    zdt.withTimeZone("Asia/Calcutta").timeZoneId;
    // => Asia/Calcutta (does not follow links in the IANA Time Zone Database)
    zdt.withTimeZone("europe/paris").timeZoneId;
    // => Europe/Paris (normalized to match IANA Time Zone Database capitalization)
    zdt.withTimeZone("+05:00").timeZoneId;
    // => +05:00
    zdt.withTimeZone("+05").timeZoneId;
    // => +05:00  (normalized to ±HH:MM)
    zdt.withTimeZone("+0500").timeZoneId;
    // => +05:00  (normalized to ±HH:MM)
}
{
    const date = Temporal.ZonedDateTime.from("-000015-01-01T12:30[Europe/Rome][u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][zdt.dayOfWeek - 1]; // => 'THU'
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    // ISO ordinal date
    console.log(zdt.year, zdt.dayOfYear); // => '1995 341'
}
{
    const zdt = Temporal.ZonedDateTime.from("2022-01-01T03:24-08:00[America/Los_Angeles]");
    // ISO week date
    console.log(zdt.yearOfWeek, zdt.weekOfYear, zdt.dayOfWeek); // => '2021 52 6'
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24-08:00[America/Los_Angeles]");
    zdt.daysInWeek; // => 7
}
{
    // Attempt to write some mnemonic poetry
    const monthsByDays = {};
    for (let month = 1; month <= 12; month++) {
        const zdt = Temporal.Now.zonedDateTimeISO().with({ month });
        monthsByDays[zdt.daysInMonth] = (monthsByDays[zdt.daysInMonth] || []).concat(zdt);
    }
    const strings = monthsByDays[30].map(zdt => zdt.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop());
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;
    console.log(poem);
}
{
    const zdt = Temporal.Now.zonedDateTimeISO();
    const percent = zdt.dayOfYear / zdt.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}
{
    const zdt = Temporal.ZonedDateTime.from("1900-01-01T12:00+09:00[Asia/Tokyo]");
    zdt.monthsInYear; // => 12
}
{
    // Is this year a leap year?
    const zdt = Temporal.Now.zonedDateTimeISO();
    zdt.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    zdt.with({ year: 2100 }).inLeapYear; // => false
}
{
    const zdt = Temporal.ZonedDateTime.from("2010-11-07T23:00:00-03:30[America/St_Johns]");
    zdt.hoursInDay; // 25
}
{
    const zdt = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    zdt.offsetNanoseconds;
    // => -25200000000000
    // (-7 * 3600 * 1e9)
}
{
    const zdt = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    zdt.offset;
    // => '-07:00'
    zdt.withTimeZone("Asia/Kolkata").offset;
    // => '+05:30'
    const minus8Hours = "-08:00";
    const daylightTime0130 = Temporal.ZonedDateTime.from("2020-11-01T01:30-07:00[America/Los_Angeles]");
    // => 2020-11-01T01:30:00-07:00[America/Los_Angeles]
    // This is Pacific Daylight Time 1:30AM
    const repeated0130 = daylightTime0130.with({ offset: minus8Hours });
    // => 2020-11-01T01:30:00-08:00[America/Los_Angeles]
    // This is Pacific Standard Time 1:30AM
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:00-06:00[America/Chicago]");
    zdt.with({ year: 2015, minute: 31 }); // => 2015-12-07T03:31:00-06:00[America/Chicago]
}
{
    const zdt = Temporal.ZonedDateTime.from("2015-12-07T03:24:30.000003500-08:00[America/Los_Angeles]");
    zdt.withPlainTime({ hour: 10 }); // => 2015-12-07T10:00:00-08:00[America/Los_Angeles]
    const time = Temporal.PlainTime.from("11:22");
    zdt.withPlainTime(time); // => 2015-12-07T11:22:00-08:00[America/Los_Angeles]
    zdt.withPlainTime("12:34"); // => 2015-12-07T12:34:00-08:00[America/Los_Angeles]
    // easier for chaining
    zdt.add({ days: 2, hours: 22 }).withPlainTime("00:00"); // => 2015-12-10T00:00:00-08:00[America/Los_Angeles]
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+09:00[Asia/Tokyo]");
    zdt.toString(); // => '1995-12-07T03:24:30+09:00[Asia/Tokyo]'
    zdt.withTimeZone("Africa/Accra").toString(); // => '1995-12-06T18:24:30+00:00[Africa/Accra]'
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+09:00[Asia/Tokyo][u-ca=japanese]");
    `${zdt.era} ${zdt.eraYear}`; // => 'heisei 7'
    zdt.withCalendar("gregory").eraYear; // => 1995
}
{
    const zdt = Temporal.ZonedDateTime.from("2020-03-08T00:00-08:00[America/Los_Angeles]");
    // Add a day to get midnight on the day after DST starts
    const laterDay = zdt.add({ days: 1 });
    // => 2020-03-09T00:00:00-07:00[America/Los_Angeles]
    // Note that the new offset is different, indicating the result is adjusted for DST.
    laterDay.since(zdt, { largestUnit: "hour" }).hours;
    // => 23
    // because one clock hour lost to DST
    const laterHours = zdt.add({ hours: 24 });
    // => 2020-03-09T01:00:00-07:00[America/Los_Angeles]
    // Adding time units doesn't adjust for DST. Result is 1:00AM: 24 real-world
    // hours later because a clock hour was skipped by DST.
    laterHours.since(zdt, { largestUnit: "hour" }).hours; // => 24
}
{
    const zdt = Temporal.ZonedDateTime.from("2020-03-09T00:00-07:00[America/Los_Angeles]");
    // Add a day to get midnight on the day after DST starts
    const earlierDay = zdt.subtract({ days: 1 });
    // => 2020-03-08T00:00:00-08:00[America/Los_Angeles]
    // Note that the new offset is different, indicating the result is adjusted for DST.
    earlierDay.since(zdt, { largestUnit: "hour" }).hours;
    // => -23
    // because one clock hour lost to DST
    const earlierHours = zdt.subtract({ hours: 24 });
    // => 2020-03-07T23:00:00-08:00[America/Los_Angeles]
    // Subtracting time units doesn't adjust for DST. Result is 11:00PM: 24 real-world
    // hours earlier because a clock hour was skipped by DST.
    earlierHours.since(zdt, { largestUnit: "hour" }).hours; // => -24
}
{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+05:30[Asia/Kolkata]");
    const zdt2 = Temporal.ZonedDateTime.from("2019-01-31T15:30+05:30[Asia/Kolkata]");
    zdt1.until(zdt2);
    // => PT202956H5M29.9999965S
    zdt1.until(zdt2, { largestUnit: "year" });
    // => P23Y1M24DT12H5M29.9999965S
    zdt2.until(zdt1, { largestUnit: "year" });
    // => -P23Y1M24DT12H5M29.9999965S
    zdt1.until(zdt2, { largestUnit: "nanosecond" });
    // => PT730641929.999996544S
    // (precision lost)
    // Rounding, for example if you don't care about sub-seconds
    zdt1.until(zdt2, { smallestUnit: "second" });
    // => PT202956H5M29S
    // Months and years can be different lengths
    const [jan1, feb1, mar1] = [1, 2, 3].map(month => Temporal.ZonedDateTime.from({ year: 2020, month, day: 1, timeZone: "Asia/Seoul" }));
    jan1.until(feb1, { largestUnit: "day" }); // => P31D
    jan1.until(feb1, { largestUnit: "month" }); // => P1M
    feb1.until(mar1, { largestUnit: "day" }); // => P29D
    feb1.until(mar1, { largestUnit: "month" }); // => P1M
    jan1.until(mar1, { largestUnit: "day" }); // => P60D
}
{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+05:30[Asia/Kolkata]");
    const zdt2 = Temporal.ZonedDateTime.from("2019-01-31T15:30+05:30[Asia/Kolkata]");
    zdt2.since(zdt1); // => PT202956H5M29.9999965S
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500-08:00[America/Los_Angeles]");
    // Round to a particular unit
    zdt.round({ smallestUnit: "hour" });
    // => 1995-12-07T03:00:00-08:00[America/Los_Angeles]
    // Round to an increment of a unit, e.g. half an hour:
    zdt.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 1995-12-07T03:30:00-08:00[America/Los_Angeles]
    // Round to the same increment but round down instead:
    zdt.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "floor" });
    // => 1995-12-07T03:00:00-08:00[America/Los_Angeles]
}
{
    const zdt = Temporal.ZonedDateTime.from("2015-10-18T12:00-02:00[America/Sao_Paulo]");
    zdt.startOfDay(); // => 2015-10-18T01:00:00-02:00[America/Sao_Paulo]
}
{
    let duration;
    // How long until the next offset change from now, in the current location?
    const tz = Temporal.Now.timeZoneId();
    const now = Temporal.Now.zonedDateTimeISO(tz);
    const nextTransition = now.getTimeZoneTransition("next");
    duration = nextTransition.since(now);
    duration.toLocaleString(); // output will vary
    // How long until the previous offset change from now, in the current location?
    const previousTransition = now.getTimeZoneTransition("previous");
    duration = now.since(previousTransition);
    duration.toLocaleString(); // output will vary
}
{
    const zdt1 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+01:00[Europe/Paris]");
    const zdt2 = Temporal.ZonedDateTime.from("1995-12-07T03:24:30.000003500+01:00[Europe/Brussels]");
    zdt1.equals(zdt2); // => false (same offset but different time zones)
    zdt1.equals(zdt1); // => true
    // To compare time zone IDs, use withTimeZone() with each ID on the same
    // ZonedDateTime instance, and use equals() to compare
    const kolkata = zdt1.withTimeZone("Asia/Kolkata");
    kolkata.equals(zdt1.withTimeZone("Asia/Calcutta")); // => true
    // Offset time zones are never equivalent to named time zones
    kolkata.equals(zdt1.withTimeZone("+05:30")); // => false
    const zeroOffset = zdt1.withTimeZone("+00:00");
    zeroOffset.equals(zdt1.withTimeZone("UTC")); // => false
    // For offset time zones, any valid format is accepted
    zeroOffset.equals(zdt1.withTimeZone("+00:00")); // => true
    zeroOffset.equals(zdt1.withTimeZone("+0000")); // => true
    zeroOffset.equals(zdt1.withTimeZone("+00")); // => true
}
{
    let zdt;
    zdt = Temporal.ZonedDateTime.from({ year: 2019, month: 12, day: 1, hour: 12, timeZone: "Africa/Lagos" });
    zdt.toString(); // => '2019-12-01T12:00:00+01:00[Africa/Lagos]'
    zdt = zdt.withCalendar("japanese");
    zdt.toString(); // => '2019-12-01T12:00:00+01:00[Africa/Lagos][u-ca=japanese]'
}
{
    const zdt = Temporal.ZonedDateTime.from("2019-12-01T12:00+01:00[Europe/Berlin]");
    zdt.toLocaleString(); // example output: 12/1/2019, 12:00:00 PM
    zdt.toLocaleString("de-DE"); // => '1.12.2019, 12:00:00 MEZ'
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    zdt.toLocaleString("de-DE", options); // => 'Sonntag, 1. Dezember 2019'
    /* WRONG */ zdt.toLocaleString("de-DE", { timeZone: "Pacific/Auckland" });
    // => RangeError: Time zone option Pacific/Auckland does not match actual time zone Europe/Berlin
    zdt.withTimeZone("Pacific/Auckland").toLocaleString("de-DE"); // => '2.12.2019, 0:00:00 GMT+13'
    zdt.toLocaleString("en-US-u-nu-fullwide-hc-h12"); // => '１２/１/２０１９, １２:００:００ PM GMT+１'
}
{
    const zdt = Temporal.ZonedDateTime.from("1995-12-07T03:24:30+02:00[Africa/Johannesburg]");
    zdt.toInstant(); // => 1995-12-07T01:24:30Z
    zdt.toPlainDateTime(); // => 1995-12-07T03:24:30
    zdt.toPlainDate(); // => 1995-12-07
    zdt.toPlainTime(); // => 03:24:30
    zdt.toPlainDate().toPlainYearMonth(); // => 1995-12
    zdt.toPlainDate().toPlainMonthDay(); // => 12-07
}
{
    // Pi day in 2020
    const date = new Temporal.PlainDate(2020, 3, 14); // => 2020-03-14
}
{
    let date;
    date = Temporal.PlainDate.from("2006-08-24"); // => 2006-08-24
    date = Temporal.PlainDate.from("20060824"); // => 2006-08-24
    date = Temporal.PlainDate.from("2006-08-24T15:43:27"); // => 2006-08-24
    date = Temporal.PlainDate.from("2006-08-24T15:43:27+01:00[Europe/Brussels]");
    // => 2006-08-24
    date === Temporal.PlainDate.from(date); // => false
    date = Temporal.PlainDate.from({ year: 2006, month: 8, day: 24 }); // => 2006-08-24
    date = Temporal.PlainDate.from(Temporal.PlainDateTime.from("2006-08-24T15:43:27"));
    // => 2006-08-24
    // same as above; Temporal.PlainDateTime has year, month, and day properties
    date = Temporal.PlainDate.from({ year: 1427, month: 8, day: 1, calendar: "islamic" });
    // => 2006-08-24[u-ca=islamic]
    // Different overflow modes
    date = Temporal.PlainDate.from({ year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01
    date = Temporal.PlainDate.from({ year: 2001, month: 1, day: 32 }, { overflow: "constrain" });
    // => 2001-01-31
    date = Temporal.PlainDate.from({ year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws
    date = Temporal.PlainDate.from({ year: 2001, month: 1, day: 32 }, { overflow: "reject" });
    // => throws
}
{
    const one = Temporal.PlainDate.from("2006-08-24");
    const two = Temporal.PlainDate.from("2015-07-14");
    const three = Temporal.PlainDate.from("1930-02-18");
    const sorted = [one, two, three].sort(Temporal.PlainDate.compare);
    sorted.join(" "); // => '1930-02-18 2006-08-24 2015-07-14'
}
{
    let date;
    date = Temporal.PlainDate.from("2006-08-24");
    date.year; // => 2006
    date.month; // => 8
    date.monthCode; // => 'M08'
    date.day; // => 24
    date = Temporal.PlainDate.from("2019-02-23[u-ca=hebrew]");
    date.year; // => 5779
    date.month; // => 6
    date.monthCode; // => 'M05L'
    date.day; // => 18
}
{
    const date = Temporal.PlainDate.from("-000015-01-01[u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][date.dayOfWeek - 1]; // => 'THU'
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    // ISO ordinal date
    console.log(date.year, date.dayOfYear); // => '2006 236'
}
{
    const date = Temporal.PlainDate.from("2022-01-01");
    // ISO week date
    console.log(date.yearOfWeek, date.weekOfYear, date.dayOfWeek); // => '2021 52 6'
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.daysInWeek; // => 7
}
{
    // Attempt to write some mnemonic poetry
    const monthsByDays = {};
    for (let month = 1; month <= 12; month++) {
        const date = Temporal.Now.plainDateISO().with({ month });
        monthsByDays[date.daysInMonth] = (monthsByDays[date.daysInMonth] || []).concat(date);
    }
    const strings = monthsByDays[30].map(date => date.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop());
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;
    console.log(poem);
}
{
    const date = Temporal.Now.plainDateISO();
    const percent = date.dayOfYear / date.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}
{
    const date = Temporal.PlainDate.from("1900-01-01");
    date.monthsInYear; // => 12
}
{
    // Is this year a leap year?
    const date = Temporal.Now.plainDateISO();
    date.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    date.with({ year: 2100 }).inLeapYear; // => false
}
{
    const date = Temporal.PlainDate.from("2006-01-24");
    // What's the first day of this month?
    date.with({ day: 1 }); // => 2006-01-01
    // What's the last day of the next month?
    const nextMonthDate = date.add({ months: 1 });
    nextMonthDate.with({ day: nextMonthDate.daysInMonth }); // => 2006-02-28
}
{
    const date = Temporal.PlainDate.from("2006-08-24[u-ca=japanese]");
    date.withCalendar("iso8601"); // => 2006-08-24
}
{
    let date;
    date = Temporal.PlainDate.from("2006-08-24");
    date.add({ years: 20, months: 4 }); // => 2026-12-24
    date = Temporal.PlainDate.from("2019-01-31");
    date.add({ months: 1 }); // => 2019-02-28
    date.add({ months: 1 }, { overflow: "reject" }); // => throws
}
{
    let date;
    date = Temporal.PlainDate.from("2006-08-24");
    date.subtract({ years: 20, months: 4 }); // => 1986-04-24
    date = Temporal.PlainDate.from("2019-03-31");
    date.subtract({ months: 1 }); // => 2019-02-28
    date.subtract({ months: 1 }, { overflow: "reject" }); // => throws
}
{
    const earlier = Temporal.PlainDate.from("2006-08-24");
    const later = Temporal.PlainDate.from("2019-01-31");
    earlier.until(later); // => P4543D
    earlier.until(later, { largestUnit: "year" }); // => P12Y5M7D
    later.until(earlier, { largestUnit: "year" }); // => -P12Y5M7D
    // If you really need to calculate the difference between two Dates in
    // hours, you can eliminate the ambiguity by explicitly choosing the
    // point in time from which you want to reckon the difference. For
    // example, using noon:
    const noon = Temporal.PlainTime.from("12:00");
    earlier.toPlainDateTime(noon).until(later.toPlainDateTime(noon), { largestUnit: "hour" });
    // => PT109032H
    const newyear = Temporal.PlainDate.from("2020-01-01");
    newyear.until("2020-01-15", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT0S
    newyear.until("2020-01-16", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT0S (mid-month dates rounded down to match `Temporal.PlainDateTime` behavior)
    newyear.until("2020-01-17", { smallestUnit: "month", roundingMode: "halfExpand" });
    // => PT1M
}
{
    const earlier = Temporal.PlainDate.from("2006-08-24");
    const later = Temporal.PlainDate.from("2019-01-31");
    later.since(earlier); // => P4543D
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    const other = Temporal.PlainDate.from("2019-01-31");
    date.equals(other); // => false
    date.equals(date); // => true
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toString(); // => '2006-08-24'
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toLocaleString(); // example output: 8/24/2006
    date.toLocaleString("de-DE"); // example output: '24.8.2006'
    date.toLocaleString("de-DE", { weekday: "long" }); // => 'Donnerstag'
    date.toLocaleString("en-US-u-nu-fullwide"); // => '８/２４/２００６'
}
{
    const plainDate = Temporal.PlainDate.from("2006-08-24");
    const plainTime = Temporal.PlainTime.from("15:23:30.003");
    plainDate.toZonedDateTime({ timeZone: "America/Los_Angeles", plainTime });
    // => 2006-08-24T15:23:30.003-07:00[America/Los_Angeles]
    plainDate.toZonedDateTime({ timeZone: "America/Los_Angeles" });
    // => 2006-08-24T00:00:00-07:00[America/Los_Angeles]
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    const time = Temporal.PlainTime.from("15:23:30.003");
    date.toPlainDateTime(time); // => 2006-08-24T15:23:30.003
    date.toPlainDateTime(); // => 2006-08-24T00:00:00
}
{
    const date = Temporal.PlainDate.from("2006-08-24");
    date.toPlainYearMonth(); // => 2006-08
    date.toPlainMonthDay(); // => 08-24
}
{
    // Leet hour
    const time = new Temporal.PlainTime(13, 37); // => 13:37:00
}
{
    let time;
    time = Temporal.PlainTime.from("03:24:30"); // => 03:24:30
    time = Temporal.PlainTime.from("032430"); // => 03:24:30
    time = Temporal.PlainTime.from("1995-12-07T03:24:30"); // => 03:24:30
    time = Temporal.PlainTime.from("1995-12-07T03:24:30+01:00[Europe/Brussels]");
    // => 03:24:30
    // (same as above; time zone is ignored)
    time === Temporal.PlainTime.from(time); // => false
    time = Temporal.PlainTime.from({
        hour: 19,
        minute: 39,
        second: 9,
        millisecond: 68,
        microsecond: 346,
        nanosecond: 205,
    }); // => 19:39:09.068346205
    time = Temporal.PlainTime.from({ hour: 19, minute: 39, second: 9 }); // => 19:39:09
    time = Temporal.PlainTime.from(Temporal.PlainDateTime.from("2020-02-15T19:39:09"));
    // => 19:39:09
    // (same as above; Temporal.PlainDateTime has hour, minute, etc. properties)
    // Different overflow modes
    time = Temporal.PlainTime.from({ hour: 15, minute: 60 }, { overflow: "constrain" });
    // => 15:59:00
    time = Temporal.PlainTime.from({ hour: 15, minute: -1 }, { overflow: "constrain" });
    // => 15:00:00
    time = Temporal.PlainTime.from({ hour: 15, minute: 60 }, { overflow: "reject" });
    // => throws
    time = Temporal.PlainTime.from({ hour: 15, minute: -1 }, { overflow: "reject" });
    // => throws
}
{
    const one = Temporal.PlainTime.from("03:24");
    const two = Temporal.PlainTime.from("01:24");
    const three = Temporal.PlainTime.from("01:24:05");
    const sorted = [one, two, three].sort(Temporal.PlainTime.compare);
    sorted.join(" "); // => '01:24:00 01:24:05 03:24:00'
}
{
    // Backward transitions will repeat clock times
    const zdtDst = Temporal.ZonedDateTime.from("2020-11-01T01:45-07:00[America/Los_Angeles]");
    const zdtStandard = Temporal.ZonedDateTime.from("2020-11-01T01:30-08:00[America/Los_Angeles]");
    // The "first" 1:45 (in Daylight Time) is earlier than the "second" 1:30 (in Standard Time)
    Temporal.ZonedDateTime.compare(zdtDst, zdtStandard); // => -1
    // 1:45 is later than 1:30 when looking at a wall clock
    Temporal.PlainTime.compare(zdtDst, zdtStandard); // => 1
    // Forward transitions will skip clock times. Skipped times will be disambiguated.
    const zdtBase = Temporal.ZonedDateTime.from("2020-03-08[America/Los_Angeles]");
    const timeSkipped = Temporal.PlainTime.from("02:30");
    const timeValid = Temporal.PlainTime.from("03:30");
    const zdtSkipped = zdtBase.withPlainTime(timeSkipped);
    const zdtValid = zdtBase.withPlainTime(timeValid);
    // The skipped time 2:30AM is disambiguated to 3:30AM, so the instants are equal
    Temporal.ZonedDateTime.compare(zdtSkipped, zdtValid); // => 0
    // 2:30 is earlier than 3:30 on a wall clock
    Temporal.PlainTime.compare(timeSkipped, timeValid); // => -1
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.hour; // => 19
    time.minute; // => 39
    time.second; // => 9
    time.millisecond; // => 68
    time.microsecond; // => 346
    time.nanosecond; // => 205
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    // What's the top of the next hour?
    time.add({ hours: 1 }).with({
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    }); // => 20:00:00
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.add({ minutes: 5, nanoseconds: 800 }); // => 19:44:09.068347005
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.subtract({ minutes: 5, nanoseconds: 800 }); // => 19:34:09.068345405
}
{
    const time = Temporal.PlainTime.from("20:13:20.971398099");
    time.until(Temporal.PlainTime.from("22:39:09.068346205")); // => PT2H25M48.096948106S
    time.until(Temporal.PlainTime.from("19:39:09.068346205")); // => -PT34M11.903051894S
    // Rounding, for example if you don't care about sub-seconds
    time.until(Temporal.PlainTime.from("22:39:09.068346205"), { smallestUnit: "second" });
    // => PT2H25M48S
}
{
    const time = Temporal.PlainTime.from("20:13:20.971398099");
    time.since(Temporal.PlainTime.from("19:39:09.068346205")); // => PT34M11.903051894S
    time.since(Temporal.PlainTime.from("22:39:09.068346205")); // => -PT2H25M48.096948106S
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    // Round to a particular unit
    time.round({ smallestUnit: "hour" }); // => 20:00:00
    // Round to an increment of a unit, e.g. half an hour:
    time.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 19:30:00
    // Round to the same increment but round up instead:
    time.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "ceil" });
    // => 20:00:00
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    const other = Temporal.PlainTime.from("20:13:20.971398099");
    time.equals(other); // => false
    time.equals(time); // => true
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.toString(); // => '19:39:09.068346205'
    time.toString({ smallestUnit: "minute" }); // => '19:39'
    time.toString({ fractionalSecondDigits: 0 }); // => '19:39:09'
    time.toString({ fractionalSecondDigits: 4 }); // => '19:39:09.0683'
    time.toString({ fractionalSecondDigits: 5, roundingMode: "halfExpand" });
    // => '19:39:09.06835'
}
{
    const time = Temporal.PlainTime.from("19:39:09.068346205");
    time.toLocaleString(); // example output: '7:39:09 PM'
    time.toLocaleString("de-DE"); // example output: '19:39:09'
    time.toLocaleString("de-DE", { timeZone: "Europe/Berlin" }); // => '19:39:09'
    time.toLocaleString("en-US-u-nu-fullwide-hc-h24"); // => '１９:３９:０９'
}
{
    // Leet hour on pi day in 2020
    const datetime = new Temporal.PlainDateTime(2020, 3, 14, 13, 37); // => 2020-03-14T13:37:00
}
{
    let dt;
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30");
    dt = Temporal.PlainDateTime.from("19951207T032430");
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30+01:00[Europe/Brussels]");
    // => 1995-12-07T03:24:30
    // same as above; time zone is ignored
    dt === Temporal.PlainDateTime.from(dt); // => false
    dt = Temporal.PlainDateTime.from({
        year: 1995,
        month: 12,
        day: 7,
        hour: 3,
        minute: 24,
        second: 30,
        millisecond: 0,
        microsecond: 3,
        nanosecond: 500,
    }); // => 1995-12-07T03:24:30.0000035
    dt = Temporal.PlainDateTime.from({ year: 1995, month: 12, day: 7 }); // => 1995-12-07T00:00:00
    dt = Temporal.PlainDateTime.from(Temporal.PlainDate.from("1995-12-07T03:24:30"));
    // => 1995-12-07T00:00:00
    // same as above; Temporal.PlainDate has year, month, and day properties
    dt = Temporal.PlainDateTime.from({ year: 5756, month: 3, day: 14, hour: 3, minute: 24, second: 30, calendar: "hebrew" });
    // => 1995-12-07T03:24:30[u-ca=hebrew]
    // Different overflow modes
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 13, day: 1 }, { overflow: "constrain" });
    // => 2001-12-01T00:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 32 }, { overflow: "constrain" });
    // => 2001-01-31T00:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, hour: 25 }, { overflow: "constrain" });
    // => 2001-01-01T23:00:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, minute: 60 }, { overflow: "constrain" });
    // => 2001-01-01T00:59:00
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 13, day: 1 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 32 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, hour: 25 }, { overflow: "reject" });
    // => throws
    dt = Temporal.PlainDateTime.from({ year: 2001, month: 1, day: 1, minute: 60 }, { overflow: "reject" });
    // => throws
}
{
    const one = Temporal.PlainDateTime.from("1995-12-07T03:24");
    const two = Temporal.PlainDateTime.from("1995-12-07T01:24");
    const three = Temporal.PlainDateTime.from("2015-12-07T01:24");
    const sorted = [one, two, three].sort(Temporal.PlainDateTime.compare);
    sorted.join(" ");
    // => '1995-12-07T01:24:00 1995-12-07T03:24:00 2015-12-07T01:24:00'
}
{
    let dt;
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.year; // => 1995
    dt.month; // => 12
    dt.monthCode; // => 'M12'
    dt.day; // => 7
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500
    dt = Temporal.PlainDateTime.from("2019-02-23T03:24:30.000003500[u-ca=hebrew]");
    dt.year; // => 5779
    dt.month; // => 6
    dt.monthCode; // => 'M05L'
    dt.day; // => 18
    dt.hour; // => 3
    dt.minute; // => 24
    dt.second; // => 30
    dt.millisecond; // => 0
    dt.microsecond; // => 3
    dt.nanosecond; // => 500
}
{
    const date = Temporal.PlainDateTime.from("-000015-01-01T12:30[u-ca=gregory]");
    date.era;
    // => 'bce'
    date.eraYear;
    // => 16
    date.year;
    // => -15
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][dt.dayOfWeek - 1]; // => 'THU'
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    // ISO ordinal date
    console.log(dt.year, dt.dayOfYear); // => '1995 341'
}
{
    const dt = Temporal.PlainDateTime.from("2022-01-01T03:24:30.000003500");
    // ISO week date
    console.log(dt.yearOfWeek, dt.weekOfYear, dt.dayOfWeek); // => '2021 52 6'
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.daysInWeek; // => 7
}
{
    // Attempt to write some mnemonic poetry
    const monthsByDays = {};
    for (let month = 1; month <= 12; month++) {
        const dt = Temporal.Now.plainDateTimeISO().with({ month });
        monthsByDays[dt.daysInMonth] = (monthsByDays[dt.daysInMonth] || []).concat(dt);
    }
    const strings = monthsByDays[30].map(dt => dt.toLocaleString("en", { month: "long" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop());
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;
    console.log(poem);
}
{
    const dt = Temporal.Now.plainDateTimeISO();
    const percent = dt.dayOfYear / dt.daysInYear;
    `The year is ${percent.toLocaleString("en", { style: "percent" })} over!`;
    // example output: "The year is 10% over!"
}
{
    const dt = Temporal.PlainDate.from("1900-01-01T12:00");
    dt.monthsInYear; // => 12
}
{
    // Is this year a leap year?
    const dt = Temporal.Now.plainDateTimeISO();
    dt.inLeapYear; // example output: true
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    dt.with({ year: 2100 }).inLeapYear; // => false
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.with({ year: 2015, second: 31 }); // => 2015-12-07T03:24:31.0000035
}
{
    const dt = Temporal.PlainDateTime.from("2015-12-07T03:24:30.000003500");
    dt.withPlainTime({ hour: 10 }); // => 2015-12-07T10:00:00
    const time = Temporal.PlainTime.from("11:22");
    dt.withPlainTime(time); // => 2015-12-07T11:22:00
    dt.withPlainTime("12:34"); // => 2015-12-07T12:34:00
    // easier for chaining
    dt.add({ days: 2, hours: 22 }).withPlainTime("00:00"); // => 2015-12-10T00:00:00
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500[u-ca=japanese]");
    dt.withCalendar("iso8601"); // => 1995-12-07T03:24:30.0000035
}
{
    let dt;
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.add({ years: 20, months: 4, nanoseconds: 500 }); // => 2016-04-07T03:24:30.000004
    dt = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt.add({ months: 1 }); // => 2019-02-28T15:30:00
    dt.add({ months: 1 }, { overflow: "reject" }); // => throws
}
{
    let dt;
    dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.subtract({ years: 20, months: 4, nanoseconds: 500 }); // => 1975-08-07T03:24:30.000003
    dt = Temporal.PlainDateTime.from("2019-03-31T15:30");
    dt.subtract({ months: 1 }); // => 2019-02-28T15:30:00
    dt.subtract({ months: 1 }, { overflow: "reject" }); // => throws
}
{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt1.until(dt2);
    // => P8456DT12H5M29.9999965S
    dt1.until(dt2, { largestUnit: "year" });
    // => P23Y1M24DT12H5M29.9999965S
    dt2.until(dt1, { largestUnit: "year" });
    // => -P23Y1M24DT12H5M29.9999965S
    dt1.until(dt2, { largestUnit: "nanosecond" });
    // => PT730641929.999996544S
    // (precision lost)
    // Rounding, for example if you don't care about sub-seconds
    dt1.until(dt2, { smallestUnit: "second" });
    // => P8456DT12H5M29S
    // Months and years can be different lengths
    const [jan1, feb1, mar1] = [1, 2, 3].map(month => Temporal.PlainDateTime.from({ year: 2020, month, day: 1 }));
    jan1.until(feb1); // => P31D
    jan1.until(feb1, { largestUnit: "month" }); // => P1M
    feb1.until(mar1); // => P29D
    feb1.until(mar1, { largestUnit: "month" }); // => P1M
    jan1.until(mar1); // => P60D
}
{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt2.since(dt1); // => P8456DT12H5M29.9999965S
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    // Round to a particular unit
    dt.round({ smallestUnit: "hour" }); // => 1995-12-07T03:00:00
    // Round to an increment of a unit, e.g. half an hour:
    dt.round({ roundingIncrement: 30, smallestUnit: "minute" });
    // => 1995-12-07T03:30:00
    // Round to the same increment but round down instead:
    dt.round({ roundingIncrement: 30, smallestUnit: "minute", roundingMode: "floor" });
    // => 1995-12-07T03:00:00
}
{
    const dt1 = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    const dt2 = Temporal.PlainDateTime.from("2019-01-31T15:30");
    dt1.equals(dt2); // => false
    dt1.equals(dt1); // => true
}
{
    const dt = Temporal.PlainDateTime.from({
        year: 1999,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999,
        microsecond: 999,
        nanosecond: 999,
    });
    dt.toString(); // => '1999-12-31T23:59:59.999999999'
    dt.toString({ smallestUnit: "minute" }); // => '1999-12-31T23:59'
    dt.toString({ fractionalSecondDigits: 0 }); // => '1999-12-31T23:59:59'
    dt.toString({ fractionalSecondDigits: 4 }); // => '1999-12-31T23:59:59.9999'
    dt.toString({ fractionalSecondDigits: 8, roundingMode: "halfExpand" });
    // => '2000-01-01T00:00:00.00000000'
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.toLocaleString(); // example output: 1995-12-07, 3:24:30 a.m.
    dt.toLocaleString("de-DE"); // example output: 7.12.1995, 03:24:30
    dt.toLocaleString("de-DE", { timeZone: "Europe/Berlin", weekday: "long" }); // => 'Donnerstag'
    dt.toLocaleString("en-US-u-nu-fullwide-hc-h12"); // => '１２/７/１９９５, ３:２４:３０ AM'
}
{
    const dt = Temporal.PlainDateTime.from("1995-12-07T03:24:30.000003500");
    dt.toPlainDate(); // => 1995-12-07
    dt.toPlainTime(); // => 03:24:30.0000035
    dt.toPlainDate().toPlainYearMonth(); // => 1995-12
    dt.toPlainDate().toPlainMonthDay(); // => 12-07
}
{
    // The June 2019 meeting
    const ym = new Temporal.PlainYearMonth(2019, 6);
    // => 2019-06
}
{
    let ym;
    ym = Temporal.PlainYearMonth.from("2019-06"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24T15:43:27"); // => 2019-06
    ym = Temporal.PlainYearMonth.from("2019-06-24T15:43:27+01:00[Europe/Brussels]");
    // => 2019-06
    ym === Temporal.PlainYearMonth.from(ym); // => false
    ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6 }); // => 2019-06
    ym = Temporal.PlainYearMonth.from(Temporal.PlainDate.from("2019-06-24"));
    // => 2019-06
    // (same as above; Temporal.PlainDate has year and month properties)
    // Different overflow modes
    ym = Temporal.PlainYearMonth.from({ year: 2001, month: 13 }, { overflow: "constrain" });
    // => 2001-12
    ym = Temporal.PlainYearMonth.from({ year: 2001, month: 13 }, { overflow: "reject" });
    // => throws
}
{
    const one = Temporal.PlainYearMonth.from("2006-08");
    const two = Temporal.PlainYearMonth.from("2015-07");
    const three = Temporal.PlainYearMonth.from("1930-02");
    const sorted = [one, two, three].sort(Temporal.PlainYearMonth.compare);
    sorted.join(" "); // => '1930-02 2006-08 2015-07'
}
{
    let ym;
    ym = Temporal.PlainYearMonth.from("2019-06");
    ym.year; // => 2019
    ym.month; // => 6
    ym.monthCode; // => 'M06'
    ym = Temporal.PlainYearMonth.from("2019-02-23[u-ca=hebrew]");
    ym.year; // => 5779
    ym.month; // => 6
    ym.monthCode; // => 'M05L'
}
{
    const ym = Temporal.PlainYearMonth.from("-000015-01-01[u-ca=gregory]");
    ym.era;
    // => 'bce'
    ym.eraYear;
    // => 16
    ym.year;
    // => -15
}
{
    // Attempt to write some mnemonic poetry
    const monthsByDays = {};
    for (let month = 1; month <= 12; month++) {
        const ym = Temporal.PlainYearMonth.from({ year: 2020, calendar: "iso8601", month });
        monthsByDays[ym.daysInMonth] = (monthsByDays[ym.daysInMonth] || []).concat(ym);
    }
    const strings = monthsByDays[30].map(ym => ym.toLocaleString("en", { month: "long", calendar: "iso8601" }));
    // Shuffle to improve poem as determined empirically
    strings.unshift(strings.pop());
    const format = new Intl.ListFormat("en");
    const poem = `Thirty days hath ${format.format(strings)}`;
    console.log(poem);
}
{
    const ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6, calendar: "iso8601" });
    const percent = ym.daysInMonth / ym.daysInYear;
    `${ym.toLocaleString("en", { month: "long", year: "numeric", calendar: "iso8601" })} was ${percent.toLocaleString("en", { style: "percent" })} of the year!`;
    // => 'June 2019 was 8% of the year!'
}
{
    const ym = Temporal.PlainYearMonth.from("1900-01");
    ym.monthsInYear; // => 12
}
{
    // Was June 2019 in a leap year?
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.inLeapYear; // => false
    // Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
    ym.with({ year: 2100 }).inLeapYear; // => false
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    // Get December of that year
    ym.with({ month: 12 }); // => 2019-12
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.add({ years: 20, months: 4 }); // => 2039-10
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.subtract({ years: 20, months: 4 }); // => 1999-02
}
{
    const ym = Temporal.PlainYearMonth.from("2006-08");
    const other = Temporal.PlainYearMonth.from("2019-06");
    ym.until(other); // => P12Y10M
    ym.until(other, { largestUnit: "month" }); // => P154M
    other.until(ym, { largestUnit: "month" }); // => -P154M
    // If you really need to calculate the difference between two YearMonths
    // in days, you can eliminate the ambiguity by explicitly choosing the
    // day of the month (and if applicable, the time of that day) from which
    // you want to reckon the difference. For example, using the first of
    // the month to calculate a number of days:
    ym.toPlainDate({ day: 1 }).until(other.toPlainDate({ day: 1 }), { largestUnit: "day" }); // => P4687D
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    const other = Temporal.PlainYearMonth.from("2006-08");
    ym.since(other); // => P12Y10M
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    const other = Temporal.PlainYearMonth.from("2006-08");
    ym.equals(other); // => false
    ym.equals(ym); // => true
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.toString(); // => '2019-06'
}
{
    const { calendar } = new Intl.DateTimeFormat().resolvedOptions();
    const ym = Temporal.PlainYearMonth.from({ year: 2019, month: 6, calendar });
    ym.toLocaleString(); // example output: '6/2019'
    // Same as above, but explicitly specifying the calendar:
    ym.toLocaleString(undefined, { calendar });
    ym.toLocaleString("de-DE", { calendar }); // example output: '6.2019'
    ym.toLocaleString("de-DE", { month: "long", year: "numeric", calendar }); // => 'Juni 2019'
    ym.toLocaleString(`en-US-u-nu-fullwide-ca-${calendar}`); // => '６/２０１９'
}
{
    const ym = Temporal.PlainYearMonth.from("2019-06");
    ym.toPlainDate({ day: 24 }); // => 2019-06-24
}
{
    let md;
    // Pi day
    md = new Temporal.PlainMonthDay(3, 14); // => 03-14
    // Leap day
    md = new Temporal.PlainMonthDay(2, 29); // => 02-29
}
{
    let md;
    md = Temporal.PlainMonthDay.from("08-24"); // => 08-24
    md = Temporal.PlainMonthDay.from("0824"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24T15:43:27"); // => 08-24
    md = Temporal.PlainMonthDay.from("2006-08-24T15:43:27+01:00[Europe/Brussels]");
    // => 08-24
    md === Temporal.PlainMonthDay.from(md); // => false
    md = Temporal.PlainMonthDay.from({ monthCode: "M08", day: 24 }); // => 08-24
    md = Temporal.PlainMonthDay.from(Temporal.PlainDate.from("2006-08-24"));
    // => 08-24
    // (same as above; Temporal.PlainDate has month and day properties)
    // Different overflow modes
    md = Temporal.PlainMonthDay.from({ month: 13, day: 1, year: 2000 }, { overflow: "constrain" });
    // => 12-01
    md = Temporal.PlainMonthDay.from({ month: 1, day: 32, year: 2000 }, { overflow: "constrain" });
    // => 01-31
    md = Temporal.PlainMonthDay.from({ month: 13, day: 1, year: 2000 }, { overflow: "reject" });
    // => throws
    md = Temporal.PlainMonthDay.from({ month: 1, day: 32, year: 2000 }, { overflow: "reject" });
    // => throws
    md = Temporal.PlainMonthDay.from({ month: 2, day: 29, year: 2001 }, { overflow: "reject" });
    // => throws (this year is not a leap year in the ISO 8601 calendar)
    // non-ISO calendars
    md = Temporal.PlainMonthDay.from({ monthCode: "M05L", day: 15, calendar: "hebrew" });
    // => 1970-02-21[u-ca=hebrew]
    md = Temporal.PlainMonthDay.from({ month: 6, day: 15, year: 5779, calendar: "hebrew" });
    // => 1970-02-21[u-ca=hebrew]
    /* WRONG */ md = Temporal.PlainMonthDay.from({ month: 6, day: 15, calendar: "hebrew" });
    // => throws (either year or monthCode is required)
    md = Temporal.PlainMonthDay.from("2019-02-20[u-ca=hebrew]");
    md.monthCode; // => 'M05L'
    md.day; // => 15
    md.month; // undefined
    // (month property is not present in this type; use monthCode instead)
}
{
    let md;
    md = Temporal.PlainMonthDay.from("08-24");
    md.monthCode; // => 'M08'
    md.day; // => 24
    md.month; // => undefined
    // (no `month` property; use `monthCode` instead)
    md = Temporal.PlainMonthDay.from("2019-02-20[u-ca=hebrew]");
    md.monthCode; // => 'M05L'
    md.day; // => 15
    md.month; // => undefined
    // (no `month` property; use `monthCode` instead)
}
{
    const md = Temporal.PlainMonthDay.from("11-15");
    // What's the last day of that month?
    md.with({ day: 31 }); // => 11-30
    Temporal.PlainMonthDay.from("02-01").with({ day: 31 }); // => 02-29
}
{
    const md1 = Temporal.PlainMonthDay.from("02-28");
    const md2 = Temporal.PlainMonthDay.from("02-29");
    md1.equals(md2); // => false
    md1.equals("02-29"); // => false
    md1.equals({ monthCode: "M02", day: 29 }); // => false
    md2.equals(md2); // => true
    md2.equals("02-29"); // => true
    md2.equals({ monthCode: "M02", day: 29 }); // => true
}
{
    const md = Temporal.PlainMonthDay.from("08-24");
    md.toString(); // => '08-24'
}
{
    const { calendar } = new Intl.DateTimeFormat().resolvedOptions();
    const md = Temporal.PlainMonthDay.from({ monthCode: "M08", day: 24, calendar });
    md.toLocaleString(); // example output: '8/24'
    // Same as above, but explicitly specifying the calendar:
    md.toLocaleString(undefined, { calendar }); // example output: '8/24'
    md.toLocaleString("de-DE", { calendar }); // => '24.8.'
    md.toLocaleString("de-DE", { month: "long", day: "numeric", calendar }); // => '24. August'
    md.toLocaleString(`en-US-u-nu-fullwide-ca-${calendar}`); // => '８/２４'
}
{
    const md = Temporal.PlainMonthDay.from({
        calendar: "japanese",
        monthCode: "M01",
        day: 1,
    });
    const date = md.toPlainDate({ era: "reiwa", eraYear: 2 }); // => 2020-01-01[u-ca=japanese]
}
{
    new Temporal.Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321); // => P1Y2M3W4DT5H6M7.987654321S
    new Temporal.Duration(0, 0, 0, 40); // => P40D
    new Temporal.Duration(undefined, undefined, undefined, 40); // => P40D
    new Temporal.Duration(); // => PT0S
}
{
    let d;
    d = Temporal.Duration.from({ years: 1, days: 1 }); // => P1Y1D
    d = Temporal.Duration.from({ days: -2, hours: -12 }); // => -P2DT12H
    Temporal.Duration.from(d) === d; // => false
    d = Temporal.Duration.from("P1Y1D"); // => P1Y1D
    d = Temporal.Duration.from("-P2DT12H"); // => -P2DT12H
    d = Temporal.Duration.from("P0D"); // => PT0S
}
{
    const one = Temporal.Duration.from({ hours: 79, minutes: 10 });
    const two = Temporal.Duration.from({ days: 3, hours: 7, seconds: 630 });
    const three = Temporal.Duration.from({ days: 3, hours: 6, minutes: 50 });
    const sorted1 = [one, two, three].sort(Temporal.Duration.compare);
    sorted1.join(" ");
    // => 'P3DT6H50M PT79H10M P3DT7H630S'
    // Sorting relative to a date, taking DST changes into account:
    const relativeTo = Temporal.ZonedDateTime.from("2020-11-01T00:00-07:00[America/Los_Angeles]");
    const sorted2 = [one, two, three].sort((one, two) => Temporal.Duration.compare(one, two, { relativeTo }));
    sorted2.join(" ");
    // => 'PT79H10M P3DT6H50M P3DT7H630S'
}
{
    const d = Temporal.Duration.from("P1Y2M3W4DT5H6M7.987654321S");
    d.years; // => 1
    d.months; // => 2
    d.weeks; // => 3
    d.days; // => 4
    d.hours; // => 5
    d.minutes; // => 6
    d.seconds; // => 7
    d.milliseconds; // => 987
    d.microseconds; // => 654
    d.nanoseconds; // => 321
}
{
    let d;
    d = Temporal.Duration.from("PT0S");
    d.blank; // => true
    d = Temporal.Duration.from({ days: 0, hours: 0, minutes: 0 });
    d.blank; // => true
}
{
    let duration;
    duration = Temporal.Duration.from({ months: 50, days: 50, hours: 50, minutes: 100 });
    // Perform a balance operation using additional ISO 8601 calendar rules:
    let { years, months } = duration;
    years += Math.floor(months / 12);
    months %= 12;
    duration = duration.with({ years, months });
    // => P4Y2M50DT50H100M
}
{
    const hour = Temporal.Duration.from("PT1H");
    hour.add({ minutes: 30 }); // => PT1H30M
    // Examples of balancing:
    const one = Temporal.Duration.from({ hours: 1, minutes: 30 });
    const two = Temporal.Duration.from({ hours: 2, minutes: 45 });
    const result = one.add(two); // => PT4H15M
    // Example of adding calendar units
    const oneAndAHalfMonth = Temporal.Duration.from({ months: 1, days: 16 });
    // To convert units, use arithmetic relative to a start date:
    const startDate1 = Temporal.PlainDate.from("2000-12-01");
    startDate1.add(oneAndAHalfMonth).add(oneAndAHalfMonth)
        .since(startDate1, { largestUnit: "months" }); // => P3M4D
    const startDate2 = Temporal.PlainDate.from("2001-01-01");
    startDate2.add(oneAndAHalfMonth).add(oneAndAHalfMonth)
        .since(startDate2, { largestUnit: "months" }); // => P3M1D
}
{
    const hourAndAHalf = Temporal.Duration.from("PT1H30M");
    hourAndAHalf.subtract({ hours: 1 }); // => PT30M
    const one = Temporal.Duration.from({ minutes: 180 });
    const two = Temporal.Duration.from({ seconds: 30 });
    one.subtract(two); // => PT179M30S
    one.subtract(two).round({ largestUnit: "hour" }); // => PT2H59M30S
    // Example of subtracting calendar units; cannot be subtracted using
    // subtract() because units need to be converted
    const threeMonths = Temporal.Duration.from({ months: 3 });
    const oneAndAHalfMonth = Temporal.Duration.from({ months: 1, days: 15 });
    // To convert units, use arithmetic relative to a start date:
    const startDate1 = Temporal.PlainDate.from("2001-01-01");
    startDate1.add(threeMonths).subtract(oneAndAHalfMonth)
        .since(startDate1, { largestUnit: "months" }); // => P1M13D
    const startDate2 = Temporal.PlainDate.from("2001-02-01");
    startDate2.add(threeMonths).subtract(oneAndAHalfMonth)
        .since(startDate2, { largestUnit: "months" }); // => P1M16D
}
{
    const d = Temporal.Duration.from("P1Y2M3DT4H5M6.987654321S");
    d.sign; // 1
    d.negated(); // -P1Y2M3DT4H5M6.987654321S
    d.negated().sign; // -1
}
{
    const d = Temporal.Duration.from("-PT8H30M");
    d.abs(); // PT8H30M
}
{
    let d;
    // Balance a duration as far as possible without knowing a starting point
    d = Temporal.Duration.from({ minutes: 130 });
    d.round({ largestUnit: "day" }); // => PT2H10M
    // Round to the nearest unit
    d = Temporal.Duration.from({ minutes: 10, seconds: 52 });
    d.round({ smallestUnit: "minute" }); // => PT11M
    d.round({ smallestUnit: "minute", roundingMode: "trunc" }); // => PT10M
    // How many seconds in a multi-unit duration?
    d = Temporal.Duration.from("PT2H34M18S");
    d.round({ largestUnit: "second" }).seconds; // => 9258
    // Normalize, with and without taking DST into account
    d = Temporal.Duration.from({ hours: 2756 });
    d.round({
        relativeTo: "2020-01-01T00:00+01:00[Europe/Rome]",
        largestUnit: "year",
    }); // => P114DT21H
    // (one hour longer because DST skipped an hour)
    d.round({
        relativeTo: "2020-01-01",
        largestUnit: "year",
    }); // => P114DT20H
    // (one hour shorter if ignoring DST)
    // Normalize days into months or years
    d = Temporal.Duration.from({ days: 190 });
    const refDate = Temporal.PlainDate.from("2020-01-01");
    d.round({ relativeTo: refDate, largestUnit: "year" }); // => P6M8D
    // Same, but in a different calendar system
    d.round({
        relativeTo: refDate.withCalendar("hebrew"),
        largestUnit: "year",
    }); // => P6M13D
    // Round a duration up to the next 5-minute billing period
    d = Temporal.Duration.from({ minutes: 6 });
    d.round({
        smallestUnit: "minute",
        roundingIncrement: 5,
        roundingMode: "ceil",
    }); // => PT10M
    // How many full 3-month quarters of this year, are in this duration?
    d = Temporal.Duration.from({ months: 10, days: 15 });
    d = d.round({
        smallestUnit: "month",
        roundingIncrement: 3,
        roundingMode: "trunc",
        relativeTo: Temporal.Now.plainDateISO(),
    });
    const quarters = d.months / 3;
    quarters; // => 3
}
{
    let d;
    // How many seconds in 130 hours and 20 minutes?
    d = Temporal.Duration.from({ hours: 130, minutes: 20 });
    d.total({ unit: "second" }); // => 469200
    // How many 24-hour days is 123456789 seconds?
    d = Temporal.Duration.from("PT123456789S");
    d.total({ unit: "day" }); // 1428.8980208333332
    // Find totals in months, with and without taking DST into account
    d = Temporal.Duration.from({ hours: 2756 });
    d.total({
        relativeTo: "2020-01-01T00:00+01:00[Europe/Rome]",
        unit: "month",
    }); // => 3.7958333333333334
    d.total({
        unit: "month",
        relativeTo: "2020-01-01",
    }); // => 3.7944444444444443
}
{
    let d;
    d = Temporal.Duration.from({ years: 1, days: 1 });
    d.toString(); // => P1Y1D
    d = Temporal.Duration.from({ years: -1, days: -1 });
    d.toString(); // => -P1Y1D
    d = Temporal.Duration.from({ milliseconds: 1000 });
    d.toString(); // => PT1S
    // The output format always balances units under 1 s, even if the
    // underlying Temporal.Duration object doesn't.
    const nobal = Temporal.Duration.from({ milliseconds: 3500 });
    console.log(`${nobal}`, nobal.seconds, nobal.milliseconds); // => 'PT3.5S 0 3500'
    const bal = nobal.round({ largestUnit: "year" }); // balance through round
    console.log(`${bal}`, bal.seconds, bal.milliseconds); // => 'PT3.5S 3 500'
    d = Temporal.Duration.from("PT59.999999999S");
    d.toString({ smallestUnit: "second" }); // => PT59S
    d.toString({ fractionalSecondDigits: 0 }); // => PT59S
    d.toString({ fractionalSecondDigits: 4 }); // => PT59.9999S
    d.toString({ fractionalSecondDigits: 8, roundingMode: "halfExpand" });
    // => PT60.00000000S
}
{
    const d = Temporal.Duration.from("P1DT6H30M");
    d.toLocaleString(); // example output: '1 day 6 hours 30 minutes'
    d.toLocaleString("de-DE"); // example output: '1 Tag 6 Stunden 30 Minuten'
    d.toLocaleString("en-US", { days: "short", hours: "numeric" }); // example output: '1 day 6 hours'
}
{
    Temporal.Now.instant(); // get the current system exact time
    Temporal.Now.timeZoneId(); // get the current system time zone
    Temporal.Now.zonedDateTimeISO(); // get the current date and wall-clock time in the system time zone and ISO-8601 calendar
    Temporal.Now.plainDateISO(); // get the current date in the system time zone and ISO-8601 calendar
    Temporal.Now.plainTimeISO(); // get the current wall-clock time in the system time zone and ISO-8601 calendar
    Temporal.Now.plainDateTimeISO(); // same as above, but return the DateTime in the ISO-8601 calendar
}
