// @declaration: true

interface A {
    a?;
}

interface B {
}

function isA(x: any): x is A {
    return !!(<A>x).a;
}

function isB(x: any): x is B {
    return !!isA(x);
}

let myIsA = isA;
let myIsAny = isB;

myIsA = myIsAny;
myIsAny = myIsA;