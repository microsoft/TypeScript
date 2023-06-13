//// [tests/cases/compiler/nonArrayRestArgs.ts] ////

//// [nonArrayRestArgs.ts]
function foo(...rest: number) { // error
	var x: string = rest[0];
	return x;
}

//// [nonArrayRestArgs.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var x = rest[0];
    return x;
}
