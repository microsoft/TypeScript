// Repro from #8383

class A {
    prop: { a: string; };
}

class B {
    prop: { b: string; }
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isB(x: any): x is B {
    return x instanceof B;
}

function f1(x: A | B) {
    while (true) {
        if (x instanceof A) {
            x.prop.a;
        }
        else if (x instanceof B) {
            x.prop.b;
        }
    }
}

function f2(x: A | B) {
    while (true) {
        if (isA(x)) {
            x.prop.a;
        }
        else if (isB(x)) {
            x.prop.b;
        }
    }
}
