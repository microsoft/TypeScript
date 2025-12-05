// @strict: true
// @noEmit: true

type Foo<T> = T | string | number;
type Bar<T> = Foo<T> | undefined;

declare let x1: Bar<"a">;
declare let x2: Bar<"b">;
