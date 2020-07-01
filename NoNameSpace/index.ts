
/**
 * steps to remove namespace
 * 1. remove namespaces in all ts files in src/*.
 * 2. use add all missing imports to auto-fix
 */

/**
 * Details about step1:
 * 1. ts.A.B
 * 1. ts.A.B
 * 2. namespace merge like partial keyword in c#
 * 3.
 */
import readline from "readline";
import path from "path";
import fs from "fs";

export const srcFolder = path.resolve(__dirname, "../src");

export async function walkFolder(filePath: string, match: (s: string) => boolean, fileCallback: (s: string) => void, finalCallback?: () => void) {
    let counter = 0;
    return (async function walker(filePath: string, match: (s: string) => boolean, fileCallback: (s: string) => void) {
        counter = counter + 1;
        const isDirectory = fs.lstatSync(filePath).isDirectory();
        if (!isDirectory) {
            if (match(filePath)) {
                await fileCallback(filePath);
            }
        }
        else {
            const subFileNames = fs.readdirSync(filePath);
            subFileNames.forEach(subFileName => walker(path.resolve(filePath, subFileName), match, fileCallback));
        }
        counter = counter - 1;
        if (counter === 0) {
            if (finalCallback){
                finalCallback();
            }
        }

    })(filePath, match, fileCallback);
}

async function fileCB(filePath: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        // crlfDelay: Infinity
    });
    let newFileContent = "";
    let removeNamespaceFlag = false;
    for await (const line of rl) {
        const namespaceRE = RegExp("^(declare )?namespace .*?\\{$");
        // const namespaceTsRE = RegExp("^(declare )?namespace ts \\{$");
        const namespaceEndRE = RegExp("^\\}$");
        // const noNamespaceTsdotRE = /(?<!namespace)(\W)ts\./g;
        const tsdotRE = /(\W)ts\./g;
        if (namespaceRE.test(line)) {
            //skip, not output
            removeNamespaceFlag = true;
        }
        else if (tsdotRE.test(line)) {
            const newline = line.replace(tsdotRE, "$1");
            newFileContent += newline;
        }
        else if (namespaceEndRE.test(line)) {
            if (!removeNamespaceFlag) {
                newFileContent += line;
            }
        }
        else {
            newFileContent += line;
        }
        newFileContent += "\r\n";
    }
    fs.writeFile(filePath, newFileContent, () => { });
}

export function tsMatch(filepath: string) {
    const tsAndNotDeclaration = RegExp("(?<!\\.d)\\.ts");
    if (tsAndNotDeclaration.test(filepath)) {
        return true;
    }
    return false;
}

walkFolder(srcFolder, tsMatch, fileCB);
