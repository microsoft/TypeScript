import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: generatorEvaluation", () => {
    it("throw before start (es5)", () => {
        const { gen, output } = evaluator.evaluateTypeScript(
            `
            export const output: string[] = [];
            export function * gen() {
                output.push("start");
                yield 1;
                output.push("end");
            }
        `,
            { target: ts.ScriptTarget.ES5 },
        );

        const g = gen();
        const e = new Error();
        assert.throws(() => g.throw(e), e);
        assert.deepEqual(g.next(), { value: undefined, done: true });
        assert.deepEqual(output, []);
    });
    it("return before start (es5)", () => {
        const { gen, output } = evaluator.evaluateTypeScript(
            `
            export const output: string[] = [];
            export function * gen() {
                output.push("start");
                yield 1;
                output.push("end");
            }
        `,
            { target: ts.ScriptTarget.ES5 },
        );

        const g = gen();
        assert.deepEqual(g.return(2), { value: 2, done: true });
        assert.deepEqual(g.next(), { value: undefined, done: true });
        assert.deepEqual(output, []);
    });
});
