package lsproto

import (
	"cmp"
)

// Implements a cmp.Compare like function for two Position
// ComparePositions(pos, other) == cmp.Compare(pos, other)
func ComparePositions(pos, other Position) int {
	if lineComp := cmp.Compare(pos.Line, other.Line); lineComp != 0 {
		return lineComp
	}
	return cmp.Compare(pos.Character, other.Character)
}

// Implements a cmp.Compare like function for two *Range
// CompareRanges(lsRange, other) == cmp.Compare(lsrange, other)
//
//	Range.Start is compared before Range.End
func CompareRanges(lsRange, other *Range) int {
	if startComp := ComparePositions(lsRange.Start, other.Start); startComp != 0 {
		return startComp
	}
	return ComparePositions(lsRange.End, other.End)
}
