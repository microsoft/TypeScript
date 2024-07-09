//// [tests/cases/conformance/async/es6/asyncAliasReturnType_es6.ts] ////

//// [asyncAliasReturnType_es6.ts]
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}

//// [asyncAliasReturnType_es6.js]
function f() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
