// Package stringutil Exports common rune utilities for parsing and emitting javascript
package stringutil

import (
	"regexp"
	"strings"
	"unicode"
	"unicode/utf16"
	"unicode/utf8"
)

func IsWhiteSpaceLike(ch rune) bool {
	return IsWhiteSpaceSingleLine(ch) || IsLineBreak(ch)
}

func IsWhiteSpaceSingleLine(ch rune) bool {
	// Note: nextLine is in the Zs space, and should be considered to be a whitespace.
	// It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
	switch ch {
	case
		' ',    // space
		'\t',   // tab
		'\v',   // verticalTab
		'\f',   // formFeed
		0x0085, // nextLine
		0x00A0, // nonBreakingSpace
		0x1680, // ogham
		0x2000, // enQuad
		0x2001, // emQuad
		0x2002, // enSpace
		0x2003, // emSpace
		0x2004, // threePerEmSpace
		0x2005, // fourPerEmSpace
		0x2006, // sixPerEmSpace
		0x2007, // figureSpace
		0x2008, // punctuationEmSpace
		0x2009, // thinSpace
		0x200A, // hairSpace
		0x200B, // zeroWidthSpace
		0x202F, // narrowNoBreakSpace
		0x205F, // mathematicalSpace
		0x3000, // ideographicSpace
		0xFEFF: // byteOrderMark
		return true
	}
	return false
}

func IsLineBreak(ch rune) bool {
	// ES5 7.3:
	// The ECMAScript line terminator characters are listed in Table 3.
	//     Table 3: Line Terminator Characters
	//     Code Unit Value     Name                    Formal Name
	//     \u000A              Line Feed               <LF>
	//     \u000D              Carriage Return         <CR>
	//     \u2028              Line separator          <LS>
	//     \u2029              Paragraph separator     <PS>
	// Only the characters in Table 3 are treated as line terminators. Other new line or line
	// breaking characters are treated as white space but not as line terminators.
	switch ch {
	case
		'\n',   // lineFeed
		'\r',   // carriageReturn
		0x2028, // lineSeparator
		0x2029: // paragraphSeparator
		return true
	}
	return false
}

func IsDigit(ch rune) bool {
	return ch >= '0' && ch <= '9'
}

func IsOctalDigit(ch rune) bool {
	return ch >= '0' && ch <= '7'
}

func IsHexDigit(ch rune) bool {
	return ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'F' || ch >= 'a' && ch <= 'f'
}

func IsASCIILetter(ch rune) bool {
	return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z'
}

func SplitLines(text string) []string {
	lines := make([]string, 0, strings.Count(text, "\n")+1) // preallocate
	start := 0
	pos := 0
	for pos < len(text) {
		switch text[pos] {
		case '\r':
			if pos+1 < len(text) && text[pos+1] == '\n' {
				lines = append(lines, text[start:pos])
				pos += 2
				start = pos
				continue
			}
			fallthrough
		case '\n':
			lines = append(lines, text[start:pos])
			pos++
			start = pos
			continue
		}
		pos++
	}
	if start < len(text) {
		lines = append(lines, text[start:])
	}
	return lines
}

func GuessIndentation(lines []string) int {
	const MAX_SMI_X86 int = 0x3fff_ffff
	indentation := MAX_SMI_X86
	for _, line := range lines {
		if len(line) == 0 {
			continue
		}
		i := 0
		for i < len(line) && i < indentation {
			ch, size := utf8.DecodeRuneInString(line[i:])
			if !IsWhiteSpaceLike(ch) {
				break
			}
			i += size
		}
		if i < indentation {
			indentation = i
		}
		if indentation == 0 {
			return 0
		}
	}
	if indentation == MAX_SMI_X86 {
		return 0
	}
	return indentation
}

