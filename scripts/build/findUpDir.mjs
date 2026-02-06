import { existsSync } from "fs";
import {
    dirname,
    join,
    resolve,
} from "path";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = dirname(__filename);

// search directories upward to avoid hard-wired paths based on the
// build tree (same as src/harness/findUpDir.ts)

/**
 * @param {string} name
 * @returns {string}
 */
export function findUpFile(name) {
    let dir = __dirname;
    while (true) {
        const fullPath = join(dir, name);
        if (existsSync(fullPath)) return fullPath;
        const up = resolve(dir, "..");
        if (up === dir) return name; // it'll fail anyway
        dir = up;
    }
}

/** @type {string | undefined} */
let findUpRootCache;

export const findUpRoot = () => findUpRootCache || (findUpRootCache = dirname(findUpFile("Herebyfile.mjs")));
