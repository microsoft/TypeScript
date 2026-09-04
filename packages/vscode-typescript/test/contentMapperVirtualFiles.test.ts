import assert from "node:assert/strict";
import test from "node:test";

import { toMappedOutputs } from "../src/contentMapperVirtualFiles";

test("adds stable output keys and identities to content mapper virtual files", () => {
    const files = [{
        fileName: "/component.vue.ts",
        text: "export {}",
        originalText: "<script />",
        scriptKind: 3,
        mappings: [],
        diagnosticDirectives: [],
    }];

    const first = toMappedOutputs(files);
    const second = toMappedOutputs(files);

    assert.equal(first[0]?.key, "0");
    assert.equal(first[0]?.identity, second[0]?.identity);
});
