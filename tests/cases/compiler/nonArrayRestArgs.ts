// @target: es2015
// @strict: false
function foo(...rest: number) { // error
	var x: string = rest[0];
	return x;
}