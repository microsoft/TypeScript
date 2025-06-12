//// [tests/cases/compiler/setterWithReturn.ts] ////

//// [setterWithReturn.ts]
class C234 {
    public set p1(arg1) {
        if (true) {
            return arg1;
        }
        else {
            return 0;
        }
   }
}

//// [setterWithReturn.js]
class C234 {
    set p1(arg1) {
        if (true) {
            return arg1;
        }
        else {
            return 0;
        }
    }
}
