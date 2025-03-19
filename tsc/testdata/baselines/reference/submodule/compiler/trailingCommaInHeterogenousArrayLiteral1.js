//// [tests/cases/compiler/trailingCommaInHeterogenousArrayLiteral1.ts] ////

//// [trailingCommaInHeterogenousArrayLiteral1.ts]
class arrTest {
    test(arg1: number[]) {    }
    callTest() {
        // these two should give the same error
        this.test([1, 2, "hi", 5, ]);
        this.test([1, 2, "hi", 5]); 
    }
}


//// [trailingCommaInHeterogenousArrayLiteral1.js]
class arrTest {
    test(arg1) { }
    callTest() {
        // these two should give the same error
        this.test([1, 2, "hi", 5,]);
        this.test([1, 2, "hi", 5]);
    }
}
