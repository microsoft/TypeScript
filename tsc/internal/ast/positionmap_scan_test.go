package ast_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
)

func TestPositionMapScanBoundaries(t *testing.T) {
	t.Parallel()
	for prefix := range 130 {
		for _, middle := range []string{
			"", "\u00E9", "\u65E5", "\U0001F980", "\xff", "\xe2\x80",
			stringutil.EncodeJSStringRune(0xD800), "\u00E9a\U0001F980",
		} {
			text := strings.Repeat("a", prefix) + middle + strings.Repeat("z", 129)
			pm := ast.ComputePositionMap(text)
			type entry struct{ bytePos, delta int }
			var entries []entry
			delta := 0
			for i := 0; i < len(text); {
				r, size := stringutil.DecodeJSStringRune(text[i:])
				units := 1
				if r >= 0x10000 {
					units = 2
				}
				if text[i] >= 0x80 {
					delta += size - units
					entries = append(entries, entry{i + size, delta})
				}
				i += size
			}
			if pm.IsAsciiOnly() != (len(entries) == 0) {
				t.Fatalf("IsAsciiOnly for %q", text)
			}
			for pos := 0; pos <= len(text); pos++ {
				want16, want8 := pos, pos
				for _, e := range entries {
					if e.bytePos <= pos {
						want16 = pos - e.delta
					}
					if e.bytePos-e.delta <= pos {
						want8 = pos + e.delta
					}
				}
				if got := pm.UTF8ToUTF16(pos); got != want16 {
					t.Fatalf("UTF8ToUTF16(%d) = %d, want %d for %q", pos, got, want16, text)
				}
				if got := pm.UTF16ToUTF8(pos); got != want8 {
					t.Fatalf("UTF16ToUTF8(%d) = %d, want %d for %q", pos, got, want8, text)
				}
			}
		}
	}
}

func BenchmarkPositionMapScan(b *testing.B) {
	for _, fixture := range fixtures.BenchFixtures {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			text := fixture.ReadFile(b)
			b.SetBytes(int64(len(text)))
			b.ReportAllocs()
			for b.Loop() {
				ast.ComputePositionMap(text)
			}
		})
	}
}
