//// [tests/cases/compiler/decoratorMetadataForMethodWithNoReturnTypeAnnotation01.ts] ////

//// [decoratorMetadataForMethodWithNoReturnTypeAnnotation01.ts]
declare var decorator: any;

class MyClass {
    constructor(test: string, test2: number) {

    }

    @decorator
    doSomething() {

    }
}


//// [decoratorMetadataForMethodWithNoReturnTypeAnnotation01.js]
class MyClass {
    constructor(test, test2) {
    }
    @decorator
    doSomething() {
    }
}
