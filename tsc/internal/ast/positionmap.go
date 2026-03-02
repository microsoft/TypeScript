package ast

import (
	"unicode/utf8"
)

// PositionMap provides bidirectional mapping between UTF-8 byte offsets (used by Go)
// and UTF-16 code unit offsets (used by JavaScript/TypeScript).
//
// For ASCII-only text, the two are identical. For text containing non-ASCII characters,
// the offsets diverge because multi-byte UTF-8 sequences map to different numbers of
// UTF-16 code units:
//   - U+0000..U+007F:   1 byte  in UTF-8, 1 code unit  in UTF-16
//   - U+0080..U+07FF:   2 bytes in UTF-8, 1 code unit  in UTF-16
//   - U+0800..U+FFFF:   3 bytes in UTF-8, 1 code unit  in UTF-16
//   - U+10000..U+10FFFF: 4 bytes in UTF-8, 2 code units in UTF-16 (surrogate pair)
type PositionMap struct {
	// asciiOnly is true if the text contains only ASCII characters,
	// meaning UTF-8 byte offsets and UTF-16 code unit offsets are identical.
	asciiOnly bool
	// For each multi-byte character, we store:
	//   - the UTF-8 byte offset of the character
	//   - the cumulative delta (utf8Offset - utf16Offset) at that character
	// This allows O(log n) conversion in either direction.
	//
	// entries[i].utf8Pos is the byte offset of the i-th multi-byte character.
	// entries[i].delta is the total (utf8 - utf16) difference accumulated
	// through and including the i-th multi-byte character.
	entries []positionMapEntry
}

type positionMapEntry struct {
	utf8Pos int // UTF-8 byte offset AFTER this multi-byte character
	delta   int // cumulative (utf8 - utf16) offset difference after this character
}

// ComputePositionMap builds a PositionMap for the given text.
func ComputePositionMap(text string) *PositionMap {
	pm := &PositionMap{}
	delta := 0
	for i := 0; i < len(text); {
		b := text[i]
		if b < utf8.RuneSelf {
			i++
			continue
		}
		r, size := utf8.DecodeRuneInString(text[i:])
		utf16Size := 1
		if r >= 0x10000 {
			utf16Size = 2
		}
		delta += size - utf16Size
		pm.entries = append(pm.entries, positionMapEntry{utf8Pos: i + size, delta: delta})
		i += size
	}
	pm.asciiOnly = len(pm.entries) == 0
	return pm
}

// IsAsciiOnly returns true if the text is ASCII-only,
// meaning UTF-8 and UTF-16 offsets are identical.
func (pm *PositionMap) IsAsciiOnly() bool {
	return pm.asciiOnly
}

// UTF8ToUTF16 converts a UTF-8 byte offset to a UTF-16 code unit offset.
func (pm *PositionMap) UTF8ToUTF16(utf8Offset int) int {
	if pm.asciiOnly {
		return utf8Offset
	}
	// Binary search: find the last entry where utf8Pos <= utf8Offset
	lo, hi := 0, len(pm.entries)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if pm.entries[mid].utf8Pos <= utf8Offset {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	if lo == 0 {
		// Before any multi-byte character
		return utf8Offset
	}
	return utf8Offset - pm.entries[lo-1].delta
}

// UTF16ToUTF8 converts a UTF-16 code unit offset to a UTF-8 byte offset.
func (pm *PositionMap) UTF16ToUTF8(utf16Offset int) int {
	if pm.asciiOnly {
		return utf16Offset
	}
	// We need the last entry where (utf8Pos - delta) <= utf16Offset.
	// (utf8Pos - delta) is the UTF-16 offset of that entry's character.
	lo, hi := 0, len(pm.entries)
	for lo < hi {
		mid := lo + (hi-lo)/2
		utf16Pos := pm.entries[mid].utf8Pos - pm.entries[mid].delta
		if utf16Pos <= utf16Offset {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	if lo == 0 {
		return utf16Offset
	}
	return utf16Offset + pm.entries[lo-1].delta
}
