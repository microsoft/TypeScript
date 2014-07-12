//// [typeArgumentInferenceTransitiveConstraints.js]
function fn(a, b, c) {
    return [a, b, c];
}

var d = fn(new Date(), new Date(), new Date());
var d;
