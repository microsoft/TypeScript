/// <reference types="node" />

import * as fs from "fs-extra";
import * as path from "path";
import * as glob from "glob";
import * as del from "del";

const root = path.join(__dirname, "..");
const source = path.join(root, "built/local");
const dest = path.join(root, "lib");

async function produceLKG() {
    console.log(`Building LKG from ${source} to ${dest}`);
    await del(`${dest.replace(/\\/g, "/")}/**`, { ignore: ["**/README.md"] });
    await fs.mkdirp(dest);
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
    const dir = await fs.readdir(source);
    const ignoredFolders = ["enu"];

    // TODO(jakebailey): Instead of ignoring folders, we should keep a list of
    // the localizationTargets somewhere that can be used by multiple modules.
    ignoredFolders.push(
        "compiler",
        "deprecatedCompat",
        "executeCommandLine",
        "harness",
        "jsTyping",
        "loggedIO",
        "server",
        "services",
        "testRunner",
        "tsc",
        "tsserver",
        "tsserverlibrary",
        "typescript",
        "typingsInstaller",
        "typingsInstallerCore",
        "webServer",
    );

    for (const d of dir) {
        const fileName = path.join(source, d);
        if (
            fs.statSync(fileName).isDirectory() &&
            ignoredFolders.indexOf(d) < 0
        ) {
            await fs.copy(fileName, path.join(dest, d));
        }
    }
}

async function copyTypesMap() {
    await copyFromBuiltLocal("typesMap.json"); // Cannot accommodate copyright header
}

async function copyScriptOutputs() {
    await copyFromBuiltLocal("cancellationToken.js");
    await copyFromBuiltLocal("tsc.js");
    await copyFromBuiltLocal("tsserver.js");
    await copyFromBuiltLocal("tsserverlibrary.js");
    await copyFromBuiltLocal("typescript.js");
    await copyFromBuiltLocal("typingsInstaller.js");
    await copyFromBuiltLocal("watchGuard.js");
}

async function copyDeclarationOutputs() {
    await copyFromBuiltLocal("tsserverlibrary.d.ts");
    await copyFromBuiltLocal("typescript.d.ts");
}

async function writeGitAttributes() {
    await fs.writeFile(path.join(dest, ".gitattributes"), `* text eol=lf`, "utf-8");
}

async function copyFromBuiltLocal(fileName: string) {
    await fs.copy(path.join(source, fileName), path.join(dest, fileName));
}

async function copyFilesWithGlob(pattern: string) {
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
