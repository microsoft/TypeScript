//// [subtypingWithOptionalProperties.ts]
// subtyping is not transitive due to optional properties but the subtyping algorithm assumes it is for the 99% case

// returns { s?: number; }
function f<T>(a: T) {
    var b: { s?: number } = a;
    return b;
}

var r = f({ s: new Object() }); // ok
r.s && r.s.toFixed(); // would blow up at runtime

//// [subtypingWithOptionalProperties.js]
// subtyping is not transitive due to optional properties but the subtyping algorithm assumes it is for the 99% case
// returns { s?: number; }
function f(a) {
    var b = a;
    return b;
}
var r = f({ s: new Object() }); // ok
r.s && r.s.toFixed(); // would blow up at runtime
