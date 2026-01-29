//// [tests/cases/compiler/typeOfThisInStatics.ts] ////

//// [typeOfThisInStatics.ts]
class C {
    static foo() {
        var r = this;
    }
    static get x() {
        var r = this;
        return 1;
    }
}


//// [typeOfThisInStatics.js]
class C {
    static foo() {
        var r = this;
    }
    static get x() {
        var r = this;
        return 1;
    }
}
