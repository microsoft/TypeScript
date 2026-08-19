import { SpanMapFeature } from "#enums/spanMapFeature";
import { SpanMapFidelity } from "#enums/spanMapFidelity";
import { SpanMapKind } from "#enums/spanMapKind";
import type { ReadonlyTextRange } from "./ast.ts";

export { SpanMapFeature, SpanMapFidelity, SpanMapKind };

// Keep this in sync with spanmap.go

/** Maps one half-open virtual range to one half-open original range. */
export interface SpanMapSegment {
    readonly virtualStart: number;
    readonly virtualEnd: number;
    readonly originalStart: number;
    readonly originalEnd: number;
    readonly kind: SpanMapKind;
    readonly features?: SpanMapFeature;
}

/** Internal segment representation after omitted features have been normalized to `All`. */
type NormalizedSpanMapSegment = SpanMapSegment & { readonly features: SpanMapFeature; };

/** One virtual projection of an original position and its mapping fidelity. */
export interface MappedPosition {
    readonly position: number;
    readonly fidelity: SpanMapFidelity;
}

/** One virtual projection of an original range and its mapping fidelity. */
export interface MappedRange {
    readonly range: ReadonlyTextRange;
    readonly fidelity: SpanMapFidelity;
}

/** Provides bidirectional span-aware mapping between virtual and original text. */
export class SpanMap {
    readonly segments: readonly NormalizedSpanMapSegment[];
    private originalSegments: readonly NormalizedSpanMapSegment[] | undefined;

    /** Copies and sorts segments by virtual start, normalizing omitted features to `All`. */
    constructor(segments: readonly SpanMapSegment[]) {
        this.segments = segments
            .map(segment => ({ ...segment, features: segment.features ?? SpanMapFeature.All }))
            .sort((left, right) => left.virtualStart - right.virtualStart);
    }

    /** Reports whether a mapping is a precise, edit-safe projection through one verbatim segment. */
    static isExact(fidelity: SpanMapFidelity): boolean {
        return fidelity === SpanMapFidelity.Exact;
    }

    /** Reports whether a mapping lies in one verbatim or atom segment. */
    static isSingleSegment(fidelity: SpanMapFidelity): boolean {
        return fidelity === SpanMapFidelity.Exact || fidelity === SpanMapFidelity.Atom;
    }

    /** Reports whether the input had no counterpart in the target text. */
    static isNone(fidelity: SpanMapFidelity): boolean {
        return fidelity === SpanMapFidelity.None;
    }

    /**
     * Maps a virtual range to original text. Gaps map to insertion points with `None` fidelity,
     * and ranges crossing segment boundaries map their endpoints with `Approximate` fidelity.
     */
    virtualToOriginalSpan(range: ReadonlyTextRange): MappedRange {
        return this.mapRange(range, this.segments, false);
    }

    /** Maps a visible LS result only when every covered segment participates in `feature`. */
    virtualToOriginalSpanForFeature(range: ReadonlyTextRange, feature: SpanMapFeature): MappedRange {
        const mapped = this.virtualToOriginalSpan(range);
        return this.virtualRangeSupportsFeature(range, feature) ? mapped : { ...mapped, fidelity: SpanMapFidelity.None };
    }

    /** Maps a virtual position to original text, using `None` fidelity for synthesized gaps. */
    virtualToOriginalPosition(position: number): MappedPosition {
        return this.mapPoint(position, this.segments, false);
    }

    virtualToOriginalPositionForFeature(position: number, feature: SpanMapFeature): MappedPosition {
        const mapped = this.virtualToOriginalPosition(position);
        const [index, inside] = segmentIndexAt(this.segments, position, false);
        return inside && supportsFeature(this.segments[index], feature) ? mapped : { ...mapped, fidelity: SpanMapFidelity.None };
    }

    /**
     * Returns every virtual projection of an original position whose segment participates in `feature`.
     * Segment ends are inclusive for point mapping, so adjacent spans may both produce projections.
     * Results are ordered by virtual position; uncovered or disabled positions produce no results.
     */
    originalToVirtualPositions(position: number, feature: SpanMapFeature): readonly MappedPosition[] {
        const groups = segmentGroupsAtOriginalPosition(this.getOriginalSegments(), position);
        const results: MappedPosition[] = [];
        for (const group of groups) {
            for (const segment of group.segments) {
                if (!supportsFeature(segment, feature)) continue;
                const mapped = segment.kind === SpanMapKind.Verbatim
                    ? { position: mapVerbatimPosition(segment, position, true), fidelity: SpanMapFidelity.Exact }
                    : { position: group.atEnd ? segment.virtualEnd : segment.virtualStart, fidelity: SpanMapFidelity.Atom };
                if (!results.some(result => result.position === mapped.position && result.fidelity === mapped.fidelity)) {
                    results.push(mapped);
                }
            }
        }
        return results.sort((left, right) => left.position - right.position);
    }

