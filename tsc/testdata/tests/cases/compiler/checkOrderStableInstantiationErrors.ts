// @checkOrder: default, reverse, typesfirst
// @filename: lib.ts
export type Dec<N extends number> =
    N extends 5 ? 4 : N extends 4 ? 3 : N extends 3 ? 2 :
    N extends 2 ? any :
    N extends 1 ? 0 : 0;
export type Recur<N extends number, S extends string> =
    N extends 0 ? S : Recur<Dec<N>, `${S}_${S}`>;

// @filename: a.ts
import { Recur } from "./lib";
export let a: Recur<5, "a">;

// @filename: b.ts
import { Recur } from "./lib";
export let b: Recur<5, "a">;

// @filename: c.ts
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
