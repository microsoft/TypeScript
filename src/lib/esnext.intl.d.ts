declare namespace Intl {
    type NumberFormatPartTypes = "currency" | "decimal" | "fraction" | "group" | "infinity" | "integer" | "literal" | "minusSign" | "nan" | "plusSign" | "percentSign";

    interface NumberFormatPart {
        type: NumberFormatPartTypes;
        value: string;
    }

    interface NumberFormat {
        formatToParts(number?: number): NumberFormatPart[];
    }
  }
