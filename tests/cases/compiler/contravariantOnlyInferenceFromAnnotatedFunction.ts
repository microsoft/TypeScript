// @strict: true
// @noEmit: true

// repro from #52580

type Funcs<A, B extends Record<string, unknown>> = {
  [K in keyof B]: {
    fn: (a: A, b: B) => void;
    thing: B[K];
  };
}

declare function foo<A, B extends Record<string, unknown>>(fns: Funcs<A, B>): [A, B]

const result = foo({
  bar: {
    fn: (a: string) => {},
    thing: 'asd',
  },
});
