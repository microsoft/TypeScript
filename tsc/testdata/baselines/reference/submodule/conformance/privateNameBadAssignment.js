//// [tests/cases/conformance/classes/members/privateNames/privateNameBadAssignment.ts] ////

//// [privateNameBadAssignment.ts]
exports.#nope = 1;           // Error (outside class body)
function A() { }
A.prototype.#no = 2;         // Error (outside class body)

class B {}
B.#foo = 3;                  // Error (outside class body)

class C {
    #bar = 6;
    constructor () {
        exports.#bar = 6;    // Error
        this.#foo = 3;       // Error (undeclared)
    }
}


//// [privateNameBadAssignment.js]
exports.#nope = 1;
function A() { }
A.prototype.#no = 2;
class B {
}
B.#foo = 3;
class C {
    #bar = 6;
    constructor() {
        exports.#bar = 6;
        this.#foo = 3;
    }
}
