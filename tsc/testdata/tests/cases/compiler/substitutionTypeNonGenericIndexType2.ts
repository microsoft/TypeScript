// @strict: true
// @noEmit: true

type BasicConditional<T> = keyof T extends infer R ? R : never;

type Config = { rejectClose: true };

type Test = Config extends {}
  ? {
      rejectClose: BasicConditional<Config>;
    }
  : never;

const test: Test["rejectClose"] = "rejectClose";
