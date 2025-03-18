//// [tests/cases/compiler/superPropertyElementNoUnusedLexicalThisCapture.ts] ////

//// [superPropertyElementNoUnusedLexicalThisCapture.ts]
class A { x() {} }

class B extends A {
    constructor() {
        super();
    }
    foo() {
        return () => {
            super.x;
        }
    }
    bar() {
        return () => {
            super["x"];
        }
    }
}

//// [superPropertyElementNoUnusedLexicalThisCapture.js]
class A {
    x() { }
}
class B extends A {
    constructor() {
        super();
    }
    foo() {
        return () => {
            super.x;
        };
    }
    bar() {
        return () => {
            super["x"];
        };
    }
}
