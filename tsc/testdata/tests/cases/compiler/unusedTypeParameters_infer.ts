// @target: es2015
// @noUnusedParameters: true

type Length<T> = T extends ArrayLike<infer U> ? number : never;
