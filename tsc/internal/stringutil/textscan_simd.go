//go:build goexperiment.simd

package stringutil

import (
	"math/bits"
	"simd"
	"unsafe"
)

// Keep this small enough to inline: it is called once per vector.
// ReshapeToUint64s places each group's first byte in the low bits.
// A full SIMD mask has at least two uint64 lanes.
func firstNonzeroByte(mask []uint64) int {
	lo, hi := mask[0], mask[1]
	if lo != 0 {
		return bits.TrailingZeros64(lo) / 8
	}
	if hi != 0 {
		return 8 + bits.TrailingZeros64(hi)/8
	}
	for i := 2; i < len(mask); i++ {
		if word := mask[i]; word != 0 {
			return i*8 + bits.TrailingZeros64(word)/8
		}
	}
	return len(mask) * 8
}

func asciiPrefixLenLong(text string) int {
	width := (simd.Uint8s{}).Len()
	if len(text) < width || text[0] >= 0x80 {
		return asciiPrefixLen(text)
	}
	// SIMD loads only read this view; converting to []byte would copy the input.
	bytes := unsafe.Slice(unsafe.StringData(text), len(text))
	highBit := simd.BroadcastUint8s(0x80)
	// Go 1.27 has no portable mask reduction. Store machine words and reduce
	// them without assuming a vector width or the machine's byte order.
	words := make([]uint64, (simd.Uint64s{}).Len())
	i := 0
	for len(text)-i >= width {
		simd.LoadUint8s(bytes[i:]).And(highBit).ReshapeToUint64s().Store(words)
		var combined uint64
		for _, word := range words {
			combined |= word
		}
		if combined != 0 {
			break
		}
		i += width
	}
	return i + asciiPrefixLen(text[i:])
}

// LineBreakPrefixLen returns the byte offset of the first possible ECMAScript
// line break (CR, LF, or the leading byte of U+2028/U+2029), or len(text).
func LineBreakPrefixLen(text string) int {
	if len(text) < 16 {
		return lineBreakPrefixLen(text)
	}
	return lineBreakPrefixLenLong(text)
}

func lineBreakPrefixLenLong(text string) int {
	width := (simd.Uint8s{}).Len()
	if len(text) < width || text[0] == '\r' || text[0] == '\n' || text[0] == 0xe2 {
		return lineBreakPrefixLen(text)
	}
	bytes := unsafe.Slice(unsafe.StringData(text), len(text))
	cr := simd.BroadcastUint8s('\r')
	lf := simd.BroadcastUint8s('\n')
	separator := simd.BroadcastUint8s(0xe2)
	mask := make([]uint64, (simd.Uint64s{}).Len())
	i := 0
	for len(text)-i >= width {
		v := simd.LoadUint8s(bytes[i:])
		v.Equal(cr).Or(v.Equal(lf)).Or(v.Equal(separator)).ToInt8s().ToBits().ReshapeToUint64s().Store(mask)
		if offset := firstNonzeroByte(mask); offset < width {
			return i + offset
		}
		i += width
	}
	return i + lineBreakPrefixLen(text[i:])
}

// UnescapedASCIIPrefixLen returns the length of the ASCII prefix that needs no
// escaping. It conservatively stops at all controls, backslashes, and template dollars.
func UnescapedASCIIPrefixLen(text string, quote byte) int {
	if len(text) < 16 {
		return unescapedASCIIPrefixLen(text, quote)
	}
	return unescapedASCIIPrefixLenLong(text, quote)
}

func unescapedASCIIPrefixLenLong(text string, quote byte) int {
	width := (simd.Uint8s{}).Len()
	if len(text) < width || unescapedASCIIPrefixLen(text[:1], quote) == 0 {
		return unescapedASCIIPrefixLen(text, quote)
	}
	bytes := unsafe.Slice(unsafe.StringData(text), len(text))
	space := simd.BroadcastInt8s(0x20)
	backslash := simd.BroadcastUint8s('\\')
	quoteVector := simd.BroadcastUint8s(quote)
	dollar := simd.BroadcastUint8s('$')
	matches := make([]uint64, (simd.Uint64s{}).Len())
	i := 0
	for len(text)-i >= width {
		v := simd.LoadUint8s(bytes[i:])
		// Signed comparison includes both controls and non-ASCII bytes.
		mask := v.BitsToInt8().Less(space).Or(v.Equal(backslash)).Or(v.Equal(quoteVector))
		if quote == '`' {
			mask = mask.Or(v.Equal(dollar))
		}
		mask.ToInt8s().ToBits().ReshapeToUint64s().Store(matches)
		if offset := firstNonzeroByte(matches); offset < width {
			return i + offset
		}
		i += width
	}
	return i + unescapedASCIIPrefixLen(text[i:], quote)
}
