//// [tests/cases/compiler/unusedTypeParameterInLambda1.ts] ////

//// [unusedTypeParameterInLambda1.ts]
class A {
    public f1() {
        return <T>() => {

        }
    }
}

//// [unusedTypeParameterInLambda1.js]
class A {
    f1() {
        return () => {
        };
    }
}
