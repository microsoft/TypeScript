import * as ts from "./_namespaces/ts";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    },
};

interface V8 {
    startupSnapshot?: {
        isBuildingSnapshot(): boolean;
        setDeserializeMainFunction(fn: () => void): void;
    };
}

let v8: V8 | undefined;
try {
    if (!process.versions.bun) {
        v8 = require("v8");
    }
}
catch {
    // do nothing
}

function main() {
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
}

if (v8?.startupSnapshot?.isBuildingSnapshot()) {
    v8.startupSnapshot.setDeserializeMainFunction(() => {
        // When we're executed as a snapshot, argv won't contain the js file anymore.
        process.argv.splice(1, 0, __filename);
        ts.setSys(ts.createSystem());
        main();
    });
}
else {
    main();
}
