import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: forOfEvaluation", () => {
    it("es5 over a array with no Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
            Symbol = undefined;
            export var output = [];
            export function main() {
                let x = [1,2,3];

                for (let value of x) {
                    output.push(value);
                }
            }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        result.main();

        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.strictEqual(result.output[2], 3);
    });

    it("es5 over a string with no Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
            Symbol = undefined;
            export var output = [];
            export function main() {
                let x = "hello";

                for (let value of x) {
                    output.push(value);
                }
            }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        result.main();

        assert.strictEqual(result.output[0], "h");
        assert.strictEqual(result.output[1], "e");
        assert.strictEqual(result.output[2], "l");
        assert.strictEqual(result.output[3], "l");
        assert.strictEqual(result.output[4], "o");
    });

    it("es5 over undefined with no Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
        Symbol = undefined;
        export function main() {
            let x = undefined;

            for (let value of x) {
            }
        }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        assert.throws(() => result.main(), "Symbol.iterator is not defined");
    });

    it("es5 over undefined with Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
        export function main() {
            let x = undefined;

            for (let value of x) {
            }
        }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        assert.throws(() => result.main(), /cannot read property.*Symbol\(Symbol\.iterator\).*/i);
    });

    it("es5 over object with no Symbol.iterator with no Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
        Symbol = undefined;
        export function main() {
            let x = {} as any;

            for (let value of x) {
            }
        }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        assert.throws(() => result.main(), "Symbol.iterator is not defined");
    });

    it("es5 over object with no Symbol.iterator with Symbol", () => {
        const result = evaluator.evaluateTypeScript(
            `
        export function main() {
            let x = {} as any;

            for (let value of x) {
            }
        }
        `,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        assert.throws(() => result.main(), "Object is not iterable");
    });

    it("es5 over object with Symbol.iterator", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export var output = [];
            export function main() {
                let thing : any = {};
                thing[Symbol.iterator] = () => {
                    let i = 0;
                    return { next() { i++; return this; }, value: i, done: i < 10 };
                };

                for (let value of thing)
                {
                    output.push(value)
                }

            }`,
            { downlevelIteration: true, target: ts.ScriptTarget.ES5 },
        );

        result.main();
    });
});
