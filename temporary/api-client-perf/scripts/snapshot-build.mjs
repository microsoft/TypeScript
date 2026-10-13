// Copies the current built client (packages/typescript/{dist,lib,package.json,vendor})
// and built/local/tsc into runs/builds/<name> so separate source revisions can be
// measured in interleaved order with compare-builds.mjs.
import { execFileSync } from "node:child_process";
import {
    cpSync,
    existsSync,
    mkdirSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import {
    outputRoot,
    repoRoot,
} from "./config.mjs";

const name = process.argv[2];
if (!name || !/^[\w.-]+$/.test(name)) throw new Error("Usage: node snapshot-build.mjs <name>");
const destination = join(outputRoot, "builds", name);
if (existsSync(destination)) rmSync(destination, { recursive: true });
mkdirSync(destination, { recursive: true });
const client = join(repoRoot, "packages/typescript");
for (const entry of ["dist", "lib", "package.json"]) cpSync(join(client, entry), join(destination, entry), { recursive: true });
symlinkSync(join(client, "vendor"), join(destination, "vendor"));
cpSync(join(repoRoot, "built/local"), join(destination, "built"), { recursive: true });
const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const dirty = execFileSync("git", ["status", "--porcelain", "--", "packages", "tsc"], { cwd: repoRoot, encoding: "utf8" }).trim();
writeFileSync(join(destination, "provenance.json"), JSON.stringify({ name, sha, dirty, created: new Date().toISOString() }, null, 2));
console.log(`Saved ${destination} (${sha}${dirty ? ", dirty" : ""})`);
