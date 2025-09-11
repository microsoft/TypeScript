// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59377

interface U<T1, T2> {
  p1: T1;
  p2: T2;
}

interface IFoo<T> {
  test<IT2, P extends U<T, IT2>>(t2: IT2, p: P): void;
}

class Foo<T> implements IFoo<T> {
  test<T2, P extends U<T, T2>>(t2: T2, p: P): void {}
}
