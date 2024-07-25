//// [tests/cases/conformance/jsdoc/jsdocLiteral.ts] ////

//// [in.js]
/**
 * @param {'literal'} p1
 * @param {"literal"} p2
 * @param {'literal' | 'other'} p3
 * @param {'literal' | number} p4
 * @param {12 | true | 'str'} p5
 */
function f(p1, p2, p3, p4, p5) {
    return p1 + p2 + p3 + p4 + p5 + '.';
}


//// [out.js]
/**
 * @param {'literal'} p1
 * @param {"literal"} p2
 * @param {'literal' | 'other'} p3
 * @param {'literal' | number} p4
 * @param {12 | true | 'str'} p5
 */
function f(p1, p2, p3, p4, p5) {
    return p1 + p2 + p3 + p4 + p5 + '.';
}
