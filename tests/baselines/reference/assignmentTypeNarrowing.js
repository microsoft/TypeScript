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
var x;
x = "";
x; // string
x = [true][0];
x; // boolean
_a = [1][0], x = _a === void 0 ? "" : _a;
x; // string | number
(_b = { x: true }, x = _b.x, _b);
x; // boolean
(_c = { y: 1 }, x = _c.y, _c);
x; // number
(_d = { x: true }, _e = _d.x, x = _e === void 0 ? "" : _e, _d);
x; // string | boolean
(_f = { y: 1 }, _g = _f.y, x = _g === void 0 ? /a/ : _g, _f);
x; // number | RegExp
var a;
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    x = a_1[_i];
    x; // string
}
var _a, _b, _c, _d, _e, _f, _g;
