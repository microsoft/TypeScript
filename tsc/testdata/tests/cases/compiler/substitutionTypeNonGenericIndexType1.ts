// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61728

type BasicConditional<T> = keyof T extends any
  ? true
  : false;

type Config = { rejectClose: true };
type Test =
  Config extends {}
    ? {
        rejectClose: BasicConditional<Config>;
      }
    : never;

type RejectClose = Test["rejectClose"];