// https://tc39.es/ecma262/multipage/global-object.html#sec-encodeuri-uri
func EncodeURI(s string) string {
	var builder strings.Builder
	for i := range len(s) {
		b := s[i]
		if !shouldEscapeForEncodeURI(b) {
			builder.WriteByte(b)
			continue
		}

		for _, escaped := range []byte(s[i : i+1]) {
			builder.WriteByte('%')
			builder.WriteByte(upperhex[escaped>>4])
			builder.WriteByte(upperhex[escaped&0x0f])
		}
	}
	return builder.String()
}

const upperhex = "0123456789ABCDEF"

func shouldEscapeForEncodeURI(b byte) bool {
	switch {
	case b >= 'A' && b <= 'Z':
		return false
	case b >= 'a' && b <= 'z':
		return false
	case b >= '0' && b <= '9':
		return false
	}

	switch b {
	case ';', '/', '?', ':', '@', '&', '=', '+', '$', ',', '#', '-', '_', '.', '!', '~', '*', '\'', '(', ')':
		return false
	default:
		return true
	}
}

func getByteOrderMarkLength(text string) int {
	if len(text) >= 1 {
		ch0 := text[0]
		if ch0 == 0xfe {
			if len(text) >= 2 && text[1] == 0xff {
				return 2 // utf16be
			}
			return 0
		}
		if ch0 == 0xff {
			if len(text) >= 2 && text[1] == 0xfe {
				return 2 // utf16le
			}
			return 0
		}
		if ch0 == 0xef {
			if len(text) >= 3 && text[1] == 0xbb && text[2] == 0xbf {
				return 3 // utf8
			}
			return 0
		}
	}
	return 0
}

func RemoveByteOrderMark(text string) string {
	length := getByteOrderMarkLength(text)
	if length > 0 {
		return text[length:]
	}
	return text
}

func AddUTF8ByteOrderMark(text string) string {
	if getByteOrderMarkLength(text) == 0 {
		return "\xEF\xBB\xBF" + text
	}
	return text
}

func StripQuotes(name string) string {
	if len(name) < 2 {
		return name
	}
	firstChar, _ := utf8.DecodeRuneInString(name)
	lastChar, _ := utf8.DecodeLastRuneInString(name)
	if firstChar == lastChar && (firstChar == '\'' || firstChar == '"' || firstChar == '`') {
		return name[1 : len(name)-1]
	}
	return name
}

var matchSlashSomething = regexp.MustCompile(`\\.`)

func matchSlashReplacer(in string) string {
	return in[1:]
}

func UnquoteString(str string) string {
	// strconv.Unquote is insufficient as that only handles a single character inside single quotes, as those are character literals in go
	inner := StripQuotes(str)
	// In strada we do str.replace(/\\./g, s => s.substring(1)) - which is to say, replace all backslash-something with just something
	// That's replicated here faithfully, but it seems wrong! This should probably be an actual unquote operation?
	return matchSlashSomething.ReplaceAllStringFunc(inner, matchSlashReplacer)
}

func LowerFirstChar(str string) string {
	char, size := utf8.DecodeRuneInString(str)
	if size > 0 {
		return string(unicode.ToLower(char)) + str[size:]
	}
	return str
}

func TruncateByRunes(str string, maxLength int) string {
	if len(str) < maxLength {
		return str
	}
	if maxLength <= 0 {
		return ""
	}
	var runeCount int
	for i := range str {
		runeCount++
		if runeCount > maxLength {
			return str[:i]
		}
	}
	return str
}

const (
	// SurrogateLowStart is the boundary between the high and low halves of the
	// UTF-16 surrogate range. unicode/utf16 only exposes IsSurrogate for the
	// whole range, so this split point is defined here to distinguish the two.
	SurrogateLowStart = 0xDC00
)

func IsHighSurrogate(ch rune) bool {
	return utf16.IsSurrogate(ch) && ch < SurrogateLowStart
}

func IsLowSurrogate(ch rune) bool {
	return utf16.IsSurrogate(ch) && ch >= SurrogateLowStart
}

