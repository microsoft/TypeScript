// import readline from "readline";
import fs from "fs";
import path from "path";
import { srcFolder } from ".";
import namespaceInfo from './namespacePath.json';

/**
 * namespace name: {position:,times:}
 */

const namespaceLikeFilesFolderPath = path.resolve(srcFolder, "namespaceLike");
if (!fs.existsSync(namespaceLikeFilesFolderPath)) {
    fs.mkdirSync(namespaceLikeFilesFolderPath);
}

function getRelativePathFromAbsolutePath(filePath: string) {
    const relativePath = filePath.replace(/^.*?src\\/, "../").replace(/\\/g, "/").slice(0, -3);
    return relativePath;
}

/**
 *
 * @param filePath
 * @param rename rename is for optimise
 */
function createFirstLevel(relativePath: string, rename?: string) {
    let result = "";
    result += "\r\n";
    result += `export *${rename ? ` as ${rename}` : ""} from "${relativePath}";`;
    return result;
}

function createSecondLevel(relativePath: string, rename: string) {
    let result = "";
    result += "\r\n";
    result += `import * as ${rename} from "${relativePath}"`;
    result += "\r\n";
    result += `export {${rename}}`;
    return result;
}

// delete namespaceInfo.A;
// delete namespaceInfo.Foo;
// delete namespaceInfo.normalN;
// delete namespaceInfo.M;
// delete namespaceInfo.myapp;

function main(namespaceInfo: { [namespacePath: string]: { [filePath: string]: number } }) {
    const namespaceNames = Object.keys(namespaceInfo);
    namespaceNames.forEach(n => {
        const namespacePathAccess = n.split(".");
        let fileContent = "";
        if (namespacePathAccess.length === 1) {
            const namespaceFilePaths = namespaceInfo[n];
            Object.keys(namespaceFilePaths).forEach(nfp => {
                fileContent += createFirstLevel(getRelativePathFromAbsolutePath(nfp));
            });
            const nextNamespacePaths = namespaceNames.filter(nsn => RegExp(`${n.replace("/\./g", "\\.")}\\.(?!\\w+\\.)`).test(nsn));
            nextNamespacePaths.forEach((nnp) => {
                const afterNamespacePaths = namespaceNames.filter(nsn => RegExp(`${nnp.replace("/\./g", "\\.")}\\.`).test(nsn));
                if (Object.keys(namespaceInfo[nnp]).length > 1 || afterNamespacePaths.length > 1) {
                    fileContent += createSecondLevel("./" + nnp, nnp.split(".").pop()!);
                } else {
                    const theFilePath = Object.keys(namespaceInfo[nnp])[0];
                    fileContent += createFirstLevel(getRelativePathFromAbsolutePath(theFilePath), nnp.split(".").pop());
                }
            });
        } else {
            const namespaceFilePaths = namespaceInfo[n];
            let skipFlag1 = false;
            let skipFlag2 = false;

            if (Object.keys(namespaceFilePaths).length === 1) {
                skipFlag1 = true;
            }
            Object.keys(namespaceFilePaths).forEach(nfp => {
                fileContent += createFirstLevel(getRelativePathFromAbsolutePath(nfp));
            });
            const nextNamespacePaths = namespaceNames.filter(nt => RegExp(`${n.replace("/\./g", "\\.")}\\.(?!\\w+\\.)`).test(nt));
            if (nextNamespacePaths.length === 0) {
                skipFlag2 = true;
            }
            nextNamespacePaths.forEach((nnp) => {
                const afterNamespacePaths = namespaceNames.filter(nsn => RegExp(`${nnp.replace("/\./g", "\\.")}\\.`).test(nsn));
                if (Object.keys(namespaceInfo[nnp]).length > 1 || afterNamespacePaths.length > 1) {
                    fileContent += createSecondLevel("./" + nnp, nnp.split(".").pop()!);
                } else {
                    const theFilePath = Object.keys(namespaceInfo[nnp])[0];
                    fileContent += createFirstLevel(getRelativePathFromAbsolutePath(theFilePath), nnp.split(".").pop());
                }
            });
            if (skipFlag1 && skipFlag2) {
                return;
            }
        }
        fs.writeFile(path.resolve(namespaceLikeFilesFolderPath, n + ".ts"), fileContent, () => { });
    });
}

main(namespaceInfo);
