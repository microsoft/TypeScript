// checking whether other types are subtypes of type parameters with constraints

function f<T extends U, U, V>(t: T, u: U, v: V) {
    // ok
    var r = true ? t : u;
    var r = true ? u : t;

    // ok
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // ok
    var r3 = true ? v : u;
    var r3 = true ? u : v;
}