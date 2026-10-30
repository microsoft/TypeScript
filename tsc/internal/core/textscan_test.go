package core_test

import (
	"runtime"
	"slices"
	"strconv"
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
			"\u2027", "\u202A", "\u20AC", "\xe2\x80\xff", "\xe2\r\n", "\r\u2028\n",
			"\n\n\r\r\n\r\n\u2028\u2029",
			strings.Repeat("x\r\n", 33),
			strings.Repeat("\u2028\u2029", 33),
			strings.Repeat("\r\n\r\r\n\n\u2028\u2029", 33),
		} {
			for _, suffix := range []string{"", strings.Repeat("z", 129), "\r\nlast\n"} {
				text := strings.Repeat("a", prefix) + middle + suffix
				var length core.UTF16Offset
				for _, r := range text {
					length += core.UTF16Offset(utf16.RuneLen(r))
				}
				assert.Equal(t, core.UTF16Len(text), length, "text: %q", text)

				want := referenceECMALineStarts(text)
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

func referenceECMALineStarts(text string) []core.TextPos {
	result := []core.TextPos{0}
	for pos := 0; pos < len(text); {
		r, size := utf8.DecodeRuneInString(text[pos:])
		pos += size
		if r == '\r' && pos < len(text) && text[pos] == '\n' {
			pos++
		}
		if stringutil.IsLineBreak(r) {
			result = append(result, core.TextPos(pos))
		}
	}
	return result
}

func TestUTF16LenShort(t *testing.T) {
	t.Parallel()
	for padding := range 130 {
		for _, suffix := range []string{"", "\u00e9", "\u65e5\u672c\u8a9e", "\U0001f600", "\xff", "\xe2\x80", "\xed\xa0\x80"} {
			text := strings.Repeat("a", padding) + suffix
			for end := range min(len(text), 129) + 1 {
				var want core.UTF16Offset
				for _, r := range text[:end] {
					want += core.UTF16Offset(utf16.RuneLen(r))
				}
				assert.Equal(t, core.UTF16Len(text[:end]), want, "text: %q", text[:end])
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
		want := referenceECMALineStarts(text)
		assert.DeepEqual(t, core.ComputeECMALineStarts(text), core.ECMALineStarts(want))
		assert.DeepEqual(t, slices.Collect(core.ComputeECMALineStartsSeq(text)), want)
	})
}

func BenchmarkTextScan(b *testing.B) {
	texts := []filefixture.Fixture{
		filefixture.FromString("short", "", "const x = 1;"),
		filefixture.FromString("shortUnicode", "", "caf\u00e9 \U0001f600"),
		filefixture.FromString("shortInvalid", "", "a\xf0\x9f"),
		filefixture.FromString("ASCII", "", strings.Repeat("const variable = someFunction(argument1, argument2);\n", 200)),
		filefixture.FromString("mixed", "", strings.Repeat("const caf\u00E9 = \"h\u00E9llo \U0001F980\"; // a longer ASCII comment for scanning\n", 200)),
		filefixture.FromString("Unicode", "", strings.Repeat("\u65E5\u672C\u8A9E\U0001F980\u2028", 400)),
		filefixture.FromString("CRLF", "", strings.Repeat("const variable = someFunction(argument1, argument2);\r\n", 200)),
		filefixture.FromString("longLine", "", strings.Repeat("a", 16384)),
		filefixture.FromString("shortLines", "", strings.Repeat("x\r\n", 4096)),
	}

	for _, length := range []int{1, 4, 8, 15, 16, 17, 31, 32, 33, 63, 64, 65, 127, 128} {
		texts = append(texts, filefixture.FromString("ASCII"+strconv.Itoa(length), "", strings.Repeat("a", length)))
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

func BenchmarkECMALineStartsSeq(b *testing.B) {
	texts := []filefixture.Fixture{
		filefixture.FromString("short", "", "const x = 1;"),
		filefixture.FromString("ASCII1", "", "a"),
		filefixture.FromString("ASCII15", "", strings.Repeat("a", 15)),
		filefixture.FromString("shortUnicode", "", "caf\u00e9 \U0001f600"),
		filefixture.FromString("shortInvalid", "", "a\xf0\x9f"),
		filefixture.FromString("shortLines", "", strings.Repeat("x\r\n", 4096)),
		filefixture.FromString("Unicode", "", strings.Repeat("\u65E5\u672C\u8A9E\U0001F980\u2028", 400)),
	}
	for _, fixture := range append(texts, fixtures.BenchFixtures...) {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			text := fixture.ReadFile(b)
			b.SetBytes(int64(len(text)))
			b.ReportAllocs()
			var last core.TextPos
			for b.Loop() {
				for pos := range core.ComputeECMALineStartsSeq(text) {
					last = pos
				}
			}
			runtime.KeepAlive(last)
		})
	}
}
