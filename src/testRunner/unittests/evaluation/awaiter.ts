import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: awaiter", () => {
    // NOTE: This could break if the ECMAScript spec ever changes the timing behavior for Promises (again)
    it("await (es5)", async () => {
        const result = evaluator.evaluateTypeScript(`
        async function a(msg: string) {
            await Promise.resolve();
            output.push(msg);
        }
        function b(msg: string) {
            return Promise.resolve().then(() => {
                output.push(msg);
            });
        }
        export const output: string[] = [];
        export async function main() {
            const p1 = a('1');
            const p2 = b('2');
            await Promise.all([p1, p2]);
        }
        `);
        await result.main();
        assert.deepEqual(result.output, ["1", "2"]);
    });
});
