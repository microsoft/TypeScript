// @strict: true
// @noEmit: true

declare function test1<T extends { x: string }>(
  a: T,
  b: NoInfer<T> | (() => NoInfer<T>),
): void;

test1({ x: "foo" }, { x: "bar" }); // no error
test1({ x: "foo" }, { x: "bar", y: 42 }); // epc error

declare function test2<T extends { x: string }>(
  a: T,
  b: NoInfer<T> | NoInfer<() => T>,
): void;

test2({ x: "foo" }, { x: "bar" }); // no error
test2({ x: "foo" }, { x: "bar", y: 42 }); // epc error

declare function test3<T extends { x: string }>(
  a: T,
  b: NoInfer<T | (() => T)>,
): void;

test3({ x: "foo" }, { x: "bar" }); // no error
test3({ x: "foo" }, { x: "bar", y: 42 }); // epc error
