describe("unittests:: evaluation:: destructuring", () => {
    // https://github.com/microsoft/TypeScript/issues/39205
    describe("correct order for array destructuring evaluation and initializers", () => {
        it("when element is undefined", () => {
            const result = evaluator.evaluateTypeScript(`
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let [{ [order(1)]: x } = order(0)] = [];
            `, { target: ts.ScriptTarget.ES5 });
            assert.deepEqual(result.output, [0, 1]);
        });
        it("when element is defined", async () => {
            const result = evaluator.evaluateTypeScript(`
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let [{ [order(1)]: x } = order(0)] = [{}];
            `, { target: ts.ScriptTarget.ES5 });
            assert.deepEqual(result.output, [1]);
        });
    });
    describe("correct order for array destructuring evaluation and initializers with spread", () => {
        it("ES5", () => {
            const result = evaluator.evaluateTypeScript(`
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;
                `, { target: ts.ScriptTarget.ES5 });
            assert.deepEqual(result.output, [0, 1, 2]);
        });
        it("ES2015", () => {
            const result = evaluator.evaluateTypeScript(`
                export const output: any[] = [];
                const order = (n: any): any => output.push(n);
                let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;
                `, { target: ts.ScriptTarget.ES2015 });
            assert.deepEqual(result.output, [0, 1, 2]);
        });
    });
});
