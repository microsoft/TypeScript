//// [forAwait.3.es2017.ts]
declare const ai: AsyncIterable<number>;
async function f() {
    for await (const x of ai) {
    }
}

//// [forAwait.3.es2017.js]
async function f() {
    for await (const x of ai) {
    }
}
