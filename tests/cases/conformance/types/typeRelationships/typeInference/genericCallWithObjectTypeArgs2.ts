class Base {
    x: string;
}
class Derived extends Base {
    y: string;
}
class Derived2 extends Base {
    z: string;
}

// returns {}[]
function f<T extends Base, U extends Base>(a: { x: T; y: U }) {
    return [a.x, a.y];
}

var r = f({ x: new Derived(), y: new Derived2() }); // {}[]
var r2 = f({ x: new Base(), y: new Derived2() }); // {}[]


function f2<T extends Base, U extends Base>(a: { x: T; y: U }) {
    return (x: T) => a.y;
}

var r3 = f2({ x: new Derived(), y: new Derived2() }); // Derived => Derived2

interface I<T, U> {
    x: T;
    y: U;
}

var i: I<Base, Derived>;
var r4 = f2(i); // Base => Derived