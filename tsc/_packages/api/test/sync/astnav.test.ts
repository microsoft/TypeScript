//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: test/async/astnav.test.ts
// Regenerate: npm run generate (from _packages/api)
//
import { createVirtualFileSystem } from "@typescript/api/fs";
import { API } from "@typescript/api/sync";
import {
    formatSyntaxKind,
    getTokenAtPosition,
    getTouchingPropertyName,
} from "@typescript/ast";
import type {
    Node,
    SourceFile,
} from "@typescript/ast";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
    after,
    before,
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Go JSON baseline format
// ---------------------------------------------------------------------------

interface TokenRun {
    startPos: number;
    endPos: number;
    kind: string;
    nodePos: number;
    nodeEnd: number;
}

/**
 * Expand run-length encoded Go baseline into a per-position map.
 */
function expandBaseline(runs: TokenRun[]): Map<number, { kind: string; pos: number; end: number; }> {
    const map = new Map<number, { kind: string; pos: number; end: number; }>();
    for (const run of runs) {
        const entry = { kind: run.kind, pos: run.nodePos, end: run.nodeEnd };
        for (let p = run.startPos; p <= run.endPos; p++) {
            map.set(p, entry);
        }
    }
    return map;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert an astnav result node to a string-based token info for comparison. */
function toTokenInfo(node: Node): { kind: string; pos: number; end: number; } {
    return {
        kind: formatSyntaxKind(node.kind),
        pos: node.pos,
        end: node.end,
    };
}

// ---------------------------------------------------------------------------
// Test configuration
// ---------------------------------------------------------------------------

const repoRoot = resolve(import.meta.dirname!, "..", "..", "..", "..");
const testFile = resolve(repoRoot, "_submodules/TypeScript/src/services/mapCode.ts");
const baselineDir = resolve(repoRoot, "testdata/baselines/reference/astnav");

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("astnav", () => {
    let fileText: string;

    try {
        fileText = readFileSync(testFile, "utf-8");
    }
    catch {
        console.log("Skipping astnav tests: submodule not available");
        fileText = "";
    }

    if (!fileText) return;

    // Use the Go API to parse the file — the resulting SourceFile is already
    // in our SyntaxKind/NodeFlags enum space with correct JSDoc structure.
    let api: API;
    let sourceFile: SourceFile;

    before(() => {
        api = new API({
            cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
            tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
            fs: createVirtualFileSystem({
                "/tsconfig.json": JSON.stringify({ files: ["/src/testFile.ts"] }),
                "/src/testFile.ts": fileText,
            }),
        });

        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sf = project.program.getSourceFile("/src/testFile.ts");
        assert.ok(sf, "Failed to get source file from API");
        sourceFile = sf;
    });

    after(() => {
        api.close();
    });

    const testCases = [
        {
            name: "getTokenAtPosition",
            baselineFile: "GetTokenAtPosition.mapCode.ts.baseline.json",
            fn: getTokenAtPosition,
        },
        {
            name: "getTouchingPropertyName",
            baselineFile: "GetTouchingPropertyName.mapCode.ts.baseline.json",
            fn: getTouchingPropertyName,
        },
    ];

    for (const tc of testCases) {
        test(tc.name, () => {
            const baselinePath = resolve(baselineDir, tc.baselineFile);
            const runs: TokenRun[] = JSON.parse(readFileSync(baselinePath, "utf-8"));
            const expected = expandBaseline(runs);

            const failures: string[] = [];

            for (let pos = 0; pos < fileText.length; pos++) {
                const result = toTokenInfo(tc.fn(sourceFile, pos));
                const goExpected = expected.get(pos);

                if (!goExpected) continue;

                if (result.kind !== goExpected.kind || result.pos !== goExpected.pos || result.end !== goExpected.end) {
                    failures.push(
                        `  pos ${pos}: expected ${goExpected.kind} [${goExpected.pos}, ${goExpected.end}), ` +
                            `got ${result.kind} [${result.pos}, ${result.end})`,
                    );
                    if (failures.length >= 50) {
                        failures.push("  ... (truncated, too many failures)");
                        break;
                    }
                }
            }

            console.log(`  ${tc.name}: checked ${fileText.length} positions`);

            if (failures.length > 0) {
                assert.fail(
                    `${tc.name}: ${failures.length} position(s) differ from Go baseline:\n` +
                        failures.join("\n"),
                );
            }
        });
    }
});
