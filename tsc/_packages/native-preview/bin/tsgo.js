#!/usr/bin/env node

import getExePath from "#getExePath";
import { execFileSync } from "node:child_process";

const exe = getExePath();

if (typeof process.execve === "function") {
    // > v22.15.0
    try {
        process.execve(exe, [exe, ...process.argv.slice(2)]);
    }
    catch {
        // not available on windows, ignore the error and fallback
    }
}

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
