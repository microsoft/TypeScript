import * as evaluator from "../../_namespaces/evaluator";
import * as ts from "../../_namespaces/ts";

describe("unittests:: evaluation:: forAwaitOfEvaluation", () => {
    it("sync (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        let i = 0;
        const iterator: IterableIterator<any> = {
            [Symbol.iterator]() { return this; },
            next() {
                switch (i++) {
                    case 0: return { value: 1, done: false };
                    case 1: return { value: Promise.resolve(2), done: false };
                    case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                    default: return { value: undefined, done: true };
                }
            }
        };
        export const output: any[] = [];
        export async function main() {
            for await (const item of iterator) {
                output.push(item);
            }
        }`, { downlevelIteration: true });
        await result.main();
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.strictEqual(result.output[2], 3);
    });

    it("sync (es2015)", async () => {
        const result = evaluator.evaluateTypeScript(`
        let i = 0;
        const iterator: IterableIterator<any> = {
            [Symbol.iterator]() { return this; },
            next() {
                switch (i++) {
                    case 0: return { value: 1, done: false };
                    case 1: return { value: Promise.resolve(2), done: false };
                    case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                    default: return { value: undefined, done: true };
                }
            }
        };
        export const output: any[] = [];
        export async function main() {
            for await (const item of iterator) {
                output.push(item);
            }
        }`, { target: ts.ScriptTarget.ES2015 });
        await result.main();
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.strictEqual(result.output[2], 3);
    });

    it("async (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        let i = 0;
        const iterator = {
            [Symbol.asyncIterator](): AsyncIterableIterator<any> { return this; },
            async next() {
                switch (i++) {
                    case 0: return { value: 1, done: false };
                    case 1: return { value: Promise.resolve(2), done: false };
                    case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                    default: return { value: undefined, done: true };
                }
            }
        };
        export const output: any[] = [];
        export async function main() {
            for await (const item of iterator) {
                output.push(item);
            }
        }`, { downlevelIteration: true });
        await result.main();
        assert.strictEqual(result.output[0], 1);
        assert.instanceOf(result.output[1], Promise);
        assert.instanceOf(result.output[2], Promise);
    });

    it("async (es2015)", async () => {
        const result = evaluator.evaluateTypeScript(`
        let i = 0;
        const iterator = {
            [Symbol.asyncIterator](): AsyncIterableIterator<any> { return this; },
            async next() {
                switch (i++) {
                    case 0: return { value: 1, done: false };
                    case 1: return { value: Promise.resolve(2), done: false };
                    case 2: return { value: new Promise<number>(resolve => setTimeout(resolve, 100, 3)), done: false };
                    default: return { value: undefined, done: true };
                }
            }
        };
        export const output: any[] = [];
        export async function main() {
            for await (const item of iterator) {
                output.push(item);
            }
        }`, { target: ts.ScriptTarget.ES2015 });
        await result.main();
        assert.strictEqual(result.output[0], 1);
        assert.instanceOf(result.output[1], Promise);
        assert.instanceOf(result.output[2], Promise);
    });

    it("don't call return when non-user code throws (es2015)", async () => {
        const result = evaluator.evaluateTypeScript(`
        let returnCalled = false;
        async function f() {
            let i = 0;
            const iterator = {
                [Symbol.asyncIterator](): AsyncIterableIterator<any> { return this; },
                async next() {
                    i++;
                    if (i < 2) return { value: undefined, done: false };
                    throw new Error();
                },
                async return() {
                    returnCalled = true;
                }
            };
            for await (const item of iterator) {
            }
        }
        export async function main() {
            try { await f(); } catch { }
            return returnCalled;
        }
        `, { target: ts.ScriptTarget.ES2015 });
        assert.isFalse(await result.main());
    });
});
