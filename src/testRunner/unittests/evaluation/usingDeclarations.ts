import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

function FakeSuppressedError(error: any, suppressed: any) {
    return { error, suppressed };
}

describe("unittests:: evaluation:: usingDeclarations", () => {
    it("'using' in Block, normal completion (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = disposable;
                body();
                output.push("exit block");
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "exit block",
            "disposed",
            "after block",
        ]);
    });

    it("'using' in Block, 'throw' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
            throw "error";
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _ = disposable;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before try",
            "enter try",
            "body",
            "disposed",
            "error",
            "after try",
        ]);
    });

    it("'using' in Block, 'throw' in dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
                throw "error";
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _ = disposable;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before try",
            "enter try",
            "body",
            "exit try",
            "disposed",
            "error",
            "after try",
        ]);
    });

    it("'using' in Block, 'throw' in multiple dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable_1 = {
            [Symbol.dispose]() {
                output.push("disposed 1");
                throw "error 1";
            }
        };

        const disposable_2 = {
            [Symbol.dispose]() {
                output.push("disposed 2");
                throw "error 2";
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _1 = disposable_1, _2 = disposable_2;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        main();

        assert.deepEqual(output, [
            "before try",
            "enter try",
            "body",
            "exit try",
            "disposed 2",
            "disposed 1",
            {
                error: "error 1",
                suppressed: "error 2",
            },
            "after try",
        ]);
    });

    it("'using' in Block, 'throw' in body and dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
                throw "dispose error";
            }
        };

        function body() {
            output.push("body");
            throw "body error";
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _ = disposable;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        main();

        assert.deepEqual(output, [
            "before try",
            "enter try",
            "body",
            "disposed",
            {
                error: "dispose error",
                suppressed: "body error",
            },
            "after try",
        ]);
    });

    it("'using' in Block, 'throw' in body and multiple dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable_1 = {
            [Symbol.dispose]() {
                output.push("disposed 1");
                throw "dispose error 1";
            }
        };

        const disposable_2 = {
            [Symbol.dispose]() {
                output.push("disposed 2");
                throw "dispose error 2";
            }
        };

        function body() {
            output.push("body");
            throw "body error";
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _1 = disposable_1, _2 = disposable_2;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        main();

        assert.deepEqual(output, [
            "before try",
            "enter try",
            "body",
            "disposed 2",
            "disposed 1",
            {
                error: "dispose error 1",
                suppressed: {
                    error: "dispose error 2",
                    suppressed: "body error",
                },
            },
            "after try",
        ]);
    });

    it("'using' in Block, 'throw' in body and dispose, no global SuppressedError (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
                throw "dispose error";
            }
        };

        function body() {
            output.push("body");
            throw "body error";
        }

        export function main() {
            output.push("before try");
            try {
                output.push("enter try");
                using _ = disposable;
                body();
                output.push("exit try");
            }
            catch (e) {
                output.push(e);
            }
            output.push("after try");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output.slice(0, 4), [
            "before try",
            "enter try",
            "body",
            "disposed",
        ]);
        assert.instanceOf(output[4], Error);
        assert.strictEqual(output[4].name, "SuppressedError");
        assert.strictEqual((output[4] as any).error, "dispose error");
        assert.strictEqual((output[4] as any).suppressed, "body error");
        assert.deepEqual(output.slice(5), [
            "after try",
        ]);
    });

    it("'using' in Block, 'return' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = disposable;
                body();
                return;
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "disposed",
        ]);
    });

    it("'using' in Block, 'break' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            for (let i = 0; i < 2; i++) {
                output.push("enter block");
                using _ = disposable;
                body();
                break;
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "disposed",
            "after block",
        ]);
    });

    it("'using' in Block, 'continue' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            for (let i = 0; i < 2; i++) {
                output.push("enter block");
                using _ = disposable;
                body();
                continue;
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "disposed",
            "enter block",
            "body",
            "disposed",
            "after block",
        ]);
    });

    it("'using' in head of 'for', normal completion (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            for (using _ = disposable; i < 2; i++) {
                output.push("enter loop");
                body();
                output.push("exit loop");
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "enter loop",
            "body",
            "exit loop",
            "disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for', 'throw' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
            throw "error";
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            try {
                for (using _ = disposable; i < 2; i++) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            } catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for', 'throw' in dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
                throw "error";
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            try {
                for (using _ = disposable; i < 2; i++) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            } catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "enter loop",
            "body",
            "exit loop",
            "disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for', 'throw' in body and dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
                throw "dispose error";
            }
        };

        function body() {
            output.push("body");
            throw "body error";
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            try {
                for (using _ = disposable; i < 2; i++) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            } catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "disposed",
            {
                error: "dispose error",
                suppressed: "body error",
            },
            "after loop",
        ]);
    });

    it("'using' in head of 'for', 'return' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            for (using _ = disposable; i < 2; i++) {
                output.push("enter loop");
                body();
                return;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "disposed",
        ]);
    });

    it("'using' in head of 'for', 'break' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            for (using _ = disposable; i < 2; i++) {
                output.push("enter loop");
                body();
                break;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for', 'continue' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            for (using _ = disposable; i < 2; i++) {
                output.push("enter loop");
                body();
                continue;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "enter loop",
            "body",
            "disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for', multiple iterations (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            let i = 0;
            for (using _ = disposable; i < 2; i++) {
                output.push("enter loop");
                body();
                output.push("exit loop");
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "enter loop",
            "body",
            "exit loop",
            "disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', normal completion (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            for (using _ of g()) {
                output.push("enter loop");
                body();
                output.push("exit loop");
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "a disposed",
            "enter loop",
            "body",
            "exit loop",
            "b disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', 'throw' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
            throw "error";
        }

        export function main() {
            output.push("before loop");
            try {
                for (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', 'throw' in dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                    throw "error";
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            try {
                for (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "a disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', 'throw' in body and dispose (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                    throw "dispose error";
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
            throw "body error";
        }

        export function main() {
            output.push("before loop");
            try {
                for (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            {
                error: "dispose error",
                suppressed: "body error",
            },
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', 'return' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            for (using _ of g()) {
                output.push("enter loop");
                body();
                return;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
        ]);
    });

    it("'using' in head of 'for-of', 'break' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            for (using _ of g()) {
                output.push("enter loop");
                body();
                break;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-of', 'continue' in body (es2018)", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before loop");
            for (using _ of g()) {
                output.push("enter loop");
                body();
                continue;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "enter loop",
            "body",
            "b disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', normal completion (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export async function main() {
            output.push("before loop");
            for await (using _ of g()) {
                output.push("enter loop");
                body();
                output.push("exit loop");
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "a disposed",
            "enter loop",
            "body",
            "exit loop",
            "b disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', 'throw' in body (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
            throw "error";
        }

        export async function main() {
            output.push("before loop");
            try {
                for await (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', 'throw' in dispose (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                    throw "error";
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export async function main() {
            output.push("before loop");
            try {
                for await (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "exit loop",
            "a disposed",
            "error",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', 'throw' in body and dispose (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                    throw "dispose error";
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
            throw "body error";
        }

        export async function main() {
            output.push("before loop");
            try {
                for await (using _ of g()) {
                    output.push("enter loop");
                    body();
                    output.push("exit loop");
                }
            }
            catch (e) {
                output.push(e);
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
            { SuppressedError: FakeSuppressedError },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            {
                error: "dispose error",
                suppressed: "body error",
            },
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', 'return' in body (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export async function main() {
            output.push("before loop");
            for await (using _ of g()) {
                output.push("enter loop");
                body();
                return;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
        ]);
    });

    it("'using' in head of 'for-await-of', 'break' in body (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export async function main() {
            output.push("before loop");
            for await (using _ of g()) {
                output.push("enter loop");
                body();
                break;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "after loop",
        ]);
    });

    it("'using' in head of 'for-await-of', 'continue' in body (es2018)", async () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function* g() {
            yield {
                [Symbol.dispose]() {
                    output.push("a disposed");
                }
            };
            yield {
                [Symbol.dispose]() {
                    output.push("b disposed");
                }
            };
        }

        function body() {
            output.push("body");
        }

        export async function main() {
            output.push("before loop");
            for await (using _ of g()) {
                output.push("enter loop");
                body();
                continue;
            }
            output.push("after loop");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        await main();

        assert.deepEqual(output, [
            "before loop",
            "enter loop",
            "body",
            "a disposed",
            "enter loop",
            "body",
            "b disposed",
            "after loop",
        ]);
    });

    it("'using' at top level of module (CommonJS)", () => {
        const { output, x, y } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];
        output.push("before export x");
        export const x = 1;
        output.push("before using");
        using _ = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };
        output.push("after using");
        export const y = 2;
        output.push("after export y");
        `,
            { target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.CommonJS },
        );

        assert.strictEqual(x, 1);
        assert.strictEqual(y, 2);
        assert.deepEqual(output, [
            "before export x",
            "before using",
            "after using",
            "after export y",
            "disposed",
        ]);
    });

    it("'using' at top level of module (AMD)", () => {
        const { output, x, y } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];
        output.push("before export x");
        export const x = 1;
        output.push("before using");
        using _ = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };
        output.push("after using");
        export const y = 2;
        output.push("after export y");
        `,
            { target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.AMD },
        );

        assert.strictEqual(x, 1);
        assert.strictEqual(y, 2);
        assert.deepEqual(output, [
            "before export x",
            "before using",
            "after using",
            "after export y",
            "disposed",
        ]);
    });

    it("'using' at top level of module (System)", () => {
        const { output, x, y } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];
        output.push("before export x");
        export const x = 1;
        output.push("before using");
        using _ = {
            [Symbol.dispose]() {
                output.push("disposed");
            }
        };
        output.push("after using");
        export const y = 2;
        output.push("after export y");
        `,
            { target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.System },
        );

        assert.strictEqual(x, 1);
        assert.strictEqual(y, 2);
        assert.deepEqual(output, [
            "before export x",
            "before using",
            "after using",
            "after export y",
            "disposed",
        ]);
    });

    it("'using' for 'null' value", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = null;
                body();
                output.push("exit block");
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "exit block",
            "after block",
        ]);
    });

    it("'using' for 'undefined' value", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = undefined;
                body();
                output.push("exit block");
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "exit block",
            "after block",
        ]);
    });

    it("'using' for non-disposable value", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = {} as any;
                body();
                output.push("exit block");
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        assert.throws(main);
        assert.deepEqual(output, [
            "before block",
            "enter block",
        ]);
    });

    it("'using' disposes in reverse order", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        const disposable_1 = {
            [Symbol.dispose]() {
                output.push("disposed 1");
            }
        };
        const disposable_2 = {
            [Symbol.dispose]() {
                output.push("disposed 2");
            }
        };

        function body() {
            output.push("body");
        }

        export function main() {
            output.push("before block");
            {
                output.push("enter block");
                using _ = disposable_1, __ = disposable_2;
                body();
                output.push("exit block");
            }
            output.push("after block");
        }
        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "before block",
            "enter block",
            "body",
            "exit block",
            "disposed 2",
            "disposed 1",
            "after block",
        ]);
    });

    it("'using' for 'function' disposable resource ", () => {
        const { main, output } = evaluator.evaluateTypeScript(
            `
        export const output: any[] = [];

        function disposable() {
            const f = () => output.push("enter");
            const d = () => output.push("exit");
            return Object.assign(f, { [Symbol.dispose]: d });
        }

        export function main() {
            using run = disposable();
            run();
        }

        `,
            { target: ts.ScriptTarget.ES2018 },
        );

        main();

        assert.deepEqual(output, [
            "enter",
            "exit",
        ]);
    });

    it("'using' with downlevel generators", () => {
        abstract class Iterator {
            return?(): void;
            [evaluator.FakeSymbol.iterator]() {
                return this;
            }
            [evaluator.FakeSymbol.dispose]() {
                this.return?.();
            }
        }

        const { main } = evaluator.evaluateTypeScript(
            `
            let exited = false;

            function * f() {
                try {
                    yield;
                }
                finally {
                    exited = true;
                }
            }

            export function main() {
                {
                    using g = f();
                    g.next();
                }

                return exited;
            }
        `,
            {
                target: ts.ScriptTarget.ES5,
            },
            {
                Iterator,
            },
        );

        const exited = main();
        assert.isTrue(exited, "Expected 'using' to dispose generator");
    });
});
