//// [asyncMethodDeclaration1.es6.ts]
class C {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}

//// [asyncMethodDeclaration1.es6.js]
class C {
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
