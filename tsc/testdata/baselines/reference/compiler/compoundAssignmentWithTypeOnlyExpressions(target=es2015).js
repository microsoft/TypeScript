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
    var _a, _b, _c;
    getObject()[++key] || (getObject()[++key] = 1);
    getObject()[++key] || (getObject()[++key] = 1);
    getObject()[++key] || (getObject()[++key] = 1);
    getObject()[++key] || (getObject()[++key] = 1);
    (getObject()[++key]) || ((getObject()[++key]) = 1);
    (_a = getObject())[_b = ++key] || (_a[_b] = 1);
    getObject().x || (getObject().x = 1);
    getObject().x || (getObject().x = 1);
    getObject().x || (getObject().x = 1);
    getObject().x || (getObject().x = 1);
    (getObject().x) || ((getObject().x) = 1);
    (_c = getObject()).x || (_c.x = 1);
}
function logicalAndAssignment() {
    var _a, _b, _c;
    getObject()[++key] && (getObject()[++key] = 1);
    getObject()[++key] && (getObject()[++key] = 1);
    getObject()[++key] && (getObject()[++key] = 1);
    getObject()[++key] && (getObject()[++key] = 1);
    (getObject()[++key]) && ((getObject()[++key]) = 1);
    (_a = getObject())[_b = ++key] && (_a[_b] = 1);
    getObject().x && (getObject().x = 1);
    getObject().x && (getObject().x = 1);
    getObject().x && (getObject().x = 1);
    getObject().x && (getObject().x = 1);
    (getObject().x) && ((getObject().x) = 1);
    (_c = getObject()).x && (_c.x = 1);
}
function nullishAssignment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var _o, _p, _q;
    (_a = getObject()[++key]) !== null && _a !== void 0 ? _a : (getObject()[++key] = 1);
    (_b = getObject()[++key]) !== null && _b !== void 0 ? _b : (getObject()[++key] = 1);
    (_c = getObject()[++key]) !== null && _c !== void 0 ? _c : (getObject()[++key] = 1);
    (_d = getObject()[++key]) !== null && _d !== void 0 ? _d : (getObject()[++key] = 1);
    (_e = (getObject()[++key])) !== null && _e !== void 0 ? _e : ((getObject()[++key]) = 1);
    (_f = (_o = getObject())[_p = ++key]) !== null && _f !== void 0 ? _f : (_o[_p] = 1);
    (_g = getObject().x) !== null && _g !== void 0 ? _g : (getObject().x = 1);
    (_h = getObject().x) !== null && _h !== void 0 ? _h : (getObject().x = 1);
    (_j = getObject().x) !== null && _j !== void 0 ? _j : (getObject().x = 1);
    (_k = getObject().x) !== null && _k !== void 0 ? _k : (getObject().x = 1);
    (_l = (getObject().x)) !== null && _l !== void 0 ? _l : ((getObject().x) = 1);
    (_m = (_q = getObject()).x) !== null && _m !== void 0 ? _m : (_q.x = 1);
}
function exponentiationAssignment() {
    getObject()[++key] = Math.pow(getObject()[++key], 2);
    getObject()[++key] = Math.pow(getObject()[++key], 2);
    getObject()[++key] = Math.pow(getObject()[++key], 2);
    getObject()[++key] = Math.pow(getObject()[++key], 2);
    (getObject()[++key]) = Math.pow((getObject()[++key]), 2);
    (getObject()[++key]) = Math.pow((getObject()[++key]), 2);
    getObject().x = Math.pow(getObject().x, 2);
    getObject().x = Math.pow(getObject().x, 2);
    getObject().x = Math.pow(getObject().x, 2);
    getObject().x = Math.pow(getObject().x, 2);
    (getObject().x) = Math.pow((getObject().x), 2);
    (getObject().x) = Math.pow((getObject().x), 2);
}
