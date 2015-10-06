//// [asyncMethodDeclaration4.es6.ts]
export default class {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}

//// [asyncMethodDeclaration4.es6.js]
export default class {
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
