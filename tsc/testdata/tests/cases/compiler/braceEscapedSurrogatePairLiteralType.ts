// @strict: true
// @noEmit: true

// In JavaScript, "\u{D83D}\u{DE00}", "\uD83D\uDE00", and "😀" are all the
// same string, so they should all have the same string literal type.
const literal = "😀" as const;
const braceEscaped = "\u{D83D}\u{DE00}" as const;
const adjacentEscaped = "\uD83D\uDE00" as const;

const a: "😀" = braceEscaped;
const b: typeof literal = braceEscaped;
const c: typeof adjacentEscaped = braceEscaped;
