//// [awaitBinaryExpression3_es2017.ts]
declare var a: number;
declare var p: Promise<number>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p + a;
    after();
}

//// [awaitBinaryExpression3_es2017.js]
async function func() {
    before();
    var b = await p + a;
    after();
}
