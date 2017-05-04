/// <reference path="types.ts" />

namespace ts.server {
    export const ActionSet: ActionSet = "action::set";
    export const ActionInvalidate: ActionInvalidate = "action::invalidate";
    export const EventBeginInstallTypes: EventBeginInstallTypes = "event::beginInstallTypes";
    export const EventEndInstallTypes: EventEndInstallTypes = "event::endInstallTypes";
    export const EventInitializationFailed: EventInitializationFailed = "event::initializationFailed";

    export namespace Arguments {
        export const GlobalCacheLocation = "--globalTypingsCacheLocation";
        export const LogFile = "--logFile";
        export const EnableTelemetry = "--enableTelemetry";
        export const TypingSafeListLocation = "--typingSafeListLocation";
    }

    export function hasArgument(argumentName: string) {
        return sys.args.indexOf(argumentName) >= 0;
    }

    export function findArgument(argumentName: string) {
        const index = sys.args.indexOf(argumentName);
        return index >= 0 && index < sys.args.length - 1
            ? sys.args[index + 1]
            : undefined;
    }
}