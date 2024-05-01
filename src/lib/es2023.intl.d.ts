declare namespace Intl {
    interface NumberFormatOptionsUseGroupingRegistry {
        min2: never;
        auto: never;
        always: never;
    }

    interface NumberFormatOptionsSignDisplayRegistry {
        negative: never;
    }

    interface NumberFormatOptions {
        roundingPriority?: "auto" | "morePrecision" | "lessPrecision" | undefined;
        roundingIncrement?: 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000 | undefined;
        roundingMode?: "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined;
        trailingZeroDisplay?: "auto" | "stripIfInteger" | undefined;
    }

    interface ResolvedNumberFormatOptions {
        roundingPriority: "auto" | "morePrecision" | "lessPrecision";
        roundingMode: "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven";
        roundingIncrement: 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000;
        trailingZeroDisplay: "auto" | "stripIfInteger";
    }

    interface NumberRangeFormatPart extends NumberFormatPart {
        source: "startRange" | "endRange" | "shared";
    }

    type StringNumericLiteral = `${number}` | "Infinity" | "-Infinity" | "+Infinity";

    interface NumberFormat {
        format(value: number | bigint | StringNumericLiteral): string;
        formatToParts(value: number | bigint | StringNumericLiteral): NumberFormatPart[];
        formatRange(start: number | bigint | StringNumericLiteral, end: number | bigint | StringNumericLiteral): string;
        formatRangeToParts(start: number | bigint | StringNumericLiteral, end: number | bigint | StringNumericLiteral): NumberRangeFormatPart[];
    }
}
