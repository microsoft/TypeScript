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

declare function getKey(): "x";

class Base {
    get x() { return 2; }
    set x(value: number) {}
}

class Derived extends Base {
    logicalAssignment() {
        super.x! ||= 1;
        (super.x as number) &&= 1;
        (super.x satisfies number) ??= 1;
        (<number>super[getKey()]) ||= 1;
        super[getKey()]! &&= 1;
        (super[getKey()] as number) ??= 1;
    }

    exponentiationAssignment() {
        super.x! **= 2;
        (super.x as number) **= 2;
        (super.x satisfies number) **= 2;
        (<number>super.x) **= 2;
        ((super.x) as number)! **= 2;
        (super.x) **= 2;

        super[getKey()]! **= 2;
        (super[getKey()] as number) **= 2;
        (super[getKey()] satisfies number) **= 2;
        (<number>super[getKey()]) **= 2;
        ((super[getKey()]) as number)! **= 2;
        (super[getKey()]) **= 2;
    }
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    (_a = getObject())[_b = ++key] ?? (_a[_b] = 1);
    (_c = getObject())[_d = ++key] ?? (_c[_d] = 1);
    (_e = getObject())[_f = ++key] ?? (_e[_f] = 1);
    (_g = getObject())[_h = ++key] ?? (_g[_h] = 1);
    (_j = getObject())[_k = ++key] ?? (_j[_k] = 1);
    (_l = getObject())[_m = ++key] ?? (_l[_m] = 1);
    (_o = getObject()).x ?? (_o.x = 1);
    (_p = getObject()).x ?? (_p.x = 1);
    (_q = getObject()).x ?? (_q.x = 1);
    (_r = getObject()).x ?? (_r.x = 1);
    (_s = getObject()).x ?? (_s.x = 1);
    (_t = getObject()).x ?? (_t.x = 1);
}
function exponentiationAssignment() {
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    (getObject()[++key]) **= 2;
    (getObject()[++key]) **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    (getObject().x) **= 2;
    (getObject().x) **= 2;
}
class Base {
    get x() { return 2; }
    set x(value) { }
}
class Derived extends Base {
    logicalAssignment() {
        var _a, _b, _c;
        super.x || (super.x = 1);
        super.x && (super.x = 1);
        super.x ?? (super.x = 1);
        super[_a = getKey()] || (super[_a] = 1);
        super[_b = getKey()] && (super[_b] = 1);
        super[_c = getKey()] ?? (super[_c] = 1);
    }
    exponentiationAssignment() {
        super.x **= 2;
        super.x **= 2;
        super.x **= 2;
        super.x **= 2;
        (super.x) **= 2;
        (super.x) **= 2;
        super[getKey()] **= 2;
        super[getKey()] **= 2;
        super[getKey()] **= 2;
        super[getKey()] **= 2;
        (super[getKey()]) **= 2;
        (super[getKey()]) **= 2;
    }
}
