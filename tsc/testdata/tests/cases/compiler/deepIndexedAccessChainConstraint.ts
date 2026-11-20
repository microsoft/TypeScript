// @strict: true
// @noEmit: true

// Resolving the base constraint of a 10-level indexed access chain steps
// through nested object types that share the type parameter's recursion
// identity. Checking f resolves typeof victim while T's base constraint is
// uncached; in both victim and lone, base constraints resolve to Box (65508).

interface Box { a: Box; b: string }

const f: typeof victim = <U extends Box>(x: U, y: { b: string }) => x.b;

function victim<T extends Box>(
    x: T,
    y: T["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]
): string {
    return x.b + y.b;
}

function lone<U extends Box>(y: U["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]): string {
    return y.b;
}
