import { noop } from "../compiler/core";
import * as Debug from "../compiler/debug";
import { sys } from "../compiler/sys";
import { executeCommandLine } from "../executeCommandLine/executeCommandLine";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
Debug.setLoggingHost({
    log(_level, s) {
        sys.write(`${s || ""}${sys.newLine}`);
    }
});

if (Debug.isDebugging) {
    Debug.enableDebugInfo();
}

if (sys.tryEnableSourceMapsForHost && /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))) {
    sys.tryEnableSourceMapsForHost();
}

if (sys.setBlocking) {
    sys.setBlocking();
}

executeCommandLine(sys, noop, sys.args);
