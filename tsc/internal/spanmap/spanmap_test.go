package spanmap_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"gotest.tools/v3/assert"
)

func TestVirtualToOriginalSpanVerbatim(t *testing.T) {
	t.Parallel()

	// Virtual [0,10) is a verbatim copy of original [100,110).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(3, 7))
	assert.Equal(t, got.Pos(), 103)
	assert.Equal(t, got.End(), 107)
	assert.Equal(t, fidelity, spanmap.FidelityExact)
}

func TestVirtualToOriginalSpanAtom(t *testing.T) {
	t.Parallel()

	// Virtual [0,3) is a synthesized gap; [3,14) ("MyComponent") is an atom of the original [60,71).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 3, VirtualEnd: 14, OriginalStart: 60, OriginalEnd: 71, Kind: spanmap.KindAtom, Features: spanmap.FeatureAll},
	})

	// A span inside the atom maps to the whole atom span.
	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(5, 9))
	assert.Equal(t, got.Pos(), 60)
	assert.Equal(t, got.End(), 71)
	assert.Equal(t, fidelity, spanmap.FidelityAtom)
}

func TestVirtualAlias(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 10, OriginalEnd: 11, Kind: spanmap.KindAlias, Features: spanmap.FeatureAll},
	})

	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(3, 6))
	assert.Equal(t, got, core.NewTextRange(10, 11))
	assert.Equal(t, fidelity, spanmap.FidelityAtom)
	alias, ok := m.AliasForVirtualSpan(core.NewTextRange(3, 6))
	assert.Assert(t, ok)
	assert.Equal(t, alias.Kind, spanmap.KindAlias)
	_, partial := m.AliasForVirtualSpan(core.NewTextRange(4, 6))
	assert.Assert(t, !partial)

	data, err := m.Marshal()
	assert.NilError(t, err)
	decoded, err := spanmap.Unmarshal(data)
	assert.NilError(t, err)
	assert.Equal(t, decoded.Segments()[0].Kind, spanmap.KindAlias)
}

func TestVirtualToOriginalSpanSynthesizedGap(t *testing.T) {
	t.Parallel()

	// A gap between two verbatim segments is synthesized: it maps to the insertion point (the preceding
	// segment's original end) with no fidelity.
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(12, 15))
	assert.Equal(t, got.Pos(), 110)
	assert.Equal(t, got.End(), 110)
	assert.Equal(t, fidelity, spanmap.FidelityNone)
}

func TestOriginalToVirtualIntersectingSpansAllowsUncoveredEndpoints(t *testing.T) {
	t.Parallel()
	m := spanmap.New([]spanmap.Segment{{
		VirtualStart: 10, VirtualEnd: 20,
		OriginalStart: 100, OriginalEnd: 110,
		Kind: spanmap.KindVerbatim, Features: spanmap.FeatureSemanticTokens | spanmap.FeatureInlayHints,
	}})

	for _, feature := range []spanmap.Feature{spanmap.FeatureSemanticTokens, spanmap.FeatureInlayHints} {
		got := m.OriginalToVirtualIntersectingSpans(core.NewTextRange(90, 120), feature)
		assert.Equal(t, len(got), 1)
		assert.Equal(t, got[0].Span, core.NewTextRange(10, 20))
		assert.Equal(t, got[0].Fidelity, spanmap.FidelityExact)
	}
}

func TestVirtualToOriginalSpanEmptyIsSynthesized(t *testing.T) {
	t.Parallel()

	// An empty map describes fully synthesized output: everything maps to the start with no fidelity.
	m := spanmap.New(nil)
	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(5, 10))
	assert.Equal(t, got.Pos(), 0)
	assert.Equal(t, got.End(), 0)
	assert.Equal(t, fidelity, spanmap.FidelityNone)
}

func TestVirtualToOriginalSpanCrossingSegments(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim},
		{VirtualStart: 10, VirtualEnd: 20, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindVerbatim},
	})

	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(5, 15))
	assert.Equal(t, got.Pos(), 105)
	assert.Equal(t, got.End(), 205)
	assert.Equal(t, fidelity, spanmap.FidelityApproximate)
}

