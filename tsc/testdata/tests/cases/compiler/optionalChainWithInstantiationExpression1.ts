// @target: es2019,es2020

declare namespace A {
    export class b<T> {
        static d: number;
        constructor(x: T);
    }
}

type c = unknown;

declare const a: typeof A | undefined;

a?.b<c>.d;

a?.b.d
