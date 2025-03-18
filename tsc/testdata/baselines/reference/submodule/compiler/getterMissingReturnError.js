//// [tests/cases/compiler/getterMissingReturnError.ts] ////

//// [getterMissingReturnError.ts]
class test {
    public get p2(){

    }
}


//// [getterMissingReturnError.js]
class test {
    get p2() {
    }
}
