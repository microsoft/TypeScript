// Update TypeScript Version

/// <reference path="../src/harness/external/node.d.ts" />
"use strict";
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
        pattern: /version\s*=\s*"[0-9]+\.[0-9]+\.[0-9]"/g,
        serialize: (version: string) => {
            return `version = "${version}"`;
        },
        nightlySerialize: (nightlyVersion: string) => {
            return `version = "${nightlyVersion}"`;
        }
    }
};

function getFileExtension(filePath: string): string {
    const pieces = filePath.split(".");
    return pieces.length < 2 ? "" : pieces[pieces.length - 1];
}

function getFileInformationSync(filePath: string): FileInformation {
    try {
        const data = fs.readFileSync(filePath, "utf8")
        return {
            filePath,
            content: data,
            ext: getFileExtension(filePath)
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
        try {
            const fileInfo = getFileInformationSync(filePath);
            const format = formats[filePath];
            fs.writeFile(fileInfo.filePath, fileInfo.content.replace(format.pattern,
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
        try {
            const fileInfo = getFileInformationSync(filePath);

            fs.writeFile(fileInfo.filePath, fileInfo.content.replace(format.pattern,
                                            format.nightlySerialize(nightlyVersion)));
        }
        catch (err) {
            console.log(err);
        }
    }
}

function main() {
    let  distributeNightly = false;

    // Parse command line input checking if the users specify whether to configure version for nightly publishing
    if (process.argv.length > 2) {
        // Parse command line arguments
        const arg0 = process.argv[2];

        if (arg0 === "-h" || arg0 === "--help") {
            // display help and exit
            console.log("Usage: ");
            console.log("\tnode distributeVersion.js (--nightly || -n)");
            return;
        }
        else if (arg0 === "-n" || arg0 === "--nightly") {
            distributeNightly = true;
        }
        else {
            return;
        }
    }

    if (distributeNightly) {
        console.log("Distributing nightly version using base version from package.json");
        distributeNightlyVersion();
    }
    else {
        console.log("Distributing version using version from package.json");
        distributeVersion();
    }
}

main();