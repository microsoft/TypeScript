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
					getLiteralTextFlagsJsxAttributeEscape,
					getLiteralTextFlagsJsxAttributeEscape | getLiteralTextFlagsNeverAsciiEscape,
				} {
					text := strings.Repeat("a", prefix) + middle + strings.Repeat("z", 129)
					var got, want strings.Builder
					escapeStringWorker(text, quote, flags, &got)
					escapeStringWorkerReference(text, quote, flags, &want)
					assert.Equal(t, got.String(), want.String(), "text %q, quote %c, flags %d", text, quote, flags)
				}
			}
		}
	}
}

func TestEscapeASCIIAtVectorBoundaries(t *testing.T) {
	t.Parallel()
	for prefix := range 66 {
		for character := range 256 {
			for _, following := range []string{"", "1", "{", "\n"} {
				middle := string(byte(character)) + following
				for _, quote := range []QuoteChar{QuoteCharSingleQuote, QuoteCharDoubleQuote, QuoteCharBacktick} {
					var expected strings.Builder
					escapeStringWorkerReference(middle, quote, getLiteralTextFlagsNeverAsciiEscape, &expected)
					text := strings.Repeat("a", prefix) + middle + strings.Repeat("z", 129)
					want := strings.Repeat("a", prefix) + expected.String() + strings.Repeat("z", 129)
					assert.Equal(t, EscapeString(text, quote), want)
					var appended strings.Builder
					appended.Grow(len(text) + 2)
					appended.WriteString("prefix:")
					escapeStringWorker(text, quote, getLiteralTextFlagsNeverAsciiEscape, &appended)
					assert.Equal(t, appended.String(), "prefix:"+want)
				}
			}
		}
	}
}

func FuzzEscaping(f *testing.F) {
	for _, text := range []string{
		"", strings.Repeat("a", 129), "\x001\x00x\r\n\n${x}`\\\"'",
		"\u0085\u2028\u2029\u00E9\U0001F600\uFFFD", "\xff\xe2\x80\xed\xa0\x80",
		strings.Repeat("a", 63) + "\r\n\u2028" + strings.Repeat("z", 129),
	} {
		for _, quote := range []QuoteChar{QuoteCharDoubleQuote, QuoteCharSingleQuote, QuoteCharBacktick, '$', '\u2028', -1, 0, '\n', '\\', '\x7f', '\U0001f600'} {
			for _, flags := range []getLiteralTextFlags{0, getLiteralTextFlagsNeverAsciiEscape, getLiteralTextFlagsJsxAttributeEscape, getLiteralTextFlagsJsxAttributeEscape | getLiteralTextFlagsNeverAsciiEscape} {
				f.Add(text, int32(quote), uint8(flags), uint8(3))
			}
		}
	}
	f.Fuzz(func(t *testing.T, text string, quote int32, flags uint8, capacity uint8) {
		var got, want strings.Builder
		if capacity&1 != 0 {
			got.Grow(len(text) + 2)
			want.Grow(len(text) + 2)
		}
		if capacity&2 != 0 {
			got.WriteString("prefix:")
			want.WriteString("prefix:")
		}
		escapeStringWorker(text, QuoteChar(quote), getLiteralTextFlags(flags), &got)
		escapeStringWorkerReference(text, QuoteChar(quote), getLiteralTextFlags(flags), &want)
		assert.Equal(t, got.String(), want.String())
		var reference strings.Builder
		escapeStringWorkerReference(text, QuoteChar(quote), getLiteralTextFlagsNeverAsciiEscape, &reference)
		assert.Equal(t, EscapeString(text, QuoteChar(quote)), reference.String())
	})
}

func BenchmarkEscapeScan(b *testing.B) {
	texts := []filefixture.Fixture{
		filefixture.FromString("short", "", "hello world"),
		filefixture.FromString("ASCII", "", strings.Repeat("a longer plain ASCII string without any escaping ", 256)),
		filefixture.FromString("sparse", "", strings.Repeat("a longer plain ASCII string with an escaped quote \" and caf\u00E9 \U0001F980 ", 200)),
		filefixture.FromString("dense", "", strings.Repeat("\\\"\n\u2028", 1024)),
		filefixture.FromString("rust-ascii-lines", "", strings.Repeat("const value = 123; // source text\r\n", 2048)),
		filefixture.FromString("rust-long-ascii", "", strings.Repeat("identifierWithSeveralLetters_0123456789 ", 2048)),
		filefixture.FromString("rust-sparse-unicode", "", strings.Repeat(strings.Repeat("source text ", 32)+"\u00E9\U0001F600\u2028", 256)),
		filefixture.FromString("rust-dense-unicode", "", strings.Repeat("\u00E9\u20AC\U0001F600\r\n\u2029", 4096)),
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

func BenchmarkEscapePreallocated(b *testing.B) {
	for _, fixture := range fixtures.BenchFixtures {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			text := fixture.ReadFile(b)
			size := len(EscapeString(text, QuoteCharDoubleQuote))
			b.SetBytes(int64(len(text)))
			b.ReportAllocs()
			for b.Loop() {
				var output strings.Builder
				output.Grow(size)
				escapeStringWorker(text, QuoteCharDoubleQuote, getLiteralTextFlagsNeverAsciiEscape, &output)
			}
		})
	}
}
