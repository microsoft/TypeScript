import * as ts from "../typescript/typescript.js";

/** @internal */
export function getLogLevel(level: string | undefined): ts.server.LogLevel | undefined {
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
export interface StartSessionOptions {
    globalPlugins: ts.server.SessionOptions["globalPlugins"];
    pluginProbeLocations: ts.server.SessionOptions["pluginProbeLocations"];
    allowLocalPluginLoads: ts.server.SessionOptions["allowLocalPluginLoads"];
    useSingleInferredProject: ts.server.SessionOptions["useSingleInferredProject"];
    useInferredProjectPerProjectRoot: ts.server.SessionOptions["useInferredProjectPerProjectRoot"];
    suppressDiagnosticEvents: ts.server.SessionOptions["suppressDiagnosticEvents"];
    noGetErrOnBackgroundUpdate: ts.server.SessionOptions["noGetErrOnBackgroundUpdate"];
    canUseWatchEvents: ts.server.SessionOptions["canUseWatchEvents"];
    serverMode: ts.server.SessionOptions["serverMode"];
}

/** @internal */
export interface StartInput {
    args: readonly string[];
    logger: ts.server.Logger;
    cancellationToken: ts.server.ServerCancellationToken;
    serverMode: ts.LanguageServiceMode | undefined;
    unknownServerMode?: string;
    startSession: (option: StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken) => void;
}
