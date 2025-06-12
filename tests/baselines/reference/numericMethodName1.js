//// [tests/cases/compiler/numericMethodName1.ts] ////

//// [numericMethodName1.ts]
class C {
  1 = 2;
}


//// [numericMethodName1.js]
class C {
    constructor() {
        this[1] = 2;
    }
}
