//// [tests/cases/conformance/types/literal/regularExpressionLiteralTypes.ts] ////

//// [regularExpressionLiteralTypes.ts]
// Basic tests
{
    /foo(.*?)bar(.*)?baz/;
    /foo(.*?)bar(.*)?baz/i;
    /foo((.*?)bar(.*)?)baz/;
    /foo((.*?)bar(.*)?)baz/i;
}

// Atom expansion
{
    /a{0}/;
    /a{0,1}/;
    /a/;
    /a{1}/;
    /a{0,2}/;
    /a{5}/;
    /a{3,5}/;
    /a{6}/;

    /(get|set)_\d_value/;
    /(get|set)_\d{1}_value/;
    /(get|set)_\d\d\d_value/;
    /(get|set)_\d{3}_value/;
    /(get|set)_\d\d\d\d\d_value/;
    /(get|set)_\d{5}_value/;

    /(get|set)_(\d)_value/;
    /(get|set)_(\d){1}_value/;
    /(get|set)_(\d{1})_value/;
    /(get|set)_(\d\d\d)_value/;
    /(get|set)_(\d){3}_value/;
    /(get|set)_(\d{3})_value/;
    /(get|set)_(\d\d\d\d\d)_value/;
    /(get|set)_(\d){5}_value/;
    /(get|set)_(\d{5})_value/;

    /(get|set)_(\d)?_value/;
    /(get|set)_(\d?)_value/;
    /(get|set)_(\d)+_value/;
    /(get|set)_(\d+)_value/;
    /(get|set)_(\d)*_value/;
    /(get|set)_(\d*)_value/;
}

// Atom expansion and case sensitivity
{
    /a{0}/i;
    /a{0,1}/i;
    /a/i;
    /a{1}/i;
    /a{0,2}/i;
    /a{5}/i;
    /a{3,5}/i;
    /a{6}/i;

    /^#[\da-f]{0,3}$/;
    /^#[\da-f]{2,3}$/;
    /^#[\da-f]{3}$/i;
    /^#[\da-f]{3,3}$/;
    /^#[\da-f]{4}$/i;
    /^#[\da-f]{3,4}$/i;
    /^#[\da-f]{6}$/i;
    /^#[\da-f]{3,6}$/i;
}

// Character classes
{
    /[]/;
    /[A-Za-z]/;
    /[-A-Za-z]/;
    /[A-Z-a-z]/;
    /[\d]/;
    /[\d-a]/;
    /[\d-a]/i;
    /[\d-a]/iu;
    /[z-\d]/;
    /[z-\d]/i;
    /[z-\d]/iu;
    /[\d-\d]/;
    /[\d-\d]/u;
    /[W-a]/i;

    // Too large or meaningless to list all the characters out
    /[^A-Za-z]/;
    /[^A-Za-z]/u;
    /[^a-z]/i;
    /[^a-z]/iu;
    /\D[\D]/;
    /\D[\D]/u;
    /\w[\w]/;
    /\w[\w]/u;
    /\s[\s]/;
    /\s[\s]/u;
}

// Class sets
{
    /[A-Za-z]/v;
    /[-A-Za-z]/v;
    /[A-Z-a-z]/v;
    /[\d]/v;
    /[\d-a]/v;
    /[\d-a]/iv;
    /[z-\d]/v;
    /[z-\d]/iv;
    /[\d-\d]/v;
    /[W-a]/iv;

    // Subtractions and intersections
    /[[\d]]/v;
    /[[[\d]]]/v;
    /[\d&&\d]/v;
    /[\d&&[\d]]/v;
    /[\d&&[\da-z]]/v;
    /[\d&&[\da-z]]/iv;
    /[[0-6]&&[3-9]]/v;
    /[\d&&[0-6]&&[3-9]]/v;
    /[\d--\d]/v;
    /[\d--[\d]]/v;
    /[[\da-z]--\d]/v;
    /[[\da-z]--[\d]]/v;
    /[[\dA-Za-z]--[a-z]]/v;
    /[[\da-z]--[a-z]]/iv;
    /[[\dA-Za-z]--[\da-z]]/v;
    /[[\da-z]--[\da-z]]/iv;
    /[[\da-z]--[[0-6]&&[3-9]]]/v;
    /[[\da-z]--[[0-6]&&[3-9]]]/iv;
    /[[\da-z]--[\d&&[\da-z]]]/v;
    /[[\da-z]--[\d&&[\da-z]]]/iv;
    /[[45A-Za-z]&&[[\dA-Za-z]--[[0-6]&&[3-9]]--[A-C]--[W-Z]]]/v;
    /[[45a-z]&&[[\da-z]--[[0-6]&&[3-9]]--[A-C]--[W-Z]]]/iv;
    /[\d--[1-4]--[6-9]]/v;
    /[[A-Za-z]--[A-C]--[W-Z]]/v;
    /[[a-z]--[A-C]--[W-Z]]/iv;

    // Strings inside class sets
    /[\q{abc|def|}\q{foo|bar}]/v;
    /[\q{abc|def|}\q{foo|bar}]/iv;

    // Too large or meaningless to list all the characters out
    /[^A-Za-z]/v;
    /[^a-z]/iv;
    /\D[\D]/v;
    /\w[\w]/v;
    /\s[\s]/v;
    /[[ -~]--\w--\s]/v;
    /[[ -~]--[\w\s]]/v;
    /[[\da-z]--[^a-z]]/iv;
    /[[\da-z]&&\D]/iv;
    /[[\da-z]&&[^\d]]/iv;
}