    /**
     * Returns every feature-compatible virtual projection of an original range.
     * A range contained by one duplicate group produces one exact or atom result per matching group member.
     *
     * A range that starts in one group and ends in another can have several possible virtual ranges. For
     * example, suppose two original segments are each copied twice into the virtual text:
     *
     * ```text
     * original:   [ A ][ B ]
     *                [---)       range from inside A to inside B
     *
     * virtual:    [ A ][ B ]      [ A ][ B ]
     *                ^   ^          ^   ^
     *              start end      start end
     *                1   3          11  13
     * ```
     *
     * The map says that the range may start at 1 or 11 and end at 3 or 13, but it does not say which copy of A
     * belongs with which copy of B. We choose the smallest range around each possible location, producing [1,3)
     * and [11,13). We do not return [1,13), because it contains both smaller candidates and would include code
     * that may be unrelated to the original range. These cross-group results have approximate fidelity.
     */
    originalToVirtualSpans(range: ReadonlyTextRange, feature: SpanMapFeature): readonly MappedRange[] {
        const start = range.pos;
        const end = Math.max(range.end, start);
        const lastCharacter = end > start ? end - 1 : end;
        const originalSegments = this.getOriginalSegments();
        const startSegments = segmentsAtOriginalPosition(originalSegments, start);
        const endSegments = segmentsAtOriginalPosition(originalSegments, lastCharacter);
        if (!startSegments || !endSegments) return [];
        if (sameOriginalRange(startSegments[0], endSegments[0])) {
            return originalToVirtualSpansInGroup(startSegments, start, end, feature);
        }
        const starts = originalStartProjections(startSegments, start, feature);
        const ends = originalEndProjections(endSegments, end, feature);
        if (starts.length === 0 || ends.length === 0) return [];
        return starts.flatMap((virtualStart, index) => {
            const virtualEnd = ends.find(end => end >= virtualStart);
            return virtualEnd === undefined || index + 1 < starts.length && starts[index + 1] <= virtualEnd
                ? []
                : [{ range: { pos: virtualStart, end: virtualEnd }, fidelity: SpanMapFidelity.Approximate }];
        });
    }

    /** Maps one range through an ordered segment index in the direction selected by `reverse`. */
    private mapRange(range: ReadonlyTextRange, segments: readonly SpanMapSegment[], reverse: boolean): MappedRange {
        const start = range.pos;
        const end = Math.max(range.end, start);
        const [startIndex, startInside] = segmentIndexAt(segments, start, reverse);
        const endProbe = end > start ? end - 1 : end;
        const [endIndex, endInside] = segmentIndexAt(segments, endProbe, reverse);

        if (startIndex === endIndex && startInside === endInside) {
            if (startInside) {
                const segment = segments[startIndex];
                if (segment.kind === SpanMapKind.Verbatim) {
                    const mappedStart = mapVerbatimPosition(segment, start, reverse);
                    const mappedEnd = Math.max(mappedStart, mapVerbatimPosition(segment, end, reverse));
                    return { range: { pos: mappedStart, end: mappedEnd }, fidelity: SpanMapFidelity.Exact };
                }
                return { range: targetRange(segment, reverse), fidelity: SpanMapFidelity.Atom };
            }
            const position = insertionPoint(segments, startIndex, reverse);
            return { range: { pos: position, end: position }, fidelity: SpanMapFidelity.None };
        }

        const mappedStart = mapBoundary(segments, start, startIndex, startInside, reverse, false);
        const mappedEnd = Math.max(mappedStart, mapBoundary(segments, end, endIndex, endInside, reverse, true));
        return { range: { pos: mappedStart, end: mappedEnd }, fidelity: SpanMapFidelity.Approximate };
    }

    /** Maps one position through an ordered segment index in the direction selected by `reverse`. */
    private mapPoint(position: number, segments: readonly SpanMapSegment[], reverse: boolean): MappedPosition {
        const [index, inside] = segmentIndexAt(segments, position, reverse);
        if (!inside) {
            return { position: insertionPoint(segments, index, reverse), fidelity: SpanMapFidelity.None };
        }
        const segment = segments[index];
        if (segment.kind === SpanMapKind.Verbatim) {
            return { position: mapVerbatimPosition(segment, position, reverse), fidelity: SpanMapFidelity.Exact };
        }
        return {
            position: reverse ? segment.virtualStart : segment.originalStart,
            fidelity: SpanMapFidelity.Atom,
        };
    }

