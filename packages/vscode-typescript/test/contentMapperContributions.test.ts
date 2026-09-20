import assert from "node:assert/strict";
import test from "node:test";
import {
    type ContentMapperContribution,
    documentIsContentMapperCandidate,
    documentMatchesContentMapperContributions,
    serializeContentMapperContributions,
} from "../src/contentMapperContributions";

const documentedContribution = {
    extensions: [".vue"],
    inferredProjectContribution: {
        options: { strictTemplates: true },
        manifest: {
            name: "Vue mapper",
            version: "1.2.3",
            exec: ["node", "mapper.js"],
            compilerOptions: ["strict"],
            dynamicConfig: true,
        },
    },
} satisfies ContentMapperContribution;

test("content mapper extensions match document paths case-insensitively", () => {
    const registrations = new Map<string, readonly ContentMapperContribution[]>([[
        "publisher.extension",
        [{ extensions: [".vue"] }],
    ]]);
    const document = { uri: { path: "/workspace/Component.VUE" } };

    assert.equal(documentMatchesContentMapperContributions(document, registrations), true);
});

test("content mapper candidates are non-js/ts file and untitled documents", () => {
    assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "file" }, languageId: "plaintext" }), true);
    assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "file" }, languageId: "unknown" }), true);
    assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "untitled" }, languageId: "plaintext" }), true);
});

test("content mapper candidates exclude js/ts documents", () => {
    for (const languageId of ["typescript", "typescriptreact", "javascript", "javascriptreact"]) {
        assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "file" }, languageId }), false);
        assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "untitled" }, languageId }), false);
    }
});

test("content mapper candidates exclude non-file schemes", () => {
    assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "git" }, languageId: "plaintext" }), false);
    assert.equal(documentIsContentMapperCandidate({ uri: { scheme: "output" }, languageId: "plaintext" }), false);
});

test("serializes the documented inferred project contribution", () => {
    const registrations = new Map<string, readonly ContentMapperContribution[]>([[
        "publisher.extension",
        [documentedContribution],
    ]]);

    assert.deepEqual(serializeContentMapperContributions(registrations), [{
        contributorId: "publisher.extension",
        extensions: [".vue"],
        inferredProjectContribution: {
            options: { strictTemplates: true },
            manifest: {
                name: "Vue mapper",
                version: "1.2.3",
                exec: ["node", "mapper.js"],
                cwd: undefined,
                compilerOptions: ["strict"],
                dynamicConfig: true,
            },
        },
    }]);
});
