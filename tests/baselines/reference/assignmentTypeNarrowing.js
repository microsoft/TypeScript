//// [assignmentTypeNarrowing.ts]
let x: string | number | boolean | RegExp;

x = "";
x; // string

[x] = [true];
x; // boolean

[x = ""] = [1];
x; // string | number

({x} = {x: true});
x; // boolean

({y: x} = {y: 1});
x; // number

({x = ""} = {x: true});
x; // string | boolean

({y: x = /a/} = {y: 1});
x; // number | RegExp

let a: string[];

for (x of a) {
    x; // string
}


//// [assignmentTypeNarrowing.js]
var _a, _b, _c;
var x;
x = "";
x; // string
x = [true][0];
x; // boolean
_a = [1][0], x = _a === void 0 ? "" : _a;
x; // string | number
(x = { x: true }.x);
x; // boolean
(x = { y: 1 }.y);
x; // number
(_b = { x: true }.x, x = _b === void 0 ? "" : _b);
x; // string | boolean
(_c = { y: 1 }.y, x = _c === void 0 ? /a/ : _c);
x; // number | RegExp
var a;
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    x = a_1[_i];
    x; // string
}
