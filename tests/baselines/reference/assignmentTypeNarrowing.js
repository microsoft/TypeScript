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
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
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
try {
    for (var a_1 = { iterator: __values(a) }; __step(a_1);) {
        x = a_1.result.value;
        x; // string
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(a_1); } finally { if (e_1) throw e_1.error; }
}
var _a, _b, _c, e_1;
