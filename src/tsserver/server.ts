/*@internal*/
namespace ts.server {
    declare const addEventListener: any;
    declare const removeEventListener: any;
    const enum SystemKind {
        Node,
        Web
    };

    function parseStringArray(argName: string): readonly string[] {
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
    export interface StartSessionOptions {
        globalPlugins: SessionOptions["globalPlugins"];
        pluginProbeLocations: SessionOptions["pluginProbeLocations"];
        allowLocalPluginLoads: SessionOptions["allowLocalPluginLoads"];
        useSingleInferredProject: SessionOptions["useSingleInferredProject"];
        useInferredProjectPerProjectRoot: SessionOptions["useInferredProjectPerProjectRoot"];
        suppressDiagnosticEvents: SessionOptions["suppressDiagnosticEvents"];
        noGetErrOnBackgroundUpdate: SessionOptions["noGetErrOnBackgroundUpdate"];
        syntaxOnly: SessionOptions["syntaxOnly"];
        serverMode: SessionOptions["serverMode"];
    }
    function start({ args, logger, cancellationToken, serverMode, unknownServerMode, startSession: startServer }: StartInput) {
        const syntaxOnly = hasArgument("--syntaxOnly");

        logger.info(`Starting TS Server`);
        logger.info(`Version: ${version}`);
        logger.info(`Arguments: ${args.join(" ")}`);
        logger.info(`Platform: ${platform()} NodeVersion: ${getNodeMajorVersion()} CaseSensitive: ${sys.useCaseSensitiveFileNames}`);
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
                globalPlugins: parseStringArray("--globalPlugins"),
                pluginProbeLocations: parseStringArray("--pluginProbeLocations"),
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

    const systemKind = typeof process !== "undefined" ? SystemKind.Node : SystemKind.Web;
    const platform = () => systemKind === SystemKind.Web ? "web" : require("os").platform();
    setStackTraceLimit();
    switch (systemKind) {
        case SystemKind.Node:
            start(initializeNodeSystem());
            break;
        case SystemKind.Web:
            // Get args from first message
            const listener = (e: any) => {
                removeEventListener("message", listener);
                const args = e.data;
                start(initializeWebSystem(args));
            };
            addEventListener("message", listener);
            break;
        default:
            Debug.assertNever(systemKind, "Unknown system kind");
    }
}
