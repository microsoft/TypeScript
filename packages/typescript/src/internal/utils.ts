import type { Node } from "../ast/ast.ts";
import { formatSyntaxKind } from "../ast/utils.ts";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Safer version of `Function` which should not be called.
 * Every function should be assignable to this, but this should not be assignable to every function.
 */
export type AnyFunction = (...args: never[]) => void;

/**
 * Type of objects whose values are all of the same type.
 * The `in` and `for-in` operators can *not* be safely used,
 * since `Object.prototype` may be modified by outside code.
 */
export interface MapLike<T> {
    [index: string]: T;
}

/**
 * Indicates whether a map-like contains an own property with the specified key.
 *
 * @param map A map-like.
 * @param key A property key.
 */
export function hasProperty(map: MapLike<any>, key: string): boolean {
    return hasOwnProperty.call(map, key);
}

export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: AnyFunction): never {
    const detail = typeof member === "object" && hasProperty(member, "kind") && hasProperty(member, "pos") ? "SyntaxKind: " + formatSyntaxKind((member as Node).kind) : JSON.stringify(member);
    return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
}

export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
    // eslint-disable-next-line no-debugger
    debugger;
    const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
    if ((Error as any).captureStackTrace) {
        (Error as any).captureStackTrace(e, stackCrawlMark || fail);
    }
    throw e;
}
