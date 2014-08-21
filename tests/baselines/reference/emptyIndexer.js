//// [emptyIndexer.ts]
interface I1 {
	m(): number;
}

interface I2 {
	[s:string]: I1;
}


var x: I2;

var n = x[''].m(); // should not crash compiler

//// [emptyIndexer.js]
var x;
var n = x[''].m(); // should not crash compiler
