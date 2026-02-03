//// [tests/cases/compiler/spreadObjectPermutations.ts] ////

//// [spreadObjectPermutations.ts]
declare const a: { x: string | number };
declare const b: { x?: string | number };
declare const c: { x?: string | number | undefined };

const v_a = { ...a };
const v_b = { ...b };
const v_c = { ...c };
const v_ab = { ...a, ...b };
const v_ac = { ...a, ...c };
const v_ba = { ...b, ...a };
const v_bc = { ...b, ...c };
const v_ca = { ...c, ...a };
const v_cb = { ...c, ...b };
const v_abc = { ...a, ...b, ...c };
const v_acb = { ...a, ...c, ...b };
const v_bac = { ...b, ...a, ...c };
const v_bca = { ...b, ...c, ...a };
const v_cab = { ...c, ...a, ...b };
const v_cba = { ...c, ...b, ...a };


//// [spreadObjectPermutations.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var v_a = __assign({}, a);
var v_b = __assign({}, b);
var v_c = __assign({}, c);
var v_ab = __assign(__assign({}, a), b);
var v_ac = __assign(__assign({}, a), c);
var v_ba = __assign(__assign({}, b), a);
var v_bc = __assign(__assign({}, b), c);
var v_ca = __assign(__assign({}, c), a);
var v_cb = __assign(__assign({}, c), b);
var v_abc = __assign(__assign(__assign({}, a), b), c);
var v_acb = __assign(__assign(__assign({}, a), c), b);
var v_bac = __assign(__assign(__assign({}, b), a), c);
var v_bca = __assign(__assign(__assign({}, b), c), a);
var v_cab = __assign(__assign(__assign({}, c), a), b);
var v_cba = __assign(__assign(__assign({}, c), b), a);
