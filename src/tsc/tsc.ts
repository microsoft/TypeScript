namespace ts {} // empty ts module so the module migration script knows this file depends on the `ts` project namespace
// This file actually uses arguments passed on commandline and executes it
ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);
