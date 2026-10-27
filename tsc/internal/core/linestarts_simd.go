//go:build goexperiment.simd

package core

import (
	"math/bits"
	"simd"
	"strings"
	"unsafe"
)

func ecmaLineBreakEnd(text string, pos int) int {
	switch text[pos] {
	case '\r':
		if pos+1 < len(text) && text[pos+1] == '\n' {
			return pos + 2
		}
		return pos + 1
	case '\n':
		if pos == 0 || text[pos-1] != '\r' {
			return pos + 1
		}
	case 0xe2:
		// U+2028 and U+2029 differ only in the low bit of their final byte.
		if pos+2 < len(text) && text[pos+1] == 0x80 && text[pos+2]&0xfe == 0xa8 {
			return pos + 3
		}
	}
	return 0
}

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
		word := 0
		for ; len(mask)-word >= 2; word += 2 {
			lo := mask[word]
			hi := mask[word+1]
			if lo|hi == 0 {
				continue
			}
			matches := lineBreakBits(lo) | lineBreakBits(hi)<<8
			for matches != 0 {
				index := pos + word*8 + bits.TrailingZeros64(matches)
				matches &= matches - 1
				if end := ecmaLineBreakEnd(text, index); end != 0 {
					result = append(result, TextPos(end))
				}
			}
		}
		if word < len(mask) {
			matches := lineBreakBits(mask[word])
			for matches != 0 {
				index := pos + word*8 + bits.TrailingZeros64(matches)
				matches &= matches - 1
				if end := ecmaLineBreakEnd(text, index); end != 0 {
					result = append(result, TextPos(end))
				}
			}
		}
		pos += width
	}
	for ; pos < len(text); pos++ {
		if end := ecmaLineBreakEnd(text, pos); end != 0 {
			result = append(result, TextPos(end))
		}
	}
	return result
}
