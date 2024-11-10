//// [tests/cases/compiler/regularExpressionTypeCheckingMatchExecWithHasIndicesFlag.ts] ////

//// [regularExpressionTypeCheckingMatchExecWithHasIndicesFlag.ts]
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
const dateTimeRegexWithIndices = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/id;
const dateTimeString = "2048-10-24 12:34:56";

let match = dateTimeString.match(dateTimeRegexWithIndices)!; // RegExpExecArray
match.index; // number
match.input; // string
match.length; // 17
match[0].length; // number
match.groups.date.length; // number

// Each element is of type [startIndex: number, endIndex: number]
match.indices.length; // 17
match.indices[0].length; // 2
match.indices[1].length; // 2
match.indices[2].length; // 2
match.indices[3]?.length; // 2 | undefined
match.indices[4].length; // 2
match.indices[5].length; // 2
match.indices[6]?.length; // 2 | undefined
match.indices[16]?.length; // 2 | undefined
match.indices[17]; // should error, but see #45560#issuecomment-1111121849
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
match.indices.groups.foo; // error

let execResult = dateTimeRegexWithIndices.exec(dateTimeString)!;
match = execResult; // should not error
execResult = match; // should not error


//// [regularExpressionTypeCheckingMatchExecWithHasIndicesFlag.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
var dateTimeRegexWithIndices = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/id;
var dateTimeString = "2048-10-24 12:34:56";
var match = dateTimeString.match(dateTimeRegexWithIndices); // RegExpExecArray
match.index; // number
match.input; // string
match.length; // 17
match[0].length; // number
match.groups.date.length; // number
// Each element is of type [startIndex: number, endIndex: number]
match.indices.length; // 17
match.indices[0].length; // 2
match.indices[1].length; // 2
match.indices[2].length; // 2
(_a = match.indices[3]) === null || _a === void 0 ? void 0 : _a.length; // 2 | undefined
match.indices[4].length; // 2
match.indices[5].length; // 2
(_b = match.indices[6]) === null || _b === void 0 ? void 0 : _b.length; // 2 | undefined
(_c = match.indices[16]) === null || _c === void 0 ? void 0 : _c.length; // 2 | undefined
match.indices[17]; // should error, but see #45560#issuecomment-1111121849
match.indices.groups.date.length; // 2
match.indices.groups.year.length; // 2
match.indices.groups.month.length; // 2
match.indices.groups.day.length; // 2
(_d = match.indices.groups.time) === null || _d === void 0 ? void 0 : _d.length; // 2 | undefined
(_e = match.indices.groups.hour) === null || _e === void 0 ? void 0 : _e.length; // 2 | undefined
(_f = match.indices.groups.minute) === null || _f === void 0 ? void 0 : _f.length; // 2 | undefined
(_g = match.indices.groups.second) === null || _g === void 0 ? void 0 : _g.length; // 2 | undefined
(_h = match.indices.groups.timeZone) === null || _h === void 0 ? void 0 : _h.length; // 2 | undefined
(_j = match.indices.groups.timeZoneSecond) === null || _j === void 0 ? void 0 : _j.length; // 2 | undefined
match.indices.groups.foo; // error
var execResult = dateTimeRegexWithIndices.exec(dateTimeString);
match = execResult; // should not error
execResult = match; // should not error
