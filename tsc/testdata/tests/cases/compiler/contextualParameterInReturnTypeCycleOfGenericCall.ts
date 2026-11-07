// @strict: true
// @noEmit: true
// @checkOrder: default,typesfirst

// Inferring `T` for `g` needs the return type of the arrow, whose body is a
// call to `f` that is contextually typed by that same return type, a cycle.
// `state` must still get the contextual type `number` (S inferred from
// `initialState`), as in main and TS 6.0 (redux-toolkit `createSlice` inside
// vitest `expect(() => ...)` pattern).

declare function f<S, CR extends Record<string, (state: S) => S>>(options: {
    initialState: S;
    reducers: CR;
}): CR;
declare function g<T>(a: T): void;

g(() => f({ reducers: { a: (state) => state + 1 }, initialState: 0 }));
