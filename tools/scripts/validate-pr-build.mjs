// Validates the tarballs produced by the PR build workflow before they are
// published to npm. The tarballs are built from unreviewed PR code, so nothing
// in them (including the publish manifest) is trusted; everything is checked
// against values computed by the trusted part of the workflow.
//
// Usage: node validate-pr-build.mjs <tarball dir> <prerelease> <git head> <packages>
//
// <packages> is the JSON package list written by typescript:build-platform-matrix
// when run from trusted code: { main, platforms: [...], wasm }.
//
// Prints the tarball file names in publish order, one per line.

import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [tarballDir, prerelease, gitHead, packagesJson] = process.argv.slice(2);
assert(tarballDir && prerelease && gitHead && packagesJson, "Usage: validate-pr-build.mjs <tarball dir> <prerelease> <git head> <packages>");
assert.match(prerelease, /^pr\.[1-9]\d*\.[1-9]\d*$/);
assert.match(gitHead, /^[0-9a-f]{40}$/);

/** @type {{ main: string; platforms: string[]; wasm: string }} */
const { main: mainName, platforms: platformNames, wasm: wasmName } = JSON.parse(packagesJson);
assert(typeof mainName === "string" && typeof wasmName === "string" && Array.isArray(platformNames) && platformNames.length > 0, "Invalid package list");
const expectedNames = new Set([mainName, ...platformNames, wasmName]);
const versionPattern = new RegExp(`^\\d+\\.\\d+\\.\\d+-${prerelease.replaceAll(".", "\\.")}$`);

/** @type {Map<string, { filename: string; version: string; manifest: any }>} */
const packages = new Map();
for (const filename of fs.readdirSync(tarballDir)) {
    if (!filename.endsWith(".tgz")) continue;
    const tarball = path.join(tarballDir, filename);

    // npm extracts everything under package/; reject anything that is not a
    // plain file or directory there.
    const listing = execFileSync("tar", ["-tvzf", tarball], { encoding: "utf8" }).split("\n").filter(Boolean);
    for (const line of listing) {
        const entryPath = line.split(/\s+/).slice(5).join(" ");
        assert(line[0] === "-" || line[0] === "d", `${filename}: unexpected entry type: ${line}`);
        assert(entryPath.startsWith("package/") && !entryPath.split("/").includes(".."), `${filename}: unexpected path: ${entryPath}`);
    }

    const manifest = JSON.parse(execFileSync("tar", ["-xzOf", tarball, "package/package.json"], { encoding: "utf8" }));
    const { name, version } = manifest;
    assert(expectedNames.has(name), `${filename}: unexpected package name ${name}`);
    assert(!packages.has(name), `${filename}: duplicate package ${name}`);
    assert.match(version, versionPattern, `${filename}: unexpected version`);
    assert.equal(manifest.gitHead, gitHead, `${filename}: unexpected gitHead`);
    assert.deepEqual(manifest.publishConfig, { access: "public", tag: "pr" }, `${filename}: unexpected publishConfig`);
    // No lifecycle scripts; installing a PR build must not run code.
    assert.equal(manifest.scripts, undefined, `${filename}: must not declare scripts`);
    for (const field of ["dependencies", "peerDependencies", "bundleDependencies", "bundledDependencies"]) {
        assert.equal(manifest[field], undefined, `${filename}: must not declare ${field}`);
    }
    if (name === mainName) {
        assert.deepEqual(manifest.bin, { tsc: "./bin/tsc" }, `${filename}: unexpected bin`);
    }
    else {
        assert.equal(manifest.bin, undefined, `${filename}: must not declare bin`);
        assert.equal(manifest.optionalDependencies, undefined, `${filename}: must not declare optionalDependencies`);
    }
    packages.set(name, { filename, version, manifest });
}

for (const name of expectedNames) {
    assert(packages.has(name), `Missing package ${name}`);
}

const versions = new Set([...packages.values()].map(p => p.version));
assert.equal(versions.size, 1, `Packages have mismatched versions: ${[...versions].join(", ")}`);
const [version] = versions;

const main = /** @type {NonNullable<ReturnType<typeof packages.get>>} */ (packages.get(mainName));
assert.deepEqual(
    main.manifest.optionalDependencies,
    Object.fromEntries(platformNames.map(name => [name, version])),
    "Main package must depend on exactly the platform packages at the same version",
);

// Platform and WASM packages first, so the main package never refers to a
// version that does not exist yet.
for (const name of [...platformNames, wasmName, mainName]) {
    console.log(packages.get(name)?.filename);
}
