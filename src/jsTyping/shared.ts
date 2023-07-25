import {
    padLeft,
    sys,
} from "./_namespaces/ts";

import { Observable, interval } from 'rxjs';

export type ActionSet = "action::set";
export type ActionInvalidate = "action::invalidate";
export type ActionPackageInstalled = "action::packageInstalled";
export type EventTypesRegistry = "event::typesRegistry";
export type EventBeginInstallTypes = "event::beginInstallTypes";
export type EventEndInstallTypes = "event::endInstallTypes";
export type EventInitializationFailed = "event::initializationFailed";
export type ActionWatchTypingLocations = "action::watchTypingLocations";
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
export const ActionWatchTypingLocations: ActionWatchTypingLocations = "action::watchTypingLocations";

/** @internal */
export namespace Arguments {
    // ... (unchanged)
}

/** @internal */
export function hasArgument(argumentName: string): boolean {
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
export function nowString(): string {
    // E.g. "12:34:56.789"
    const d = new Date();
    return `${padLeft(d.getHours(), 2, "0")}:${padLeft(d.getMinutes(), 2, "0")}:${padLeft(d.getSeconds(), 2, "0")}.${padLeft(d.getMilliseconds(), 3, "0")}`;
}

// New function using RxJS observable
/** @internal */
export function nowStringObservable(): Observable<string> {
    return interval(1000).pipe(
        map(() => {
            const d = new Date();
            return `${padLeft(d.getHours(), 2, "0")}:${padLeft(d.getMinutes(), 2, "0")}:${padLeft(d.getSeconds(), 2, "0")}.${padLeft(d.getMilliseconds(), 3, "0")}`;
        })
    );
}