func TestVirtualToOriginalSpanNilIdentity(t *testing.T) {
	t.Parallel()

	var m *spanmap.SpanMap
	got, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(3, 7))
	assert.Equal(t, got.Pos(), 3)
	assert.Equal(t, got.End(), 7)
	assert.Equal(t, fidelity, spanmap.FidelityExact)
}

func TestVirtualToOriginalPosition(t *testing.T) {
	t.Parallel()

	// Virtual [0,10) is a verbatim copy of original [100,110); [10,20) is an atom of original [200,210).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindAtom, Features: spanmap.FeatureAll},
	})

	testCases := []struct {
		name     string
		pos      core.TextPos
		want     core.TextPos
		fidelity spanmap.Fidelity
	}{
		{"verbatim interpolates", 3, 103, spanmap.FidelityExact},
		{"atom maps to its start", 25, 200, spanmap.FidelityAtom},
		{"gap maps to insertion point", 15, 110, spanmap.FidelityNone},
	}
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			got, fidelity := m.VirtualToOriginalPosition(tc.pos)
			assert.Equal(t, got, tc.want)
			assert.Equal(t, fidelity, tc.fidelity)
			// VirtualToOriginalPosition must agree with VirtualToOriginalSpan on a zero-length range.
			span, spanFidelity := m.VirtualToOriginalSpan(core.NewTextRange(int(tc.pos), int(tc.pos)))
			assert.Equal(t, got, core.TextPos(span.Pos()))
			assert.Equal(t, fidelity, spanFidelity)
		})
	}
}

func TestVirtualToOriginalPositionExact(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 10, VirtualEnd: 20, OriginalStart: 110, OriginalEnd: 120, Kind: spanmap.KindAtom, Features: spanmap.FeatureAll},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 120, OriginalEnd: 130, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	for _, test := range []struct {
		pos  core.TextPos
		want core.TextPos
		ok   bool
	}{
		{pos: 5, want: 105, ok: true},
		{pos: 10, want: 110, ok: false},
		{pos: 15, want: 110, ok: false},
		{pos: 20, want: 120, ok: false},
		{pos: 25, want: 125, ok: true},
	} {
		got, ok := m.VirtualToOriginalPositionExact(test.pos)
		assert.Equal(t, got, test.want)
		assert.Equal(t, ok, test.ok)
	}
}

func TestVirtualToOriginalPositionExactRejectsDiscontinuousBoundary(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 0, OriginalEnd: 10, Kind: spanmap.KindVerbatim},
		{VirtualStart: 10, VirtualEnd: 20, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim},
	})

	mapped, ok := m.VirtualToOriginalPositionExact(10)
	assert.Equal(t, mapped, core.TextPos(100))
	assert.Assert(t, !ok)
}

func TestZeroLengthSpansAtSegmentEnds(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
	})

	position, fidelity := m.VirtualToOriginalPosition(30)
	assert.Equal(t, position, core.TextPos(210))
	assert.Equal(t, fidelity, spanmap.FidelityExact)
	virtualSpan, fidelity := m.VirtualToOriginalSpan(core.NewTextRange(30, 30))
	assert.Equal(t, virtualSpan, core.NewTextRange(210, 210))
	assert.Equal(t, fidelity, spanmap.FidelityExact)

	for _, test := range []struct {
		name        string
		originalEnd int
	}{
		{name: "before gap", originalEnd: 110},
		{name: "final", originalEnd: 210},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			positions := m.OriginalToVirtualPositions(core.TextPos(test.originalEnd), spanmap.FeatureHover)
			spans := m.OriginalToVirtualSpans(core.NewTextRange(test.originalEnd, test.originalEnd), spanmap.FeatureHover)
			assert.Equal(t, len(positions), 1)
			assert.Equal(t, len(spans), 1)
			assert.Equal(t, spans[0].Span, core.NewTextRange(int(positions[0].Position), int(positions[0].Position)))
			assert.Equal(t, spans[0].Fidelity, positions[0].Fidelity)
		})
	}
}

func TestMapPositionNilIdentity(t *testing.T) {
	t.Parallel()

	var m *spanmap.SpanMap
	got, fidelity := m.VirtualToOriginalPosition(7)
	assert.Equal(t, got, core.TextPos(7))
	assert.Equal(t, fidelity, spanmap.FidelityExact)
}

