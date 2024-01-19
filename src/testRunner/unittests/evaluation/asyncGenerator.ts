import * as evaluator from "../../_namespaces/evaluator";
import * as ts from "../../_namespaces/ts";

describe("unittests:: evaluation:: asyncGeneratorEvaluation", () => {
    it("return (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        async function * g() {
            return Promise.resolve(0);
        }
        export const output: any[] = [];
        export async function main() {
            output.push(await g().next());
        }`);
        await result.main();
        assert.deepEqual(result.output, [
            { value: 0, done: true },
        ]);
    });
    it("return (es2015)", async () => {
        const result = evaluator.evaluateTypeScript(
            `
        async function * g() {
            return Promise.resolve(0);
        }
        export const output: any[] = [];
        export async function main() {
            output.push(await g().next());
        }`,
            { target: ts.ScriptTarget.ES2015 },
        );
        await result.main();
        assert.deepEqual(result.output, [
            { value: 0, done: true },
        ]);
    });
    it("yields in finally block with async delegator (es2017)", async () => {
        const result = evaluator.evaluateTypeScript(
            `
        async function* g1() {
            try {
                yield 1;
            } finally {
                yield 2;
            }
        }
        async function* g2() {
            yield* g1();
        }
        export const output: any[] = [];
        export async function main() {
            const it = g2();
            output.push(await it.next());
            output.push(await it.return());
            output.push(await it.next());
        }`,
            { target: ts.ScriptTarget.ES2017 },
        );
        await result.main();
        assert.deepEqual(result.output, [
            { done: false, value: 1 },
            { done: false, value: 2 },
            { done: true, value: undefined },
        ]);
    });
    it("pass promise to gen.return()", async () => {
        const result = evaluator.evaluateTypeScript(
            `
        export const output = [];
        async function* fn() {
            yield* [1]
            return 3
        }
        export async function main() {
            const it = fn();
            output.push(await it.next());
            output.push(await it.return(Promise.resolve(2)));
        }`,
            { target: ts.ScriptTarget.ES2017 },
        );
        await result.main();
        assert.deepEqual(result.output, [
            { done: false, value: 1 },
            { done: true, value: 2 },
        ]);
    });
});
