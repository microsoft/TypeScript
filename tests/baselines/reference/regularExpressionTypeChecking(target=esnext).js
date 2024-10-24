//// [tests/cases/compiler/regularExpressionTypeChecking.ts] ////

//// [regularExpressionTypeChecking.ts]
"foo_foo_bar".replace(/foo/g, (match, index, input, ...args) => {
    match; // "foo"
    index; // number
    input; // string
    args; // []
    return match;
});

"foo42_foo24_bar".replace(/foo(\d+)/g, (match, id, index, input, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // string
    args; // []
    return match;
});

"foo42_foo24_bar".replace(/foo(?<id>\d+)/g, (match, id, index, input, capturingGroups, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // string
    // for target ≥ ES2018
    capturingGroups.id; // string
    capturingGroups.foo; // error
    args; // []
    return match;
});

"foo_foo_bar".replace(/foo(?<empty>){0}/g, (match, empty, index, input, capturingGroups, ...args) => {
    match; // "foo"
    empty; // undefined
    index; // number
    input; // string
    // for target ≥ ES2018
    capturingGroups.empty; // undefined
    capturingGroups.foo; // error
    args; // []
    return match;
});

const dateTimeString = "2048-10-24 12:34:56";

// a very loosey Temporal (Zoned)DateTime format regex, see `regularExpressionTypeChecking.ts` for an explanation
{
    const dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;

    let match = dateTimeString.match(dateTimeRegex)!; // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    match[2].length; // number
    match[3]?.length; // number | undefined
    match[4].length; // number
    match[5].length; // number
    match[6]?.length; // number | undefined
    match[15]?.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    match.groups.year.length; // number
    match.groups.month.length; // number
    match.groups.day.length; // number
    match.groups.time?.length; // number | undefined
    match.groups.hour?.length; // number | undefined
    match.groups.minute?.length; // number | undefined
    match.groups.second?.length; // number | undefined
    match.groups.timeZone?.length; // number | undefined
    match.groups.timeZoneSecond?.length; // number | undefined
    match.groups.foo.length; // error
    match.indices; // error

    let execMatch = dateTimeRegex.exec(dateTimeString)!;
    match = execMatch;
    execMatch = match;

    dateTimeString.replace(dateTimeRegex, (...args) => {
        args;
        return args[0];
    });
}

{
    const globalDateTimeRegex = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/ig;

    const match = dateTimeString.match(globalDateTimeRegex)!; // RegExpMatchArray
    match.index; // error
    match.input; // error
    match[0].length; // number
    match[1]?.length; // number | undefined
    match[99]?.length; // number | undefined
    match.groups; // error
    match.indices; // error

    dateTimeString.replace(globalDateTimeRegex, (...args) => {
        args;
        return args[0];
    });
}

{
    const dateTimeRegexWithIndices = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/id;

    let match = dateTimeString.match(dateTimeRegexWithIndices)!; // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    match[15]?.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    match.groups.timeZoneSecond?.length; // number | undefined
    match.groups.foo.length; // error

    // Each element is of type [startIndex: number, endIndex: number]
    match.indices[0].length; // 2
    match.indices[1].length; // 2
    match.indices[2].length; // 2
    match.indices[3]?.length; // 2 | undefined
    match.indices[4].length; // 2
    match.indices[5].length; // 2
    match.indices[6]?.length; // 2 | undefined
    match.indices[15]?.length; // 2 | undefined
    match.indices[16].length; // error
    match.indices.groups.date.length; // 2
    match.indices.groups.year.length; // 2
    match.indices.groups.month.length; // 2
    match.indices.groups.day.length; // 2
    match.indices.groups.time?.length; // 2 | undefined
    match.indices.groups.hour?.length; // 2 | undefined
    match.indices.groups.minute?.length; // 2 | undefined
    match.indices.groups.second?.length; // 2 | undefined
    match.indices.groups.timeZone?.length; // 2 | undefined
    match.indices.groups.timeZoneSecond?.length; // 2 | undefined
    match.indices.groups.foo.length; // error

    let execMatch = dateTimeRegexWithIndices.exec(dateTimeString)!;
    match = execMatch;
    execMatch = match;

    dateTimeString.replace(dateTimeRegexWithIndices, (...args) => {
        args;
        return args[0];
    });
}


