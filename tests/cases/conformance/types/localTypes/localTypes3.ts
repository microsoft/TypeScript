function f1() {
    function f() {
        class C<X, Y> {
            constructor(public x: X, public y: Y) { }
        }
        return C;
    }
    let C = f();
    let v = new C(10, "hello");
    let x = v.x;
    let y = v.y;
}

function f2() {
    function f<X>(x: X) {
        class C<Y> {
            public x = x;
            constructor(public y: Y) { }
        }
        return C;
    }
    let C = f(10);
    let v = new C("hello");
    let x = v.x;
    let y = v.y;
}

function f3() {
    function f<X, Y>(x: X, y: Y) {
        class C {
            public x = x;
            public y = y;
        }
        return C;
    }
    let C = f(10, "hello");
    let v = new C();
    let x = v.x;
    let y = v.y;
}
