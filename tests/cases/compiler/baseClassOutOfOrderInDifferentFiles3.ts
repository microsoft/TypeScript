// @out: file.js
// @filename: file1.ts
class B extends A { // error
}

function foo() {
    class C extends A { // no error
    }
}

class D extends M.C { // error
}

function foo2() {
    class C extends M.C { // no error
    }
}

// @filename: file2.ts
class A {
}

module M {
    export class C {
    }
}