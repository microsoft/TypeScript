declare namespace Intl {
    type NumberFormatPartTypes = "compact" | "currency" | "decimal" | "exponentInteger" | "exponentMinusSign" | "exponentSeparator" | "fraction" | "group" | "infinity" | "integer" | "literal" | "minusSign" | "nan" | "plusSign" | "percentSign" | "unit" | "unknown";

    interface NumberFormatPart {
        type: NumberFormatPartTypes;
        value: string;
    }

    interface NumberFormat {
        formatToParts(number?: number): NumberFormatPart[];
    }
}