func TestOriginalToVirtualSpanVerbatim(t *testing.T) {
	t.Parallel()

	// Virtual [0,10) is a verbatim copy of original [100,110).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	results := m.OriginalToVirtualSpans(core.NewTextRange(103, 107), spanmap.FeatureAll)
	assert.Equal(t, len(results), 1)
	assert.Equal(t, results[0].Span.Pos(), 3)
	assert.Equal(t, results[0].Span.End(), 7)
	assert.Equal(t, results[0].Fidelity, spanmap.FidelityExact)
}

func TestOriginalToVirtualSpanAtom(t *testing.T) {
	t.Parallel()

	// Virtual [3,14) is an atom of the original [60,71).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 3, VirtualEnd: 14, OriginalStart: 60, OriginalEnd: 71, Kind: spanmap.KindAtom, Features: spanmap.FeatureAll},
	})

	// A span inside the original atom maps to the whole virtual span.
	results := m.OriginalToVirtualSpans(core.NewTextRange(63, 67), spanmap.FeatureAll)
	assert.Equal(t, len(results), 1)
	assert.Equal(t, results[0].Span.Pos(), 3)
	assert.Equal(t, results[0].Span.End(), 14)
	assert.Equal(t, results[0].Fidelity, spanmap.FidelityAtom)
}

func TestOriginalToVirtualSpanGap(t *testing.T) {
	t.Parallel()

	// An original range with no covering segment has no virtual counterpart.
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	assert.Equal(t, len(m.OriginalToVirtualSpans(core.NewTextRange(150, 160), spanmap.FeatureAll)), 0)
}

func TestOriginalToVirtualSpanNilIdentity(t *testing.T) {
	t.Parallel()

	var m *spanmap.SpanMap
	results := m.OriginalToVirtualSpans(core.NewTextRange(3, 7), spanmap.FeatureAll)
	assert.Equal(t, len(results), 1)
	assert.Equal(t, results[0].Span.Pos(), 3)
	assert.Equal(t, results[0].Span.End(), 7)
	assert.Equal(t, results[0].Fidelity, spanmap.FidelityExact)
}

func TestOriginalToVirtualPositions(t *testing.T) {
	t.Parallel()

	// Original [100,110) is a verbatim copy of virtual [0,10); [200,210) is an atom of virtual [20,30).
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 20, VirtualEnd: 30, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindAtom, Features: spanmap.FeatureAll},
	})

	testCases := []struct {
		name     string
		pos      core.TextPos
		want     core.TextPos
		fidelity spanmap.Fidelity
	}{
		{"verbatim interpolates", 103, 3, spanmap.FidelityExact},
		{"atom maps to its start", 205, 20, spanmap.FidelityAtom},
		{"gap has no projection", 150, 0, spanmap.FidelityNone},
	}
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			positions := m.OriginalToVirtualPositions(tc.pos, spanmap.FeatureAll)
			spans := m.OriginalToVirtualSpans(core.NewTextRange(int(tc.pos), int(tc.pos)), spanmap.FeatureAll)
			if tc.fidelity.IsNone() {
				assert.Equal(t, len(positions), 0)
				assert.Equal(t, len(spans), 0)
				return
			}
			assert.Equal(t, len(positions), 1)
			assert.Equal(t, positions[0].Position, tc.want)
			assert.Equal(t, positions[0].Fidelity, tc.fidelity)
			assert.Equal(t, len(spans), 1)
			assert.Equal(t, core.TextPos(spans[0].Span.Pos()), tc.want)
			assert.Equal(t, spans[0].Fidelity, tc.fidelity)
		})
	}
}

