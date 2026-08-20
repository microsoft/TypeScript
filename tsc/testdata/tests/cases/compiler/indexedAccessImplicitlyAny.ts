// @target: esnext
// @noImplicitAny: true

interface I { foof: number };
declare const i: I;
i.foo;
i["foo"];