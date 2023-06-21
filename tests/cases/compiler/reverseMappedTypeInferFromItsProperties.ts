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

declare function inferFromValue<T, S extends string>(obj: { [K in keyof T]: S }): [T, S];
const fromValue1 = inferFromValue({ a: "foo", b: "bar" });

// 52737#issuecomment-1457046429
interface Righto<RT extends any[], ET = any> extends CPSFunction<[], RT, ET> {
  (): Righto<RT, ET>;
  _trace(): void;
}
type ErrBack<RT extends any[] = [], ET = any> = (
  err?: ET,
  ...results: { [P in keyof RT]?: RT[P] }
) => void;
type CPSFunction<AT extends any[], RT extends any[], ET> = (
  ...args: [...AT, ErrBack<RT, ET>]
) => void;
type Flexible<T, ET = any> =
  | T
  | Promise<T>
  | Righto<[T | undefined, ...any[]], ET>;
type ArgsAsFlexible<AT extends any[], ET> = {
  [T in keyof AT]: Flexible<AT[T], ET>;
};
declare function divideNumbersCPS(
  a: number,
  b: number,
  callback: ErrBack<[number], Error>
): void;
declare function righto<AT extends any[], RT extends any[], ET = any>(
  fn: CPSFunction<AT, RT, ET>,
  ...args: ArgsAsFlexible<AT, ET>
): Righto<RT, ET>;
const rightoRes1 = righto(divideNumbersCPS, 1, 1);