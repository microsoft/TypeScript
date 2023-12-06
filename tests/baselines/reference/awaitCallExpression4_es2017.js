//// [tests/cases/conformance/async/es2017/awaitCallExpression/awaitCallExpression4_es2017.ts] ////

//// [awaitCallExpression4_es2017.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function fn(arg0: boolean, arg1: boolean, arg2: boolean): void;
declare var o: { fn(arg0: boolean, arg1: boolean, arg2: boolean): void; };
declare var pfn: Promise<{ (arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare var po: Promise<{ fn(arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = (await pfn)(a, a, a);
    after();
}

//// [awaitCallExpression4_es2017.js]
async function func() {
    before();
    var b = (await pfn)(a, a, a);
    after();
}
