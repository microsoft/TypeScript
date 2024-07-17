// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55932

type Replace<T extends [...any], A, B> = {
  [K in keyof T]: T[K] extends A ? B : T[K];
};

type ReplaceParams1<ARRAY extends [...any], A, B> = (
  ...args: Replace<ARRAY, A, B>
) => any;
