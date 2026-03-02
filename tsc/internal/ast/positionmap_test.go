package ast_test

import (
	"os"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
)

func TestPositionMapASCII(t *testing.T) {
	t.Parallel()
	text := "const x = 1;"
	pm := ast.ComputePositionMap(text)
	if !pm.IsAsciiOnly() {
		t.Fatal("expected ASCII-only")
	}
	for i := 0; i <= len(text); i++ {
		if got := pm.UTF8ToUTF16(i); got != i {
			t.Errorf("UTF8ToUTF16(%d) = %d, want %d", i, got, i)
		}
		if got := pm.UTF16ToUTF8(i); got != i {
			t.Errorf("UTF16ToUTF8(%d) = %d, want %d", i, got, i)
		}
	}
}

func TestPositionMapTwoByte(t *testing.T) {
	t.Parallel()
	// "café" — é (U+00E9) is 2 bytes UTF-8, 1 code unit UTF-16
	text := "const café = 1;\nconst x = 2;"
	pm := ast.ComputePositionMap(text)
	if pm.IsAsciiOnly() {
		t.Fatal("expected non-ASCII")
	}

	// Everything before é (byte offset 9) should be identity
	for i := range 10 {
		if got := pm.UTF8ToUTF16(i); got != i {
			t.Errorf("before é: UTF8ToUTF16(%d) = %d, want %d", i, got, i)
		}
	}

	// é starts at UTF-8 byte 9, UTF-16 offset 9: same
	if got := pm.UTF8ToUTF16(9); got != 9 {
		t.Errorf("at é: UTF8ToUTF16(9) = %d, want 9", got)
	}

	// After é (byte 11 in UTF-8 = code unit 10 in UTF-16), delta is 1
	// ' ' after café: UTF-8 byte 11, UTF-16 offset 10
	if got := pm.UTF8ToUTF16(11); got != 10 {
		t.Errorf("after é: UTF8ToUTF16(11) = %d, want 10", got)
	}

	// 'x' on second line: UTF-8 byte 23, UTF-16 offset 22
	xUTF8 := strings.LastIndex(text, "x")
	if got := pm.UTF8ToUTF16(xUTF8); got != xUTF8-1 {
		t.Errorf("at x: UTF8ToUTF16(%d) = %d, want %d", xUTF8, got, xUTF8-1)
	}

	// Reverse: UTF-16 offset 22 should map to UTF-8 byte 23
	xUTF16 := xUTF8 - 1
	if got := pm.UTF16ToUTF8(xUTF16); got != xUTF8 {
		t.Errorf("reverse at x: UTF16ToUTF8(%d) = %d, want %d", xUTF16, got, xUTF8)
	}
}

func TestPositionMapFourByte(t *testing.T) {
	t.Parallel()
	// 🎉 (U+1F389) is 4 bytes UTF-8, 2 code units UTF-16
	text := `const a = "🎉";` + "\nconst b = 2;"
	pm := ast.ComputePositionMap(text)
	if pm.IsAsciiOnly() {
		t.Fatal("expected non-ASCII")
	}

	// 🎉 starts at byte 11 (after `const a = "`)
	// UTF-8: bytes 11-14 (4 bytes), UTF-16: units 11-12 (2 code units)
	// After 🎉: UTF-8 byte 15, UTF-16 offset 13. Delta = 2.

	// 'b' on second line
	bUTF8 := strings.LastIndex(text, "b")
	bUTF16 := bUTF8 - 2 // delta of 2 from emoji
	if got := pm.UTF8ToUTF16(bUTF8); got != bUTF16 {
		t.Errorf("at b: UTF8ToUTF16(%d) = %d, want %d", bUTF8, got, bUTF16)
	}
	if got := pm.UTF16ToUTF8(bUTF16); got != bUTF8 {
		t.Errorf("reverse at b: UTF16ToUTF8(%d) = %d, want %d", bUTF16, got, bUTF8)
	}
}

