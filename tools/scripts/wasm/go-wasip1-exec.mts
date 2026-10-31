// Runs a Go wasip1 test binary under Node.js, for use as `go test -exec`.
// The host root is preopened as the guest root, so this only works on
// Unix-like hosts.

import { readFileSync } from "node:fs";
import { WASI } from "node:wasi";

const [file, ...args] = process.argv.slice(2);
if (!file) {
    console.error("usage: go-wasip1-exec <binary.wasm> [args...]");
    process.exit(2);
}

const wasi = new WASI({
    version: "preview1",
    args: [file, ...args],
    env: { ...process.env, PWD: process.cwd() },
    preopens: { "/": "/" },
    returnOnExit: true,
});

// Node rejects pointers at or above 2GB because they arrive as negative
// numbers (nodejs/node#62671); reinterpret every argument as unsigned.
const imports = Object.fromEntries(
    Object.entries(wasi.wasiImport).map(([name, fn]) => [
        name,
        (...args: unknown[]) => fn(...args.map(arg => typeof arg === "number" ? arg >>> 0 : arg)),
    ]),
);

const module = await WebAssembly.compile(readFileSync(file));
const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: imports });
process.exitCode = wasi.start(instance);
