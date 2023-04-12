declare namespace Intl {
    interface NumberRangeFormatPart extends NumberFormatPart {
        source: "startRange" | "endRange" | "shared"
    }

    interface NumberFormat {
        formatRange(start: number | bigint, end: number | bigint): string;
        formatRangeToParts(start: number | bigint, end: number | bigint): NumberRangeFormatPart[];
    }

    /**
     * Returns a sorted array of the supported collation, calendar, currency, numbering system, timezones, and units by the implementation.
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf)
     *
     * @param key A string indicating the category of values to return.
     * @returns A sorted array of the supported values.
     */
    function supportedValuesOf(key: "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit"): string[];
}
