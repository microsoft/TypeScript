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
const v_a = Object.assign({}, a);
const v_b = Object.assign({}, b);
const v_c = Object.assign({}, c);
const v_ab = Object.assign(Object.assign({}, a), b);
const v_ac = Object.assign(Object.assign({}, a), c);
const v_ba = Object.assign(Object.assign({}, b), a);
const v_bc = Object.assign(Object.assign({}, b), c);
const v_ca = Object.assign(Object.assign({}, c), a);
const v_cb = Object.assign(Object.assign({}, c), b);
const v_abc = Object.assign(Object.assign(Object.assign({}, a), b), c);
const v_acb = Object.assign(Object.assign(Object.assign({}, a), c), b);
const v_bac = Object.assign(Object.assign(Object.assign({}, b), a), c);
const v_bca = Object.assign(Object.assign(Object.assign({}, b), c), a);
const v_cab = Object.assign(Object.assign(Object.assign({}, c), a), b);
const v_cba = Object.assign(Object.assign(Object.assign({}, c), b), a);
