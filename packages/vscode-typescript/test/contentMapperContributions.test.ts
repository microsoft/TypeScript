import assert from "node:assert/strict";
import test from "node:test";
import {
    type ContentMapperContribution,
    documentMatchesContentMapperContributions,
} from "../src/contentMapperContributions";

test("content mapper extensions match document paths case-insensitively", () => {
    const registrations = new Map<string, readonly ContentMapperContribution[]>([[
        "publisher.extension",
        [{ extensions: [".vue"] }],
    ]]);
    const document = { uri: { path: "/workspace/Component.VUE" } };

    assert.equal(documentMatchesContentMapperContributions(document, registrations), true);
});
