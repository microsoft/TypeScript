// Generic call with constraints infering type parameter from object member properties
// No errors expected

class Base {
    x: string;
}
class Derived extends Base {
    y: string;
}

function f<T extends Base>(x: { foo: T; bar: T }) {
    var r: T;
    return r;
}
var r = f({ foo: new Base(), bar: new Derived() });
var r2 = f({ foo: new Derived(), bar: new Derived() });


interface I<T> {
    a: T;
}
function f2<T extends Base>(x: I<T>) {
    var r: T;
    return r;
}
var i: I<Derived>;
var r3 = f2(i);


function f3<T extends Base>(x: T, y: (a: T) => T) {
    return y(null);
}
var r4 = f3(new Base(), x => x);
var r5 = f3(new Derived(), x => x);

var r6 = f3(null, null); // any
var r7 = f3(null, x => x); // any
