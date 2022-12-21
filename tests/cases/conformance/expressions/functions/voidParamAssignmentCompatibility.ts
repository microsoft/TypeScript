// @strict: true
declare function g(a: void): void;
let gg: () => void = g;

interface Obj<T> {
    method(value: T): void;
}

declare const o: Obj<void>;
gg = o.method;
