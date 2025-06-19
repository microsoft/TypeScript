//// [tests/cases/compiler/unicodeEscapesInJSDoc.ts] ////

//// [file.js]
/**
 * @param {number} \u0061
 * @param {number} a\u0061
 */
function foo(a, aa) {
    console.log(a + aa);
}

/**
 * @param {number} \u{0061}
 * @param {number} a\u{0061}
 */
function bar(a, aa) {
    console.log(a + aa);
}


//// [file.js]
/**
 * @param {number} \u0061
 * @param {number} a\u0061
 */
function foo(a, aa) {
    console.log(a + aa);
}
/**
 * @param {number} \u{0061}
 * @param {number} a\u{0061}
 */
function bar(a, aa) {
    console.log(a + aa);
}
