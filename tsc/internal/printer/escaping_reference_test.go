package printer

import (
	"fmt"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
)

var referenceEscapedChars = map[rune]string{
	'\t': `\t`, '\v': `\v`, '\f': `\f`, '\b': `\b`, '\r': `\r`, '\n': `\n`,
	'\\': `\\`, '"': `\"`, '\'': `\'`, '`': "\\`", '$': `\$`,
	'\u2028': `\u2028`, '\u2029': `\u2029`, '\u0085': `\u0085`,
}

// Keep the original rune-by-rune emitter independent of production scanning,
// escape tables, and hexadecimal formatting.
func escapeStringWorkerReference(s string, quoteChar QuoteChar, flags getLiteralTextFlags, b *strings.Builder) {
	pending := 0
	for pos := 0; pos < len(s); {
		ch, size := stringutil.DecodeJSStringRune(s[pos:])
		escape := ch >= 0xD800 && ch <= 0xDFFF || ch == utf8.RuneError && size == 1
		switch ch {
		case '\\':
			if flags&getLiteralTextFlagsJsxAttributeEscape == 0 {
				escape = true
			}
		case '$':
			if quoteChar == QuoteCharBacktick && pos+1 < len(s) && s[pos+1] == '{' {
				escape = true
			}
		case rune(quoteChar), '\u2028', '\u2029', '\u0085', '\r':
			escape = true
		case '\n':
			if quoteChar != QuoteCharBacktick {
				escape = true
			}
		default:
			if ch <= '\u001f' || flags&getLiteralTextFlagsNeverAsciiEscape == 0 && ch > '\u007f' {
				escape = true
			}
		}
		if escape {
			b.WriteString(s[pending:pos])
			if flags&getLiteralTextFlagsJsxAttributeEscape != 0 {
				switch ch {
				case 0:
					b.WriteString("&#0;")
				case '"':
					b.WriteString("&quot;")
				case '\'':
					b.WriteString("&apos;")
				default:
					b.WriteString(fmt.Sprintf("&#x%X;", ch))
				}
			} else {
				switch {
				case ch == '\r' && quoteChar == QuoteCharBacktick && pos+1 < len(s) && s[pos+1] == '\n':
					size++
					b.WriteString(`\r\n`)
				case ch > 0xffff:
					value := ch - 0x10000
					b.WriteString(fmt.Sprintf(`\u%04X\u%04X`, value>>10+0xD800, value&0x3ff+0xDC00))
				case ch >= 0xD800 && ch <= 0xDFFF:
					b.WriteString(fmt.Sprintf(`\u%04X`, ch))
				case ch == 0:
					if pos+1 < len(s) && stringutil.IsDigit(rune(s[pos+1])) {
						b.WriteString(`\x00`)
					} else {
						b.WriteString(`\0`)
					}
				default:
					if match, ok := referenceEscapedChars[ch]; ok {
						b.WriteString(match)
					} else {
						b.WriteString(fmt.Sprintf(`\u%04X`, ch))
					}
				}
			}
			pending = pos + size
		}
		pos += size
	}
	b.WriteString(s[pending:])
}
