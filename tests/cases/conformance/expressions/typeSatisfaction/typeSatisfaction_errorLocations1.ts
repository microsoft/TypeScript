// @strict: true
// @noEmit: true

const obj1 = { a: 1 };

const fn1 = (s: { a: true }) => {};
fn1({} satisfies unknown);
fn1({ a: 1 } satisfies unknown);
fn1(obj1 satisfies unknown);

class Cls1 {
  constructor(p: { a: true }) {}
}
new Cls1({} satisfies unknown);
new Cls1({ a: 1 } satisfies unknown);
new Cls1(obj1 satisfies unknown);

function fn2<T extends { a: true }[]>(f: (...args: T) => void) {
  f({ a: true } satisfies unknown);
  const o = { a: true as const };
  f(o satisfies unknown);
}

const tuple1: [boolean, boolean] = [true, 100 satisfies unknown];

const obj2 = { a: 10, b: true } satisfies Record<string, number>;

const literal1 = 1 satisfies boolean;
const literal2: true = 1 satisfies number;

declare function fn3(...args: unknown[]): void;
fn3(10, ...([10, "20"] satisfies number[]));
const tuple2 = [10, "20"] as const;
fn3(10, ...(tuple2 satisfies number[]));

declare function fn4(...args: number[]): void;
fn4(10, ...(["10", "20"] satisfies readonly string[]));
const tuple3 = ["10", "20"] as const;
fn4(10, ...(tuple3 satisfies readonly string[]));

function fn5(): number {
  return "foo" satisfies unknown;
}

function fn6(): number {
  return "foo" satisfies number;
}

((): { a: true } => ({}) satisfies unknown)();
((): { a: true } => ({ a: 1 }) satisfies unknown)();
((): { a: true } => obj1 satisfies unknown)();

((): { a: true } => (({}) satisfies unknown) satisfies unknown)();
((): { a: true } => ((({}) satisfies unknown)) satisfies unknown)();
