#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import module from "node:module";
import path from "node:path";
import url from "node:url";
import getExePath from "./getExePath.js";

const exe = getExePath({ fs, module, path, url });

if (process.platform !== "win32" && typeof process.execve === "function") {
    // > v22.15.0
    try {
        // Pass env explicitly to work around https://github.com/nodejs/node/pull/60029.
        process.execve(exe, [exe, ...process.argv.slice(2)], process.env);
    }
    catch {
        // may not be available, ignore the error and fallback
    }
}

try {
    execFileSync(exe, process.argv.slice(2), { stdio: "inherit", windowsHide: true });
}
catch (e) {
    if (e.status) {
        process.exitCode = e.status;
    }
    else {
        throw e;
    }
}