func TestOriginalToVirtualPositionsAtEndpoint(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 2, VirtualEnd: 5, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureCompletion},
		{VirtualStart: 8, VirtualEnd: 11, OriginalStart: 13, OriginalEnd: 16, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureCompletion},
		{VirtualStart: 20, VirtualEnd: 23, OriginalStart: 30, OriginalEnd: 35, Kind: spanmap.KindAtom, Features: spanmap.FeatureCompletion},
	})

	assert.DeepEqual(t, m.OriginalToVirtualPositions(13, spanmap.FeatureCompletion), []spanmap.MappedPosition{
		{Position: 5, Fidelity: spanmap.FidelityExact},
		{Position: 8, Fidelity: spanmap.FidelityExact},
	})
	assert.DeepEqual(t, m.OriginalToVirtualPositions(35, spanmap.FeatureCompletion), []spanmap.MappedPosition{
		{Position: 23, Fidelity: spanmap.FidelityAtom},
	})

	filtered := spanmap.New([]spanmap.Segment{
		{VirtualStart: 20, VirtualEnd: 23, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 2, VirtualEnd: 5, OriginalStart: 13, OriginalEnd: 16, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureCompletion},
	})
	assert.DeepEqual(t, filtered.OriginalToVirtualPositions(13, spanmap.FeatureAll), []spanmap.MappedPosition{
		{Position: 2, Fidelity: spanmap.FidelityExact},
		{Position: 23, Fidelity: spanmap.FidelityExact},
	})
	assert.DeepEqual(t, filtered.OriginalToVirtualPositions(13, spanmap.FeatureCompletion), []spanmap.MappedPosition{
		{Position: 2, Fidelity: spanmap.FidelityExact},
	})
}

func TestOriginalToVirtualDuplicateGroup(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureDefinition},
		{VirtualStart: 10, VirtualEnd: 13, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 20, VirtualEnd: 25, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindAtom, Features: spanmap.FeatureDefinition},
	})

	semantic := m.OriginalToVirtualPositions(11, spanmap.FeatureHover)
	assert.Equal(t, len(semantic), 1)
	assert.Equal(t, semantic[0].Position, core.TextPos(11))
	assert.Equal(t, semantic[0].Fidelity, spanmap.FidelityExact)

	navigation := m.OriginalToVirtualPositions(11, spanmap.FeatureDefinition)
	assert.Equal(t, len(navigation), 2)
	assert.Equal(t, navigation[0].Position, core.TextPos(1))
	assert.Equal(t, navigation[0].Fidelity, spanmap.FidelityExact)
	assert.Equal(t, navigation[1].Position, core.TextPos(20))
	assert.Equal(t, navigation[1].Fidelity, spanmap.FidelityAtom)

	spans := m.OriginalToVirtualSpans(core.NewTextRange(10, 13), spanmap.FeatureDefinition)
	assert.Equal(t, len(spans), 2)
	assert.Equal(t, spans[0].Span.Pos(), 0)
	assert.Equal(t, spans[0].Span.End(), 3)
	assert.Equal(t, spans[1].Span.Pos(), 20)
	assert.Equal(t, spans[1].Span.End(), 25)
}

func TestOriginalToVirtualOverlappingSpans(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 6, OriginalStart: 0, OriginalEnd: 6, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 10, VirtualEnd: 12, OriginalStart: 2, OriginalEnd: 4, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 20, VirtualEnd: 24, OriginalStart: 3, OriginalEnd: 7, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
	})

	assert.DeepEqual(t, m.OriginalToVirtualPositions(3, spanmap.FeatureHover), []spanmap.MappedPosition{
		{Position: 3, Fidelity: spanmap.FidelityExact},
		{Position: 11, Fidelity: spanmap.FidelityExact},
		{Position: 20, Fidelity: spanmap.FidelityExact},
	})
	spans := m.OriginalToVirtualSpans(core.NewTextRange(3, 4), spanmap.FeatureHover)
	wantSpans := []spanmap.MappedSpan{
		{Span: core.NewTextRange(3, 4), Fidelity: spanmap.FidelityExact},
		{Span: core.NewTextRange(11, 12), Fidelity: spanmap.FidelityExact},
		{Span: core.NewTextRange(20, 21), Fidelity: spanmap.FidelityExact},
	}
	assert.Equal(t, len(spans), len(wantSpans))
	for i := range spans {
		assert.Equal(t, spans[i], wantSpans[i])
	}
}

