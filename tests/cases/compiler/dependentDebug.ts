// @strict: true
// @noEmit: true

type HelperCond<T, A, R1, B, R2> =
    T extends A ? R1
    : T extends B ? R2
    : R1 | R2;

// type IfBoolean<T extends boolean> = T extends true ? 1 : T extends false ? 0 : 1 | 0

function transform1<T extends string | null | undefined>(value: T): HelperCond<T, string, string, null | undefined, null> {
    if (value == null) return null; // Ok
    if (typeof value !== 'string') {
        throw new Error();
    }
    return value.toLowerCase(); // Ok
}
