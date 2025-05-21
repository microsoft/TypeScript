#!/usr/bin/env node

import getExePath from "#getExePath";
import { execFileSync } from "node:child_process";

const exe = getExePath();

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
