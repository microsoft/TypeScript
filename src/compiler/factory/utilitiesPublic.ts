namespace ts {
    export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
        return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
    }
}