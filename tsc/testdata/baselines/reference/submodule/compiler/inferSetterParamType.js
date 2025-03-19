//// [tests/cases/compiler/inferSetterParamType.ts] ////

//// [inferSetterParamType.ts]
class Foo {

    get bar() {
        return 0;
    }
    set bar(n) { // should not be an error - infer number
    }
}

class Foo2 {

    get bar() {
        return 0; // should be an error - can't coerce infered return type to match setter annotated type
    }
    set bar(n:string) {
    }
}


//// [inferSetterParamType.js]
class Foo {
    get bar() {
        return 0;
    }
    set bar(n) {
    }
}
class Foo2 {
    get bar() {
        return 0; // should be an error - can't coerce infered return type to match setter annotated type
    }
    set bar(n) {
    }
}
