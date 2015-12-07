// Update TypeScript Version

/// <reference path="..\typings\node\node.d.ts" />

import * as fs from "fs";
import * as path from "path";

let versionFilePath: string;

interface FileInformation {
    filePath: string;
    ext: string;
    content: string;
}

interface FormatInformation {
    pattern: RegExp;
    serialize: (version: string) => string;
}

/**
 * A minimal description for a parsed package.json object.
 */
interface VersionJson {
    version: string[];
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
        }
    },
    "package.json": {
        pattern: /"version"\s*:\s*"[0-9]+\.[0-9]+\.[0-9]"/g,
        serialize: (version: string) => {
            return `"version": "${version}"`;
        }
    }
};

function getFileInformationSync(filePath: string): FileInformation {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return {
            filePath,
            content: data,
            ext: path.extname(filePath)
        };
    }
    catch (error) {
        throw new Error("Error in getFileInformationSync: " + error);
    }

}

function getVersionSync(): string {
    try {
        const packageJson: VersionJson = JSON.parse(fs.readFileSync(versionFilePath, "utf8"));
        // The version has 4 digits, we only need 3
        const version = packageJson.version;
        return version.slice(0,3).join(".");
    }
    catch (error) {
        throw new Error("Error in getVersionSync: " + error);
    }
}

function distributeVersion(version: string) {
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

function distributeReleaseVersion() {
    distributeVersion(getVersionSync());
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
    distributeVersion(nightlyVersion);
}

enum DistributionType {
    nightly,
    release,
    invalid
}

function displayUsage() {
    console.log(`
Usage: node distributeVersion.js [options]
Options:
    -n, --nightly: distribute nightly version (e.g. 1.8.0-dev.20151022)
    -r, --release: distribute release version (e.g. 1.8.0)
    -v, --versionFile: a path to the version file (see version.json)
            `);
}

function main() {
    let distributionType: DistributionType = DistributionType.invalid;

    // Parse command line input checking if the users specify whether to configure version for nightly publishing
    if (process.argv.length > 3) {       
        for (let i = 2; i < process.argv.length; ++i) {
            const argv = process.argv[i];
            if (argv ===  "-n" || argv === "--nightly") {
                distributionType = DistributionType.nightly;
            }
            else if (argv === "-r" || argv === "--release") {
                distributionType = DistributionType.release;
            }
            else if (argv === "-v" || argv === "--versionFile") {
                versionFilePath = process.argv[++i];
            }
        }
    }
    
    if (!versionFilePath) {
        displayUsage();
        return;
    }
    
    switch(distributionType) {
        case DistributionType.nightly:
            console.log("Distributing nightly version using version from version file");
            distributeNightlyVersion();
            break;
        case DistributionType.release:
            console.log("Distributing release version using version from version file");
            distributeReleaseVersion();
            break;
        default:
            displayUsage();
            break;
    }
}

main();