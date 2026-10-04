// @target: esnext

type T = {};
const { promise, resolve, reject } = Promise.withResolvers<T>();
