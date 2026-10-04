// @strict: true
// @noEmit: true
// @noErrorTruncation: false
// @noTypesAndSymbols: true

type Prefix = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type LargeStringLiteralUnion = `${Prefix}${Digit}${Digit}${Digit}`;

const ok: LargeStringLiteralUnion = "a000";
const bad: LargeStringLiteralUnion = "zzzz";
