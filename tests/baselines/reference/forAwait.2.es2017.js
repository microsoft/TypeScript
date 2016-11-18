//// [forAwait.2.es2017.ts]
declare const ai: AsyncIterable<number>;
function f() {
    for await (const x of ai) {
    }
}

//// [forAwait.2.es2017.js]
function f() {
    for await (const x of ai) {
    }
}
