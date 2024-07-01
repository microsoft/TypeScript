import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: destructuring", () => {
    // https://github.com/microsoft/TypeScript/issues/39205
    describe("correct order for array destructuring evaluation and initializers", () => {
        it("when element is undefined", () => {
            const result = evaluator.evaluateTypeScript(
                `
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let [{ [order(1)]: x } = order(0)] = [];
            `,
                { target: ts.ScriptTarget.ES5 },
            );
            assert.deepEqual(result.output, [0, 1]);
        });
        it("when element is defined", async () => {
            const result = evaluator.evaluateTypeScript(
                `
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let [{ [order(1)]: x } = order(0)] = [{}];
            `,
                { target: ts.ScriptTarget.ES5 },
            );
            assert.deepEqual(result.output, [1]);
        });
    });
    describe("correct order for array destructuring evaluation and initializers with spread", () => {
        it("ES5", () => {
            const result = evaluator.evaluateTypeScript(
                `
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;
                `,
                { target: ts.ScriptTarget.ES5 },
            );
            assert.deepEqual(result.output, [0, 1, 2]);
        });
        it("ES2015", () => {
            const result = evaluator.evaluateTypeScript(
                `
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;
                `,
                { target: ts.ScriptTarget.ES2015 },
            );
            assert.deepEqual(result.output, [0, 1, 2]);
        });
    });
    describe("correct evaluation for nested rest assignment in destructured object", () => {
        it("ES5", () => {
            const result = evaluator.evaluateTypeScript(
                `
                let a: any, b: any, c: any = { x: { a: 1, y: 2 } }, d: any;
                ({ x: { a, ...b } = d } = c);
                export const output = { a, b };
            `,
                { target: ts.ScriptTarget.ES5 },
            );
            assert.deepEqual(result.output, { a: 1, b: { y: 2 } });
        });
        it("ES2015", () => {
            const result = evaluator.evaluateTypeScript(
                `
                let a: any, b: any, c: any = { x: { a: 1, y: 2 } }, d: any;
                ({ x: { a, ...b } = d } = c);
                export const output = { a, b };
            `,
                { target: ts.ScriptTarget.ES2015 },
            );
            assert.deepEqual(result.output, { a: 1, b: { y: 2 } });
        });
        it("ES2018", () => {
            const result = evaluator.evaluateTypeScript(
                `
                let a: any, b: any, c: any = { x: { a: 1, y: 2 } }, d: any;
                ({ x: { a, ...b } = d } = c);
                export const output = { a, b };
            `,
                { target: ts.ScriptTarget.ES2018 },
            );
            assert.deepEqual(result.output, { a: 1, b: { y: 2 } });
        });
    });
});
