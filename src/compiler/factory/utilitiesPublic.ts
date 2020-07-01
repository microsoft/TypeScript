import { TextRange } from "../types";
import { setTextRangePosEnd } from "../utilities";

    export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
        return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
    }

