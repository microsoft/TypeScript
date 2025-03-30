package ast

type TokenFlags int32

const (
	TokenFlagsNone                           TokenFlags = 0
	TokenFlagsPrecedingLineBreak             TokenFlags = 1 << 0
	TokenFlagsPrecedingJSDocComment          TokenFlags = 1 << 1
	TokenFlagsUnterminated                   TokenFlags = 1 << 2
	TokenFlagsExtendedUnicodeEscape          TokenFlags = 1 << 3  // e.g. `\u{10ffff}`
	TokenFlagsScientific                     TokenFlags = 1 << 4  // e.g. `10e2`
	TokenFlagsOctal                          TokenFlags = 1 << 5  // e.g. `0777`
	TokenFlagsHexSpecifier                   TokenFlags = 1 << 6  // e.g. `0x00000000`
	TokenFlagsBinarySpecifier                TokenFlags = 1 << 7  // e.g. `0b0110010000000000`
	TokenFlagsOctalSpecifier                 TokenFlags = 1 << 8  // e.g. `0o777`
	TokenFlagsContainsSeparator              TokenFlags = 1 << 9  // e.g. `0b1100_0101`
	TokenFlagsUnicodeEscape                  TokenFlags = 1 << 10 // e.g. `\u00a0`
	TokenFlagsContainsInvalidEscape          TokenFlags = 1 << 11 // e.g. `\uhello`
	TokenFlagsHexEscape                      TokenFlags = 1 << 12 // e.g. `\xa0`
	TokenFlagsContainsLeadingZero            TokenFlags = 1 << 13 // e.g. `0888`
	TokenFlagsContainsInvalidSeparator       TokenFlags = 1 << 14 // e.g. `0_1`
	TokenFlagsPrecedingJSDocLeadingAsterisks TokenFlags = 1 << 15
	TokenFlagsSingleQuote                    TokenFlags = 1 << 16 // e.g. `'abc'`
	TokenFlagsBinaryOrOctalSpecifier         TokenFlags = TokenFlagsBinarySpecifier | TokenFlagsOctalSpecifier
	TokenFlagsWithSpecifier                  TokenFlags = TokenFlagsHexSpecifier | TokenFlagsBinaryOrOctalSpecifier
	TokenFlagsStringLiteralFlags             TokenFlags = TokenFlagsUnterminated | TokenFlagsHexEscape | TokenFlagsUnicodeEscape | TokenFlagsExtendedUnicodeEscape | TokenFlagsContainsInvalidEscape | TokenFlagsSingleQuote
	TokenFlagsNumericLiteralFlags            TokenFlags = TokenFlagsScientific | TokenFlagsOctal | TokenFlagsContainsLeadingZero | TokenFlagsWithSpecifier | TokenFlagsContainsSeparator | TokenFlagsContainsInvalidSeparator
	TokenFlagsTemplateLiteralLikeFlags       TokenFlags = TokenFlagsUnterminated | TokenFlagsHexEscape | TokenFlagsUnicodeEscape | TokenFlagsExtendedUnicodeEscape | TokenFlagsContainsInvalidEscape
	TokenFlagsRegularExpressionLiteralFlags  TokenFlags = TokenFlagsUnterminated
	TokenFlagsIsInvalid                      TokenFlags = TokenFlagsOctal | TokenFlagsContainsLeadingZero | TokenFlagsContainsInvalidSeparator | TokenFlagsContainsInvalidEscape
)
