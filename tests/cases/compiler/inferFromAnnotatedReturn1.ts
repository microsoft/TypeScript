// @strict: true
// @noEmit: true

declare function test<T>(cb: (arg: T) => T): T;

const res1 = test((arg): number => 1); // ok
const res2 = test((arg): number => 'foo'); // error

export declare function linkedSignal<S, D>(options: {
  source: () => S;
  computation: (source: NoInfer<D>) => D;
}): D;

const signal = linkedSignal({
  source: () => 3,
  computation: (s): number => 3,
});

class Foo<T, R> {
  constructor(readonly cb: (t: T, _: { x: number; other: NoInfer<R> }) => R) {}
}

const _1 = new Foo((name: string, { x }): { name: string; x: number } => ({
  name,
  x,
}));
