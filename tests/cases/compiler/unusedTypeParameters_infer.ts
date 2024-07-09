// @noUnusedParameters: true

type Length<T> = T extends ArrayLike<infer U> ? number : never;
