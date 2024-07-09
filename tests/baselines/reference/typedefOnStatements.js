//// [tests/cases/conformance/jsdoc/typedefOnStatements.ts] ////

//// [typedefOnStatements.js]
/** @typedef {{a: string}} A */
;
/** @typedef {{ b: string }} B */
debugger;
/** @typedef {{ c: string }} C */
{
}
/** @typedef {{ d: string }} D */
1 + 1;
/** @typedef {{ e: string }} E */
if (false) {
}
/** @typedef {{ f: string }} F */
do {
} while (false);
/** @typedef {{ g: string }} G */
while (false) {
}
/** @typedef {{ h: string }} H */
for (;; false) {
}
/** @typedef {{ i: string }} I */
for (let i in []) {
}
/** @typedef {{ j: string }} J */
break;
/** @typedef {{ k: string }} K */
for (let k of []) {
}
/** @typedef {{ l: string }} L */
continue;
/** @typedef {{ m: string }} M */
with (name) {
}
/** @typedef {{ n: string }} N */
switch (name) {
}

/** @typedef {{ o: string }} O */
fork: while (false) {
}

/** @typedef {{ p: string }} P */
throw new Error('Unreachable')

/** @typedef {{ q: string }} Q */
try {
}
catch (e) {
}

/**
 * @param {A} a
 * @param {B} b
 * @param {C} c
 * @param {D} d
 * @param {E} e
 * @param {F} f
 * @param {G} g
 * @param {H} h
 * @param {I} i
 * @param {J} j
 * @param {K} k
 * @param {L} l
 * @param {M} m
 * @param {N} n
 * @param {O} o
 * @param {P} p
 * @param {Q} q
 */
function proof (a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q) {
    console.log(a.a, b.b, c.c, d.d, e.e, f.f, g.g, h.h, i.i, j.j, k.k, l.l, m.m, n.n, o.o, p.p, q.q)
    /** @type {Alpha} */
    var alpha = { alpha: "aleph" }
    /** @typedef {{ alpha: string }} Alpha */
    return
}



//// [typedefOnStatements.js]
"use strict";
/** @typedef {{a: string}} A */
;
/** @typedef {{ b: string }} B */
debugger;
/** @typedef {{ c: string }} C */
{
}
/** @typedef {{ d: string }} D */
1 + 1;
/** @typedef {{ e: string }} E */
if (false) {
}
/** @typedef {{ f: string }} F */
do {
} while (false);
/** @typedef {{ g: string }} G */
while (false) {
}
/** @typedef {{ h: string }} H */
for (;; false) {
}
/** @typedef {{ i: string }} I */
for (var i in []) {
}
/** @typedef {{ j: string }} J */
break;
/** @typedef {{ k: string }} K */
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var k = _a[_i];
}
/** @typedef {{ l: string }} L */
continue;
/** @typedef {{ m: string }} M */
with (name) {
}
/** @typedef {{ n: string }} N */
switch (name) {
}
/** @typedef {{ o: string }} O */
fork: while (false) {
}
/** @typedef {{ p: string }} P */
throw new Error('Unreachable');
/** @typedef {{ q: string }} Q */
try {
}
catch (e) {
}
/**
 * @param {A} a
 * @param {B} b
 * @param {C} c
 * @param {D} d
 * @param {E} e
 * @param {F} f
 * @param {G} g
 * @param {H} h
 * @param {I} i
 * @param {J} j
 * @param {K} k
 * @param {L} l
 * @param {M} m
 * @param {N} n
 * @param {O} o
 * @param {P} p
 * @param {Q} q
 */
function proof(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    console.log(a.a, b.b, c.c, d.d, e.e, f.f, g.g, h.h, i.i, j.j, k.k, l.l, m.m, n.n, o.o, p.p, q.q);
    /** @type {Alpha} */
    var alpha = { alpha: "aleph" };
    /** @typedef {{ alpha: string }} Alpha */
    return;
}


//// [typedefOnStatements.d.ts]
/**
 * @param {A} a
 * @param {B} b
 * @param {C} c
 * @param {D} d
 * @param {E} e
 * @param {F} f
 * @param {G} g
 * @param {H} h
 * @param {I} i
 * @param {J} j
 * @param {K} k
 * @param {L} l
 * @param {M} m
 * @param {N} n
 * @param {O} o
 * @param {P} p
 * @param {Q} q
 */
declare function proof(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q): void;
type A = {
    a: string;
};
type B = {
    b: string;
};
type C = {
    c: string;
};
type D = {
    d: string;
};
type E = {
    e: string;
};
type F = {
    f: string;
};
type G = {
    g: string;
};
type H = {
    h: string;
};
type I = {
    i: string;
};
type J = {
    j: string;
};
type K = {
    k: string;
};
type L = {
    l: string;
};
type M = {
    m: string;
};
type N = {
    n: string;
};
type O = {
    o: string;
};
type P = {
    p: string;
};
type Q = {
    q: string;
};
