// Update TypeScript Version

/// <reference path=".\typings\node\node.d.ts" />

import * as fs from "fs";
import * as path from "path";

const versionFilePath = "package.json";

interface FileInformation {
    filePath: string;
    ext: string;
    content: string;
}

interface FormatInformation {
    pattern: RegExp;
    serialize: (version: string) => string;
    nightlySerialize?: (nightlyVersion: string) => string;
}

/**
 * A minimal description for a parsed package.json object.
 */
interface PackageJson {
    name: string;
    version: string;
    keywords: string[];
}

/**
 * A map between filePath and FormatInformation.
 * A new file that need to be serialize and update version should be added in this map.
 */
const formats: {[idx: string]: FormatInformation} = {
    "src/compiler/program.ts": {
        pattern: /const\s*version\s*=\s*"[0-9]+\.[0-9]+\.[0-9]"/g,
        serialize: (version: string) => {
            return `const version = "${version}"`;
        },
        nightlySerialize: (nightlyVersion: string) => {
            return `const version = "${nightlyVersion}"`;
        }
    }
};

function getFileInformationSync(filePath: string): FileInformation {
    try {
        const data = fs.readFileSync(filePath, "utf8")
        return {
            filePath,
            content: data,
            ext: path.extname(filePath)
        }
    }
    catch (error) {
        throw new Error("Error in getFileInformationSync: " + error);
    }

}

function getVersionSync(): string {
    try {
        const packageJson: PackageJson = JSON.parse(fs.readFileSync(versionFilePath, "utf8"));
        return packageJson.version;
    }
    catch (error) {
        throw new Error("Error in getVersionSync: " + error);
    }
}

function distributeVersion() {
    const version = getVersionSync();

    for (const filePath in formats) {
        if (!fs.existsSync(filePath)) {
            continue;
        }
        const format = formats[filePath];
        const fileInfo = getFileInformationSync(filePath);

        try {
            fs.writeFileSync(fileInfo.filePath, fileInfo.content.replace(format.pattern,
                format.serialize(version)));
        }
        catch (err) {
            console.log(err);
        }
    }
}

function distributeNightlyVersion() {
    function computeNightlyVersion(versionString: string): string {
        // If the version string already contains "-nightly",
        // then get the base string and update based on that.
        const dashNightlyPos = versionString.indexOf("-dev");
        if (dashNightlyPos >= 0) {
            versionString = versionString.slice(0, dashNightlyPos);
        }

        // We're going to append a representation of the current time at the end of the current version.
        // String.prototype.toISOString() returns a 24-character string formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ',
        // but we'd prefer to just remove separators and limit ourselves to YYYYMMDD.
        // UTC time will always be implicit here.
        const now = new Date();
        const timeStr = now.toISOString().replace(/:|T|\.|-/g, "").slice(0, 8);

        return `${versionString}-dev.${timeStr}`;
    }

    const nightlyVersion = computeNightlyVersion(getVersionSync());

    for (const filePath in formats) {
        if (!fs.existsSync(filePath)) {
            continue;
        }
        const format = formats[filePath];
        // No nightly-serialization is defined
        if (!format.nightlySerialize) {
            continue;
        }

        const fileInfo = getFileInformationSync(filePath);

        try {
            fs.writeFileSync(fileInfo.filePath, fileInfo.content.replace(format.pattern,
                             format.nightlySerialize(nightlyVersion)));
        }
        catch (err) {
            console.log(err);
        }
    }
}

function main() {
    let validArguments = false;

    // Parse command line input checking if the users specify whether to configure version for nightly publishing
    if (process.argv.length > 2) {
        const distributionType = process.argv[2];

        if (distributionType ===  "-n" || distributionType === "--nightly") {
            validArguments = true;
            console.log("Distributing nightly version using version from version file");
            distributeNightlyVersion();
        }
        else if (distributionType === "-r" || distributionType === "--release") {
            validArguments = true
            console.log("Distributing release version using version from version file");
            distributeVersion();
        }
    }

    // Users either don't specify what type of distribution to run, or provide invalid arguments.
    if (!validArguments) {
        console.log(`
Usage: node distributeVersion.js [options]
Options:
    -n, --nightly: distribute nightly version (e.g. 1.8.0-dev.20151022)
    -r, --release: distribute release version (e.g. 1.8.0)
        `);
    }
}

main();