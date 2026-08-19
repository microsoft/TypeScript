import assert from "node:assert/strict";
import test from "node:test";
import {
    type ContentMapperContribution,
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
