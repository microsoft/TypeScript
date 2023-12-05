import {
    Debug,
    setStackTraceLimit,
    sys,
    version,
} from "./_namespaces/ts";
import {
    emptyArray,
    findArgument,
    hasArgument,
    initializeNodeSystem,
    Msg,
    StartInput,
} from "./_namespaces/ts.server";

export * from "./_namespaces/ts";

function findArgumentStringArray(argName: string): readonly string[] {
    const arg = findArgument(argName);
    if (arg === undefined) {
        return emptyArray;
    }
    return arg.split(",").filter(name => name !== "");
}

function start({ args, logger, cancellationToken, serverMode, unknownServerMode, startSession: startServer }: StartInput, platform: string) {
    logger.info(`Starting TS Server`);
    logger.info(`Version: ${version}`);
    logger.info(`Arguments: ${args.join(" ")}`);
    logger.info(`Platform: ${platform} NodeVersion: ${process.version} CaseSensitive: ${sys.useCaseSensitiveFileNames}`);
    logger.info(`ServerMode: ${serverMode} hasUnknownServerMode: ${unknownServerMode}`);

    setStackTraceLimit();

    if (Debug.isDebugging) {
        Debug.enableDebugInfo();
    }

    if (sys.tryEnableSourceMapsForHost && /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))) {
        sys.tryEnableSourceMapsForHost();
    }

    // Overwrites the current console messages to instead write to
    // the log. This is so that language service plugins which use
    // console.log don't break the message passing between tsserver
    // and the client
    console.log = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), Msg.Info);
    console.warn = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), Msg.Err);
    console.error = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), Msg.Err);

    startServer(
        {
            globalPlugins: findArgumentStringArray("--globalPlugins"),
            pluginProbeLocations: findArgumentStringArray("--pluginProbeLocations"),
            allowLocalPluginLoads: hasArgument("--allowLocalPluginLoads"),
            useSingleInferredProject: hasArgument("--useSingleInferredProject"),
            useInferredProjectPerProjectRoot: hasArgument("--useInferredProjectPerProjectRoot"),
            suppressDiagnosticEvents: hasArgument("--suppressDiagnosticEvents"),
            noGetErrOnBackgroundUpdate: hasArgument("--noGetErrOnBackgroundUpdate"),
            canUseWatchEvents: hasArgument("--canUseWatchEvents"),
            serverMode,
        },
        logger,
        cancellationToken,
    );
}

setStackTraceLimit();
start(initializeNodeSystem(), require("os").platform());
