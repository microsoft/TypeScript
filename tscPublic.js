const [typescript, ...args] = process.argv.slice(2);

const ts = require(typescript);

if (!ts.executeCommandLine) {
    // Don't use stderr here; tsc errors via stdout.
    console.log("Expected TypeScript API to have executeCommandLine method.");
    process.exit(1);
}

ts.sys.args = args;
process.argv = [process.argv[0], ...args];

// Copied from https://github.com/microsoft/TypeScript/blob/main/src/tsc/tsc.ts
ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    },
};

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);
