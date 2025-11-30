// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/61581

type Result<A, E> =
  | {
      readonly _tag: "Ok";
      readonly value: A;
    }
  | {
      readonly _tag: "Fail";
      readonly error: E;
    };

declare const isResult: (u: unknown) => u is Result<any, any>;

// return type: Result<A, E> | "ok"
export const fn = <A, E>(inp: Result<A, E> | string) =>
  isResult(inp) ? inp : "ok";