// Case sensitivity in Unicode mode and non-Unicode mode
// The following regular expressions include these two non-ASCII characters:
// - ı (U+0131 LATIN SMALL LETTER DOTLESS I)
// - K (U+212A KELVIN SIGN)
// When the `ignoreCase` (i) flag is set, the character canonicalization behavior differs depending on whether HasEitherUnicodeFlag(rer) is true.
// In any Unicode mode, a character is canonicalized by the `toCasefold` method of the Unicode Default Case Folding algorithm,
// which includes mappings of both `ı` and `K` to ASCII `i` and `k`.
// In non-Unicode mode, the `toUppercase` method of the Unicode Default Case Conversion algorithm is used instead,
// which does not include mapping of `K`. Although `toUppercase(ı)` is `I`, the Canonicalize AO in the spec
// (https://tc39.es/ecma262/#sec-runtime-semantics-canonicalize-ch) bailed out all non-ASCII-to-ASCII mapping.
{
    /iıK/i;
    /iıK/iu;
    /iıK/iv;
    /[ai][aı][aK]/i;
    /[ai][aı][aK]/iu;
    /[ai][aı][aK]/iv;
}

// Edge cases
{
    // The following should be treated as identity escapes and upper case should be included
    /\c[\c]/i; // This is special: In Annex B, the first backslash is included, so this is equivalent to /\\[Cc][Cc]/
    /\e[\e]/i;
    /\k[\k]/i;
    /\p[\p]/i;
    /\P[\P]/i;
    /\q[\q]/i;

    // The following cases produce errors, but should still be treated as identity escapes and upper case should be included
    /\c[\c]/iu;
    /\e[\e]/iu;
    /\k[\k]/iu;
    /\p[\p]/iu;
    /\P[\P]/iu;
    /\q[\q]/iu;

    // `\b` is interpreted as a backspace character (U+0008) within a character class and a word boundary outside.
    // Don't treat them as the letter `b`
    /\b[\b]/i;
    /\b[\b]/iu;

    // Backreferences are really “back”-references – if the capturing group referent isn’t ended (or didn’t ever exist at all),
    // the reference matches just an empty string
    /(\1)/;
    /(foo\1bar)/;
    /\1(\1)\1/;
    /\(\1(foo\1bar)\1\)/;
    /(foo)\2|(bar)/;
    // Even though `foo` has appeared before `\1`, they aren’t in the same alternative, so `\1` will always be the empty string
    /(foo)|(bar)\1/;
    // Combination of the above two cases – both backreferences match the empty strings
    /^((foo)\1|(bar)\2)$/;

    // Named backreferences
    /(?<$1>\k<$1>)/;
    /(?<$1>foo\k<$1>bar)/;
    /\k<$1>(?<$1>\k<$1>)\k<$1>/;
    /fizz\k<$1>(?<$1>foo\k<$1>bar)\k<$1>buzz/;
    /(?<$1>foo)\k<$2>|(?<$2>bar)/;
    /(?<$1>foo)|(?<$2>bar)\k<$1>/;
    /^(?<$1>(?<$2>foo)\k<$1>|(?<$3>bar)\k<$2>)$/;
    // This will only match `foo` or `barbar` and not `foobar`, since they aren’t in the same alternative
    /(?<$$>foo)|(?<$$>bar)\k<$$>/;
    // This will only match `foofoo` or `barbar`
    /\k<$$>(?<$$>\k<$$>foo\k<$$>)\k<$$>|\k<$$>(?<$$>\k<$$>bar\k<$$>)\k<$$>/;
    // Matches `foo`, `bar`, `foofoo` or `barbar`
    /\k<$$>?(?<$$>\k<$$>?foo\k<$$>?)\k<$$>?|\k<$$>?(?<$$>\k<$$>?bar\k<$$>?)\k<$$>?/;
    // Matches ``, `foofoo` or `barbar`
    /\k<$$>(?<$$>\k<$$>foo\k<$$>)?\k<$$>|\k<$$>(?<$$>\k<$$>bar\k<$$>)?\k<$$>/;
    // Matches ``, `foo`, `bar`, `foofoo` or `barbar`
    /\k<$$>?(?<$$>\k<$$>?foo\k<$$>?)?\k<$$>?|\k<$$>?(?<$$>\k<$$>?bar\k<$$>?)?\k<$$>?/;
    // All `$$` below match the empty strings
    /(?<$$>f<\k<$$>?(?<f>fizz\k<$$>?(?<b>foo)\k<b>?|(?<b>foo)\k<f>?)\k<f>?>|<\k<b>?(?<b>\k<b>?(?<f>bar)|\k<f>?(?<f>bar)\k<$$>?buzz)\k<$$>?>b)/;

    // Assertions
    // Positive lookaheads and lookbehinds
    /(?=(foo))\1/;
    /(?=(foo|bar))\1/;
    /(?=(foo)?)\1/;
    /(?=(foo)|bar)\1/;
    // In the following four cases, `answer` will only match `foo` or `` and won't ever be `bar`,
    // but we don't have the ability to exclude them
    /(?=(foo)|(bar))(?<answer>\1|\2)/;
    /(?=(foo)|(bar)?)(?<answer>\1|\2)/;
    /(?=(foo)|(bar))(?=(foo)|(bar))(?<answer>\1|\2|\3|\4)/;
    /(?<=(foo)|(bar))(?<=(foo)|(bar))(?<answer>\1|\2|\3|\4)/;
    // In the following two cases, `answer` will only match `foo` or `bar` and won't ever be ``, `foobar`,
    // but we don't have the ability to exclude them
    /(?=(foo)|(bar))(?<answer>\1\2)/;
    /(?<=(foo)|(bar))(?<answer>\1\2)/;
    // In this case, `answer` will only match `foofoo` or `barbar`,
    // but we don't have the ability to exclude ``, `foo`, `bar`, `foobar`, `barfoo`, etc.
    /(?=(foo)|(bar))(?=(foo)|(bar))(?<answer>\1\2\3\4)/;
    // In the following two cases, although the third and fourth capturing groups are of types `foo` and `bar` respectively,
    // references to them will always be empty strings since the groups are unseen before
    /(?=(foo)|(bar))(?<answer>\1|\2|\3|\4)(?=(foo)|(bar))/;
    /(?=(foo)|(bar))(?<answer>\1\2\3\4)(?=(foo)|(bar))/;
    // Negative lookaheads and lookbehinds
    /(?!(foo))\1/;
    /(?!(foo|bar))\1/;
    /(?!(foo)?)\1/;
    /(?!(foo)|bar)\1/;
    /(?!(foo)|(bar))(?<answer>\1|\2)/;
    /(?!(foo)|(bar)?)(?<answer>\1|\2)/;
    // Excerpt of a regex that actually matches a part of a syllable of a natural language
    /([aeiouy])(?:((?=(ng?|[mptkbd])(?!(([aeiou])|(y)(?!([aeio]))))|(g)(?!(w?[aeiou])|(y)(?!([aeio])|(u)(?!([nt])(?!([aeiou])))))))\2)/
}

