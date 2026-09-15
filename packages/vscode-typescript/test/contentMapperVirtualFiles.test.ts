import assert from "node:assert/strict";
import test from "node:test";

import {
    containsNonEmptyTextRange,
    textPositionAt,
    textRangePreview,
    toMappedOutputs,
} from "../src/contentMapperVirtualFiles";

test("matches offsets only inside non-empty text ranges", () => {
    assert.equal(containsNonEmptyTextRange({ pos: 2, end: 5 }, 2), true);
    assert.equal(containsNonEmptyTextRange({ pos: 2, end: 5 }, 4), true);
    assert.equal(containsNonEmptyTextRange({ pos: 2, end: 5 }, 5), false);
    assert.equal(containsNonEmptyTextRange({ pos: 2, end: 2 }, 2), false);
});

test("previews virtual ranges with normalized whitespace and safe truncation", () => {
    assert.equal(
        textRangePreview("before  first\n  second  after", { pos: 6, end: 23 }),
        "first second",
    );
    assert.equal(textRangePreview("A😀BCDE", { pos: 0, end: 7 }, 5), "A😀...");
});

test("computes positions for LF, CRLF, and lone CR line endings", () => {
    const text = "a\rb\r\nc\nd";
    assert.deepEqual(textPositionAt(text, 2), { line: 1, character: 0 });
    assert.deepEqual(textPositionAt(text, 5), { line: 2, character: 0 });
    assert.deepEqual(textPositionAt(text, 7), { line: 3, character: 0 });
});

test("adds stable output keys to content mapper virtual files", () => {
    const files = [{
        fileName: "/component.vue.ts",
        hash: "1234",
        text: "export {}",
        originalText: "<script />",
        scriptKind: 3,
        mappings: [],
        diagnosticDirectives: [],
    }];

    const first = toMappedOutputs(files);
    const second = toMappedOutputs(files);

    assert.equal(first[0]?.key, "0");
    assert.equal(first[0]?.hash, second[0]?.hash);
});
