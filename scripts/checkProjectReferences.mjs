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
    const tsconfigPath = getTsconfigPath(p);
    const dir = path.dirname(tsconfigPath);
    const contents = JSONC.parse(fs.readFileSync(tsconfigPath, "utf8"));
    const references = new Set();
    for (const r of contents.references || []) {
        references.add(path.resolve(dir, r.path));
    }

    const transitiveReferences = new Set();
    for (const r of references) {
        const [references, parentTransitiveReferences] = getReferences(r);
        for (const r of references) {
            transitiveReferences.add(r);
        }
        for (const r of parentTransitiveReferences) {
            transitiveReferences.add(r);
        }
    }

    return [references, transitiveReferences];
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
