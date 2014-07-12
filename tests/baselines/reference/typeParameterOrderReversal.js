//// [typeParameterOrderReversal.js]
// Only difference here is order of type parameters
function uFirst(x) {
}
function tFirst(x) {
}
var z = null;

// Both of these should be allowed
uFirst(z);
tFirst(z);
