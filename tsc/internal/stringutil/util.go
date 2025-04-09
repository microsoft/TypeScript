// Package stringutil Exports common rune utilities for parsing and emitting javascript
package stringutil

import (
	"net/url"
	"strings"
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
	start := 0
	pos := indexAny(s, ";/?:@&=+$,#", 0)
	for pos >= 0 {
		builder.WriteString(url.QueryEscape(s[start:pos]))
		builder.WriteString(s[pos : pos+1])
		start = pos + 1
		pos = indexAny(s, ";/?:@&=+$,#", start)
	}
	if start < len(s) {
		builder.WriteString(url.QueryEscape(s[start:]))
	}
	return builder.String()
}

func indexAny(s, chars string, start int) int {
	if start < 0 || start >= len(s) {
		return -1
	}
	index := strings.IndexAny(s[start:], chars)
	if index < 0 {
		return -1
	}
	return start + index
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
