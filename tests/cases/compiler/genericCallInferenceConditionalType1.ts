// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59108

declare const f: <T>(f: (x: T) => unknown) => (x: T) => unknown;
declare const g: <T extends unknown>(x: { foo: T }) => unknown;

const h = f(g);

type FirstParameter<T> = T extends (x: infer P) => unknown ? P : unknown;

type X = FirstParameter<typeof h>["foo"];
