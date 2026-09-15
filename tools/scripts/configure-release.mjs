import fs from "node:fs";

import { isSemVer } from "./semver.mjs";

const [version, expectedMajorMinor] = process.argv.slice(2);

if (!version || !isSemVer(version)) {
    throw new Error("Usage: node tools/scripts/configure-release.mjs <semver> [expected-major.minor]");
}

const majorMinor = version.split(".", 2).join(".");
if (expectedMajorMinor && expectedMajorMinor !== majorMinor) {
    throw new Error(`Version ${version} has major.minor ${majorMinor}, not ${expectedMajorMinor}`);
}

updateFile(
    "tsc/internal/core/version.go",
    /var version = "[^"]+"/g,
    `var version = "${version}"`,
);
updateFile(
    "Herebyfile.mjs",
    /const nativePreviewReleaseVersion = \/\*\* @type \{string \| undefined\} \*\/ \([^)]*\);/g,
    `const nativePreviewReleaseVersion = /** @type {string | undefined} */ ("${version}");`,
);

function updateFile(path, pattern, replacement) {
    const source = fs.readFileSync(path, "utf8");
    const matches = source.match(pattern);
    if (matches?.length !== 1) {
        throw new Error(`Expected exactly one release version declaration in ${path}, found ${matches?.length ?? 0}`);
    }
    fs.writeFileSync(path, source.replace(pattern, replacement));
}
