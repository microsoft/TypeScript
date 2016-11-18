// @target: es2017
declare const ai: AsyncIterable<number>;
function* f() {
    for await (const x of ai) {
    }
}