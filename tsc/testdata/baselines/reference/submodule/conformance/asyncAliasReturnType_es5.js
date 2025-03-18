//// [tests/cases/conformance/async/es5/asyncAliasReturnType_es5.ts] ////

//// [asyncAliasReturnType_es5.ts]
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}

//// [asyncAliasReturnType_es5.js]
async function f() {
}
