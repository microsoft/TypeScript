//// [tests/cases/compiler/unusedParametersInLambda2.ts] ////

//// [unusedParametersInLambda2.ts]
class A {
    public f1() {
        return (X, Y) => {
            Y;
        }
    }
}

//// [unusedParametersInLambda2.js]
class A {
    f1() {
        return (X, Y) => {
            Y;
        };
    }
}
