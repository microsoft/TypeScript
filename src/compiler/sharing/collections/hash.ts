import { hasProperty } from "../../core";
import { Debug } from "../../debug";
import { sys } from "../../sys";
import { IdentifiableStruct } from "../structs/identifiableStruct";
import { xxh32string } from "./xxhash32";

const defaultStringSeed = sys.stringSeed ?? generateHashSeed();

/** @internal */
export function generateHashSeed() {
    return Math.floor(Math.random() * 0xffffffff) >>> 0;
}

/**
 * Get a hashcode for a value that is consistent across multiple threads.
 * @internal
 */
export function identityHash(value: Shareable, seed?: number): number {
    if (value === undefined || value === null) { // eslint-disable-line no-null/no-null -- necessary comparison
        return 0;
    }
    switch (typeof value) {
        case "number":
            return value >> 0;
        case "boolean":
            return value ? 1 : 0;
        case "string":
            return xxh32string(value, seed ?? defaultStringSeed) >> 0;
        case "object":
            if (hasProperty(value, "__hash__")) {
                return (value as IdentifiableStruct).__hash__ >> 0;
            }
            return 0;
        default:
            Debug.assertNever(value);
    }
}
