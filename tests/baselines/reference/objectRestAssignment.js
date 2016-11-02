//// [objectRestAssignment.ts]
let x;
let ka;
let nested;
let other;
let rest;
let complex: { x: { ka, ki }, y: number };
({x: { ka, ...nested }, y: other, ...rest} = complex);


//// [objectRestAssignment.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var x;
var ka;
var nested;
var other;
var rest;
var complex;
(_a = complex.x, (ka = _a.ka, _a), nested = __rest(_a, ["ka"]), (other = complex.y, complex), rest = __rest(complex, ["x", "y"]), complex);
var _a;
