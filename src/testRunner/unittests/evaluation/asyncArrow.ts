describe("asyncArrowEvaluation", () => {
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
});