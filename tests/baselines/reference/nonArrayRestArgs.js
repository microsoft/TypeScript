//// [nonArrayRestArgs.ts]
function foo(...rest: number) { // error
	var x: string = rest[0];
	return x;
}

//// [nonArrayRestArgs.js]
function foo() {
    var rest = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        rest[_a - 0] = arguments[_a];
    }
    var x = rest[0];
    return x;
}
