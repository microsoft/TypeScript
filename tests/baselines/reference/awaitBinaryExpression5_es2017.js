//// [awaitBinaryExpression5_es2017.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var o: { a: boolean; };
    o.a = await p;
    after();
}

//// [awaitBinaryExpression5_es2017.js]
async function func() {
    before();
    var o;
    o.a = await p;
    after();
}
