/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


declare namespace Intl {

    /**
     * [BCP 47 language tag](http://tools.ietf.org/html/rfc5646) definition.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
     *
     * [Wikipedia](https://en.wikipedia.org/wiki/IETF_language_tag).
     */
    type BCP47LanguageTag = string;

    /**
     * Unit to use in the relative time internationalized message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format#Parameters).
     *
     * [Specification](https://tc39.es/ecma402/#sec-singularrelativetimeunit).
     */
    type RelativeTimeFormatUnit =
        | "year" | "years"
        | "quarter" | "quarters"
        | "month" | "months"
        | "week" | "weeks"
        | "day" | "days"
        | "hour" | "hours"
        | "minute" | "minutes"
        | "second" | "seconds"
        ;

    /**
     * The locale matching algorithm to use.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
     *
     * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
     */
    type RelativeTimeFormatLocaleMatcher = "lookup" | "best fit";

    /**
     * The format of output message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     *
     * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
     */
    type RelativeTimeFormatNumeric = "always" | "auto";

    /**
     * The length of the internationalized message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     *
     * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
     */
    type RelativeTimeFormatStyle = "long" | "short" | "narrow";

    /**
     * Unicode Calendar Identifier
     *
     * [Reference](http://unicode.org/reports/tr35/#UnicodeCalendarIdentifier)
     *
     * [Source](https://github.com/unicode-org/cldr/blob/b805d0b/common/bcp47/calendar.xml)
     */
    type Calendar =
        // Thai Buddhist calendar
        | "buddhist"
        // Traditional Chinese calendar
        | "chinese"
        // Coptic calendar
        | "coptic"
        // Traditional Korean calendar
        | "dangi"
        // Ethiopic calendar, Amete Alem (epoch approx. 5493 B.C.E)
        | "ethiopic-amete-alem" | "ethioaa"
        // Ethiopic calendar, Amete Mihret (epoch approx, 8 C.E.)
        | "ethiopic"
        // Gregorian calendar
        | "gregorian"
        // Gregorian calendar (alias)
        | "gregory"
        // Traditional Hebrew calendar
        | "hebrew"
        // Indian calendar
        | "indian"
        // Islamic calendar
        | "islamic"
        // Islamic calendar, Umm al-Qura
        | "islamic-umalqura"
        // Islamic calendar, tabular (intercalary years [2,5,7,10,13,16,18,21,24,26,29] - astronomical epoch)
        | "islamic-tbla"
        // Islamic calendar, tabular (intercalary years [2,5,7,10,13,16,18,21,24,26,29] - civil epoch)
        | "islamic-civil"
        | "islamicc"  // Deprecated alias
        // Islamic calendar, Saudi Arabia sighting
        | "islamic-rgsa"
        // ISO calendar (Gregorian calendar using the ISO 8601 calendar week rules)
        | "iso8601"
        // Japanese Imperial calendar
        | "japanese"
        // Persian calendar
        | "persian"
        // Republic of China calendar
        | "roc"
        ;

