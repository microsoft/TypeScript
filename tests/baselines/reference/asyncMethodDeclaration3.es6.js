//// [asyncMethodDeclaration3.es6.ts]
let c = class {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}

//// [asyncMethodDeclaration3.es6.js]
let c = class {
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
