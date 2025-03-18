//// [tests/cases/conformance/types/contextualTypes/partiallyAnnotatedFunction/partiallyAnnotatedFunctionInferenceError.ts] ////

//// [partiallyAnnotatedFunctionInferenceError.ts]
class C {
  test: string
}

class D extends C {
  test2: string
}

declare function testError<T extends C>(a: (t: T, t1: T) => void): T

// more args
testError((t1: D, t2, t3) => {})
testError((t1, t2: D, t3) => {})
testError((t1, t2, t3: D) => {})


//// [partiallyAnnotatedFunctionInferenceError.js]
class C {
    test;
}
class D extends C {
    test2;
}
testError((t1, t2, t3) => { });
testError((t1, t2, t3) => { });
testError((t1, t2, t3) => { });
