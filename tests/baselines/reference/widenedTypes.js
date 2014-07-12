//// [widenedTypes.js]
null instanceof (function () {
});
({}) instanceof null; // Ok because null is a subtype of function

null in {};
"" in null;

for (var a in null) {
}

var t = [3, (3, null)];
t[3] = "";

// Bug 774508: typeof undefined has the type undefined
var x = 3;
x = 3;

var y;
var u = [3, (y = null)];
u[3] = "";

// Bug 774508: typeof undefined has the type undefined
var ob = { x: "" };

// Highlights the difference between array literals and object literals
var arr = [3, null];
var obj = { x: 3, y: null }; // assignable because null is widened, and therefore BCT is any
