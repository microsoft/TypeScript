import assert from "node:assert";
import { readFileSync } from "node:fs";
import {
    dirname,
    join,
} from "node:path";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(testDir, "..", "..", "..");
const goOptionsPath = join(repoRoot, "internal", "core", "compileroptions.go");
const tsOptionsPath = join(testDir, "..", "src", "api", "compilerOptions.ts");
const exposedInternalOptions = new Set(["configFilePath"]);

/**
 * Extracts the JSON tag names of the fields exposed in the TypeScript API.
 * These are the public, non-deprecated Go fields plus explicitly selected
 * internal fields.
 */
function getGoApiOptionNames(): Set<string> {
    const source = readFileSync(goOptionsPath, "utf-8");
    const structMatch = source.match(/type CompilerOptions struct \{([\s\S]*?)\n\}/);
    assert.ok(structMatch, "Could not find `type CompilerOptions struct` in compileroptions.go");

    let body = structMatch[1];
    const internalMarker = body.indexOf("// Internal fields");
    assert.notStrictEqual(internalMarker, -1, "Could not find `// Internal fields` marker in compileroptions.go");
    const internalBody = body.slice(internalMarker);
    body = body.slice(0, internalMarker);

    const names = new Set<string>();
    let prevDeprecated = false;
    for (const rawLine of body.split("\n")) {
        const line = rawLine.trim();
        if (line === "") continue;

        const tagMatch = line.match(/`json:"([^",]+)/);
        if (tagMatch) {
            // A field's `// Deprecated:` doc comment sits on the line directly above it.
            if (!prevDeprecated) {
                names.add(tagMatch[1]);
            }
            prevDeprecated = false;
        }
        else {
            prevDeprecated = line.startsWith("// Deprecated:");
        }
    }
    for (const match of internalBody.matchAll(/`json:"([^",]+)/g)) {
        if (exposedInternalOptions.has(match[1])) {
            names.add(match[1]);
        }
    }
    return names;
}

/**
 * Extracts the property names of the TS `CompilerOptions` interface.
 */
function getTsOptionNames(): Set<string> {
    const source = readFileSync(tsOptionsPath, "utf-8");
    const interfaceMatch = source.match(/export interface CompilerOptions \{([\s\S]*?)\n\}/);
    assert.ok(interfaceMatch, "Could not find `export interface CompilerOptions` in compilerOptions.ts");

    const names = new Set<string>();
    for (const line of interfaceMatch[1].split("\n")) {
        const propMatch = line.match(/^\s*([A-Za-z_]\w*)\??:/);
        if (propMatch) {
            names.add(propMatch[1]);
        }
    }
    return names;
}

describe("CompilerOptions type stays in sync with Go", () => {
    const goNames = getGoApiOptionNames();
    const tsNames = getTsOptionNames();

    test("sanity: both sides parsed a plausible number of options", () => {
        assert.ok(goNames.size > 50, `Parsed too few Go options (${goNames.size}); parser likely broke`);
        assert.ok(tsNames.size > 50, `Parsed too few TS options (${tsNames.size}); parser likely broke`);
    });

    test("no public Go option is missing from the TS interface", () => {
        const missing = [...goNames].filter(n => !tsNames.has(n)).sort();
        assert.deepStrictEqual(
            missing,
            [],
            `The following public compiler options exist in internal/core/compileroptions.go but are missing from `
                + `src/api/compilerOptions.ts. Add them, or, if they are internal, move them after the `
                + `"// Internal fields" marker (or annotate them with a "// Deprecated:" comment) in the Go struct:\n  ${missing.join("\n  ")}`,
        );
    });

    test("no TS option is absent from the public Go struct", () => {
        const extra = [...tsNames].filter(n => !goNames.has(n)).sort();
        assert.deepStrictEqual(
            extra,
            [],
            `The following options exist in src/api/compilerOptions.ts but are not public fields of `
                + `internal/core/compileroptions.go (they may have been removed, renamed, or marked internal):\n  ${extra.join("\n  ")}`,
        );
    });
});
