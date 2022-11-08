import { padLeft, sys } from "./_namespaces/ts";

export type ActionSet = "action::set";
export type ActionInvalidate = "action::invalidate";
export type ActionPackageInstalled = "action::packageInstalled";
export type EventTypesRegistry = "event::typesRegistry";
export type EventBeginInstallTypes = "event::beginInstallTypes";
export type EventEndInstallTypes = "event::endInstallTypes";
export type EventInitializationFailed = "event::initializationFailed";
/** @internal */
export const ActionSet: ActionSet = "action::set";
/** @internal */
export const ActionInvalidate: ActionInvalidate = "action::invalidate";
/** @internal */
export const ActionPackageInstalled: ActionPackageInstalled = "action::packageInstalled";
/** @internal */
export const EventTypesRegistry: EventTypesRegistry = "event::typesRegistry";
/** @internal */
export const EventBeginInstallTypes: EventBeginInstallTypes = "event::beginInstallTypes";
/** @internal */
export const EventEndInstallTypes: EventEndInstallTypes = "event::endInstallTypes";
/** @internal */
export const EventInitializationFailed: EventInitializationFailed = "event::initializationFailed";

/** @internal */
export namespace Arguments {
    export const GlobalCacheLocation = "--globalTypingsCacheLocation";
    export const LogFile = "--logFile";
    export const EnableTelemetry = "--enableTelemetry";
    export const TypingSafeListLocation = "--typingSafeListLocation";
    export const TypesMapLocation = "--typesMapLocation";
    /**
     * This argument specifies the location of the NPM executable.
     * typingsInstaller will run the command with `${npmLocation} install ...`.
     */
    export const NpmLocation = "--npmLocation";
    /**
     * Flag indicating that the typings installer should try to validate the default npm location.
     * If the default npm is not found when this flag is enabled, fallback to `npm install`
     */
    export const ValidateDefaultNpmLocation = "--validateDefaultNpmLocation";
}

/** @internal */
export function hasArgument(argumentName: string) {
    return sys.args.indexOf(argumentName) >= 0;
}

/** @internal */
export function findArgument(argumentName: string): string | undefined {
    const index = sys.args.indexOf(argumentName);
    return index >= 0 && index < sys.args.length - 1
        ? sys.args[index + 1]
        : undefined;
}

/** @internal */
export function nowString() {
    // E.g. "12:34:56.789"
    const d = new Date();
    return `${padLeft(d.getHours().toString(), 2, "0")}:${padLeft(d.getMinutes().toString(), 2, "0")}:${padLeft(d.getSeconds().toString(), 2, "0")}.${padLeft(d.getMilliseconds().toString(), 3, "0")}`;
}
