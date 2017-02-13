type Abc = { a: number, b: string, c: boolean }
let abc: Abc;
var { a, ...{ b, ...rest } } = abc;
var a: number;
var b: string;
var other: { c: boolean };
({ a, ...{ b, ...other } } = abc);

function f<T extends Abc>(t: T) {
    let other: rest(rest(T, 'a'), 'b')
    var { a, ...{ b, ...rest } } = t;
    ({ a, ...{ b, ...rest } } = t);
    other = rest;
    rest = other;
    rest.c;
    return rest;
}

f({ a: 1, b: 'foo', c: false, d: 54 });


