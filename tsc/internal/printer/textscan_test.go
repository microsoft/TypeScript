package printer

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/filefixture"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"gotest.tools/v3/assert"
)

func TestEscapeScanBoundaries(t *testing.T) {
	t.Parallel()
	for prefix := range 130 {
		for _, middle := range []string{
			"", "\"", "'", "`", "\\", "${", "$x", "\r\n", "\n", "\x001", "\x00a",
			"\x1f", "\x7f", "\u0085", "\u2028", "\u2029", "\u00E9", "\U0001F980",
			"\xff", "\xe2\x80", stringutil.EncodeJSStringRune(0xD800),
		} {
			for _, quote := range []QuoteChar{QuoteCharSingleQuote, QuoteCharDoubleQuote, QuoteCharBacktick} {
				for _, flags := range []getLiteralTextFlags{
					getLiteralTextFlagsNone, getLiteralTextFlagsNeverAsciiEscape,
					getLiteralTextFlagsJsxAttributeEscape | getLiteralTextFlagsNeverAsciiEscape,
				} {
					text := strings.Repeat("a", prefix) + middle + strings.Repeat("z", 129)
					var got, want strings.Builder
					escapeStringWorker(text, quote, flags, &got)
					// One-byte ASCII runs cannot use a vector fast path.
					for i := range prefix {
						escapeStringWorker(text[i:i+1], quote, flags, &want)
					}
					escapeStringWorker(middle, quote, flags, &want)
					for range 129 {
						escapeStringWorker("z", quote, flags, &want)
					}
					assert.Equal(t, got.String(), want.String(), "text %q, quote %c, flags %d", text, quote, flags)
				}
			}
		}
	}
}

func BenchmarkEscapeScan(b *testing.B) {
	texts := []filefixture.Fixture{
		filefixture.FromString("short", "", "hello world"),
		filefixture.FromString("ASCII", "", strings.Repeat("a longer plain ASCII string without any escaping ", 256)),
		filefixture.FromString("sparse", "", strings.Repeat("a longer plain ASCII string with an escaped quote \" and caf\u00E9 \U0001F980 ", 200)),
		filefixture.FromString("dense", "", strings.Repeat("\\\"\n\u2028", 1024)),
	}
	for _, fixture := range append(texts, fixtures.BenchFixtures...) {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			text := fixture.ReadFile(b)
			b.SetBytes(int64(len(text)))
			b.ReportAllocs()
			for b.Loop() {
				EscapeString(text, QuoteCharDoubleQuote)
			}
		})
	}
}
