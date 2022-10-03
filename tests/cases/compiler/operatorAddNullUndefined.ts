enum E { x }
var x1 = null + null;
var x2 = null + undefined;
var x3 = undefined + null;
var x4 = undefined + undefined;
var x5 = 1 + null;
var x6 = 1 + undefined;
var x7 = null + 1;
var x8 = undefined + 1;
var x9 = "test" + null;
var x10 = "test" + undefined;
var x11 = null + "test";
var x12 = undefined + "test";
var x13 = null + E.x
var x14 = undefined + E.x
var x15 = E.x + null
var x16 = E.x + undefined