import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: templateLiteral", () => {
    it("toString() over valueOf()", () => {
        const result = evaluator.evaluateTypeScript(`
            class C {
                toString() {
                    return "toString";
                }
                valueOf() {
                    return "valueOf";
                }
            }

            export const output = \`\${new C}\`;
        `);
        assert.strictEqual(result.output, "toString");
    });

    it("correct evaluation order", () => {
        const result = evaluator.evaluateTypeScript(`
            class C {
                counter: number;

                constructor() {
                    this.counter = 0;
                }

                get foo() {
                    this.counter++;
                    return {
                        toString: () => this.counter++,
                    };
                }
            }

            const c = new C;
            export const output = \`\${c.foo} \${c.foo}\`;
        `);
        assert.strictEqual(result.output, "1 3");
    });
});
