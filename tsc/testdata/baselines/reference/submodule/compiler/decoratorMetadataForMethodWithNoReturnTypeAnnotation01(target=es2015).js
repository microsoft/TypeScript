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
"use strict";
class MyClass {
    constructor(test, test2) {
    }
    doSomething() {
    }
}
__decorate([
    decorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyClass.prototype, "doSomething", null);
