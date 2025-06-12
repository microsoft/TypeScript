//// [tests/cases/compiler/thisInStatics.ts] ////

//// [thisInStatics.ts]
class C {
    static f() {
        var y/*1*/ = this;
    }

    static get x() {
        var y/*2*/ = this;
        return y;
    }
}

//// [thisInStatics.js]
class C {
    static f() {
        var y /*1*/ = this;
    }
    static get x() {
        var y /*2*/ = this;
        return y;
    }
}
