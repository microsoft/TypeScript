// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62761

type Value = 1 | 2

type Result = [Value] extends [infer V]
  ? V extends unknown
    ? [V, Value]
    : never
  : never

type Value2 = { prop: 1 | 2 };

type Result2 = Value2 extends { prop: infer V }
  ? V extends unknown
    ? [V, Value2]
    : never
  : never;
