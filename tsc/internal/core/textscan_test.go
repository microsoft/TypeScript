package core_test

import (
	"slices"
	"strings"
	"testing"
	"unicode/utf16"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/filefixture"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"gotest.tools/v3/assert"
)

func TestTextScanBoundaries(t *testing.T) {
	t.Parallel()
	for prefix := range 130 {
		for _, middle := range []string{
			"", "\n", "\r", "\r\n", "\n\r", "\u2028", "\u2029", "\u0085",
			"\uFEFF", "\u00E9", "\U0001F980", "\xff", "\xe2", "\xe2\x80",
			"\xe2\x80\n", "\xf0\x9f", "\xed\xa0\x80",
			"\n\n\r\r\n\r\n\u2028\u2029",
			strings.Repeat("x\r\n", 33),
			strings.Repeat("\u2028\u2029", 33),
		} {
			for _, suffix := range []string{"", strings.Repeat("z", 129), "\r\nlast\n"} {
				text := strings.Repeat("a", prefix) + middle + suffix
				var length core.UTF16Offset
				for _, r := range text {
					length += core.UTF16Offset(utf16.RuneLen(r))
				}
				assert.Equal(t, core.UTF16Len(text), length, "text: %q", text)

				want := []core.TextPos{0}
				for i := 0; i < len(text); {
					r, size := utf8.DecodeRuneInString(text[i:])
					i += size
					if r == '\r' && i < len(text) && text[i] == '\n' {
						i++
					}
					if stringutil.IsLineBreak(r) {
						want = append(want, core.TextPos(i))
					}
				}
				assert.DeepEqual(t, core.ComputeECMALineStarts(text), core.ECMALineStarts(want))
				var first []core.TextPos
				for pos := range core.ComputeECMALineStartsSeq(text) {
					first = append(first, pos)
					if len(first) == 2 {
						break
					}
				}
				assert.DeepEqual(t, first, want[:min(2, len(want))])
				assert.DeepEqual(t, slices.Collect(core.ComputeECMALineStartsSeq(text)), want)
			}
		}
	}
}

func FuzzECMALineStarts(f *testing.F) {
	for _, text := range []string{
		"", "\r\n", "\n\r\r\n", "\u2028\u2029",
		strings.Repeat("a", 127) + "\r\n\u2028\u2029",
		"\xff\xe2\x80\n\xe2\x80\xa8\xe2\x80\xa9",
	} {
		f.Add(text)
	}
	f.Fuzz(func(t *testing.T, text string) {
		want := core.ECMALineStarts(slices.Collect(core.ComputeECMALineStartsSeq(text)))
		assert.DeepEqual(t, core.ComputeECMALineStarts(text), want)
	})
}

func BenchmarkTextScan(b *testing.B) {
	texts := []filefixture.Fixture{
		filefixture.FromString("short", "", "const x = 1;"),
		filefixture.FromString("ASCII", "", strings.Repeat("const variable = someFunction(argument1, argument2);\n", 200)),
		filefixture.FromString("mixed", "", strings.Repeat("const caf\u00E9 = \"h\u00E9llo \U0001F980\"; // a longer ASCII comment for scanning\n", 200)),
		filefixture.FromString("Unicode", "", strings.Repeat("\u65E5\u672C\u8A9E\U0001F980\u2028", 400)),
		filefixture.FromString("CRLF", "", strings.Repeat("const variable = someFunction(argument1, argument2);\r\n", 200)),
		filefixture.FromString("longLine", "", strings.Repeat("a", 16384)),
		filefixture.FromString("shortLines", "", strings.Repeat("x\r\n", 4096)),
	}
	for _, fixture := range append(texts, fixtures.BenchFixtures...) {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			text := fixture.ReadFile(b)
			b.Run("UTF16Len", func(b *testing.B) {
				b.SetBytes(int64(len(text)))
				b.ReportAllocs()
				for b.Loop() {
					core.UTF16Len(text)
				}
			})
			b.Run("LineStarts", func(b *testing.B) {
				b.SetBytes(int64(len(text)))
				b.ReportAllocs()
				for b.Loop() {
					core.ComputeECMALineStarts(text)
				}
			})
		})
	}
}
