//// [asyncMethodDeclaration8.es6.ts]
class D {
    superMethod() {}
    static staticSuperMethod() {}
}
export default class extends D {
    async method() {
        super.superMethod();
        await undefined;
    }
    
    static async staticMethod() {
        super.staticSuperMethod();
        await undefined;
    }
}

//// [asyncMethodDeclaration8.es6.js]
class D {
    superMethod() { }
    static staticSuperMethod() { }
}
export default class default_1 extends D {
    method() {
        return __awaiter(this, void 0, Promise, default_1.prototype._method_async);
    }
    *_method_async() {
        super.superMethod();
        yield undefined;
    }
    static staticMethod() {
        return __awaiter(this, void 0, Promise, default_1._staticMethod_async);
    }
    static *_staticMethod_async() {
        super.staticSuperMethod();
        yield undefined;
    }
}
