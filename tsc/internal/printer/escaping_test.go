package printer

import (
	"fmt"
	"strings"
	"testing"
)

func TestEscapingAllocations(t *testing.T) { //nolint:paralleltest // AllocsPerRun changes GOMAXPROCS.
	for _, text := range []string{
		"", "hello world", "caf\u00E9 \U0001F600",
		strings.Repeat("plain ASCII text ", 128),
		strings.Repeat("caf\u00E9 \U0001F600 ", 128),
	} {
		if allocations := testing.AllocsPerRun(25, func() {
			EscapeString(text, QuoteCharDoubleQuote)
		}); allocations != 0 {
			t.Fatalf("unchanged text allocated %v times", allocations)
		}
	}

	text := strings.Repeat("abc\n", 4)
	if allocations := testing.AllocsPerRun(25, func() {
		EscapeString(text, QuoteCharDoubleQuote)
	}); allocations != 1 {
		t.Fatalf("small escaped text allocated %v times, want one output buffer", allocations)
	}
}

func TestEncodeUTF16Escape(t *testing.T) {
	t.Parallel()
	for ch := rune(0); ch <= 0xffff; ch++ {
		var b strings.Builder
		encodeUtf16EscapeSequence(&b, ch)
		if got, want := b.String(), fmt.Sprintf(`\u%04X`, ch); got != want {
			t.Fatalf("escape %U: got %q, want %q", ch, got, want)
		}
	}
}
