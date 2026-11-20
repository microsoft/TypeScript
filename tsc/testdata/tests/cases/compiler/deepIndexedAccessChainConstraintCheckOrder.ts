// @strict: true
// @noEmit: true
// @checkOrder: default, reverse, isolated, typesfirst

// The base constraint of a chain of indexed accesses is found through the
// object type of each, all of which share the recursion identity of the
// type parameter. The chain is finite, so the property access is valid
// however deep the chain, and whichever declaration is checked first (65508).

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
