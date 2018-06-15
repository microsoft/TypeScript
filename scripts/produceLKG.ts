/// <reference types="node" />

import childProcess = require('child_process');
import fs = require('fs-extra');
import path = require('path');
import removeInternal = require('remove-internal');
import glob = require('glob');

const root = path.join(__dirname, "..");
const source = path.join(root, "built/local");
const dest = path.join(root, "lib");
const copyright = fs.readFileSync(path.join(__dirname, "../CopyrightNotice.txt"), "utf-8");

async function produceLKG() {
    console.log(`Building LKG from ${source} to ${dest}`);
    await copyLibFiles();
    await copyLocalizedDiagnostics();
    await buildProtocol();
    await copyScriptOutputs();
    await buildTsc();
    await copyDeclarationOutputs();
    await writeGitAttributes();
}

async function copyLibFiles() {
    await copyFilesWithGlob("lib?(.*).d.ts");
}

async function copyLocalizedDiagnostics() {
    const dir = await fs.readdir(source);
    for (const d of dir) {
        const fileName = path.join(source, d);
        if (fs.statSync(fileName).isDirectory()) {
            if (d === 'tslint') continue;
            await fs.copy(fileName, path.join(dest, d));
        }
    }
}

async function buildProtocol() {
    const protocolScript = path.join(__dirname, "buildProtocol.js");
    if (!fs.existsSync(protocolScript)) {
        throw new Error(`Expected protocol script ${protocolScript} to exist`);
    }

    const protocolInput = path.join(__dirname, "../src/server/protocol.ts");
    const protocolServices = path.join(source, "typescriptServices.d.ts");
    const protocolOutput = path.join(dest, "protocol.d.ts");

    console.log(`Building ${protocolOutput}...`);
    await exec(protocolScript, [protocolInput, protocolServices, protocolOutput]);
}

async function copyScriptOutputs() {
    await copyWithCopyright("tsserver.js");
    await copyWithCopyright("tsc.js");
    await copyWithCopyright("watchGuard.js");
    await copyWithCopyright("cancellationToken.js");
    await copyWithCopyright("typingsInstaller.js");
}

async function buildTsc() {
    await exec(path.join(source, "tsc.js"), [`-b -f ${path.join(root, "src/tsc/tsconfig.release.json")}`]);
}

async function copyDeclarationOutputs() {
    await copyWithCopyright("typescript.d.ts");
    await copyWithCopyright("typescriptServices.d.ts");
    await copyWithCopyright("tsserverlibrary.d.ts");
}

async function writeGitAttributes() {
    await fs.writeFile(path.join(dest, ".gitattributes"), `* text eol=lf`, "utf-8");
}

async function copyWithCopyright(fileName: string) {
    const content = await fs.readFile(path.join(source, fileName), "utf-8");
    await fs.writeFile(path.join(dest, fileName), copyright + "\r\n" + content);
}

async function copyFromBuiltLocal(fileName: string) {
    await fs.copy(path.join(source, fileName), path.join(dest, fileName));
}

async function copyFilesWithGlob(pattern: string) {
    const files = glob.sync(path.join(source, pattern)).map(f => path.basename(f));
    for (const f of files) {
        await copyFromBuiltLocal(f);
    }
    console.log(`Copied ${files.length} files matching pattern ${pattern}`);
}

async function exec(path: string, args: string[] = []) {
    const cmdLine = ["node", path, ...args].join(" ");
    console.log(cmdLine);
    childProcess.execSync(cmdLine);
}

process.on("unhandledRejection", err => { throw err; });
produceLKG().then(() => console.log("Done"), err => { throw err; });
