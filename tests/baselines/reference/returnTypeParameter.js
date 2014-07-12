//// [returnTypeParameter.js]
function f(a) {
}
function f2(a) {
    return T;
} // bug was that this satisfied the return statement requirement
