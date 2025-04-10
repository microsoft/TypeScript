// dprint-ignore
export const enum TokenFlags {
    None = 0,
    PrecedingLineBreak = 1 << 0,
    PrecedingJSDocComment = 1 << 1,
    Unterminated = 1 << 2,
    ExtendedUnicodeEscape = 1 << 3,     // e.g. `\u{10ffff}`
    Scientific = 1 << 4,                // e.g. `10e2`
    Octal = 1 << 5,                     // e.g. `0777`
    HexSpecifier = 1 << 6,              // e.g. `0x00000000`
    BinarySpecifier = 1 << 7,           // e.g. `0b0110010000000000`
    OctalSpecifier = 1 << 8,            // e.g. `0o777`
    ContainsSeparator = 1 << 9,         // e.g. `0b1100_0101`
    UnicodeEscape = 1 << 10,            // e.g. `\u00a0`
    ContainsInvalidEscape = 1 << 11,    // e.g. `\uhello`
    HexEscape = 1 << 12,                // e.g. `\xa0`
    ContainsLeadingZero = 1 << 13,      // e.g. `0888`
    ContainsInvalidSeparator = 1 << 14, // e.g. `0_1`
    PrecedingJSDocLeadingAsterisks = 1 << 15,
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    WithSpecifier = HexSpecifier | BinaryOrOctalSpecifier,
    StringLiteralFlags = HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    NumericLiteralFlags = Scientific | Octal | ContainsLeadingZero | WithSpecifier | ContainsSeparator | ContainsInvalidSeparator,
    TemplateLiteralLikeFlags = HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    IsInvalid = Octal | ContainsLeadingZero | ContainsInvalidSeparator | ContainsInvalidEscape,
}
