// Repro from #13346

interface Chainable<T> {
  value(): T;
  mapValues<U>(func: (v: T[keyof T]) => U): Chainable<{[k in keyof T]: U}>;
}

declare function chain<T>(t: T): Chainable<T>;

const square = (x: number) => x * x;

const v = chain({a: 1, b: 2}).mapValues(square).value();
