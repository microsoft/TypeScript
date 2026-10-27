//go:build goexperiment.simd

package core

import (
	"math/bits"
	"simd"
	"strings"
	"unsafe"
)

func lineBreakBits(word uint64) uint64 {
	// Pack the low bit of each byte into the low eight bits. The multiply
	// places source byte i at bit 56+i without overlapping partial products.
	return ((word & 0x0101010101010101) * 0x0102040810204080) >> 56
}

func computeECMALineStarts(text string) ECMALineStarts {
	result := make(ECMALineStarts, 1, strings.Count(text, "\n")+1)
	length := int(TextPos(len(text)))
	if length <= 0 {
		return result
	}
	text = text[:length]
	// Read-only loads avoid copying the source text into a byte slice.
	bytes := unsafe.Slice(unsafe.StringData(text), len(text))
	width := (simd.Uint8s{}).Len()
	cr := simd.BroadcastUint8s('\r')
	lf := simd.BroadcastUint8s('\n')
	separator := simd.BroadcastUint8s(0xe2)
	mask := make([]uint64, (simd.Uint64s{}).Len())
	pos := 0
	for len(text)-pos >= width {
		v := simd.LoadUint8s(bytes[pos:])
		v.Equal(cr).Or(v.Equal(lf)).Or(v.Equal(separator)).ToInt8s().ToBits().ReshapeToUint64s().Store(mask)
		for word := 0; word < len(mask); word += 2 {
			lo := mask[word]
			var hi uint64
			if word+1 < len(mask) {
				hi = mask[word+1]
			}
			if lo|hi == 0 {
				continue
			}
			matches := lineBreakBits(lo) | lineBreakBits(hi)<<8
			for matches != 0 {
				index := pos + word*8 + bits.TrailingZeros64(matches)
				matches &= matches - 1
				if end := ecmaLineBreakEnd(text, index); end != 0 {
					result = append(result, TextPos(end))
					if end == index+2 {
						// The next candidate is the LF of this CRLF pair.
						matches &= matches - 1
					}
				}
			}
		}
		pos += width
	}
	for ; pos < len(text); pos++ {
		if end := ecmaLineBreakEnd(text, pos); end != 0 {
			result = append(result, TextPos(end))
			pos = end - 1
		}
	}
	return result
}
