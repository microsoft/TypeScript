//// [tests/cases/conformance/types/localTypes/localTypes1.ts] ////

//// [localTypes1.ts]
function f1() {
    enum E {
        A, B, C
    }
    class C {
        x: E;
    }
    interface I {
        x: E;
    }
    type A = I[];
    let a: A = [new C()];
    a[0].x = E.B;
    return a;
}

function f2() {
    function g() {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
        interface I {
            x: E;
        }
        type A = I[];
        let a: A = [new C()];
        a[0].x = E.B;
        return a;
    }
    return g();
}

function f3(b: boolean) {
    if (true) {
        enum E {
            A, B, C
        }
        if (b) {
            class C {
                x: E;
            }
            interface I {
                x: E;
            }
            type A = I[];
            let a: A = [new C()];
            a[0].x = E.B;
            return a;
        }
        else {
            class A {
                x: E;
            }
            interface J {
                x: E;
            }
            type C = J[];
            let c: C = [new A()];
            c[0].x = E.B;
            return c;
        }
    }
}

function f5() {
    var z1 = function () {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
        return new C();
    }
    var z2 = () => {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
        return new C();
    }
}

class A {
    constructor() {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
    }
    m() {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
        return new C();
    }
    get p() {
        enum E {
            A, B, C
        }
        class C {
            x: E;
        }
        return new C();
    }
}

function f6() {
    class A {
        a: string;
    }
    function g() {
        class B extends A {
            b: string;
        }
        function h() {
            class C extends B {
                c: string;
            }
            var x = new C();
            x.a = "a";
            x.b = "b";
            x.c = "c";
            return x;
        }
        return h();
    }
    return g();
}


//// [localTypes1.js]
function f1() {
    let E;
    (function (E) {
        E[E["A"] = 0] = "A";
        E[E["B"] = 1] = "B";
        E[E["C"] = 2] = "C";
    })(E || (E = {}));
    class C {
        x;
    }
    let a = [new C()];
    a[0].x = E.B;
    return a;
}
function f2() {
    function g() {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
        let a = [new C()];
        a[0].x = E.B;
        return a;
    }
    return g();
}
function f3(b) {
    if (true) {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        if (b) {
            class C {
                x;
            }
            let a = [new C()];
            a[0].x = E.B;
            return a;
        }
        else {
            class A {
                x;
            }
            let c = [new A()];
            c[0].x = E.B;
            return c;
        }
    }
}
function f5() {
    var z1 = function () {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
        return new C();
    };
    var z2 = () => {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
        return new C();
    };
}
class A {
    constructor() {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
    }
    m() {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
        return new C();
    }
    get p() {
        let E;
        (function (E) {
            E[E["A"] = 0] = "A";
            E[E["B"] = 1] = "B";
            E[E["C"] = 2] = "C";
        })(E || (E = {}));
        class C {
            x;
        }
        return new C();
    }
}
function f6() {
    class A {
        a;
    }
    function g() {
        class B extends A {
            b;
        }
        function h() {
            class C extends B {
                c;
            }
            var x = new C();
            x.a = "a";
            x.b = "b";
            x.c = "c";
            return x;
        }
        return h();
    }
    return g();
}
