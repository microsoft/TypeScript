// @Filename: foo1.ts
var x = 10;
var y = 20;
export = x;
export = y;

// @Filename: foo2.ts
var x = 10;
class y {};
export = x;
export = y;

// @Filename: foo3.ts
module x {
	export var x = 10;
}
class y {
	y: number;
}
export = x;
export = y;

// @Filename: foo4.ts
export = x;
function x(){
	return 42;
}
function y(){
	return 42;
}
export = y;

// @Filename: foo5.ts
var x = 5;
var y = "test";
var z = {};
export = x;
export = y;
export = z;
