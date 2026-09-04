// @strict: true
// @noEmit: true

// The single-file case in recursiveTypeThroughObjectLiteralGetterPostponedConstraint.ts, split across
// two files. An array of schemas is not a Schema, so `bad` violates the constraint on S, and that has
// to be reported wherever the declaration and its use happen to live. Splitting them changes the
// order things resolve in: the constraint is answered while the getter still stands on an absorbed
// circularity, and a placeholder relates to anything. So the verdict is not recorded, and it is asked
// again once the file's deferred work runs.

// @filename: schema.ts
export interface Schema<O> {
    readonly out: O;
}
export type Shape = Record<string, Schema<any>>;
export declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };

export const tree = object({
    get bad() {
        return [tree];
    },
});

// @filename: consumer.ts
import { tree } from "./schema.js";

export const out = tree.out;
