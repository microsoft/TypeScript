// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/29919

type FuncParams<T> = T extends (...args: infer P) => any ? P : never;
type Stringify<T> = {
  [K in keyof T]: string;
};
type Optional<T> = {
  [K in keyof T]?: T[K];
};

function doOptionalStuff<T>(func: T, ...params: Optional<FuncParams<T>>) {}

function doStringStuff<T>(func: T, ...params: Stringify<FuncParams<T>>) {}
