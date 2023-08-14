import assert from "assert";
import fs from "fs";
import glob from "glob";
import JSONC from "jsonc-parser";
import path from "path";
import url from "url";


const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);


// This script checks that we list all transitive references in all tsconfig.json files.
// See: https://github.com/microsoft/TypeScript/issues/30608


/**
 * @param {string} p
 */
function getTsconfigPath(p) {
    if (fs.statSync(p).isDirectory()) {
        p += "/tsconfig.json";
    }
    else if (!p.endsWith(".json")) {
        p += ".json";
    }
    return p;
}

/**
 * @param {string} p
 */
function getReferences(p) {
    const result = getReferencesWorker(p, new Set());
    assert(result);
    return result;

    /**
     * @param {string} p
     * @param {Set<string>} seen
     */
    function getReferencesWorker(p, seen) {
        const tsconfigPath = getTsconfigPath(p);
        if (seen.has(tsconfigPath)) {
            return undefined;
        }
        seen.add(tsconfigPath);

        const dir = path.dirname(tsconfigPath);
        const contents = JSONC.parse(fs.readFileSync(tsconfigPath, "utf8"));
        const references = new Set();
        for (const r of contents.references || []) {
            references.add(path.resolve(dir, r.path));
        }

        const transitiveReferences = new Set();
        for (const r of references) {
            const result = getReferencesWorker(r, seen);
            if (!result) continue;

            const [otherReferences, otherTransitiveReferences] = result;
            for (const r of otherReferences) {
                transitiveReferences.add(r);
            }
            for (const r of otherTransitiveReferences) {
                transitiveReferences.add(r);
            }
        }

        return [references, transitiveReferences];
    }
}

const paths = glob.sync("src/**/*tsconfig*.json", { cwd: path.resolve(__dirname, "..") });
for (const p of paths) {
    const [references, transitiveReferences] = getReferences(p);

    for (const r of transitiveReferences) {
        if (!references.has(r)) {
            console.error(`${p} should reference ${path.relative(path.dirname(p), r)}`);
            process.exitCode = 1;
        }
    }
}
