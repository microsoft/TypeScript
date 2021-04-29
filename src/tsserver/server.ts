/*@internal*/
namespace ts.server {
    declare const addEventListener: any;
    declare const removeEventListener: any;
    function findArgumentStringArray(argName: string): readonly string[] {
        const arg = findArgument(argName);
        if (arg === undefined) {
            return emptyArray;
        }
        return arg.split(",").filter(name => name !== "");
    }

    export function getLogLevel(level: string | undefined) {
        if (level) {
            const l = level.toLowerCase();
            for (const name in LogLevel) {
                if (isNaN(+name) && l === name.toLowerCase()) {
                    return <LogLevel><any>LogLevel[name];
                }
            }
        }
        return undefined;
    }

    export interface StartInput {
        args: readonly string[];
        logger: Logger;
        cancellationToken: ServerCancellationToken;
        serverMode: LanguageServiceMode | undefined;
        unknownServerMode?: string;
        startSession: (option: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken) => void;
    }
    function start({ args, logger, cancellationToken, serverMode, unknownServerMode, startSession: startServer }: StartInput, platform: string) {
        const syntaxOnly = hasArgument("--syntaxOnly");

        logger.info(`Starting TS Server`);
        logger.info(`Version: ${version}`);
        logger.info(`Arguments: ${args.join(" ")}`);
        logger.info(`Platform: ${platform} NodeVersion: ${getNodeMajorVersion()} CaseSensitive: ${sys.useCaseSensitiveFileNames}`);
        logger.info(`ServerMode: ${serverMode} syntaxOnly: ${syntaxOnly} hasUnknownServerMode: ${unknownServerMode}`);

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
                syntaxOnly,
                serverMode
            },
            logger,
            cancellationToken
        );
    }

    setStackTraceLimit();
    // Cannot check process var directory in webworker so has to be typeof check here
    if (typeof process !== "undefined") {
        start(initializeNodeSystem(), require("os").platform());
    }
    else {
        // Get args from first message
        const listener = (e: any) => {
            removeEventListener("message", listener);
            const args = e.data;
            start(initializeWebSystem(args), "web");
        };
        addEventListener("message", listener);
    }
}
