// @target: es5

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
