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
/** @typedef {{a: string}} A */
type A = {
    a: string;
};
/** @typedef {{ b: string }} B */
type B = {
    b: string;
};
/** @typedef {{ c: string }} C */
type C = {
    c: string;
};
/** @typedef {{ d: string }} D */
type D = {
    d: string;
};
/** @typedef {{ e: string }} E */
type E = {
    e: string;
};
/** @typedef {{ f: string }} F */
type F = {
    f: string;
};
/** @typedef {{ g: string }} G */
type G = {
    g: string;
};
/** @typedef {{ h: string }} H */
type H = {
    h: string;
};
/** @typedef {{ i: string }} I */
type I = {
    i: string;
};
/** @typedef {{ j: string }} J */
type J = {
    j: string;
};
/** @typedef {{ k: string }} K */
type K = {
    k: string;
};
/** @typedef {{ l: string }} L */
type L = {
    l: string;
};
/** @typedef {{ m: string }} M */
type M = {
    m: string;
};
/** @typedef {{ n: string }} N */
type N = {
    n: string;
};
/** @typedef {{ o: string }} O */
type O = {
    o: string;
};
/** @typedef {{ p: string }} P */
type P = {
    p: string;
};
/** @typedef {{ q: string }} Q */
type Q = {
    q: string;
};
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