// Finally, a very loosey Temporal (Zoned)DateTime format regex, which tests, in non-Unicode, Unicode, and Unicode Sets modes, if:
// - Cross product of literals are correctly computed
// - Capturing groups are correctly marked as possibly undefined
// - Backreferences are correctly expanded
// - Assertions aren't included in patterns
{
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/iu;
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/iv;    
}


//// [regularExpressionLiteralTypes.js]
"use strict";
// Basic tests
{
    /foo(.*?)bar(.*)?baz/;
    /foo(.*?)bar(.*)?baz/i;
    /foo((.*?)bar(.*)?)baz/;
    /foo((.*?)bar(.*)?)baz/i;
}
// Atom expansion
{
    /a{0}/;
    /a{0,1}/;
    /a/;
    /a{1}/;
    /a{0,2}/;
    /a{5}/;
    /a{3,5}/;
    /a{6}/;
    /(get|set)_\d_value/;
    /(get|set)_\d{1}_value/;
    /(get|set)_\d\d\d_value/;
    /(get|set)_\d{3}_value/;
    /(get|set)_\d\d\d\d\d_value/;
    /(get|set)_\d{5}_value/;
    /(get|set)_(\d)_value/;
    /(get|set)_(\d){1}_value/;
    /(get|set)_(\d{1})_value/;
    /(get|set)_(\d\d\d)_value/;
    /(get|set)_(\d){3}_value/;
    /(get|set)_(\d{3})_value/;
    /(get|set)_(\d\d\d\d\d)_value/;
    /(get|set)_(\d){5}_value/;
    /(get|set)_(\d{5})_value/;
    /(get|set)_(\d)?_value/;
    /(get|set)_(\d?)_value/;
    /(get|set)_(\d)+_value/;
    /(get|set)_(\d+)_value/;
    /(get|set)_(\d)*_value/;
    /(get|set)_(\d*)_value/;
}
// Atom expansion and case sensitivity
{
    /a{0}/i;
    /a{0,1}/i;
    /a/i;
    /a{1}/i;
    /a{0,2}/i;
    /a{5}/i;
    /a{3,5}/i;
    /a{6}/i;
    /^#[\da-f]{0,3}$/;
    /^#[\da-f]{2,3}$/;
    /^#[\da-f]{3}$/i;
    /^#[\da-f]{3,3}$/;
    /^#[\da-f]{4}$/i;
    /^#[\da-f]{3,4}$/i;
    /^#[\da-f]{6}$/i;
    /^#[\da-f]{3,6}$/i;
}
// Character classes
{
    /[]/;
    /[A-Za-z]/;
    /[-A-Za-z]/;
    /[A-Z-a-z]/;
    /[\d]/;
    /[\d-a]/;
    /[\d-a]/i;
    /[\d-a]/iu;
    /[z-\d]/;
    /[z-\d]/i;
    /[z-\d]/iu;
    /[\d-\d]/;
    /[\d-\d]/u;
    /[W-a]/i;
    // Too large or meaningless to list all the characters out
    /[^A-Za-z]/;
    /[^A-Za-z]/u;
    /[^a-z]/i;
    /[^a-z]/iu;
    /\D[\D]/;
    /\D[\D]/u;
    /\w[\w]/;
    /\w[\w]/u;
    /\s[\s]/;
    /\s[\s]/u;
}
// Class sets
{
    /[A-Za-z]/v;
    /[-A-Za-z]/v;
    /[A-Z-a-z]/v;
    /[\d]/v;
    /[\d-a]/v;
    /[\d-a]/iv;
    /[z-\d]/v;
    /[z-\d]/iv;
    /[\d-\d]/v;
    /[W-a]/iv;
    // Subtractions and intersections
    /[[\d]]/v;
    /[[[\d]]]/v;
    /[\d&&\d]/v;
    /[\d&&[\d]]/v;
    /[\d&&[\da-z]]/v;
    /[\d&&[\da-z]]/iv;
    /[[0-6]&&[3-9]]/v;
    /[\d&&[0-6]&&[3-9]]/v;
    /[\d--\d]/v;
    /[\d--[\d]]/v;
    /[[\da-z]--\d]/v;
    /[[\da-z]--[\d]]/v;
    /[[\dA-Za-z]--[a-z]]/v;
    /[[\da-z]--[a-z]]/iv;
    /[[\dA-Za-z]--[\da-z]]/v;
    /[[\da-z]--[\da-z]]/iv;
    /[[\da-z]--[[0-6]&&[3-9]]]/v;
    /[[\da-z]--[[0-6]&&[3-9]]]/iv;
    /[[\da-z]--[\d&&[\da-z]]]/v;
    /[[\da-z]--[\d&&[\da-z]]]/iv;
    /[[45A-Za-z]&&[[\dA-Za-z]--[[0-6]&&[3-9]]--[A-C]--[W-Z]]]/v;
    /[[45a-z]&&[[\da-z]--[[0-6]&&[3-9]]--[A-C]--[W-Z]]]/iv;
    /[\d--[1-4]--[6-9]]/v;
    /[[A-Za-z]--[A-C]--[W-Z]]/v;
    /[[a-z]--[A-C]--[W-Z]]/iv;
    // Strings inside class sets
    /[\q{abc|def|}\q{foo|bar}]/v;
    /[\q{abc|def|}\q{foo|bar}]/iv;
    // Too large or meaningless to list all the characters out
    /[^A-Za-z]/v;
    /[^a-z]/iv;
    /\D[\D]/v;
    /\w[\w]/v;
    /\s[\s]/v;
    /[[ -~]--\w--\s]/v;
    /[[ -~]--[\w\s]]/v;
    /[[\da-z]--[^a-z]]/iv;
    /[[\da-z]&&\D]/iv;
    /[[\da-z]&&[^\d]]/iv;
}
// Case sensitivity in Unicode mode and non-Unicode mode
// The following regular expressions include these two non-ASCII characters:
// - ı (U+0131 LATIN SMALL LETTER DOTLESS I)
// - K (U+212A KELVIN SIGN)
// When the `ignoreCase` (i) flag is set, the character canonicalization behavior differs depending on whether HasEitherUnicodeFlag(rer) is true.
// In any Unicode mode, a character is canonicalized by the `toCasefold` method of the Unicode Default Case Folding algorithm,
// which includes mappings of both `ı` and `K` to ASCII `i` and `k`.
// In non-Unicode mode, the `toUppercase` method of the Unicode Default Case Conversion algorithm is used instead,
// which does not include mapping of `K`. Although `toUppercase(ı)` is `I`, the Canonicalize AO in the spec
// (https://tc39.es/ecma262/#sec-runtime-semantics-canonicalize-ch) bailed out all non-ASCII-to-ASCII mapping.
{
    /iıK/i;
    /iıK/iu;
    /iıK/iv;
    /[ai][aı][aK]/i;
    /[ai][aı][aK]/iu;
    /[ai][aı][aK]/iv;
}
// Edge cases
{
    // The following should be treated as identity escapes and upper case should be included
    /\c[\c]/i; // This is special: In Annex B, the first backslash is included, so this is equivalent to /\\[Cc][Cc]/
    /\e[\e]/i;
    /\k[\k]/i;
    /\p[\p]/i;
    /\P[\P]/i;
    /\q[\q]/i;
    // The following cases produce errors, but should still be treated as identity escapes and upper case should be included
    /\c[\c]/iu;
    /\e[\e]/iu;
    /\k[\k]/iu;
    /\p[\p]/iu;
    /\P[\P]/iu;
    /\q[\q]/iu;
    // `\b` is interpreted as a backspace character (U+0008) within a character class and a word boundary outside.
    // Don't treat them as the letter `b`
    /\b[\b]/i;
    /\b[\b]/iu;
    // Backreferences are really “back”-references – if the capturing group referent isn’t ended (or didn’t ever exist at all),
    // the reference matches just an empty string
    /(\1)/;
    /(foo\1bar)/;
    /\1(\1)\1/;
    /\(\1(foo\1bar)\1\)/;
    /(foo)\2|(bar)/;
    // Even though `foo` has appeared before `\1`, they aren’t in the same alternative, so `\1` will always be the empty string
    /(foo)|(bar)\1/;
    // Combination of the above two cases – both backreferences match the empty strings
    /^((foo)\1|(bar)\2)$/;
    // Named backreferences
    /(?<$1>\k<$1>)/;
    /(?<$1>foo\k<$1>bar)/;
    /\k<$1>(?<$1>\k<$1>)\k<$1>/;
    /fizz\k<$1>(?<$1>foo\k<$1>bar)\k<$1>buzz/;
    /(?<$1>foo)\k<$2>|(?<$2>bar)/;
    /(?<$1>foo)|(?<$2>bar)\k<$1>/;
    /^(?<$1>(?<$2>foo)\k<$1>|(?<$3>bar)\k<$2>)$/;
    // This will only match `foo` or `barbar` and not `foobar`, since they aren’t in the same alternative
    /(?<$$>foo)|(?<$$>bar)\k<$$>/;
    // This will only match `foofoo` or `barbar`
    /\k<$$>(?<$$>\k<$$>foo\k<$$>)\k<$$>|\k<$$>(?<$$>\k<$$>bar\k<$$>)\k<$$>/;
    // Matches `foo`, `bar`, `foofoo` or `barbar`
    /\k<$$>?(?<$$>\k<$$>?foo\k<$$>?)\k<$$>?|\k<$$>?(?<$$>\k<$$>?bar\k<$$>?)\k<$$>?/;
    // Matches ``, `foofoo` or `barbar`
    /\k<$$>(?<$$>\k<$$>foo\k<$$>)?\k<$$>|\k<$$>(?<$$>\k<$$>bar\k<$$>)?\k<$$>/;
    // Matches ``, `foo`, `bar`, `foofoo` or `barbar`
    /\k<$$>?(?<$$>\k<$$>?foo\k<$$>?)?\k<$$>?|\k<$$>?(?<$$>\k<$$>?bar\k<$$>?)?\k<$$>?/;
    // All `$$` below match the empty strings
    /(?<$$>f<\k<$$>?(?<f>fizz\k<$$>?(?<b>foo)\k<b>?|(?<b>foo)\k<f>?)\k<f>?>|<\k<b>?(?<b>\k<b>?(?<f>bar)|\k<f>?(?<f>bar)\k<$$>?buzz)\k<$$>?>b)/;
    // Assertions
    // Positive lookaheads and lookbehinds
    /(?=(foo))\1/;
    /(?=(foo|bar))\1/;
    /(?=(foo)?)\1/;
    /(?=(foo)|bar)\1/;
    // In the following four cases, `answer` will only match `foo` or `` and won't ever be `bar`,
    // but we don't have the ability to exclude them
    /(?=(foo)|(bar))(?<answer>\1|\2)/;
    /(?=(foo)|(bar)?)(?<answer>\1|\2)/;
    /(?=(foo)|(bar))(?=(foo)|(bar))(?<answer>\1|\2|\3|\4)/;
    /(?<=(foo)|(bar))(?<=(foo)|(bar))(?<answer>\1|\2|\3|\4)/;
    // In the following two cases, `answer` will only match `foo` or `bar` and won't ever be ``, `foobar`,
    // but we don't have the ability to exclude them
    /(?=(foo)|(bar))(?<answer>\1\2)/;
    /(?<=(foo)|(bar))(?<answer>\1\2)/;
    // In this case, `answer` will only match `foofoo` or `barbar`,
    // but we don't have the ability to exclude ``, `foo`, `bar`, `foobar`, `barfoo`, etc.
    /(?=(foo)|(bar))(?=(foo)|(bar))(?<answer>\1\2\3\4)/;
    // In the following two cases, although the third and fourth capturing groups are of types `foo` and `bar` respectively,
    // references to them will always be empty strings since the groups are unseen before
    /(?=(foo)|(bar))(?<answer>\1|\2|\3|\4)(?=(foo)|(bar))/;
    /(?=(foo)|(bar))(?<answer>\1\2\3\4)(?=(foo)|(bar))/;
    // Negative lookaheads and lookbehinds
    /(?!(foo))\1/;
    /(?!(foo|bar))\1/;
    /(?!(foo)?)\1/;
    /(?!(foo)|bar)\1/;
    /(?!(foo)|(bar))(?<answer>\1|\2)/;
    /(?!(foo)|(bar)?)(?<answer>\1|\2)/;
    // Excerpt of a regex that actually matches a part of a syllable of a natural language
    /([aeiouy])(?:((?=(ng?|[mptkbd])(?!(([aeiou])|(y)(?!([aeio]))))|(g)(?!(w?[aeiou])|(y)(?!([aeio])|(u)(?!([nt])(?!([aeiou])))))))\2)/;
}
// Finally, a very loosey Temporal (Zoned)DateTime format regex, which tests, in non-Unicode, Unicode, and Unicode Sets modes, if:
// - Cross product of literals are correctly computed
// - Capturing groups are correctly marked as possibly undefined
// - Backreferences are correctly expanded
// - Assertions aren't included in patterns
{
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/i;
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/iu;
    /^(?<date>(?<year>\d{4}|(?!-000000)[+-]\d{6})(?<dateSeparator>-)?(?!(?:0[2469]|11)\k<dateSeparator>31|02\k<dateSeparator>30)(?<month>0[1-9]|1[0-2])\k<dateSeparator>(?<day>0[1-9]|[12]\d|3[01]))(?:[ T](?<time>(?<hour>[01]\d|2[0-3])(?:(?<timeSeparator>:)?(?<minute>[0-5]\d)(?:\k<timeSeparator>(?<second>(?:[0-5]\d|60)(?:[.,]\d{1,9})?))?)?)(?:Z|[+-](?<timeZone>(?<timeZoneHour>[01]\d|2[0-3])(?:(?<timeZoneTimeSeparator>:)?(?<timeZoneMinute>[0-5]\d)(?:\k<timeZoneTimeSeparator>(?<timeZoneSecond>[0-5]\d(?:[.,]\d{1,9})?))?)?))?)?$/iv;
}
