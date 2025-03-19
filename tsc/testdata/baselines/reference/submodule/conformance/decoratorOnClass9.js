//// [tests/cases/conformance/decorators/class/decoratorOnClass9.ts] ////

//// [decoratorOnClass9.ts]
declare var dec: any;

class A {}

// https://github.com/Microsoft/TypeScript/issues/16417
@dec
class B extends A {
    static x = 1;
    static y = B.x;
    m() {
        return B.x;
    }
}

//// [decoratorOnClass9.js]
class A {
}
// https://github.com/Microsoft/TypeScript/issues/16417
@dec
class B extends A {
    static x = 1;
    static y = B.x;
    m() {
        return B.x;
    }
}
