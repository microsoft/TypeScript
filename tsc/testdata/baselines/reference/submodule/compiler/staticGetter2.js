//// [tests/cases/compiler/staticGetter2.ts] ////

//// [staticGetter2.ts]
// once caused stack overflow
class C {
    static x() {
        var r = this;
        return this;
    }
}

//// [staticGetter2.js]
// once caused stack overflow
class C {
    static x() {
        var r = this;
        return this;
    }
}
