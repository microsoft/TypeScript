//// [asyncMethodDeclaration2.es6.ts]
let c = class C {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}

//// [asyncMethodDeclaration2.es6.js]
let c = class C {
    method() {
        return __awaiter(this, void 0, Promise, function* () {
            yield undefined;
        });
    }
    static staticMethod() {
        return __awaiter(this, void 0, Promise, function* () {
            yield undefined;
        });
    }
}
;
