/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/// <reference lib="esnext.temporal" />

declare namespace Intl {
    type FormattableTemporalObject = Temporal.PlainDate | Temporal.PlainYearMonth | Temporal.PlainMonthDay | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.Instant;

    interface DateTimeFormat {
        format(date?: FormattableTemporalObject | Date | number): string;
        formatToParts(date?: FormattableTemporalObject | Date | number): DateTimeFormatPart[];
        formatRange(startDate: FormattableTemporalObject | Date | number, endDate: FormattableTemporalObject | Date | number): string;
        formatRangeToParts(startDate: FormattableTemporalObject | Date | number, endDate: FormattableTemporalObject | Date | number): DateTimeRangeFormatPart[];
    }

    interface Locale {
        /**
         * Returns a list of one or more unique calendar identifiers for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars)
         */
        getCalendars(): string[];
        /**
         * Returns a list of one or more collation types for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCollations)
         */
        getCollations(): string[];
        /**
         * Returns a list of one or more unique hour cycle identifiers for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getHourCycles)
         */
        getHourCycles(): string[];
        /**
         * Returns a list of one or more unique numbering system identifiers for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getNumberingSystems)
         */
        getNumberingSystems(): string[];
        /**
         * Returns the ordering of characters indicated by either ltr (left-to-right) or by rtl (right-to-left) for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo)
         */
        getTextInfo(): TextInfo;
        /**
         * Returns a list of supported time zones for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTimeZones)
         */
        getTimeZones(): string[] | undefined;
        /**
         * Returns a `WeekInfo` object with the properties `firstDay`, `weekend` and `minimalDays` for this locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo)
         */
        getWeekInfo(): WeekInfo;
    }

    /**
     * An object representing text typesetting information associated with the Locale data specified in UTS 35's Layouts Elements.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo#return_value)
     */
    interface TextInfo {
        /**
         * A string indicating the direction of text for the locale. Can be either "ltr" (left-to-right) or "rtl" (right-to-left).
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo#direction)
         */
        direction?: "ltr" | "rtl";
    }

    /**
     * An object representing week information associated with the Locale data specified in UTS 35's Week Elements.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#return_value)
     */
    interface WeekInfo {
        /**
         * An integer between 1 (Monday) and 7 (Sunday) indicating the first day of the week for the locale. Commonly 1, 5, 6, or 7.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#firstday)
         */
        firstDay: number;
        /**
         * An array of integers between 1 and 7 indicating the weekend days for the locale.
         *
         * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#weekend)
         */
        weekend: number[];
    }
}
