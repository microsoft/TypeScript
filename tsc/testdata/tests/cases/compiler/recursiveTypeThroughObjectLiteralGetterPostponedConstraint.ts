// @strict: true
// @noEmit: true

// Skipping a member that genuinely cannot be worked out yet postpones the constraint check; it does
// not waive it. The getter names the declaration being resolved, so the skip is right, but what it
// returns still violates the constraint and that has to surface once the declaration has a type.

interface Schema<O> {
    readonly out: O;
}
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };

const tree = object({
    get bad() {
        return [tree];
    },
});
export const out = tree.out;
