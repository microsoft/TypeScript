//// [tests/cases/compiler/getterMissingReturnError.ts] ////

//// [getterMissingReturnError.ts]
class test {
    public get p2(){

    }
}


//// [getterMissingReturnError.js]
"use strict";
class test {
    get p2() {
    }
}
