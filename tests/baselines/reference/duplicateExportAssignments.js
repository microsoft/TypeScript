//// [tests/cases/conformance/externalModules/duplicateExportAssignments.ts] ////

//// [foo1.ts]
var x = 10;
var y = 20;
export = x;
export = y;

//// [foo2.ts]
var x = 10;
class y {};
export = x;
export = y;

//// [foo3.ts]
module x {
	export var x = 10;
}
class y {
	y: number;
}
export = x;
export = y;

//// [foo4.ts]
export = x;
function x(){
	return 42;
}
function y(){
	return 42;
}
export = y;

//// [foo5.ts]
var x = 5;
var y = "test";
var z = {};
export = x;
export = y;
export = z;


//// [foo1.js]
var x = 10;
var y = 20;
export {};
//// [foo2.js]
var x = 10;
class y {
}
;
export {};
//// [foo3.js]
var x;
(function (x_1) {
    x_1.x = 10;
})(x || (x = {}));
class y {
    y;
}
export {};
//// [foo4.js]
function x() {
    return 42;
}
function y() {
    return 42;
}
export {};
//// [foo5.js]
var x = 5;
var y = "test";
var z = {};
export {};
