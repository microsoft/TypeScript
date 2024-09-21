// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59946

type Test<T extends string> = { [K in T]: { key: K } }[T] & { target: string };

const foo = <T extends string>(arg: Test<T>) => {
  const value: Test<T> = arg; // ok
  const value2: Test<T>["key"] = arg["key"]; // ok
  const value3: Test<T>["target"] = arg["target"]; // ok
};
