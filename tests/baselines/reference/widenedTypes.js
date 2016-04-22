//// [widenedTypes.ts]

null instanceof (() => { });
({}) instanceof null; // Ok because null is a subtype of function

null in {};
"" in null;

for (var a in null) { }

var t = [3, (3, null)];
t[3] = "";

var x: typeof undefined = 3;
x = 3;

var ob: { x: typeof undefined } = { x: "" };

// Highlights the difference between array literals and object literals
// In arrays, null: number, so `strings = numbers` fails
var numbers = [3, null];
var strings: string[] = numbers;

// In objects, null widens to any
var obj1 = { x: "", y: null };
// y: any is assignable to string
var obj: { [s: string]: string; } = obj1; // assignable because null is widened, and therefore BCT is any


//// [widenedTypes.js]
null instanceof (function () { });
({}) instanceof null; // Ok because null is a subtype of function
null in {};
"" in null;
for (var a in null) { }
var t = [3, (3, null)];
t[3] = "";
var x = 3;
x = 3;
var ob = { x: "" };
// Highlights the difference between array literals and object literals
// In arrays, null: number, so `strings = numbers` fails
var numbers = [3, null];
var strings = numbers;
// In objects, null widens to any
var obj1 = { x: "", y: null };
// y: any is assignable to string
var obj = obj1; // assignable because null is widened, and therefore BCT is any


//// [widenedTypes.d.ts]
declare var t: number[];
declare var x: typeof undefined;
declare var ob: {
    x: typeof undefined;
};
declare var numbers: number[];
declare var strings: string[];
declare var obj1: {
    x: string;
    y: any;
};
declare var obj: {
    [s: string]: string;
};
