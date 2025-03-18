//// [tests/cases/conformance/async/es5/awaitBinaryExpression/awaitBinaryExpression2_es5.ts] ////

//// [awaitBinaryExpression2_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p && a;
    after();
}

//// [awaitBinaryExpression2_es5.js]
async function func() {
    before();
    var b = await p && a;
    after();
}
