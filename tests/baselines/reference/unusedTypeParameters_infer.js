//// [unusedTypeParameters_infer.ts]
type Length<T> = T extends ArrayLike<infer U> ? number : never;


//// [unusedTypeParameters_infer.js]