    /**
     * Unicode Number System Identifier
     *
     * [Reference](http://unicode.org/reports/tr35/#UnicodeNumberSystemIdentifier)
     *
     * [Source](https://github.com/unicode-org/cldr/blob/be7a953/common/bcp47/number.xml)
     */
    type NumberingSystem =
        // Adlam digits
        | "adlm"
        // Ahom digits
        | "ahom"
        // Arabic-Indic digits
        | "arab"
        // Extended Arabic-Indic digits
        | "arabext"
        // Armenian upper case numerals — algorithmic
        | "armn"
        // Armenian lower case numerals — algorithmic
        | "armnlow"
        // Balinese digits
        | "bali"
        // Bengali digits
        | "beng"
        // Bhaiksuki digits
        | "bhks"
        // Brahmi digits
        | "brah"
        // Chakma digits
        | "cakm"
        // Cham digits
        | "cham"
        // Cyrillic numerals — algorithmic
        | "cyrl"
        // Devanagari digits
        | "deva"
        // Dives Akuru digits
        | "diak"
        // Ethiopic numerals — algorithmic
        | "ethi"
        // Financial numerals — may be algorithmic
        | "finance"
        // Full width digits
        | "fullwide"
        // Georgian numerals — algorithmic
        | "geor"
        // Gunjala Gondi digits
        | "gong"
        // Masaram Gondi digits
        | "gonm"
        // Greek upper case numerals — algorithmic
        | "grek"
        // Greek lower case numerals — algorithmic
        | "greklow"
        // Gujarati digits
        | "gujr"
        // Gurmukhi digits
        | "guru"
        // Han-character day-of-month numbering for lunar/other traditional calendars"
        | "hanidays"
        // Positional decimal system using Chinese number ideographs as digits
        | "hanidec"
        // Simplified Chinese numerals — algorithmic
        | "hans"
        // Simplified Chinese financial numerals — algorithmic
        | "hansfin"
        // Traditional Chinese numerals — algorithmic
        | "hant"
        // Traditional Chinese financial numerals — algorithmic
        | "hantfin"
        // Hebrew numerals — algorithmic
        | "hebr"
        // Pahawh Hmong digits
        | "hmng"
        // Nyiakeng Puachue Hmong digits
        | "hmnp"
        // Javanese digits
        | "java"
        // Japanese numerals — algorithmic
        | "jpan"
        // Japanese financial numerals — algorithmic
        | "jpanfin"
        // Japanese first-year Gannen numbering for Japanese calendar
        | "jpanyear"
        // Kayah Li digits
        | "kali"
        // Khmer digits
        | "khmr"
        // Kannada digits
        | "knda"
        // Tai Tham Hora (secular) digits
        | "lana"
        // Tai Tham Tham (ecclesiastical) digits
        | "lanatham"
        // Lao digits
        | "laoo"
        // Latin digits
        | "latn"
        // Lepcha digits
        | "lepc"
        // Limbu digits
        | "limb"
        // Mathematical bold digits
        | "mathbold"
        // Mathematical double-struck digits
        | "mathdbl"
        // Mathematical monospace digits
        | "mathmono"
        // Mathematical sans-serif bold digits
        | "mathsanb"
        // Mathematical sans-serif digits
        | "mathsans"
        // Malayalam digits
        | "mlym"
        // Modi digits
        | "modi"
        // Mongolian digits
        | "mong"
        // Mro digits
        | "mroo"
        // Meetei Mayek digits
        | "mtei"
        // Myanmar digits
        | "mymr"
        // Myanmar Shan digits
        | "mymrshan"
        // Myanmar Tai Laing digits
        | "mymrtlng"
        // Native digits
        | "native"
        // Newa digits
        | "newa"
        // N'Ko digits
        | "nkoo"
        // Ol Chiki digits
        | "olck"
        // Oriya digits
        | "orya"
        // Osmanya digits
        | "osma"
        // Hanifi Rohingya digits
        | "rohg"
        // Roman upper case numerals — algorithmic
        | "roman"
        // Roman lowercase numerals — algorithmic
        | "romanlow"
        // Saurashtra digits
        | "saur"
        // Sharada digits
        | "shrd"
        // Khudawadi digits
        | "sind"
        // Sinhala Lith digits
        | "sinh"
        // Sora_Sompeng digits
        | "sora"
        // Sundanese digits
        | "sund"
        // Takri digits
        | "takr"
        // New Tai Lue digits
        | "talu"
        // Tamil numerals — algorithmic
        | "taml"
        // Modern Tamil decimal digits
        | "tamldec"
        // Telugu digits
        | "telu"
        // Thai digits
        | "thai"
        // Tirhuta digits
        | "tirh"
        // Tibetan digits
        | "tibt"
        // Traditional numerals — may be algorithmic
        | "traditional" | "traditio"
        // Vai digits
        | "vaii"
        // Warang Citi digits
        | "wara"
        // Wancho digits
        | "wcho"
        ;

