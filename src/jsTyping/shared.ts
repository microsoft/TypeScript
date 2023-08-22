import {
    padLeft,
    sys,
} from "./_namespaces/ts";

// Define action and event types
export type ActionType =
    "action::set" |
    "action::invalidate" |
    "action::packageInstalled" |
    "action::watchTypingLocations";

export type EventType =
    "event::typesRegistry" |
    "event::beginInstallTypes" |
    "event::endInstallTypes" |
    "event::initializationFailed";

// Define argument names
export const Arguments = {
    GlobalCacheLocation: "--globalTypingsCacheLocation",
    LogFile: "--logFile",
    EnableTelemetry: "--enableTelemetry",
    TypingSafeListLocation: "--typingSafeListLocation",
    TypesMapLocation: "--typesMapLocation",
    NpmLocation: "--npmLocation",
    ValidateDefaultNpmLocation: "--validateDefaultNpmLocation",
};

// Check if an argument exists
export function hasArgument(argumentName: string) {
    return sys.args.includes(argumentName);
}

// Find an argument value by name
export function findArgument(argumentName: string): string | undefined {
    const index = sys.args.indexOf(argumentName);
    return index >= 0 && index < sys.args.length - 1
        ? sys.args[index + 1]
        : undefined;
}

// Get the current time as a formatted string
export function nowString() {
    const d = new Date();
    return `${padLeft(d.getHours().toString(), 2, "0")}:${padLeft(d.getMinutes().toString(), 2, "0")}:${padLeft(d.getSeconds().toString(), 2, "0")}.${padLeft(d.getMilliseconds().toString(), 3, "0")}`;
}
