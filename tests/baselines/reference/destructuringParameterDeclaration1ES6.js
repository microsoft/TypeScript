//// [destructuringParameterDeclaration1ES6.ts]
type arrayString = Array<String>
type someArray = Array<String> | number[];
type stringOrNumArray = Array<String|Number>;

function a3(...x = [1,2,3]) { }
function a4(...x: (number|string)[]) { }
function a5(...a) { }
function a6(...a: Array<String>) { }
function a7(...a: arrayString) { }
function a8(...a: stringOrNumArray) { }
function a9(...a: someArray) { }
function a10(...b?) { }
function a11(...b = [1,2,3]) { }


a4(1, 2, "hello", true);
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a5([...array]);
a4(...array);
a4(...array2);

//// [destructuringParameterDeclaration1ES6.js]
function a3(...x = [1, 2, 3]) { }
function a4(...x) { }
function a5(...a) { }
function a6(...a) { }
function a7(...a) { }
function a8(...a) { }
function a9(...a) { }
function a10(...b) { }
function a11(...b = [1, 2, 3]) { }
a4(1, 2, "hello", true);
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a5([...array]);
a4(...array);
a4(...array2);
