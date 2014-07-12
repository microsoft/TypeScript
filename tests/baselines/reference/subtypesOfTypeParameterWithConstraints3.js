//// [subtypesOfTypeParameterWithConstraints3.js]
// checking whether other types are subtypes of type parameters with constraints
function f(t, u, v) {
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
