//// [tests/cases/compiler/regularExpressionTypeCheckingMatchExec.ts] ////

//// [regularExpressionTypeCheckingMatchExec.ts]
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
const dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
const dateTimeString = "2048-10-24 12:34:56";

let match = dateTimeString.match(dateTimeRegex)!; // RegExpExecArray
match.index; // number
match.input; // string
match.length; // 17
match[0].length; // number
match[1].length; // number
match[2].length; // number
match[3]?.length; // number | undefined
match[4].length; // number
match[5].length; // number
match[6]?.length; // number | undefined
match[16]?.length; // number | undefined
match[17]; // should error, but see #45560#issuecomment-1111121849
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
match.groups.foo; // error
match.indices; // error

let execResult = dateTimeRegex.exec(dateTimeString)!;
match = execResult; // should not error
execResult = match; // should not error


//// [regularExpressionTypeCheckingMatchExec.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
var dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
var dateTimeString = "2048-10-24 12:34:56";
var match = dateTimeString.match(dateTimeRegex); // RegExpExecArray
match.index; // number
match.input; // string
match.length; // 17
match[0].length; // number
match[1].length; // number
match[2].length; // number
(_a = match[3]) === null || _a === void 0 ? void 0 : _a.length; // number | undefined
match[4].length; // number
match[5].length; // number
(_b = match[6]) === null || _b === void 0 ? void 0 : _b.length; // number | undefined
(_c = match[16]) === null || _c === void 0 ? void 0 : _c.length; // number | undefined
match[17]; // should error, but see #45560#issuecomment-1111121849
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
match.groups.foo; // error
match.indices; // error
var execResult = dateTimeRegex.exec(dateTimeString);
match = execResult; // should not error
execResult = match; // should not error
