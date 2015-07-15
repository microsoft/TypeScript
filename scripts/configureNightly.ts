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
    const packageJsonContents = sys.readFile(packageJsonFilePath);
    const packageJsonValue: PackageJson = JSON.parse(packageJsonContents);

    const nightlyVersion = getNightlyVersionString(packageJsonValue.version);

    // Modify the package.json structure
    packageJsonValue.version = nightlyVersion;

    if (packageJsonValue.name !== "typescript-nightly") {
        packageJsonValue.name = "typescript-nightly";
        packageJsonValue.keywords.push("nightly", "alpha", "beta", "prerelease");
    }

    // Acquire and modify the source file that exposes the version string.
    const tsFilePath = ts.normalizePath(sys.args[1]);
    const tsFileContents = sys.readFile(tsFilePath);
    const versionAssignmentRegExp = /export\s+const\s+version\s+=\s+".*";/;
    const modifiedTsFileContents = tsFileContents.replace(versionAssignmentRegExp, `export const version = "${nightlyVersion}";`);

    // Ensure we are actually changing something - the user probably wants to know that the update failed.
    if (tsFileContents === modifiedTsFileContents) {
        throw `File '${tsFilePath}' did not contain pattern ${versionAssignmentRegExp}`;
    }

    // Finally write the changes to disk.
    sys.writeFile(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 4))
    sys.writeFile(tsFilePath, modifiedTsFileContents);
}

function getNightlyVersionString(versionString: string): string {
    // If the version string already contains "-nightly",
    // then get the base string and update based on that.
    const dashNightlyPos = versionString.indexOf("-nightly");
    if (dashNightlyPos >= 0) {
        versionString = versionString.slice(0, dashNightlyPos);
    }

    // We're going to append a representation of the current time at the end of the current version.
    // String.prototype.toISOString() returns a 24-character string formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ',
    // but we'd prefer to just use hyphens as separators instead of 'T', ':', and '.'.
    // The trailing 'Z' in this string can be removed; UTC time will always be implicit here.
    const now = new Date();
    const timeStr = now.toISOString().slice(0, -1).replace(/:|T|\./g, "-");

    return `${versionString}-nightly-${timeStr}`;
}

main();