    /**
     * An object with some or all of properties of `options` parameter
     * of `Intl.RelativeTimeFormat` constructor.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     *
     * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
     */
    interface RelativeTimeFormatOptions {
        localeMatcher?: RelativeTimeFormatLocaleMatcher;
        numeric?: RelativeTimeFormatNumeric;
        style?: RelativeTimeFormatStyle;
    }

    /**
     * An object with properties reflecting the locale
     * and formatting options computed during initialization
     * of the `Intel.RelativeTimeFormat` object
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions#Description).
     *
     * [Specification](https://tc39.es/ecma402/#table-relativetimeformat-resolvedoptions-properties)
     */
    interface ResolvedRelativeTimeFormatOptions {
        locale: BCP47LanguageTag;
        style: RelativeTimeFormatStyle;
        numeric: RelativeTimeFormatNumeric;
        numberingSystem: string;
    }

    /**
     * An object representing the relative time format in parts
     * that can be used for custom locale-aware formatting.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts#Using_formatToParts).
     *
     * [Specification](https://tc39.es/ecma402/#sec-FormatRelativeTimeToParts).
     */
    interface RelativeTimeFormatPart {
        type: string;
        value: string;
        unit?: RelativeTimeFormatUnit;
    }

    interface RelativeTimeFormat {
        /**
         * Formats a value and a unit according to the locale
         * and formatting options of the given
         * [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)
         * object.
         *
         * While this method automatically provides the correct plural forms,
         * the grammatical form is otherwise as neutral as possible.
         * It is the caller's responsibility to handle cut-off logic
         * such as deciding between displaying "in 7 days" or "in 1 week".
         * This API does not support relative dates involving compound units.
         * e.g "in 5 days and 4 hours".
         *
         * @param value -  Numeric value to use in the internationalized relative time message
         *
         * @param unit - [Unit](https://tc39.es/ecma402/#sec-singularrelativetimeunit)
         *  to use in the relative time internationalized message.
         *  Possible values are: `"year"`, `"quarter"`, `"month"`, `"week"`,
         *  `"day"`, `"hour"`, `"minute"`, `"second"`.
         *  Plural forms are also permitted.
         *
         * @throws `RangeError` if `unit` was given something other than `unit` possible values
         *
         * @returns Internationalized relative time message as string
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format).
         *
         * [Specification](https://tc39.es/ecma402/#sec-Intl.RelativeTimeFormat.prototype.format).
         */
        format(
            value: number,
            unit: RelativeTimeFormatUnit,
        ): string;

        /**
         *  A version of the format method which it returns an array of objects
         *  which represent "parts" of the object,
         *  separating the formatted number into its constituent parts
         *  and separating it from other surrounding text.
         *  These objects have two properties:
         * `type` a NumberFormat formatToParts type, and `value`,
         *  which is the String which is the component of the output.
         *  If a "part" came from NumberFormat,
         *  it will have a unit property which indicates the `unit` being formatted;
         *  literals which are part of the larger frame will not have this property.
         *
         *  @param value - Numeric value to use in the internationalized relative time message
         *
         *  @param unit - [Unit](https://tc39.es/ecma402/#sec-singularrelativetimeunit)
         *   to use in the relative time internationalized message.
         *   Possible values are: `"year"`, `"quarter"`, `"month"`, `"week"`,
         *   `"day"`, `"hour"`, `"minute"`, `"second"`.
         *   Plural forms are also permitted.
         *
         *  @throws `RangeError` if `unit` was given something other than `unit` possible values
         *
         *  @returns Array of [FormatRelativeTimeToParts](https://tc39.es/ecma402/#sec-FormatRelativeTimeToParts)
         *
         *  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts).
         *
         *  [Specification](https://tc39.es/ecma402/#sec-Intl.RelativeTimeFormat.prototype.formatToParts).
         */
        formatToParts(
            value: number,
            unit: RelativeTimeFormatUnit,
        ): RelativeTimeFormatPart[];

        /**
         * Provides access to the locale and options computed during initialization of this `Intl.RelativeTimeFormat` object.
         *
         * @returns A new object with properties reflecting the locale
         *  and formatting options computed during initialization
         *  of the `Intel.RelativeTimeFormat` object.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions).
         *
         * [Specification](https://tc39.es/ecma402/#sec-intl.relativetimeformat.prototype.resolvedoptions)
         */
        resolvedOptions(): ResolvedRelativeTimeFormatOptions;
    }

