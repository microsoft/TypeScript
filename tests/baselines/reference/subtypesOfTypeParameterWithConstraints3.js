//// [subtypesOfTypeParameterWithConstraints3.ts]
// checking whether other types are subtypes of type parameters with constraints

function f<T extends U, U, V>(t: T, u: U, v: V) {
    // ok
    var r = true ? t : u;
    var r = true ? u : t;

    // error
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // error
    var r3 = true ? v : u;
    var r3 = true ? u : v;
}

//// [subtypesOfTypeParameterWithConstraints3.js]
function f(t, u, v) {
    var r = true ? t : u;
    var r = true ? u : t;
    var r2 = true ? t : v;
    var r2 = true ? v : t;
    var r3 = true ? v : u;
    var r3 = true ? u : v;
}
