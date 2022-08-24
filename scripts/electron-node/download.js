// @ts-check
const path = require("path");
const fs = require("fs");
const { download } = require("@vscode/test-electron");

async function main() {
    const codePath = await download({ cachePath: path.join(__dirname, ".vscode-test") });
    const requireHook = path.resolve(__dirname, "requireHook.js");

    /** @type {string} */
    let binName;
    /** @type {string} */
    let contents;

    if (process.platform !== "win32") {
        binName = "node";
        contents = `
#!/usr/bin/bash
export ELECTRON_RUN_AS_NODE=1
export ELECTRON_NO_ASAR=1
exec ${codePath} --ms-enable-electron-run-as-node --require=${requireHook} $@
        `;
    }
    else {
        binName = "node.cmd";
        contents = `
@echo off
setlocal
set ELECTRON_RUN_AS_NODE=1
set ELECTRON_NO_ASAR=1
"${codePath}" --ms-enable-electron-run-as-node --require=${requireHook} %*
endlocal
        `;
    }

    const newLine = process.platform === "win32" ? "\r\n" : "\n";
    contents = contents.trim().replace(/\r?\n/, newLine) + newLine;

    const binDir = path.resolve(__dirname, ".bin");
    fs.mkdirSync(binDir, { recursive: true });
    const binPath = path.join(binDir, binName);
    fs.writeFileSync(binPath, contents, { mode: 0o755 });

    console.log(`Electron-based node shim created; add ${binDir} to your $PATH`);
}

void main();
