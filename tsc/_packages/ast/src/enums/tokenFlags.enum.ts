//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/ast/tokenflags.go
// Regenerate: npx hereby generate:enums
//
export const enum TokenFlags {
    None = 0,
    PrecedingLineBreak = 1 << 0,
    PrecedingJSDocComment = 1 << 1,
    Unterminated = 1 << 2,
    ExtendedUnicodeEscape = 1 << 3,
    Scientific = 1 << 4,
    Octal = 1 << 5,
    HexSpecifier = 1 << 6,
    BinarySpecifier = 1 << 7,
    OctalSpecifier = 1 << 8,
    ContainsSeparator = 1 << 9,
    UnicodeEscape = 1 << 10,
    ContainsInvalidEscape = 1 << 11,
    HexEscape = 1 << 12,
    ContainsLeadingZero = 1 << 13,
    ContainsInvalidSeparator = 1 << 14,
    PrecedingJSDocLeadingAsterisks = 1 << 15,
    SingleQuote = 1 << 16,
    PrecedingJSDocWithDeprecated = 1 << 17,
    PrecedingJSDocWithSeeOrLink = 1 << 18,
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    WithSpecifier = HexSpecifier | BinaryOrOctalSpecifier,
    StringLiteralFlags = Unterminated | HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape | SingleQuote,
    NumericLiteralFlags = Scientific | Octal | ContainsLeadingZero | WithSpecifier | ContainsSeparator | ContainsInvalidSeparator,
    TemplateLiteralLikeFlags = Unterminated | HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    RegularExpressionLiteralFlags = Unterminated,
    IsInvalid = Octal | ContainsLeadingZero | ContainsInvalidSeparator | ContainsInvalidEscape,
}
