function foo(...rest: number) { // error
	var x: string = rest[0];
	return x;
}