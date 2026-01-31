//// [tests/cases/compiler/superCallInsideObjectLiteralExpression.ts] ////

//// [superCallInsideObjectLiteralExpression.ts]
class A {
    foo() {
    }
}

class B extends A {
    constructor() {
        var x = {
            x: super()
        }
    }
}

//// [superCallInsideObjectLiteralExpression.js]
class A {
    foo() {
    }
}
class B extends A {
    constructor() {
        var x = {
            x: super()
        };
    }
}
