package stringutil

import (
	"strconv"
	"strings"
	"testing"
)

func TestTextScanMultipleCandidates(t *testing.T) {
	t.Parallel()
	for prefix := range 130 {
		for gap := range 66 {
			for _, middle := range []string{"\n", "\r\n", "\xe2", "\"", "\\", "$", "\x00", "\xff"} {
				text := strings.Repeat("a", prefix) + middle + strings.Repeat("b", gap) + middle + strings.Repeat("c", 129)
				checkTextScan(t, text)
			}
		}
	}
}

func BenchmarkTextScanPrefixes(b *testing.B) {
	for _, length := range []int{8, 16, 31, 32, 63, 64, 127, 128, 1024} {
		b.Run(strconv.Itoa(length), func(b *testing.B) {
			b.Run("LineBreak", func(b *testing.B) {
				text := strings.Repeat("a", length) + "\n" + strings.Repeat("z", 128)
				b.SetBytes(int64(length + 1))
				b.ReportAllocs()
				for b.Loop() {
					LineBreakPrefixLen(text)
				}
			})
			b.Run("Escape", func(b *testing.B) {
				text := strings.Repeat("a", length) + "\"" + strings.Repeat("z", 128)
				b.SetBytes(int64(length + 1))
				b.ReportAllocs()
				for b.Loop() {
					UnescapedASCIIPrefixLen(text, '"')
				}
			})
		})
	}
}

func checkTextScan(t *testing.T, text string) {
	t.Helper()
	if got, want := ASCIIPrefixLen(text), asciiPrefixLen(text); got != want {
		t.Fatalf("ASCIIPrefixLen(%q) = %d, want %d", text, got, want)
	}
	if got, want := LineBreakPrefixLen(text), lineBreakPrefixLen(text); got != want {
		t.Fatalf("LineBreakPrefixLen(%q) = %d, want %d", text, got, want)
	}
	for _, quote := range []byte{0, '\'', '"', '`', 0xff} {
		if got, want := UnescapedASCIIPrefixLen(text, quote), unescapedASCIIPrefixLen(text, quote); got != want {
			t.Fatalf("UnescapedASCIIPrefixLen(%q, %q) = %d, want %d", text, quote, got, want)
		}
	}
}

func TestTextScanBytes(t *testing.T) {
	t.Parallel()
	for prefix := range 130 {
		padding := strings.Repeat("a", prefix)
		checkTextScan(t, padding)
		for b := range 256 {
			text := padding + string(byte(b)) + strings.Repeat("z", 129)
			checkTextScan(t, text)
			checkTextScan(t, text[1:])
			checkTextScan(t, text[:prefix+1])
		}
	}
}

func FuzzTextScan(f *testing.F) {
	for _, seed := range []string{
		"", "a", strings.Repeat("a", 1024), "\r\n\u2028\u2029",
		"\xff\xe2\x80\xf0\x9f", "abc\"${\\\x00", "\u00E9\U0001F980",
	} {
		f.Add(seed)
	}
	f.Fuzz(func(t *testing.T, text string) {
		checkTextScan(t, text)
	})
}
