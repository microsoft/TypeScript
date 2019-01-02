interface I {
    a: number;
    b: number;
}
type J = {
    [K in 'b' | 'a']: I[K]
};

type L = Pick<J, 'a'>

declare const j: J;
j.a;
j.b;

declare const l: L
l.a
