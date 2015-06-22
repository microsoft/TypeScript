//// [emptyArrayBindingPatternParameter02.ts]


function f(a, []) {
	var x, y, z;
}

//// [emptyArrayBindingPatternParameter02.js]
function f(a, _a) {
    var x, y, z;
}
