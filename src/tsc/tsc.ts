import * as ts from "./_namespaces/ts";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    }
};

ts.sys.tryEnableSharedStructs?.();

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

if (ts.workerThreads?.isWorkerThread()) {
    ts.executeWorker(ts.sys, ts.workerThreads);
}
else {
    ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args, ts.workerThreads);
}
