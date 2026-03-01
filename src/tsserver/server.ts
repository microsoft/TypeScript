import os from "os";
import * as ts from "../typescript/typescript.js";
import { StartInput } from "./common.js";
import { initializeNodeSystem } from "./nodeServer.js";

function findArgumentStringArray(argName: string): readonly string[] {
    const arg = ts.server.findArgument(argName);
    if (arg === undefined) {
        return ts.emptyArray;
    }
    return arg.split(",").filter(name => name !== "");
}

function start({ args, logger, cancellationToken, serverMode, unknownServerMode, startSession: startServer }: StartInput, platform: string) {
    logger.info(`Starting TS Server`);
    logger.info(`Version: ${ts.version}`);
    logger.info(`Arguments: ${args.join(" ")}`);
    logger.info(`Platform: ${platform} NodeVersion: ${process.version} CaseSensitive: ${ts.sys.useCaseSensitiveFileNames}`);
    logger.info(`ServerMode: ${serverMode} hasUnknownServerMode: ${unknownServerMode}`);

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
            canUseWatchEvents: ts.server.hasArgument("--canUseWatchEvents"),
            serverMode,
        },
        logger,
        cancellationToken,
    );
}

ts.setStackTraceLimit();
start(initializeNodeSystem(), os.platform());
