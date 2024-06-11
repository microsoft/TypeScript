declare namespace Intl {
    interface NumberFormatOptionsUseGroupingRegistry {
        min2: "min2";
        auto: "auto";
        always: "always";
    }

    interface NumberFormatOptionsSignDisplayRegistry {
        negative: "negative";
    }

    type NumberFormatOptionsRoundingPriority = "auto" | "morePrecision" | "lessPrecision";
    type NumberFormatOptionsRoundingIncrement = 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000;
    type NumberFormatOptionsRoundingMode = "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven";
    type NumberFormatOptionsTrailingZeroDisplay = "auto" | "stripIfInteger";

    interface NumberFormatOptions {
        roundingPriority?: NumberFormatOptionsRoundingPriority | undefined;
        roundingIncrement?: NumberFormatOptionsRoundingIncrement | undefined;
        roundingMode?: NumberFormatOptionsRoundingMode | undefined;
        trailingZeroDisplay?: NumberFormatOptionsTrailingZeroDisplay | undefined;
    }

    interface ResolvedNumberFormatOptions {
        roundingPriority: NumberFormatOptionsRoundingPriority;
        roundingIncrement: NumberFormatOptionsRoundingIncrement;
        roundingMode: NumberFormatOptionsRoundingMode;
        trailingZeroDisplay: NumberFormatOptionsTrailingZeroDisplay;
    }

    interface NumberRangeFormatPart extends NumberFormatPart {
        source: "startRange" | "endRange" | "shared";
    }

    type StringNumericLiteral = `${number}` | "Infinity" | "-Infinity" | "+Infinity";

    interface NumberFormat {
        /**
         * Formats a number as a string, according to the selected locale and formatting options.
         * @param value The value to be formatted.
         */
        format(value?: number | bigint | StringNumericLiteral): string;

        /**
         * Formats a number as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param value The value to be formatted.
         */
        formatToParts(value?: number | bigint | StringNumericLiteral): NumberFormatPart[];

        /**
         * Formats a number range as a string, according to the selected locale and formatting options.
         * @param start The value at the start of the range.
         * @param end The value at the end of the range.
         */
        formatRange(start: number | bigint | StringNumericLiteral, end: number | bigint | StringNumericLiteral): string;

        /**
         * Formats a number range as a string, according to the selected locale and formatting options,
         * and returns the result as a list of locale-specific string tokens.
         * @param start The value at the start of the range.
         * @param end The value at the end of the range.
         */
        formatRangeToParts(start: number | bigint | StringNumericLiteral, end: number | bigint | StringNumericLiteral): NumberRangeFormatPart[];
    }

    interface PluralRulesOptions {
        roundingPriority?: NumberFormatOptionsRoundingPriority | undefined;
        roundingIncrement?: NumberFormatOptionsRoundingIncrement | undefined;
        roundingMode?: NumberFormatOptionsRoundingMode | undefined;
        trailingZeroDisplay?: NumberFormatOptionsTrailingZeroDisplay | undefined;
    }

    interface ResolvedPluralRulesOptions {
        roundingPriority: NumberFormatOptionsRoundingPriority;
        roundingIncrement: NumberFormatOptionsRoundingIncrement;
        roundingMode: NumberFormatOptionsRoundingMode;
        trailingZeroDisplay: NumberFormatOptionsTrailingZeroDisplay;
    }

    interface PluralRules {
        /**
         * Returns the plural rule identifier for the given number range, according to the selected locale and parsing options.
         * @param start The number at the start of the range.
         * @param end The number at the end of the range.
         */
        selectRange(start: number, end: number): LDMLPluralRule;
    }

    /**
     * Returns a list of all values of the given type that are supported by the current implementation.
     * @param key The category to select.
     */
    function supportedValuesOf(key: "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit"): string[];
}