    /**
     * The [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)
     * object is a constructor for objects that enable language-sensitive relative time formatting.
     *
     * Part of [Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
     * namespace and the [ECMAScript Internationalization API](https://www.ecma-international.org/publications/standards/Ecma-402.htm).
     *
     * [Compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat#Browser_compatibility).
     *
     * [Polyfills](https://github.com/tc39/proposal-intl-relative-time#polyfills).
     */
    const RelativeTimeFormat: {
        /**
         * Constructor creates [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)
         * objects
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the locales argument,
         *  see the [`Intl` page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters)
         *  with some or all of options of the formatting.
         *  An object with some or all of the following properties:
         *  - `localeMatcher` - The locale matching algorithm to use.
         *    Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`.
         *    For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
         *  - `numeric` - The format of output message.
         *    Possible values are: `"always"` (default, e.g., `1 day ago`) or `"auto"` (e.g., `yesterday`).
         *    The `"auto"` value allows to not always have to use numeric values in the output.
         *  - `style` - The length of the internationalized message. Possible values are:
         *    `"long"` (default, e.g., in 1 month),
         *    `"short"` (e.g., in 1 mo.)
         *    or `"narrow"` (e.g., in 1 mo.). The narrow style could be similar to the short style for some locales.
         *
         * @returns [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) object.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat).
         *
         * [Specification](https://tc39.es/ecma402/#sec-intl-relativetimeformat-constructor).
         */
        new(
            locales?: BCP47LanguageTag | BCP47LanguageTag[],
            options?: RelativeTimeFormatOptions,
        ): RelativeTimeFormat;

        /**
         * Returns an array containing those of the provided locales
         * that are supported in date and time formatting
         * without having to fall back to the runtime's default locale.
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the locales argument,
         *  see the [`Intl` page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters)
         *  with some or all of options of the formatting.
         *  An object with some or all of the following properties:
         *  - `localeMatcher` - The locale matching algorithm to use.
         *    Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`.
         *    For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
         *  - `numeric` - The format of output message.
         *    Possible values are: `"always"` (default, e.g., `1 day ago`) or `"auto"` (e.g., `yesterday`).
         *    The `"auto"` value allows to not always have to use numeric values in the output.
         *  - `style` - The length of the internationalized message. Possible values are:
         *    `"long"` (default, e.g., in 1 month),
         *    `"short"` (e.g., in 1 mo.)
         *    or `"narrow"` (e.g., in 1 mo.). The narrow style could be similar to the short style for some locales.
         *
         * @returns An array containing those of the provided locales
         *  that are supported in date and time formatting
         *  without having to fall back to the runtime's default locale.
         *
         * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/supportedLocalesOf).
         *
         * [Specification](https://tc39.es/ecma402/#sec-Intl.RelativeTimeFormat.supportedLocalesOf).
         */
        supportedLocalesOf(
            locales: BCP47LanguageTag | BCP47LanguageTag[],
            options?: RelativeTimeFormatOptions,
        ): BCP47LanguageTag[];
    };

    interface NumberFormatOptions {
        compactDisplay?: string;
        notation?: string;
        signDisplay?: string;
        unit?: string;
        unitDisplay?: string;
    }

    interface ResolvedNumberFormatOptions {
        compactDisplay?: string;
        notation?: string;
        signDisplay?: string;
        unit?: string;
        unitDisplay?: string;
    }

    interface DateTimeFormatOptions {
        dateStyle?: "full" | "long" | "medium" | "short";
        timeStyle?: "full" | "long" | "medium" | "short";
        calendar?: Calendar;
        dayPeriod?: "narrow" | "short" | "long";
        numberingSystem?: NumberingSystem;
        hourCycle?: "h11" | "h12" | "h23" | "h24";
        fractionalSecondDigits?: 0 | 1 | 2 | 3;
    }
}
