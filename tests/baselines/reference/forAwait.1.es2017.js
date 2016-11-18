//// [forAwait.1.es2017.ts]
declare const ai: AsyncIterable<number>;
for await (const x of ai) {
}

//// [forAwait.1.es2017.js]
for await (const x of ai) {
}
