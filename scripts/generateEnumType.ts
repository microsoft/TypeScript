import readline from "readline";
import fs from "fs";
import path from "path";

const enumConstConvert = [
    "SyntaxKind",
    "NodeFlags",
    "ModifierFlags",
    "TransformFlags",
    "EmitFlags",
    "SymbolFlags",
    "TypeFlags",
    "ObjectFlags"
];

// wish this is /src/compiler/types.ts
// const inputFilePath = path.resolve(__dirname, "../src/compiler/types.ts");
const inputFilePath = process.argv[2].replace(/\\/g, "/");

function writeFile(fileName: string, contents: string) {
    fs.writeFile(path.join(path.dirname(inputFilePath), fileName), contents, { encoding: "utf-8" }, err => {
        if (err) throw err;
    });
}

function isThisLineConstEnumRegenerated(line: string) {
    return enumConstConvert.some(e => RegExp(`export const enum ${e}`).test(line));
}

async function generateFile(filePath: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        // crlfDelay: Infinity
    });
    let newFileContent = "";
    let acceptThisLineFlag = false;
    for await (const line of rl) {
        if (isThisLineConstEnumRegenerated(line)) {
            acceptThisLineFlag = true;
            const newLine = line.replace("export", "").replace("const", "");
            newFileContent += newLine;
            newFileContent += "\r\n";
        } else if (acceptThisLineFlag) {
            newFileContent += line;
            newFileContent += "\r\n";
        }
        if (line.includes("}")) {
            acceptThisLineFlag = false;
        }
    }
    newFileContent += `export const EnumType = {${enumConstConvert.join(",")}}`;
    writeFile("types.generated.ts", newFileContent);
}

generateFile(inputFilePath);