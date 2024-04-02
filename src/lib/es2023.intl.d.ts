declare namespace Intl {
    interface NumberFormatOptionsUseGroupingRegistry {
        min2: never;
        auto: never;
        always: never;
    }

    interface NumberFormatOptionsSignDisplayRegistry {
        negative: never;
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

    interface NumberFormat {
        formatRange(start: number | bigint, end: number | bigint): string;
        formatRangeToParts(start: number | bigint, end: number | bigint): NumberRangeFormatPart[];
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
}
