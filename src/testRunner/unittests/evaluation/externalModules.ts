import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: externalModules", () => {
    // https://github.com/microsoft/TypeScript/issues/35420
    it("Correct 'this' in function exported from external module", async () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/output.ts": `
                    export const output: any[] = [];
                `,
                "/.src/other.ts": `
                    import { output } from "./output";
                    export function f(this: any, expected) {
                        output.push(this === expected);
                    }

                    // 0
                    f(undefined);
                `,
                "/.src/main.ts": `
                    export { output } from "./output";
                    import { output } from "./output";
                    import { f } from "./other";
                    import * as other from "./other";

                    // 1
                    f(undefined);

                    // 2
                    const obj = {};
                    f.call(obj, obj);

                    // 3
                    other.f(other);
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        });
        assert.equal(result.output[0], true); // `f(undefined)` inside module. Existing behavior is correct.
        assert.equal(result.output[1], true); // `f(undefined)` from import. New behavior to match first case.
        assert.equal(result.output[2], true); // `f.call(obj, obj)`. Behavior of `.call` (or `.apply`, etc.) should not be affected.
        assert.equal(result.output[3], true); // `other.f(other)`. `this` is still namespace because it is left of `.`.
    });

    it("Correct 'this' in function expression exported from external module", async () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/output.ts": `
                    export const output: any[] = [];
                `,
                "/.src/other.ts": `
                    import { output } from "./output";
                    export const f = function(this: any, expected) {
                        output.push(this === expected);
                    }

                    // 0
                    f(undefined);
                `,
                "/.src/main.ts": `
                    export { output } from "./output";
                    import { output } from "./output";
                    import { f } from "./other";
                    import * as other from "./other";

                    // 1
                    f(undefined);

                    // 2
                    const obj = {};
                    f.call(obj, obj);

                    // 3
                    other.f(other);
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        });
        assert.equal(result.output[0], true); // `f(undefined)` inside module. Existing behavior is incorrect.
        assert.equal(result.output[1], true); // `f(undefined)` from import. New behavior to match first case.
        assert.equal(result.output[2], true); // `f.call(obj, obj)`. Behavior of `.call` (or `.apply`, etc.) should not be affected.
        assert.equal(result.output[3], true); // `other.f(other)`. `this` is still namespace because it is left of `.`.
    });
});
