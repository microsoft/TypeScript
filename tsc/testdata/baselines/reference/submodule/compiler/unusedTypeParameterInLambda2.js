//// [tests/cases/compiler/unusedTypeParameterInLambda2.ts] ////

//// [unusedTypeParameterInLambda2.ts]
class A {
    public f1() {
        return <T, X>() => {
            var a: X;
            a;
        }
    }
}

//// [unusedTypeParameterInLambda2.js]
class A {
    f1() {
        return () => {
            var a;
            a;
        };
    }
}
