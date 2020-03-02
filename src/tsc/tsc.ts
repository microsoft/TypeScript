import { Debug, sys, executeCommandLine, noop } from "./ts";
// empty ts module so the module migration script knows this file depends on the `ts` project namespace
// This file actually uses arguments passed on commandline and executes it
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
