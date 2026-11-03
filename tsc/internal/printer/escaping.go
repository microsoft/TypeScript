package printer

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
)

var asciiEscapeCodes = [128]byte{
	0: '0', '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r',
	'\\': '\\', '"': '"', '\'': '\'', '`': '`', '$': '$',
}

func appendEscapedString(s string, quoteChar QuoteChar, flags getLiteralTextFlags, b *strings.Builder) bool {
	quote := byte(0)
	if quoteChar >= 0 && quoteChar < utf8.RuneSelf {
		quote = byte(quoteChar)
	}
	backtick := quoteChar == QuoteCharBacktick
	asciiOnly := flags&getLiteralTextFlagsNeverAsciiEscape == 0
	jsx := flags&getLiteralTextFlagsJsxAttributeEscape != 0
	pos, pending := 0, 0
	changed := false
	for pos < len(s) {
		if ch := s[pos]; ch >= 0x20 && ch < utf8.RuneSelf && ch != '\\' && ch != quote && (!backtick || ch != '$') {
			pos += stringutil.UnescapedASCIIPrefixLen(s[pos:], quote)
			if pos == len(s) {
				break
			}
		}
		ch, size := rune(s[pos]), 1
		if ch < utf8.RuneSelf {
			if ch == '\\' && jsx || ch == '\n' && backtick || ch == '$' && (!backtick || pos+1 == len(s) || s[pos+1] != '{') {
				pos++
				continue
			}
		} else {
			ch, size = stringutil.DecodeJSStringRune(s[pos:])
			if !asciiOnly && ch != rune(quoteChar) && ch != 0x85 && ch != 0x2028 && ch != 0x2029 &&
				!stringutil.IsSurrogate(ch) && !(ch == utf8.RuneError && size == 1) {
				pos += size
				continue
			}
		}
		if !changed {
			if b.Cap() == 0 {
				b.Grow(len(s) + 2)
			} else if b.Cap()-b.Len() < len(s) {
				b.Grow(len(s))
			}
			changed = true
		}
		if pending < pos {
			b.WriteString(s[pending:pos])
		}
		if jsx {
			if ch == 0 {
				b.WriteString("&#0;")
			} else if match, ok := jsxEscapedCharsMap[ch]; ok {
				b.WriteString(match)
			} else {
				encodeJsxCharacterEntity(b, ch)
			}
		} else {
			switch {
			case ch == '\r' && pos+1 < len(s) && s[pos+1] == '\n':
				size = 2
				b.WriteString(`\r\n`)
			case ch == 0 && pos+1 < len(s) && s[pos+1] >= '0' && s[pos+1] <= '9':
				b.WriteString(`\x00`)
			case ch < 128 && asciiEscapeCodes[ch] != 0:
				bytes := [2]byte{'\\', asciiEscapeCodes[ch]}
				b.Write(bytes[:])
			case ch > 0xffff:
				ch -= 0x10000
				encodeUtf16EscapeSequence(b, ch>>10+0xD800)
				encodeUtf16EscapeSequence(b, ch&0x3ff+0xDC00)
			default:
				encodeUtf16EscapeSequence(b, ch)
			}
		}
		pending = pos + size
		pos += size
	}
	if changed && pending < len(s) {
		b.WriteString(s[pending:])
	}
	return changed
}
