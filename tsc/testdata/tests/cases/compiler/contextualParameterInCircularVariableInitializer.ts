// @strict: true
// @noEmit: true
// @checkOrder: default,typesfirst

// The initializer of `store` refers to `store` from a callback, so resolving
// the type of `store` re-enters itself. `y` must still get its contextual
// type `string` from `Store` (zustand `create<T>()(...)` pattern), with no
// TS7006, as in main and TS 6.0.

declare function create<T>(init: () => T): T;

interface Store {
    a: (x: boolean) => void;
    b: (y: string) => void;
}

const store = create<Store>(() => ({
    a: (x) => store.b(""),
    b: (y) => {},
}));
