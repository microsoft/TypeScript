//// [tests/cases/compiler/compoundAssignmentWithTypeOnlyExpressions.ts] ////

//// [compoundAssignmentWithTypeOnlyExpressions.ts]
declare function getObject(): { x: number; [key: number]: number };
let key = 0;

function logicalOrAssignment() {
    getObject()[++key]! ||= 1;
    (getObject()[++key] as number) ||= 1;
    (getObject()[++key] satisfies number) ||= 1;
    (<number>getObject()[++key]) ||= 1;
    ((getObject()[++key]) as number)! ||= 1;
    (getObject()[++key]) ||= 1;

    getObject().x! ||= 1;
    (getObject().x as number) ||= 1;
    (getObject().x satisfies number) ||= 1;
    (<number>getObject().x) ||= 1;
    ((getObject().x) as number)! ||= 1;
    (getObject().x) ||= 1;
}

function logicalAndAssignment() {
    getObject()[++key]! &&= 1;
    (getObject()[++key] as number) &&= 1;
    (getObject()[++key] satisfies number) &&= 1;
    (<number>getObject()[++key]) &&= 1;
    ((getObject()[++key]) as number)! &&= 1;
    (getObject()[++key]) &&= 1;

    getObject().x! &&= 1;
    (getObject().x as number) &&= 1;
    (getObject().x satisfies number) &&= 1;
    (<number>getObject().x) &&= 1;
    ((getObject().x) as number)! &&= 1;
    (getObject().x) &&= 1;
}

function nullishAssignment() {
    getObject()[++key]! ??= 1;
    (getObject()[++key] as number) ??= 1;
    (getObject()[++key] satisfies number) ??= 1;
    (<number>getObject()[++key]) ??= 1;
    ((getObject()[++key]) as number)! ??= 1;
    (getObject()[++key]) ??= 1;

    getObject().x! ??= 1;
    (getObject().x as number) ??= 1;
    (getObject().x satisfies number) ??= 1;
    (<number>getObject().x) ??= 1;
    ((getObject().x) as number)! ??= 1;
    (getObject().x) ??= 1;
}

function exponentiationAssignment() {
    getObject()[++key]! **= 2;
    (getObject()[++key] as number) **= 2;
    (getObject()[++key] satisfies number) **= 2;
    (<number>getObject()[++key]) **= 2;
    ((getObject()[++key]) as number)! **= 2;
    (getObject()[++key]) **= 2;

    getObject().x! **= 2;
    (getObject().x as number) **= 2;
    (getObject().x satisfies number) **= 2;
    (<number>getObject().x) **= 2;
    ((getObject().x) as number)! **= 2;
    (getObject().x) **= 2;
}


//// [compoundAssignmentWithTypeOnlyExpressions.js]
"use strict";
let key = 0;
function logicalOrAssignment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    (_a = getObject())[_b = ++key] || (_a[_b] = 1);
    (_c = getObject())[_d = ++key] || (_c[_d] = 1);
    (_e = getObject())[_f = ++key] || (_e[_f] = 1);
    (_g = getObject())[_h = ++key] || (_g[_h] = 1);
    (_j = getObject())[_k = ++key] || (_j[_k] = 1);
    (_l = getObject())[_m = ++key] || (_l[_m] = 1);
    (_o = getObject()).x || (_o.x = 1);
    (_p = getObject()).x || (_p.x = 1);
    (_q = getObject()).x || (_q.x = 1);
    (_r = getObject()).x || (_r.x = 1);
    (_s = getObject()).x || (_s.x = 1);
    (_t = getObject()).x || (_t.x = 1);
}
function logicalAndAssignment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    (_a = getObject())[_b = ++key] && (_a[_b] = 1);
    (_c = getObject())[_d = ++key] && (_c[_d] = 1);
    (_e = getObject())[_f = ++key] && (_e[_f] = 1);
    (_g = getObject())[_h = ++key] && (_g[_h] = 1);
    (_j = getObject())[_k = ++key] && (_j[_k] = 1);
    (_l = getObject())[_m = ++key] && (_l[_m] = 1);
    (_o = getObject()).x && (_o.x = 1);
    (_p = getObject()).x && (_p.x = 1);
    (_q = getObject()).x && (_q.x = 1);
    (_r = getObject()).x && (_r.x = 1);
    (_s = getObject()).x && (_s.x = 1);
    (_t = getObject()).x && (_t.x = 1);
}
function nullishAssignment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    (_a = (_o = getObject())[_p = ++key]) !== null && _a !== void 0 ? _a : (_o[_p] = 1);
    (_b = (_q = getObject())[_r = ++key]) !== null && _b !== void 0 ? _b : (_q[_r] = 1);
    (_c = (_s = getObject())[_t = ++key]) !== null && _c !== void 0 ? _c : (_s[_t] = 1);
    (_d = (_u = getObject())[_v = ++key]) !== null && _d !== void 0 ? _d : (_u[_v] = 1);
    (_e = (_w = getObject())[_x = ++key]) !== null && _e !== void 0 ? _e : (_w[_x] = 1);
    (_f = (_y = getObject())[_z = ++key]) !== null && _f !== void 0 ? _f : (_y[_z] = 1);
    (_g = (_0 = getObject()).x) !== null && _g !== void 0 ? _g : (_0.x = 1);
    (_h = (_1 = getObject()).x) !== null && _h !== void 0 ? _h : (_1.x = 1);
    (_j = (_2 = getObject()).x) !== null && _j !== void 0 ? _j : (_2.x = 1);
    (_k = (_3 = getObject()).x) !== null && _k !== void 0 ? _k : (_3.x = 1);
    (_l = (_4 = getObject()).x) !== null && _l !== void 0 ? _l : (_4.x = 1);
    (_m = (_5 = getObject()).x) !== null && _m !== void 0 ? _m : (_5.x = 1);
}
function exponentiationAssignment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    (_a = getObject())[_b = ++key] = Math.pow(_a[_b], 2);
    (_c = getObject())[_d = ++key] = Math.pow(_c[_d], 2);
    (_e = getObject())[_f = ++key] = Math.pow(_e[_f], 2);
    (_g = getObject())[_h = ++key] = Math.pow(_g[_h], 2);
    (_j = getObject())[_k = ++key] = Math.pow(_j[_k], 2);
    (_l = getObject())[_m = ++key] = Math.pow(_l[_m], 2);
    (_o = getObject()).x = Math.pow(_o.x, 2);
    (_p = getObject()).x = Math.pow(_p.x, 2);
    (_q = getObject()).x = Math.pow(_q.x, 2);
    (_r = getObject()).x = Math.pow(_r.x, 2);
    (_s = getObject()).x = Math.pow(_s.x, 2);
    (_t = getObject()).x = Math.pow(_t.x, 2);
}
