//// [getSignatureOfTypeCrash.ts]
declare interface Foo {
    a(): boolean;
    b(): void;
    c(argument: boolean): void;
    d(argument: number): void;
}

declare const Foo: Mapped<Foo>;
type Mapped<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R
    ? (...args: Args) => R
    : never;
};

function foo(key: 'a' | 'b' | 'c' | 'd') {
  Foo[key]();
}

//// [getSignatureOfTypeCrash.js]
function foo(key) {
    Foo[key]();
}
