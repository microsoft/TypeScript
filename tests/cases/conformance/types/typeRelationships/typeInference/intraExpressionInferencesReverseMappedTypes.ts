// @strict: true
// @declaration: true

// repro cases based on https://github.com/microsoft/TypeScript/issues/53018

declare function f<T>(
  arg: {
    [K in keyof T]: {
      produce: (n: string) => T[K];
      consume: (x: T[K]) => void;
    };
  }
): T;

const res1 = f({
  a: {
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
});

const res2 = f({
  a: {
    produce: function () {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce: function () {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
});

const res3 = f({
  a: {
    produce() {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce() {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
});

declare function f2<T extends unknown[]>(
  arg: [
    ...{
      [K in keyof T]: {
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
      };
    }
  ]
): T;

const res4 = f2([
  {
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  {
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
]);

const res5 = f2([
  {
    produce: function () {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  {
    produce: function () {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
]);

const res6 = f2([
  {
    produce() {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  {
    produce() {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
]);

declare function f3<T>(
  arg: {
    [K in keyof T]: {
      other: number,
      produce: (n: string) => T[K];
      consume: (x: T[K]) => void;
    };
  }
): T;

const res7 = f3({
  a: {
    other: 42,
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  b: {
    other: 100,
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
});

declare function f4<T>(
  arg: {
    [K in keyof T]: [
      (n: string) => T[K],
      (x: T[K]) => void
    ];
  }
): T;

const res8 = f4({
  a: [
    (n) => n,
    (x) => x.toLowerCase(),
  ],
  b: [
    (n) => ({ v: n }),
    (x) => x.v.toLowerCase(),
  ],
});
