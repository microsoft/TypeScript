#!/usr/bin/env node

import getExePath, { getWasmPath } from "#getExePath";
import { execFileSync } from "node:child_process";
import path from "node:path";

let exe;
try {
    exe = getExePath();
}
catch (nativeError) {
    let wasmPath;
    try {
        wasmPath = getWasmPath();
    }
    catch {
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

    const [{ readFile }, { WASI }] = await Promise.all([
        import("node:fs/promises"),
        import("node:wasi"),
    ]);

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
    const cwd = process.cwd();
    if (process.platform !== "win32") {
        return {
            args: [wasmPath, ...process.argv.slice(2)],
            cwd,
            preopens: { "/": "/" },
        };
    }

    const preopens = {};
    const guestRoots = new Map();
    const getGuestRoot = hostRoot => {
        const key = hostRoot.toLowerCase();
        let guestRoot = guestRoots.get(key);
        if (!guestRoot) {
            const drive = /^([a-z]):[\\/]$/i.exec(hostRoot);
            guestRoot = drive ? `/mnt/${drive[1].toLowerCase()}` : `/mnt/root-${guestRoots.size}`;
            guestRoots.set(key, guestRoot);
            preopens[guestRoot] = hostRoot;
        }
        return guestRoot;
    };
    const toGuestPath = hostPath => {
        const root = path.parse(hostPath).root;
        const relative = path.relative(root, hostPath).replaceAll("\\", "/");
        return path.posix.join(getGuestRoot(root), relative);
    };
    const translatePath = arg => {
        return path.isAbsolute(arg) ? toGuestPath(arg) : arg;
    };

    return {
        args: [
            toGuestPath(wasmPath),
            ...process.argv.slice(2).map(translatePath),
        ],
        cwd: toGuestPath(cwd),
        preopens,
    };
}
