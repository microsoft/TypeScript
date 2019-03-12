//// [noImplicitThisFunctions.ts]
function f1(x) {
    // implicit any is still allowed
    return x + 1;
}

function f2(y: number) {
    // ok: no reference to this
    return y + 1;
}

function f3(z: number): number {
    // error: this is implicitly any
    return this.a + z;
}

// error: `this` is `window`, but is still of type `any`
let f4: (b: number) => number = b => this.c + b;
let f5 = () => () => this;

let f6 = function() { return () => this; };
let f7 = function() { return function() { return this } };


//// [noImplicitThisFunctions.js]
var _this = this;
function f1(x) {
    // implicit any is still allowed
    return x + 1;
}
function f2(y) {
    // ok: no reference to this
    return y + 1;
}
function f3(z) {
    // error: this is implicitly any
    return this.a + z;
}
// error: `this` is `window`, but is still of type `any`
var f4 = function (b) { return _this.c + b; };
var f5 = function () { return function () { return _this; }; };
var f6 = function () {
    var _this = this;
    return function () { return _this; };
};
var f7 = function () { return function () { return this; }; };
