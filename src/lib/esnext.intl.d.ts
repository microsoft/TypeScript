declare namespace Intl {
  interface NumberFormat {
    formatRange(start: number | bigint, end: number | bigint): string;
    formatRangeToParts(start: number | bigint, end: number | bigint): NumberFormatPart[];
  }
}
