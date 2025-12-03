// @strict: true
// @noEmit: true

declare function f1<T>(
  arg: {
    [K in keyof T]: T[K][keyof T[K]];
  }
): T;

const res1 = f1({
  a: "hello",
  b: 100,
});

type Inner<O> = {
  [I in keyof O]: O[I][keyof O[I]];
};

declare function f2<T>(fields: {
  [K in keyof T]: {
    label: string;
    values: Inner<T[K]>;
  };
}): T;

const res2 = f2({
  prop: {
    label: "first",
    values: {
      foo: 123,
      bar: true,
    },
  },
  other: {
    label: "second",
    values: {
      baz: "",
      qwe: [true],
    },
  },
});


declare function f3<T>(
  arg: {
    [K in keyof T]: {
      a: T[K][keyof T[K] & "A"];
      b: T[K][keyof T[K] & "B"];
    }
  }
): T;

const res3 = f3({
  x: {
    a: "foo",
    b: 42,
  },
  y: {
    a: 100,
    b: "bar",
  },
});
