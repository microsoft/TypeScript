// @declaration: true

class A {
    private a;
}

class B extends A {
    private b;
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isB(x: any): x is B {
    return x instanceof B;
}

let myIsA = isA;
let myIsB = isB;

myIsA = myIsB;
myIsB = myIsA;