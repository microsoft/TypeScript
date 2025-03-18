//// [tests/cases/conformance/async/es6/awaitClassExpression_es6.ts] ////

//// [awaitClassExpression_es6.ts]
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}

//// [awaitClassExpression_es6.js]
async function func() {
    class D extends (await p) {
    }
}
