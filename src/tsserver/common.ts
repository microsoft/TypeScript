import {
    Logger, LogLevel, ServerCancellationToken, StartSessionOptions,
} from "./_namespaces/ts.server";
import { LanguageServiceMode } from "./_namespaces/ts";

/** @internal */
export function getLogLevel(level: string | undefined) {
    if (level) {
        const l = level.toLowerCase();
        for (const name in LogLevel) {
            if (isNaN(+name) && l === name.toLowerCase()) {
                return LogLevel[name] as any as LogLevel;
            }
        }
    }
    return undefined;
}

/** @internal */
export interface StartInput {
    args: readonly string[];
    logger: Logger;
    cancellationToken: ServerCancellationToken;
    serverMode: LanguageServiceMode | undefined;
    unknownServerMode?: string;
    startSession: (option: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken) => void;
}
