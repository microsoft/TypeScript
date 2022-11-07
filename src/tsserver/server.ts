import * as ts from "./_namespaces/ts";

declare const addEventListener: any;
declare const removeEventListener: any;
function findArgumentStringArray(argName: string): readonly string[] {
    const arg = ts.server.findArgument(argName);
    if (arg === undefined) {
        return ts.server.emptyArray;
    }
    return arg.split(",").filter(name => name !== "");
}

/** @internal */
export function getLogLevel(level: string | undefined) {
    if (level) {
        const l = level.toLowerCase();
        for (const name in ts.server.LogLevel) {
            if (isNaN(+name) && l === name.toLowerCase()) {
                return ts.server.LogLevel[name] as any as ts.server.LogLevel;
            }
        }
    }
    return undefined;
}

/** @internal */
export interface StartInput {
    args: readonly string[];
    logger: ts.server.Logger;
    cancellationToken: ts.server.ServerCancellationToken;
    serverMode: ts.LanguageServiceMode | undefined;
    unknownServerMode?: string;
    startSession: (option: ts.server.StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken) => void;
}
function start({ args, logger, cancellationToken, serverMode, unknownServerMode, startSession: startServer }: StartInput, platform: string) {
    const syntaxOnly = ts.server.hasArgument("--syntaxOnly");

    logger.info(`Starting TS Server`);
    logger.info(`Version: ${ts.version}`);
    logger.info(`Arguments: ${args.join(" ")}`);
    logger.info(`Platform: ${platform} NodeVersion: ${ts.getNodeMajorVersion()} CaseSensitive: ${ts.sys.useCaseSensitiveFileNames}`);
    logger.info(`ServerMode: ${serverMode} syntaxOnly: ${syntaxOnly} hasUnknownServerMode: ${unknownServerMode}`);

    ts.setStackTraceLimit();

    if (ts.Debug.isDebugging) {
        ts.Debug.enableDebugInfo();
    }

    if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
        ts.sys.tryEnableSourceMapsForHost();
    }

    // Overwrites the current console messages to instead write to
    // the log. This is so that language service plugins which use
    // console.log don't break the message passing between tsserver
    // and the client
    console.log = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), ts.server.Msg.Info);
    console.warn = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), ts.server.Msg.Err);
    console.error = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), ts.server.Msg.Err);

    startServer(
        {
            globalPlugins: findArgumentStringArray("--globalPlugins"),
            pluginProbeLocations: findArgumentStringArray("--pluginProbeLocations"),
            allowLocalPluginLoads: ts.server.hasArgument("--allowLocalPluginLoads"),
            useSingleInferredProject: ts.server.hasArgument("--useSingleInferredProject"),
            useInferredProjectPerProjectRoot: ts.server.hasArgument("--useInferredProjectPerProjectRoot"),
            suppressDiagnosticEvents: ts.server.hasArgument("--suppressDiagnosticEvents"),
            noGetErrOnBackgroundUpdate: ts.server.hasArgument("--noGetErrOnBackgroundUpdate"),
            syntaxOnly,
            serverMode
        },
        logger,
        cancellationToken
    );
}

ts.setStackTraceLimit();
// Cannot check process var directory in webworker so has to be typeof check here
if (typeof process !== "undefined") {
    start(ts.server.initializeNodeSystem(), require("os").platform());
}
else {
    // Get args from first message
    const listener = (e: any) => {
        removeEventListener("message", listener);
        const args = e.data;
        start(ts.server.initializeWebSystem(args), "web");
    };
    addEventListener("message", listener);
}
