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
var MyClass = /** @class */ (function () {
    function MyClass(test, test2) {
    }
    MyClass.prototype.doSomething = function () {
    };
    __decorate([
        decorator,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MyClass.prototype, "doSomething", null);
    return MyClass;
}());
