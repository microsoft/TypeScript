import { walkFolder, tsMatch, srcFolder } from ".";
import fs from "fs";
import readline from "readline";

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
        const namespaceEndRE = RegExp("^\\}$");
        // const noNamespaceTsdotRE = /(?<!namespace)(\W)ts\./g;
        if (namespaceRE.test(line)) {
            //skip, not output
            removeNamespaceFlag = true;
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

walkFolder(srcFolder, tsMatch, fileCB);