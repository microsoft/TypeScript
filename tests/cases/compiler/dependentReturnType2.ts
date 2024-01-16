// @strict: true
// @noEmit: true

// If during narrowing, one of the conditional types in the distribution doesn't narrow, then the whole type will not be narrowed
function whoKnows<T extends string | number | undefined>(x: T): T extends true ? 1 : T extends false ? 2 : 3 {
    if (typeof x !== "string") {
        return 3;
    }
}