func TestOriginalToVirtualPositionFindsEarlyCoveringSegment(t *testing.T) {
	t.Parallel()

	// Binary search lands near [90,95), which does not contain 97. The interval index must still find the
	// earlier [0,100) segment without scanning every segment whose start precedes the query.
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 100, OriginalStart: 0, OriginalEnd: 100, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 100, VirtualEnd: 105, OriginalStart: 80, OriginalEnd: 85, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 105, VirtualEnd: 110, OriginalStart: 90, OriginalEnd: 95, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 110, VirtualEnd: 113, OriginalStart: 100, OriginalEnd: 103, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
	})

	assert.DeepEqual(t, m.OriginalToVirtualPositions(97, spanmap.FeatureHover), []spanmap.MappedPosition{
		{Position: 97, Fidelity: spanmap.FidelityExact},
	})
	spans := m.OriginalToVirtualSpans(core.NewTextRange(97, 98), spanmap.FeatureHover)
	assert.Equal(t, len(spans), 1)
	assert.Equal(t, spans[0], spanmap.MappedSpan{Span: core.NewTextRange(97, 98), Fidelity: spanmap.FidelityExact})

	// Point lookup includes both sides of a shared endpoint, including an early interval found through the
	// max-end tree. Nonempty span lookup treats segment ends as exclusive and uses only the right segment.
	assert.DeepEqual(t, m.OriginalToVirtualPositions(100, spanmap.FeatureHover), []spanmap.MappedPosition{
		{Position: 100, Fidelity: spanmap.FidelityExact},
		{Position: 110, Fidelity: spanmap.FidelityExact},
	})
	spans = m.OriginalToVirtualSpans(core.NewTextRange(100, 101), spanmap.FeatureHover)
	assert.Equal(t, len(spans), 1)
	assert.Equal(t, spans[0], spanmap.MappedSpan{Span: core.NewTextRange(110, 111), Fidelity: spanmap.FidelityExact})
}

func BenchmarkOriginalToVirtualPositionNearEnd(b *testing.B) {
	const segmentCount = 10_000
	segments := make([]spanmap.Segment, segmentCount)
	for i := range segments {
		start := core.TextPos(2 * i)
		segments[i] = spanmap.Segment{
			VirtualStart: start, VirtualEnd: start + 1,
			OriginalStart: start, OriginalEnd: start + 1,
			Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover,
		}
	}
	m := spanmap.New(segments)
	position := core.TextPos(2 * (segmentCount - 1))
	m.OriginalToVirtualPositions(position, spanmap.FeatureHover) // Build the lazy index outside the benchmark.
	b.ResetTimer()
	for b.Loop() {
		m.OriginalToVirtualPositions(position, spanmap.FeatureHover)
	}
}

func TestOriginalToVirtualOverlapFallsBackFromDisabledContainer(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 6, OriginalStart: 0, OriginalEnd: 6, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureDefinition},
		{VirtualStart: 10, VirtualEnd: 13, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 13, VirtualEnd: 16, OriginalStart: 3, OriginalEnd: 6, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
	})

	spans := m.OriginalToVirtualSpans(core.NewTextRange(1, 5), spanmap.FeatureHover)
	assert.Equal(t, len(spans), 1)
	assert.Equal(t, spans[0], spanmap.MappedSpan{Span: core.NewTextRange(11, 15), Fidelity: spanmap.FidelityApproximate})
}

func TestOriginalToVirtualCrossGroupProjections(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 2, OriginalStart: 0, OriginalEnd: 2, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 2, VirtualEnd: 4, OriginalStart: 2, OriginalEnd: 4, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 10, VirtualEnd: 12, OriginalStart: 0, OriginalEnd: 2, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 12, VirtualEnd: 14, OriginalStart: 2, OriginalEnd: 4, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
	})

	spans := m.OriginalToVirtualSpans(core.NewTextRange(1, 3), spanmap.FeatureHover)
	assert.Equal(t, len(spans), 2)
	assert.Equal(t, spans[0].Span, core.NewTextRange(1, 3))
	assert.Equal(t, spans[1].Span, core.NewTextRange(11, 13))
	for _, mapped := range spans {
		assert.Equal(t, mapped.Fidelity, spanmap.FidelityApproximate)
	}
}

