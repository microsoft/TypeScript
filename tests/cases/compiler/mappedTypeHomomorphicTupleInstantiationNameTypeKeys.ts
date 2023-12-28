// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/55774#issuecomment-1813484949

type Mapper<T> = {
  [K in keyof T as K]: T[K] extends NonNullable<T[K]> ? T[K] : never;
};

type Mapped = Mapper<[1, 2]>;
type Keys = keyof Mapper<[1, 2]>;

type SomeType = Mapped[Keys]; // ok
