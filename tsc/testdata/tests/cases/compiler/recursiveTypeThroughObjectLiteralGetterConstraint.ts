// @strict: true
// @noEmit: true

// Skipping an accessor during a check that reports nothing is a deferral, not a waiver. An array of
// schemas is not a Schema, so this reports. The baseline is byte-identical to what an unpatched
// compiler produces, and that is the whole point of the case: it pins that the constraint is still
// enforced, not which pass enforced it. The recursive shape where the deferred pass is the only thing
// that can report it is recursiveTypeThroughObjectLiteralGetterPostponedConstraint.ts.

interface Schema<O> {
    readonly out: O;
}
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };
declare const leaf: Schema<string>;

const flat = object({
    get bad() {
        return [leaf];
    },
});
export const out = flat.out;
