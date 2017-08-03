// @allowJs: true
// @checkJs: true
/// <reference path='fourslash.ts' />

// @Filename: foo.js
/////**
//// * @param {object} o - very important!
//// * @param {string} o.x - a thing, its ok
//// * @param {number} o.y - another thing
//// * @param {Object} o.nested - very nested
//// * @param {boolean} o.nested.[|great|] - much greatness
//// * @param {number} o.nested.times - twice? probably!??
//// */
//// function f(o) { return o.nested.[|great|]; }

verify.rangesReferenceEachOther();

///**
// * @param {object} [|o|] - very important!
// * @param {string} o.x - a thing, its ok
// */
// function f([|o|]) { return [|o|].x; }
