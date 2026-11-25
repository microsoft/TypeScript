// @strict: true
// @noEmit: true

// Self-referential homomorphic mapped types whose type variable is instantiated to another of their own type parameters.

type F<T, U> = { [K in keyof T]: F<U, string> };
declare const f: F<{ a: 1 }, number>;
const f1 = f.a;
const f2: F<string, string> = "x";

type X = { x: 1 };
type R<T, U> = {
    [K in keyof T]: {
        rec: R<U, U | X>;
        direct: R<U | X, U | X>;
    }
};
declare const r: R<{ a: 1 }, { b: 2 }>;
const r1 = r.a.rec;
const r2 = r.a.direct;

type G<T, U> = { [K in keyof T]: { next: G<U, string[]>; value: T[K] } };
declare const g: G<{ a: 1 }, number>;
const g1 = g.a.next;
declare const g2: G<string[], string[]>;
const g3 = g2[0].value;
const g4 = g2.length;
