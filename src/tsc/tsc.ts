import * as Debug from "../compiler/debug.js";
import * as ts from "./_namespaces/ts.js";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
Debug.setLoggingHost({
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    },
});

if (Debug.isDebugging) {
    Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);
