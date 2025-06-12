//// [tests/cases/compiler/superCallInsideClassDeclaration.ts] ////

//// [superCallInsideClassDeclaration.ts]
class A {
}

class C {
}

class B extends A {
    constructor() {

        class D extends C {
            constructor() {
                super();
            }
        }
    }
}

//// [superCallInsideClassDeclaration.js]
class A {
}
class C {
}
class B extends A {
    constructor() {
        class D extends C {
            constructor() {
                super();
            }
        }
    }
}
