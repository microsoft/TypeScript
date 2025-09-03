//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/derivedClassConstructorWithoutSuperCall.ts] ////

//// [derivedClassConstructorWithoutSuperCall.ts]
// derived class constructors must contain a super call

class Base {
    x: string;
}

class Derived extends Base {
    constructor() { // error
    }
}

class Base2<T> {
    x: T;
}

class Derived2<T> extends Base2<T> {
    constructor() { // error for no super call (nested scopes don't count)
        var r2 = () => super(); // error for misplaced super call (nested function)
    }
}

class Derived3<T> extends Base2<T> {
    constructor() { // error
        var r = function () { super() } // error
    }
}

class Derived4<T> extends Base2<T> {
    constructor() {
        var r = super(); // ok
    }
}

//// [derivedClassConstructorWithoutSuperCall.js]
// derived class constructors must contain a super call
class Base {
    x;
}
class Derived extends Base {
    constructor() {
    }
}
class Base2 {
    x;
}
class Derived2 extends Base2 {
    constructor() {
        var r2 = () => super(); // error for misplaced super call (nested function)
    }
}
class Derived3 extends Base2 {
    constructor() {
        var r = function () { super(); }; // error
    }
}
class Derived4 extends Base2 {
    constructor() {
        var r = super(); // ok
    }
}
