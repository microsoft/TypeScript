//// [asyncAliasReturnType_es2017.ts]
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}

//// [asyncAliasReturnType_es2017.js]
async function f() {
}
