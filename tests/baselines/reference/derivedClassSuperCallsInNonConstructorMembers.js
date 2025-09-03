//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/derivedClassSuperCallsInNonConstructorMembers.ts] ////

//// [derivedClassSuperCallsInNonConstructorMembers.ts]
// error to use super calls outside a constructor

class Base {
    x: string;
}

class Derived extends Base {
    a: super();
    b() {
        super();
    }
    get C() {
        super();
        return 1;
    }
    set C(v) {
        super();
    }

    static a: super();
    static b() {
        super();
    }
    static get C() {
        super();
        return 1;
    }
    static set C(v) {
        super();
    }
}

//// [derivedClassSuperCallsInNonConstructorMembers.js]
// error to use super calls outside a constructor
class Base {
    x;
}
class Derived extends Base {
    a;
    ;
    b() {
        super();
    }
    get C() {
        super();
        return 1;
    }
    set C(v) {
        super();
    }
    static a;
    ;
    static b() {
        super();
    }
    static get C() {
        super();
        return 1;
    }
    static set C(v) {
        super();
    }
}