    /** Returns the lazily built segment index ordered by original start. */
    private getOriginalSegments(): readonly NormalizedSpanMapSegment[] {
        return this.originalSegments ??= [...this.segments].sort((left, right) =>
            left.originalStart - right.originalStart
            || left.originalEnd - right.originalEnd
            || left.virtualStart - right.virtualStart
        );
    }

    private virtualRangeSupportsFeature(range: ReadonlyTextRange, feature: SpanMapFeature): boolean {
        const start = range.pos;
        const end = Math.max(range.end, start);
        if (start === end) {
            const [index, inside] = segmentIndexAt(this.segments, start, false);
            return inside && supportsFeature(this.segments[index], feature);
        }
        let [index, inside] = segmentIndexAt(this.segments, start, false);
        if (!inside) return false;
        let coveredThrough = start;
        while (index < this.segments.length && coveredThrough < end) {
            const segment = this.segments[index];
            if (segment.virtualStart > coveredThrough || segment.virtualEnd <= coveredThrough || !supportsFeature(segment, feature)) return false;
            coveredThrough = segment.virtualEnd;
            index++;
        }
        return coveredThrough >= end;
    }
}

/**
 * Maps the inclusive start of an original range through every matching segment. Verbatim segments preserve
 * the offset within the segment; atoms map to their virtual start.
 *
 * ```text
 * original:       [---------)
 *                    ^ start
 *
 * virtual:    [---------)   [---------)
 *                ^             ^
 *              result        result
 * ```
 */
function originalStartProjections(segments: readonly NormalizedSpanMapSegment[], start: number, feature: SpanMapFeature): readonly number[] {
    return segments
        .filter(segment => supportsFeature(segment, feature))
        .map(segment =>
            segment.kind === SpanMapKind.Verbatim
                ? mapVerbatimPosition(segment, start, true)
                : segment.virtualStart
        );
}

/**
 * Maps the exclusive end of an original range through every matching segment. The caller uses `end - 1`
 * to find the segment containing the final character, while this helper maps the `end` boundary itself.
 *
 * ```text
 * original:       [---------)[ next segment )
 *                          ^`-- end
 *                          `--- end - 1
 *
 * virtual:    [---------)   [---------)
 *                       ^             ^
 *                     result        result
 * ```
 */
function originalEndProjections(segments: readonly NormalizedSpanMapSegment[], end: number, feature: SpanMapFeature): readonly number[] {
    return segments
        .filter(segment => supportsFeature(segment, feature))
        .map(segment =>
            segment.kind === SpanMapKind.Verbatim
                ? mapVerbatimPosition(segment, end, true)
                : segment.virtualEnd
        );
}

/** Maps a range whose boundaries are known to lie in one duplicate group. */
function originalToVirtualSpansInGroup(segments: readonly NormalizedSpanMapSegment[], start: number, end: number, feature: SpanMapFeature): readonly MappedRange[] {
    return segments
        .filter(segment => supportsFeature(segment, feature))
        .map(segment => {
            if (segment.kind === SpanMapKind.Verbatim) {
                const mappedStart = mapVerbatimPosition(segment, start, true);
                const mappedEnd = Math.max(mappedStart, mapVerbatimPosition(segment, end, true));
                return { range: { pos: mappedStart, end: mappedEnd }, fidelity: SpanMapFidelity.Exact };
            }
            return { range: { pos: segment.virtualStart, end: segment.virtualEnd }, fidelity: SpanMapFidelity.Atom };
        });
}

/** Reports whether two segments belong to the same duplicate group. */
function sameOriginalRange(left: SpanMapSegment, right: SpanMapSegment): boolean {
    return left.originalStart === right.originalStart && left.originalEnd === right.originalEnd;
}

/**
 * Returns the complete duplicate group of mapping segments containing the original-text `position`.
 * Segment ends are exclusive; starts, including zero-length segment starts, are included. It finds a candidate
 * in O(log n), then scans only the duplicate group. `segments` must be ordered by original start, original end,
 * and virtual start.
 */
function segmentsAtOriginalPosition(segments: readonly NormalizedSpanMapSegment[], position: number): readonly NormalizedSpanMapSegment[] | undefined {
    let low = 0;
    let high = segments.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (segments[middle].originalStart < position) low = middle + 1;
        else high = middle;
    }
    let index = low < segments.length && segments[low].originalStart === position ? low : low - 1;
    if (
        index < 0 || !(
            segments[index].originalStart === position
            || position < segments[index].originalEnd
        )
    ) return undefined;
    while (index > 0 && sameOriginalRange(segments[index - 1], segments[index])) index--;
    let end = index + 1;
    while (end < segments.length && sameOriginalRange(segments[end], segments[index])) end++;
    return segments.slice(index, end);
}

