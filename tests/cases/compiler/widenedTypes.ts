//@declaration: true

null instanceof (() => { });
({}) instanceof null; // Ok because null is a subtype of function

null in {};
"" in null;

for (var a in null) { }

var t = [3, (3, null)];
t[3] = "";

var x: typeof undefined = 3;
x = 3;

var y;
var u = [3, (y = null)];
u[3] = "";

var ob: { x: typeof undefined } = { x: "" };

// Highlights the difference between array literals and object literals
var arr: string[] = [3, null]; // not assignable because null is not widened. BCT is {}
var obj: { [x: string]: string; } = { x: 3, y: null }; // assignable because null is widened, and therefore BCT is any