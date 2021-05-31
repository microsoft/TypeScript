// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: privateNameJsBadAssignment.js
// @target: es2015

exports.#nope = 1;           // Error (outside class body)
function A() { }
A.prototype.#no = 2;         // Error (outside class body)

class B {}
B.#foo = 3;                  // Error (outside class body)

class C {
    #bar = 6;
    constructor () {
        this.#foo = 3;       // Error (undeclared)
    }
}
