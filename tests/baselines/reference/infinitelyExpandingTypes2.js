//// [infinitelyExpandingTypes2.js]
function f(p) {
    console.log(p);
}

var v = null;

f(v); // should not error
