//// [tests/cases/compiler/superCallInsideClassExpression.ts] ////

//// [superCallInsideClassExpression.ts]
class A {
}

class C {
}

class B extends A {
    constructor() {

        var D = class extends C {
            constructor() {
                super();
            }
        }
    }
}

//// [superCallInsideClassExpression.js]
class A {
}
class C {
}
class B extends A {
    constructor() {
        var D = class extends C {
            constructor() {
                super();
            }
        };
    }
}
