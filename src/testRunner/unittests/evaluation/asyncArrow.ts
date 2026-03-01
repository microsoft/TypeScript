import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: asyncArrowEvaluation", () => {
    // https://github.com/Microsoft/TypeScript/issues/24722
    it("this capture (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        export class A {
            b = async (...args: any[]) => {
                await Promise.resolve();
                output.push({ ["a"]: () => this }); // computed property name after 'await' triggers case
            };
        }
        export const output: any[] = [];
        export async function main() {
            await new A().b();
        }`);
        await result.main();
        assert.instanceOf(result.output[0].a(), result.A);
    });

    // https://github.com/microsoft/TypeScript/issues/57897
    it("Class alias (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        class X {
            public static a = async (someVar: boolean = true) => {
                return await X.b();
            };

            public static b = async () => {
                return "GOOD";
            };
        }

        export async function main() {
            try {
                return await X.a();
            }
            catch (e) {
                return "BAD";
            }
        }`);
        const output = await result.main();
        assert.equal(output, "GOOD");
    });
});
