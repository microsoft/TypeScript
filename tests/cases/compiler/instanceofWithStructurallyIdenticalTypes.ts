// Repro from #7271

class C1 { item: string }
class C2 { item: string[] }
class C3 { item: string }

function foo1(x: C1 | C2 | C3): string {
    if (x instanceof C1) {
        return x.item;
    }
    else if (x instanceof C2) {
        return x.item[0];
    }
    else if (x instanceof C3) {
        return x.item;
    }
    return "error";
}

function isC1(c: C1 | C2 | C3): c is C1 { return c instanceof C1 }
function isC2(c: C1 | C2 | C3): c is C2 { return c instanceof C2 }
function isC3(c: C1 | C2 | C3): c is C3 { return c instanceof C3 }

function foo2(x: C1 | C2 | C3): string {
    if (isC1(x)) {
        return x.item;
    }
    else if (isC2(x)) {
        return x.item[0];
    }
    else if (isC3(x)) {
        return x.item;
    }
    return "error";
}

// More tests

class A { a: string }
class A1 extends A { }
class A2 { a: string }
class B extends A { b: string }

function goo(x: A) {
    if (x instanceof A) {
        x;  // A
    }
    else {
        x;  // never
    }
    if (x instanceof A1) {
        x;  // A1
    }
    else {
        x;  // A
    }
    if (x instanceof A2) {
        x;  // A2
    }
    else {
        x;  // A
    }
    if (x instanceof B) {
        x;  // B
    }
    else {
        x;  // A
    }
}
