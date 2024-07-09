import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: constEnum", () => {
    it("correct order of operations for inlined negative numbers", async () => {
        const result = evaluator.evaluateTypeScript(`
            const enum TestEnum {
                A = 1,
                B = -1
            }

            export const a = typeof TestEnum.A.toString();
            export const b = typeof TestEnum.B.toString();
        `);
        assert.equal(result.a, "string");
        assert.equal(result.b, "string");
    });
});