//// [regularExpressionTypeChecking.js]
"use strict";
"foo_foo_bar".replace(/foo/g, (match, index, input, ...args) => {
    match; // "foo"
    index; // number
    input; // string
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(\d+)/g, (match, id, index, input, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // string
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(?<id>\d+)/g, (match, id, index, input, capturingGroups, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // string
    // for target ≥ ES2018
    capturingGroups.id; // string
    capturingGroups.foo; // error
    args; // []
    return match;
});
"foo_foo_bar".replace(/foo(?<empty>){0}/g, (match, empty, index, input, capturingGroups, ...args) => {
    match; // "foo"
    empty; // undefined
    index; // number
    input; // string
    // for target ≥ ES2018
    capturingGroups.empty; // undefined
    capturingGroups.foo; // error
    args; // []
    return match;
});
const dateTimeString = "2048-10-24 12:34:56";
// a very loosey Temporal (Zoned)DateTime format regex, see `regularExpressionTypeChecking.ts` for an explanation
{
    const dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
    let match = dateTimeString.match(dateTimeRegex); // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    match[2].length; // number
    match[3]?.length; // number | undefined
    match[4].length; // number
    match[5].length; // number
    match[6]?.length; // number | undefined
    match[15]?.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    match.groups.year.length; // number
    match.groups.month.length; // number
    match.groups.day.length; // number
    match.groups.time?.length; // number | undefined
    match.groups.hour?.length; // number | undefined
    match.groups.minute?.length; // number | undefined
    match.groups.second?.length; // number | undefined
    match.groups.timeZone?.length; // number | undefined
    match.groups.timeZoneSecond?.length; // number | undefined
    match.groups.foo.length; // error
    match.indices; // error
    let execMatch = dateTimeRegex.exec(dateTimeString);
    match = execMatch;
    execMatch = match;
    dateTimeString.replace(dateTimeRegex, (...args) => {
        args;
        return args[0];
    });
}
{
    const globalDateTimeRegex = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/ig;
    const match = dateTimeString.match(globalDateTimeRegex); // RegExpMatchArray
    match.index; // error
    match.input; // error
    match[0].length; // number
    match[1]?.length; // number | undefined
    match[99]?.length; // number | undefined
    match.groups; // error
    match.indices; // error
    dateTimeString.replace(globalDateTimeRegex, (...args) => {
        args;
        return args[0];
    });
}
{
    const dateTimeRegexWithIndices = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/id;
    let match = dateTimeString.match(dateTimeRegexWithIndices); // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    match[15]?.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    match.groups.timeZoneSecond?.length; // number | undefined
    match.groups.foo.length; // error
    // Each element is of type [startIndex: number, endIndex: number]
    match.indices[0].length; // 2
    match.indices[1].length; // 2
    match.indices[2].length; // 2
    match.indices[3]?.length; // 2 | undefined
    match.indices[4].length; // 2
    match.indices[5].length; // 2
    match.indices[6]?.length; // 2 | undefined
    match.indices[15]?.length; // 2 | undefined
    match.indices[16].length; // error
    match.indices.groups.date.length; // 2
    match.indices.groups.year.length; // 2
    match.indices.groups.month.length; // 2
    match.indices.groups.day.length; // 2
    match.indices.groups.time?.length; // 2 | undefined
    match.indices.groups.hour?.length; // 2 | undefined
    match.indices.groups.minute?.length; // 2 | undefined
    match.indices.groups.second?.length; // 2 | undefined
    match.indices.groups.timeZone?.length; // 2 | undefined
    match.indices.groups.timeZoneSecond?.length; // 2 | undefined
    match.indices.groups.foo.length; // error
    let execMatch = dateTimeRegexWithIndices.exec(dateTimeString);
    match = execMatch;
    execMatch = match;
    dateTimeString.replace(dateTimeRegexWithIndices, (...args) => {
        args;
        return args[0];
    });
}
