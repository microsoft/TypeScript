//// [differenceType.ts]
type A = { a };
type Ab = { a; b };
let nothing: rest(A, 'a');
let none: rest(Ab, 'a' | 'b');
let over: rest(A, 'a' | 'b');
let under: rest(Ab, 'a');
let partial: rest(Ab, 'b' | 'd');
let empty: rest(Ab, 'a' | 'b');
let nope: rest({}, string);
let nope2: rest(Ab, string);
let nope3: rest({}, 'a' | 'b');

type Abcd = { a; b; c; d }

function f<T>(t: T) {
    let tsubu: rest(T, 'b' | 'd');
    return tsubu;
}

const justA = f<Ab>({ a: 1, b: 2 })
const inferred = f({ a: 1, b: 2 })


//// [differenceType.js]
var nothing;
var none;
var over;
var under;
var partial;
var empty;
var nope;
var nope2;
var nope3;
function f(t) {
    var tsubu;
    return tsubu;
}
var justA = f({ a: 1, b: 2 });
var inferred = f({ a: 1, b: 2 });
