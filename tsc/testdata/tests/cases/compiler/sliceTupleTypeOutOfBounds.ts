// @strict: true

type Middle<T> = T extends [unknown, ... infer X, unknown] ? X: never;
type Example = Middle<[1]>;
