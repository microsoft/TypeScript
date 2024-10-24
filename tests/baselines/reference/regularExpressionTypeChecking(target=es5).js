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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
"foo_foo_bar".replace(/foo/g, function (match, index, input) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    match; // "foo"
    index; // number
    input; // string
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(\d+)/g, function (match, id, index, input) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    match; // `foo${string}`
    id; // string
    index; // number
    input; // string
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(?<id>\d+)/g, function (match, id, index, input, capturingGroups) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
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
"foo_foo_bar".replace(/foo(?<empty>){0}/g, function (match, empty, index, input, capturingGroups) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
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
var dateTimeString = "2048-10-24 12:34:56";
// a very loosey Temporal (Zoned)DateTime format regex, see `regularExpressionTypeChecking.ts` for an explanation
{
    var dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
    var match = dateTimeString.match(dateTimeRegex); // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    match[2].length; // number
    (_a = match[3]) === null || _a === void 0 ? void 0 : _a.length; // number | undefined
    match[4].length; // number
    match[5].length; // number
    (_b = match[6]) === null || _b === void 0 ? void 0 : _b.length; // number | undefined
    (_c = match[15]) === null || _c === void 0 ? void 0 : _c.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    match.groups.year.length; // number
    match.groups.month.length; // number
    match.groups.day.length; // number
    (_d = match.groups.time) === null || _d === void 0 ? void 0 : _d.length; // number | undefined
    (_e = match.groups.hour) === null || _e === void 0 ? void 0 : _e.length; // number | undefined
    (_f = match.groups.minute) === null || _f === void 0 ? void 0 : _f.length; // number | undefined
    (_g = match.groups.second) === null || _g === void 0 ? void 0 : _g.length; // number | undefined
    (_h = match.groups.timeZone) === null || _h === void 0 ? void 0 : _h.length; // number | undefined
    (_j = match.groups.timeZoneSecond) === null || _j === void 0 ? void 0 : _j.length; // number | undefined
    match.groups.foo.length; // error
    match.indices; // error
    var execMatch = dateTimeRegex.exec(dateTimeString);
    match = execMatch;
    execMatch = match;
    dateTimeString.replace(dateTimeRegex, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args;
        return args[0];
    });
}
{
    var globalDateTimeRegex = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/ig;
    var match = dateTimeString.match(globalDateTimeRegex); // RegExpMatchArray
    match.index; // error
    match.input; // error
    match[0].length; // number
    (_k = match[1]) === null || _k === void 0 ? void 0 : _k.length; // number | undefined
    (_l = match[99]) === null || _l === void 0 ? void 0 : _l.length; // number | undefined
    match.groups; // error
    match.indices; // error
    dateTimeString.replace(globalDateTimeRegex, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args;
        return args[0];
    });
}
{
    var dateTimeRegexWithIndices = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/id;
    var match = dateTimeString.match(dateTimeRegexWithIndices); // RegExpExecArray
    match.index; // number
    match.input; // string
    match[0].length; // number
    match[1].length; // number
    (_m = match[15]) === null || _m === void 0 ? void 0 : _m.length; // number | undefined
    match[16].length; // error
    match.groups.date.length; // number
    (_o = match.groups.timeZoneSecond) === null || _o === void 0 ? void 0 : _o.length; // number | undefined
    match.groups.foo.length; // error
    // Each element is of type [startIndex: number, endIndex: number]
    match.indices[0].length; // 2
    match.indices[1].length; // 2
    match.indices[2].length; // 2
    (_p = match.indices[3]) === null || _p === void 0 ? void 0 : _p.length; // 2 | undefined
    match.indices[4].length; // 2
    match.indices[5].length; // 2
    (_q = match.indices[6]) === null || _q === void 0 ? void 0 : _q.length; // 2 | undefined
    (_r = match.indices[15]) === null || _r === void 0 ? void 0 : _r.length; // 2 | undefined
    match.indices[16].length; // error
    match.indices.groups.date.length; // 2
    match.indices.groups.year.length; // 2
    match.indices.groups.month.length; // 2
    match.indices.groups.day.length; // 2
    (_s = match.indices.groups.time) === null || _s === void 0 ? void 0 : _s.length; // 2 | undefined
    (_t = match.indices.groups.hour) === null || _t === void 0 ? void 0 : _t.length; // 2 | undefined
    (_u = match.indices.groups.minute) === null || _u === void 0 ? void 0 : _u.length; // 2 | undefined
    (_v = match.indices.groups.second) === null || _v === void 0 ? void 0 : _v.length; // 2 | undefined
    (_w = match.indices.groups.timeZone) === null || _w === void 0 ? void 0 : _w.length; // 2 | undefined
    (_x = match.indices.groups.timeZoneSecond) === null || _x === void 0 ? void 0 : _x.length; // 2 | undefined
    match.indices.groups.foo.length; // error
    var execMatch = dateTimeRegexWithIndices.exec(dateTimeString);
    match = execMatch;
    execMatch = match;
    dateTimeString.replace(dateTimeRegexWithIndices, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args;
        return args[0];
    });
}
