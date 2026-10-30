//// [tests/cases/compiler/checkOrderStableInstantiationErrors.ts] ////

//// [lib.ts]
export type Dec<N extends number> =
    N extends 5 ? 4 : N extends 4 ? 3 : N extends 3 ? 2 :
    N extends 2 ? any :
    N extends 1 ? 0 : 0;
export type Recur<N extends number, S extends string> =
    N extends 0 ? S : Recur<Dec<N>, `${S}_${S}`>;

//// [a.ts]
import { Recur } from "./lib";
export let a: Recur<5, "a">;

//// [b.ts]
import { Recur } from "./lib";
export let b: Recur<5, "a">;

//// [c.ts]
class T<A> {
    declare a: A;
    declare b: any;
}
class L<RT extends { a: 'a' | 'b', b: any }> extends T<RT[RT['a']]> {}
export class X extends L<X> {
    declare a: 'a' | 'b';
    declare b: number;
    m() {
        this.a;
    }
}


//// [lib.js]
export {};
//// [a.js]
export let a;
//// [b.js]
export let b;
//// [c.js]
class T {
}
class L extends T {
}
export class X extends L {
    m() {
        this.a;
    }
}
