// This file actually uses arguments passed on commandline and executes it
Debug.loggingHost = {
    log(_level, s) {
        sys.write(`${s || ""}${sys.newLine}`);
    }
};

if (Debug.isDebugging) {
    Debug.enableDebugInfo();
}

if (sys.tryEnableSourceMapsForHost && /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))) {
    sys.tryEnableSourceMapsForHost();
}

if (sys.setBlocking) {
    sys.setBlocking();
}

ts.executeCommandLine(sys, noop, sys.args);
