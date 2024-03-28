//// [tests/cases/conformance/types/intersection/intersectionTypeOverloading.ts] ////

//// [intersectionTypeOverloading.ts]
// Check that order is preserved in intersection types for purposes of
// overload resolution

type F = (s: string) => string;
type G = (x: any) => any;

var fg: F & G;
var gf: G & F;

var x = fg("abc");
var x: string;

var y = gf("abc");
var y: any;


//// [intersectionTypeOverloading.js]
// Check that order is preserved in intersection types for purposes of
// overload resolution
var fg;
var gf;
var x = fg("abc");
var x;
var y = gf("abc");
var y;
