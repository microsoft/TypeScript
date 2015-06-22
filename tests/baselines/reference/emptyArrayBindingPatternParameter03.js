//// [emptyArrayBindingPatternParameter03.ts]


function f(a, []) {
	var x, y, z;
}

//// [emptyArrayBindingPatternParameter03.js]
function f(a, _a) {
    var ;
    var x, y, z;
}
