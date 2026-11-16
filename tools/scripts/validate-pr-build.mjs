// Validates the tarballs produced by the PR build workflow before they are
// published to npm. The tarballs are built from unreviewed PR code, so nothing
// in them (including the publish manifest) is trusted; everything is checked
// against values computed by the trusted part of the workflow.
//
// Each tarball is extracted into <output dir>, and the extracted files are
// validated and published; npm never reads the tarballs.
//
// Usage: node validate-pr-build.mjs <tarball dir> <output dir> <prerelease> <git head> <packages>
//
// <packages> is the JSON package list written by typescript:build-platform-matrix
// when run from trusted code: { main, platforms: [...], wasm }.
//
// Prints the extracted package directories in publish order, one per line.

import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [tarballDir, outputDir, prerelease, gitHead, packagesJson] = process.argv.slice(2);
assert(tarballDir && outputDir && prerelease && gitHead && packagesJson, "Usage: validate-pr-build.mjs <tarball dir> <output dir> <prerelease> <git head> <packages>");
assert.deepEqual(fs.readdirSync(outputDir), [], "Output directory must be empty");
assert.match(prerelease, /^pr\.[1-9]\d*\.[1-9]\d*$/);
assert.match(gitHead, /^[0-9a-f]{40}$/);

/** @type {{ main: string; platforms: string[]; wasm: string }} */
const { main: mainName, platforms: platformNames, wasm: wasmName } = JSON.parse(packagesJson);
assert(typeof mainName === "string" && typeof wasmName === "string" && Array.isArray(platformNames) && platformNames.length > 0, "Invalid package list");
const expectedNames = new Set([mainName, ...platformNames, wasmName]);
const versionPattern = new RegExp(`^\\d+\\.\\d+\\.\\d+-${prerelease.replaceAll(".", "\\.")}$`);

// npm gives some root files (binding.gyp, npm-shrinkwrap.json, node_modules)
// install-time meaning, so only allow what the packages actually contain.
const allowedRootEntries = new Set(["LICENSE", "NOTICE.txt", "README.md", "bin", "dist", "enums", "lib", "package.json", "schemas", "vendor"]);

// Many package.json fields affect installation, so only allow the ones in use.
const allowedManifestFields = new Set([
    "author",
    "bin",
    "bugs",
    "cpu",
    "description",
    "engines",
    "exports",
    "files",
    "gitHead",
    "homepage",
    "keywords",
    "license",
    "name",
    "optionalDependencies",
    "os",
    "preferUnplugged",
    "publishConfig",
    "repository",
    "type",
    "version",
]);

/** @type {Map<string, { packageDir: string; version: string; manifest: any }>} */
const packages = new Map();
const tarballs = fs.readdirSync(tarballDir).filter(filename => filename.endsWith(".tgz"));
for (const [index, filename] of tarballs.entries()) {
    // npm publish parses some paths as git URLs, so don't use the tarball name.
    const extractDir = path.join(outputDir, String(index));
    fs.mkdirSync(extractDir);
    execFileSync("tar", ["-xzf", path.join(tarballDir, filename), "-C", extractDir, "--no-same-owner", "--no-same-permissions"]);

    // Only allow plain files and directories under package/.
    const pending = [extractDir];
    for (const dir of pending) {
        for (const name of fs.readdirSync(dir)) {
            const entryPath = path.join(dir, name);
            const relativePath = path.relative(extractDir, entryPath);
            const segments = relativePath.split(path.sep);
            const stat = fs.lstatSync(entryPath);
            assert(stat.isDirectory() || (stat.isFile() && stat.nlink === 1), `${filename}: unexpected entry type: ${relativePath}`);
            assert(segments[0] === "package" && (segments.length > 1 || stat.isDirectory()), `${filename}: unexpected path: ${relativePath}`);
            assert(segments.length !== 2 || allowedRootEntries.has(segments[1]), `${filename}: unexpected root entry: ${relativePath}`);
            if (stat.isDirectory()) {
                pending.push(entryPath);
            }
        }
    }

    const packageDir = path.join(extractDir, "package");
    const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
    const { name, version } = manifest;
    assert(expectedNames.has(name), `${filename}: unexpected package name ${name}`);
    assert(!packages.has(name), `${filename}: duplicate package ${name}`);
    assert.match(version, versionPattern, `${filename}: unexpected version`);
    assert.equal(manifest.gitHead, gitHead, `${filename}: unexpected gitHead`);
    assert.deepEqual(manifest.publishConfig, { access: "public", tag: "pr" }, `${filename}: unexpected publishConfig`);
    for (const field of Object.keys(manifest)) {
        assert(allowedManifestFields.has(field), `${filename}: unexpected package.json field ${field}`);
    }
    if (name === mainName) {
        assert.deepEqual(manifest.bin, { tsc: "./bin/tsc" }, `${filename}: unexpected bin`);
    }
    else {
        assert.equal(manifest.bin, undefined, `${filename}: must not declare bin`);
        assert.equal(manifest.optionalDependencies, undefined, `${filename}: must not declare optionalDependencies`);
    }
    packages.set(name, { packageDir, version, manifest });
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
    console.log(packages.get(name)?.packageDir);
}
