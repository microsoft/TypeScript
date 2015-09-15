// @declaration: true

class A {
    private a;
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isAny(x: any): x is any {
    return x instanceof B;
}

let myIsA = isA;
let myIsAny = isAny;

myIsA = myIsAny;
myIsAny = myIsA;