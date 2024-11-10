//// [tests/cases/compiler/regularExpressionTypeCheckingMatchExecWithGlobalFlag.ts] ////

//// [regularExpressionTypeCheckingMatchExecWithGlobalFlag.ts]
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
const globalDateTimeRegex = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/ig;
const dateTimeString = "2048-10-24 12:34:56";

let match = dateTimeString.match(globalDateTimeRegex)!; // RegExpMatchArray
match.index; // error
match.input; // error
match.length; // number
match[0].length; // number
match[1]?.length; // number | undefined
match[99]?.length; // number | undefined
match.groups; // error
match.indices; // error

let execResult = globalDateTimeRegex.exec(dateTimeString)!;
match = execResult; // should error
execResult = match; // should error


//// [regularExpressionTypeCheckingMatchExecWithGlobalFlag.js]
"use strict";
var _a, _b;
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
var globalDateTimeRegex = /(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?/ig;
var dateTimeString = "2048-10-24 12:34:56";
var match = dateTimeString.match(globalDateTimeRegex); // RegExpMatchArray
match.index; // error
match.input; // error
match.length; // number
match[0].length; // number
(_a = match[1]) === null || _a === void 0 ? void 0 : _a.length; // number | undefined
(_b = match[99]) === null || _b === void 0 ? void 0 : _b.length; // number | undefined
match.groups; // error
match.indices; // error
var execResult = globalDateTimeRegex.exec(dateTimeString);
match = execResult; // should error
execResult = match; // should error
