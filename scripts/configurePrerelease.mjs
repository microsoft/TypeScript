import assert from "assert";
import {
    readFileSync,
    writeFileSync,
} from "fs";
import {
    normalize,
    relative,
} from "path";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));

/**
 * A minimal description for a parsed package.json object.
 * @typedef {{
    name: string;
    version: string;
    keywords: string[];
}} PackageJson
 */

function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        const thisProgramName = relative(process.cwd(), __filename);
        console.log("Usage:");
        console.log(`\tnode ${thisProgramName} <dev|insiders> <package.json location> <file containing version>`);
        return;
    }

    const tag = args[0];
    if (tag !== "dev" && tag !== "insiders" && tag !== "experimental") {
        throw new Error(`Unexpected tag name '${tag}'.`);
    }

    // Acquire the version from the package.json file and modify it appropriately.
    const packageJsonFilePath = normalize(args[1]);
    /** @type {PackageJson} */
    const packageJsonValue = JSON.parse(readFileSync(packageJsonFilePath).toString());

    const { majorMinor, patch } = parsePackageJsonVersion(packageJsonValue.version);
    const prereleasePatch = getPrereleasePatch(tag, patch);

    // Acquire and modify the source file that exposes the version string.
    const tsFilePath = normalize(args[2]);
    const tsFileContents = readFileSync(tsFilePath).toString();
    const modifiedTsFileContents = updateTsFile(tsFilePath, tsFileContents, majorMinor, patch, prereleasePatch);

    // Ensure we are actually changing something - the user probably wants to know that the update failed.
    if (tsFileContents === modifiedTsFileContents) {
        let err = `\n  '${tsFilePath}' was not updated while configuring for a prerelease publish for '${tag}'.\n    `;
        err += `Ensure that you have not already run this script; otherwise, erase your changes using 'git checkout -- "${tsFilePath}"'.`;
        throw new Error(err + "\n");
    }

    // Finally write the changes to disk.
    // Modify the package.json structure
    packageJsonValue.version = `${majorMinor}.${prereleasePatch}`;
    writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonValue, undefined, 4));
    writeFileSync(tsFilePath, modifiedTsFileContents);
}

/* eslint-disable no-restricted-syntax */
/**
 * @param {string} tsFilePath
 * @param {string} tsFileContents
 * @param {string} majorMinor
 * @param {string} patch
 * @param {string} nightlyPatch
 * @returns {string}
 */
function updateTsFile(tsFilePath, tsFileContents, majorMinor, patch, nightlyPatch) {
    const majorMinorRgx = /export const versionMajorMinor = "(\d+\.\d+)"/;
    const majorMinorMatch = majorMinorRgx.exec(tsFileContents);
    assert(majorMinorMatch !== null, `The file '${tsFilePath}' seems to no longer have a string matching '${majorMinorRgx}'.`);
    const parsedMajorMinor = majorMinorMatch[1];
    assert(parsedMajorMinor === majorMinor, `versionMajorMinor does not match. ${tsFilePath}: '${parsedMajorMinor}'; package.json: '${majorMinor}'`);

    const versionRgx = /export const version(?:: string)? = `\$\{versionMajorMinor\}\.(\d)(-\w+)?`;/;
    const patchMatch = versionRgx.exec(tsFileContents);
    assert(patchMatch !== null, `The file '${tsFilePath}' seems to no longer have a string matching '${versionRgx.toString()}'.`);
    const parsedPatch = patchMatch[1];
    if (parsedPatch !== patch) {
        throw new Error(`patch does not match. ${tsFilePath}: '${parsedPatch}; package.json: '${patch}'`);
    }

    return tsFileContents.replace(versionRgx, `export const version: string = \`\${versionMajorMinor}.${nightlyPatch}\`;`);
}

/**
 * @param {string} versionString
 * @returns {{ majorMinor: string, patch: string }}
 */
function parsePackageJsonVersion(versionString) {
    const versionRgx = /(\d+\.\d+)\.(\d+)($|-)/;
    const match = versionString.match(versionRgx);
    assert(match !== null, "package.json 'version' should match " + versionRgx.toString());
    return { majorMinor: match[1], patch: match[2] };
}
/* eslint-enable no-restricted-syntax */

/**
 * e.g. 0-dev.20170707
 * @param {string} tag
 * @param {string} plainPatch
 * @returns {string}
 */
function getPrereleasePatch(tag, plainPatch) {
    // We're going to append a representation of the current time at the end of the current version.
    // String.prototype.toISOString() returns a 24-character string formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ',
    // but we'd prefer to just remove separators and limit ourselves to YYYYMMDD.
    // UTC time will always be implicit here.
    const now = new Date();
    const timeStr = now.toISOString().replace(/[:T.-]/g, "").slice(0, 8);

    return `${plainPatch}-${tag}.${timeStr}`;
}

main();
