//// [emptyObjectBindingPatternParameter02.ts]


function f(a, {}) {
	var x, y, z;
}

//// [emptyObjectBindingPatternParameter02.js]
function f(a, _a) {
    var ;
    var x, y, z;
}
