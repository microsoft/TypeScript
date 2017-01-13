//// [differenceTypeAssignability.ts]
type A = 'a';
type B = 'b';
type C = 'c';
type AB = A | B;
type AC = A | C;
type Abcuxyz = { a, b, c, u, x, y, z }
type BN = { b: number };

function f<T extends Abcuxyz, U extends Abcuxyz, V extends string> (t: T, u: U, v: V) {
    let t_u: rest(T, 'u');
    let t_string: rest(T, string);
    let u_xyz: rest(U, 'x' | 'y' | 'z');

    t_u = t;   // ok
    t_u = t_u; // ok
    t_u = t_string; // error
    t_u = u_xyz; // error

    var t_a: rest(T, A);
    var t_c: rest(T, C);
    var t_ab: rest(T, AB);
    var u_a: rest(U, A);

    t_a = t_a; // ok
    t_ab = t_a; // ok
    t_a = t; // ok

    t_a = t_c; // error
    t_a = t_ab; // error
    t = t_a; // error, T-a is missing 'a' if T contains 'a'
    t_a = u_a; // error

    var a_xyz: rest({ a, x, y, z }, 'x' | 'y' | 'z');
    t_a = a_xyz; // error, this makes no sense.

    var bn: BN;
    t_a = bn; // error, we have no idea what other properties T has
    bn = t_a; // ok, T - a still has b:any

    let nest: rest(rest(T, 'a'), 'b');
    let flip: rest(rest(T, 'b'), 'a');
    let flat: rest(T, 'a' | 'b');
    nest = flip;
    nest = flat;
    flip = nest;
    flip = flat;
    flat = nest;
    flat = flip;
}


//// [differenceTypeAssignability.js]
function f(t, u, v) {
    var t_u;
    var t_string;
    var u_xyz;
    t_u = t; // ok
    t_u = t_u; // ok
    t_u = t_string; // error
    t_u = u_xyz; // error
    var t_a;
    var t_c;
    var t_ab;
    var u_a;
    t_a = t_a; // ok
    t_ab = t_a; // ok
    t_a = t; // ok
    t_a = t_c; // error
    t_a = t_ab; // error
    t = t_a; // error, T-a is missing 'a' if T contains 'a'
    t_a = u_a; // error
    var a_xyz;
    t_a = a_xyz; // error, this makes no sense.
    var bn;
    t_a = bn; // error, we have no idea what other properties T has
    bn = t_a; // ok, T - a still has b:any
    var nest;
    var flip;
    var flat;
    nest = flip;
    nest = flat;
    flip = nest;
    flip = flat;
    flat = nest;
    flat = flip;
}
