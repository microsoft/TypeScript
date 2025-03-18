//// [tests/cases/conformance/async/es5/awaitClassExpression_es5.ts] ////

//// [awaitClassExpression_es5.ts]
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}

//// [awaitClassExpression_es5.js]
async function func() {
    class D extends (await p) {
    }
}
