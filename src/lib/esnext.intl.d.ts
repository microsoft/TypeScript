declare namespace Intl {

    interface NumberFormat {
        formatRange(startDate: number | bigint, endDate: number | bigint): string;
        formatRangeToParts(startDate: number | bigint, endDate: number | bigint): NumberFormatPart[];
    }
}
