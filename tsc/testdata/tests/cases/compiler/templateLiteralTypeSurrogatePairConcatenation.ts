// @strict: true
// @noEmit: true

// Concatenating a lone high surrogate and a lone low surrogate across template
// literal type fragments forms a surrogate pair, exactly as in a JavaScript
// string: "\uD83D" + "\uDE00" === "😀". The combined literal type should be
// "😀", with no leftover lone surrogates.
type Hi = "\uD83D";
type Lo = "\uDE00";
type Pair = `${Hi}${Lo}`;

const p: Pair = "😀";
const q: "😀" = "x" as unknown as Pair;

// A non-adjacent boundary must NOT combine: the gap keeps the halves lone.
type Gapped = `${Hi}-${Lo}`;
const g: Gapped = "\uD83D-\uDE00";
