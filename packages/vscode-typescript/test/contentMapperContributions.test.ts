import assert from "node:assert/strict";
import test, { describe } from "node:test";
import {
    type ContentMapperContribution,
    documentMatchesContentMapperContributions,
    serializeContentMapperContributions,
    validateContentMapperRegistration,
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
            outputExtensions: { ".vue": ".js" },
        },
    },
} satisfies ContentMapperContribution;

describe("content mapper contributions", { concurrency: true }, () => {
    test("rejects path separators in source and output extensions", () => {
        for (const extension of [".vue/foo", ".vue\\foo"]) {
            assert.throws(() => validateContentMapperRegistration("mapper", [{ extensions: [extension] }]), /path separators/);
            for (const outputExtensions of [{ [extension]: ".js" }, { ".vue": extension }]) {
                assert.throws(() =>
                    validateContentMapperRegistration("mapper", [{
                        ...documentedContribution,
                        inferredProjectContribution: {
                            manifest: { ...documentedContribution.inferredProjectContribution.manifest, outputExtensions },
                        },
                    }]), /path separators/);
            }
        }
    });

    test("accepts single-dot sources and compound output suffixes", () => {
        assert.doesNotThrow(() =>
            validateContentMapperRegistration("mapper", [{
                extensions: [".toml", ".vue"],
                inferredProjectContribution: {
                    manifest: { ...documentedContribution.inferredProjectContribution.manifest, outputExtensions: { ".toml": ".part.js" } },
                },
            }])
        );
    });

    test("rejects compound source extensions and output mapping keys", () => {
        for (const extension of [".part.toml", ".y.z", ".d.ts", ".d.mts", ".d.cts"]) {
            assert.throws(() => validateContentMapperRegistration("mapper", [{ extensions: [extension] }]), /only one dot/);
            assert.throws(() =>
                validateContentMapperRegistration("mapper", [{
                    ...documentedContribution,
                    inferredProjectContribution: {
                        manifest: { ...documentedContribution.inferredProjectContribution.manifest, outputExtensions: { [extension]: ".js" } },
                    },
                }]), /only one dot/);
        }
    });

    test("rejects builtin extensions", () => {
        for (const extension of [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs", ".json"]) {
            for (const source of [extension, extension.toUpperCase()]) {
                assert.throws(() =>
                    validateContentMapperRegistration("mapper", [{
                        extensions: [source],
                    }]), /built-in extension/);
            }
        }
    });

    test("content mapper extensions match document paths case-insensitively", () => {
        const registrations = new Map<string, readonly ContentMapperContribution[]>([[
            "publisher.extension",
            [{ extensions: [".vue"] }],
        ]]);
        const document = { uri: { path: "/workspace/Component.part.VUE" } };

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
                    outputExtensions: { ".vue": ".js" },
                },
            },
        }]);
    });
});
