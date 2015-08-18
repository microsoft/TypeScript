module M {
    export class A {
    }
}

class C1 extends M.A { // no error
}

class C2 extends M.B { // error
}

function foo2() {
    class C3 extends M.A { // no error
    }

    class C4 extends M.B { // no error
    }
}

module M {
    export class B {
    }
}