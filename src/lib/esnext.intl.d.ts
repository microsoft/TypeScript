declare namespace Intl {
  interface NumberRangeFormatPart extends NumberFormatPart {
    source: "startRange" | "endRange" | "shared"
  }

  interface NumberFormat {
    formatRange(start: number | bigint, end: number | bigint): string;
    formatRangeToParts(start: number | bigint, end: number | bigint): NumberRangeFormatPart[];
  }
}
