import { some, stringContains } from "./core";

/** @internal */
export const ignoredPaths = ["/node_modules/.", "/.git", "/.#"];

/** @internal */
export function containsIgnoredPath(path: string) {
    return some(ignoredPaths, p => stringContains(path, p));
}
