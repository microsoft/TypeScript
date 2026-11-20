// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Printing the candidates of signature help computes the members of the
// reverse mapped type inferred for the call, which resolves the call
// again. That happens within the request, and does not change what
// checking the call infers (29479).

type Selector<S, R> = (state: S, meta: number) => R;

declare function createStructuredSelector<S, T>(selectors: {
  [K in keyof T]: Selector<S, T[K]>;
}): Selector<S, T>;

type State = { foo: number };

declare const mySelector: Selector<State, boolean>

const result1 = createStructuredSelector({
  mySelector: mySelector,
});

const result2 = createStructuredSelector({
  mySelector: (state: State) => true,
});

result2;

export {};
