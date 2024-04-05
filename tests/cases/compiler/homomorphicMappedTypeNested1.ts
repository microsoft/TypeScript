// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58060

type ValueType = string;

type Box<T extends ValueType> = { v: T };

type Test<T extends ValueType[]> = T;

type UnboxArray<T> = {
  [K in keyof T]: T[K] extends Box<infer R> ? R : never;
};

type Identity<T> = { [K in keyof T]: T[K] };

declare function fn<T extends Array<Box<ValueType>>>(
  ...args: T
): Test<Identity<UnboxArray<T>>>;
