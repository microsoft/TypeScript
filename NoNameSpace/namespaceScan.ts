import readline from "readline";
import fs from "fs";
import path from "path";
import { walkFolder, srcFolder, tsMatch } from ".";

/**
 * namespace name: {position:,times:}
 */

const nameSpaceMap: { [name: string]: { [position: string]: number } } = {};

async function fileCB(filePath: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        // crlfDelay: Infinity
    });
    for await (const line of rl) {
        const namespaceNameRE = RegExp("(?<=^(declare )?namespace ).*(?= \\{$)");

        if (namespaceNameRE.test(line)) {
            const nameSpaceName = namespaceNameRE.exec(line)![0];
            if (!nameSpaceMap[nameSpaceName]) {
                nameSpaceMap[nameSpaceName] = {};
            }
            const pathNumberMap = nameSpaceMap[nameSpaceName];
            if (!pathNumberMap[filePath]) {
                pathNumberMap[filePath] = 0;
            }
            const times = pathNumberMap[filePath];
            pathNumberMap[filePath] = times + 1;
        }
    }
}

walkFolder(srcFolder, tsMatch, fileCB, () => {
    fs.writeFile(path.resolve(__dirname, "namespacePath.json"), JSON.stringify(nameSpaceMap), () => { });
});