func IsSurrogate(ch rune) bool {
	return utf16.IsSurrogate(ch)
}

func SurrogatePairToCodePoint(high rune, low rune) rune {
	return utf16.DecodeRune(high, low)
}

func CodePointToSurrogatePair(ch rune) (high rune, low rune) {
	return utf16.EncodeRune(ch)
}

const (
	// A lone surrogate (U+D800–U+DFFF) cannot be represented in valid UTF-8, so
	// EncodeJSStringRune stores it as the 3-byte CESU-8/WTF-8 sentinel that UTF-8
	// would use for that code point if surrogates were encodable. unicode/utf8
	// and unicode/utf16 deliberately refuse to encode or decode surrogates, so
	// the byte math is spelled out here.
	//
	// Byte layout for a code point cp in U+D000–U+DFFF (lead nibble 0xD):
	//   byte0 = 0xE0 | (cp >> 12)          == 0xED
	//   byte1 = 0x80 | ((cp >> 6) & 0x3F)
	//   byte2 = 0x80 | (cp & 0x3F)
	surrogateUTF8Lead     = 0xED   // byte0, shared by the whole U+D000–U+DFFF block
	surrogateUTF8LeadBits = 0xD000 // (surrogateUTF8Lead & 0x0F) << 12, byte0's decoded contribution
	utf8ContMarker        = 0x80   // continuation byte marker / min value (10xxxxxx)
	utf8ContMax           = 0xBF   // continuation byte max value
	utf8ContMask          = 0x3F   // data bits carried by a continuation byte

	// byte1 bounds that pin the block down to the surrogate range U+D800–U+DFFF:
	// 0xD800 -> 0xA0, 0xDFFF -> 0xBF.
	surrogateUTF8Byte1Min = 0xA0
	surrogateUTF8Byte1Max = 0xBF
)

func EncodeJSStringRune(ch rune) string {
	if IsSurrogate(ch) {
		return string([]byte{
			surrogateUTF8Lead,
			byte(utf8ContMarker | ((ch >> 6) & utf8ContMask)),
			byte(utf8ContMarker | (ch & utf8ContMask)),
		})
	}
	return string(ch)
}

func DecodeJSStringRune(s string) (rune, int) {
	if len(s) >= 3 &&
		s[0] == surrogateUTF8Lead &&
		s[1] >= surrogateUTF8Byte1Min && s[1] <= surrogateUTF8Byte1Max &&
		s[2] >= utf8ContMarker && s[2] <= utf8ContMax {
		return surrogateUTF8LeadBits | rune(s[1]&utf8ContMask)<<6 | rune(s[2]&utf8ContMask), 3
	}
	return utf8.DecodeRuneInString(s)
}

// CombineSurrogatePairs canonicalizes a JS-string value produced by
// concatenation, merging any adjacent high+low surrogate sentinel pair (as
// written by EncodeJSStringRune) into the single supplementary code point they
// represent. This mirrors how concatenating two UTF-16 code units forms a
// surrogate pair in a JavaScript string. It must be applied wherever separately
// scanned string values are joined, since each half is only a lone surrogate
// until it meets its partner. Strings without a lone-surrogate sentinel (the
// common case) are returned unchanged.
func CombineSurrogatePairs(s string) string {
	if strings.IndexByte(s, surrogateUTF8Lead) < 0 {
		return s
	}
	var b strings.Builder
	b.Grow(len(s))
	for i := 0; i < len(s); {
		r, size := DecodeJSStringRune(s[i:])
		if IsHighSurrogate(r) {
			if low, lowSize := DecodeJSStringRune(s[i+size:]); IsLowSurrogate(low) {
				b.WriteRune(SurrogatePairToCodePoint(r, low))
				i += size + lowSize
				continue
			}
		}
		b.WriteString(s[i : i+size])
		i += size
	}
	return b.String()
}
