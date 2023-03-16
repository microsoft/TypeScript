// @strict: true
// @noEmit: true

// repro from #29479

type Selector<S, R> = (state: S) => R;

declare function createStructuredSelector<S, T>(selectors: {
  [K in keyof T]: Selector<S, T[K]>;
}): Selector<S, T>;

type State = { foo: number };

declare const mySelector: Selector<State, boolean>;

export const result = createStructuredSelector({ mySelector });

// 52737#discussion_r1127035242
declare const otherSelectors: { [x: string]: Selector<State, boolean> };
export const otherResult = createStructuredSelector(otherSelectors);
