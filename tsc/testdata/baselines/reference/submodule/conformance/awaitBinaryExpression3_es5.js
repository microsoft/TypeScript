//// [tests/cases/conformance/async/es5/awaitBinaryExpression/awaitBinaryExpression3_es5.ts] ////

//// [awaitBinaryExpression3_es5.ts]
declare var a: number;
declare var p: Promise<number>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p + a;
    after();
}

//// [awaitBinaryExpression3_es5.js]
async function func() {
    before();
    var b = await p + a;
    after();
}
