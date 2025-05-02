import fs from "fs";
import { glob } from "glob";
import path from "path";
import url from "url";

import { localizationDirectories } from "./build/localization.mjs";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "..");
const source = path.join(root, "built/local");
const dest = path.join(root, "lib");

async function produceLKG() {
    console.log(`Building LKG from ${source} to ${dest}`);
    await fs.promises.rm(dest, { recursive: true, force: true });
    await fs.promises.mkdir(dest, { recursive: true });
    await copyLibFiles();
    await copyLocalizedDiagnostics();
    await copyTypesMap();
    await copyScriptOutputs();
    await copyDeclarationOutputs();
    await writeGitAttributes();
}

async function copyLibFiles() {
    await copyFilesWithGlob("lib?(.*).d.ts");
}

async function copyLocalizedDiagnostics() {
    for (const d of localizationDirectories) {
        const inputDir = path.join(source, d);
        if (!fs.statSync(inputDir).isDirectory()) throw new Error(`Expected ${inputDir} to be a directory`);
        const outputDir = path.join(dest, d);
        await fs.promises.mkdir(outputDir, { recursive: true });
        for (const f of await fs.promises.readdir(inputDir)) {
            const inputFile = path.join(inputDir, f);
            if (!fs.statSync(inputFile).isFile()) throw new Error(`Expected ${inputFile} to be a file`);
            const outputFile = path.join(outputDir, f);
            await fs.promises.copyFile(inputFile, outputFile);
        }
    }
}

async function copyTypesMap() {
    await copyFromBuiltLocal("typesMap.json"); // Cannot accommodate copyright header
}

async function copyScriptOutputs() {
    await copyFromBuiltLocal("tsc.js");
    await copyFromBuiltLocal("_tsc.js");
    await copyFromBuiltLocal("tsserver.js");
    await copyFromBuiltLocal("_tsserver.js");
    await copyFromBuiltLocal("tsserverlibrary.js");
    await copyFromBuiltLocal("typescript.js");
    await copyFromBuiltLocal("typingsInstaller.js");
    await copyFromBuiltLocal("_typingsInstaller.js");
    await copyFromBuiltLocal("watchGuard.js");
}

async function copyDeclarationOutputs() {
    await copyFromBuiltLocal("tsserverlibrary.d.ts");
    await copyFromBuiltLocal("typescript.d.ts");
}

async function writeGitAttributes() {
    await fs.promises.writeFile(path.join(dest, ".gitattributes"), `* text eol=lf`, "utf-8");
}

/**
 * @param {string} fileName
 */
async function copyFromBuiltLocal(fileName) {
    await fs.promises.copyFile(path.join(source, fileName), path.join(dest, fileName));
}

/**
 * @param {string} pattern
 */
async function copyFilesWithGlob(pattern) {
    const files = glob.sync(pattern, { cwd: source }).map(f => path.basename(f));
    for (const f of files) {
        await copyFromBuiltLocal(f);
    }
    console.log(`Copied ${files.length} files matching pattern ${pattern}`);
}

process.on("unhandledRejection", err => {
    throw err;
});
produceLKG().then(() => console.log("Done"), err => {
    throw err;
});
