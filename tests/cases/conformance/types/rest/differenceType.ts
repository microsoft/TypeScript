type A = { a };
type Ab = { a; b };
let nothing: rest(A, 'a');
let none: rest(Ab, 'a' | 'b');
let under: rest(Ab, 'a');
let empty: rest(Ab, 'a' | 'b');
let nope: rest({}, string);
let nope2: rest(Ab, string);

type Abcd = { a; b; c; d }

function f<T extends Abcd>(t: T) {
    let tsubu: rest(T, 'b' | 'd');
    return tsubu;
}

const explicit = f<Abcd>({ a: 1, b: 2, c: 3, d: 4 })
const inferred = f({ a: 1, b: 2, c: 3, d: 5 })
