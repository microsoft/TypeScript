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
// a very loose Temporal (Zoned)DateTime format regex, identical to the one in `tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts`
const dateTimeRegex = /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?<timeZone>Z|(?<timeZoneSign>[+-])(?:(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
const dateTimeString = "2048-10-24 12:34:56";
let match = dateTimeString.match(dateTimeRegex); // RegExpExecArray
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
let execResult = dateTimeRegex.exec(dateTimeString);
match = execResult; // should not error
execResult = match; // should not error
