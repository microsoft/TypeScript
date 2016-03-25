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

// ok, arrow functions don't even bind `this`, so `this` is just `window`
let f4: (b: number) => number = b => this.c + b;


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
// ok, arrow functions don't even bind `this`, so `this` is just `window`
var f4 = function (b) { return _this.c + b; };
