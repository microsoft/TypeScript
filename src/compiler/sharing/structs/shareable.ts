import { isNull } from "../../core";
import { FakeSharedArray, FakeSharedStructType } from "./fakeSharedStruct";

/**
 * Returns whether the provided value is a shareable primitive value.
 * @internal
 */
export function isShareablePrimitive(value: unknown): value is ShareablePrimitive {
    switch (typeof value) {
        case "undefined":
        case "string":
        case "number":
        case "boolean":
        case "symbol":
            return true;
        case "object":
            return value === null; // eslint-disable-line no-null/no-null -- necessary for comparison
        default:
            return false;
    }
}

// You cannot use `instanceof` with shared structs and there is no `isArray`-like test currently. The only way we have
// to determine if a value is a shareable non-primitive (i.e., a shared struct, `SharedArray`, `Atomics.Mutex`, or
// `Atomics.Condition`) is to try and assign it to a property of a shared struct and catch the exception. This will
// hopefully be addressed in a future version of the origin trial.

const supportsSharedStructs = typeof SharedStructType === "function";
const sharedStructTypeConstructor = supportsSharedStructs ? SharedStructType : FakeSharedStructType;
const sharedArrayConstructor = supportsSharedStructs ? SharedArray : FakeSharedArray;

/**
 * Returns whether the provided value is a shareable non-primitive value.
 * @internal
 */
export function isShareableNonPrimitive(value: unknown): value is ShareableNonPrimitive {
    if (typeof value !== "object" || isNull(value)) return false;
    return sharedStructTypeConstructor.isSharedStruct(value) ||
        value instanceof sharedArrayConstructor ||
        supportsSharedStructs && (value instanceof Atomics.Mutex || value instanceof Atomics.Condition);
}

/**
 * Returns whether the provided value is a shareable value.
 * @internal
 */
export function isShareable(value: unknown): value is Shareable {
    return isShareablePrimitive(value) || isShareableNonPrimitive(value);
}

/** @internal */
export function isSharedArray(value: unknown): value is SharedArray<Shareable> {
    return value instanceof SharedArray;
}
