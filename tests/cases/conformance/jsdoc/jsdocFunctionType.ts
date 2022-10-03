// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true

// @Filename: functions.js

/**
 * @param {function(this: string, number): number} c is just passing on through
 * @return {function(this: string, number): number}
 */
function id1(c) {
    return c
}

var x = id1(function (n) { return this.length + n });

/**
 * @param {function(new: { length: number }, number): number} c is just passing on through
 * @return {function(new: { length: number }, number): number}
 */
function id2(c) {
    return c
}

class C {
    /** @param {number} n */
    constructor(n) {
        this.length = n;
    }
}

var y = id2(C);
var z = new y(12);
z.length;

/** @type {function ("a" | "b", 1 | 2): 3 | 4} */
var f = function (ab, onetwo) { return ab === "a" ? 3 : 4;  }


/** 
 * @constructor
 * @param {number} n
 */
function D(n) {
  this.length = n;
}

var y2 = id2(D);
var z2 = new y2(33);
z2.length;


/** 
 * @param {function(new: D, number)} dref
 * @return {D}
 */
var construct = function(dref) { return new dref(33); }
var z3 = construct(D);
z3.length;


/** 
 * @constructor
 * @param {number} n
 */
var E = function(n) {
  this.not_length_on_purpose = n;
};


var y3 = id2(E);

// Repro from #39229

/**
 * @type {(...args: [string, string] | [number, string, string]) => void}
 */
function foo(...args) {
  args;
}

foo('abc', 'def');
foo(42, 'abc', 'def');
