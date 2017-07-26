/// <reference path="tscLib.ts"/>

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}
ts.executeCommandLine(ts.sys.args);
