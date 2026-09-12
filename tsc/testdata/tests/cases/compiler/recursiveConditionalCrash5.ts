// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63040

type StringTreeArrayAsTuple<T> = (T extends [...infer R] ? [...StringTreeArrayAsTuple<R>] : never) & boolean;