interface SegmentGroupAtOriginalPosition {
    readonly segments: readonly NormalizedSpanMapSegment[];
    readonly atEnd: boolean;
}

/**
 * Returns groups of mapping segments containing or touching the original-text `position`.
 * At a shared boundary, segments ending at the point and segments starting there form separate groups:
 *
 * ```text
 * original:  [--- A ---)[--- B ---)
 *                       ^ position
 *
 * virtual:   [ A1 ) [ A2 )    [ B1 ) [ B2 )
 *              left group       right group
 *              atEnd: true      atEnd: false
 * ```
 */
function segmentGroupsAtOriginalPosition(segments: readonly NormalizedSpanMapSegment[], position: number): readonly SegmentGroupAtOriginalPosition[] {
    let low = 0;
    let high = segments.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (segments[middle].originalStart < position) low = middle + 1;
        else high = middle;
    }
    if (low < segments.length && segments[low].originalStart === position) {
        const right = segmentsAtOriginalPosition(segments, position)!;
        const groups: SegmentGroupAtOriginalPosition[] = [];
        if (low > 0 && segments[low - 1].originalEnd === position) {
            let leftStart = low - 1;
            while (leftStart > 0 && sameOriginalRange(segments[leftStart - 1], segments[low - 1])) leftStart--;
            groups.push({ segments: segments.slice(leftStart, low), atEnd: true });
        }
        groups.push({ segments: right, atEnd: false });
        return groups;
    }
    if (low === 0) return [];
    const left = segments[low - 1];
    if (position > left.originalEnd) return [];
    let start = low - 1;
    while (start > 0 && sameOriginalRange(segments[start - 1], left)) start--;
    return [{ segments: segments.slice(start, low), atEnd: position === left.originalEnd }];
}

/** Reports whether a segment participates in an original-to-virtual query for `features`. */
function supportsFeature(segment: NormalizedSpanMapSegment, feature: SpanMapFeature): boolean {
    return (segment.features & feature) !== 0;
}

/**
 * Finds the segment containing `position`, or the preceding segment when `position` is in a gap.
 * The boolean distinguishes containment from a gap; `reverse` selects original rather than virtual coordinates.
 */
function segmentIndexAt(segments: readonly SpanMapSegment[], position: number, reverse: boolean): [number, boolean] {
    let low = 0;
    let high = segments.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        const start = reverse ? segments[middle].originalStart : segments[middle].virtualStart;
        if (start < position) low = middle + 1;
        else high = middle;
    }
    if (low < segments.length && (reverse ? segments[low].originalStart : segments[low].virtualStart) === position) {
        return [low, true];
    }
    const previous = low - 1;
    if (previous >= 0) {
        const end = reverse ? segments[previous].originalEnd : segments[previous].virtualEnd;
        if (position < end || previous === segments.length - 1 && position === end) return [previous, true];
    }
    return [previous, false];
}

/** Returns the target insertion point for a gap following `previous`, or zero before the first segment. */
function insertionPoint(segments: readonly SpanMapSegment[], previous: number, reverse: boolean): number {
    if (previous < 0) return 0;
    return reverse ? segments[previous].virtualEnd : segments[previous].originalEnd;
}

/** Linearly maps and clamps a position within a length-preserving verbatim segment. */
function mapVerbatimPosition(segment: SpanMapSegment, position: number, reverse: boolean): number {
    const sourceStart = reverse ? segment.originalStart : segment.virtualStart;
    const targetStart = reverse ? segment.virtualStart : segment.originalStart;
    const targetEnd = reverse ? segment.virtualEnd : segment.originalEnd;
    return clamp(targetStart + position - sourceStart, targetStart, targetEnd);
}

/** Maps a range boundary, using insertion points for gaps and the selected endpoint for atoms. */
function mapBoundary(segments: readonly SpanMapSegment[], position: number, index: number, inside: boolean, reverse: boolean, high: boolean): number {
    if (!inside) return insertionPoint(segments, index, reverse);
    const segment = segments[index];
    if (segment.kind === SpanMapKind.Verbatim) return mapVerbatimPosition(segment, position, reverse);
    if (reverse) return high ? segment.virtualEnd : segment.virtualStart;
    return high ? segment.originalEnd : segment.originalStart;
}

/** Returns the complete target range of a segment in the selected direction. */
function targetRange(segment: SpanMapSegment, reverse: boolean): ReadonlyTextRange {
    return reverse
        ? { pos: segment.virtualStart, end: segment.virtualEnd }
        : { pos: segment.originalStart, end: segment.originalEnd };
}

/** Confines `value` to the inclusive interval [`low`, `high`]. */
function clamp(value: number, low: number, high: number): number {
    return Math.max(low, Math.min(value, high));
}
