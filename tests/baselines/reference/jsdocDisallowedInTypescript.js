//// [jsdocDisallowedInTypescript.ts]
// grammar error from checker
var ara: Array.<number> = [1,2,3];

function f(x: ?number, y: Array.<number>) {
    return x ? x + y[1] : y[0];
}
function hof(ctor: function(new: number, string)) {
    return new ctor('hi');
}
function hof2(f: function(this: number, string): string) {
    return f(12, 'hullo');
}
var whatevs: * = 1001;
var ques: ? = 'what';
var g: function(number, number): number = (n,m) => n + m;
var most: !string = 'definite';
var postfixdef: number! = 101;
var postfixopt: number? = undefined;

var nns: Array<?number>;
var dns: Array<!number>;
var anys: Array<*>;



//// [jsdocDisallowedInTypescript.js]
"use strict";
// grammar error from checker
var ara = [1, 2, 3];
function f(x, y) {
    return x ? x + y[1] : y[0];
}
function hof(ctor) {
    return new ctor('hi');
}
function hof2(f) {
    return f(12, 'hullo');
}
var whatevs = 1001;
var ques = 'what';
var g = function (n, m) { return n + m; };
var most = 'definite';
var postfixdef = 101;
var postfixopt = undefined;
var nns;
var dns;
var anys;
