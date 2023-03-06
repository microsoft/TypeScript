//// [typedefScope1.js]
function B1() {
    /** @typedef {number} B */
    /** @type {B} */
    var ok1 = 0;
}

function B2() {
    /** @typedef {string} B */
    /** @type {B} */
    var ok2 = 'hi';
}

/** @type {B} */
var notOK = 0;


//// [typedefScope1.js]
"use strict";
function B1() {
    /** @typedef {number} B */
    /** @type {B} */
    var ok1 = 0;
}
function B2() {
    /** @typedef {string} B */
    /** @type {B} */
    var ok2 = 'hi';
}
/** @type {B} */
var notOK = 0;


//// [typedefScope1.d.ts]
declare function B1(): void;
declare function B2(): void;
/** @type {B} */
declare var notOK: B;
