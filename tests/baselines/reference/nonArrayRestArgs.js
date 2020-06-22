//// [nonArrayRestArgs.ts]
function foo(...rest: number) { // error
	var x: string = rest[0];
	return x;
}

//// [nonArrayRestArgs.js]
function foo() {
    var x = rest[0];
    return x;
}
