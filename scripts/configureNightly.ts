/// <reference path="../src/compiler/sys.ts" />

/**
 * A minimal description for a parsed package.json object.
 */
interface PackageJson {
    name: string;
    version: string;
    keywords: string[];
}

function main(): void {
    const sys = ts.sys;
    if (sys.args.length < 2) {
        sys.write("Usage:" + sys.newLine)
        sys.write("\tnode configureNightly.js <package.json location> <file containing version>" + sys.newLine);
        return;
    }

    // Acquire the version from the package.json file and modify it appropriately.
    const packageJsonFilePath = ts.normalizePath(sys.args[0]);
    const packageJsonValue: PackageJson = JSON.parse(sys.readFile(packageJsonFilePath));

    const { majorMinor, patch } = parsePackageJsonVersion(packageJsonValue.version);
    const nightlyPatch = getNightlyPatch(patch);

    // Acquire and modify the source file that exposes the version string.
    const tsFilePath = ts.normalizePath(sys.args[1]);
    const tsFileContents = ts.sys.readFile(tsFilePath);
    const modifiedTsFileContents = updateTsFile(tsFilePath, tsFileContents, majorMinor, patch, nightlyPatch);

    // Ensure we are actually changing something - the user probably wants to know that the update failed.
    if (tsFileContents === modifiedTsFileContents) {
        let err = `\n  '${tsFilePath}' was not updated while configuring for a nightly publish.\n    `;
        err += `Ensure that you have not already run this script; otherwise, erase your changes using 'git checkout -- "${tsFilePath}"'.`;
        throw err + "\n";
    }

    // Finally write the changes to disk.
    // Modify the package.json structure
    packageJsonValue.version = `${majorMinor}.${nightlyPatch}`;
    sys.writeFile(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 4))
    sys.writeFile(tsFilePath, modifiedTsFileContents);
}

function updateTsFile(tsFilePath: string, tsFileContents: string, majorMinor: string, patch: string, nightlyPatch: string): string {
    const majorMinorRgx = /export const versionMajorMinor = "(\d+\.\d+)"/;
    const majorMinorMatch = majorMinorRgx.exec(tsFileContents);
    ts.Debug.assert(majorMinorMatch !== null, "", () => `The file seems to no longer have a string matching '${majorMinorRgx}'.`);
    const parsedMajorMinor = majorMinorMatch[1];
    ts.Debug.assert(parsedMajorMinor === majorMinor, "versionMajorMinor does not match.", () => `${tsFilePath}: '${parsedMajorMinor}'; package.json: '${majorMinor}'`);

    const versionRgx = /export const version = `\$\{versionMajorMinor\}\.(\d)`;/;
    const patchMatch = versionRgx.exec(tsFileContents);
    ts.Debug.assert(patchMatch !== null, "The file seems to no longer have a string matching", () => versionRgx.toString());
    const parsedPatch = patchMatch[1];
    if (parsedPatch !== patch) {
        throw new Error(`patch does not match. ${tsFilePath}: '${parsedPatch}; package.json: '${patch}'`);
    }

    return tsFileContents.replace(versionRgx, `export const version = \`\${versionMajorMinor}.${nightlyPatch}\`;`);
}

function parsePackageJsonVersion(versionString: string): { majorMinor: string, patch: string } {
    const versionRgx = /(\d+\.\d+)\.(\d+)($|\-)/;
    const match = versionString.match(versionRgx);
    ts.Debug.assert(match !== null, "package.json 'version' should match", () => versionRgx.toString());
    return { majorMinor: match[1], patch: match[2] };
}

/** e.g. 0-dev.20170707 */
function getNightlyPatch(plainPatch: string): string {
    // We're going to append a representation of the current time at the end of the current version.
    // String.prototype.toISOString() returns a 24-character string formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ',
    // but we'd prefer to just remove separators and limit ourselves to YYYYMMDD.
    // UTC time will always be implicit here.
    const now = new Date();
    const timeStr = now.toISOString().replace(/:|T|\.|-/g, "").slice(0, 8);

    return `${plainPatch}-dev.${timeStr}`;
}

main();