import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: arraySpread", () => {
    it("array spread preserves side-effects", async () => {
        const result = evaluator.evaluateTypeScript(`
            const k = [1, 2];
            const o = [3, ...k, k[0]++];
            export const output = o;
        `);
        assert.deepEqual(result.output, [3, 1, 2, 1]);
    });
    it("array spread packs spread elements", async () => {
        const result = evaluator.evaluateTypeScript(`
            const k = [1, , 2];
            const o = [3, ...k, 4];
            export const output = o;
        `);
        assert.deepEqual(result.output, [3, 1, undefined, 2, 4]);
        assert.hasAllKeys(result.output, ["0", "1", "2", "3", "4"]);
    });
    it("array spread does not pack non-spread elements", async () => {
        const result = evaluator.evaluateTypeScript(`
            const k = [1, 2];
            const o = [3, , ...k, , 4];
            export const output = o;
        `);
        assert.deepEqual(result.output, [3, , 1, 2, , 4]); // eslint-disable-line no-sparse-arrays
        assert.hasAllKeys(result.output, ["0", "2", "3", "5"]);
        assert.doesNotHaveAllKeys(result.output, ["1", "4"]);
    });
    it("argument spread pack does not matter", async () => {
        const result = evaluator.evaluateTypeScript(`
            const f = (...args) => args;
            const k = [1, , 2];
            const o = f(3, ...k, 4);
            export const output = o;
        `);
        assert.deepEqual(result.output, [3, 1, undefined, 2, 4]);
        assert.hasAllKeys(result.output, ["0", "1", "2", "3", "4"]);
    });
});
