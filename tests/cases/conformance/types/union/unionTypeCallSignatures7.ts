// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55203

interface Callable<Name extends string> {
  (): `${Name} without id`;
  (id: number): `${Name} with id`;
}

declare const f: Callable<"A"> | Callable<"B">;
const result = f(123);
