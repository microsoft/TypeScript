import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: updateExpressionInModule", () => {
    // only run BigInt tests if BigInt is supported in the host environment
    const itIfBigInt = typeof BigInt === "function" ? it : it.skip;

    it("pre-increment in commonjs using Number", () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/main.ts": `
                let a = 1;
                export { a };
                export const b = ++a;
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        }, { module: ts.ModuleKind.CommonJS });
        assert.equal(result.a, 2);
        assert.equal(result.b, 2);
    });
    it("pre-increment in System using Number", () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/main.ts": `
                let a = 1;
                export { a };
                export const b = ++a;
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        }, { module: ts.ModuleKind.System });
        assert.equal(result.a, 2);
        assert.equal(result.b, 2);
    });
    itIfBigInt("pre-increment in commonjs using BigInt", () => {
        const result = evaluator.evaluateTypeScript(
            {
                files: {
                    "/.src/main.ts": `
                let a = BigInt(1);
                export { a };
                export const b = ++a;
                `,
                },
                rootFiles: ["/.src/main.ts"],
                main: "/.src/main.ts",
            },
            { module: ts.ModuleKind.CommonJS },
            { BigInt },
        );
        assert.equal(result.a, BigInt(2));
        assert.equal(result.b, BigInt(2));
    });
    itIfBigInt("pre-increment in System using BigInt", () => {
        const result = evaluator.evaluateTypeScript(
            {
                files: {
                    "/.src/main.ts": `
                let a = BigInt(1);
                export { a };
                export const b = ++a;
                `,
                },
                rootFiles: ["/.src/main.ts"],
                main: "/.src/main.ts",
            },
            { module: ts.ModuleKind.System },
            { BigInt },
        );
        assert.equal(result.a, BigInt(2));
        assert.equal(result.b, BigInt(2));
    });
    it("post-increment in commonjs using Number", () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/main.ts": `
                let a = 1;
                export { a };
                export const b = a++;
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        }, { module: ts.ModuleKind.CommonJS });
        assert.equal(result.a, 2);
        assert.equal(result.b, 1);
    });
    it("post-increment in System using Number", () => {
        const result = evaluator.evaluateTypeScript({
            files: {
                "/.src/main.ts": `
                let a = 1;
                export { a };
                export const b = a++;
                `,
            },
            rootFiles: ["/.src/main.ts"],
            main: "/.src/main.ts",
        }, { module: ts.ModuleKind.System });
        assert.equal(result.a, 2);
        assert.equal(result.b, 1);
    });
    itIfBigInt("post-increment in commonjs using BigInt", () => {
        const result = evaluator.evaluateTypeScript(
            {
                files: {
                    "/.src/main.ts": `
                let a = BigInt(1);
                export { a };
                export const b = a++;
                `,
                },
                rootFiles: ["/.src/main.ts"],
                main: "/.src/main.ts",
            },
            { module: ts.ModuleKind.CommonJS },
            { BigInt },
        );
        assert.equal(result.a, BigInt(2));
        assert.equal(result.b, BigInt(1));
    });
    itIfBigInt("post-increment in System using BigInt", () => {
        const result = evaluator.evaluateTypeScript(
            {
                files: {
                    "/.src/main.ts": `
                let a = BigInt(1);
                export { a };
                export const b = a++;
                `,
                },
                rootFiles: ["/.src/main.ts"],
                main: "/.src/main.ts",
            },
            { module: ts.ModuleKind.System },
            { BigInt },
        );
        assert.equal(result.a, BigInt(2));
        assert.equal(result.b, BigInt(1));
    });
});
