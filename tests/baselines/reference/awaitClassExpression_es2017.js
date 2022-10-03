//// [awaitClassExpression_es2017.ts]
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}

//// [awaitClassExpression_es2017.js]
async function func() {
    class D extends (await p) {
    }
}
