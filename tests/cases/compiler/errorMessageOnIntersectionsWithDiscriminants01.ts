// @noEmit: true

export type Common = { test: true } | { test: false };
export type A = Common & { foo: 1 };
export type B = Common & { bar: 1 };

declare const a: A;
declare let b: B;

b = a;
