//go:build goexperiment.simd

package stringutil

import (
	"simd"
	"testing"
)

func TestFirstNonzeroByte(t *testing.T) {
	t.Parallel()
	for _, length := range []int{16, 24, 32, 64, 128, 256} {
		mask := make([]uint64, length/8)
		if got := firstNonzeroByte(mask); got != length {
			t.Fatalf("zero mask length %d: got %d", length, got)
		}
		for i := range length {
			for _, value := range []byte{1, 0x80, 0xff} {
				mask[i/8] = uint64(value) << ((i % 8) * 8)
				if got := firstNonzeroByte(mask); got != i {
					t.Fatalf("length %d, byte %d=%x: got %d", length, i, value, got)
				}
			}
			mask[i/8] = 0
		}
	}
}

func TestSIMDMaskByteOrder(t *testing.T) {
	t.Parallel()
	bytes := make([]byte, (simd.Uint8s{}).Len())
	words := make([]uint64, (simd.Uint64s{}).Len())
	for i := range bytes {
		bytes[i] = 0xff
		simd.LoadUint8s(bytes).ReshapeToUint64s().Store(words)
		if got := firstNonzeroByte(words); got != i {
			t.Fatalf("byte %d: got %d", i, got)
		}
		bytes[i] = 0
	}
}
