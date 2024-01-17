// @strict: true
// @noEmit: true

// If during narrowing, one of the conditional types in the distribution doesn't narrow, then the whole type will not be narrowed
function whoKnows<T extends string | number | undefined>(x: T): T extends true ? 1 : T extends false ? 2 : 3 {
    if (typeof x !== "string") {
        return 3;
    }
}

// If the conditional type's input is `never`, then it resolves to `never`:
function neverOk<T extends boolean>(x: T): T extends true ? 1 : T extends false ? 2 : 1 | 2 {
    if (x === true) {
        return 1;
    }
    if (x === false) {
        return 2;
    }
    return 1;
}