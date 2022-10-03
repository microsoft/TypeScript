// conditional expressions return the best common type of the branches plus contextual type (using the first candidate if multiple BCTs exist)
// these are errors

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Base { baz: string; }
var base: Base;
var derived: Derived;
var derived2: Derived2;

var r2 = true ? 1 : '';
var r9 = true ? derived : derived2;

function foo<T, U>(t: T, u: U) {
    return true ? t : u;
}

function foo2<T extends U, U>(t: T, u: U) { // Error for referencing own type parameter
    return true ? t : u; // Ok because BCT(T, U) = U
}

function foo3<T extends U, U extends V, V>(t: T, u: U) {
    return true ? t : u;
}