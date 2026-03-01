import * as evaluator from "../../_namespaces/evaluator.js";

describe("unittests:: evaluation:: optionalCall", () => {
    it("f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            function f(a) {
                output.push(a);
                output.push(this);
            }
            export const output: any[] = [];
            f?.(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.isUndefined(result.output[1]);
    });
    it("o.f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                f(a) {
                    output.push(a);
                    output.push(this);
                }
            };
            export const output: any[] = [];
            o.f?.(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o);
    });
    it("o.x.f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                x: {
                    f(a) {
                        output.push(a);
                        output.push(this);
                    }
                }
            };
            export const output: any[] = [];
            o.x.f?.(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o.x);
    });
    it("o?.f()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                f(a) {
                    output.push(a);
                    output.push(this);
                }
            };
            export const output: any[] = [];
            o?.f(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o);
    });
    it("o?.f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                f(a) {
                    output.push(a);
                    output.push(this);
                }
            };
            export const output: any[] = [];
            o?.f?.(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o);
    });
    it("o.x?.f()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                x: {
                    f(a) {
                        output.push(a);
                        output.push(this);
                    }
                }
            };
            export const output: any[] = [];
            o.x?.f(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o.x);
    });
    it("o?.x.f()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                x: {
                    f(a) {
                        output.push(a);
                        output.push(this);
                    }
                }
            };
            export const output: any[] = [];
            o?.x.f(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o.x);
    });
    it("o?.x?.f()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                x: {
                    f(a) {
                        output.push(a);
                        output.push(this);
                    }
                }
            };
            export const output: any[] = [];
            o?.x?.f(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o.x);
    });
    it("o?.x?.f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                x: {
                    f(a) {
                        output.push(a);
                        output.push(this);
                    }
                }
            };
            export const output: any[] = [];
            o?.x?.f?.(1);
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], result.o.x);
    });
    it("f?.()?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            function g(a) {
                output.push(a);
                output.push(this);
            }
            function f(a) {
                output.push(a);
                return g;
            }
            export const output: any[] = [];
            f?.(1)?.(2)
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.isUndefined(result.output[2]);
    });
    it("f?.().f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                f(a) {
                    output.push(a);
                    output.push(this);
                }
            };
            function f(a) {
                output.push(a);
                return o;
            }
            export const output: any[] = [];
            f?.(1).f?.(2)
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.strictEqual(result.output[2], result.o);
    });
    it("f?.()?.f?.()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const o = {
                f(a) {
                    output.push(a);
                    output.push(this);
                }
            };
            function f(a) {
                output.push(a);
                return o;
            }
            export const output: any[] = [];
            f?.(1)?.f?.(2)
        `);
        assert.strictEqual(result.output[0], 1);
        assert.strictEqual(result.output[1], 2);
        assert.strictEqual(result.output[2], result.o);
    });
    it("(o?.f)()", async () => {
        const result = evaluator.evaluateTypeScript(`
            export const foo = { bar() { return this } };
            export const output = (foo?.bar)();
        `);
        assert.strictEqual(result.output, result.foo);
    });
});
