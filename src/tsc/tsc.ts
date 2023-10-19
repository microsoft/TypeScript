import * as ts from "./_namespaces/ts";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    },
};

let v8: typeof import("v8") | undefined;
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

if ((v8 as any)?.startupSnapshot.isBuildingSnapshot()) {
    (v8 as any).startupSnapshot.setDeserializeMainFunction(() => {
        // When we're executed as a snapshot, argv won't contain the js file anymore.
        // TODO(jakebailey): if we need to fork TS, we probably need to know the snapshot name and exec that...
        process.argv.splice(1, 0, __filename);
        ts.setSys(ts.createSystem());
        main();
    });
}
else {
    main();
}
