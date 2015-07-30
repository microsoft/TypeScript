//// [emitVoid0ReturnType.ts]

declare var decorator: any;

class MyClass {
    constructor(test: string, test2: number) {

    }

    @decorator
    doSomething() {

    }
}


//// [emitVoid0ReturnType.js]
var MyClass = (function () {
    function MyClass(test, test2) {
    }
    MyClass.prototype.doSomething = function () {
    };
    Object.defineProperty(MyClass.prototype, "doSomething",
        __decorate([
            decorator, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], MyClass.prototype, "doSomething", Object.getOwnPropertyDescriptor(MyClass.prototype, "doSomething")));
    return MyClass;
})();
