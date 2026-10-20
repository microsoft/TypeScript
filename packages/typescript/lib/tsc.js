#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import getExePath, { getWasmPath } from "./getExePath.js";

let exe;
try {
    exe = getExePath();
}
catch (nativeError) {
    let wasmPath;
    try {
        wasmPath = getWasmPath();
    }
    catch (wasmError) {
        if (wasmError?.code === "ERR_TYPESCRIPT_WASM_PACKAGE") {
            throw wasmError;
        }
        throw nativeError;
    }
    await runWasi(wasmPath);
}

if (exe && process.platform !== "win32" && typeof process.execve === "function") {
    // > v22.15.0
    try {
        process.execve(exe, [exe, ...process.argv.slice(2)]);
    }
    catch {
        // may not be available, ignore the error and fallback
    }
}

if (exe) {
    try {
        execFileSync(exe, process.argv.slice(2), { stdio: "inherit" });
    }
    catch (e) {
        if (e.status) {
            process.exitCode = e.status;
        }
        else {
            throw e;
        }
    }
}

async function runWasi(wasmPath) {
    const nodeMajor = Number(process.versions.node.split(".")[0]);
    if (nodeMajor < 23) {
        throw new Error("The WASI fallback requires Node.js 23 or newer.");
    }

    const { WASI } = await import("node:wasi");

    const { args, cwd, preopens } = getWasiPaths(wasmPath);
    const wasi = new WASI({
        version: "preview1",
        args,
        env: { ...process.env, PWD: cwd },
        preopens,
        returnOnExit: true,
    });
    const module = await WebAssembly.compile(await readFile(wasmPath));
    const instance = await WebAssembly.instantiate(module, {
        wasi_snapshot_preview1: wasi.wasiImport,
    });
    process.exitCode = wasi.start(instance);
}

function getWasiPaths(wasmPath) {
    const args = [wasmPath, ...process.argv.slice(2)];
    if (process.platform !== "win32") {
        return { args, cwd: process.cwd(), preopens: { "/": "/" } };
    }

    // WASI paths have no drive roots, so the compiler maps each drive to
    // /mnt/<letter> when its working directory is drive-rooted.
    const preopens = {};
    for (let code = 97; code <= 122; code++) {
        const drive = `${String.fromCharCode(code)}:\\`;
        if (existsSync(drive)) {
            preopens[`/mnt/${drive[0]}`] = drive;
        }
    }
    return { args, cwd: process.cwd().replaceAll("\\", "/"), preopens };
}
