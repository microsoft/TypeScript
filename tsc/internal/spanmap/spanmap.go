// Package spanmap provides bidirectional span-aware mapping between a content mapper's virtual text
// and its original, untransformed source. Unlike a source map, which records
// point correspondences and leaves spans and "no origin" implicit, a SpanMap records explicit segments
// for the parts of the virtual text that correspond to the original; positions not covered by any
// segment are synthesized (virtual content with no original counterpart). All positions are absolute
// offsets (core.TextPos), matching the compiler's TextRange model.
package spanmap

// Keep this in sync with spanMap.ts

import (
	"fmt"
	"slices"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

// Kind describes how positions inside a segment relate the virtual span to the original span.
type Kind int32

const (
	// KindVerbatim segments are length-preserving: the virtual and original spans have the same
	// length and interior positions map 1:1 (OriginalPos = pos - VirtualStart + OriginalStart). A virtual span
	// fully within a verbatim segment maps to an exact original span.
	KindVerbatim Kind = iota
	// KindAtom segments map a virtual span to an original span as a whole; interior positions are not
	// interpolatable (the lengths may differ), so positions within clamp to the segment's endpoints.
	// Used for renamed identifiers or short expressions.
	KindAtom
	// KindAlias has atom geometry, but additionally asserts that the virtual and original texts are
	// names for the same logical entity. Diagnostic presentation may substitute the original name.
	KindAlias
)

// Feature selects which language-service operations may use a segment. Diagnostics are intentionally not
// represented: diagnostics on virtual text may not opt out of reporting. Text edits additionally require exact
// verbatim geometry regardless of feature participation.
type Feature int32

const (
	FeatureHover Feature = 1 << iota
	FeatureSignatureHelp
	FeatureCompletion
	FeatureDefinition
	FeatureTypeDefinition
	FeatureImplementation
	FeatureReferences
	FeatureDocumentHighlights
	FeatureRename
	FeatureCallHierarchy
	FeatureCodeActions
	FeatureFormatting
	FeatureInlayHints
	FeatureSemanticTokens
	FeatureFoldingRanges
	FeatureSelectionRanges
	FeatureLinkedEditing
	FeatureAutoInsert
	FeatureDocumentSymbols
	FeatureCodeLens
	FeatureNone Feature = 0
	FeatureAll  Feature = (FeatureCodeLens << 1) - 1
)

const featureMask = FeatureAll

// Fidelity describes how faithfully a mapped span reflects the original.
type Fidelity int32

const (
	// FidelityExact means the span fell entirely within a single verbatim segment and maps precisely.
	FidelityExact Fidelity = iota
	// FidelityAtom means the span fell within a single atom segment and maps to that atom's span.
	FidelityAtom
	// FidelityApproximate means the span crossed segment boundaries; its endpoints were mapped and clamped.
	FidelityApproximate
	// FidelityNone means the span had no original counterpart (it was entirely synthesized).
	FidelityNone
)

// IsExact reports whether the mapping was fully faithful — the input fell within a single verbatim span —
// so the result maps 1:1 and can host a text edit written back to the original.
func (f Fidelity) IsExact() bool {
	return f == FidelityExact
}

// IsSingleSegment reports whether the input fell within one segment, verbatim or atom, so the result is a
// concrete location rather than a best-effort approximation across boundaries or a synthesized gap.
func (f Fidelity) IsSingleSegment() bool {
	return f == FidelityExact || f == FidelityAtom
}

// IsNone reports whether the input had no original counterpart, meaning the mapped result is a synthesized
// gap that does not correspond to any location in the original text.
func (f Fidelity) IsNone() bool {
	return f == FidelityNone
}

// Segment maps the half-open virtual range [VirtualStart, VirtualEnd) to the half-open original range
// [OriginalStart, OriginalEnd). Features controls language-service participation; diagnostics and exact edit mapping
// deliberately bypass it.
type Segment struct {
	VirtualStart  core.TextPos
	VirtualEnd    core.TextPos
	OriginalStart core.TextPos
	OriginalEnd   core.TextPos
	Kind          Kind
	Features      Feature
}

// MappedPosition is one virtual projection of an original position and its mapping fidelity.
type MappedPosition struct {
	Position core.TextPos
	Fidelity Fidelity
}

// MappedSpan is one virtual projection of an original range and its mapping fidelity.
type MappedSpan struct {
	Span     core.TextRange
	Fidelity Fidelity
}

// SpanMap is a sparse, ordered set of segments over a content mapper's virtual text. Segments do not
// need to cover the whole text: any virtual position not inside a segment is synthesized (it has no
// original counterpart). An empty SpanMap therefore describes fully synthesized virtual text.
type SpanMap struct {
	segments []Segment

	// origOnce guards lazy construction of origSorted, the segments ordered by OriginalStart, used for
	// original-to-virtual lookups.
	origOnce   sync.Once
	origSorted []Segment
}

// Validation failures. A content mapper is required to provide a valid span map; these describe the
// ways a map can be malformed, so the compiler can attribute the failure to the mapper precisely and
// point the mapper's author at the offending location.
type MappingErrorKind int

const (
	// MappingErrorKindOverlap means the segments overlap, run backwards, or extend past the end of the
	// virtual text (they must be ordered and disjoint in virtual space).
	MappingErrorKindOverlap MappingErrorKind = iota
	// MappingErrorKindOutOfBounds means a segment's original span lies outside the original text.
	MappingErrorKindOutOfBounds
	// MappingErrorKindVerbatimMismatch means a verbatim segment's virtual and original text differ.
	MappingErrorKindVerbatimMismatch
	// MappingErrorKindKind means a segment uses an unsupported mapping kind.
	MappingErrorKindKind
	// MappingErrorKindFeature means a feature annotation contains unsupported flags.
	MappingErrorKindFeature
)

// MappingError describes a single span map validation failure, including the offsets involved so the mapper's
// author can locate it. VirtualPos is an offset into the virtual text; OriginalPos is an offset into the
// original content. Either may be unused (zero) depending on Kind.
type MappingError struct {
	Kind        MappingErrorKind
	VirtualPos  core.TextPos
	OriginalPos core.TextPos
}

// Error describes the invalid mapping and the coordinate at which it was detected.
func (p *MappingError) Error() string {
	switch p.Kind {
	case MappingErrorKindOverlap:
		return fmt.Sprintf("content mapper position mappings overlap or are out of order near virtual offset %d", p.VirtualPos)
	case MappingErrorKindOutOfBounds:
		return fmt.Sprintf("content mapper position mapping points outside the original content at original offset %d", p.OriginalPos)
	case MappingErrorKindVerbatimMismatch:
		return fmt.Sprintf("content mapper verbatim mapping does not match the original content at virtual offset %d, original offset %d", p.VirtualPos, p.OriginalPos)
	case MappingErrorKindKind:
		return fmt.Sprintf("content mapper position mapping has an invalid kind at virtual offset %d", p.VirtualPos)
	case MappingErrorKindFeature:
		return fmt.Sprintf("content mapper position mappings have invalid features near original offset %d", p.OriginalPos)
	default:
		return "content mapper produced an invalid position mapping"
	}
}

// Validate enforces the content-mapper span map contract against the virtual and original text: the
// segments must be ordered and disjoint in virtual space and stay within the virtual text, every
// original span must lie within the original text, and every verbatim segment's text must match the
// original exactly. Gaps are allowed (they map as synthesized) and an empty map is valid. It returns the
// first violation found, or nil if the map is valid.
func (m *SpanMap) Validate(virtual, original string) *MappingError {
	if m == nil {
		return nil
	}
	virtualLen := core.TextPos(len(virtual))
	origLen := core.TextPos(len(original))
	var previousVirtualEnd core.TextPos
	for i := range m.segments {
		s := &m.segments[i]
		if s.VirtualStart < previousVirtualEnd || s.VirtualEnd < s.VirtualStart || s.VirtualEnd > virtualLen {
			return &MappingError{Kind: MappingErrorKindOverlap, VirtualPos: s.VirtualStart}
		}
		previousVirtualEnd = s.VirtualEnd
		if s.OriginalStart < 0 || s.OriginalEnd < s.OriginalStart || s.OriginalEnd > origLen {
			return &MappingError{Kind: MappingErrorKindOutOfBounds, VirtualPos: s.VirtualStart, OriginalPos: s.OriginalEnd}
		}
		if s.Kind != KindVerbatim && s.Kind != KindAtom && s.Kind != KindAlias {
			return &MappingError{Kind: MappingErrorKindKind, VirtualPos: s.VirtualStart, OriginalPos: s.OriginalStart}
		}
		if s.Kind == KindVerbatim {
			if s.VirtualEnd-s.VirtualStart != s.OriginalEnd-s.OriginalStart ||
				virtual[s.VirtualStart:s.VirtualEnd] != original[s.OriginalStart:s.OriginalEnd] {
				return &MappingError{Kind: MappingErrorKindVerbatimMismatch, VirtualPos: s.VirtualStart, OriginalPos: s.OriginalStart}
			}
		}
		if s.Features&^featureMask != 0 {
			return &MappingError{Kind: MappingErrorKindFeature, VirtualPos: s.VirtualStart, OriginalPos: s.OriginalStart}
		}
	}
	return nil
}

// New builds a SpanMap from segments, sorted by virtual start. Segments describe only the parts of the
// virtual text that correspond to the original; anything not covered maps as synthesized.
func New(segments []Segment) *SpanMap {
	sorted := slices.Clone(segments)
	slices.SortFunc(sorted, func(a, b Segment) int {
		return int(a.VirtualStart - b.VirtualStart)
	})
	return &SpanMap{segments: sorted}
}

// Segments returns the map's segments ordered by virtual start.
func (m *SpanMap) Segments() []Segment {
	if m == nil {
		return nil
	}
	return slices.Clone(m.segments)
}

// VirtualToOriginalSpan maps a virtual range to an original range, along with the fidelity of the result. A virtual
// range that lies entirely in a gap between segments (or in an empty map) is synthesized: it maps to the
// insertion point in the original with FidelityNone. A nil SpanMap maps identically.
func (m *SpanMap) VirtualToOriginalSpan(r core.TextRange) (core.TextRange, Fidelity) {
	if m == nil {
		return r, FidelityExact
	}
	virtualStart := core.TextPos(r.Pos())
	virtualEnd := max(core.TextPos(r.End()), virtualStart)
	if virtualStart == virtualEnd {
		position, fidelity := m.VirtualToOriginalPosition(virtualStart)
		return core.NewTextRange(int(position), int(position)), fidelity
	}

	startIdx, startIn := m.segmentIndexAt(virtualStart)
	endProbe := virtualEnd - 1
	endIdx, endIn := m.segmentIndexAt(endProbe)

	if startIdx == endIdx && startIn == endIn {
		if startIn {
			seg := &m.segments[startIdx]
			if seg.Kind == KindVerbatim {
				origStart := clamp(seg.OriginalStart+(virtualStart-seg.VirtualStart), seg.OriginalStart, seg.OriginalEnd)
				origEnd := clamp(seg.OriginalStart+(virtualEnd-seg.VirtualStart), origStart, seg.OriginalEnd)
				return core.NewTextRange(int(origStart), int(origEnd)), FidelityExact
			}
			return core.NewTextRange(int(seg.OriginalStart), int(seg.OriginalEnd)), FidelityAtom
		}
		// Entirely within a single synthesized gap.
		pos := m.insertionPoint(startIdx)
		return core.NewTextRange(int(pos), int(pos)), FidelityNone
	}

	origStart := m.mapLow(virtualStart, startIdx, startIn)
	origEnd := max(m.mapHigh(virtualEnd, endIdx, endIn), origStart)
	return core.NewTextRange(int(origStart), int(origEnd)), FidelityApproximate
}

// VirtualToOriginalSpanForFeature maps r only when every virtual position in the non-empty range is
// covered by contiguous segments participating in feature. A zero-length range requires its containing
// segment to participate. Diagnostics and edit write-back intentionally use VirtualToOriginalSpan instead.
func (m *SpanMap) VirtualToOriginalSpanForFeature(r core.TextRange, feature Feature) (core.TextRange, Fidelity) {
	mapped, fidelity := m.VirtualToOriginalSpan(r)
	if m == nil || m.virtualSpanSupportsFeature(r, feature) {
		return mapped, fidelity
	}
	return mapped, FidelityNone
}

func (m *SpanMap) virtualSpanSupportsFeature(r core.TextRange, feature Feature) bool {
	start := core.TextPos(r.Pos())
	end := max(core.TextPos(r.End()), start)
	if start == end {
		index, inside := m.segmentIndexAt(start)
		return inside && supportsFeature(m.segments[index], feature)
	}
	index, inside := m.segmentIndexAt(start)
	if !inside {
		return false
	}
	coveredThrough := start
	for index < len(m.segments) && coveredThrough < end {
		segment := m.segments[index]
		if segment.VirtualStart > coveredThrough || segment.VirtualEnd <= coveredThrough || !supportsFeature(segment, feature) {
			return false
		}
		coveredThrough = segment.VirtualEnd
		index++
	}
	return coveredThrough >= end
}

// VirtualToOriginalPosition maps a single virtual position to the corresponding original position, along with the
// fidelity of the result. It is the single-position analog of VirtualToOriginalSpan: a position in a gap (or in an empty
// map) is synthesized and maps to the insertion point with FidelityNone. A nil SpanMap maps identically.
func (m *SpanMap) VirtualToOriginalPosition(pos core.TextPos) (core.TextPos, Fidelity) {
	if m == nil {
		return pos, FidelityExact
	}
	idx, in := m.segmentIndexAt(pos)
	if !in {
		return m.insertionPoint(idx), FidelityNone
	}
	seg := &m.segments[idx]
	if seg.Kind == KindVerbatim {
		return clamp(seg.OriginalStart+(pos-seg.VirtualStart), seg.OriginalStart, seg.OriginalEnd), FidelityExact
	}
	return seg.OriginalStart, FidelityAtom
}

// VirtualToOriginalPositionExact maps a position only when it is unambiguously in verbatim content.
// A boundary touching an atom is rejected because the same virtual position can describe either side.
func (m *SpanMap) VirtualToOriginalPositionExact(pos core.TextPos) (core.TextPos, bool) {
	mapped, fidelity := m.VirtualToOriginalPosition(pos)
	if fidelity != FidelityExact || m == nil {
		return mapped, fidelity == FidelityExact
	}
	index, inside := m.segmentIndexAt(pos)
	if !inside || m.segments[index].Kind != KindVerbatim {
		return mapped, false
	}
	if index > 0 {
		previous := m.segments[index-1]
		if previous.VirtualEnd == pos && previous.Kind != KindVerbatim {
			return mapped, false
		}
	}
	return mapped, true
}

// VirtualToOriginalPositionForFeature maps pos only when its virtual segment participates in feature.
// Diagnostics and edit write-back intentionally use VirtualToOriginalPosition instead.
func (m *SpanMap) VirtualToOriginalPositionForFeature(pos core.TextPos, feature Feature) (core.TextPos, Fidelity) {
	mapped, fidelity := m.VirtualToOriginalPosition(pos)
	if m == nil {
		return mapped, fidelity
	}
	index, inside := m.segmentIndexAt(pos)
	if !inside || !supportsFeature(m.segments[index], feature) {
		return mapped, FidelityNone
	}
	return mapped, fidelity
}

// AliasForVirtualSpan returns the alias segment exactly covering r. Partial overlap does not qualify:
// diagnostic text may be substituted only when the diagnostic identifies the complete virtual alias.
func (m *SpanMap) AliasForVirtualSpan(r core.TextRange) (Segment, bool) {
	if m == nil {
		return Segment{}, false
	}
	index, inside := m.segmentIndexAt(core.TextPos(r.Pos()))
	if !inside {
		return Segment{}, false
	}
	segment := m.segments[index]
	return segment, segment.Kind == KindAlias && r.Pos() == int(segment.VirtualStart) && r.End() == int(segment.VirtualEnd)
}

// segmentIndexAt returns the index of the segment containing pos and true, or, when pos lies in a gap,
// the index of the segment immediately before pos (-1 if none) and false.
func (m *SpanMap) segmentIndexAt(pos core.TextPos) (int, bool) {
	idx, found := slices.BinarySearchFunc(m.segments, pos, func(s Segment, p core.TextPos) int {
		return int(s.VirtualStart - p)
	})
	if found {
		return idx, true
	}
	prev := idx - 1
	if prev >= 0 && (pos < m.segments[prev].VirtualEnd || prev == len(m.segments)-1 && pos == m.segments[prev].VirtualEnd) {
		return prev, true
	}
	return prev, false
}

// insertionPoint returns the original offset where synthesized content following segment prev sits: the
// original end of that segment, or 0 before the first segment.
func (m *SpanMap) insertionPoint(prev int) core.TextPos {
	if prev < 0 {
		return 0
	}
	return m.segments[prev].OriginalEnd
}

// mapLow maps a virtual lower range boundary to original coordinates. A boundary in a synthesized
// gap uses that gap's insertion point; an atom uses its original start.
func (m *SpanMap) mapLow(pos core.TextPos, idx int, in bool) core.TextPos {
	if !in {
		return m.insertionPoint(idx)
	}
	seg := &m.segments[idx]
	if seg.Kind == KindVerbatim {
		return clamp(seg.OriginalStart+(pos-seg.VirtualStart), seg.OriginalStart, seg.OriginalEnd)
	}
	return seg.OriginalStart
}

// mapHigh maps a virtual upper range boundary to original coordinates. A boundary in a synthesized
// gap uses that gap's insertion point; an atom uses its original end.
func (m *SpanMap) mapHigh(pos core.TextPos, idx int, in bool) core.TextPos {
	if !in {
		return m.insertionPoint(idx)
	}
	seg := &m.segments[idx]
	if seg.Kind == KindVerbatim {
		return clamp(seg.OriginalStart+(pos-seg.VirtualStart), seg.OriginalStart, seg.OriginalEnd)
	}
	return seg.OriginalEnd
}

// OriginalToVirtualPositions returns every virtual projection of an original position whose segment
// participates in feature. Segment ends are inclusive for point mapping, so a position shared by adjacent
// original spans returns projections from both sides. Results are ordered by virtual position. It returns
// no results for an uncovered position or when all touching segments reject feature. A nil SpanMap maps identically.
func (m *SpanMap) OriginalToVirtualPositions(pos core.TextPos, feature Feature) []MappedPosition {
	if m == nil {
		return []MappedPosition{{Position: pos, Fidelity: FidelityExact}}
	}
	groups := segmentGroupsAtOriginalPosition(m.origIndex(), pos)
	if len(groups) == 0 {
		return nil
	}
	var results []MappedPosition
	for _, group := range groups {
		for _, segment := range group.segments {
			if !supportsFeature(segment, feature) {
				continue
			}
			mapped := MappedPosition{Fidelity: FidelityAtom}
			if segment.Kind == KindVerbatim {
				mapped.Position = clamp(segment.VirtualStart+(pos-segment.OriginalStart), segment.VirtualStart, segment.VirtualEnd)
				mapped.Fidelity = FidelityExact
			} else if group.atEnd {
				mapped.Position = segment.VirtualEnd
			} else {
				mapped.Position = segment.VirtualStart
			}
			if !slices.Contains(results, mapped) {
				results = append(results, mapped)
			}
		}
	}
	slices.SortFunc(results, func(a, b MappedPosition) int { return int(a.Position - b.Position) })
	return results
}

// OriginalToVirtualSpans returns every feature-compatible virtual projection of an original range.
// A range contained by one or more segments produces one exact or atom result per matching segment.
//
// A range that starts in one group and ends in another can have several possible virtual ranges. For
// example, suppose two original segments are each copied twice into the virtual text:
//
//	original:   [ A ][ B ]
//	               [---)       range from inside A to inside B
//
//	virtual:    [ A ][ B ]      [ A ][ B ]
//	               ^   ^          ^   ^
//	             start end      start end
//	               1   3          11  13
//
// The map says that the range may start at 1 or 11 and end at 3 or 13, but it does not say which copy of A
// belongs with which copy of B. We choose the smallest range around each possible location, producing [1,3)
// and [11,13). We do not return [1,13), because it contains both smaller candidates and would include code
// that may be unrelated to the original range. These cross-group results have approximate fidelity.
// If either boundary is uncovered or disabled for feature, there are no results. A nil SpanMap maps identically.
func (m *SpanMap) OriginalToVirtualSpans(r core.TextRange, feature Feature) []MappedSpan {
	if m == nil {
		return []MappedSpan{{Span: r, Fidelity: FidelityExact}}
	}
	start := core.TextPos(r.Pos())
	end := max(core.TextPos(r.End()), start)
	if start == end {
		return core.Map(m.OriginalToVirtualPositions(start, feature), func(position MappedPosition) MappedSpan {
			return MappedSpan{
				Span:     core.NewTextRange(int(position.Position), int(position.Position)),
				Fidelity: position.Fidelity,
			}
		})
	}
	lastCharacter := end - 1
	originalSegments := m.origIndex()
	startSegments, startInside := segmentsAtOriginalPosition(originalSegments, start)
	endSegments, endInside := segmentsAtOriginalPosition(originalSegments, lastCharacter)
	if !startInside || !endInside {
		return nil
	}
	var containing []Segment
	for _, segment := range startSegments {
		if end <= segment.OriginalEnd {
			containing = append(containing, segment)
		}
	}
	if len(containing) > 0 {
		results := originalToVirtualSpansInSegments(containing, start, end, feature)
		if len(results) > 0 {
			slices.SortFunc(results, func(a, b MappedSpan) int { return a.Span.Pos() - b.Span.Pos() })
			return results
		}
	}
	starts := originalStartProjections(startSegments, start, feature)
	ends := originalEndProjections(endSegments, end, feature)
	if len(starts) == 0 || len(ends) == 0 {
		return nil
	}
	slices.Sort(starts)
	slices.Sort(ends)
	results := make([]MappedSpan, 0, min(len(starts), len(ends)))
	for i, virtualStart := range starts {
		endIndex, _ := slices.BinarySearch(ends, virtualStart)
		if endIndex == len(ends) || i+1 < len(starts) && starts[i+1] <= ends[endIndex] {
			continue
		}
		results = append(results, MappedSpan{
			Span:     core.NewTextRange(int(virtualStart), int(ends[endIndex])),
			Fidelity: FidelityApproximate,
		})
	}
	return results
}

// OriginalToVirtualIntersectingSpans maps every feature-enabled segment intersection with r.
// Unlike OriginalToVirtualSpans, uncovered range endpoints do not suppress covered interior segments.
func (m *SpanMap) OriginalToVirtualIntersectingSpans(r core.TextRange, feature Feature) []MappedSpan {
	if m == nil {
		return []MappedSpan{{Span: r, Fidelity: FidelityExact}}
	}
	if r.Pos() == r.End() {
		return m.OriginalToVirtualSpans(r, feature)
	}
	results := make([]MappedSpan, 0)
	for _, segment := range m.segments {
		if !supportsFeature(segment, feature) {
			continue
		}
		start := max(core.TextPos(r.Pos()), segment.OriginalStart)
		end := min(core.TextPos(r.End()), segment.OriginalEnd)
		if start >= end {
			continue
		}
		if segment.Kind == KindVerbatim {
			results = append(results, MappedSpan{
				Span: core.NewTextRange(
					int(segment.VirtualStart+(start-segment.OriginalStart)),
					int(segment.VirtualStart+(end-segment.OriginalStart)),
				),
				Fidelity: FidelityExact,
			})
		} else {
			results = append(results, MappedSpan{
				Span:     core.NewTextRange(int(segment.VirtualStart), int(segment.VirtualEnd)),
				Fidelity: FidelityAtom,
			})
		}
	}
	return results
}

// originalStartProjections maps the inclusive start of an original range through every matching segment.
// Verbatim segments preserve the offset within the segment; atoms map to their virtual start.
//
// For duplicate verbatim segments, the start keeps the same relative offset in every copy:
//
//	original:       [---------)
//	                   ^ start
//
//	virtual:    [---------)   [---------)
//	               ^             ^
//	             result        result
func originalStartProjections(segments []Segment, start core.TextPos, feature Feature) []core.TextPos {
	results := make([]core.TextPos, 0, len(segments))
	for _, segment := range segments {
		if !supportsFeature(segment, feature) {
			continue
		}
		if segment.Kind == KindVerbatim {
			results = append(results, clamp(segment.VirtualStart+(start-segment.OriginalStart), segment.VirtualStart, segment.VirtualEnd))
		} else {
			results = append(results, segment.VirtualStart)
		}
	}
	return results
}

// originalEndProjections maps the exclusive end of an original range through every matching segment.
// The caller uses end-1 to find the segment containing the final character, while this helper maps the end
// boundary itself. Verbatim segments preserve that boundary; atoms map to their virtual end.
//
// The lookup uses end-1 so an end at a segment boundary selects the segment on its left, not the next one:
//
//	original:       [---------)[ next segment )
//	                         ^`-- end
//	                         `--- end-1
//
//	virtual:    [---------)   [---------)
//	                      ^             ^
//	                    result        result
func originalEndProjections(segments []Segment, end core.TextPos, feature Feature) []core.TextPos {
	results := make([]core.TextPos, 0, len(segments))
	for _, segment := range segments {
		if !supportsFeature(segment, feature) {
			continue
		}
		if segment.Kind == KindVerbatim {
			results = append(results, clamp(segment.VirtualStart+(end-segment.OriginalStart), segment.VirtualStart, segment.VirtualEnd))
		} else {
			results = append(results, segment.VirtualEnd)
		}
	}
	return results
}

// originalToVirtualSpansInSegments maps a range fully contained by each segment.
func originalToVirtualSpansInSegments(segments []Segment, start core.TextPos, end core.TextPos, feature Feature) []MappedSpan {
	results := make([]MappedSpan, 0, len(segments))
	for _, segment := range segments {
		if !supportsFeature(segment, feature) {
			continue
		}
		if segment.Kind == KindVerbatim {
			virtualStart := clamp(segment.VirtualStart+(start-segment.OriginalStart), segment.VirtualStart, segment.VirtualEnd)
			virtualEnd := clamp(segment.VirtualStart+(end-segment.OriginalStart), virtualStart, segment.VirtualEnd)
			results = append(results, MappedSpan{Span: core.NewTextRange(int(virtualStart), int(virtualEnd)), Fidelity: FidelityExact})
		} else {
			results = append(results, MappedSpan{Span: core.NewTextRange(int(segment.VirtualStart), int(segment.VirtualEnd)), Fidelity: FidelityAtom})
		}
	}
	return results
}

// sameOriginalRange reports whether two segments belong to the same duplicate group.
func sameOriginalRange(left Segment, right Segment) bool {
	return left.OriginalStart == right.OriginalStart && left.OriginalEnd == right.OriginalEnd
}

// origIndex returns the segments ordered by OriginalStart, building it once on first use.
func (m *SpanMap) origIndex() []Segment {
	m.origOnce.Do(func() {
		m.origSorted = slices.Clone(m.segments)
		slices.SortFunc(m.origSorted, func(a, b Segment) int {
			if c := int(a.OriginalStart - b.OriginalStart); c != 0 {
				return c
			}
			if c := int(a.OriginalEnd - b.OriginalEnd); c != 0 {
				return c
			}
			return int(a.VirtualStart - b.VirtualStart)
		})
	})
	return m.origSorted
}

// segmentsAtOriginalPosition returns every mapping segment containing the original-text position pos.
// Segment ends are exclusive; a segment start, including a zero-length segment, is considered contained.
func segmentsAtOriginalPosition(segments []Segment, pos core.TextPos) ([]Segment, bool) {
	var results []Segment
	for _, segment := range segments {
		if segment.OriginalStart > pos {
			break
		}
		if pos < segment.OriginalEnd || pos == segment.OriginalStart {
			results = append(results, segment)
		}
	}
	return results, len(results) > 0
}

type segmentGroupAtOriginalPosition struct {
	segments []Segment
	atEnd    bool
}

// segmentGroupsAtOriginalPosition returns every group of equal-range mapping segments containing or touching
// the original-text position pos. Segment ends are included for point mapping.
//
// At a shared boundary, segments ending at pos and segments starting there form separate groups:
//
//	original:  [--- A ---)[--- B ---)
//	                      ^ pos
//
//	virtual:   [ A1 ) [ A2 )    [ B1 ) [ B2 )
//	             left group       right group
//	             atEnd: true      atEnd: false
func segmentGroupsAtOriginalPosition(segments []Segment, pos core.TextPos) []segmentGroupAtOriginalPosition {
	var groups []segmentGroupAtOriginalPosition
	for start := 0; start < len(segments); {
		if segments[start].OriginalStart > pos {
			break
		}
		end := start + 1
		for end < len(segments) && sameOriginalRange(segments[start], segments[end]) {
			end++
		}
		segment := segments[start]
		if pos <= segment.OriginalEnd {
			groups = append(groups, segmentGroupAtOriginalPosition{
				segments: segments[start:end],
				atEnd:    pos == segment.OriginalEnd && pos != segment.OriginalStart,
			})
		}
		start = end
	}
	return groups
}

// supportsFeature reports whether segment participates in feature.
func supportsFeature(segment Segment, feature Feature) bool {
	return segment.Features&feature != 0
}

// clamp confines v to the inclusive interval [lo, hi].
func clamp(v, lo, hi core.TextPos) core.TextPos {
	return max(lo, min(v, hi))
}

// Unmarshal decodes a SpanMap from the JSON tuple form produced by an out-of-process content mapper.
// Five-element tuples omit features and are normalized to FeatureAll; six-element tuples preserve the
// explicit feature mask, including FeatureNone.
func Unmarshal(data []byte) (*SpanMap, error) {
	var tuples [][]int32
	if err := json.Unmarshal(data, &tuples); err != nil {
		return nil, err
	}
	segments := make([]Segment, len(tuples))
	for i, t := range tuples {
		if len(t) != 5 && len(t) != 6 {
			return nil, fmt.Errorf("span map segment %d: expected 5 or 6 values, got %d", i, len(t))
		}
		segments[i] = Segment{
			VirtualStart:  core.TextPos(t[0]),
			VirtualEnd:    core.TextPos(t[0] + t[1]),
			OriginalStart: core.TextPos(t[2]),
			OriginalEnd:   core.TextPos(t[2] + t[3]),
			Kind:          Kind(t[4]),
			Features:      FeatureAll,
		}
		if len(t) == 6 {
			segments[i].Features = Feature(t[5])
		}
	}
	return New(segments), nil
}

// Marshal encodes a SpanMap into the JSON tuple form. FeatureAll uses the backward-compatible five-element
// tuple; every other feature mask is emitted as a sixth element.
func (m *SpanMap) Marshal() ([]byte, error) {
	tuples := make([][]int32, len(m.segments))
	for i, s := range m.segments {
		tuples[i] = []int32{
			int32(s.VirtualStart),
			int32(s.VirtualEnd - s.VirtualStart),
			int32(s.OriginalStart),
			int32(s.OriginalEnd - s.OriginalStart),
			int32(s.Kind),
		}
		if s.Features != FeatureAll {
			tuples[i] = append(tuples[i], int32(s.Features))
		}
	}
	return json.Marshal(tuples)
}
