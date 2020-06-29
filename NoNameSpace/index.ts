
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

const rootFolder = path.resolve(__dirname, "./example");

function walkFolder(filePath: string, match: (s: string) => boolean, fileCallback: (s: string) => void) {
    const isDirectory = fs.lstatSync(filePath).isDirectory();
    if (!isDirectory) {
        if (match(filePath)) {
            fileCallback(filePath);
        }
    }
    else {
        const subFileNames = fs.readdirSync(filePath);
        subFileNames.forEach(subFileName => walkFolder(path.resolve(filePath, subFileName), match, fileCallback));
    }
}

async function fileCB(filePath: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let newFileContent = "";
    let namespaceFlag = false;
    for await (let line of rl) {
        const namespaceRE = RegExp("^(declare )?namespace ts.*?\\{");
        const namespaceEndRE = RegExp("^\\}");
        const tsdotRE = RegExp("(?<!namespace)(\\W)ts\\.");
        if (namespaceRE.test(line)) {
            //skip, not output
            namespaceFlag = true;
        }
        else if(tsdotRE.test(line)){
            line = line.replace(tsdotRE,"$1")
        }
        else if(namespaceEndRE.test(line)){
            if(!namespaceFlag){
                newFileContent += line;
            }
        }
        else{
            newFileContent += line;
        }
        newFileContent += "\n";
    }
    fs.writeFile(filePath, newFileContent, () => { });
}

function match(filepath: string) {
    const tsAndNotDeclaration = RegExp("(?!\\.d)\\.ts");
    if (tsAndNotDeclaration.test(filepath)) {
        return true;
    }
    return false;
}

walkFolder(rootFolder, match, fileCB);
