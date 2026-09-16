import fs from "node:fs";

const numericIdentifier = String.raw`(?:0|[1-9]\d*)`;
const releaseVersionPattern = new RegExp(
    String.raw`^(${numericIdentifier})\.(${numericIdentifier})\.(${numericIdentifier})(?:-(beta|rc))?$`,
);
const maxUint32 = 0xffff_ffffn;

const [version, expectedMajorMinor] = process.argv.slice(2);

if (!version || !isReleaseVersion(version)) {
    throw new Error(
        "Usage: node tools/scripts/configure-release.mjs <major.minor.0-beta|major.minor.1-rc|major.minor.patch (patch >= 2)> [expected-major.minor]",
    );
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

/**
 * @param {string} value
 */
function isReleaseVersion(value) {
    const match = releaseVersionPattern.exec(value);
    if (match === null || !match.slice(1, 4).every(component => BigInt(component) <= maxUint32)) {
        return false;
    }

    const patch = BigInt(match[3]);
    switch (match[4]) {
        case "beta":
            return patch === 0n;
        case "rc":
            return patch === 1n;
        default:
            return patch >= 2n;
    }
}

function updateFile(path, pattern, replacement) {
    const source = fs.readFileSync(path, "utf8");
    const matches = source.match(pattern);
    if (matches?.length !== 1) {
        throw new Error(`Expected exactly one release version declaration in ${path}, found ${matches?.length ?? 0}`);
    }
    fs.writeFileSync(path, source.replace(pattern, replacement));
}
