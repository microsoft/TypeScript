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
        /**
         * This argument specifies the location of the NPM executable.
         * typingsInstaller will run the command with `${npmLocation} install ...`.
         */
        export const NpmLocation = "--npmLocation";
    }

    export function hasArgument(argumentName: string) {
        return sys.args.indexOf(argumentName) >= 0;
    }

    export function findArgument(argumentName: string): string | undefined {
        const index = sys.args.indexOf(argumentName);
        return index >= 0 && index < sys.args.length - 1
            ? sys.args[index + 1]
            : undefined;
    }
}