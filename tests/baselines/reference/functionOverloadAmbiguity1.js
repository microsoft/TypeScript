//// [functionOverloadAmbiguity1.js]
function callb(a) {
}
callb(function (a) {
    a.length;
}); // error, chose first overload

function callb2(a) {
}
callb2(function (a) {
    a.length;
}); // ok, chose first overload
