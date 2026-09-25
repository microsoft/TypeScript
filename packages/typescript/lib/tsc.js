#!/usr/bin/env node

import getExePath, { getWasmPath } from "#getExePath";
import { execFileSync } from "node:child_process";
import {
    mkdtemp,
    readFile,
    rm,
    writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
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

    const { WASI } = await import("node:wasi");

    const { args, cwd, preopens, cleanup } = await getWasiPaths(wasmPath);
    try {
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
    finally {
        await cleanup?.();
    }
}

async function getWasiPaths(wasmPath) {
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
    const responseFiles = new Map();
    let responseDirectory;
    const translateResponseFile = async hostPath => {
        const key = hostPath.toLowerCase();
        const existing = responseFiles.get(key);
        if (existing) {
            return existing;
        }
        responseDirectory ??= await mkdtemp(path.join(tmpdir(), "typescript-wasi-"));
        const translatedPath = path.join(responseDirectory, `${responseFiles.size}.rsp`);
        const guestPath = toGuestPath(translatedPath);
        responseFiles.set(key, guestPath);
        let contents;
        try {
            contents = await readFile(hostPath, "utf8");
        }
        catch {
            const fallbackPath = toGuestPath(hostPath);
            responseFiles.set(key, fallbackPath);
            return fallbackPath;
        }
        const tokens = parseResponseFile(contents);
        if (tokens) {
            const replacements = [];
            for (const token of tokens) {
                replacements.push({
                    ...token,
                    value: await translateArgument(token.value),
                });
            }
            for (let i = replacements.length - 1; i >= 0; i--) {
                const replacement = replacements[i];
                contents = contents.slice(0, replacement.start) + replacement.value + contents.slice(replacement.end);
            }
        }
        await writeFile(translatedPath, contents);
        return guestPath;
    };
    const translateArgument = async arg => {
        if (arg.startsWith("@") && arg.length > 1) {
            return `@${await translateResponseFile(path.resolve(cwd, arg.slice(1)))}`;
        }
        return translatePath(arg);
    };
    const args = [];
    for (const arg of process.argv.slice(2)) {
        args.push(await translateArgument(arg));
    }

    return {
        args: [
            toGuestPath(wasmPath),
            ...args,
        ],
        cwd: toGuestPath(cwd),
        preopens,
        cleanup: responseDirectory
            ? () => rm(responseDirectory, { recursive: true, force: true })
            : undefined,
    };
}

function parseResponseFile(contents) {
    const tokens = [];
    let position = 0;
    while (position < contents.length) {
        while (position < contents.length && contents.charCodeAt(position) <= 32) {
            position++;
        }
        if (position >= contents.length) {
            break;
        }
        if (contents[position] === '"') {
            const start = ++position;
            while (position < contents.length && contents[position] !== '"') {
                position++;
            }
            if (position >= contents.length) {
                return undefined;
            }
            tokens.push({ start, end: position, value: contents.slice(start, position) });
            position++;
        }
        else {
            const start = position;
            while (position < contents.length && contents.charCodeAt(position) > 32) {
                position++;
            }
            tokens.push({ start, end: position, value: contents.slice(start, position) });
        }
    }
    return tokens;
}
