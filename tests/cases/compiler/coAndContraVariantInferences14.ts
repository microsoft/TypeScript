// @strict: true
// @noEmit: true

interface Foo {
  type: "foo";
  optionalProp?: boolean;
}

type Consumer<T> = (arg: T) => void;

declare function someFunc<T extends Foo>(consumer: Consumer<T>, defaultT: T): T;

declare const fooConsumer: Consumer<Foo>;

const result = someFunc(fooConsumer, { type: "foo", extra: "bar" });
result.extra;