func TestPositionMapMultipleNonASCII(t *testing.T) {
	t.Parallel()
	// Mix of 2-byte and 4-byte characters
	// "à" (U+00E0) = 2 bytes UTF-8, 1 code unit UTF-16 (delta +1)
	// "🎉" (U+1F389) = 4 bytes UTF-8, 2 code units UTF-16 (delta +2)
	text := "à🎉x"
	pm := ast.ComputePositionMap(text)

	// à: UTF-8 [0,2), UTF-16 [0,1)
	// 🎉: UTF-8 [2,6), UTF-16 [1,3)
	// x: UTF-8 [6,7), UTF-16 [3,4)
	tests := []struct {
		utf8  int
		utf16 int
	}{
		{0, 0},
		{2, 1}, // start of 🎉
		{6, 3}, // x
		{7, 4}, // end
	}
	for _, tt := range tests {
		if got := pm.UTF8ToUTF16(tt.utf8); got != tt.utf16 {
			t.Errorf("UTF8ToUTF16(%d) = %d, want %d", tt.utf8, got, tt.utf16)
		}
		if got := pm.UTF16ToUTF8(tt.utf16); got != tt.utf8 {
			t.Errorf("UTF16ToUTF8(%d) = %d, want %d", tt.utf16, got, tt.utf8)
		}
	}
}

func TestPositionMapRoundtrip(t *testing.T) {
	t.Parallel()
	text := "let café = \"🎉\"; // naïve"
	pm := ast.ComputePositionMap(text)

	// Convert every valid UTF-16 position to UTF-8 and back
	utf16Len := pm.UTF8ToUTF16(len(text))
	for i := 0; i <= utf16Len; i++ {
		utf8Pos := pm.UTF16ToUTF8(i)
		back := pm.UTF8ToUTF16(utf8Pos)
		if back != i {
			t.Errorf("roundtrip UTF16->UTF8->UTF16: %d -> %d -> %d", i, utf8Pos, back)
		}
	}
}

func BenchmarkComputePositionMap_ASCII(b *testing.B) {
	// ~10KB of ASCII TypeScript-like code
	line := "const variable = someFunction(argument1, argument2);\n"
	text := strings.Repeat(line, 200)
	b.ResetTimer()
	for range b.N {
		ast.ComputePositionMap(text)
	}
}

func BenchmarkComputePositionMap_NonASCII(b *testing.B) {
	// Mix of ASCII and non-ASCII (comments with unicode)
	line := "const café = \"héllo wörld 🎉\";\n"
	text := strings.Repeat(line, 200)
	b.ResetTimer()
	for range b.N {
		ast.ComputePositionMap(text)
	}
}

func BenchmarkUTF8ToUTF16_ASCII(b *testing.B) {
	line := "const variable = someFunction(argument1, argument2);\n"
	text := strings.Repeat(line, 200)
	pm := ast.ComputePositionMap(text)
	positions := []int{0, 100, 500, 1000, 5000, len(text) - 1}
	b.ResetTimer()
	for range b.N {
		for _, p := range positions {
			pm.UTF8ToUTF16(p)
		}
	}
}

func BenchmarkUTF8ToUTF16_NonASCII(b *testing.B) {
	line := "const café = \"héllo wörld 🎉\";\n"
	text := strings.Repeat(line, 200)
	pm := ast.ComputePositionMap(text)
	positions := []int{0, 100, 500, 1000, 5000, len(text) - 1}
	b.ResetTimer()
	for range b.N {
		for _, p := range positions {
			pm.UTF8ToUTF16(p)
		}
	}
}

func BenchmarkUTF16ToUTF8_NonASCII(b *testing.B) {
	line := "const café = \"héllo wörld 🎉\";\n"
	text := strings.Repeat(line, 200)
	pm := ast.ComputePositionMap(text)
	utf16Len := pm.UTF8ToUTF16(len(text))
	positions := []int{0, 100, 500, 1000, 3000, utf16Len - 1}
	b.ResetTimer()
	for range b.N {
		for _, p := range positions {
			pm.UTF16ToUTF8(p)
		}
	}
}

func BenchmarkComputePositionMap_CheckerTS(b *testing.B) {
	data, err := os.ReadFile("../../_submodules/TypeScript/src/compiler/checker.ts")
	if err != nil {
		b.Skip("checker.ts not available:", err)
	}
	text := string(data)
	b.ResetTimer()
	for range b.N {
		ast.ComputePositionMap(text)
	}
}