func TestOriginalToVirtualExplicitZeroFeatures(t *testing.T) {
	t.Parallel()

	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureNone},
	})

	assert.Equal(t, len(m.OriginalToVirtualPositions(11, spanmap.FeatureHover)), 0)
	assert.Equal(t, len(m.OriginalToVirtualPositions(11, spanmap.FeatureDefinition)), 0)
	assert.Equal(t, len(m.OriginalToVirtualSpans(core.NewTextRange(10, 13), spanmap.FeatureHover)), 0)

	data, err := m.Marshal()
	assert.NilError(t, err)
	assert.Equal(t, string(data), "[[0,3,10,3,0,0]]")
	decoded, err := spanmap.Unmarshal(data)
	assert.NilError(t, err)
	segments := decoded.Segments()
	assert.Equal(t, segments[0].Features, spanmap.FeatureNone)

	legacy, err := spanmap.Unmarshal([]byte("[[0,3,10,3,0]]"))
	assert.NilError(t, err)
	assert.Equal(t, legacy.Segments()[0].Features, spanmap.FeatureAll)
	assert.Equal(t, len(legacy.OriginalToVirtualPositions(11, spanmap.FeatureHover)), 1)
}

func TestFeatureParticipationOriginalAndVirtual(t *testing.T) {
	t.Parallel()
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 10, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
		{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 20, OriginalEnd: 23, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureCompletion},
	})

	assert.Equal(t, len(m.OriginalToVirtualPositions(11, spanmap.FeatureHover)), 1)
	assert.Equal(t, len(m.OriginalToVirtualPositions(11, spanmap.FeatureCompletion)), 0)

	mapped, fidelity := m.VirtualToOriginalSpanForFeature(core.NewTextRange(0, 3), spanmap.FeatureHover)
	assert.Equal(t, mapped, core.NewTextRange(10, 13))
	assert.Equal(t, fidelity, spanmap.FidelityExact)
	_, fidelity = m.VirtualToOriginalSpanForFeature(core.NewTextRange(0, 3), spanmap.FeatureCompletion)
	assert.Equal(t, fidelity, spanmap.FidelityNone)

	// Diagnostics and edit safety use unfiltered geometry and cannot be disabled by feature flags.
	mapped, fidelity = m.VirtualToOriginalSpan(core.NewTextRange(0, 3))
	assert.Equal(t, mapped, core.NewTextRange(10, 13))
	assert.Equal(t, fidelity, spanmap.FidelityExact)
}

func TestOriginalToVirtualSpanRoundTrip(t *testing.T) {
	t.Parallel()

	// Original spans are out of order relative to virtual spans, exercising the reverse index.
	m := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 200, OriginalEnd: 210, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		{VirtualStart: 10, VirtualEnd: 20, OriginalStart: 100, OriginalEnd: 110, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
	})

	for _, r := range []core.TextRange{core.NewTextRange(2, 8), core.NewTextRange(12, 18)} {
		orig, fidelity := m.VirtualToOriginalSpan(r)
		assert.Equal(t, fidelity, spanmap.FidelityExact)
		back := m.OriginalToVirtualSpans(orig, spanmap.FeatureAll)
		assert.Equal(t, len(back), 1)
		assert.Equal(t, back[0].Fidelity, spanmap.FidelityExact)
		assert.Equal(t, back[0].Span.Pos(), r.Pos())
		assert.Equal(t, back[0].Span.End(), r.End())
	}
}

func TestMarshalRoundTrip(t *testing.T) {
	t.Parallel()

	original := spanmap.New([]spanmap.Segment{
		{VirtualStart: 3, VirtualEnd: 14, OriginalStart: 60, OriginalEnd: 71, Kind: spanmap.KindAtom},
		{VirtualStart: 14, VirtualEnd: 24, OriginalStart: 71, OriginalEnd: 81, Kind: spanmap.KindVerbatim},
	})

	data, err := original.Marshal()
	assert.NilError(t, err)
	decoded, err := spanmap.Unmarshal(data)
	assert.NilError(t, err)

	for _, r := range []core.TextRange{core.NewTextRange(1, 2), core.NewTextRange(4, 10), core.NewTextRange(16, 20)} {
		wantRange, wantFidelity := original.VirtualToOriginalSpan(r)
		gotRange, gotFidelity := decoded.VirtualToOriginalSpan(r)
		assert.Equal(t, gotRange, wantRange)
		assert.Equal(t, gotFidelity, wantFidelity)
	}
}

