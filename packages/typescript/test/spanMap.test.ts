import {
    SpanMap,
    SpanMapFeature,
    SpanMapFidelity,
    SpanMapKind,
} from "@typescript/typescript/unstable/ast";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";

describe("SpanMap", () => {
    const map = new SpanMap([
        { virtualStart: 2, virtualEnd: 6, originalStart: 10, originalEnd: 14, kind: SpanMapKind.Verbatim },
        { virtualStart: 8, virtualEnd: 11, originalStart: 20, originalEnd: 27, kind: SpanMapKind.Atom },
        { virtualStart: 14, virtualEnd: 18, originalStart: 30, originalEnd: 34, kind: SpanMapKind.Verbatim },
    ]);

    test("maps virtual positions and ranges to original", () => {
        assert.equal(map.segments[0].features, SpanMapFeature.All);
        assert.deepEqual(map.virtualToOriginalPosition(4), { position: 12, fidelity: SpanMapFidelity.Exact });
        assert.deepEqual(map.virtualToOriginalSpan({ pos: 3, end: 5 }), { range: { pos: 11, end: 13 }, fidelity: SpanMapFidelity.Exact });
        assert.deepEqual(map.virtualToOriginalPosition(9), { position: 20, fidelity: SpanMapFidelity.Atom });
        assert.deepEqual(map.virtualToOriginalSpan({ pos: 8, end: 10 }), { range: { pos: 20, end: 27 }, fidelity: SpanMapFidelity.Atom });
        assert.deepEqual(map.virtualToOriginalSpan({ pos: 5, end: 15 }), { range: { pos: 13, end: 31 }, fidelity: SpanMapFidelity.Approximate });
    });

    test("maps aliases with atom geometry", () => {
        const alias = new SpanMap([
            { virtualStart: 0, virtualEnd: 3, originalStart: 0, originalEnd: 1, kind: SpanMapKind.Alias },
        ]);
        assert.deepEqual(alias.virtualToOriginalSpan({ pos: 0, end: 3 }), {
            range: { pos: 0, end: 1 },
            fidelity: SpanMapFidelity.Atom,
        });
    });

    test("maps synthesized gaps to insertion points", () => {
        assert.deepEqual(map.virtualToOriginalPosition(0), { position: 0, fidelity: SpanMapFidelity.None });
        assert.deepEqual(map.virtualToOriginalSpan({ pos: 6, end: 8 }), { range: { pos: 14, end: 14 }, fidelity: SpanMapFidelity.None });
        assert.deepEqual(map.virtualToOriginalPosition(19), { position: 34, fidelity: SpanMapFidelity.None });
    });

    test("maps original positions and ranges to virtual", () => {
        assert.deepEqual(map.originalToVirtualPositions(12, SpanMapFeature.All), [{ position: 4, fidelity: SpanMapFidelity.Exact }]);
        assert.deepEqual(map.originalToVirtualSpans({ pos: 21, end: 25 }, SpanMapFeature.All), [{ range: { pos: 8, end: 11 }, fidelity: SpanMapFidelity.Atom }]);
        assert.deepEqual(map.originalToVirtualSpans({ pos: 13, end: 31 }, SpanMapFeature.All), [{ range: { pos: 5, end: 15 }, fidelity: SpanMapFidelity.Approximate }]);
        assert.deepEqual(map.originalToVirtualPositions(15, SpanMapFeature.All), []);
    });

    test("maps segment endpoints", () => {
        assert.deepEqual(map.virtualToOriginalPosition(18), { position: 34, fidelity: SpanMapFidelity.Exact });
        assert.deepEqual(map.originalToVirtualPositions(34, SpanMapFeature.All), [{ position: 18, fidelity: SpanMapFidelity.Exact }]);
        assert.deepEqual(map.virtualToOriginalPosition(6), { position: 14, fidelity: SpanMapFidelity.None });
        assert.deepEqual(map.originalToVirtualPositions(14, SpanMapFeature.All), [{ position: 6, fidelity: SpanMapFidelity.Exact }]);

        const adjacent = new SpanMap([
            { virtualStart: 20, virtualEnd: 23, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 2, virtualEnd: 5, originalStart: 13, originalEnd: 16, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Completion },
            { virtualStart: 30, virtualEnd: 33, originalStart: 20, originalEnd: 25, kind: SpanMapKind.Atom },
        ]);
        assert.deepEqual(adjacent.originalToVirtualPositions(13, SpanMapFeature.All), [
            { position: 2, fidelity: SpanMapFidelity.Exact },
            { position: 23, fidelity: SpanMapFidelity.Exact },
        ]);
        assert.deepEqual(adjacent.originalToVirtualPositions(13, SpanMapFeature.Completion), [
            { position: 2, fidelity: SpanMapFidelity.Exact },
        ]);
        assert.deepEqual(adjacent.originalToVirtualPositions(25, SpanMapFeature.All), [
            { position: 33, fidelity: SpanMapFidelity.Atom },
        ]);
    });

    test("sorts virtual and original indexes independently", () => {
        const reordered = new SpanMap([
            { virtualStart: 0, virtualEnd: 2, originalStart: 10, originalEnd: 12, kind: SpanMapKind.Verbatim },
            { virtualStart: 2, virtualEnd: 4, originalStart: 0, originalEnd: 2, kind: SpanMapKind.Verbatim },
        ]);
        assert.deepEqual(reordered.virtualToOriginalPosition(3), { position: 1, fidelity: SpanMapFidelity.Exact });
        assert.deepEqual(reordered.originalToVirtualPositions(1, SpanMapFeature.All), [{ position: 3, fidelity: SpanMapFidelity.Exact }]);
    });

    test("an empty map describes fully synthesized output", () => {
        const empty = new SpanMap([]);
        assert.deepEqual(empty.virtualToOriginalPosition(5), { position: 0, fidelity: SpanMapFidelity.None });
        assert.deepEqual(empty.virtualToOriginalSpan({ pos: 2, end: 7 }), { range: { pos: 0, end: 0 }, fidelity: SpanMapFidelity.None });
        assert.deepEqual(empty.originalToVirtualPositions(5, SpanMapFeature.All), []);
    });

    test("maps duplicate groups by features", () => {
        const duplicates = new SpanMap([
            { virtualStart: 0, virtualEnd: 3, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Definition },
            { virtualStart: 10, virtualEnd: 13, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 14, virtualEnd: 17, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 20, virtualEnd: 25, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Atom, features: SpanMapFeature.Definition },
        ]);

        assert.deepEqual(duplicates.originalToVirtualPositions(11, SpanMapFeature.Hover), [
            { position: 11, fidelity: SpanMapFidelity.Exact },
            { position: 15, fidelity: SpanMapFidelity.Exact },
        ]);
        assert.deepEqual(duplicates.originalToVirtualPositions(11, SpanMapFeature.Definition), [
            { position: 1, fidelity: SpanMapFidelity.Exact },
            { position: 20, fidelity: SpanMapFidelity.Atom },
        ]);
        assert.deepEqual(duplicates.originalToVirtualPositions(13, SpanMapFeature.Hover), [
            { position: 13, fidelity: SpanMapFidelity.Exact },
            { position: 17, fidelity: SpanMapFidelity.Exact },
        ]);
    });

    test("maps minimal cross-group projections", () => {
        const projections = new SpanMap([
            { virtualStart: 0, virtualEnd: 2, originalStart: 0, originalEnd: 2, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 2, virtualEnd: 4, originalStart: 2, originalEnd: 4, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 10, virtualEnd: 12, originalStart: 0, originalEnd: 2, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
            { virtualStart: 12, virtualEnd: 14, originalStart: 2, originalEnd: 4, kind: SpanMapKind.Verbatim, features: SpanMapFeature.Hover },
        ]);

        assert.deepEqual(projections.originalToVirtualSpans({ pos: 1, end: 3 }, SpanMapFeature.Hover), [
            { range: { pos: 1, end: 3 }, fidelity: SpanMapFidelity.Approximate },
            { range: { pos: 11, end: 13 }, fidelity: SpanMapFidelity.Approximate },
        ]);
    });

    test("explicit zero features disables original-to-virtual mapping", () => {
        const disabled = new SpanMap([
            { virtualStart: 0, virtualEnd: 3, originalStart: 10, originalEnd: 13, kind: SpanMapKind.Verbatim, features: SpanMapFeature.None },
        ]);

        assert.deepEqual(disabled.originalToVirtualPositions(11, SpanMapFeature.Hover), []);
        assert.deepEqual(disabled.originalToVirtualPositions(11, SpanMapFeature.Definition), []);
        assert.deepEqual(disabled.originalToVirtualSpans({ pos: 10, end: 13 }, SpanMapFeature.Hover), []);
    });

    test("exposes fidelity predicates", () => {
        assert.equal(SpanMap.isExact(SpanMapFidelity.Exact), true);
        assert.equal(SpanMap.isSingleSegment(SpanMapFidelity.Exact), true);
        assert.equal(SpanMap.isSingleSegment(SpanMapFidelity.Atom), true);
        assert.equal(SpanMap.isSingleSegment(SpanMapFidelity.Approximate), false);
        assert.equal(SpanMap.isNone(SpanMapFidelity.None), true);
    });
});
