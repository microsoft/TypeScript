// @target: es2015
// @noImplicitAny: true
declare function asFunction<T>(value: T): () => T;
asFunction(() => { return 1; });