func TestValidate(t *testing.T) {
	t.Parallel()

	const transformed = "const greeting = 1;\n"
	const original = "<x>const greeting = 1;\n</x>"
	scriptStart := 3 // index of "const" in original

	testCases := []struct {
		name     string
		segs     []spanmap.Segment
		wantKind spanmap.MappingErrorKind
		wantOK   bool
	}{
		{
			name:   "valid verbatim",
			segs:   []spanmap.Segment{{VirtualStart: 0, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: core.TextPos(scriptStart), OriginalEnd: core.TextPos(scriptStart + len(transformed)), Kind: spanmap.KindVerbatim}},
			wantOK: true,
		},
		{
			name:   "empty is valid",
			segs:   nil,
			wantOK: true,
		},
		{
			name:   "gap is allowed",
			segs:   []spanmap.Segment{{VirtualStart: 3, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom}},
			wantOK: true,
		},
		{
			name: "overlap",
			segs: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
				{VirtualStart: 5, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
			},
			wantKind: spanmap.MappingErrorKindOverlap,
		},
		{
			name:     "original out of bounds",
			segs:     []spanmap.Segment{{VirtualStart: 0, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: core.TextPos(len(original) + 10), Kind: spanmap.KindAtom}},
			wantKind: spanmap.MappingErrorKindOutOfBounds,
		},
		{
			name:     "verbatim text mismatch",
			segs:     []spanmap.Segment{{VirtualStart: 0, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: core.TextPos(len(transformed)), Kind: spanmap.KindVerbatim}},
			wantKind: spanmap.MappingErrorKindVerbatimMismatch,
		},
		{
			name:     "unknown kind",
			segs:     []spanmap.Segment{{VirtualStart: 0, VirtualEnd: 1, OriginalStart: 0, OriginalEnd: 1, Kind: 3}},
			wantKind: spanmap.MappingErrorKindKind,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			problem := spanmap.New(tc.segs).Validate(transformed, original)
			if tc.wantOK {
				assert.Assert(t, problem == nil, "expected valid, got %+v", problem)
				return
			}
			assert.Assert(t, problem != nil, "expected a problem")
			assert.Equal(t, problem.Kind, tc.wantKind)
		})
	}
}

func TestValidateOriginalOverlapAndFeatures(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		segments []spanmap.Segment
		wantKind spanmap.MappingErrorKind
		valid    bool
	}{
		{
			name: "identical duplicate group",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureDefinition},
				{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureHover},
			},
			valid: true,
		},
		{
			name: "partial original overlap is valid",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom},
				{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 2, OriginalEnd: 5, Kind: spanmap.KindAtom},
			},
			valid: true,
		},
		{
			name: "nested original overlap is valid",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 5, OriginalStart: 0, OriginalEnd: 5, Kind: spanmap.KindAtom},
				{VirtualStart: 5, VirtualEnd: 6, OriginalStart: 1, OriginalEnd: 4, Kind: spanmap.KindAtom},
			},
			valid: true,
		},
		{
			name: "duplicate without explicit features is tolerant",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom},
				{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom, Features: spanmap.FeatureDefinition},
			},
			valid: true,
		},
		{
			name: "duplicate with shared feature members is tolerant",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom, Features: spanmap.FeatureHover},
				{VirtualStart: 3, VirtualEnd: 6, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom, Features: spanmap.FeatureHover | spanmap.FeatureDefinition},
			},
			valid: true,
		},
		{
			name: "features on sole cover are valid",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom, Features: spanmap.FeatureDefinition},
			},
			valid: true,
		},
		{
			name: "unknown feature flag",
			segments: []spanmap.Segment{
				{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 0, OriginalEnd: 3, Kind: spanmap.KindAtom, Features: 1 << 22},
			},
			wantKind: spanmap.MappingErrorKindFeature,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			problem := spanmap.New(test.segments).Validate("abcabc", "abcdef")
			if test.valid {
				assert.Assert(t, problem == nil, "expected valid, got %+v", problem)
				return
			}
			assert.Assert(t, problem != nil)
			assert.Equal(t, problem.Kind, test.wantKind)
		})
	}
}

func TestValidateNilIsValid(t *testing.T) {
	t.Parallel()
	var m *spanmap.SpanMap
	assert.Assert(t, m.Validate("abc", "abc") == nil)
}
