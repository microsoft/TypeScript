//// [noImplicitAnyWithOverloads.js]
function callb(a) {
}
callb(function (a) {
    a.foo;
}); // error, chose first overload
