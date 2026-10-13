// Copies the current built client (packages/typescript/{dist,lib,package.json,vendor})
// and built/local/tsc into runs/builds/<name> so separate source revisions can be
// measured in interleaved order with compare-builds.mjs.
import { execFileSync } from "node:child_process";
import {
    cpSync,
    existsSync,
    mkdirSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import {
    outputRoot,
    repoRoot,
} from "./config.mjs";

const [name, sourceRoot = repoRoot] = process.argv.slice(2);
if (!name || !/^[\w.-]+$/.test(name)) throw new Error("Usage: node snapshot-build.mjs <name> [source-checkout]");
const destination = join(outputRoot, "builds", name);
if (existsSync(destination)) rmSync(destination, { recursive: true });
mkdirSync(destination, { recursive: true });
const client = join(sourceRoot, "packages/typescript");
for (const entry of ["dist", "lib", "package.json"]) cpSync(join(client, entry), join(destination, entry), { recursive: true });
cpSync(join(client, "vendor"), join(destination, "vendor"), { recursive: true });
cpSync(join(sourceRoot, "built/local"), join(destination, "built"), { recursive: true });
const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: sourceRoot, encoding: "utf8" }).trim();
const dirty = execFileSync("git", ["status", "--porcelain", "--", "packages", "tsc"], { cwd: sourceRoot, encoding: "utf8" }).trim();
writeFileSync(join(destination, "provenance.json"), JSON.stringify({ name, sha, dirty, created: new Date().toISOString() }, null, 2));
console.log(`Saved ${destination} (${sha}${dirty ? ", dirty" : ""})`);
