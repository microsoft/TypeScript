//// [asyncMethodDeclaration7.es6.ts]
class D {
    superMethod() {}
    static staticSuperMethod() {}
}
let c = class extends D {
    async method() {
        super.superMethod();
        await undefined;
    }
    
    static async staticMethod() {
        super.staticSuperMethod();
        await undefined;
    }
}

//// [asyncMethodDeclaration7.es6.js]
class D {
    superMethod() { }
    static staticSuperMethod() { }
}
let c = (class_1 = class extends D {
    method() {
        return __awaiter(this, void 0, Promise, class_1.prototype._method_async);
    }
    *_method_async() {
        super.superMethod();
        yield undefined;
    }
    static staticMethod() {
        return __awaiter(this, void 0, Promise, class_1._staticMethod_async);
    }
    static *_staticMethod_async() {
        super.staticSuperMethod();
        yield undefined;
    }
});
var class_1;
