//// [tests/cases/compiler/unusedParametersInLambda1.ts] ////

//// [unusedParametersInLambda1.ts]
class A {
    public f1() {
        return (X) => {
        }
    }
}

//// [unusedParametersInLambda1.js]
class A {
    f1() {
        return (X) => {
        };
    }
}
