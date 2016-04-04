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
var MyClass = (function () {
    function MyClass(test, test2) {
    }
    MyClass.prototype.doSomething = function () {
    };
    return MyClass;
}());
__decorate([
    decorator,
    __metadata("design:typeinfo", {
        type: function () { return Function; },
        paramTypes: function () { return []; },
        returnType: function () { return void 0; }
    })
], MyClass.prototype, "doSomething", null);
