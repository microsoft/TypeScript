//// [objectRestNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;

var b: string;
let notAssignable: { a: string };
({ b, ...notAssignable } = o);


function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}
function generic<T extends { x, y }>(t: T) {
    let { x, ...rest } = t;
    return rest;
}

let rest: { b: string }
({a, ...rest.b + rest.b} = o);

var noContextualType = ({ aNumber = 12, ...notEmptyObject }) => aNumber + notEmptyObject.anythingGoes;

function computed<T extends { x: number, y: string }>(t: T, x: string) {
    let { [x]: first, ...rest } = t; // error, computed causes rest to implicitly be any
    ({ [x]: first, ...rest } = t);
    return [first, rest];
}
let x: string;
let { [x]: x1, ...unknownRest } = o; // error, computed causes rest to implicitly be any
({[x]: x1, ...unknownRest } = o);
let { [x]: x2, ...explicitRest } = o as any; // ok, source is any
({[x]: x2, ...explicitRest } = o as any);
let { ['a']: justA, ...knownRest } = o; // ok, 'a' is a constant


//// [objectRestNegative.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var o = { a: 1, b: 'no' };
var a = o.a;
var b;
var notAssignable;
(b = o.b, o, notAssignable = __rest(o, ["b"]));
function stillMustBeLast(_a) {
    var a = _a.a;
}
function generic(t) {
    var x = t.x, rest = __rest(t, ["x"]);
    return rest;
}
var rest;
(a = o.a, o, rest.b + rest.b = __rest(o, ["a"]));
var noContextualType = function (_a) {
    var _b = _a.aNumber, aNumber = _b === void 0 ? 12 : _b, notEmptyObject = __rest(_a, ["aNumber"]);
    return aNumber + notEmptyObject.anythingGoes;
};
function computed(t, x) {
    var _a = x, first = t[_a], rest = __rest(t, [typeof _a === "symbol" ? _a : _a + ""]); // error, computed causes rest to implicitly be any
    (_b = x, first = t[_b], rest = __rest(t, [typeof _b === "symbol" ? _b : _b + ""]));
    return [first, rest];
    var _b;
}
var x;
var _a = x, x1 = o[_a], unknownRest = __rest(o, [typeof _a === "symbol" ? _a : _a + ""]); // error, computed causes rest to implicitly be any
(_b = x, x1 = o[_b], unknownRest = __rest(o, [typeof _b === "symbol" ? _b : _b + ""]));
var _c = o, _d = x, x2 = _c[_d], explicitRest = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]); // ok, source is any
(_e = o, _f = x, x2 = _e[_f], explicitRest = __rest(_e, [typeof _f === "symbol" ? _f : _f + ""]));
var justA = o["a"], knownRest = __rest(o, ['a']); // ok, 'a' is a constant
var _b, _e, _f;
