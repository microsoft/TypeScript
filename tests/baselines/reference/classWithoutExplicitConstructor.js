//// [tests/cases/conformance/classes/constructorDeclarations/automaticConstructors/classWithoutExplicitConstructor.ts] ////

//// [classWithoutExplicitConstructor.ts]
class C {
    x = 1
    y = 'hello';
}

var c = new C();
var c2 = new C(null); // error

class D<T extends Date> {
    x = 2
    y: T = null;
}

var d = new D();
var d2 = new D(null); // error

//// [classWithoutExplicitConstructor.js]
class C {
    constructor() {
        this.x = 1;
        this.y = 'hello';
    }
}
var c = new C();
var c2 = new C(null); // error
class D {
    constructor() {
        this.x = 2;
        this.y = null;
    }
}
var d = new D();
var d2 = new D(null); // error
