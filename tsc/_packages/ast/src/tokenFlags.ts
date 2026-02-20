//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/ast/tokenflags.go
// Regenerate: npx hereby generate:enums
//
export var TokenFlags: any;
(function (TokenFlags) {
    TokenFlags[TokenFlags["None"] = 0] = "None";
    TokenFlags[TokenFlags["PrecedingLineBreak"] = 1] = "PrecedingLineBreak";
    TokenFlags[TokenFlags["PrecedingJSDocComment"] = 2] = "PrecedingJSDocComment";
    TokenFlags[TokenFlags["Unterminated"] = 4] = "Unterminated";
    TokenFlags[TokenFlags["ExtendedUnicodeEscape"] = 8] = "ExtendedUnicodeEscape";
    TokenFlags[TokenFlags["Scientific"] = 16] = "Scientific";
    TokenFlags[TokenFlags["Octal"] = 32] = "Octal";
    TokenFlags[TokenFlags["HexSpecifier"] = 64] = "HexSpecifier";
    TokenFlags[TokenFlags["BinarySpecifier"] = 128] = "BinarySpecifier";
    TokenFlags[TokenFlags["OctalSpecifier"] = 256] = "OctalSpecifier";
    TokenFlags[TokenFlags["ContainsSeparator"] = 512] = "ContainsSeparator";
    TokenFlags[TokenFlags["UnicodeEscape"] = 1024] = "UnicodeEscape";
    TokenFlags[TokenFlags["ContainsInvalidEscape"] = 2048] = "ContainsInvalidEscape";
    TokenFlags[TokenFlags["HexEscape"] = 4096] = "HexEscape";
    TokenFlags[TokenFlags["ContainsLeadingZero"] = 8192] = "ContainsLeadingZero";
    TokenFlags[TokenFlags["ContainsInvalidSeparator"] = 16384] = "ContainsInvalidSeparator";
    TokenFlags[TokenFlags["PrecedingJSDocLeadingAsterisks"] = 32768] = "PrecedingJSDocLeadingAsterisks";
    TokenFlags[TokenFlags["SingleQuote"] = 65536] = "SingleQuote";
    TokenFlags[TokenFlags["PrecedingJSDocWithDeprecated"] = 131072] = "PrecedingJSDocWithDeprecated";
    TokenFlags[TokenFlags["PrecedingJSDocWithSeeOrLink"] = 262144] = "PrecedingJSDocWithSeeOrLink";
    TokenFlags[TokenFlags["BinaryOrOctalSpecifier"] = 384] = "BinaryOrOctalSpecifier";
    TokenFlags[TokenFlags["WithSpecifier"] = 448] = "WithSpecifier";
    TokenFlags[TokenFlags["StringLiteralFlags"] = 72716] = "StringLiteralFlags";
    TokenFlags[TokenFlags["NumericLiteralFlags"] = 25584] = "NumericLiteralFlags";
    TokenFlags[TokenFlags["TemplateLiteralLikeFlags"] = 7180] = "TemplateLiteralLikeFlags";
    TokenFlags[TokenFlags["RegularExpressionLiteralFlags"] = 4] = "RegularExpressionLiteralFlags";
    TokenFlags[TokenFlags["IsInvalid"] = 26656] = "IsInvalid";
})(TokenFlags || (TokenFlags = {}));
