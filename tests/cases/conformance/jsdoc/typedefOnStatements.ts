// @strict: true
// @declaration: true
// @outdir: out/
// @filename: typedefOnStatements.js
// @checkJs: true

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

