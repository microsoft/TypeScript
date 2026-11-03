//go:build goexperiment.simd

package core

import "testing"

func TestLineBreakBits(t *testing.T) {
	t.Parallel()
	for mask := range 256 {
		var bytes uint64
		for i := range 8 {
			if mask&(1<<i) != 0 {
				bytes |= 0xff << (i * 8)
			}
		}
		if got := lineBreakBits(bytes); got != uint64(mask) {
			t.Fatalf("lineBreakBits(%x) = %x, want %x", bytes, got, mask)
		}
	}
}
