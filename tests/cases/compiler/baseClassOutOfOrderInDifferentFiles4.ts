// @out: file.js
// @filename: file1.ts
class A {
}

module M {
    export class C {
    }
}

// @filename: file2.ts
class B extends A { // no error
}

function foo() {
    class C extends A { // no error
    }
}

class D extends M.C { // no error
}

function foo2() {
    class C extends M.C { // no error
    }
}
