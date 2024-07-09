// @allowJs: true
// @noEmit: true
// @checkJs: true
// @Filename: b.js
exports.E = function() {
    this.e = 'exported'
}
var e = new exports.E();

var o = {
    C: function () {
        this.c = 'nested object'
    }
}
var og = new o.C();

var V = function () {
    this.v = 'simple'
}
var v = new V();

var A;
A = function () {
    this.a = 'assignment'
}
var a = new A();

const {
    B = function() {
        this.b = 'binding pattern'
    }
} = { B: undefined };
var b = new B();
